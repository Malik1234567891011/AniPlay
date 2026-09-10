/**
 * Prose that sounds like it said something and did not.
 *
 * "The air shifts." "Something settles behind your ribs." "You feel the weight
 * of that decision." "The tempo of the room changes." Each of these describes a
 * consequence without containing one, and a player cannot act on any of them —
 * they cannot even say what just happened, which is the one thing the writing
 * is obliged to leave them with.
 *
 * The writer policy has banned these in words for a long time and it has never
 * held, for the reason prompt rules never hold: they are what a model reaches
 * for when it has more room than event. That got measurably worse when beat
 * budgets went from 95 words to 260 — the same ten turns produced twice as many
 * of these — which is the honest cost of longer beats and the reason this is
 * now deterministic rather than advisory.
 *
 * The phrase list is deliberately shared with the adversarial sweep, so the
 * thing that measures the problem and the thing that fixes it cannot disagree
 * about what the problem is.
 */

/** Describes a consequence without naming one. */
export const EMPTY_CONSEQUENCE = [
  /\bsuccess with (?:a )?cost\b/i,
  /\bit works,? but it (?:takes|costs) something\b/i,
  /\bsomething (?:shifts|changes|gives|settles|breaks|cold settles)\b[^.!?]{0,30}\b(?:in|between|inside|behind)\b/i,
  /\byou feel (?:a|the) (?:change|shift|weight|difference)\b/i,
  /\bsomething passes between\b/i,
  /\bthe (?:air|room|world|mood|tempo)[^.!?]{0,24}\b(?:changes|shifts|is different)\b/i,
  /\byou have (?:gained|lost) something\b/i,
  /\bnothing is quite the same\b/i,
  /\bthe (?:silence|quiet) (?:stretches|holds|lengthens)\b/i,
  /\bfor a (?:long )?moment,? (?:nothing|no one|nobody)\b/i,
  /\btime seems to slow\b/i,
];

export interface EmptyPhrase {
  readonly blockIndex: number;
  readonly sentence: string;
}

/**
 * The sentences in a beat that assert a change and name none.
 *
 * Reported per sentence rather than per block, because the rest of the block is
 * usually fine and the repair strips sentences.
 */
export function findEmptyConsequences(
  blocks: readonly { readonly type: string; readonly text: string }[],
): EmptyPhrase[] {
  const found: EmptyPhrase[] = [];
  blocks.forEach((block, blockIndex) => {
    // Dialogue is left alone. A person is allowed to speak vaguely; that is
    // characterisation, and it is the narration's job to be concrete.
    if (block.type === 'DIALOGUE') return;
    for (const sentence of block.text.split(/(?<=[.!?])\s+/)) {
      if (EMPTY_CONSEQUENCE.some((pattern) => pattern.test(sentence))) {
        found.push({ blockIndex, sentence: sentence.trim() });
      }
    }
  });
  return found;
}

/** Removes those sentences, keeping the rest of the beat. */
export function stripEmptyConsequences(text: string): string {
  return text
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !EMPTY_CONSEQUENCE.some((pattern) => pattern.test(sentence)))
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
