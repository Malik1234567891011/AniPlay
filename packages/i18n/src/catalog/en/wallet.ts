/**
 * WL-01 / WL-02 / WL-03 — the wallet, the store, and every store error.
 *
 * Two namespaces live here because they are one surface to a player. `wallet.*`
 * is the screen; `store.*` is what StoreKit and Play Billing come back with,
 * raised in `apps/mobile/src/store/purchases.ts` and rendered by the same
 * screen. Splitting them across two files would mean a purchase failure and the
 * notice that shows it were translated by two people.
 *
 * **This is the money screen, so the English here is frozen harder than
 * anywhere else.** Every value is the exact string the app shipped, including
 * the places where English never inflected a plural (`1 credits added.`). Those
 * are keyed as ICU plurals with identical `one` and `other` forms — the
 * category exists so French can say `1 crédit` / `2 crédits`, not so English
 * can be quietly corrected. Fixing the English copy while translating it is an
 * English regression wearing a refactor, and on this screen it is a money bug.
 *
 * Nothing here formats a number. `formatCredits(…)`, `toLocaleString()` and
 * `toFixed(2)` all still happen in the screen and arrive as ready-made strings,
 * so `#` never appears in a plural: `#` would apply ICU grouping and silently
 * change what the app renders (see UI_AUDIT §2.3 — Hermes ships without full
 * ICU, so `toLocaleString()` and ICU do not agree on a device). Locale-aware
 * number and currency formatting is a separate step and owns those call sites.
 */
export const wallet = {
  /* ---------------------------------------------------------------------- */
  /* The screen itself                                                       */
  /* ---------------------------------------------------------------------- */

  /** The screen's own name — the player's credit balance, not a leather wallet. */
  'wallet.title': 'Wallet',
  /** Screen-reader label on the `✕` button that dismisses the wallet. */
  'wallet.close': 'Close',

  /**
   * WL-03 — shown when a turn was refused for want of credits, with the exact
   * number missing. English never inflected `credits` here, so both plural
   * forms are the same sentence; French must inflect (`1 crédit de plus`).
   */
  'wallet.shortfall':
    '{count, plural, one {{count} more credits needed} other {{count} more credits needed}}',
  /** The way out of the shortfall, under it. `turn quality` is the per-turn tier. */
  'wallet.shortfall_hint':
    'Add credits below, or switch to a lower turn quality and send the same action.',

  /**
   * The label over the big balance number. Rendered in capitals as written —
   * the caps are in the string, not in the style — so the French must be
   * capitalised in the catalogue too.
   */
  'wallet.balance_label': 'BALANCE',
  /**
   * The unit after the balance number, on its own line: `12,500` `credits`.
   * A separate word from the number, so it cannot carry the number's plural —
   * a balance is effectively always plural in both languages.
   */
  'wallet.credits_unit': 'credits',
  /**
   * Under the balance: credits already committed to a turn being generated, so
   * not spendable yet. `in flight` = still running, not aviation. English never
   * inflected this; French must (`1 crédit retenu` / `2 crédits retenus`).
   */
  'wallet.reserved_held':
    '{count, plural, one {{count} held by a turn in flight} other {{count} held by a turn in flight}}',

  /* ---------------------------------------------------------------------- */
  /* The daily grant                                                         */
  /* ---------------------------------------------------------------------- */

  /**
   * The free-credits button. The `300` is hardcoded in the English string
   * rather than interpolated, exactly as it shipped; keep it a literal in the
   * translation too rather than inventing a placeholder the code does not pass.
   */
  'wallet.claim_daily': 'Claim 300 daily credits',
  /** The same button while the claim is in flight. */
  'wallet.claiming': 'Claiming…',
  /** When the daily grant has already been taken. `{when}` is `wallet.time_*`. */
  'wallet.next_daily': 'Next daily credits {when}',
  /**
   * Confirmation after a successful claim. English never inflected `credits`
   * here; French must. The number arrives raw, unformatted, as it shipped.
   */
  'wallet.credits_claimed':
    '{count, plural, one {{count} credits claimed.} other {{count} credits claimed.}}',
  /** Shown when the claim failed because nobody is signed in. */
  'wallet.daily_sign_in': 'Sign in to claim your daily credits.',

  /* ---------------------------------------------------------------------- */
  /* The packs                                                               */
  /* ---------------------------------------------------------------------- */

  /**
   * Heading over the buyable credit bundles. Title-Case-ish in English —
   * **do not calque it into French Title Case.** French UI is sentence case:
   * `Packs de crédits`, one capital. Same rule for every label on this screen.
   */
  'wallet.packs_title': 'Credit packs',
  /**
   * A whole pack row read aloud by a screen reader: how many credits, the bonus
   * if there is one, and the price. `{bonus}` is `none` when the pack has no
   * bonus, and otherwise the bonus amount. `{credits}` and `{price}` arrive
   * already formatted — never re-format them here.
   */
  'wallet.offer_a11y':
    '{bonus, select, none {{credits} credits, {price}} other {{credits} credits plus {bonus} bonus, {price}}}',
  /**
   * The reference price shown until the store answers with its own.
   *
   * **`{price}` is a hardcoded US dollar amount (`$2.99`) and that is a known
   * France bug — UI_AUDIT §2.2. Do not try to fix it by translating it.**
   * Translating `about` around a dollar sign does not make `$2.99` right for a
   * French player: it is the wrong currency, the wrong symbol, the wrong symbol
   * position and the wrong decimal separator (France writes `2,99 €`). The fix
   * is to stop having a hardcoded-currency fallback at all, and it is tracked
   * separately. This key exists so the surrounding word is not English while
   * that work is pending; the number and its symbol are deliberately untouched.
   */
  'wallet.about_price': 'about {price}',
  /** The bonus credits a pack adds on top, as a badge next to its size. */
  'wallet.bonus_badge': '+{bonus} bonus',
  /** A limited-time pack's expiry. `{when}` is one of the `wallet.time_*` keys. */
  'wallet.ends': 'Ends {when}',
  /**
   * Shown while the store has not returned its own prices, so the ones on
   * screen are ours. `US reference prices` is literal: they are the US-dollar
   * list, not the player's price.
   */
  'wallet.reference_prices_note':
    'Prices shown are US reference prices. Your store will show your local price and confirm before any payment.',
  /**
   * The same reassurance once the store's real prices are showing.
   * `consumable` is the App Store product type: credits are spent, not owned.
   */
  'wallet.price_confirmed_note':
    'Your store confirms the price before any payment. Credits are consumable and do not expire.',
  /**
   * Spec §20.6 — the required restore control, and the recovery path for a
   * charge whose reconciliation never landed. Title-Case-ish in English:
   * **sentence case in French**, `Restaurer mes achats`.
   */
  'wallet.restore': 'Restore purchases',
  /** The restore button while it is checking with the store. */
  'wallet.restore_loading': 'Checking with the store…',

  /* ---------------------------------------------------------------------- */
  /* What a purchase says afterwards                                         */
  /* ---------------------------------------------------------------------- */

  /** The purchase was real but the credits were already granted. Nothing is owed. */
  'wallet.already_credited': 'That purchase was already on your balance.',
  /**
   * The successful purchase. English never inflected `credits` here; French
   * must. `{credits}` arrives already formatted by `formatCredits` — do not
   * re-format it, and do not replace it with `#`.
   */
  'wallet.credits_added':
    '{count, plural, one {{credits} credits added.} other {{credits} credits added.}}',
  /** Ask to Buy and other deferred purchases: not a failure, not yet a credit. */
  'wallet.purchase_pending':
    'That purchase is waiting for approval. Your credits will appear here as soon as it goes through.',
  /**
   * Spec §3.8 — a failure where the store may already have taken the money.
   * `{message}` is the store's own already-translated `store.*` message; this
   * key only adds the sentence after it. Never soften it into "you were not
   * charged": the whole point is that we do not know.
   */
  'wallet.purchase_failed_charged':
    '{message} If you were charged, tap Restore purchases in a few minutes and your credits will appear.',

  /**
   * Restore found transactions and credited them. English never inflected
   * `credits` here; French must. `{credits}` arrives already formatted.
   */
  'wallet.credits_restored':
    '{count, plural, one {{credits} credits restored.} other {{credits} credits restored.}}',
  /** Restore found transactions, and every one of them was already credited. */
  'wallet.restore_all_present': 'Everything the store has on file is already on your balance.',
  /** Restore found nothing the store still holds. Not an error. */
  'wallet.restore_none': 'No purchases to restore on this account.',
  /** Restore could not reach the store at all. The em dash is U+2014. */
  'wallet.restore_unreachable': 'We could not reach the store. Nothing changed — try again shortly.',

  /* ---------------------------------------------------------------------- */
  /* The ledger                                                              */
  /* ---------------------------------------------------------------------- */

  /** The collapsible section listing every credit movement on the account. */
  'wallet.history': 'Purchase history',

  /*
   * Ledger row labels — one per entry type. They are accounting descriptions of
   * what moved credits, read in a list of dated amounts, not buttons. Several
   * are Title-Case-ish in English; **French takes sentence case throughout**
   * (UI_AUDIT §2.8). The enum keys they are looked up by stay English: they are
   * identifiers, not copy.
   */

  /** A bought pack of credits. Sentence case in French: `Pack de crédits`. */
  'wallet.credit_pack': 'Credit pack',
  /** The extra credits a pack threw in on top. French: `Bonus du pack`. */
  'wallet.pack_bonus': 'Pack bonus',
  /** The free daily grant, as a ledger row. French: `Crédits quotidiens`. */
  'wallet.daily_credits': 'Daily credits',
  /** The credits a new account starts with. French: `Crédits de bienvenue`. */
  'wallet.welcome_credits': 'Welcome credits',
  /**
   * Credits put aside when a game turn was sent. `Turn` is a game turn —
   * French `tour`, never `virage` and never `tour de rôle`.
   */
  'wallet.turn': 'Turn',
  /**
   * **Ledger accounting for one game turn**: the turn finished and the credits
   * held for it were actually taken. Not "settled" as in calmed down, and not
   * a dispute being settled. French: `Tour débité`.
   */
  'wallet.turn_settled': 'Turn settled',
  /** The turn failed on our side and its credits went back. French: `Tour remboursé`. */
  'wallet.turn_refunded': 'Turn refunded',
  /**
   * The fee for branching a run into a second playthrough. `fork` is the same
   * word as `library.fork_badge` — decide it once and use it in both.
   */
  'wallet.timeline_fork': 'Timeline fork',
  /** Money returned by the store, as a ledger row. */
  'wallet.refund': 'Refund',
  /** A manual correction made by support. French: `Ajustement`. */
  'wallet.adjustment': 'Adjustment',

  /* ---------------------------------------------------------------------- */
  /* How credits work                                                        */
  /* ---------------------------------------------------------------------- */

  'wallet.how_it_works': 'How credits work',
  /** `turn` is a game turn (`tour`); `quality tiers` are the per-turn tiers. */
  'wallet.how_it_works_richer':
    'Each turn you send costs credits, and higher quality tiers cost more. What you buy is richer direction, deeper memory, and better visuals.',
  /**
   * Spec §3.8 — the promise that money never buys luck. `The dice` are the
   * game's rolls; keep it concrete rather than abstracting it to `chance`.
   */
  'wallet.how_it_works_fair':
    'What you never buy is a better outcome. The dice, your stats, and every rule are identical at every tier.',
  /** The refund promise. `on our side` = our fault, not the player's. */
  'wallet.how_it_works_refund':
    'If a turn fails for any reason on our side, the credits go straight back. You are only ever charged for a turn that actually happened.',

  /* ---------------------------------------------------------------------- */
  /* Relative time                                                           */
  /* ---------------------------------------------------------------------- */

  /**
   * Countdowns to the next daily grant and to a pack's expiry, so they read
   * `Next daily credits in 4h` and `Ends in 2d`. The preposition is inside the
   * string because French may want a different one, or none.
   *
   * English does not inflect `min`/`h`/`d`, so both plural forms are identical;
   * the category is there for French, which also abbreviates days as `j`, not
   * `d` (UI_AUDIT §2.1). `{count}` is deliberately not `#`: `#` would apply ICU
   * grouping and change what English renders.
   */
  'wallet.time_now': 'now',
  'wallet.time_in_minutes': '{count, plural, one {in {count} min} other {in {count} min}}',
  'wallet.time_in_hours': '{count, plural, one {in {count}h} other {in {count}h}}',
  'wallet.time_in_days': '{count, plural, one {in {count}d} other {in {count}d}}',

  /* ---------------------------------------------------------------------- */
  /* store.* — what the platform's billing came back with                    */
  /* ---------------------------------------------------------------------- */

  /*
   * Raised in `apps/mobile/src/store/purchases.ts` and shown by the wallet.
   *
   * The distinction every one of these turns on is **whether the player was
   * charged**, and it must survive translation intact. A message that says the
   * player was not charged is a promise; never write one into a case where we
   * do not know. Spec §3.8.
   */

  /** The web build cannot open a billing sheet at all. */
  'store.web_only': 'Credits can only be bought in the app.',
  /** Expo Go and other builds with no billing native module. */
  'store.needs_native_build':
    'The store is not available in this build. Purchases need a native build of the app.',
  /** The billing connection could not be opened, with no more specific reason. */
  'store.unavailable': 'The store is not available.',
  /** A second purchase was tapped while one sheet was still open. Nothing was charged. */
  'store.purchase_in_progress': 'Another purchase is already in progress.',
  /**
   * The store took the purchase and our server could not confirm it. The
   * transaction is deliberately left unfinished, so it comes back by itself.
   * `safe` = not lost, will still be credited — not `secure`.
   */
  'store.sync_unconfirmed': 'We could not confirm that purchase just now. Your purchase is safe.',
  /** The store does not currently sell that pack. Nothing was charged. */
  'store.item_unavailable': 'That pack is not available right now.',
  /** The store was unreachable. This one does promise no charge, and it can. */
  'store.network_error': 'The store could not be reached. You have not been charged.',
  /**
   * The store already has this purchase and is still working on it. Money may
   * well have moved, so this points at Restore rather than claiming anything.
   * `Restore purchases` is the button named in `wallet.restore` — same wording.
   */
  'store.already_processing': 'That purchase is still being processed. Tap Restore purchases in a moment.',
  /** Billing is switched off for this device or Apple/Google account. */
  'store.purchases_unavailable': 'Purchases are not available on this device or account.',
  /** The catch-all failure. Reached only where the store gave us no message. */
  'store.purchase_failed': 'That purchase did not go through. You have not been charged.',
} as const;
