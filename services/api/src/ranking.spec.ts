import { describe, expect, it } from 'vitest';
import { rankTopRanked, rankTrending, trendingScore } from './ranking.js';

const stories = [{ storyId: 'a' }, { storyId: 'b' }, { storyId: 'c' }];

describe('Top Ranked', () => {
  it('is the like count, descending', () => {
    const likes = new Map([['a', 120], ['b', 9800], ['c', 3400]]);
    expect(rankTopRanked(stories, likes).map((s) => s.storyId)).toEqual(['b', 'c', 'a']);
  });

  it('is stable when counts tie, so a refresh does not reshuffle the shelf', () => {
    const likes = new Map([['a', 50], ['b', 50], ['c', 50]]);
    expect(rankTopRanked(stories, likes).map((s) => s.storyId)).toEqual(['a', 'b', 'c']);
  });

  it('puts a world nobody has liked last rather than dropping it', () => {
    const likes = new Map([['a', 10]]);
    expect(rankTopRanked(stories, likes).map((s) => s.storyId)).toEqual(['a', 'b', 'c']);
  });
});

describe('Trending', () => {
  it('is recent activity, not all-time size', () => {
    // The only reason to have two shelves: a small world having a good week
    // beats a big one having a quiet one.
    const scores = new Map([
      ['a', trendingScore({ recentPlays: 40, recentLikes: 30 })],
      ['b', trendingScore({ recentPlays: 2, recentLikes: 1 })],
      ['c', trendingScore({ recentPlays: 0, recentLikes: 0 })],
    ]);
    expect(rankTrending(stories, scores).map((s) => s.storyId)).toEqual(['a', 'b', 'c']);
  });

  it('weighs a like above a play, because it is a deliberate act', () => {
    expect(trendingScore({ recentPlays: 0, recentLikes: 10 })).toBeGreaterThan(
      trendingScore({ recentPlays: 10, recentLikes: 0 }),
    );
  });
});
