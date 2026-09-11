import { describe, expect, it } from 'vitest';

import {
  compareText,
  equalsNormalized,
  frCollator,
  hasStraightApostrophe,
  includesNormalized,
  normalizeForSearch,
  startsWithNormalized,
  textComparator,
} from './search.js';

describe('the apostrophe problem', () => {
  it('is real: NFKC does not fold U+2019', () => {
    // The measurement this whole module is built on.
    expect('l’ami'.normalize('NFKC')).toBe('l’ami');
    expect('Aujourd’hui'.includes("l'aube")).toBe(false);
  });

  it('folds every apostrophe lookalike to the ASCII one', () => {
    for (const apostrophe of ['’', '‘', 'ʼ', 'ʹ', '′', '´', '`']) {
      expect(normalizeForSearch(`l${apostrophe}ami`)).toBe("l'ami");
    }
  });

  it('matches across the two forms in both directions', () => {
    expect(includesNormalized('Aujourd’hui, à l’aube', "l'aube")).toBe(true);
    expect(includesNormalized("Aujourd'hui, à l'aube", 'l’aube')).toBe(true);
  });
});

describe('the ligature problem', () => {
  it('is real: NFKD does not decompose œ', () => {
    expect('œuvre'.normalize('NFKD')).toBe('œuvre');
  });

  it('lets a player who types oeuvre find œuvre', () => {
    expect(includesNormalized('Une œuvre de jeunesse', 'oeuvre')).toBe(true);
    expect(includesNormalized('Une oeuvre de jeunesse', 'œuvre')).toBe(true);
    expect(normalizeForSearch('cœur')).toBe('coeur');
    expect(normalizeForSearch('Sœur')).toBe('soeur');
    expect(normalizeForSearch('nævus')).toBe('naevus');
  });
});

describe('diacritics and case', () => {
  it('folds accents, including on capitals', () => {
    expect(normalizeForSearch('Élodie')).toBe('elodie');
    expect(normalizeForSearch('À SUIVRE')).toBe('a suivre');
    expect(normalizeForSearch('château')).toBe('chateau');
    expect(normalizeForSearch('ça')).toBe('ca');
  });

  it('folds the non-breaking spaces a formatted number carries', () => {
    expect(normalizeForSearch('1 234')).toBe('1 234');
    expect(normalizeForSearch('1 234')).toBe('1 234');
  });

  it('does the same thing to the needle and the haystack', () => {
    expect(equalsNormalized('L’AMI', "l'ami")).toBe(true);
    expect(startsWithNormalized('Élodie Rousseau', 'elo')).toBe(true);
  });

  it('still tells different words apart', () => {
    expect(equalsNormalized('pêche', 'peche')).toBe(true);
    expect(equalsNormalized('pêche', 'peuple')).toBe(false);
    expect(includesNormalized('Kaia Thorn', 'kosei')).toBe(false);
  });

  it('treats an empty needle as matching, so a cleared search box shows everything', () => {
    expect(includesNormalized('anything', '')).toBe(true);
    expect(startsWithNormalized('anything', '')).toBe(true);
  });
});

describe('English is unaffected', () => {
  it('leaves plain ASCII exactly as it was, lowercased', () => {
    expect(normalizeForSearch('Blackwake')).toBe('blackwake');
    expect(includesNormalized('Seven Days to Midnight', 'days to')).toBe(true);
    expect(includesNormalized("Don't Look Back", "don't")).toBe(true);
    expect(includesNormalized('Don’t Look Back', "don't")).toBe(true);
  });
});

describe('collation', () => {
  it('sorts French names with accents in the right place', () => {
    const names = ['Zoé', 'Élodie', 'Adrien', 'Étienne', 'agnès'];
    const sorted = [...names].sort(textComparator('fr'));
    expect(sorted).toEqual(['Adrien', 'agnès', 'Élodie', 'Étienne', 'Zoé']);
  });

  it('is deterministic whether or not the engine has a usable collator', () => {
    // Both paths must agree on the cases the app actually sorts.
    const collator = frCollator();
    if (collator) {
      expect(collator.compare("l'ami", 'l’ami')).toBe(0);
    }
    expect(compareText('a', 'b', 'fr')).toBeLessThan(0);
    expect(compareText('b', 'a', 'fr')).toBeGreaterThan(0);
    expect(compareText('Élodie', 'Elodie', 'fr')).toBe(0);
  });

  it('sorts English titles the way they were sorted before', () => {
    const titles = ['Nine Weeks', 'Blackwake', 'Last Five', 'Window Seven'];
    expect([...titles].sort(textComparator('en'))).toEqual([
      'Blackwake',
      'Last Five',
      'Nine Weeks',
      'Window Seven',
    ]);
  });
});

describe('the display-side apostrophe lint', () => {
  it('finds a straight apostrophe between letters', () => {
    expect(hasStraightApostrophe("Qu'est-ce que tu fais ?")).toBe(true);
    expect(hasStraightApostrophe('Qu’est-ce que tu fais ?')).toBe(false);
  });

  it('does not fire on a quote that is not between letters', () => {
    expect(hasStraightApostrophe("'quoted'")).toBe(false);
    expect(hasStraightApostrophe('no apostrophe here')).toBe(false);
  });
});
