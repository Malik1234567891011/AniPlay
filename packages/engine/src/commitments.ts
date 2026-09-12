/**
 * Appointments and promises, and what happens when they come due.
 *
 * The Itachi opening says Fugaku expects Itachi in eighty minutes; the player
 * then tells Sasuke he can have forty of them. Both are load-bearing, and
 * neither was anywhere but in prose — so the clock advanced six minutes a turn,
 * perfectly correctly, while nothing in the world knew there was anything to be
 * late for. The player could wander a tea shop indefinitely and the meeting
 * never arrived, because as far as the engine was concerned there was no
 * meeting.
 *
 * Deliberately general. Nothing here knows about Itachi, shuriken or fathers:
 * it knows that people say they will be somewhere, say they will give somebody
 * their time, and say they will not leave — and that a world worth playing
 * remembers all three.
 *
 * ## Why detection is rules, not a model call
 *
 * It runs on the deterministic path, with no network and no tokens, on every
 * turn including the ones a model never sees. The model *also* proposes
 * commitments (see the director's memory proposals), and the two merge — the
 * rules are the floor, exactly as `VERB_LEXICON` is the floor under the model
 * parser.
 */
import type { CharacterDef, GameState, Obligation, StoryVersion } from '@plotbreak/contracts';

/**
 * A minute count written the way people write it.
 *
 * "forty minutes", "40 minutes", "half an hour", "an hour". Ordered longest
 * first so "an hour and a half" is not read as "an hour".
 */
const DURATIONS: Array<[RegExp, number]> = [
  [/\ban hour and a half\b/i, 90],
  [/\bhalf an hour\b/i, 30],
  [/\ban hour\b|\bone hour\b|\b1 hour\b/i, 60],
  [/\btwo hours\b|\b2 hours\b/i, 120],
  [/\b(\d{1,3})\s*(?:minutes?|mins?)\b/i, -1],
  [/\b(ten|fifteen|twenty|thirty|forty|fifty|sixty|ninety)\s*(?:minutes?|mins?)\b/i, -2],
];

const WORD_MINUTES: Record<string, number> = {
  ten: 10, fifteen: 15, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, ninety: 90,
};

export function minutesIn(text: string): number | null {
  for (const [pattern, fixed] of DURATIONS) {
    const match = pattern.exec(text);
    if (!match) continue;
    if (fixed === -1) return Number(match[1]);
    if (fixed === -2) return WORD_MINUTES[(match[1] ?? '').toLowerCase()] ?? null;
    return fixed;
  }
  return null;
}

/**
 * Language that puts somebody on the hook.
 *
 * The bar is deliberately high. "I'll see" and "maybe later" are not promises
 * and must not become state — a world that remembers every future-tense verb
 * as a vow is worse than one that remembers none, because the player stops
 * being able to speak casually. What is here is the language people use when
 * they mean it.
 */
const COMMITMENT = [
  /\bi (?:promise|swear|give you my word|give you my word on it)\b/i,
  /\bi(?:'| a)?m not going (?:anywhere|to leave)\b/i,
  /\bi(?:'ll| will) (?:be|come|meet|see) you\b/i,
  /\bi(?:'ll| will) (?:be there|come back|return)\b/i,
  /\byou (?:can )?have (?:my|the next)\b/i,
  /\bi(?:'ll| will) give you\b/i,
  /\bi(?:'ll| will) never\b/i,
  /\bi(?:'ll| will) always\b/i,
  /\byou have my word\b/i,
];

/** Language that sets a time to be somewhere. */
const APPOINTMENT = [
  /\b(?:expects?|expecting) (?:me|you)\b/i,
  /\bi(?:'ll| will) be (?:there|back)\b/i,
  /\bmeet (?:me|you|him|her|them)\b/i,
  /\bbe (?:there|back) (?:in|by|at)\b/i,
];

/** Things that are not commitments however they are phrased. */
const NOT_A_COMMITMENT = [
  /\b(?:maybe|might|probably|i think|perhaps|we'll see|i'll try)\b/i,
  /\?\s*$/,
];

export interface DetectedCommitment {
  readonly kind: Obligation['kind'];
  readonly what: string;
  readonly withCharacterId: string | null;
  readonly budgetMinutes: number | null;
  readonly dueWorldMinute: number | null;
}

/**
 * What the player just committed to, if anything.
 *
 * Reads the sentence they actually wrote or tapped, because that is the thing
 * they will later say they said. Summarising it first is how "you can have
 * forty of them" becomes "spent time with brother" and stops being quotable
 * back at them.
 */
export function detectCommitment(
  text: string,
  state: GameState,
  addressee: CharacterDef | null,
): DetectedCommitment | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  if (NOT_A_COMMITMENT.some((p) => p.test(trimmed))) return null;

  const promised = COMMITMENT.some((p) => p.test(trimmed));
  const appointment = APPOINTMENT.some((p) => p.test(trimmed));
  if (!promised && !appointment) return null;

  const minutes = minutesIn(trimmed);

  return {
    kind: appointment && minutes !== null ? 'APPOINTMENT' : 'PROMISE',
    // Their words, capped. A promise is quoted back, not paraphrased.
    what: trimmed.slice(0, 300),
    withCharacterId: addressee?.id ?? null,
    // "forty minutes" said to somebody in the room is a budget you spend by
    // staying. The same phrase in an appointment is a deadline you arrive at.
    budgetMinutes: !appointment && minutes !== null ? minutes : null,
    dueWorldMinute: appointment && minutes !== null ? state.worldMinute + minutes : null,
  };
}

export type ObligationPressure = 'LATER' | 'SOON' | 'NOW' | 'LATE';

/** How hard an obligation is pressing, given the clock. */
export function pressureOf(obligation: Obligation, worldMinute: number): ObligationPressure {
  if (obligation.dueWorldMinute === null) return 'LATER';
  const remaining = obligation.dueWorldMinute - worldMinute;
  if (remaining < 0) return 'LATE';
  if (remaining <= 10) return 'NOW';
  if (remaining <= 30) return 'SOON';
  return 'LATER';
}

/**
 * Spend a time budget, and notice what has come due.
 *
 * Returns facts rather than prose. The director decides whether to surface any
 * of it — an obligation that is *pressing* is worth a line, one that is merely
 * pending is not, and nagging the player every turn about a meeting they have
 * not forgotten is its own failure.
 */
export function advanceObligations(
  state: GameState,
  minutesElapsed: number,
): { obligations: Obligation[]; facts: string[] } {
  const facts: string[] = [];
  const obligations = state.obligations.map((obligation) => {
    if (obligation.status !== 'OPEN') return obligation;

    let next = obligation;

    // A budget is spent by the passage of time, whatever the player did with
    // it. Running it to zero is not a failure — it is the moment the promise
    // has been kept and the *other* thing starts pressing.
    if (next.budgetMinutes !== null) {
      const left = Math.max(0, next.budgetMinutes - minutesElapsed);
      if (left === 0 && next.budgetMinutes > 0) {
        facts.push(`The time you said you would give is up: "${next.what}"`);
      }
      next = { ...next, budgetMinutes: left };
    }

    const before = pressureOf(obligation, state.worldMinute - minutesElapsed);
    const now = pressureOf(next, state.worldMinute);
    if (now !== before) {
      if (now === 'LATE') facts.push(`You are now late for this: "${next.what}"`);
      else if (now === 'NOW') facts.push(`This is due right now: "${next.what}"`);
      else if (now === 'SOON') facts.push(`This comes due shortly: "${next.what}"`);
    }
    return next;
  });

  return { obligations, facts };
}

/**
 * An obligation the player has arrived for.
 *
 * Keeping an appointment is being in the right place with the right person,
 * which the engine already knows — so this does not need the player to say
 * "I am here for the meeting".
 */
export function settleOnArrival(
  state: GameState,
  story: StoryVersion,
  presentIds: readonly string[],
): Obligation[] {
  return state.obligations.map((obligation) => {
    if (obligation.status !== 'OPEN' || obligation.kind !== 'APPOINTMENT') return obligation;
    if (!obligation.withCharacterId) return obligation;
    if (!presentIds.includes(obligation.withCharacterId)) return obligation;
    return { ...obligation, status: 'KEPT' as const };
  });
}
