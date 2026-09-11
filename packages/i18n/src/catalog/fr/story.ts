/**
 * ST-01 La fiche d’un monde — la page qui transforme la curiosité en premier tour.
 *
 * Deux des trois **valeurs** de statistique de cet écran viennent du serveur et
 * ne sont pas de la copie : `Format` affiche `stats.medianDepthLabel` et
 * `Intensité` affiche une énumération serveur. Seules les étiquettes sont ici,
 * et les valeurs restent anglaises tant que l’étape 4 n’est pas faite
 * (UI_AUDIT §5). Un joueur français lira donc `Format : Episodic` en attendant.
 *
 * Sentence case partout. Les libellés d’accessibilité prennent l’infinitif, la
 * voix des étiquettes, parce qu’ils sont lus dans la foulée du chrome VoiceOver
 * d’Apple, qui dit `vous` (PRODUCT_VOICE règle 1, la couture système). Tout ce
 * que le joueur lit à l’écran, lui, dit `tu`.
 */
export const story = {
  // Les quatre actions d’en-tête sont des libellés d’accessibilité posés sur
  // des boutons sans texte : lus, jamais vus, et donc les plus faciles à
  // oublier (UI_AUDIT §2.10).
  'story.back': 'Retour',
  /**
   * Enregistrer-dans-la-bibliothèque, exactement comme `discover.save`. Jamais
   * `Sauver`, qui veut dire tirer quelqu’un d’un danger. C’est l’étoile quand
   * l’histoire n’est **pas** enregistrée.
   */
  'story.save_story': 'Enregistrer l’histoire',
  /**
   * Le même bouton une fois l’histoire enregistrée : on défait l’état. `Ne plus
   * enregistrer` est la tournure qu’Apple emploie en français pour désactiver
   * un état (`Ne plus recopier`), elle garde le verbe figé `enregistrer` pour
   * que les deux états se lisent comme un seul interrupteur, et elle ne
   * s’accorde avec rien. `Retirer des enregistrements` était l’autre voie, et
   * c’est du vocabulaire de gestionnaire de fichiers.
   */
  'story.remove_from_saved': 'Ne plus enregistrer',
  /** Signalement d’abus. `Signaler`, jamais `Rapporter`. */
  'story.report_story': 'Signaler cette histoire',

  /**
   * Un monde publié par Plotbreak. Le masculin s’accorde avec `le monde`, qui
   * est le mot du produit pour ce que la puce étiquette — pas avec
   * `l’histoire`, qui donnerait `Officielle` sur le même composant.
   */
  'story.badge_official': 'Officiel',
  /** Un monde publié par un joueur. Un nom : rien à accorder, dans aucun sens. */
  'story.badge_community': 'Communauté',
  /** Signature sous le titre. Fragment, donc minuscule, comme l’anglais. */
  'story.by_creator': 'par {name}',

  /**
   * Les deux états d’un même bouton pleine largeur, donc la même grammaire :
   * impératif, tu, l’élan de la règle 2. `Continue l’histoire.` est l’exemple
   * que donne PRODUCT_VOICE règle 1 elle-même. Un `Continue` seul serait du
   * français correct mais il s’écrit comme le mot anglais, ce qui est exactement
   * l’effet à ne pas produire sur la vitrine — et les deux formes retenues font
   * la même longueur, ce qui compte pour un bouton qui change de texte sur
   * place.
   */
  'story.continue': 'Continue l’histoire',
  'story.start': 'Commence l’histoire',

  /**
   * Combien de personnes ont joué ce monde. ⚠️ Côté anglais, l’étiquette dit
   * `Players` mais la valeur rendue est `detail.stats.runs`, c’est-à-dire des
   * parties (StoryDetail.tsx:186). Le français reprend l’étiquette telle
   * qu’elle est décidée en anglais ; si l’anglais tranche pour la vérité du
   * chiffre, ce sera `Parties`.
   */
  'story.stat_players': 'Joueurs',
  /**
   * `Shape` — l’ambiguïté nommée dans UI_AUDIT §3, et la seule étiquette de ce
   * fichier qui ne se règle pas avec un mot.
   *
   * Ce que la statistique dit vraiment se lit dans sa valeur : le serveur écrit
   * `Open-ended` ou `Episodic` (`services/api/src/projections.ts:140`). Elle ne
   * parle donc pas d’une forme, elle répond à une question — est-ce que ça se
   * termine ou est-ce que ça continue, comment ce monde est bâti. En français,
   * cette question-là est une question de **format** : c’est le mot que les
   * médias français emploient déjà pour cette distinction exacte (une série au
   * format épisodique, un récit ouvert), il se comprend sans glose, et il fait
   * six caractères — les trois statistiques partagent une seule `Row` en
   * `space-between` (StoryDetail.tsx:184-190), à côté de `Joueurs` et
   * `Intensité`.
   *
   * Écartés, et pourquoi :
   * - `Forme` — le calque, et en français `être en forme` parle du corps.
   * - `Structure` — juste, mais c’est le vocabulaire de l’analyse littéraire
   *   sur une vitrine, et neuf caractères dans une rangée de trois.
   * - `Trame` — la trame, c’est l’histoire elle-même, pas sa façon d’être bâtie.
   * - `Déroulé` — registre du compte rendu de réunion.
   *
   * À valider avec le produit, comme le demande UI_AUDIT §3, et à revoir si la
   * valeur serveur change de nature.
   */
  'story.stat_shape': 'Format',
  /**
   * Étiquette au-dessus d’une valeur serveur, que le client passe en Title Case
   * (`titleCase()`, StoryDetail.tsx:188) — une casse anglaise appliquée à un mot
   * français. À reprendre avec la valeur elle-même, à l’étape 4.
   */
  'story.stat_intensity': 'Intensité',

  'story.mechanics_heading': 'Ce que tu peux faire ici',
  /**
   * Le titre est posé sur 200 mots et plus. `Le pitch` promettrait trois
   * phrases. Et `Prémisse` est un faux ami : en français c’est le terme de
   * logique, la proposition d’un syllogisme, pas le début d’une histoire.
   */
  'story.premise_heading': 'Le point de départ',
  'story.cast_heading': 'Qui tu vas rencontrer',
  /** Lu sur un portrait. Infinitif. `{role}` est la fonction du personnage dans l’histoire. */
  'story.cast_a11y': '{name}, {role}. Toucher pour en savoir plus.',
  /**
   * Vu à l’écran, celui-là, sous un portrait sans texte. `Apprendre plus` est
   * le calque ; la formule française existe déjà et c’est `En savoir plus`. Le
   * geste n’a pas besoin d’être nommé : le français ne dit pas « touche pour ».
   */
  'story.cast_tap_for_more': 'En savoir plus',
  /** Titre au-dessus des descripteurs. C’est aussi le mot que PEGI FR emploie. */
  'story.content_heading': 'Contenu',
  /**
   * Capitales dans la chaîne, accents compris. `Note d’intention` est le mot
   * français pour ce qu’un auteur écrit à propos de son œuvre — cinéma,
   * théâtre, jeu — et il ne genre personne, là où `Le mot du créateur`
   * choisirait le masculin pour tous les créateurs du catalogue.
   */
  'story.creator_note_heading': 'NOTE D’INTENTION',
  'story.related_heading': 'Mondes similaires',

  /** Ferme la fiche des personnages : le bouton et le libellé du voile. */
  'story.close': 'Fermer',

  /* ---------------------------------------------------------------------- */
  /* Les descripteurs de contenu                                            */
  /* ---------------------------------------------------------------------- */
  /**
   * Une surface de classification française, montrée avant d’entrer — pas de la
   * copie marketing.
   *
   * Les neuf libellés ci-dessous sont repris **mot pour mot** de la colonne
   * fr-FR de `UI_AUDIT.md` §4, qui a été relue contre les descripteurs de PEGI
   * FR. Ce n’est pas un choix de traducteur et cela ne se retouche pas sans
   * cette relecture. Les clés d’énumération (`FANTASY_VIOLENCE`, `LANGUAGE`…)
   * restent anglaises : ce sont des identifiants sur le fil, pas du texte.
   */
  'story.descriptor_fantasy_violence': 'Violence fantastique',
  'story.descriptor_romance': 'Romance',
  'story.descriptor_suggestive_themes': 'Sous-entendus sexuels',
  'story.descriptor_horror': 'Horreur',
  'story.descriptor_psychological_themes': 'Thèmes psychologiques',
  'story.descriptor_alcohol_references': 'Références à l’alcool',
  /**
   * Le descripteur `LANGUAGE` : les gros mots, pas la langue du monde. PEGI FR
   * dit « Grossièreté de langage », donc `Langage grossier`. `Langage fort` est
   * un calque et serait faux sur une surface de classification.
   */
  'story.descriptor_strong_language': 'Langage grossier',
  /** Une mort qu’on ne recharge pas. */
  'story.descriptor_permanent_death': 'Mort définitive',
  'story.descriptor_moral_ambiguity': 'Ambiguïté morale',
  /* -- Rejouer, parties, et la couche sociale -- */

  /**
   * `Nouvelle partie` — le mot français pour une session de jeu.
   *
   * Pas `Nouvelle session` : `session` en français, c'est une session
   * d'examens ou une session parlementaire. Une partie, c'est ce qu'on joue.
   */
  'story.new_session': 'Nouvelle partie',
  'story.sessions_heading': 'Tes parties',
  'story.session_line': '{count, plural, one {# tour} other {# tours}} · {date}',
  'story.session_line_where': '{count, plural, one {# tour} other {# tours}} · {where} · {date}',
  'story.session_resume': 'Reprendre',
  'story.session_status_completed': 'Terminée',
  'story.session_latest': 'La plus récente',

  /**
   * `J'aime` est invariable et ne s'accorde jamais. Le bouton actif dit
   * `Aimé`, participe, parce qu'il décrit un état et non l'action.
   */
  'story.like': 'J’aime',
  'story.unlike': 'Aimé',
  'story.likes_count': '{formatted}',
  'story.comments_heading': 'Commentaires',
  'story.comments_count': '{formatted}',
  'story.comments_empty': 'Rien pour l’instant. Lance-toi.',
  'story.comment_placeholder': 'Tu en as pensé quoi\u202f?',
  'story.comment_post': 'Publier',
  'story.comment_spoiler_toggle': 'Marquer comme spoiler',
  'story.comment_spoiler_hidden': 'Spoiler — appuie pour lire',
  'story.comment_delete': 'Supprimer',
  'story.comment_report': 'Signaler',
  'story.comment_sort_top': 'Top',
  'story.comment_sort_new': 'Récents',
  'story.comment_sign_in': 'Connecte-toi pour participer.',
  'story.comment_rate_limited':
    'Ça fait beaucoup de commentaires en une heure. Réessaie dans un moment.',
  /**
   * L’ancienneté d’un commentaire. Voir `en/story.ts` : ces clés remplacent un
   * `Intl.RelativeTimeFormat` qui faisait planter l’application.
   *
   * `one` couvre le zéro en français, d’où la même forme dans les deux
   * branches. `sem.` et `mois` s’abrègent ainsi ; `an` prend un `s` au pluriel,
   * ce que la branche `other` porte.
   */
  'story.posted_now': 'à l’instant',
  'story.posted_minutes': '{count, plural, one {il y a {count} min} other {il y a {count} min}}',
  'story.posted_hours': '{count, plural, one {il y a {count} h} other {il y a {count} h}}',
  'story.posted_days': '{count, plural, one {il y a {count} j} other {il y a {count} j}}',
  'story.posted_weeks': '{count, plural, one {il y a {count} sem.} other {il y a {count} sem.}}',
  'story.posted_months': '{count, plural, one {il y a {count} mois} other {il y a {count} mois}}',
  'story.posted_years': '{count, plural, one {il y a {count} an} other {il y a {count} ans}}',
  /**
   * Les deux statistiques dérivées d’une fiche. Voir `en/story.ts`.
   *
   * `Ouvert` plutôt que `Sans fin` : la partie a des fins, c’est la forme qui
   * n’est pas découpée en épisodes.
   */
  'story.shape_open_ended': 'Ouvert',
  'story.shape_episodic': 'Épisodique',
  'story.intensity_light': 'Léger',
  'story.intensity_moderate': 'Modéré',
  'story.intensity_intense': 'Intense',
  /** L’étagère de commentaires et son entrée. « j’aime » est invariable. */
  'story.comments_see_all': 'Voir les {count}',
  'story.comment_likes': '{count, plural, one {# j’aime} other {# j’aime}}',
} as const;
