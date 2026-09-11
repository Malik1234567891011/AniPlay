/**
 * Le portefeuille, la boutique, et tout ce que la boutique renvoie quand ça
 * casse.
 *
 * **C’est l’écran de l’argent.** Un mot faux ici n’est pas un défaut cosmétique,
 * c’est un remboursement, un avis à une étoile ou un problème de conformité. Le
 * français est donc écrit, pas traduit — mais il est écrit *sous contrainte* :
 * ce que dit l’anglais sur le fait d’avoir été débité ou non est une promesse,
 * et une promesse ne se réécrit pas au passage.
 *
 * ## Ce qui n’a pas bougé, et pourquoi
 *
 * **Aucun prix n’est formaté ici.** `{price}` et `{credits}` arrivent déjà mis
 * en forme — par StoreKit pour l’un, par `formatCredits` pour l’autre. Le
 * français de France écrit `1 234,50 €`, virgule décimale et symbole après avec
 * une espace insécable, mais c’est le travail de StoreKit et de
 * `formatCurrency`, jamais celui du catalogue. Aucun `#` non plus dans les
 * pluriels : `#` appliquerait le groupement ICU et changerait silencieusement
 * ce que l’application affiche (UI_AUDIT §2.3 — Hermes n’embarque pas ICU en
 * entier, donc `toLocaleString()` et ICU ne disent pas la même chose sur un
 * appareil).
 *
 * **`wallet.about_price` garde son montant en dollars.** Le repli codé en dur
 * en devise américaine est un bug France connu et suivi ailleurs
 * (UI_AUDIT §2.2) ; traduire le mot autour du symbole ne le corrige pas, ça le
 * maquille. Cette clé existe pour que le mot ne soit pas anglais en attendant
 * que le repli disparaisse.
 *
 * ## Les pluriels
 *
 * L’anglais de cet écran ne fléchissait pas : `1 credits added.` est la chaîne
 * réellement expédiée, et elle est gelée. Les catégories `one` / `other` sont
 * là **pour le français**, qui doit dire `1 crédit ajouté.` et
 * `2 crédits ajoutés.` — et `0 crédit ajouté.`, parce que le zéro est singulier
 * en français. Cinq clés d’ici avaient deux formes identiques en anglais et ont
 * deux formes différentes en français : `wallet.shortfall`,
 * `wallet.reserved_held`, `wallet.credits_claimed`, `wallet.credits_added`,
 * `wallet.credits_restored`. Jamais de branche `=1` : ce serait la règle
 * anglaise déguisée en ICU, et elle est fausse à zéro.
 *
 * ## Le registre
 *
 * `tu` partout, y compris dans le tunnel d’achat — c’est précisément là qu’une
 * traduction attrape le `vous`, et un seul `vous` sur l’écran de paiement est
 * l’échec de localisation que les testeurs français nomment en premier
 * (PRODUCT_VOICE règle 1). Les libellés qui touchent la chrome d’Apple prennent
 * l’infinitif : `Fermer`, `Restaurer mes achats`. Les lignes du registre des
 * mouvements sont de la comptabilité, pas du récit : `Tour débité`, pas
 * « le tour s’est terminé ».
 */
export const wallet = {
  /* ---------------------------------------------------------------------- */
  /* L’écran                                                                 */
  /* ---------------------------------------------------------------------- */

  /** Le solde de crédits du joueur. `portefeuille`, jamais `porte-monnaie`. */
  'wallet.title': 'Portefeuille',
  /** Étiquette VoiceOver du `✕`. Infinitif : le bouton est de la chrome. */
  'wallet.close': 'Fermer',

  /**
   * WL-03 — le tour a été refusé faute de crédits, avec le nombre exact qui
   * manque. L’anglais ne fléchissait pas ; le français fléchit, et il tutoie :
   * `Il te manque 1 crédit` est ce qu’une personne dirait, là où
   * `1 crédit de plus nécessaire` est un constat d’huissier.
   */
  'wallet.shortfall':
    '{count, plural, one {Il te manque {count} crédit} other {Il te manque {count} crédits}}',
  /** La sortie de secours, juste en dessous. `qualité de la scène`, TERMINOLOGY §3.6. */
  'wallet.shortfall_hint':
    'Ajoute des crédits ci-dessous, ou baisse la qualité de la scène et envoie la même action.',

  /**
   * Le libellé au-dessus du grand nombre. Les capitales sont dans la chaîne,
   * pas dans le style, donc elles sont ici aussi. Pas d’accent à porter.
   */
  'wallet.balance_label': 'SOLDE',
  /**
   * L’unité sous le nombre, sur sa propre ligne. Mot séparé du nombre, donc il
   * ne peut pas porter son pluriel : un solde est toujours au pluriel.
   */
  'wallet.credits_unit': 'crédits',
  /**
   * Les crédits déjà engagés sur un tour en train de se générer. `in flight` =
   * en cours, pas d’aviation. Le participe s’accorde, donc les deux formes
   * diffèrent vraiment : `1 crédit retenu`, `2 crédits retenus`.
   */
  'wallet.reserved_held':
    '{count, plural, one {{count} crédit retenu par un tour en cours} other {{count} crédits retenus par un tour en cours}}',

  /* ---------------------------------------------------------------------- */
  /* Les crédits du jour                                                     */
  /* ---------------------------------------------------------------------- */

  /**
   * Le `300` est en dur dans la chaîne anglaise, pas interpolé. Il reste en dur
   * ici : inventer un `{count}` que le code ne passe pas casserait la clé.
   * Impératif, parce que c’est une action engagée (PRODUCT_VOICE règle 2), et
   * `quotidiens` pour rester le même mot que la ligne du registre.
   */
  'wallet.claim_daily': 'Récupère tes 300 crédits quotidiens',
  /** Le même bouton pendant l’appel. */
  'wallet.claiming': 'Récupération…',
  /** `{when}` est une des clés `wallet.time_*`. */
  'wallet.next_daily': 'Prochains crédits quotidiens {when}',
  /**
   * Confirmation. L’anglais ne fléchissait pas ; le français fléchit deux fois,
   * sur le nom et sur le participe. Le nombre arrive brut, comme expédié.
   */
  'wallet.credits_claimed':
    '{count, plural, one {{count} crédit récupéré.} other {{count} crédits récupérés.}}',
  /** Personne n’est connecté. `se connecter`, jamais `se logger`. */
  'wallet.daily_sign_in': 'Connecte-toi pour récupérer tes crédits quotidiens.',

  /* ---------------------------------------------------------------------- */
  /* Les packs                                                               */
  /* ---------------------------------------------------------------------- */

  /** Titre de section. Casse de phrase : une seule capitale (UI_AUDIT §2.8). */
  'wallet.packs_title': 'Packs de crédits',
  /**
   * Une ligne de pack entière, lue par VoiceOver. `{bonus}` vaut `none` quand
   * le pack n’a pas de bonus. `{credits}` et `{price}` arrivent déjà mis en
   * forme — ne jamais les reformater ici.
   */
  'wallet.offer_a11y':
    '{bonus, select, none {{credits} crédits, {price}} other {{credits} crédits plus {bonus} en bonus, {price}}}',
  /**
   * Le prix de référence affiché tant que la boutique n’a pas répondu.
   *
   * **`{price}` est un montant en dollars américains codé en dur, et c’est un
   * bug France connu — UI_AUDIT §2.2. Ne pas le « corriger » en le
   * traduisant.** Mettre `environ` devant un montant en dollars ne le rend pas
   * juste pour un joueur français : mauvaise devise, mauvais symbole, mauvaise
   * place du symbole, mauvais séparateur décimal. Le correctif est de supprimer
   * le repli en devise codée en dur, et il est suivi ailleurs. Cette clé existe
   * pour que le mot autour ne soit pas anglais en attendant ; le nombre et son
   * symbole sont volontairement intacts.
   */
  'wallet.about_price': 'environ {price}',
  /** Les crédits offerts en plus, en pastille à côté de la taille du pack. */
  'wallet.bonus_badge': '+{bonus} en bonus',
  /** Fin d’une offre limitée. `{when}` est une des clés `wallet.time_*`. */
  'wallet.ends': 'Fin {when}',
  /**
   * Tant que la boutique n’a pas donné ses prix, ceux à l’écran sont les
   * nôtres. `US reference prices` est littéral : c’est la liste en dollars, pas
   * le prix du joueur. Et `ta devise` plutôt que `ton prix local`, parce que
   * c’est la devise qui change, pas seulement le montant.
   */
  'wallet.reference_prices_note':
    'Les prix affichés sont des prix de référence américains. La boutique t’affichera le prix dans ta devise et te demandera confirmation avant tout paiement.',
  /**
   * La même réassurance une fois les vrais prix arrivés. `consommable` est le
   * type de produit App Store, et c’est le mot qu’Apple emploie en français.
   */
  'wallet.price_confirmed_note':
    'La boutique te demande confirmation du prix avant tout paiement. Les crédits sont consommables et n’expirent pas.',
  /**
   * Spec §20.6 — le contrôle de restauration obligatoire. C’est le libellé
   * qu’Apple emploie en français, à la première personne, et il ne varie pas :
   * `store.already_processing` et `wallet.purchase_failed_charged` nomment ce
   * bouton et doivent le nommer avec exactement ces trois mots.
   */
  'wallet.restore': 'Restaurer mes achats',
  /** Le bouton pendant l’interrogation de la boutique. */
  'wallet.restore_loading': 'Vérification auprès de la boutique…',

  /* ---------------------------------------------------------------------- */
  /* Ce que dit un achat, après                                              */
  /* ---------------------------------------------------------------------- */

  /** L’achat était réel mais les crédits étaient déjà là. Rien n’est dû. */
  'wallet.already_credited': 'Cet achat était déjà sur ton solde.',
  /**
   * L’achat réussi. Deux formes qui diffèrent vraiment, et `{credits}` arrive
   * déjà mis en forme par `formatCredits` — ni reformatage, ni `#`.
   */
  'wallet.credits_added':
    '{count, plural, one {{credits} crédit ajouté.} other {{credits} crédits ajoutés.}}',
  /** Demander à acheter et les autres achats différés : pas un échec. */
  'wallet.purchase_pending':
    'Cet achat attend une autorisation. Tes crédits apparaîtront ici dès qu’elle arrivera.',
  /**
   * Spec §3.8 — un échec où la boutique a peut-être déjà pris l’argent.
   * `{message}` est le message `store.*`, déjà en français ; cette clé n’ajoute
   * que la phrase d’après. **Ne jamais l’adoucir en « tu n’as rien payé »** :
   * tout l’intérêt est qu’on ne sait pas. `Si le paiement est passé` porte ce
   * doute sans participe à accorder, là où `si tu as été débité` obligerait à
   * connaître le genre du joueur. Le nom du bouton ouvre la phrase suivante :
   * en français, un libellé au milieu d’une phrase se lit comme une majuscule
   * parasite.
   */
  'wallet.purchase_failed_charged':
    '{message} Si le paiement est passé, attends quelques minutes. Restaurer mes achats fera apparaître tes crédits.',

  /** La restauration a trouvé des transactions et les a créditées. */
  'wallet.credits_restored':
    '{count, plural, one {{credits} crédit restauré.} other {{credits} crédits restaurés.}}',
  /** Tout ce qu’elle a trouvé était déjà crédité. */
  'wallet.restore_all_present': 'Tout ce que la boutique a enregistré est déjà sur ton solde.',
  /** Elle n’a rien trouvé. Ce n’est pas une erreur. */
  'wallet.restore_none': 'Aucun achat à restaurer sur ce compte.',
  /** La boutique est injoignable. Le tiret est bien un U+2014. */
  'wallet.restore_unreachable':
    'Impossible de joindre la boutique. Rien n’a changé — réessaie dans un instant.',

  /* ---------------------------------------------------------------------- */
  /* Le registre des mouvements                                              */
  /* ---------------------------------------------------------------------- */

  /** La section dépliable qui liste chaque mouvement de crédits. */
  'wallet.history': 'Historique des achats',

  /*
   * Les lignes du registre — une par type d’écriture. Ce sont des descriptions
   * comptables de ce qui a bougé, lues dans une liste de montants datés. Casse
   * de phrase partout (UI_AUDIT §2.8). Les clés d’énumération restent
   * anglaises : ce sont des identifiants, pas du texte.
   */

  /** Un pack acheté. */
  'wallet.credit_pack': 'Pack de crédits',
  /** Les crédits offerts en plus par le pack. */
  'wallet.pack_bonus': 'Bonus du pack',
  /** L’octroi quotidien, vu comme une écriture. */
  'wallet.daily_credits': 'Crédits quotidiens',
  /** Les crédits de départ d’un nouveau compte. */
  'wallet.welcome_credits': 'Crédits de bienvenue',
  /** Un tour de jeu : `tour`, jamais `virage`, jamais `round`. */
  'wallet.turn': 'Tour',
  /**
   * **Comptabilité d’un tour de jeu** : le tour est allé au bout et les crédits
   * retenus ont été effectivement pris. `settled` n’est ni « apaisé » ni un
   * litige réglé — c’est un débit.
   */
  'wallet.turn_settled': 'Tour débité',
  /** Le tour a échoué de notre côté et ses crédits sont revenus. */
  'wallet.turn_refunded': 'Tour remboursé',
  /**
   * Le coût d’une branche partant d’une partie existante. `fork` est le mot de
   * `library.fork_badge` : **`bifurcation`**, décidé une fois ici
   * (TERMINOLOGY §3.1, `bifurquer` / `une bifurcation`, jamais `forker`). Le
   * `timeline` de l’onglet est `chronologie`.
   */
  'wallet.timeline_fork': 'Bifurcation de la chronologie',
  /** De l’argent rendu par la boutique, vu comme une écriture. */
  'wallet.refund': 'Remboursement',
  /** Une correction manuelle du support. */
  'wallet.adjustment': 'Ajustement',

  /* ---------------------------------------------------------------------- */
  /* Comment marchent les crédits                                            */
  /* ---------------------------------------------------------------------- */

  'wallet.how_it_works': 'Comment fonctionnent les crédits',
  /** `mise en scène` pour `direction` — c’est le mot du cinéma, pas `direction`. */
  'wallet.how_it_works_richer':
    'Chaque tour que tu envoies coûte des crédits, et plus la qualité de la scène est élevée, plus il coûte cher. Ce que tu achètes, c’est une mise en scène plus riche, une mémoire plus profonde et de plus belles images.',
  /**
   * Spec §3.8 — la promesse que l’argent n’achète jamais la chance. `les dés`
   * restent des dés : concret, pas « le hasard ».
   */
  'wallet.how_it_works_fair':
    'Ce que tu n’achètes jamais, c’est un meilleur résultat. Les dés, tes caractéristiques et toutes les règles sont les mêmes à tous les niveaux de qualité.',
  /** `de notre côté` = notre faute, pas celle du joueur. */
  'wallet.how_it_works_refund':
    'Si un tour échoue de notre côté, les crédits reviennent aussitôt. Tu ne paies que les tours qui ont vraiment eu lieu.',

  /* ---------------------------------------------------------------------- */
  /* Le temps relatif                                                        */
  /* ---------------------------------------------------------------------- */

  /**
   * Comptes à rebours vers les crédits du jour et vers la fin d’une offre :
   * `Prochains crédits quotidiens dans 4 h`, `Fin dans 2 j`. La préposition est
   * dans la chaîne parce que le français en veut une autre.
   *
   * Deux choses que le français change et que l’anglais n’avait pas :
   * **`j` pour les jours, jamais `d`** (UI_AUDIT §2.1, TERMINOLOGY §3.5), et
   * une espace devant l’abréviation, y compris pour les heures — l’anglais
   * écrit `4h` collé, le français écrit `4 h`. C’est une U+202F, écrite en
   * échappement parce qu’une espace fine insécable est invisible dans un diff
   * et que c’est exactement le caractère que quelqu’un « nettoie » ;
   * `translate()` la replie en U+00A0 à la sortie, comme pour `world.duration_*`.
   *
   * Les deux formes restent identiques ici, et c’est correct : `min`, `h` et
   * `j` ne se fléchissent pas plus en français qu’en anglais. La catégorie ne
   * sert pas à fléchir, elle sert à laisser le français décider — et ce qu’il
   * décide, c’est `j`. `{count}` n’est pas `#`, sinon ICU regrouperait le
   * nombre.
   */
  'wallet.time_now': 'maintenant',
  'wallet.time_in_minutes':
    '{count, plural, one {dans {count}\u202Fmin} other {dans {count}\u202Fmin}}',
  'wallet.time_in_hours': '{count, plural, one {dans {count}\u202Fh} other {dans {count}\u202Fh}}',
  'wallet.time_in_days': '{count, plural, one {dans {count}\u202Fj} other {dans {count}\u202Fj}}',

  /* ---------------------------------------------------------------------- */
  /* store.* — ce que la facturation de la plateforme renvoie                */
  /* ---------------------------------------------------------------------- */

  /*
   * Levées dans `apps/mobile/src/store/purchases.ts`, affichées par le
   * portefeuille.
   *
   * Ce que chacune tranche, c’est **si le joueur a été débité**, et ça doit
   * survivre à la traduction intact. Un message qui dit que le joueur n’a rien
   * payé est une promesse ; on n’en écrit jamais une dans un cas où on ne sait
   * pas. Spec §3.8. `Tu n’as rien payé.` n’apparaît donc que sur les deux cas
   * où l’anglais l’affirmait aussi.
   */

  /** Le build web ne peut pas ouvrir de feuille de paiement. */
  'store.web_only': 'Les crédits s’achètent uniquement dans l’application.',
  /** Expo Go et les builds sans module natif de facturation. */
  'store.needs_native_build':
    'La boutique n’est pas disponible dans cette version. Les achats demandent une version native de l’application.',
  /** La connexion à la facturation n’a pas pu s’ouvrir, sans raison plus précise. */
  'store.unavailable': 'La boutique n’est pas disponible.',
  /** Un deuxième achat lancé pendant qu’une feuille est ouverte. Rien n’a été débité. */
  'store.purchase_in_progress': 'Un autre achat est déjà en cours.',
  /**
   * La boutique a pris l’achat et notre serveur n’a pas pu le confirmer. La
   * transaction est laissée exprès inachevée, donc elle revient d’elle-même.
   * `safe` = pas perdu, sera crédité — pas « sécurisé ».
   */
  'store.sync_unconfirmed':
    'Impossible de confirmer cet achat pour le moment. Ton achat n’est pas perdu.',
  /** La boutique ne vend pas ce pack en ce moment. Rien n’a été débité. */
  'store.item_unavailable': 'Ce pack n’est pas disponible pour le moment.',
  /** La boutique était injoignable. Ici on peut promettre qu’il n’y a pas eu de paiement. */
  'store.network_error': 'Impossible de joindre la boutique. Tu n’as rien payé.',
  /**
   * La boutique a déjà cet achat et le traite encore. De l’argent a très bien
   * pu bouger, donc on renvoie vers la restauration sans rien affirmer. Le
   * bouton est nommé avec les mots exacts de `wallet.restore`, et il ouvre la
   * phrase pour ne pas semer une majuscule au milieu.
   */
  'store.already_processing':
    'Cet achat est encore en cours de traitement. Attends un instant. Restaurer mes achats fera apparaître tes crédits.',
  /** La facturation est coupée sur cet appareil ou ce compte Apple/Google. */
  'store.purchases_unavailable':
    'Les achats ne sont pas disponibles sur cet appareil ou avec ce compte.',
  /** L’échec fourre-tout, atteint seulement quand la boutique n’a rien dit. */
  'store.purchase_failed': 'Cet achat n’est pas allé au bout. Tu n’as rien payé.',
  /**
   * Les trois badges de la boutique. « Le plus avantageux » plutôt que « Meilleure
   * valeur », qui est un calque de *best value* et ne veut rien dire en
   * français.
   */
  'wallet.badge_popular': 'Populaire',
  'wallet.badge_best_value': 'Le plus avantageux',
  'wallet.badge_first_purchase': 'Premier achat',
  /** Le seul bouton qui dépense, sous le pack choisi. */
  'wallet.buy_now': 'Acheter',
} as const;
