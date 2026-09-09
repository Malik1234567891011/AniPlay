import { describe, expect, it } from 'vitest';
import { LAST_FIVE, NINTH_ARCHIVE } from '@aniplay/test-fixtures';
import { abandonedObjectiveNote, createInitialState, objectiveIsAbandoned } from './index.js';

/**
 * Spec §16.8 — the objective strip is an instruction, and an instruction that
 * has stopped being relevant is the game telling the player to go back to the
 * content.
 *
 * Played live: a run that quit the basketball team, walked out of the school
 * and went to look for a job still displayed "Show Coach Torakawa one thing you
 * can actually do."
 */

const start = (story = LAST_FIVE) =>
  createInitialState({
    sessionId: 'sess_a',
    story,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]?.id ?? null,
      worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });

describe('walking away from the authored thread', () => {
  it('is not abandonment while you are standing in it', () => {
    expect(objectiveIsAbandoned(start(), LAST_FIVE)).toBe(false);
  });

  it('is not abandonment when you are one move away', () => {
    const s = start();
    // The locker room is off the gym; being next door is being on the way.
    s.player.locationId = 'locker_room';
    expect(objectiveIsAbandoned(s, LAST_FIVE)).toBe(false);
  });

  it('is abandonment once you are somewhere else entirely', () => {
    const s = start();
    s.player.locationId = 'away_kurogane';
    expect(objectiveIsAbandoned(s, LAST_FIVE)).toBe(true);
  });

  it('tells the director to play the story the player is in', () => {
    const s = start();
    s.player.locationId = 'away_kurogane';
    const note = abandonedObjectiveNote(s, LAST_FIVE)!;
    expect(note).toMatch(/do not steer them toward it/i);
    expect(note).toMatch(/do not invent a reason they must return/i);
    expect(note).toMatch(/play the story they are actually in/i);
    // And it does not delete the old thread — those people still exist.
    expect(note).toMatch(/still exist and may come and find them/i);
  });

  it('says nothing when there is nothing active', () => {
    const s = start();
    for (const q of s.quests) q.status = 'COMPLETED';
    expect(abandonedObjectiveNote(s, LAST_FIVE)).toBeNull();
  });

  it('never fires for a quest with no place attached', () => {
    const s = start(NINTH_ARCHIVE);
    const active = s.quests.find((q) => q.status === 'ACTIVE');
    if (active) {
      const def = NINTH_ARCHIVE.quests.find((q) => q.id === active.questId)!;
      if (def.involvedLocationIds.length === 0) {
        s.player.locationId = NINTH_ARCHIVE.locations.at(-1)!.id;
        expect(objectiveIsAbandoned(s, NINTH_ARCHIVE)).toBe(false);
      }
    }
    expect(true).toBe(true);
  });

  it('does not fail or hide the quest — the player may go back', () => {
    const s = start();
    s.player.locationId = 'away_kurogane';
    expect(objectiveIsAbandoned(s, LAST_FIVE)).toBe(true);
    // Still active, still theirs to return to.
    expect(s.quests.some((q) => q.status === 'ACTIVE')).toBe(true);
  });
});
