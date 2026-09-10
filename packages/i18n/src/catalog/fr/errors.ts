/**
 * Le français des erreurs.
 *
 * Read by somebody something has just gone wrong for, which is precisely where
 * a French translator reaches for `vous` — the institutional, safe, apologetic
 * register. **Not here.** `PRODUCT_VOICE.md` rule 1 has no exception for
 * errors, and a paywall that says `tu` beside an error that says `vous` is the
 * single most-named French localization failure there is.
 *
 * ## Ce qui est le message, et ce qui est le diagnostic
 *
 * Several of these exist to say *nothing has been lost*, and that reassurance
 * **is the string**. `Tu n’as rien payé.` is not a footnote to
 * `Ce portrait n’est pas allé au bout.` — it is the reason the sentence is on
 * screen at all. A correct, cold, technical French rendering (`Échec de la
 * génération`) translates every word and loses the message, which is why
 * `gardée` and `payé` are the words here rather than `enregistrée` and
 * `débité`: they are what a person says, not what a system logs.
 *
 * ## Ce qui est banni ici
 *
 * - **`Oups !`, `Aïe !`, `Désolé`.** `PRODUCT_VOICE.md` rule 4. French readers
 *   parse heavy apology in an interface as insincere or as an admission the
 *   thing is broken. None of the English strings apologise; none of these do.
 * - **L’exclamation ajoutée.** The documented French failure mode is *addition*
 *   — an adjective, a `!`, a connector the source did not have. There is not
 *   one `!` in this file.
 * - **Le passif et le subjonctif de politesse.** `Impossible de charger les
 *   mondes.`, jamais `Les mondes ne peuvent pas être chargés.`
 * - **`requérir`, `nécessiter`, `avoir la possibilité de`** — Microsoft FR
 *   §2.1.4 les classe comme raides. `demander`, `devoir`, `pouvoir`.
 *
 * `e-mail`, jamais `courriel` : le québécisme est une fuite de mémoire de
 * traduction et se voit tout de suite.
 */
export const errors = {
  // --- Réseau ---

  /**
   * The second sentence is the point. `gardée` — kept, and it will go out —
   * rather than `enregistrée`, which is what you do to a file.
   */
  'error.offline_action_saved': 'Tu es hors connexion. Ton action est gardée.',

  /**
   * Même panne, pendant la connexion : rien à garder, donc on demande un
   * nouvel essai au lieu d’en promettre un. `Tu as l’air` garde la prudence de
   * `You appear to be` — l’app ne sait pas distinguer un réseau mort d’un
   * serveur mort, et la phrase ne prétend pas le savoir.
   */
  'error.offline_try_again': 'Tu as l’air hors connexion. Réessaie dans un instant.',

  /**
   * Le dernier recours, quand le serveur a échoué sans dire pourquoi.
   *
   * `PRODUCT_VOICE.md` §« Our actual error strings » propose
   * `Ça n’a pas marché. Réessaie.` pour cette ligne **et** pour
   * `error.sign_in_failed`. Les deux clés deviendraient identiques, et surtout
   * l’anglais ici ne propose aucun nouvel essai : ajouter `Réessaie.` serait
   * ajouter, ce que la règle 1 interdit. La consigne de réessai reste sur la
   * clé dont l’anglais la porte.
   */
  'error.request_failed': 'Ça n’a pas marché.',

  /**
   * `tour` — l’unité de jeu, une action et la scène qui y répond. Jamais un
   * `round`, jamais un `tirage`, et surtout pas une place dans une file.
   * `aller au bout` plutôt qu’`expirer` : on dit ce qui s’est passé, pas ce
   * que le serveur a compté.
   */
  'error.turn_timeout': 'Ce tour n’est pas allé au bout dans les temps.',

  /**
   * Vu uniquement par qui lance l’app depuis les sources, et la réparation est
   * entièrement hors de l’app.
   *
   * `EXPO_PUBLIC_SUPABASE_URL` et `EXPO_PUBLIC_SUPABASE_ANON_KEY` sont des noms
   * de variables d’environnement : **ils ne se traduisent pas**, ne s’accentuent
   * pas et ne se coupent pas. Écrit d’une seule chaîne plutôt qu’en
   * concaténation, pour que `fr-lint --catalog` voie la valeur entière ; la
   * regex du linter s’arrête au premier littéral.
   *
   * `en demande une` et non `en requiert une` : `requérir` est banni comme
   * raide. Deux-points plutôt que `pour qu’il prenne`, ce qui évite un
   * subjonctif de service.
   */
  'error.auth_not_configured':
    'Ce build n’a pas de configuration de connexion, et le serveur en demande une. Relance le serveur de dev : il prendra EXPO_PUBLIC_SUPABASE_URL et EXPO_PUBLIC_SUPABASE_ANON_KEY.',

  // --- Connexion ---

  /**
   * Volontairement vague sur la faute de qui, et volontairement court : ce qui
   * suit est un bouton, pas une explication.
   */
  'error.sign_in_failed': 'Ça n’a pas marché. Réessaie.',

  /** Le code à six chiffres, périmé. `Demandes-en` prend le `s` euphonique devant `en`. */
  'error.code_expired': 'Ce code a expiré. Demandes-en un nouveau.',

  /**
   * `ne correspond pas` et non `est faux` : le joueur n’est accusé de rien,
   * exactement comme `did not match` en anglais.
   */
  'error.code_incorrect': 'Ce code ne correspond pas. Vérifie-le et réessaie.',

  /** `une minute` est un ordre de grandeur, pas un décompte. */
  'error.too_many_attempts': 'Trop de tentatives. Attends une minute et réessaie.',

  /**
   * `n’a pas l’air correcte` garde la prudence de `does not look right` :
   * l’adresse n’a été vérifiée auprès de personne, seulement regardée.
   * `e-mail`, jamais `courriel`.
   */
  'error.email_invalid': 'Cette adresse e-mail n’a pas l’air correcte.',

  /**
   * `invité` est le mot du produit pour un joueur non connecté — le même que
   * `profile.guest` (`Guest`), qui devra dire `Invité` quand il sera écrit.
   * `se connecter`, jamais `s’identifier` ni `se logger`.
   */
  'error.guest_play_unavailable':
    'Le mode invité n’est pas disponible pour le moment. Connecte-toi pour continuer.',

  /**
   * Ce sont les inscriptions qui sont en pause, pas les comptes : l’anglais dit
   * `New accounts are paused`, le français dit ce que ça veut dire. Temporaire,
   * et la phrase le dit.
   */
  'error.signups_paused': 'Les nouvelles inscriptions sont en pause pour le moment.',

  /** Ni une faute du joueur, ni quelque chose qu’il peut réessayer. Donc pas de `Réessaie.` */
  'error.sign_in_not_configured': 'La connexion n’est pas configurée dans ce build.',

  /**
   * `Se connecter avec Apple` est le nom **qu’Apple donne lui-même** à sa
   * fonctionnalité en français. On le reprend tel quel plutôt que d’en inventer
   * un : c’est le seul endroit de ce fichier où le nom vient d’ailleurs.
   */
  'error.apple_unavailable': 'Se connecter avec Apple n’est pas disponible sur cet appareil.',

  /**
   * Un jeton de sécurité, pas un jeton de jeu — la monnaie du produit reste
   * `des crédits` et ne devient jamais `des jetons`. C’est un nouvel essai, pas
   * un refus, et la phrase le dit.
   */
  'error.apple_no_token': 'Apple n’a pas renvoyé de jeton de connexion. Réessaie.',
} as const;
