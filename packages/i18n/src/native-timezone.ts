/**
 * Read the engine's own time zone *before* the polyfill replaces
 * `Intl.DateTimeFormat`.
 *
 * This module exists only so that the read happens first. ESM evaluates
 * imports in source order, and `polyfill.ts` imports this before it imports
 * anything from `@formatjs`, so the value here is the platform's answer and
 * not the polyfill's default of UTC.
 */

function detect(): string {
  try {
    const tz = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (typeof tz === 'string' && tz.length > 0) return tz;
  } catch {
    // Hermes without ICU. Fall through.
  }
  return 'UTC';
}

export const NATIVE_TIME_ZONE: string = detect();
