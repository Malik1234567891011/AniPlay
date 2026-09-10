/**
 * Les titres des rayons de Découvrir.
 *
 * Le haut de l’étagère. C’est la première ligne de français que lit un joueur,
 * et c’est ce que montreront les captures de l’App Store.
 *
 * Le piège est la casse. Quatre de ces six titres sont en Title Case côté
 * anglais (`Trending now`, `For you`, `All worlds`, `New on Plotbreak`) et la
 * Title Case française est le calque qui se voit avant même d’être lu. Les
 * formes retenues sont celles de `UI_AUDIT.md` §2.8, reprises telles quelles.
 *
 * Ces titres voyagent comme des **clés** et sont rendus sur le client, donc ils
 * suivent le changement de langue tout de suite au lieu d’attendre le prochain
 * chargement.
 */
export const rails = {
  /**
   * `En vedette` est le calque (ENGLISH_CALQUE_BLACKLIST §5). `À la une` est ce
   * qu’une une française appelle sa tête d’affiche depuis toujours — et elle
   * garde son accent sur la capitale, qui est un des points sur lesquels un
   * build français se juge.
   */
  'rail.featured': 'À la une',
  /** Étagère personnalisée. `Pour toi` — tu, comme tout le reste du produit. */
  'rail.for_you': 'Pour toi',
  /**
   * La forme que ce public reconnaît déjà. Netflix FR dit « Parce que vous avez
   * regardé… » et c’est la même phrase, en tu, avec ce que le joueur a choisi
   * lui-même. `{tags}` arrive déjà joint par `Intl.ListFormat`, donc sans
   * virgule sérielle : « action, romance et isekai ».
   */
  'rail.for_you_because': 'Parce que tu as choisi {tags}',
  /** `Tendance maintenant` est le mot-à-mot. Un rayon français dit `Tendances`. */
  'rail.trending': 'Tendances',
  /**
   * ⚠️ Cette clé porte le nom de marque, et le nom de marque n’est pas tranché
   * côté anglais : `app.json` dit `AniPlay`, `services/api/src/server.ts:330`
   * dit `Plotbreak`, et toute la doc dit Plotbreak (UI_AUDIT §2.9,
   * APP_STORE_FRANCE, TERMINOLOGY §1.4). On garde ici exactement la marque que
   * porte la clé anglaise. Le jour où l’anglais tranche, cette valeur bouge
   * avec lui — et si la réponse est `AniPlay`, c’est `Nouveautés sur AniPlay`.
   * Un nom de marque ne se traduit pas, ne s’accentue pas, ne s’espace pas.
   */
  'rail.new': 'Nouveautés sur Plotbreak',
  'rail.all': 'Tous les mondes',
} as const;
