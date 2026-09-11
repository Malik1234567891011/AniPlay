/**
 * Ce dont un personnage se souvient.
 *
 * The one part of the French catalogue that is not about what the player reads
 * on a screen. These sentences go into the **writer's context window**, every
 * turn, and they accumulate — so an English one here is not a cosmetic problem,
 * it is a standing invitation to language drift that gets stronger the longer
 * the session runs (`LOCALIZATION_ARCHITECTURE.md` §7).
 *
 * Written rather than translated, and in the register a French narrator would
 * use about a person: `s'en est pris à`, not a calque of "attacked".
 *
 * ## The gender problem, and what is done about it
 *
 * `{actor}` and `{target}` are names, and a French past participle after
 * `avoir` does not agree with the subject — `Malik a menti à Kaia`, `Élodie a
 * menti à Kaia`, both correct with no agreement. **Every verb here is chosen to
 * be in a tense that does not need to know anybody's gender**, which is the
 * same avoidance strategy `PLAYER_GRAMMAR.md` rule 4 asks for and the reason
 * these read as ordinary French rather than as a form.
 */
export const memory = {
  'memory.attack': '{actor} a agressé {target} à {location}, {time}.',
  /**
   * `mentir à`, `s'opposer à`, `rabaisser` — the verb is an id and the French
   * is written for each, not translated from the English gloss.
   * `menacé et rabaissé` keeps the two-verb shape the English has, because the
   * doubling is what makes it a remembered slight rather than a note.
   */
  'memory.hostile_act':
    '{actor} {verb, select, threaten {a menacé et rabaissé} deceive {a menti à} oppose {a tenu tête à} other {s’en est pris à}} {target} à {location}, {time}.',
  'memory.witnessed_violence': '{witness} a vu {actor} en agresser un autre à {location}.',
  'memory.notable_moment': '{label} — {outcome}',

  'memory.sentence': '{subject} {phrase}.',
  'memory.sentence_no': '{subject} {phrase} : non.',
  'memory.sentence_value': '{subject} {phrase} : {value}',
  /** Le joueur, quand son nom est inconnu. */
  'memory.you': 'Toi',

  // Les prédicats, en mots. Sujet + prédicat forment une phrase, donc ce sont
  // des groupes verbaux et non des étiquettes.
  'memory.predicate.notable_moment': 'moment marquant',
  'memory.predicate.was_attacked_by_player': 'a été agressé par le joueur',
  'memory.predicate.was_treated_badly_by_player': 'a été maltraité par le joueur',
  'memory.predicate.witnessed_violence': 'a vu de la violence',
  'memory.predicate.warmed_toward_player': 's’est rapproché du joueur',
  'memory.predicate.cooled_toward_player': 's’est éloigné du joueur',
  'memory.predicate.route_taken': 'chemin emprunté',
  'memory.predicate.quest_state': 'état de la quête',
  'memory.predicate.discovered_location': 'lieu découvert',
} as const;
