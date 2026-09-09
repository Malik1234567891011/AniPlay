import { describe, expect, it } from 'vitest';
import { narratesPlayerInThirdPerson, toSecondPerson } from './second-person.js';

describe('toSecondPerson', () => {
  it('rewrites the sentence that started this', () => {
    expect(
      toSecondPerson(
        'Robin lunges toward Mira Senn and swings. Mira twists aside; Robin’s hand cuts only damp air.',
        'Robin Vale',
      ),
    ).toBe('You lunge toward Mira Senn and swings. Mira twists aside; your hand cuts only damp air.');
  });

  it('fixes verb agreement, including the irregulars', () => {
    expect(toSecondPerson('Robin is late. Robin has the letter. Robin goes inside.', 'Robin')).toBe(
      'You are late. You have the letter. You go inside.',
    );
    expect(toSecondPerson('Robin watches. Robin tries again. Robin passes the gate.', 'Robin')).toBe(
      'You watch. You try again. You pass the gate.',
    );
  });

  it('does not mangle a word that only looks like a verb', () => {
    expect(toSecondPerson('Robin and Kael wait. Robin, still holding it, says nothing.', 'Robin')).toBe(
      'You and Kael wait. You, still holding it, says nothing.',
    );
  });

  it('prefers the full name over the first name', () => {
    expect(toSecondPerson('Robin Vale steps through.', 'Robin Vale')).toBe('You step through.');
  });

  it('leaves prose that is already second person alone', () => {
    const text = 'You step through the arch and the light goes red.';
    expect(toSecondPerson(text, 'Robin Vale')).toBe(text);
  });

  it('does nothing for a name too short to match safely', () => {
    expect(toSecondPerson('A stands there.', 'A')).toBe('A stands there.');
  });
});

describe('narratesPlayerInThirdPerson', () => {
  it('spots the player being written about', () => {
    expect(narratesPlayerInThirdPerson('Robin lunges forward.', 'Robin Vale')).toBe(true);
    expect(narratesPlayerInThirdPerson('You lunge forward.', 'Robin Vale')).toBe(false);
  });
});
