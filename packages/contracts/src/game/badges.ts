import { z } from 'zod';

/**
 * What the player gets for playing.
 *
 * Definitions live in code rather than in a table because they are content:
 * they ship with releases, they need types, and an unlock condition is a
 * predicate, not a row. The database holds only what is true of a *person* —
 * progress, unlocked, claimed.
 *
 * ## What these deliberately do not reward
 *
 * Nothing here pays for spending money, for buying credits, for following
 * anybody, or for publishing. Those are the achievements that turn a product
 * into a chore list, and two of them describe features we have not built. Every
 * badge below says the same thing in a different way: **play more, go further,
 * try something else**.
 *
 * ## Why the rewards are small
 *
 * A VIVID turn costs 60. The whole launch set pays 1,150 — about nineteen
 * turns, spread across behaviour that takes days to produce. It is enough to
 * feel like a gift and not enough to replace buying credits, which is the only
 * balance worth having: a reward large enough to substitute for the economy
 * stops being a reward and becomes the price.
 */
export const BadgeTier = z.enum(['BRONZE', 'SILVER', 'GOLD']);
export type BadgeTier = z.infer<typeof BadgeTier>;

export const Badge = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    /** One emoji. The UI draws it; there is no icon set to maintain. */
    icon: z.string(),
    tier: BadgeTier,
    /** How many of the thing. 1 for a badge that is simply done or not. */
    target: z.number().int().min(1),
    creditReward: z.number().int().min(0),
    /**
     * Hidden until earned.
     *
     * Only for badges whose text would spoil something — the rare ending is
     * the case. A locked list the player cannot work towards is a list of
     * things they are failing at, so almost nothing is hidden.
     */
    secret: z.boolean().default(false),
  })
  .strict();
export type Badge = z.infer<typeof Badge>;

/**
 * The launch set. Twelve, deliberately.
 *
 * Enough that there is always one in reach and few enough that the screen can
 * be read in one go. Ordered roughly by when a player will meet them.
 */
export const BADGES: readonly Badge[] = [
  {
    id: 'first_break',
    title: 'First Break',
    description: 'Start your first world.',
    icon: '🚪',
    tier: 'BRONZE',
    target: 1,
    creditReward: 50,
    secret: false,
  },
  {
    id: 'say_anything',
    title: 'Say Anything',
    description: 'Type something of your own instead of tapping a card.',
    icon: '✍️',
    tier: 'BRONZE',
    target: 1,
    creditReward: 50,
    secret: false,
  },
  {
    id: 'ten_turns',
    title: 'Ten Turns',
    description: 'Play ten turns, anywhere.',
    icon: '🔟',
    tier: 'BRONZE',
    target: 10,
    creditReward: 50,
    secret: false,
  },
  {
    id: 'back_for_more',
    title: 'Back For More',
    description: 'Return to a world you had left.',
    icon: '↩️',
    tier: 'BRONZE',
    target: 1,
    creditReward: 60,
    secret: false,
  },
  {
    id: 'ending_found',
    title: 'Ending Found',
    description: 'Reach an ending.',
    icon: '🎬',
    tier: 'SILVER',
    target: 1,
    creditReward: 100,
    secret: false,
  },
  {
    id: 'genre_hopper',
    title: 'Genre Hopper',
    description: 'Play worlds in three different genres.',
    icon: '🧭',
    tier: 'SILVER',
    target: 3,
    creditReward: 100,
    secret: false,
  },
  {
    id: 'three_day_run',
    title: 'Three Day Run',
    description: 'Play on three different days.',
    icon: '📅',
    tier: 'SILVER',
    target: 3,
    creditReward: 100,
    secret: false,
  },
  {
    id: 'world_hopper',
    title: 'World Hopper',
    description: 'Start five different worlds.',
    icon: '🗺️',
    tier: 'SILVER',
    target: 5,
    creditReward: 120,
    secret: false,
  },
  {
    id: 'deep_in',
    title: 'Deep In',
    description: 'Reach fifty turns in a single run.',
    icon: '🌊',
    tier: 'GOLD',
    target: 50,
    creditReward: 150,
    secret: false,
  },
  {
    id: 'ending_hunter',
    title: 'Ending Hunter',
    description: 'Reach five different endings.',
    icon: '🏆',
    tier: 'GOLD',
    target: 5,
    creditReward: 200,
    secret: false,
  },
  {
    id: 'long_night',
    title: 'Long Night',
    description: 'Play a hundred turns in one world.',
    icon: '🌙',
    tier: 'GOLD',
    target: 100,
    creditReward: 200,
    secret: false,
  },
  {
    id: 'rare_ending',
    title: 'Rare Ending',
    description: 'Find an ending almost nobody finds.',
    icon: '💎',
    tier: 'GOLD',
    target: 1,
    creditReward: 250,
    // The only hidden one: naming it would say there is something to look for
    // and roughly where.
    secret: true,
  },
];

export const BADGES_BY_ID: ReadonlyMap<string, Badge> = new Map(BADGES.map((b) => [b.id, b]));

/** What a player has done, in the units the badges count. */
export const BadgeProgress = z
  .object({
    badgeId: z.string(),
    progress: z.number().int().min(0),
    target: z.number().int().min(1),
    unlockedAt: z.string().nullable(),
    claimedAt: z.string().nullable(),
  })
  .strict();
export type BadgeProgress = z.infer<typeof BadgeProgress>;
