import { describe, expect, it } from 'vitest';
import { findAbsenceOfPresent, findPresenceOfAbsent } from './present-absence.js';

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
      // The contraction the first version of this let through, live.
      'There’s no answer — Coach Torakawa isn’t here, just the team.',
      "Torakawa isn't here.",
      'Torakawa is nowhere to be seen.',
    ]) {
      expect(findAbsenceOfPresent([{ text }], PRESENT), text).toHaveLength(1);
    }
  });

  it('catches prose that empties a room without naming anybody in it', () => {
    // Live, in Seven Days: the player asked Mina a question and the beat
    // answered "The platform is empty except for you and the sound of your own
    // words." She was standing in front of them.
    for (const text of [
      'The platform is empty except for you and the sound of your own words.',
      'You are alone on the platform.',
      'There is no one else here.',
      'The station is completely deserted.',
    ]) {
      expect(findAbsenceOfPresent([{ text }], PRESENT), text).toHaveLength(1);
    }
  });

  it('still allows a room that is empty apart from the person in it', () => {
    // The distinction that makes the exemption safe: "except for Torakawa"
    // means she is there; "except for you" means everybody else has gone.
    expect(
      findAbsenceOfPresent([{ text: 'The gym is empty except for Torakawa, who has not moved.' }], PRESENT),
    ).toEqual([]);
  });

  it('says nothing when nobody is on stage to contradict', () => {
    expect(findAbsenceOfPresent([{ text: 'You are alone on the platform.' }], [])).toEqual([]);
  });

  it('catches the same claim pointed at the future', () => {
    // Live, third wording: "You ask about the tower, but nobody is there. Mina
    // hasn't come up the platform, not yet."
    for (const text of [
      'Torakawa has not come up yet.',
      'Torakawa hasn’t arrived.',
      'Torakawa is not here yet.',
      'Nobody is there.',
      'No one is around.',
    ]) {
      expect(findAbsenceOfPresent([{ text }], PRESENT), text).toHaveLength(1);
    }
  });

  it('does not read an ordinary "not yet" as an absence', () => {
    for (const text of [
      'Torakawa has not said anything yet.',
      'Torakawa is not ready to talk about it.',
      'You have not asked Torakawa yet.',
    ]) {
      expect(findAbsenceOfPresent([{ text }], PRESENT), text).toEqual([]);
    }
  });

  it('says nothing about a character who is not on stage', () => {
    expect(findAbsenceOfPresent([{ text: 'Rei Amagi is not here.' }], PRESENT)).toEqual([]);
  });

  it('never reads a plain statement of presence as an absence', () => {
    for (const text of [
      'Torakawa is here.',
      'Torakawa was here before you arrived.',
      'Torakawa is around somewhere on the court, watching.',
    ]) {
      expect(findAbsenceOfPresent([{ text }], PRESENT), text).toEqual([]);
    }
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

/**
 * The check that could not fire.
 *
 * Every one of these is verbatim from the 25-turn Nine Weeks run, where the
 * whole cast is a first name plus a surname and the prose always uses the first
 * name. The old matcher tried the full name and the *last* word — "Juno Vale"
 * and "Vale" — so it never looked at "Juno", and six absence bugs walked past
 * it across twenty-five turns while the pattern list took the blame.
 */
describe('matching the name the prose actually uses', () => {
  const NINE_WEEKS = [
    { id: 'juno', name: 'Juno Vale' },
    { id: 'teo', name: 'Teo Sandoval' },
    { id: 'cass', name: 'Cass Reyner' },
  ];

  it('catches a first-name absence claim (turn 25, live)', () => {
    const [claim] = findAbsenceOfPresent(
      [{ text: 'Juno, though, is nowhere to be seen. The seat beside Cass is empty.' }],
      NINE_WEEKS,
    );
    expect(claim).toBeDefined();
    expect(claim!.characterId).toBe('juno');
  });

  it('catches the turn-8 beat that wrote Teo out of his own kitchen', () => {
    const [claim] = findAbsenceOfPresent(
      [{ text: 'But there is no Teo at your elbow. Only the clang of a heavy pot near the pantry.' }],
      NINE_WEEKS,
    );
    expect(claim).toBeDefined();
    expect(claim!.characterId).toBe('teo');
  });

  it('still catches it by surname, which is how the coach was written out', () => {
    const [claim] = findAbsenceOfPresent([{ text: 'Sandoval has already left.' }], NINE_WEEKS);
    expect(claim!.characterId).toBe('teo');
  });

  it('leaves a present first-name character alone', () => {
    for (const text of [
      'Juno leans back against the bar, tapping their beer on the countertop.',
      'Teo is here, flushed from the heat, tearing tickets off the printer.',
      'Cass is already grinning, elbows on the sticky bar top.',
    ]) {
      expect(findAbsenceOfPresent([{ text }], NINE_WEEKS), text).toEqual([]);
    }
  });

  it('does not hunt for "the" in a world that names somebody The Quiet One', () => {
    const cast = [{ id: 'quiet', name: 'The Quiet One' }];
    expect(
      findAbsenceOfPresent([{ text: 'The lantern is gone from the hook by the door.' }], cast),
    ).toEqual([]);
    expect(
      findAbsenceOfPresent([{ text: 'The Quiet One is nowhere to be seen.' }], cast),
    ).toHaveLength(1);
  });
});

/**
 * The other direction, from the same run: the dock beat that promised Juno had
 * walked down with the player when the engine had nobody there at all.
 */
describe('writing somebody into a room they are not in', () => {
  const ABSENT = [{ id: 'juno', name: 'Juno Vale' }];

  it('catches the beat that walked Juno to the dock (turn 15, live)', () => {
    const [claim] = findPresenceOfAbsent(
      [{ text: 'Juno drags a hand along the top rail as they join you, biting back whatever they were about to say.' }],
      ABSENT,
    );
    expect(claim).toBeDefined();
    expect(claim!.characterId).toBe('juno');
  });

  it('catches "Juno stands in front of you" (turn 23, live)', () => {
    expect(
      findPresenceOfAbsent([{ text: 'Juno stands in front of you. Shadows cut across their face.' }], ABSENT),
    ).toHaveLength(1);
  });

  it('catches the pair form (turn 24, live)', () => {
    expect(
      findPresenceOfAbsent(
        [{ text: 'It’s you and Juno at the dock’s edge with the boats dark and steady beneath you.' }],
        ABSENT,
      ),
    ).toHaveLength(1);
  });

  it('lets prose mention an absent person, which is most of this story', () => {
    for (const text of [
      'You know Juno is there. Not here.',
      'Juno said they’d be at the bar until the shift ends.',
      'Everything about the dock reminds you of Juno.',
      'Cass says Juno ducked out a minute before you walked in.',
    ]) {
      expect(findPresenceOfAbsent([{ text }], ABSENT), text).toEqual([]);
    }
  });

  it('does not fire on the correct absence prose that follows it', () => {
    expect(
      findPresenceOfAbsent([{ text: 'Juno isn’t beside you. Their absence sits in the space you meant for them.' }], ABSENT),
    ).toEqual([]);
  });
});

/**
 * The beat that put Mikoto in two places at once.
 *
 * Turn 5 of an Itachi run, verbatim. The engine had her present. The prose put
 * her at the sink, then had Sasuke say she was at a meeting across the
 * district, then said the kitchen did not answer — in one beat, four sentences
 * apart. The player had just asked her a direct question.
 *
 * Neither half was catchable before: "She is at the meeting" carries no name,
 * and "at the meeting" was not an absence phrasing the list knew.
 */
describe('a character in two places in one beat', () => {
  const PRESENT_HOUSE = [
    { id: 'mikoto', name: 'Mikoto Uchiha' },
    { id: 'sasuke', name: 'Sasuke Uchiha' },
  ];

  it('catches an absence claim made with a pronoun', () => {
    const block = {
      text:
        'Mikoto’s back is to you as she drains a pot in the sink. ' +
        'She is at the meeting. You said you would be back before dark.',
    };
    const [claim] = findAbsenceOfPresent([block], PRESENT_HOUSE);
    expect(claim).toBeDefined();
    expect(claim!.characterId).toBe('mikoto');
  });

  it('does not read an ordinary pronoun sentence as an absence', () => {
    const block = {
      text: 'Mikoto turns from the sink. She looks at you for a long moment, then goes back to the pot.',
    };
    expect(findAbsenceOfPresent([block], PRESENT_HOUSE)).toEqual([]);
  });

  it('needs the block to name them before a pronoun counts', () => {
    // Somebody else entirely, in a block that never mentions Mikoto.
    expect(
      findAbsenceOfPresent([{ text: 'The neighbour is not here; she is at the meeting.' }], [PRESENT_HOUSE[0]!]),
    ).toEqual([]);
  });

  it('catches "went out" as well as "at the meeting"', () => {
    expect(
      findAbsenceOfPresent([{ text: 'Sasuke shrugs. Mikoto went out an hour ago.' }], PRESENT_HOUSE),
    ).toHaveLength(1);
  });
});
