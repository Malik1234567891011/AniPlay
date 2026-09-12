import { describe, expect, it } from 'vitest';
import { BADGES_BY_ID } from '@plotbreak/contracts';
import { evaluateBadges, syncBadges, type PlayerRecord } from './badges.js';
import { MemoryRepository } from './repo/memory.js';

const empty: PlayerRecord = {
  runs: [], genresPlayed: 0, daysPlayed: 0, endingsReached: 0, rareEndings: 0,
  hasFreeformed: false, hasReturned: false,
};

const find = (rows: ReturnType<typeof evaluateBadges>, id: string) =>
  rows.find((r) => r.badgeId === id)!;

describe('what a new player has earned', () => {
  it('is nothing, and nothing is unlocked', () => {
    const rows = evaluateBadges(empty, []);
    expect(rows.every((r) => r.progress === 0 && r.unlockedAt === null)).toBe(true);
  });

  it('unlocks the first one the moment they start a world', () => {
    const rows = evaluateBadges({ ...empty, runs: [{ storyId: 'a', turns: 1 }] }, []);
    expect(find(rows, 'first_break').unlockedAt).not.toBeNull();
  });
});

describe('counting', () => {
  it('totals turns across every run for Ten Turns', () => {
    const rows = evaluateBadges(
      { ...empty, runs: [{ storyId: 'a', turns: 4 }, { storyId: 'b', turns: 6 }] },
      [],
    );
    expect(find(rows, 'ten_turns').unlockedAt).not.toBeNull();
  });

  it('takes the deepest single run for Deep In, not the total', () => {
    // Fifty turns spread over ten runs is not fifty turns in one.
    const spread = Array.from({ length: 10 }, (_, i) => ({ storyId: `s${i}`, turns: 6 }));
    expect(find(evaluateBadges({ ...empty, runs: spread }, []), 'deep_in').unlockedAt).toBeNull();
    const deep = [{ storyId: 'a', turns: 50 }];
    expect(find(evaluateBadges({ ...empty, runs: deep }, []), 'deep_in').unlockedAt).not.toBeNull();
  });

  it('sums runs of the same world for Long Night', () => {
    // A hundred turns in one world may be several visits to it.
    const runs = [
      { storyId: 'a', turns: 40 }, { storyId: 'a', turns: 60 }, { storyId: 'b', turns: 90 },
    ];
    expect(find(evaluateBadges({ ...empty, runs }, []), 'long_night').unlockedAt).not.toBeNull();
  });

  it('caps displayed progress at the target', () => {
    const rows = evaluateBadges({ ...empty, runs: [{ storyId: 'a', turns: 900 }] }, []);
    expect(find(rows, 'ten_turns').progress).toBe(10);
  });
});

describe('an unlock is permanent', () => {
  it('keeps the original timestamp rather than re-stamping it', () => {
    const earlier = '2020-01-01T00:00:00.000Z';
    const stored = [{ userId: 'u', badgeId: 'first_break', progress: 1, unlockedAt: earlier, claimedAt: null }];
    const rows = evaluateBadges({ ...empty, runs: [{ storyId: 'a', turns: 1 }] }, stored);
    expect(find(rows, 'first_break').unlockedAt).toBe(earlier);
  });

  it('never goes backwards if the underlying record shrinks', () => {
    // A deleted run must not un-earn a badge somebody already has.
    const stored = [{ userId: 'u', badgeId: 'ten_turns', progress: 10, unlockedAt: '2020-01-01T00:00:00.000Z', claimedAt: null }];
    const rows = evaluateBadges(empty, stored);
    expect(find(rows, 'ten_turns').progress).toBe(10);
    expect(find(rows, 'ten_turns').unlockedAt).not.toBeNull();
  });
});

describe('claiming', () => {
  it('pays once and refuses the second attempt', async () => {
    const repo = new MemoryRepository();
    await repo.upsertBadge({
      userId: 'u', badgeId: 'first_break', progress: 1,
      unlockedAt: '2020-01-01T00:00:00.000Z', claimedAt: null,
    });
    expect(await repo.claimBadge('u', 'first_break', 'now')).toBe(true);
    expect(await repo.claimBadge('u', 'first_break', 'now')).toBe(false);
  });

  it('refuses a badge that has not been unlocked', async () => {
    const repo = new MemoryRepository();
    await repo.upsertBadge({ userId: 'u', badgeId: 'deep_in', progress: 3, unlockedAt: null, claimedAt: null });
    expect(await repo.claimBadge('u', 'deep_in', 'now')).toBe(false);
  });
});

describe('reporting a new unlock', () => {
  it('reports it once, not every time the screen is opened', async () => {
    const repo = new MemoryRepository();
    const record = { ...empty, runs: [{ storyId: 'a', turns: 1 }] };
    const first = await syncBadges(repo, 'u', record);
    expect(first.newlyUnlocked.map((b) => b.id)).toContain('first_break');
    const second = await syncBadges(repo, 'u', record);
    expect(second.newlyUnlocked).toEqual([]);
  });
});

describe('the launch set itself', () => {
  it('rewards playing, never spending', () => {
    // The rule the list exists under. If one of these words appears in a badge,
    // somebody has added a chore.
    for (const badge of BADGES_BY_ID.values()) {
      expect(`${badge.title} ${badge.description}`.toLowerCase()).not.toMatch(
        /purchas|buy|credits|subscri|follow|publish/,
      );
    }
  });

  it('pays little enough not to replace buying credits', () => {
    const total = [...BADGES_BY_ID.values()].reduce((sum, b) => sum + b.creditReward, 0);
    // A VIVID turn is 60. The whole set is worth about twenty of them.
    expect(total).toBeLessThan(60 * 25);
  });
});
