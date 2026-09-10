import { describe, expect, it } from 'vitest';

import { agree, elide, hasMidpoint, thirdPersonPronoun } from './grammar.js';

/**
 * Step 6's gate is `Tu es arrivée` rendering for a player who asked for it.
 * This is the deterministic half of that.
 */

describe('agreement with the player', () => {
  it('agrees the past participle, which is the whole point', () => {
    expect(`Tu es ${agree('arrivé', 'MASCULINE')}`).toBe('Tu es arrivé');
    expect(`Tu es ${agree('arrivé', 'FEMININE')}`).toBe('Tu es arrivée');
  });

  it('takes the unmarked masculine for neutral and unspecified', () => {
    // Rule 5: a product that offers a neutral option and then quietly writes
    // `il` has done something worse than not offering it — so `iel` is honoured
    // in the third person. Agreement is a different axis, and there the
    // unmarked form is the answer, with avoidance preferred over either.
    expect(agree('arrivé', 'NEUTRAL')).toBe('arrivé');
    expect(agree('arrivé', 'UNSPECIFIED')).toBe('arrivé');
  });

  it('never produces a midpoint, for any input', () => {
    for (const word of ['arrivé', 'prêt', 'seul', 'nouveau', 'heureux', 'premier']) {
      for (const gender of ['MASCULINE', 'FEMININE', 'NEUTRAL', 'UNSPECIFIED'] as const) {
        const result = agree(word, gender);
        expect(result).not.toContain('·');
        expect(result).not.toContain('(e)');
        expect(hasMidpoint(result)).toBe(false);
      }
    }
  });

  it('handles the feminines that are not simply +e', () => {
    expect(agree('heureux', 'FEMININE')).toBe('heureuse');
    expect(agree('neuf', 'FEMININE')).toBe('neuve');
    expect(agree('premier', 'FEMININE')).toBe('première');
    expect(agree('cruel', 'FEMININE')).toBe('cruelle');
    expect(agree('ancien', 'FEMININE')).toBe('ancienne');
    expect(agree('bon', 'FEMININE')).toBe('bonne');
    expect(agree('net', 'FEMININE')).toBe('nette');
    expect(agree('gentil', 'FEMININE')).toBe('gentille');
    expect(agree('long', 'FEMININE')).toBe('longue');
    expect(agree('menteur', 'FEMININE')).toBe('menteuse');
  });

  it('leaves invariable adjectives alone', () => {
    // `calmee` is the bug this prevents.
    for (const word of ['calme', 'tranquille', 'jeune', 'libre', 'honnête', 'rouge']) {
      expect(agree(word, 'FEMININE')).toBe(word);
    }
  });

  it('still adds an e after an accented é', () => {
    expect(agree('fatigué', 'FEMININE')).toBe('fatiguée');
    expect(agree('blessé', 'FEMININE')).toBe('blessée');
  });

  it('does nothing to an empty string', () => {
    expect(agree('', 'FEMININE')).toBe('');
  });
});

describe('the third person', () => {
  it('gives iel to a player who chose neutral', () => {
    expect(thirdPersonPronoun('NEUTRAL', '')).toBe('iel');
    expect(thirdPersonPronoun('MASCULINE', '')).toBe('il');
    expect(thirdPersonPronoun('FEMININE', '')).toBe('elle');
  });

  it('honours a neologism the player typed, verbatim', () => {
    // `ol`, `ael`, `ille` are not enum values and must not become them; the
    // writer is told the string and asked to use it.
    expect(thirdPersonPronoun('NEUTRAL', 'ol')).toBe('ol');
    expect(thirdPersonPronoun('MASCULINE', 'ael')).toBe('ael');
  });

  it('says nothing when nobody has said anything', () => {
    expect(thirdPersonPronoun('UNSPECIFIED', '')).toBe('');
  });
});

describe('the midpoint detector', () => {
  it('catches the forms that must never ship', () => {
    expect(hasMidpoint('Tu es arrivé·e')).toBe(true);
    expect(hasMidpoint('les étudiant·e·s')).toBe(true);
  });

  it('does not fire on ordinary French', () => {
    expect(hasMidpoint('Tu es arrivée')).toBe(false);
    expect(hasMidpoint('Jour 3 · 16:15')).toBe(false);
    expect(hasMidpoint('un, deux et trois')).toBe(false);
    expect(hasMidpoint('Sur ses gardes')).toBe(false);
  });
});

describe('elision', () => {
  it('elides before a vowel, which a naive template does not', () => {
    // `de Élodie` is what `de ${name}` produces, and display names are free
    // text, so vowel-initial ones are ordinary rather than exotic.
    expect(elide('de', 'Élodie')).toBe('d’Élodie');
    expect(elide('de', 'Adrien')).toBe('d’Adrien');
    expect(elide('le', 'ami')).toBe('l’ami');
  });

  it('does not elide before a consonant', () => {
    expect(elide('de', 'Mako')).toBe('de Mako');
    expect(elide('de', 'Rook Arden')).toBe('de Rook Arden');
  });

  it('knows the aspirated h, which is the half nobody ships', () => {
    expect(elide('de', 'Hugo')).toBe('de Hugo');
    expect(elide('le', 'héros')).toBe('le héros');
    // …and elides before a mute one.
    expect(elide('de', 'Hélène')).toBe('d’Hélène');
    expect(elide('le', 'homme')).toBe('l’homme');
  });

  it('contracts before it elides', () => {
    // `de` + `le` is `du`, not `d’le`.
    expect(elide('de', 'le capitaine')).toBe('du capitaine');
    expect(elide('de', 'les autres')).toBe('des autres');
    expect(elide('à', 'le pont')).toBe('au pont');
    expect(elide('à', 'les autres')).toBe('aux autres');
  });

  it('only elides si before il', () => {
    expect(elide('si', 'il part')).toBe('s’il part');
    expect(elide('si', 'elle part')).toBe('si elle part');
  });

  it('never invents an apostrophe where there is no word', () => {
    expect(elide('de', '')).toBe('de');
    expect(elide('de', '   ')).toBe('de');
  });
});
