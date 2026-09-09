import type { AppConfig } from './context.js';

/**
 * Spec §33.5 — store receipt verification.
 *
 * `POST /v1/store/purchases/sync` grants credits, so what the client says about
 * a purchase can never be the thing that decides it. Anyone can post a JSON
 * body; only Apple and Google can say whether money actually moved. This port
 * is where that check happens, and the route refuses to credit anything that
 * has not passed through it.
 *
 * The sandbox verifier exists so the store flow is exercisable in development.
 * It is hard-wired to refuse outside development for the obvious reason: an
 * app that ships with a "just say you paid" endpoint has no revenue.
 */

export interface VerificationInput {
  readonly productId: string;
  readonly storeTransactionId: string;
  readonly platform: 'APP_STORE' | 'PLAY_STORE' | 'SANDBOX';
  readonly receipt: string | null;
  readonly userId: string;
}

export type VerificationResult =
  | {
      readonly valid: true;
      /** What the store says was bought, which may differ from the claim. */
      readonly productId: string;
      /**
       * The store's own stable id for the transaction. Reconciliation keys on
       * this rather than on the client's copy, so a caller cannot replay one
       * purchase under many ids.
       */
      readonly originalTransactionId: string;
      readonly purchasedAt: string;
      readonly environment: 'PRODUCTION' | 'SANDBOX';
    }
  | {
      readonly valid: false;
      readonly reason: string;
      /** True for a provider outage: the client may try again later. */
      readonly retryable: boolean;
    };

export interface StoreVerifier {
  readonly name: string;
  verify(input: VerificationInput): Promise<VerificationResult>;
}

/** Raised when nothing can verify the platform the client claims to be on. */
export class NoVerifierError extends Error {
  constructor(readonly platform: string) {
    super(`No store verifier configured for ${platform}`);
    this.name = 'NoVerifierError';
  }
}

/**
 * Development only. Accepts a transaction that looks like one our own sandbox
 * produced and nothing else.
 */
export class SandboxStoreVerifier implements StoreVerifier {
  readonly name = 'sandbox';

  async verify(input: VerificationInput): Promise<VerificationResult> {
    if (input.platform !== 'SANDBOX') {
      return { valid: false, reason: 'Sandbox verifier only accepts sandbox purchases.', retryable: false };
    }
    if (!/^sandbox_[A-Za-z0-9_-]{4,}$/.test(input.storeTransactionId)) {
      return { valid: false, reason: 'Not a sandbox transaction id.', retryable: false };
    }
    return {
      valid: true,
      productId: input.productId,
      // Namespaced by user so two accounts cannot fight over one id.
      originalTransactionId: `${input.userId}:${input.storeTransactionId}`,
      purchasedAt: new Date().toISOString(),
      environment: 'SANDBOX',
    };
  }
}

/**
 * App Store Server API verification (§33.5).
 *
 * Signed by an App Store Connect key, so it needs the key id, issuer id and
 * private key. Absent those there is no verifier for iOS and the route says so
 * rather than crediting on trust.
 */
export class AppStoreVerifier implements StoreVerifier {
  readonly name = 'app-store';

  constructor(
    private readonly options: {
      readonly bundleId: string;
      readonly keyId: string;
      readonly issuerId: string;
      readonly privateKey: string;
      readonly environment: 'PRODUCTION' | 'SANDBOX';
    },
  ) {}

  async verify(input: VerificationInput): Promise<VerificationResult> {
    if (input.platform !== 'APP_STORE') {
      return { valid: false, reason: 'Not an App Store purchase.', retryable: false };
    }

    // Apple's two environments are separate namespaces, and which one a
    // transaction lives in is not a property of our deployment: a TestFlight
    // build and a sandbox tester on a production build both produce sandbox
    // transactions. Asking one host and giving up on 404 is the bug that makes
    // every test purchase fail, so ask the other one before concluding
    // anything. The environment we are configured for is only the first guess.
    const hosts =
      this.options.environment === 'PRODUCTION'
        ? ['https://api.storekit.itunes.apple.com', 'https://api.storekit-sandbox.itunes.apple.com']
        : ['https://api.storekit-sandbox.itunes.apple.com', 'https://api.storekit.itunes.apple.com'];

    let response: Response | null = null;
    for (const host of hosts) {
      try {
        response = await fetch(
          `${host}/inApps/v1/transactions/${encodeURIComponent(input.storeTransactionId)}`,
          { headers: { authorization: `Bearer ${await this.#token()}` } },
        );
      } catch (error) {
        // A network failure is not a fraudulent purchase. The player keeps
        // their transaction and the client can retry, hence retryable.
        return { valid: false, reason: `App Store unreachable: ${String(error)}`, retryable: true };
      }
      if (response.status !== 404) break;
    }

    if (!response || response.status === 404) {
      return { valid: false, reason: 'Apple has no record of that transaction.', retryable: false };
    }
    if (!response.ok) {
      return { valid: false, reason: `App Store returned ${response.status}.`, retryable: response.status >= 500 };
    }

    const body = (await response.json()) as { signedTransactionInfo?: string };
    if (!body.signedTransactionInfo) {
      return { valid: false, reason: 'App Store response had no transaction.', retryable: false };
    }

    // The payload is a JWS. Here the trust comes from the transport: we asked
    // Apple's own host over TLS with our own signed token, so the body is
    // Apple's answer and decoding it is enough. A JWS arriving any other way —
    // an App Store Server Notification, or anything relayed by a client — must
    // have its signature chain verified to Apple's root before it is read.
    const claims = decodeJwsPayload(body.signedTransactionInfo);
    if (!claims) return { valid: false, reason: 'Malformed transaction payload.', retryable: false };
    if (claims.bundleId !== this.options.bundleId) {
      return { valid: false, reason: 'Transaction belongs to a different app.', retryable: false };
    }

    return {
      valid: true,
      productId: String(claims.productId ?? input.productId),
      originalTransactionId: String(claims.originalTransactionId ?? input.storeTransactionId),
      purchasedAt: new Date(Number(claims.purchaseDate ?? Date.now())).toISOString(),
      environment: claims.environment === 'Sandbox' ? 'SANDBOX' : 'PRODUCTION',
    };
  }

  async #token(): Promise<string> {
    // ES256, signed with the App Store Connect key. Kept here so the shape of
    // the dependency is visible; wiring it needs the key material to exist.
    const { createSign } = await import('node:crypto');
    const header = { alg: 'ES256', kid: this.options.keyId, typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: this.options.issuerId,
      iat: now,
      exp: now + 1800,
      aud: 'appstoreconnect-v1',
      bid: this.options.bundleId,
    };
    const encode = (value: unknown): string =>
      Buffer.from(JSON.stringify(value)).toString('base64url');
    const signingInput = `${encode(header)}.${encode(payload)}`;
    const signer = createSign('SHA256');
    signer.update(signingInput);
    const signature = signer.sign({ key: this.options.privateKey, dsaEncoding: 'ieee-p1363' });
    return `${signingInput}.${signature.toString('base64url')}`;
  }
}

/** Google Play Developer API verification (§33.5). */
export class PlayStoreVerifier implements StoreVerifier {
  readonly name = 'play-store';

  constructor(
    private readonly options: {
      readonly packageName: string;
      readonly accessToken: () => Promise<string>;
    },
  ) {}

  async verify(input: VerificationInput): Promise<VerificationResult> {
    if (input.platform !== 'PLAY_STORE') {
      return { valid: false, reason: 'Not a Play Store purchase.', retryable: false };
    }
    if (!input.receipt) {
      return { valid: false, reason: 'Play purchases must carry a purchase token.', retryable: false };
    }

    const url =
      `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/` +
      `${encodeURIComponent(this.options.packageName)}/purchases/products/` +
      `${encodeURIComponent(input.productId)}/tokens/${encodeURIComponent(input.receipt)}`;

    let response: Response;
    try {
      response = await fetch(url, { headers: { authorization: `Bearer ${await this.options.accessToken()}` } });
    } catch (error) {
      return { valid: false, reason: `Play unreachable: ${String(error)}`, retryable: true };
    }

    if (!response.ok) {
      return { valid: false, reason: `Play returned ${response.status}.`, retryable: response.status >= 500 };
    }

    const body = (await response.json()) as {
      purchaseState?: number;
      orderId?: string;
      purchaseTimeMillis?: string;
    };
    // 0 is purchased; 1 cancelled, 2 pending. Only 0 gets credits.
    if (body.purchaseState !== 0) {
      return { valid: false, reason: 'Purchase is not in a completed state.', retryable: false };
    }

    return {
      valid: true,
      productId: input.productId,
      originalTransactionId: body.orderId ?? input.storeTransactionId,
      purchasedAt: new Date(Number(body.purchaseTimeMillis ?? Date.now())).toISOString(),
      environment: 'PRODUCTION',
    };
  }
}

/** Routes each purchase to the verifier for its platform. */
export class PlatformStoreVerifier implements StoreVerifier {
  readonly name: string;

  constructor(private readonly byPlatform: Partial<Record<VerificationInput['platform'], StoreVerifier>>) {
    const names = Object.values(byPlatform)
      .map((verifier) => verifier?.name)
      .filter(Boolean);
    this.name = names.length > 0 ? names.join('+') : 'none';
  }

  async verify(input: VerificationInput): Promise<VerificationResult> {
    const verifier = this.byPlatform[input.platform];
    if (!verifier) throw new NoVerifierError(input.platform);
    return verifier.verify(input);
  }
}

/**
 * Builds the verifier set from the environment.
 *
 * The sandbox verifier is only ever included outside production, so a
 * production build physically cannot accept a self-declared purchase.
 */
export function createStoreVerifierFromEnv(
  config: AppConfig,
  env: NodeJS.ProcessEnv = process.env,
): StoreVerifier {
  const byPlatform: Partial<Record<VerificationInput['platform'], StoreVerifier>> = {};

  if (config.environment !== 'production') {
    byPlatform.SANDBOX = new SandboxStoreVerifier();
  }

  if (env.APP_STORE_KEY_ID && env.APP_STORE_ISSUER_ID && env.APP_STORE_PRIVATE_KEY && env.APP_STORE_BUNDLE_ID) {
    byPlatform.APP_STORE = new AppStoreVerifier({
      bundleId: env.APP_STORE_BUNDLE_ID,
      keyId: env.APP_STORE_KEY_ID,
      issuerId: env.APP_STORE_ISSUER_ID,
      privateKey: env.APP_STORE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      environment: config.environment === 'production' ? 'PRODUCTION' : 'SANDBOX',
    });
  }

  if (env.PLAY_PACKAGE_NAME && env.PLAY_ACCESS_TOKEN) {
    byPlatform.PLAY_STORE = new PlayStoreVerifier({
      packageName: env.PLAY_PACKAGE_NAME,
      accessToken: async () => env.PLAY_ACCESS_TOKEN as string,
    });
  }

  return new PlatformStoreVerifier(byPlatform);
}

/** Reads a JWS payload. Only ever called after the signature has been trusted. */
function decodeJwsPayload(jws: string): Record<string, unknown> | null {
  const parts = jws.split('.');
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(Buffer.from(parts[1] as string, 'base64url').toString('utf8')) as Record<string, unknown>;
  } catch {
    return null;
  }
}
