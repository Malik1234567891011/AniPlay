/**
 * Locale-aware formatting, deterministic across engines.
 *
 * Every function here takes an explicit `Locale`. There is no "current locale"
 * global, because the server renders for whichever session is asking and the
 * client renders for whichever session is open, and a module-level default is
 * how those two get out of step.
 *
 * All of it assumes `@aniplay/i18n/polyfill` has been imported. Without it the
 * output is whatever the host engine happens to do, which on Hermes/iOS
 * includes throwing on `formatToParts` and ignoring `notation: 'compact'`.
 */

import { intlTag, type Locale } from './locale.js';
import { foldNarrowSpaces } from './typography.js';

/* -------------------------------------------------------------------------- */
/* Numbers                                                                    */
/* -------------------------------------------------------------------------- */

export interface NumberOptions {
  readonly minimumFractionDigits?: number;
  readonly maximumFractionDigits?: number;
  /** `10 k`, `1 M`. French compact is lowercase `k` with a space; English is `10K`. */
  readonly compact?: boolean;
  /**
   * Keep CLDR's exact separators instead of folding U+202F to U+00A0.
   * Only for values that are about to be compared or written to a file, never
   * for values about to be displayed. See `typography.ts`.
   */
  readonly exactSpaces?: boolean;
}

function numberFormat(locale: Locale, options: NumberOptions): Intl.NumberFormat {
  const intlOptions: Intl.NumberFormatOptions = {};
  if (options.minimumFractionDigits !== undefined) {
    intlOptions.minimumFractionDigits = options.minimumFractionDigits;
  }
  if (options.maximumFractionDigits !== undefined) {
    intlOptions.maximumFractionDigits = options.maximumFractionDigits;
  }
  if (options.compact) {
    intlOptions.notation = 'compact';
    intlOptions.compactDisplay = 'short';
  }
  return new Intl.NumberFormat(intlTag(locale), intlOptions);
}

function forDisplay(text: string, options: NumberOptions): string {
  return options.exactSpaces ? text : foldNarrowSpaces(text);
}

/**
 * `1 234 567,5` in French (U+00A0 groups after folding), `1,234,567.5` in
 * English.
 *
 * Never round-trip the result. `Number("1 234,50")` is `NaN` and
 * `parseFloat("1 234,50")` is `1` — silently, which is worse.
 */
export function formatNumber(value: number, locale: Locale, options: NumberOptions = {}): string {
  return forDisplay(numberFormat(locale, options).format(value), options);
}

/** `12 k` / `12K`. Replaces hand-rolled `K`/`M` suffixes, which cannot be localized. */
export function formatCompact(value: number, locale: Locale): string {
  return formatNumber(value, locale, { compact: true, maximumFractionDigits: 1 });
}

/**
 * `50 %` in French — with U+00A0, which is a genuine divergence from English's
 * `50%`. Takes a ratio, not a percentage: `0.5`, not `50`.
 */
export function formatPercent(ratio: number, locale: Locale, options: NumberOptions = {}): string {
  const intlOptions: Intl.NumberFormatOptions = { style: 'percent' };
  if (options.maximumFractionDigits !== undefined) {
    intlOptions.maximumFractionDigits = options.maximumFractionDigits;
  }
  return forDisplay(new Intl.NumberFormat(intlTag(locale), intlOptions).format(ratio), options);
}

/**
 * `1 234,50 €` — symbol trailing, decimal comma, U+00A0 before the symbol.
 *
 * ⚠️ **Not for in-app-purchase prices.** StoreKit's own localized string
 * (`Product.displayPrice`) is the only correct source for those; a hand-rolled
 * price differs from what App Store Connect and the receipt show, which is an
 * App Review risk. Use this for ledger amounts and reference prices that are
 * labelled as indicative.
 */
export function formatCurrency(
  value: number,
  currency: string,
  locale: Locale,
  options: NumberOptions = {},
): string {
  return forDisplay(
    new Intl.NumberFormat(intlTag(locale), { style: 'currency', currency }).format(value),
    options,
  );
}

/* -------------------------------------------------------------------------- */
/* Ordinals                                                                   */
/* -------------------------------------------------------------------------- */

export type GrammaticalNumberGender = 'masculine' | 'feminine';

const EN_ORDINAL_SUFFIX: Record<Intl.LDMLPluralRule, string> = {
  zero: 'th',
  one: 'st',
  two: 'nd',
  few: 'rd',
  many: 'th',
  other: 'th',
};

/**
 * `1er` / `1re` / `2e` in French; `1st` / `2nd` / `3rd` in English.
 *
 * `Intl.PluralRules` with `type: 'ordinal'` gets English right and gets the
 * French masculine right, but it **cannot produce the feminine `1re`** — plural
 * category and grammatical gender are different axes and only one of them is
 * modelled. So French is written out here.
 *
 * Note `1re`, not `1ère`, and `2e`, not `2ème`. Both of the long forms are
 * common and both are wrong.
 */
export function formatOrdinal(
  value: number,
  locale: Locale,
  gender: GrammaticalNumberGender = 'masculine',
): string {
  if (locale === 'fr') {
    if (value === 1) return gender === 'feminine' ? '1re' : '1er';
    return `${formatNumber(value, locale)}e`;
  }
  const category = new Intl.PluralRules(intlTag(locale), { type: 'ordinal' }).select(value);
  return `${formatNumber(value, locale)}${EN_ORDINAL_SUFFIX[category]}`;
}

/* -------------------------------------------------------------------------- */
/* Dates                                                                      */
/* -------------------------------------------------------------------------- */

export type DateStyle = 'short' | 'medium' | 'long';

/**
 * A real calendar date — "started 12 mars 2026", not the in-fiction clock.
 * World time is minute arithmetic and is formatted by the engine; see
 * `@aniplay/engine`'s clock.
 *
 * French is day → month → year, months lowercase, no comma before the year,
 * and **`1er` for the first of the month**. Neither CLDR/ICU nor Apple applies
 * the `1er` rule: `dateStyle: 'long'` for 1 January 2026 returns
 * `1 janvier 2026`, which is wrong. That patch is what `frDate` is for, and it
 * is why date formatting is not left to call sites.
 */
export function formatDate(date: Date, locale: Locale, style: DateStyle = 'long'): string {
  const text = new Intl.DateTimeFormat(intlTag(locale), { dateStyle: style }).format(date);
  if (locale !== 'fr') return text;
  // `short` is numeric (`01/01/2026`) and takes no ordinal.
  if (style === 'short') return text;
  return applyFrenchFirstOfMonth(text, date);
}

/** `1 janvier 2026` → `1er janvier 2026`. Leaves every other day untouched. */
export function applyFrenchFirstOfMonth(text: string, date: Date): string {
  if (date.getDate() !== 1) return text;
  return text.replace(/^1(?!\d)/, '1er');
}

/**
 * The French long date, with the `1er` rule applied. Named as the research
 * names it so the two are findable from each other.
 */
export function frDate(date: Date): string {
  return formatDate(date, 'fr', 'long');
}

/**
 * `16:15`. France runs on the 24-hour clock; English on 12-hour with AM/PM.
 *
 * Built from `hour`/`minute` components rather than `timeStyle`, because
 * `timeStyle` is where the engines disagree — Node/ICU 78 joins date and time
 * with `,` and JavaScriptCore joins them with ` à `. Formatting the two halves
 * separately removes the join entirely.
 */
export function formatTimeOfDay(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(intlTag(locale), {
    hour: locale === 'fr' ? '2-digit' : 'numeric',
    minute: '2-digit',
    hourCycle: locale === 'fr' ? 'h23' : 'h12',
  }).format(date);
}

/* -------------------------------------------------------------------------- */
/* Lists                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * `un, deux et trois` — **no Oxford comma in French**, and `et` rather than a
 * trailing comma. `Intl.ListFormat` knows this; hand-joining with `', '` does
 * not.
 */
export function formatList(
  items: readonly string[],
  locale: Locale,
  type: 'conjunction' | 'disjunction' = 'conjunction',
): string {
  return new Intl.ListFormat(intlTag(locale), { style: 'long', type }).format(items);
}

/* -------------------------------------------------------------------------- */
/* Plural category                                                            */
/* -------------------------------------------------------------------------- */

/**
 * The CLDR plural category for a count.
 *
 * The trap this exists to make visible: **`0` is `one` in French.** So
 * `0 chapitre`, singular, where English says `0 chapters`. Any catalogue ported
 * from English by copying the `one`/`other` pairs gets zero wrong in every
 * counted string in the app. French also has a `many` category (millions,
 * compact forms) that English does not.
 *
 * Prefer an ICU `{count, plural, ...}` message over calling this directly; this
 * is here for the places that must branch in code, and for the tests that pin
 * the behaviour.
 */
export function pluralCategory(count: number, locale: Locale): Intl.LDMLPluralRule {
  return new Intl.PluralRules(intlTag(locale)).select(count);
}
