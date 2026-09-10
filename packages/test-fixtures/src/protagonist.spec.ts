import { describe, expect, it } from 'vitest';
import { LAUNCH_CATALOG, ITACHI, NINE_WEEKS } from './index.js';

/**
 * Worlds that already know who you are should not ask.
 *
 * Itachi's premise is "you are thirteen, you are the best shinobi your clan has
 * produced in a generation", and the setup screen asked the player to type that
 * name, invent an appearance and pick pronouns — with placeholder text
 * describing Itachi back at them. Malik caught it on the simulator.
 */
describe('who the story thinks you are', () => {
  it('Itachi knows, and says so', () => {
    expect(ITACHI.protagonist.kind).toBe('NAMED');
    expect(ITACHI.protagonist.name).toBe('Itachi Uchiha');
    expect(ITACHI.protagonist.pronouns).not.toBe('');
    expect(ITACHI.protagonist.setupHeading).not.toBe('');
  });

  it('stops asking Itachi for the things it already knows', () => {
    const asked = ITACHI.setupFields.map((f) => f.id);
    expect(asked).not.toContain('displayName');
    expect(asked).not.toContain('pronouns');
    expect(asked).not.toContain('appearance');
  });

  it('still asks Itachi the one question that is actually the player’s', () => {
    const archetype = ITACHI.setupFields.find((f) => f.kind === 'ARCHETYPE');
    expect(archetype).toBeDefined();
    expect(archetype!.label).toMatch(/battlefield/i);
    // Characterisation, not identity — and it must not narrow what may happen.
    expect(archetype!.helpText).toMatch(/none of that is decided here/i);
  });

  it('leaves a blank protagonist alone, because inventing yourself is its premise', () => {
    expect(NINE_WEEKS.protagonist.kind).toBe('BLANK');
    expect(NINE_WEEKS.setupFields.map((f) => f.id)).toContain('displayName');
  });

  it('defaults every other world to BLANK, so nothing written before this changed', () => {
    for (const story of LAUNCH_CATALOG) {
      if (story.storyId === 'story_itachi') continue;
      expect(story.protagonist.kind, story.title).toBe('BLANK');
    }
  });

  it('a NAMED world always carries the name it will enter the player as', () => {
    for (const story of LAUNCH_CATALOG) {
      if (story.protagonist.kind !== 'NAMED') continue;
      expect(story.protagonist.name.trim().length, story.title).toBeGreaterThan(0);
    }
  });
});
