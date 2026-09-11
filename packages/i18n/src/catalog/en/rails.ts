/**
 * Discover rail titles.
 *
 * These are assembled **server-side** (`services/api/src/server.ts`), which is
 * why a French build that translated every `.tsx` string would still have said
 * `Trending now`. They are the clearest example of `UI_AUDIT.md` §5: a
 * client-only localization project cannot reach them.
 *
 * They travel as **keys**, not as rendered text, unlike the world clock and the
 * relationship ladder. The difference is who they belong to: the clock belongs
 * to a *run* and is read by the model, so it is rendered in the run's frozen
 * locale; a rail title is interface chrome and belongs to whoever is looking at
 * the shelf. Rendering it on the client means it follows the language switch
 * immediately instead of going stale until the next fetch.
 *
 * Sentence case, and **not** French Title Case when these are translated —
 * `Tendances`, `Pour toi`, `Tous les mondes`. See `PRODUCT_VOICE.md`.
 */
export const rails = {
  'rail.featured': 'Featured',
  /** Personalised shelf. `Pour toi` — tu, like the rest of the product. */
  'rail.for_you': 'For you',
  /** `{tags}` is already joined with `Intl.ListFormat`, so no Oxford comma in French. */
  'rail.for_you_because': 'Because you picked {tags}',
  /** Real play behind it, not an editorial claim. */
  'rail.trending': 'Trending now',
  /** Carries the brand name. Settled: the product is Plotbreak everywhere. */
  'rail.new': 'New on Plotbreak',
  'rail.all': 'All worlds',
  /** The like count, descending. Rank is shown beside the card. */
  'rail.top_ranked': 'Top ranked',
} as const;
