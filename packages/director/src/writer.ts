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
            const line = dialogueLine(character, context, rng, usedLines);
            blocks.push({
              type: line.isSpeech ? 'DIALOGUE' : 'NARRATION',
              speakerId: line.isSpeech ? character.def.id : null,
              text: line.text,
              visibility: 'GROUP',
              voiceEligible: line.isSpeech && character.def.voiceId !== null,
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

  // The attempt is named as its own clause. Splicing the label into a sentence
  // produced things like "the strike kael ostrand comes to nothing", because
  // labels are verb phrases, not nouns.
  const outcomes: Record<string, string[]> = {
    CRITICAL_SUCCESS: [
      'It lands better than it had any right to.',
      'It works, and then keeps working.',
    ],
    CLEAN_SUCCESS: ['It works.', 'It goes through without trouble.'],
    SUCCESS: ['It works, barely. You feel how close it was.', 'It holds. You would not want to try that twice.'],
    SUCCESS_WITH_COST: ['It works, and it costs you.', 'It gets you there, and you pay on the way through.'],
    FAILURE: ['It does not work.', 'It comes to nothing.'],
    COMPLICATION: ['It fails, and it fails loudly.', 'It comes apart, and someone notices that you tried.'],
  };

  const base = `${check.label}. ${rng.pick(outcomes[check.outcome] ?? outcomes.FAILURE!)}`;

  // Spec §10.6 — the maths only appears when the story opts into it.
  return context.story.rules.revealExactDc ? `${base} (${outcomeLabel(check.outcome)})` : base;
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
    // A fact that explains a number on a chip must never be the one that gets
    // trimmed: "-5 Health" with no stated cause is exactly the failure this
    // whole pass is about.
    const explainsACost = (fact: string): boolean => /\bcosts? you\b|\brises by\b|\bleaves you\b/i.test(fact);
    const ordered = [...facts].sort(
      (a, b) => Number(explainsACost(b)) - Number(explainsACost(a)),
    );
    parts.push(ordered.slice(0, 3).join(' '));
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
interface SpokenOrObserved {
  readonly text: string;
  /** False when the line describes a reaction rather than quoting one. */
  readonly isSpeech: boolean;
}

function dialogueLine(
  character: PresentCharacterContext,
  context: TurnContext,
  rng: SeededRng,
  used: Set<string>,
): SpokenOrObserved {
  const samples = character.def.voiceSamples;
  if (samples.length === 0) {
    return { text: `${character.def.name} looks at you and decides not to answer.`, isSpeech: false };
  }

  const failed = context.resolution.checks.some((c) => !isSuccess(c.outcome));
  const hostile = character.relationship.rivalry > 40 || character.relationship.fear > 50;

  // After violence, an authored voice sample written for an ordinary scene is
  // actively wrong — a quartermaster's running joke does not survive watching a
  // fistfight. When nothing in their repertoire fits, describe the reaction
  // instead of quoting a line that contradicts the moment.
  const violence = context.resolution.mutations.some(
    (m) => m.reasonCode === 'ATTACKED_BY_PLAYER' || m.reasonCode === 'WITNESSED_VIOLENCE',
  );
  if (violence) {
    const firstName = character.def.name.split(/\s+/)[0]!;
    const wasAttacked = context.resolution.mutations.some(
      (m) => m.reasonCode === 'ATTACKED_BY_PLAYER' && m.subjectId === character.def.id,
    );

    // The person who was hit gets a line, because they are in the exchange.
    // Everyone else is a bystander, and a bystander quoting their usual patter
    // reads as though the fight is not happening.
    if (!wasAttacked) {
      // The story declares each character's pronouns; a described reaction has
      // to use them.
      const possessive = possessivePronoun(character.def.pronouns);
      return {
        text: rng.pick([
          `${firstName} is on ${possessive} feet and backing away.`,
          `${firstName} says nothing at all, which is worse.`,
          `${firstName} is already moving toward the door.`,
        ]),
        isSpeech: false,
      };
    }

    // An authored line that is already a command fits a fight exactly.
    const commands = samples.filter((line) =>
      /\b(do not move|don't move|stop|get back|enough|stay (?:down|there))\b/i.test(line),
    );
    if (commands.length > 0) {
      const unused = commands.filter((l) => !used.has(l));
      const chosen = rng.pick(unused.length > 0 ? unused : commands);
      used.add(chosen);
      return { text: chosen, isSpeech: true };
    }
    return { text: `${firstName} has stopped talking.`, isSpeech: false };
  }

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
  return { text: chosen, isSpeech: true };
}

/** "she/her" → "her", "they/them" → "their". Falls back to they/them. */
function possessivePronoun(pronouns: string): string {
  const subject = pronouns.split('/')[0]?.trim().toLowerCase();
  switch (subject) {
    case 'he':
      return 'his';
    case 'she':
      return 'her';
    case 'it':
      return 'its';
    default:
      return 'their';
  }
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
      case 'RELATIONSHIP_DELTA':
        // Aggregated below: one chip per person, not one per dimension.
        break;
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

  // Spec §10.7 — one chip per person, describing the change a player would
  // actually notice. A single attack moves five dimensions at once, and five
  // chips that disagree with each other ("Kael warms", "Kael cools") is worse
  // than no chip at all.
  const byCharacter = new Map<string, { mutationId: string; totals: Record<string, number> }>();
  for (const mutation of context.resolution.mutations) {
    if (mutation.type !== 'RELATIONSHIP_DELTA') continue;
    const p = mutation.payload as { dimension?: string; amount?: number };
    const amount = Number(p.amount ?? 0);
    if (amount === 0 || !p.dimension) continue;

    const entry = byCharacter.get(mutation.subjectId) ?? {
      mutationId: mutation.mutationId,
      totals: {} as Record<string, number>,
    };
    entry.totals[p.dimension] = (entry.totals[p.dimension] ?? 0) + amount;
    byCharacter.set(mutation.subjectId, entry);
  }

  for (const [characterId, entry] of byCharacter) {
    const character = context.story.characters.find((c) => c.id === characterId);
    if (!character) continue;
    const firstName = character.name.split(' ')[0]!;
    const { trust = 0, affection = 0, respect = 0, fear = 0, rivalry = 0 } = entry.totals;

    // Report the dimension that moved most, because that is what the player
    // would actually perceive.
    const label =
      fear >= 5 && fear >= rivalry
        ? `${firstName} is afraid of you`
        : rivalry >= 5
          ? `${firstName} turns on you`
          : trust + affection + respect <= -6
            ? `${firstName} closes off`
            : trust + affection + respect >= 4
              ? `${firstName} warms to you`
              : `${firstName} reconsiders you`;

    deltas.push({ mutationId: entry.mutationId, label, priority: 4 });
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
