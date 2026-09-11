/**
 * ST-01 Story detail — the page that converts curiosity into the first turn.
 *
 * Two of the three stat *values* on this screen are server data, not copy:
 * `Shape` renders `stats.medianDepthLabel` and `Intensity` renders a server
 * enum. Only the labels are here; the values are step 4's work (UI_AUDIT §5).
 *
 * Sentence case throughout, in French as in English.
 */
export const story = {
  // Header actions. All four are a11y labels on icon-only buttons — read
  // aloud, never on screen, and the easiest to miss (UI_AUDIT §2.10).
  'story.back': 'Back',
  /**
   * Save-to-library, the same sense as `discover.save`: `Enregistrer`, never
   * `Sauver`. This is the star button's label when the story is *not* saved.
   */
  'story.save_story': 'Save story',
  /** The same button once the story is saved — un-save it. */
  'story.remove_from_saved': 'Remove from saved',
  /** Abuse/safety report. `Signaler`. */
  'story.report_story': 'Report this story',

  /** A world published by Plotbreak itself, as opposed to `story.badge_community`. */
  'story.badge_official': 'Official',
  /** A world published by a player. */
  'story.badge_community': 'Community',
  /** Byline under the title. Lowercase `by` is deliberate — it is a fragment, not a sentence. */
  'story.by_creator': 'by {name}',

  /** The primary CTA when a run is already open — resume it. */
  'story.continue': 'Continue',
  /** The primary CTA when there is no run yet. Begin playing, not "start a file". */
  'story.start': 'Start story',

  /** Stat label: how many people have played this world. Not "player characters". */
  'story.stat_players': 'Players',
  /**
   * Stat label. **The shape of the story's structure** — how a typical run
   * branches and how deep it runs — not a geometric shape and not physical
   * condition. There is no good one-word French calque; this needs a
   * France-native rethink of what the stat is telling the player, agreed with
   * product, rather than a dictionary answer. UI_AUDIT §3.
   */
  'story.stat_shape': 'Shape',
  /** Stat label: how intense the content gets. Rendered above a server-supplied value. */
  'story.stat_intensity': 'Intensity',

  'story.mechanics_heading': 'What you can do here',
  'story.premise_heading': 'The premise',
  'story.cast_heading': "Who you'll meet",
  /** Read aloud on a cast portrait. `{role}` is the character's story function. */
  'story.cast_a11y': '{name}, {role}. Tap for details.',
  /** Under a portrait with no blurb: tapping opens the full cast card. */
  'story.cast_tap_for_more': 'Tap for more',
  /** Section heading over the content descriptors below. "Content warnings", in effect. */
  'story.content_heading': 'Content',
  /** Typographic caps over the creator's note. French keeps accents on capitals. */
  'story.creator_note_heading': 'FROM THE CREATOR',
  'story.related_heading': 'Related worlds',

  /** Dismisses the cast sheet — both the button and the scrim's a11y label. */
  'story.close': 'Close',

  /**
   * Content descriptors — a **France ratings surface**, shown before entry.
   *
   * This is ratings copy, not marketing copy: the wording is reviewed against
   * PEGI FR's own descriptors and is **not a translator's free choice**. Change
   * it only with that review. `Langage grossier` is the established French
   * wording (PEGI FR: *Grossièreté de langage*); `Langage fort` is a calque and
   * is wrong. See UI_AUDIT §4 for the agreed fr-FR column.
   *
   * The enum keys these labels hang off (`FANTASY_VIOLENCE`, `LANGUAGE`, …)
   * are ids on the wire and stay English — only the labels below are localised.
   */
  'story.descriptor_fantasy_violence': 'Fantasy violence',
  'story.descriptor_romance': 'Romance',
  'story.descriptor_suggestive_themes': 'Suggestive themes',
  'story.descriptor_horror': 'Horror',
  'story.descriptor_psychological_themes': 'Psychological themes',
  'story.descriptor_alcohol_references': 'Alcohol references',
  /** The `LANGUAGE` descriptor — swearing, not "which language the world is in". */
  'story.descriptor_strong_language': 'Strong language',
  /** Death that cannot be undone or reloaded. `Mort définitive`. */
  'story.descriptor_permanent_death': 'Permanent death',
  'story.descriptor_moral_ambiguity': 'Moral ambiguity',
  /* -- Replay, sessions, and the social layer -- */

  /** Secondary CTA beside Continue. A fresh run; the old one is untouched. */
  'story.new_session': 'New session',
  'story.sessions_heading': 'Your runs',
  'story.session_line': '{count, plural, one {# turn} other {# turns}} · {date}',
  'story.session_line_where': '{count, plural, one {# turn} other {# turns}} · {where} · {date}',
  'story.session_resume': 'Resume',
  'story.session_status_completed': 'Finished',
  'story.session_latest': 'Latest',

  'story.like': 'Like',
  'story.unlike': 'Liked',
  'story.likes_count': '{formatted}',
  'story.comments_heading': 'Comments',
  'story.comments_count': '{formatted}',
  'story.comments_empty': 'Nothing here yet. Say the first thing.',
  'story.comment_placeholder': 'What did you think?',
  'story.comment_post': 'Post',
  'story.comment_spoiler_toggle': 'Mark as spoiler',
  'story.comment_spoiler_hidden': 'Spoiler — tap to read',
  'story.comment_delete': 'Delete',
  'story.comment_report': 'Report',
  'story.comment_sort_top': 'Top',
  'story.comment_sort_new': 'New',
  'story.comment_sign_in': 'Sign in to join the conversation.',
  'story.comment_rate_limited': 'That is a lot of comments in an hour. Try again shortly.',
  /**
   * How long ago a comment was posted.
   *
   * These exist because `Comments.tsx` used `Intl.RelativeTimeFormat`, which
   * **segfaults Hermes on iOS** — opening any story from Discover killed the
   * app, with a SIGSEGV inside React Native's mounting transaction and no JS
   * error to point at it. It also formatted in the device's language rather
   * than the app's, so a French player got English timestamps.
   *
   * Same shape as `wallet.time_in_*`, which has always worked, for the same
   * reason: the catalogue does it, ICU pluralises it, and no Intl constructor
   * is involved.
   */
  'story.posted_now': 'just now',
  'story.posted_minutes': '{count, plural, one {{count}m ago} other {{count}m ago}}',
  'story.posted_hours': '{count, plural, one {{count}h ago} other {{count}h ago}}',
  'story.posted_days': '{count, plural, one {{count}d ago} other {{count}d ago}}',
  'story.posted_weeks': '{count, plural, one {{count}w ago} other {{count}w ago}}',
  'story.posted_months': '{count, plural, one {{count}mo ago} other {{count}mo ago}}',
  'story.posted_years': '{count, plural, one {{count}y ago} other {{count}y ago}}',
} as const;
