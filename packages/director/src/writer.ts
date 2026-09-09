import type {
  BeatPlan,
  NarrativeBlock,
  NarrativeTurn,
  StateDeltaPresentation,
} from '@aniplay/contracts';
import { SeededRng, isSuccess, outcomeLabel } from '@aniplay/engine';
import type { PresentCharacterContext, TurnContext } from './context.js';

/**
 * Spec §17.1 step 9 — the writer.
 *
 * It renders the beat plan into prose. It is the *last* stage and the least
 * authoritative: by the time it runs, every outcome is already decided and every
 * constraint is already in `privateFacts`.
 *
 * `TemplateWriter` is the offline implementation. It composes from the story's
 * own authored material — location descriptions, NPC voice samples, speech
 * style — rather than inventing text, so it is coherent and in-voice without a
 * model. `ModelWriter` produces richer prose when a gateway is configured; both
 * are held to the same validator.
 */

export interface Writer {
  write(context: TurnContext, plan: BeatPlan): Promise<NarrativeTurn>;
}

/**
 * Lines already spoken in the recent transcript. An NPC repeating the same
 * authored line three scenes running is the clearest tell that nobody is home,
 * so recently-used samples are demoted.
 */
function recentlySpoken(context: TurnContext): Set<string> {
  const spoken = new Set<string>();
  for (const turn of context.recentTurns) {
    for (const line of turn.sceneSummary.split('\n')) spoken.add(line.trim());
  }
  return spoken;
}

export class TemplateWriter implements Writer {
  async write(context: TurnContext, plan: BeatPlan): Promise<NarrativeTurn> {
    return this.writeSync(context, plan);
  }

  writeSync(context: TurnContext, plan: BeatPlan): NarrativeTurn {
    // Seeded from the turn so the same turn always renders the same prose.
    const rng = new SeededRng(`${context.resolution.turnId}:writer`);
    const blocks: NarrativeBlock[] = [];
    const usedLines = recentlySpoken(context);

    // The player's own line opens the beat. Without it the transcript reads as
    // NPCs replying to nothing.
    for (const line of context.playerDialogue) {
      blocks.push({
        type: 'DIALOGUE',
        speakerId: 'player',
        text: line.text,
        visibility: line.visibility,
        voiceEligible: false,
      });
    }

    for (const beat of plan.orderedBeats) {
      switch (beat.kind) {
        case 'CHECK_REVEAL': {
          const check = context.resolution.checks[0];
          if (check) {
            blocks.push({
              type: 'NARRATION',
              speakerId: null,
              text: checkSentence(context, rng),
              visibility: 'GROUP',
              voiceEligible: false,
            });
          }
          break;
        }
        case 'SCENE_TRANSITION':
          blocks.push({
            type: 'NARRATION',
            speakerId: null,
            text: transitionSentence(context, rng),
            visibility: 'GROUP',
            voiceEligible: false,
          });
          break;
        case 'NARRATION':
          blocks.push({
            type: 'NARRATION',
            speakerId: null,
            text: narrationSentence(context, rng),
            visibility: 'GROUP',
            voiceEligible: false,
          });
          break;
        case 'DIALOGUE': {
          const npcLinesSoFar = blocks.filter(
            (b) => b.type === 'DIALOGUE' && b.speakerId !== 'player',
          ).length;
          const speakerId = plan.speakerOrder[npcLinesSoFar];
          const character = context.presentCharacters.find((c) => c.def.id === speakerId);
          if (character) {
            blocks.push({
              type: 'DIALOGUE',
              speakerId: character.def.id,
              text: dialogueLine(character, context, rng, usedLines),
              visibility: 'GROUP',
              voiceEligible: character.def.voiceId !== null,
            });
          }
          break;
        }
        case 'QUEST_UPDATE':
        case 'STATE_REVEAL':
          // Presented as chips rather than prose; §10.7 keeps the beat readable.
          break;
      }
    }

    if (blocks.length === 0) {
      blocks.push({
        type: 'NARRATION',
        speakerId: null,
        text: narrationSentence(context, rng),
        visibility: 'GROUP',
        voiceEligible: false,
      });
    }

    const finalBlocks = trimToBudget(blocks, plan.wordBudget);

    return {
      schemaVersion: '1.0',
      // Spoken lines are appended so the next turn can avoid repeating them.
      sceneSummary: [
        sceneSummary(context),
        ...finalBlocks.filter((b) => b.type === 'DIALOGUE').map((b) => b.text),
      ]
        .join('\n')
        .slice(0, 320),
      blocks: finalBlocks,
      stateDeltaPresentation: buildDeltas(context),
      endStatePrompt: endPrompt(context, rng),
    };
  }
}

/**
 * Observable facts the writer will actually render. A travel fact is redundant
 * once a transition beat has staged the arrival, and the director consults this
 * too so it does not schedule a narration beat with nothing left to say.
 */
export function renderableFacts(context: TurnContext): string[] {
  const arrivalStaged = context.resolution.mutations.some((m) => m.type === 'LOCATION_CHANGE');
  return context.resolution.observableFacts.filter(
    (f) => f.trim().length > 0 && !(arrivalStaged && /^You travel to /.test(f)),
  );
}

// --- Sentence construction -------------------------------------------------

/**
 * The check reveal.
 *
 * Templates here used to be interchangeable — "it works, and it takes something
 * from you on the way past" describes opening a door, telling a lie, and losing
 * a fistfight equally well, which means it describes nothing. Each line now
 * names the attempt, and the concrete cost is carried by the delta chips beside
 * it rather than left as "something".
 */
function checkSentence(context: TurnContext, rng: SeededRng): string {
  const check = context.resolution.checks[0]!;
  const attempt = check.label.toLowerCase();

  const templates: Record<string, string[]> = {
    CRITICAL_SUCCESS: [
      `The ${attempt} lands better than it had any right to.`,
      `The ${attempt} works, and then keeps working.`,
    ],
    CLEAN_SUCCESS: [`The ${attempt} works.`, `The ${attempt} goes through without trouble.`],
    SUCCESS: [
      `The ${attempt} works, barely. You feel how close it was.`,
      `The ${attempt} holds. You would not want to try it twice.`,
    ],
    SUCCESS_WITH_COST: [
      `The ${attempt} works, and it costs you.`,
      `The ${attempt} gets you there, and you pay for it on the way through.`,
    ],
    FAILURE: [
      `The ${attempt} does not work.`,
      `The ${attempt} comes to nothing.`,
    ],
    COMPLICATION: [
      `The ${attempt} fails, and it fails loudly.`,
      `The ${attempt} comes apart, and someone notices that you tried.`,
    ],
  };

  const base = rng.pick(templates[check.outcome] ?? templates.FAILURE!);

  // Spec §10.6 — the maths only appears when the story opts into it.
  return context.story.rules.revealExactDc
    ? `${base} (${check.label} · ${outcomeLabel(check.outcome)})`
    : base;
}

function transitionSentence(context: TurnContext, rng: SeededRng): string {
  const location = context.story.locations.find((l) => l.id === context.scene.locationId);
  if (!location) return `You arrive.`;

  // The authored description is the spine; the frame varies so arrivals do not
  // read identically every time.
  const first = location.description.split(/(?<=\.)\s+/)[0] ?? location.description;
  const frames = [
    `${first}`,
    `${context.scene.dayPart} in ${location.name}. ${first}`,
    `You come out into ${location.name}. ${first}`,
  ];
  return rng.pick(frames);
}

function narrationSentence(context: TurnContext, rng: SeededRng): string {
  const parts: string[] = [];

  // Only observable facts may be rendered. `privateFacts` are directives to the
  // writer, not prose — rendering one would show the player a stage instruction.
  const facts = renderableFacts(context);
  if (facts.length > 0) {
    parts.push(facts.slice(0, 2).join(' '));
  }

  if (parts.length === 0) {
    const location = context.story.locations.find((l) => l.id === context.scene.locationId);
    const detail = location?.description.split(/(?<=\.)\s+/).slice(1).join(' ') || location?.description || '';
    // With someone in the room the beat is about them; an empty room gets the
    // place itself. "Nothing moves for a moment" beside a waiting NPC reads wrong.
    const witness = context.presentCharacters[0];
    const openers = witness
      ? [
          `${witness.def.name.split(/\s+/)[0]} waits you out.`,
          `${witness.def.name.split(/\s+/)[0]} has not moved.`,
          `The pause goes on a beat longer than it should.`,
        ]
      : [
          `The ${context.scene.dayPart.toLowerCase()} keeps going without you.`,
          `Nothing moves for a moment.`,
          `You have a beat to yourself.`,
        ];
    parts.push(`${rng.pick(openers)} ${detail}`.trim());
  }

  if (context.state.encounter) {
    const enemies = context.state.encounter.participants.filter((p) => p.team === 'ENEMY' && !p.downed);
    if (enemies.length > 0) {
      parts.push('There is no room here to think twice.');
    }
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim().slice(0, 1200);
}

/**
 * Picks the authored voice sample that best fits the moment, so NPC dialogue
 * stays in the voice the creator wrote rather than drifting into generic warmth.
 */
function dialogueLine(
  character: PresentCharacterContext,
  context: TurnContext,
  rng: SeededRng,
  used: Set<string>,
): string {
  const samples = character.def.voiceSamples;
  if (samples.length === 0) {
    return `${character.def.name} looks at you and decides not to answer.`;
  }

  const failed = context.resolution.checks.some((c) => !isSuccess(c.outcome));
  const hostile = character.relationship.rivalry > 40 || character.relationship.fear > 50;

  const scored = samples.map((line) => {
    let score = 0;
    const lower = line.toLowerCase();
    if (failed && /(do not|don't|no|cannot|can't|not)\b/.test(lower)) score += 3;
    if (!failed && /(can|will|give|let)/.test(lower)) score += 2;
    if (hostile && /(move|log|delay|not)/.test(lower)) score += 2;
    if (context.state.encounter && /(move|do not|now)/.test(lower)) score += 2;
    // Heavy penalty for anything said recently, so the cast does not loop.
    if (used.has(line)) score -= 10;
    return { line, score };
  });

  const best = Math.max(...scored.map((s) => s.score));
  const candidates = scored.filter((s) => s.score === best).map((s) => s.line);
  const chosen = rng.pick(candidates);
  used.add(chosen);
  return chosen;
}

function sceneSummary(context: TurnContext): string {
  const people = context.presentCharacters.map((c) => c.def.name);
  const who =
    people.length === 0
      ? 'Alone'
      : people.length === 1
        ? `${people[0]} is here`
        : `${people.slice(0, -1).join(', ')} and ${people.at(-1)} are here`;
  return `${context.scene.locationName}, ${context.scene.dayPart.toLowerCase()}. ${who}.`.slice(0, 320);
}

/**
 * Spec §10.7 — chips carry the numbers so prose does not have to, capped at the
 * three that matter most.
 */
function buildDeltas(context: TurnContext): StateDeltaPresentation[] {
  const deltas: StateDeltaPresentation[] = [];

  for (const mutation of context.resolution.mutations) {
    const p = mutation.payload as Record<string, unknown>;
    switch (mutation.type) {
      case 'RESOURCE_DELTA': {
        const def = context.story.resources.find((r) => r.id === p.resourceId);
        const amount = Number(p.amount ?? 0);
        if (!def || amount === 0) break;
        deltas.push({
          mutationId: mutation.mutationId,
          label: `${amount > 0 ? '+' : ''}${Math.round(amount)} ${def.name}`,
          priority: 1,
        });
        break;
      }
      case 'QUEST_TRANSITION': {
        const quest = context.story.quests.find((q) => q.id === mutation.subjectId);
        deltas.push({
          mutationId: mutation.mutationId,
          label: `${quest?.title ?? 'Objective'} updated`,
          priority: 2,
        });
        break;
      }
      case 'ITEM_ADD':
      case 'ITEM_REMOVE': {
        const item = context.story.items.find((i) => i.id === p.itemId);
        if (!item) break;
        deltas.push({
          mutationId: mutation.mutationId,
          label: `${mutation.type === 'ITEM_ADD' ? 'Gained' : 'Lost'} ${item.name}`,
          priority: 3,
        });
        break;
      }
      case 'RELATIONSHIP_DELTA': {
        const character = context.story.characters.find((c) => c.id === mutation.subjectId);
        const amount = Number(p.amount ?? 0);
        if (!character || amount === 0) break;
        deltas.push({
          mutationId: mutation.mutationId,
          label: `${character.name.split(' ')[0]} ${amount > 0 ? 'warms' : 'cools'}`,
          priority: 4,
        });
        break;
      }
      case 'FACTION_DELTA': {
        const faction = context.story.factions.find((f) => f.id === mutation.subjectId);
        if (!faction) break;
        deltas.push({
          mutationId: mutation.mutationId,
          label: `${faction.name} standing changed`,
          priority: 5,
        });
        break;
      }
      case 'STATUS_ADD':
        deltas.push({
          mutationId: mutation.mutationId,
          label: `${String(p.label ?? 'Status')} applied`,
          priority: 1,
        });
        break;
      default:
        break;
    }
  }

  return deltas.sort((a, b) => a.priority - b.priority).slice(0, 8);
}

function endPrompt(context: TurnContext, rng: SeededRng): string {
  if (context.state.encounter) return rng.pick(['What do you do?', 'No time. Move.', 'Your move.']);
  if (context.presentCharacters.length > 0) {
    return rng.pick(['How do you respond?', 'What do you say?', 'What do you do?']);
  }
  return rng.pick(['What do you do?', 'Say or do anything…', 'Where do you go?']);
}

/**
 * Spec §10.5 — target 35–90 visible words. Overflow is dropped rather than
 * truncated mid-sentence, so a beat always ends where a sentence does.
 */
function trimToBudget(blocks: NarrativeBlock[], wordBudget: number): NarrativeBlock[] {
  const out: NarrativeBlock[] = [];
  let used = 0;
  for (const block of blocks) {
    const words = block.text.split(/\s+/).filter(Boolean).length;
    if (used > 0 && used + words > wordBudget) break;
    out.push(block);
    used += words;
  }
  return out.length > 0 ? out : blocks.slice(0, 1);
}
