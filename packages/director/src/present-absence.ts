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
  // Not here *yet*, which is the same claim pointed at the future.
  //
  // The third distinct wording this bug has arrived in — "Coach Torakawa isn't
  // here", "the platform is empty except for you", and "Mina hasn't come up
  // the platform, not yet" — so this one is written as a shape rather than a
  // phrase: a negated arrival, whatever verb it uses.
  /\b(?:has|have|had)(?:n['’]t|\s+not)\s+(?:yet\s+)?(?:come|arrived|shown|turned|appeared|made\s+it)\b/i,
  /\b(?:is|are|was|were)(?:n['’]t|\s+not)\s+(?:here|there|around)\s+yet\b/i,
];

/** "empty except for her" is a full room of one person, not an absence. */
const PRESENT_ANYWAY = /\b(?:except|save|apart|but)\s+(?:for|from)\b/i;

/**
 * Prose that empties the room without naming anybody in it.
 *
 * Caught live in Seven Days. The player asked Mina about the clock tower and
 * the beat answered "The platform is empty except for you and the sound of
 * your own words." She was standing in front of them. The sentence names
 * nobody, so the per-character check above never looked at it.
 *
 * "Except for you" is the giveaway and the reason the exemption below cannot
 * be a blanket one: "empty except for Torakawa" means she is there, and "empty
 * except for you" means everybody else is gone.
 */
const EMPTIED_ROOM = [
  /\b(?:is|are|was|were|stands?|stood|sits?|sat)\s+(?:completely\s+|quite\s+|otherwise\s+)?empty\s+(?:except|save|but)\s+for\s+(?:you|your)\b/i,
  /\byou\s+are\s+(?:completely\s+|quite\s+|entirely\s+)?alone\b/i,
  /\b(?:there\s+is|there's)\s+no\s?(?:one|body)\s+(?:else\s+)?(?:here|there|around|left)\b/i,
  /\bnobody\s+else\s+(?:is|was)\s+(?:here|there|around)\b/i,
  // Subject first, which the "there is nobody" form above does not cover.
  /\b(?:nobody|no\s?one)\s+(?:is|was)\s+(?:here|there|around|coming)\b/i,
  /\bthe\s+\w+\s+(?:is|was)\s+(?:completely\s+)?deserted\b/i,
];

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

  // And the version that names nobody at all.
  if (present.length > 0) {
    blocks.forEach((block, blockIndex) => {
      for (const sentence of block.text.split(/(?<=[.!?])\s+/)) {
        if (!EMPTIED_ROOM.some((pattern) => pattern.test(sentence))) continue;
        claims.push({
          characterId: present[0]!.id,
          name: present.map((c) => c.name).join(', '),
          blockIndex,
          sentence: sentence.trim().slice(0, 140),
        });
        break;
      }
    });
  }

  return claims;
}

function escape(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
