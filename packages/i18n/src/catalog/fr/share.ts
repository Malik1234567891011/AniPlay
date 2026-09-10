/**
 * SH-01 — la feuille de partage, et la carte qu’elle exporte.
 *
 * ## Le nom de l’écran et le verbe du bouton
 *
 * English says `Share` twice and means two different things. French does not
 * have to: `share.title` is the name of the screen and becomes a noun,
 * `share.action` is what the tap does and stays a verb. The two keys exist for
 * exactly this, and collapsing them back onto one word would be translating
 * the English rather than writing the French.
 *
 * ## Les capitales gardent leurs accents
 *
 * `share.card_what_i_typed` and `share.card_what_happened` are printed on the
 * exported card in capitals. **`É` et pas `E`.** The Académie française
 * position is that the accent has full orthographic value on a capital, and
 * `CE QUI S'EST PASSE` is a cheap, obvious tell that costs nothing to avoid —
 * it is also `fr-lint` FR027. The card is a fixed 288 pt frame, so these are
 * the shortest honest forms: `CE QUE J'AI ÉCRIT` (17) against `WHAT I TYPED`
 * (12) is the inflation to check on device before shipping.
 *
 * ## Les guillemets
 *
 * `share.currently_shows` quotes the player's own display name back at them.
 * English closes `“ ”` up against the word; French opens `«`, puts a **U+00A0
 * inside on both sides**, and closes `»`. The characters are written literally
 * rather than escaped, so the whole convention is visible in one glance — and
 * the space between `«` and `{name}` is the one somebody will one day
 * « nettoyer » without knowing what it was.
 *
 * `spoiler` / `un spoil` — le mot du fandom français. Jamais `divulgâcher`,
 * qui est québécois et se voit immédiatement (`TERMINOLOGY.md` §2.2).
 */
export const share = {
  /** Le nom de l’écran : un nom. Le bouton, c’est `share.action`. */
  'share.title': 'Partage',
  /** Label VoiceOver sur la croix qui referme la feuille. */
  'share.close': 'Fermer',
  'share.preview_note': 'C’est exactement ce qui sera partagé.',

  'share.what_to_share': 'Ce que tu partages',
  /**
   * Une carte qui résume la scène — ni une carte de crédit, ni une fiche.
   * `récap` est le mot courant en français, pas une abréviation paresseuse.
   */
  'share.artifact_recap': 'Carte récap',
  'share.artifact_recap_blurb': 'Le moment, tel que l’histoire l’a raconté.',
  /** L’action que le joueur a tapée lui-même. */
  'share.artifact_typed': 'Ce que j’ai écrit',
  'share.artifact_typed_blurb': 'Tes mots d’un côté, ce qui s’est passé de l’autre.',
  /**
   * `hero` au sens de la mise en page — la grande image — et pas un
   * personnage héroïque. `l’illustration` est le mot du produit
   * (`TERMINOLOGY.md` §3.1) et ne peut pas se lire comme un héros.
   */
  'share.artifact_hero': 'L’illustration',
  'share.artifact_hero_blurb': 'L’image, avec le nom du monde dessus.',

  'share.spoiler_title_label': 'Un titre qui ne dévoile rien',
  /**
   * `Facultatif`, pas `Optionnel`. `pour publier` plutôt que `pour que tu
   * puisses publier` : le subjonctif de service est banni et l’infinitif dit
   * la même chose en trois mots de moins.
   */
  'share.spoiler_title_hint':
    'Facultatif. Affiché à la place du nom du monde, pour publier un moment sans le spoiler.',
  /**
   * Un exemple, donc de l’écriture. `Ce truc qui` est ce qu’un joueur
   * écrirait vraiment pour ne rien dire — un titre qui pointe sans nommer.
   */
  'share.spoiler_title_placeholder': 'Ex. : Ce truc qui s’est passé dans l’escalier',
  /** Label VoiceOver sur le champ de titre. Lu à voix haute, jamais à l’écran. */
  'share.spoiler_title_a11y': 'Titre sans spoil',

  'share.hide_name': 'Masquer mon nom',
  /** Guillemets français, U+00A0 à l’intérieur des deux côtés. */
  'share.currently_shows': 'Affiche actuellement « {name} ».',
  'share.nothing_to_hide': 'Rien à masquer — il n’y a pas de nom dessus.',

  /** Le bouton : le verbe, ce que fait le geste. Voir `share.title`. */
  'share.action': 'Partager',
  /** Sur le bouton pendant la capture. Nominal, comme `Se connecter` → `Connexion…`. */
  'share.preparing': 'Préparation…',
  /**
   * `n’en sort que quand` porte le `only` sans avoir besoin d’un adverbe en
   * plus. `fondé sur` / `à partir de`, jamais `basé sur`.
   */
  'share.privacy_note':
    'L’image est créée sur ton téléphone et n’en sort que quand tu choisis où l’envoyer.',

  /**
   * Imprimé sur la carte exportée, en capitales — accents compris.
   * `CE QUE J’AI ÉCRIT`, jamais `CE QUE J’AI ECRIT`.
   */
  'share.card_what_i_typed': 'CE QUE J’AI ÉCRIT',
  'share.card_what_happened': 'CE QUI S’EST PASSÉ',

  'share.unavailable': 'Le partage n’est pas disponible sur cet appareil.',
  'share.failed': 'Impossible de partager pour le moment.',
} as const;
