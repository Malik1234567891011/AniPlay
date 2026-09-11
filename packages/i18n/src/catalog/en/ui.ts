/**
 * The design system's own copy — `packages/ui/src/components.tsx`.
 *
 * Mostly accessibility labels, which is why they are so easy to miss: they are
 * read aloud and never appear on screen. VoiceOver in French has to speak
 * French, and none of these would have been caught by looking at the app.
 *
 * `packages/ui` is a library and cannot reach the app's store, so these are
 * rendered through `useUiT()` over a context the app mounts once. See
 * `packages/ui/src/i18n.tsx`.
 */
export const ui = {
  /**
   * A playthrough of a world. `{formatted}` is the count already run through
   * `formatCredits`, so it carries the locale's own grouping; `{count}` is the
   * raw number and exists only to pick the plural category.
   *
   * This key replaces `story.runs === 1 ? 'run' : 'runs'`, which is the exact
   * pattern that must not exist: French is singular at **zero** as well as at
   * one, so `0 partie` and `1 partie` against `2 parties`.
   */
  'ui.story_runs': '{formatted} {count, plural, one {run} other {runs}}',
  /** Attribution on a world card. `de` in French, and it elides: `d’Élodie`. */
  'ui.by_creator': 'by {name}',
  /** Read aloud on a world card, to say which of the two kinds it is. */
  'ui.official_world': 'Official world',
  'ui.community_world': 'Community world',
  /** Badge: this world has real play behind it. */
  'ui.trending': 'Trending',

  /** A character portrait, read aloud: the name, then the expression. */
  'ui.portrait_a11y': '{name}',
  'ui.portrait_with_expression_a11y': '{name}, {expression}',
  /** A line of dialogue, read aloud. */
  'ui.speaker_says_a11y': '{speaker} says: {text}',
  /** Button that plays a generated voice line. */
  'ui.play_line_a11y': "Play {speaker}'s line",

  /**
   * The `Read more` fold on a long narration block.
   *
   * ⚠️ The fold itself is measured in **words** (90), and French carries the
   * same content in ~1.11× the words — so the French fold hides about 10 % more
   * of the beat, and the cut lands somewhere else relative to the meaning.
   * Truncation should be measured in rendered lines. Tracked in UI_AUDIT §2.5;
   * translating this string does not fix it.
   */
  'ui.read_more': 'Read more',
  'ui.read_less': 'Read less',

  /** More state changes than the row can show. */
  'ui.more_changes': '{count, plural, one {# more change} other {# more changes}}',

  'ui.edit_response_a11y': 'Edit this response before sending',
  'ui.send_response_hint': 'Sends this as your action.',

  /** The quality-tier pill, read aloud. `{label}` is the tier's own name. */
  'ui.quality_a11y': 'Quality: {label}, {cost} credits',
  'ui.quality_a11y_short': 'Quality: {label}, {cost} credits. Not enough credits',

  /** A skill check, read aloud: what was checked, how hard, how it went. */
  'ui.check_a11y': '{label} check',
  'ui.check_result_a11y': 'Result: {outcome}.',

  'ui.current_objective_a11y': 'Current objective: {objective}',
  'ui.credit_balance_a11y': '{balance} credits. Opens wallet.',
  /** A resource meter, read aloud: `Energy: 7 of 10`. */
  'ui.meter_a11y': '{name}: {current} of {max}',
  /** Under a cover on a ranked shelf. `{formatted}` is already abbreviated. */
  'ui.story_likes': '{count, plural, one {# like} other {{formatted} likes}}',
} as const;
