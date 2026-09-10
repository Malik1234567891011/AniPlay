/**
 * The locale set, and the resolution chain.
 *
 * Two locales exist, and both are permanent and first class. `en` is never
 * replaced, degraded or routed through the French path; `fr` is added beside
 * it. Anything that reads `Locale` must handle both and must not treat `en` as
 * "the absence of a locale".
 *
 * See `docs/localization/fr-FR/LOCALIZATION_ARCHITECTURE.md` §1.
 */

export const LOCALES = ['en', 'fr'] as const;

export type Locale = (typeof LOCALES)[number];

/** The locale a session gets when nothing else answers. */
export const DEFAULT_LOCALE: Locale = 'en';

/** BCP-47 tags the app claims support for, most specific first. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-FR',
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * Reduce one BCP-47-ish tag to a supported locale, or `null`.
 *
 * Accepts `fr`, `fr-FR`, `fr_FR`, `FR-fr`, and the `Accept-Language` shape
 * `fr-FR,fr;q=0.9`. Only the primary language subtag decides: `fr-CA` resolves
 * to `fr` because a Canadian device asking for French should get French rather
 * than English, even though the copy is metropolitan. Region-specific variants
 * are a later problem and are deliberately not modelled here.
 */
export function matchLocale(tag: string | null | undefined): Locale | null {
  if (typeof tag !== 'string') return null;
  const primary = tag.trim().split(/[;,]/)[0]?.trim().replace(/_/g, '-').split('-')[0]?.toLowerCase();
  if (!primary) return null;
  return isLocale(primary) ? primary : null;
}

/**
 * The resolution chain, in priority order:
 *
 * 1. explicit user choice   2. session locale (frozen)   3. device locale   4. `en`
 *
 * Pass the candidates in that order. The first one that names a supported
 * locale wins; everything else is ignored. `Accept-Language` header values may
 * be passed directly — each comma-separated entry is tried in turn.
 */
export function resolveLocale(
  ...candidates: readonly (string | null | undefined)[]
): Locale {
  for (const candidate of candidates) {
    if (typeof candidate !== 'string') continue;
    for (const entry of candidate.split(',')) {
      const matched = matchLocale(entry);
      if (matched) return matched;
    }
  }
  return DEFAULT_LOCALE;
}

/** The full BCP-47 tag to hand to `Intl`. Never pass a bare `Locale` to `Intl`. */
export function intlTag(locale: Locale): string {
  return LOCALE_TAGS[locale];
}

/**
 * Whether a player who has never chosen a language may be moved off English by
 * their device settings alone.
 *
 * **`false` until the French catalogue is populated.** The plumbing for device
 * detection is complete and tested; what is not complete is the French copy
 * behind it, and silently giving a French-phone owner a half-translated app is
 * worse than giving them the English one they already had. Until then French is
 * reachable only by an explicit choice.
 *
 * Flipping this to `true` is the single line that turns France on. It belongs
 * at step 7 of the Phase 2 sequence, once `npm run fr:lint` is clean over a
 * complete catalogue — not before.
 */
export const DEVICE_LOCALE_AUTODETECT = false;

/**
 * Resolve a locale from the device, honouring `DEVICE_LOCALE_AUTODETECT`.
 *
 * Separate from `resolveLocale` on purpose: an *explicit* choice is always
 * honoured, and only the automatic path is gated.
 */
export function resolveDeviceLocale(
  ...candidates: readonly (string | null | undefined)[]
): Locale {
  if (!DEVICE_LOCALE_AUTODETECT) return DEFAULT_LOCALE;
  return resolveLocale(...candidates);
}
