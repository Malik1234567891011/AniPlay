import type { StoryVersion, TurnRecord } from '@plotbreak/contracts';

/**
 * Spec §17.4 — "Again."
 *
 * People speak elliptically, constantly, and a game that answers "Again." with
 * nothing is asking them to talk like a command line. Observed live: a player
 * landed two attacks, then typed "Again, harder" and "Keep going" — and both
 * parsed to no action at all, so the fight simply stopped happening while the
 * player thought they were still swinging.
 *
 * The fix is a rewrite before parsing rather than a special case inside one:
 * "Again, harder" becomes "I attack Kael again, harder", and every parser —
 * model or rule-based — then sees an ordinary sentence. Doing it in either
 * parser would have put it in exactly one of them, which is the mistake this
 * codebase has now made three times.
 *
 * Deliberately conservative. It fires only on inputs that are *nothing but* a
 * continuation, and only when the previous turn actually did something. A
 * sentence with its own verb is never touched.
 */

/** The whole input is a continuation and nothing else. */
const CONTINUATION =
  /^(?:and\s+)?(?:do\s+it\s+)?(?:again|once\s+more|one\s+more\s+time|keep\s+going|carry\s+on|continue|more|don'?t\s+stop|same\s+again|repeat(?:\s+it)?)\b/i;

/**
 * A bare intensifier: "Harder." "Faster." — a modifier with nothing to modify.
 */
const INTENSIFIER =
  /^(?:and\s+)?(?:harder|faster|again\s+but\s+harder|louder|softer|quicker|slower|stronger|properly|for\s+real)\b/i;

/** Words that mean this is its own sentence, not a continuation of one. */
const HAS_OWN_VERB =
  /\b(?:i|we)\s+(?:\w+)\b|\b(?:go|walk|run|ask|tell|say|look|take|attack|hit|use|give|open|read|wait|leave|follow|talk|find|search|check)\b/i;

export interface EllipsisResult {
  readonly text: string;
  readonly expanded: boolean;
  /** For the ambiguity list, so the player can see how it was read. */
  readonly note: string | null;
}

/**
 * What the player was doing last turn, as a sentence fragment.
 *
 * Read from the previous turn's *resolution* rather than its raw text, because
 * the resolution is what the engine agreed happened — including which of
 * several targets it settled on.
 */
function lastAction(
  recentTurns: readonly TurnRecord[],
  story: StoryVersion,
): { verb: string; phrase: string | null; targetName: string | null; raw: string } | null {
  for (let i = recentTurns.length - 1; i >= 0; i--) {
    const turn = recentTurns[i];
    if (!turn?.resolution) continue;

    const action = turn.resolution.normalizedActions.find(
      (a) => (a as { status?: string }).status !== 'REJECTED',
    ) as
      | { verb?: string; abilityId?: string; targetId?: string; targets?: Array<{ entityId?: string }> }
      | undefined;
    if (!action?.verb) continue;
    // A wait is not a thing to do again.
    if (action.verb === 'wait' || action.verb === 'custom') continue;

    const targetId =
      action.targetId ?? action.targets?.find((t) => typeof t.entityId === 'string')?.entityId ?? null;
    const targetName = targetId ? (story.characters.find((c) => c.id === targetId)?.name ?? null) : null;

    // Name the move rather than gesturing at it. "I do that again, harder" is
    // both vague and easy for a writer to mistake for something the player
    // said out loud; "I drive again, harder" is the sentence they meant.
    const ability = action.abilityId
      ? story.abilities.find((a) => a.id === action.abilityId)
      : undefined;
    const phrase = ability ? (ability.affordances[0] ?? ability.name.toLowerCase()) : null;

    return { verb: action.verb, phrase, targetName, raw: turn.actionText ?? '' };
  }
  return null;
}

/** Plain-English verbs, so the expansion reads like something a person typed. */
const VERB_PHRASES: Record<string, string> = {
  attack: 'attack',
  steal: 'take',
  persuade: 'try to convince',
  deceive: 'lie to',
  threaten: 'threaten',
  speak: 'talk to',
  help: 'help',
  oppose: 'push back against',
  move: 'keep going toward',
  travel: 'keep going toward',
  inspect: 'look at',
  use_item: 'use',
  use_ability: 'do that',
  rest: 'keep resting',
  interact: 'do that',
  hide: 'stay hidden',
  defend: 'keep defending',
};

/**
 * Rewrites a bare continuation into the sentence it means.
 *
 * Returns the input untouched when there is nothing to continue, which is the
 * right answer: "Again." on the very first turn is genuinely ambiguous and the
 * ordinary path will ask about it rather than guess.
 */
export function expandElliptical(
  actionText: string,
  recentTurns: readonly TurnRecord[],
  story: StoryVersion,
): EllipsisResult {
  const text = actionText.trim();
  const isContinuation = CONTINUATION.test(text);
  const isIntensifier = INTENSIFIER.test(text);
  if (!isContinuation && !isIntensifier) return { text: actionText, expanded: false, note: null };

  // "Again, I go to the archive" carries its own verb and is not elliptical.
  const remainder = text.replace(CONTINUATION, '').replace(INTENSIFIER, '').trim();
  if (HAS_OWN_VERB.test(remainder)) return { text: actionText, expanded: false, note: null };

  const previous = lastAction(recentTurns, story);
  if (!previous) return { text: actionText, expanded: false, note: null };

  const phrase = previous.phrase ?? VERB_PHRASES[previous.verb] ?? previous.verb.replace(/_/g, ' ');
  const target = previous.targetName ? ` ${previous.targetName}` : '';

  // The player's own words are kept on the end, because "harder" and "keep
  // going" are not decoration — they are how the thing is being done, and the
  // writer should see them.
  const expanded = `I ${phrase}${target} ${text.toLowerCase()}`.replace(/\s+/g, ' ').trim();

  return {
    text: expanded,
    expanded: true,
    note: `Read "${text}" as continuing your last action${previous.targetName ? ` on ${previous.targetName}` : ''}.`,
  };
}
