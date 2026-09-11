import type {
  BeatPlan,
  BeatType,
  MediaPlan,
  MemoryProposal,
  OrderedBeat,
  SuggestedAction,
} from '@aniplay/contracts';
import type { ReactionEmotion } from '@aniplay/contracts';
import { QUALITY_TIERS, shortName } from '@aniplay/contracts';
import { isSuccess, outcomeLabel, estimateRisk, attributeModifier } from '@aniplay/engine';
import type { TurnContext, PresentCharacterContext } from './context.js';
import { renderableFacts } from './writer.js';
import { detectCommitment } from '@aniplay/engine';

/**
 * Spec §16 — the director.
 *
 * It receives an immutable `Resolution` and decides how to *present* it. It may
 * not change an outcome, invent state, or reveal what an NPC cannot know
 * (§16.3). Every suggestion it offers is drawn from `resolution.newOpportunities`,
 * which the engine produced from state that actually exists.
 */

export interface Director {
  plan(context: TurnContext): Promise<BeatPlan>;
}

export class RuleBasedDirector implements Director {
  async plan(context: TurnContext): Promise<BeatPlan> {
    return this.planSync(context);
  }

  planSync(context: TurnContext): BeatPlan {
    const config = QUALITY_TIERS[context.tier];
    const beatType = chooseBeatType(context);
    const speakerOrder = chooseSpeakerOrder(context);
    const orderedBeats = buildBeats(context, beatType, speakerOrder);

    return {
      schemaVersion: '1.0',
      dramaticFocus: chooseDramaticFocus(context),
      beatType,
      orderedBeats,
      speakerOrder,
      reveals: chooseReveals(context),
      suggestedActions: buildSuggestions(context),
      mediaPlan: buildMediaPlan(context, beatType),
      memoryProposals: proposeMemories(context),
      arcUpdates: buildArcUpdates(context),
      wordBudget: beatBudget(context, config.wordBudget),
    };
  }
}

// --- Focus and beat type ---------------------------------------------------

function chooseDramaticFocus(context: TurnContext): string {
  const { resolution, presentCharacters, arc } = context;

  const rejected = resolution.normalizedActions.find(
    (a) => (a as { status?: string }).status === 'REJECTED',
  );
  if (rejected) return 'The attempt does not land. Show the world pushing back, in fiction, without naming rules.';

  const critical = resolution.checks.find((c) => c.outcome === 'CRITICAL_SUCCESS');
  if (critical) return `${critical.label} goes better than it had any right to. Let it land before anything complicates it.`;

  const complication = resolution.checks.find((c) => c.outcome === 'COMPLICATION');
  if (complication) return `${complication.label} fails and makes something worse. The consequence is the beat, not the failure.`;

  const partial = resolution.checks.find((c) => c.outcome === 'SUCCESS_WITH_COST');
  if (partial) return `${partial.label} works, but it costs. Show the price in the same breath as the win.`;

  const questMove = resolution.mutations.find((m) => m.type === 'QUEST_TRANSITION');
  if (questMove) return 'The objective shifts. Give the change weight before offering the next choice.';

  const relationshipMove = resolution.mutations.find((m) => m.type === 'RELATIONSHIP_DELTA');
  if (relationshipMove) {
    const character = presentCharacters.find((c) => c.def.id === relationshipMove.subjectId);
    return character
      ? `Something moves between you and ${character.def.name}. Play it in behaviour, not narration.`
      : 'A relationship shifts. Show it, do not state it.';
  }

  if (arc.pacingStage === 'ESCALATION') return 'Raise the pressure. Something the player has been putting off arrives.';
  if (arc.pacingStage === 'REST') return 'Let the scene breathe. This is a beat for character, not plot.';

  const speaker = context.presentCharacters[0];
  return speaker
    ? `${speaker.def.name} responds in their own interest. Keep them a person with somewhere else to be.`
    : 'The place itself is the beat. Give the player something concrete to act on.';
}

function chooseBeatType(context: TurnContext): BeatType {
  const { resolution, state, presentCharacters } = context;

  if (state.encounter) return 'COMBAT';
  if (resolution.mutations.some((m) => m.type === 'ENCOUNTER_START')) return 'COMBAT';
  if (resolution.mutations.some((m) => m.type === 'LOCATION_CHANGE')) return 'TRANSITION';
  if (resolution.mutations.some((m) => m.type === 'TIME_ADVANCE' && (m.payload as { minutes?: number }).minutes! >= 120)) {
    return 'REST';
  }
  if (context.arc.pacingStage === 'ESCALATION' && context.arc.tension > 0.75) return 'CLIFFHANGER';
  if (resolution.checks.length > 0 && presentCharacters.length === 0) return 'CHECK';
  if (resolution.mutations.some((m) => m.type === 'QUEST_TRANSITION')) return 'REVEAL';
  if (presentCharacters.length > 0) return 'DIALOGUE';
  return 'ACTION';
}

/**
 * Spec §16.2 — decide which NPC reacts first. Whoever the action targeted goes
 * first; otherwise the person with the most at stake does. People with somewhere
 * to be do not all pile in at once.
 */
function chooseSpeakerOrder(context: TurnContext): string[] {
  const { resolution, presentCharacters } = context;

  const targeted = new Set(
    resolution.mutations.filter((m) => m.type === 'RELATIONSHIP_DELTA').map((m) => m.subjectId),
  );

  const stake = (c: PresentCharacterContext): number => {
    let score = 0;
    if (targeted.has(c.def.id)) score += 100;
    score += Math.abs(c.relationship.trust) * 0.2;
    score += Math.abs(c.relationship.affection) * 0.2;
    score += c.relationship.rivalry * 0.3;
    score += c.relationship.fear * 0.15;
    score += c.revealableSecrets.length * 5;
    return score;
  };

  return [...presentCharacters]
    .sort((a, b) => stake(b) - stake(a) || a.def.id.localeCompare(b.def.id))
    // At most two speakers per beat; a crowd talking at once reads as noise.
    .slice(0, 2)
    .map((c) => c.def.id);
}

// --- Beats -----------------------------------------------------------------

/**
 * Whether a resource change actually leaves the player short.
 *
 * The threshold is a quarter of the bar, because that is roughly where a number
 * stops being flavour and starts being a constraint on the next decision. Below
 * it the player needs to know; above it, spending two points of energy on a
 * conversation is not news and should not cost a paragraph.
 *
 * Only for resources that run *down*. A world may define one where high is bad
 * (notoriety, corruption), and "you are running low on notoriety" is nonsense.
 */
const SHORT_FRACTION = 0.25;

function leavesPlayerShort(
  mutation: { payload: unknown },
  context: TurnContext,
): boolean {
  const payload = mutation.payload as { resourceId?: string; amount?: number } | undefined;
  if (!payload?.resourceId || (payload.amount ?? 0) >= 0) return false;
  const resource = context.player.resources.find((r) => r.id === payload.resourceId);
  if (!resource || resource.max <= 0 || resource.polarity !== 'GOOD_HIGH') return false;
  return resource.current / resource.max <= SHORT_FRACTION;
}

export function buildBeats(context: TurnContext, beatType: BeatType, speakerOrder: string[]): OrderedBeat[] {
  const { resolution } = context;
  const beats: OrderedBeat[] = [];

  if (resolution.checks.length > 0) {
    const check = resolution.checks[0]!;
    beats.push({
      kind: 'CHECK_REVEAL',
      factIds: [check.checkId],
      instruction: `Show the moment of ${check.label} resolving as ${outcomeLabel(check.outcome).toLowerCase()}. Do not name the die or the number.`,
    });
  }

  if (beatType === 'TRANSITION') {
    beats.push({
      kind: 'SCENE_TRANSITION',
      factIds: [],
      instruction: `Move to ${context.scene.locationName} in one or two sentences. Establish light, sound, and one specific detail.`,
    });
  }

  // A narration beat with nothing to narrate becomes filler ("nothing moves for
  // a moment") stapled to a beat that already said something. Only include it
  // when it has facts of its own, or when it is the only beat available.
  const hasFacts = renderableFacts(context).length > 0;
  if (hasFacts || beats.length === 0) {
    beats.push({
      kind: 'NARRATION',
      factIds: resolution.observableFacts.map((_, i) => `obs_${i}`),
      instruction: narrationInstruction(context, beatType),
    });
  }

  for (const speakerId of speakerOrder) {
    const character = context.presentCharacters.find((c) => c.def.id === speakerId);
    if (!character) continue;
    beats.push({
      kind: 'DIALOGUE',
      factIds: character.knownMemories.map((m) => m.fact.factId),
      instruction: dialogueInstruction(character, context),
    });
  }

  const questMutation = resolution.mutations.find((m) => m.type === 'QUEST_TRANSITION');
  if (questMutation) {
    beats.push({
      kind: 'QUEST_UPDATE',
      factIds: [questMutation.mutationId],
      instruction: 'Acknowledge the objective change in one clause inside the prose. Do not write a quest-log line.',
    });
  }

  // Things the player gained or lost that are worth a sentence.
  //
  // Items are: picking something up or losing it is an event. A resource tick
  // is not, and instructing the writer to dramatise one was the source of the
  // worst tic in the product. Across a 25-turn Nine Weeks run, six beats spent
  // their closing paragraph on stamina — *"you paid for the moment of courage
  // with something you won't get back tonight"*, then *"you're already tired,
  // like you've spent something you won't get back"* the very next turn — in a
  // romance world, at a bar, over a conversation. The writer was not being
  // florid. It was following this instruction, on every turn that spent
  // anything.
  //
  // The instruction's own premise had also gone stale: it promises "the chip in
  // the UI states the number", and the chips were removed. So nothing stated
  // the number and the prose stated the cost, every time.
  //
  // A resource still earns a beat when it crosses into territory the player
  // needs to act on — running out is a fact about what they can do next. Losing
  // two points of energy for asking a friend a question is not.
  const itemChanges = resolution.mutations.filter(
    (m) => m.type === 'ITEM_ADD' || m.type === 'ITEM_REMOVE',
  );
  const criticalResources = resolution.mutations.filter(
    (m) => m.type === 'RESOURCE_DELTA' && leavesPlayerShort(m, context),
  );
  const stateChanges = [...itemChanges, ...criticalResources];
  if (stateChanges.length > 0) {
    beats.push({
      kind: 'STATE_REVEAL',
      factIds: stateChanges.map((m) => m.mutationId),
      instruction:
        criticalResources.length > 0
          ? 'Something the player relies on has run low enough to matter. Say so once, in one clause, ' +
            'as a fact about what they can still do — not as a paragraph about being tired.'
          : 'Name what they gained or lost in one clause inside the prose. Do not write an inventory line.',
    });
  }

  return beats.slice(0, 10);
}

function narrationInstruction(context: TurnContext, beatType: BeatType): string {
  const base = [
    `Tone: ${context.toneGuide}`,
    // The clock, not just the part of day. "Afternoon" let a 4:44 PM beat open
    // "out into the dusk"; the header said 4:44 PM at the same moment.
    `Place: ${context.scene.locationName}, ${context.scene.clock} — ${context.scene.light}.`,
    'The clock above is what the player can see. Do not contradict it.',
  ];

  switch (beatType) {
    case 'COMBAT':
      base.push('Short sentences. Concrete positions. One clear opening for the player to exploit or lose.');
      break;
    case 'CLIFFHANGER':
      base.push('End on an unanswered question the player can act on next turn. Do not resolve it here.');
      break;
    case 'REST':
      base.push('Quiet. Let the player notice something they have been too busy to notice.');
      break;
    case 'REVEAL':
      base.push('Deliver exactly one new piece of information. Do not stack two revelations in one beat.');
      break;
    default:
      base.push('Ground the beat in one specific sensory detail rather than a general mood.');
  }

  if (context.resolution.privateFacts.length > 0) {
    base.push('Honour every constraint in privateFacts. If it says an attempt failed, it failed.');
  }
  return base.join(' ');
}

function dialogueInstruction(character: PresentCharacterContext, context: TurnContext): string {
  const parts = [
    `${character.def.name} speaks. Voice: ${character.def.speechStyle}`,
    `They currently read as: ${character.relationshipLabel}.`,
    `Their goal right now: ${character.def.goals[0] ?? 'get on with their day'}.`,
  ];

  // The thing an NPC is most likely to be written as having forgotten, stated
  // as an instruction rather than left in a list of retrieved facts for the
  // writer to notice. Turns later, and in a different room, this still holds.
  if (context.state.flags[`attacked:${character.def.id}`]) {
    parts.push(
      `The player attacked ${character.def.name} earlier. They have not forgotten and do not behave as ` +
        'though it did not happen. This governs their first line, whatever else is going on.',
    );
  }

  if (character.def.boundaries.length > 0) {
    parts.push(`They will not: ${character.def.boundaries.join('; ')}.`);
  }

  // Spec §16.3 / §14.5 — knowledge boundaries are stated as hard limits.
  const forbidden = character.def.secrets
    .filter((s) => !character.revealableSecrets.some((r) => r.id === s.id))
    .map((s) => s.id);
  if (forbidden.length > 0) {
    parts.push(`They do NOT reveal, hint at, or act on: ${forbidden.join(', ')}.`);
  }

  if (character.openGates.length > 0) {
    parts.push(`Now permitted with them: ${character.openGates.join(', ')}.`);
  }

  const failed = context.resolution.checks.some((c) => !isSuccess(c.outcome));
  if (failed) parts.push('They do not simply agree. The attempt on them did not work.');

  parts.push('One to three sentences. No therapy language, no constant praise, no smirking.');
  return parts.join(' ');
}

function chooseReveals(context: TurnContext): string[] {
  const reveals: string[] = [];
  for (const character of context.presentCharacters) {
    for (const secret of character.revealableSecrets) reveals.push(secret.id);
  }
  for (const mutation of context.resolution.mutations) {
    if (mutation.type === 'QUEST_TRANSITION') reveals.push(`quest:${mutation.subjectId}`);
  }
  return reveals;
}

// --- Suggestions -----------------------------------------------------------

/**
 * Spec §10.4 — suggestions come from valid engine opportunities, not generic
 * prose. Every one of these maps to an affordance the engine just confirmed
 * exists, so tapping one can never produce "you cannot do that".
 */
/** Verbs that all amount to "you talked to them this turn". */
const SOCIAL_VERBS = new Set(['speak', 'persuade', 'deceive', 'threaten', 'help', 'oppose', 'custom']);
const SOCIAL_HINTS = new Set(['persuade', 'speak_to', 'deceive', 'threaten']);

function buildSuggestions(context: TurnContext): SuggestedAction[] {
  const { story, state, resolution } = context;
  const suggestions: SuggestedAction[] = [];
  const seen = new Set<string>();

  // What the player just did, so it is not offered back to them.
  //
  // These are built from standing affordances — who is here, what is
  // affordable — which have no memory of the turn, so "Ask Dai about the five."
  // regenerated verbatim on the turn immediately after the player asked Dai
  // about the five, and read on screen as an unfinished task. The model path in
  // `responses.ts` does not have this problem because it writes from the beat;
  // this is the deterministic floor underneath it and it needs the same rule.
  //
  // Matched on the resolution rather than on the words, because the player
  // rarely uses the card's phrasing: "I ask Dai what the five were actually
  // like" and "Ask Dai about the five." share almost no vocabulary and are the
  // same move.
  const justDid = new Set(
    resolution.normalizedActions.flatMap((action) => {
      const a = action as {
        verb?: string;
        targetId?: string;
        locationId?: string;
        abilityId?: string;
        targets?: Array<{ entityType?: string; entityId?: string }>;
      };
      // The normalised shape carries the target either flat or in a list,
      // depending on which resolver produced it.
      const targetIds = [
        a.targetId,
        ...(a.targets ?? []).filter((t) => t.entityType === 'npc').map((t) => t.entityId),
      ].filter((id): id is string => !!id);

      const keys: string[] = [];
      // Every way of addressing somebody is the same move as far as "you just
      // did that" is concerned.
      for (const id of targetIds) {
        if (SOCIAL_VERBS.has(a.verb ?? '')) keys.push(`spoke:${id}`);
        if (a.verb === 'attack') keys.push(`attack:${id}`);
      }
      if (a.abilityId) keys.push(`use_ability:${a.abilityId}`);
      if (a.locationId) keys.push(`travel_to:${a.locationId}`);
      return keys;
    }),
  );

  const alreadyDone = (hint: string): boolean => {
    const [verb, id] = hint.split(':');
    if (!id) return false;
    if (SOCIAL_HINTS.has(verb ?? '')) return justDid.has(`spoke:${id}`);
    return justDid.has(hint);
  };

  const push = (s: SuggestedAction): void => {
    if (suggestions.length >= 3 || seen.has(s.text)) return;
    if (alreadyDone(s.intentHint)) return;
    seen.add(s.text);
    suggestions.push(s);
  };

  const opportunities = resolution.newOpportunities;

  // 1. Whoever is in the room and most relevant.
  const speaker = context.presentCharacters[0];

  // After violence the only social move available is a confrontation, and it
  // has to read like one.
  const confront = opportunities.find((o) => o.startsWith('confront:'));
  if (confront) {
    const character = context.presentCharacters.find((c) => c.def.id === confront.slice('confront:'.length));
    if (character) {
      const firstName = shortName(character.def.name);
      push({
        text: `Back off and let ${firstName} decide what happens next.`,
        intentHint: `wait:${character.def.id}`,
        risk: 'RISKY',
        resourceCostLabel: null,
      });
      push({
        text: `Keep going at ${firstName}.`,
        intentHint: `attack:${character.def.id}`,
        risk: 'EXTREME',
        resourceCostLabel: null,
      });
    }
  }

  // Somebody the player just hurt, without hitting them. An insult, a threat or
  // a flat refusal moves a relationship, and the very next thing offered should
  // not read as though the previous line never happened.
  const strained = resolution.mutations.find(
    (mutation) =>
      mutation.type === 'RELATIONSHIP_DELTA' &&
      // Trust and affection specifically: fear going up after a theft is the
      // same event as trust going down, and one chip should not fire twice.
      ['trust', 'affection'].includes(String((mutation.payload as { dimension?: string }).dimension)) &&
      Number((mutation.payload as { amount?: number }).amount ?? 0) < 0 &&
      context.presentCharacters.some((c) => c.def.id === mutation.subjectId),
  );
  if (strained) {
    const character = context.presentCharacters.find((c) => c.def.id === strained.subjectId);
    if (character && opportunities.includes(`speak_to:${character.def.id}`)) {
      const firstName = shortName(character.def.name);
      push({
        text: `Take it back to ${firstName}.`,
        intentHint: `persuade:${character.def.id}`,
        risk: 'RISKY',
        resourceCostLabel: null,
      });
      push({
        text: `Leave it where you left it.`,
        intentHint: `wait:${character.def.id}`,
        risk: 'SAFE',
        resourceCostLabel: null,
      });
    }
  }

  if (speaker && opportunities.includes(`speak_to:${speaker.def.id}`)) {
    const firstName = shortName(speaker.def.name);
    const topic = speaker.def.topics[0];
    // Authored topics read naturally; without one, fall back to a phrasing that
    // is grammatical for any character rather than splicing quest copy.
    const text = topic
      ? `Ask ${firstName} about ${topic}.`
      : speaker.relationshipLabel === 'Rival' || speaker.relationshipLabel === 'Hostile'
        ? `Press ${firstName} for a straight answer.`
        : `Ask ${firstName} what they actually know.`;
    push({
      text: text.slice(0, 180),
      intentHint: `persuade:${speaker.def.id}`,
      risk: 'SAFE',
      resourceCostLabel: null,
    });
  }

  // 2. An ability that is unlocked, affordable, and off cooldown.
  //
  // Three things were wrong with how this read. It always offered the *first*
  // eligible ability, so the same suggestion appeared verbatim turn after turn.
  // It aimed at `presentCharacters[0]`, which in a gym meant offering to drive
  // to the basket at the head coach. And it rendered as "Use Get Downhill —
  // put your shoulder past theirs and get to the rim before the help arrives",
  // which is a glossary entry with a verb bolted on.
  const eligibleAbilities = opportunities
    .filter((o) => o.startsWith('use_ability:'))
    .map((o) => story.abilities.find((a) => a.id === o.slice('use_ability:'.length)))
    .filter((a): a is NonNullable<typeof a> => !!a);

  // Rotate deterministically. A player who tried a drive last turn should be
  // shown something else this turn, and the same state must always produce the
  // same suggestion.
  const ability = eligibleAbilities[state.turnIndex % Math.max(1, eligibleAbilities.length)];

  if (ability) {
    const costLabel =
      ability.costs.length > 0
        ? ability.costs
            .map((c) => `${c.amount} ${story.resources.find((r) => r.id === c.resourceId)?.name ?? c.resourceId}`)
            .join(' · ')
        : null;

    const risk = ability.check
      ? estimateRisk(
          ability.check.baseDc,
          attributeModifier(state.player.attributes[ability.check.attribute] ?? 10) +
            (ability.check.skillId ? (state.player.skills[ability.check.skillId] ?? 0) : 0),
        )
      : 'SAFE';

    // Whoever this plausibly lands on: someone the player is already in it
    // with, then someone who has a reason to be opposite them, and only then
    // whoever happens to be standing here.
    const needsTarget = ability.targetRule !== 'SELF' && ability.targetRule !== 'NONE';
    const target = needsTarget ? preferredTarget(context) : null;

    // Affordances are already written as things a player would say — that is
    // what they are for — so the suggestion uses the player's words rather
    // than the system's name for the move.
    const phrase = ability.affordances[0] ?? lowerFirst(ability.name);
    const text = target
      ? `${capitalize(phrase)} — ${shortName(target.def.name)}`
      : capitalize(phrase);

    push({
      text: text.slice(0, 180),
      intentHint: `use_ability:${ability.id}`,
      risk,
      resourceCostLabel: costLabel,
    });
  }

  // 3. Somewhere to go that the objective points at.
  const objectiveQuest = context.activeQuests[0];
  for (const opportunity of opportunities) {
    if (!opportunity.startsWith('travel_to:')) continue;
    const locationId = opportunity.slice('travel_to:'.length);
    if (locationId === state.player.locationId) continue;
    const location = story.locations.find((l) => l.id === locationId);
    if (!location) continue;
    const relevant =
      !objectiveQuest ||
      story.quests
        .find((q) => q.id === objectiveQuest.id)
        ?.involvedLocationIds.includes(location.id);
    if (!relevant && suggestions.length >= 2) continue;
    push({
      text: `Head to ${location.name}.`,
      intentHint: `travel:${location.id}`,
      risk: 'SAFE',
      resourceCostLabel: null,
    });
    break;
  }

  // Fill any remaining slot with something always legal.
  if (suggestions.length < 3 && state.encounter) {
    push({
      text: 'Break away and put distance between you.',
      intentHint: 'encounter:disengage',
      risk: 'RISKY',
      resourceCostLabel: null,
    });
  }
  if (suggestions.length === 0) {
    push({
      text: 'Take a proper look around.',
      intentHint: 'inspect:surroundings',
      risk: 'SAFE',
      resourceCostLabel: null,
    });
  }

  return suggestions.slice(0, 3);
}

// --- Media -----------------------------------------------------------------

/**
 * Spec §19.8 / §3.6 — generated media is punctuation. A hero frame is earned by
 * a beat that deserves one, and only at tiers that include it.
 */
function buildMediaPlan(context: TurnContext, beatType: BeatType): MediaPlan {
  const config = QUALITY_TIERS[context.tier];
  const { resolution, state } = context;

  const locationChange = resolution.mutations.find((m) => m.type === 'LOCATION_CHANGE');
  const locationChanged = !!locationChange;
  const firstVisit = (locationChange?.payload as { firstVisit?: boolean } | undefined)?.firstVisit === true;

  const expressions: Record<string, string> = {};
  for (const character of context.presentCharacters) {
    expressions[character.def.id] = pickExpression(character, context);
  }

  const hero = heroImageDecision(context, beatType, { locationChanged, firstVisit }, expressions);

  return {
    stageAction: locationChanged ? 'CHANGE_LOCATION' : expressionsChanged(expressions) ? 'CHANGE_VARIANT' : 'KEEP',
    activeCharacterIds: context.presentCharacters.slice(0, 3).map((c) => c.def.id),
    expressions,
    heroImage: hero,
    voice: context.presentCharacters
      .filter((c) => c.def.voiceId)
      .map((c, index) => ({ blockIndex: index + 1, voiceId: c.def.voiceId! })),
    sfx: sfxFor(beatType, context),
    musicCue: musicFor(beatType, context),
  };
}

function lowerFirst(value: string): string {
  return value.length === 0 ? value : value[0]!.toLowerCase() + value.slice(1);
}

function expressionsChanged(expressions: Record<string, string>): boolean {
  return Object.values(expressions).some((e) => e !== 'neutral');
}

/**
 * Spec §19.7 — which cached face to show, decided in no time at all.
 *
 * The expression system already picked a mood from check outcomes and
 * relationship state; this maps that onto the fixed reaction vocabulary, so
 * the answer is always an asset that either exists or falls back cleanly to
 * the portrait. It must never be a model call: the whole value of a reaction
 * frame is that it is on screen while the prose is still being written.
 */
export function pickReactionEmotion(
  character: PresentCharacterContext,
  context: TurnContext,
): ReactionEmotion {
  const { resolution, state } = context;
  const said = `${context.playerAction}`.toLowerCase();

  // What the player did to them outweighs how they felt a moment ago.
  if (state.flags[`attacked:${character.def.id}`] || state.encounter) return 'angry';
  if (/\b(sorry|apolog|thank you|thanks)\b/.test(said)) return 'warm';
  if (/\b(love|beautiful|kiss|marry|gorgeous)\b/.test(said)) return 'surprised';
  if (/\b(kill|threaten|hurt|destroy|hate)\b/.test(said)) return 'angry';
  if (/\b(joke|funny|laugh|lol)\b/.test(said)) return 'amused';

  const rejected = resolution.normalizedActions.some(
    (a) => (a as { status?: string }).status === 'REJECTED',
  );
  if (rejected) return 'confused';

  if (resolution.checks.some((c) => c.outcome === 'CRITICAL_SUCCESS')) return 'surprised';
  if (resolution.checks.some((c) => c.outcome === 'COMPLICATION')) return 'worried';

  const rel = character.relationship;
  if (rel.fear > 40) return 'worried';
  if (rel.rivalry > 40) return 'annoyed';
  if (rel.affection > 40) return 'warm';
  if (rel.trust < -10) return 'annoyed';

  return 'neutral';
}

function pickExpression(character: PresentCharacterContext, context: TurnContext): string {
  const available = new Set(character.def.expressions);
  const pick = (...candidates: string[]): string =>
    candidates.find((c) => available.has(c)) ?? character.def.expressions[0] ?? 'neutral';

  const failed = context.resolution.checks.some((c) => !isSuccess(c.outcome));
  const critical = context.resolution.checks.some((c) => c.outcome === 'CRITICAL_SUCCESS');

  // How this character felt about *this turn*, not how they feel in general.
  //
  // The standing relationship used to be enough on its own, and it outranked
  // everything the beat had just done: Sasuke adores his brother, so his
  // affection sits above 45 permanently and every beat rendered him
  // `delighted` — including the one where Itachi talks past him, he says "You
  // talk to the air. You didn't eat", and the scene is plainly him being hurt.
  // A face that never changes is worse than no face, because it contradicts the
  // prose it is sitting next to.
  const moved = context.resolution.mutations
    .filter((m) => m.type === 'RELATIONSHIP_DELTA' && m.subjectId === character.def.id)
    .reduce((sum, m) => sum + Number((m.payload as { amount?: number }).amount ?? 0), 0);

  if (context.state.encounter) return pick('furious', 'alarmed', 'stern', 'serious');
  if (critical) return pick('delighted', 'amused', 'warm', 'grinning');
  if (failed) return pick('suspicious', 'wary', 'stern', 'shifty');
  // This turn hurt them, or pleased them.
  if (moved < 0) return pick('hurt', 'sulking', 'stern', 'wary', 'serious');
  if (moved > 0) return pick('warm', 'delighted', 'grinning', 'amused', 'eager');
  if (character.relationship.fear > 50) return pick('alarmed', 'wary', 'frightened');
  if (character.relationship.rivalry > 45) return pick('stern', 'suspicious');
  // Standing fondness is a resting face, not active glee: `delighted` has to be
  // earned by something that happened, or it is on screen every single turn.
  if (character.relationship.affection > 45) return pick('warm', 'amused');
  return pick('neutral');
}

function sfxFor(beatType: BeatType, context: TurnContext): string[] {
  const location = context.story.locations.find((l) => l.id === context.scene.locationId);
  const ambient = location?.ambientSfx ?? [];
  if (beatType === 'COMBAT') return [...ambient.slice(0, 1), 'impact'];
  if (beatType === 'TRANSITION') return [...ambient.slice(0, 2)];
  return ambient.slice(0, 1);
}

function musicFor(beatType: BeatType, context: TurnContext): string | null {
  switch (beatType) {
    case 'COMBAT':
      return 'tension_high';
    case 'CLIFFHANGER':
      return 'sting_unresolved';
    case 'REST':
      return 'quiet_warm';
    case 'REVEAL':
      return 'discovery';
    default:
      return context.arc.tension > 0.6 ? 'tension_low' : null;
  }
}

// --- Memory and arc --------------------------------------------------------

/**
 * Spec §16.2 — the director proposes memories. They are still validated and
 * stored by the engine layer, never written directly.
 */
/**
 * Social acts an NPC would carry with them, and how to say what happened.
 *
 * Described from the verb rather than from the player's own sentence: the raw
 * text is untrusted, and a memory is something the world asserts.
 */
const HOSTILE_VERBS: Record<string, string> = {
  threaten: 'threatened and belittled',
  deceive: 'lied to',
  oppose: 'refused and stood against',
};

function proposeMemories(context: TurnContext): MemoryProposal[] {
  const proposals: MemoryProposal[] = [];
  const { resolution, state } = context;

  // A promise, remembered by the person it was made to.
  //
  // "I am here, and I am not going anywhere" is not flavour in a story about a
  // brother who will be abandoned. It is the line he will quote back. Stored
  // NPC_PRIVATE at importance 1 so recency decay can never drop it: the whole
  // value of a promise is that it outlives the scene it was made in, and a
  // promise that ages out in six turns is worse than none, because the player
  // believes it was heard.
  //
  // The same detector the engine uses to create the obligation, called again
  // rather than reimplemented — one definition of what counts as a promise,
  // two things that care.
  const spokenThisTurn = context.playerDialogue.map((line) => line.text).join(' ');
  for (const speaker of context.presentCharacters) {
    const commitment = detectCommitment(spokenThisTurn, state, speaker.def);
    if (!commitment) continue;
    proposals.push({
      subjectId: speaker.def.id,
      predicate: 'was_promised_by_player',
      // Their words. A promise paraphrased is a promise that cannot be quoted.
      value: `${context.player.name} promised ${speaker.def.name}: "${commitment.what}" (${context.scene.worldTimeLabel})`,
      visibility: 'NPC_PRIVATE',
      importance: 1,
      sourceEventIds: [`commitment:${state.turnIndex}`],
    });
    // One promise, to the person it was made to. Everybody in the room hearing
    // it is a different fact and not this one.
    break;
  }

  for (const check of resolution.checks) {
    if (check.outcome === 'CRITICAL_SUCCESS' || check.outcome === 'COMPLICATION') {
      proposals.push({
        subjectId: 'player',
        predicate: 'notable_moment',
        value: `${check.label} — ${outcomeLabel(check.outcome)}`,
        visibility: 'WORLD_PUBLIC',
        importance: check.outcome === 'CRITICAL_SUCCESS' ? 0.7 : 0.75,
        sourceEventIds: [check.checkId],
      });
    }
  }

  // Spec §17.6 — violence is exactly the kind of event that must stay
  // retrievable. Without this, the relationship numbers move but nothing in the
  // NPC's own memory records *why*, and the reason decays out of the context
  // window within a few turns.
  for (const mutation of resolution.mutations) {
    if (mutation.reasonCode !== 'ATTACKED_BY_PLAYER' || mutation.type !== 'FLAG_SET') continue;
    const flag = String((mutation.payload as { flag?: string }).flag ?? '');
    const characterId = flag.startsWith('attacked:') ? flag.slice('attacked:'.length) : null;
    const character = context.story.characters.find((c) => c.id === characterId);
    if (!character) continue;

    proposals.push({
      subjectId: character.id,
      predicate: 'was_attacked_by_player',
      value: `${context.player.name} attacked ${character.name} at ${context.scene.locationName}, ${context.scene.worldTimeLabel}.`,
      // NPC_PRIVATE so it is retrieved for them specifically, and importance 1
      // so recency decay never drops it out of their context.
      visibility: 'NPC_PRIVATE',
      importance: 1,
      sourceEventIds: [mutation.mutationId],
    });
  }

  // The same, for aggression that never touches anybody.
  //
  // Only `ATTACKED_BY_PLAYER` was recorded, so in the four launch worlds where
  // `allowsCombat` is false the cruellest thing a player can do left no trace
  // at all: told in front of the whole company that they were a fraud, an NPC
  // moved two points of respect and remembered nothing, and greeted the player
  // warmly four turns later.
  const hostile = new Map<string, string>();
  for (const mutation of resolution.mutations) {
    if (mutation.type !== 'RELATIONSHIP_DELTA') continue;
    const verb = mutation.reasonCode.startsWith('SOCIAL:') ? mutation.reasonCode.split(':')[1] : null;
    if (!verb || !HOSTILE_VERBS[verb]) continue;
    hostile.set(mutation.subjectId, HOSTILE_VERBS[verb]!);
  }
  for (const [characterId, what] of hostile) {
    const character = context.story.characters.find((c) => c.id === characterId);
    if (!character) continue;
    proposals.push({
      subjectId: character.id,
      predicate: 'was_treated_badly_by_player',
      value: `${context.player.name} ${what} ${character.name} at ${context.scene.locationName}, ${context.scene.worldTimeLabel}.`,
      // Theirs specifically, and important enough that it does not decay out of
      // their context before the player comes back.
      visibility: 'NPC_PRIVATE',
      importance: 0.95,
      sourceEventIds: [],
    });
  }

  for (const mutation of resolution.mutations) {
    if (mutation.reasonCode === 'WITNESSED_VIOLENCE' && mutation.type === 'RELATIONSHIP_DELTA') {
      const witness = context.story.characters.find((c) => c.id === mutation.subjectId);
      if (witness) {
        proposals.push({
          subjectId: witness.id,
          predicate: 'witnessed_violence',
          value: `${witness.name} saw ${context.player.name} attack someone at ${context.scene.locationName}.`,
          visibility: 'NPC_PRIVATE',
          importance: 0.9,
          sourceEventIds: [mutation.mutationId],
        });
      }
    }
  }

  for (const mutation of resolution.mutations) {
    if (mutation.type === 'RELATIONSHIP_DELTA') {
      const character = context.story.characters.find((c) => c.id === mutation.subjectId);
      const payload = mutation.payload as { amount?: number; dimension?: string };
      const amount = payload.amount ?? 0;
      const dimension = payload.dimension ?? '';
      if (!character || Math.abs(amount) < 2) continue;

      // fear and rivalry rising are hostile movements even though the number
      // goes up. Treating any positive delta as warmth recorded "Kael warmed
      // toward the player" immediately after the player attacked him.
      const hostileDimension = dimension === 'fear' || dimension === 'rivalry';
      const warmer = hostileDimension ? amount < 0 : amount > 0;

      proposals.push({
        subjectId: character.id,
        predicate: warmer ? 'warmed_toward_player' : 'cooled_toward_player',
        value: mutation.reasonCode,
        visibility: 'PAIR_PRIVATE',
        importance: Math.min(0.9, 0.4 + Math.abs(amount) / 20),
        sourceEventIds: [mutation.mutationId],
      });
    }
    // How the player got somewhere is canon, and NPCs should know it. Whether
    // Mira covered for you or you forced the door changes every later scene.
    if (mutation.type === 'FLAG_SET' && mutation.reasonCode.startsWith('ROUTE_TAKEN:')) {
      const flag = String((mutation.payload as { flag?: string }).flag ?? '');
      if (flag.startsWith('route:')) {
        proposals.push({
          subjectId: 'player',
          predicate: 'route_taken',
          value: flag.slice('route:'.length),
          visibility: 'WORLD_PUBLIC',
          importance: 0.95,
          sourceEventIds: [mutation.mutationId],
        });
      }
    }

    if (mutation.type === 'QUEST_TRANSITION') {
      proposals.push({
        subjectId: mutation.subjectId,
        predicate: 'quest_state',
        value: (mutation.payload as { status?: string }).status ?? 'changed',
        visibility: 'PLAYER_PRIVATE',
        importance: 0.8,
        sourceEventIds: [mutation.mutationId],
      });
    }
    if (mutation.type === 'LOCATION_CHANGE' && mutation.subjectId === 'player') {
      const locationId = (mutation.payload as { locationId?: string }).locationId;
      if (locationId && !state.discoveredLocationIds.includes(locationId)) {
        proposals.push({
          subjectId: 'player',
          predicate: 'discovered_location',
          value: context.story.locations.find((l) => l.id === locationId)?.name ?? locationId,
          visibility: 'PLAYER_PRIVATE',
          importance: 0.6,
          sourceEventIds: [mutation.mutationId],
        });
      }
    }
  }

  return proposals;
}

/**
 * Spec §16.4 — promises move through stages so the story does not improvise
 * forever without anything becoming important.
 */
function buildArcUpdates(context: TurnContext): Array<Record<string, unknown>> {
  const updates: Array<Record<string, unknown>> = [];
  const { state, resolution } = context;

  const touchedIds = new Set([
    ...resolution.mutations.map((m) => m.subjectId),
    ...context.presentCharacters.map((c) => c.def.id),
  ]);

  const NEXT_STAGE: Record<string, string> = {
    SEEDED: 'DEVELOPED',
    DEVELOPED: 'ESCALATED',
    ESCALATED: 'PAYOFF_READY',
    PAYOFF_READY: 'PAID_OFF',
  };

  for (const promise of state.arc.promises) {
    const def = context.story.promises.find((p) => p.id === promise.promiseId);
    if (!def) continue;

    // A promise advances when this turn actually touched what it is about.
    const relevant =
      touchedIds.has(def.id) ||
      [...touchedIds].some((id) => def.seedHint.toLowerCase().includes(id.toLowerCase())) ||
      (def.kind === 'RELATIONSHIP' && context.presentCharacters.length > 0);

    if (!relevant) continue;
    if (state.turnIndex - promise.lastTouchedTurn < 3) continue;

    const next = NEXT_STAGE[promise.stage];
    if (!next) continue;

    updates.push({
      promiseId: promise.promiseId,
      stage: next,
      lastTouchedTurn: state.turnIndex,
      hint: next === 'PAYOFF_READY' || next === 'PAID_OFF' ? def.payoffHint : def.seedHint,
    });
  }

  return updates;
}

/**
 * Who an offensive or contested action should be aimed at.
 *
 * Not simply the first person in the room. A suggestion that offers to drive
 * past the head coach, or to threaten the person who just helped you, reads as
 * the game not knowing what is going on — so this prefers whoever the player
 * is actually in it with.
 */
function preferredTarget(context: TurnContext): TurnContext['presentCharacters'][number] | null {
  const present = context.presentCharacters;
  if (present.length === 0) return null;

  const engaged = present.find((c) => context.state.flags[`engaged:${c.def.id}`]);
  if (engaged) return engaged;

  const rival = [...present]
    .filter((c) => c.relationship.rivalry > 0)
    .sort((a, b) => b.relationship.rivalry - a.relationship.rivalry)[0];
  if (rival) return rival;

  return present[0] ?? null;
}

function capitalize(value: string): string {
  return value.length === 0 ? value : value[0]!.toUpperCase() + value.slice(1);
}


// --- How much writing this turn has earned ---------------------------------

/**
 * Spec §16.7 — length follows what happened, not what the player paid.
 *
 * `wordBudget` used to be a constant per quality tier: 60 for QUICK, 95 for
 * VIVID, 130 for CINEMATIC. So walking into a corridor and the death of a
 * major character got the same amount of writing, and a session read as a
 * uniform drip of eighty-word paragraphs regardless of whether anything
 * happened. Measured across a real Last Five session: every turn between 57
 * and 91 words, including the one where the coach first notices you.
 *
 * The tier now sets the middle of a range rather than the whole of it, and the
 * turn's own event density moves within it. Every signal below is something
 * the engine already decided, so nothing here is guesswork about importance —
 * it is a count of what actually occurred.
 *
 * The ceiling is 500 (`BeatPlan.wordBudget`), raised from 220 deliberately so
 * a death or a betrayal can be written at the length it deserves. Ordinary
 * play did not get longer when that number did: the multiplier below is a
 * count of what actually happened, and a quiet turn still lands near 60.
 */
export function beatBudget(context: TurnContext, tierBudget: number): number {
  const { resolution, arc } = context;

  let weight = 1;

  // Event density: how much of the world actually moved.
  const mutations = resolution.mutations.length;
  if (mutations === 0) weight -= 0.35;
  else if (mutations >= 6) weight += 0.35;
  else if (mutations >= 3) weight += 0.15;

  // A refusal, or an action that resolved to nothing, needs a sentence and not
  // a scene. This is the other half of the problem: trivial turns were
  // *over*-written just as reliably as important ones were under-written.
  const rejected = resolution.normalizedActions.some(
    (a) => (a as { status?: string }).status === 'REJECTED',
  );
  if (rejected) weight -= 0.3;

  // Outcomes that are worth describing properly.
  for (const check of resolution.checks) {
    if (check.outcome === 'CRITICAL_SUCCESS' || check.outcome === 'COMPLICATION') weight += 0.25;
  }

  // Things that only happen at real turning points.
  const reason = (code: string): boolean => resolution.mutations.some((m) => m.reasonCode.startsWith(code));
  if (resolution.mutations.some((m) => m.type === 'QUEST_TRANSITION')) weight += 0.3;
  if (resolution.mutations.some((m) => m.type === 'ENCOUNTER_START')) weight += 0.35;
  if (reason('KILLED_BY_PLAYER')) weight += 0.7;
  if (reason('CREW_DEPARTED') || reason('CREW_BETRAYAL')) weight += 0.4;
  if (reason('WORLD_EVENT')) weight += 0.25;
  if (reason('UNDERTAKING_BEGUN')) weight += 0.5;
  if (reason('ABILITY_UNLOCK') || reason('LEVEL_CHANGE')) weight += 0.25;

  // Meeting somebody for the first time is a scene; passing them again is not.
  const firstMeeting = context.presentCharacters.some(
    (c) => !context.state.flags[`met:${c.def.id}`],
  );
  if (firstMeeting) weight += 0.25;

  // Where the episode is. A rest beat should breathe; a consequence beat is
  // the thing the episode was building to.
  if (arc.pacingStage === 'CONSEQUENCE') weight += 0.3;
  else if (arc.pacingStage === 'ESCALATION') weight += 0.15;
  else if (arc.pacingStage === 'REST') weight -= 0.2;
  weight += (arc.tension - 0.5) * 0.3;

  // The player said something about themselves that the world now has to
  // absorb. That is worth the words.
  if (resolution.privateFacts.some((f) => f.fact.startsWith('The player has established'))) {
    weight += 0.4;
  }

  // The ceiling is 500 (raised from 220 with sign-off), and it is a ceiling
  // rather than a target: only a turn that has genuinely earned it gets near.
  // The multiplier is what decides, and it is a count of what happened.
  const budget = Math.round(tierBudget * Math.max(0.5, Math.min(2.6, weight)));
  return Math.max(30, Math.min(500, budget));
}


// --- When a frame from your anime appears ----------------------------------

/**
 * Spec §19.6 — image cadence.
 *
 * Two things were wrong. Hero frames were gated on quality tier, and the
 * default tier is VIVID, which had them switched off — so for the default
 * player, a product that calls itself Playable Anime never showed a single
 * image during play. And eligibility was a per-turn predicate with no memory,
 * so on the tiers that did have them a run of dramatic turns produced a
 * dramatic image every turn, which is how images stop meaning anything and
 * start costing a fortune.
 *
 * So: every tier gets frames, and the tier sets how often rather than whether.
 * A rhythm with a floor between frames, and a short list of things important
 * enough to ignore the floor — the moments a sports anime would cut to a still
 * of somebody's face.
 */

/**
 * Minimum turns between ordinary frames, by tier.
 *
 * Halved after a 25-turn Nine Weeks run produced **two** frames — turn 1 and
 * turn 10 — and none at all in the last fifteen. Vivid is the default tier, so
 * a spacing of 10 was the number most players would ever experience, and one
 * image per ten turns is not a product called Playable Anime.
 */
const HERO_SPACING: Record<string, number> = {
  QUICK: 8,
  VIVID: 5,
  CINEMATIC: 3,
  APEX: 2,
};

/** Nothing overrides the floor twice running. Even a death gets one frame. */
const HERO_HARD_FLOOR = 2;

export function heroImageDecision(
  context: TurnContext,
  beatType: BeatType,
  scene: { locationChanged: boolean; firstVisit: boolean },
  expressions: Record<string, string> = {},
): MediaPlan['heroImage'] {
  const { resolution, tier } = context;
  const since = context.turnsSinceHeroImage;
  const reason = (code: string): boolean => resolution.mutations.some((m) => m.reasonCode.startsWith(code));

  // Moments a story would cut to a still of. These skip the spacing rule,
  // because "the rival finally shows up" does not wait for a cooldown.
  const landmark =
    reason('KILLED_BY_PLAYER') ||
    reason('CREW_DEPARTED') ||
    reason('CREW_BETRAYAL') ||
    reason('UNDERTAKING_BEGUN') ||
    reason('ABILITY_UNLOCK') ||
    reason('CONTEST_RESULT') ||
    beatType === 'CLIFFHANGER' ||
    scene.firstVisit ||

    // Meeting somebody important for the first time.
    context.presentCharacters.some((c) => !context.state.flags[`met:${c.def.id}`] && c.def.cardBlurb !== '');

  // What counts as worth a frame.
  //
  // This list used to be REVEAL, CRITICAL_SUCCESS, ENCOUNTER_START and
  // QUEST_TRANSITION — every term a combat or quest event. Nine Weeks generates
  // none of them, ever, so in a romance or slice-of-life world the *only* road
  // to an image was `landmark`, which there reduces to "you walked into a new
  // room" or "you met somebody new". Once the player had seen the four
  // locations and met the cast, the world could never show them another
  // picture. It was not a gate that was slightly too tight; it was a gate with
  // no term a conversation world could satisfy.
  //
  // So: the events a *social* story is made of count too. Somebody's feeling
  // about you changing is that story's ENCOUNTER_START, and a refusal is its
  // boss fight — "real rejection" is a thing Nine Weeks promises on its own
  // world sheet. A visible change of expression counts as well: if the stage is
  // about to swap somebody's face, that is by definition a beat with a face in
  // it worth looking at. (`COMPLICATION` is this engine's other failure
  // outcome; there is no CRITICAL_FAILURE.)
  const socialTurn =
    resolution.mutations.some((m) => m.type === 'RELATIONSHIP_DELTA') ||
    resolution.checks.some((c) => c.outcome === 'FAILURE' || c.outcome === 'COMPLICATION') ||
    Object.values(expressions).some((e) => e !== 'neutral');

  const notable =
    beatType === 'REVEAL' ||
    resolution.checks.some((c) => c.outcome === 'CRITICAL_SUCCESS') ||
    resolution.mutations.some((m) => m.type === 'ENCOUNTER_START') ||
    resolution.mutations.some((m) => m.type === 'QUEST_TRANSITION') ||
    // Walking back into a room you know is worth a frame, but it waits its
    // turn. It sat in `landmark` for one build, and `landmark` bypasses the
    // spacing rule — so a player crossing the district four times got four
    // establishing shots, ten planned frames in fourteen turns, and a queue of
    // image jobs longer than the session. Seeing a place for the *first* time
    // is still a landmark; coming back to it is merely notable.
    scene.locationChanged ||
    socialTurn;

  const spacing = HERO_SPACING[tier] ?? 10;
  const spacedOut = since === null || since >= spacing;
  const floorClear = since === null || since >= HERO_HARD_FLOOR;

  const eligible = landmark ? floorClear : notable && spacedOut;

  if (!eligible) {
    return {
      eligible: false,
      reason:
        since !== null && since < HERO_HARD_FLOOR
          ? 'A frame appeared a moment ago; the stage carries this one.'
          : landmark || notable
            ? `Worth a frame, but only ${since} turns since the last one.`
            : 'Ordinary beat; the persistent stage covers it.',
      shotType: 'NONE',
    };
  }

  const shotType: MediaPlan['heroImage']['shotType'] =
    beatType === 'COMBAT'
      ? 'ACTION'
      : scene.locationChanged
        ? 'ESTABLISHING'
        : context.presentCharacters.length >= 2
          ? 'TWO_SHOT'
          : beatType === 'REVEAL'
            ? 'REVEAL'
            : 'MOMENT';

  return {
    eligible: true,
    reason: landmark ? `${beatType} beat is a landmark and earns a frame` : `${beatType} beat earns a frame`,
    shotType,
  };
}
