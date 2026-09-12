import type { StoryVersion } from '@plotbreak/contracts';
import { normalizeForSearch } from '@plotbreak/i18n';

/**
 * The words a player browses in, and how they map onto what worlds are tagged.
 *
 * Two vocabularies exist and they are not the same. Authors tag worlds with
 * whatever describes them ("Body horror", "Class RPG", "Time loop") — 25 tags
 * across 9 worlds, most of them used once, which is useful metadata and a
 * terrible menu. A player browsing wants about eight words they already know.
 *
 * So categories are derived, never authored. A new world is filed by the tags
 * it already has, nobody has to remember to add it to a list, and the mapping
 * lives in one testable place instead of being reimplemented per client.
 *
 * `keywords` do double duty: they file a world by what its premise is *about*
 * as well as by its tags, and they give search its synonyms, so "basketball"
 * reaches a world tagged "Sports" and "magic school" reaches one tagged
 * "Magic academy".
 */

export interface CategoryDef {
  readonly id: string;
  /** Ordinary words. Never a genre taxonomy term a player would have to learn. */
  readonly label: string;
  /** Author tags that file a world here, matched case-insensitively. */
  readonly tags: readonly string[];
  /** Words in the premise, hook or mechanics that also file it here. */
  readonly keywords: readonly string[];
}

export const CATEGORIES: readonly CategoryDef[] = [
  {
    id: 'action',
    label: 'Action',
    tags: ['Martial arts', 'Military', 'Monsters', 'Rivalry'],
    keywords: ['fight', 'fighting', 'combat', 'battle', 'war', 'duel', 'weapon', 'sword'],
  },
  {
    id: 'romance',
    label: 'Romance',
    tags: ['Romance', 'Slice of life'],
    keywords: ['love', 'dating', 'heartbreak', 'crush', 'relationship'],
  },
  {
    id: 'fantasy',
    label: 'Fantasy',
    tags: ['High fantasy', 'Dark fantasy', 'Magic academy', 'Supernatural', 'Class RPG'],
    keywords: ['magic', 'spell', 'ward', 'wizard', 'sorcery', 'ritual'],
  },
  {
    id: 'sports',
    label: 'Sports',
    tags: ['Sports', 'Team'],
    keywords: [
      'basketball',
      'football',
      'soccer',
      'volleyball',
      'baseball',
      'tennis',
      'boxing',
      'athlete',
      'coach',
      'team',
      'tournament',
      'training',
    ],
  },
  {
    id: 'mystery',
    label: 'Mystery',
    tags: ['Mystery', 'Investigation', 'Time loop'],
    keywords: ['murder', 'secret', 'detective', 'clue', 'conspiracy', 'disappeared'],
  },
  {
    id: 'school',
    label: 'School',
    tags: ['Magic academy', 'Coming of age', 'School'],
    keywords: ['school', 'academy', 'student', 'class', 'classmate', 'exam', 'high school'],
  },
  {
    id: 'adventure',
    label: 'Adventure',
    tags: ['Adventure', 'Exploration', 'Pirates', 'Survival', 'Crew'],
    keywords: ['voyage', 'journey', 'map', 'island', 'ship', 'expedition', 'road'],
  },
  {
    id: 'horror',
    label: 'Horror',
    tags: ['Body horror', 'Horror'],
    keywords: ['horror', 'monster', 'infected', 'terror', 'nightmare'],
  },
  {
    id: 'drama',
    label: 'Drama',
    tags: ['Drama', 'Ambition'],
    keywords: ['ambition', 'reputation', 'family', 'rivalry'],
  },
];

const lower = (values: readonly string[]): string[] => values.map((v) => v.toLowerCase());

/** Everything about a world that a category or a search can match against. */
function haystackOf(story: StoryVersion): string {
  return [story.title, story.hook, story.premise, ...story.tags, ...story.mechanicsChips]
    .join(' ')
    .toLowerCase();
}

/**
 * Which categories a world belongs to.
 *
 * A world can be in several — Blackwake is Adventure and Mystery, and filing it
 * under only one would hide it from half the people who would like it.
 */
export function categoriesFor(story: StoryVersion): string[] {
  const tags = new Set(lower(story.tags));
  const haystack = haystackOf(story);

  return CATEGORIES.filter((category) => {
    if (lower(category.tags).some((tag) => tags.has(tag))) return true;
    // Keyword filing is deliberately stricter than search: a world is only in
    // Sports because it is about sport, not because somebody trains once. Two
    // separate keywords have to land before a premise counts.
    const hits = category.keywords.filter((word) => haystack.includes(word)).length;
    return hits >= 2;
  }).map((category) => category.id);
}

export interface AvailableCategory {
  readonly id: string;
  readonly label: string;
  readonly count: number;
}

/**
 * The category rail, built from what the catalog actually contains.
 *
 * An empty category is worse than a missing one: a player taps "Horror",
 * sees nothing, and learns the app is padded. So a category with no worlds in
 * it does not appear, and the rail grows on its own as the catalog does.
 */
export function availableCategories(stories: readonly StoryVersion[]): AvailableCategory[] {
  const counts = new Map<string, number>();
  for (const story of stories) {
    for (const id of categoriesFor(story)) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return CATEGORIES.filter((c) => (counts.get(c.id) ?? 0) > 0).map((c) => ({
    id: c.id,
    label: c.label,
    count: counts.get(c.id) ?? 0,
  }));
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

/**
 * Fields, in the order they are worth. A word in a title means more than the
 * same word buried in three paragraphs of premise, and a substring match on
 * `premise` was previously the only thing search did.
 */
const WEIGHTS = {
  title: 12,
  tag: 8,
  character: 6,
  mechanic: 5,
  hook: 4,
  creator: 4,
  category: 4,
  premise: 2,
} as const;

const STOPWORDS = new Set(['a', 'an', 'the', 'of', 'and', 'or', 'in', 'on', 'to', 'with', 'for']);

/**
 * Query into comparable tokens.
 *
 * `normalizeForSearch` first, because this split on `[^a-z0-9']+` and every
 * accented letter is outside `a-z` — so it was a *separator*. On an English
 * catalogue that never showed; on a French one `académie` became
 * `['acad', 'mie']` and `élève` became noise. And nothing folded accents on
 * either side, so a French speaker typing `academie` without the accent — which
 * is what people do on a phone keyboard — matched nothing at all.
 *
 * `fieldsOf` folds the same way, so the two sides meet.
 */
export function tokenize(query: string): string[] {
  return normalizeForSearch(query)
    .split(/[^a-z0-9']+/)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

interface Field {
  readonly text: string;
  readonly weight: number;
}

function fieldsOf(story: StoryVersion): Field[] {
  // Folded, not merely lowercased — see `tokenize`.
  const fields: Field[] = [
    { text: normalizeForSearch(story.title), weight: WEIGHTS.title },
    { text: normalizeForSearch(story.hook), weight: WEIGHTS.hook },
    { text: normalizeForSearch(story.premise), weight: WEIGHTS.premise },
    { text: normalizeForSearch(story.creatorName), weight: WEIGHTS.creator },
  ];
  for (const tag of story.tags) fields.push({ text: normalizeForSearch(tag), weight: WEIGHTS.tag });
  for (const chip of story.mechanicsChips) fields.push({ text: normalizeForSearch(chip), weight: WEIGHTS.mechanic });
  for (const character of story.characters) {
    // The name and what they are to the player, so "coach" or "navigator"
    // finds the world that has one.
    fields.push({ text: normalizeForSearch(`${character.name} ${character.role}`), weight: WEIGHTS.character });
  }
  // The words the browse rail uses, plus their synonyms, so a query that would
  // pick a category picks the worlds in it. This is what makes "basketball"
  // reach a world whose premise never happens to use the word.
  for (const id of categoriesFor(story)) {
    const category = CATEGORIES.find((c) => c.id === id);
    if (category) {
      fields.push({ text: [category.label, ...category.keywords].join(' ').toLowerCase(), weight: WEIGHTS.category });
    }
  }
  return fields;
}

export interface SearchHit {
  readonly storyId: string;
  readonly score: number;
}

/**
 * Scored search over the catalog.
 *
 * Every token has to land somewhere (AND), because "magic school" returning
 * every world with magic in it is not a search result, it is a shrug. If
 * nothing satisfies all of them, it falls back to the best partial match
 * rather than an empty screen — a player who typed two words and got nothing
 * has no idea which word was the problem.
 */
export function searchCatalog(stories: readonly StoryVersion[], query: string): SearchHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return stories.map((s) => ({ storyId: s.storyId, score: 0 }));

  const scored = stories.map((story) => {
    const fields = fieldsOf(story);
    let score = 0;
    let matched = 0;

    for (const token of tokens) {
      let best = 0;
      for (const field of fields) {
        if (!field.text.includes(token)) continue;
        // A whole word beats a fragment, so "art" does not rank a world about
        // "Bartering" above one whose title is the word.
        const whole = new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(field.text);
        best = Math.max(best, whole ? field.weight : field.weight / 3);
      }
      if (best > 0) matched += 1;
      score += best;
    }

    return { storyId: story.storyId, score, matched };
  });

  const all = scored.filter((entry) => entry.matched === tokens.length && entry.score > 0);
  const partial = scored.filter((entry) => entry.matched > 0 && entry.score > 0);
  const chosen = all.length > 0 ? all : partial;

  return chosen.sort((a, b) => b.score - a.score).map(({ storyId, score }) => ({ storyId, score }));
}
