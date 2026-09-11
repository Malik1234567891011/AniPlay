/**
 * Le français de `profile`. Écrit, pas traduit — voir PRODUCT_VOICE.md.
 *
 * `profile.language` et `profile.language_device` étaient les deux seules
 * chaînes écrites avant l'étape 7, parce que le sélecteur de langue doit être
 * lisible par la personne qui le cherche. Elles n'ont pas bougé ; le reste de
 * l'écran vient s'ajouter autour.
 *
 * **Un écran de réglages est l'endroit où le `vous` revient par réflexe.**
 * Il n'y en a pas un seul ici. Les intitulés de réglage sont à l'infinitif —
 * `Réduire les animations`, `Afficher…` — parce que le français lit
 * l'infinitif comme une *voix d'étiquette* et non comme une personne, exactement
 * comme le fait l'interface française d'Apple. Les phrases d'aide, elles,
 * tutoient : `Affiche`, `S'applique`, `Connecte-toi`.
 */
export const profile = {
  'profile.title': 'Profil',
  /**
   * Rendu à la place du nom affiché, dans un `h3`. `Invité` s'accorderait avec
   * le joueur ; `Compte invité` accorde l'adjectif avec `compte` et la question
   * ne se pose plus — c'est l'évitement demandé par PLAYER_GRAMMAR règle 4.
   */
  'profile.guest': 'Compte invité',
  /**
   * `sans compte` plutôt que `en invité`, pour la même raison, et c'est déjà
   * le vocabulaire de la maison (`Je continue sans compte`, PRODUCT_VOICE).
   */
  'profile.guest_explainer':
    'Tu joues sans compte. Connecte-toi pour enregistrer ce monde et le reprendre où tu veux.',
  'profile.sign_in': 'Se connecter',
  /** 1,75× l'anglais, et il n'existe rien de plus court qui soit vrai. */
  'profile.sign_out': 'Se déconnecter',
  'profile.sign_out_confirm_title': 'Se déconnecter ?',

  /** En-tête de section. `Jeu` : une section de réglages français est un nom, court. */
  'profile.gameplay': 'Jeu',
  'profile.advanced_relationship_stats': 'Afficher les stats détaillées des relations',
  /**
   * L'anglais cite deux étiquettes en exemple (`Trusted`, `Rival`). Le français
   * ne les cite pas, pour deux raisons : elles seraient des capitales en plein
   * milieu d'une phrase, ce que le français ne fait pas ; et TERMINOLOGY §3.4
   * rappelle qu'elles s'accordent avec le personnage — `Rivale`, `Dévouée` —
   * donc une chaîne figée en donnerait la mauvaise forme une fois sur deux.
   */
  'profile.advanced_relationship_stats_hint': 'Affiche les chiffres derrière chaque relation.',
  /**
   * `check` n'a pas encore de mot gelé dans TERMINOLOGY. Choisi : `un jet`,
   * plus transparent que `un test` puisque l'aide parle justement du jet et de
   * ses modificateurs. À verser dans TERMINOLOGY §3.1.
   */
  'profile.check_math': 'Afficher le calcul des jets',
  'profile.check_math_hint': 'Affiche le jet et les modificateurs, quand le monde l’autorise.',

  /** `&` n'est pas un mot français. Et `Son et image` est plus court que l'anglais. */
  'profile.audio_visual': 'Son et image',
  'profile.reduce_motion': 'Réduire les animations',
  'profile.reduce_motion_hint': 'Supprime la parallaxe et les animations non essentielles.',
  'profile.voice_autoplay': 'Lire les voix automatiquement',
  'profile.haptics': 'Retour haptique',

  'profile.privacy_safety': 'Confidentialité et sécurité',
  /**
   * Les signalements d'abus déposés par le joueur, pas un journal des versions.
   * 1,93× l'anglais — la pire inflation de cet écran, mesurée en UI_AUDIT §2.6.
   * `Signalements` seul tiendrait, mais perd l'historique.
   */
  'profile.report_history': 'Historique des signalements',
  'profile.creator_teaser': 'Créer tes propres mondes',
  'profile.wallet': 'Portefeuille et achats',
  'profile.account': 'Compte',

  // Le sélecteur de langue. Caché derrière sept appuis jusqu'à l'étape 7 ;
  // voir DEVICE_LOCALE_AUTODETECT.
  'profile.language': 'Langue',
  'profile.language_hint':
    'S’applique aux nouvelles histoires. Une histoire déjà commencée garde sa langue.',
  /** « Suis ce que règle le téléphone » — pas le nom d'un appareil. */
  'profile.language_device': 'Appareil',
  'profile.language_current': 'Les nouvelles histoires seront en {name}.',
  /**
   * Les deux réglages qui montrent la mécanique, repliés.
   *
   * `Jeu avancé` et non `Gameplay avancé` : `gameplay` est de l'anglais qui
   * passe à l'oral et détonne dans un menu de réglages.
   */
  'profile.advanced_gameplay': 'Jeu avancé',
  'profile.advanced_gameplay_hint': 'Chiffres de relation et détail des jets',
  'profile.badges': 'Badges',
  'profile.badges_summary': '{earned} sur {total}',
  'profile.badges_unclaimed':
    '{count, plural, one {# récompense à récupérer} other {# récompenses à récupérer}}',
  /* -- L'écran des badges -- */

  /**
   * `Récupérer` et non `Réclamer` : on réclame ce qu'on estime dû, on récupère
   * ce qui nous attend. Le second est ce que fait le bouton.
   */
  'badges.ready': 'À récupérer',
  'badges.in_progress': 'En cours',
  'badges.earned': 'Obtenus',
  'badges.claim': 'Récupérer {credits}',
  'badges.claim_a11y': 'Récupérer {credits} crédits pour {title}.',
  'badges.progress': '{done} sur {target}',
  'badges.guest': 'Connecte-toi pour garder les badges que tu obtiens.',
  /** Voir `en/profile.ts` : la roue dentée et son écran. */
  'settings.title': 'Réglages',
  'settings.my_information': 'Mes informations',
  'settings.app_version': 'Version de l’app',
  'settings.personalization': 'Ce que tu aimes',
  'settings.save_preferences': 'Enregistrer',
  'settings.a11y': 'Réglages',
  'profile.service': 'Services',
  'settings.account': 'Compte',
  'settings.account_guest': 'Tu joues sans compte',
  'settings.account_unknown': 'Connecté',
  'settings.account_guest_hint': 'Connecte-toi pour garder tes mondes si tu changes de téléphone.',
  'settings.age_range': 'Tranche d’âge',
  'settings.age_unknown': 'Non renseignée',
  'settings.age_hint': 'Tu nous l’as dit une fois, pour choisir les mondes à te montrer.',
} as const;
