/**
 * The chatbot tell.
 *
 * Caught in the wild on a basketball court, from a third-year introducing
 * himself: *"Dai Okonkwo, Sora, and glad to have you here twice in one minute.
 * Go long next drill, Kai'll find you, Sora, Sora, you'll see."* Three
 * vocatives in two sentences. Nobody has ever spoken like that; a customer
 * service bot has.
 *
 * The writer prompt says `playerName` is there so characters can say it out
 * loud, and the model reads that as an instruction to keep saying it. Guidance
 * alone will not hold — this is the failure mode language models have had
 * since the beginning — so it is caught deterministically and fixed in place.
 *
 * Fixed rather than dropped: the line is otherwise good, and deleting a block
 * over punctuation would cost the player the beat.
 */

/** Direct address — the name set off by punctuation, which is how people call someone. */
function vocativePatterns(name: string): RegExp[] {
  const n = escape(name);
  return [
    // ", Sora," / ", Sora." / ", Sora?"  — mid-sentence address.
    new RegExp(`,\\s*${n}\\s*(?=[,.!?;:])`, 'gi'),
    // "Sora, " at the start of a sentence or a quote.
    new RegExp(`(^|[.!?]\\s+|["“”]\\s*)${n},\\s*`, 'gi'),
    // "…you, Sora." — trailing address before the stop.
    new RegExp(`,\\s*${n}(?=\\s*["“”]?\\s*$)`, 'gi'),
  ];
}

function escape(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** How many times a line calls the player by name. */
export function nameCount(text: string, playerName: string): number {
  const first = playerName.trim().split(/\s+/)[0] ?? '';
  if (first.length < 3) return 0;
  return text.match(new RegExp(`\\b${escape(first)}\\b`, 'gi'))?.length ?? 0;
}

/**
 * Keeps the first way a line addresses the player and removes the rest.
 *
 * Only vocatives. "Kai'll find you" and "Sora will start on Friday" are the
 * name doing work in the sentence, and stripping those would break the prose
 * to fix its manners.
 */
export function stripSurplusVocatives(text: string, playerName: string): string {
  const first = playerName.trim().split(/\s+/)[0] ?? '';
  if (first.length < 3) return text;

  let kept = false;
  let out = text;
  for (const pattern of vocativePatterns(first)) {
    out = out.replace(pattern, (match, lead: string | undefined) => {
      if (!kept) {
        kept = true;
        return match;
      }
      // Put back whatever opened the sentence, and the punctuation that ended
      // the clause, so removing the address does not fuse two sentences.
      if (lead !== undefined) return lead;
      return match.startsWith(',') ? '' : match;
    });
  }
  return recapitalise(out.replace(/\s{2,}/g, ' ').replace(/\s+([,.!?;:])/g, '$1').trim());
}

/**
 * Removing "Sora, " from the front of a sentence leaves "please." where
 * "Please." belongs. Fixing the manners must not break the grammar.
 */
function recapitalise(text: string): string {
  return text.replace(/(^|[.!?]\s+|["“”]\s*)(\p{Ll})/gu, (_m, lead: string, letter: string) =>
    lead + letter.toUpperCase(),
  );
}

/** Three in one line is not emphasis. Two can be. */
export const NAME_SPAM_THRESHOLD = 3;

/** The marker `repairNarrative` keys on, kept in one place so it cannot drift. */
export const NAME_SPAM_MARKER = 'says the player’s name';
