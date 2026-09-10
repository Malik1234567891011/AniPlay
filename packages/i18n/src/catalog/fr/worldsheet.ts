/**
 * La fiche du monde — sept onglets et l'inspecteur du canon.
 *
 * Written against `en/worldsheet.ts` and its localizer comments, not against
 * the English words. Four decisions are load-bearing enough to state here.
 *
 * ## 1. The tab strip is the constraint, and it is real
 *
 * Seven labels in one row (`UI_AUDIT.md` §2.6 measured French inflation on
 * exactly these). Each label below is the shortest *true* French word, not the
 * most complete one:
 *
 * | EN | fr | chars |
 * | --- | --- | ---: |
 * | Overview | `Aperçu` | 8 → 6 |
 * | Character | `Personnage` | 9 → 10 |
 * | Inventory | `Inventaire` | 9 → 10 |
 * | Quests | `Quêtes` | 6 → 6 |
 * | People | `Relations` | 6 → 9 |
 * | Map | `Carte` | 3 → 5 |
 * | Timeline | `Chronologie` | 8 → 11 |
 *
 * `Chronologie` is the widest and there is no honest way out of it:
 * `Historique` saves one character and means *log*, and `Fil` is already the
 * transcript (`TERMINOLOGY.md` §3.1). **Physically check this strip on a small
 * device.** `Personnage` and `Inventaire` have the same problem and the same
 * answer — `Perso` is slang (`PRODUCT_VOICE.md` terminology lock) and `Sac`
 * is a bag, not an inventory.
 *
 * ## 2. Case is not a translation choice here
 *
 * The four Overview headers are stored upper-case and rendered exactly as
 * stored, so they stay upper-case — a category-header style
 * `PRODUCT_VOICE.md` rule 3 allows — with the accented capitals French
 * requires (`RÉCEMMENT`, `PENSÉES`). The four quest group headers are stored
 * sentence case and `.toUpperCase()`d by the screen
 * (`WorldSheet.tsx:412`), so they are stored sentence case here too and
 * survive the uppercasing with their accents (`Terminées` → `TERMINÉES`).
 * The five relationship dimensions are stored lower-case in the source and
 * rendered as stored; they stay lower-case.
 *
 * ## 3. Nothing agrees with a gender the data does not carry
 *
 * `world.ts` chose invariable state nouns over adjectives because
 * `CharacterDef` carries no gender. The same problem turns up here three
 * times. Twice it is solved: `Rang inconnu` rather than a bare
 * `Inconnu`/`Inconnue` that would have to agree with whichever noun the screen
 * puts beside it, and `Recharge` rather than `Prêt`/`Prête`. The third,
 * `worldsheet.equipped`, is not — see the note there.
 *
 * ## 4. Two glyph-led strings became glyph-trailed
 *
 * `pin_action` and `pinned_canon_star` carry `☆`/`★` inside the value. A
 * leading glyph makes the first French word look like a mid-string capital to
 * `fr-lint`'s sentence-case rule (FRC002), which has no suppression in
 * `--catalog` mode, so `☆ Épingler` cannot ship. The state glyph moved to the
 * trailing edge instead of the label losing its capital: these render as
 * inline caption actions (`WorldSheet.tsx:724`) next to `C’est faux` and
 * `Partager`, and a trailing state marker is the ordinary iOS shape for that
 * row. This is a linter blind spot, not a fact about French: FRC002 should
 * skip a leading non-letter token, and if it ever does, `☆ Épingler` is the
 * better string and should come back.
 *
 * Escapes rather than literal characters for U+00A0 and U+202F, for the reason
 * `world.ts` gives: an invisible space is invisible in a diff, and it is
 * exactly the codepoint someone "cleans up". `translate()` folds U+202F to
 * U+00A0 on the way out.
 */
export const worldsheet = {
  'worldsheet.title': 'Fiche du monde',
  /** Infinitive: this control sits against system chrome. `PRODUCT_VOICE.md` rule 2. */
  'worldsheet.close': 'Fermer',

  /* -- La barre d'onglets (WS-01…WS-07). Voir la note 1 en tête de fichier. -- */
  'worldsheet.tab_overview': 'Aperçu',
  'worldsheet.tab_character': 'Personnage',
  'worldsheet.tab_inventory': 'Inventaire',
  'worldsheet.tab_quests': 'Quêtes',
  /**
   * `Relations`, not `Personnes`. Two reasons, and the second one decides it:
   * WS-05 *is* the relationships tab, and `Personnes` would sit two tabs away
   * from `Personnage` in a seven-across strip — a near-collision English never
   * has. Same width as `Personnes` (9), and it matches the `world.relationship.*`
   * ladder the player reads inside the tab.
   */
  'worldsheet.tab_people': 'Relations',
  'worldsheet.tab_map': 'Carte',
  /** The widest label in the strip, 11 against `Timeline`'s 8. See note 1. */
  'worldsheet.tab_timeline': 'Chronologie',

  /* -- WS-01 Aperçu. En capitales, rendu tel quel : quatre en-têtes de
        rubrique, jamais des boutons. -- */
  'worldsheet.current_objective': 'OBJECTIF EN COURS',
  'worldsheet.active_effects': 'EFFETS ACTIFS',
  /**
   * Not a translation of "who's on your mind" — French has no short form of
   * that question that works as a header. `DANS TES PENSÉES` is the French
   * header for the same idea: the people you have been dealing with lately.
   */
  'worldsheet.relationship_highlights': 'DANS TES PENSÉES',
  /** Adverbe, comme en anglais — pas `NOUVEAUTÉS`, qui serait un nom. */
  'worldsheet.recently': 'RÉCEMMENT',
  /** Ponctuation seule : rien à écrire en français. */
  'worldsheet.recent_event': '· {event}',
  /** Idem — le nom, puis l'étiquette de relation, qui arrive déjà en français. */
  'worldsheet.highlight': '{name} · {label}',

  /* -- WS-02 Personnage -- */
  'worldsheet.level': 'Niveau {level}',
  /** `étape` (`TERMINOLOGY.md` §3.1), jamais `jalon`. Zéro est singulier. */
  'worldsheet.milestones': '{count, plural, one {# étape} other {# étapes}}',
  /**
   * 16 characters against `Attributes`' 10, and it is still the right word:
   * `Attributs` is a data-model word in French, `Caractéristiques` is what a
   * French RPG sheet says. It heads a section, not a chip, so the width is
   * affordable — unlike in the tab strip.
   */
  'worldsheet.attributes': 'Caractéristiques',
  /** Ponctuation et variables. Les trois valeurs arrivent en français de `world.ts`. */
  'worldsheet.attribute_a11y': '{name}, {value}. {plain}',
  'worldsheet.skills': 'Compétences',
  /** `Pouvoirs`, jamais `Puissances` — `puissance` est une quantité, pas une capacité. */
  'worldsheet.powers': 'Pouvoirs',
  /**
   * `Recharge`, not `Récupération`: in French `récupération` is what a body
   * does after an injury, which is precisely the reading the English comment
   * rules out. `Recharge` is the frozen French game term for a cooldown, it is
   * a noun so it agrees with nothing, and it is half the length.
   * U+202F before `min`, like `world.duration_minutes`.
   */
  'worldsheet.cooldown': 'Recharge — {minutes}\u202Fmin',
  /** Réputation dans une faction, pas une posture. `TERMINOLOGY.md` §3.1. */
  'worldsheet.standing': 'Réputation',
  /**
   * The noun is named on purpose. A bare `Inconnu` has to agree with whatever
   * the screen renders it beside — `le rang` (m) or `la réputation` (f) — and
   * would be wrong half the time. Naming `rang` fixes the agreement and also
   * kills the "unknown faction" reading the English comment warns about.
   */
  'worldsheet.rank_unknown': 'Rang inconnu',

  /* -- WS-03 Inventaire -- */
  /** « Rien sur toi » : ce que tu portes, pas ton état. Le calque `Rien de mal` dirait l'inverse. */
  'worldsheet.inventory_empty_title': 'Rien sur toi',
  /** `Tout ce que`, jamais `n'importe quoi` — qui veut dire « des bêtises ». */
  'worldsheet.inventory_empty_body': 'Tout ce que tu ramasses dans l’histoire atterrit ici.',
  /**
   * ⚠️ The one unresolved agreement in this file. `Équipé` is correct on
   * `un sabre` and wrong on `une épée`, and the item record carries no gender —
   * the same gap `TERMINOLOGY.md` §3.4 leaves open for relationship labels.
   * The invariable escape hatches all lose the meaning (`Sur toi` covers worn
   * but not wielded, `En main` the reverse), and `Équipé·e` is banned outright.
   * Shipping the masculine and flagging it: this needs an item gender, not a
   * better word.
   */
  'worldsheet.equipped': 'Équipé',

  /* -- WS-04 Quêtes. Les quatre en-têtes sont passés en capitales par l'écran,
        donc ils sont stockés en minuscules et s'accordent avec « quêtes ». -- */
  'worldsheet.quests_active': 'En cours',
  /** Pistes d'enquête. Ni la direction, ni le premier rôle. */
  'worldsheet.quests_leads': 'Pistes',
  /** `Terminées`, jamais `Complétées` — `compléter`, c'est ajouter à. */
  'worldsheet.quests_completed': 'Terminées',
  /** Une voie qui s'est refermée, pas un magasin qui ferme le soir. */
  'worldsheet.quests_closed': 'Fermées',
  'worldsheet.quests_empty_title': 'Pas encore d’objectifs',
  /**
   * « te lance sur une piste » is the French set phrase for being given
   * something to chase, and it lands on the same word as the `Pistes` group
   * above. A literal `quelque chose à poursuivre` is correct and reads like a
   * subtitle.
   */
  'worldsheet.quests_empty_body': 'Des objectifs apparaissent dès que l’histoire te lance sur une piste.',
  'worldsheet.quest_step': '❯ {step}',
  /**
   * Affirmative where the English is negative: `Pas encore clair` is a fine
   * sentence and a poor quest step. What the player needs to know is that the
   * next move has to be found, so the French says that.
   */
  'worldsheet.quest_step_unclear': '❯ La suite reste à trouver.',

  /* -- WS-05 Relations. Les cinq dimensions sont stockées en minuscules et
        rendues telles quelles. -- */
  'worldsheet.dimension_trust': 'confiance',
  /** Même mot dans les deux langues — traduit, pas oublié. */
  'worldsheet.dimension_affection': 'affection',
  /** Idem. */
  'worldsheet.dimension_respect': 'respect',
  /**
   * `peur` here, `Crainte` on the ladder (`world.relationship.afraid`). Not an
   * inconsistency: this is the name of the axis, which `TERMINOLOGY.md` §3.1
   * freezes as `la peur`, while the ladder needs a badge and `Crainte` is the
   * one that reads as a state rather than as an emotion in progress.
   */
  'worldsheet.dimension_fear': 'peur',
  /** Antagonisme sportif, pas hostilité ouverte — comme `world.relationship.rival`. */
  'worldsheet.dimension_rivalry': 'rivalité',
  /**
   * `Active` is the verb *switch on*, not a game turn — `Tour` here would be
   * the single worst mistranslation in the file, and the four `turn` keys
   * elsewhere in the catalogue are exactly what primes it.
   * `réglages` stays lower-case: French sentence case does not capitalise a
   * section name inside a sentence, and Apple's own French does not either.
   */
  'worldsheet.relationship_numbers_hint':
    'Active les statistiques de relation avancées dans les réglages pour voir les chiffres.',

  /* -- WS-06 Carte -- */
  /**
   * Nominal where the English is a clause, and it is not a stylistic choice:
   * `{place}` is either a place name (`Tu es à Saltmarket`) or the substituted
   * `un lieu inconnu` (`Tu es *dans* un lieu inconnu`), and no single French
   * preposition governs both. `Ta position : {place}` governs neither and
   * reads correctly with both. U+00A0 before the colon, as French requires.
   */
  'worldsheet.map_a11y':
    'Carte. Ta position\u00A0: {place}. {count, plural, one {# lieu découvert} other {# lieux découverts}}.',
  'worldsheet.map_unknown_place': 'un lieu inconnu',
  'worldsheet.map_you_are_here': 'Tu es ici',
  /** Légende : une quête attend sur ce lieu. La forme verbale porte l'attente mieux qu'un `Objectif`. */
  'worldsheet.map_has_objective': 'Un objectif t’attend',
  /**
   * Trois idées, trois propositions, aucune conjonction ajoutée — le « and »
   * anglais disparaît, comme le demande la liste des calques (tier 4).
   */
  'worldsheet.map_travel_hint':
    'Se déplacer est une action. Écris où tu veux aller, l’histoire s’occupe du trajet.',

  /* -- WS-07 / WS-08 Chronologie : l'inspecteur du canon -- */
  'worldsheet.timeline_empty_title': 'Encore rien d’enregistré',
  'worldsheet.timeline_empty_body': 'Tout ce qui entre dans le canon s’affiche ici.',
  /**
   * `Épingler` (`PRODUCT_VOICE.md` terminology lock), jamais `pinner` et
   * jamais `Garder` — le sens est « fixer au canon », pas « conserver ».
   * Glyphe en fin de chaîne : voir la note 4 en tête de fichier.
   */
  'worldsheet.pin_action': 'Épingler ☆',
  /** Le même contrôle une fois épinglé. `★` est l'étoile pleine. */
  'worldsheet.pinned_canon_star': 'Épinglé au canon ★',
  /** Le badge, sur un moment qu'on ne peut pas désépingler d'ici. */
  'worldsheet.pinned_canon': 'Épinglé au canon',
  'worldsheet.pin_a11y': 'Épingler ce moment\u00A0: {text}',
  /**
   * `Ne plus épingler`, la forme qu'iOS emploie en français, plutôt que
   * `Désépingler` : le verbe existe mais il s'entend comme un mot fabriqué, et
   * cette chaîne est lue à voix haute.
   */
  'worldsheet.unpin_a11y': 'Ne plus épingler\u00A0: {text}',
  'worldsheet.pinned_notice': 'Épinglé. L’histoire y reviendra.',
  /** Nom plutôt que participe : `Désépinglé` n'existe pas vraiment à l'oreille. */
  'worldsheet.unpinned_notice': 'Épingle retirée.',
  /** Forme d'erreur standard : « Impossible de… », jamais « … n'a pas pu être… ». */
  'worldsheet.pin_failed': 'Impossible d’épingler pour le moment.',
  /** Ouvre la boîte de correction : ce qui est écrit n'est pas ce qui s'est passé. */
  'worldsheet.this_is_wrong': 'C’est faux',
  'worldsheet.correct_a11y': 'C’est faux\u00A0: {text}',
  'worldsheet.cancel': 'Annuler',
  /**
   * La forme neutre et non marquée, celle que `PRODUCT_VOICE.md` §5 retient
   * pour `Qu’est-ce que tu fais ?`. L'inversion (`Que s’est-il passé ?`) est
   * impeccable et scolaire : interdite dans un produit qui parle à des ados.
   * U+202F avant le point d'interrogation.
   */
  'worldsheet.correction_placeholder': 'Qu’est-ce qui s’est vraiment passé\u202F?',
  /** La même question sans le point d'interrogation, volontairement. */
  'worldsheet.correction_a11y': 'Qu’est-ce qui s’est vraiment passé',
  /**
   * Infinitif, parce qu'il partage sa rangée avec `Annuler` et qu'on ne mêle
   * jamais deux registres dans un même groupe de boutons.
   */
  'worldsheet.fix_it': 'Corriger',
  /** `Vérification`, jamais `Contrôle` — `contrôler`, c'est inspecter. */
  'worldsheet.checking': 'Vérification…',
  'worldsheet.correction_accepted': 'Corrigé. C’est ce que l’histoire retient maintenant.',
  /** Actif : le français met le moteur en sujet plutôt que d'écrire un passif. */
  'worldsheet.correction_conflict': 'Ça contredit ce que le moteur a déjà décidé.',
  'worldsheet.correction_failed': 'Ça n’est pas passé. Rien n’a changé.',
  'worldsheet.correction_explainer':
    'Corriger ne coûte rien. Ça change ce que l’histoire retient, jamais ce que le moteur a décidé — une correction qui contredit le canon ne passe pas, et le refus dit pourquoi.',
  'worldsheet.share': 'Partager',
  'worldsheet.share_a11y': 'Partager\u00A0: {text}',
  /**
   * `bifurquer` partout (`PRODUCT_VOICE.md` terminology lock), jamais `forker`.
   * `Bifurquer ici` plutôt que `Bifurquer à partir d'ici` : c'est la forme
   * courte qui est française, et cette étiquette porte déjà son prix.
   * `· 120` n'est pas du texte.
   */
  'worldsheet.fork_from_here': 'Bifurquer ici · 120',
  'worldsheet.fork_a11y': 'Bifurquer la chronologie à partir de ce moment',
  /**
   * « Il te manque # crédit » — la forme française d'un manque, et zéro tombe
   * dans `one`, ce qui donne « Il te manque 0 crédit ». Pas de branche `=1`.
   */
  'worldsheet.fork_insufficient_credits':
    '{count, plural, one {Il te manque # crédit pour bifurquer ici.} other {Il te manque # crédits pour bifurquer ici.}}',
  /**
   * `Tu es hors connexion.` est la formule figée du produit. La suite évite
   * `reconnecté`, un participe qui devrait s'accorder avec le joueur.
   */
  'worldsheet.fork_offline': 'Tu es hors connexion. La bifurcation se fera dès que la connexion revient.',
  'worldsheet.fork_not_found': 'Cette partie n’est plus sur le serveur. Tu n’as rien payé.',
  /** Trois phrases courtes, sans « et » : le réflexe de liaison est un calque. */
  'worldsheet.fork_failed': 'La bifurcation n’est pas passée. Tu n’as rien payé. Réessaie dans un instant.',
  /**
   * `branche` est bien la branche de la chronologie — le faux ami serait
   * `succursale`. `reste intacte` plutôt que `n'est jamais détruite` : le
   * passif est proscrit, et la promesse est plus claire à l'endroit.
   */
  'worldsheet.fork_explainer': 'Bifurquer copie ce monde au moment choisi. La branche d’origine reste intacte.',
} as const;
