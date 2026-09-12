import { describe, expect, it } from 'vitest';
import type { StoryVersion } from './story.js';
import { NINE_WEEKS } from '@plotbreak/test-fixtures';
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

  it('never touches a person’s name, or the world’s', () => {
    // A translated proper noun is how a world stops being the same world. Juno
    // Vale is Juno Vale in Paris.
    expect(fr.title).toBe(en.title);
    for (const [index, character] of fr.characters.entries()) {
      expect(character.name).toBe(en.characters[index]!.name);
      expect(character.id).toBe(en.characters[index]!.id);
    }
  });

  it('does translate a place whose name is a description', () => {
    // `STORY_AUDIT.md` §2 says location names never travel, and that rule was
    // written for invented proper nouns — Blackwake, the Tidewall. `The Back
    // Steps` and `The Road Into Town` are not that: they are ordinary
    // descriptions with a definite article, and leaving them puts
    // `place: The Staff Cabins` in a French HUD under a French clock beside
    // French prose. It is the most visible untranslated thing in a session.
    const cabins = fr.locations.find((l) => l.id === 'staff_cabins');
    expect(cabins?.name).toBe('Les cabanons');
  });

  it('keeps a proper noun that lives inside a place name', () => {
    // The hotel is called the Longhouse. `Le bar du Longhouse` translates the
    // description around it and leaves the name alone.
    const bar = fr.locations.find((l) => l.id === 'longhouse_bar');
    expect(bar?.name).toContain('Longhouse');
    expect(bar?.name).not.toBe(en.locations.find((l) => l.id === 'longhouse_bar')!.name);
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
    // A world that does not exist has no French, which is the only stable way
    // to assert this now that the catalogue is adapted. These two assertions
    // used Itachi as the example of "no overlay" and started failing the hour
    // Itachi got 750 fields — the test was stale, not the code.
    expect(worldTextCoverage('fr', 'story_does_not_exist')).toBe(0);
  });

  it('leaves a world with no overlay exactly as it was', () => {
    const unknown = { ...en, storyId: 'story_does_not_exist' } as StoryVersion;
    expect(localizeStory(unknown, 'fr')).toBe(unknown);
  });
});

describe('every path in the overlay resolves', () => {
  it('changes something for each one, so a typo cannot go unnoticed', () => {
    // `localizeStory` ignores unknown paths on purpose — a stale path is a copy
    // problem, not a reason to take a world off the shelf. The cost is that a
    // typo is completely silent, so it is caught here instead: every path must
    // make the French differ from the English somewhere.
    const enJson = JSON.stringify(en);
    const frJson = JSON.stringify(fr);
    expect(frJson).not.toBe(enJson);

    // Location names specifically, because they are addressed by id and a
    // wrong id is the easiest mistake to make.
    for (const location of fr.locations) {
      const english = en.locations.find((l) => l.id === location.id)!;
      // Every Nine Weeks location is overlaid, so none should still read English.
      expect(location.name, location.id).not.toBe(english.name);
    }
  });
});

describe('the title', () => {
  it('never travels, because the cover art carries it', () => {
    // Every cover has the English title painted into the image — `ZERO THRONE`
    // is part of the picture. A French label under English key art is not a
    // localization, it is two names for one thing on the same screen.
    //
    // The batch translated 22 of them before this was noticed, and
    // inconsistently: `La Prophétie Vide` moved, `Blackwake` did not. Revisit
    // the day covers are generated per locale.
    expect(fr.title).toBe(en.title);
  });
});
