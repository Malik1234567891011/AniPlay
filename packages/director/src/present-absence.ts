/**
 * The writer writing somebody out of the room they are standing in.
 *
 * Caught live in Last Five. The opening beat has Coach Torakawa at the edge of
 * the court with her arms folded, and gives her a line. The player walks over
 * and puts an ultimatum to her. The next beat: *"You look for Coach Torakawa,
 * but there is only an empty folding chair, her jacket slung over it,"* and a
 * teammate saying *"You are talking to the wrong person."*
 *
 * The engine had her present the whole time. Nothing was capped and nothing was
 * hidden — the writer was handed her name, her voice, and what she knows, and
 * chose absence anyway, because an empty chair is an easier beat than a coach
 * who has to answer a hard question.
 *
 * That is the shape of it: absence is not a continuity slip here, it is an
 * escape hatch from a scene the player earned. The prompt now forbids it and
 * this catches what the prompt does not hold.
 */

/**
 * Ways a sentence says the person it is about is not here.
 *
 * Tested only against sentences that name a present character, which is what
 * lets them stay this loose without misreading ordinary prose. "The gym is
 * empty except for Torakawa" is about an empty room and a present person, so
 * the exemptions below matter as much as the patterns.
 */
const ABSENCE = [
  // Contractions included, and the typographic apostrophe with them: the live
  // beat that slipped through the first version of this said "Coach Torakawa
  // isn’t here", which the spelled-out pattern did not match. The negation is
  // required, not optional — "is here" must never match.
  /\b(?:is|are|was|were)(?:n['’]t\s+|\s+(?:not|no longer)\s+)(?:here|there|around|coming)\b/i,
  /\b(?:is|are|was|were)\s+(?:gone|missing|absent|elsewhere|nowhere)\b/i,
  /\bno\s+(?:sign|sight|trace)\s+of\b/i,
  /\b(?:look|looked|looking|search|searched|scan|scanned)\b[^,]{0,40}\bfor\b[^,]{0,40},?\s*but\b/i,
  /\b(?:has|had|have)\s+(?:already\s+)?(?:left|gone)\b/i,
  /\b(?:only|just)\s+(?:an?\s+)?(?:\w+\s+){0,2}empty\s+\w+/i,
  /\bnowhere\s+(?:to\s+be\s+)?(?:seen|found)\b/i,
];

/** "empty except for her" is a full room of one person, not an absence. */
const PRESENT_ANYWAY = /\b(?:except|save|apart|but)\s+(?:for|from)\b/i;

export interface AbsenceClaim {
  readonly characterId: string;
  readonly name: string;
  readonly blockIndex: number;
  readonly sentence: string;
}

/**
 * Finds a present character the prose has written out of the room.
 *
 * Reported per block so the repair can drop the guilty block rather than the
 * beat, and matched on the surname as well as the full name because prose
 * alternates between "Coach Torakawa" and "Torakawa" in one paragraph.
 */
export function findAbsenceOfPresent(
  blocks: readonly { readonly text: string }[],
  present: readonly { readonly id: string; readonly name: string }[],
): AbsenceClaim[] {
  const claims: AbsenceClaim[] = [];

  blocks.forEach((block, blockIndex) => {
    const sentences = block.text.split(/(?<=[.!?])\s+/);
    for (const character of present) {
      const names = [character.name, character.name.split(/\s+/).at(-1) ?? ''].filter(
        (name) => name.length >= 3,
      );
      const sentence = sentences.find(
        (candidate) =>
          names.some((name) => new RegExp(`\\b${escape(name)}\\b`, 'i').test(candidate)) &&
          !PRESENT_ANYWAY.test(candidate) &&
          ABSENCE.some((pattern) => pattern.test(candidate)),
      );
      if (!sentence) continue;
      claims.push({
        characterId: character.id,
        name: character.name,
        blockIndex,
        sentence: sentence.trim().slice(0, 140),
      });
    }
  });

  return claims;
}

function escape(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
