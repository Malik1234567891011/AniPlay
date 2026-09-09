import type {
  BeatPlan,
  BeatType,
  MediaPlan,
  MemoryProposal,
  OrderedBeat,
  SuggestedAction,
} from '@aniplay/contracts';
import { QUALITY_TIERS } from '@aniplay/contracts';
import { isSuccess, outcomeLabel, estimateRisk, attributeModifier } from '@aniplay/engine';
import type { TurnContext, PresentCharacterContext } from './context.js';
import { renderableFacts } from './writer.js';

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
      wordBudget: config.wordBudget,
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

function buildBeats(context: TurnContext, beatType: BeatType, speakerOrder: string[]): OrderedBeat[] {
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

  const stateChanges = resolution.mutations.filter(
    (m) => m.type === 'RESOURCE_DELTA' || m.type === 'ITEM_ADD' || m.type === 'ITEM_REMOVE',
  );
  if (stateChanges.length > 0) {
    beats.push({
      kind: 'STATE_REVEAL',
      factIds: stateChanges.map((m) => m.mutationId),
      instruction: 'Let the change be felt physically. The chip in the UI states the number; the prose states the cost.',
    });
  }

  return beats.slice(0, 10);
}

function narrationInstruction(context: TurnContext, beatType: BeatType): string {
  const base = [
    `Tone: ${context.toneGuide}`,
    `Place: ${context.scene.locationName}, ${context.scene.dayPart.toLowerCase()}.`,
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
function buildSuggestions(context: TurnContext): SuggestedAction[] {
  const { story, state, resolution } = context;
  const suggestions: SuggestedAction[] = [];
  const seen = new Set<string>();

  const push = (s: SuggestedAction): void => {
    if (suggestions.length >= 3 || seen.has(s.text)) return;
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
      const firstName = character.def.name.split(/\s+/)[0]!;
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

  if (speaker && opportunities.includes(`speak_to:${speaker.def.id}`)) {
    const firstName = speaker.def.name.split(/\s+/)[0]!;
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
  for (const opportunity of opportunities) {
    if (!opportunity.startsWith('use_ability:')) continue;
    const ability = story.abilities.find((a) => a.id === opportunity.slice('use_ability:'.length));
    if (!ability) continue;

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

    // Name the target. "Ember Palm — heat carried in the hand" is a glossary
    // entry; "Use Ember Palm on Tam" is a thing the player is about to do.
    const target =
      ability.targetRule === 'SELF' || ability.targetRule === 'NONE' ? null : context.presentCharacters[0];
    const opener = target ? `Use ${ability.name} on ${target.def.name.split(/\s+/)[0]}` : `Use ${ability.name}`;

    push({
      text: `${opener} — ${lowerFirst(ability.description.replace(/\.$/, ''))}.`.slice(0, 180),
      intentHint: `use_ability:${ability.id}`,
      risk,
      resourceCostLabel: costLabel,
    });
    break;
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

  const heroWorthy =
    beatType === 'REVEAL' ||
    beatType === 'CLIFFHANGER' ||
    resolution.checks.some((c) => c.outcome === 'CRITICAL_SUCCESS') ||
    resolution.mutations.some((m) => m.type === 'ENCOUNTER_START') ||
    // Arriving somewhere for the first time earns a frame. This used to test
    // the discovered list on projected state, where the arrival has already
    // been recorded, so the condition could never be true.
    firstVisit;

  const shotType = !heroWorthy
    ? ('NONE' as const)
    : beatType === 'COMBAT'
      ? ('ACTION' as const)
      : locationChanged
        ? ('ESTABLISHING' as const)
        : context.presentCharacters.length >= 2
          ? ('TWO_SHOT' as const)
          : beatType === 'REVEAL'
            ? ('REVEAL' as const)
            : ('MOMENT' as const);

  return {
    stageAction: locationChanged ? 'CHANGE_LOCATION' : expressionsChanged(expressions) ? 'CHANGE_VARIANT' : 'KEEP',
    activeCharacterIds: context.presentCharacters.slice(0, 3).map((c) => c.def.id),
    expressions,
    heroImage: {
      eligible: heroWorthy && config.heroImageEligible,
      reason: !config.heroImageEligible
        ? `${config.label} does not include hero frames`
        : heroWorthy
          ? `${beatType} beat earns a frame`
          : 'Ordinary beat; the persistent stage covers it',
      shotType: heroWorthy && config.heroImageEligible ? shotType : 'NONE',
    },
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

function pickExpression(character: PresentCharacterContext, context: TurnContext): string {
  const available = new Set(character.def.expressions);
  const pick = (...candidates: string[]): string =>
    candidates.find((c) => available.has(c)) ?? character.def.expressions[0] ?? 'neutral';

  const failed = context.resolution.checks.some((c) => !isSuccess(c.outcome));
  const critical = context.resolution.checks.some((c) => c.outcome === 'CRITICAL_SUCCESS');

  if (context.state.encounter) return pick('furious', 'alarmed', 'stern', 'serious');
  if (critical) return pick('delighted', 'amused', 'warm', 'grinning');
  if (failed) return pick('suspicious', 'wary', 'stern', 'shifty');
  if (character.relationship.fear > 50) return pick('alarmed', 'wary');
  if (character.relationship.rivalry > 45) return pick('stern', 'suspicious');
  if (character.relationship.affection > 45) return pick('warm', 'amused', 'delighted');
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
function proposeMemories(context: TurnContext): MemoryProposal[] {
  const proposals: MemoryProposal[] = [];
  const { resolution, state } = context;

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
