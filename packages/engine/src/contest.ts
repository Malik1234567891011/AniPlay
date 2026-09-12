import type { ContestState, GameState, StoryVersion } from '@plotbreak/contracts';
import type { SeededRng } from './rng.js';
import { effectiveModifier } from './state.js';
import { tendencyProfile } from './tendencies.js';

// `formatClock` here is a game clock (minutes:seconds remaining), not the world
// clock in clock.ts, so it stays local rather than colliding on the barrel.

/**
 * Spec §13.8 — a match with a clock, most of which the player does not play.
 *
 * The two failure modes this is built between:
 *
 * Resolving a whole game in one model call means the score is whatever the
 * prose felt like, nobody can lose a game they should have lost, and the
 * fourth quarter has no more weight than the first.
 *
 * Playing every possession means a forty-minute game is two hundred turns, the
 * player spends most of them on a routine transition bucket, and by the fourth
 * quarter they want it to be over. That is how a sports game becomes homework.
 *
 * So the engine simulates and hands over. Ordinary stretches are simulated
 * deterministically from team strength, the player's own rating and fatigue;
 * the player is handed the ball when the possession is worth playing — the
 * closing minutes of a tight game, a run that needs stopping, a matchup change,
 * a personal confrontation. Everything the simulation did is on the record, so
 * the beat the player reads is describing a game that actually happened.
 */

export interface ContestOpponentRating {
  /** Roughly how good they are, on the same scale as a check modifier. */
  readonly strength: number;
  /** How fast they pull away when they are on a run. */
  readonly aggression: number;
}

export interface StartContestOptions {
  readonly contestId: string;
  readonly opponentId: string;
  readonly opponentName: string;
  readonly stakes: string;
  readonly periodCount?: number;
  readonly periodSeconds?: number;
  readonly matchupId?: string | null;
}

export function startContest(options: StartContestOptions): ContestState {
  return {
    contestId: options.contestId,
    opponentId: options.opponentId,
    opponentName: options.opponentName,
    stakes: options.stakes,
    period: 1,
    periodCount: options.periodCount ?? 4,
    clockSeconds: options.periodSeconds ?? 600,
    playerScore: 0,
    opponentScore: 0,
    playerPossession: true,
    momentum: 0,
    playerFatigue: 0,
    playerFouls: 0,
    matchupId: options.matchupId ?? null,
    playerControlled: false,
    controlReason: '',
    possessionsSinceControl: 99,
    log: [],
    finished: false,
    playerWon: null,
  };
}

/** Seconds a simulated possession consumes. Real enough to make a clock matter. */
const POSSESSION_SECONDS = 18;

export interface SimulationResult {
  readonly contest: ContestState;
  /** What happened, in order, safe to render. */
  readonly beats: string[];
  /** Set when the simulation stopped early to hand the player the ball. */
  readonly handOver: string | null;
}

/**
 * Runs the game forward until something worth playing happens.
 *
 * `maxPossessions` is a ceiling, not a target: the sim stops the moment the
 * game becomes interesting, which is the entire point. A blowout runs a long
 * way in one call; a one-possession game in the fourth stops almost
 * immediately.
 */
export function simulateContest(
  state: GameState,
  story: StoryVersion,
  rng: SeededRng,
  opponent: ContestOpponentRating,
  maxPossessions = 12,
): SimulationResult {
  if (!state.contest || state.contest.finished) {
    return { contest: state.contest!, beats: [], handOver: null };
  }

  const contest: ContestState = structuredClone(state.contest);
  const beats: string[] = [];

  // The player's own contribution to their side, from the same modifier
  // everything else in the engine uses — so training, equipment, crew and
  // ability all show up in the score rather than only in prose.
  const playerRating = bestOffensiveModifier(state, story);

  for (let i = 0; i < maxPossessions; i++) {
    if (contest.finished) break;

    const reason = handOverReason(contest);
    if (reason) {
      contest.playerControlled = true;
      contest.controlReason = reason;
      return { contest, beats, handOver: reason };
    }

    const beat = simulateOnePossession(contest, rng, playerRating, opponent);
    beats.push(beat);
    contest.log.push(beat);
    contest.possessionsSinceControl += 1;
    advanceClock(contest);
  }

  return { contest, beats, handOver: null };
}

/**
 * The player's best available way of scoring, used as their offensive rating.
 *
 * Reads the tendency profile so a player who has built one weapon is rated on
 * that weapon, not on an average of things they never do.
 */
function bestOffensiveModifier(state: GameState, story: StoryVersion): number {
  const profile = tendencyProfile(state, story).filter((entry) => entry.count > 0);
  const skills = story.skills.map((skill) =>
    effectiveModifier(state, story, skill.attribute, skill.id),
  );
  const best = skills.length > 0 ? Math.max(...skills) : 0;
  // Specialists are better at the thing than generalists are at anything.
  const focus = profile[0]?.share ?? 0;
  return best + (focus > 0.4 ? 1 : 0);
}

/**
 * Why the player should be playing this possession instead of watching it.
 *
 * Ordered by how much it matters. Everything here is a moment a sports story
 * would cut to; a stretch with none of them is a stretch worth summarising.
 */
/** Mood-based reasons need this much game between them. */
const CONTROL_SPACING = 4;

function handOverReason(contest: ContestState): string | null {
  const margin = contest.playerScore - contest.opponentScore;
  const lastPeriod = contest.period === contest.periodCount;

  // Time-critical: these are single specific moments, so they fire the instant
  // they are true regardless of when the player last had it.
  if (lastPeriod && contest.clockSeconds <= 60 && Math.abs(margin) <= 6) return 'CLUTCH';
  if (contest.clockSeconds <= 24 && contest.playerPossession) return 'LAST_SHOT';

  // Mood-based: a run lasts several possessions, so without spacing these stay
  // true and re-fire every call. Being handed the ball on every possession of
  // a bad stretch is not drama, it is a punishment.
  if (contest.possessionsSinceControl < CONTROL_SPACING) return null;

  // Both of these are about a game that is still in the balance. A run when you
  // are up thirty is mopping up, and bleeding when you are down forty is not a
  // moment, it is the score — neither is worth taking the player's turn for.
  if (contest.momentum <= -0.6 && margin > -20) return 'BLEEDING';
  if (lastPeriod && contest.clockSeconds <= 180 && Math.abs(margin) <= 10) return 'CLOSING';
  if (contest.momentum >= 0.7 && margin < 15) return 'RUN';
  return null;
}

/** Plain copy for the reason, so the client and director agree on what it is. */
export function handOverCopy(reason: string, contest: ContestState): string {
  const margin = contest.playerScore - contest.opponentScore;
  const down = margin < 0;
  switch (reason) {
    case 'CLUTCH':
      return `${formatClock(contest.clockSeconds)} left. ${
        down ? `Down ${Math.abs(margin)}.` : margin === 0 ? 'Tied.' : `Up ${margin}.`
      } You have the ball.`;
    case 'BLEEDING':
      return 'They have scored six straight. Somebody has to stop it.';
    case 'CLOSING':
      return `Last few minutes, ${down ? `down ${Math.abs(margin)}` : `up ${margin}`}. This is the stretch that decides it.`;
    case 'LAST_SHOT':
      return 'End of the period. One shot.';
    case 'RUN':
      return 'The gym has turned. You are the reason.';
    default:
      return 'Your ball.';
  }
}

function simulateOnePossession(
  contest: ContestState,
  rng: SeededRng,
  playerRating: number,
  opponent: ContestOpponentRating,
): string {
  const attacking = contest.playerPossession;

  // Fatigue is a real tax on the player's side and nobody else's, which is
  // what makes a long stretch of carrying the team cost something.
  const fatiguePenalty = Math.floor(contest.playerFatigue / 25);
  const momentumEdge = Math.round(contest.momentum * 2);

  const modifier = attacking
    ? playerRating - fatiguePenalty + momentumEdge
    : opponent.strength - momentumEdge;

  const roll = rng.d20();
  const total = roll + modifier;
  const scored = total >= 14;
  const three = scored && roll >= 18;
  const points = three ? 3 : scored ? 2 : 0;

  if (attacking) {
    contest.playerScore += points;
    contest.playerFatigue = Math.min(100, contest.playerFatigue + 2);
    contest.momentum = clamp(contest.momentum + (scored ? 0.12 : -0.08));
  } else {
    contest.opponentScore += points;
    contest.momentum = clamp(contest.momentum - (scored ? 0.12 * opponent.aggression : -0.06));
  }

  contest.playerPossession = !attacking;

  const who = attacking ? 'You' : contest.opponentName;
  if (points === 3) return `${who} hit from deep. ${scoreLine(contest)}`;
  if (points === 2) return `${who} scored. ${scoreLine(contest)}`;
  return `${who} came up empty. ${scoreLine(contest)}`;
}

function advanceClock(contest: ContestState): void {
  contest.clockSeconds -= POSSESSION_SECONDS;
  if (contest.clockSeconds > 0) return;

  if (contest.period >= contest.periodCount) {
    contest.clockSeconds = 0;
    contest.finished = true;
    contest.playerWon = contest.playerScore > contest.opponentScore;
    contest.log.push(
      contest.playerWon
        ? `Final: ${contest.playerScore}–${contest.opponentScore}. You won.`
        : contest.playerScore === contest.opponentScore
          ? `Final: ${contest.playerScore}–${contest.opponentScore}. Overtime.`
          : `Final: ${contest.playerScore}–${contest.opponentScore}. You lost.`,
    );
    return;
  }

  contest.period += 1;
  contest.clockSeconds = 600;
  // A break resets some of the tax but not all of it.
  contest.playerFatigue = Math.max(0, contest.playerFatigue - 12);
  contest.momentum = clamp(contest.momentum * 0.5);
}

/**
 * Applies the outcome of a possession the player actually played.
 *
 * Separate from the simulation on purpose: a possession the player chose is
 * worth more than a simulated one, both in points and in momentum, because
 * this is the moment the story is about.
 */
export function applyPlayerPossession(
  contest: ContestState,
  outcome: { points: number; turnover?: boolean; foul?: boolean },
): ContestState {
  const next: ContestState = structuredClone(contest);

  next.playerScore += outcome.points;
  next.playerFatigue = Math.min(100, next.playerFatigue + 4);
  if (outcome.foul) next.playerFouls += 1;

  // Scoring while being run off the floor is worth more than scoring while
  // comfortable: stopping a run is the entire reason the player was handed the
  // ball, so it has to actually stop it.
  const stoppingARun = next.momentum < -0.3 && outcome.points > 0;
  next.momentum = clamp(
    next.momentum +
      (stoppingARun ? 0.55 : outcome.points >= 3 ? 0.3 : outcome.points > 0 ? 0.2 : outcome.turnover ? -0.25 : -0.1),
  );

  next.playerControlled = false;
  next.controlReason = '';
  next.possessionsSinceControl = 0;
  next.playerPossession = false;
  next.log.push(
    outcome.points > 0
      ? `You scored ${outcome.points}. ${scoreLine(next)}`
      : outcome.turnover
        ? `You lost it. ${scoreLine(next)}`
        : `No good. ${scoreLine(next)}`,
  );

  advanceClock(next);
  return next;
}

export function scoreLine(contest: ContestState): string {
  return `${contest.playerScore}–${contest.opponentScore}, ${formatClock(contest.clockSeconds)} left in the ${ordinal(contest.period)}.`;
}

function formatClock(seconds: number): string {
  const safe = Math.max(0, seconds);
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}

function ordinal(n: number): string {
  return n === 1 ? '1st' : n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`;
}

function clamp(value: number): number {
  return Math.max(-1, Math.min(1, value));
}

/** The HUD line, which must never disagree with the state above. */
export function contestSummary(contest: ContestState): string {
  if (contest.finished) {
    return `Final ${contest.playerScore}–${contest.opponentScore} vs ${contest.opponentName}`;
  }
  return `${contest.playerScore}–${contest.opponentScore} vs ${contest.opponentName} · ${formatClock(contest.clockSeconds)} ${ordinal(contest.period)}`;
}

/**
 * The flags a finished contest writes. Spec §13.8.
 *
 * Without this a match was a thing that happened and left no trace a quest
 * could gate on — the launch-catalog test caught exactly that, on a world
 * whose entire main line is "beat these five people". Results are engine
 * observations like `visited:` and `spoke:` are, keyed on the opponent so a
 * story never has to invent a flag name and get it wrong.
 *
 *   played:<opponentId>    it happened, whatever the result
 *   beat:<opponentId>      you won
 *   lost_to:<opponentId>   you did not
 */
export function contestResultFlags(contest: ContestState): string[] {
  if (!contest.finished) return [];
  const flags = [`played:${contest.opponentId}`];
  flags.push(contest.playerWon ? `beat:${contest.opponentId}` : `lost_to:${contest.opponentId}`);
  return flags;
}

export function playedFlag(opponentId: string): string {
  return `played:${opponentId}`;
}
