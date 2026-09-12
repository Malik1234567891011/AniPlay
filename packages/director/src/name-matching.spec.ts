import { describe, expect, it } from 'vitest';
import { BLACKWAKE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { RuleBasedIntentParser } from './parser.js';

/**
 * Near-matching a name is for typos, not for vocabulary.
 *
 * The edit-distance pass exists so "I ask Nesa" still reaches Nessa Vale. It
 * ran over every word the player typed, so in Blackwake "I take the sale
 * price" and "I look at the vale below" both resolved to her — one edit away,
 * and then handed a presence bonus that made them look confident.
 *
 * A misspelled name is still typed as a name, so the capital is the signal.
 */
const targets = (text: string) => {
  const story = BLACKWAKE;
  const state = createInitialState({
    sessionId: 'n', story,
    identity: {
      displayName: 'Sable', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '',
      advanced: {}, portraitAssetId: null,
    },
  });
  return new RuleBasedIntentParser()
    .parseSync(text, { story, state, intentId: 'i' })
    .actions.flatMap((a) => a.targets.map((t) => t.entityId));
};

describe('matching a name the player typed', () => {
  it('does not read ordinary lowercase words as misspelled names', () => {
    expect(targets('I take the sale price')).not.toContain('nessa');
  });

  it('still forgives a misspelling', () => {
    expect(targets('I ask Nesa what she knows')).toContain('nessa');
  });

  it('still matches a name typed in lower case, which people do constantly', () => {
    expect(targets('I talk to nessa')).toContain('nessa');
  });

  it('matches the name spelled correctly, capital or not', () => {
    expect(targets('I ask Nessa what she knows')).toContain('nessa');
  });
});
