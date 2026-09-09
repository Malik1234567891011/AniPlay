import { z } from 'zod';
import {
  BeatPlan,
  CheckOutcome,
  CheckResult,
  ConsistencyViolation,
  MediaPlan,
  NarrativeBlock,
  Resolution,
  StateDeltaPresentation,
  StateMutation,
  SuggestedAction,
} from '../ai/index.js';
import { ArchetypeDef, ContentDescriptor, StorySummary, StoryVersion } from '../game/story.js';
import { LedgerEntry, QualityTier, StoreOffer, WalletSummary } from '../game/economy.js';
import {
  EncounterState,
  FactionState,
  GameEvent,
  MemoryFact,
  PlayerIdentity,
  QuestProgress,
  RelationshipState,
  ResourceState,
  StatusEffect,
} from '../game/state.js';

/** Spec §33 — the `/v1` REST surface. */

export const API_VERSION = 'v1';
export const CONTRACT_VERSION = '1.0.0';

// --- Bootstrap (§33.1) -----------------------------------------------------

export const FeatureFlags = z
  .object({
    coopBeta: z.boolean().default(false),
    animationBeta: z.boolean().default(false),
    voicePlayback: z.boolean().default(true),
    heroImages: z.boolean().default(true),
    offScreenEvents: z.boolean().default(false),
    creatorPublishing: z.boolean().default(true),
    pushNotifications: z.boolean().default(false),
  })
  .strict();
export type FeatureFlags = z.infer<typeof FeatureFlags>;

export const QualityTierInfo = z
  .object({
    id: QualityTier,
    label: z.string(),
    costCredits: z.number().int(),
    promise: z.string(),
    heroImageEligible: z.boolean(),
  })
  .strict();
export type QualityTierInfo = z.infer<typeof QualityTierInfo>;

export const BootstrapResponse = z
  .object({
    featureFlags: FeatureFlags,
    qualityTiers: z.array(QualityTierInfo),
    defaultQualityTier: QualityTier,
    contentDescriptors: z.array(ContentDescriptor),
    genres: z.array(z.object({ id: z.string(), label: z.string() }).strict()),
    minSupportedAppVersion: z.string(),
    maintenance: z
      .object({ active: z.boolean(), message: z.string().nullable() })
      .strict(),
    profile: z
      .object({
        userId: z.string(),
        displayName: z.string(),
        handle: z.string(),
        isGuest: z.boolean(),
        avatarUrl: z.string().nullable(),
        ageVerified: z.boolean(),
      })
      .strict()
      .nullable(),
    wallet: WalletSummary.nullable(),
  })
  .strict();
export type BootstrapResponse = z.infer<typeof BootstrapResponse>;

// --- Discover / catalog (§33.2) --------------------------------------------

export const DiscoverRail = z
  .object({
    id: z.string(),
    title: z.string(),
    kind: z.enum(['HERO', 'CONTINUE', 'FOR_YOU', 'TRENDING', 'NEW', 'GENRE', 'FOLLOWING']),
    subtitle: z.string().nullable().default(null),
    stories: z.array(StorySummary),
  })
  .strict();
export type DiscoverRail = z.infer<typeof DiscoverRail>;

export const ContinueCard = z
  .object({
    sessionId: z.string(),
    storyId: z.string(),
    title: z.string(),
    coverImage: z.string().nullable(),
    lastPlayedAt: z.string(),
    turnCount: z.number().int(),
    currentObjective: z.string().nullable(),
    recapLine: z.string().nullable(),
  })
  .strict();
export type ContinueCard = z.infer<typeof ContinueCard>;

/**
 * A browse category, with how many worlds are actually in it.
 *
 * The count is not decoration — it is what lets the client refuse to render a
 * category that would open onto an empty screen, which is the fastest way to
 * make a small catalog feel padded.
 */
export const DiscoverCategory = z
  .object({
    id: z.string(),
    label: z.string(),
    count: z.number().int().min(0),
  })
  .strict();
export type DiscoverCategory = z.infer<typeof DiscoverCategory>;

export const DiscoverResponse = z
  .object({
    rails: z.array(DiscoverRail),
    continueCards: z.array(ContinueCard),
    /** The browse rail. Derived from the catalog, never authored. */
    categories: z.array(DiscoverCategory).default([]),
    /** Echoed back so the client can tell which filter produced this page. */
    activeCategory: z.string().nullable().default(null),
  })
  .strict();
export type DiscoverResponse = z.infer<typeof DiscoverResponse>;

export const SearchFilters = z
  .object({
    genres: z.array(z.string()).default([]),
    romance: z.enum(['ANY', 'YES', 'NO']).default('ANY'),
    combat: z.enum(['ANY', 'YES', 'NO']).default('ANY'),
    source: z.enum(['ANY', 'OFFICIAL', 'COMMUNITY']).default('ANY'),
    intensity: z.array(z.enum(['LIGHT', 'MODERATE', 'INTENSE'])).default([]),
  })
  .strict();
export type SearchFilters = z.infer<typeof SearchFilters>;

/**
 * An archetype as the setup screen needs it: the option's own copy plus what
 * choosing it actually gives you, resolved to names on the server.
 *
 * Derived rather than authored. A card that lists its own effects by hand goes
 * stale the first time somebody edits a stat block, and a player who is told
 * one thing and given another has been lied to by a screen.
 */
export const SetupArchetype = ArchetypeDef.extend({
  grants: z
    .object({
      attributes: z.array(z.string()),
      skills: z.array(z.string()),
      abilities: z.array(z.string()),
      items: z.array(z.string()),
      standing: z.array(z.string()),
    })
    .strict(),
}).strict();
export type SetupArchetype = z.infer<typeof SetupArchetype>;

export const StoryDetailResponse = z
  .object({
    story: StorySummary,
    premise: z.string(),
    creatorNote: z.string(),
    opening: z.string(),
    /** Cast carousel. Public traits only — never hidden drives. */
    cast: z.array(
      z
        .object({
          id: z.string(),
          name: z.string(),
          role: z.string(),
          /** Story function and relationship to the player. Leads the card. */
          cardBlurb: z.string(),
          portrait: z.string().nullable(),
          publicTraits: z.array(z.string()),
          /**
           * The rest of the card, for when a player taps a face.
           *
           * The carousel truncates a blurb to four lines because a carousel
           * has to; that is only acceptable if the whole thing is one tap
           * away. Nothing here is a spoiler — it is what the cast is publicly
           * known for, which is exactly what a viewer would learn by meeting
           * them.
           */
          pronouns: z.string().default('they/them'),
          appearance: z.string().default(''),
        })
        .strict(),
    ),
    stats: z
      .object({
        runs: z.number().int(),
        medianDepthLabel: z.string(),
        intensity: z.string(),
        updatedAt: z.string(),
      })
      .strict(),
    related: z.array(StorySummary),
    activeSessionId: z.string().nullable(),
    setupFields: StoryVersion.shape.setupFields,
    archetypes: z.array(SetupArchetype),
  })
  .strict();
export type StoryDetailResponse = z.infer<typeof StoryDetailResponse>;

// --- Sessions (§33.3) ------------------------------------------------------

export const CreateSessionRequest = z
  .object({
    identity: PlayerIdentity,
    /** Present when the player took the fast path and skipped advanced setup. */
    usedQuickSetup: z.boolean().default(true),
  })
  .strict();
export type CreateSessionRequest = z.infer<typeof CreateSessionRequest>;

export const SessionSummary = z
  .object({
    sessionId: z.string(),
    storyId: z.string(),
    storyVersionId: z.string(),
    title: z.string(),
    coverImage: z.string().nullable(),
    revision: z.number().int(),
    turnCount: z.number().int(),
    status: z.enum(['ACTIVE', 'COMPLETED', 'ARCHIVED']),
    createdAt: z.string(),
    lastPlayedAt: z.string(),
    displayName: z.string(),
    forkedFromSessionId: z.string().nullable(),
    forkedAtTurnIndex: z.number().int().nullable(),
  })
  .strict();
export type SessionSummary = z.infer<typeof SessionSummary>;

/** Everything the session screen needs to render the stage on load. */
export const SessionSceneState = z
  .object({
    locationId: z.string(),
    locationName: z.string(),
    stageImage: z.string().nullable(),
    worldTimeLabel: z.string(),
    worldMinute: z.number().int(),
    dayNumber: z.number().int(),
    presentCharacters: z.array(
      z
        .object({
          id: z.string(),
          name: z.string(),
          portrait: z.string().nullable(),
          expression: z.string(),
          speaking: z.boolean(),
        })
        .strict(),
    ),
    objective: z.string().nullable(),
    resources: z.array(
      z
        .object({
          id: z.string(),
          name: z.string(),
          current: z.number(),
          max: z.number(),
          color: z.string().nullable(),
          polarity: z.enum(['GOOD_HIGH', 'GOOD_LOW']),
        })
        .strict(),
    ),
    encounter: EncounterState.nullable(),
    /**
     * Who is travelling with the player. Spec §14.7.
     *
     * `mood` is deliberately a word rather than the morale number: the player
     * should be able to tell that their gunner is unhappy without being shown a
     * bar, and the number is the engine's business. Empty in worlds with no
     * companions, which is most of them.
     */
    crew: z
      .array(
        z
          .object({
            id: z.string(),
            name: z.string(),
            station: z.string(),
            mood: z.string(),
            portrait: z.string().nullable(),
          })
          .strict(),
      )
      .default([]),
  })
  .strict();
export type SessionSceneState = z.infer<typeof SessionSceneState>;

export const TurnRecord = z
  .object({
    turnId: z.string(),
    sessionId: z.string(),
    turnIndex: z.number().int(),
    /** Null on the opening turn, which the player did not author. */
    actionText: z.string().nullable(),
    qualityTier: QualityTier,
    creditsCharged: z.number().int(),
    sceneSummary: z.string(),
    blocks: z.array(NarrativeBlock),
    checks: z.array(CheckResult),
    stateDeltas: z.array(StateDeltaPresentation),
    mutations: z.array(StateMutation),
    suggestions: z.array(SuggestedAction),
    endStatePrompt: z.string(),
    mediaPlan: MediaPlan.nullable(),
    heroImageUrl: z.string().nullable(),
    revisionAfter: z.number().int(),
    createdAt: z.string(),
    /** Present when a repair pass ran. Surfaced only in creator/debug trace. */
    repairViolations: z.array(ConsistencyViolation).default([]),
    /**
     * What the engine decided, kept whole (§20.9).
     *
     * `Rephrase narration` reruns only the writer. That is only honest if the
     * resolution it writes from is the same one — re-resolving would roll new
     * dice behind a button that promised not to. Optional so turns recorded
     * before this existed still load; a rephrase needs it and says so.
     */
    resolution: Resolution.nullable().default(null),
    /** How the beat was staged, so a rephrase restages it identically. */
    beatPlan: BeatPlan.nullable().default(null),
  })
  .strict();
export type TurnRecord = z.infer<typeof TurnRecord>;

/**
 * What a player is allowed to see of a check.
 *
 * Spec §12.7 — "do not reveal exact DC unless story settings allow it". A
 * `CheckResult` carries the DC, every die rolled, the modifier and the margin,
 * so sending one to a player of a world with `revealExactDc: false` hands them
 * the number the world is deliberately not telling them. The coarse band is
 * always allowed; the arithmetic appears only when the story opts in.
 */
export const PlayerCheckResult = z
  .object({
    checkId: z.string(),
    label: z.string(),
    attribute: z.string(),
    skill: z.string().nullable(),
    outcome: CheckOutcome,
    /** §12.7 — Safe / Uncertain / Risky / Extreme, never a number. */
    difficultyLabel: z.string(),
    /** Present only when the story sets `revealExactDc`. */
    dc: z.number().int().nullable(),
    /** Present only when the story sets `revealCheckMath`. */
    math: z.string().nullable(),
  })
  .strict();
export type PlayerCheckResult = z.infer<typeof PlayerCheckResult>;

/**
 * A committed turn as the player receives it.
 *
 * `TurnRecord` is the internal record and stays that way: it carries the raw
 * mutation list and the repair violations, which the record itself describes as
 * creator/debug trace. Neither belongs in a response that any client can read.
 */
export const PlayerTurnRecord = z
  .object({
    turnId: z.string(),
    sessionId: z.string(),
    turnIndex: z.number().int(),
    actionText: z.string().nullable(),
    qualityTier: QualityTier,
    creditsCharged: z.number().int(),
    sceneSummary: z.string(),
    blocks: z.array(NarrativeBlock),
    checks: z.array(PlayerCheckResult),
    /** The presented deltas, which is what the UI shows anyway. */
    stateDeltas: z.array(StateDeltaPresentation),
    suggestions: z.array(SuggestedAction),
    endStatePrompt: z.string(),
    heroImageUrl: z.string().nullable(),
    revisionAfter: z.number().int(),
    createdAt: z.string(),
  })
  .strict();
export type PlayerTurnRecord = z.infer<typeof PlayerTurnRecord>;

export const SessionDetailResponse = z
  .object({
    session: SessionSummary,
    scene: SessionSceneState,
    recentTurns: z.array(PlayerTurnRecord),
    suggestions: z.array(SuggestedAction),
    /** Spec §16.6 — shown when returning after >8h. */
    recap: z
      .object({ bullets: z.array(z.string()), objective: z.string().nullable() })
      .strict()
      .nullable(),
    revision: z.number().int(),
  })
  .strict();
export type SessionDetailResponse = z.infer<typeof SessionDetailResponse>;

// --- World Sheet (§11) -----------------------------------------------------

export const WorldSheetResponse = z
  .object({
    overview: z
      .object({
        locationName: z.string(),
        worldTimeLabel: z.string(),
        chapterLabel: z.string(),
        topObjective: z.string().nullable(),
        resources: SessionSceneState.shape.resources,
        statuses: z.array(StatusEffect),
        relationshipHighlights: z.array(
          z.object({ characterId: z.string(), name: z.string(), label: z.string() }).strict(),
        ),
        recentEvents: z.array(z.string()),
      })
      .strict(),
    character: z
      .object({
        identity: PlayerIdentity,
        level: z.number().int(),
        xp: z.number().int(),
        progressionMode: z.enum(['LEVEL', 'MILESTONE']),
        milestones: z.array(z.string()),
        attributes: z.array(
          z
            .object({
              key: z.string(),
              name: z.string(),
              value: z.number().int(),
              modifier: z.number().int(),
              plainLanguage: z.string(),
            })
            .strict(),
        ),
        skills: z.array(
          z
            .object({
              id: z.string(),
              name: z.string(),
              attribute: z.string(),
              proficiency: z.number().int(),
              proficiencyLabel: z.string(),
            })
            .strict(),
        ),
        abilities: z.array(
          z
            .object({
              id: z.string(),
              name: z.string(),
              /** Layer 1: what it does, derived from what it is. */
              effect: z.string(),
              /** Layer 2: the world's own words for it. */
              description: z.string(),
              costLabel: z.string(),
              cooldownRemaining: z.number().int(),
            })
            .strict(),
        ),
        statuses: z.array(StatusEffect),
        factions: z.array(
          z
            .object({ factionId: z.string(), name: z.string(), reputation: z.number().int(), rankLabel: z.string() })
            .strict(),
        ),
        canonFacts: z.array(z.string()),
      })
      .strict(),
    inventory: z.array(
      z
        .object({
          entryId: z.string(),
          itemId: z.string(),
          name: z.string(),
          quantity: z.number().int(),
          equipped: z.boolean(),
          equipSlot: z.string().nullable(),
          rarity: z.string().nullable(),
          icon: z.string().nullable(),
          effects: z.array(z.string()),
          description: z.string(),
          loreText: z.string(),
          canUse: z.boolean(),
          canEquip: z.boolean(),
        })
        .strict(),
    ),
    quests: z.array(
      z
        .object({
          questId: z.string(),
          title: z.string(),
          summary: z.string(),
          status: QuestProgress.shape.status,
          currentStepCopy: z.string().nullable(),
          deadlineLabel: z.string().nullable(),
          rewardCopy: z.string(),
          involvedNames: z.array(z.string()),
        })
        .strict(),
    ),
    relationships: z.array(
      z
        .object({
          characterId: z.string(),
          name: z.string(),
          portrait: z.string().nullable(),
          label: z.string(),
          lastInteractionTurn: z.number().int(),
          dimensions: z
            .object({
              trust: z.number().int(),
              affection: z.number().int(),
              respect: z.number().int(),
              fear: z.number().int(),
              rivalry: z.number().int(),
            })
            .strict(),
        })
        .strict(),
    ),
    map: z
      .object({
        currentLocationId: z.string(),
        nodes: z.array(
          z
            .object({
              id: z.string(),
              name: z.string(),
              discovered: z.boolean(),
              current: z.boolean(),
              hasQuest: z.boolean(),
              locked: z.boolean(),
              lockReason: z.string().nullable(),
              travelMinutes: z.number().int().nullable(),
              position: z.object({ x: z.number(), y: z.number() }).strict(),
            })
            .strict(),
        ),
        edges: z.array(z.object({ from: z.string(), to: z.string() }).strict()),
      })
      .strict(),
  })
  .strict();
export type WorldSheetResponse = z.infer<typeof WorldSheetResponse>;

export const TimelineEntry = z
  .object({
    id: z.string(),
    group: z.enum(['CANON', 'CHOICE', 'RELATIONSHIP', 'QUEST', 'ITEM', 'WORLD']),
    turnIndex: z.number().int(),
    worldTimeLabel: z.string(),
    text: z.string(),
    pinned: z.boolean(),
    correctable: z.boolean(),
    forkable: z.boolean(),
  })
  .strict();
export type TimelineEntry = z.infer<typeof TimelineEntry>;

export const TimelineResponse = z
  .object({ entries: z.array(TimelineEntry) })
  .strict();
export type TimelineResponse = z.infer<typeof TimelineResponse>;

export const CanonCorrectionRequest = z
  .object({
    factId: z.string(),
    correctedText: z.string().max(400),
  })
  .strict();
export type CanonCorrectionRequest = z.infer<typeof CanonCorrectionRequest>;

export const CanonCorrectionResponse = z
  .object({
    accepted: z.boolean(),
    /** Populated when the correction contradicts authoritative state (§11.8 step 5). */
    conflictExplanation: z.string().nullable(),
    offerFork: z.boolean(),
    fact: MemoryFact.nullable(),
  })
  .strict();
export type CanonCorrectionResponse = z.infer<typeof CanonCorrectionResponse>;

// --- Turns (§33.4) ---------------------------------------------------------

export const SubmitTurnRequest = z
  .object({
    actionText: z.string().min(1).max(2000),
    qualityTier: QualityTier,
    sessionRevision: z.number().int(),
    selectedSuggestionId: z.string().nullable().default(null),
    voicePreferred: z.boolean().default(false),
  })
  .strict();
export type SubmitTurnRequest = z.infer<typeof SubmitTurnRequest>;

export const SubmitTurnResponse = z
  .object({
    turnId: z.string(),
    reservedCredits: z.number().int(),
    balanceAfterReserve: z.number().int(),
    acceptedRevision: z.number().int(),
    streamUrl: z.string(),
    streamToken: z.string(),
  })
  .strict();
export type SubmitTurnResponse = z.infer<typeof SubmitTurnResponse>;

/** Spec §17.9 — SSE event names. Every event carries turnId + sequence. */
export const TurnStreamEventName = z.enum([
  'turn.accepted',
  'check.started',
  'check.resolved',
  'text.delta',
  'state.delta',
  'turn.completed',
  'media.queued',
  'media.completed',
  'turn.failed',
]);
export type TurnStreamEventName = z.infer<typeof TurnStreamEventName>;

export const TurnStreamEvent = z.object({
  event: TurnStreamEventName,
  turnId: z.string(),
  sequence: z.number().int(),
  sessionRevision: z.number().int().nullable().optional(),
  data: z.record(z.unknown()),
});
export type TurnStreamEvent = z.infer<typeof TurnStreamEvent>;

export const InsufficientCreditsError = z
  .object({
    code: z.literal('INSUFFICIENT_CREDITS'),
    required: z.number().int(),
    balance: z.number().int(),
    shortfall: z.number().int(),
  })
  .strict();
export type InsufficientCreditsError = z.infer<typeof InsufficientCreditsError>;

export const StaleRevisionError = z
  .object({
    code: z.literal('STALE_REVISION'),
    currentRevision: z.number().int(),
    latestTurnId: z.string().nullable(),
  })
  .strict();
export type StaleRevisionError = z.infer<typeof StaleRevisionError>;

// --- Wallet / store (§33.5) ------------------------------------------------

export const WalletResponse = z
  .object({
    wallet: WalletSummary,
    offers: z.array(StoreOffer),
  })
  .strict();
export type WalletResponse = z.infer<typeof WalletResponse>;

export const LedgerResponse = z
  .object({ entries: z.array(LedgerEntry), nextCursor: z.string().nullable() })
  .strict();
export type LedgerResponse = z.infer<typeof LedgerResponse>;

export const PurchaseSyncRequest = z
  .object({
    productId: z.string(),
    /** Store transaction id. Reconciliation is idempotent on this. §33.5. */
    storeTransactionId: z.string(),
    platform: z.enum(['APP_STORE', 'PLAY_STORE', 'SANDBOX']),
    receipt: z.string().nullable().default(null),
  })
  .strict();
export type PurchaseSyncRequest = z.infer<typeof PurchaseSyncRequest>;

/**
 * Spec §20.6 — `Restore purchases`.
 *
 * The client asks the platform for the transactions it holds for this account
 * and posts them all. Each one is verified and reconciled independently, so a
 * purchase the store took but our reconciliation missed comes back, and one
 * that was already credited is simply a duplicate.
 */
export const PurchaseRestoreRequest = z
  .object({ transactions: z.array(PurchaseSyncRequest).max(100) })
  .strict();
export type PurchaseRestoreRequest = z.infer<typeof PurchaseRestoreRequest>;

export const PurchaseRestoreResponse = z
  .object({
    /** Transactions the store confirmed. */
    verified: z.number().int(),
    /** Of those, the ones that had not been credited yet. */
    restored: z.number().int(),
    creditsRestored: z.number().int(),
    balance: z.number().int(),
  })
  .strict();
export type PurchaseRestoreResponse = z.infer<typeof PurchaseRestoreResponse>;

// --- Safety (§33.8) --------------------------------------------------------

export const ReportReason = z.enum([
  'SEXUAL_CONTENT_INVOLVING_MINORS',
  'HARASSMENT',
  'HATE',
  'VIOLENCE_THREAT',
  'SELF_HARM',
  'IP_VIOLATION',
  'IMPERSONATION',
  'SPAM',
  'BROKEN_OR_INCONSISTENT',
  'OTHER',
]);
export type ReportReason = z.infer<typeof ReportReason>;

export const CreateReportRequest = z
  .object({
    targetType: z.enum(['STORY', 'TURN', 'USER', 'MEDIA', 'COMMENT']),
    targetId: z.string(),
    reason: ReportReason,
    details: z.string().max(1000).default(''),
    alsoHide: z.boolean().default(false),
  })
  .strict();
export type CreateReportRequest = z.infer<typeof CreateReportRequest>;

// --- Account (§33.9) -------------------------------------------------------

export const MeResponse = z
  .object({
    userId: z.string(),
    displayName: z.string(),
    handle: z.string(),
    email: z.string().nullable(),
    isGuest: z.boolean(),
    avatarUrl: z.string().nullable(),
    ageVerified: z.boolean(),
    createdAt: z.string(),
    settings: z
      .object({
        showAdvancedRelationshipStats: z.boolean(),
        showCheckMath: z.boolean(),
        reduceMotion: z.boolean(),
        voiceAutoplay: z.boolean(),
        hapticsEnabled: z.boolean(),
        defaultQualityTier: QualityTier,
        contentFilters: z.array(ContentDescriptor),
      })
      .strict(),
    stats: z
      .object({ storiesPlayed: z.number().int(), turnsPlayed: z.number().int(), worldsCreated: z.number().int() })
      .strict(),
  })
  .strict();
export type MeResponse = z.infer<typeof MeResponse>;

export const ApiError = z
  .object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.unknown()).optional(),
  })
  .strict();
export type ApiError = z.infer<typeof ApiError>;

export type { GameEvent, MemoryFact, RelationshipState, FactionState, ResourceState };
