import {
  characterAssetKey,
  coverAssetKey,
  keyArtAssetKey,
  locationAssetKey,
  type StoryVersion,
} from '@aniplay/contracts';

/**
 * Fills in every generated-art key from the same derivation the image pipeline
 * uses.
 *
 * Authors do not hand-write asset keys, so a story cannot declare a key the
 * generator would never produce. That failure mode — art silently not loading —
 * is invisible in tests and only shows up in a screenshot, so it is designed out
 * rather than guarded against.
 */
export function withDerivedAssetKeys(story: StoryVersion): StoryVersion {
  return {
    ...story,
    coverImage: coverAssetKey(story.storyId),
    keyArt: keyArtAssetKey(story.storyId),
    locations: story.locations.map((location) => ({
      ...location,
      stageImage: locationAssetKey(story.storyId, location.id),
    })),
    characters: story.characters.map((character) => ({
      ...character,
      portrait: characterAssetKey(story.storyId, character.id),
    })),
  };
}
