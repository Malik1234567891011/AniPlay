/** "Your characters" — the roster screen and the portrait card on it. */
export const characters = {
  'characters.title': 'Your characters',
  /** VoiceOver label on the ✕ that closes the screen. */
  'characters.close': 'Close',

  'characters.empty_title': 'Nobody yet',
  'characters.empty_body':
    'Start a world and whoever you decide to be will show up here, with everything that happened to them.',
  'characters.empty_action': 'Browse worlds',

  /** Sits in the empty frame where a portrait would be. Very little room. */
  'characters.no_portrait_yet': 'No portrait yet',
  /**
   * VoiceOver label on the portrait. {name} is the character's name, so the
   * English possessive has to be rebuilt rather than copied — French wants
   * `Portrait de {name}.`, not an apostrophe-s.
   */
  'characters.portrait_a11y': "{name}'s portrait. Tap to open the run.",
  'characters.no_portrait_a11y': 'No portrait for {name} yet.',

  /**
   * Under the character's name: `{title} · 12 turns`. {title} is the world's
   * title and the `·` separator is part of the string.
   *
   * A game turn — one exchange. French `tour`, never `virage`.
   */
  'characters.story_and_turns': '{title} · {count, plural, one {# turn} other {# turns}}',
  /** {location} is a place in the world, e.g. "Currently at The Long Gallery". */
  'characters.currently_at': 'Currently at {location}',
  /**
   * Capitals section label over the engine-recorded memories. Keep the
   * capitals, and keep the accents on them in French (`É`, never a bare `E`).
   */
  'characters.what_happened': 'WHAT HAPPENED',

  'characters.appearance_label': 'Describe yourself however you like',
  'characters.appearance_placeholder':
    'e.g. Tall, buzzed hair, an archive coat I never take off, ink to the knuckle.',
  /** VoiceOver label on the appearance field. Read aloud, never on screen. */
  'characters.appearance_a11y': 'Describe your appearance',

  /**
   * `Draw` here means **draw a picture** — `Dessiner`, never `Tirer`, and
   * never "draw" in the sense of pulling something out.
   *
   * It matters twice. The same English verb is also a parser verb in play,
   * where `draw` means *unsheathe a weapon*; that one is `dégainer`. The two
   * must not converge on one French word. UI_AUDIT §3, row `characters.draw`.
   */
  'characters.draw_for_credits': 'Draw for {count, plural, one {# credit} other {# credits}}',
  /** Draw it again, replacing the portrait. Same `Dessiner` sense as above. */
  'characters.redraw_for_credits': 'Redraw for {count, plural, one {# credit} other {# credits}}',
  /** On the button while the portrait generates. Same `Dessiner` sense. */
  'characters.drawing': 'Drawing…',
  'characters.cancel': 'Cancel',
  /** Same `Dessiner` sense as `characters.draw_for_credits`. */
  'characters.draw_this_character': 'Draw this character',
  /** Same `Dessiner` sense as `characters.draw_for_credits`. */
  'characters.redraw_portrait': 'Redraw portrait',

  'characters.portrait_failed': "That portrait didn't come through. You weren't charged.",
} as const;
