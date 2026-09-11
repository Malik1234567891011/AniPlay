/**
 * What an NPC remembers, and how it is said.
 *
 * These are the strings `LOCALIZATION_ARCHITECTURE.md` §5 calls the worst
 * finding in the audit. They were English sentences built by template in
 * `director.ts`, stored, retrieved, and handed to the writer as
 * `speakers[].knows` and to the choice generator as `remembered` — so in a
 * French session the model read English sentences **in its own context window
 * every single turn**, and it got worse the longer the session ran, because
 * memory accumulates.
 *
 * They were never really prose. They were structured facts wearing prose:
 * an actor, a target, a verb, a place and a minute. The structure now lives in
 * `MemoryProposal.value` — which is `z.unknown()` in the AI contract and was
 * always the right place for it — and these keys are how it is said.
 *
 * Three consequences, all good: no English reaches a French context window; a
 * run's memory is locale-portable, so the same session can be read in either
 * language, which is what makes QA comparison possible at all; and the facts
 * became queryable, because `HOSTILE_ACT against X` is a predicate where
 * `"threatened and belittled"` was a string.
 */
export const memory = {
  /** `{time}` is already the run's world clock, in the run's locale. */
  'memory.attack': '{actor} attacked {target} at {location}, {time}.',
  /**
   * A social act an NPC carries with them.
   *
   * The verb is an **id** and stays one — `select`, not a translated word
   * spliced in. Described from the verb rather than from the player's own
   * sentence, because the raw text is untrusted and a memory is something the
   * world asserts.
   */
  'memory.hostile_act':
    '{actor} {verb, select, threaten {threatened and belittled} deceive {lied to} oppose {refused and stood against} other {was hostile to}} {target} at {location}, {time}.',
  'memory.witnessed_violence': '{witness} saw {actor} attack someone at {location}.',
  /** A check that went unusually well or unusually badly. `—` is U+2014. */
  'memory.notable_moment': '{label} — {outcome}',

  // --- The generic renderer -----------------------------------------------
  // A fact whose value is not structured still has to read as a sentence. The
  // shapes below are exactly what `renderFactText` produced before it took a
  // locale, so English is unchanged.
  'memory.sentence': '{subject} {phrase}.',
  'memory.sentence_no': '{subject} {phrase}: no.',
  'memory.sentence_value': '{subject} {phrase}: {value}',
  /** The player, when their name is not known. Capitalised — it starts a sentence. */
  'memory.you': 'You',

  // --- Predicate phrases ---------------------------------------------------
  /**
   * The predicate, as words.
   *
   * The English values are exactly `predicate.replace(/_/g, ' ')`, which is what
   * the code did before — deliberately, so that keying this changed nothing.
   * A predicate with no key here still falls back to that substitution, so a
   * world or a model that invents one keeps working.
   */
  'memory.predicate.notable_moment': 'notable moment',
  'memory.predicate.was_attacked_by_player': 'was attacked by player',
  'memory.predicate.was_treated_badly_by_player': 'was treated badly by player',
  'memory.predicate.witnessed_violence': 'witnessed violence',
  'memory.predicate.warmed_toward_player': 'warmed toward player',
  'memory.predicate.cooled_toward_player': 'cooled toward player',
  'memory.predicate.route_taken': 'route taken',
  'memory.predicate.quest_state': 'quest state',
  'memory.predicate.discovered_location': 'discovered location',
} as const;
