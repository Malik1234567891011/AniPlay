import { z } from 'zod';
import { FactVisibility } from '../ai/primitives.js';
import { GRAMMATICAL_GENDERS } from '@plotbreak/i18n';
import { LocaleSchema } from './locale.js';
import { AttributeKey, CharacterDef, LocationDef } from './story.js';

/**
 * Authoritative runtime game state. This is the truth the writer decorates —
 * spec §0: "Deterministic game state overrides generated prose."
 */

/**
 * How the narration should agree with the player, grammatically.
 *
 * Locale-specific and additive: an English session neither collects nor reads
 * it. French needs it constantly and in second person — `Tu es arrivé` against
 * `Tu es arrivée` — across past participles with `être`, reflexive pasts,
 * predicate adjectives, role nouns and how an NPC refers to you.
 *
 * **Declared, never inferred.** Not from the display name, not from the
 * portrait, not from the archetype, and not by parsing `pronouns` — every one
 * of those is wrong for some real player, and being wrong about this in a
 * romance product is not a typo.
 *
 * `NEUTRAL` and `UNSPECIFIED` are handled by *avoidance*, not by a midpoint.
 * `arrivé·e` never appears in narration: the midpoint is an administrative
 * register in France, it was banned from school documents by ministerial
 * circular, it breaks read-aloud, and the product marks blocks `voiceEligible`.
 * Present-tense, verb-driven French avoids the participle entirely, which is
 * what `NARRATIVE_STYLE.md` asks for on independent grounds.
 */
export const GrammaticalGender = z.enum(GRAMMATICAL_GENDERS);
export type GrammaticalGender = z.infer<typeof GrammaticalGender>;

export const PlayerGrammar = z
  .object({
    gender: GrammaticalGender.default('UNSPECIFIED'),
    /**
     * What NPCs use in the third person. fr-FR: `il` | `elle` | `iel`, or a
     * neologism the player typed. Free text on purpose — the enum above is for
     * agreement, and a four-value enum must not take over the self-expression
     * work.
     */
    thirdPerson: z.string().default(''),
  })
  .strict();
export type PlayerGrammar = z.infer<typeof PlayerGrammar>;

export const PlayerIdentity = z
  .object({
    displayName: z.string(),
    /**
     * Free text, and it stays free text. The player is explicitly invited to
     * "write anything" here, so it cannot be repurposed as a grammar signal —
     * see `grammar` below, which is the field French actually reads.
     */
    pronouns: z.string().default('they/them'),
    /**
     * Additive and **optional**, not defaulted.
     *
     * Optional so that every `PlayerIdentity` literal already in the codebase —
     * 29 spec fixtures across five packages — keeps compiling untouched. A
     * defaulted field is present after `parse` but still required in the
     * inferred type, which would have made a French-only field a breaking
     * change for the English test suite. Read it through
     * `playerGrammar(identity)`, which normalises `undefined` to the unmarked
     * form.
     */
    grammar: PlayerGrammar.optional(),
    ageBand: z.string().nullable().default(null),
    archetypeId: z.string().nullable().default(null),
    /** Max 300 chars. Spec §9.2 CS-01. */
    worldKnowsAboutYou: z.string().max(300).default(''),
    advanced: z.record(z.string()).default({}),
    portraitAssetId: z.string().nullable().default(null),
  })
  .strict();
export type PlayerIdentity = z.infer<typeof PlayerIdentity>;

/** The unmarked form: masculine agreement, no third-person preference stated. */
export const DEFAULT_PLAYER_GRAMMAR: PlayerGrammar = {
  gender: 'UNSPECIFIED',
  thirdPerson: '',
};

/**
 * Read an identity's grammar without every caller having to handle `undefined`.
 *
 * An identity created before the field existed, or in an English session that
 * never asks the question, reads as `UNSPECIFIED` — which the French writer
 * handles by avoidance rather than by guessing.
 */
export function playerGrammar(identity: PlayerIdentity): PlayerGrammar {
  return identity.grammar ?? DEFAULT_PLAYER_GRAMMAR;
}

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
/**
 * `tu` or `vous`. fr-FR only; absent in locales that do not have T/V.
 *
 * English cannot express this and nothing in an English run reads it.
 */
export const AddressMode = z.enum(['TU', 'VOUS']);
export type AddressMode = z.infer<typeof AddressMode>;

/**
 * How two people address each other, as an **ordered pair**.
 *
 * Not one value per character: Mara may `vouvoyer` the player while the player
 * `tutoie` her, and that asymmetry is characterisation — a drillmaster who
 * suddenly *vouvoie* a recruit is being sarcastic or about to say something
 * serious. A single symmetric field cannot hold that.
 *
 * `pendingShift` is set when a change has been *earned* but not yet played.
 * The next beat in which this character speaks to the player performs the
 * switch, once, and clears it. A transition is a scene, not a silent flag: the
 * `TU → VOUS` move — a friend who starts vouvoying you — is the coldest thing
 * French can do to somebody, and it is worth a beat because the English version
 * physically cannot contain it.
 *
 * `.optional()` rather than `.default()` deliberately. A `.default()` field is
 * *required* in the inferred type, which would break every spec and fixture
 * that builds a `RelationshipState` literal — twenty-nine files the last time
 * this was tried. Read it through `addressState()`, never directly.
 */
export const AddressPair = z
  .object({
    /** How they address the player. */
    toPlayer: AddressMode,
    /** How the player is written addressing them, in generated cards. */
    fromPlayer: AddressMode,
    pendingShift: z
      .object({ to: AddressMode, because: z.string().max(200) })
      .strict()
      .nullable()
      .default(null),
  })
  .strict();
export type AddressPair = z.infer<typeof AddressPair>;

/**
 * Something the player is on the hook for.
 *
 * Two kinds, one shape, because they behave the same way: a thing was said,
 * somebody is holding the player to it, and it can still be kept or broken.
 *
 * `APPOINTMENT` has a clock — be somewhere, by a time. `PROMISE` may not
 * ("I am not going anywhere"), and an untimed promise is not weaker, it is
 * *harder*, because it has no moment at which it is discharged. It stays open
 * until something in the fiction keeps or breaks it.
 *
 * This exists because the Itachi opening establishes that Fugaku expects
 * Itachi in eighty minutes, the player then gives forty of those minutes to
 * Sasuke — and none of that was anywhere except in prose. The clock advanced
 * six minutes a turn quite correctly while nothing in the world knew there was
 * anything to be late for.
 */
export const Obligation = z
  .object({
    id: z.string(),
    kind: z.enum(['APPOINTMENT', 'PROMISE']),
    /** In the player's own words where possible — this is read by the writer. */
    what: z.string().max(300),
    /** Who is owed it. `null` for a deadline the world imposes. */
    withCharacterId: z.string().nullable().default(null),
    /** Absolute world minute it comes due. `null` for an open promise. */
    dueWorldMinute: z.number().int().nullable().default(null),
    /**
     * How long the player said they would spend, when they said so.
     *
     * Separate from `dueWorldMinute` because "I will give you forty minutes"
     * is a budget, not an appointment: it is spent by staying, and running it
     * out is what makes the next obligation start pressing.
     */
    budgetMinutes: z.number().int().nullable().default(null),
    createdTurn: z.number().int().default(0),
    status: z.enum(['OPEN', 'KEPT', 'BROKEN']).default('OPEN'),
  })
  .strict();
export type Obligation = z.infer<typeof Obligation>;

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
    /** fr-FR only, and only once something has moved it. See `AddressPair`. */
    address: AddressPair.optional(),
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
    /**
     * The language this run is played in. **Frozen at session creation and
     * never changed**, deliberately: a transcript that switches language
     * halfway down is unrecoverable, because the memory facts, the authored
     * canon corrections and the prose are all already in the other language.
     * Changing the device language, reinstalling or playing on a second device
     * must not move an existing run.
     *
     * Defaulted, so every snapshot written before this field existed loads as
     * `en` and behaves exactly as it did.
     */
    locale: LocaleSchema.default('en'),
    revision: z.number().int().min(0),
    turnIndex: z.number().int().min(0),
    /** Minutes since story epoch. Day = floor(worldMinute / 1440). */
    worldMinute: z.number().int().min(0),
    player: PlayerCharacterState,
    characters: z.array(CharacterRuntimeState),
    relationships: z.array(RelationshipState),
    quests: z.array(QuestProgress),
    /** Appointments and promises. Defaulted so old snapshots still parse. */
    obligations: z.array(Obligation).default([]),
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
