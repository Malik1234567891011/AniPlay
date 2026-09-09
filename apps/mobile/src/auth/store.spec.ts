import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { AuthSession, SupabaseAuth } from './supabase.js';
import { AuthError } from './supabase.js';

/**
 * The identity the app is holding, over the life of a process.
 *
 * The bug this file exists for: `restore()` runs once at launch, and when its
 * anonymous sign-in failed — a cold start that beat the network, a config that
 * arrived late — the app had no identity and no path to one, because every
 * later token request bailed out on the missing refresh token. The player got
 * a 401 on the first thing they pressed and on everything after it, for as long
 * as the app stayed open.
 */

const keychain = new Map<string, string>();

vi.mock('expo-secure-store', () => ({
  getItemAsync: async (key: string): Promise<string | null> => keychain.get(key) ?? null,
  setItemAsync: async (key: string, value: string): Promise<void> => void keychain.set(key, value),
  deleteItemAsync: async (key: string): Promise<void> => void keychain.delete(key),
}));

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: async (): Promise<string | null> => null,
    setItem: async (): Promise<void> => undefined,
    removeItem: async (): Promise<void> => undefined,
  },
}));

const { AuthStore } = await import('./index.js');

const session = (overrides: Partial<AuthSession> = {}): AuthSession => ({
  accessToken: 'access',
  refreshToken: 'refresh',
  expiresAt: Date.now() + 3_600_000,
  userId: 'user-1',
  email: null,
  isAnonymous: true,
  ...overrides,
});

interface Fake {
  client: SupabaseAuth;
  anonCalls: number;
  refreshCalls: number;
}

function fakeClient(options: {
  anonymous?: () => Promise<AuthSession>;
  refresh?: () => Promise<AuthSession>;
}): Fake {
  const fake: Fake = {
    anonCalls: 0,
    refreshCalls: 0,
    client: {} as SupabaseAuth,
  };
  fake.client = {
    signInAnonymously: async (): Promise<AuthSession> => {
      fake.anonCalls += 1;
      return (options.anonymous ?? (async (): Promise<AuthSession> => session()))();
    },
    refresh: async (): Promise<AuthSession> => {
      fake.refreshCalls += 1;
      if (!options.refresh) throw new AuthError('nope', 'INVALID');
      return options.refresh();
    },
  } as unknown as SupabaseAuth;
  return fake;
}

beforeEach(() => keychain.clear());

describe('an app that failed to sign in at launch can still recover', () => {
  it('has no identity when the launch sign-in fails', async () => {
    let failing = true;
    const fake = fakeClient({
      anonymous: async () => {
        if (failing) throw new AuthError('offline', 'OFFLINE');
        return session();
      },
    });
    const store = new AuthStore(fake.client);

    expect(await store.restore()).toBeNull();
    expect(store.identity).toBeNull();

    // The network comes back. Asking for a token is enough — nothing has to
    // relaunch the app, and the player never sees a sign-in wall.
    failing = false;
    expect(await store.accessToken()).toBe('access');
    expect(store.identity).toEqual({ userId: 'user-1', email: null, isGuest: true });
  });

  it('becomes a guest on demand when there was never a refresh token', async () => {
    const fake = fakeClient({});
    const store = new AuthStore(fake.client);
    expect(await store.accessToken()).toBe('access');
    expect(fake.anonCalls).toBe(1);
  });

  it('spends one sign-in for concurrent callers, not three', async () => {
    const fake = fakeClient({});
    const store = new AuthStore(fake.client);
    const tokens = await Promise.all([store.accessToken(), store.accessToken(), store.accessToken()]);
    expect(tokens).toEqual(['access', 'access', 'access']);
    expect(fake.anonCalls).toBe(1);
  });

  it('prefers refreshing the token it has over minting a new guest', async () => {
    keychain.set('aniplay.refreshToken', 'stored-refresh');
    const fake = fakeClient({
      refresh: async () => session({ accessToken: 'refreshed', userId: 'user-9', isAnonymous: false }),
    });
    const store = new AuthStore(fake.client);

    expect(await store.accessToken()).toBe('refreshed');
    expect(fake.refreshCalls).toBe(1);
    expect(fake.anonCalls).toBe(0);
    expect(store.identity?.isGuest).toBe(false);
  });

  it('falls back to a guest when the stored refresh token has been revoked', async () => {
    keychain.set('aniplay.refreshToken', 'revoked');
    const fake = fakeClient({});
    const store = new AuthStore(fake.client);

    expect(await store.accessToken()).toBe('access');
    expect(fake.refreshCalls).toBe(1);
    expect(fake.anonCalls).toBe(1);
  });

  it('keeps the token it has when the network blinks, rather than signing anyone out', async () => {
    // Signed in, and the access token is inside the two-minute renew margin,
    // so the next request triggers a refresh — which then goes offline.
    const fake = fakeClient({
      anonymous: async () => session({ expiresAt: Date.now() + 30_000 }),
      refresh: async () => {
        throw new AuthError('offline', 'OFFLINE');
      },
    });
    const store = new AuthStore(fake.client);
    await store.restore();
    expect(store.identity).not.toBeNull();

    // The stale-but-possibly-still-valid token is the right answer. Signing
    // somebody out because the network blinked is not.
    expect(await store.accessToken()).toBe('access');
    expect(store.identity).not.toBeNull();
  });

  it('returns null rather than throwing when there is genuinely no way through', async () => {
    const fake = fakeClient({
      anonymous: async () => {
        throw new AuthError('offline', 'OFFLINE');
      },
    });
    const store = new AuthStore(fake.client);
    expect(await store.accessToken()).toBeNull();
  });
});
