/**
 * Spec §31.7 — rate limits by user, device and IP.
 *
 * The turn endpoint spends money on every call. Without a limit, one client
 * with a loop can drain the model budget faster than any dashboard will notice,
 * and a signed-out caller can do it without an account at all.
 *
 * A sliding window rather than a fixed one: a fixed window lets a caller send
 * the whole allowance at 59 seconds and the whole allowance again at 61, which
 * is exactly the burst the limit exists to stop.
 *
 * In-process, because the product launches as one API instance and a limiter
 * that pretends to be distributed while being per-instance is worse than one
 * that is honest about it. `RateLimiter` is an interface so a Redis or Postgres
 * implementation can replace it without touching a route.
 */

export interface RateLimitVerdict {
  readonly allowed: boolean;
  /** Seconds until the caller could retry. Sent as Retry-After. */
  readonly retryAfterSeconds: number;
  readonly limit: number;
  readonly remaining: number;
}

export interface RateLimiter {
  check(key: string, limit: number, windowMs: number): RateLimitVerdict;
}

export class SlidingWindowRateLimiter implements RateLimiter {
  readonly #hits = new Map<string, number[]>();
  readonly #now: () => number;
  #lastSweep = 0;

  constructor(now: () => number = Date.now) {
    this.#now = now;
  }

  check(key: string, limit: number, windowMs: number): RateLimitVerdict {
    const now = this.#now();
    this.#sweep(now, windowMs);

    const window = (this.#hits.get(key) ?? []).filter((at) => at > now - windowMs);

    if (window.length >= limit) {
      const oldest = window[0]!;
      this.#hits.set(key, window);
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
        limit,
        remaining: 0,
      };
    }

    window.push(now);
    this.#hits.set(key, window);
    return { allowed: true, retryAfterSeconds: 0, limit, remaining: limit - window.length };
  }

  /** Keeps the map from growing without bound on a long-lived process. */
  #sweep(now: number, windowMs: number): void {
    if (now - this.#lastSweep < 60_000) return;
    this.#lastSweep = now;
    for (const [key, hits] of this.#hits) {
      const live = hits.filter((at) => at > now - windowMs);
      if (live.length === 0) this.#hits.delete(key);
      else this.#hits.set(key, live);
    }
  }
}

/**
 * What each kind of request costs us, roughly.
 *
 * A turn is a model call and a wallet write; a session start is a model call;
 * reading a timeline is a database query. They should not share a budget.
 */
export interface RateLimitRule {
  readonly limit: number;
  readonly windowMs: number;
}

export const RATE_LIMITS: Record<'turn' | 'session' | 'media' | 'write' | 'read', RateLimitRule> = {
  // Well above any human. A player thinking about a sentence takes seconds;
  // this only catches a loop.
  turn: { limit: 30, windowMs: 60_000 },
  session: { limit: 12, windowMs: 60_000 },
  // Image generation is the most expensive thing a client can ask for.
  media: { limit: 10, windowMs: 60_000 },
  write: { limit: 120, windowMs: 60_000 },
  read: { limit: 300, windowMs: 60_000 },
};

/** Which budget a path draws on. Ordered: the first match wins. */
export function ruleFor(method: string, path: string): keyof typeof RATE_LIMITS {
  // A rephrase is a model call charged like a turn, so it shares that budget.
  if (/\/turns\b/.test(path) && method === 'POST') return 'turn';
  if (/\/sessions$/.test(path) && method === 'POST') return 'session';
  if (/\/fork$/.test(path) && method === 'POST') return 'session';
  if (/\/(portrait|images|media)\b/.test(path) && method === 'POST') return 'media';
  return method === 'GET' ? 'read' : 'write';
}
