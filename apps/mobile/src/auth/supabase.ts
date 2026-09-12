/**
 * A small client for Supabase Auth (GoTrue).
 *
 * Spec §6.4 — Sign in with Apple, Google, or an emailed code, and no password
 * creation where it is not necessary. Supabase issues the tokens; the API
 * verifies them (`services/api/src/auth.ts`) and never trusts a claim it has
 * not checked a signature for.
 *
 * Written against the REST endpoints rather than `@supabase/supabase-js`
 * because that pulls a websocket client, a storage client and a URL polyfill
 * into a bundle that needs none of them. What we use is six requests.
 */
import { translatorFor, type Translator } from '@plotbreak/i18n';

export interface AuthSession {
  readonly accessToken: string;
  readonly refreshToken: string;
  /** Epoch millis. The store refreshes before this, never after. */
  readonly expiresAt: number;
  readonly userId: string;
  readonly email: string | null;
  /** An anonymous Supabase user — a guest who has not signed in yet (§6.3). */
  readonly isAnonymous: boolean;
}

export class AuthError extends Error {
  constructor(
    override readonly message: string,
    readonly code: string,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

interface GoTrueSession {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  user?: { id?: string; email?: string | null; is_anonymous?: boolean };
}

export interface SupabaseAuthConfig {
  readonly url: string;
  readonly anonKey: string;
  readonly fetchImpl?: typeof fetch;
  readonly now?: () => number;
}

export class SupabaseAuth {
  readonly #config: SupabaseAuthConfig;
  readonly #fetch: typeof fetch;
  readonly #now: () => number;
  /**
   * The interface translator. Not React, so no `useT()`, and deliberately not
   * an ambient language either: the store pushes the player's one in, and
   * `AuthStore.setTranslator` is what does it (`auth/index.ts`).
   */
  #t: Translator = translatorFor('en');

  constructor(config: SupabaseAuthConfig) {
    this.#config = config;
    this.#fetch = config.fetchImpl ?? fetch;
    this.#now = config.now ?? Date.now;
  }

  setTranslator(t: Translator): void {
    this.#t = t;
  }

  async #post<T>(path: string, body: unknown, accessToken?: string): Promise<T> {
    let response: Response;
    try {
      // i18n-exempt: the GoTrue endpoint URL, not copy
      response = await this.#fetch(`${this.#config.url.replace(/\/$/, '')}/auth/v1${path}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          apikey: this.#config.anonKey,
          // i18n-exempt: an HTTP Authorization header value, not copy
          authorization: `Bearer ${accessToken ?? this.#config.anonKey}`,
        },
        body: JSON.stringify(body),
      });
    } catch {
      throw new AuthError(this.#t('error.offline_try_again'), 'OFFLINE');
    }

    if (response.status === 204) return undefined as T;

    const payload = (await response.json().catch(() => ({}))) as Record<string, unknown> & {
      error_code?: string;
      msg?: string;
      message?: string;
      error_description?: string;
    };

    if (!response.ok) {
      const code = String(payload.error_code ?? response.status);
      throw new AuthError(playerFacingMessage(this.#t, code, payload), code);
    }
    return payload as T;
  }

  /**
   * A guest identity, from Supabase rather than invented on the device.
   *
   * Spec §6.3 lets a player browse and start a run before any account exists.
   * Making that a real anonymous Supabase user rather than a made-up local
   * string means the same verification path covers everybody, and signing in
   * later upgrades the account in place instead of merging two of them.
   */
  async signInAnonymously(): Promise<AuthSession> {
    return this.#toSession(await this.#post<GoTrueSession>('/signup', {}));
  }

  /** Sends a six-digit code. No password is ever created (§6.4). */
  async sendEmailCode(email: string): Promise<void> {
    // Trimmed here, where the wire format is decided, rather than only at the
    // call site: a code pasted from an email arrives with a space on it often
    // enough that failing on it would be a support ticket.
    await this.#post('/otp', { email: email.trim(), create_user: true });
  }

  async verifyEmailCode(email: string, code: string): Promise<AuthSession> {
    return this.#toSession(
      await this.#post<GoTrueSession>('/verify', {
        type: 'email',
        email: email.trim(),
        token: code.trim(),
      }),
    );
  }

  /**
   * Sign in with Apple, and Google, using the identity token the native sheet
   * returns. The nonce is passed through so Supabase can check it against the
   * one the app asked Apple to sign.
   */
  async signInWithIdToken(
    provider: 'apple' | 'google',
    idToken: string,
    nonce?: string,
  ): Promise<AuthSession> {
    return this.#toSession(
      await this.#post<GoTrueSession>('/token?grant_type=id_token', {
        provider,
        id_token: idToken,
        ...(nonce ? { nonce } : {}),
      }),
    );
  }

  async refresh(refreshToken: string): Promise<AuthSession> {
    return this.#toSession(
      await this.#post<GoTrueSession>('/token?grant_type=refresh_token', {
        refresh_token: refreshToken,
      }),
    );
  }

  async signOut(accessToken: string): Promise<void> {
    // Best effort: the local session is cleared either way, so a failure here
    // must not leave a player stuck signed in on their own device.
    await this.#post('/logout', {}, accessToken).catch(() => undefined);
  }

  #toSession(payload: GoTrueSession): AuthSession {
    if (!payload.access_token || !payload.refresh_token || !payload.user?.id) {
      throw new AuthError(this.#t('error.sign_in_failed'), 'MALFORMED_SESSION');
    }
    return {
      accessToken: payload.access_token,
      refreshToken: payload.refresh_token,
      expiresAt: this.#now() + (payload.expires_in ?? 3600) * 1000,
      userId: payload.user.id,
      email: payload.user.email ?? null,
      isAnonymous: payload.user.is_anonymous === true,
    };
  }
}

/**
 * Provider error codes are not player-facing copy. "otp_expired" is a fact
 * about a protocol; "That code has expired" is a sentence someone can act on.
 */
function playerFacingMessage(
  t: Translator,
  code: string,
  payload: { msg?: string; message?: string },
): string {
  switch (code) {
    case 'otp_expired':
      return t('error.code_expired');
    case 'invalid_credentials':
    case 'otp_disabled':
      return t('error.code_incorrect');
    case 'over_email_send_rate_limit':
    case 'over_request_rate_limit':
      return t('error.too_many_attempts');
    case 'email_address_invalid':
      return t('error.email_invalid');
    case 'anonymous_provider_disabled':
      return t('error.guest_play_unavailable');
    case 'signup_disabled':
      return t('error.signups_paused');
    case '429':
      return t('error.too_many_attempts');
    default:
      // GoTrue's own text, which is English whatever the player set. Ours is
      // better than a raw provider string, so it wins where there is no code.
      return payload.msg ?? payload.message ?? t('error.sign_in_failed');
  }
}
