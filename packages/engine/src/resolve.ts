import type {
  AbilityDef,
  ActionIntent,
  AttributeKey,
  CheckResult,
  GameState,
  IntentAction,
  PrivateFact,
  Resolution,
  StateMutation,
  StoryVersion,
} from '@aniplay/contracts';
import { SeededRng } from './rng.js';
import { attributeModifier, isSuccess, resolveCheck, DC_BANDS } from './check.js';
import {
  charactersPresent,
  countItem,
  effectiveAttribute,
  equipmentSkillModifier,
  getRelationship,
} from './state.js';
import { TIME_COST_MINUTES, type TimeCostCategory } from './clock.js';
import { clampRelationshipDelta, type EventSeverity, type RelationshipDimension } from './relationships.js';
import { buildEncounter, canSpend, newTurnEconomy, spend, type ActionWeight, type TurnEconomy } from './combat.js';
import { resolveNpcTurns } from './npc-turns.js';
import { applyMutations, validateMutations } from './mutations.js';

/**
 * Spec §32.4 `resolveIntent` — the deterministic core.
 *
 * Given a story version, a state snapshot, a validated intent, and a seed, this
 * returns the same `Resolution` every time. It is the only thing in the system
 * allowed to decide what happened; everything downstream only describes it.
 */

export interface ResolveOptions {
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly intent: ActionIntent;
  readonly turnId: string;
  readonly seed: string;
}

interface ActionOutcome {
  readonly checks: CheckResult[];
  readonly mutations: StateMutation[];
  readonly observableFacts: string[];
  readonly privateFacts: PrivateFact[];
  readonly timeCategory: TimeCostCategory;
  readonly travelMinutes?: number;
  /** Set to 0 for refusals: nothing happened, so no world time passes. */
  readonly overrideMinutes?: number;
  readonly normalized: Record<string, unknown>;
}

/** Which attribute a verb leans on when the intent does not name an ability. */
const VERB_ATTRIBUTE: Record<string, AttributeKey> = {
  move: 'agility',
  travel: 'agility',
  hide: 'agility',
  steal: 'agility',
  attack: 'might',
  defend: 'resolve',
  persuade: 'presence',
  deceive: 'presence',
  threaten: 'presence',
  speak: 'presence',
  inspect: 'mind',
  interact: 'mind',
  use_item: 'mind',
  use_ability: 'arcana',
  help: 'presence',
  oppose: 'resolve',
  rest: 'resolve',
  wait: 'resolve',
  custom: 'mind',
};

const VERB_TIME: Record<string, TimeCostCategory> = {
  move: 'INSTANT',
  speak: 'BRIEF',
  persuade: 'BRIEF',
  deceive: 'BRIEF',
  threaten: 'BRIEF',
  inspect: 'BRIEF',
  use_item: 'INSTANT',
  use_ability: 'INSTANT',
  attack: 'INSTANT',
  defend: 'INSTANT',
  hide: 'BRIEF',
  steal: 'BRIEF',
  interact: 'BRIEF',
  travel: 'TRAVEL',
  rest: 'REST',
  help: 'BRIEF',
  oppose: 'BRIEF',
  wait: 'BRIEF',
  custom: 'BRIEF',
};

const VERB_WEIGHT: Record<string, ActionWeight> = {
  attack: 'MAJOR',
  use_ability: 'MAJOR',
  steal: 'MAJOR',
  persuade: 'MAJOR',
  deceive: 'MAJOR',
  threaten: 'MAJOR',
  defend: 'MINOR',
  use_item: 'MINOR',
  hide: 'MINOR',
  interact: 'MINOR',
  inspect: 'MINOR',
  move: 'MOVE',
  travel: 'MOVE',
  speak: 'FREE',
  wait: 'FREE',
  help: 'MINOR',
  oppose: 'MINOR',
  rest: 'MAJOR',
  custom: 'MAJOR',
};

/** Verbs where a near miss can land as a partial rather than a flat failure (§12.5). */
const PARTIAL_CAPABLE = new Set([
  'persuade',
  'deceive',
  'steal',
  'hide',
  'inspect',
  'interact',
  'travel',
  'use_ability',
  'custom',
  'move',
]);

export function resolveIntent(options: ResolveOptions): Resolution {
  const { story, state, intent, turnId, seed } = options;
  const rng = new SeededRng(seed, state.rngCursor);

  const checks: CheckResult[] = [];
  const mutations: StateMutation[] = [];
  const observableFacts: string[] = [];
  const privateFacts: PrivateFact[] = [];
  const normalizedActions: Record<string, unknown>[] = [];
  let totalMinutes = 0;

  let mutationCounter = 0;
  const nextMutationId = (): string => `mut_${turnId}_${mutationCounter++}`;

  const economy = newTurnEconomy();
  const deferred: string[] = [];

  // A declaration the player cannot settle in one action is refused as stated,
  // before any dice are rolled. Otherwise a lucky roll burns down the setting.
  if (intent.unsafeOrMetaRequests?.includes('out_of_scope')) {
    return {
      schemaVersion: '1.0',
      turnId,
      valid: true,
      invalidReason: null,
      normalizedActions: [{ verb: intent.actions[0]?.verb ?? 'custom', status: 'REJECTED', reason: 'OUT_OF_SCOPE' }],
      checks: [],
      mutations: [],
      observableFacts: ['That is not something you can do in one move.'],
      privateFacts: [
        {
          visibility: 'SELF',
          fact:
            'The player declared an outcome that would take a plan, not an action. Narrate them realising the ' +
            'scale of it and what the first real step would have to be. Do not let any part of it happen.',
        },
      ],
      timeAdvancedMinutes: 0,
      newOpportunities: buildOpportunities(state, story),
      rngSeedHash: rng.seedHash,
    };
  }

  for (const action of intent.actions) {
    const weight = VERB_WEIGHT[action.verb] ?? 'MAJOR';

    // Spec §13.3 — outside combat the player may chain freely; inside an
    // encounter the round budget decides what actually lands this turn.
    if (state.encounter && !canSpend(economy, weight)) {
      deferred.push(action.method || action.verb);
      normalizedActions.push({ verb: action.verb, status: 'DEFERRED', reason: 'TURN_ECONOMY' });
      continue;
    }

    const outcome = resolveAction({
      story,
      state,
      action,
      rng,
      nextMutationId,
      economy,
      weight,
    });

    checks.push(...outcome.checks);
    mutations.push(...outcome.mutations);
    observableFacts.push(...outcome.observableFacts);
    privateFacts.push(...outcome.privateFacts);
    normalizedActions.push(outcome.normalized);

    totalMinutes +=
      outcome.overrideMinutes ??
      (outcome.timeCategory === 'TRAVEL'
        ? (outcome.travelMinutes ?? 15)
        : TIME_COST_MINUTES[outcome.timeCategory]);

    if (state.encounter) spend(economy, weight);
  }

  if (deferred.length > 0) {
    privateFacts.push({
      visibility: 'SELF',
      fact: `Deferred this round (no action left): ${deferred.join('; ')}. Narrate the attempt starting, not completing.`,
    });
  }

  // Dialogue costs a beat of world time even when nothing is rolled.
  if (intent.dialogue.length > 0 && totalMinutes === 0) totalMinutes = TIME_COST_MINUTES.BRIEF;

  if (totalMinutes > 0) {
    mutations.push({
      mutationId: nextMutationId(),
      type: 'TIME_ADVANCE',
      subjectId: 'session',
      reasonCode: 'ACTION_TIME_COST',
      payload: { minutes: totalMinutes },
    });
  }

  // Spec §13.3 — the other side of the round. Enemies act after the player,
  // against the same dice, from the same seeded stream.
  const afterPlayer = projectState(state, story, mutations);
  if (afterPlayer.encounter) {
    const npcTurns = resolveNpcTurns(story, afterPlayer, rng, nextMutationId);
    mutations.push(...npcTurns.mutations);
    observableFacts.push(...npcTurns.observableFacts);
    privateFacts.push(...(npcTurns.privateFacts as PrivateFact[]));
  }

  // Opportunities describe what the player can do *next*, so they are computed
  // against the world as this turn leaves it — otherwise a turn that moves you
  // would offer the exits of the room you just left.
  const projected = projectState(state, story, mutations);

  return {
    schemaVersion: '1.0',
    turnId,
    valid: true,
    invalidReason: null,
    normalizedActions,
    checks,
    mutations,
    observableFacts,
    privateFacts,
    timeAdvancedMinutes: totalMinutes,
    newOpportunities: buildOpportunities(projected, story),
    rngSeedHash: rng.seedHash,
  };
}

/**
 * Applies this turn's mutations to a throwaway copy so callers can see the world
 * as the turn leaves it. Presentation-only: `commitTurn` remains the sole path
 * to durable state.
 */
export function projectState(
  state: GameState,
  story: StoryVersion,
  mutations: readonly StateMutation[],
): GameState {
  const { accepted } = validateMutations(mutations, state, story);
  return applyMutations(state, story, accepted);
}

// ---------------------------------------------------------------------------

interface ResolveActionArgs {
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly action: IntentAction;
  readonly rng: SeededRng;
  readonly nextMutationId: () => string;
  readonly economy: TurnEconomy;
  readonly weight: ActionWeight;
}

function resolveAction(args: ResolveActionArgs): ActionOutcome {
  const { action } = args;
  switch (action.verb) {
    case 'use_ability':
      return resolveAbility(args);
    case 'use_item':
      return resolveItemUse(args);
    case 'travel':
    case 'move':
      return resolveTravel(args);
    case 'persuade':
    case 'deceive':
    case 'threaten':
      return resolveSocial(args);
    case 'attack':
      return resolveAttack(args);
    case 'rest':
      return resolveRest(args);
    case 'speak':
      return resolveSpeak(args);
    case 'wait':
      return resolveFreeAction(args);
    default:
      return resolveGenericCheck(args);
  }
}

/**
 * Emits a rejection the writer must narrate in fiction, never as an error.
 *
 * `inWorld` is a fact any observer could perceive and is safe to render.
 * `directive` is an instruction to the writer and must never reach the player,
 * which is why the two are separate fields rather than one blended string.
 */
function refusal(
  action: IntentAction,
  reason: string,
  inWorld: string,
  directive: string,
): ActionOutcome {
  return {
    checks: [],
    mutations: [],
    observableFacts: [inWorld],
    privateFacts: [{ visibility: 'SELF', fact: directive }],
    timeCategory: 'INSTANT',
    overrideMinutes: 0,
    normalized: { verb: action.verb, status: 'REJECTED', reason },
  };
}

function resolveAbility(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action, rng, nextMutationId } = args;

  const ability: AbilityDef | undefined = story.abilities.find((a) => a.id === action.abilityId);
  if (!ability) {
    return refusal(
      action,
      'UNKNOWN_ABILITY',
      'You reach for something that is not yours to reach for, and nothing answers.',
      'The player invoked a power that does not exist in this world. Narrate the reach and the silence. Do not name game systems.',
    );
  }
  if (!state.player.abilities.includes(ability.id)) {
    return refusal(
      action,
      'ABILITY_LOCKED',
      `${ability.name} is beyond you. The shape of it is there; the skill is not.`,
      `${ability.name} is not unlocked. Narrate the shortfall. Do not let it work.`,
    );
  }

  const cooldownUntil = state.player.abilityCooldowns[ability.id] ?? 0;
  if (cooldownUntil > state.worldMinute) {
    return refusal(
      action,
      'ABILITY_ON_COOLDOWN',
      `${ability.name} has not settled since you last used it.`,
      `${ability.name} is on cooldown. Narrate it refusing to answer yet.`,
    );
  }

  for (const cost of ability.costs) {
    const resource = state.player.resources.find((r) => r.id === cost.resourceId);
    const def = story.resources.find((r) => r.id === cost.resourceId);
    if (!resource || resource.current < cost.amount) {
      return refusal(
        action,
        'INSUFFICIENT_RESOURCE',
        `You do not have the ${(def?.name ?? cost.resourceId).toLowerCase()} left for ${ability.name}.`,
        'The cost could not be paid. Narrate the power guttering out before it forms.',
      );
    }
  }

  const mutations: StateMutation[] = ability.costs.map((cost) => ({
    mutationId: nextMutationId(),
    type: 'RESOURCE_DELTA' as const,
    subjectId: 'player',
    reasonCode: `ABILITY_COST:${ability.id}`,
    payload: { resourceId: cost.resourceId, amount: -cost.amount },
  }));

  if (ability.cooldownMinutes > 0) {
    mutations.push({
      mutationId: nextMutationId(),
      type: 'FLAG_SET',
      subjectId: 'player',
      reasonCode: `ABILITY_COOLDOWN:${ability.id}`,
      payload: { flag: `cooldown:${ability.id}`, value: state.worldMinute + ability.cooldownMinutes },
    });
  }

  const checks: CheckResult[] = [];
  const observableFacts: string[] = [];

  if (ability.check) {
    const dc = ability.check.baseDc + situationalDc(args);
    const check = resolveCheck(rng, {
      checkId: `chk_${ability.id}_${state.turnIndex}`,
      label: ability.name,
      attribute: ability.check.attribute,
      attributeScore: effectiveAttribute(state, story, ability.check.attribute),
      skillId: ability.check.skillId,
      skillProficiency: ability.check.skillId ? (state.player.skills[ability.check.skillId] ?? 0) : 0,
      equipmentModifier: equipmentSkillModifier(state, story, ability.check.skillId),
      statusModifier: 0,
      situationalModifier: 0,
      dc,
      advantageLevel: advantageFor(args),
      allowsPartial: true,
    });
    checks.push(check);
    // Perceptual, not mechanical: the check module already carries the outcome,
    // and prose that reads like a rules readout breaks the fiction.
    observableFacts.push(
      isSuccess(check.outcome)
        ? `${ability.name} takes hold.`
        : `${ability.name} slips away from you.`,
    );

    if (!isSuccess(check.outcome)) {
      return {
        checks,
        mutations,
        observableFacts,
        privateFacts: [
          {
            visibility: 'SELF',
            fact: `${ability.name} failed. The cost was still paid. Do not describe the intended effect as achieved.`,
          },
        ],
        timeCategory: 'INSTANT',
        normalized: { verb: 'use_ability', abilityId: ability.id, status: 'FAILED', outcome: check.outcome },
      };
    }
  } else {
    observableFacts.push(`${ability.name} takes hold exactly as intended.`);
  }

  return {
    checks,
    mutations,
    observableFacts,
    privateFacts: [],
    timeCategory: 'INSTANT',
    normalized: {
      verb: 'use_ability',
      abilityId: ability.id,
      status: 'RESOLVED',
      outcome: checks[0]?.outcome ?? 'CLEAN_SUCCESS',
    },
  };
}

function resolveItemUse(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action, nextMutationId } = args;

  const item = story.items.find((i) => i.id === action.itemId);
  if (!item) {
    return refusal(
      action,
      'UNKNOWN_ITEM',
      'You reach for something you are not carrying.',
      'The named item does not exist in this world. Narrate the empty hand. Do not invent it.',
    );
  }
  if (countItem(state, item.id) <= 0) {
    return refusal(
      action,
      'ITEM_NOT_HELD',
      `You do not have ${item.name}.`,
      `The player does not hold ${item.name}. Narrate the absence. Do not put it in their hand.`,
    );
  }

  const mutations: StateMutation[] = [];
  const observableFacts: string[] = [];

  if (item.consumable) {
    mutations.push({
      mutationId: nextMutationId(),
      type: 'RESOURCE_DELTA',
      subjectId: 'player',
      reasonCode: `ITEM_CONSUME:${item.id}`,
      payload: { resourceId: item.consumable.resourceId, amount: item.consumable.amount },
    });
    if (item.consumable.consumesItem) {
      mutations.push({
        mutationId: nextMutationId(),
        type: 'ITEM_REMOVE',
        subjectId: 'player',
        reasonCode: `ITEM_CONSUME:${item.id}`,
        payload: { itemId: item.id, quantity: 1 },
      });
    }
    const resourceName = story.resources.find((r) => r.id === item.consumable!.resourceId)?.name ?? '';
    observableFacts.push(
      `${item.name} is used${resourceName ? `, restoring ${resourceName}` : ''}.`,
    );
  } else if (item.equipSlot) {
    const entry = state.player.inventory.find((e) => e.itemId === item.id);
    mutations.push({
      mutationId: nextMutationId(),
      type: 'ITEM_UPDATE',
      subjectId: 'player',
      reasonCode: 'ITEM_EQUIP',
      payload: { itemId: item.id, entryId: entry?.entryId, equipped: !entry?.equipped },
    });
    observableFacts.push(`${item.name} is ${entry?.equipped ? 'stowed' : 'readied'}.`);
  } else {
    observableFacts.push(`${item.name} is brought to hand.`);
  }

  return {
    checks: [],
    mutations,
    observableFacts,
    privateFacts: [],
    timeCategory: 'INSTANT',
    normalized: { verb: 'use_item', itemId: item.id, status: 'RESOLVED' },
  };
}

function resolveTravel(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action, nextMutationId } = args;

  const target = action.targets.find((t) => t.entityType === 'location');
  const destination = story.locations.find((l) => l.id === target?.entityId);
  if (!destination) {
    return refusal(
      action,
      'UNKNOWN_LOCATION',
      'There is nowhere by that name to go from here.',
      'The destination does not exist. Narrate the player reconsidering.',
    );
  }
  if (destination.id === state.player.locationId) {
    return {
      checks: [],
      mutations: [],
      observableFacts: [`You are already at ${destination.name}.`],
      privateFacts: [],
      timeCategory: 'INSTANT',
      normalized: { verb: 'travel', status: 'NOOP', locationId: destination.id },
    };
  }

  const origin = story.locations.find((l) => l.id === state.player.locationId);
  const edge = origin?.connections.find((c) => c.to === destination.id);
  if (!edge) {
    return refusal(
      action,
      'NO_ROUTE',
      `There is no way to ${destination.name} from here.`,
      'No authored route exists. Narrate the obstacle in fiction; do not teleport the player.',
    );
  }
  if (edge.lockedByFlag && !state.flags[edge.lockedByFlag]) {
    return refusal(
      action,
      'ROUTE_LOCKED',
      `The way to ${destination.name} is closed to you.`,
      'The route is locked behind a flag the player has not set. Narrate what blocks it.',
    );
  }

  // Whether this is the first time here has to be recorded now: by the time the
  // director sees state, the arrival has already marked the place discovered,
  // so it can no longer tell a first visit from a return trip.
  const firstVisit = !state.discoveredLocationIds.includes(destination.id);

  return {
    checks: [],
    mutations: [
      {
        mutationId: nextMutationId(),
        type: 'LOCATION_CHANGE',
        subjectId: 'player',
        reasonCode: 'TRAVEL',
        payload: { locationId: destination.id, firstVisit },
      },
    ],
    observableFacts: [`You travel to ${destination.name}.`],
    privateFacts: [],
    timeCategory: 'TRAVEL',
    travelMinutes: edge.travelMinutes,
    normalized: { verb: 'travel', status: 'RESOLVED', locationId: destination.id, minutes: edge.travelMinutes },
  };
}

/**
 * Spec §14.2 — social actions never set relationship numbers directly. The
 * check produces a severity, `clampRelationshipDelta` decides the real change.
 */
function resolveSocial(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action, rng, nextMutationId } = args;

  const target = action.targets.find((t) => t.entityType === 'npc');
  const character = story.characters.find((c) => c.id === target?.entityId);
  if (!character) {
    return refusal(
      action,
      'UNKNOWN_TARGET',
      'There is no one here to say that to.',
      'The target does not exist. Narrate the words landing on empty air.',
    );
  }

  const present = charactersPresent(state).some((c) => c.characterId === character.id);
  if (!present) {
    return refusal(
      action,
      'TARGET_ABSENT',
      `${character.name} is not here.`,
      `${character.name} is not in this location. Narrate the absence. Do not give them a line.`,
    );
  }

  const rel = getRelationship(state, character.id);
  const skill = pickSkillFor(story, action.verb);
  const attribute: AttributeKey = 'presence';

  // Disposition shifts the difficulty. Someone who already trusts you is easier
  // to persuade; someone afraid of you is easier to threaten and harder to charm.
  let dc = DC_BANDS.MODERATE + situationalDc(args);
  if (rel) {
    if (action.verb === 'persuade') dc -= Math.round((rel.trust + rel.affection) / 40);
    if (action.verb === 'deceive') dc += Math.round(rel.trust / 25);
    if (action.verb === 'threaten') dc -= Math.round(rel.fear / 30) - Math.round(rel.respect / 40);
  }
  dc = Math.max(6, Math.min(28, dc));

  const check = resolveCheck(rng, {
    checkId: `chk_${action.verb}_${character.id}_${state.turnIndex}`,
    label: `${action.verb === 'persuade' ? 'Persuade' : action.verb === 'deceive' ? 'Deceive' : 'Intimidate'} ${character.name}`,
    attribute,
    attributeScore: effectiveAttribute(state, story, attribute),
    skillId: skill,
    skillProficiency: skill ? (state.player.skills[skill] ?? 0) : 0,
    equipmentModifier: equipmentSkillModifier(state, story, skill),
    dc,
    advantageLevel: advantageFor(args),
    allowsPartial: true,
  });

  const severity: EventSeverity =
    check.outcome === 'CRITICAL_SUCCESS' || check.outcome === 'COMPLICATION' ? 'NOTABLE' : 'MINOR';

  const proposals = socialDeltasFor(action.verb, check.outcome);
  const mutations: StateMutation[] = [];
  const clampNotes: string[] = [];

  for (const [dimension, delta] of proposals) {
    const clamped = clampRelationshipDelta(state, story, {
      characterId: character.id,
      dimension,
      delta,
      severity,
      reasonCode: action.verb,
    });
    if (clamped.appliedDelta !== 0) {
      mutations.push({
        mutationId: nextMutationId(),
        type: 'RELATIONSHIP_DELTA',
        subjectId: character.id,
        reasonCode: `SOCIAL:${action.verb}:${check.outcome}`,
        payload: { dimension, amount: clamped.appliedDelta },
      });
    }
    if (clamped.clampReason) clampNotes.push(`${dimension}: ${clamped.clampReason}`);
  }

  const observableFacts: string[] = [];

  if (check.outcome === 'SUCCESS_WITH_COST') {
    const cost = concreteCost(args, nextMutationId, `PARTIAL:${action.verb}`);
    mutations.push(...cost.mutations);
    observableFacts.push(`${character.name} gives ground, and ${cost.description}.`);
  }

  const privateFacts: PrivateFact[] = [];
  if (!isSuccess(check.outcome)) {
    privateFacts.push({
      visibility: 'SELF',
      fact: `The attempt did not work. ${character.name} does not comply. Do not write them agreeing.`,
    });
  }
  if (action.verb === 'deceive' && !isSuccess(check.outcome)) {
    privateFacts.push({
      visibility: 'NPC_PRIVATE',
      fact: `${character.name} noticed the lie, whether or not they say so.`,
    });
  }
  if (clampNotes.length > 0) {
    privateFacts.push({ visibility: 'SELF', fact: `Relationship clamps applied — ${clampNotes.join('; ')}.` });
  }

  return {
    checks: [check],
    mutations,
    observableFacts,
    privateFacts,
    timeCategory: 'BRIEF',
    normalized: { verb: action.verb, targetId: character.id, status: 'RESOLVED', outcome: check.outcome },
  };
}

/** Which dimensions a social outcome may move, and by how much before clamping. */
function socialDeltasFor(
  verb: string,
  outcome: CheckResult['outcome'],
): Array<[RelationshipDimension, number]> {
  const good = isSuccess(outcome);
  const strong = outcome === 'CRITICAL_SUCCESS';
  const bad = outcome === 'COMPLICATION';

  switch (verb) {
    case 'persuade':
      return good
        ? [
            ['trust', strong ? 4 : 2],
            ['respect', strong ? 3 : 1],
          ]
        : [['respect', bad ? -3 : -1]];
    case 'deceive':
      return good
        ? [['trust', 1]]
        : [
            ['trust', bad ? -6 : -3],
            ['respect', -2],
          ];
    case 'threaten':
      return good
        ? [
            ['fear', strong ? 6 : 3],
            ['affection', -3],
          ]
        : [
            ['rivalry', bad ? 5 : 2],
            ['respect', -2],
          ];
    default:
      return [];
  }
}

function resolveAttack(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action, rng, nextMutationId } = args;

  const target = action.targets.find((t) => t.entityType === 'npc');
  const character = story.characters.find((c) => c.id === target?.entityId);
  if (!character) {
    return refusal(
      action,
      'UNKNOWN_TARGET',
      'There is no one there to strike.',
      'The target does not exist. Narrate the swing meeting air.',
    );
  }
  if (!story.rules.allowsCombat) {
    return refusal(
      action,
      'COMBAT_DISABLED',
      'Whatever you were about to do, you do not do it.',
      'This world does not resolve conflicts with violence. Narrate the impulse and what stops it.',
    );
  }

  const mutations: StateMutation[] = [];
  const observableFacts: string[] = [];

  // First blow opens an encounter, so the round economy applies from here on.
  let encounterJustStarted = false;
  if (!state.encounter) {
    const encounter = buildEncounter(rng, state, story, {
      encounterId: `enc_${state.sessionId}_${state.turnIndex}`,
      objective: `Survive the confrontation with ${character.name}.`,
      enemyIds: [character.id],
    });
    mutations.push({
      mutationId: nextMutationId(),
      type: 'ENCOUNTER_START',
      subjectId: 'session',
      reasonCode: 'PLAYER_INITIATED_ATTACK',
      payload: { encounter },
    });
    observableFacts.push(`A fight begins with ${character.name}.`);
    encounterJustStarted = true;
  }

  const attribute: AttributeKey = 'might';
  const skill = pickSkillFor(story, 'attack');
  const dc = character.combatant?.defenseDc ?? DC_BANDS.MODERATE;

  const check = resolveCheck(rng, {
    checkId: `chk_attack_${character.id}_${state.turnIndex}`,
    label: `Strike ${character.name}`,
    attribute,
    attributeScore: effectiveAttribute(state, story, attribute),
    skillId: skill,
    skillProficiency: skill ? (state.player.skills[skill] ?? 0) : 0,
    equipmentModifier: equipmentSkillModifier(state, story, skill),
    dc,
    advantageLevel: advantageFor(args),
    allowsPartial: false,
  });

  // Spec §14.2 — being attacked changes how someone feels about you, whether or
  // not the blow lands. This is the part that was missing: prose described a
  // fight while the relationship stayed exactly as it was.
  for (const [dimension, amount] of [
    ['fear', 10],
    ['trust', -25],
    ['respect', -10],
    ['affection', -20],
    ['rivalry', 15],
  ] as const) {
    const clamped = clampRelationshipDelta(state, story, {
      characterId: character.id,
      dimension,
      delta: amount,
      // Violence is a major event, so it is allowed to move a relationship far.
      severity: 'MAJOR',
      reasonCode: 'attack',
    });
    if (clamped.appliedDelta !== 0) {
      mutations.push({
        mutationId: nextMutationId(),
        type: 'RELATIONSHIP_DELTA',
        subjectId: character.id,
        reasonCode: 'ATTACKED_BY_PLAYER',
        payload: { dimension, amount: clamped.appliedDelta },
      });
    }
  }

  // A durable flag, so nothing downstream can treat this as an ordinary chat.
  mutations.push({
    mutationId: nextMutationId(),
    type: 'FLAG_SET',
    subjectId: 'session',
    reasonCode: 'ATTACKED_BY_PLAYER',
    payload: { flag: `attacked:${character.id}`, value: true },
  });

  const witness = witnessConsequences(args, nextMutationId, character.name);
  mutations.push(...witness.mutations);
  observableFacts.push(...witness.facts);

  if (isSuccess(check.outcome)) {
    const base = 4 + attributeModifier(effectiveAttribute(state, story, attribute));
    const damage = check.outcome === 'CRITICAL_SUCCESS' ? base * 2 : base;
    mutations.push({
      mutationId: nextMutationId(),
      type: 'ENCOUNTER_UPDATE',
      subjectId: 'session',
      reasonCode: 'ATTACK_HIT',
      payload: { participantId: character.id, healthDelta: -damage },
    });
    observableFacts.push(`Your strike lands on ${character.name}.`);

    // Spec §12.5 — a partial success costs something the player can name.
    if (check.outcome === 'SUCCESS_WITH_COST') {
      const cost = concreteCost(args, nextMutationId, 'ATTACK_COST');
      mutations.push(...cost.mutations);
      observableFacts.push(`${character.name} gets a hit in first, and ${cost.description}.`);
    }
  } else {
    observableFacts.push(`Your strike misses ${character.name}.`);
    // No counterattack here: the target gets a real turn of their own once the
    // player's action resolves, and hitting back twice for one miss is wrong.
  }

  return {
    checks: [check],
    mutations,
    observableFacts,
    privateFacts: [
      ...(encounterJustStarted
        ? [{ visibility: 'SELF', fact: 'This is the opening exchange. Establish stakes and position.' }]
        : []),
      {
        visibility: 'SELF',
        fact:
          `${character.name} has now been attacked by the player and will not behave as though the previous ` +
          'conversation is still happening. They are hostile, defending themselves, or calling for help.',
      },
      ...(witness.witnessIds.length > 0
        ? [{ visibility: 'SELF' as const, fact: `Witnessed by: ${witness.witnessIds.join(', ')}. They react.` }]
        : []),
    ],
    timeCategory: 'INSTANT',
    normalized: { verb: 'attack', targetId: character.id, status: 'RESOLVED', outcome: check.outcome },
  };
}

function resolveRest(args: ResolveActionArgs): ActionOutcome {
  const { story, state, nextMutationId } = args;

  const mutations: StateMutation[] = story.resources
    .filter((r) => r.polarity === 'GOOD_HIGH')
    .map((r) => {
      const current = state.player.resources.find((x) => x.id === r.id)?.current ?? 0;
      return {
        mutationId: nextMutationId(),
        type: 'RESOURCE_DELTA' as const,
        subjectId: 'player',
        reasonCode: 'REST',
        payload: { resourceId: r.id, amount: Math.max(0, r.max - current) },
      };
    });

  return {
    checks: [],
    mutations,
    observableFacts: ['You rest, and recover.'],
    privateFacts: [],
    timeCategory: 'REST',
    normalized: { verb: 'rest', status: 'RESOLVED' },
  };
}

/**
 * Speaking is free, but only to someone who is actually here. Addressing an
 * absent NPC is refused so the writer cannot conjure them into the room.
 */
function resolveSpeak(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action } = args;
  const target = action.targets.find((t) => t.entityType === 'npc');

  if (target) {
    const character = story.characters.find((c) => c.id === target.entityId);
    const present = charactersPresent(state).some((c) => c.characterId === target.entityId);
    if (character && !present) {
      const runtime = state.characters.find((c) => c.characterId === character.id);
      const whereabouts = story.locations.find((l) => l.id === runtime?.locationId);
      return refusal(
        action,
        'TARGET_ABSENT',
        `${character.name} is not here.`,
        `${character.name} is${whereabouts ? ` at ${whereabouts.name}` : ' elsewhere'} at this hour. Narrate the absence. Do not put them in the scene or give them a line.`,
      );
    }
  }

  return resolveFreeAction(args);
}

function resolveFreeAction(args: ResolveActionArgs): ActionOutcome {
  const { action } = args;
  return {
    checks: [],
    mutations: [],
    observableFacts: [],
    privateFacts: [],
    timeCategory: VERB_TIME[action.verb] ?? 'BRIEF',
    normalized: { verb: action.verb, status: 'RESOLVED' },
  };
}

/** Everything without a bespoke handler still gets a real, seeded check. */
function resolveGenericCheck(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action, rng } = args;

  const attribute = VERB_ATTRIBUTE[action.verb] ?? 'mind';
  const skill = pickSkillFor(story, action.verb);
  const dc = baseDcFor(action.verb) + situationalDc(args);

  const check = resolveCheck(rng, {
    checkId: `chk_${action.verb}_${state.turnIndex}`,
    label: labelForVerb(action.verb),
    attribute,
    attributeScore: effectiveAttribute(state, story, attribute),
    skillId: skill,
    skillProficiency: skill ? (state.player.skills[skill] ?? 0) : 0,
    equipmentModifier: equipmentSkillModifier(state, story, skill),
    dc,
    advantageLevel: advantageFor(args),
    allowsPartial: PARTIAL_CAPABLE.has(action.verb),
  });

  // The check reveal module carries the outcome; duplicating it in prose reads
  // like a rules readout (§10.6).
  const observableFacts: string[] = [];
  const mutations: StateMutation[] = [];

  // Spec §12.5 — a partial success must cost something nameable.
  if (check.outcome === 'SUCCESS_WITH_COST') {
    const cost = concreteCost(args, args.nextMutationId, `PARTIAL:${action.verb}`);
    mutations.push(...cost.mutations);
    observableFacts.push(`You get there, and ${cost.description}.`);
  }

  const privateFacts: PrivateFact[] = isSuccess(check.outcome)
    ? []
    : [
        {
          visibility: 'SELF',
          fact: `This attempt failed. Do not narrate the declared outcome as achieved: "${action.declaredOutcome ?? action.method}".`,
        },
      ];

  return {
    checks: [check],
    mutations,
    observableFacts,
    privateFacts,
    timeCategory: VERB_TIME[action.verb] ?? 'BRIEF',
    normalized: { verb: action.verb, status: 'RESOLVED', outcome: check.outcome },
  };
}

/**
 * Spec §12.5 — a partial success has to cost something the player can name.
 *
 * "Success with cost" with no stated cost is the worst of both worlds: it reads
 * as a penalty and changes nothing. This emits a real mutation so the delta chip
 * beside the prose says what was actually paid.
 */
function concreteCost(
  args: ResolveActionArgs,
  nextMutationId: () => string,
  reasonCode: string,
): { mutations: StateMutation[]; description: string } {
  const { story, state } = args;

  // Prefer a resource the world actually tracks and the player currently has.
  const spendable = story.resources
    .filter((r) => r.polarity === 'GOOD_HIGH' && r.id !== 'health')
    .map((r) => ({ def: r, current: state.player.resources.find((x) => x.id === r.id)?.current ?? 0 }))
    .filter((r) => r.current > 2)
    .sort((a, b) => a.def.displayPriority - b.def.displayPriority)[0];

  if (spendable) {
    const amount = Math.max(1, Math.round(spendable.def.max * 0.1));
    return {
      mutations: [
        {
          mutationId: nextMutationId(),
          type: 'RESOURCE_DELTA',
          subjectId: 'player',
          reasonCode,
          payload: { resourceId: spendable.def.id, amount: -amount },
        },
      ],
      description: `it costs you ${amount} ${spendable.def.name}`,
    };
  }

  // Nothing spendable: an ascending resource like Suspicion takes the hit.
  const ascending = story.resources.find((r) => r.polarity === 'GOOD_LOW');
  if (ascending) {
    const amount = Math.max(1, Math.round(ascending.max * 0.08));
    return {
      mutations: [
        {
          mutationId: nextMutationId(),
          type: 'RESOURCE_DELTA',
          subjectId: 'player',
          reasonCode,
          payload: { resourceId: ascending.id, amount },
        },
      ],
      description: `${ascending.name} rises by ${amount}`,
    };
  }

  // Last resort: a visible status, so the cost is still nameable.
  return {
    mutations: [
      {
        mutationId: nextMutationId(),
        type: 'STATUS_ADD',
        subjectId: 'player',
        reasonCode,
        payload: {
          id: 'shaken',
          label: 'Shaken',
          kind: 'DEBUFF',
          durationMinutes: 60,
          description: 'That took more out of you than it should have.',
        },
      },
    ],
    description: 'it leaves you shaken',
  };
}

/**
 * Spec §29 / §15.3 — violence in front of people has consequences beyond the
 * two people involved. Witnesses are whoever else is in the room.
 */
function witnessConsequences(
  args: ResolveActionArgs,
  nextMutationId: () => string,
  targetName: string,
): { mutations: StateMutation[]; facts: string[]; witnessIds: string[] } {
  const { story, state, action } = args;

  const targetId = action.targets.find((t) => t.entityType === 'npc')?.entityId;
  const witnesses = charactersPresent(state).filter((c) => c.characterId !== targetId);
  if (witnesses.length === 0) return { mutations: [], facts: [], witnessIds: [] };

  const mutations: StateMutation[] = [];
  const names: string[] = [];

  for (const witness of witnesses) {
    const character = story.characters.find((c) => c.id === witness.characterId);
    if (!character) continue;
    names.push(character.name);

    // Watching someone be attacked moves fear and trust, in that order.
    mutations.push({
      mutationId: nextMutationId(),
      type: 'RELATIONSHIP_DELTA',
      subjectId: character.id,
      reasonCode: 'WITNESSED_VIOLENCE',
      payload: { dimension: 'fear', amount: 6 },
    });
    mutations.push({
      mutationId: nextMutationId(),
      type: 'RELATIONSHIP_DELTA',
      subjectId: character.id,
      reasonCode: 'WITNESSED_VIOLENCE',
      payload: { dimension: 'trust', amount: -4 },
    });
  }

  // Institutional standing, where the world models one.
  for (const faction of story.factions) {
    mutations.push({
      mutationId: nextMutationId(),
      type: 'FACTION_DELTA',
      subjectId: faction.id,
      reasonCode: 'PUBLIC_VIOLENCE',
      payload: { amount: -8 },
    });
    break;
  }

  const suspicion = story.resources.find((r) => r.polarity === 'GOOD_LOW');
  if (suspicion) {
    mutations.push({
      mutationId: nextMutationId(),
      type: 'RESOURCE_DELTA',
      subjectId: 'player',
      reasonCode: 'PUBLIC_VIOLENCE',
      payload: { resourceId: suspicion.id, amount: 20 },
    });
  }

  return {
    mutations,
    facts: [`${names.join(' and ')} saw you attack ${targetName}.`],
    witnessIds: witnesses.map((w) => w.characterId),
  };
}

// --- Difficulty helpers ----------------------------------------------------

function baseDcFor(verb: string): number {
  switch (verb) {
    case 'inspect':
      return DC_BANDS.EASY;
    case 'interact':
    case 'help':
      return DC_BANDS.EASY;
    case 'hide':
    case 'steal':
      return DC_BANDS.HARD;
    case 'oppose':
    case 'defend':
      return DC_BANDS.MODERATE;
    default:
      return DC_BANDS.MODERATE;
  }
}

function labelForVerb(verb: string): string {
  const map: Record<string, string> = {
    inspect: 'Investigate',
    hide: 'Stealth',
    steal: 'Sleight of hand',
    interact: 'Interact',
    defend: 'Brace',
    help: 'Assist',
    oppose: 'Resist',
    custom: 'Attempt',
    move: 'Move',
  };
  return map[verb] ?? verb.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

/** Best-fit authored skill for a verb, by matching the story's own skill list. */
function pickSkillFor(story: StoryVersion, verb: string): string | null {
  const patterns: Record<string, RegExp> = {
    persuade: /persua|diplo|charm|rhetor|negoti/i,
    deceive: /deceiv|decept|lie|bluff|guile/i,
    threaten: /intimid|threat|menace/i,
    attack: /combat|melee|blade|martial|fight/i,
    hide: /stealth|shadow|sneak/i,
    steal: /sleight|thiev|pickpocket|larcen/i,
    inspect: /investig|percept|insight|research|lore/i,
    interact: /craft|tinker|mechan|arcana/i,
  };
  const pattern = patterns[verb];
  if (!pattern) return null;
  return story.skills.find((s) => pattern.test(s.id) || pattern.test(s.name))?.id ?? null;
}

/** Debuffs and a hostile scene make everything a little harder. */
function situationalDc(args: ResolveActionArgs): number {
  const { state } = args;
  let modifier = 0;
  if (state.encounter) modifier += 2;
  modifier += state.player.statuses.filter((s) => s.kind === 'DEBUFF').length;
  return modifier;
}

/**
 * Spec §12.6 — advantage comes from concrete state (buffs, debuffs, position),
 * never from how persuasively the player phrased their sentence.
 */
function advantageFor(args: ResolveActionArgs): number {
  const { state } = args;
  const buffs = state.player.statuses.filter((s) => s.kind === 'BUFF').length;
  const debuffs = state.player.statuses.filter((s) => s.kind === 'DEBUFF').length;
  return Math.max(-2, Math.min(2, buffs - debuffs));
}

/**
 * Spec §10.4 — suggestions must come from real engine opportunities. These are
 * the affordances that genuinely exist right now; the director may only choose
 * among them, not invent new ones.
 */
function buildOpportunities(state: GameState, story: StoryVersion): string[] {
  const opportunities: string[] = [];

  for (const present of charactersPresent(state)) {
    const character = story.characters.find((c) => c.id === present.characterId);
    if (!character) continue;

    // Someone you just attacked, or who is fighting you, is not available for a
    // conversation. Offering "ask them about the gate log" after a fistfight is
    // the continuity bug this guards against.
    const attacked = state.flags[`attacked:${character.id}`] === true;
    const inFight = state.encounter?.participants.some(
      (p) => p.entityId === character.id && p.team === 'ENEMY' && !p.downed,
    );
    const downed = state.encounter?.participants.some((p) => p.entityId === character.id && p.downed);

    if (downed) continue;
    if (attacked || inFight) {
      opportunities.push(`confront:${character.id}`);
      continue;
    }
    opportunities.push(`speak_to:${character.id}`);
  }

  const origin = story.locations.find((l) => l.id === state.player.locationId);
  for (const edge of origin?.connections ?? []) {
    if (edge.lockedByFlag && !state.flags[edge.lockedByFlag]) continue;
    opportunities.push(`travel_to:${edge.to}`);
  }

  for (const abilityId of state.player.abilities) {
    const ability = story.abilities.find((a) => a.id === abilityId);
    if (!ability) continue;
    const affordable = ability.costs.every((cost) => {
      const resource = state.player.resources.find((r) => r.id === cost.resourceId);
      return resource !== undefined && resource.current >= cost.amount;
    });
    const ready = (state.player.abilityCooldowns[abilityId] ?? 0) <= state.worldMinute;
    if (affordable && ready) opportunities.push(`use_ability:${abilityId}`);
  }

  for (const entry of state.player.inventory) {
    const item = story.items.find((i) => i.id === entry.itemId);
    if (item?.consumable) opportunities.push(`use_item:${item.id}`);
  }

  for (const progress of state.quests) {
    if (progress.status === 'ACTIVE') opportunities.push(`advance_quest:${progress.questId}`);
  }

  if (state.encounter) {
    opportunities.push('encounter:attack', 'encounter:defend', 'encounter:disengage');
  }

  opportunities.push('inspect:surroundings');
  return opportunities;
}
