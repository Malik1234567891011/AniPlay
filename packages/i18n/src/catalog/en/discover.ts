/**
 * DS-01 Discover, DS-02 / DS-03 search, DS-04 the long-press preview sheet.
 *
 * Only what the *client* draws. The rail titles and subtitles above each row
 * (`Featured`, `For you`, `Trending now`, `New on Plotbreak`, `All worlds`) are
 * built server-side in `services/api/src/server.ts` and arrive over the wire
 * already in English — UI_AUDIT §5, step 4's work, not keyable from here. The
 * category chips are server data too, apart from the `All` chip below, which is
 * the one label this screen adds to that list itself.
 *
 * **Sentence case, in French too.** The labels here are already sentence case in
 * English (`Nothing here yet`, `Show everything`, `Open story`), and the ones
 * that read as Title Case must not be calqued: French UI capitalises the first
 * word and nothing else. See PRODUCT_VOICE.md and UI_AUDIT §2.8.
 */
export const discover = {
  /**
   * a11y label on the magnifier in the header *and* on the search field itself
   * — same action, same words. "Worlds" is the product's noun for a playable
   * story, not a planet: `mondes`.
   */
  'discover.search_worlds': 'Search worlds',

  // Offline and failure. The banner is the "we still have something" case; the
  // body is the "nothing loaded at all" case.
  'discover.offline_banner': "You're offline. Showing what we have.",
  'discover.offline_body':
    "You're offline. Worlds you have already started still open from your Library.",
  'discover.load_failed': 'Could not load worlds.',
  'discover.load_failed_title': 'Nothing loaded',
  'discover.try_again': 'Try again',

  /**
   * The unfiltered chip at the head of the category rail — "every category",
   * not "everything on earth". French: `Tout` / `Toutes`, decided against the
   * gender of the noun the rail is filtering (`catégories`).
   */
  'discover.category_all': 'All',

  /**
   * Typographic caps on the one featured cover — the source string carries the
   * capitals, the stylesheet does not add them. French keeps its accents on
   * capitals (`À LA UNE`, never `A LA UNE`).
   */
  'discover.featured_badge': 'FEATURED',
  /** The CTA pill inside the featured cover. "Enter this world", one word. */
  'discover.hero_enter': 'Enter',
  /** Read aloud, never seen. `{fantasy}` is the one-line pitch under the title. */
  'discover.hero_a11y': 'Featured: {title}. {fantasy}. Enter world.',

  /** Section header over the resume-a-run rail. Resume, not "keep going". */
  'discover.continue': 'Continue',
  /** Read aloud. `{objective}` is often empty — the trailing space is deliberate. */
  'discover.continue_a11y': 'Continue {title}. {objective}',
  /**
   * A game turn — one exchange between player and world. French `tour`, never
   * `virage` and never `tour de rôle`.
   */
  'discover.continue_turns': '{count, plural, one {# turn} other {# turns}}',

  // The whole catalogue came back empty, usually because a category filter is on.
  'discover.empty_title': 'Nothing here yet',
  'discover.empty_body': 'No worlds in this category. Try another.',
  /** Clears the category filter. "Show me the whole catalogue again." */
  'discover.empty_action': 'Show everything',

  // DS-04 — the long-press sheet.
  'discover.preview_close_a11y': 'Close preview',
  'discover.preview_open': 'Open story',
  /**
   * **Save-to-library.** Not save-a-file, and absolutely not rescue-a-person.
   * French `Enregistrer`, never `Sauver`. UI_AUDIT §3 — the canonical ambiguous
   * key, and the worst width case in the app (4 → 11 characters).
   */
  'discover.save': 'Save',
  /**
   * The *state* of an already-saved world, not a past action. `Enregistré` —
   * and it sits in the same chip as `discover.save`, so the two must fit the
   * same width.
   */
  'discover.saved': 'Saved',
  /**
   * A dismissal — "stop showing me this kind of thing". Not a statement about
   * the player's attention span. Fits a chip: keep it short.
   */
  'discover.not_interested': 'Not interested',
  /** Abuse/safety report, the same sense as `profile.report_history`. `Signaler`. */
  'discover.report': 'Report',

  // DS-02 / DS-03 — search.
  'discover.search_placeholder': 'Search titles, creators, tags',
  'discover.search_cancel': 'Cancel',
  'discover.search_no_results_title': 'No worlds matched',
  /** "Discover" here is the name of this screen, as the player sees it in the tab bar. */
  'discover.search_no_results_body': 'Try a shorter search, or browse the rails on Discover.',
  'discover.search_prompt_title': 'Search for a world',
  'discover.search_prompt_body':
    'Search by title, creator, tag, premise, or a character you remember.',
  /**
   * The Continue rail's second line, in the slot a cover card usually gives the
   * fantasy label. Shares its wording with `discover.continue_turns`, which is
   * the same sentence in the vertical card.
   */
  'discover.continue_turns_in': '{count, plural, one {# turn} other {# turns}} in',
} as const;
