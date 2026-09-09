import { createHmac, createPublicKey, timingSafeEqual, verify as verifySignature } from 'node:crypto';
import type { AppConfig } from './context.js';

/**
 * Bearer token verification (spec §6.3, §6.4).
 *
 * Sign-in itself happens between the app and Supabase Auth — Sign in with
 * Apple, Google, or an emailed code, plus anonymous sessions for players who
 * have not signed in yet. What reaches this service is the resulting JWT, and
 * this module's whole job is to decide whether it is real and whose it is.
 *
 * Nothing here trusts a claim it has not checked a signature for. The
 * development verifier, which does exactly that, cannot be selected in
 * production: `assertProductionReady` refuses to boot without a signing key,
 * and `createTokenVerifierFromEnv` refuses to hand back the development one.
 */

export interface VerifiedToken {
  readonly userId: string;
  /** Supabase marks anonymous sessions; those are our guests (§6.3). */
  readonly isGuest: boolean;
  readonly email: string | null;
  readonly expiresAt: number | null;
}

export type VerifyResult =
  | { readonly ok: true; readonly token: VerifiedToken }
  | { readonly ok: false; readonly reason: 'EXPIRED' | 'INVALID' };

export interface TokenVerifier {
  readonly name: string;
  verify(token: string): Promise<VerifyResult>;
}

const INVALID = { ok: false, reason: 'INVALID' } as const;
const EXPIRED = { ok: false, reason: 'EXPIRED' } as const;

/**
 * The local-development scheme: the bearer token *is* the user id.
 *
 * Convenient, and a complete authentication bypass. It exists so the API runs
 * with no infrastructure at all, and it is fenced off from production in two
 * independent places rather than one.
 */
export class DevTokenVerifier implements TokenVerifier {
  readonly name = 'dev-token';

  async verify(token: string): Promise<VerifyResult> {
    const trimmed = token.trim();
    if (trimmed.length === 0) return INVALID;
    return {
      ok: true,
      token: {
        userId: trimmed,
        isGuest: trimmed.startsWith('guest_'),
        email: null,
        expiresAt: null,
      },
    };
  }
}

export interface SupabaseJwtVerifierOptions {
  /** Supabase legacy signing: one shared HS256 secret for the project. */
  readonly hmacSecret?: string;
  /** Asymmetric signing: the project's JWKS endpoint (RS256/ES256). */
  readonly jwksUrl?: string;
  /** Rejects a token minted for another project. */
  readonly expectedAudience?: string;
  readonly fetchImpl?: typeof fetch;
  readonly now?: () => number;
}

interface JwtHeader {
  alg: string;
  kid?: string;
}

interface SupabaseClaims {
  sub?: string;
  exp?: number;
  aud?: string | string[];
  email?: string;
  is_anonymous?: boolean;
  /** Present on older projects; anonymous users are `authenticated` too. */
  role?: string;
}

interface Jwk extends Record<string, unknown> {
  kid?: string;
  alg?: string;
}

/**
 * Verifies a Supabase Auth JWT.
 *
 * Supports both signing modes a project can be in: the shared HS256 secret, and
 * asymmetric keys published at a JWKS endpoint. Written against `node:crypto`
 * directly rather than pulling in a JWT library, because the surface we need is
 * small and every line of it is security-relevant enough to want in front of us.
 */
export class SupabaseJwtVerifier implements TokenVerifier {
  readonly name = 'supabase';
  readonly #options: SupabaseJwtVerifierOptions;
  readonly #fetch: typeof fetch;
  readonly #now: () => number;
  #keys: Map<string, Jwk> | null = null;
  #keysFetchedAt = 0;

  constructor(options: SupabaseJwtVerifierOptions) {
    if (!options.hmacSecret && !options.jwksUrl) {
      throw new Error('SupabaseJwtVerifier needs either a shared secret or a JWKS url');
    }
    this.#options = options;
    this.#fetch = options.fetchImpl ?? fetch;
    this.#now = options.now ?? Date.now;
  }

  async verify(raw: string): Promise<VerifyResult> {
    const parts = raw.trim().split('.');
    if (parts.length !== 3) return INVALID;
    const [encodedHeader, encodedPayload, encodedSignature] = parts as [string, string, string];

    let header: JwtHeader;
    let claims: SupabaseClaims;
    try {
      header = JSON.parse(decodeSegment(encodedHeader).toString('utf8')) as JwtHeader;
      claims = JSON.parse(decodeSegment(encodedPayload).toString('utf8')) as SupabaseClaims;
    } catch {
      return INVALID;
    }

    const signingInput = Buffer.from(`${encodedHeader}.${encodedPayload}`, 'utf8');
    const signature = decodeSegment(encodedSignature);

    const signatureOk = await this.#checkSignature(header, signingInput, signature);
    if (!signatureOk) return INVALID;

    // Expiry is checked after the signature, so an expired token can never be
    // reported as expired unless it was genuinely ours.
    if (typeof claims.exp === 'number' && claims.exp * 1000 <= this.#now()) return EXPIRED;

    const audience = this.#options.expectedAudience;
    if (audience) {
      const claimed = Array.isArray(claims.aud) ? claims.aud : claims.aud ? [claims.aud] : [];
      if (!claimed.includes(audience)) return INVALID;
    }

    if (!claims.sub) return INVALID;

    return {
      ok: true,
      token: {
        userId: claims.sub,
        isGuest: claims.is_anonymous === true,
        email: claims.email ?? null,
        expiresAt: typeof claims.exp === 'number' ? claims.exp * 1000 : null,
      },
    };
  }

  async #checkSignature(header: JwtHeader, input: Buffer, signature: Buffer): Promise<boolean> {
    if (header.alg === 'HS256') {
      const secret = this.#options.hmacSecret;
      if (!secret) return false;
      const expected = createHmac('sha256', secret).update(input).digest();
      // Constant-time: a length-sensitive compare leaks the signature a byte at
      // a time to anyone willing to measure.
      return expected.length === signature.length && timingSafeEqual(expected, signature);
    }

    if (header.alg === 'RS256' || header.alg === 'ES256') {
      const jwk = await this.#keyFor(header.kid);
      if (!jwk) return false;
      try {
        const key = createPublicKey({ key: jwk as never, format: 'jwk' });
        return verifySignature(
          header.alg === 'RS256' ? 'RSA-SHA256' : 'SHA256',
          input,
          header.alg === 'ES256' ? { key, dsaEncoding: 'ieee-p1363' } : key,
          signature,
        );
      } catch {
        return false;
      }
    }

    // Notably including "none": an unsigned token is not a token.
    return false;
  }

  async #keyFor(kid: string | undefined): Promise<Jwk | null> {
    const stale = this.#now() - this.#keysFetchedAt > 10 * 60 * 1000;
    if (!this.#keys || stale || (kid && !this.#keys.has(kid))) {
      await this.#refreshKeys();
    }
    if (!this.#keys) return null;
    if (kid) return this.#keys.get(kid) ?? null;
    // A JWKS with exactly one key needs no kid to be unambiguous.
    return this.#keys.size === 1 ? [...this.#keys.values()][0]! : null;
  }

  async #refreshKeys(): Promise<void> {
    const url = this.#options.jwksUrl;
    if (!url) return;
    try {
      const response = await this.#fetch(url, { headers: { accept: 'application/json' } });
      if (!response.ok) return;
      const body = (await response.json()) as { keys?: Jwk[] };
      const keys = new Map<string, Jwk>();
      for (const key of body.keys ?? []) keys.set(key.kid ?? 'default', key);
      if (keys.size > 0) {
        this.#keys = keys;
        this.#keysFetchedAt = this.#now();
      }
    } catch {
      // Keep whatever we had. A transient JWKS outage should not sign every
      // player out; a genuinely rotated key fails verification anyway.
    }
  }
}

function decodeSegment(segment: string): Buffer {
  return Buffer.from(segment.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

/**
 * Chooses the verifier from configuration.
 *
 * Production without a signing key does not get the development verifier as a
 * fallback; it gets an exception. The fallback is the failure mode this is
 * guarding against.
 */
export function createTokenVerifierFromEnv(
  config: AppConfig,
  env: NodeJS.ProcessEnv = process.env,
): TokenVerifier {
  const hmacSecret = env.SUPABASE_JWT_SECRET;
  const jwksUrl =
    env.AUTH_JWKS_URL ??
    (env.SUPABASE_URL ? `${env.SUPABASE_URL.replace(/\/$/, '')}/auth/v1/.well-known/jwks.json` : undefined);

  if (hmacSecret || env.AUTH_JWKS_URL || (env.SUPABASE_URL && env.SUPABASE_ANON_KEY)) {
    return new SupabaseJwtVerifier({
      hmacSecret,
      jwksUrl,
      expectedAudience: env.AUTH_EXPECTED_AUDIENCE ?? 'authenticated',
    });
  }

  if (config.environment === 'production') {
    throw new Error(
      'No authentication configured. Set SUPABASE_JWT_SECRET (Supabase → Project Settings →\n' +
        'API → JWT Secret) or AUTH_JWKS_URL before starting a production process.',
    );
  }

  return new DevTokenVerifier();
}
