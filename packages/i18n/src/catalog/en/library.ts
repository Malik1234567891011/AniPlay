/** LB-01 / LB-02 — the library shelf and the run-management sheet. */
export const library = {
  /**
   * A playthrough of a world. Not a running total, not a sprint, not a print
   * run. French: `partie`.
   */
  'library.runs': '{count, plural, one {# run} other {# runs}}',
  /** A game turn — one exchange. French `tour`, never `virage`. */
  'library.turns': '{count, plural, one {# turn} other {# turns}}',
} as const;
