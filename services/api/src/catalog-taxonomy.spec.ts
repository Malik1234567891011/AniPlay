import { describe, expect, it } from 'vitest';
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { CATEGORIES, availableCategories, categoriesFor, searchCatalog, tokenize } from './catalog-taxonomy.js';

/**
 * Browsing and searching, held to the thing that actually matters: a player
 * who wants a particular kind of anime should reach it without knowing what we
 * called it.
 */

const byTitle = (title: string) => LAUNCH_CATALOG.find((s) => s.title === title)!;
const titlesFor = (query: string): string[] =>
  searchCatalog(LAUNCH_CATALOG, query).map(
    (hit) => LAUNCH_CATALOG.find((s) => s.storyId === hit.storyId)!.title,
  );

describe('the browse vocabulary', () => {
  it('is short enough to be a menu', () => {
    // 25 author tags across 9 worlds is metadata. A player wants about eight
    // words they already know.
    expect(CATEGORIES.length).toBeLessThanOrEqual(10);
    for (const category of CATEGORIES) {
      expect(category.label.split(' ').length, category.label).toBeLessThanOrEqual(2);
    }
  });

  it('files every world somewhere', () => {
    for (const story of LAUNCH_CATALOG) {
      expect(categoriesFor(story), `${story.title} is unbrowsable`).not.toEqual([]);
    }
  });

  it('lets a world be in more than one place', () => {
    // Blackwake is an adventure and a mystery. Filing it under one hides it
    // from half the people who would like it.
    expect(categoriesFor(byTitle('Blackwake'))).toEqual(
      expect.arrayContaining(['adventure', 'mystery']),
    );
  });

  it('never offers a category with nothing in it', () => {
    for (const category of availableCategories(LAUNCH_CATALOG)) {
      expect(category.count).toBeGreaterThan(0);
    }
  });

  it('grows on its own as the catalog does', () => {
    const withoutRomance = LAUNCH_CATALOG.filter((s) => !categoriesFor(s).includes('romance'));
    expect(availableCategories(withoutRomance).map((c) => c.id)).not.toContain('romance');
    expect(availableCategories(LAUNCH_CATALOG).map((c) => c.id)).toContain('romance');
  });

  it('does not file a world under a category because one word appeared once', () => {
    // Nine Weeks is a romance in a restaurant. It is not an Adventure because
    // somebody mentions a road.
    expect(categoriesFor(byTitle('Nine Weeks'))).not.toContain('adventure');
  });
});

describe('search finds what a player means, not what they typed', () => {
  it('ignores stopwords and punctuation', () => {
    expect(tokenize('The Salt Road!')).toEqual(['salt', 'road']);
    expect(tokenize('a')).toEqual([]);
  });

  it('finds a world by its title', () => {
    expect(titlesFor('blackwake')[0]).toBe('Blackwake');
    expect(titlesFor('tidewall')[0]).toBe('The Tidewall');
  });

  it('finds a world by what it is about, in a player’s words', () => {
    expect(titlesFor('pirates')[0]).toBe('Blackwake');
    expect(titlesFor('time loop')[0]).toBe('Seven Days to Midnight');
    // Nothing is tagged "magic school" — the world is tagged "Magic academy".
    expect(titlesFor('magic school')[0]).toBe('The Ninth Archive');
  });

  it('finds a world by a character in it', () => {
    expect(titlesFor('nessa vale')[0]).toBe('Blackwake');
    expect(titlesFor('veyra')[0]).toBe('Blackwake');
  });

  it('finds a world by a mechanic it advertises', () => {
    expect(titlesFor('upgrade your ship')[0]).toBe('Blackwake');
  });

  it('requires every word to land before it claims a match', () => {
    // "dark academy" must not return every world with anything dark in it.
    const hits = titlesFor('magic academy');
    expect(hits[0]).toBe('The Ninth Archive');
  });

  it('would rather show a near miss than an empty screen', () => {
    const hits = titlesFor('pirates on a spaceship');
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0]).toBe('Blackwake');
  });

  it('returns nothing for a query about something we do not have', () => {
    expect(titlesFor('quantum accounting software')).toEqual([]);
  });

  it('ranks a title match above a passing mention', () => {
    const hits = titlesFor('archive');
    expect(hits[0]).toBe('The Ninth Archive');
  });

  it('treats an empty query as a browse', () => {
    expect(searchCatalog(LAUNCH_CATALOG, '')).toHaveLength(LAUNCH_CATALOG.length);
    expect(searchCatalog(LAUNCH_CATALOG, '   ')).toHaveLength(LAUNCH_CATALOG.length);
  });

  it('does not rank a fragment as though it were the word', () => {
    // "art" appears inside "Bartering"; it should not beat a real word match.
    const hits = searchCatalog(LAUNCH_CATALOG, 'crew');
    const top = LAUNCH_CATALOG.find((s) => s.storyId === hits[0]?.storyId)!;
    expect(top.title).toBe('Blackwake');
  });
});

/**
 * Accents, on both sides.
 *
 * `tokenize` split on `[^a-z0-9']+`, which makes every accented letter a word
 * separator: `académie` became `['acad', 'mie']`. Nothing folded accents
 * either, so `academie` typed without one — which is what a phone keyboard
 * encourages — could not match `académie` at all. Invisible on an English
 * catalogue and wrong on every screen of a French one.
 */
describe('a French catalogue, searched in French', () => {
  it('tokenizes an accented word as one word', () => {
    expect(tokenize('académie')).toEqual(['academie']);
    expect(tokenize('élève')).toEqual(['eleve']);
    expect(tokenize('Forêt Noire')).toEqual(['foret', 'noire']);
  });

  it('matches whether or not the player typed the accent', () => {
    expect(tokenize('academie')).toEqual(tokenize('académie'));
    expect(tokenize('ECOLE')).toEqual(tokenize('école'));
  });

  it('still tokenizes English exactly as before', () => {
    expect(tokenize('magic school')).toEqual(['magic', 'school']);
    expect(tokenize('the art of war')).toEqual(['art', 'war']);
  });
});
