/**
 * Le français du design system — `packages/ui/src/components.tsx`.
 *
 * **Most of this file is never seen.** It is read aloud by VoiceOver, which is
 * why it is the easiest French in the app to get wrong: nobody looking at a
 * screenshot can catch it, and a label that keeps the English word order is
 * still perfectly legible as text while being unlistenable as speech.
 *
 * So these are written as **spoken French**, not as labels with French words in
 * English positions. `Play {speaker}'s line` is rebuilt around a French
 * genitive rather than carrying an apostrophe-s across; `{name}: {current} of
 * {max}` becomes `{name} : {current} sur {max}`, because `sur` is how a French
 * speaker reads a ratio out loud.
 *
 * ## Register
 *
 * Anything ending in `_a11y` sits directly against VoiceOver chrome, which
 * Apple ships in `vous` and which we cannot change. `PRODUCT_VOICE.md` rule 1's
 * system-seam clause applies: **the neutral infinitive, not `tu` and never
 * `vous`** — `Ouvrir le portefeuille`, `Modifier cette réponse`. Visible
 * microcopy on the same screen (`ui.send_response_hint`) keeps `tu`, because it
 * is ours and not Apple's.
 *
 * ## The one thing a flat string cannot do
 *
 * Three keys here want `de` + a name, and French elides it: `d’Élodie`, never
 * `de Élodie`. ICU cannot express that — there is no rule that inspects the
 * first letter of an argument. Where the string is **visible** and the name is
 * player-chosen (`ui.by_creator`), the French is rebuilt around a preposition
 * that never elides. Where it is VoiceOver-only, the note is left in place.
 */
export const ui = {
  /**
   * `{formatted}` is already grouped by `formatCredits`, so the French thousands
   * separator arrives with it and must not be touched here.
   *
   * `partie`, never `run` and never `course` — `PRODUCT_VOICE.md` § Terminology
   * lock. The ICU `one` branch covers **zero as well as one** in French, which
   * is the whole reason this key replaced a ternary: `0 partie`, `1 partie`,
   * `2 parties`.
   */
  'ui.story_runs': '{formatted} {count, plural, one {partie} other {parties}}',
  /**
   * `par`, not `de`.
   *
   * The English note asks for `de` and names the reason it cannot work in the
   * same breath: it elides, `d’Élodie`. A flat ICU string cannot look at the
   * first letter of `{name}`, so `de {name}` would ship `de Élodie` on every
   * card by a creator with a vowel-initial display name — and display names are
   * exactly where vowel-initial French first names live.
   *
   * `par` never elides and never contracts, and it is what French reading
   * platforms already print under a title (WEBTOON FR, Wattpad FR). This is a
   * rebuild, not a dodge: the elision is an architecture problem and it is in
   * the report.
   */
  'ui.by_creator': 'par {name}',
  /** Lu à voix haute sur une carte de monde, pour dire laquelle des deux sortes c’est. */
  'ui.official_world': 'Monde officiel',
  'ui.community_world': 'Monde communautaire',
  /**
   * Badge sur une carte, pas un en-tête de rail. Singulier, donc : `rail.trending`
   * (`Trending now`) est la section et devient `Tendances`, celui-ci qualifie un
   * monde et devient `Tendance`.
   */
  'ui.trending': 'Tendance',

  /**
   * Le portrait, lu à voix haute. La valeur anglaise est le nom seul et rien
   * d’autre : y ajouter `Portrait de` serait exactement l’ajout que
   * `LANGUAGE_BIBLE.md` partie 0 interdit. Le vrai label `Portrait de {name}`
   * existe, il est dans `characters.portrait_a11y`.
   */
  'ui.portrait_a11y': '{name}',
  'ui.portrait_with_expression_a11y': '{name}, {expression}',
  /** Une réplique, lue à voix haute. Espace insécable avant le deux-points. */
  'ui.speaker_says_a11y': '{speaker} dit : {text}',
  /**
   * `Play` = écouter une voix générée, donc `Écouter`, jamais `Jouer`.
   *
   * `réplique` est le mot français d’une ligne de dialogue. Le génitif anglais
   * est reconstruit — `la réplique de {speaker}` — et non calqué. Reste le
   * risque d’élision devant `Ayame` ; c’est du VoiceOver seul, et c’est signalé.
   */
  /**
   * `Écouter {speaker} : sa réplique` rather than `la réplique de {speaker}`.
   *
   * `de {speaker}` renders `de Élodie` for every vowel-initial name, and ICU
   * cannot look at an argument's first letter to decide. `elide()` exists in
   * `@aniplay/i18n` for the cases that cannot be restructured, but
   * `PLAYER_GRAMMAR.md` rule 6 prefers a sentence shape that never needs it —
   * a message assembled from fragments cannot be reordered by a translator.
   */
  'ui.play_line_a11y': 'Écouter {speaker} : sa réplique',

  /**
   * `Lire la suite`, jamais `Lire plus` — calque, `ENGLISH_CALQUE_BLACKLIST.md`
   * §5. Le pendant d’un `Lire la suite` français est `Réduire`, pas
   * `Lire moins` : c’est ce que fait le geste, pas l’inverse littéral du verbe.
   *
   * ⚠️ Le pli est mesuré en **mots** (90) et le français porte le même contenu
   * en ~1,11× les mots, donc le pli français cache environ 10 % de scène en
   * plus et coupe ailleurs. Traduire cette chaîne ne répare rien. UI_AUDIT §2.5.
   */
  'ui.read_more': 'Lire la suite',
  'ui.read_less': 'Réduire',

  /** Plus de changements d’état que la ligne ne peut en montrer. Zéro est singulier. */
  'ui.more_changes': '{count, plural, one {# autre changement} other {# autres changements}}',

  'ui.edit_response_a11y': 'Modifier cette réponse avant de l’envoyer',
  /**
   * Micro-copie visible, pas un label VoiceOver : donc `tu`, à l’impératif,
   * comme le reste de la surface de jeu. `ça`, jamais `ceci` ni `cela`
   * (`ENGLISH_CALQUE_BLACKLIST.md` §2).
   */
  'ui.send_response_hint': 'Envoie ça comme ton action.',

  /** La pastille de qualité, lue à voix haute. `{label}` est le nom du palier. */
  'ui.quality_a11y': 'Qualité : {label}, {cost} crédits',
  /** `Not enough…` → `Crédits insuffisants.`, la forme standard. Pas de point final en anglais, donc pas ici. */
  'ui.quality_a11y_short': 'Qualité : {label}, {cost} crédits. Crédits insuffisants',

  /**
   * `Test : {label}` et non `Test de {label}`.
   *
   * Trois des six attributs commencent par une voyelle — `Agilité`, `Esprit`,
   * `Arcanes` — et `de` s’élide devant elles. `Test de Agilité` est une faute,
   * et une chaîne plate ne peut pas produire `d’Agilité`. Le deux-points garde
   * l’apposition, se lit correctement à voix haute (VoiceOver marque une pause)
   * et ne peut pas se tromper d’attribut.
   */
  'ui.check_a11y': 'Test : {label}',
  'ui.check_result_a11y': 'Résultat : {outcome}.',

  'ui.current_objective_a11y': 'Objectif en cours : {objective}',
  /** `{balance}` arrive déjà formaté. Infinitif : on est contre la chrome VoiceOver. */
  'ui.credit_balance_a11y': '{balance} crédits. Ouvrir le portefeuille.',
  /** Une jauge, lue à voix haute : `Énergie : 7 sur 10`. `sur`, comme on lit un rapport en français. */
  'ui.meter_a11y': '{name} : {current} sur {max}',
} as const;
