import { z } from 'zod';
import {
  BeatKind,
  BeatType,
  BlockType,
  CheckOutcome,
  EntityRef,
  FactVisibility,
  MutationType,
  RiskLabel,
  ShotType,
  StageAction,
  TimeIntent,
  Verb,
  ViolationCode,
  Visibility,
} from './primitives.js';

export * from './primitives.js';

const schemaVersion = z.literal('1.0');

// ---------------------------------------------------------------------------
// Stage 1 — Intent parser output (spec §17.1 step 5)
// ---------------------------------------------------------------------------

export const IntentDialogue = z
  .object({
    speaker: EntityRef,
    text: z.string(),
    visibility: Visibility,
  })
  .strict();
export type IntentDialogue = z.infer<typeof IntentDialogue>;

export const IntentAction = z
  .object({
    verb: Verb,
    actor: EntityRef,
    targets: z.array(EntityRef),
    method: z.string(),
    /**
     * What the player asserted would happen. Recorded, never trusted —
     * spec §3.2: freedom without omnipotence.
     */
    declaredOutcome: z.string().nullable(),
    abilityId: z.string().nullable().optional(),
    itemId: z.string().nullable().optional(),
    timeIntent: TimeIntent,
    visibility: Visibility.optional(),
  })
  .strict();
export type IntentAction = z.infer<typeof IntentAction>;

export const ActionIntent = z
  .object({
    schemaVersion,
    intentId: z.string(),
    rawAction: z.string().max(4000),
    dialogue: z.array(IntentDialogue),
    actions: z.array(IntentAction).min(1).max(8),
    confidence: z.number().min(0).max(1),
    ambiguities: z.array(z.string()),
    unsafeOrMetaRequests: z.array(z.string()).optional(),
  })
  .strict();
export type ActionIntent = z.infer<typeof ActionIntent>;

// ---------------------------------------------------------------------------
// Stage 2 — Deterministic engine output (spec §17.1 step 7)
// ---------------------------------------------------------------------------

export const CheckResult = z
  .object({
    checkId: z.string(),
    label: z.string(),
    attribute: z.string(),
    skill: z.string().nullable().optional(),
    dc: z.number().int(),
    advantageLevel: z.number().int().min(-2).max(2).optional(),
    rolls: z.array(z.number().int().min(1).max(20)),
    keptRoll: z.number().int().min(1).max(20),
    modifier: z.number().int(),
    total: z.number().int(),
    margin: z.number().int(),
    outcome: CheckOutcome,
  })
  .strict();
export type CheckResult = z.infer<typeof CheckResult>;

export const StateMutation = z
  .object({
    mutationId: z.string(),
    type: MutationType,
    subjectId: z.string(),
    reasonCode: z.string(),
    payload: z.record(z.unknown()),
  })
  .strict();
export type StateMutation = z.infer<typeof StateMutation>;

export const PrivateFact = z
  .object({ visibility: z.string(), fact: z.string() })
  .strict();
export type PrivateFact = z.infer<typeof PrivateFact>;

export const Resolution = z
  .object({
    schemaVersion,
    turnId: z.string(),
    valid: z.boolean(),
    invalidReason: z.string().nullable().optional(),
    normalizedActions: z.array(z.record(z.unknown())),
    checks: z.array(CheckResult),
    mutations: z.array(StateMutation),
    /** Facts any observer in the scene could perceive. Safe for the writer. */
    observableFacts: z.array(z.string()),
    /** Facts gated by visibility. The writer receives only what its audience may know. */
    privateFacts: z.array(PrivateFact),
    timeAdvancedMinutes: z.number().int().min(0),
    newOpportunities: z.array(z.string()),
    /** Audit handle so any turn can be replayed and verified. Spec §12.1. */
    rngSeedHash: z.string(),
  })
  .strict();
export type Resolution = z.infer<typeof Resolution>;

// ---------------------------------------------------------------------------
// Stage 3 — Director output (spec §17.1 step 8)
// ---------------------------------------------------------------------------

export const MemoryProposal = z
  .object({
    subjectId: z.string(),
    predicate: z.string(),
    value: z.unknown(),
    visibility: FactVisibility,
    importance: z.number().min(0).max(1),
    sourceEventIds: z.array(z.string()),
    supersedesFactId: z.string().nullable().optional(),
  })
  .strict();
export type MemoryProposal = z.infer<typeof MemoryProposal>;

export const HeroImagePlan = z
  .object({
    eligible: z.boolean(),
    reason: z.string(),
    shotType: ShotType,
  })
  .strict();
export type HeroImagePlan = z.infer<typeof HeroImagePlan>;

export const VoiceLine = z
  .object({ blockIndex: z.number().int().min(0), voiceId: z.string() })
  .strict();
export type VoiceLine = z.infer<typeof VoiceLine>;

export const MediaPlan = z
  .object({
    stageAction: StageAction,
    activeCharacterIds: z.array(z.string()).max(3),
    expressions: z.record(z.string()),
    heroImage: HeroImagePlan,
    voice: z.array(VoiceLine),
    sfx: z.array(z.string()),
    musicCue: z.string().nullable(),
  })
  .strict();
export type MediaPlan = z.infer<typeof MediaPlan>;

export const OrderedBeat = z
  .object({
    kind: BeatKind,
    factIds: z.array(z.string()),
    instruction: z.string(),
  })
  .strict();
export type OrderedBeat = z.infer<typeof OrderedBeat>;

export const SuggestedAction = z
  .object({
    text: z.string().max(180),
    intentHint: z.string(),
    risk: RiskLabel.optional(),
    resourceCostLabel: z.string().nullable().optional(),
  })
  .strict();
export type SuggestedAction = z.infer<typeof SuggestedAction>;

export const BeatPlan = z
  .object({
    schemaVersion,
    dramaticFocus: z.string(),
    beatType: BeatType,
    orderedBeats: z.array(OrderedBeat).min(1).max(10),
    speakerOrder: z.array(z.string()),
    reveals: z.array(z.string()),
    suggestedActions: z.array(SuggestedAction).max(3),
    mediaPlan: MediaPlan,
    memoryProposals: z.array(MemoryProposal),
    arcUpdates: z.array(z.record(z.unknown())),
    wordBudget: z.number().int().min(20).max(220),
  })
  .strict();
export type BeatPlan = z.infer<typeof BeatPlan>;

// ---------------------------------------------------------------------------
// Stage 4 — Writer output (spec §17.1 step 9)
// ---------------------------------------------------------------------------

export const NarrativeBlock = z
  .object({
    type: BlockType,
    speakerId: z.string().nullable().optional(),
    text: z.string().max(1200),
    visibility: Visibility,
    voiceEligible: z.boolean().optional(),
  })
  .strict();
export type NarrativeBlock = z.infer<typeof NarrativeBlock>;

export const StateDeltaPresentation = z
  .object({
    mutationId: z.string(),
    label: z.string().max(80),
    priority: z.number().int().min(1).max(5),
  })
  .strict();
export type StateDeltaPresentation = z.infer<typeof StateDeltaPresentation>;

export const NarrativeTurn = z
  .object({
    schemaVersion,
    sceneSummary: z.string().max(320),
    blocks: z.array(NarrativeBlock).min(1).max(12),
    stateDeltaPresentation: z.array(StateDeltaPresentation).max(8),
    endStatePrompt: z.string().max(160),
  })
  .strict();
export type NarrativeTurn = z.infer<typeof NarrativeTurn>;

// ---------------------------------------------------------------------------
// Stage 5 — Consistency validator output (spec §17.1 step 10)
// ---------------------------------------------------------------------------

export const ConsistencyViolation = z
  .object({
    code: ViolationCode,
    severity: z.enum(['WARN', 'ERROR']),
    description: z.string(),
    blockIndex: z.number().int().nullable().optional(),
  })
  .strict();
export type ConsistencyViolation = z.infer<typeof ConsistencyViolation>;

export const ConsistencyReport = z
  .object({
    valid: z.boolean(),
    violations: z.array(ConsistencyViolation),
  })
  .strict();
export type ConsistencyReport = z.infer<typeof ConsistencyReport>;
