import { describe, expect, it } from 'vitest';
import type { StoryVersion } from './story.js';
import { NINE_WEEKS } from '@aniplay/test-fixtures';
import { localizeStory, worldTextCoverage } from './localize.js';

/**
 * A world in another language.
 *
 * The overlay carries prose only; everything structural stays exactly as it is,
 * because a French session and an English one have to be the *same world* with
 * the same ids, exits, checks and asset keys. If those can drift, the two
 * locales are two games.
 */
const en = NINE_WEEKS as unknown as StoryVersion;
const fr = localizeStory(en, 'fr');

describe('the French overlay', () => {
  it('writes the prose a player reads', () => {
    expect(fr.premise).toMatch(/La ville au bord de ce lac/);
    expect(fr.opening).toMatch(/Le bus te dépose/);
    expect(fr.hook).toMatch(/Tu reviens faire la même saison/);
  });

  it('leaves English completely alone', () => {
    // The same object, unmutated. `structuredClone` rather than a spread is
    // what makes this true at depth — a shallow copy would have let the
    // overlay write through into the shared fixture and translate the English
    // catalogue for every session in the process.
    expect(en.premise).toMatch(/The town on this lake/);
    expect(localizeStory(en, 'en')).toBe(en);
  });

  it('never touches a name', () => {
    // `STORY_AUDIT.md` §2: names do not travel. A translated proper noun is
    // how a world stops being the same world.
    expect(fr.title).toBe(en.title);
    for (const [index, character] of fr.characters.entries()) {
      expect(character.name).toBe(en.characters[index]!.name);
      expect(character.id).toBe(en.characters[index]!.id);
    }
    for (const [index, location] of fr.locations.entries()) {
      expect(location.name).toBe(en.locations[index]!.name);
    }
  });

  it('never touches anything structural', () => {
    expect(fr.locations.map((l) => l.id)).toEqual(en.locations.map((l) => l.id));
    expect(fr.abilities.map((a) => a.id)).toEqual(en.abilities.map((a) => a.id));
    expect(fr.quests.map((q) => q.id)).toEqual(en.quests.map((q) => q.id));
    expect(fr.rules.startingLocationId).toBe(en.rules.startingLocationId);
    expect(fr.rules.startWorldMinute).toBe(en.rules.startWorldMinute);
    expect(fr.coverImage).toBe(en.coverImage);
  });

  it('keeps `artDirection` in English, because it is a prompt for an image model', () => {
    for (const [index, location] of fr.locations.entries()) {
      expect(location.artDirection).toBe(en.locations[index]!.artDirection);
    }
  });

  it('addresses the cast by id, so reordering cannot reassign a voice', () => {
    const juno = fr.characters.find((c) => c.id === 'juno');
    expect(juno?.speechStyle).toMatch(/Dit ton prénom/);
    // ...and nobody else got it.
    const others = fr.characters.filter((c) => c.id !== 'juno');
    for (const other of others) expect(other.speechStyle).not.toMatch(/Dit ton prénom/);
  });

  it('has no inclusive midpoint anywhere in it', () => {
    // The rule the validator enforces on generated prose applies to authored
    // prose too, and this file failed it on the first draft.
    const everything = JSON.stringify(fr);
    expect(everything).not.toMatch(/\p{L}[·‧•]\p{L}/u);
  });

  it('reports its coverage, so what is missing is visible rather than silent', () => {
    expect(worldTextCoverage('fr', 'story_nine_weeks')).toBeGreaterThan(20);
    expect(worldTextCoverage('fr', 'story_itachi')).toBe(0);
  });

  it('leaves a world with no overlay exactly as it was', () => {
    const itachi = { ...en, storyId: 'story_itachi' } as StoryVersion;
    expect(localizeStory(itachi, 'fr')).toBe(itachi);
  });
});
