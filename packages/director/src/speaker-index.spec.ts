import { describe, expect, it } from 'vitest';
import { BLACKWAKE } from '@plotbreak/test-fixtures';
import { blocksFrom } from './fast-writer.js';
import { toSecondPerson } from './second-person.js';
import type { TurnContext } from './context.js';

/**
 * Attributing a line to the person who said it.
 *
 * Caught live in Blackwake. The beat wrote `Veyra: "We should not linger."` and
 * it rendered as a paragraph of narration with the raw prefix visible — no
 * portrait, no name — because only the *first* word of each name was indexed,
 * and hers is "Captain Veyra Sol".
 *
 * The second failure followed from the first. Narration containing the player's
 * name is rewritten to "you", so the misparsed line reached the player as "I
 * have no wish to explain myself to the Fleet this morning, you."
 */

const context = { story: { ...BLACKWAKE, characters: [...BLACKWAKE.characters, { ...BLACKWAKE.characters[0]!, id: 'mina', name: 'Mina Arclight' }] } } as TurnContext;

const speakerOf = (line: string) => blocksFrom(line, context)[0];

describe('who said this line', () => {
  it('finds a character by the name the prose actually uses', () => {
    const block = speakerOf('Veyra: "We should not linger."');
    expect(block!.type).toBe('DIALOGUE');
    expect(block!.speakerId).toBe(BLACKWAKE.characters.find((c) => c.name.includes('Veyra'))!.id);
    expect(block!.text).toBe('We should not linger.');
  });

  it('still finds them by their full name', () => {
    expect(speakerOf('Captain Veyra Sol: "We should not linger."')!.type).toBe('DIALOGUE');
  });

  it('leaves a line as narration rather than guessing between two people', () => {
    // Two Captains, so "Captain" alone names neither. Attributing it to the
    // wrong person is worse than not attributing it.
    const twoCaptains = {
      story: {
        ...BLACKWAKE,
        characters: [
          { ...BLACKWAKE.characters[0]!, id: 'a', name: 'Captain Alia Roe' },
          { ...BLACKWAKE.characters[1]!, id: 'b', name: 'Captain Bess Fenn' },
        ],
      },
    } as TurnContext;
    expect(blocksFrom('Captain: "Move."', twoCaptains)[0]!.type).toBe('NARRATION');
    expect(blocksFrom('Alia: "Move."', twoCaptains)[0]!.speakerId).toBe('a');
  });

  it('keeps a speech that runs over several lines in one block', () => {
    // Caught live: a long answer broke across newlines and arrived as four
    // blocks, only the first of which knew who was talking.
    const blocks = blocksFrom(
      'Mina: "Honestly?\nSunday is low-key here.\nSome people go down to the market."\nA gull lands on the roof.',
      context,
    );
    expect(blocks).toHaveLength(2);
    expect(blocks[0]!.type).toBe('DIALOGUE');
    expect(blocks[0]!.text).toContain('Some people go down to the market');
    expect(blocks[1]!.type).toBe('NARRATION');
  });

  it('hears an accented name, and a French space before the colon', () => {
    const accented = {
      story: {
        ...BLACKWAKE,
        characters: [{ ...BLACKWAKE.characters[0]!, id: 'elodie', name: 'Élodie Renaud' }],
      },
    } as TurnContext;
    for (const line of ['Élodie: "Assieds-toi."', 'Élodie\u00A0: "Assieds-toi."']) {
      const block = blocksFrom(line, accented)[0]!;
      expect(block.type, line).toBe('DIALOGUE');
      expect(block.speakerId, line).toBe('elodie');
    }
  });

  it('never rewrites the player’s name inside somebody’s speech', () => {
    const line = 'She does not look up. "I have no wish to explain myself this morning, Sable."';
    expect(toSecondPerson(line, 'Sable Vane')).toBe(line);
  });

  it('still rewrites the narration around the speech', () => {
    const fixed = toSecondPerson('Sable steps back. "Not today, Sable."', 'Sable Vane');
    expect(fixed).toBe('You step back. "Not today, Sable."');
  });
});
