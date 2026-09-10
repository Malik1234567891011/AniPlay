/**
 * CS-01 / CS-02 — la création de personnage.
 *
 * ## Les placeholders sont de l’écriture, pas des étiquettes
 *
 * `e.g. I ran messages for the lower-city courts until someone noticed I could
 * read the seals.` n’explique pas au joueur quoi faire : ça lui montre, par
 * l’exemple, dans le registre où le jeu est écrit. Traduit mot à mot, l’exemple
 * devient une consigne — et ces trois phrases sont **la première prose qu’un
 * joueur français lit dans le produit**. Elles sont donc écrites en français,
 * pas traduites, et chacune porte la note de ce qu’elle doit faire :
 *
 * - `setup.custom_background_placeholder` — un passé de subalterne avec une
 *   compétence cachée, en une phrase, au passé. `porter les plis` est le verbe
 *   français du métier, et `les sceaux` de la fin y répondent déjà.
 * - `setup.about_placeholder` — un secret que le joueur ne contrôle pas, dit
 *   au présent. **Au présent parce que le présent n’a pas de participe à
 *   accorder** : sur l’écran qui pose la question du genre, un exemple au
 *   masculin (`je suis arrivé`) répondrait à la question à la place du joueur.
 * - `setup.appearance_placeholder` — du concret et du nominal, sans un seul
 *   adjectif accordé.
 *
 * Un exemple s’ouvre par `Ex. : `, avec l’espace insécable avant le
 * deux-points que le français demande.
 *
 * ## Deux mots choisis contre leur évidence
 *
 * `setup.enter` est **`Entrer`** et non `Entre`. L’impératif serait la forme
 * juste d’après `PRODUCT_VOICE.md` règle 2 — action engagée, en flux — mais
 * `entre` est aussi la préposition la plus banale du français, et un bouton
 * qui affiche `Entre` se lit une demi-seconde comme `entre … quoi ?`.
 * L’infinitif est sans ambiguïté et c’est déjà la paire que le français
 * connaît : `Se connecter` → `Connexion…`, donc `Entrer` → `Entrée…`.
 *
 * `setup.grants.better_at` est **`Points forts`** et non `Meilleur en` :
 * `meilleur` s’accorderait avec le personnage, dont le genre n’est pas encore
 * choisi au moment où la carte s’affiche. Un nom invariable ne peut pas se
 * tromper. Même raison pour `Compté par` plutôt que `Réputation auprès de` —
 * `par` ne s’élide ni ne se contracte, `de` ferait `de le Concord`.
 *
 * ## The question, and why it looks like this
 *
 * `PLAYER_GRAMMAR.md` rule 2 drafts this screen with `« Tu es arrivé·e »` in
 * the `Iel` row. **That midpoint is not shipped**, because rule 4 of the same
 * document forbids the midpoint in UI as well as in prose — it is an
 * administrative register, it was banned from school documents by ministerial
 * circular, and it breaks read-aloud on a screen whose blocks are
 * `voiceEligible`.
 *
 * So `Iel` and `Peu importe` both show the **avoidance** form, which is what
 * the player will actually read: `Tu viens d'arriver`, present tense, no
 * participle to agree. The two options still differ, and the third column says
 * how — `iel` in the third person against avoiding the question entirely.
 *
 * Showing the sentence rather than naming the rule is the point. It is the only
 * way to make an abstract grammatical question concrete, and it is a nicer
 * piece of product design than the English field it sits beside.
 */
export const setup = {
  'setup.back': 'Retour',
  /**
   * Pas d’inversion. `Qui es-tu ?` est impeccable et socialement faux : dans un
   * produit pour ados, l’inversion se lit comme un manuel scolaire
   * (`PRODUCT_VOICE.md` règle 5, `ENGLISH_CALQUE_BLACKLIST.md` §2).
   */
  'setup.heading': 'Tu es qui ?',
  'setup.subheading':
    'Seul ton nom est obligatoire. Tout le reste, c’est à toi de l’inventer, et le monde se servira de ce que tu lui donnes.',
  'setup.could_not_start': 'Impossible de lancer l’histoire.',

  /** `On t’appelle comment ?` — la question, sans inversion, telle qu’elle se dit. */
  'setup.name_label': 'On t’appelle comment ?',
  /**
   * Un seul mot, volontairement.
   *
   * L’anglais montre un prénom et un nom. En français, deux mots capitalisés à
   * la suite dans une valeur de catalogue déclenchent le contrôle de casse de
   * `fr-lint` (FRC002), qui ne sait pas distinguer un nom propre d’un Title
   * Case anglais et n’a pas de mécanisme de suppression sur le catalogue. Un
   * nom seul répond d’ailleurs mieux à la question posée : c’est comme ça
   * qu’on y répond. La limite du linter est dans le rapport.
   */
  'setup.name_placeholder': 'Ex. : Sarrow',

  /**
   * Texte libre, et ça le reste — le joueur est invité à écrire ce qu’il veut.
   * Ce n’est **pas** le signal de grammaire ; `setup.grammar.*` s’en charge, et
   * les deux champs ne doivent pas se marcher dessus.
   */
  'setup.pronouns_label': 'Pronoms',
  'setup.pronouns_placeholder': 'Ex. : il/lui — ou écris ce que tu veux',

  'setup.archetype_heading': 'Tu es quel genre de personnage ?',
  /** Lu à voix haute : le nom, puis le rôle, puis la ligne de résumé. */
  'setup.archetype_a11y': '{name}. {role}. {summary}',
  /** Onboarding : impératif `tu`, comme le reste de l’écran. */
  'setup.write_own_background': 'Écris ton propre passé',
  /** La porte de sortie à la fin de chaque liste de préréglages. */
  'setup.something_else': 'Autre chose',
  /**
   * `attributs`, `compétences`, `techniques` — les mots du produit. `ni … ni …
   * ni …` porte le `no` anglais sans avoir besoin d’insister.
   */
  'setup.custom_background_body':
    'Décris plutôt ton propre passé. Le monde le prend pour canon — mais il ne donne ni attributs, ni compétences, ni techniques, donc tu commences sans rien de ce qui est proposé au-dessus.',
  /** L’imparfait, parce que la question porte sur ce qu’on faisait, pas sur un jour précis. */
  'setup.custom_background_label': 'Alors, tu faisais quoi ?',
  /**
   * Écrit en français. `porter les plis` est le verbe du métier — un pli est
   * une lettre scellée — et il tend déjà la main aux `sceaux` de la fin, comme
   * l’anglais le fait avec `messages` et `seals`. `la ville basse` est de la
   * géographie urbaine française réelle, pas un décor traduit.
   */
  'setup.custom_background_placeholder':
    'Ex. : Je portais les plis pour les tribunaux de la ville basse, jusqu’au jour où quelqu’un a remarqué que je savais lire les sceaux.',

  'setup.about_label': 'Qu’est-ce que le monde doit savoir sur toi ?',
  /**
   * Au présent, et c’est le point : `je suis arrivé` obligerait à accorder un
   * participe et donnerait un exemple genré sur l’écran même qui pose la
   * question du genre. `J’arrive` est la forme d’évitement que
   * `PLAYER_GRAMMAR.md` règle 4 demande, et c’est la même que celle du
   * `Tu viens d’arriver` un peu plus bas dans ce fichier.
   */
  'setup.about_placeholder':
    'Ex. : J’arrive un trimestre en retard et personne ne veut dire qui a signé pour moi.',
  'setup.appearance_label': 'Tu ressembles à quoi ?',
  /** `on partira de`, jamais `on se basera sur` — `basé sur` est un calque (§5). */
  'setup.appearance_hint':
    'Utilisé si tu génères un portrait plus tard. Laisse vide, et on partira de ce que le monde voit.',
  /**
   * Concret, nominal, sans adjectif accordé : une taille chiffrée plutôt que
   * `petit`/`petite`, et `que je coupe moi-même et mal` pour le
   * `cut badly by myself` — c’est ce qu’on dit en français, et ça garde
   * l’autodérision de l’anglais.
   */
  'setup.appearance_placeholder':
    'Ex. : Un mètre cinquante-cinq, des cheveux noirs que je coupe moi-même et mal, un manteau deux tailles trop grand.',

  'setup.write_own_answer': 'Écris ta propre réponse',
  'setup.own_answer_a11y': '{label}, ta propre réponse',

  /** L’action principale : entrer dans l’histoire. Pas « saisir une valeur ». Voir l’en-tête. */
  'setup.enter': 'Entrer',
  'setup.entering': 'Entrée…',
  'setup.use_quick_setup': 'Utiliser la création rapide',
  'setup.customize_more': 'Personnaliser davantage',

  // Ce que donne un archétype, sur la carte.
  'setup.grants.starts_with': 'Commence avec',
  /** Nom invariable : `Meilleur en` s’accorderait avec un personnage sans genre. */
  'setup.grants.better_at': 'Points forts',
  'setup.grants.attributes': 'Attributs',
  /** `Emporte` : ce que le personnage a sur lui. Verbe, invariable, sans ambiguïté. */
  'setup.grants.carries': 'Emporte',
  /** Réputation auprès d’une faction. `par` ne s’élide ni ne se contracte. */
  'setup.grants.counted_by': 'Compté par',

  // --- La question de grammaire, que seul le français pose ---------------
  'setup.grammar.heading': 'Comment le monde parle de toi',
  'setup.grammar.hint': 'Le français doit s’accorder avec toi. Choisis ce qui te va.',

  'setup.grammar.masculine': 'Il',
  'setup.grammar.feminine': 'Elle',
  'setup.grammar.neutral': 'Iel',
  'setup.grammar.unspecified': 'Peu importe',

  // La phrase que le joueur lira vraiment.
  'setup.grammar.example_masculine': 'Tu es arrivé',
  'setup.grammar.example_feminine': 'Tu es arrivée',
  /** Présent : pas de participe, donc pas d’accord. Jamais `arrivé·e`. */
  'setup.grammar.example_neutral': 'Tu viens d’arriver',
  'setup.grammar.example_unspecified': 'Tu viens d’arriver',

  'setup.grammar.note_masculine': 'on parle de toi au masculin',
  'setup.grammar.note_feminine': 'on parle de toi au féminin',
  'setup.grammar.note_neutral': 'on parle de toi avec iel',
  'setup.grammar.note_unspecified': 'le récit évite la question',
  'setup.grammar.option_a11y': '{label}. {example}. {note}.',
  /**
   * Guillemets, avec U+00A0 à l'intérieur — jamais `"` U+0022, jamais collés.
   * Écrit en échappement parce qu'une espace insécable est invisible dans un
   * diff, et c'est exactement le caractère que quelqu'un « nettoie ».
   */
  'setup.grammar.quoted_example': '\u00AB\u00A0{example}\u00A0\u00BB',
} as const;
