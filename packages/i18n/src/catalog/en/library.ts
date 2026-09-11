/** LB-01 / LB-02 — the library shelf and the run-management sheet. */
export const library = {
  /**
   * A playthrough of a world. Not a running total, not a sprint, not a print
   * run. French: `partie`.
   */
  'library.runs': '{count, plural, one {# run} other {# runs}}',
  /** A game turn — one exchange. French `tour`, never `virage`. */
  'library.turns': '{count, plural, one {# turn} other {# turns}}',

  /* ---------------------------------------------------------------------- */
  /* The shelf                                                              */
  /* ---------------------------------------------------------------------- */

  /** The screen's own name — the shelf of saved playthroughs, not a book collection. */
  'library.title': 'Library',
  'library.load_failed_title': "Couldn't load your library",
  'library.load_failed_body': 'We could not load your worlds just now. Nothing has been lost.',
  'library.offline':
    "You're offline. Your worlds are safe — they live on the server, not on this phone.",
  'library.try_again': 'Try again',
  'library.no_worlds_yet': 'No worlds yet',
  'library.no_worlds_body': 'Anything you start shows up here, with your progress saved.',
  'library.browse_worlds': 'Browse worlds',
  /**
   * A section heading over the runs still in progress. Rendered in capitals as
   * written — the caps are in the string, not in the style — so the French must
   * be capitalised in the catalogue too.
   */
  'library.section_active': 'ACTIVE',
  /**
   * The companion heading, over runs that have ended. Capitals as written; see
   * `library.section_active`.
   */
  'library.section_finished': 'FINISHED',

  /* ---------------------------------------------------------------------- */
  /* A card on the shelf                                                    */
  /* ---------------------------------------------------------------------- */

  /**
   * Under a run's title: the name of the character the player is in that world.
   * "as" is "in the role of" (`dans le rôle de`), not a comparison and not
   * "since".
   */
  'library.playing_as': 'as {name}',
  /**
   * A run's turn count and the date it was last played, side by side.
   * `turn` is a game turn — French `tour`, never `virage`. The date arrives
   * already formatted for the locale.
   */
  'library.turns_and_date': '{count, plural, one {# turn} other {# turns}} · {date}',
  /**
   * The whole card, read aloud by a screen reader. "Continue." is the action
   * the card performs, spoken as a sentence. `turn` is a game turn (`tour`).
   */
  'library.session_card_a11y': '{title}, {count, plural, one {# turn} other {# turns}}. Continue.',
  /**
   * A badge on a run that was branched off another one. **Fork** here means to
   * split a playthrough in two at a chosen point, not cutlery and not a road
   * junction. The French wording is undecided — `Bifurquer` and
   * `Nouvelle branche` are both on the table (UI_AUDIT §3); pick one and use
   * the same word here, in `library.fork_run` and in `library.fork_failed_title`.
   */
  'library.fork_badge': 'Fork',
  /** Opens the run-management sheet. Screen-reader label on the `⋯` button. */
  'library.manage_run': 'Manage this run',

  /* ---------------------------------------------------------------------- */
  /* The run-management sheet                                               */
  /* ---------------------------------------------------------------------- */

  /** Dismisses the sheet. Screen-reader label on the backdrop. */
  'library.close_sheet': 'Close',
  /**
   * Under the run's title in the sheet: how many turns it has, and the date it
   * was started. `turn` is a game turn (`tour`); the date arrives already
   * formatted for the locale.
   */
  'library.run_started': '{count, plural, one {# turn} other {# turns}} · started {date}',
  /**
   * Branches the run at its current point into a second, independent
   * playthrough, for credits. See `library.fork_badge` for the undecided French
   * wording — the same word must be used in all three fork strings.
   */
  'library.fork_run': 'Fork this run · 120 credits',
  /** Alert title when branching a run failed. Same `fork` word as the button. */
  'library.fork_failed_title': 'Could not fork',
  'library.fork_failed_body': 'You may need more credits.',
  /**
   * Deletes one playthrough — a saved run of a world, not a jog and not a
   * production run. French: `Supprimer la partie`.
   */
  'library.delete_run': 'Delete run',
  /** Confirmation title before deleting one playthrough. */
  'library.delete_confirm_title': 'Delete this run?',
  /**
   * The confirmation body. The straight double quotes around the title are part
   * of the English string; French would normally take guillemets, so this is a
   * deliberate call for the localizer. `turn` is a game turn (`tour`).
   */
  'library.delete_confirm_body':
    '"{title}" and its {count, plural, one {# turn} other {# turns}} will be gone. This cannot be undone.',
  /** The cancel button — "keep this run", not "keep going". */
  'library.delete_keep': 'Keep it',
  /** The destructive button that removes the run. */
  'library.delete_confirm': 'Delete',

  /* ---------------------------------------------------------------------- */
  /* Profile strings that are not settings — stats, characters, account      */
  /* ---------------------------------------------------------------------- */

  'library.sign_out_confirm_body':
    'Your worlds stay saved to your account. Sign back in on any device to pick them up.',
  /** The cancel button on the sign-out confirmation — stay logged in. */
  'library.sign_out_stay': 'Stay signed in',
  /**
   * A stat label under a number: how many worlds the player has played.
   * Rendered upper-cased by the layout, so keep it short.
   */
  'library.stat_worlds': 'Worlds',
  /**
   * A stat label under a number: game turns played (`tours`), never `virages`.
   * Rendered upper-cased by the layout, so keep it short.
   */
  'library.stat_turns': 'Turns',
  /**
   * A stat label under a number: how many worlds this player has authored.
   * A past participle used as a noun label — "worlds created". Rendered
   * upper-cased by the layout, so keep it short.
   */
  'library.stat_created': 'Created',
  /** Heading over the player's cast — the characters they have played as. */
  'library.your_characters': 'Your characters',
  /** Opens the full character list. "all" = all of your characters. */
  'library.see_all': 'See all',
  /** A character and the world they belong to, read aloud by a screen reader. */
  'library.character_in_story_a11y': '{name} in {story}',
  /**
   * Placeholder where a character portrait has not been generated yet. "draw"
   * means the app will draw the picture, not that the player sketches one.
   */
  'library.tap_to_draw': 'Tap to draw',
  /** Deletes the whole account, not one run. */
  'library.delete_account': 'Delete account',
  'library.delete_account_confirm_title': 'Delete your account?',
  'library.delete_account_confirm_body':
    'Your worlds, progress, and saved stories will be removed. Purchased credits cannot be recovered. This cannot be undone.',
  /** The cancel button on the account-deletion confirmation. */
  'library.delete_account_keep': 'Keep my account',
  /** The destructive button that deletes the account and everything in it. */
  'library.delete_account_confirm': 'Delete everything',
  'library.account_deleted_title': 'Account deleted',
  'library.account_deleted_body': 'Your data will be fully purged within 30 days.',
} as const;
