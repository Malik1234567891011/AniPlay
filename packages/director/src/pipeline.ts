import type {
  ActionIntent,
  BeatPlan,
  ConsistencyReport,
  GameEvent,
  GameState,
  MemoryFact,
  NarrativeTurn,
  QualityTier,
  Resolution,
  StoryVersion,
  TurnRecord,
} from '@aniplay/contracts';
import { commitTurn, projectState, resolveIntent, type CommitResult } from '@aniplay/engine';
import { buildTurnContext, type TurnContext } from './context.js';
import { RuleBasedIntentParser, type IntentParser } from './parser.js';
import { RuleBasedDirector, type Director } from './director.js';
import { TemplateWriter, type Writer } from './writer.js';
import { repairNarrative, validateNarrative } from './validator.js';
import { materializeProposals } from './memory.js';
import { classifyClaim, directorNoteFor, proposalFor } from './player-canon.js';
import { detectOutOfScope } from './entity-resolution.js';
import { findFourthWallBreaks, fourthWallRepairNote } from './fourth-wall.js';
import { expandElliptical } from './elliptical.js';
import { writeStreaming } from './fast-writer.js';
import { pickReactionEmotion } from './director.js';
import { reactionAssetKey } from '@aniplay/contracts';
import type { ModelGateway } from './gateway/types.js';
import { recordMentions } from '@aniplay/engine';

/**
 * Spec §17.1 — the turn pipeline, steps 4 through 12.
 *
 * The API owns authentication, the wallet reserve, idempotency, and streaming
 * (steps 1–3 and 13–17). This owns the part where a sentence becomes truth:
 *
 *   context → parse → validate intent → **engine resolves** → direct → write →
 *   validate prose → (one repair) → commit
 *
 * The engine call sits in the middle on purpose. Everything before it only
 * describes what the player *meant*; everything after it only describes what
 * already happened.
 */

export interface TurnPipelineDeps {
  readonly parser: IntentParser;
  readonly director: Director;
  readonly writer: Writer;
}

/** Deterministic, instant, and good enough to plan an ordinary beat. */
const RULE_DIRECTOR = new RuleBasedDirector();
const RULE_PARSER = new RuleBasedIntentParser();

/**
 * Whether this sentence is worth 2.4 seconds of a model's attention.
 *
 * The rule parser already knows when it is guessing: it reports low
 * confidence, records ambiguities, and falls back to `custom` when it found no
 * verb it recognises. Those are the turns a model reads better. Everything
 * else — the overwhelming majority of ordinary play — it gets right instantly.
 */
export function needsModelParse(intent: ActionIntent): boolean {
  if (intent.confidence < 0.75) return true;
  if (intent.ambiguities.length > 0) return true;
  if (intent.actions.length === 0) return true;
  // No recognised verb: the parser is treating a whole sentence as a shrug.
  if (intent.actions.every((a) => a.verb === 'custom')) return true;
  return false;
}

export function createDefaultPipeline(): TurnPipelineDeps {
  return {
    parser: new RuleBasedIntentParser(),
    director: new RuleBasedDirector(),
    writer: new TemplateWriter(),
  };
}

export interface RunTurnOptions {
  /**
   * Called the instant the engine has decided, before the director or writer
   * run. Spec §17.8 — the outcome is authoritative roughly nine seconds before
   * the prose describing it exists, and a player staring at a spinner for that
   * whole time is the difference between a game and a prompt box.
   */
  readonly onResolved?: (resolution: Resolution) => void;
  /**
   * Called with each complete sentence as the writer produces it. Spec §17.10 —
   * a player reading the first sentence at a second and a half is in a
   * different product from one watching a spinner for twelve.
   */
  readonly onText?: (sentence: string) => void;
  /**
   * Fired once the scene is known and before a word has been written. Spec
   * §19.7 — the reaction frame is a cached asset, so it can be on screen while
   * the prose is still arriving, which is most of what makes a conversation
   * feel like it answered you.
   */
  readonly onReaction?: (reaction: {
    characterId: string;
    name: string;
    emotion: string;
    assetKey: string;
  }) => void;
  /**
   * Set to stream prose instead of waiting for a structured document. The
   * fast path also skips the model director, which plans presentation and
   * costs 2.4s that the player spends looking at nothing.
   */
  readonly fastWriter?: ModelGateway | null;
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly memories: readonly MemoryFact[];
  readonly recentTurns: readonly TurnRecord[];
  readonly actionText: string;
  readonly qualityTier: QualityTier;
  readonly turnId: string;
  readonly seed: string;
  readonly deps?: TurnPipelineDeps;
  readonly now?: () => string;
}

export interface TurnPipelineResult {
  readonly intent: ActionIntent;
  readonly resolution: Resolution;
  readonly plan: BeatPlan;
  readonly narrative: NarrativeTurn;
  readonly report: ConsistencyReport;
  readonly repaired: boolean;
  readonly state: GameState;
  readonly events: GameEvent[];
  readonly newMemories: MemoryFact[];
  readonly commit: CommitResult;
  readonly context: TurnContext;
  readonly timings: Record<string, number>;
}

export async function runTurn(options: RunTurnOptions): Promise<TurnPipelineResult> {
  const deps = options.deps ?? createDefaultPipeline();
  const { story, state, actionText, qualityTier, turnId, seed } = options;
  const timings: Record<string, number> = {};
  const clock = createClock(timings);

  // Step 5 — intent parsing.
  //
  // "Again." is expanded into the sentence it means *before* any parser sees
  // it, so both of them get it. Putting this inside a parser would have put it
  // in exactly one, which is the mistake this codebase has now made three
  // times.
  clock.start('parse');
  const ellipsis = expandElliptical(actionText, options.recentTurns, story);

  // Spec §17.10 — the rules parse first, and the model only when they are
  // genuinely unsure.
  //
  // The model parser costs 2350ms on every turn, and on most turns it agrees
  // with a rule parse that took no measurable time at all: "I ask Kael about
  // the ward" is not an ambiguous sentence. It earns its cost on the ones that
  // are — an unrecognised verb, a name the world does not have, several things
  // at once — and those are exactly the cases the rule parser already reports
  // as low confidence.
  const quick = RULE_PARSER.parseSync(ellipsis.text, { story, state, intentId: `int_${turnId}` });
  const parsed = needsModelParse(quick)
    ? await deps.parser.parse(ellipsis.text, { story, state, intentId: `int_${turnId}` })
    : quick;
  const intent = annotateScope(
    ellipsis.expanded && ellipsis.note
      ? { ...parsed, rawAction: actionText, ambiguities: [...parsed.ambiguities, ellipsis.note] }
      : parsed,
    ellipsis.text,
  );
  clock.end('parse');

  // Step 7 — the deterministic engine. This is where outcomes are decided.
  clock.start('engine');
  const resolution = resolveIntent({ story, state, intent, turnId, seed });
  clock.end('engine');

  // Hand the outcome out immediately. Everything after this is presentation.
  options.onResolved?.(resolution);

  // Step 4 — context assembly, sized by tier.
  //
  // Built against the *projected* state — this turn's mutations already applied.
  // The engine has decided the player moved, so the director and writer must see
  // the room they moved into, and the validator must judge the prose against
  // where they now are. Only `commitTurn` writes durable state.
  clock.start('context');
  const projected = projectState(state, story, resolution.mutations);
  const context = buildTurnContext({
    story,
    state: projected,
    resolution,
    tier: qualityTier,
    memories: options.memories,
    recentTurns: options.recentTurns,
    actionText,
    playerDialogue: intent.dialogue,
  });
  clock.end('context');

  // Spec §3.3 — before the director plans anything, work out whether the player
  // just authored something rather than attempted it. A declarative sentence
  // about themselves or their past is theirs to state; the world adapts to it
  // instead of rolling a die against it.
  if (context.abandonedObjective) {
    context.resolution.privateFacts.push({ visibility: 'SELF', fact: context.abandonedObjective });
  }

  const canon = classifyClaim(actionText, { story, state, turnIndex: state.turnIndex });
  const canonNote = directorNoteFor(canon, story);
  if (canonNote) {
    context.resolution.privateFacts.push({ visibility: 'SELF', fact: canonNote });
  }

  // Spec §19.7 — who is reacting, and how, decided before any writing starts.
  //
  // The active character is whoever the player just addressed, falling back to
  // whoever is most present. Nobody here means no reaction frame at all: a
  // random face because the system expects an image is worse than no image.
  const reacting = reactingCharacter(context, intent);
  if (reacting) {
    const emotion = pickReactionEmotion(reacting, context);
    options.onReaction?.({
      characterId: reacting.def.id,
      name: reacting.def.name,
      emotion,
      assetKey: reactionAssetKey(story.storyId, reacting.def.id, emotion),
    });
  }

  // Steps 8 and 9 — plan the beat, then write it.
  //
  // Spec §17.10 — the fast path exists because the autopsy was unambiguous.
  // An ordinary turn cost three serial model calls before a single word
  // reached the player: parse 2350ms, director 2368ms, writer 2219ms. The
  // engine, which this whole architecture was built around, took two
  // milliseconds.
  //
  // Only the writer has to run before prose exists. The director plans
  // presentation, and the rule-based one does that deterministically in no
  // time at all — so on the fast path it plans, and the model's 2.4s is spent
  // on nothing. Everything the model director was genuinely better at
  // (dramatic focus, beat shape) is worth having on a turn that matters, and
  // is not worth two and a half seconds on "I ask him how long he has worked
  // this gate".
  const fast = options.fastWriter ?? null;

  clock.start('director');
  const plan = fast ? RULE_DIRECTOR.planSync(context) : await deps.director.plan(context);
  clock.end('director');

  clock.start('writer');
  let narrative = fast
    ? await writeStreaming(fast, context, plan, { onText: options.onText })
    : await deps.writer.write(context, plan);
  clock.end('writer');

  // Step 10 — validate against authoritative state.
  clock.start('validate');
  let report = validateNarrative({ context, turn: narrative });
  let repaired = false;

  // Step 11 — exactly one constrained repair pass. Never a loop.
  if (!report.valid) {
    narrative = repairNarrative(narrative, report, context.player.name);
    report = validateNarrative({ context, turn: narrative });
    repaired = true;
  }

  // Spec §16.9 — a fourth-wall break is the one violation worth paying a second
  // model call for. The deterministic repair can only drop the block, and the
  // offending line is usually carrying the answer to what the player just
  // tried: deleting "this isn't a game where you can fly" leaves them with no
  // reply at all, which is worse than the break. So it is rewritten in-world
  // instead, once, and only when one is actually present — which is rare.
  const breaks = findFourthWallBreaks(narrative.blocks, story);
  if (breaks.length > 0) {
    const note = fourthWallRepairNote(breaks);
    const rewritten = await deps.writer
      .write(
        {
          ...context,
          resolution: {
            ...context.resolution,
            privateFacts: [...context.resolution.privateFacts, { visibility: 'SELF', fact: note }],
          },
        },
        plan,
      )
      .catch(() => null);

    // Only accept the rewrite if it actually fixed it. A second break is a
    // reason to fall back to dropping the block, not to try a third time.
    if (rewritten && findFourthWallBreaks(rewritten.blocks, story).length === 0) {
      narrative = rewritten;
      repaired = true;
    } else {
      narrative = { ...narrative, blocks: narrative.blocks.filter((_, i) => !breaks.some((b) => b.blockIndex === i)) };
      repaired = true;
    }
    report = validateNarrative({ context, turn: narrative });
  }
  clock.end('validate');

  // Step 12 — commit. Memory proposals are materialised only for the facts the
  // surviving prose actually supports.
  clock.start('commit');
  let mentionCounter = 0;
  // Spec §11.9 — record the proper nouns this beat put in front of the player,
  // so that "go back to the Moonlight Café" next turn can tell the difference
  // between a place the story offered them and one they made up. Cheap, lossy,
  // and the thing that makes promotion possible without asking the model to
  // file paperwork.
  const mentionMutations = recordMentions(
    narrative.blocks.map((b) => b.text).join(' '),
    story,
    // Where the beat left the player, not where it started: a name said on the
    // way out of a room belongs to the room the player is now standing in.
    projected.player.locationId,
    () => `mut_${turnId}_men${mentionCounter++}`,
  );


  const commit = commitTurn({
    story,
    state,
    resolution,
    turnId,
    extraMutations: mentionMutations,
    now: options.now,
  });
  // An established claim is written down before anything the model proposed,
  // so it cannot be crowded out, and it is pinned so ordinary retrieval never
  // ranks it away. This is the difference between the world adapting to the
  // player and the world humouring them for one paragraph.
  const canonProposal = proposalFor(canon, state.turnIndex);
  const proposals = canonProposal ? [canonProposal, ...plan.memoryProposals] : plan.memoryProposals;
  const newMemories = materializeProposals(proposals, commit.state, turnId, story);
  if (canonProposal && newMemories[0]) newMemories[0] = { ...newMemories[0], pinned: true };
  clock.end('commit');

  return {
    intent,
    resolution,
    plan,
    narrative,
    report,
    repaired,
    state: commit.state,
    events: commit.events,
    newMemories,
    commit,
    context,
    timings,
  };
}

/**
 * Spec §16.6 — the returning-player recap. Cached and free: it restates known
 * facts and never introduces new ones.
 */
export function buildRecap(
  story: StoryVersion,
  state: GameState,
  recentTurns: readonly TurnRecord[],
): { bullets: string[]; objective: string | null } {
  const bullets: string[] = [];

  const lastTurn = recentTurns.at(-1);
  if (lastTurn) bullets.push(lastTurn.sceneSummary);

  const activeQuest = state.quests.find((q) => q.status === 'ACTIVE');
  if (activeQuest) {
    const def = story.quests.find((q) => q.id === activeQuest.questId);
    const step = def?.steps.find((s) => s.id === activeQuest.currentStepId);
    if (def && step) bullets.push(`${def.title}: ${step.playerCopy}`);
  }

  const strongest = [...state.relationships]
    .filter((r) => r.lastChangedTurn >= 0)
    .sort((a, b) => Math.abs(b.trust) + b.rivalry - (Math.abs(a.trust) + a.rivalry))[0];
  if (strongest) {
    const character = story.characters.find((c) => c.id === strongest.characterId);
    if (character) {
      bullets.push(
        strongest.rivalry > strongest.trust
          ? `${character.name} is not on your side.`
          : `${character.name} has been covering for you.`,
      );
    }
  }

  const objective =
    state.quests
      .filter((q) => q.status === 'ACTIVE')
      .map((q) => {
        const def = story.quests.find((d) => d.id === q.questId);
        return def?.steps.find((s) => s.id === q.currentStepId)?.playerCopy ?? null;
      })
      .find((o): o is string => o !== null) ?? null;

  // Spec §16.6 — 2–4 bullets, 60 words maximum.
  const trimmed: string[] = [];
  let words = 0;
  for (const bullet of bullets.slice(0, 4)) {
    const count = bullet.split(/\s+/).length;
    if (words + count > 60) break;
    trimmed.push(bullet);
    words += count;
  }

  return { bullets: trimmed, objective };
}

function createClock(sink: Record<string, number>): {
  start: (label: string) => void;
  end: (label: string) => void;
} {
  const starts = new Map<string, number>();
  return {
    start: (label) => starts.set(label, performance.now()),
    end: (label) => {
      const started = starts.get(label);
      if (started !== undefined) sink[label] = Math.round(performance.now() - started);
    },
  };
}

/**
 * Spec §20.9 — `Rephrase narration`.
 *
 * Reruns the writer over a turn that already happened. The resolution and the
 * beat plan are the stored ones, so nothing is re-rolled: the same dice, the
 * same outcomes, the same mutations, different words. "Never silently re-roll
 * deterministic dice when only narration is regenerated" is the rule, and the
 * only way to keep it is to never call the engine here at all.
 *
 * The state passed in is the state the turn *started* from, which is what the
 * writer saw the first time.
 */
export interface RephraseOptions {
  readonly story: StoryVersion;
  /** The state this turn began from, not the state it produced. */
  readonly state: GameState;
  readonly resolution: Resolution;
  readonly plan: BeatPlan;
  readonly memories: readonly MemoryFact[];
  readonly recentTurns: readonly TurnRecord[];
  readonly actionText: string;
  readonly tier: QualityTier;
  /**
   * What the player said aloud on the original turn.
   *
   * Recovered from the committed turn's own player dialogue rather than
   * re-parsed: the parse is a model call, and re-running it could decide the
   * player said something different from what the story already records.
   */
  readonly playerDialogue: readonly { speaker: unknown; text: string; visibility: string }[];
  readonly deps?: TurnPipelineDeps;
}

export interface RephraseResult {
  readonly narrative: NarrativeTurn;
  readonly report: ConsistencyReport;
  readonly repaired: boolean;
}

export async function rephraseNarration(options: RephraseOptions): Promise<RephraseResult> {
  const deps = options.deps ?? createDefaultPipeline();

  const context = buildTurnContext({
    story: options.story,
    state: options.state,
    resolution: options.resolution,
    tier: options.tier,
    memories: options.memories,
    recentTurns: options.recentTurns,
    actionText: options.actionText,
    playerDialogue: options.playerDialogue as never,
  });

  let narrative = await deps.writer.write(context, options.plan);
  let report = validateNarrative({ context, turn: narrative });
  let repaired = false;
  if (!report.valid) {
    narrative = repairNarrative(narrative, report, context.player.name);
    report = validateNarrative({ context, turn: narrative });
    repaired = true;
  }

  return { narrative, report, repaired };
}


/**
 * Marks a campaign-sized declaration, whichever parser produced the intent.
 *
 * This used to live inside `RuleBasedIntentParser`, which in production is only
 * the fallback — the model parser was what actually ran, and it never set
 * `out_of_scope` at all. So the engine branch that reads the flag was
 * effectively dead outside tests, in both directions: the guard against a
 * single die settling a campaign never fired in production, and neither would
 * the undertaking that replaced it.
 *
 * It belongs here rather than in either parser: it is a property of the
 * sentence the player wrote, not of how that sentence was interpreted.
 */
export function annotateScope(intent: ActionIntent, actionText: string): ActionIntent {
  if (!detectOutOfScope(actionText).detected) return intent;
  if (intent.unsafeOrMetaRequests.includes('out_of_scope')) return intent;
  return { ...intent, unsafeOrMetaRequests: [...intent.unsafeOrMetaRequests, 'out_of_scope'] };
}


/**
 * Whose face this turn is about.
 *
 * Whoever the player addressed, then whoever they have most history with, then
 * whoever is here. Returns null when the player is alone — an establishing
 * frame or nothing at all is right there, and showing some character because
 * the system wants an image is exactly the failure to avoid.
 */
export function reactingCharacter(
  context: TurnContext,
  intent: ActionIntent,
): TurnContext['presentCharacters'][number] | null {
  const present = context.presentCharacters;
  if (present.length === 0) return null;

  const addressed = new Set(
    intent.actions.flatMap((a) => a.targets.filter((t) => t.entityType === 'npc').map((t) => t.entityId)),
  );
  const spokenTo = intent.dialogue.map((d) => d.speaker.entityId);
  for (const id of [...addressed, ...spokenTo]) {
    const match = present.find((c) => c.def.id === id);
    if (match) return match;
  }

  // The player typed a name and the parser did not turn it into a target.
  //
  // This is not a rare miss. It happened on the second turn of an ordinary
  // session: "I walk over to Coach Torakawa and tell her I'm not playing today
  // unless she tells me why she really let the last five leave" produced no NPC
  // target at all, so the reaction frame fell through to relationship weight
  // and showed the player a teammate they had just shaken hands with, mid-
  // ultimatum to somebody else. Whoever the player named owns the beat, and
  // their own words are better evidence of that than a parse of them.
  const named = namedInAction(intent.rawAction, present);
  if (named) return named;

  // Nobody named: whoever this player has the most going on with.
  return [...present].sort((a, b) => weight(b.relationship) - weight(a.relationship))[0] ?? null;
}

/**
 * The present character whose name the player actually typed.
 *
 * Longest name first, so "Coach Torakawa" beats "Coach", and last-resort
 * surname matching because people are addressed by one part of their name.
 */
function namedInAction(
  rawAction: string,
  present: TurnContext['presentCharacters'],
): TurnContext['presentCharacters'][number] | null {
  const text = rawAction.toLowerCase();
  const candidates = present
    .flatMap((character) =>
      [character.def.name, ...character.def.name.split(/\s+/)]
        .filter((name) => name.length >= 3)
        .map((name) => ({ character, name })),
    )
    .sort((a, b) => b.name.length - a.name.length);

  return (
    candidates.find(({ name }) =>
      new RegExp(`\\b${name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(text),
    )?.character ?? null
  );
}

function weight(rel: { trust: number; affection: number; respect: number; fear: number; rivalry: number }): number {
  return Math.abs(rel.trust) + Math.abs(rel.affection) + rel.fear + rel.rivalry + rel.respect;
}
