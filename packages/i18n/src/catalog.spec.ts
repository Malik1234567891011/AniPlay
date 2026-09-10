import { describe, expect, it } from 'vitest';

import { en, TRANSLATION_KEYS, type TranslationKey } from './catalog/en/index.js';
import { fr } from './catalog/fr/index.js';
import { hasStraightApostrophe } from './search.js';
import { translate, translatorFor } from './translate.js';

/**
 * The catalogue's own rules, checked rather than remembered.
 *
 * The most important one is the last block: **English must render exactly what
 * it rendered before it was keyed.** Every other test here is about French.
 */

describe('the English catalogue is the definition of a key', () => {
  it('has no French key that English does not have', () => {
    // A stale or misspelled French key would otherwise sit there translating
    // nothing, and nothing would say so.
    const unknown = Object.keys(fr).filter((key) => !(key in en));
    expect(unknown).toEqual([]);
  });

  it('has no empty English value', () => {
    const empty = TRANSLATION_KEYS.filter((key) => en[key].trim().length === 0);
    expect(empty).toEqual([]);
  });
});

describe('the French catalogue follows the French rules', () => {
  it('uses the typographic apostrophe, never the ASCII one', () => {
    const offenders = Object.entries(fr).filter(([, value]) => hasStraightApostrophe(value ?? ''));
    expect(offenders).toEqual([]);
  });

  it('never branches a plural on n === 1', () => {
    // `{count, plural, one {…} other {…}}` is correct; anything that reaches
    // for `=1` as a special case is the English rule in disguise, and it is
    // wrong in French at zero.
    const offenders = Object.entries(fr).filter(([, value]) => /\{\s*count\s*,\s*plural[^}]*=1\s*\{/.test(value ?? ''));
    expect(offenders).toEqual([]);
  });

  it('never writes a midpoint inside a message', () => {
    // PLAYER_GRAMMAR rule 4: `arrivé·e` is an administrative register, it
    // breaks read-aloud, and the product marks blocks voiceEligible.
    const offenders = Object.entries(fr).filter(([, value]) => /\p{L}·\p{L}/u.test(value ?? ''));
    expect(offenders).toEqual([]);
  });
});

describe('plurals, and the zero that is singular in French', () => {
  it('renders English counts as English always did', () => {
    const t = translatorFor('en');
    expect(t('library.runs', { count: 0 })).toBe('0 runs');
    expect(t('library.runs', { count: 1 })).toBe('1 run');
    expect(t('library.runs', { count: 2 })).toBe('2 runs');
  });

  it('falls back to English for a key French has not got yet', () => {
    // A half-built catalogue must render English, not the key. A screen full
    // of `profile.haptics` is not a useful intermediate state.
    expect(translate('fr', 'profile.haptics')).toBe(en['profile.haptics']);
  });

  it('renders a French key French has got', () => {
    expect(translate('fr', 'profile.language')).toBe('Langue');
  });
});

describe('English renders identically', () => {
  it('returns the catalogue value verbatim for every key with no arguments', () => {
    // The whole of step 3 in one assertion: keying English changed nothing
    // about what English says.
    const t = translatorFor('en');
    for (const key of TRANSLATION_KEYS) {
      const value = en[key];
      // Skip the ICU messages, which are patterns rather than strings.
      if (/[{}]/.test(value)) continue;
      expect(t(key as TranslationKey)).toBe(value);
    }
  });
});
