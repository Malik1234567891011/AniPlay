/**
 * Ce que les dés décident, du point de vue du joueur. Voir `en/check.ts`.
 *
 * Deux formes, comme en anglais : un verbe quand la cible a un nom
 * (« Frapper Sasuke »), un nom quand le jet se suffit à lui-même
 * (« Discrétion »). Les seconds sont des noms de compétence, pas des ordres.
 */
export const check = {
  'check.persuade': 'Persuader {name}',
  'check.deceive': 'Tromper {name}',
  'check.threaten': 'Intimider {name}',
  'check.oppose_character': 'Tenir tête à {name}',
  /** « Se ranger du côté de » est juste et trop long pour une puce. */
  'check.help_character': 'Soutenir {name}',
  'check.strike': 'Frapper {name}',
  'check.take': 'Prendre {name}',
  'check.take_it': 'ça',
  'check.inspect': 'Enquête',
  'check.hide': 'Discrétion',
  /** Le terme de jeu de rôle consacré. */
  'check.steal': 'Escamotage',
  'check.interact': 'Interaction',
  'check.defend': 'Garde',
  'check.help': 'Aide',
  'check.oppose': 'Résistance',
  'check.custom': 'Tentative',
  'check.move': 'Déplacement',
  /**
   * ⚠️ `Ébranlé` s’accorde, et le joueur peut être de n’importe quel genre —
   * `Ébranlé(e)` est un point médian déguisé et la règle l’interdit.
   * « Sous le choc » est invariable et dit exactement la même chose.
   */
  'status.shaken': 'Sous le choc',
  'status.shaken_description': 'Ça t’a coûté plus que ça n’aurait dû.',
} as const;
