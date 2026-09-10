/**
 * La barre d'onglets.
 *
 * Four labels, in a five-across strip, and French inflates short labels worst —
 * measured mean 1.37x, and a tab bar is made entirely of short labels. So these
 * are the shortest true words rather than the most complete ones:
 * `Bibliothèque` is what the shelf is called and there is no shorter honest
 * French for it, but `Perso` would be slang where `Personnages` is the word.
 * Physically check this strip on a small device before shipping.
 */
export const nav = {
  'nav.discover': 'Découvrir',
  /** La bibliothèque du joueur — ses parties, pas un catalogue. */
  'nav.library': 'Bibliothèque',
  'nav.characters': 'Personnages',
  'nav.profile': 'Profil',
} as const;
