/**
 * Plays one world the way a player actually plays it: by tapping the cards.
 *
 * `smoke.ts` plays every world *badly*, on purpose, with scripted adversarial
 * probes. This is the opposite and answers a different question — if somebody
 * just taps what they are offered, is the result a story worth reading?
 *
 *   npm run playthrough -- --story=story_itachi --turns=10
 *
 * Everything is logged: the prose, every card offered, which one was taken,
 * the media plan behind each turn, and the state the turn moved. Written to a
 * file, because the point is to read it afterwards.
 */
import { writeFileSync } from 'node:fs';
import { Pool } from 'pg';

const args = process.argv.slice(2);
const arg = (name: string, fallback: string): string =>
  args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;

const BASE = arg('base', 'http://localhost:4000');
const STORY = arg('story', 'story_itachi');
const TURNS = Number(arg('turns', '10'));
const OUT = arg('out', `/tmp/playthrough-${STORY}.md`);
const TIER = arg('tier', 'VIVID');
const LOCALE = arg('locale', 'en');

async function playerToken(): Promise<string> {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) return `guest_${crypto.randomUUID()}`;
  const response = await fetch(`${url.replace(/\/$/, '')}/auth/v1/signup`, {
    method: 'POST',
    headers: { apikey: anonKey, authorization: `Bearer ${anonKey}`, 'content-type': 'application/json' },
    body: '{}',
  });
  const body = (await response.json()) as { access_token?: string; msg?: string };
  if (!body.access_token) throw new Error(`no token: ${body.msg ?? response.status}`);
  return body.access_token;
}

const out: string[] = [];
const imageCheck: string[] = [];
const log = (line = ''): void => {
  out.push(line);
  console.log(line);
};

/** Harness-only. Appends a grant to the same ledger the wallet uses. */
async function topUp(amount: number): Promise<void> {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const { rows } = await pool.query<{ account_id: string; balance_after: number }>(
      `SELECT account_id, balance_after FROM wallet_ledger ORDER BY created_at DESC LIMIT 1`,
    );
    const account = rows[0];
    if (!account) return;
    await pool.query(
      `INSERT INTO wallet_ledger (entry_id, account_id, type, amount, balance_after, reason_code,
                                  reference_id, idempotency_key, metadata, created_at)
       VALUES ($1,$2,'PROMO_GRANT',$3,$4,'PROMO_GRANT',NULL,$5,'{}',now())`,
      [
        `led_${crypto.randomUUID()}`,
        account.account_id,
        amount,
        Number(account.balance_after) + amount,
        `playthrough:${crypto.randomUUID()}`,
      ],
    );
  } finally {
    await pool.end();
  }
}

async function main(): Promise<void> {
  const auth = { authorization: `Bearer ${await playerToken()}`, 'content-type': 'application/json' };
  const call = async <T>(method: string, path: string, body?: unknown, extra: Record<string, string> = {}): Promise<T> => {
    const r = await fetch(`${BASE}${path}`, {
      method, headers: { ...auth, ...extra },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await r.text();
    if (!r.ok) throw new Error(`${method} ${path} → ${r.status} ${text.slice(0, 300)}`);
    return JSON.parse(text) as T;
  };

  const detail = await call<any>('GET', `/v1/stories/${STORY}`);
  log(`# Playthrough — ${detail.story.title}`);
  log();
  log(`Tap-only. ${TURNS} turns, quality tier ${TIER}, locale ${LOCALE}. ${new Date().toISOString()}`);
  log();
  log(`**Premise.** ${detail.story.premise ?? detail.story.hook ?? ''}`);
  log();
  const named = detail.protagonist?.kind === 'NAMED';
  log(`**Protagonist.** ${named ? `NAMED — ${detail.protagonist.name} (${detail.protagonist.pronouns})` : 'BLANK'}`);
  log();

  const session = await call<any>('POST', `/v1/stories/${STORY}/sessions`, {
    identity: {
      displayName: named ? detail.protagonist.name : 'Robin Vale',
      pronouns: named ? detail.protagonist.pronouns : 'they/them',
      archetypeId: detail.archetypes?.[0]?.id ?? null,
      advanced: {},
      // French narration must agree with somebody. Declared here because the
      // harness is not a person and cannot be asked.
      ...(LOCALE === 'fr' ? { grammar: { gender: 'MASCULINE', thirdPerson: 'il' } } : {}),
    },
    locale: LOCALE,
  });
  const sessionId = session.session.sessionId;
  let revision = session.revision ?? session.session?.revision ?? 0;
  log(`Session \`${sessionId}\``);
  log();

  // The opening scene, before any turn.
  const opening = session.scene ? session : await call<any>('GET', `/v1/sessions/${sessionId}`);
  let cards: any[] =
    opening.suggestions ?? [];
  const openingBlocks =
    opening.openingBlocks ?? opening.recentTurns?.flatMap((t: any) => t.blocks ?? []) ?? [];
  if (openingBlocks.length) {
    log('## Opening');
    log();
    for (const b of openingBlocks) log(`> ${b.text}`);
    log();
  }


  for (let t = 1; t <= TURNS; t += 1) {
    if (!cards.length) {
      const fresh = await call<any>('GET', `/v1/sessions/${sessionId}`);
      cards = fresh.suggestions ?? [];
    }
    log(`---`);
    log();
    log(`## Turn ${t}`);
    log();
    if (!cards.length) {
      log(`**NO CARDS OFFERED.** A tap-only player is stuck here.`);
      break;
    }
    log(`**Cards offered:**`);
    cards.forEach((c: any, i: number) => {
      log(`  ${i + 1}. _(${c.attitude ?? '—'})_ ${c.label ?? c.text}`);
    });
    // Rotate through the cards rather than always taking the first, so the run
    // is not one attitude repeated ten times.
    const pick = cards[(t - 1) % cards.length];
    const chosen = pick.label ?? pick.text;
    log();
    log(`**TAPPED → ${chosen}**`);
    log();

    const submit = async (): Promise<any> =>
      call<any>('POST', `/v1/sessions/${sessionId}/turns`, {
        actionText: chosen,
        qualityTier: TIER,
        sessionRevision: revision,
        selectedSuggestionId: pick.id ?? null,
        voicePreferred: false,
      }, { 'idempotency-key': crypto.randomUUID() });

    // A fresh account's grant does not stretch to fourteen VIVID turns. Claim
    // the daily the way a player would, then try once more.
    let accepted: any;
    try {
      accepted = await submit();
    } catch (error) {
      if (!/INSUFFICIENT_CREDITS/.test(String(error))) throw error;
      // A fresh account's 900 credits buy fifteen VIVID turns and this harness
      // wants more. Topping the ledger up directly is a **harness** affordance,
      // not a product one: it writes the same append-only ledger the wallet
      // writes, so nothing about the economy is bypassed or mocked — the test
      // account simply has more money.
      log('_(harness: topping up the test account so the run can continue at VIVID)_');
      log();
      await topUp(2000);
      accepted = await submit();
    }

    let turn: any = null;
    for (let a = 0; a < 90 && !turn; a += 1) {
      await new Promise((r) => setTimeout(r, 1000));
      try { turn = await call<any>('GET', `/v1/turns/${accepted.turnId}`); } catch { /* not committed */ }
    }
    if (!turn) { log(`**TURN TIMED OUT after 90s.**`); break; }

    for (const b of turn.blocks ?? []) {
      const who = b.speakerName ?? b.speaker ?? null;
      if (b.kind === 'DIALOGUE' && who) log(`**${who}:** ${b.text}`);
      else log(`> ${b.text}`);
      log();
    }

    // `heroImageUrl` is on the **turn**, not on its blocks. Reading it off the
    // blocks reported "no image" for a run that had six, which is how an
    // instrument turns a healthy system into a bug report.
    // Art is generated after the beat commits, so reading it here reports
    // "none" for a turn that is about to have one. Re-read at the end instead.
    imageCheck.push(turn.turnId);
    if (turn.checks?.length) {
      log(`\`checks:\` ${turn.checks.map((c: any) => `${c.label}=${c.outcome}`).join(', ')}`);
    }
    if (turn.stateDeltas?.length) {
      log(`\`moved:\` ${turn.stateDeltas.map((d: any) => d.label).join(' | ')}`);
    }
    log();

    const after = await call<any>('GET', `/v1/sessions/${sessionId}`);
    revision = after.revision ?? revision;
    cards = after.suggestions ?? [];
    // `scene.cast` is the whole cast on purpose — every character keeps a
    // portrait so a line spoken three rooms ago still has a face on it.
    // `scene.presentCharacters` is who is actually in the room. Logging the
    // first and calling it "present" reported the entire Uchiha clan standing
    // in the kitchen.
    const here = (after.scene?.presentCharacters ?? []).map((c: any) => c.name ?? c.id);
    log(`\`clock:\` ${after.scene?.worldTimeLabel ?? '?'}  \`place:\` ${after.scene?.locationName ?? '?'}  \`present:\` ${here.join(', ') || '(nobody)'}`);
    log();
  }

  log(`---`);
  log();
  // Give the art jobs a moment to land, then report what actually exists.
  await new Promise((r) => setTimeout(r, 20_000));
  let withArt = 0;
  for (const id of imageCheck) {
    try {
      const t = await call<any>('GET', `/v1/turns/${id}`);
      if (t.heroImageUrl) withArt += 1;
    } catch { /* ignore */ }
  }
  log(`\`hero frames delivered:\` ${withArt} of ${imageCheck.length} turns`);
  log();
  log(`Session id for \`npm run playtest ${sessionId}\`.`);
  writeFileSync(OUT, out.join('\n'), 'utf8');
  console.log(`\n\nWritten to ${OUT}`);
}

void main().catch((e) => { console.error(e); process.exit(1); });
