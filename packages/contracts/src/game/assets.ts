/**
 * Asset key derivation.
 *
 * Every generated asset is addressed by a key derived from the story and the
 * entity it belongs to. Both the generator and the story definitions call these,
 * so a story can never declare a key the generator would not produce — the class
 * of bug where art silently fails to load is designed out rather than tested for.
 */

export function coverAssetKey(storyId: string): string {
  return `${storyId}/cover`;
}

export function keyArtAssetKey(storyId: string): string {
  return `${storyId}/key`;
}

export function locationAssetKey(storyId: string, locationId: string): string {
  return `${storyId}/stage_${locationId}`;
}

export function characterAssetKey(storyId: string, characterId: string): string {
  return `${storyId}/${characterId}`;
}

export function playerPortraitAssetKey(storyId: string, displayName: string, variant: number): string {
  const slug = displayName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  return `player/${storyId}/${slug}_v${variant}`;
}

export function heroFrameAssetKey(turnId: string): string {
  return `hero/${turnId}`;
}

/**
 * Spec §19.7 — the emotions a character can be shown feeling.
 *
 * A fixed, small vocabulary because these are *cached assets*, not bespoke
 * generations: the whole point of a reaction frame is that it is already on
 * the device when the player needs it. Eight covers the range an ordinary
 * conversation moves through; a world that wants more can author more, and one
 * that has none falls back to the character's portrait.
 */
export const REACTION_EMOTIONS = [
  'neutral',
  'warm',
  'amused',
  'surprised',
  'confused',
  'annoyed',
  'angry',
  'worried',
] as const;
export type ReactionEmotion = (typeof REACTION_EMOTIONS)[number];

/**
 * What an authored expression is, in the eight the generator actually draws.
 *
 * Worlds name expressions in their own voice — Sasuke is `sulking`, a captain is
 * `implacable`, a coach is `unimpressed` — and the reaction decks are generated
 * from the fixed eight above. Nothing reconciled the two, so an authored name
 * became an asset key that had never been drawn and the frame 404'd in silence.
 *
 * Measured across the catalog when this was written: **257 of 374 authored
 * expressions had no asset — 69%.** Sixty-four of Itachi's eighty-nine files are
 * reaction frames and only `neutral` was reachable, which is why a world with
 * eighty-nine images on disk looked like a world with almost none.
 *
 * Mapping rather than renaming, deliberately. The authored word is good writing
 * and the director reads it; it just has to resolve to a face that exists.
 */
const EMOTION_SYNONYMS: Record<string, ReactionEmotion> = {};
const groupSynonyms = (emotion: ReactionEmotion, ...words: string[]): void => {
  for (const word of words) EMOTION_SYNONYMS[word] = emotion;
};

groupSynonyms('warm', 'kind', 'kindly', 'gentle', 'friendly', 'approving', 'pleased',
  'quietly pleased', 'gracious', 'courteous', 'polite', 'sincere', 'earnest', 'softened',
  'soft', 'relieved', 'sorry', 'regretful', 'teasing', 'flirting', 'proud', 'eager', 'bright');
groupSynonyms('amused', 'delighted', 'grinning', 'wry', 'joking', 'laughing', 'sheepish',
  'dry', 'vindicated');
groupSynonyms('surprised', 'shaken', 'stricken', 'thrown', 'rattled', 'caught', 'caught out',
  'appalled', 'flustered', 'briefly undone', 'unsettled', 'reluctantly impressed');
groupSynonyms('confused', 'uncertain', 'conflicted', 'sceptical', 'skeptical', 'considering',
  'thinking', 'assessing', 'calculating', 'unreadable', 'evasive', 'shifty');
groupSynonyms('annoyed', 'stern', 'unimpressed', 'impatient', 'exasperated', 'displeased',
  'clipped', 'blunt', 'sharp', 'cold', 'hard', 'disappointed', 'stubborn', 'sulking',
  'competitive', 'warning', 'stung', 'defiant');
groupSynonyms('angry', 'furious', 'implacable', 'grim');
groupSynonyms('worried', 'hurt', 'wounded', 'afraid', 'frightened', 'nervous', 'troubled',
  'guarded', 'concerned', 'panicked', 'cornered', 'haunted', 'grieving', 'sorrowful', 'sad',
  'devastated', 'weary', 'exhausted', 'tired', 'flagging', 'hollow', 'guilty', 'embarrassed',
  'resigned', 'distant', 'closed', 'grave', 'urgent', 'alert', 'watchful', 'wary', 'alarmed',
  'suspicious');
groupSynonyms('neutral', 'serious', 'level', 'flat', 'still', 'quiet', 'silent', 'patient',
  'focused', 'absorbed', 'attentive', 'direct', 'candid', 'precise', 'technical', 'determined',
  'resolved', 'decisive', 'careful', 'conceding');

// The six worlds written after the map above brought thirty-two more words with
// them. Same rule: the authored word stays, it just has to land on a face.
groupSynonyms('warm', 'fond', 'engaged', 'enthusiastic', 'interested', 'unburdened', 'unguarded');
groupSynonyms('amused', 'sardonic', 'animated');
groupSynonyms('surprised', 'exposed', 'undone', 'undefended', 'awake');
groupSynonyms('confused', 'curious', 'deflecting');
groupSynonyms('annoyed', 'bored', 'immovable', 'shut down', 'contemptuous');
groupSynonyms('worried', 'anxious', 'breaking', 'failing', 'lost', 'uncomfortable', 'unnerved',
  'wretched');
groupSynonyms('neutral', 'absent', 'brisk', 'clinical', 'decided', 'dogged', 'exact',
  'informative');

/** Every authored word this knows how to draw, for the catalog spec to check. */
export function knownExpression(expression: string): boolean {
  const key = expression.trim().toLowerCase();
  return (REACTION_EMOTIONS as readonly string[]).includes(key) || key in EMOTION_SYNONYMS;
}

export function toReactionEmotion(expression: string): ReactionEmotion {
  const key = expression.trim().toLowerCase();
  if ((REACTION_EMOTIONS as readonly string[]).includes(key)) return key as ReactionEmotion;
  return EMOTION_SYNONYMS[key] ?? 'neutral';
}

export function reactionAssetKey(
  storyId: string,
  characterId: string,
  emotion: ReactionEmotion | string,
): string {
  return `${storyId.replace(/^story_/, 'story_')}/${characterId}_${toReactionEmotion(emotion)}`;
}
