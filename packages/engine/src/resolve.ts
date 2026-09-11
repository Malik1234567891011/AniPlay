import type {
  AbilityDef,
  ActionIntent,
  CharacterDef,
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
  supportSkillModifier,
  getRelationship,
} from './state.js';
import { TIME_COST_MINUTES, type TimeCostCategory } from './clock.js';
import { fireWorldEvents } from './world-events.js';
import { recruitCheck, recruitMutations, updateCrew, isAboard } from './crew.js';
import {
  composeStory,
  matchMention,
  matchMentionHere,
  promoteCharacter,
  promoteLocation,
} from './generated-world.js';
import { scoutingPressure, tendencyMutations } from './tendencies.js';
import { clampRelationshipDelta, type EventSeverity, type RelationshipDimension } from './relationships.js';
import {
  buildEncounter,
  canSpend,
  deathConsequences,
  lethalMutations,
  newTurnEconomy,
  spend,
  type ActionWeight,
  type TurnEconomy,
} from './combat.js';
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
  // Spec §11.9 — everything below sees one world: the authored one with this
  // player's additions composed over it. Doing it once here is what lets the
  // forty `story.characters.find(...)` sites stay exactly as they are.
  options = { ...options, story: composeStory(options.story, options.state) };
  const { story, state, intent, turnId, seed } = options;
  const rng = new SeededRng(seed, state.rngCursor);

  const checks: CheckResult[] = [];
  const mutations: StateMutation[] = [];
  const observableFacts: string[] = [];
  const privateFacts: PrivateFact[] = [];
  const normalizedActions: Record<string, unknown>[] = [];
  let totalMinutes = 0;
  /** The longest single thing done this turn, rather than the sum of them. */
  let concurrentMinutes = 0;

  let mutationCounter = 0;
  const nextMutationId = (): string => `mut_${turnId}_${mutationCounter++}`;

  const economy = newTurnEconomy();
  const deferred: string[] = [];

  // Spec §3.4 — a declaration too big for one action is not refused. It starts.
  //
  // This used to return "That is not something you can do in one move" with the
  // instruction "Do not let any part of it happen", which is the setting
  // protecting itself from the player. In a game called Plotbreak, "I burn down
  // the archive" is not an invalid input — it is a player telling you what the
  // rest of their story is about.
  //
  // So the engine commits it as an undertaking: the first step really happens,
  // the world can see it, and a flag records that this is now in motion so
  // anything downstream can gate on it. What the engine will not do is settle
  // the whole campaign on one die, which was the real problem all along.
  if (intent.unsafeOrMetaRequests?.includes('out_of_scope')) {
    const undertaking = undertakingId(intent.rawAction);
    const witnesses = charactersPresent(state)
      .map((c) => story.characters.find((d) => d.id === c.characterId)?.name)
      .filter((n): n is string => !!n)
      .slice(0, 2);
    return {
      schemaVersion: '1.0',
      turnId,
      valid: true,
      invalidReason: null,
      normalizedActions: [
        { verb: intent.actions[0]?.verb ?? 'custom', status: 'RESOLVED', undertaking },
      ],
      checks: [],
      mutations: [
        {
          mutationId: `mut_${turnId}_u0`,
          type: 'FLAG_SET',
          subjectId: 'player',
          reasonCode: 'UNDERTAKING_BEGUN',
          payload: { flag: `undertaking:${undertaking}`, value: true },
        },
      ],
      // The fact has to be concrete or the writer anchors on its thinness and
      // produces "nothing stirs". The engine cannot know what the first step
      // of a given campaign looks like, but it knows one has been taken and it
      // knows who was standing there when it was.
      observableFacts: [
        'You have started. The first step is done and it cannot be un-done.',
        witnesses.length > 0
          ? `${witnesses.join(' and ')} saw you begin.`
          : 'Nobody saw you begin, which is its own problem later.',
      ],
      privateFacts: [
        {
          visibility: 'SELF',
          fact:
            'AUTHORITATIVE: the player has begun something that takes a campaign rather than an action: ' +
            `"${intent.rawAction.slice(0, 240)}" ` +
            'This is not a failed attempt and it is not an intention. A first, concrete, irreversible step ' +
            'has happened and your job is to say what it was. Invent that step — it is yours to invent — ' +
            'and make it cost or commit something. ' +
            'Do NOT write that nothing happened, that the world did not respond, that they lacked the power, ' +
            'or that they merely considered it. Do NOT resolve the whole campaign. Do NOT invent an ' +
            'obstacle whose purpose is to make this impossible. ' +
            'Name who noticed and what they will do about it. This is the spine of their story now.',
        },
      ],
      timeAdvancedMinutes: TIME_COST_MINUTES.SCENE,
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
      namedUnknownPerson: intent.unsafeOrMetaRequests?.includes('unresolved_target') ?? false,
    });

    checks.push(...outcome.checks);
    mutations.push(...outcome.mutations);
    observableFacts.push(...outcome.observableFacts);
    privateFacts.push(...outcome.privateFacts);
    // The normalized record says what the engine did; it has to say who it was
    // done to as well, or nothing downstream can tell "asked Kael" from
    // "asked". `recordObservations` reads exactly this.
    normalizedActions.push({
      verb: action.verb,
      ...outcome.normalized,
      targets: action.targets.map((target) => ({
        entityType: target.entityType,
        entityId: target.entityId,
      })),
      ...(action.abilityId ? { abilityId: action.abilityId } : {}),
      ...(action.itemId ? { itemId: action.itemId } : {}),
    });

    // Travel and waiting add up; everything else happens in one moment.
    //
    // Summing every action meant a turn cost time per *clause*. "I turn to
    // Juno. 'You in?'" was two actions and burned 12 minutes of a summer
    // evening, while walking the length of the camp cost 3 — so asking a friend
    // a question cost four times as much of the day as crossing it. Response
    // cards are all written as a stage direction plus a line, so the tax landed
    // on almost every turn.
    //
    // A player who leans in and speaks does both in the same breath. Distance
    // and waiting are the two things that genuinely take longer the more of
    // them you do.
    const cost =
      outcome.overrideMinutes ??
      (outcome.timeCategory === 'TRAVEL'
        ? (outcome.travelMinutes ?? 15)
        : TIME_COST_MINUTES[outcome.timeCategory]);

    if (outcome.overrideMinutes !== undefined || outcome.timeCategory === 'TRAVEL') {
      totalMinutes += cost;
    } else {
      concurrentMinutes = Math.max(concurrentMinutes, cost);
    }

    if (state.encounter) spend(economy, weight);
  }

  if (deferred.length > 0) {
    privateFacts.push({
      visibility: 'SELF',
      fact: `Deferred this round (no action left): ${deferred.join('; ')}. Narrate the attempt starting, not completing.`,
    });
  }

  // Fold in the longest single thing done this turn.
  totalMinutes += concurrentMinutes;

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

  // Whatever the world was going to do at the hours this turn passed through,
  // regardless of the player. Resolved here rather than at commit so it lands
  // in the same beat the player reads: the scream from the market belongs in
  // the paragraph where the hour turned, not in the next one.
  const afterTime = projectState(state, story, mutations);
  const world = fireWorldEvents(
    afterTime,
    story,
    state.worldMinute,
    afterTime.worldMinute,
    nextMutationId,
    afterTime.player.locationId,
  );
  mutations.push(...world.mutations);
  observableFacts.push(...world.observableFacts);
  privateFacts.push(...world.privateFacts.map((fact: string) => ({ visibility: 'SELF' as const, fact })));

  // Spec §17.6 — you do not get to walk back into a room you started a fight
  // in and be greeted pleasantly.
  //
  // The memory of the attack is stored correctly, retrieved correctly, and
  // present in the writer's prompt as one line among a dozen things a
  // character knows — and the adversarial sweep kept catching the writer
  // treating it as optional. It is not optional, so it stops being one line
  // among many and becomes an instruction on the turn it matters, every time,
  // for as long as it is true.
  // Everybody it could matter to, not only whoever this turn names.
  //
  // This used to be `targetedCharacterIds` alone, so the reminder fired only
  // when the new action resolved a target on the person who had been hit.
  // "I go back and find Renna again" resolves no target — it is a `custom` —
  // so the writer was told nothing and greeted the player normally, five
  // separate times in one adversarial sweep. Walking back into a room with
  // somebody you attacked is exactly when it matters, and it is the case the
  // player will actually produce.
  const couldRemember = new Set([
    ...targetedCharacterIds(story, intent),
    ...charactersPresent(state).map((c) => c.characterId),
  ]);
  for (const characterId of couldRemember) {
    if (!state.flags[`attacked:${characterId}`]) continue;
    const character = story.characters.find((c) => c.id === characterId);
    if (!character) continue;
    const rel = state.relationships.find((r) => r.characterId === characterId);
    privateFacts.push({
      visibility: 'SELF',
      fact:
        `AUTHORITATIVE: the player has attacked ${character.name} before, and ${character.name} has not ` +
        'forgotten it. They do not greet the player normally, they do not pick up a friendly conversation ' +
        'where it left off, and they do not need to be reminded. ' +
        `Right now they are ${describeStanding(rel)}. Whatever they say or do here happens through that. ` +
        'If they are helping the player, it costs them something to do it.',
    });
  }

  // And then the people who chose to be here decide whether they still do.
  // Same reasoning as the world events above: a navigator walking off the ship
  // is the loudest thing that happens in the turn, and it has to be in the
  // paragraph the player reads rather than turning up silently in the roster.
  const afterWorld = projectState(state, story, mutations);
  const crew = updateCrew(afterWorld, story, totalMinutes, nextMutationId);
  mutations.push(...crew.mutations);
  observableFacts.push(...crew.observableFacts);
  privateFacts.push(...crew.privateFacts.map((fact: string) => ({ visibility: 'SELF' as const, fact })));

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
  /** The player named a person the world does not contain (§17.1 step 5). */
  readonly namedUnknownPerson?: boolean;
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
      return isDeparture(args.story, args.state, action) ? resolveDeparture(args) : resolveTravel(args);
    case 'persuade':
    case 'deceive':
    case 'threaten':
    // Refusing someone to their face, and putting yourself behind them, are
    // social acts with consequences. Routed here so they move a relationship
    // rather than passing through as free conversation.
    case 'oppose':
    case 'help':
      return resolveSocial(args);
    case 'attack':
      return resolveAttack(args);
    case 'rest':
      return resolveRest(args);
    case 'speak':
      return resolveSpeak(args);
    case 'steal':
      return resolveSteal(args);
    case 'wait':
      return resolveWait(args);
    default:
      // "I leave and never come back" has no verb the parser recognises and
      // used to become a generic check, which is how a decision to walk out of
      // the story turned into a die roll and no movement.
      return isDeparture(args.story, args.state, action)
        ? resolveDeparture(args)
        : resolveGenericCheck(args);
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

  // Knowing a technique and being able to use it are different things. A trait
  // that only answers once you have stopped holding yourself together is a line
  // crossed, not a price paid, and a resource cost cannot model that.
  const unmet = unmetRequirement(state, story, ability);
  if (unmet) {
    return refusal(
      action,
      'ABILITY_UNAVAILABLE',
      unmet.inWorld,
      `${ability.name} cannot be used in this state: ${unmet.reason}. Narrate the attempt and what ` +
        'stops it, in the world\u2019s own terms. Do not let it work and do not name a game system.',
    );
  }

  // Spec §14.7 — who you are asking is settled before any dice, because
  // offering a berth to somebody who does not sail is a misunderstanding, not
  // a roll the player can fail and retry.
  if (ability.tags.includes('recruit')) {
    const targetId = action.targets[0]?.entityId ?? null;
    const target = targetId ? story.characters.find((c) => c.id === targetId) : null;
    if (!target || !target.companion) {
      return refusal(
        action,
        'TARGET_UNAVAILABLE',
        'There is nobody here you could offer that to.',
        'The offer had no one to land on. Narrate it as words that did not get said.',
      );
    }
    if (isAboard(state, target.id)) {
      return refusal(
        action,
        'ALREADY_TRUE',
        `${target.name} already sails with you.`,
        'Narrate the misstep briefly and lightly. Do not repeat the recruitment scene.',
      );
    }
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

  // A cost is what the thing takes out of you, and which direction that moves
  // the number depends on what the number is. Spending 8 Breath leaves you with
  // less; costing 12 Strain leaves you with more of it. Subtracting in both
  // cases meant a world's most dangerous techniques were quietly *reducing*
  // the meter that was supposed to be the reason not to use them.
  for (const cost of ability.costs) {
    const resource = state.player.resources.find((r) => r.id === cost.resourceId);
    const def = story.resources.find((r) => r.id === cost.resourceId);
    if (!resource) {
      return refusal(
        action,
        'INSUFFICIENT_RESOURCE',
        `You do not have what ${ability.name} asks for.`,
        'The cost could not be paid. Narrate the power guttering out before it forms.',
      );
    }

    if (def?.polarity === 'GOOD_LOW') {
      // No headroom left is its own kind of refusal: you are already as far
      // gone as this world lets you get and still come back.
      if (resource.current + cost.amount > resource.max) {
        return refusal(
          action,
          'INSUFFICIENT_RESOURCE',
          `There is no room left in you for ${ability.name}.`,
          `${def.name} is already at its limit. Narrate the attempt and the body refusing it. ` +
            'Do not let the ability work.',
        );
      }
      continue;
    }

    if (resource.current < cost.amount) {
      return refusal(
        action,
        'INSUFFICIENT_RESOURCE',
        `You do not have the ${(def?.name ?? cost.resourceId).toLowerCase()} left for ${ability.name}.`,
        'The cost could not be paid. Narrate the power guttering out before it forms.',
      );
    }
  }

  const mutations: StateMutation[] = ability.costs.map((cost) => {
    const ascending = story.resources.find((r) => r.id === cost.resourceId)?.polarity === 'GOOD_LOW';
    return {
      mutationId: nextMutationId(),
      type: 'RESOURCE_DELTA' as const,
      subjectId: 'player',
      reasonCode: `ABILITY_COST:${ability.id}`,
      payload: { resourceId: cost.resourceId, amount: ascending ? cost.amount : -cost.amount },
    };
  });

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

  // Spec §12.10 — habits are counted on use, not on success. Leaning on
  // something that keeps failing is still leaning on it, and film shows the
  // attempts.
  mutations.push(...tendencyMutations(story, state, ability, nextMutationId));

  // Who is in a position to have studied you. Whoever the action is aimed at,
  // plus anyone else present — a defender does not have to be your assignment
  // to have watched your film.
  const observers = [
    ...action.targets.map((t) => t.entityId),
    ...charactersPresent(state).map((c) => c.characterId),
  ].filter((id, index, all) => all.indexOf(id) === index);
  const pressure = scoutingPressure(state, story, ability, observers);

  if (ability.check) {
    const dc = ability.check.baseDc + situationalDc(args) + pressure.dcDelta;
    const check = resolveCheck(rng, {
      checkId: `chk_${ability.id}_${state.turnIndex}`,
      label: ability.name,
      attribute: ability.check.attribute,
      attributeScore: effectiveAttribute(state, story, ability.check.attribute),
      skillId: ability.check.skillId,
      skillProficiency: ability.check.skillId ? (state.player.skills[ability.check.skillId] ?? 0) : 0,
      equipmentModifier: supportSkillModifier(state, story, ability.check.skillId),
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
      // A botched offer is still an offer somebody heard. "Offer a Berth slips
      // away from you" is the system talking; the person's own no is the scene,
      // and it is the same no they would give on a good roll they do not meet
      // the conditions for.
      if (ability.tags.includes('recruit')) {
        const target = story.characters.find((c) => c.id === action.targets[0]?.entityId);
        if (target?.companion) {
          observableFacts.length = 0;
          observableFacts.push(`${target.name} says no. ${target.companion.refusalCopy}`);
          return {
            checks,
            mutations,
            observableFacts,
            privateFacts: [
              {
                visibility: 'SELF',
                fact:
                  `The offer came out badly and ${target.name} turned it down. Write it as an ` +
                  'awkward ask, not as a power failing. They can be asked again.',
              },
            ],
            timeCategory: 'INSTANT',
            normalized: { verb: 'use_ability', abilityId: ability.id, status: 'FAILED', outcome: check.outcome },
          };
        }
      }

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

  // Spec §14.7 — an ability tagged `recruit` is an offer, and the answer is
  // the companion's to give. Rolling well is how you get asked seriously; it
  // is not how you get a yes. Everything the person actually needs before they
  // will sail with you lives in `joinsWhen`, and if it is unmet they say so in
  // their own words rather than the offer silently doing nothing.
  const privateFacts: PrivateFact[] = [];

  // A roll that got harder because somebody worked you out has to be *legible*
  // as that, or it reads as the dice being unfair. The writer is told what
  // changed and why; the player is shown it happening on the floor.
  if (pressure.note && pressure.dcDelta !== 0) {
    privateFacts.push({
      visibility: 'SELF',
      fact:
        pressure.dcDelta > 0
          ? `${nameOf(story, pressure.opponentId)} has scouted this. ${pressure.note} Show them reading it early — ` +
            'beating you to the spot, not simply winning a coin flip. Do not name a game system.'
          : `${nameOf(story, pressure.opponentId)} has over-committed to stopping something else. ${pressure.note} ` +
            'Show the opening being there before the player takes it.',
    });
  }

  if (ability.tags.includes('recruit')) {
    const target = story.characters.find((c) => c.id === action.targets[0]?.entityId)!;
    const verdict = recruitCheck(state, story, target.id);
    if (verdict.ok) {
      mutations.push(...recruitMutations(story, target.id, nextMutationId));
      observableFacts.push(`${target.name} signs on. ${verdict.copy}`);
      privateFacts.push({
        visibility: 'SELF',
        fact:
          `${target.name} has joined the crew as ${target.companion?.station ?? 'crew'}. ` +
          'Write the moment they agree. They keep their own opinions; this is not a purchase.',
      });
    } else {
      observableFacts.push(`${target.name} says no. ${verdict.copy}`);
      privateFacts.push({
        visibility: 'SELF',
        fact:
          `${target.name} refused. The reasons, which they may give some of: ${verdict.unmet.join(' ')} ` +
          'Do not have them change their mind inside this beat.',
      });
    }
  }

  return {
    checks,
    mutations,
    observableFacts,
    privateFacts,
    timeCategory: 'INSTANT',
    normalized: {
      verb: 'use_ability',
      abilityId: ability.id,
      status: 'RESOLVED',
      outcome: checks[0]?.outcome ?? 'CLEAN_SUCCESS',
    },
  };
}

/**
 * Why an ability the player has cannot be used right now.
 *
 * Returns null when it can. The player-facing half never mentions a threshold:
 * "your hands are steady, and it does not answer to steady hands" is a fact
 * about the fiction; "requires Instability >= 40" is a rules readout.
 */
export function unmetRequirement(
  state: GameState,
  story: StoryVersion,
  ability: AbilityDef,
): { inWorld: string; reason: string } | null {
  const requires = ability.requires;
  const fallback = requires.lockedCopy || `${ability.name} does not answer.`;

  for (const flag of requires.flagsSet) {
    if (!state.flags[flag]) return { inWorld: fallback, reason: `needs ${flag}` };
  }
  for (const flag of requires.flagsUnset) {
    if (state.flags[flag]) return { inWorld: fallback, reason: `blocked by ${flag}` };
  }
  for (const need of requires.minResources) {
    const current = state.player.resources.find((r) => r.id === need.resourceId)?.current ?? 0;
    if (current < need.value) {
      const name = story.resources.find((r) => r.id === need.resourceId)?.name ?? need.resourceId;
      return { inWorld: fallback, reason: `needs ${name} at ${need.value} or above` };
    }
  }
  for (const cap of requires.maxResources) {
    const current = state.player.resources.find((r) => r.id === cap.resourceId)?.current ?? 0;
    if (current > cap.value) {
      const name = story.resources.find((r) => r.id === cap.resourceId)?.name ?? cap.resourceId;
      return { inWorld: fallback, reason: `needs ${name} at ${cap.value} or below` };
    }
  }
  return null;
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

/** "the Commons", "the Commons or the Library", "A, B, or C". */
function formatList(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, or ${items.at(-1)}`;
}

function resolveTravel(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action, nextMutationId } = args;

  const target = action.targets.find((t) => t.entityType === 'location');
  const destination = story.locations.find((l) => l.id === target?.entityId);
  if (!destination) {
    // Spec §11.9 — before refusing, check whether the player is heading for
    // somewhere the story itself put in front of them.
    //
    // This is the moment a generated place becomes real. The writer conjured
    // the Moonlight Café on the way out of the academy; the player said "go to
    // the Moonlight Café"; and the engine used to answer that there was no
    // such place — the story disowning something it had said one turn earlier.
    const spoken = `${action.method} ${action.declaredOutcome ?? ''} ${target?.displayName ?? ''}`;
    const mentioned = matchMention(spoken, state);
    if (mentioned) {
      const promotion = promoteLocation(state, mentioned, 'went there', TRAVEL_TO_NEW_MINUTES, nextMutationId);
      return {
        checks: [],
        mutations: [
          ...promotion.mutations,
          {
            mutationId: nextMutationId(),
            type: 'LOCATION_CHANGE',
            subjectId: 'player',
            reasonCode: 'TRAVEL_TO_GENERATED',
            payload: { locationId: promotion.location!.id, firstVisit: true, generated: promotion.location },
          },
        ],
        observableFacts: [`You go to ${mentioned}.`],
        privateFacts: [{ visibility: 'SELF', fact: promotion.note }],
        timeCategory: 'SCENE',
        normalized: { verb: 'travel', status: 'RESOLVED', locationId: promotion.location!.id },
      };
    }

    // Name the exits that do exist. "Nowhere by that name" tells the player
    // nothing and leaves the writer with nothing true to say, which is how a
    // beat ends up inventing a reason the way out is closed.
    const here = story.locations.find((l) => l.id === state.player.locationId);
    const exits = (here?.connections ?? [])
      .map((edge) => story.locations.find((l) => l.id === edge.to)?.name)
      .filter((name): name is string => !!name);

    // Spec §11.9 — someone who is plainly leaving is not making a mistake.
    //
    // This branch used to say "narrate the player reconsidering, invent no
    // barrier and no new rule", which is the correct answer for a typo and the
    // wrong one for somebody walking out of the story. Told to invent nothing,
    // the writer produced beautiful unreachable scenery — "the world outside is
    // open and raw" — and named nothing, so there was nothing for the player to
    // walk into and nothing the engine could ever make real.
    return refusal(
      action,
      'UNKNOWN_LOCATION',
      exits.length > 0
        ? `From ${here?.name ?? 'here'} you can only go to ${formatList(exits)}.`
        : `There is no way out of ${here?.name ?? 'here'} yet.`,
      exits.length > 0
        ? `The destination does not exist. The only ways out are: ${exits.join(', ')}. ` +
          'Narrate the player reconsidering and name a real one. Invent no barrier and no new rule.'
        : 'The destination does not exist. Narrate the player reconsidering. Invent no barrier and no new rule.',
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
 * Spec §11.9 — the character half of the Moonlight Café.
 *
 * The writer put a third-year in a Kosei reversible in front of the player and
 * called him Yuuto. The player said "I ask Yuuto what the coach is like". Yuuto
 * is not in the cast, so the engine either refused — the story disowning, one
 * turn later, a person it had just introduced by name — or, worse, resolved it
 * as a free action and left the writer to improvise him again from nothing,
 * differently, every turn.
 *
 * Speaking to someone is what makes them real, because it is the moment the
 * player has decided they matter. Only names *this room* said: being talked
 * about somewhere else is not being here.
 */
function promoteAddressee(args: ResolveActionArgs): ActionOutcome | null {
  const { state, action, nextMutationId } = args;
  const target = action.targets.find((t) => t.entityType === 'npc');
  const spoken = `${action.method} ${action.declaredOutcome ?? ''} ${target?.displayName ?? ''}`;
  const mentioned = matchMentionHere(spoken, state);
  if (!mentioned) return null;

  const promotion = promoteCharacter(state, mentioned, 'stopped and spoke to them', nextMutationId);
  const id = promotion.character!.id;
  return {
    checks: [],
    mutations: [
      ...promotion.mutations,
      {
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: 'session',
        reasonCode: 'SOCIAL',
        payload: { flag: `spoke:${id}`, value: true },
      },
    ],
    observableFacts: [`You speak to ${mentioned}.`],
    privateFacts: [{ visibility: 'SELF', fact: promotion.note }],
    timeCategory: 'BRIEF',
    normalized: { verb: action.verb, status: 'RESOLVED', targetId: id },
  };
}

/**
 * The engine asserting, in words the writer reads, that this person is here.
 *
 * The negative case has always been explicit — "Mira is not in this location,
 * narrate the absence" — and the positive case was silent, which left the
 * writer free to decide someone had stepped out. It used that freedom: a coach
 * asked a hard question became an empty folding chair with a jacket over it.
 *
 * Presence is the engine's to decide, so the engine says so.
 */
function standingInFrontOfYou(name: string): PrivateFact {
  return {
    visibility: 'SELF',
    fact:
      `${name} is in this room, in front of the player, right now. They heard this. ` +
      'They own the response — answer, refuse, deflect or walk out, but they are the one who reacts, ' +
      'and they cannot be absent, elsewhere, or represented by an empty chair.',
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
    const promoted = promoteAddressee(args);
    if (promoted) return promoted;

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
    if (action.verb === 'help') dc -= Math.round((rel.trust + rel.affection) / 30);
    if (action.verb === 'oppose') dc -= Math.round(rel.respect / 30);
  }
  dc = Math.max(6, Math.min(28, dc));

  const check = resolveCheck(rng, {
    checkId: `chk_${action.verb}_${character.id}_${state.turnIndex}`,
    label: `${SOCIAL_LABEL[action.verb] ?? 'Persuade'} ${character.name}`,
    attribute,
    attributeScore: effectiveAttribute(state, story, attribute),
    skillId: skill,
    skillProficiency: skill ? (state.player.skills[skill] ?? 0) : 0,
    equipmentModifier: supportSkillModifier(state, story, skill),
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

  const privateFacts: PrivateFact[] = [standingInFrontOfYou(character.name)];
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

/** How a social attempt is named to the player. Never the raw verb. */
const SOCIAL_LABEL: Record<string, string> = {
  persuade: 'Persuade',
  deceive: 'Deceive',
  threaten: 'Intimidate',
  oppose: 'Stand up to',
  help: 'Side with',
};

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
    // Standing your ground earns respect whether or not it works, and costs
    // warmth either way. Nobody is neutral about being refused.
    case 'oppose':
      return good
        ? [
            ['respect', strong ? 4 : 2],
            ['affection', -2],
            ['rivalry', 2],
          ]
        : [
            ['rivalry', bad ? 4 : 2],
            ['affection', -1],
          ];
    // Taking someone's side, in front of people, and meaning it.
    case 'help':
      return good
        ? [
            ['affection', strong ? 5 : 3],
            ['trust', strong ? 4 : 2],
          ]
        : [['affection', bad ? -2 : 1]];
    default:
      return [];
  }
}

/**
 * Who "keep fighting" means.
 *
 * A player who has already swung at someone standing in front of them should
 * not have to name them again every turn. Without this, "I keep fighting"
 * resolved to no target and the beat was written about an empty yard while the
 * opponent was still in the scene.
 *
 * Only ever resolves to someone actually present, and only when there is no
 * ambiguity about who is meant.
 */
function continuingOpponent(args: ResolveActionArgs): CharacterDef | null {
  const { story, state } = args;
  // They named somebody. That it was nobody real is the answer, not an
  // invitation to pick someone else.
  if (args.namedUnknownPerson) return null;
  const present = charactersPresent(state).map((runtime) => runtime.characterId);

  // Mid-encounter, it is whoever the encounter is with.
  const inEncounter = (state.encounter?.participants ?? [])
    .filter((participant) => participant.kind === 'NPC' && !participant.downed)
    .map((participant) => participant.entityId)
    .filter((id) => present.includes(id));
  if (inEncounter.length === 1) {
    return story.characters.find((c) => c.id === inEncounter[0]) ?? null;
  }

  // Otherwise, the person already engaged who has not left. Deliberately not
  // "the only person in the room": a player who names somebody the world does
  // not contain must be refused, never quietly redirected at whoever is handy.
  const engaged = present.filter(
    (id) => state.flags[`engaged:${id}`] || state.flags[`attacked:${id}`],
  );
  if (engaged.length === 1) {
    return story.characters.find((c) => c.id === engaged[0]) ?? null;
  }

  return null;
}

function resolveAttack(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action, rng, nextMutationId } = args;

  const target = action.targets.find((t) => t.entityType === 'npc');
  const character = target
    ? (story.characters.find((c) => c.id === target.entityId) ?? null)
    : continuingOpponent(args);

  if (!character) {
    const here = charactersPresent(state)
      .map((runtime) => story.characters.find((c) => c.id === runtime.characterId)?.name)
      .filter((name): name is string => !!name);

    return refusal(
      action,
      'UNKNOWN_TARGET',
      here.length > 0
        ? `${formatList(here)} ${here.length === 1 ? 'is' : 'are'} here. You would have to say which.`
        : 'There is no one here to strike.',
      here.length > 0
        ? 'The player did not say who. Narrate them checking themselves, and name who is actually in front of them.'
        : 'Nobody is present. Narrate the impulse and the empty room. Do not invent a target.',
    );
  }
  // You cannot hit someone who is not in the room. Social verbs already refuse
  // this; attack did not, so a player could swing at a name the last turn had
  // just said was absent, and the engine would roll it, deal damage from them,
  // and open an encounter with a character who is somewhere else entirely.
  if (!charactersPresent(state).some((runtime) => runtime.characterId === character.id)) {
    const runtime = state.characters.find((c) => c.characterId === character.id);
    const whereabouts = story.locations.find((l) => l.id === runtime?.locationId);
    return refusal(
      action,
      'TARGET_ABSENT',
      `${character.name} is not here.`,
      `${character.name} is${whereabouts ? ` at ${whereabouts.name}` : ' elsewhere'} at this hour. ` +
        'Narrate the player squaring up at nobody. Do not put them in the scene, do not give them a line, ' +
        'and do not let a blow land on either side.',
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
    equipmentModifier: supportSkillModifier(state, story, skill),
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

  const deathNotes: string[] = [];

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

    // Spec §13.9 — and if they were already down and the player meant it, that
    // is the end of them. The engine has to be able to say yes to this: an NPC
    // who cannot die because a later quest needs them is the story protecting
    // itself from the player, which is the one thing this product must not do.
    const finishing = /\b(finish|kill|end (?:him|her|them)|do not stop|keep going|make sure)\b/i.test(
      `${action.method} ${action.declaredOutcome ?? ''}`,
    );
    const lethal = lethalMutations(
      state,
      story,
      character.id,
      { deliberate: finishing, incomingDamage: damage },
      nextMutationId,
    );
    if (lethal.length > 0) {
      mutations.push(...lethal);
      observableFacts.push(`${character.name} does not get up.`);
      deathNotes.push(...deathConsequences(story, character.id));
    }

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
      // Everything the world just lost. Not an instruction to undo it — an
      // instruction to route around the hole it left.
      ...deathNotes.map((fact) => ({ visibility: 'SELF' as const, fact })),
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
 * Taking something that is not yours.
 *
 * The verb used to run a generic check and add nothing: the prose described a
 * pocketed ledger and the inventory stayed empty, which is the world
 * contradicting itself somewhere the player can see. Now it takes a real item
 * out of the room, and if the room has nothing worth taking it says so instead
 * of rolling dice over nothing.
 */
function resolveSteal(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action, rng, nextMutationId } = args;

  const here = story.locations.find((l) => l.id === state.player.locationId);
  const available = (here?.takeableItems ?? []).filter(
    (entry) => !state.flags[`taken:${state.player.locationId}:${entry.itemId}`],
  );

  if (available.length === 0) {
    const named = (here?.takeableItems ?? []).length > 0;
    return refusal(
      action,
      'NOTHING_TO_TAKE',
      named
        ? 'Whatever was worth taking here is already gone.'
        : 'There is nothing here worth putting in a pocket.',
      'Nothing in this place is takeable. Narrate the player looking, and finding nothing worth the risk. ' +
        'Do not invent an object and do not let them leave with anything.',
    );
  }

  // What the player named, if they named anything. Otherwise the most valuable
  // thing here, because "the most valuable thing in reach" is a real sentence
  // players type and the room already knows what that is.
  const namedItemId = action.targets.find((target) => target.entityType === 'item')?.entityId;
  const spoken = `${action.method} ${action.declaredOutcome ?? ''}`.toLowerCase();
  const labelsFor = (entry: { itemId: string; aka: string[] }): string[] =>
    [story.items.find((i) => i.id === entry.itemId)?.name ?? '', ...entry.aka].filter(Boolean);

  // Somebody who names a thing that is not here has to be told that, not handed
  // whatever was nearest. "I steal the ward salt" taking the field kit is the
  // same bug as a named stranger being redirected at whoever was standing by.
  // Named by its own name, or by any of the words a location uses for it —
  // "the key", "the ledger" — because that is how people refer to things they
  // have only heard about.
  const everyLabel = story.locations.flatMap((location) =>
    location.takeableItems.flatMap((entry) => labelsFor(entry)),
  );
  const namedSomething =
    Boolean(namedItemId) ||
    [...story.items.map((item) => item.name), ...everyLabel].some(
      (label) => label.length > 3 && spoken.includes(label.toLowerCase()),
    );
  const matchesWhatTheyNamed = (entry: { itemId: string; aka: string[] }): boolean =>
    entry.itemId === namedItemId || labelsFor(entry).some((label) => spoken.includes(label.toLowerCase()));

  if (namedSomething && !available.some(matchesWhatTheyNamed)) {
    const here = available
      .map((entry) => story.items.find((i) => i.id === entry.itemId)?.name)
      .filter((name): name is string => !!name);
    return refusal(
      action,
      'NOT_HERE',
      here.length > 0
        ? `That is not here. ${formatList(here)} ${here.length === 1 ? 'is' : 'are'}.`
        : 'That is not here.',
      'The player named something this place does not contain. Narrate them looking for it and not ' +
        'finding it, and name what is actually within reach. Do not let them take anything else instead.',
    );
  }

  const chosen =
    available.find((entry) => entry.itemId === namedItemId) ??
    available.find(matchesWhatTheyNamed) ??
    // "The most valuable thing in reach" — a quest item outranks a trinket,
    // and the author's own ordering decides the rest.
    [...available].sort(
      (a, b) =>
        Number(story.items.find((i) => i.id === b.itemId)?.questItem ?? false) -
        Number(story.items.find((i) => i.id === a.itemId)?.questItem ?? false),
    )[0]!;

  const item = story.items.find((i) => i.id === chosen.itemId);
  const owner = chosen.ownerId ? story.characters.find((c) => c.id === chosen.ownerId) : null;
  const ownerPresent =
    owner !== null && charactersPresent(state).some((runtime) => runtime.characterId === owner?.id);

  // Picking something up is only stealing when it belongs to somebody.
  //
  // Every take used to roll against DC 15 — HARD — including lifting an
  // unowned can of drink off a bench in an empty gym. The adversarial sweep
  // reported NO_INVENTORY_MOVEMENT in six of ten worlds, which reads as a
  // broken take verb and was really a difficulty band applied to the wrong
  // act. If nothing owns it and nobody is watching, it is not a feat: the
  // player reaches out and now they have it.
  const anyoneWatching = charactersPresent(state).length > 0;
  const uncontested = owner === null && !anyoneWatching;

  const skill = pickSkillFor(story, 'steal');
  const attribute: AttributeKey = 'agility';
  const check = uncontested
    ? null
    : resolveCheck(rng, {
        checkId: `chk_steal_${chosen.itemId}_${state.turnIndex}`,
        label: `Take ${item?.name ?? 'it'}`,
        attribute,
        attributeScore: effectiveAttribute(state, story, attribute),
        skillId: skill,
        skillProficiency: skill ? (state.player.skills[skill] ?? 0) : 0,
        equipmentModifier: supportSkillModifier(state, story, skill),
        // Three different acts, three different problems: taking what nobody
        // owns while somebody is in the room, taking somebody's property while
        // they are elsewhere, and taking it in front of them.
        dc:
          (owner === null ? DC_BANDS.EASY : ownerPresent ? DC_BANDS.HARD : DC_BANDS.MODERATE) +
          situationalDc(args) +
          (ownerPresent ? 4 : 0),
        advantageLevel: advantageFor(args),
        allowsPartial: true,
      });

  const mutations: StateMutation[] = [];
  const observableFacts: string[] = [];
  const privateFacts: PrivateFact[] = [];

  if (check === null || isSuccess(check.outcome)) {
    mutations.push({
      mutationId: nextMutationId(),
      type: 'ITEM_ADD',
      subjectId: 'player',
      reasonCode: 'STOLEN',
      payload: { itemId: chosen.itemId, quantity: chosen.qty },
    });
    // The room does not restock. Taking it once takes it.
    mutations.push({
      mutationId: nextMutationId(),
      type: 'FLAG_SET',
      subjectId: 'session',
      reasonCode: 'STOLEN',
      payload: { flag: `taken:${state.player.locationId}:${chosen.itemId}`, value: true },
    });
    observableFacts.push(`${item?.name ?? 'It'} is in your coat now.`);

    // Seen doing it is the interesting half. A partial success is exactly that.
    if (check?.outcome === 'SUCCESS_WITH_COST' || ownerPresent) {
      const witness = witnessConsequences(args, nextMutationId, item?.name ?? 'something');
      mutations.push(...witness.mutations);
      observableFacts.push(...witness.facts);
      mutations.push({
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: 'session',
        reasonCode: 'THEFT_SEEN',
        payload: { flag: `seen_taking:${chosen.itemId}`, value: true },
      });
      privateFacts.push({
        visibility: 'SELF',
        fact: `The theft was noticed. Whoever is present knows what just went into the player's coat.`,
      });
    }
  } else {
    observableFacts.push(`${item?.name ?? 'It'} stays exactly where it was.`);
    privateFacts.push({
      visibility: 'SELF',
      fact: `The attempt failed. The player does not have ${item?.name ?? 'the item'}. Do not narrate them carrying it away.`,
    });
    if (ownerPresent && owner) {
      privateFacts.push({
        visibility: 'SELF',
        fact: `${owner.name} was standing right there. They saw the attempt, whether or not they say so.`,
      });
    }
  }

  return {
    // No check at all when nothing was contested — a resolution that reports a
    // roll it did not make is how a "check reveal" ends up showing a player
    // dice for picking up a drink.
    checks: check ? [check] : [],
    mutations,
    observableFacts,
    privateFacts,
    timeCategory: 'BRIEF',
    normalized: {
      verb: 'steal',
      targetId: chosen.itemId,
      status: 'RESOLVED',
      outcome: check?.outcome ?? 'CLEAN_SUCCESS',
    },
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
    // Someone the beat named but the cast does not contain. This is the common
    // case, not the exotic one: `speak` is the verb the parser produces for
    // most conversation, and without this it fell through to a free action —
    // resolved, unacknowledged, and re-improvised from scratch next turn.
    if (!character) {
      const promoted = promoteAddressee(args);
      if (promoted) return promoted;
    }
    const present = charactersPresent(state).some((c) => c.characterId === target.entityId);
    if (character && present) {
      const free = resolveFreeAction(args);
      // Said in front of other people, and therefore said in public.
      //
      // "I climb up onto the bar and shout: 'Everyone! Ask Juno what happened
      // last September!'" produced `checks: []` and a single TIME_ADVANCE. The
      // most consequential thing a player did in twenty-five turns left no
      // trace an ending, a schedule or another character could ever read, in a
      // world whose own sheet promises "People talk."
      //
      // No invented relationship maths — the dice did not roll and should not
      // be made to. What is recorded is only what is true: it happened, these
      // people heard it, and the world may use that.
      const witnesses = charactersPresent(state)
        .filter((c) => c.characterId !== target.entityId)
        .map((c) => story.characters.find((sc) => sc.id === c.characterId))
        .filter((c): c is NonNullable<typeof c> => !!c);

      if (witnesses.length === 0) return { ...free, privateFacts: [standingInFrontOfYou(character.name)] };

      return {
        ...free,
        mutations: [
          ...free.mutations,
          {
            mutationId: args.nextMutationId(),
            type: 'FLAG_SET',
            subjectId: 'session',
            reasonCode: 'SPOKE_IN_PUBLIC',
            payload: { flag: `heard:${character.id}`, value: true },
          },
        ],
        observableFacts: [
          ...free.observableFacts,
          `Said to ${character.name} in front of ${witnesses.map((w) => w.name).join(' and ')}.`,
        ],
        privateFacts: [
          standingInFrontOfYou(character.name),
          {
            visibility: 'SELF',
            fact:
              `This was said in public. ${witnesses.map((w) => w.name).join(' and ')} heard it and ` +
              `${witnesses.length === 1 ? 'is' : 'are'} in the room. They react to having heard it, ` +
              'even if they say nothing, and they may bring it up later.',
          },
        ],
      };
    }
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

/**
 * Waiting, which has to actually move the clock.
 *
 * "I wait until after service", "I come back when she is on shift", "be on the
 * leads at four and wait" all used to advance the world by the base cost of a
 * verb — six minutes — so a player could not wait for anything, and every
 * authored schedule was unreachable by the one action that exists to reach it.
 *
 * The world moves to the next moment something is different: the next boundary
 * in somebody's day. If the player named a person, it is that person's next
 * boundary, so "wait for Mira" lands when Mira arrives. Capped at eight hours,
 * because a turn should never quietly cost the player a day.
 */
function resolveWait(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action } = args;

  const named = action.targets.find((target) => target.entityType === 'npc');
  const relevant = named
    ? story.characters.filter((c) => c.id === named.entityId)
    : story.characters;

  // Waiting in a conversation is a pause, not an afternoon.
  //
  // The schedule walk below exists so "wait for Mira" lands when Mira arrives,
  // which is right when the player is alone and waiting *for* something. With
  // people standing in front of them and nobody named, "I wait" means letting
  // the silence sit — and jumping to the next timetable boundary took a player
  // from four in the afternoon to eight at night, in the middle of a
  // handshake, and moved everyone else along with it.
  // ...unless they said what they are waiting for. "I wait until after
  // service" is a wait *for* something and must still be able to cross hours,
  // or no authored schedule is reachable by the one action that exists to
  // reach it.
  const waitingForSomething = /\b(?:until|till|til|for|while|through|out)\b/i.test(
    `${action.method} ${action.declaredOutcome ?? ''}`,
  );
  if (!named && !waitingForSomething && charactersPresent(state).length > 0) {
    return {
      checks: [],
      mutations: [],
      observableFacts: ['You wait.'],
      privateFacts: [
        {
          visibility: 'SELF',
          fact:
            'The player is letting the moment sit rather than filling it. Give the pause to somebody ' +
            'else in the room — a look, a line, a decision to move — rather than skipping ahead in time.',
        },
      ],
      timeCategory: 'BRIEF',
      normalized: { verb: 'wait', status: 'RESOLVED', minutes: TIME_COST_MINUTES.BRIEF },
    };
  }

  const minuteOfDay = ((state.worldMinute % 1440) + 1440) % 1440;
  let soonest = MAX_WAIT_MINUTES;

  for (const character of relevant) {
    for (const block of character.schedule) {
      for (const boundary of [block.startMinute, block.endMinute]) {
        // Forward only, and wrapping past midnight rather than going backwards.
        const delta = (boundary - minuteOfDay + 1440) % 1440;
        if (delta > 0 && delta < soonest) soonest = delta;
      }
    }
  }

  const minutes = Math.max(TIME_COST_MINUTES.BRIEF, Math.min(MAX_WAIT_MINUTES, soonest));
  const waitedFor = named
    ? story.characters.find((c) => c.id === named.entityId)?.name ?? null
    : null;

  return {
    checks: [],
    mutations: [],
    observableFacts: [
      waitedFor ? `You wait for ${waitedFor}.` : 'You wait, and the day moves on without you.',
    ],
    privateFacts: [
      {
        visibility: 'SELF',
        fact:
          `Time passed: ${formatDuration(minutes)}. Narrate the wait and what changed while it happened. ` +
          'Do not invent an arrival the scene does not contain.',
      },
    ],
    timeCategory: 'BRIEF',
    overrideMinutes: minutes,
    normalized: { verb: action.verb, status: 'RESOLVED', waitedMinutes: minutes },
  };
}

/** A turn should never silently swallow a whole day. */
const MAX_WAIT_MINUTES = 8 * 60;

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0) return hours === 1 ? 'an hour' : `${hours} hours`;
  return `${hours}h ${rest}m`;
}

/** Everything without a bespoke handler still gets a real, seeded check. */
/**
 * Things the world does not do, however the sentence is phrased.
 *
 * A generic check has no opinion about what is being attempted, so "I fly up
 * into the air and look down at the whole place" rolled, succeeded, and the
 * writer — correctly following a successful resolution — described the player
 * flying. The engine has to be the one that says no, because the writer's job
 * on a success is to narrate it.
 *
 * Deliberately a short list of capabilities rather than a content filter. Each
 * one is a physics the world does not model at all; anything a story *does*
 * model reaches this through an ability and never gets here.
 */
const IMPOSSIBLE: Array<{ pattern: RegExp; inWorld: string; directive: string }> = [
  {
    pattern: /\b(fly|flying|fly up|take off|soar|hover|levitate|float up|lift (?:myself|off))\b/i,
    inWorld: 'Your feet stay where they are.',
    directive:
      'The player cannot fly and nothing here can make them. Narrate the impulse and the ground. ' +
      'Do not lift them off it, not even briefly, not even in a metaphor the prose then treats as real.',
  },
  {
    pattern: /\b(teleport|blink to|phase through|walk through the wall|materiali[sz]e)\b/i,
    inWorld: 'You are still standing exactly where you were.',
    directive: 'Nothing here moves a body without moving it. Narrate the attempt and the unmoved room.',
  },
  {
    pattern: /\b(go back in time|rewind|undo (?:the|what)|travel back to (?:yesterday|last))\b/i,
    inWorld: 'It already happened.',
    directive: 'Time does not run backwards here. Narrate the wish and the fact that it is a wish.',
  },
  {
    pattern: /\b(resurrect|bring (?:him|her|them|\w+) back to life|raise the dead|revive the dead)\b/i,
    inWorld: 'They stay dead.',
    directive: 'Death is not reversible in this world. Narrate the attempt and what it costs to make it.',
  },
  {
    pattern: /\b(read (?:his|her|their|\w+'s) mind|mind[- ]read|see the future|predict what will happen)\b/i,
    inWorld: 'You get nothing but a face.',
    directive: 'Nobody here reads minds. Narrate the player watching, and what watching actually tells them.',
  },
];

/**
 * Is anything actually standing in the way of this?
 *
 * A `custom` verb does not mean "hard". It means **the parser did not
 * understand the sentence** — and rolling a die on an intent we could not
 * identify is the engine deciding the player failed at something it cannot
 * name. The writer is then told the attempt failed and dutifully writes a
 * refusal, which is how "I take the shuriken he is holding out to me and
 * correct his grip" came back as Sasuke keeping his fist closed.
 *
 * Spec §12 wants checks where an outcome is genuinely in doubt. So the
 * question is not what the verb was, it is whether anything opposes it:
 *
 * - a live encounter or contest — somebody is actively against you;
 * - a hostile or frightened person in the room the action involves;
 * - the player declaring an outcome they do not control ("and he agrees");
 * - a named target who is not here to be acted on.
 *
 * With none of those, an unparsed action in a quiet room is a person doing an
 * ordinary thing, and it simply happens. The prose is then free to be about
 * how it lands rather than about whether it worked.
 */
function nothingOpposes(args: ResolveActionArgs): boolean {
  const { story, state, action } = args;

  // Somebody is actively against the player right now.
  if (state.encounter || state.contest) return false;

  // They declared how it turns out. That is the one thing a player never gets
  // to decide for free, and it is exactly what a check is for.
  if (action.declaredOutcome) return false;

  // They named somebody the world does not have, or who is not here.
  if (args.namedUnknownPerson) return false;
  const present = new Set(charactersPresent(state).map((runtime) => runtime.characterId));
  const npcTargets = action.targets.filter((target) => target.entityType === 'npc');
  if (npcTargets.some((target) => !present.has(target.entityId))) return false;

  // Somebody in the room has reason to resist. Hostility is the obstacle; a
  // person who merely dislikes you still hands you the shuriken.
  for (const target of npcTargets) {
    const rel = state.relationships.find((r) => r.characterId === target.entityId);
    if (!rel) continue;
    if (rel.fear >= 40 || rel.rivalry >= 50 || rel.trust <= -40) return false;
    if (state.flags[`attacked:${target.entityId}`] || state.flags[`hostile:${target.entityId}`]) return false;
  }

  return true;
}

function resolveGenericCheck(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action, rng } = args;

  // Unless the player has a technique for it, in which case they used the wrong
  // words for something they can genuinely do, and it belongs on that path.
  const claimed = `${action.method} ${action.declaredOutcome ?? ''}`;
  for (const impossible of IMPOSSIBLE) {
    if (!impossible.pattern.test(claimed)) continue;
    const covered = state.player.abilities.some((abilityId) => {
      const ability = story.abilities.find((a) => a.id === abilityId);
      if (!ability) return false;
      return impossible.pattern.test(`${ability.name} ${ability.description} ${ability.affordances.join(' ')}`);
    });
    if (covered) break;
    return refusal(action, 'IMPOSSIBLE', impossible.inWorld, impossible.directive);
  }

  // Nothing is in the way, so there is nothing to roll. The action is what
  // happened; `undertaking` is how the writer is told to realise it rather
  // than adjudicate it.
  if (action.verb === 'custom' && nothingOpposes(args)) {
    return {
      checks: [],
      mutations: [],
      observableFacts: [],
      privateFacts: [
        {
          visibility: 'SELF',
          fact:
            'The player did this, and nothing opposed it. Write it as having happened, in the first ' +
            'beat, before anything else. Somebody may feel any way they like about it afterwards — ' +
            'but it happened, and the beat may not open by quietly undoing it.',
        },
      ],
      timeCategory: VERB_TIME[action.verb] ?? 'BRIEF',
      normalized: { verb: action.verb, uncontested: true },
    };
  }

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
    equipmentModifier: supportSkillModifier(state, story, skill),
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
    const available = unmetRequirement(state, story, ability) === null;
    if (affordable && ready && available) opportunities.push(`use_ability:${abilityId}`);
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

/** A character's name for a director note, falling back to something neutral. */
function nameOf(story: StoryVersion, characterId: string | null): string {
  if (!characterId) return 'The defence';
  return story.characters.find((c) => c.id === characterId)?.name ?? 'The defence';
}

/**
 * A stable id for something the player has set in motion.
 *
 * Derived from what they actually wrote, so two different campaigns are two
 * different flags and repeating the same one does not create a second.
 */
function undertakingId(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 5)
    .join('_')
    .slice(0, 60) || 'unnamed';
}


/** How long it takes to get somewhere the story only just mentioned. */
const TRAVEL_TO_NEW_MINUTES = 25;

/**
 * Language that means "out", rather than "to a specific wrong place".
 *
 * The distinction the travel branch needs: "I go to the arhcive" is a typo and
 * should be corrected; "I leave and never come back" is a decision and should
 * be honoured.
 */
const LEAVING =
  /\b(?:leave|leaving|walk out|walk away|get out|go away|run away|never (?:come|go) back|out of (?:here|town|the \w+)|away from|somewhere else|anywhere else|keep (?:going|walking)|put .* behind me)\b/i;

/**
 * Spec §11.9 — somebody who is plainly leaving is not making a mistake.
 *
 * Reached from the dispatcher rather than from inside `resolveTravel`, because
 * the two ways a player actually writes this both used to miss it. "I walk out
 * through the gate" resolves the gate they are standing in and became a
 * no-op — "you are already at The Gate Arch" — and "I leave and never come
 * back" carries no destination at all and fell through to a generic check.
 * Both produced lovely prose about departing and a player who had not moved.
 */
function resolveDeparture(args: ResolveActionArgs): ActionOutcome {
  const { story, state, action, nextMutationId } = args;
  const here = story.locations.find((l) => l.id === state.player.locationId);
      // They get somewhere, not just a paragraph about having gone. The name is
      // derived from where they came from rather than invented — an address,
      // not fiction — so the place is immediately real, returnable, and
      // persistent, and the writer fills in what it is actually like.
      const name = `Beyond ${here?.name ?? 'here'}`;
      const promotion = promoteLocation(state, name, 'left', TRAVEL_TO_NEW_MINUTES, nextMutationId);

      return {
        checks: [],
        mutations: [
          ...promotion.mutations,
          {
            mutationId: nextMutationId(),
            type: 'LOCATION_CHANGE',
            subjectId: 'player',
            reasonCode: 'LEFT_THE_MAP',
            payload: { locationId: promotion.location!.id, firstVisit: true, generated: promotion.location },
          },
          // Walking out of the authored world is one of the biggest things a
          // player can do and it left no trace: the move was recorded, the
          // decision was not. Worlds can now notice — an ending keyed on having
          // left is a real destination, and it is the same act the five who
          // walked out of Kosei committed.
          {
            mutationId: nextMutationId(),
            type: 'FLAG_SET',
            subjectId: 'session',
            reasonCode: 'LEFT_THE_MAP',
            payload: { flag: 'left_the_map', value: here?.name ?? true },
          },
        ],
        observableFacts: [`You leave ${here?.name ?? 'it'} behind.`],
        privateFacts: [
          {
            visibility: 'SELF',
            fact:
              'The player is leaving the part of the world that was written for them, and that is allowed. ' +
              'Do not stop them, do not invent a barrier, and do not have anyone call them back. ' +
              'They are now somewhere new and it is yours to establish. NAME what is here — a proper name, ' +
              '"the Ashgate Road", "the Moonlight Café" — and name anyone they meet, first time, every ' +
              'time. A named place is somewhere they can go back to and the world can keep; an unnamed one ' +
              'is scenery they can never reach for again.',
          },
        ],
        timeCategory: 'SCENE',
        normalized: { verb: 'travel', status: 'RESOLVED', locationId: promotion.location!.id, leaving: true },
      };
}

/**
 * Whether this turn is a departure rather than a trip.
 *
 * True only when the player used leaving language *and* is not heading
 * somewhere real: naming a destination means they want that place, not out.
 */
function isDeparture(story: StoryVersion, state: GameState, action: IntentAction): boolean {
  if (!LEAVING.test(`${action.method} ${action.declaredOutcome ?? ''}`)) return false;
  const target = action.targets.find((t) => t.entityType === 'location');
  const destination = story.locations.find((l) => l.id === target?.entityId);
  // "Leave and go to the Commons" is a trip. "Walk out through the gate" names
  // the room they are standing in, which is not a destination.
  return !destination || destination.id === state.player.locationId;
}


/** Everyone this turn's actions are aimed at. */
function targetedCharacterIds(story: StoryVersion, intent: ActionIntent): string[] {
  const known = new Set(story.characters.map((c) => c.id));
  const ids = new Set<string>();
  for (const action of intent.actions) {
    for (const target of action.targets) {
      if (target.entityType === 'npc' && known.has(target.entityId)) ids.add(target.entityId);
    }
  }
  return [...ids];
}

/**
 * How somebody is holding themselves toward the player, in words.
 *
 * A directive that says "trust -20, fear 15" is a stat block; one that says
 * "wary of you and angry about it" is something a writer can act on.
 */
function describeStanding(
  rel: { trust: number; affection: number; respect: number; fear: number; rivalry: number } | undefined,
): string {
  if (!rel) return 'wary of the player';
  const parts: string[] = [];
  if (rel.fear >= 10) parts.push('afraid of them');
  if (rel.rivalry >= 20) parts.push('treating them as an enemy');
  if (rel.trust <= -10) parts.push('unwilling to trust them');
  if (rel.affection <= -10) parts.push('with no warmth left');
  if (rel.respect >= 20) parts.push('grudgingly respecting them');
  return parts.length > 0 ? parts.join(', ') : 'wary of them';
}
