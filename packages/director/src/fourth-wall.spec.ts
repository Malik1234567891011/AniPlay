import { describe, expect, it } from 'vitest';
import type { NarrativeBlock, StoryVersion } from '@plotbreak/contracts';
import { LAST_FIVE, NINTH_ARCHIVE } from '@plotbreak/test-fixtures';
import { allowsMetaFiction, findFourthWallBreaks, fourthWallRepairNote } from './fourth-wall.js';

/**
 * Nobody in the story knows there is a story.
 *
 * Caught in the wild, from Last Five, spoken by a seventeen-year-old on a
 * basketball court: "Robin, this isn't a game where you can…".
 */

const block = (text: string, type: NarrativeBlock['type'] = 'NARRATION'): NarrativeBlock =>
  ({ type, speakerId: type === 'DIALOGUE' ? 'kael' : null, text, visibility: 'GROUP', voiceEligible: false }) as NarrativeBlock;

const breaks = (text: string, story: StoryVersion = LAST_FIVE) =>
  findFourthWallBreaks([block(text)], story);

describe('lines that stepped outside the fiction', () => {
  it('catches the one that shipped', () => {
    expect(breaks("Robin, this isn't a game where you can fly.")).toHaveLength(1);
  });

  it('catches the engine being given agency', () => {
    for (const text of [
      'The game will not let you do that.',
      'The system says no.',
      'The engine does not allow it.',
    ]) {
      expect(breaks(text), text).toHaveLength(1);
    }
  });

  it('catches the model talking about itself', () => {
    for (const text of [
      'Your prompt was unclear.',
      'The AI cannot continue this scene.',
      'That is beyond the language model.',
    ]) {
      expect(breaks(text), text).toHaveLength(1);
    }
  });

  it('catches dice and stats quoted as reasons', () => {
    for (const text of [
      'You failed your check.',
      'You do not have enough stats for that.',
      'Roll a d20.',
      'Make a saving throw.',
    ]) {
      expect(breaks(text), text).toHaveLength(1);
    }
  });

  it('catches error-message register', () => {
    expect(breaks('That action is invalid.')).toHaveLength(1);
    expect(breaks('This command is not allowed.')).toHaveLength(1);
  });

  it('catches the people who made it', () => {
    expect(breaks('The developers did not write that.')).toHaveLength(1);
    expect(breaks('The script requires you to go north.')).toHaveLength(1);
  });

  it('catches it in dialogue as well as narration', () => {
    expect(findFourthWallBreaks([block('This is a game, Sora.', 'DIALOGUE')], LAST_FIVE)).toHaveLength(1);
  });
});

describe('lines that only look like it', () => {
  it('leaves an ordinary sports sentence alone', () => {
    // The whole world is about games. This must survive.
    for (const text of [
      'The game is at nine on Saturday.',
      'You lost the game by four.',
      'He has been playing this game since he was six.',
      'That was the best game of his life.',
      'Coach wants the whole team here before the game.',
    ]) {
      expect(breaks(text), text).toEqual([]);
    }
  });

  it('leaves ordinary uses of the flagged nouns alone', () => {
    for (const text of [
      'The system of wards runs the length of the wall.',
      'She is a player in every sense that matters here.',
      'He scripts every practice down to the minute.',
      'The engine of the boat coughed and died.',
    ]) {
      expect(breaks(text, NINTH_ARCHIVE), text).toEqual([]);
    }
  });

  it('leaves an in-world refusal alone — that is the shape we want', () => {
    expect(
      breaks('You leap, and there is nothing in your training that keeps you in the air.'),
    ).toEqual([]);
  });
});

describe('worlds that are about this', () => {
  it('opts out when the premise is meta-fiction', () => {
    const meta = { ...LAST_FIVE, tags: [...LAST_FIVE.tags, 'Meta'] } as StoryVersion;
    expect(allowsMetaFiction(meta)).toBe(true);
    expect(findFourthWallBreaks([block("This isn't a game.")], meta)).toEqual([]);
  });

  it('does not opt out an ordinary world', () => {
    expect(allowsMetaFiction(LAST_FIVE)).toBe(false);
  });
});

describe('what the writer is told', () => {
  it('asks for a rewrite in-world, not a deletion', () => {
    const note = fourthWallRepairNote(breaks("This isn't a game where you can fly."));
    expect(note).toMatch(/nobody here knows they are in a game/i);
    expect(note).toMatch(/same true thing from inside the world/i);
    expect(note).toMatch(/do not simply delete/i);
    // And it gives the shape of a good replacement.
    expect(note).toMatch(/nothing in your training/i);
  });
});
