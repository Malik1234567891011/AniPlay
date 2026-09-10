/** SH-01 — the share sheet, and the card it exports. */
export const share = {
  /**
   * The heading on the sheet — the name of the screen, not the button on it.
   * `share.action` is the button, and French may want a noun here against a
   * verb there; they are two keys on purpose.
   */
  'share.title': 'Share',
  /** VoiceOver label on the ✕ that dismisses the sheet. */
  'share.close': 'Close',
  'share.preview_note': 'This is exactly what gets shared.',

  'share.what_to_share': 'What to share',
  /** Chip label. A card recapping the beat, not a credit or index card. */
  'share.artifact_recap': 'Recap card',
  'share.artifact_recap_blurb': 'The moment, as the story told it.',
  /** Chip label. The player's own typed action, quoted back at them. */
  'share.artifact_typed': 'What I typed',
  'share.artifact_typed_blurb': 'Your words on one side, what happened on the other.',
  /**
   * Chip label. The generated illustration for the beat — "hero" in the
   * layout sense (the big image), not a heroic character.
   */
  'share.artifact_hero': 'Hero image',
  'share.artifact_hero_blurb': 'The picture, with the world’s name on it.',

  'share.spoiler_title_label': 'A title that gives nothing away',
  'share.spoiler_title_hint':
    "Optional. Shown instead of the world's name, so you can post a moment without spoiling it.",
  'share.spoiler_title_placeholder': 'e.g. The thing that happened on the stair',
  /** VoiceOver label on the title field. Read aloud, never on screen. */
  'share.spoiler_title_a11y': 'Spoiler-safe title',

  'share.hide_name': 'Hide my name',
  /**
   * {name} is the player's own display name, shown as it will appear on the
   * card. The quotation marks are the English pair “ ”; French takes « » with
   * its own inner spacing.
   */
  'share.currently_shows': 'Currently shows “{name}”.',
  'share.nothing_to_hide': 'Nothing to hide — no name is on it.',

  /** The button. The verb — what the tap does. See `share.title`. */
  'share.action': 'Share',
  /** On the button while the card is being captured. */
  'share.preparing': 'Preparing…',
  'share.privacy_note':
    'The image is made on your phone and only leaves it when you pick somewhere to send it.',

  /**
   * Section labels printed on the exported card itself, in capitals. Keep the
   * capitals, and keep the accents on them in French (`É`, never a bare `E`).
   * They sit in a fixed 288 pt card, so they cannot grow much.
   */
  'share.card_what_i_typed': 'WHAT I TYPED',
  'share.card_what_happened': 'WHAT HAPPENED',

  'share.unavailable': 'Sharing is not available on this device.',
  'share.failed': 'That could not be shared just now.',
} as const;
