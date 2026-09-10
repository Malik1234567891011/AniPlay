/**
 * The engine's own vocabulary: the clock, the check bands, the relationship
 * ladder, the day parts.
 *
 * These are different from the rest of the catalogue in one important way:
 * **they are read by the model as well as shown to the player.** The world
 * clock and the relationship label both go into the writer's prompt, which is
 * why they must exist in the session's locale rather than travelling to the
 * client as keys — an English `Trusted` in a French context window is exactly
 * the drift `LOCALIZATION_ARCHITECTURE.md` §7 is about.
 *
 * Every English value here is the string the engine returned before it was
 * keyed. `world.spec.ts` in the engine asserts that, one band at a time.
 */
export const world = {
  // --- The clock ----------------------------------------------------------
  /**
   * The scene header. English is 12-hour with AM/PM; France runs on the
   * 24-hour clock, so the French value is `Jour {day} · {time}` with `{time}`
   * already formatted as `HH:mm`. The separator is U+00B7 in both.
   */
  'world.time_label': 'Day {day} · {time}',
  /** Less than a minute of world time passed. Not a literal moment. */
  'world.duration_moment': 'a moment',
  'world.duration_minutes': '{count} min',
  'world.duration_hours': '{count}h',
  'world.duration_hours_minutes': '{hours}h {minutes}m',
  /** A quest deadline still ahead. `{duration}` is already formatted. */
  'world.deadline_in': 'in {duration}',
  /** A quest deadline that has passed. Capitalised — it is a badge. */
  'world.deadline_overdue': 'Overdue',

  // --- Day parts ----------------------------------------------------------
  // Nouns, not sentences: the writer puts them into prose itself and
  // lowercases them. French needs the bare noun for the same reason.
  'world.daypart.dawn': 'Dawn',
  'world.daypart.morning': 'Morning',
  'world.daypart.midday': 'Midday',
  'world.daypart.afternoon': 'Afternoon',
  'world.daypart.evening': 'Evening',
  'world.daypart.night': 'Night',
  'world.daypart.late_night': 'Late night',

  // --- Difficulty bands ---------------------------------------------------
  // Shown on the check card where a world sets `revealCheckMath`.
  'world.dc.routine': 'Routine',
  'world.dc.easy': 'Easy',
  'world.dc.moderate': 'Moderate',
  'world.dc.hard': 'Hard',
  'world.dc.very_hard': 'Very hard',
  'world.dc.exceptional': 'Exceptional',
  'world.dc.nearly_impossible': 'Nearly impossible',

  // --- Check outcomes -----------------------------------------------------
  'world.outcome.critical_success': 'Critical success',
  'world.outcome.clean_success': 'Clean success',
  'world.outcome.success': 'Success',
  /** You got what you wanted and it cost you something. */
  'world.outcome.success_with_cost': 'Success with cost',
  'world.outcome.failure': 'Failure',
  /** Not a failure — the situation got more tangled. */
  'world.outcome.complication': 'Complication',

  // --- Proficiency --------------------------------------------------------
  'world.proficiency.untrained': 'Untrained',
  'world.proficiency.familiar': 'Familiar',
  'world.proficiency.trained': 'Trained',
  'world.proficiency.expert': 'Expert',
  'world.proficiency.master': 'Master',
  'world.proficiency.legendary': 'Legendary',

  // --- Attributes ---------------------------------------------------------
  /**
   * The six attributes and the plain-language sentence under each.
   *
   * Assembled server-side in `projections.ts` and shown on the World Sheet,
   * where VoiceOver reads the explanation aloud — so a French player with
   * VoiceOver on hears these, and they are among the easiest strings in the app
   * to forget. Rendered in the **run's** locale, because the World Sheet is a
   * view of one run.
   *
   * The explanations are two clauses: an abstract definition, then a concrete
   * example. Keep both, and keep the example concrete — `Shoving a door,
   * holding a line` is doing more work than `Force, endurance`.
   */
  'world.attr.might.name': 'Might',
  'world.attr.might.plain': 'Force, endurance, and raw physical power. Shoving a door, holding a line.',
  'world.attr.agility.name': 'Agility',
  'world.attr.agility.plain': 'Speed, precision, and reflex. Moving quietly, moving fast, not being seen.',
  'world.attr.mind.name': 'Mind',
  'world.attr.mind.plain': 'Analysis, memory, and technical knowledge. Noticing what is missing from a page.',
  'world.attr.presence.name': 'Presence',
  'world.attr.presence.plain': 'Persuasion, command, and performance. Being believed, or being feared.',
  'world.attr.resolve.name': 'Resolve',
  'world.attr.resolve.plain': 'Willpower and composure. Not flinching when it matters.',
  /** The supernatural attribute. `Arcanes` in French, and it is a plural noun. */
  'world.attr.arcana.name': 'Arcana',
  'world.attr.arcana.plain': 'Attunement to the extraordinary. Reading a ward, bending one.',

  // --- The relationship ladder --------------------------------------------
  /**
   * How a character reads to the player right now.
   *
   * ⚠️ **In French these agree with the character's gender**, and there is no
   * gender on `CharacterDef` yet — `Devoted` is `Dévoué` or `Dévouée`. The
   * French values are therefore written to be **invariable** where possible
   * (`Sur ses gardes`, `Proche`, `Rivalité`) rather than guessing, and the
   * authored gender that would let them agree properly is
   * `TERMINOLOGY.md` §3.4's outstanding item.
   */
  'world.relationship.afraid': 'Afraid',
  'world.relationship.rival': 'Rival',
  'world.relationship.hostile': 'Hostile',
  'world.relationship.devoted': 'Devoted',
  'world.relationship.close': 'Close',
  'world.relationship.trusted': 'Trusted',
  /** Liked without being trusted — the specific state this product is about. */
  'world.relationship.complicated': 'Complicated',
  'world.relationship.respected': 'Respected',
  'world.relationship.competitive': 'Competitive',
  'world.relationship.warm': 'Warm',
  'world.relationship.familiar': 'Familiar',
  /** The default. Guarded, not hostile. */
  'world.relationship.wary': 'Wary',
} as const;
