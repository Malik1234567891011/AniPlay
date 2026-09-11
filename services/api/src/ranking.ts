/**
 * Top Ranked and Trending.
 *
 * Top Ranked is the like count, descending. That is the whole rule.
 *
 * There was a Bayesian version here with a prior, a confidence penalty and a
 * decaying editorial weight. It was solving a problem we do not have: the
 * counts are curated, so the order is already the order we want, and a formula
 * that quietly disagrees with the numbers on screen is worse than no formula —
 * the player can see the likes and can see the rank, and if those two do not
 * match the shelf looks broken.
 *
 * Trending is deliberately a different question — what is moving now, not what
 * is biggest ever — so it reads recent activity instead.
 */

export interface RankingInputs {
  readonly storyId: string;
  readonly likes: number;
  /** Plays and likes inside the recent window. Trending only. */
  readonly recentPlays: number;
  readonly recentLikes: number;
}

/** Most liked first. Ties by id, so a refresh does not reshuffle the shelf. */
export function rankTopRanked<T extends { storyId: string }>(
  stories: readonly T[],
  likes: ReadonlyMap<string, number>,
): T[] {
  return [...stories].sort((a, b) => {
    const diff = (likes.get(b.storyId) ?? 0) - (likes.get(a.storyId) ?? 0);
    return diff !== 0 ? diff : a.storyId.localeCompare(b.storyId);
  });
}

/**
 * What is moving now.
 *
 * A world can trend without being top ranked, which is the only reason to have
 * two shelves. A like in the window counts for more than a play because it is a
 * deliberate act.
 */
export function trendingScore(input: Pick<RankingInputs, 'recentPlays' | 'recentLikes'>): number {
  return input.recentPlays + input.recentLikes * 2;
}

export function rankTrending<T extends { storyId: string }>(
  stories: readonly T[],
  scores: ReadonlyMap<string, number>,
): T[] {
  return [...stories].sort((a, b) => {
    const diff = (scores.get(b.storyId) ?? 0) - (scores.get(a.storyId) ?? 0);
    return diff !== 0 ? diff : a.storyId.localeCompare(b.storyId);
  });
}
