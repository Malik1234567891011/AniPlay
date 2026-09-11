/** Keys for the `misc` area. Values are the exact strings the app shipped. */
export const misc = {
  /* ---------------------------------------------------------------------- */
  /* AU-01 — the sign-in sheet                                              */
  /* ---------------------------------------------------------------------- */

  /**
   * The ✕ button that dismisses a sheet. Read aloud, never drawn — the glyph
   * is the label. "Close this sheet", not "closed" and not "near".
   */
  'misc.close': 'Close',
  /** Finish and dismiss — the player is done reading, nothing is submitted. */
  'misc.done': 'Done',
  'misc.not_now': 'Not now',
  /** The last-resort error when sign-in failed for an unknown reason. */
  'misc.sign_in_failed': 'Could not sign in just now.',
  'misc.signed_in_notice': 'Signed in. Everything you have played came with you.',
  /** Shown when the player is already signed in — a state, not an action. */
  'misc.signed_in_title': "You're signed in",
  'misc.signed_in_as':
    'This device is signed in as {email}. Your worlds are saved and will be waiting on any device you sign in on.',
  'misc.worlds_saved_anywhere':
    'Your worlds are saved and will be waiting on any device you sign in on.',
  /**
   * The sign-in sheet's headline. `Save` here is save-to-your-account —
   * `Enregistrer`, never `Sauver` (rescue). "This world" is the story the
   * player is playing, not the planet.
   */
  'misc.sign_in_title': 'Save this world',
  'misc.sign_in_body':
    "Sign in to keep your progress, continue on another device, and claim daily credits. Everything you've played so far comes with you.",
  'misc.sign_in_not_configured':
    'This build has no sign-in configured, so you are playing as a guest on this device. Your worlds are saved on the server and will still be here next time you open the app.',
  /** Apple's own wording for Sign in with Apple. Follow Apple's French copy. */
  'misc.continue_with_apple': 'Continue with Apple',
  /** Button label while the sign-in request is in flight. */
  'misc.signing_in': 'Signing in…',
  'misc.email_code_hint': 'Or get a six-digit code by email. No password to create.',
  /**
   * The greyed-out example inside the empty email field — an illustration of
   * the shape of an address, not an address anyone should type. `example.com`
   * is the reserved example domain.
   */
  'misc.email_placeholder': 'you@example.com',
  /** Accessibility label for the email field. */
  'misc.email_address': 'Email address',
  'misc.email_me_a_code': 'Email me a code',
  /** Button label while the code email is being sent. */
  'misc.sending': 'Sending…',
  'misc.code_sent': 'Code sent to {email}. It expires in a few minutes.',
  'misc.enter_code_sent_to': 'Enter the six-digit code sent to {email}.',
  /** Accessibility label for the one-time-code field. */
  'misc.six_digit_code': 'Six-digit code',
  /** The action — sign in now. Compare `misc.signed_in_title`, a state. */
  'misc.sign_in': 'Sign in',
  'misc.use_a_different_email': 'Use a different email',
  'misc.no_password_footer': 'No password to create. We never post anything on your behalf.',

  /* ---------------------------------------------------------------------- */
  /* SF-01 — the report sheet                                               */
  /* ---------------------------------------------------------------------- */

  /**
   * Title of the abuse-report sheet. A report *about* content — flagging it to
   * moderators (`Signaler`). Not a document, a bulletin, or a news report.
   */
  'misc.report_title': 'Report',
  /** Dismisses the report sheet without filing anything. */
  'misc.cancel': 'Cancel',
  /**
   * {target} is the kind of thing being reported, lower-cased — "story",
   * "message", "character". It arrives from the server in English until the
   * server-side keys land (step 4).
   */
  'misc.report_target_question': "What's wrong with this {target}?",
  'misc.report_reason_sexual_content_involving_minors': 'Sexual content involving minors',
  'misc.report_reason_harassment': 'Harassment or bullying',
  'misc.report_reason_hate': 'Hate speech',
  'misc.report_reason_violence_threat': 'Threats of violence',
  /** Content about hurting oneself. `Automutilation`, not "self-service". */
  'misc.report_reason_self_harm': 'Self-harm',
  /** Copyright/plagiarism: the world copies another author's work. */
  'misc.report_reason_ip_violation': 'Copies someone else’s work',
  /** Pretends to be a real, identifiable person. */
  'misc.report_reason_impersonation': 'Impersonates a real person',
  /** `Broken` = does not work / contradicts its own canon, not shattered. */
  'misc.report_reason_broken': 'Broken or contradicts itself',
  'misc.report_reason_other': 'Something else',
  /** Placeholder inside the free-text box on the report sheet. */
  'misc.report_details_placeholder': 'Anything else we should know? (optional)',
  /** Accessibility label for the free-text box on the report sheet. */
  'misc.report_details_label': 'Additional details',
  /**
   * A switch, not a reason. "Recommendations" is the personalized feed on
   * Discover — stop showing me this and things like it.
   */
  'misc.report_also_hide': 'Also hide this from my recommendations',
  'misc.submit_report': 'Submit report',
  /** Button label while the report is being sent. */
  'misc.submitting': 'Submitting…',
  'misc.report_thanks_title': 'Thanks for telling us',
  /**
   * {caseRef} is the moderation case reference. "Report history" here is the
   * profile row of the same name — translate the two the same way.
   */
  'misc.report_thanks_body':
    'A moderator will review this. Your case reference is {caseRef} — you can find it under Report history in your profile.',

  /* ---------------------------------------------------------------------- */
  /* SF-02 — report history                                                 */
  /* ---------------------------------------------------------------------- */

  /** Abuse/safety reports the player filed, not a changelog. `signalements`. */
  'misc.report_history_title': 'Report history',
  'misc.report_history_empty_title': 'Nothing reported',
  'misc.report_history_empty_body':
    'Reports you file will be listed here with their case reference.',
  /**
   * One row of report history. `Case` is a moderation case — the reference you
   * quote to support — not a container, a legal case, or a letter case.
   * {reference} is the short code; {date} is already formatted.
   */
  'misc.report_case_line': 'Case {reference} · {date}',

  /* ---------------------------------------------------------------------- */
  /* CR-01 — the creator teaser                                             */
  /* ---------------------------------------------------------------------- */

  /** Screen title. Making = building/authoring worlds, an activity. */
  'misc.create_title': 'Making worlds',
  'misc.create_coming_title': 'The world builder is coming',
  'misc.create_coming_body':
    "You'll build worlds with structured tools, not by pasting one giant prompt: a cast with real motives, locations that connect, quests with actual win conditions, and systems the engine enforces.",
  'misc.create_credits_body':
    'Every world you make gets the same deterministic engine the official ones use, and unlimited free credits while you test it.',
  'misc.create_what_you_define': "What you'll define",
  /** The idea/pitch of a world. `Concept`, not conception or pregnancy. */
  'misc.create_concept': 'Concept',
  'misc.create_concept_body': 'Title, the fantasy, and who it is for.',
  /** The role the player gets to inhabit — the power fantasy of the world. */
  'misc.create_player_fantasy': 'Player fantasy',
  'misc.create_player_fantasy_body': 'Who the player is when they arrive, and what they can do.',
  /** Hard canon of the setting — rules the fiction obeys, not house rules. */
  'misc.create_world_rules': 'World rules',
  'misc.create_world_rules_body': 'Hard canon the story can never contradict.',
  /** Game systems — stats, skills, resources. `Systèmes de jeu`. */
  'misc.create_systems': 'Systems',
  'misc.create_systems_body': 'Attributes, skills, resources, and how defeat works.',
  /**
   * The characters of a world, taken together — a theatrical cast
   * (`Personnages` / `Distribution`). Never a plaster cast, a mould, or a throw.
   */
  'misc.create_cast': 'Cast',
  'misc.create_cast_body': 'Traits, drives, boundaries, secrets, and schedules.',
  /** Places on the world map. `Lieux`, not film locations or GPS positions. */
  'misc.create_locations': 'Locations',
  'misc.create_locations_body': 'A connected map with travel times and locks.',
  /** How the player advances — quests and unlocks. Not a chord progression. */
  'misc.create_progression': 'Progression',
  'misc.create_progression_body': 'Quests with predicates, not vibes.',
  /**
   * The opening passage of a story — the first thing the player reads.
   * Not an aperture, a job opening, or an opening move.
   */
  'misc.create_opening': 'Opening',
  'misc.create_opening_body': '50 to 150 words that reach a decision.',
} as const;
