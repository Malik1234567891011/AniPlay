import type {
  GameState,
  QuestDef,
  QuestPredicate,
  QuestProgress,
  QuestStatus,
  StateMutation,
  StoryVersion,
} from '@aniplay/contracts';
import { countItem } from './state.js';
import { isDeadlinePassed } from './clock.js';

/**
 * Spec §15 — quest state machine.
 *
 * Every transition is decided by evaluating predicates against authoritative
 * state. The director may narrate a quest step as complete; it does not become
 * complete unless the predicate says so.
 */

export function evaluatePredicate(
  predicate: QuestPredicate | null,
  state: GameState,
): boolean {
  if (!predicate) return false;

  for (const flag of predicate.flagsSet) {
    if (!state.flags[flag]) return false;
  }
  for (const flag of predicate.flagsUnset) {
    if (state.flags[flag]) return false;
  }
  for (const itemId of predicate.hasItems) {
    if (countItem(state, itemId) <= 0) return false;
  }
  if (predicate.atLocation && state.player.locationId !== predicate.atLocation) return false;
  for (const eventId of predicate.completedEvents) {
    if (!state.completedEventIds.includes(eventId)) return false;
  }
  for (const req of predicate.minRelationship) {
    const rel = state.relationships.find((r) => r.characterId === req.characterId);
    if (!rel || rel[req.dimension] < req.value) return false;
  }
  for (const req of predicate.minFactionReputation) {
    const faction = state.factions.find((f) => f.factionId === req.factionId);
    if (!faction || faction.reputation < req.value) return false;
  }
  if (predicate.afterWorldMinute !== null && state.worldMinute < predicate.afterWorldMinute) {
    return false;
  }
  if (predicate.beforeWorldMinute !== null && state.worldMinute >= predicate.beforeWorldMinute) {
    return false;
  }
  return true;
}

export interface QuestTransition {
  readonly questId: string;
  readonly from: QuestStatus;
  readonly to: QuestStatus;
  readonly stepId: string | null;
  readonly playerCopy: string;
  readonly reasonCode: string;
  /** Which of several possible routes the player actually took, when relevant. */
  readonly routeId?: string;
  readonly routeLabel?: string;
  readonly setsFlags?: readonly string[];
  readonly closesFlags?: readonly string[];
}

/**
 * A step is satisfied by its single predicate, or by any one of its alternative
 * routes. The route that fired is reported, because the rest of the story
 * branches on which one it was.
 */
function evaluateStepSuccess(
  step: { succeedWhen: QuestPredicate | null; succeedWhenAny: readonly {
    routeId: string; label: string; predicate: QuestPredicate;
    setsFlags: string[]; closesFlags: string[];
  }[] },
  state: GameState,
): { satisfied: boolean; route?: { routeId: string; label: string; setsFlags: string[]; closesFlags: string[] } } {
  for (const route of step.succeedWhenAny) {
    if (evaluatePredicate(route.predicate, state)) {
      return {
        satisfied: true,
        route: {
          routeId: route.routeId,
          label: route.label,
          setsFlags: route.setsFlags,
          closesFlags: route.closesFlags,
        },
      };
    }
  }
  if (evaluatePredicate(step.succeedWhen, state)) return { satisfied: true };
  return { satisfied: false };
}

/**
 * Recomputes every quest against current state and returns the transitions that
 * fired. Called after mutations are applied, so predicates see settled truth.
 */
export function advanceQuests(state: GameState, story: StoryVersion): QuestTransition[] {
  const transitions: QuestTransition[] = [];

  for (const quest of story.quests) {
    const progress = state.quests.find((q) => q.questId === quest.id);
    if (!progress) continue;

    if (progress.status === 'COMPLETED' || progress.status === 'FAILED' || progress.status === 'EXPIRED') {
      continue;
    }

    // Discovery: an unavailable quest becomes visible once its gate opens.
    if (progress.status === 'UNAVAILABLE') {
      if (evaluatePredicate(quest.discoverWhen, state)) {
        transitions.push({
          questId: quest.id,
          from: progress.status,
          to: 'DISCOVERED',
          stepId: quest.steps[0]?.id ?? null,
          playerCopy: quest.steps[0]?.playerCopy ?? quest.summary,
          reasonCode: 'QUEST_DISCOVERED',
        });
        progress.status = 'DISCOVERED';
        progress.currentStepId = quest.steps[0]?.id ?? null;
      } else {
        continue;
      }
    }

    // A discovered quest activates when its first step's entry predicate holds.
    if (progress.status === 'DISCOVERED') {
      const firstStep = quest.steps[0];
      if (firstStep && (firstStep.enterWhen === null || evaluatePredicate(firstStep.enterWhen, state))) {
        transitions.push({
          questId: quest.id,
          from: 'DISCOVERED',
          to: 'ACTIVE',
          stepId: firstStep.id,
          playerCopy: firstStep.playerCopy,
          reasonCode: 'QUEST_ACTIVATED',
        });
        progress.status = 'ACTIVE';
        progress.currentStepId = firstStep.id;
        progress.startedAtWorldMinute = state.worldMinute;
      }
    }

    if (progress.status !== 'ACTIVE' && progress.status !== 'BLOCKED') continue;

    // Walk forward through as many steps as now satisfy their success predicate,
    // so one decisive action can close several steps at once.
    let guard = 0;
    while (guard++ < quest.steps.length + 1) {
      const step = quest.steps.find((s) => s.id === progress.currentStepId);
      if (!step) break;

      if (isDeadlinePassed(state.worldMinute, step.deadlineWorldMinute)) {
        transitions.push({
          questId: quest.id,
          from: progress.status,
          to: 'EXPIRED',
          stepId: step.id,
          playerCopy: step.playerCopy,
          reasonCode: 'DEADLINE_PASSED',
        });
        progress.status = 'EXPIRED';
        break;
      }

      if (evaluatePredicate(step.failWhen, state)) {
        transitions.push({
          questId: quest.id,
          from: progress.status,
          to: 'FAILED',
          stepId: step.id,
          playerCopy: step.playerCopy,
          reasonCode: 'STEP_FAILED',
        });
        progress.status = 'FAILED';
        break;
      }

      const success = evaluateStepSuccess(step, state);
      if (!success.satisfied) break;

      if (!progress.completedStepIds.includes(step.id)) progress.completedStepIds.push(step.id);

      // Taking a route *is* part of resolving the step, so its flags land before
      // the next step's entry gate is evaluated. Applying them later as a reward
      // stalls the chain on a gate the route was meant to open.
      if (success.route) {
        state.flags[`route:${quest.id}:${success.route.routeId}`] = true;
        for (const flag of success.route.setsFlags) state.flags[flag] = true;
        for (const flag of success.route.closesFlags) state.flags[`closed:${flag}`] = true;
      }

      const nextStep = quest.steps[quest.steps.indexOf(step) + 1];
      if (!nextStep) {
        transitions.push({
          questId: quest.id,
          from: progress.status,
          to: 'COMPLETED',
          stepId: step.id,
          playerCopy: step.playerCopy,
          reasonCode: 'QUEST_COMPLETED',
          ...(success.route ?? {}),
          routeLabel: success.route?.label,
        });
        progress.status = 'COMPLETED';
        progress.currentStepId = null;
        break;
      }

      // The next step may itself be gated; hold here until its entry opens.
      if (nextStep.enterWhen !== null && !evaluatePredicate(nextStep.enterWhen, state)) {
        transitions.push({
          questId: quest.id,
          from: progress.status,
          to: 'BLOCKED',
          stepId: nextStep.id,
          playerCopy: nextStep.playerCopy,
          reasonCode: 'STEP_GATED',
          ...(success.route ?? {}),
          routeLabel: success.route?.label,
        });
        progress.status = 'BLOCKED';
        progress.currentStepId = nextStep.id;
        break;
      }

      transitions.push({
        questId: quest.id,
        from: progress.status,
        to: 'ACTIVE',
        stepId: nextStep.id,
        playerCopy: nextStep.playerCopy,
        reasonCode: 'STEP_ADVANCED',
        ...(success.route ?? {}),
        routeLabel: success.route?.label,
      });
      progress.status = 'ACTIVE';
      progress.currentStepId = nextStep.id;
    }
  }

  return transitions;
}

/** Rewards owed for steps that closed this turn, as mutations for the normal write path. */
export function rewardMutationsFor(
  transitions: readonly QuestTransition[],
  story: StoryVersion,
  nextMutationId: () => string,
): StateMutation[] {
  const mutations: StateMutation[] = [];
  for (const transition of transitions) {
    if (transition.to !== 'COMPLETED' && transition.reasonCode !== 'STEP_ADVANCED') continue;
    const quest = story.quests.find((q) => q.id === transition.questId);
    const step = quest?.steps.find((s) => s.id === transition.stepId);
    if (!step) continue;

    if (step.rewards.xp > 0) {
      mutations.push({
        mutationId: nextMutationId(),
        type: 'XP_DELTA',
        subjectId: 'player',
        reasonCode: `QUEST_REWARD:${transition.questId}`,
        payload: { amount: step.rewards.xp },
      });
    }
    for (const item of step.rewards.items) {
      mutations.push({
        mutationId: nextMutationId(),
        type: 'ITEM_ADD',
        subjectId: 'player',
        reasonCode: `QUEST_REWARD:${transition.questId}`,
        payload: { itemId: item.itemId, quantity: item.qty },
      });
    }
    for (const abilityId of step.rewards.abilities) {
      mutations.push({
        mutationId: nextMutationId(),
        type: 'ABILITY_UNLOCK',
        subjectId: 'player',
        reasonCode: `QUEST_REWARD:${transition.questId}`,
        payload: { abilityId },
      });
    }
    for (const flag of step.rewards.flags) {
      mutations.push({
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: 'session',
        reasonCode: `QUEST_REWARD:${transition.questId}`,
        payload: { flag, value: true },
      });
    }

    // The route taken is recorded as canon, and the routes it closed off are
    // marked shut. A choice that costs nothing is not a choice.
    if (transition.routeId) {
      mutations.push({
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: 'session',
        reasonCode: `ROUTE_TAKEN:${transition.questId}`,
        payload: { flag: `route:${transition.questId}:${transition.routeId}`, value: true },
      });
      for (const flag of transition.setsFlags ?? []) {
        mutations.push({
          mutationId: nextMutationId(),
          type: 'FLAG_SET',
          subjectId: 'session',
          reasonCode: `ROUTE_TAKEN:${transition.questId}`,
          payload: { flag, value: true },
        });
      }
      for (const flag of transition.closesFlags ?? []) {
        mutations.push({
          mutationId: nextMutationId(),
          type: 'FLAG_SET',
          subjectId: 'session',
          reasonCode: `ROUTE_CLOSED:${transition.questId}`,
          payload: { flag: `closed:${flag}`, value: true },
        });
      }
    }
  }
  return mutations;
}

/** The single line shown in the session header (spec §26.9 ObjectiveStrip). */
export function topObjective(state: GameState, story: StoryVersion): string | null {
  const priority: QuestStatus[] = ['ACTIVE', 'BLOCKED', 'DISCOVERED'];
  const byKind = (q: QuestDef): number => (q.kind === 'MAIN' ? 0 : q.kind === 'SIDE' ? 1 : 2);

  const candidates = state.quests
    .filter((p) => priority.includes(p.status))
    .map((p) => ({ progress: p, def: story.quests.find((q) => q.id === p.questId) }))
    .filter((c): c is { progress: QuestProgress; def: QuestDef } => !!c.def)
    .sort(
      (a, b) =>
        priority.indexOf(a.progress.status) - priority.indexOf(b.progress.status) ||
        byKind(a.def) - byKind(b.def),
    );

  const top = candidates[0];
  if (!top) return null;
  const step = top.def.steps.find((s) => s.id === top.progress.currentStepId);
  return step?.playerCopy ?? top.def.summary;
}
