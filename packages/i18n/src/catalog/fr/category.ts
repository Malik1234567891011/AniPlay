/**
 * Les catégories de navigation. Voir `en/category.ts` pour le pourquoi.
 *
 * Des mots ordinaires, jamais du vocabulaire de genre qu’il faudrait
 * apprendre — c’est la règle que `CATEGORIES` se donne en anglais et elle vaut
 * ici aussi. D’où `École` plutôt que `Vie scolaire`, qui est le terme exact des
 * catalogues de manga et qui est exactement le genre de mot que cette liste
 * refuse.
 *
 * `Action`, `Romance` et `Sports` ne bougent pas : ce sont les mots français.
 * `Fantasy` non plus — en français, la fantasy est la fantasy, et
 * `Fantastique` désigne un autre genre (le surnaturel qui fait douter), pas
 * celui-ci. Les traduire serait une erreur de sens déguisée en zèle.
 */
export const category = {
  'category.action': 'Action',
  'category.romance': 'Romance',
  'category.fantasy': 'Fantasy',
  /** Le genre, au singulier, comme un rayon de librairie. */
  'category.sports': 'Sport',
  'category.mystery': 'Mystère',
  'category.school': 'École',
  'category.adventure': 'Aventure',
  'category.horror': 'Horreur',
  'category.drama': 'Drame',
} as const;
