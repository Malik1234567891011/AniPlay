import type { TranslationKey } from '../en/index.js';
import { category } from './category.js';
import { characters } from './characters.js';
import { discover } from './discover.js';
import { errors } from './errors.js';
import { library } from './library.js';
import { memory } from './memory.js';
import { misc } from './misc.js';
import { nav } from './nav.js';
import { onboarding } from './onboarding.js';
import { profile } from './profile.js';
import { rails } from './rails.js';
import { session } from './session.js';
import { setup } from './setup.js';
import { share } from './share.js';
import { story } from './story.js';
import { ui } from './ui.js';
import { wallet } from './wallet.js';
import { world } from './world.js';
import { worldsheet } from './worldsheet.js';

/**
 * Le catalogue français.
 *
 * **Written, not translated.** Every documented failure in French genre
 * localization is an addition — an adjective, an exclamation mark, a
 * conjunction the source did not have — and a translated string carries the
 * English rhythm by construction. See `LANGUAGE_BIBLE.md` Part 0.
 *
 * A key missing here falls back to English at runtime, which is the correct
 * behaviour for a partial catalogue and is why `DEVICE_LOCALE_AUTODETECT` stays
 * off until this is complete.
 *
 * Four rules, all checked by `catalog.spec.ts`:
 *
 * - **The product says `tu`.** Always, on every screen, never mixed with
 *   `vous`. `PRODUCT_VOICE.md` rule 2.
 * - **Sentence case.** `Nouvelle partie`, never `Nouvelle Partie`. French UI —
 *   Apple's included — is uniformly sentence case, and French Title Case is a
 *   calque.
 * - **Zero is singular.** `{count, plural, one {…} other {…}}` covers 0 *and*
 *   1. A pair copied from English gets every counted string wrong at zero.
 * - **U+2019, never U+0027.** `Qu’est-ce`, not `Qu'est-ce`. Matching is handled
 *   by `normalizeForSearch`; this file is display text.
 */
export const fr: Partial<Record<TranslationKey, string>> = {
  ...nav,
  ...onboarding,
  ...discover,
  ...rails,
  ...story,
  ...setup,
  ...session,
  ...worldsheet,
  ...library,
  ...profile,
  ...category,
  ...characters,
  ...wallet,
  ...share,
  ...misc,
  ...errors,
  ...ui,
  ...world,
  ...memory,
};
