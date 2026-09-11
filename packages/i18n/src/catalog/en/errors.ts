/**
 * Keys for the `errors` area. Values are the exact strings the app shipped.
 *
 * These are read by somebody something has just gone wrong for, which is where
 * a translator is most likely to reach for a register the product does not
 * have. Two house rules for this namespace:
 *
 * - **Reassuring, not technical.** Several of these exist to say *nothing has
 *   been lost*. The reassurance is the message and the diagnosis is incidental,
 *   so a faithful-but-clinical French rendering ("Erreur réseau") is a
 *   mistranslation even when every word in it is correct.
 * - **No apology, and no blame.** None of these say "sorry" and none of them
 *   tell the player they did something wrong; they say what happened and what
 *   to do next. French should not acquire either.
 *
 * The keys are stable and the values are the fallback: `ApiError` and
 * `AuthError` translate at the point they are constructed, through a translator
 * the store binds to the interface language.
 */
export const errors = {
  // --- Network ---

  /**
   * A request that never left the phone. Deliberately reassuring — the second
   * sentence is the point, and "saved" here means "kept, and will be sent",
   * not "written to a file".
   */
  'error.offline_action_saved': "You're offline. Your action is saved.",

  /**
   * The same condition during sign-in, where there is nothing to save yet, so
   * the copy asks for a retry instead of promising one. Hedged on purpose
   * ("appear to be"): the app cannot tell a dead network from a dead server.
   */
  'error.offline_try_again': 'You appear to be offline. Try again in a moment.',

  /** The last-resort message when the server failed without explaining why. */
  'error.request_failed': 'Something went wrong.',

  /**
   * A turn that was accepted but never finished streaming. "Turn" is the
   * game's unit of play — one action and the scene that answers it — not a
   * queue position or a shift.
   */
  'error.turn_timeout': 'Turn did not complete in time.',

  /**
   * A development build that has no sign-in configuration meeting a server
   * that demands one. Seen only by whoever is running the app from source, and
   * the fix is entirely outside the app.
   *
   * `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` are
   * environment variable names: leave them exactly as they are.
   */
  'error.auth_not_configured':
    'This build has no sign-in configuration, and the server requires one. ' +
    'Restart the dev server so it picks up EXPO_PUBLIC_SUPABASE_URL and ' +
    'EXPO_PUBLIC_SUPABASE_ANON_KEY.',

  // --- Sign-in ---

  /**
   * The catch-all for a sign-in that failed in a way the player cannot act on.
   * "That did not work" is deliberately vague about whose fault it was, and
   * deliberately short — it is followed by a retry, not by an explanation.
   */
  'error.sign_in_failed': 'That did not work. Try again.',

  /** The emailed six-digit code, after it aged out. */
  'error.code_expired': 'That code has expired. Ask for a new one.',

  /**
   * The same code, mistyped or from an older email. "Did not match" rather
   * than "is wrong": the player is not being accused of anything.
   */
  'error.code_incorrect': 'That code did not match. Check it and try again.',

  /** Rate limited. "A minute" is an order of magnitude, not a countdown. */
  'error.too_many_attempts': 'Too many attempts. Wait a minute and try again.',

  /**
   * A malformed email address. "Does not look right" is a hedge on purpose —
   * the address has not been checked with anybody yet, only glanced at.
   */
  'error.email_invalid': 'That email address does not look right.',

  /**
   * Anonymous sign-in is switched off server-side, so browsing without an
   * account is not available. "Guest" is the product's word for a player who
   * has not signed in; it is the same person as in `profile.guest`.
   */
  'error.guest_play_unavailable': 'Guest play is not available right now. Sign in to continue.',

  /** New sign-ups are switched off. Temporary, and the copy says so. */
  'error.signups_paused': 'New accounts are paused right now.',

  /**
   * This build was compiled without a Supabase project, so sign-in cannot work
   * at all. Not a failure the player caused and not one they can retry.
   */
  'error.sign_in_not_configured': 'Sign-in is not configured in this build.',

  /**
   * Sign in with Apple — the name of Apple's feature, which Apple translates
   * itself. Use Apple's own French wording for it rather than inventing one.
   */
  'error.apple_unavailable': 'Sign in with Apple is not available on this device.',

  /** Apple's sheet returned without the token, which is a retry, not a refusal. */
  'error.apple_no_token': 'Apple did not return a sign-in token. Try again.',
} as const;
