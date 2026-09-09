import type {
  GameEvent,
  GameState,
  Resolution,
  StateMutation,
  StoryVersion,
} from '@aniplay/contracts';
import { applyMutations, regenerateResources, validateMutations, type MutationRejection } from './mutations.js';
import { advanceQuests, rewardMutationsFor, type QuestTransition } from './quests.js';
import { levelUpMutations, milestoneMutations } from './progression.js';
import { evaluateGates } from './relationships.js';
import { encounterOutcome, defeatMutations } from './combat.js';
import { locationForSchedule } from './state.js';

/**
 * Spec §32.4 `commitTurn` — the single transaction that turns a `Resolution`
 * into the next authoritative snapshot.
 *
 * Order matters. Direct mutations land first, then world time and schedules
 * settle, then quests re-evaluate against the world as it now is, then rewards
 * and progression cascade. Quest predicates must never see half-applied state.
 */

export interface CommitResult {
  readonly state: GameState;
  readonly events: GameEvent[];
  readonly questTransitions: QuestTransition[];
  readonly rejectedMutations: MutationRejection[];
  readonly gatesOpened: Array<{ characterId: string; gateId: string; label: string }>;
  readonly defeat: { occurred: boolean; narrativeHint: string | null };
}

export interface CommitOptions {
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly resolution: Resolution;
  readonly turnId: string;
  /** Mutations proposed outside the resolution (director memory writes, etc). */
  readonly extraMutations?: readonly StateMutation[];
  readonly now?: () => string;
}

export function commitTurn(options: CommitOptions): CommitResult {
  const { story, resolution, turnId } = options;
  const now = options.now ?? ((): string => new Date().toISOString());

  let counter = 0;
  const nextMutationId = (): string => `mut_${turnId}_c${counter++}`;

  const proposed = [...resolution.mutations, ...(options.extraMutations ?? [])];
  const { accepted, rejected } = validateMutations(proposed, options.state, story);

  const minutesElapsed = resolution.timeAdvancedMinutes;
  let state = applyMutations(options.state, story, accepted);

  // World time has moved: regenerate resources and let NPCs follow their schedules.
  regenerateResources(state, story, minutesElapsed);
  applySchedules(state, story);

  // Quests re-evaluate against settled state, then their rewards apply, then
  // progression reacts to those rewards. Two passes, not a fixed point loop.
  const questTransitions = advanceQuests(state, story);
  const rewards = rewardMutationsFor(questTransitions, story, nextMutationId);
  if (rewards.length > 0) {
    const validatedRewards = validateMutations(rewards, state, story);
    rejected.push(...validatedRewards.rejected);
    state = applyMutations(state, story, validatedRewards.accepted);
    accepted.push(...validatedRewards.accepted);
  }

  const progression = [
    ...levelUpMutations(state, story, nextMutationId),
    ...milestoneMutations(state, story, nextMutationId),
  ];
  if (progression.length > 0) {
    state = applyMutations(state, story, progression);
    accepted.push(...progression);
  }

  // Defeat is resolved after everything else, so the mode applies to final health.
  let defeat: CommitResult['defeat'] = { occurred: false, narrativeHint: null };
  if (state.encounter) {
    const outcome = encounterOutcome(state.encounter);
    if (outcome === 'PLAYER_DEFEAT') {
      const { mutations, narrativeHint } = defeatMutations(state, story, nextMutationId);
      state = applyMutations(state, story, mutations);
      accepted.push(...mutations);
      defeat = { occurred: true, narrativeHint };
    } else if (outcome === 'PLAYER_VICTORY') {
      const end: StateMutation = {
        mutationId: nextMutationId(),
        type: 'ENCOUNTER_END',
        subjectId: 'session',
        reasonCode: 'PLAYER_VICTORY',
        payload: {},
      };
      state = applyMutations(state, story, [end]);
      accepted.push(end);
    }
  }

  const gatesOpened = evaluateGates(state, story);
  for (const gate of gatesOpened) {
    const rel = state.relationships.find((r) => r.characterId === gate.characterId);
    if (rel && !rel.unlockedGates.includes(gate.gateId)) rel.unlockedGates.push(gate.gateId);
  }

  for (const transition of questTransitions) {
    const eventId = `${transition.questId}:${transition.to}`;
    if (!state.completedEventIds.includes(eventId)) state.completedEventIds.push(eventId);
  }

  state.turnIndex += 1;
  state.revision += 1;
  state.arc = advanceArc(state, questTransitions.length > 0, resolution.checks.length > 0);
  state.rngCursor = resolution.checks.reduce((sum, check) => sum + check.rolls.length, state.rngCursor);

  const events = buildEvents(state, turnId, accepted, questTransitions, now);

  return { state, events, questTransitions, rejectedMutations: rejected, gatesOpened, defeat };
}

/** Spec §14.6 — NPCs move with the clock, without an LLM running in the background. */
function applySchedules(state: GameState, story: StoryVersion): void {
  for (const runtime of state.characters) {
    if (!runtime.alive) continue;
    const def = story.characters.find((c) => c.id === runtime.characterId);
    if (!def || def.schedule.length === 0) continue;
    // A character in the room with the player stays put; the scene outranks the
    // timetable so people do not vanish mid-conversation.
    if (runtime.locationId === state.player.locationId) continue;
    const scheduled = locationForSchedule(def.schedule, state.worldMinute);
    if (scheduled) runtime.locationId = scheduled;
  }
}

/**
 * Spec §16.5 — pacing is state, not a timer. Episodes advance through a shape
 * and reset at a rest beat, so cliffhangers are not fired every N turns.
 */
function advanceArc(
  state: GameState,
  questMoved: boolean,
  hadCheck: boolean,
): GameState['arc'] {
  const arc = { ...state.arc, turnsInEpisode: state.arc.turnsInEpisode + 1 };

  const tensionDelta = (questMoved ? 0.12 : 0) + (hadCheck ? 0.06 : -0.04);
  arc.tensionScore = Math.max(0, Math.min(1, arc.tensionScore + tensionDelta));

  const order: GameState['arc']['pacingStage'][] = [
    'HOOK',
    'OBJECTIVE',
    'CHOICES',
    'ESCALATION',
    'CONSEQUENCE',
    'REST',
  ];
  const index = order.indexOf(arc.pacingStage);

  // Escalate on real movement or sustained tension; never purely on turn count.
  const shouldAdvance =
    (questMoved && index < order.length - 1) ||
    (arc.tensionScore > 0.7 && index < 3) ||
    arc.turnsInEpisode >= 6 * (index + 1);

  if (shouldAdvance && index < order.length - 1) {
    arc.pacingStage = order[index + 1]!;
  }

  if (arc.pacingStage === 'REST' && arc.turnsInEpisode >= 8) {
    arc.episode += 1;
    arc.turnsInEpisode = 0;
    arc.pacingStage = 'HOOK';
    arc.tensionScore = 0.3;
  }

  return arc;
}

function buildEvents(
  state: GameState,
  turnId: string,
  mutations: readonly StateMutation[],
  transitions: readonly QuestTransition[],
  now: () => string,
): GameEvent[] {
  const events: GameEvent[] = [];
  let sequence = 0;

  for (const mutation of mutations) {
    events.push({
      eventId: `evt_${turnId}_${sequence}`,
      sessionId: state.sessionId,
      turnId,
      sequence: sequence++,
      type: mutation.type,
      subjectId: mutation.subjectId,
      reasonCode: mutation.reasonCode,
      payload: mutation.payload,
      worldMinute: state.worldMinute,
      createdAt: now(),
    });
  }

  for (const transition of transitions) {
    events.push({
      eventId: `evt_${turnId}_${sequence}`,
      sessionId: state.sessionId,
      turnId,
      sequence: sequence++,
      type: 'QUEST_TRANSITION',
      subjectId: transition.questId,
      reasonCode: transition.reasonCode,
      payload: { from: transition.from, to: transition.to, stepId: transition.stepId },
      worldMinute: state.worldMinute,
      createdAt: now(),
    });
  }

  return events;
}

/**
 * Spec §11.7 / §20.10 — forking copies authoritative state at an event into a
 * new branch. The original is never destroyed, and the fork gets its own RNG
 * lineage so it does not replay the parent's rolls.
 */
export function forkState(
  state: GameState,
  newSessionId: string,
): GameState {
  const forked = structuredClone(state);
  forked.sessionId = newSessionId;
  forked.revision = 0;
  return forked;
}
