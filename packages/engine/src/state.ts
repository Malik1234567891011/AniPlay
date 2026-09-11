import type {
  AttributeKey,
  Locale,
  CharacterRuntimeState,
  FactionState,
  GameState,
  InventoryEntry,
  PlayerCharacterState,
  PlayerIdentity,
  QuestProgress,
  RelationshipState,
  ResourceState,
  StoryVersion,
} from '@aniplay/contracts';
import { ATTRIBUTE_KEYS } from '@aniplay/contracts';
import { crewSkillModifier } from './crew.js';
import { deriveCustomBuild } from './custom-build.js';
import { attributeModifier } from './check.js';

/** Construction and read helpers for the authoritative session snapshot. */

export interface CreateStateOptions {
  readonly sessionId: string;
  readonly story: StoryVersion;
  readonly identity: PlayerIdentity;
  /**
   * The language this run will be played in, resolved by the caller from the
   * player's explicit choice, their saved setting, then the device.
   *
   * This is the **only** place a run's locale is ever set. It is frozen from
   * here on: nothing in the engine, the director or the API writes
   * `state.locale` again. Omitted means `en`, which is what every session
   * created before this field existed is.
   */
  readonly locale?: Locale;
}

export function createInitialState({
  sessionId,
  story,
  identity,
  locale = 'en',
}: CreateStateOptions): GameState {
  // Spec §9.4 — a background the player wrote is worth the same as one we
  // wrote. A custom description used to grant nothing at all: no attributes, no
  // proficiencies, no starting technique, every skill at zero. The freeform
  // path is one of this product's central promises and cannot be the weak
  // option, so the same budget the authored archetypes were written to is
  // derived from what the player actually described.
  const archetype =
    story.archetypes.find((a) => a.id === identity.archetypeId) ??
    (identity.archetypeId === null
      ? deriveCustomBuild(story, identity.advanced.customArchetype ?? identity.worldKnowsAboutYou ?? '')
      : null);

  const attributes = {} as Record<AttributeKey, number>;
  for (const key of ATTRIBUTE_KEYS) {
    const base = story.attributes[key] ?? 10;
    const bonus = archetype?.attributeBonus?.[key] ?? 0;
    attributes[key] = Math.max(1, Math.min(30, base + bonus));
  }

  const skills: Record<string, number> = {};
  for (const skill of story.skills) skills[skill.id] = 0;
  for (const [skillId, value] of Object.entries(archetype?.skillProficiencies ?? {})) {
    if (skillId in skills) skills[skillId] = Math.max(0, Math.min(5, value));
  }

  const resources: ResourceState[] = story.resources.map((r) => ({
    id: r.id,
    current: Math.min(r.start, r.max),
    max: r.max,
  }));

  // The world's own starting kit first, then whatever the background adds.
  // Stacked by item, so a background that also grants the world item ends up
  // with two of them rather than two entries for the same thing.
  const startingQuantities = new Map<string, number>();
  for (const entry of [...story.rules.startingItems, ...(archetype?.startingItems ?? [])]) {
    startingQuantities.set(entry.itemId, (startingQuantities.get(entry.itemId) ?? 0) + entry.qty);
  }

  const inventory: InventoryEntry[] = [...startingQuantities].map(([itemId, quantity], index) => ({
    entryId: `inv_${index}_${itemId}`,
    itemId,
    quantity,
    equipped: false,
    instanceName: null,
  }));

  const abilities = [
    ...story.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
    ...(archetype?.startingAbilities ?? []),
  ];

  const player: PlayerCharacterState = {
    // A world with a canon lead supplies the portrait, because the app will not
    // offer to draw one — nobody needs a generated Itachi. A player-supplied
    // portrait still wins, so this fills the slot rather than claiming it.
    identity: {
      ...identity,
      portraitAssetId: identity.portraitAssetId ?? story.protagonist?.portrait ?? null,
    },
    attributes,
    skills,
    resources,
    inventory,
    abilities: [...new Set(abilities)],
    abilityCooldowns: {},
    statuses: [],
    xp: 0,
    level: 1,
    milestones: [],
    locationId: story.rules.startingLocationId,
    alive: true,
  };

  const characters: CharacterRuntimeState[] = story.characters.map((c) => ({
    characterId: c.id,
    // Placed by schedule so the world is already in motion at minute zero.
    locationId:
      locationForSchedule(c.schedule, story.rules.startWorldMinute) ??
      c.homeLocationId ??
      story.rules.startingLocationId,
    alive: true,
    health: c.combatant?.health ?? null,
    statuses: [],
    revealedSecretIds: [],
    learnedFactIds: [],
  }));

  const relationships: RelationshipState[] = story.characters.map((c) => ({
    characterId: c.id,
    ...c.startingRelationship,
    // -1 marks "never interacted", so the first real exchange is not dampened.
    lastChangedTurn: -1,
    unlockedGates: [],
  }));

  const quests: QuestProgress[] = story.quests.map((q) => ({
    questId: q.id,
    status: q.startsActive ? 'ACTIVE' : 'UNAVAILABLE',
    currentStepId: q.startsActive ? (q.steps[0]?.id ?? null) : null,
    completedStepIds: [],
    startedAtWorldMinute: q.startsActive ? story.rules.startWorldMinute : null,
  }));

  const archetypeStanding = new Map(
    (archetype?.startingReputation ?? []).map((entry) => [entry.factionId, entry.amount]),
  );
  const factions: FactionState[] = story.factions.map((f) => ({
    factionId: f.id,
    reputation: f.startingReputation + (archetypeStanding.get(f.id) ?? 0),
    rankLabel: rankLabelFor(f.ranks, f.startingReputation + (archetypeStanding.get(f.id) ?? 0)),
  }));

  const discoveredLocationIds = [
    ...new Set([
      story.rules.startingLocationId,
      ...story.locations.filter((l) => l.discoveredByDefault).map((l) => l.id),
    ]),
  ];

  return {
    sessionId,
    storyVersionId: story.id,
    locale,
    revision: 0,
    turnIndex: 0,
    worldMinute: story.rules.startWorldMinute,
    player,
    characters,
    relationships,
    quests,
    obligations: (story.openingObligations ?? []).map((seed, index) => ({
      id: `obl_opening_${index}`,
      kind: 'APPOINTMENT' as const,
      what: seed.what,
      withCharacterId: seed.withCharacterId,
      dueWorldMinute: story.rules.startWorldMinute + seed.dueInMinutes,
      budgetMinutes: null,
      createdTurn: 0,
      status: 'OPEN' as const,
    })),
    factions,
    discoveredLocationIds,
    flags: {},
    encounter: null,
    contest: null,
    generated: { characters: [], locations: [], origins: [] },
    arc: {
      episode: 1,
      turnsInEpisode: 0,
      pacingStage: 'HOOK',
      promises: story.promises.map((p) => ({
        promiseId: p.id,
        stage: 'SEEDED' as const,
        lastTouchedTurn: 0,
      })),
      tensionScore: 0.3,
    },
    rngCursor: 0,
    completedEventIds: [],
  };
}

export function rankLabelFor(
  ranks: readonly { atReputation: number; label: string }[],
  reputation: number,
): string {
  let label = '';
  for (const rank of [...ranks].sort((a, b) => a.atReputation - b.atReputation)) {
    if (reputation >= rank.atReputation) label = rank.label;
  }
  return label;
}

/** Which schedule block covers this minute-of-day, if any (spec §14.6). */
export function locationForSchedule(
  schedule: readonly { startMinute: number; endMinute: number; locationId: string }[],
  worldMinute: number,
): string | null {
  const minuteOfDay = ((worldMinute % 1440) + 1440) % 1440;
  for (const block of schedule) {
    if (minuteOfDay >= block.startMinute && minuteOfDay < block.endMinute) return block.locationId;
  }
  return null;
}

// --- Read helpers ----------------------------------------------------------

export function getResource(state: GameState, resourceId: string): ResourceState | undefined {
  return state.player.resources.find((r) => r.id === resourceId);
}

export function getRelationship(state: GameState, characterId: string): RelationshipState | undefined {
  return state.relationships.find((r) => r.characterId === characterId);
}

export function getCharacterState(
  state: GameState,
  characterId: string,
): CharacterRuntimeState | undefined {
  return state.characters.find((c) => c.characterId === characterId);
}

export function getQuestProgress(state: GameState, questId: string): QuestProgress | undefined {
  return state.quests.find((q) => q.questId === questId);
}

export function getFactionState(state: GameState, factionId: string): FactionState | undefined {
  return state.factions.find((f) => f.factionId === factionId);
}

export function countItem(state: GameState, itemId: string): number {
  return state.player.inventory
    .filter((entry) => entry.itemId === itemId)
    .reduce((sum, entry) => sum + entry.quantity, 0);
}

export function hasItem(state: GameState, itemId: string): boolean {
  return countItem(state, itemId) > 0;
}

/** NPCs sharing the player's location right now. Drives who can be addressed. */
export function charactersPresent(state: GameState): CharacterRuntimeState[] {
  return state.characters.filter(
    (c) => c.alive && c.locationId === state.player.locationId,
  );
}

/**
 * Effective attribute score: base plus equipped-item and status modifiers.
 * Spec §12.5 folds equipment and status into the check modifier.
 */
export function effectiveAttribute(
  state: GameState,
  story: StoryVersion,
  key: AttributeKey,
): number {
  let score = state.player.attributes[key] ?? 10;
  for (const entry of state.player.inventory) {
    if (!entry.equipped) continue;
    const def = story.items.find((i) => i.id === entry.itemId);
    score += def?.attributeModifiers?.[key] ?? 0;
  }
  for (const status of state.player.statuses) {
    score += status.attributeModifiers?.[key] ?? 0;
  }
  return score;
}

export function equipmentSkillModifier(
  state: GameState,
  story: StoryVersion,
  skillId: string | null,
): number {
  if (!skillId) return 0;
  let mod = 0;
  for (const entry of state.player.inventory) {
    if (!entry.equipped) continue;
    const def = story.items.find((i) => i.id === entry.itemId);
    mod += def?.skillModifiers?.[skillId] ?? 0;
  }
  return mod;
}

/**
 * Everything outside the player's own training that moves a roll: what they
 * are carrying, and who is standing next to them.
 *
 * Crew belong in the same number as equipment deliberately. A companion whose
 * contribution lived in its own display would be a claim about the fiction; a
 * companion inside the check modifier is the reason the roll succeeded.
 */
export function supportSkillModifier(
  state: GameState,
  story: StoryVersion,
  skillId: string | null,
): number {
  return equipmentSkillModifier(state, story, skillId) + crewSkillModifier(state, story, skillId);
}

export function effectiveModifier(
  state: GameState,
  story: StoryVersion,
  attribute: AttributeKey,
  skillId: string | null,
): number {
  return (
    attributeModifier(effectiveAttribute(state, story, attribute)) +
    (skillId ? (state.player.skills[skillId] ?? 0) : 0) +
    supportSkillModifier(state, story, skillId)
  );
}

/** Structural clone that keeps the snapshot a plain, serialisable value. */
export function cloneState(state: GameState): GameState {
  return structuredClone(state);
}
