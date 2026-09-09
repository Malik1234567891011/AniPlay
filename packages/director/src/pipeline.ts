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

export function createDefaultPipeline(): TurnPipelineDeps {
  return {
    parser: new RuleBasedIntentParser(),
    director: new RuleBasedDirector(),
    writer: new TemplateWriter(),
  };
}

export interface RunTurnOptions {
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
  clock.start('parse');
  const parsed = await deps.parser.parse(actionText, { story, state, intentId: `int_${turnId}` });
  const intent = annotateScope(parsed, actionText);
  clock.end('parse');

  // Step 7 — the deterministic engine. This is where outcomes are decided.
  clock.start('engine');
  const resolution = resolveIntent({ story, state, intent, turnId, seed });
  clock.end('engine');

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
  const canon = classifyClaim(actionText, { story, state, turnIndex: state.turnIndex });
  const canonNote = directorNoteFor(canon, story);
  if (canonNote) {
    context.resolution.privateFacts.push({ visibility: 'SELF', fact: canonNote });
  }

  // Step 8 — the director plans presentation. It cannot change the resolution.
  clock.start('director');
  const plan = await deps.director.plan(context);
  clock.end('director');

  // Step 9 — the writer renders the plan.
  clock.start('writer');
  let narrative = await deps.writer.write(context, plan);
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
  clock.end('validate');

  // Step 12 — commit. Memory proposals are materialised only for the facts the
  // surviving prose actually supports.
  clock.start('commit');
  const commit = commitTurn({
    story,
    state,
    resolution,
    turnId,
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
