import { z } from 'zod';

/** Spec §20 — credits, quality tiers, wallet ledger. */

export const QualityTier = z.enum(['QUICK', 'VIVID', 'CINEMATIC', 'APEX']);
export type QualityTier = z.infer<typeof QualityTier>;

export interface QualityTierConfig {
  readonly id: QualityTier;
  readonly label: string;
  readonly costCredits: number;
  /** Player-facing promise. Must describe presentation, never dice. §20.3. */
  readonly promise: string;
  readonly wordBudget: number;
  readonly memoryBudget: number;
  readonly heroImageEligible: boolean;
  readonly directorRole: 'director_standard' | 'director_premium';
  readonly writerRole: 'writer_fast' | 'writer_standard' | 'writer_premium';
}

/**
 * Spec §20.3. The engine is identical across tiers — paying more must not buy
 * better dice. Only presentation depth, memory budget, and media change.
 */
export const QUALITY_TIERS: Record<QualityTier, QualityTierConfig> = {
  QUICK: {
    id: 'QUICK',
    label: 'Quick',
    costCredits: 30,
    promise: 'Fast, concise turn',
    wordBudget: 60,
    memoryBudget: 4,
    heroImageEligible: false,
    directorRole: 'director_standard',
    writerRole: 'writer_fast',
  },
  VIVID: {
    id: 'VIVID',
    label: 'Vivid',
    costCredits: 60,
    promise: 'Richer dialogue and direction',
    wordBudget: 95,
    memoryBudget: 8,
    heroImageEligible: false,
    directorRole: 'director_standard',
    writerRole: 'writer_standard',
  },
  CINEMATIC: {
    id: 'CINEMATIC',
    label: 'Cinematic',
    costCredits: 90,
    promise: 'Best balance of immersion and speed',
    wordBudget: 130,
    memoryBudget: 14,
    heroImageEligible: true,
    directorRole: 'director_standard',
    writerRole: 'writer_standard',
  },
  APEX: {
    id: 'APEX',
    label: 'Apex',
    costCredits: 195,
    promise: 'Deepest reasoning and premium storytelling',
    wordBudget: 190,
    memoryBudget: 20,
    heroImageEligible: true,
    directorRole: 'director_premium',
    writerRole: 'writer_premium',
  },
};

export const DEFAULT_QUALITY_TIER: QualityTier = 'VIVID';

/** Spec §20.7 — allowed ledger entry types. Balance derives from this log. */
export const LedgerEntryType = z.enum([
  'PURCHASE',
  'BONUS',
  'DAILY_GRANT',
  'NEW_USER_GRANT',
  'TURN_RESERVE',
  'TURN_FINALIZE',
  'TURN_RELEASE',
  'MEDIA_RESERVE',
  'MEDIA_FINALIZE',
  'MEDIA_RELEASE',
  'REFUND',
  'ADMIN_ADJUST',
  'CREATOR_GRANT',
  'PROMO_GRANT',
  'FORK_FEE',
]);
export type LedgerEntryType = z.infer<typeof LedgerEntryType>;

export const LedgerEntry = z
  .object({
    id: z.string(),
    accountId: z.string(),
    type: LedgerEntryType,
    /** Signed. Reserves are negative, releases positive. */
    amount: z.number().int(),
    balanceAfter: z.number().int(),
    reasonCode: z.string(),
    referenceId: z.string().nullable(),
    idempotencyKey: z.string().nullable(),
    createdAt: z.string(),
    metadata: z.record(z.unknown()).default({}),
  })
  .strict();
export type LedgerEntry = z.infer<typeof LedgerEntry>;

export const WalletSummary = z
  .object({
    accountId: z.string(),
    /** Spendable now: settled minus outstanding reserves. */
    balance: z.number().int(),
    reserved: z.number().int(),
    lifetimeGranted: z.number().int(),
    lifetimeSpent: z.number().int(),
    dailyClaimAvailable: z.boolean(),
    nextDailyClaimAt: z.string().nullable(),
    firstPurchaseOfferExpiresAt: z.string().nullable(),
  })
  .strict();
export type WalletSummary = z.infer<typeof WalletSummary>;

export const StoreOffer = z
  .object({
    productId: z.string(),
    credits: z.number().int(),
    bonusCredits: z.number().int().default(0),
    /** Reference price only — the store is the source of truth at purchase. */
    referencePriceUsd: z.number(),
    badge: z.string().nullable().default(null),
    firstPurchaseOnly: z.boolean().default(false),
    expiresAt: z.string().nullable().default(null),
  })
  .strict();
export type StoreOffer = z.infer<typeof StoreOffer>;

/**
 * Spec §20.4/§20.5. Remote-configurable, and expressed in turns rather than in
 * credits, because turns are the unit anybody actually reasons in.
 *
 * The default tier costs 60. A new account gets ten turns to find out whether
 * it likes this, and seven a day after that — enough for a scene, not enough to
 * finish a session on, which is the shape the daily grant is supposed to have.
 */
const DEFAULT_TURN_COST = 60;
export const GRANT_NEW_USER = 10 * DEFAULT_TURN_COST;
export const GRANT_DAILY = 7 * DEFAULT_TURN_COST;
export const FORK_COST_CREDITS = 120;
export const ANIMATION_COST_CREDITS = 600;

export const STORE_OFFERS: readonly z.infer<typeof StoreOffer>[] = [
  { productId: 'crd_2000', credits: 2000, bonusCredits: 0, referencePriceUsd: 2.99, badge: null, firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_10000', credits: 10000, bonusCredits: 300, referencePriceUsd: 14.99, badge: 'Popular', firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_20000', credits: 20000, bonusCredits: 1000, referencePriceUsd: 28.99, badge: null, firstPurchaseOnly: false, expiresAt: null },
  { productId: 'crd_50000', credits: 50000, bonusCredits: 3500, referencePriceUsd: 71.99, badge: 'Best value', firstPurchaseOnly: false, expiresAt: null },
];

export const FIRST_PURCHASE_OFFER: z.infer<typeof StoreOffer> = {
  productId: 'crd_first_21000',
  credits: 21000,
  bonusCredits: 0,
  referencePriceUsd: 19.99,
  badge: 'First purchase',
  firstPurchaseOnly: true,
  expiresAt: null,
};
