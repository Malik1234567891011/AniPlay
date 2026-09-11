import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { translatorFor, type Translator } from '@aniplay/i18n';
import { AuthError, SupabaseAuth, type AuthSession } from './supabase.js';

export { AuthError, SupabaseAuth };
export type { AuthSession };

/**
 * Who the player is, for the length of the app's life.
 *
 * Three things live here and nowhere else: where the refresh token is kept,
 * when the access token is renewed, and what happens when neither is available.
 *
 * The refresh token is a credential, so it goes in the keychain. The access
 * token is short-lived and re-derivable, so it stays in memory — a process that
 * is killed comes back by refreshing, not by reading a bearer token off disk.
 *
 * Spec §6.3 — a player browses and starts a run before signing in. That guest
 * is a real anonymous Supabase user, so signing in later upgrades the account
 * in place rather than merging two of them.
 */

const KEYS = {
  refreshToken: 'aniplay.refreshToken',
  /** Only for the offline development path below. */
  devToken: 'aniplay.token',
} as const;

/** Renew this far ahead of expiry, so a slow request never races the clock. */
const REFRESH_MARGIN_MS = 120_000;

export interface AuthIdentity {
  readonly userId: string;
  readonly email: string | null;
  readonly isGuest: boolean;
}

export type AuthListener = (identity: AuthIdentity | null) => void;

function readConfig(): { url: string; anonKey: string } | null {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
  return url && anonKey ? { url, anonKey } : null;
}

export class AuthStore {
  readonly #client: SupabaseAuth | null;
  readonly #listeners = new Set<AuthListener>();
  #session: AuthSession | null = null;
  /** The development identity when no Supabase project is configured. */
  #devToken: string | null = null;
  #inFlight: Promise<string | null> | null = null;
  /**
   * The interface translator. Not React, so no `useT()`; the store pushes the
   * player's language in at boot and again when they change it.
   */
  #t: Translator = translatorFor('en');

  constructor(client: SupabaseAuth | null = createClient()) {
    this.#client = client;
  }

  /**
   * One call reaches the Supabase client too, so the store has a single seam
   * for the whole auth stack rather than two that can drift apart.
   */
  setTranslator(t: Translator): void {
    this.#t = t;
    this.#client?.setTranslator(t);
  }

  get configured(): boolean {
    return this.#client !== null;
  }

  get identity(): AuthIdentity | null {
    if (this.#session) {
      return {
        userId: this.#session.userId,
        email: this.#session.email,
        isGuest: this.#session.isAnonymous,
      };
    }
    if (this.#devToken) {
      return { userId: this.#devToken, email: null, isGuest: this.#devToken.startsWith('guest_') };
    }
    return null;
  }

  subscribe(listener: AuthListener): () => void {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  #emit(): void {
    for (const listener of this.#listeners) listener(this.identity);
  }

  /**
   * Restores the identity at launch: refresh what is in the keychain, and if
   * there is nothing there, become a guest. Never leaves the player without one.
   */
  async restore(): Promise<AuthIdentity | null> {
    if (!this.#client) return this.#restoreDevIdentity();

    const refreshToken = await SecureStore.getItemAsync(KEYS.refreshToken).catch(() => null);
    if (refreshToken) {
      try {
        await this.#adopt(await this.#client.refresh(refreshToken));
        return this.identity;
      } catch (error) {
        // A refresh token can be revoked, rotated out, or simply too old. That
        // is a new guest, not an error the player should have to read.
        if (error instanceof AuthError && error.code === 'OFFLINE') return null;
        await SecureStore.deleteItemAsync(KEYS.refreshToken).catch(() => undefined);
      }
    }

    try {
      await this.#adopt(await this.#client.signInAnonymously());
    } catch {
      return null;
    }
    return this.identity;
  }

  /**
   * A valid access token, refreshed if it is about to expire.
   *
   * Concurrent callers share one refresh: a screen that fires three requests at
   * once should not spend three refresh tokens, and GoTrue rotates them.
   */
  async accessToken({ force = false } = {}): Promise<string | null> {
    if (!this.#client) return this.#devToken;
    const session = this.#session;
    // `force` is the server telling us this token is no good, which outranks
    // our own clock. Without it a rejected-but-unexpired token was handed back
    // unchanged to the 401 retry, so the retry re-sent exactly what had just
    // been refused and the player sat on "We could not confirm who you are"
    // for the life of the process, with no way out that did not involve
    // signing in — for a guest, who had never signed in to begin with.
    if (!force && session && session.expiresAt - Date.now() > REFRESH_MARGIN_MS) {
      return session.accessToken;
    }
    this.#inFlight ??= this.#renew().finally(() => {
      this.#inFlight = null;
    });
    return this.#inFlight;
  }

  /**
   * Refresh, or — failing that — become a guest.
   *
   * The second half matters more than the first. `restore()` runs once at
   * launch, and if its anonymous sign-in failed for any reason (a cold start
   * that beat the network, a DNS blip, a build whose config arrived late) the
   * app had no identity and no way to acquire one, because every later token
   * request bailed out on the missing refresh token. The player then hit a 401
   * on the first thing they tried and every thing after it, for the whole life
   * of the process, with the only fix being to kill the app.
   *
   * There is no state in which having no identity is correct: a guest is what
   * somebody with no account is, so if we do not have one, get one here.
   */
  async #renew(): Promise<string | null> {
    if (!this.#client) return null;

    const refreshToken =
      this.#session?.refreshToken ?? (await SecureStore.getItemAsync(KEYS.refreshToken).catch(() => null));

    if (refreshToken) {
      try {
        await this.#adopt(await this.#client.refresh(refreshToken));
        return this.#session?.accessToken ?? null;
      } catch (error) {
        // Offline: keep the token we have. It may still be inside its window,
        // and signing someone out because the network blinked is wrong.
        if (error instanceof AuthError && error.code === 'OFFLINE') {
          return this.#session?.accessToken ?? null;
        }
        await this.#clear();
      }
    }

    try {
      await this.#adopt(await this.#client.signInAnonymously());
      return this.#session?.accessToken ?? null;
    } catch {
      return null;
    }
  }

  async sendEmailCode(email: string): Promise<void> {
    if (!this.#client) throw new AuthError(this.#t('error.sign_in_not_configured'), 'NOT_CONFIGURED');
    await this.#client.sendEmailCode(email.trim());
  }

  async verifyEmailCode(email: string, code: string): Promise<AuthIdentity> {
    if (!this.#client) throw new AuthError(this.#t('error.sign_in_not_configured'), 'NOT_CONFIGURED');
    await this.#adopt(await this.#client.verifyEmailCode(email.trim(), code.trim()));
    return this.identity!;
  }

  async signInWithIdToken(provider: 'apple' | 'google', idToken: string, nonce?: string): Promise<AuthIdentity> {
    if (!this.#client) throw new AuthError(this.#t('error.sign_in_not_configured'), 'NOT_CONFIGURED');
    await this.#adopt(await this.#client.signInWithIdToken(provider, idToken, nonce));
    return this.identity!;
  }

  /**
   * Signs out and comes straight back as a guest.
   *
   * Leaving the app with no identity would strand it on a screen with nothing
   * to show; a signed-out player is a browsing player, which is exactly what a
   * guest is.
   */
  async signOut(): Promise<void> {
    const token = this.#session?.accessToken;
    await this.#clear();
    if (this.#client && token) await this.#client.signOut(token);
    if (this.#client) {
      try {
        await this.#adopt(await this.#client.signInAnonymously());
      } catch {
        this.#emit();
      }
    } else {
      await this.#restoreDevIdentity({ fresh: true });
    }
  }

  async #adopt(session: AuthSession): Promise<void> {
    this.#session = session;
    await SecureStore.setItemAsync(KEYS.refreshToken, session.refreshToken).catch(() => undefined);
    this.#emit();
  }

  async #clear(): Promise<void> {
    this.#session = null;
    await SecureStore.deleteItemAsync(KEYS.refreshToken).catch(() => undefined);
    this.#emit();
  }

  /**
   * With no Supabase project configured the app still has to run — that is what
   * `npm run api` plus Expo is, and the API's development verifier accepts it.
   * It is not a signed-in state and nothing here pretends otherwise.
   */
  async #restoreDevIdentity({ fresh = false } = {}): Promise<AuthIdentity | null> {
    let token = fresh ? null : await AsyncStorage.getItem(KEYS.devToken);
    if (!token) {
      token = `guest_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      await AsyncStorage.setItem(KEYS.devToken, token);
    }
    this.#devToken = token;
    this.#emit();
    return this.identity;
  }
}

function createClient(): SupabaseAuth | null {
  const config = readConfig();
  return config ? new SupabaseAuth(config) : null;
}

export const auth = new AuthStore();
