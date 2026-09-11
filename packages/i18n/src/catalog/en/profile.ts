/** PR-01 / PR-02 — the profile screen and every setting on it. */
export const profile = {
  'profile.title': 'Profile',
  'profile.guest': 'Guest',
  'profile.guest_explainer':
    "You're playing as a guest. Sign in to save this world and continue anywhere.",
  'profile.sign_in': 'Sign in',
  'profile.sign_out': 'Sign out',
  'profile.sign_out_confirm_title': 'Sign out?',
  'profile.gameplay': 'Gameplay',
  'profile.advanced_relationship_stats': 'Show advanced relationship stats',
  'profile.advanced_relationship_stats_hint':
    'Reveals the numbers behind Trusted, Rival, and the rest.',
  'profile.check_math': 'Show check maths',
  'profile.check_math_hint': 'Shows the roll and modifiers, where the world allows it.',
  'profile.audio_visual': 'Audio & visual',
  'profile.reduce_motion': 'Reduce motion',
  'profile.reduce_motion_hint': 'Removes parallax and non-essential animation.',
  'profile.voice_autoplay': 'Autoplay character voice',
  'profile.haptics': 'Haptics',
  'profile.privacy_safety': 'Privacy & safety',
  /** Abuse/safety reports the player filed, not a changelog. `signalements`. */
  'profile.report_history': 'Report history',
  'profile.creator_teaser': 'Making your own worlds',
  'profile.wallet': 'Wallet & purchases',
  'profile.account': 'Account',

  // The language switch. Hidden behind seven taps until step 7; see
  // DEVICE_LOCALE_AUTODETECT.
  'profile.language': 'Language',
  'profile.language_hint':
    'Applies to new stories. A story already started keeps the language it began in.',
  /** "Follow whatever the phone is set to" — not the name of a device. */
  'profile.language_device': 'Device',
  'profile.language_current': 'New stories will be in {name}.',
  /** The two switches that show the engine's working, behind a disclosure. */
  'profile.advanced_gameplay': 'Advanced gameplay',
  'profile.advanced_gameplay_hint': 'Relationship numbers and check maths',
  'profile.badges': 'Badges',
  'profile.badges_summary': '{earned} of {total} earned',
  'profile.badges_unclaimed': '{count, plural, one {# reward to collect} other {# rewards to collect}}',
  /* -- The badges screen -- */

  'badges.ready': 'Ready to collect',
  'badges.in_progress': 'In progress',
  'badges.earned': 'Earned',
  'badges.claim': 'Collect {credits}',
  'badges.claim_a11y': 'Collect {credits} credits for {title}.',
  'badges.progress': '{done} of {target}',
  'badges.guest': 'Sign in to keep the badges you earn.',
  /**
   * The gear in Profile's corner, and the screen behind it.
   *
   * Profile was doing two jobs in one scroll: who you are and what you have
   * played, mixed with account plumbing nobody opens twice.
   */
  'settings.title': 'Settings',
  'settings.my_information': 'My information',
  'settings.app_version': 'App version',
  'settings.personalization': 'What you like',
  'settings.save_preferences': 'Save',
  'settings.a11y': 'Settings',
  'profile.service': 'Service',
} as const;
