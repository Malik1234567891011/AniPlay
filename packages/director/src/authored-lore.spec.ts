import { describe, expect, it } from 'vitest';
import { BLACKWAKE, LAST_FIVE } from '@aniplay/test-fixtures';
import { createInitialState } from '@aniplay/engine';
import { authoredLore, retrieveLore } from './authored-lore.js';

/**
 * The world knowing its own world.
 *
 * Retrieval started empty in every session — every fact in it was one the
 * player had created — so everything the author wrote about anywhere the player
 * was not standing, and anyone they were not talking to, was invisible at
 * runtime.
 */

const state = (story: typeof BLACKWAKE) =>
  createInitialState({
    sessionId: 'sess_l',
    story,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '',
      advanced: {}, portraitAssetId: null,
    },
  });

const ask = (story: typeof BLACKWAKE, question: string) =>
  retrieveLore(story, state(story), { text: question, entityIds: [] }).map((s) => s.fact.text);

describe('asking the world about itself', () => {
  it('answers a question about a faction from the faction the author wrote', () => {
    const answer = ask(BLACKWAKE, 'I ask what the Ninth Fleet actually is.');
    expect(answer.join(' ')).toContain('The Ninth Fleet');
    expect(answer.join(' ')).toMatch(/bounties|charts|navy/i);
  });

  it('answers about a place the player is not standing in', () => {
    expect(ask(LAST_FIVE, 'I ask him about Seiran Academy.').join(' ')).toContain('Seiran');
  });

  it('answers about a person who is somewhere else entirely', () => {
    // Rei Amagi is at Seiran, seventy minutes away, and used to reach the
    // writer as a name and a pronoun.
    const answer = ask(LAST_FIVE, 'I ask what Rei Amagi is like now.').join(' ');
    expect(answer).toContain('Rei Amagi');
  });

  it('does not spend the budget on the room the player is in', () => {
    const s = state(LAST_FIVE);
    const texts = authoredLore(LAST_FIVE, s).map((f) => f.text);
    // The gym and the people in it already reach the writer in full.
    expect(texts.some((t) => t.startsWith('The Kosei Gym:'))).toBe(false);
    expect(texts.some((t) => t.startsWith('Dai Okonkwo,'))).toBe(false);
    expect(texts.some((t) => t.startsWith('Rei Amagi,'))).toBe(true);
  });

  it('returns nothing when the turn is not about any of it', () => {
    expect(ask(LAST_FIVE, 'I dribble.')).toEqual([]);
  });

  it('never outranks what just happened, because it is not from this session', () => {
    for (const fact of authoredLore(BLACKWAKE, state(BLACKWAKE))) {
      expect(fact.createdAtTurn).toBe(0);
      expect(fact.pinned).toBe(false);
    }
  });

  it('is public knowledge, so it reaches characters as well as narration', () => {
    for (const fact of authoredLore(BLACKWAKE, state(BLACKWAKE))) {
      expect(fact.visibility).toBe('WORLD_PUBLIC');
    }
  });

  it('stays small enough to sit alongside the session memories', () => {
    expect(ask(BLACKWAKE, 'I ask about the Fleet, the Houses and the Free Captains.').length)
      .toBeLessThanOrEqual(4);
  });
});
