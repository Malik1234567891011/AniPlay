/**
 * The formatting gate, in a form that can run anywhere.
 *
 * Step 1's gate is "formatting snapshot tests pass on iOS **and** Android", and
 * a vitest file cannot satisfy that on its own — it runs on Node, against
 * Node's ICU, on a laptop. What makes the claim true is that
 * `@plotbreak/i18n/polyfill` replaces the engine's `Intl` with the same
 * JavaScript implementation and the same CLDR data on every platform.
 *
 * This module is how that gets checked rather than asserted. It is a plain
 * array of expectations with no test framework in it, so the same list runs
 * from `format.spec.ts` in CI and from a device build — Hermes on iOS, where
 * `formatToParts` does not exist natively, and Hermes on Android, where the
 * group separator depends on the OS release.
 *
 * Every expected value is written as escaped codepoints. A separator that is
 * "obviously a space" is exactly the bug this file exists to catch.
 */

import { formatCompact, formatCurrency, formatDate, formatList, formatNumber, formatOrdinal, formatPercent, pluralCategory } from './format.js';
import { normalizeForSearch } from './search.js';

export interface ConformanceResult {
  readonly name: string;
  readonly expected: string;
  readonly actual: string;
  readonly ok: boolean;
}

const FIRST_OF_JANUARY = new Date(Date.UTC(2026, 0, 1, 12, 0, 0));
const NINTH_OF_SEPTEMBER = new Date(Date.UTC(2025, 8, 9, 18, 5, 0));

/** `[name, expected, produce]` — expected values use `\u` escapes deliberately. */
const CASES: readonly (readonly [string, string, () => string])[] = [
  // The polyfill itself. If these two fail, nothing below means anything.
  ['polyfill/NumberFormat', 'true', () => String((Intl.NumberFormat as { polyfilled?: boolean }).polyfilled === true)],
  ['polyfill/DateTimeFormat', 'true', () => String((Intl.DateTimeFormat as { polyfilled?: boolean }).polyfilled === true)],
  ['polyfill/formatToParts', '3', () => String(new Intl.NumberFormat('fr-FR').formatToParts(1234).length)],

  // Numbers — the U+202F/U+00A0 story.
  ['fr/number/grouped', '1 234 567', () => formatNumber(1_234_567, 'fr')],
  ['fr/number/exact', '1 234 567', () => formatNumber(1_234_567, 'fr', { exactSpaces: true })],
  ['fr/number/decimal', '1 234,5', () => formatNumber(1234.5, 'fr')],
  ['fr/percent', '50 %', () => formatPercent(0.5, 'fr')],
  ['fr/currency/eur', '1 234,50 €', () => formatCurrency(1234.5, 'EUR', 'fr')],
  ['fr/compact', '12 k', () => formatCompact(12_000, 'fr')],
  ['en/number/grouped', '1,234,567', () => formatNumber(1_234_567, 'en')],
  ['en/percent', '50%', () => formatPercent(0.5, 'en')],
  ['en/currency/usd', '$1,234.50', () => formatCurrency(1234.5, 'USD', 'en')],
  ['en/compact', '12K', () => formatCompact(12_000, 'en')],

  // Plurals — zero is singular in French.
  ['fr/plural/0', 'one', () => pluralCategory(0, 'fr')],
  ['fr/plural/1', 'one', () => pluralCategory(1, 'fr')],
  ['fr/plural/2', 'other', () => pluralCategory(2, 'fr')],
  ['fr/plural/1e6', 'many', () => pluralCategory(1_000_000, 'fr')],
  ['en/plural/0', 'other', () => pluralCategory(0, 'en')],

  // Ordinals — the feminine no formatter produces.
  ['fr/ordinal/1m', '1er', () => formatOrdinal(1, 'fr')],
  ['fr/ordinal/1f', '1re', () => formatOrdinal(1, 'fr', 'feminine')],
  ['fr/ordinal/2', '2e', () => formatOrdinal(2, 'fr')],
  ['en/ordinal/1', '1st', () => formatOrdinal(1, 'en')],
  ['en/ordinal/3', '3rd', () => formatOrdinal(3, 'en')],

  // Dates — the 1er rule no formatter applies.
  ['fr/date/first', '1er janvier 2026', () => formatDate(FIRST_OF_JANUARY, 'fr', 'long')],
  ['fr/date/ninth', '9 septembre 2025', () => formatDate(NINTH_OF_SEPTEMBER, 'fr', 'long')],
  ['fr/date/short', '01/01/2026', () => formatDate(FIRST_OF_JANUARY, 'fr', 'short')],
  ['en/date/long', 'January 1, 2026', () => formatDate(FIRST_OF_JANUARY, 'en', 'long')],

  // Lists — no Oxford comma in French.
  ['fr/list', 'un, deux et trois', () => formatList(['un', 'deux', 'trois'], 'fr')],
  ['en/list', 'one, two, and three', () => formatList(['one', 'two', 'three'], 'en')],

  // Search folding — engine-independent by construction, checked anyway
  // because `\p{Diacritic}` depends on the regex engine's Unicode tables.
  ['fold/apostrophe', "l'ami", () => normalizeForSearch('l’ami')],
  ['fold/ligature', 'coeur', () => normalizeForSearch('cœur')],
  ['fold/accents', 'a suivre', () => normalizeForSearch('À SUIVRE')],
];

/**
 * Run every expectation and report what happened. Never throws — a device
 * harness wants the whole list, not the first failure.
 */
export function runFormattingConformance(): readonly ConformanceResult[] {
  return CASES.map(([name, expected, produce]) => {
    let actual: string;
    try {
      actual = produce();
    } catch (error) {
      actual = `threw: ${error instanceof Error ? error.message : String(error)}`;
    }
    return { name, expected, actual, ok: actual === expected };
  });
}

/** Codepoint-annotated rendering, so a failing space is legible in a log. */
export function describeConformance(results: readonly ConformanceResult[]): string {
  const show = (text: string) =>
    [...text]
      .map((c) => {
        const cp = c.codePointAt(0) ?? 0;
        return cp > 126 ? `U+${cp.toString(16).toUpperCase().padStart(4, '0')}` : c;
      })
      .join('');
  const failures = results.filter((r) => !r.ok);
  const header = `${results.length - failures.length}/${results.length} formatting expectations met`;
  if (failures.length === 0) return header;
  return [
    header,
    ...failures.map((f) => `  ✗ ${f.name}\n      expected ${show(f.expected)}\n      actual   ${show(f.actual)}`),
  ].join('\n');
}
