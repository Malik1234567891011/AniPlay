import { z } from 'zod';

/**
 * Spec §31.3 — feature flags and environment-safe public config.
 *
 * Everything in this package is safe to ship to a client. No provider keys, no
 * service-role secrets, no model names. If a value would be embarrassing or
 * dangerous inside an app bundle, it does not belong here (§31.7).
 */

export const Environment = z.enum(['dev', 'staging', 'production']);
export type Environment = z.infer<typeof Environment>;

/**
 * Spec §2.2 / §38.6 — flags exist so incomplete work can ship dark and so an
 * incident can turn a subsystem off without a release.
 */
export const FeatureFlagSchema = z.object({
  /** §28 — invite-only two-player co-op. Post-launch (§44 phase 5). */
  coopBeta: z.boolean(),
  /** §20.11 — premium 5-second animation. Beta. */
  animationBeta: z.boolean(),
  /** §19.7 — character voice playback. */
  voicePlayback: z.boolean(),
  /** §19.1 tier 2 — generated hero frames on eligible beats. */
  heroImages: z.boolean(),
  /** §9.3 — player portrait generation. */
  playerPortraits: z.boolean(),
  /** §14.7 — bounded off-screen world events between sessions. */
  offScreenEvents: z.boolean(),
  /** §21 — creator publishing. */
  creatorPublishing: z.boolean(),
  /** §24 — diegetic push notifications. */
  pushNotifications: z.boolean(),
  /** §11.7 — paid timeline forking. */
  timelineForks: z.boolean(),
  /** §39.2 — kill switch: forces the rule-based pipeline regardless of keys. */
  forceRuleBasedPipeline: z.boolean(),
});
export type FeatureFlags = z.infer<typeof FeatureFlagSchema>;

/**
 * Launch defaults. Spec §2.1 is the launch scope; §2.2 is flagged off until the
 * §44 phase-5 gate is met.
 */
export const LAUNCH_FLAGS: FeatureFlags = {
  coopBeta: false,
  animationBeta: false,
  voicePlayback: true,
  heroImages: true,
  playerPortraits: true,
  offScreenEvents: false,
  creatorPublishing: true,
  pushNotifications: false,
  timelineForks: true,
  forceRuleBasedPipeline: false,
};

/** Dev turns everything on so incomplete surfaces are exercised, not hidden. */
export const DEV_FLAGS: FeatureFlags = {
  ...LAUNCH_FLAGS,
  coopBeta: true,
  animationBeta: true,
  offScreenEvents: true,
  pushNotifications: true,
};

export function flagsForEnvironment(environment: Environment): FeatureFlags {
  return environment === 'dev' ? { ...DEV_FLAGS } : { ...LAUNCH_FLAGS };
}

/**
 * Applies remote overrides on top of the environment baseline.
 *
 * Unknown keys are ignored rather than merged: a typo in a remote config should
 * not silently introduce a flag nothing reads, and a renamed flag should not
 * resurrect the old name.
 */
export function applyFlagOverrides(
  base: FeatureFlags,
  overrides: Record<string, unknown>,
): { flags: FeatureFlags; ignored: string[] } {
  const flags = { ...base };
  const ignored: string[] = [];

  for (const [key, value] of Object.entries(overrides)) {
    if (!(key in flags)) {
      ignored.push(key);
      continue;
    }
    if (typeof value !== 'boolean') {
      ignored.push(key);
      continue;
    }
    flags[key as keyof FeatureFlags] = value;
  }

  return { flags, ignored };
}

/**
 * Spec §39.3 — maintenance and incident state, surfaced through bootstrap so
 * the client can explain an outage rather than failing opaquely.
 */
export const MaintenanceState = z.object({
  active: z.boolean(),
  message: z.string().nullable(),
  /** Set when only some subsystems are degraded. */
  degraded: z.array(z.enum(['TURNS', 'IMAGES', 'VOICE', 'PURCHASES', 'CREATOR'])).default([]),
});
export type MaintenanceState = z.infer<typeof MaintenanceState>;

export const NO_MAINTENANCE: MaintenanceState = { active: false, message: null, degraded: [] };

/**
 * Spec §31.5 — the client sends its app and contract version; the server decides
 * whether that build is still supported.
 */
export const VERSION_POLICY = {
  minSupportedAppVersion: '1.0.0',
  currentContractVersion: '1.0.0',
} as const;

export function isAppVersionSupported(appVersion: string, minimum = VERSION_POLICY.minSupportedAppVersion): boolean {
  const parse = (value: string): number[] =>
    value.split('.').map((part) => Number.parseInt(part, 10) || 0);

  const app = parse(appVersion);
  const min = parse(minimum);
  for (let i = 0; i < Math.max(app.length, min.length); i++) {
    const a = app[i] ?? 0;
    const m = min[i] ?? 0;
    if (a > m) return true;
    if (a < m) return false;
  }
  return true;
}

/**
 * Spec §39.2 — circuit breakers. A subsystem that keeps failing is taken out of
 * the path rather than retried into the ground, and the product degrades to
 * something still playable.
 */
export const CIRCUIT_BREAKERS = {
  /** Consecutive failures before a provider is considered down. */
  failureThreshold: 5,
  /** How long a tripped breaker stays open before a probe is allowed. */
  cooldownMs: 30_000,
  /** §17.8 — beyond this a turn is failed and the reserve released. */
  turnTimeoutMs: 25_000,
  /** Images never block a turn (§17.8), so their budget is separate and longer. */
  imageTimeoutMs: 180_000,
  /** §17.1 step 11 — one repair pass, never a loop. */
  maxRepairPasses: 1,
  /** §20.12 — cap retries so a bad turn cannot cost more than it earns. */
  maxProviderRetries: 2,
} as const;

/** Spec §31.7 — rate limits by user, device, and IP risk. */
export const RATE_LIMITS = {
  turnsPerMinute: 20,
  turnsPerHour: 300,
  sessionsPerHour: 20,
  reportsPerHour: 30,
  portraitsPerHour: 12,
  searchesPerMinute: 60,
} as const;

/**
 * Spec §36.1 — client cache policy. Catalog data is cheap to refetch and stale
 * data is worse than a spinner; session state is authoritative and never cached
 * past a turn boundary.
 */
export const CACHE_POLICY = {
  discoverStaleMs: 5 * 60_000,
  storyDetailStaleMs: 10 * 60_000,
  /** Never cached: the server is authoritative for session state (§0 rule 3). */
  sessionStaleMs: 0,
  walletStaleMs: 0,
  mediaImmutable: true,
} as const;
