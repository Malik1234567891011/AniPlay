import { createHmac, generateKeyPairSync, createSign, sign as signBuffer } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { DevTokenVerifier, SupabaseJwtVerifier, createTokenVerifierFromEnv } from './auth.js';
import { loadConfig } from './context.js';

/**
 * These tests are the reason the verifier is hand-written rather than trusted:
 * every one of them is a way a token can be wrong, and each has to be rejected
 * for the right reason.
 */

const SECRET = 'super-secret-jwt-signing-key-for-tests';
const NOW = Date.UTC(2026, 0, 1, 12, 0, 0);

function b64(input: object | Buffer): string {
  const buffer = Buffer.isBuffer(input) ? input : Buffer.from(JSON.stringify(input), 'utf8');
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function hs256(claims: Record<string, unknown>, secret = SECRET, header = { alg: 'HS256', typ: 'JWT' }): string {
  const input = `${b64(header)}.${b64(claims)}`;
  return `${input}.${b64(createHmac('sha256', secret).update(input).digest())}`;
}

const claims = (overrides: Record<string, unknown> = {}): Record<string, unknown> => ({
  sub: '2f1c8a3e-0000-4000-8000-000000000001',
  aud: 'authenticated',
  role: 'authenticated',
  exp: Math.floor(NOW / 1000) + 3600,
  email: 'player@example.com',
  ...overrides,
});

const verifier = (): SupabaseJwtVerifier =>
  new SupabaseJwtVerifier({ hmacSecret: SECRET, expectedAudience: 'authenticated', now: () => NOW });

describe('SupabaseJwtVerifier', () => {
  it('accepts a token this project signed', async () => {
    const result = await verifier().verify(hs256(claims()));
    expect(result).toMatchObject({
      ok: true,
      token: { userId: '2f1c8a3e-0000-4000-8000-000000000001', isGuest: false, email: 'player@example.com' },
    });
  });

  it('reads an anonymous session as a guest', async () => {
    const result = await verifier().verify(hs256(claims({ is_anonymous: true, email: undefined })));
    expect(result.ok && result.token.isGuest).toBe(true);
  });

  it('rejects a token signed with a different secret', async () => {
    expect(await verifier().verify(hs256(claims(), 'not-the-secret'))).toEqual({
      ok: false,
      reason: 'INVALID',
    });
  });

  it('rejects a token whose payload was edited after signing', async () => {
    const token = hs256(claims());
    const [header, , signature] = token.split('.');
    const tampered = `${header}.${b64(claims({ sub: 'someone-elses-account' }))}.${signature}`;
    expect(await verifier().verify(tampered)).toEqual({ ok: false, reason: 'INVALID' });
  });

  it('rejects alg:none, however well-formed the rest of it is', async () => {
    const header = b64({ alg: 'none', typ: 'JWT' });
    expect(await verifier().verify(`${header}.${b64(claims())}.`)).toEqual({
      ok: false,
      reason: 'INVALID',
    });
  });

  it('rejects an HMAC token when only asymmetric keys are configured', async () => {
    // The classic confusion attack: sign with the public key as an HMAC secret.
    const asymmetric = new SupabaseJwtVerifier({ jwksUrl: 'https://example.test/jwks', now: () => NOW });
    expect(await asymmetric.verify(hs256(claims()))).toEqual({ ok: false, reason: 'INVALID' });
  });

  it('reports an expired token as expired, not as forged', async () => {
    const expired = hs256(claims({ exp: Math.floor(NOW / 1000) - 1 }));
    expect(await verifier().verify(expired)).toEqual({ ok: false, reason: 'EXPIRED' });
  });

  it('does not admit an expired token was ever ours if it was not signed by us', async () => {
    const forged = hs256(claims({ exp: Math.floor(NOW / 1000) - 1 }), 'wrong');
    expect(await verifier().verify(forged)).toEqual({ ok: false, reason: 'INVALID' });
  });

  it('rejects a token minted for a different audience', async () => {
    expect(await verifier().verify(hs256(claims({ aud: 'some-other-project' })))).toEqual({
      ok: false,
      reason: 'INVALID',
    });
  });

  it('rejects a token with no subject', async () => {
    expect(await verifier().verify(hs256(claims({ sub: undefined })))).toEqual({
      ok: false,
      reason: 'INVALID',
    });
  });

  it('rejects malformed input without throwing', async () => {
    for (const bad of ['', 'not-a-token', 'a.b', 'a.b.c.d', '...']) {
      expect((await verifier().verify(bad)).ok).toBe(false);
    }
  });

  it('verifies an RS256 token against the project JWKS', async () => {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
    const jwk = { ...publicKey.export({ format: 'jwk' }), kid: 'key-1', alg: 'RS256', use: 'sig' };

    const header = b64({ alg: 'RS256', typ: 'JWT', kid: 'key-1' });
    const payload = b64(claims());
    const signer = createSign('RSA-SHA256');
    signer.update(`${header}.${payload}`);
    const token = `${header}.${payload}.${b64(signer.sign(privateKey))}`;

    const jwks = new SupabaseJwtVerifier({
      jwksUrl: 'https://example.test/jwks',
      expectedAudience: 'authenticated',
      now: () => NOW,
      fetchImpl: (async () =>
        new Response(JSON.stringify({ keys: [jwk] }), {
          headers: { 'content-type': 'application/json' },
        })) as unknown as typeof fetch,
    });

    expect((await jwks.verify(token)).ok).toBe(true);
    // A token signed by a key the JWKS does not list is not accepted.
    const other = generateKeyPairSync('rsa', { modulusLength: 2048 });
    const rogue = createSign('RSA-SHA256');
    rogue.update(`${header}.${payload}`);
    expect((await jwks.verify(`${header}.${payload}.${b64(rogue.sign(other.privateKey))}`)).ok).toBe(false);
  });

  it('verifies an ES256 token, which is what new Supabase projects sign with', async () => {
    const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' });
    const jwk = { ...publicKey.export({ format: 'jwk' }), kid: 'ec-1', alg: 'ES256', use: 'sig' };

    const header = b64({ alg: 'ES256', typ: 'JWT', kid: 'ec-1' });
    const payload = b64(claims());
    const signature = signBuffer(
      'SHA256',
      Buffer.from(`${header}.${payload}`, 'utf8'),
      { key: privateKey, dsaEncoding: 'ieee-p1363' },
    );

    const jwks = new SupabaseJwtVerifier({
      jwksUrl: 'https://example.test/jwks',
      expectedAudience: 'authenticated',
      now: () => NOW,
      fetchImpl: (async () =>
        new Response(JSON.stringify({ keys: [jwk] }), {
          headers: { 'content-type': 'application/json' },
        })) as unknown as typeof fetch,
    });

    expect((await jwks.verify(`${header}.${payload}.${b64(signature)}`)).ok).toBe(true);
  });
});

describe('choosing a verifier', () => {
  const dev = loadConfig({ NODE_ENV: 'development' } as NodeJS.ProcessEnv);
  const prod = loadConfig({ NODE_ENV: 'production' } as NodeJS.ProcessEnv);

  it('uses the development stub only when nothing else is configured', () => {
    expect(createTokenVerifierFromEnv(dev, {} as NodeJS.ProcessEnv)).toBeInstanceOf(DevTokenVerifier);
  });

  it('refuses to hand a production process the development stub', () => {
    expect(() => createTokenVerifierFromEnv(prod, {} as NodeJS.ProcessEnv)).toThrow(
      /No authentication configured/,
    );
  });

  it('derives the JWKS url from the Supabase project url', () => {
    const verifier = createTokenVerifierFromEnv(prod, {
      SUPABASE_URL: 'https://abc.supabase.co',
      SUPABASE_ANON_KEY: 'anon',
    } as NodeJS.ProcessEnv);
    expect(verifier.name).toBe('supabase');
  });
});

describe('DevTokenVerifier', () => {
  it('accepts any token and reads a guest prefix as a guest', async () => {
    const result = await new DevTokenVerifier().verify('guest_abc');
    expect(result.ok && result.token.isGuest).toBe(true);
  });

  it('maps a token to a stable uuid, because that is what the schema stores', async () => {
    const once = await new DevTokenVerifier().verify('guest_abc');
    const again = await new DevTokenVerifier().verify('guest_abc');
    const other = await new DevTokenVerifier().verify('guest_def');
    expect(once.ok && once.token.userId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(once.ok && once.token.userId).toBe(again.ok && again.token.userId);
    expect(once.ok && once.token.userId).not.toBe(other.ok && other.token.userId);
  });

  it('passes a token that is already a uuid through unchanged', async () => {
    const id = '11111111-2222-4333-8444-555555555555';
    const result = await new DevTokenVerifier().verify(id);
    expect(result.ok && result.token.userId).toBe(id);
  });

  it('rejects an empty token', async () => {
    expect((await new DevTokenVerifier().verify('   ')).ok).toBe(false);
  });
});
