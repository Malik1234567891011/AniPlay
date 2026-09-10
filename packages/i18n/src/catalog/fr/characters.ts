/**
 * « Tes personnages » — l’écran du roster et la carte de portrait.
 *
 * ## `Draw` veut dire dessiner
 *
 * **`Dessiner`, jamais `Tirer`.** `ENGLISH_CALQUE_BLACKLIST.md` §5 et
 * `UI_AUDIT.md` §3, ligne `characters.draw`. `tirer une image` est une faute
 * assez visible pour que `fr-lint` FR030 la refuse, et elle est facile à
 * commettre parce que `draw` est le mot le plus polysémique du fichier.
 *
 * Et il l’est deux fois. **Le même verbe anglais est aussi un verbe du parser
 * en cours de partie, où `draw` veut dire dégainer une arme** — celui-là est
 * `dégainer`, et il vit dans les affordances d’ability, pas ici. Les deux ne
 * doivent jamais converger sur un seul mot français : si `Dessiner` devenait
 * `Tirer`, `tirer son épée` et `tirer un portrait` deviendraient la même
 * commande, et le parser français répondrait au mauvais geste. C’est la raison
 * pour laquelle cette note est dans le code et pas seulement dans un document.
 *
 * ## Le génitif anglais est reconstruit
 *
 * `{name}'s portrait` ne se calque pas. Le français dit `Portrait de {name}`,
 * dans cet ordre, et c’est ce que VoiceOver lit. Reste que `de` s’élide devant
 * une voyelle — `d’Ayame` — et qu’une chaîne ICU plate ne peut pas le savoir ;
 * c’est du VoiceOver seul, c’est signalé dans le rapport, et ça ne se répare
 * pas ici.
 *
 * Les labels en `_a11y` sont à l’infinitif : ils sont contre la chrome
 * VoiceOver, qu’Apple livre en `vous` et qu’on ne change pas
 * (`PRODUCT_VOICE.md` règle 1, clause de la couture système). Ni `tu`, ni
 * `vous` : pas de personne du tout.
 */
export const characters = {
  'characters.title': 'Tes personnages',
  /** Label VoiceOver sur la croix qui ferme l’écran. */
  'characters.close': 'Fermer',

  'characters.empty_title': 'Encore personne',
  /**
   * `la personne que tu décides d’être` évite d’avoir à choisir entre
   * `celui` et `celle` sur un écran dont tout l’objet est que le joueur n’a
   * pas encore décidé. Pas de point médian : `PLAYER_GRAMMAR.md` règle 4.
   */
  'characters.empty_body':
    'Lance un monde et la personne que tu décides d’être apparaîtra ici, avec tout ce qui lui est arrivé.',
  /** `Parcourir les mondes` — infinitif de navigation, `PRODUCT_VOICE.md` règle 2. */
  'characters.empty_action': 'Parcourir les mondes',

  /**
   * Tient dans le cadre vide où irait le portrait, et il y a très peu de
   * place : 22 caractères contre 15 en anglais. À vérifier sur petit écran.
   */
  'characters.no_portrait_yet': 'Pas encore de portrait',
  /** Génitif reconstruit, puis infinitif de label. Voir l’en-tête du fichier. */
  'characters.portrait_a11y': 'Portrait de {name}. Toucher pour ouvrir la partie.',
  /** `pour` ne s’élide pas : cette clé-ci est sûre quel que soit le nom. */
  'characters.no_portrait_a11y': 'Pas encore de portrait pour {name}.',

  /**
   * `{title} · 12 tours`. Le `·` fait partie de la chaîne.
   *
   * Un tour de jeu — un échange. `tour`, jamais `virage` ni `round`. La branche
   * `one` couvre **zéro autant que un** en français : `0 tour`, `1 tour`,
   * `2 tours`.
   */
  'characters.story_and_turns': '{title} · {count, plural, one {# tour} other {# tours}}',
  /**
   * `à {location}` : les lieux du produit sont des noms propres sans article
   * (`Saltmarket`, `Fort Ember`, `Halcyon Bay`), donc `à` suffit et ne demande
   * ni contraction ni élision.
   */
  'characters.currently_at': 'Actuellement à {location}',
  /** En capitales sur la carte, accents compris. `PASSÉ`, jamais `PASSE`. */
  'characters.what_happened': 'CE QUI S’EST PASSÉ',

  'characters.appearance_label': 'Décris-toi comme tu veux',
  /**
   * Un exemple, donc de l’écriture — pas une consigne.
   *
   * Écrit **sans adjectif accordé** : `Presque deux mètres` dit la taille sans
   * choisir entre `grand` et `grande`, et le reste est nominal
   * (`crâne rasé`, `un manteau…`, `de l’encre…`). Sur l’écran qui pose
   * justement la question du genre, un exemple au masculin y répondrait à la
   * place du joueur.
   */
  'characters.appearance_placeholder':
    'Ex. : Presque deux mètres, crâne rasé, un manteau d’archiviste que je ne quitte jamais, de l’encre jusqu’aux phalanges.',
  /** Label VoiceOver sur le champ. Lu à voix haute, jamais à l’écran. */
  'characters.appearance_a11y': 'Décrire ton apparence',

  /**
   * `Dessiner` — dessiner une image. **Jamais `Tirer`.** Voir l’en-tête : le
   * `draw` du parser, qui veut dire dégainer, est `dégainer` et doit le rester.
   */
  'characters.draw_for_credits': 'Dessiner pour {count, plural, one {# crédit} other {# crédits}}',
  /** Le refaire, en remplaçant le portrait. Même sens de `Dessiner`. */
  'characters.redraw_for_credits':
    'Redessiner pour {count, plural, one {# crédit} other {# crédits}}',
  /** Sur le bouton pendant la génération. Nominal, comme les autres états en cours. */
  'characters.drawing': 'Dessin en cours…',
  'characters.cancel': 'Annuler',
  /** Même sens de `Dessiner` que `characters.draw_for_credits`. */
  'characters.draw_this_character': 'Dessiner ce personnage',
  /** Même sens de `Dessiner`. */
  'characters.redraw_portrait': 'Redessiner le portrait',

  /**
   * La deuxième phrase est le message : rien n’a été perdu. `Tu n’as rien
   * payé.` et non `Aucun débit n’a été effectué.` — on dit ce qu’une personne
   * dirait, pas ce qu’un système journalise.
   */
  'characters.portrait_failed': 'Ce portrait n’est pas allé au bout. Tu n’as rien payé.',
} as const;
