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
  /**
   * The art direction this asset was made under, carried per asset rather than
   * read from one global.
   *
   * The generator skips anything whose manifest entry already matches its
   * spec's version, so a single global constant meant that improving the
   * direction for new work silently marked every existing asset stale and
   * regenerated the lot. Per-asset versioning is what makes "the new cover
   * standard starts with new worlds" enforceable instead of a promise.
   */
  readonly styleVersion: string;
  /**
   * Where the title may be composited, as a fraction of the image height.
   * Null for anything that is not a cover.
   */
  readonly titleSafeArea: { top: number; bottom: number } | null;
}

function compose(parts: readonly (string | null | undefined)[]): string {
  return parts.filter((p): p is string => !!p && p.trim().length > 0).join(' ').replace(/\s+/g, ' ').trim();
}

/**
 * Worlds whose covers are finished and must never be regenerated.
 *
 * The v1 direction produced beautiful environment paintings with a small figure
 * lost in them — good pictures, bad covers for something that calls itself
 * Playable Anime. v2 replaces it. These six shipped under v1, they are liked as
 * they are, and treating them as locked is the whole reason the version moved
 * onto the spec instead of staying a global.
 */
export const LEGACY_COVER_STORY_IDS: readonly string[] = [
  'story_ninth_archive',
  'story_understudy',
  'story_salt_road',
  'story_tidewall',
  'story_unbound',
  'story_nine_weeks',
];

/** The character-forward cover standard. Everything new is made under this. */
export const COVER_DIRECTION_VERSION = 'plotbreak-cover-v2';

/**
 * The lower band of a cover is left deliberately quiet so the wordmark can be
 * composited there afterwards.
 *
 * Image models cannot spell. Asking one for a title yields malformed lettering
 * roughly every other generation, and the failure is invisible until somebody
 * reads it. So the art reserves the space and the pipeline draws the text.
 */
export const TITLE_SAFE_AREA = { top: 0.78, bottom: 1 } as const;

/**
 * Composition per genre, so nine covers do not turn into nine versions of
 * three attractive people standing in a triangle.
 *
 * Keyed off the tags a world already carries. The fallback is deliberately
 * about confrontation rather than a group shot, because a group shot is what
 * every one of these collapses into when the prompt stops being specific.
 */
function coverComposition(story: StoryVersion): string {
  const tags = new Set(story.tags.map((t) => t.toLowerCase()));
  const has = (...names: string[]): boolean => names.some((n) => tags.has(n));

  if (has('sports', 'team')) {
    return (
      'Composition: peak-action sports key visual. One athlete in the foreground mid-drive, low camera, ' +
      'body torqued, sweat and motion blur on the trailing arm. A rival closing from behind or across them, ' +
      'eyes locked on the ball. Arena floodlights, blown-out highlights, a packed dark crowd behind. ' +
      'Strong diagonal energy — nobody is standing still.'
    );
  }
  if (has('romance', 'slice of life')) {
    return (
      'Composition: two characters close in frame, the space between them doing the work. Eye contact or ' +
      'a deliberately avoided glance. Shallow depth of field, warm practical light, an ordinary setting ' +
      'made intimate. Quiet, not dramatic. No action poses.'
    );
  }
  if (has('body horror', 'horror')) {
    return (
      'Composition: one or two characters reacting to something mostly out of frame. Generous negative ' +
      'space where the threat should be. Hard low light, deep shadow, a single cold source. Faces carry ' +
      'the fear. Restrained — suggestion over gore.'
    );
  }
  if (has('mystery', 'investigation', 'time loop')) {
    return (
      'Composition: characters holding still in a charged, specific place. One looking directly out at ' +
      'the viewer, another turned away or half-lit. Strong directional light, long shadows, something in ' +
      'the frame that reads as evidence. Tension rather than action.'
    );
  }
  if (has('pirates', 'adventure', 'exploration', 'crew')) {
    return (
      'Composition: a small group braced against their world — wind, deck, weather, scale. Foreground ' +
      'figure looking off-frame at something the viewer cannot see, others behind them in depth. ' +
      'Sweeping horizon, dramatic sky. Movement and distance.'
    );
  }
  if (has('martial arts', 'military', 'monsters')) {
    return (
      'Composition: opposition. A foreground character mid-technique or braced to strike, an opposing ' +
      'figure or silhouette meeting them across the frame. Impact energy, debris, displaced air. Hard ' +
      'rim light separating the two.'
    );
  }
  return (
    'Composition: two or three characters arranged in real depth, not a line-up — one dominant in the ' +
    'foreground, the others receding, each doing something that says who they are. A recognisable piece ' +
    'of the world behind them.'
  );
}

/**
 * The actual cast, described from the same authored fields the portraits use.
 *
 * `visualHook` and `silhouette` exist precisely so a character stays the same
 * person across generations, so the cover draws on them rather than inventing
 * attractive strangers for marketing who are not in the game.
 */
function coverCast(story: StoryVersion): string {
  // The player's own face is customisable, so the protagonist is never the
  // subject: the empty seat is the invitation. Anyone the player *meets* is
  // fair game, chosen by how load-bearing they are — cast order is authored
  // most-important-first.
  const cast = story.characters.filter((c) => c.appearance.trim().length > 0).slice(0, 3);
  if (cast.length === 0) return '';

  const described = cast.map((character, index) => {
    const place = index === 0 ? 'FOREGROUND' : index === 1 ? 'BEHIND THEM' : 'FURTHER BACK';
    return compose([
      `${place} — ${character.name}, ${character.role}, ${presentation(character.pronouns)}:`,
      character.appearance,
      character.visualHook ? `Unmistakable detail, keep it: ${character.visualHook}.` : null,
      character.silhouette ? `Reads in outline as: ${character.silhouette}.` : null,
    ]);
  });

  return compose([
    `Feature exactly ${cast.length} characters, and only these:`,
    ...described,
    'These are established characters with existing reference art. Match face, hair, age, build and ' +
      'costume identity exactly. Pose, expression, lighting and framing are free.',
  ]);
}

/**
 * Spec §19.1 — the cover is the promise.
 *
 * Plotbreak sells itself as Playable Anime, so a cover has to look like anime
 * key art before anyone taps it: the people you will meet, doing something, in
 * a place you can recognise. The v1 direction asked for the opposite in so many
 * words — "a single figure seen from behind or in silhouette, small against the
 * setting" — which is why the catalog reads as a set of landscape paintings.
 */
export function coverPrompt(story: StoryVersion): ImagePromptSpec {
  const legacy = LEGACY_COVER_STORY_IDS.includes(story.storyId);
  if (legacy) return legacyCoverPrompt(story);

  const hero = story.locations.find((l) => l.id === story.rules.startingLocationId);

  return {
    assetKey: coverAssetKey(story.storyId),
    kind: 'COVER',
    aspect: 'PORTRAIT',
    seed: `${story.id}:cover:${COVER_DIRECTION_VERSION}`,
    alt: `Cover art for ${story.title}: ${story.fantasyLabel}`,
    styleVersion: COVER_DIRECTION_VERSION,
    titleSafeArea: { ...TITLE_SAFE_AREA },
    prompt: compose([
      STYLE_SPINE,
      'This is an anime poster / key visual, not an environment painting. Characters are the subject.',
      coverComposition(story),
      coverCast(story),
      hero ? `Setting behind them: ${hero.artDirection}` : null,
      `It must read at a glance as: ${story.fantasyLabel}`,
      `Mood: ${story.rules.toneGuide}`,
      // Small covers are the common case — a 150pt card in a rail — so faces
      // have to survive being 40 pixels across.
      'Faces large enough and contrast high enough that the characters are still readable at thumbnail size.',
      'Strong readable silhouettes. Distinct hair shapes and colours between characters.',
      `Leave the bottom ${Math.round((1 - TITLE_SAFE_AREA.top) * 100)}% of the frame visually quiet — ` +
        'darker, low detail, no faces or focal elements — as space for a title to be placed later.',
      COVER_NEGATIVES,
      NEGATIVES,
    ]),
  };
}

/**
 * Extra things a cover in particular must not be.
 *
 * Every one of these is a specific way a set of generated covers collapses into
 * looking like one generated cover.
 */
const COVER_NEGATIVES = [
  'Avoid: a generic landscape with a tiny distant figure.',
  'Avoid: characters standing in a symmetrical line or triangle facing the camera.',
  'Avoid: the same young woman archetype used for every world.',
  'Avoid: gratuitous cleavage, fanservice framing, or costume unrelated to the story.',
  'Avoid: generic glowing particles, floating embers, or lens flare used as a substitute for content.',
  'Avoid: identical three-quarter hero pose, identical rim lighting, identical colour grade.',
].join(' ');

/**
 * The original direction, kept verbatim so the six worlds that shipped under it
 * can be reproduced byte-for-byte if an asset is ever lost. Never used for
 * anything new.
 */
function legacyCoverPrompt(story: StoryVersion): ImagePromptSpec {
  const hero = story.locations.find((l) => l.id === story.rules.startingLocationId);
  return {
    assetKey: coverAssetKey(story.storyId),
    kind: 'COVER',
    aspect: 'PORTRAIT',
    seed: `${story.id}:cover:${STYLE_SPINE_VERSION}`,
    alt: `Cover art for ${story.title}: ${story.fantasyLabel}`,
    styleVersion: STYLE_SPINE_VERSION,
    titleSafeArea: null,
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
    styleVersion: STYLE_SPINE_VERSION,
    titleSafeArea: null,
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
    styleVersion: STYLE_SPINE_VERSION,
    titleSafeArea: null,
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
 * A presentation cue drawn from the character's authored pronouns.
 *
 * Nothing in any art prompt had ever said this. `appearance` describes hair,
 * age, build and costume, and models fill the gap with whatever the rest of the
 * description suggests — so Blackwake's first cover rendered Nessa Vale, a
 * she/her navigator, as a man. The story already carries the answer as data;
 * it just was not being passed to the thing drawing the picture.
 *
 * Anything unusual or self-described is passed through as-is rather than being
 * forced into one of two buckets.
 */
function presentation(pronouns: string): string {
  const normalized = pronouns.trim().toLowerCase();
  if (normalized.startsWith('she')) return 'a woman';
  if (normalized.startsWith('he/')) return 'a man';
  if (normalized.startsWith('they')) return 'androgynous in presentation';
  return `someone who uses ${pronouns}`;
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
    styleVersion: STYLE_SPINE_VERSION,
    titleSafeArea: null,
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
      `Appearance: ${presentation(character.pronouns)}. ${character.appearance}`,
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
    styleVersion: STYLE_SPINE_VERSION,
    titleSafeArea: null,
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
    styleVersion: STYLE_SPINE_VERSION,
    titleSafeArea: null,
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
