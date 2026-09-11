import { getCalendars, getLocales } from 'expo-localization';
import { DEFAULT_LOCALE, resolveDeviceLocale, type Locale } from '@aniplay/i18n';
// From the polyfill entry, not the index: the index is deliberately free of
// side effects, and the time zone belongs to the thing that replaced `Intl`.
// The module is already loaded by `index.ts`, so this is a cache hit.
import { setDefaultTimeZone } from '@aniplay/i18n/polyfill';

/**
 * What the phone says, and what the app does with it.
 *
 * `expo-localization` is the only place the device's own settings are read.
 * Everything downstream takes an explicit `Locale`, so there is no ambient
 * "current language" for a screen to disagree with.
 */

/**
 * The device's preferred language, as one of ours.
 *
 * Returns `en` while `DEVICE_LOCALE_AUTODETECT` is off — the detection is
 * plumbed and tested, but a French-phone owner is not handed a half-built
 * French app on the strength of their OS settings. See `@aniplay/i18n`.
 */
export function deviceLocale(): Locale {
  try {
    return resolveDeviceLocale(...getLocales().map((entry) => entry.languageTag));
  } catch {
    // A build without the native module, or a locale list the OS refused.
    return DEFAULT_LOCALE;
  }
}

/**
 * Every language tag the device lists, most preferred first, regardless of
 * whether the app supports it. Diagnostics only — never a locale decision.
 */
export function deviceLanguageTags(): readonly string[] {
  try {
    return getLocales().map((entry) => entry.languageTag);
  } catch {
    return [];
  }
}

/**
 * Point the polyfilled `Intl.DateTimeFormat` at the device's calendar zone.
 *
 * The polyfill reads the engine's own zone at import time, which is right on
 * every build that has a working native `Intl` — but Hermes without full ICU
 * reports nothing, and the polyfill then defaults to UTC and shows dates a day
 * out. `expo-localization` knows the zone in both cases, so this runs once at
 * startup to correct it.
 */
export function applyDeviceTimeZone(): void {
  try {
    const timeZone = getCalendars()[0]?.timeZone;
    if (timeZone) setDefaultTimeZone(timeZone);
  } catch {
    // Keep whatever the polyfill resolved at import time.
  }
}
