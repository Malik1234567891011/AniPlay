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
import { charactersPresent, locationForSchedule } from './state.js';
import type { FiredWorldEvent } from './world-events.js';
import { echoDirectorNotes, loopShouldReset, resetLoop, type LoopResetResult } from './loop.js';
import { departuresFromMutations, type CrewDeparture } from './crew.js';
import { scoutingMutations } from './tendencies.js';
import { contestResultFlags } from './contest.js';

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
  /** What the world did on its own while the turn was resolving. */
  readonly worldEvents: FiredWorldEvent[];
  /** Facts the world events produced, to be merged into the beat. */
  readonly worldEventFacts: { observable: string[]; private: string[] };
  /** Set on the turn a looping world started again. */
  readonly loopReset: { occurred: boolean; loopNumber: number; directorNotes: string[] };
  /** Anybody who stopped being crew this turn. Spec §14.7. */
  readonly crewDepartures: CrewDeparture[];
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


  // Then record what the engine actually observed this turn, before quests are
  // asked what has happened. Without this a quest can only ever gate on where
  // the player is standing and what they are holding, which is why authored
  // steps like "find the archive assistant" could never complete.
  recordObservations(state, story, resolution);

  // A match that has ended is a thing the world knows about. Recorded before
  // quests are evaluated, so a step can be written against having played
  // somebody — which is the whole shape of a season.
  if (state.contest?.finished) {
    const results = contestResultFlags(state.contest).filter((flag) => !state.flags[flag]);
    if (results.length > 0) {
      const resultMutations: StateMutation[] = results.map((flag) => ({
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: state.contest!.opponentId,
        reasonCode: 'CONTEST_RESULT',
        payload: { flag, value: true },
      }));
      state = applyMutations(state, story, resultMutations);
      accepted.push(...resultMutations);
    }
  }

  // Spec §12.10 — anyone who competed against the player today takes something
  // away from it. Once per world-day per opponent: a rival who guards you for
  // a whole game has learned a game's worth, not a turn's worth, and charging
  // per turn would let one long scene solve the player completely.
  const scouted = applyScouting(state, story, nextMutationId);
  if (scouted.length > 0) {
    state = applyMutations(state, story, scouted);
    accepted.push(...scouted);
  }

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

      // In a world that starts again, dying is how most weeks end. The clock
      // goes to midnight and the reset below does the rest, so death and
      // running out of time are the same event rather than two systems that
      // have to agree with each other.
      if (story.rules.loop) state.worldMinute = story.rules.loop.endWorldMinute;
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
  state.arc = advanceArc(
    state,
    questTransitions.length > 0,
    resolution.checks.length > 0,
    sceneBroken(resolution),
  );
  state.rngCursor = resolution.checks.reduce((sum, check) => sum + check.rolls.length, state.rngCursor);

  // Last of all: a world that has reached its end starts again. After the turn
  // has fully committed, so the week that just ended is a real week in the log
  // before it is rolled back.
  let loop: LoopResetResult | null = null;
  if (loopShouldReset(state, story)) loop = resetLoop(state, story);

  const events = buildEvents(state, turnId, accepted, questTransitions, now);
  if (loop) {
    events.push({
      eventId: `${turnId}:loop`,
      sessionId: state.sessionId,
      turnId,
      sequence: events.length,
      type: 'LOOP_RESET',
      subjectId: 'session',
      reasonCode: 'WORLD_ENDED',
      payload: { loopNumber: loop.loopNumber },
      worldMinute: state.worldMinute,
      createdAt: now(),
    });
    state = loop.state;
  }

  return {
    state,
    events,
    questTransitions,
    rejectedMutations: rejected,
    gatesOpened,
    defeat,
    // Fired during resolution, so the beat the player reads contains them.
    worldEvents: [],
    worldEventFacts: { observable: [], private: [] },
    loopReset: {
      occurred: loop !== null,
      loopNumber: loop?.loopNumber ?? 1,
      directorNotes: loop ? echoDirectorNotes(story, loop.echoes) : [],
    },
    // Decided during resolution, so the beat the player reads contains them.
    crewDepartures: departuresFromMutations(story, accepted),
  };
}

/**
 * Spec §15.1 — the world facts a quest may be written against.
 *
 * A deterministic engine can only gate on what it saw, so this is the whole
 * vocabulary of what it saw, written as flags with reserved prefixes:
 *
 * - `met:<characterId>`      the player has shared a scene with them
 * - `spoke:<characterId>`    the player addressed them
 * - `attacked:<characterId>` set at resolution time
 * - `engaged:<characterId>`  the player is in a fight with them right now
 * - `visited:<locationId>`   the player has stood there
 * - `used:<abilityId>`       the player used it
 * - `inspected:<entityId>`   the player examined it, and the place they did it
 *
 * Authors compose these with the predicate's other fields — items, location,
 * relationship, faction standing, world time — and with flags earlier steps
 * award. Anything a story invents beyond that has to be produced by a step
 * reward or a route, which the launch-catalog tests enforce.
 */
function recordObservations(state: GameState, story: StoryVersion, resolution: Resolution): void {
  const set = (flag: string): void => {
    if (!state.flags[flag]) state.flags[flag] = true;
  };

  set(`visited:${state.player.locationId}`);
  for (const runtime of charactersPresent(state)) set(`met:${runtime.characterId}`);

  const SPEAKING = new Set(['speak', 'persuade', 'deceive', 'threaten', 'help', 'oppose', 'interact', 'custom']);
  const characterIds = new Set(story.characters.map((c) => c.id));

  for (const action of resolution.normalizedActions) {
    const verb = typeof action.verb === 'string' ? action.verb : '';
    const targets = Array.isArray(action.targets) ? action.targets : [];

    const abilityId = typeof action.abilityId === 'string' ? action.abilityId : null;
    if (verb === 'use_ability' && abilityId) set(`used:${abilityId}`);

    // Whoever the player is currently in it with, so "keep fighting" on the
    // next turn knows who that means without being told again.
    const hostile =
      verb === 'attack' ||
      (verb === 'use_ability' &&
        !!abilityId &&
        (story.abilities.find((a) => a.id === abilityId)?.tags ?? []).includes('offensive'));

    // Examining anything here counts as having looked at the place, which is
    // what "read your own entry in the register" actually needs to know.
    if (verb === 'inspect') set(`inspected:${state.player.locationId}`);

    for (const target of targets) {
      const id = (target as { entityId?: unknown })?.entityId;
      if (typeof id !== 'string') continue;
      if (verb === 'inspect') set(`inspected:${id}`);
      if (SPEAKING.has(verb) && characterIds.has(id)) set(`spoke:${id}`);
      if (hostile && characterIds.has(id)) set(`engaged:${id}`);
    }
  }
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
 * Spec §16.5 — a turn that fundamentally changes the scene.
 *
 * The director plans a beat expecting the scene it was given. When the player
 * starts a fight, walks out, or gets someone killed, continuing that plan is
 * how a story ends up ignoring what the player just did. This flags the turn so
 * pacing re-plans rather than resuming its script.
 */
function sceneBroken(resolution: Resolution): boolean {
  return resolution.mutations.some(
    (m) =>
      m.type === 'ENCOUNTER_START' ||
      m.type === 'ENCOUNTER_END' ||
      m.type === 'LOCATION_CHANGE' ||
      m.reasonCode === 'ATTACKED_BY_PLAYER' ||
      m.reasonCode === 'NPC_CALLED_FOR_HELP',
  );
}

/**
 * Spec §16.5 — pacing is state, not a timer. Episodes advance through a shape
 * and reset at a rest beat, so cliffhangers are not fired every N turns.
 */
function advanceArc(
  state: GameState,
  questMoved: boolean,
  hadCheck: boolean,
  broken = false,
): GameState['arc'] {
  const arc = { ...state.arc, turnsInEpisode: state.arc.turnsInEpisode + 1 };

  // A broken scene jumps straight to consequence and spikes tension. The
  // previous plan is abandoned rather than resumed, which is the difference
  // between a story that reacts and a screenplay that ignores you.
  if (broken) {
    arc.pacingStage = 'CONSEQUENCE';
    arc.tensionScore = Math.min(1, arc.tensionScore + 0.35);
    return arc;
  }

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

/**
 * Opponents study the player. Spec §12.10.
 *
 * Gated on having actually been in it with them this turn — `engaged:` is set
 * by the observation pass above — and then rate-limited to once per world-day
 * per opponent, so an opponent's understanding grows over a season rather than
 * over a conversation.
 */
function applyScouting(
  state: GameState,
  story: StoryVersion,
  nextMutationId: () => string,
): StateMutation[] {
  const day = Math.floor(state.worldMinute / 1440);
  const mutations: StateMutation[] = [];

  for (const character of story.characters) {
    if (!character.scouting) continue;
    if (!state.flags[`engaged:${character.id}`]) continue;

    const marker = `scouted_on:${character.id}:${day}`;
    if (state.flags[marker]) continue;

    const learned = scoutingMutations(state, story, character.id, nextMutationId);
    if (learned.length === 0) continue;

    mutations.push(...learned, {
      mutationId: nextMutationId(),
      type: 'FLAG_SET',
      subjectId: character.id,
      reasonCode: 'SCOUTING_SESSION',
      payload: { flag: marker, value: true },
    });
  }

  return mutations;
}
