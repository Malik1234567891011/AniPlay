/**
 * Pin one CLDR version across every engine the app runs on.
 *
 * **Import this as the first line of the app entry point**, before anything
 * that touches `Intl`, and as a vitest `setupFile` in any package whose tests
 * assert formatted output.
 *
 * Why it is not optional, measured in Phase 1
 * (`docs/localization/fr-FR/research/typography.md`):
 *
 * - Hermes on iOS does not implement `Intl.NumberFormat.prototype.formatToParts`
 *   at all, and does not support `notation: 'compact'` or `signDisplay`. The
 *   same code works on Android and silently produces the wrong thing on iOS.
 * - Hermes on Android bridges to whatever ICU that OS release shipped. CLDR 34
 *   changed the French group separator from U+00A0 to U+202F, so two devices
 *   render the same number differently.
 * - `dateStyle: 'medium', timeStyle: 'short'` gives Node/ICU 78
 *   `9 sept. 2025, 20:05` and JavaScriptCore `9 sept. 2025 à 20:05`.
 *
 * So the polyfills are installed with `polyfill-force`, unconditionally, even
 * where the engine already has a working `Intl`. A conditional install would
 * reintroduce exactly the divergence this module exists to remove, and would
 * make snapshot tests pass on the machine that wrote them and nowhere else.
 *
 * `Intl.Collator` has no `@formatjs` polyfill. `search.ts` handles that by
 * probing the engine's collator once and falling back to a deterministic
 * comparison when it misbehaves.
 */

// Must be first: reads the platform time zone before it is replaced.
import { NATIVE_TIME_ZONE } from './native-timezone.js';

import '@formatjs/intl-getcanonicallocales/polyfill-force.js';
import '@formatjs/intl-locale/polyfill-force.js';

import '@formatjs/intl-pluralrules/polyfill-force.js';
import '@formatjs/intl-pluralrules/locale-data/en.js';
import '@formatjs/intl-pluralrules/locale-data/fr.js';

import '@formatjs/intl-numberformat/polyfill-force.js';
import '@formatjs/intl-numberformat/locale-data/en.js';
import '@formatjs/intl-numberformat/locale-data/fr.js';

import '@formatjs/intl-datetimeformat/polyfill-force.js';
// Every IANA zone. `add-golden-tz` is roughly half the size but throws a
// RangeError on a zone it does not carry, and a crash on a date label is a
// worse trade than the bytes.
import '@formatjs/intl-datetimeformat/add-all-tz.js';
import '@formatjs/intl-datetimeformat/locale-data/en.js';
import '@formatjs/intl-datetimeformat/locale-data/fr.js';

import '@formatjs/intl-listformat/polyfill-force.js';
import '@formatjs/intl-listformat/locale-data/en.js';
import '@formatjs/intl-listformat/locale-data/fr.js';

interface TimeZoneAwareDateTimeFormat {
  __setDefaultTimeZone?: (timeZone: string) => void;
}

/**
 * Point the polyfilled `Intl.DateTimeFormat` at the device's zone.
 *
 * Exported so the app entry can re-apply it from `expo-localization`, which
 * knows the calendar time zone even where the engine's `Intl` did not.
 */
export function setDefaultTimeZone(timeZone: string): void {
  const dtf = Intl.DateTimeFormat as unknown as TimeZoneAwareDateTimeFormat;
  try {
    dtf.__setDefaultTimeZone?.(timeZone);
  } catch {
    try {
      dtf.__setDefaultTimeZone?.('UTC');
    } catch {
      // Nothing else to do; the polyfill keeps its own default.
    }
  }
}

setDefaultTimeZone(NATIVE_TIME_ZONE);

export { NATIVE_TIME_ZONE };
