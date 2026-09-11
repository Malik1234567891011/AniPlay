/**
 * The browse categories, as words rather than as ids.
 *
 * `CATEGORIES` in `services/api/src/catalog-taxonomy.ts` is the authority on
 * which categories exist, what they are called in code, and which author tags
 * file a world into them. What it must not be the authority on is what the chip
 * *says*, because it shipped an English `label` that the client rendered
 * verbatim — so the French app offered "Mystery", "School", "Adventure" and
 * "Drama" on its first screen and again on Discover.
 *
 * The ids travel; the words are looked up here. A category the server adds and
 * this file has not caught up with falls back to the server's own label, which
 * is English but is at least a word.
 */
export const category = {
  'category.action': 'Action',
  'category.romance': 'Romance',
  'category.fantasy': 'Fantasy',
  'category.sports': 'Sports',
  'category.mystery': 'Mystery',
  'category.school': 'School',
  'category.adventure': 'Adventure',
  'category.horror': 'Horror',
  'category.drama': 'Drama',
} as const;
