import { describe, expect, it } from 'vitest';
import { findAbsenceOfPresent } from './present-absence.js';

const PRESENT = [
  { id: 'coach', name: 'Ena Torakawa' },
  { id: 'dai', name: 'Dai Okonkwo' },
];

/** The block that prompted this, verbatim from a live turn in Last Five. */
const CAUGHT_IN_THE_WILD =
  'The light through the high windows makes a rectangle on the court where you step, ' +
  'shoes sticking on the old finish. You look for Coach Torakawa, but there is only an ' +
  'empty folding chair, her jacket slung over it. The words come out anyway, across ' +
  'empty space that doesn’t answer.';

describe('writing somebody out of the room they are standing in', () => {
  it('catches the beat that made the coach disappear', () => {
    const [claim] = findAbsenceOfPresent([{ text: CAUGHT_IN_THE_WILD }], PRESENT);
    expect(claim).toBeDefined();
    expect(claim!.characterId).toBe('coach');
    expect(claim!.blockIndex).toBe(0);
    expect(claim!.sentence).toContain('You look for Coach Torakawa');
  });

  it('matches the surname alone, because prose alternates', () => {
    const found = findAbsenceOfPresent([{ text: 'Torakawa is not here.' }], PRESENT);
    expect(found.map((c) => c.characterId)).toEqual(['coach']);
  });

  it('catches the other ways prose says it', () => {
    for (const text of [
      'There is no sign of Torakawa.',
      'Torakawa is gone.',
      'Torakawa has already left.',
      'Torakawa is no longer here.',
    ]) {
      expect(findAbsenceOfPresent([{ text }], PRESENT), text).toHaveLength(1);
    }
  });

  it('says nothing about a character who is not on stage', () => {
    expect(findAbsenceOfPresent([{ text: 'Rei Amagi is not here.' }], PRESENT)).toEqual([]);
  });

  it('leaves ordinary prose about a present character alone', () => {
    const text =
      'Coach Torakawa is standing at the edge of the court with her arms folded, not coming over. ' +
      'She lets the empty gym answer for her.';
    expect(findAbsenceOfPresent([{ text }], PRESENT)).toEqual([]);
  });

  it('does not fire on an empty room the character is in', () => {
    const text = 'The gym is empty except for Torakawa, who has not moved.';
    expect(findAbsenceOfPresent([{ text }], PRESENT)).toEqual([]);
  });

  it('names the block, so the repair can drop it rather than the beat', () => {
    const found = findAbsenceOfPresent(
      [{ text: 'You step onto the court.' }, { text: 'Torakawa is nowhere.' }],
      PRESENT,
    );
    expect(found).toHaveLength(1);
    expect(found[0]!.blockIndex).toBe(1);
  });
});
