import { describe, expect, it } from 'vitest';
import { RATE_LIMITS, SlidingWindowRateLimiter, ruleFor } from './rate-limit.js';

describe('SlidingWindowRateLimiter', () => {
  it('allows up to the limit and then refuses', () => {
    let now = 0;
    const limiter = new SlidingWindowRateLimiter(() => now);
    for (let i = 0; i < 3; i += 1) {
      expect(limiter.check('k', 3, 1000).allowed, `call ${i}`).toBe(true);
    }
    const refused = limiter.check('k', 3, 1000);
    expect(refused.allowed).toBe(false);
    expect(refused.retryAfterSeconds).toBe(1);
  });

  it('slides, so the burst a fixed window allows is not available', () => {
    let now = 0;
    const limiter = new SlidingWindowRateLimiter(() => now);
    for (const at of [0, 400, 800]) {
      now = at;
      expect(limiter.check('k', 3, 1000).allowed).toBe(true);
    }

    // A fixed window would reset at 1000 and allow three more immediately.
    now = 999;
    expect(limiter.check('k', 3, 1000).allowed).toBe(false);

    // One slot comes back as the oldest call ages out, and only one.
    now = 1001;
    expect(limiter.check('k', 3, 1000).allowed).toBe(true);
    expect(limiter.check('k', 3, 1000).allowed).toBe(false);
  });

  it('keeps one caller out of another caller’s budget', () => {
    let now = 0;
    const limiter = new SlidingWindowRateLimiter(() => now);
    for (let i = 0; i < 3; i += 1) limiter.check('a', 3, 1000);
    expect(limiter.check('a', 3, 1000).allowed).toBe(false);
    expect(limiter.check('b', 3, 1000).allowed).toBe(true);
  });

  it('does not grow without bound', () => {
    let now = 0;
    const limiter = new SlidingWindowRateLimiter(() => now);
    for (let i = 0; i < 500; i += 1) limiter.check(`caller_${i}`, 5, 1000);
    now = 120_000;
    // The sweep runs on the next call and drops everything that has aged out.
    expect(limiter.check('caller_0', 5, 1000).allowed).toBe(true);
    expect(limiter.check('caller_0', 5, 1000).remaining).toBe(3);
  });
});

describe('which budget a request draws on', () => {
  it('separates the expensive calls from the cheap ones', () => {
    expect(ruleFor('POST', '/v1/sessions/sess_1/turns')).toBe('turn');
    expect(ruleFor('POST', '/v1/stories/story_1/sessions')).toBe('session');
    expect(ruleFor('POST', '/v1/sessions/sess_1/fork')).toBe('session');
    // A rephrase is a model call and is charged like a turn, so it shares the
    // turn budget rather than having a cheaper one of its own.
    expect(ruleFor('POST', '/v1/turns/turn_1/rephrase')).toBe('turn');
    expect(ruleFor('GET', '/v1/discover')).toBe('read');
    expect(ruleFor('POST', '/v1/reports')).toBe('write');
  });

  it('leaves room for a person and none for a loop', () => {
    // A turn takes seconds to compose and seconds to resolve.
    expect(RATE_LIMITS.turn.limit).toBeGreaterThan(10);
    expect(RATE_LIMITS.turn.limit).toBeLessThan(RATE_LIMITS.read.limit);
  });
});
