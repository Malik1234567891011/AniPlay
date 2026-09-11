import { describe, expect, it } from 'vitest';
import {
  catalogueMean,
  CONFIDENCE_PENALTY,
  MAX_EDITORIAL_BOOST,
  PRIOR_WEIGHT,
  rankStoriesByScore,
  topRankedScore,
  trendingScore,
  type RankingInputs,
} from './ranking.js';

const story = (over: Partial<RankingInputs> & { storyId: string }): RankingInputs => ({
  players: 0, meaningfulRuns: 0, likes: 0, comments: 0, endings: 0, returners: 0,
  recentPlays: 0, recentLikes: 0, recentComments: 0, editorialBoost: 0,
  ...over,
});

describe('Top Ranked', () => {
  it('does not let one player with one like take the top spot', () => {
    // The failure this exists to prevent. A world with a single delighted
    // player has a perfect record and no evidence.
    const tiny = story({ storyId: 'tiny', players: 1, meaningfulRuns: 1, likes: 1, endings: 1 });
    const proven = story({
      storyId: 'proven', players: 400, meaningfulRuns: 260, likes: 150, comments: 40,
      endings: 60, returners: 90,
    });
    const mean = catalogueMean([tiny, proven]);
    expect(topRankedScore(proven, mean)).toBeGreaterThan(topRankedScore(tiny, mean));
  });

  it('starts a world with no data at the catalogue average, less its uncertainty', () => {
    const known = story({ storyId: 'known', players: 100, meaningfulRuns: 70, likes: 40 });
    const fresh = story({ storyId: 'fresh' });
    const mean = catalogueMean([known, fresh]);
    const uncertainty = (CONFIDENCE_PENALTY * Math.max(mean, 0.1)) / Math.sqrt(PRIOR_WEIGHT);
    expect(topRankedScore(fresh, mean)).toBeCloseTo(mean - uncertainty, 5);
  });

  it('is half the world’s own record once there is a prior weight of evidence', () => {
    const s = story({ storyId: 's', players: PRIOR_WEIGHT, meaningfulRuns: PRIOR_WEIGHT });
    const mean = 0;
    // rate is 1.0, mean is 0, evidence equals the prior: halfway, less the
    // uncertainty charge for having only that much evidence.
    const uncertainty = (CONFIDENCE_PENALTY * 0.1) / Math.sqrt(PRIOR_WEIGHT * 2);
    expect(topRankedScore(s, mean)).toBeCloseTo(0.5 - uncertainty, 5);
  });

  it('never lets editorial outrank a genuinely good world, even at the cap', () => {
    // The rule is about *good*, not about *any*. A featured unknown sitting
    // beside a merely average world is exactly what featuring is for; sitting
    // above a world its players clearly love is not.
    const boosted = story({
      storyId: 'boosted', players: 5, meaningfulRuns: 2, editorialBoost: MAX_EDITORIAL_BOOST,
    });
    const loved = story({
      storyId: 'loved', players: 300, meaningfulRuns: 280, likes: 200, comments: 60,
      endings: 120, returners: 150,
    });
    const mean = catalogueMean([boosted, loved]);
    expect(topRankedScore(loved, mean)).toBeGreaterThan(topRankedScore(boosted, mean));
  });

  it('does let editorial lift an unknown above a world players bounce off', () => {
    // The other half, and the reason the boost exists at all. Without this the
    // catalogue can never introduce anything.
    const featured = story({
      storyId: 'featured', players: 3, meaningfulRuns: 1, editorialBoost: MAX_EDITORIAL_BOOST,
    });
    const bounced = story({ storyId: 'bounced', players: 250, meaningfulRuns: 12, likes: 3 });
    const mean = catalogueMean([featured, bounced]);
    expect(topRankedScore(featured, mean)).toBeGreaterThan(topRankedScore(bounced, mean));
  });

  it('judges a world on what it does to the people who try it, not how many were sent', () => {
    const devoted = story({
      storyId: 'devoted', players: 60, meaningfulRuns: 55, likes: 40, endings: 30, returners: 35,
    });
    const funnelled = story({
      storyId: 'funnelled', players: 600, meaningfulRuns: 60, likes: 45, endings: 10, returners: 20,
    });
    const mean = catalogueMean([devoted, funnelled]);
    expect(topRankedScore(devoted, mean)).toBeGreaterThan(topRankedScore(funnelled, mean));
  });
});

describe('Trending', () => {
  it('lets a new world with real activity trend over an old giant that is quiet', () => {
    const newcomer = story({ storyId: 'new', players: 30, recentPlays: 25, recentLikes: 12 });
    const sleepingGiant = story({
      storyId: 'giant', players: 5000, meaningfulRuns: 4000, likes: 3000, recentPlays: 20,
    });
    expect(trendingScore(newcomer)).toBeGreaterThan(trendingScore(sleepingGiant));
  });

  it('ignores all-time totals entirely', () => {
    // Same recent window, wildly different history: trending must not notice.
    const a = story({ storyId: 'a', players: 100, recentPlays: 10 });
    const b = story({ storyId: 'b', players: 100, meaningfulRuns: 900, likes: 800, recentPlays: 10 });
    expect(trendingScore(a)).toBeCloseTo(trendingScore(b), 10);
  });

  it('is zero for a world nothing is happening to', () => {
    expect(trendingScore(story({ storyId: 'dead', players: 900, likes: 400 }))).toBe(0);
  });

  it('does not flatter a two-player world with one play', () => {
    const tiny = story({ storyId: 'tiny', players: 2, recentPlays: 1 });
    const real = story({ storyId: 'real', players: 200, recentPlays: 60, recentLikes: 20 });
    expect(trendingScore(real)).toBeGreaterThan(trendingScore(tiny));
  });
});

describe('editorial placement', () => {
  it('moves position and never a displayed count', () => {
    // The invariant that matters: the boost is an argument to the score and is
    // not reachable from anything that renders a number.
    const plain = story({ storyId: 'plain', players: 10, likes: 7 });
    const boosted = { ...plain, storyId: 'boosted', editorialBoost: MAX_EDITORIAL_BOOST };
    const mean = catalogueMean([plain, boosted]);
    expect(topRankedScore(boosted, mean)).toBeGreaterThan(topRankedScore(plain, mean));
    // Nothing in the inputs changed, so nothing the UI shows can have changed.
    expect(boosted.likes).toBe(plain.likes);
  });

  it('fades as the world earns its own evidence', () => {
    // Same world, same (empty) record, far more plays: the boost is worth less.
    const early = story({ storyId: 's', players: 2, editorialBoost: MAX_EDITORIAL_BOOST });
    const later = { ...early, players: 400 };
    const liftOf = (s: RankingInputs): number =>
      topRankedScore(s, 0) - topRankedScore({ ...s, editorialBoost: 0 }, 0);
    expect(liftOf(early)).toBeGreaterThan(liftOf(later));
  });
});

describe('ordering', () => {
  it('is stable when scores tie, so a refresh does not reshuffle the shelf', () => {
    const items = [{ storyId: 'b' }, { storyId: 'a' }, { storyId: 'c' }];
    const flat = new Map([['a', 1], ['b', 1], ['c', 1]]);
    expect(rankStoriesByScore(items, flat).map((s) => s.storyId)).toEqual(['a', 'b', 'c']);
  });
});
