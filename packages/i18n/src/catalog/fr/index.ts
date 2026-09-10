import type { TranslationKey } from '../en/index.js';
import { profile } from './profile.js';

/**
 * The French catalogue.
 *
 * **Partial on purpose.** Step 3 of the Phase 2 sequence introduces the keys
 * and leaves English rendering identically; step 7 populates this file from
 * `UI_AUDIT.md` and `PRODUCT_VOICE.md`. A key missing here falls back to
 * English at runtime, which is the correct behaviour for a half-built
 * catalogue and is why `DEVICE_LOCALE_AUTODETECT` is still off.
 *
 * Two rules that are easy to get wrong and are checked by `catalog.spec.ts`:
 *
 * - **Zero is singular in French.** `{count, plural, one {…} other {…}}` covers
 *   0 *and* 1 with `one`. A pair copied across from English gets every counted
 *   string in the app wrong at zero.
 * - **U+2019, never U+0027.** `Qu’est-ce`, not `Qu'est-ce`. Matching is handled
 *   by `normalizeForSearch`; this file is display text.
 *
 * And the house rules from `PRODUCT_VOICE.md`: the product speaks **tu**,
 * always; headings and buttons are **sentence case**, never French Title Case.
 */
export const fr: Partial<Record<TranslationKey, string>> = {
  ...profile,
};
