import { z } from 'zod';

/**
 * Spec §37 — the analytics contract.
 *
 * Event names and property shapes live here so a dashboard query cannot quietly
 * break when a screen is renamed, and so nobody invents a fifth spelling of
 * "turn completed". Emitting an event that is not in this file is a type error.
 *
 * Spec §30.2 — data minimisation. No event carries free-form player text, story
 * prose, or anything that would let an analytics vendor reconstruct a session.
 * Tags and ids only.
 */

export const EVENT_NAMES = [
  // §37.1 core funnel
  'app_opened',
  'age_gate_completed',
  'taste_calibration_completed',
  'discover_viewed',
  'story_card_viewed',
  'story_detail_viewed',
  'character_setup_started',
  'session_started',
  'first_turn_submitted',
  'turn_submitted',
  'turn_completed',
  'turn_failed',
  'turn_10_reached',
  // §6.5 identity
  'sign_in_started',
  'sign_in_completed',
  'guest_account_migrated',
  // §37.3 economy
  'wallet_opened',
  'insufficient_credits_shown',
  'purchase_started',
  'purchase_completed',
  'purchase_failed',
  'daily_grant_claimed',
  'quality_tier_changed',
  'timeline_forked',
  'portrait_generated',
  // §37.4 quality
  'consistency_violation',
  'turn_repaired',
  'canon_correction_submitted',
  'canon_correction_refused',
  'report_submitted',
  'story_hidden',
  // engagement
  'world_sheet_opened',
  'suggestion_tapped',
  'session_resumed',
  'session_abandoned',
  'story_saved',
  'share_created',
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

/** Properties every event carries, so any event can be sliced the same way. */
export const BaseProperties = z.object({
  /** Stable per-install, not per-person. Reset by a reinstall. */
  anonymousId: z.string(),
  userId: z.string().nullable(),
  isGuest: z.boolean(),
  sessionId: z.string().nullable(),
  platform: z.enum(['ios', 'android', 'web']),
  appVersion: z.string(),
  contractVersion: z.string(),
  environment: z.enum(['dev', 'staging', 'production']),
  occurredAt: z.string(),
});
export type BaseProperties = z.infer<typeof BaseProperties>;

/**
 * Per-event properties.
 *
 * Deliberately narrow. `storyId` and `tags` are enough to answer product
 * questions; the player's action text is not, and shipping it to a third party
 * would be a privacy problem for no analytical gain (§30.2).
 */
export const EventProperties = {
  app_opened: z.object({ coldStart: z.boolean(), bootMs: z.number().int() }),
  age_gate_completed: z.object({ ageBand: z.string() }),
  taste_calibration_completed: z.object({ genreCount: z.number().int(), skipped: z.boolean() }),

  discover_viewed: z.object({ railCount: z.number().int(), hasContinue: z.boolean() }),
  story_card_viewed: z.object({ storyId: z.string(), railId: z.string(), position: z.number().int() }),
  story_detail_viewed: z.object({ storyId: z.string(), official: z.boolean(), source: z.string() }),

  character_setup_started: z.object({ storyId: z.string() }),
  session_started: z.object({
    storyId: z.string(),
    storyVersionId: z.string(),
    archetypeId: z.string().nullable(),
    usedQuickSetup: z.boolean(),
    /** §9.1 — the 90-second target is only measurable if it is measured. */
    setupDurationMs: z.number().int(),
  }),

  first_turn_submitted: z.object({ storyId: z.string(), secondsSinceAppOpen: z.number().int() }),
  turn_submitted: z.object({
    storyId: z.string(),
    turnIndex: z.number().int(),
    qualityTier: z.string(),
    creditsReserved: z.number().int(),
    fromSuggestion: z.boolean(),
    actionLength: z.number().int(),
  }),
  turn_completed: z.object({
    storyId: z.string(),
    turnIndex: z.number().int(),
    qualityTier: z.string(),
    creditsCharged: z.number().int(),
    /** §17.8 — the latency SLOs are per-stage, so the timings are too. */
    parseMs: z.number().int(),
    engineMs: z.number().int(),
    directorMs: z.number().int(),
    writerMs: z.number().int(),
    totalMs: z.number().int(),
    checkCount: z.number().int(),
    mutationCount: z.number().int(),
    repaired: z.boolean(),
    /** §20.12 — variable cost per turn, against the tier's budget. */
    providerCostUsd: z.number(),
  }),
  turn_failed: z.object({
    storyId: z.string(),
    turnIndex: z.number().int(),
    code: z.string(),
    creditsReleased: z.number().int(),
    stage: z.enum(['PARSE', 'ENGINE', 'DIRECTOR', 'WRITER', 'VALIDATE', 'COMMIT', 'UNKNOWN']),
  }),
  turn_10_reached: z.object({ storyId: z.string(), minutesToReach: z.number().int() }),

  sign_in_started: z.object({ provider: z.string(), trigger: z.string() }),
  sign_in_completed: z.object({ provider: z.string() }),
  guest_account_migrated: z.object({ sessionsMoved: z.number().int() }),

  wallet_opened: z.object({ balance: z.number().int(), trigger: z.string() }),
  insufficient_credits_shown: z.object({
    required: z.number().int(),
    balance: z.number().int(),
    shortfall: z.number().int(),
    qualityTier: z.string(),
  }),
  purchase_started: z.object({ productId: z.string(), firstPurchase: z.boolean() }),
  purchase_completed: z.object({
    productId: z.string(),
    creditsGranted: z.number().int(),
    firstPurchase: z.boolean(),
    priceUsd: z.number(),
  }),
  purchase_failed: z.object({ productId: z.string(), code: z.string() }),
  daily_grant_claimed: z.object({ amount: z.number().int(), streakDays: z.number().int() }),
  quality_tier_changed: z.object({ from: z.string(), to: z.string() }),
  timeline_forked: z.object({ storyId: z.string(), atTurnIndex: z.number().int(), cost: z.number().int() }),
  portrait_generated: z.object({ storyId: z.string(), variant: z.number().int(), cost: z.number().int() }),

  consistency_violation: z.object({
    storyId: z.string(),
    code: z.string(),
    severity: z.string(),
    repaired: z.boolean(),
  }),
  turn_repaired: z.object({ storyId: z.string(), violationCount: z.number().int() }),
  canon_correction_submitted: z.object({ storyId: z.string() }),
  canon_correction_refused: z.object({ storyId: z.string(), reason: z.string() }),
  report_submitted: z.object({ targetType: z.string(), reason: z.string() }),
  story_hidden: z.object({ storyId: z.string(), tags: z.array(z.string()) }),

  world_sheet_opened: z.object({ tab: z.string(), turnIndex: z.number().int() }),
  suggestion_tapped: z.object({ intentHint: z.string(), risk: z.string(), position: z.number().int() }),
  session_resumed: z.object({ storyId: z.string(), hoursAway: z.number(), sawRecap: z.boolean() }),
  session_abandoned: z.object({ storyId: z.string(), turnCount: z.number().int() }),
  story_saved: z.object({ storyId: z.string(), saved: z.boolean() }),
  share_created: z.object({ kind: z.string(), storyId: z.string() }),
} as const satisfies Record<EventName, z.ZodType>;

export type EventPropertiesMap = {
  [K in EventName]: z.infer<(typeof EventProperties)[K]>;
};

export interface AnalyticsEvent<K extends EventName = EventName> {
  readonly name: K;
  readonly properties: EventPropertiesMap[K];
  readonly base: BaseProperties;
}

/**
 * Spec §37 — the sink. PostHog in production; the console in development, so a
 * developer can see the funnel they are about to ship without a vendor account.
 */
export interface AnalyticsSink {
  capture<K extends EventName>(event: AnalyticsEvent<K>): void;
  flush(): Promise<void>;
}

export class NoopSink implements AnalyticsSink {
  capture(): void {}
  async flush(): Promise<void> {}
}

export class ConsoleSink implements AnalyticsSink {
  capture<K extends EventName>(event: AnalyticsEvent<K>): void {
    // eslint-disable-next-line no-console
    console.log(`[analytics] ${event.name}`, event.properties);
  }
  async flush(): Promise<void> {}
}

/**
 * Buffers events and flushes in batches.
 *
 * Analytics must never be able to slow down or fail a turn, so `capture` is
 * synchronous and non-throwing, and a full buffer drops the oldest events
 * rather than growing without bound.
 */
export class BufferedSink implements AnalyticsSink {
  readonly #buffer: AnalyticsEvent[] = [];
  readonly #max: number;
  readonly #send: (events: readonly AnalyticsEvent[]) => Promise<void>;

  constructor(send: (events: readonly AnalyticsEvent[]) => Promise<void>, max = 200) {
    this.#send = send;
    this.#max = max;
  }

  capture<K extends EventName>(event: AnalyticsEvent<K>): void {
    if (this.#buffer.length >= this.#max) this.#buffer.shift();
    this.#buffer.push(event as AnalyticsEvent);
  }

  async flush(): Promise<void> {
    if (this.#buffer.length === 0) return;
    const batch = this.#buffer.splice(0, this.#buffer.length);
    try {
      await this.#send(batch);
    } catch {
      // A failed flush is not worth failing a request over, and re-queueing a
      // batch that already failed usually just fails again.
    }
  }
}

/** Type-safe emitter. An event not in `EventProperties` will not compile. */
export class Analytics {
  readonly #sink: AnalyticsSink;
  readonly #base: () => BaseProperties;

  constructor(sink: AnalyticsSink, base: () => BaseProperties) {
    this.#sink = sink;
    this.#base = base;
  }

  track<K extends EventName>(name: K, properties: EventPropertiesMap[K]): void {
    try {
      const parsed = EventProperties[name].parse(properties) as EventPropertiesMap[K];
      this.#sink.capture({ name, properties: parsed, base: this.#base() });
    } catch {
      // A malformed event is dropped rather than thrown: telemetry must never
      // be able to break the path it is measuring.
    }
  }

  flush(): Promise<void> {
    return this.#sink.flush();
  }
}

/**
 * Spec §37.5 — the launch hypotheses, written down so they can be falsified.
 * These are targets to measure against, not claims about how the product works.
 */
export const SUCCESS_TARGETS = {
  /** §6.1 — first meaningful choice inside 60 seconds. */
  medianSecondsToFirstTurn: 60,
  /** §37.1 — share of started sessions that reach turn 10. */
  turn10Rate: 0.35,
  d1Retention: 0.28,
  d7Retention: 0.12,
  /** §17.8 — core turn failure under 1%. */
  maxTurnFailureRate: 0.01,
  /** §20.12 — blended gross margin before store fees. */
  targetGrossMargin: 0.65,
  /** §17.8 p95 latency budgets, milliseconds. */
  p95FirstTokenQuickMs: 2500,
  p95FirstTokenApexMs: 4000,
  p95CompleteQuickMs: 7000,
  p95CompleteApexMs: 12_000,
} as const;

/** §20.12 — per-tier variable cost ceilings. Exceeding one is a cost incident. */
export const COST_CEILINGS_USD = {
  QUICK: 0.01,
  VIVID: 0.018,
  CINEMATIC: 0.03,
  APEX: 0.065,
} as const;

export function isTurnOverBudget(qualityTier: keyof typeof COST_CEILINGS_USD, costUsd: number): boolean {
  return costUsd > COST_CEILINGS_USD[qualityTier];
}
