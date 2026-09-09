import { describe, expect, it, vi } from 'vitest';
import { AuthError, SupabaseAuth } from './supabase.js';

/**
 * The sign-in client, without a device.
 *
 * `supabase.ts` deliberately touches nothing but `fetch`, so the request shapes
 * and the error copy can be pinned here rather than discovered in TestFlight.
 */

const NOW = Date.UTC(2026, 2, 3, 10, 0, 0);

function client(handler: (url: string, init: RequestInit) => Response): {
  auth: SupabaseAuth;
  calls: Array<{ url: string; body: unknown; headers: Record<string, string> }>;
} {
  const calls: Array<{ url: string; body: unknown; headers: Record<string, string> }> = [];
  const auth = new SupabaseAuth({
    url: 'https://project.supabase.co/',
    anonKey: 'anon-key',
    now: () => NOW,
    fetchImpl: (async (url: string, init: RequestInit) => {
      calls.push({
        url,
        body: init.body ? JSON.parse(String(init.body)) : null,
        headers: init.headers as Record<string, string>,
      });
      return handler(url, init);
    }) as unknown as typeof fetch,
  });
  return { auth, calls };
}

const session = (overrides: Record<string, unknown> = {}): Response =>
  new Response(
    JSON.stringify({
      access_token: 'access',
      refresh_token: 'refresh',
      expires_in: 3600,
      user: { id: 'user-1', email: 'p@example.com', is_anonymous: false },
      ...overrides,
    }),
    { headers: { 'content-type': 'application/json' } },
  );

describe('SupabaseAuth', () => {
  it('signs in anonymously and reports the session as a guest', async () => {
    const { auth, calls } = client(() =>
      session({ user: { id: 'anon-1', email: null, is_anonymous: true } }),
    );
    const result = await auth.signInAnonymously();
    expect(calls[0]!.url).toBe('https://project.supabase.co/auth/v1/signup');
    expect(calls[0]!.headers.apikey).toBe('anon-key');
    expect(result).toEqual({
      accessToken: 'access',
      refreshToken: 'refresh',
      expiresAt: NOW + 3_600_000,
      userId: 'anon-1',
      email: null,
      isAnonymous: true,
    });
  });

  it('asks for an emailed code rather than creating a password', async () => {
    const { auth, calls } = client(() => new Response('{}', { headers: { 'content-type': 'application/json' } }));
    await auth.sendEmailCode('  Player@Example.com  ');
    expect(calls[0]!.url).toContain('/auth/v1/otp');
    expect(calls[0]!.body).toEqual({ email: 'Player@Example.com', create_user: true });
  });

  it('exchanges a code for a session', async () => {
    const { auth, calls } = client(() => session());
    const result = await auth.verifyEmailCode('p@example.com', ' 123456 ');
    expect(calls[0]!.body).toEqual({ type: 'email', email: 'p@example.com', token: '123456' });
    expect(result.userId).toBe('user-1');
    expect(result.isAnonymous).toBe(false);
  });

  it('passes Apple’s identity token and nonce through', async () => {
    const { auth, calls } = client(() => session());
    await auth.signInWithIdToken('apple', 'id-token', 'nonce-1');
    expect(calls[0]!.url).toContain('grant_type=id_token');
    expect(calls[0]!.body).toEqual({ provider: 'apple', id_token: 'id-token', nonce: 'nonce-1' });
  });

  it('turns provider error codes into copy a player can act on', async () => {
    const { auth } = client(
      () =>
        new Response(JSON.stringify({ error_code: 'otp_expired', msg: 'Token has expired' }), {
          status: 403,
          headers: { 'content-type': 'application/json' },
        }),
    );
    await expect(auth.verifyEmailCode('p@example.com', '000000')).rejects.toMatchObject({
      code: 'otp_expired',
      message: 'That code has expired. Ask for a new one.',
    });
  });

  it('reports a network failure as offline rather than as a rejection', async () => {
    const auth = new SupabaseAuth({
      url: 'https://project.supabase.co',
      anonKey: 'anon-key',
      fetchImpl: (() => Promise.reject(new Error('network down'))) as unknown as typeof fetch,
    });
    await expect(auth.signInAnonymously()).rejects.toBeInstanceOf(AuthError);
    await expect(auth.signInAnonymously()).rejects.toMatchObject({ code: 'OFFLINE' });
  });

  it('refuses a response that is missing half a session', async () => {
    const { auth } = client(() => session({ refresh_token: undefined }));
    await expect(auth.signInAnonymously()).rejects.toMatchObject({ code: 'MALFORMED_SESSION' });
  });

  it('signs out without letting a provider failure strand the player', async () => {
    const { auth } = client(() => new Response('nope', { status: 500 }));
    await expect(auth.signOut('access')).resolves.toBeUndefined();
  });

  it('refreshes with the stored refresh token', async () => {
    const { auth, calls } = client(() => session({ access_token: 'access-2', refresh_token: 'refresh-2' }));
    const result = await auth.refresh('refresh-1');
    expect(calls[0]!.url).toContain('grant_type=refresh_token');
    expect(calls[0]!.body).toEqual({ refresh_token: 'refresh-1' });
    expect(result.accessToken).toBe('access-2');
  });
});
