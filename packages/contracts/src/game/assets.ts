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

export function reactionAssetKey(
  storyId: string,
  characterId: string,
  emotion: ReactionEmotion,
): string {
  return `${storyId.replace(/^story_/, 'story_')}/${characterId}_${emotion}`;
}
