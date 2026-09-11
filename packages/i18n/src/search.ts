/**
 * Matching and sorting French text.
 *
 * The problem in one line: **a French user's data contains both `'` and `’`
 * for the same word, and Unicode normalisation will not fold them.** U+2019 has
 * no compatibility decomposition, so `"Aujourd’hui".includes("l'aube")` is
 * `false` and stays `false` after NFKC. French AZERTY types U+0027; iOS Smart
 * Punctuation — on by default — rewrites it to U+2019. Both forms will exist in
 * the same database.
 *
 * `œ` is the same shape of problem: it is a mandatory ligature (`cœur`, not
 * `coeur`), NFKD does not decompose it, and a French user who types `oeuvre`
 * must find `œuvre`.
 *
 * So: **author U+2019 and `œ`, and never match on them.** Normalise the needle
 * and the haystack with the same function.
 */

import { intlTag, type Locale } from './locale.js';

/**
 * U+2018, U+2019, U+02BC, U+02B9, U+2032, U+00B4, U+0060 — every apostrophe
 * lookalike a French keyboard, an iOS substitution or a paste can produce.
 */
const APOSTROPHE_LOOKALIKES = /[‘’ʼʹ′´`]/g;

/**
 * Fold a string to a form safe to match on.
 *
 * Order matters, and it is not the obvious order. **The apostrophes have to be
 * folded before NFKC, not after.** U+00B4 and U+0060 are *spacing* diacritics:
 * NFKC decomposes them into a space plus a combining mark, so a fold that runs
 * after normalisation sees a space where the apostrophe was and turns `l´ami`
 * into `l ami`. U+2019 has the opposite problem — no decomposition at all — so
 * it survives NFKC untouched and must be folded explicitly either way.
 *
 * After that: NFKC, which folds U+00A0/U+202F to a plain space and the
 * fullwidth forms to ASCII; a second apostrophe pass to catch anything that
 * produced; the ligatures, which no normalisation form decomposes; then NFD and
 * strip the combining marks, which is what removes the accents.
 *
 * Lossy by design — `à` and `a` become the same string. That is correct for
 * search and wrong for display, so never store the result.
 */
export function normalizeForSearch(text: string): string {
  return text
    .replace(APOSTROPHE_LOOKALIKES, "'")
    .normalize('NFKC')
    .replace(APOSTROPHE_LOOKALIKES, "'")
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'OE')
    .replace(/æ/g, 'ae')
    .replace(/Æ/g, 'AE')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

/** `includes`, but French. Normalises both sides, which `String.includes` cannot. */
export function includesNormalized(haystack: string, needle: string): boolean {
  if (needle.length === 0) return true;
  return normalizeForSearch(haystack).includes(normalizeForSearch(needle));
}

/** `startsWith`, normalised on both sides. */
export function startsWithNormalized(haystack: string, needle: string): boolean {
  if (needle.length === 0) return true;
  return normalizeForSearch(haystack).startsWith(normalizeForSearch(needle));
}

/** Equality after folding: `l'ami` and `l’ami` and `L’AMI` are the same word. */
export function equalsNormalized(a: string, b: string): boolean {
  return normalizeForSearch(a) === normalizeForSearch(b);
}

/* -------------------------------------------------------------------------- */
/* Collation                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * `Intl.Collator` is the one piece of `Intl` `@formatjs` does not polyfill, so
 * unlike everything else in this package its behaviour is the host engine's.
 * On Node it folds both the accents and the apostrophes at `sensitivity: 'base'`;
 * on a Hermes build without full ICU it may do neither, or may not exist.
 *
 * So the collator is probed once against the two cases that matter and, if it
 * fails either, sorting falls back to comparing `normalizeForSearch` output —
 * which is not linguistically perfect but is at least the same on every device.
 */
function buildCollator(locale: Locale): Intl.Collator | null {
  try {
    return new Intl.Collator(intlTag(locale), { sensitivity: 'base', numeric: true });
  } catch {
    return null;
  }
}

function isTrustworthy(collator: Intl.Collator | null): collator is Intl.Collator {
  if (!collator) return false;
  try {
    return collator.compare("l'ami", 'l’ami') === 0 && collator.compare('e', 'é') === 0;
  } catch {
    return false;
  }
}

const collators = new Map<Locale, Intl.Collator | null>();

function collatorFor(locale: Locale): Intl.Collator | null {
  if (!collators.has(locale)) {
    const built = buildCollator(locale);
    collators.set(locale, isTrustworthy(built) ? built : null);
  }
  return collators.get(locale) ?? null;
}

/**
 * The French collator, at base sensitivity — the one to sort every French list
 * with. `null` on an engine whose collator cannot be trusted; use `compareText`
 * rather than reaching for this directly.
 */
export function frCollator(): Intl.Collator | null {
  return collatorFor('fr');
}

/**
 * Compare two display strings for sorting. Locale-aware where the engine
 * allows it, deterministic everywhere.
 *
 * Use this instead of `String.prototype.localeCompare`, which takes the
 * runtime's default locale — a value nobody in this codebase has chosen.
 */
export function compareText(a: string, b: string, locale: Locale): number {
  const collator = collatorFor(locale);
  if (collator) return collator.compare(a, b);
  const na = normalizeForSearch(a);
  const nb = normalizeForSearch(b);
  return na < nb ? -1 : na > nb ? 1 : 0;
}

/** A comparator to hand to `Array.prototype.sort`. */
export function textComparator(locale: Locale): (a: string, b: string) => number {
  return (a, b) => compareText(a, b, locale);
}

/**
 * True when the string contains a straight apostrophe between two letters —
 * `l'ami` rather than `l’ami`.
 *
 * This is a **display** fault, not a matching one: matching is handled above.
 * `fr-lint` uses it on the catalogue, and it must never be run against user
 * input, where U+0027 is exactly what an AZERTY keyboard produces.
 */
export function hasStraightApostrophe(text: string): boolean {
  return /\p{L}'\p{L}/u.test(text);
}
