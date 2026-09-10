/**
 * What to call somebody in one word.
 *
 * Ten places shortened a name by taking the first word of it, which is right
 * for "Dai Okonkwo" and wrong for every character whose name carries a title.
 * Blackwake's Captain Veyra Sol was "Captain" in the state-delta chips
 * ("Captain is afraid of you"), in the suggested actions ("Take the deck —
 * Captain"), and in the writer's witness lines. Last Five's Coach Torakawa was
 * "Coach". Two captains in one scene were both "Captain".
 *
 * It is also a matching bug and not only a display one: the parser and the
 * entity resolver index characters by that same first word, so a player typing
 * "Veyra" — the name the prose itself uses — was resolving to nobody.
 */

/**
 * Titles that are not a name.
 *
 * Deliberately short and English-only. A world may legitimately name somebody
 * "The Quiet One", where the whole string is the name, so anything that would
 * consume every word falls back to the full name rather than to nothing.
 */
const TITLES = new Set([
  'captain', 'coach', 'commander', 'drillmaster', 'sergeant', 'lieutenant',
  'admiral', 'doctor', 'dr', 'professor', 'prof', 'master', 'mistress',
  'mr', 'mrs', 'ms', 'miss', 'sir', 'madam', 'dame', 'lord', 'lady',
  'father', 'mother', 'sister', 'brother', 'elder', 'saint', 'the',
]);

const strip = (word: string): string => word.toLowerCase().replace(/[.,]$/, '');

/**
 * The name a person is actually called: "Veyra", "Torakawa", "Dai".
 *
 * The first word that is not a title, and the whole name when every word is
 * one — "The Quiet One" is a name, not a rank and two words.
 */
export function shortName(fullName: string): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return fullName;
  return words.find((word) => !TITLES.has(strip(word))) ?? words[0]!;
}

/**
 * Every word a player or a beat might use to mean this person.
 *
 * Includes the full name, so "Captain Veyra Sol" matches as written, and each
 * word of it long enough to be distinctive. Titles are included too — calling
 * somebody "Captain" is a real thing players do — and it is the caller's job to
 * drop a key two characters share.
 */
export function nameKeys(fullName: string): string[] {
  const keys = [fullName, ...fullName.trim().split(/\s+/)]
    .map((part) => strip(part))
    .filter((part) => part.length >= 3);
  return [...new Set(keys)];
}
