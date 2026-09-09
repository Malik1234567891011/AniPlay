import {
  characterAssetKey,
  coverAssetKey,
  heroFrameAssetKey,
  keyArtAssetKey,
  locationAssetKey,
  playerPortraitAssetKey,
  type CharacterDef,
  type LocationDef,
  type StoryVersion,
} from '@aniplay/contracts';

/**
 * Spec §19.4 — image prompt composition.
 *
 * Prompts are assembled from *validated* story data, never from raw player or
 * model text. Three layers, always in this order:
 *
 *   1. a fixed style spine, so the whole catalog looks like one product;
 *   2. the story's authored art direction;
 *   3. the specific subject, drawn from the schema.
 *
 * Spec §19.2/§19.3: every character and location carries a stable `artSeed`, so
 * regenerating a portrait produces the same face rather than a new person.
 */

/** The house style. Changing this re-skins the entire catalog, so it is versioned. */
export const STYLE_SPINE_VERSION = 'anima-v1';

const STYLE_SPINE = [
  'Anime key visual in a painterly cel-shaded style.',
  'Cinematic composition, film-grade lighting, restrained palette with one saturated accent.',
  'Detailed but not cluttered. Confident linework. Subtle grain.',
].join(' ');

/**
 * Spec §41.1 / §29.4 — hard negatives on every prompt. No text baked into art
 * (it cannot be localized or made accessible), and no likeness of real people.
 */
const NEGATIVES = [
  'No text, no lettering, no captions, no watermarks, no logos, no signatures, no UI.',
  'No real people or celebrity likenesses.',
  'Not photorealistic. No 3D render look.',
].join(' ');

export type ShotKind =
  | 'COVER'
  | 'KEY_ART'
  | 'LOCATION_STAGE'
  | 'CHARACTER_PORTRAIT'
  | 'PLAYER_PORTRAIT'
  | 'HERO_FRAME';

export interface ImagePromptSpec {
  readonly assetKey: string;
  readonly kind: ShotKind;
  readonly prompt: string;
  readonly aspect: 'PORTRAIT' | 'LANDSCAPE' | 'SQUARE';
  /** Stable per-subject seed, so the same subject regenerates consistently. */
  readonly seed: string;
  /** Short alt text derived from validated data, never from model output (§27.3). */
  readonly alt: string;
}

function compose(parts: readonly (string | null | undefined)[]): string {
  return parts.filter((p): p is string => !!p && p.trim().length > 0).join(' ').replace(/\s+/g, ' ').trim();
}

export function coverPrompt(story: StoryVersion): ImagePromptSpec {
  const hero = story.locations.find((l) => l.id === story.rules.startingLocationId);
  return {
    assetKey: coverAssetKey(story.storyId),
    kind: 'COVER',
    aspect: 'PORTRAIT',
    seed: `${story.id}:cover:${STYLE_SPINE_VERSION}`,
    alt: `Cover art for ${story.title}: ${story.fantasyLabel}`,
    prompt: compose([
      STYLE_SPINE,
      'Vertical book-cover composition with clear negative space in the lower third for a title.',
      hero?.artDirection,
      `Mood: ${story.rules.toneGuide}`,
      `The image should read at a glance as: ${story.fantasyLabel}`,
      'A single figure seen from behind or in silhouette, small against the setting.',
      NEGATIVES,
    ]),
  };
}

export function keyArtPrompt(story: StoryVersion): ImagePromptSpec {
  const hero = story.locations.find((l) => l.id === story.rules.startingLocationId);
  return {
    assetKey: keyArtAssetKey(story.storyId),
    kind: 'KEY_ART',
    aspect: 'LANDSCAPE',
    seed: `${story.id}:key:${STYLE_SPINE_VERSION}`,
    alt: `Key art for ${story.title}`,
    prompt: compose([
      STYLE_SPINE,
      'Wide cinematic establishing shot, banner composition.',
      hero?.artDirection,
      hero?.description,
      `Mood: ${story.rules.toneGuide}`,
      // Spec §10.2 — faces must survive common crops, so keep them centre-safe.
      'Keep any faces within the central two-thirds of the frame; the outer edges may be cropped.',
      NEGATIVES,
    ]),
  };
}

/** Spec §19.3 — location consistency: the authored art direction is the spine. */
export function locationPrompt(story: StoryVersion, location: LocationDef): ImagePromptSpec {
  return {
    assetKey: locationAssetKey(story.storyId, location.id),
    kind: 'LOCATION_STAGE',
    aspect: 'LANDSCAPE',
    seed: `${story.id}:loc:${location.id}:${STYLE_SPINE_VERSION}`,
    alt: `${location.name}: ${location.description.split(/(?<=\.)\s/)[0] ?? location.name}`,
    prompt: compose([
      STYLE_SPINE,
      'Empty environment plate for a visual-novel stage. No characters, no people, no figures.',
      'Wide shot, eye level, with clear space in the lower half where character art will be composited.',
      location.artDirection,
      location.description,
      `Overall mood: ${story.rules.toneGuide}`,
      NEGATIVES,
    ]),
  };
}

/**
 * Spec §19.2 — character consistency. The authored appearance plus a stable seed
 * is what keeps a face the same across sessions and regenerations.
 */
/**
 * Framing locked across the entire cast.
 *
 * A set of portraits only reads as one set if the camera does not move. Identical
 * crop, pose, lens, lighting and background treatment mean the *characters* are
 * what differ between cards, which is the whole point of a cast carousel.
 */
const PORTRAIT_FRAMING = [
  // The crop is stated as a hard boundary in both directions. Asking for
  // "waist-up" alone reliably produces a mix of full-body and chest-up shots,
  // which is exactly what breaks a cast carousel.
  'Framing: a waist-up character portrait. The bottom edge of the frame cuts the figure at the waist.',
  'Do NOT show the legs, hips, or a full-body figure. Do NOT crop tighter than the chest.',
  'The figure fills roughly three quarters of the frame height. Head centred horizontally, eye line one third from the top, full head and both shoulders inside the frame.',
  'Pose: three-quarter turn toward the viewer, head level, shoulders relaxed, hands visible at chest or waist height.',
  'Lighting: soft three-quarter key from the upper left, gentle fill, subtle rim light separating the figure from the background.',
  'One consistent focal length across the whole cast — no wide-angle distortion, no low or high camera angle.',
].join(' ');

/**
 * A fixed background tone per world.
 *
 * Portraits sit side by side in the cast carousel, so a varying backdrop reads
 * as a mistake. One tone per story keeps a cast coherent while still letting the
 * three worlds feel distinct from each other.
 */
function portraitBackdrop(story: StoryVersion): string {
  const tone =
    story.intensity === 'INTENSE'
      ? 'a flat pale bone-grey'
      : story.rules.allowsCombat
        ? 'a flat cold slate blue-grey'
        : 'a flat warm ash-grey';
  return (
    `Background: ${tone}, completely plain and evenly lit, with a soft vignette. ` +
    'No scenery, props, furniture, patterns, or depth cues of any kind behind the figure.'
  );
}

/**
 * Spec §19.2 — character consistency.
 *
 * The design brief leads with the visual hook, because a cast is memorable for
 * one unmistakable feature each rather than for a careful list of attributes.
 * A stable `artSeed` plus the locked framing above keeps the same face across
 * every regeneration.
 */
export function characterPrompt(story: StoryVersion, character: CharacterDef): ImagePromptSpec {
  return {
    assetKey: characterAssetKey(story.storyId, character.id),
    kind: 'CHARACTER_PORTRAIT',
    aspect: 'PORTRAIT',
    seed: character.artSeed ?? `${story.id}:npc:${character.id}:${STYLE_SPINE_VERSION}`,
    alt: `${character.name}, ${character.role}`,
    prompt: compose([
      STYLE_SPINE,
      PORTRAIT_FRAMING,
      portraitBackdrop(story),
      // The hook goes first and is stated as non-negotiable: it is the single
      // detail that must survive into the final image.
      character.visualHook
        ? `The single defining feature, which must be clearly visible: ${character.visualHook}`
        : null,
      character.silhouette ? `Overall silhouette: ${character.silhouette}` : null,
      `Appearance: ${character.appearance}`,
      `They read as: ${character.publicTraits.join(', ')}.`,
      `Expression: composed and specific to someone who is ${character.publicTraits[0]?.toLowerCase() ?? 'guarded'} — not a neutral stock face.`,
      `World: ${story.rules.toneGuide}`,
      // Spec §2.4 / §29.4 — archetypal and iconic, never derivative of a
      // protected character design.
      'An original character design. Do not resemble any existing anime, manga, game, or film character.',
      NEGATIVES,
    ]),
  };
}

/**
 * Spec §9.3 — the player's own portrait.
 *
 * Built only from what the player wrote about themselves plus canon the engine
 * has actually recorded, so the portrait reflects a real run rather than an
 * invented one. Player text is descriptive input, and the style spine and
 * negatives still bound the result.
 */
export interface PlayerPortraitInput {
  readonly story: StoryVersion;
  readonly displayName: string;
  readonly pronouns: string;
  readonly appearanceNote: string;
  readonly archetypeName: string | null;
  /** Engine-recorded facts: items equipped, statuses, standing. */
  readonly canonDetails: readonly string[];
  readonly locationId: string;
  /** Bumped on each accepted regeneration, so variants stay addressable. */
  readonly variant: number;
}

export function playerPortraitPrompt(input: PlayerPortraitInput): ImagePromptSpec {
  const location = input.story.locations.find((l) => l.id === input.locationId);

  return {
    assetKey: playerPortraitAssetKey(input.story.storyId, input.displayName, input.variant),
    kind: 'PLAYER_PORTRAIT',
    aspect: 'PORTRAIT',
    seed: `${input.story.id}:player:${input.displayName}:${input.variant}`,
    alt: `${input.displayName}${input.archetypeName ? `, ${input.archetypeName}` : ''}`,
    prompt: compose([
      STYLE_SPINE,
      'Single-character portrait, waist up, three-quarter view, confident and grounded.',
      'The face is centred and unobstructed. Background softly suggests the setting without competing.',
      input.appearanceNote.trim().length > 0
        ? `Character appearance: ${input.appearanceNote.trim()}`
        : 'Character appearance: unremarkable, watchful, dressed for the setting.',
      input.archetypeName ? `They carry themselves like: ${input.archetypeName}.` : null,
      // Canon comes from engine state, so the portrait shows the run you played.
      input.canonDetails.length > 0 ? `Details that should show: ${input.canonDetails.join('; ')}.` : null,
      location ? `Setting behind them: ${location.artDirection}` : null,
      `Overall mood: ${input.story.rules.toneGuide}`,
      NEGATIVES,
    ]),
  };
}

/**
 * Spec §19.1 tier 2 — a hero frame for a beat that earned one. Built from the
 * validated scene, never from the generated prose.
 */
export function heroFramePrompt(input: {
  story: StoryVersion;
  locationId: string;
  presentCharacters: readonly CharacterDef[];
  shotType: string;
  turnId: string;
  sceneFacts: readonly string[];
}): ImagePromptSpec {
  const location = input.story.locations.find((l) => l.id === input.locationId);

  const framing: Record<string, string> = {
    ESTABLISHING: 'Wide establishing shot of the location. Figures small or absent.',
    PORTRAIT: 'Close portrait of a single character, shoulders up.',
    TWO_SHOT: 'Two characters sharing the frame, facing each other in profile.',
    ACTION: 'Dynamic mid-action shot with motion blur and a strong diagonal.',
    REVEAL: 'A moment of discovery. The subject of the reveal is the focal point.',
    BOSS: 'An imposing antagonist framed from below.',
    MOMENT: 'A quiet, held beat. Intimate framing, shallow focus.',
  };

  return {
    assetKey: heroFrameAssetKey(input.turnId),
    kind: 'HERO_FRAME',
    aspect: 'LANDSCAPE',
    seed: `${input.turnId}:hero`,
    alt: `${location?.name ?? 'Scene'}: ${input.sceneFacts[0] ?? 'a moment in the story'}`,
    prompt: compose([
      STYLE_SPINE,
      framing[input.shotType] ?? framing.MOMENT,
      location?.artDirection,
      input.presentCharacters.length > 0
        ? `Characters present: ${input.presentCharacters.map((c) => `${c.name} (${c.appearance})`).join('; ')}.`
        : null,
      input.sceneFacts.length > 0 ? `What is happening: ${input.sceneFacts.slice(0, 2).join(' ')}` : null,
      `Mood: ${input.story.rules.toneGuide}`,
      NEGATIVES,
    ]),
  };
}
