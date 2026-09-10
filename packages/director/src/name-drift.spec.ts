import { describe, expect, it } from 'vitest';

/**
 * The only thing the validator caught in twenty-five turns, and it was wrong.
 *
 * `NAME_IDENTITY_DRIFT` fires when the prose seems to call the player by an
 * NPC's name. The pattern was `you(?:,| are| were)? <Name>` anywhere in the
 * beat, so "Behind you, Cass's silhouette lingers at the mouth of the path"
 * counted — an ordinary prepositional phrase, in a beat where nothing was
 * wrong. "Beside you, X", "in front of you, X" and the rest all did the same.
 */

const PREPOSITIONS = [
  'behind', 'beside', 'below', 'above', 'before', 'beyond', 'near', 'past', 'around',
  'toward', 'towards', 'opposite', 'against', 'between', 'among', 'with', 'without',
  'for', 'from', 'to', 'at', 'by', 'on', 'in', 'of', 'like', 'unlike', 'beneath',
  'under', 'over', 'across', 'through', 'inside', 'outside',
].join('|');

const addressedAs = (name: string, text: string): boolean =>
  new RegExp(`(?<!\\b(?:${PREPOSITIONS})\\s)\\byou(?:,| are| were)? ${name}\\b`, 'i').test(text);

describe('being called by somebody else’s name', () => {
  it('does not flag "behind you, Cass" — the live false positive', () => {
    expect(
      addressedAs('Cass', 'Behind you, Cass’s silhouette lingers at the mouth of the path.'),
    ).toBe(false);
  });

  it('leaves every other preposition alone too', () => {
    for (const p of ['Beside', 'Near', 'In front of', 'Past', 'Opposite', 'Across from']) {
      expect(addressedAs('Cass', `${p} you, Cass waits.`), p).toBe(false);
    }
  });

  it('still catches the player actually being called somebody else', () => {
    expect(addressedAs('Cass', '"Get up, you Cass, and pour the drinks."')).toBe(true);
    expect(addressedAs('Cass', 'You are Cass now, apparently.')).toBe(true);
  });

  it('accepts a miss rather than another false alarm', () => {
    // "They look at you, Cass, and say nothing" IS the player being called
    // Cass, and this does not catch it, because it is indistinguishable by
    // shape from "Behind you, Cass waits" — same preposition, same comma, and
    // only the clause that follows tells them apart.
    //
    // Deliberate. This is a WARN, it produced exactly one finding in a
    // twenty-five turn run and that finding was wrong, and a check that cries
    // wolf gets ignored and then deleted. Missing an edge case costs less.
    expect(addressedAs('Cass', 'They look at you, Cass, and say nothing.')).toBe(false);
  });

  it('does not fire when the name simply appears near "you"', () => {
    expect(addressedAs('Cass', 'You watch Cass pour the drinks.')).toBe(false);
  });
});
