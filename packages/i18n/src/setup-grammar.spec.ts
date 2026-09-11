import { describe, expect, it } from 'vitest';

import { agree } from './grammar.js';
import { fr } from './catalog/fr/index.js';
import { hasMidpoint } from './grammar.js';
import { translate } from './translate.js';
import type { GrammaticalGender } from './locale.js';

/**
 * Step 6's gate: **`Tu es arrivée` renders for a player who asked for it.**
 *
 * The setup screen shows each option's sentence rather than naming the rule,
 * so the strings the screen renders are the gate, and they are asserted here
 * rather than only looked at in a simulator.
 */

const EXAMPLE: Record<GrammaticalGender, string> = {
  MASCULINE: 'setup.grammar.example_masculine',
  FEMININE: 'setup.grammar.example_feminine',
  NEUTRAL: 'setup.grammar.example_neutral',
  UNSPECIFIED: 'setup.grammar.example_unspecified',
} as const as Record<GrammaticalGender, string>;

describe('the French setup question', () => {
  it('shows the feminine sentence to a player who picks Elle', () => {
    expect(translate('fr', 'setup.grammar.example_feminine')).toBe('Tu es arrivée');
  });

  it('shows the masculine sentence to a player who picks Il', () => {
    expect(translate('fr', 'setup.grammar.example_masculine')).toBe('Tu es arrivé');
  });

  it('shows the avoidance form for iel and for no preference', () => {
    // Present tense has no participle, so there is nothing to agree and
    // nothing to fudge. This is the sentence those players actually read.
    expect(translate('fr', 'setup.grammar.example_neutral')).toBe('Tu viens d’arriver');
    expect(translate('fr', 'setup.grammar.example_unspecified')).toBe('Tu viens d’arriver');
  });

  it('never renders a midpoint, in any option or note', () => {
    // PLAYER_GRAMMAR rule 4 forbids `arrivé·e` in UI as well as in prose:
    // administrative register, banned from school documents by circular, and
    // it breaks read-aloud on blocks marked voiceEligible. The draft copy in
    // that document shows one; this is why it is not shipped.
    for (const key of Object.keys(fr)) {
      if (!key.startsWith('setup.grammar.')) continue;
      const value = translate('fr', key as never);
      expect(hasMidpoint(value), `${key}: ${value}`).toBe(false);
      expect(value).not.toContain('(e)');
    }
  });

  it('asks in tu, like the rest of the product', () => {
    // PRODUCT_VOICE rule 2. A setup screen that says `vous` and a story that
    // says `tu` is the wobble that must never happen between screens.
    const heading = translate('fr', 'setup.grammar.heading');
    expect(heading).toBe('Comment le monde parle de toi');
    expect(translate('fr', 'setup.grammar.hint')).toContain('toi');
  });

  it('uses the typographic apostrophe throughout', () => {
    for (const key of Object.keys(fr)) {
      if (!key.startsWith('setup.grammar.')) continue;
      expect(translate('fr', key as never)).not.toMatch(/\p{L}'\p{L}/u);
    }
  });

  it('agrees the way the screen promises', () => {
    // The picker shows a sentence; `agree()` is what will build the rest of
    // them. They must not disagree about what the feminine of `arrivé` is.
    for (const gender of ['MASCULINE', 'FEMININE'] as const) {
      const shown = translate('fr', EXAMPLE[gender] as never);
      expect(shown).toBe(`Tu es ${agree('arrivé', gender)}`);
    }
  });
});

describe('English is not asked the question', () => {
  it('has no French leaking into the English catalogue', () => {
    expect(translate('en', 'setup.grammar.heading')).toBe('How the world talks about you');
    expect(translate('en', 'setup.name_label')).toBe('What do they call you?');
  });
});
