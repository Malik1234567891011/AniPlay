/**
 * DS-01 Découvrir, DS-02 / DS-03 la recherche, DS-04 la fiche d’aperçu.
 *
 * La vitrine. C’est le premier écran français d’un joueur et celui que
 * montreront les captures de l’App Store, donc c’est là qu’un produit traduit
 * s’entend le plus vite.
 *
 * Trois décisions valent pour tout le fichier.
 *
 * **Le produit dit `tu`** (PRODUCT_VOICE règle 1) — sauf les libellés
 * d’accessibilité. Ceux-là sont lus dans la foulée du chrome VoiceOver
 * d’Apple, qui dit `vous` et qu’on ne peut pas changer, donc ils prennent
 * l’infinitif : ni tu, ni vous, la voix des étiquettes. C’est l’exception de la
 * couture système de la règle 1, appliquée ici à toutes les clés `*_a11y`.
 *
 * **Sentence case.** Première lettre, rien d’autre. Les capitales des badges
 * (`À LA UNE`) sont dans la chaîne, pas dans la feuille de style, et une
 * capitale française garde son accent.
 *
 * **Les rayons ne sont pas ici.** Leurs titres arrivent du serveur et vivent
 * dans `rails.ts` (UI_AUDIT §5). Cet écran n’ajoute à cette liste que la puce
 * `discover.category_all`.
 */
export const discover = {
  /**
   * Libellé d’accessibilité, sur la loupe de l’en-tête et sur le champ lui-même
   * — même action, mêmes mots. Infinitif, comme toute étiquette lue par
   * VoiceOver. `monde` au singulier : on cherche un monde, on n’inventorie pas
   * la boutique. Et `monde` est bien le mot du produit pour une histoire
   * jouable, pas une planète.
   */
  'discover.search_worlds': 'Rechercher un monde',

  // Hors connexion et échec. Le bandeau est le cas « il reste quelque chose »,
  // le corps est le cas « rien n’a chargé ». `Tu es hors connexion.` est la
  // forme figée de PRODUCT_VOICE §4 et elle est reprise au mot près, pour que
  // les deux écrans qui l’affichent disent exactement la même chose.
  'discover.offline_banner': 'Tu es hors connexion. Voici ce qui est déjà chargé.',
  'discover.offline_body':
    'Tu es hors connexion. Les mondes que tu as déjà commencés s’ouvrent depuis ta bibliothèque.',
  'discover.load_failed': 'Impossible de charger les mondes.',
  /**
   * Le titre au-dessus du message. Forme nominale : `Rien n’a été chargé` est
   * un passif, et le passif est ce que PRODUCT_VOICE §4 écarte comme raide.
   */
  'discover.load_failed_title': 'Aucun monde chargé',
  /** Bouton. Infinitif — action réversible. `Réessaie.` reste pour les phrases. */
  'discover.try_again': 'Réessayer',

  /**
   * La puce en tête du rail de catégories. `Toutes` au féminin pluriel, parce
   * qu’elle veut dire « toutes les catégories » et qu’elle est posée dans une
   * file de noms de catégories. `Tout` dirait « tout », ce que cette puce ne
   * filtre pas — comparer avec `discover.empty_action`, où c’est bien `Tout`.
   */
  'discover.category_all': 'Toutes',

  /**
   * Les capitales sont dans la chaîne. `A LA UNE` sans accent est un des tells
   * les moins chers à éviter et les plus vus : l’accent a pleine valeur
   * orthographique sur une capitale.
   */
  'discover.featured_badge': 'À LA UNE',
  /**
   * Le bouton posé sur la couverture. Impératif, un seul mot, comme l’anglais —
   * la même voix que `Découvre`, `Joue`, `Commence`. `Entrer` serait la voix
   * d’un menu et casserait l’élan à l’endroit exact où il sert.
   */
  'discover.hero_enter': 'Entre',
  /**
   * Lu, jamais vu. Infinitif. `{fantasy}` est la phrase d’accroche sous le
   * titre. Le caractère avant les deux-points est une vraie espace insécable
   * U+00A0, invisible dans un diff : ne pas la « nettoyer » en espace simple,
   * c’est ce qui autorise la ligne à ne pas se couper là.
   */
  'discover.hero_a11y': 'À la une : {title}. {fantasy}. Entrer dans ce monde.',

  /**
   * En-tête du rayon des parties en cours. Reprendre une partie ouverte, pas
   * « continuer à faire quelque chose ». `En cours` était l’autre candidat,
   * plus nominal ; `Reprendre` dit ce que le joueur va faire en touchant.
   */
  'discover.continue': 'Reprendre',
  /** Lu à voix haute. `{objective}` est souvent vide et l’espace qui le précède est voulue. */
  'discover.continue_a11y': 'Reprendre {title}. {objective}',
  /**
   * Un tour de jeu — un échange entre le joueur et le monde. `tour`, jamais
   * `virage` ni `tour de rôle`. ICU, et surtout pas de branche `=1` : en
   * français le zéro est singulier, donc `0 tour` passe par `one` comme
   * `1 tour`. Le nom du paramètre ne change pas.
   */
  'discover.continue_turns': '{count, plural, one {# tour} other {# tours}}',

  // Le catalogue est revenu vide, en général parce qu’un filtre de catégorie
  // est actif.
  'discover.empty_title': 'Rien pour l’instant',
  'discover.empty_body': 'Aucun monde dans cette catégorie. Essaie-en une autre.',
  /** Efface le filtre. Ici c’est vraiment « tout », d’où `Tout` et non `Toutes`. */
  'discover.empty_action': 'Tout afficher',

  // DS-04 — la fiche d’aperçu, sur appui long.
  'discover.preview_close_a11y': 'Fermer l’aperçu',
  'discover.preview_open': 'Ouvrir l’histoire',
  /**
   * **Enregistrer-dans-la-bibliothèque.** Jamais `Sauver`, qui en français veut
   * dire tirer quelqu’un d’un danger — dans un jeu où des personnages sont en
   * danger, l’ambiguïté n’est pas théorique. `Sauvegarder` n’est pas faux pour
   * un fichier, mais ce bouton ne sauvegarde pas un fichier.
   *
   * 4 → 11 caractères : c’est le pire cas de largeur de l’app (UI_AUDIT §2.6),
   * et la puce doit être mesurée avec `Enregistré` dedans, pas avec `Save`.
   */
  'discover.save': 'Enregistrer',
  /**
   * L’état d’un monde déjà enregistré, pas une action passée. Le masculin
   * s’accorde avec `le monde`, qui est le mot du produit pour ce que la puce
   * étiquette (PRODUCT_VOICE, verrou terminologique). Si un jour la même puce
   * étiquette `une histoire`, il lui faudra sa propre clé, `Enregistrée` — et
   * en aucun cas un point médian.
   */
  'discover.saved': 'Enregistré',
  /**
   * Un rejet : « arrête de me montrer ça ». `Pas intéressé` est le calque
   * (ENGLISH_CALQUE_BLACKLIST §5) et, en prime, il accorde en genre le joueur,
   * ce que le produit ne sait pas faire. `Ça ne m’intéresse pas` est la phrase
   * que le français a déjà pour ça et elle ne s’accorde avec personne.
   * 14 → 21 caractères, mesuré : la puce doit pouvoir passer à la ligne.
   */
  'discover.not_interested': 'Ça ne m’intéresse pas',
  /** Signalement d’abus, même sens que `profile.report_history`. Jamais `Rapporter`. */
  'discover.report': 'Signaler',

  // DS-02 / DS-03 — la recherche.
  /**
   * Placeholder. Liste nominale plutôt que verbe : le champ dit déjà qu’on y
   * cherche, et l’anglais fait 28 caractères là où une phrase française en
   * ferait 40. `mot-clé` plutôt que `tag` — le mot existe en français et rien
   * n’oblige à emprunter ici.
   */
  'discover.search_placeholder': 'Titre, créateur, mot-clé',
  'discover.search_cancel': 'Annuler',
  'discover.search_no_results_title': 'Aucun monde trouvé',
  /**
   * `Découvrir` est le nom de l’onglet, tel que le joueur le lit dans la barre
   * (`nav.discover`). Il ouvre la deuxième phrase exprès : une majuscule au
   * milieu d’une phrase française se lit comme une Title Case anglaise.
   * `sélections` plutôt que « rails », qui est un mot d’équipe, pas un mot de
   * joueur.
   */
  'discover.search_no_results_body':
    'Essaie une recherche plus courte. Découvrir te propose aussi des sélections.',
  /** Invitation, donc impératif — pas le même registre que le libellé d’accessibilité plus haut. */
  'discover.search_prompt_title': 'Cherche un monde',
  'discover.search_prompt_body':
    'Un titre, un créateur, un mot-clé, un point de départ ou un personnage dont tu te souviens.',
  /**
   * La deuxième ligne du rayon Reprendre.
   *
   * L\u2019anglais dit `8 turns in`, avec une préposition qui n\u2019a pas d\u2019équivalent :
   * `dans 8 tours` veut dire le contraire (dans le futur). `8 tours joués` dit
   * la même chose et se lit tout seul. Zéro prend le singulier.
   */
  'discover.continue_turns_in': '{count, plural, one {# tour joué} other {# tours joués}}',
} as const;
