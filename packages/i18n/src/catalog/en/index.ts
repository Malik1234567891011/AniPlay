import { library } from './library.js';
import { nav } from './nav.js';
import { profile } from './profile.js';

/**
 * The English catalogue — and the definition of what a key is.
 *
 * Every value is the **exact string the app shipped before it was keyed**.
 * English is a permanent, first-class locale: keying it must be invisible, and
 * a "small improvement" made while moving a string into this file is an English
 * regression wearing a refactor. `catalog.spec.ts` asserts the round trip.
 *
 * Split by area rather than kept in one file, for two reasons. Keys are already
 * namespaced (`wallet.*`, `session.*`), so the split follows the names; and it
 * means two people can key two screens without editing the same file.
 *
 * Keys are flat and dotted, and `keySeparator` is off, so `wallet.restore` is
 * one key rather than a path into a nested object. Flat keys grep, and a
 * `t('wallet.restore')` in a screen can be found from here and back again.
 *
 * Plurals are ICU, never `n === 1`. The reason is in `format.ts`: **zero is
 * singular in French**, so `0 partie` — a catalogue that branches on
 * `count === 1` is wrong in French even after every word in it is translated.
 * French also has a `many` category English does not.
 *
 * Ambiguous keys carry a localizer comment. The test: if a competent translator
 * with no access to the app could pick the wrong word, it needs one. `Save` is
 * the canonical case — save-to-library, not rescue-a-person, and French
 * distinguishes them (`Enregistrer`, never `Sauver`).
 */
export const en = {
  ...nav,
  ...profile,
  ...library,
} as const;

/**
 * Every key the app may ask for.
 *
 * Derived from the English catalogue rather than declared separately, so a
 * misspelled key is a compile error and a key nobody uses is visible.
 */
export type TranslationKey = keyof typeof en;

export const TRANSLATION_KEYS = Object.keys(en) as readonly TranslationKey[];
