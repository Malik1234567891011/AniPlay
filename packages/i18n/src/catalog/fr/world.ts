/**
 * Le vocabulaire du moteur : l'horloge, les seuils, l'échelle des relations.
 *
 * Written before the rest of the French catalogue because step 4's gate is
 * `Jour 3 · 16:15` rendering with no client-side string surgery, and because
 * these strings are read by the model as well as shown to the player — an
 * English `Trusted` in a French context window is the drift
 * `LOCALIZATION_ARCHITECTURE.md` §7 exists to prevent.
 *
 * ## Two decisions worth reading
 *
 * **The clock is 24-hour.** `16:15`, never `4:15 PM`. France runs on the
 * 24-hour clock and `14 h 30` is the prose form; `HH:mm` is the digital form
 * and is what a HUD uses (`research/typography.md`).
 *
 * **The relationship ladder is nouns, not adjectives.** `Dévouement` rather
 * than `Dévoué`/`Dévouée`, `Crainte` rather than `Effrayé`/`Effrayée`. A French
 * adjective describing a character has to agree with that character's gender,
 * and `CharacterDef` does not carry one — so an adjective here would be a coin
 * flip on every NPC in the game. State nouns are invariable, they read
 * naturally as badges, and `C'est compliqué` is the register French actually
 * uses for that state. The authored gender that would allow adjectives is
 * `TERMINOLOGY.md` §3.4's outstanding item; until it exists this is not a
 * compromise, it is the correct answer.
 *
 * Spacing: `{count} min` and `{count} h` carry U+202F, the narrow no-break
 * space CLDR uses before a short unit. `translate()` folds it to U+00A0 on the
 * way out, because Georgia and Avenir Next have no U+202F glyph.
 */
export const world = {
  'world.time_label': 'Jour {day} · {time}',
  'world.duration_moment': 'un instant',
  // `\u202F` written as an escape rather than as the character itself: a
  // narrow no-break space is invisible in a diff, and this is precisely the
  // codepoint the research says gets "cleaned up" by somebody who cannot see
  // it. `translate()` folds it to U+00A0 on the way out.
  'world.duration_minutes': '{count}\u202Fmin',
  'world.duration_hours': '{count}\u202Fh',
  'world.duration_hours_minutes': '{hours}\u202Fh\u202F{minutes}',
  'world.deadline_in': 'dans {duration}',
  'world.deadline_overdue': 'En retard',

  // Bare nouns. The writer puts them into prose itself and lowercases them,
  // so an article here would produce `l'l'après-midi`.
  'world.daypart.dawn': 'Aube',
  'world.daypart.morning': 'Matin',
  'world.daypart.midday': 'Midi',
  'world.daypart.afternoon': 'Après-midi',
  'world.daypart.evening': 'Soir',
  'world.daypart.night': 'Nuit',
  /** 0h–5h. `Pleine nuit` is the dead of night; `Petit matin` would be dawn. */
  'world.daypart.late_night': 'Pleine nuit',

  'world.dc.routine': 'Routine',
  'world.dc.easy': 'Facile',
  'world.dc.moderate': 'Modéré',
  'world.dc.hard': 'Difficile',
  'world.dc.very_hard': 'Très difficile',
  'world.dc.exceptional': 'Exceptionnel',
  'world.dc.nearly_impossible': 'Quasi impossible',

  'world.outcome.critical_success': 'Réussite critique',
  'world.outcome.clean_success': 'Réussite nette',
  'world.outcome.success': 'Réussite',
  /** `Réussite coûteuse`, not `Réussite avec un coût` — the calque is longer and reads translated. */
  'world.outcome.success_with_cost': 'Réussite coûteuse',
  'world.outcome.failure': 'Échec',
  'world.outcome.complication': 'Complication',

  // The French RPG ladder, which is a real and established one.
  'world.proficiency.untrained': 'Novice',
  'world.proficiency.familiar': 'Initié',
  'world.proficiency.trained': 'Confirmé',
  'world.proficiency.expert': 'Expert',
  'world.proficiency.master': 'Maître',
  'world.proficiency.legendary': 'Légendaire',

  // Les six attributs. Lus à voix haute par VoiceOver sur la fiche du monde,
  // donc la deuxième phrase compte autant que la première.
  'world.attr.might.name': 'Force',
  'world.attr.might.plain':
    'Puissance physique, endurance, force brute. Enfoncer une porte, tenir une ligne.',
  'world.attr.agility.name': 'Agilité',
  'world.attr.agility.plain':
    'Vitesse, précision, réflexes. Se déplacer sans bruit, vite, sans être vu.',
  'world.attr.mind.name': 'Esprit',
  'world.attr.mind.plain':
    'Analyse, mémoire, savoir technique. Remarquer ce qui manque à une page.',
  'world.attr.presence.name': 'Présence',
  'world.attr.presence.plain':
    'Persuasion, autorité, prestance. Être cru, ou être craint.',
  'world.attr.resolve.name': 'Volonté',
  'world.attr.resolve.plain':
    'Sang-froid et détermination. Ne pas broncher au moment où ça compte.',
  /** Nom pluriel en français : `les Arcanes`. */
  'world.attr.arcana.name': 'Arcanes',
  'world.attr.arcana.plain':
    'Sensibilité à l’extraordinaire. Lire une protection, la faire plier.',

  // Nouns throughout — see the note at the top of this file.
  'world.relationship.afraid': 'Crainte',
  'world.relationship.rival': 'Rivalité',
  /** `Hostile` happens to be invariable in French, so it stays an adjective. */
  'world.relationship.hostile': 'Hostile',
  'world.relationship.devoted': 'Dévouement',
  /** `Proche` is invariable. */
  'world.relationship.close': 'Proche',
  'world.relationship.trusted': 'Confiance',
  /** The register French actually uses for this state, and invariable. */
  'world.relationship.complicated': 'C’est compliqué',
  'world.relationship.respected': 'Respect',
  'world.relationship.competitive': 'Compétition',
  'world.relationship.warm': 'Sympathie',
  'world.relationship.familiar': 'Familiarité',
  'world.relationship.wary': 'Sur ses gardes',
} as const;
