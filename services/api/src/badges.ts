/**
 * Working out what somebody has earned.
 *
 * Progress is **derived from what already exists** — sessions, turns, endings,
 * the days they played — rather than incremented by event handlers scattered
 * through the turn pipeline. Counters that are bumped from twelve call sites
 * drift the first time one of them is missed, and then a player who genuinely
 * played fifty turns is told they played forty-eight. Recomputing from the
 * record cannot drift, and the record is small enough that it is cheap.
 *
 * The only thing stored is what cannot be derived: when a badge was unlocked
 * and when it was paid for.
 */
import { BADGES, BADGES_BY_ID, type Badge, type BadgeProgress } from '@plotbreak/contracts';
import type { Repository, UserBadgeRow } from './repo/types.js';

/** What the whole badge set needs to know about a player, gathered once. */
export interface PlayerRecord {
  /**
   * One entry per run, with the turn count beside it.
   *
   * Not `SessionRecord[]`: that carries no turn count — the turns live in their
   * own table — and every badge here counts turns. Passing the pair keeps the
   * counting in one place and out of the badge rules.
   */
  readonly runs: readonly { storyId: string; turns: number }[];
  /** Distinct genres across every world they have started. */
  readonly genresPlayed: number;
  /** Distinct calendar days they have played on. */
  readonly daysPlayed: number;
  /** Endings reached across all runs. */
  readonly endingsReached: number;
  /** Endings reached that few other players have found. */
  readonly rareEndings: number;
  /** Have they ever typed instead of tapping. */
  readonly hasFreeformed: boolean;
  /** Have they resumed a world on a later day than they left it. */
  readonly hasReturned: boolean;
}

function progressFor(badge: Badge, record: PlayerRecord): number {
  const turnsTotal = record.runs.reduce((sum, r) => sum + r.turns, 0);
  const deepest = record.runs.reduce((max, r) => Math.max(max, r.turns), 0);
  const worlds = new Set(record.runs.map((r) => r.storyId)).size;

  switch (badge.id) {
    case 'first_break':
      return record.runs.length > 0 ? 1 : 0;
    case 'say_anything':
      return record.hasFreeformed ? 1 : 0;
    case 'ten_turns':
      return turnsTotal;
    case 'back_for_more':
      return record.hasReturned ? 1 : 0;
    case 'ending_found':
      return Math.min(record.endingsReached, 1);
    case 'genre_hopper':
      return record.genresPlayed;
    case 'three_day_run':
      return record.daysPlayed;
    case 'world_hopper':
      return worlds;
    case 'deep_in':
      return deepest;
    case 'ending_hunter':
      return record.endingsReached;
    case 'long_night':
      // Turns in one *world*, which may be several runs of it.
      return [...new Set(record.runs.map((r) => r.storyId))]
        .map((id) =>
          record.runs.filter((r) => r.storyId === id).reduce((sum, r) => sum + r.turns, 0),
        )
        .reduce((max, n) => Math.max(max, n), 0);
    case 'rare_ending':
      return Math.min(record.rareEndings, 1);
    default:
      return 0;
  }
}

export function evaluateBadges(record: PlayerRecord, stored: readonly UserBadgeRow[]): BadgeProgress[] {
  const byId = new Map(stored.map((row) => [row.badgeId, row]));
  const now = new Date().toISOString();

  return BADGES.map((badge) => {
    const previous = byId.get(badge.id);
    const progress = Math.max(progressFor(badge, record), previous?.progress ?? 0);
    const unlocked = progress >= badge.target;
    return {
      badgeId: badge.id,
      progress: Math.min(progress, badge.target),
      target: badge.target,
      // Keep the original timestamp. The first time is the time it happened.
      unlockedAt: previous?.unlockedAt ?? (unlocked ? now : null),
      claimedAt: previous?.claimedAt ?? null,
    };
  });
}

/**
 * Recompute, persist anything that moved, and report what is newly unlocked.
 *
 * Returns the badges that crossed the line on *this* call, so the caller can
 * tell the player once rather than every time they open the screen.
 */
export async function syncBadges(
  repo: Repository,
  userId: string,
  record: PlayerRecord,
): Promise<{ progress: BadgeProgress[]; newlyUnlocked: Badge[] }> {
  const stored = await repo.getBadges(userId);
  const before = new Set(stored.filter((b) => b.unlockedAt).map((b) => b.badgeId));
  const progress = evaluateBadges(record, stored);

  const newlyUnlocked: Badge[] = [];
  for (const row of progress) {
    const previous = stored.find((b) => b.badgeId === row.badgeId);
    const changed =
      !previous || previous.progress !== row.progress || previous.unlockedAt !== row.unlockedAt;
    if (changed) {
      await repo.upsertBadge({
        userId,
        badgeId: row.badgeId,
        progress: row.progress,
        unlockedAt: row.unlockedAt,
        claimedAt: row.claimedAt,
      });
    }
    if (row.unlockedAt && !before.has(row.badgeId)) {
      const badge = BADGES_BY_ID.get(row.badgeId);
      if (badge) newlyUnlocked.push(badge);
    }
  }

  return { progress, newlyUnlocked };
}
