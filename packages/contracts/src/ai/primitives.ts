import { z } from 'zod';

/**
 * Canonical AI contract primitives. These mirror `ai_contracts.json` 1:1 —
 * the JSON Schema file is the published contract, this is its runtime twin.
 * Any change here must be mirrored there and vice versa; `contracts.spec.ts`
 * asserts the two stay aligned.
 */

export const SCHEMA_VERSION = '1.0' as const;

export const EntityType = z.enum([
  'player',
  'npc',
  'item',
  'location',
  'ability',
  'quest',
  'faction',
  'environment',
]);
export type EntityType = z.infer<typeof EntityType>;

export const EntityRef = z
  .object({
    entityType: EntityType,
    entityId: z.string().min(1),
    displayName: z.string().optional(),
  })
  .strict();
export type EntityRef = z.infer<typeof EntityRef>;

/** Spec §14.5 — who is allowed to perceive a line, fact, or action. */
export const Visibility = z.enum([
  'SELF',
  'PAIR_PRIVATE',
  'NPC_PRIVATE',
  'GROUP',
  'WORLD',
]);
export type Visibility = z.infer<typeof Visibility>;

/** Spec §14.5 — durable fact visibility, a wider scale than turn-level visibility. */
export const FactVisibility = z.enum([
  'WORLD_PUBLIC',
  'FACTION',
  'PARTY',
  'NPC_PRIVATE',
  'PLAYER_PRIVATE',
  'PAIR_PRIVATE',
  'CREATOR_ONLY',
]);
export type FactVisibility = z.infer<typeof FactVisibility>;

export const Verb = z.enum([
  'move',
  'speak',
  'persuade',
  'deceive',
  'threaten',
  'inspect',
  'use_item',
  'use_ability',
  'attack',
  'defend',
  'hide',
  'steal',
  'interact',
  'travel',
  'rest',
  'help',
  'oppose',
  'wait',
  'custom',
]);
export type Verb = z.infer<typeof Verb>;

export const TimeIntent = z.enum(['NOW', 'AFTER', 'DURING', 'UNTIL', 'UNSPECIFIED']);
export type TimeIntent = z.infer<typeof TimeIntent>;

/** Spec §12.5 — outcome bands, ordered worst to best for comparison helpers. */
export const CheckOutcome = z.enum([
  'CRITICAL_SUCCESS',
  'CLEAN_SUCCESS',
  'SUCCESS',
  'SUCCESS_WITH_COST',
  'FAILURE',
  'COMPLICATION',
]);
export type CheckOutcome = z.infer<typeof CheckOutcome>;

export const MutationType = z.enum([
  'RESOURCE_DELTA',
  'ITEM_ADD',
  'ITEM_REMOVE',
  'ITEM_UPDATE',
  'RELATIONSHIP_DELTA',
  'QUEST_TRANSITION',
  'FACTION_DELTA',
  'STATUS_ADD',
  'STATUS_REMOVE',
  'LOCATION_CHANGE',
  'TIME_ADVANCE',
  'ABILITY_UNLOCK',
  'XP_DELTA',
  'LEVEL_CHANGE',
  'FLAG_SET',
  'ENCOUNTER_START',
  'ENCOUNTER_UPDATE',
  'ENCOUNTER_END',
]);
export type MutationType = z.infer<typeof MutationType>;

export const RiskLabel = z.enum(['SAFE', 'UNCERTAIN', 'RISKY', 'EXTREME']);
export type RiskLabel = z.infer<typeof RiskLabel>;

export const BeatType = z.enum([
  'DIALOGUE',
  'ACTION',
  'CHECK',
  'COMBAT',
  'REVEAL',
  'TRANSITION',
  'REST',
  'CLIFFHANGER',
  'MONTAGE',
]);
export type BeatType = z.infer<typeof BeatType>;

export const BeatKind = z.enum([
  'NARRATION',
  'DIALOGUE',
  'STATE_REVEAL',
  'CHECK_REVEAL',
  'QUEST_UPDATE',
  'SCENE_TRANSITION',
]);
export type BeatKind = z.infer<typeof BeatKind>;

export const BlockType = z.enum(['NARRATION', 'DIALOGUE', 'SYSTEM']);
export type BlockType = z.infer<typeof BlockType>;

export const ShotType = z.enum([
  'NONE',
  'ESTABLISHING',
  'PORTRAIT',
  'TWO_SHOT',
  'ACTION',
  'REVEAL',
  'BOSS',
  'MOMENT',
]);
export type ShotType = z.infer<typeof ShotType>;

export const StageAction = z.enum(['KEEP', 'CHANGE_LOCATION', 'CHANGE_VARIANT']);
export type StageAction = z.infer<typeof StageAction>;

export const ViolationCode = z.enum([
  'UNSUPPORTED_STATE',
  'INVENTORY_CONTRADICTION',
  'LOCATION_CONTRADICTION',
  'DEAD_ENTITY_SPEAKS',
  'KNOWLEDGE_LEAK',
  'RELATIONSHIP_GATE_BYPASS',
  'QUEST_CONTRADICTION',
  'NAME_IDENTITY_DRIFT',
  'SAFETY',
  'FORMAT',
]);
export type ViolationCode = z.infer<typeof ViolationCode>;
