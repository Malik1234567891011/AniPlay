/**
 * Top Ranked and Trending.
 *
 * Two different questions, and conflating them is the usual mistake:
 *
 *   **Top Ranked** — how good is this world, all time.
 *   **Trending**   — what is happening to it right now.
 *
 * A world published last week with real activity should be able to trend
 * without being historically top ranked, and a world that has been quietly
 * excellent for months should not fall off Top Ranked because this week was
 * slow. If one list can be derived from the other, one of them is redundant.
 *
 * ## The thing this is built to avoid
 *
 * One player, one like, rank #1. Raw averages are dominated by tiny samples,
 * and at launch every sample is tiny. So the score is a **Bayesian shrink**: a
 * world starts at the catalogue's own mean and moves towards its observed rate
 * as evidence arrives. With three plays it is still mostly the prior; with
 * three hundred it is almost entirely the world's own record. Nothing has to
 * be special-cased for the cold start, because the cold start *is* the prior.
 *
 * ## Editorial, and the line it must not cross
 *
 * `editorialBoost` moves position and nothing else. It is stored in its own
 * table, it is added to the *score*, and it never touches a displayed number.
 * A story can be first in Top Ranked and still show the 40 likes it actually
 * has. The separation is structural rather than a matter of remembering:
 * ranking reads `story_editorial`, projections read `story_signals`, and they
 * are not the same query.
 *
 * The boost also decays as real evidence arrives — `EDITORIAL_HALF_LIFE_PLAYS`
 * — so the catalogue hands itself over to its players rather than staying
 * permanently curated.
 */

export interface RankingInputs {
  readonly storyId: string;
  /** Distinct people who started it. The denominator for everything below. */
  readonly players: number;
  /** Runs that got past the tourist threshold. Quality, not clicks. */
  readonly meaningfulRuns: number;
  readonly likes: number;
  readonly comments: number;
  readonly endings: number;
  /** Players who came back on a later day. */
  readonly returners: number;
  /** Plays in the recent window, for trending only. */
  readonly recentPlays: number;
  readonly recentLikes: number;
  readonly recentComments: number;
  readonly editorialBoost: number;
}

/**
 * A run somebody actually played, as opposed to one they opened.
 *
 * Five turns is the point in this product where a person has read a few beats,
 * made choices and seen the world answer. Below it they have looked at the
 * cover.
 */
export const MEANINGFUL_TURNS = 5;

/**
 * How much evidence before a world is judged on its own record.
 *
 * At `players === PRIOR_WEIGHT` the score sits halfway between the catalogue
 * mean and the world's own rate. Twenty is chosen to be roughly "a day of real
 * traffic": low enough that a genuinely good world climbs within a day, high
 * enough that five enthusiastic friends cannot install one at the top.
 */
export const PRIOR_WEIGHT = 20;

/**
 * The largest editorial nudge the system will honour.
 *
 * Chosen so that a hard rule holds by construction: **a world with real
 * evidence behind it always outranks a boosted world without.** At the cap, a
 * five-player featured world still sits below a three-hundred-player world with
 * a better record, and there is a test that asserts exactly that *at the cap*
 * rather than at some comfortable value — so the guarantee is about the
 * mechanism, not about editorial restraint.
 *
 * Anything above this is clamped rather than rejected. A number somebody typed
 * into a table should not be able to break the catalogue.
 */
export const MAX_EDITORIAL_BOOST = 0.35;

/**
 * What an editorial boost is worth.
 *
 * Expressed as **a fraction of the catalogue average** rather than as a bare
 * number added to the score, because a raw addend has no meaning on its own.
 * The first version took `3`, which read as modest and was in fact about twice
 * an average world's entire score — a five-player boosted world outranked a
 * three-hundred-player one, and the nudge had quietly become a coronation.
 * Scale-free also means the value keeps its meaning as the catalogue grows and
 * engagement rates rise.
 *
 * It fades against **evidence**, not against time or plays-since-launch,
 * because that is precisely its job: it exists to fill in for data we do not
 * have yet, so it should be worth exactly as much as the data is missing. At
 * zero players it is fully applied; at `PRIOR_WEIGHT` players it is halved; at
 * three hundred it is almost gone. That is one idea instead of two, and it
 * removes the separate half-life constant that used to have to agree with it.
 */
function editorialLift(boost: number, mean: number, players: number): number {
  const clamped = Math.max(0, Math.min(boost, MAX_EDITORIAL_BOOST));
  const stillUnknown = PRIOR_WEIGHT / (PRIOR_WEIGHT + players);
  return clamped * Math.max(mean, 0.1) * stillUnknown;
}

const WEIGHTS = {
  meaningful: 1.0,
  like: 0.6,
  comment: 0.8,
  ending: 1.2,
  returner: 1.5,
} as const;

/**
 * Engagement per player, before shrinking.
 *
 * Per *player* rather than total, so a world is judged on what it does to the
 * people who try it rather than on how many were sent to it. That is the
 * difference between a ranking and a popularity contest, and it is the reason a
 * small world with devoted players can out-rank a heavily featured one.
 */
function rawRate(input: RankingInputs): number {
  if (input.players <= 0) return 0;
  const value =
    input.meaningfulRuns * WEIGHTS.meaningful +
    input.likes * WEIGHTS.like +
    input.comments * WEIGHTS.comment +
    input.endings * WEIGHTS.ending +
    input.returners * WEIGHTS.returner;
  return value / input.players;
}

/**
 * The catalogue's own average, which is what a world with no data is assumed
 * to be.
 *
 * **Pooled**, not a mean of rates. Averaging the rates gives a world with one
 * delighted player the same vote as one with four hundred, which drags the
 * prior towards whatever the smallest samples happen to be doing — and then
 * shrinking towards that inflated prior *helps* the very worlds the prior
 * exists to discipline. Total value over total players is the honest figure.
 */
export function catalogueMean(all: readonly RankingInputs[]): number {
  const players = all.reduce((sum, s) => sum + s.players, 0);
  if (players <= 0) return 0;
  return all.reduce((sum, s) => sum + rawRate(s) * s.players, 0) / players;
}

/**
 * How far above the average a world must be before we believe it.
 *
 * Shrinking alone is not enough, and the reason is worth stating because it is
 * counter-intuitive: a world with one ecstatic player genuinely *does* have the
 * best record in the catalogue. The shrink pulls it towards the mean but cannot
 * push it below a world that is merely good with four hundred players, because
 * on the evidence available it really is better.
 *
 * So the score pays for its own uncertainty. The penalty is proportional to the
 * standard error — it falls as the square root of the evidence — which means a
 * world has to beat the average by more than we are unsure about it. One player
 * is charged a lot; four hundred is charged almost nothing.
 *
 * Expressed as a fraction of the catalogue mean, like everything else here, so
 * it keeps its meaning whatever the engagement rates happen to be.
 */
export const CONFIDENCE_PENALTY = 1.0;

export function topRankedScore(input: RankingInputs, mean: number): number {
  // Bayesian shrink towards the catalogue mean. `players` is the evidence.
  const shrunk =
    (mean * PRIOR_WEIGHT + rawRate(input) * input.players) / (PRIOR_WEIGHT + input.players);

  // ...and then pay for how little of it there is.
  //
  // Scaled by the catalogue mean for the same reason the boost is: a bare
  // constant has no meaning against a score whose units are "engagement per
  // player". At 1.0 absolute it happened to be sane when the average world
  // scored ~1.7 and annihilated the whole shelf into negative numbers when the
  // average was 0.06. Everything in this function is now a fraction of the same
  // yardstick.
  const uncertainty =
    (CONFIDENCE_PENALTY * Math.max(mean, 0.1)) / Math.sqrt(input.players + PRIOR_WEIGHT);

  return shrunk - uncertainty + editorialLift(input.editorialBoost, mean, input.players);
}

/**
 * Momentum, not history.
 *
 * Deliberately *not* a function of the all-time totals: a world that has been
 * top ranked for a month and is doing nothing this week should not be trending,
 * and the only way to guarantee that is to never look at the totals here.
 *
 * Normalised by the square root of the player base rather than by the base
 * itself. Dividing by players flatters anything tiny — one play on a world with
 * two players reads as enormous momentum — and not dividing at all just
 * reproduces Top Ranked. The square root sits between the two, which is the
 * usual answer when neither extreme is right.
 */
export function trendingScore(input: RankingInputs): number {
  const activity = input.recentPlays + input.recentLikes * 0.5 + input.recentComments * 0.8;
  if (activity <= 0) return 0;
  const base = Math.sqrt(Math.max(input.players, 1));
  // Half weight: enough to get a new world seen at launch, not enough to pin a
  // dead one to the shelf. Clamped by the same rule as Top Ranked.
  return activity / base + Math.max(0, Math.min(input.editorialBoost, MAX_EDITORIAL_BOOST)) * 0.5;
}

export function rankStoriesByScore<T extends { storyId: string }>(
  stories: readonly T[],
  scores: ReadonlyMap<string, number>,
): T[] {
  return [...stories].sort((a, b) => {
    const diff = (scores.get(b.storyId) ?? 0) - (scores.get(a.storyId) ?? 0);
    // Ties broken by id so the order is stable between requests. A shelf that
    // reshuffles on refresh reads as broken.
    return diff !== 0 ? diff : a.storyId.localeCompare(b.storyId);
  });
}
