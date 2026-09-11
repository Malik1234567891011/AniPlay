import type {
  CharacterDef,
  GameState,
  LocationDef,
  StateMutation,
  StoryVersion,
} from '@aniplay/contracts';
import { localizeStory } from '@aniplay/contracts';

/**
 * Spec §11.9 — the world the player made, composed over the world an author
 * wrote.
 *
 * The problem this solves in one sentence: a published `StoryVersion` is
 * immutable and shared, so anything the story invents for one player has
 * nowhere to live. A café the writer conjured on the way out of the academy
 * read beautifully and was gone by the next session, because it had never been
 * anywhere but a paragraph.
 *
 * The shape of the fix is composition rather than mutation. Generated
 * definitions live on the session; `composeStory` merges them over the
 * authored ones at the top of each entry point; and the forty places in the
 * engine that look up `story.characters` keep working unchanged. A promoted
 * NPC is a character in every sense the engine has — you can travel to their
 * shop, talk to them, build a relationship, fight them, and kill them.
 *
 * Promotion is the interesting half. Everything the writer invents starts
 * ephemeral, and stays ephemeral: three students in a hallway do not need
 * three permanent records. It becomes real when the player treats it as real —
 * goes there, talks to them, comes back looking for them.
 */

/**
 * The authored world plus this session's additions.
 *
 * Generated entries never shadow authored ones: an author's Mira always wins
 * over a generated Mira, so a story cannot be overwritten by something the
 * writer improvised.
 */
export function composeStory(story: StoryVersion, state: GameState): StoryVersion {
  // The run's language first, then whatever this run has invented on top.
  //
  // Here rather than at the API boundary because *every* engine and director
  // path already calls this — resolve, commit, quests, schedules, the writer's
  // context — so there is exactly one place a world can arrive in the wrong
  // language, and it is this line. A second seam would be a second thing to
  // remember.
  //
  // A world with no overlay comes back unchanged, which is the correct
  // intermediate state while the catalogue is being written: English is not a
  // failure mode, it is the fallback.
  story = localizeStory(story, state.locale);

  const generated = state.generated;
  if (generated.characters.length === 0 && generated.locations.length === 0) return story;

  const authoredCharacters = new Set(story.characters.map((c) => c.id));
  const authoredLocations = new Set(story.locations.map((l) => l.id));

  return {
    ...story,
    characters: [
      ...story.characters,
      ...generated.characters.filter((c) => !authoredCharacters.has(c.id)),
    ],
    locations: [
      ...story.locations,
      ...generated.locations.filter((l) => !authoredLocations.has(l.id)),
    ],
  };
}

/** `gen_riku_sato` — stable, readable, and obviously not authored. */
export function generatedId(prefix: 'npc' | 'loc', name: string): string {
  const slug = name
    .toLowerCase()
    // Accents folded rather than stripped, so "Café" is `cafe` and not `caf`.
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 3)
    .join('_');
  return `gen_${prefix}_${slug || 'unnamed'}`;
}

export function isGenerated(id: string): boolean {
  return id.startsWith('gen_');
}

/**
 * Proper nouns the story has recently put in front of the player.
 *
 * This is what makes promotion possible without asking the model to file
 * paperwork. The writer invents "the Moonlight Café"; the name is recorded as
 * something that has been said; and when the player later says "go back to the
 * Moonlight Café", the engine can tell the difference between a place the
 * story offered them and a place they made up.
 */
export function mentionFlag(name: string): string {
  return `mentioned:${name.toLowerCase().replace(/\s+/g, '_').slice(0, 60)}`;
}

/**
 * Records the proper nouns in a beat, so they can be promoted later.
 *
 * Deliberately cheap and deliberately lossy. It is a shortlist of things the
 * player might reasonably point at next turn, not an attempt to parse fiction.
 */
export function recordMentions(
  text: string,
  story: StoryVersion,
  locationId: string,
  nextMutationId: () => string,
): StateMutation[] {
  // Every word of every authored name, so "Mira" is recognised as part of
  // "Mira Senn" and "Gate Arch" as part of "The Gate Arch". Matching whole
  // names only meant the world's own cast was recorded as new discoveries.
  const known = new Set<string>();
  for (const name of [...story.characters.map((c) => c.name), ...story.locations.map((l) => l.name)]) {
    known.add(name.toLowerCase());
    for (const word of name.toLowerCase().split(/\s+/)) if (word.length > 2) known.add(word);
  }

  // Capitalised runs of one to four words, which is what a name looks like.
  // Unicode-aware: the first pass cut "Moonlight Café" to "Moonlight Caf",
  // which then failed to match what the player typed.
  const candidates = new Set<string>();
  for (const match of text.matchAll(
    /(?:[Tt]he\s+)?(\p{Lu}[\p{Ll}\p{M}'’-]{2,}(?:\s+\p{Lu}[\p{Ll}\p{M}'’-]{2,}){0,3})/gu,
  )) {
    const name = match[1];
    if (!name) continue;
    const lower = name.toLowerCase();
    if (known.has(lower)) continue;
    if (SENTENCE_STARTERS.has(lower)) continue;
    // A multi-word name whose every word is already known is the world's own.
    const words = lower.split(/\s+/);
    if (words.every((w) => known.has(w) || SENTENCE_STARTERS.has(w))) continue;
    candidates.add(name);
  }

  return [...candidates].slice(0, 6).map((name) => ({
    mutationId: nextMutationId(),
    type: 'FLAG_SET' as const,
    subjectId: 'session',
    reasonCode: 'MENTIONED',
    payload: { flag: mentionFlag(name), value: encodeMention(name, locationId) },
  }));
}

/**
 * Where a name was said, carried alongside it.
 *
 * A place can be walked to from anywhere, so travel does not care. A person
 * cannot: if the coach mentions her old rival Domoto while you are on the
 * roof, "I talk to Domoto" must not conjure him onto the roof. Recording the
 * room a name was said in is what lets the engine tell "the third-year who was
 * jogging over to me" from "a person named two scenes ago somewhere else".
 *
 * Values written before this existed are bare names, and read back as
 * unplaced — which is the old behaviour, and the safe one.
 */
function encodeMention(name: string, locationId: string): string {
  return locationId ? `${name}@${locationId}` : name;
}

function decodeMention(value: string): { name: string; locationId: string } {
  const at = value.lastIndexOf('@');
  if (at <= 0) return { name: value, locationId: '' };
  return { name: value.slice(0, at), locationId: value.slice(at + 1) };
}

/** Words that start sentences and are not names. */
const SENTENCE_STARTERS = new Set([
  'you', 'your', 'the', 'and', 'but', 'then', 'when', 'what', 'there', 'here',
  'this', 'that', 'his', 'her', 'they', 'she', 'behind', 'above', 'below',
  'nobody', 'somebody', 'everyone', 'someone', 'inside', 'outside', 'across',
  'before', 'after', 'still', 'nothing', 'something',
]);

/** Everything the story has named to this player that is not authored. */
export function mentionedNames(state: GameState): string[] {
  return mentions(state).map((m) => m.name);
}

function mentions(state: GameState): { name: string; locationId: string }[] {
  return Object.entries(state.flags)
    .filter(([flag]) => flag.startsWith('mentioned:'))
    .map(([, value]) => (typeof value === 'string' ? decodeMention(value) : null))
    .filter((m): m is { name: string; locationId: string } => !!m && m.name.length > 0);
}

/** Finds a mentioned name the player's words are pointing at. */
export function matchMention(spoken: string, state: GameState): string | null {
  return match(spoken, mentionedNames(state));
}

/**
 * The same, restricted to names this room has said.
 *
 * Used by anything that would put a person in front of the player, because
 * being talked about is not the same as being here.
 */
export function matchMentionHere(spoken: string, state: GameState): string | null {
  const here = mentions(state)
    .filter((m) => m.locationId === state.player.locationId)
    .map((m) => m.name);
  return match(spoken, here);
}

function match(spoken: string, names: readonly string[]): string | null {
  const text = spoken.toLowerCase();
  return (
    [...names]
      // Longest first, so "Moonlight Café" beats "Moonlight".
      .sort((a, b) => b.length - a.length)
      .find((name) => text.includes(name.toLowerCase())) ?? null
  );
}

export interface Promotion {
  readonly mutations: StateMutation[];
  readonly character: CharacterDef | null;
  readonly location: LocationDef | null;
  /** For the director: this is new, and the player made it happen. */
  readonly note: string;
}

/**
 * Makes a mentioned thing real.
 *
 * The definition is deliberately thin. The engine needs an id, a name, a place
 * and enough shape to be a legal target; everything else — who they are, what
 * they want, what the room smells like — is the writer's, and it accretes as
 * memory facts the way it does for authored characters. Inventing a full
 * personality here would be the engine writing fiction, which is the one job
 * it does not have.
 */
export function promoteCharacter(
  state: GameState,
  name: string,
  reason: string,
  nextMutationId: () => string,
): Promotion {
  const id = generatedId('npc', name);
  const character: CharacterDef = {
    id,
    name,
    role: 'Someone you met',
    cardBlurb: `Somebody you met at ${state.player.locationId.replace(/_/g, ' ')}, who is now part of your story.`,
    pronouns: 'they/them',
    publicTraits: [],
    hiddenDrives: [],
    values: [],
    fears: [],
    socialStyle: '',
    boundaries: [],
    goals: [],
    secrets: [],
    speechStyle: '',
    topics: [],
    voiceSamples: [],
    appearance: '',
    visualHook: '',
    silhouette: '',
    artSeed: null,
    portrait: null,
    expressions: ['neutral'],
    voiceId: null,
    schedule: [],
    homeLocationId: state.player.locationId,
    knowledgeScope: [],
    startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
    gates: [],
    attributes: { might: 10, agility: 10, mind: 10, presence: 10, resolve: 10, arcana: 10 },
    companion: null,
    scouting: null,
    combatant: null,
  };

  return {
    character,
    location: null,
    mutations: [
      {
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: id,
        reasonCode: 'WORLD_PROMOTED',
        payload: { flag: `promoted:${id}`, value: name },
      },
      // Carries the definition and puts them in the room in one move, the way
      // a promoted location arrives with the travel that reached it.
      {
        mutationId: nextMutationId(),
        type: 'LOCATION_CHANGE',
        subjectId: id,
        reasonCode: 'WORLD_PROMOTED',
        payload: { locationId: state.player.locationId, generatedCharacter: character },
      },
    ],
    note:
      `${name} is now a real, persistent person in this player's version of the world, because the player ` +
      `${reason}. They will still be here next session. Give them a name they keep, a way of speaking, and ` +
      'something they want. Nothing about them is authored, so whatever you establish now is what they are.',
  };
}

export function promoteLocation(
  state: GameState,
  name: string,
  reason: string,
  travelMinutes: number,
  nextMutationId: () => string,
): Promotion {
  const id = generatedId('loc', name);
  const from = state.player.locationId;

  const location: LocationDef = {
    id,
    name,
    shortName: name.split(/\s+/).slice(0, 2).join(' '),
    description: `${name}. Somewhere this story found rather than started with.`,
    artDirection: '',
    stageImage: null,
    // Two-way, so the player can get back to where they came from. A generated
    // place the player cannot leave is a trap they built themselves.
    connections: [{ to: from, travelMinutes, lockedByFlag: null, label: 'Back' }],
    discoveredByDefault: false,
    mapPosition: { x: 0, y: 0 },
    ambientSfx: [],
    takeableItems: [],
  };

  return {
    character: null,
    location,
    mutations: [
      {
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: id,
        reasonCode: 'WORLD_PROMOTED',
        payload: { flag: `promoted:${id}`, value: name },
      },
    ],
    note:
      `${name} is now a real, persistent place in this player's version of the world, because the player ` +
      `${reason}. It will still be here next session, and so will whatever happens to it. Establish what it ` +
      'is like; nothing about it is authored.',
  };
}

/**
 * Wires a promoted place back into the map from the side the player came from.
 *
 * Without this the connection is one-way and the place can be left but never
 * returned to, which is the same disappearance in slower motion.
 */
export function linkBack(story: StoryVersion, fromId: string, toId: string, travelMinutes: number): LocationDef | null {
  const from = story.locations.find((l) => l.id === fromId);
  if (!from) return null;
  if (from.connections.some((c) => c.to === toId)) return null;
  return {
    ...from,
    connections: [...from.connections, { to: toId, travelMinutes, lockedByFlag: null, label: '' }],
  };
}
