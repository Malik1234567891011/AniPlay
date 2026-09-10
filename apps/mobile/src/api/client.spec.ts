import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiClient, ApiError } from './client.js';

/**
 * The retry rule around 401, which is the difference between a player pressing
 * Enter on their character and a red line telling them to start a guest session.
 *
 * Two 401s mean different things and the client has to treat them the same way:
 * TOKEN_EXPIRED is a token that aged out, UNAUTHENTICATED is no token at all.
 * Both are now recoverable, because the auth store will sign in as a guest on
 * demand — so both are worth exactly one silent retry, and no more.
 */

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

interface Call {
  readonly authorization: string | undefined;
}

function serve(responses: Array<{ status: number; body: unknown }>): Call[] {
  const calls: Call[] = [];
  let index = 0;
  globalThis.fetch = (async (_url: string, init: RequestInit) => {
    const headers = (init.headers ?? {}) as Record<string, string>;
    calls.push({ authorization: headers.authorization });
    const next = responses[Math.min(index++, responses.length - 1)]!;
    return new Response(JSON.stringify(next.body), {
      status: next.status,
      headers: { 'content-type': 'application/json' },
    });
  }) as unknown as typeof fetch;
  return calls;
}

const client = (): ApiClient => new ApiClient('https://api.test');

describe('a 401 the client can fix, it fixes', () => {
  it('signs in and retries when it had no token at all', async () => {
    const calls = serve([
      { status: 401, body: { code: 'UNAUTHENTICATED', message: 'We could not confirm who you are.' } },
      { status: 200, body: { sessionId: 'sess_1' } },
    ]);

    const api = client();
    let token: string | null = null;
    api.setTokenProvider(async () => token);

    // The provider has nothing on the first attempt and a guest token on the
    // second, which is exactly what the auth store does now.
    const provider = vi.fn(async () => {
      const value = token;
      token = 'guest-token';
      return value;
    });
    api.setTokenProvider(provider);

    await expect(api.createSession('story_blackwake', { identity: {} } as never)).resolves.toEqual({
      sessionId: 'sess_1',
    });
    expect(calls).toHaveLength(2);
    expect(calls[0]!.authorization).toBeUndefined();
    expect(calls[1]!.authorization).toBe('Bearer guest-token');
  });

  it('retries an expired token the same way', async () => {
    const calls = serve([
      { status: 401, body: { code: 'TOKEN_EXPIRED', message: 'Your session expired.' } },
      { status: 200, body: { sessionId: 'sess_2' } },
    ]);
    const api = client();
    let issued = 0;
    api.setTokenProvider(async () => `token-${++issued}`);

    await expect(api.createSession('story_blackwake', { identity: {} } as never)).resolves.toEqual({
      sessionId: 'sess_2',
    });
    expect(calls.map((c) => c.authorization)).toEqual(['Bearer token-1', 'Bearer token-2']);
  });

  it('retries exactly once, then reports it', async () => {
    const calls = serve([{ status: 401, body: { code: 'UNAUTHENTICATED', message: 'No.' } }]);
    const api = client();
    api.setTokenProvider(async () => 'token');

    await expect(api.createSession('story_blackwake', { identity: {} } as never)).rejects.toBeInstanceOf(
      ApiError,
    );
    expect(calls).toHaveLength(2);
  });

  it('does not retry a 401 it cannot do anything about', async () => {
    const calls = serve([{ status: 401, body: { code: 'ACCOUNT_DISABLED', message: 'No.' } }]);
    const api = client();
    api.setTokenProvider(async () => 'token');

    await expect(api.createSession('story_blackwake', { identity: {} } as never)).rejects.toMatchObject({
      code: 'ACCOUNT_DISABLED',
    });
    expect(calls).toHaveLength(1);
  });

  it('leaves other failures alone', async () => {
    const calls = serve([{ status: 402, body: { code: 'INSUFFICIENT_CREDITS', message: 'Out of credits.' } }]);
    const api = client();
    api.setTokenProvider(async () => 'token');

    await expect(api.createSession('story_blackwake', { identity: {} } as never)).rejects.toMatchObject({
      status: 402,
      code: 'INSUFFICIENT_CREDITS',
    });
    expect(calls).toHaveLength(1);
  });
});

describe('a 401 the client cannot fix, it explains', () => {
  it('names the configuration when a dev build meets a server with real auth', async () => {
    // Expo inlines EXPO_PUBLIC_* at bundle time. A dev server started before
    // the .env existed produces exactly this: no Supabase config in the build,
    // a `guest_…` token, and a server that has never heard of it.
    serve([{ status: 401, body: { code: 'UNAUTHENTICATED', message: 'Sign in to continue.' } }]);
    const api = client();
    api.setTokenProvider(async () => 'guest_2f1c9b');

    await expect(api.createSession('story_blackwake', { identity: {} } as never)).rejects.toMatchObject({
      code: 'AUTH_NOT_CONFIGURED',
    });
  });

  it('leaves a real token’s 401 to say what the server said', async () => {
    serve([
      { status: 401, body: { code: 'UNAUTHENTICATED', message: 'Sign in to continue.' } },
      { status: 401, body: { code: 'UNAUTHENTICATED', message: 'Sign in to continue.' } },
    ]);
    const api = client();
    api.setTokenProvider(async () => 'eyJhbGciOiJFUzI1NiJ9.real');

    await expect(api.createSession('story_blackwake', { identity: {} } as never)).rejects.toMatchObject({
      code: 'UNAUTHENTICATED',
    });
  });
});

/**
 * The 401 that could not be recovered from.
 *
 * A guest's token was rejected by the server while the auth store's own clock
 * still considered it valid. The retry cleared the client's cached copy and
 * asked the provider again — which returned the same token, because nothing had
 * told it the server disagreed. Every request for the rest of the process
 * failed the same way, and the only offered fix was to sign in: to a player who
 * was a guest and had never signed in at all.
 *
 * Malik, on the simulator: "weve been playing the entire time not signed in why
 * tf do i gotta do it now j make it work".
 */
describe('a token the server has refused', () => {
  it('asks the provider for a genuinely new one, not its cached answer', async () => {
    const asked: Array<{ force?: boolean } | undefined> = [];
    let issued = 0;
    const api = client();
    api.setTokenProvider(async (options) => {
      asked.push(options);
      // A provider that only trusts its own clock: same token unless forced.
      return options?.force ? `fresh-${++issued}` : 'stale';
    });

    const seen: string[] = [];
    globalThis.fetch = (async (_url: string, init: { headers: Record<string, string> }) => {
      seen.push(init.headers.authorization ?? '');
      const bad = init.headers.authorization === 'Bearer stale';
      return {
        ok: !bad,
        status: bad ? 401 : 200,
        text: async () => (bad ? JSON.stringify({ code: 'UNAUTHENTICATED' }) : JSON.stringify({ sessions: [] })),
      };
    }) as never;

    await expect(api.wallet()).resolves.toEqual({ sessions: [] });
    expect(seen).toEqual(['Bearer stale', 'Bearer fresh-1']);
    expect(asked.at(-1)).toEqual({ force: true });
  });
});
