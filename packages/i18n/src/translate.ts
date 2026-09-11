import i18next, { type i18n as I18nInstance } from 'i18next';
import ICU from 'i18next-icu';

import { en, type TranslationKey } from './catalog/en/index.js';
import { fr } from './catalog/fr/index.js';
import { DEFAULT_LOCALE, intlTag, LOCALES, type Locale } from './locale.js';
import { foldNarrowSpaces } from './typography.js';

/**
 * One i18next instance, usable from both sides of the wire.
 *
 * The server needs the catalogue as much as the client does: it renders memory
 * facts into a French model context (§5), and the client renders the keys the
 * server sends for rail titles and clocks (§4). Two engines would be two
 * behaviours, so there is one, and `react-i18next` is only a binding over it.
 *
 * ICU MessageFormat rather than i18next's suffix plurals, because French needs
 * `select` as well as `plural` — the player-gender agreement in step 6 is a
 * `select`, not a count — and because ICU is what the catalogue is authored in.
 */

const RESOURCES = {
  en: { translation: en as Record<string, string> },
  fr: { translation: fr as Record<string, string> },
} as const;

let instance: I18nInstance | null = null;

/**
 * The shared instance, created on first use.
 *
 * `keySeparator` and `nsSeparator` are both off. Keys are flat and dotted —
 * `wallet.restore` is one key, not a path — so that a key in a screen and a key
 * in the catalogue are the same string and each can be grepped from the other.
 */
export function i18n(): I18nInstance {
  if (instance) return instance;

  const created = i18next.createInstance();
  created.use(ICU).init({
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...LOCALES],
    resources: RESOURCES,
    keySeparator: false,
    nsSeparator: false,
    // A missing French key must render the English string rather than the key
    // itself. The catalogue is populated over several steps and a screen full
    // of `wallet.restore` is not a useful intermediate state.
    returnEmptyString: false,
    interpolation: { escapeValue: false },
    // `Intl.PluralRules` and `Intl.NumberFormat` are already polyfilled and
    // pinned; pointing ICU at the same tags keeps one CLDR in play.
    i18nFormat: { localeData: LOCALES.map(intlTag) },
  });

  instance = created;
  return created;
}

export interface TranslateOptions {
  /** ICU arguments — `{count}`, `{name}`, and the rest. */
  readonly [key: string]: unknown;
}

/**
 * Translate one key into one locale.
 *
 * Takes the locale explicitly. There is no ambient "current language": the
 * server renders for whichever session is asking, the client renders for
 * whichever session is open, and a module-level default is how those two get
 * out of step.
 *
 * Output is passed through `foldNarrowSpaces`, so a French message that
 * interpolates a formatted number cannot ship U+202F to a body font that has no
 * glyph for it.
 */
export function translate(
  locale: Locale,
  key: TranslationKey,
  options?: TranslateOptions,
): string {
  const value = i18n().getFixedT(locale)(key, options as never) as unknown;
  return foldNarrowSpaces(typeof value === 'string' ? value : String(value));
}

/** A translator bound to one locale — what a screen or a request handler holds. */
export type Translator = (key: TranslationKey, options?: TranslateOptions) => string;

export function translatorFor(locale: Locale): Translator {
  return (key, options) => translate(locale, key, options);
}

/**
 * The word for a browse category, given the id the server files it under.
 *
 * The server owns which categories exist; this owns what they are called. An id
 * with no key yet falls back to the label the server sent, so adding a category
 * to `CATEGORIES` cannot make a chip render as `category.whatever` — it renders
 * in English until somebody adds the row, which is a coverage gap and not a
 * broken screen.
 */
export function categoryLabel(locale: Locale, id: string, fallback: string): string {
  const key = `category.${id}`;
  if (!(key in en)) return fallback;
  return translate(locale, key as TranslationKey);
}
