import type { Locale } from '@aniplay/i18n';
import type { StoryVersion } from './story.js';

/**
 * A world, in another language.
 *
 * ## Why an overlay rather than a second fixture
 *
 * A parallel `nine-weeks.fr.ts` would duplicate every id, every number, every
 * connection, every DC and every asset key — thousands of lines that must stay
 * byte-identical to the English file forever, with nothing but discipline
 * keeping them so. The first time somebody adds a location to one and not the
 * other, the French world quietly becomes a different world.
 *
 * An overlay carries **only the prose**, addressed by path. What is absent
 * falls back to English, which is the correct intermediate state and is visible
 * rather than silent — `npm run fr:worlds` counts it.
 *
 * ## What is not here, on purpose
 *
 * `STORY_AUDIT.md` §2 is the authority, and three of its rules are easy to get
 * wrong:
 *
 * - **Names never travel.** Not characters, not locations, not items. `Juno
 *   Vale` is `Juno Vale` in Paris, and a translated proper noun is how a world
 *   stops being the same world.
 * - **`artDirection` stays English.** It is a prompt for an image model, not
 *   prose for a reader, and the models are trained on English.
 * - **`affordances` are parser-matched phrases**, so translating an ability's
 *   name while leaving them makes the ability unreachable. They move together
 *   or not at all.
 */
export interface WorldText {
  readonly storyId: string;
  /**
   * Dotted paths into the story, with the French text.
   *
   * Paths address arrays by **id**, not by index — `characters.juno.speechStyle`
   * rather than `characters.0.speechStyle` — so reordering the cast cannot
   * silently reassign somebody else's voice to them.
   */
  readonly text: Readonly<Record<string, string | readonly string[]>>;
}

const REGISTRY = new Map<string, Map<string, WorldText>>();

/** Register a world's text for a locale. Called by the fixture modules. */
export function registerWorldText(locale: Locale, world: WorldText): void {
  const byStory = REGISTRY.get(locale) ?? new Map<string, WorldText>();
  REGISTRY.set(locale, byStory);
  byStory.set(world.storyId, world);
}

/** How much of a world exists in a locale, for the gate. */
export function worldTextCoverage(locale: Locale, storyId: string): number {
  return Object.keys(REGISTRY.get(locale)?.get(storyId)?.text ?? {}).length;
}

type Mutable = Record<string, unknown>;

/**
 * Apply the overlay, returning a new story.
 *
 * Non-destructive and total: an unknown path is ignored rather than throwing,
 * because a stale path in a translation is a copy problem and not a reason to
 * take a world off the shelf. `npm run fr:worlds` reports them.
 */
export function localizeStory(story: StoryVersion, locale: Locale): StoryVersion {
  if (locale === 'en') return story;
  const world = REGISTRY.get(locale)?.get(story.storyId);
  if (!world) return story;

  // One clone, then written into. `structuredClone` rather than a spread,
  // because the nesting is deep and a shallow copy would let the overlay write
  // through into the shared fixture — which would translate the English
  // catalogue for every session in the process.
  const next = structuredClone(story) as unknown as Mutable;

  for (const [path, value] of Object.entries(world.text)) {
    const segments = path.split('.');
    let cursor: unknown = next;

    for (const [index, segment] of segments.entries()) {
      const last = index === segments.length - 1;

      if (Array.isArray(cursor)) {
        // Addressed by id, so reordering the cast cannot reassign a voice.
        const found = (cursor as Mutable[]).find((entry) => entry.id === segment);
        if (!found) break;
        if (last) break; // an array member is an object; a path may not end here
        cursor = found;
        continue;
      }

      if (typeof cursor !== 'object' || cursor === null) break;
      const record = cursor as Mutable;
      if (last) {
        if (segment in record) record[segment] = value as unknown;
        break;
      }
      cursor = record[segment];
    }
  }

  return next as unknown as StoryVersion;
}
