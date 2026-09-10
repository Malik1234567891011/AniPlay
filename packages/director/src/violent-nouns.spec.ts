import { describe, expect, it } from 'vitest';
import { BLACKWAKE, LAST_FIVE } from '@aniplay/test-fixtures';
import { createInitialState } from '@aniplay/engine';
import { RuleBasedIntentParser } from './parser.js';

/**
 * Words that are violence and also furniture.
 *
 * Caught live in Blackwake: "I mock Mako in front of everyone and tell her she
 * is useless on a deck" parsed as `attack`, opened a combat encounter, and Mako
 * hit the player for four damage — over an insult, on a ship, because "deck" is
 * in the violence lexicon as the verb "to deck somebody".
 *
 * Last Five is worse in principle. Its premise is "Beat the five who left", and
 * a sports world is full of hitting and kicking that is not assault.
 */

const verbOf = (story: typeof BLACKWAKE, text: string) => {
  const state = createInitialState({
    sessionId: 'x', story,
    identity: {
      displayName: 'Sable', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });
  return new RuleBasedIntentParser().parseSync(text, { story, state, intentId: 'i' }).actions[0]?.verb;
};

describe('violence needs somebody on the end of it', () => {
  it('does not start a fight over the floor of a ship', () => {
    expect(verbOf(BLACKWAKE, 'I mock Mako in front of everyone and tell her she is useless on a deck.'))
      .toBe('threaten');
  });

  it('does not read a world’s own premise as assault', () => {
    expect(verbOf(LAST_FIVE, 'I tell the team we are going to beat the five who left.'))
      .not.toBe('attack');
  });

  it('leaves a sports world its own vocabulary', () => {
    for (const text of [
      'I kick the ball back to Kai.',
      'I hit the showers.',
      'I take the floor and wait for the whistle.',
    ]) {
      expect(verbOf(LAST_FIVE, text), text).not.toBe('attack');
    }
  });

  it('still hears it when the player means it', () => {
    for (const [story, text] of [
      [BLACKWAKE, 'I deck him before he can finish the sentence.'],
      [BLACKWAKE, 'I hit her, hard, without warning.'],
      [LAST_FIVE, 'I beat Jun to the floor and stand over him.'],
      [BLACKWAKE, 'I jump the man on the gangplank.'],
    ] as const) {
      expect(verbOf(story, text), text).toBe('attack');
    }
  });

  it('still hears the unambiguous words on their own', () => {
    for (const text of ['I attack Nessa.', 'I strangle him.', 'I lunge at Veyra.']) {
      expect(verbOf(BLACKWAKE, text), text).toBe('attack');
    }
  });
});
