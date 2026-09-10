/**
 * The player is "you".
 *
 * Every screen in the product addresses the player directly, the engine's own
 * observable facts are written that way, and the premise is too. A writer given
 * `playerName` will nonetheless sometimes narrate "Robin lunges toward her",
 * and the result reads like watching someone else play: the player typed "I hit
 * her" and the story answered in the third person.
 *
 * This converts a narration block back. It is a repair, not a style pass — the
 * instruction to write in second person lives in the writer's policy, and this
 * is what catches the times it does not.
 */

/** Irregular third-person-singular forms, which no rule covers. */
const IRREGULAR: Record<string, string> = {
  is: 'are',
  was: 'were',
  has: 'have',
  does: 'do',
  goes: 'go',
  says: 'say',
  isn: 'aren',
  hasn: 'haven',
  doesn: 'don',
  wasn: 'weren',
};

/** "lunges" → "lunge", "watches" → "watch", "tries" → "try". */
function toBaseForm(verb: string): string {
  const lower = verb.toLowerCase();
  const irregular = IRREGULAR[lower];
  if (irregular) return matchCase(verb, irregular);
  if (!/s$/.test(lower) || /ss$/.test(lower)) return verb;
  if (/ies$/.test(lower)) return matchCase(verb, `${lower.slice(0, -3)}y`);
  if (/(ch|sh|x|z|o|ss)es$/.test(lower)) return matchCase(verb, lower.slice(0, -2));
  return matchCase(verb, lower.slice(0, -1));
}

function matchCase(original: string, replacement: string): string {
  if (original[0] && original[0] === original[0].toUpperCase()) {
    return replacement[0]!.toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

/**
 * Words that follow a name without being its verb, so the agreement fixer does
 * not mangle "Robin, still holding the letter, …" or "Robin and Kael watch".
 */
const NOT_A_VERB = new Set([
  'and', 'or', 'but', 'the', 'a', 'an', 'to', 'in', 'on', 'at', 'with', 'from', 'for', 'of',
  'still', 'already', 'never', 'always', 'just', 'only', 'then', 'now', 'here', 'there',
  'who', 'whose', 'which', 'that', 'this',
]);

/**
 * Rewrites third-person references to the player into second person.
 *
 * Only ever called on narration. A character calling the player by name in
 * dialogue is correct and is left alone.
 */
export function toSecondPerson(text: string, playerName: string): string {
  // Never inside quotation marks, whatever kind of block this is.
  //
  // Somebody calling the player by name out loud is correct, and rewriting it
  // produces nonsense: a line that ended "I have no wish to explain myself to
  // the Fleet this morning, Sable." reached the player as "…this morning, you."
  // The block had been misparsed as narration — that is fixed at the source —
  // but the invariant belongs here, because quoted speech is somebody speaking
  // however the block ended up labelled.
  return outsideQuotes(text, (span) => rewriteNarration(span, playerName));
}

/** Applies a rewrite to everything except the quoted spans. */
function outsideQuotes(text: string, rewrite: (span: string) => string): string {
  const parts = text.split(/([“"][^“”"]*[”"])/g);
  return parts.map((part, index) => (index % 2 === 1 ? part : rewrite(part))).join('');
}

function rewriteNarration(text: string, playerName: string): string {
  const names = [playerName.trim(), playerName.trim().split(/\s+/)[0] ?? '']
    .filter((name) => name.length > 1)
    // Longest first, so "Robin Vale" is consumed before "Robin".
    .sort((a, b) => b.length - a.length);
  if (names.length === 0) return text;

  let out = text;
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Possessive first: "Robin's hand" → "your hand". Always lowercase; a name
    // is capitalised wherever it stands, so its own case says nothing about
    // whether it began a sentence. The pass at the end decides that.
    out = out.replace(new RegExp(`\\b${escaped}['’]s\\b`, 'g'), 'your');

    // Then the name itself, fixing the verb that follows it.
    out = out.replace(
      new RegExp(`\\b${escaped}\\b(\\s+)([A-Za-z']+)?`, 'g'),
      (_match, gap: string, next: string | undefined) => {
        const you = 'you';
        if (!next) return you;
        return NOT_A_VERB.has(next.toLowerCase()) ? `${you}${gap}${next}` : `${you}${gap}${toBaseForm(next)}`;
      },
    );
    out = out.replace(new RegExp(`\\b${escaped}\\b`, 'g'), 'you');
  }

  // Restore the capital wherever the replacement now starts a sentence.
  return out.replace(/(^|[.!?][)"'”’]?\s+)(you|your)\b/g, (_match, lead: string, word: string) =>
    `${lead}${word[0]!.toUpperCase()}${word.slice(1)}`,
  );
}

/** True when narration is talking about the player as though they were an NPC. */
export function narratesPlayerInThirdPerson(text: string, playerName: string): boolean {
  const first = playerName.trim().split(/\s+/)[0];
  if (!first || first.length < 2) return false;
  return new RegExp(`\\b${first.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text);
}
