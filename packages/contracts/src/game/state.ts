import { z } from 'zod';
import { FactVisibility } from '../ai/primitives.js';
import { AttributeKey, CharacterDef, LocationDef } from './story.js';

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

/**
 * Spec §11.9 — the part of this world the player made.
 *
 * A published `StoryVersion` is immutable and shared by every session of it,
 * which is right for authored content and fatal for generated content. When a
 * player walked out of the academy the writer invented a café, a shopkeeper
 * and a job, the prose continued perfectly — and none of it existed anywhere
 * the engine could see. Next session it was gone, because it had never been
 * anywhere.
 *
 * These are full definitions, in the same shapes an author uses, stored on the
 * session. Composed over the authored world at the top of every entry point,
 * so a generated person is a character in every sense that matters: you can
 * travel to their shop, talk to them, have a relationship with them, fight
 * them and kill them, and the forty places in the engine that look up
 * `story.characters` never need to know they were not there at the start.
 *
 * Promotion is deliberate and driven by the player. Three students in a
 * hallway stay prose. The one the player stops and talks to becomes real.
 */
export const GeneratedWorld = z
  .object({
    characters: z.array(CharacterDef).default([]),
    locations: z.array(LocationDef).default([]),
    /** How each came to exist, for the record and for retrieval. */
    origins: z
      .array(
        z
          .object({
            entityId: z.string(),
            kind: z.enum(['CHARACTER', 'LOCATION']),
            promotedAtTurn: z.number().int(),
            /** What the player did that made it real. */
            reason: z.string(),
          })
          .strict(),
      )
      .default([]),
  })
  .strict();
export type GeneratedWorld = z.infer<typeof GeneratedWorld>;

/**
 * Spec §13.8 — a bounded contest with a clock and a score.
 *
 * A basketball game, a duel tournament, a race. Distinct from `EncounterState`
 * because the unit of play is different: an encounter resolves every round
 * with the player acting in each one, while a contest is forty minutes long
 * and the player should be handed the ball perhaps a dozen times.
 *
 * The engine owns the score and the clock. Nothing downstream may claim a
 * number that is not here, which is the whole reason it exists as state rather
 * than as something the writer keeps track of in prose.
 */
export const ContestState = z
  .object({
    contestId: z.string(),
    /** Who this is against. A story character id. */
    opponentId: z.string(),
    opponentName: z.string(),
    /** What it takes to win, in the world's own words. */
    stakes: z.string().default(''),
    period: z.number().int().min(1),
    periodCount: z.number().int().min(1).default(4),
    /** Seconds left in the current period. */
    clockSeconds: z.number().int().min(0),
    playerScore: z.number().int().min(0).default(0),
    opponentScore: z.number().int().min(0).default(0),
    /** True when the player's side has the ball. */
    playerPossession: z.boolean().default(true),
    /**
     * Swings with runs and drains with effort. Not a resource the player
     * spends — a reading of how the contest is going that the director uses to
     * decide when to hand over control.
     */
    momentum: z.number().min(-1).max(1).default(0),
    /** Rising fatigue, 0â€“100. Costs accuracy late. */
    playerFatigue: z.number().min(0).max(100).default(0),
    playerFouls: z.number().int().min(0).default(0),
    /** Who is guarding the player right now. */
    matchupId: z.string().nullable().default(null),
    /** Set while the player has direct control of the possession. */
    playerControlled: z.boolean().default(false),
    /** Why control was handed over, for the director. */
    controlReason: z.string().default(''),
    /**
     * Simulated possessions since the player last had the ball.
     *
     * Without this, a reason like "you are being run off the floor" stays true
     * for as long as the run lasts and re-fires on every single call — which
     * hands the player nearly every possession and turns a forty-minute game
     * back into the two hundred turns of homework the simulation exists to
     * avoid. Time-critical reasons ignore it; mood-based ones do not.
     */
    possessionsSinceControl: z.number().int().min(0).default(99),
    /** Beat-by-beat log of what the simulation did, newest last. */
    log: z.array(z.string()).default([]),
    finished: z.boolean().default(false),
    /** Set once finished. */
    playerWon: z.boolean().nullable().default(null),
  })
  .strict();
export type ContestState = z.infer<typeof ContestState>;

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
    /** Spec §13.8 — a match in progress, if there is one. */
    contest: ContestState.nullable().default(null),
    /** Spec §11.9 — the part of this world the player made. */
    generated: GeneratedWorld.default({ characters: [], locations: [], origins: [] }),
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
