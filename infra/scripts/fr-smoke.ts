/**
 * Play every world briefly in French and report what looks wrong.
 *
 *   npm run fr:smoke                      # every world with French text
 *   npm run fr:smoke -- --turns=8
 *   npm run fr:smoke -- --world=story_itachi
 *
 * `fr:qa` reads the *source* and asks whether the French looks suspicious.
 * This plays the game and asks whether the French that comes out of the model
 * does — which is a different question with a different answer, because the
 * runtime prose is generated from the source rather than copied from it.
 *
 * A world that passes `fr:qa` can still produce English dialogue, a midpoint,
 * `vous` where the world tutoies, or three characters who sound identical. Only
 * playing it finds that.
 *
 * Deliberately short. Five to eight turns is enough to see whether the system
 * is healthy in a world; a world that looks wrong here is promoted to a real
 * playthrough and read by a person.
 */
import { writeFileSync } from 'node:fs';

const BASE = process.env.PLOTBREAK_API ?? 'http://localhost:4000';

interface Problem {
  readonly world: string;
  readonly turn: number;
  readonly code: string;
  readonly detail: string;
}

const ENGLISH =
  /\b(the|and|with|your|from|that|this|what|when|there|about|would|could|should|they|their|because|something|nothing|someone|never|always|before|while|which|where|been|being|does)\b/i;
const MIDPOINT = /\p{L}[·‧•]\p{L}|\p{L}\(e\)/u;

async function playerToken(): Promise<string> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return `guest_${crypto.randomUUID()}`;
  const response = await fetch(`${url.replace(/\/$/, '')}/auth/v1/signup`, {
    method: 'POST',
    headers: { apikey: key, authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: '{}',
  });
  const body = (await response.json()) as { access_token?: string };
  if (!body.access_token) throw new Error('no anonymous session');
  return body.access_token;
}

/**
 * Follow a turn's SSE stream to its end.
 *
 * Returns `null` when the turn completed, or the reason it did not. The reason
 * is the point: a harness that only knows "nothing showed up" cannot tell a
 * slow world from a dead provider, and will happily spend an afternoon
 * profiling a billing problem.
 */
async function watchTurn(accepted: any, authorization: string): Promise<string | null> {
  const url = `${accepted.streamUrl}?token=${encodeURIComponent(accepted.streamToken)}`;
  const response = await fetch(url, { headers: { authorization, accept: 'text/event-stream' } });
  if (!response.ok || !response.body) return `stream ${response.status}`;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  const deadline = Date.now() + 180_000;

  try {
    while (Date.now() < deadline) {
      const { done, value } = await reader.read();
      if (done) return 'the stream closed before the turn finished';
      buffer += decoder.decode(value, { stream: true });
      const frames = buffer.split('\n\n');
      buffer = frames.pop() ?? '';
      for (const frame of frames) {
        const line = frame.split('\n').find((l) => l.startsWith('data:'));
        if (!line) continue;
        let parsed: any;
        try { parsed = JSON.parse(line.slice(5).trim()); } catch { continue; }
        if (parsed.event === 'turn.completed') return null;
        if (parsed.event === 'turn.failed') {
          return `${parsed.data?.code ?? 'FAILED'}: ${parsed.data?.message ?? ''}`.trim();
        }
      }
    }
    return 'no terminal event after 180s';
  } finally {
    await reader.cancel().catch(() => undefined);
  }
}

async function smoke(storyId: string, turns: number, problems: Problem[], log: string[]): Promise<void> {
  const auth = {
    authorization: `Bearer ${await playerToken()}`,
    'content-type': 'application/json',
    'accept-language': 'fr',
  };
  const call = async <T>(method: string, path: string, body?: unknown, extra: Record<string, string> = {}): Promise<T> => {
    const r = await fetch(`${BASE}${path}`, {
      method, headers: { ...auth, ...extra },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await r.text();
    if (!r.ok) throw new Error(`${method} ${path} → ${r.status} ${text.slice(0, 200)}`);
    return JSON.parse(text) as T;
  };

  await call('PATCH', '/v1/me', { settings: { locale: 'fr' } }).catch(() => undefined);
  const detail = await call<any>('GET', `/v1/stories/${storyId}`);
  const named = detail.protagonist?.kind === 'NAMED';

  const session = await call<any>('POST', `/v1/stories/${storyId}/sessions`, {
    identity: {
      displayName: named ? detail.protagonist.name : 'Camille',
      pronouns: named ? detail.protagonist.pronouns : 'she/her',
      archetypeId: detail.archetypes?.[0]?.id ?? null,
      advanced: {},
      grammar: { gender: 'FEMININE', thirdPerson: 'elle' },
    },
    locale: 'fr',
  });

  const sessionId = session.session.sessionId;
  let revision = session.revision ?? 0;
  let cards: any[] = session.suggestions ?? [];

  log.push(`\n### ${detail.story.title}\n`);
  log.push(`**Premise.** ${String(detail.premise).slice(0, 200)}\n`);

  const note = (turn: number, code: string, detail: string): void =>
    problems.push({ world: storyId, turn, code, detail: detail.slice(0, 120) });

  // The premise and hook are the first French anybody reads.
  for (const [field, text] of [['premise', detail.premise], ['hook', detail.story.hook]] as const) {
    if (typeof text === 'string' && ENGLISH.test(text)) note(0, 'ENGLISH_CATALOGUE', `${field}: ${text}`);
  }

  for (let t = 1; t <= turns; t += 1) {
    if (!cards.length) {
      const fresh = await call<any>('GET', `/v1/sessions/${sessionId}`);
      cards = fresh.suggestions ?? [];
    }
    if (!cards.length) {
      note(t, 'NO_CARDS', 'a tap-only player is stuck');
      break;
    }

    for (const card of cards) {
      if (ENGLISH.test(card.text)) note(t, 'ENGLISH_CARD', card.text);
      if (MIDPOINT.test(card.text)) note(t, 'MIDPOINT_CARD', card.text);
      if (/["']/.test(card.text)) note(t, 'TYPOGRAPHY_CARD', card.text);
    }

    const pick = cards[(t - 1) % cards.length];
    log.push(`**T${t} →** ${pick.text}\n`);

    let accepted: any;
    try {
      accepted = await call<any>('POST', `/v1/sessions/${sessionId}/turns`, {
        actionText: pick.text, qualityTier: 'QUICK', sessionRevision: revision,
        selectedSuggestionId: pick.id ?? null, voicePreferred: false,
      }, { 'idempotency-key': crypto.randomUUID() });
    } catch (error) {
      note(t, 'TURN_FAILED', String(error));
      break;
    }

    // Watch the stream, do not poll the turn.
    //
    // `GET /v1/turns/<id>` answers 404 both for a turn that is still being
    // written and for one that failed and will never exist. Polling it cannot
    // tell those apart, so every failure arrived here as "no committed turn
    // after 60s" — which reads as slowness. An entire investigation went into
    // why French turns were slow before the stream said, instantly and in
    // plain words, that the provider was out of credits.
    const failure = await watchTurn(accepted, auth.authorization);
    if (failure) { note(t, 'TURN_FAILED', failure); break; }

    let turn: any = null;
    for (let a = 0; a < 20 && !turn; a += 1) {
      try { turn = await call<any>('GET', `/v1/turns/${accepted.turnId}`); } catch { await new Promise((r) => setTimeout(r, 500)); }
    }
    if (!turn) { note(t, 'TURN_TIMEOUT', 'stream completed but the turn never appeared'); break; }

    for (const block of turn.blocks ?? []) {
      const text = String(block.text ?? '');
      log.push(`> ${text}\n`);
      if (ENGLISH.test(text)) note(t, 'ENGLISH_PROSE', text);
      if (MIDPOINT.test(text)) note(t, 'MIDPOINT_PROSE', text);
      // A narrator that vouvoies the player. Characters may; the narrator may
      // not.
      //
      // Narrowed to `vous` in subject position with a second-person-plural
      // verb, because the first version flagged thirteen perfectly good lines:
      // "entre vous", "posée entre vous", "le silence s'installe entre vous
      // deux", "le parquet grince sous vos semelles". That is `vous` as the
      // *plural of tu* — the player and somebody else — which is correct
      // French and the opposite of vouvoiement.
      const vouvoiement =
        /\bvous (?:êtes|avez|voyez|pouvez|devez|savez|allez|faites|vous sentez|regardez|entendez)\b/i;
      if (block.type === 'NARRATION' && vouvoiement.test(text)) {
        note(t, 'NARRATOR_VOUS', text);
      }
    }

    const after = await call<any>('GET', `/v1/sessions/${sessionId}`);
    revision = after.revision ?? revision;
    cards = after.suggestions ?? [];
  }
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const only = argv.find((a) => a.startsWith('--world='))?.slice('--world='.length);
  const turns = Number(argv.find((a) => a.startsWith('--turns='))?.slice('--turns='.length) ?? 6);

  const { LAUNCH_CATALOG } = await import('@aniplay/test-fixtures');
  const { worldTextCoverage } = await import('@aniplay/contracts');

  const worlds = (LAUNCH_CATALOG as unknown as Array<{ storyId: string; title: string }>)
    .filter((w) => (only ? w.storyId === only : worldTextCoverage('fr', w.storyId) > 0));

  const problems: Problem[] = [];
  const log: string[] = ['# French smoke test\n'];

  for (const world of worlds) {
    process.stdout.write(`${world.title}… `);
    try {
      await smoke(world.storyId, turns, problems, log);
      const mine = problems.filter((p) => p.world === world.storyId);
      console.log(mine.length === 0 ? 'clean' : `${mine.length} problem(s)`);
    } catch (error) {
      console.log(`failed: ${String(error).slice(0, 120)}`);
      problems.push({ world: world.storyId, turn: 0, code: 'FAILED', detail: String(error).slice(0, 200) });
    }
  }

  writeFileSync('/tmp/fr-smoke.md', log.join('\n'), 'utf8');
  console.log('\nTranscripts: /tmp/fr-smoke.md');

  if (problems.length === 0) {
    console.log('\nNothing flagged. Read a transcript anyway — this catches leakage, not flatness.');
    return;
  }

  const byCode = new Map<string, Problem[]>();
  for (const p of problems) byCode.set(p.code, [...(byCode.get(p.code) ?? []), p]);
  for (const [code, list] of [...byCode].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n${code} — ${list.length}`);
    for (const p of list.slice(0, 8)) console.log(`  ${p.world} T${p.turn}: ${p.detail}`);
    if (list.length > 8) console.log(`  … and ${list.length - 8} more`);
  }
  process.exitCode = 1;
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
