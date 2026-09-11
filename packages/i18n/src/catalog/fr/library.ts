/**
 * Le français de `library`. Écrit, pas traduit — voir PRODUCT_VOICE.md.
 *
 * Trois mots tiennent ce fichier, et ils ne bougent plus.
 *
 * **`run` → `une partie`.** Une partie jouée dans un monde. Ni `une course`,
 * ni `un run`, ni `un total` : `partie` est le mot qu'un joueur français
 * emploie déjà, il est féminin, et il est le même aux onze endroits où il
 * apparaît ici — le compteur, la fiche, la suppression, la confirmation.
 *
 * **`turn` → `un tour`.** Jamais `un virage`, jamais `un round`.
 *
 * **`save` → `enregistrer`.** Jamais `sauver`, qui veut dire *tirer d'un
 * danger* — dans un jeu où des personnages sont en danger, l'ambiguïté est
 * réelle et non théorique.
 *
 * Pour `fork`, voir `library.fork_badge` : le mot a été choisi ici et il
 * demande confirmation.
 *
 * Les flux destructifs (supprimer une partie, supprimer le compte, se
 * déconnecter) disent ce qui disparaît et ne l'adoucissent pas. Pas de
 * formule de politesse : elle transformerait un avertissement en excuse.
 */
export const library = {
  /** Une partie jouée dans un monde. Zéro est singulier en français : `0 partie`. */
  'library.runs': '{count, plural, one {# partie} other {# parties}}',
  /** Un tour de jeu — un échange. */
  'library.turns': '{count, plural, one {# tour} other {# tours}}',

  /* ---------------------------------------------------------------------- */
  /* L'étagère                                                              */
  /* ---------------------------------------------------------------------- */

  /** L'écran lui-même. Même mot que `nav.library` : l'étagère du joueur. */
  'library.title': 'Bibliothèque',
  /** Forme Microsoft FR : « Impossible de… », jamais « … n'a pas pu être chargée ». */
  'library.load_failed_title': 'Impossible de charger ta bibliothèque',
  'library.load_failed_body': 'Impossible de charger tes mondes pour le moment. Rien n’est perdu.',
  'library.offline':
    'Tu es hors connexion. Tes mondes ne risquent rien — ils sont sur le serveur, pas sur ce téléphone.',
  'library.try_again': 'Réessayer',
  /** État vide. `Pas encore de monde` est plus court et plus parlé qu'`Aucun monde pour le moment`. */
  'library.no_worlds_yet': 'Pas encore de monde',
  'library.no_worlds_body': 'Tout ce que tu commences apparaît ici, avec ta progression.',
  'library.browse_worlds': 'Parcourir les mondes',
  /** Capitales dans la chaîne, comme en anglais : c'est la chaîne qui crie, pas le style. */
  'library.section_active': 'EN COURS',
  /** Accord avec `les parties`, féminin pluriel. Capitale accentuée obligatoire : `É`. */
  'library.section_finished': 'TERMINÉES',

  /* ---------------------------------------------------------------------- */
  /* Une carte sur l'étagère                                                */
  /* ---------------------------------------------------------------------- */

  /**
   * Sous le titre d'une partie : le personnage que le joueur incarne.
   * `dans le rôle de` — la formule du générique, pas une comparaison et pas
   * `depuis`. C'est 2,4× l'anglais et il n'existe pas plus court d'honnête :
   * `en {name}` n'est pas du français et `{name}` seul perd l'information.
   */
  'library.playing_as': 'dans le rôle de {name}',
  /** La date arrive déjà formatée pour la locale. */
  'library.turns_and_date': '{count, plural, one {# tour} other {# tours}} · {date}',
  /**
   * La carte entière, lue par le lecteur d'écran. `Continuer.` à l'infinitif :
   * on est contre la chrome VoiceOver d'Apple, donc voix d'étiquette, pas de
   * personne (PRODUCT_VOICE, la couture système).
   */
  'library.session_card_a11y': '{title}, {count, plural, one {# tour} other {# tours}}. Continuer.',
  /**
   * ## `fork` → `bifurquer` / `une bifurcation`. **À faire confirmer.**
   *
   * TERMINOLOGY.md laisse le choix ouvert entre `Bifurquer` et
   * `Nouvelle branche`. Choisi ici : **la famille `bifurquer`**, aux trois
   * endroits (`library.fork_badge`, `library.fork_run`,
   * `library.fork_failed_title`).
   *
   * Pourquoi : c'est déjà le mot du verrou terminologique de PRODUCT_VOICE et
   * de TERMINOLOGY §3.1 ; c'est **un seul mot**, donc il tient dans un bouton
   * (`Bifurquer cette partie · 120 crédits`, les 36 signes mesurés en
   * UI_AUDIT §2.6) et dans un titre d'alerte, là où `Nouvelle branche` oblige
   * à écrire `créer une nouvelle branche` partout où il faut un verbe ; et il
   * donne un nom, `une bifurcation`, tiré de la même racine que le verbe,
   * ce que `Nouvelle branche` ne peut pas faire.
   *
   * Contre : `branche` est le mot que connaissent les développeurs. C'est
   * justement l'argument pour ne pas le prendre — le joueur n'est pas dans un
   * dépôt Git, il est à un embranchement de son histoire.
   *
   * Ce badge est un `Chip` : 11 signes contre 4. À regarder sur un petit
   * écran avant de figer.
   */
  'library.fork_badge': 'Bifurcation',
  /** Ouvre la fiche de gestion. Étiquette de lecteur d'écran sur le bouton `⋯`. */
  'library.manage_run': 'Gérer cette partie',

  /* ---------------------------------------------------------------------- */
  /* La fiche de gestion                                                    */
  /* ---------------------------------------------------------------------- */

  'library.close_sheet': 'Fermer',
  /** `commencée` s'accorde avec la partie, sous-entendue par le titre juste au-dessus. */
  'library.run_started': '{count, plural, one {# tour} other {# tours}} · commencée le {date}',
  /** Voir `library.fork_badge` pour le choix du mot. */
  'library.fork_run': 'Bifurquer cette partie · 120 crédits',
  'library.fork_failed_title': 'Impossible de bifurquer',
  'library.fork_failed_body': 'Il te faut peut-être plus de crédits.',
  /** Supprime une partie, pas un compte et pas un monde. */
  'library.delete_run': 'Supprimer la partie',
  /** Confirmation destructive : infinitif, comme `Supprimer le compte`. */
  'library.delete_confirm_title': 'Supprimer cette partie ?',
  /**
   * L'anglais met des guillemets droits autour du titre ; le français prend
   * les chevrons, avec une espace insécable à l'intérieur — U+00A0, invisible
   * dans un diff, et c'est exactement le caractère que quelqu'un « nettoie ».
   * `disparaîtront` évite tout participe, donc tout accord avec un titre dont
   * on ne connaît pas le genre.
   */
  'library.delete_confirm_body':
    '« {title} » et ses {count, plural, one {# tour} other {# tours}} disparaîtront. C’est définitif.',
  /** Le bouton d'annulation : « garde cette partie », pas « continue ». */
  'library.delete_keep': 'Garder la partie',
  'library.delete_confirm': 'Supprimer',

  /* ---------------------------------------------------------------------- */
  /* Le profil, ce qui n'est pas un réglage — stats, personnages, compte     */
  /* ---------------------------------------------------------------------- */

  'library.sign_out_confirm_body':
    'Tes mondes restent enregistrés sur ton compte. Reconnecte-toi sur n’importe quel appareil pour les retrouver.',
  /**
   * Le bouton d'annulation de la déconnexion.
   *
   * ⚠️ La seule chaîne de ce fichier qui s'accorde avec le joueur :
   * `connecté` / `connectée`. Gardée telle quelle parce que `Rester connecté`
   * est une formule figée de l'interface française — elle est sur tous les
   * écrans de connexion du pays et personne ne la lit comme un accord. Si
   * PLAYER_GRAMMAR règle 4 doit s'appliquer à la lettre, la forme d'évitement
   * est `Ne pas se déconnecter`, plus lourde et plus négative.
   */
  'library.sign_out_stay': 'Rester connecté',
  /** Étiquette de stat, passée en capitales par la mise en page. Court. */
  'library.stat_worlds': 'Mondes',
  'library.stat_turns': 'Tours',
  /**
   * Nombre de mondes créés par le joueur. L'anglais met un participe seul
   * (`Created`) entre deux noms ; en français une rangée de stats est une
   * rangée de noms, donc `Créations`. `Créés` serait plus court mais reste
   * suspendu à un antécédent que la rangée ne donne pas.
   */
  'library.stat_created': 'Créations',
  'library.your_characters': 'Tes personnages',
  'library.see_all': 'Voir tout',
  'library.character_in_story_a11y': '{name} dans {story}',
  /**
   * C'est l'app qui dessine, pas le joueur qui griffonne — donc `dessiner`,
   * jamais `tirer`. 21 signes contre 11 : si la vignette rogne, `Dessiner`
   * seul reste vrai, l'appui étant déjà porté par la vignette elle-même.
   */
  'library.tap_to_draw': 'Toucher pour dessiner',
  'library.delete_account': 'Supprimer le compte',
  'library.delete_account_confirm_title': 'Supprimer ton compte ?',
  /**
   * Pas de virgule avant `et` : le français n'a pas de virgule d'Oxford.
   * `Impossible de récupérer…` est la forme documentée pour « cannot ».
   */
  'library.delete_account_confirm_body':
    'Tes mondes, ta progression et tes histoires enregistrées disparaîtront. Impossible de récupérer les crédits achetés. C’est définitif.',
  'library.delete_account_keep': 'Garder mon compte',
  'library.delete_account_confirm': 'Tout supprimer',
  'library.account_deleted_title': 'Compte supprimé',
  /** `sous 30 jours` est la forme française de « within 30 days ». */
  'library.account_deleted_body': 'Tes données seront entièrement effacées sous 30 jours.',
} as const;
