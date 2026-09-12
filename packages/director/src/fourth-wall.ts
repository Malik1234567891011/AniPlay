import type { NarrativeBlock, StoryVersion } from '@plotbreak/contracts';

/**
 * Spec §16.9 — nobody in the story knows there is a story.
 *
 * Caught in the wild, from Last Five, spoken by a seventeen-year-old on a
 * basketball court: *"Robin, this isn't a game where you can…"*. The refusal
 * was mechanically correct — the world genuinely does not let anyone fly — and
 * it was delivered by a character who had suddenly become aware he was inside
 * software. One line like that costs more than a dozen good paragraphs earn.
 *
 * The check is deliberately narrow. It is looking for the specific register in
 * which a model talks about its own situation — game, player, system, prompt,
 * script, developer, stats, rules — and only where that register is being used
 * about the fiction rather than inside it. "The game is at nine on Saturday" is
 * a sentence in a sports world and must survive; "this isn't a game" must not.
 *
 * Worlds whose premise is meta-fiction opt out through their own tags, because
 * for those the fourth wall is the material.
 */

export interface FourthWallHit {
  readonly blockIndex: number;
  readonly phrase: string;
}

/**
 * Constructions that are only ever about the medium.
 *
 * Each is anchored to a surrounding word that rules out the innocent reading,
 * which is why these are phrases and not a keyword list. A bare "the player"
 * or "the system" appears in plenty of legitimate sentences.
 */
const PATTERNS: ReadonlyArray<{ pattern: RegExp; why: string }> = [
  { pattern: /\b(?:this|it)(?:'s| is| isn't| is not)\s+(?:not\s+)?(?:a|the)\s+(?:game|simulation|story|program)\b/i, why: 'calls the world a game' },
  { pattern: /\bin\s+(?:this|the)\s+game\b/i, why: 'refers to "this game"' },
  { pattern: /\bthe (?:game|engine|system|program|app|simulation)\s+(?:won't|will not|does not|doesn't|can't|cannot|says|decides|requires|allows)\b/i, why: 'attributes agency to the engine' },
  { pattern: /\b(?:the|our|your)\s+(?:developers?|designers?|writers?|programmers?|creators?)\b/i, why: 'refers to the people who made it' },
  { pattern: /\b(?:the|your|a)\s+(?:prompt|AI|A\.I\.|language model|chatbot|algorithm)\b/i, why: 'refers to the model' },
  { pattern: /\bthe (?:script|screenplay|plot|storyline)\s+(?:says|requires|calls for|demands|wants)\b/i, why: 'refers to a script' },
  { pattern: /\b(?:the )?player(?:'s)?\s+(?:character|stats?|inventory|build|input|turn)\b/i, why: 'uses "player" as a system term' },
  { pattern: /\byou (?:don't|do not|can't|cannot) have (?:enough|the)\s+(?:stats?|points?|levels?|XP)\b/i, why: 'quotes a stat as a reason' },
  { pattern: /\b(?:roll(?:ed)? a|failed your|passed your|make a)\s+(?:check|save|saving throw|d20)\b/i, why: 'names the dice' },
  { pattern: /\b(?:that|this) (?:action|move|command|input) (?:is|was) (?:invalid|not allowed|not permitted)\b/i, why: 'reads as an error message' },
  { pattern: /\b(?:break(?:ing)? the fourth wall|meta[- ]?game|game master|dungeon master|\bGM\b)\b/i, why: 'names the medium directly' },
];

/** A world may be about this, in which case none of it applies. */
export function allowsMetaFiction(story: StoryVersion): boolean {
  const tags = story.tags.map((t) => t.toLowerCase());
  return tags.includes('meta') || tags.includes('meta-fiction') || tags.includes('fourth wall');
}

/**
 * Finds blocks that stepped outside the fiction.
 *
 * Dialogue is checked harder than narration only in the sense that it matters
 * more — a narrator saying "the system" is bad, a character saying it is worse
 * — but both are wrong and both are reported.
 */
export function findFourthWallBreaks(
  blocks: readonly NarrativeBlock[],
  story: StoryVersion,
): FourthWallHit[] {
  if (allowsMetaFiction(story)) return [];

  const hits: FourthWallHit[] = [];
  blocks.forEach((block, blockIndex) => {
    for (const { pattern } of PATTERNS) {
      const match = block.text.match(pattern);
      if (match) {
        hits.push({ blockIndex, phrase: match[0] });
        break;
      }
    }
  });
  return hits;
}

/**
 * What the writer is told when it has to try again.
 *
 * Deliberately not "remove that sentence". The offending line is usually
 * carrying real information — that the player cannot do the thing — and the
 * fix is to say the same true thing from inside the world. Deleting it would
 * leave the player with no answer, which is a worse outcome than the break.
 */
export function fourthWallRepairNote(hits: readonly FourthWallHit[]): string {
  const quoted = hits.map((h) => `"${h.phrase}"`).join(', ');
  return (
    `This stepped outside the story: ${quoted}. Nobody here knows they are in a game, that anything is ` +
    'generated, or that there are rules, stats, scripts, prompts or developers. Rewrite the same beat so it ' +
    'says the same true thing from inside the world. If somebody could not do something, the world shows ' +
    'them failing at it — "you leap, and there is nothing in your training that keeps you in the air" — ' +
    'rather than being told it is not permitted. Do not simply delete the information.'
  );
}
