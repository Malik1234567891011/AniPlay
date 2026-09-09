import { z } from 'zod';
import { FactVisibility } from '../ai/primitives.js';
import { AttributeKey } from './story.js';

/**
 * Authoritative runtime game state. This is the truth the writer decorates —
 * spec §0: "Deterministic game state overrides generated prose."
 */

export const PlayerIdentity = z
  .object({
    displayName: z.string(),
    pronouns: z.string().default('they/them'),
    ageBand: z.string().nullable().default(null),
    archetypeId: z.string().nullable().default(null),
    /** Max 300 chars. Spec §9.2 CS-01. */
    worldKnowsAboutYou: z.string().max(300).default(''),
    advanced: z.record(z.string()).default({}),
    portraitAssetId: z.string().nullable().default(null),
  })
  .strict();
export type PlayerIdentity = z.infer<typeof PlayerIdentity>;

export const ResourceState = z
  .object({ id: z.string(), current: z.number(), max: z.number() })
  .strict();
export type ResourceState = z.infer<typeof ResourceState>;

export const InventoryEntry = z
  .object({
    entryId: z.string(),
    itemId: z.string(),
    quantity: z.number().int().min(0),
    equipped: z.boolean().default(false),
    /** Per-instance overrides — a named blade, a charged focus. */
    instanceName: z.string().nullable().default(null),
  })
  .strict();
export type InventoryEntry = z.infer<typeof InventoryEntry>;

export const StatusEffect = z
  .object({
    id: z.string(),
    label: z.string(),
    kind: z.enum(['BUFF', 'DEBUFF', 'NEUTRAL']),
    /** Null means "until removed by an event". */
    expiresAtWorldMinute: z.number().int().nullable().default(null),
    attributeModifiers: z.record(AttributeKey, z.number().int()).default({}),
    description: z.string().default(''),
  })
  .strict();
export type StatusEffect = z.infer<typeof StatusEffect>;

export const PlayerCharacterState = z
  .object({
    identity: PlayerIdentity,
    attributes: z.record(AttributeKey, z.number().int()),
    skills: z.record(z.string(), z.number().int().min(0).max(5)),
    resources: z.array(ResourceState),
    inventory: z.array(InventoryEntry),
    abilities: z.array(z.string()),
    abilityCooldowns: z.record(z.string(), z.number().int()),
    statuses: z.array(StatusEffect),
    xp: z.number().int().min(0).default(0),
    level: z.number().int().min(1).default(1),
    milestones: z.array(z.string()).default([]),
    locationId: z.string(),
    alive: z.boolean().default(true),
  })
  .strict();
export type PlayerCharacterState = z.infer<typeof PlayerCharacterState>;

/** Spec §14.1 — five independent dimensions. Respect ≠ affection. */
export const RelationshipState = z
  .object({
    characterId: z.string(),
    trust: z.number().int().min(-100).max(100),
    affection: z.number().int().min(-100).max(100),
    respect: z.number().int().min(-100).max(100),
    fear: z.number().int().min(0).max(100),
    rivalry: z.number().int().min(0).max(100),
    /** Turn index of the last change, for recency dampening (§14.2). */
    lastChangedTurn: z.number().int().default(0),
    unlockedGates: z.array(z.string()).default([]),
  })
  .strict();
export type RelationshipState = z.infer<typeof RelationshipState>;

export const QuestStatus = z.enum([
  'UNAVAILABLE',
  'DISCOVERED',
  'ACTIVE',
  'BLOCKED',
  'COMPLETED',
  'FAILED',
  'EXPIRED',
  'HIDDEN_CONTINUATION',
]);
export type QuestStatus = z.infer<typeof QuestStatus>;

export const QuestProgress = z
  .object({
    questId: z.string(),
    status: QuestStatus,
    currentStepId: z.string().nullable(),
    completedStepIds: z.array(z.string()).default([]),
    startedAtWorldMinute: z.number().int().nullable().default(null),
  })
  .strict();
export type QuestProgress = z.infer<typeof QuestProgress>;

export const FactionState = z
  .object({
    factionId: z.string(),
    reputation: z.number().int().min(-100).max(100),
    rankLabel: z.string().default(''),
  })
  .strict();
export type FactionState = z.infer<typeof FactionState>;

export const CharacterRuntimeState = z
  .object({
    characterId: z.string(),
    locationId: z.string(),
    alive: z.boolean().default(true),
    health: z.number().int().nullable().default(null),
    statuses: z.array(StatusEffect).default([]),
    /** Secret ids this NPC has revealed to the player. */
    revealedSecretIds: z.array(z.string()).default([]),
    /** Fact ids this NPC has learned in play, beyond their authored scope. */
    learnedFactIds: z.array(z.string()).default([]),
  })
  .strict();
export type CharacterRuntimeState = z.infer<typeof CharacterRuntimeState>;

/** Spec §13.2 — encounter state created when a hostile encounter begins. */
export const EncounterParticipant = z
  .object({
    entityId: z.string(),
    kind: z.enum(['PLAYER', 'NPC']),
    team: z.enum(['ALLY', 'ENEMY', 'NEUTRAL']),
    initiative: z.number().int(),
    health: z.number().int(),
    maxHealth: z.number().int(),
    zoneId: z.string(),
    statuses: z.array(StatusEffect).default([]),
    downed: z.boolean().default(false),
  })
  .strict();
export type EncounterParticipant = z.infer<typeof EncounterParticipant>;

export const EncounterState = z
  .object({
    encounterId: z.string(),
    objective: z.string(),
    participants: z.array(EncounterParticipant),
    /** Named zones with adjacency. Movement between adjacent zones is free. */
    zones: z.array(z.object({ id: z.string(), label: z.string(), adjacentTo: z.array(z.string()) }).strict()),
    round: z.number().int().min(1).default(1),
    activeEntityId: z.string(),
    turnOrder: z.array(z.string()),
    environmentalAffordances: z.array(z.string()).default([]),
    escapeCondition: z.string().default(''),
    surrenderAllowed: z.boolean().default(true),
  })
  .strict();
export type EncounterState = z.infer<typeof EncounterState>;

/** Spec §17.6 — retrievable canon. */
export const MemoryFact = z
  .object({
    factId: z.string(),
    subjectId: z.string(),
    predicate: z.string(),
    value: z.unknown(),
    text: z.string(),
    visibility: FactVisibility,
    importance: z.number().min(0).max(1),
    confidence: z.number().min(0).max(1).default(1),
    pinned: z.boolean().default(false),
    createdAtTurn: z.number().int(),
    createdAtWorldMinute: z.number().int(),
    sourceEventIds: z.array(z.string()).default([]),
    supersededByFactId: z.string().nullable().default(null),
    /** Set when the player repairs a generated inconsistency. Spec §11.8. */
    correctedByPlayer: z.boolean().default(false),
  })
  .strict();
export type MemoryFact = z.infer<typeof MemoryFact>;

/** Spec §16.4 — per-promise director state. */
export const PromiseState = z
  .object({
    promiseId: z.string(),
    stage: z.enum(['SEEDED', 'DEVELOPED', 'ESCALATED', 'PAYOFF_READY', 'PAID_OFF', 'ABANDONED']),
    lastTouchedTurn: z.number().int().default(0),
  })
  .strict();
export type PromiseState = z.infer<typeof PromiseState>;

export const ArcState = z
  .object({
    episode: z.number().int().min(1).default(1),
    turnsInEpisode: z.number().int().min(0).default(0),
    /** Where the episode sits in the §16.5 shape. */
    pacingStage: z
      .enum(['HOOK', 'OBJECTIVE', 'CHOICES', 'ESCALATION', 'CONSEQUENCE', 'REST'])
      .default('HOOK'),
    promises: z.array(PromiseState).default([]),
    tensionScore: z.number().min(0).max(1).default(0.3),
  })
  .strict();
export type ArcState = z.infer<typeof ArcState>;

/** Spec §35.1 — the full snapshot restored on session load. */
export const GameState = z
  .object({
    sessionId: z.string(),
    storyVersionId: z.string(),
    revision: z.number().int().min(0),
    turnIndex: z.number().int().min(0),
    /** Minutes since story epoch. Day = floor(worldMinute / 1440). */
    worldMinute: z.number().int().min(0),
    player: PlayerCharacterState,
    characters: z.array(CharacterRuntimeState),
    relationships: z.array(RelationshipState),
    quests: z.array(QuestProgress),
    factions: z.array(FactionState),
    discoveredLocationIds: z.array(z.string()),
    flags: z.record(z.union([z.string(), z.number(), z.boolean()])),
    encounter: EncounterState.nullable().default(null),
    arc: ArcState,
    /** Lineage of consumed seeds, so a branch can be replayed deterministically. */
    rngCursor: z.number().int().min(0).default(0),
    completedEventIds: z.array(z.string()).default([]),
  })
  .strict();
export type GameState = z.infer<typeof GameState>;

/** Spec §35.1 — append-only authoritative change log. */
export const GameEvent = z
  .object({
    eventId: z.string(),
    sessionId: z.string(),
    turnId: z.string().nullable(),
    sequence: z.number().int(),
    type: z.string(),
    subjectId: z.string(),
    reasonCode: z.string(),
    payload: z.record(z.unknown()),
    worldMinute: z.number().int(),
    createdAt: z.string(),
  })
  .strict();
export type GameEvent = z.infer<typeof GameEvent>;
