// Playtest reader — see docs/token-practices.md. Reads turns from Postgres
// instead of the simulator's accessibility tree: ~800 tokens a turn instead of
// ~4,000, and it carries the media plan and beat plan the UI cannot show.
import pg from 'pg';
import fs from 'node:fs';
const url = fs.readFileSync('/Users/malik/Plotbreak/.env','utf8').match(/DATABASE_URL=(.*)/)[1].trim();
const c = new pg.Client({ connectionString: url });
await c.connect();

const cmd = process.argv[2];
if (cmd === 'latest') {
  const r = await c.query(`select session_id, story_id, created_at from story_sessions order by created_at desc limit 3`);
  console.log(r.rows.map(x => `${x.session_id}  ${x.story_id}`).join('\n'));
} else if (cmd === 'wait') {
  const [sid, want] = [process.argv[3], Number(process.argv[4])];
  for (let i = 0; i < 90; i++) {
    const r = await c.query(`select max(turn_index) m from turns where session_id=$1`, [sid]);
    if (Number(r.rows[0].m) >= want) { console.log('ready', r.rows[0].m); break; }
    await new Promise(res => setTimeout(res, 2000));
  }
} else {
  // argv[2] is the session id in this branch — it is only a subcommand in the
  // two above.
  const [sid, from] = [cmd, Number(process.argv[3] ?? 0)];
  const r = await c.query(
    `select turn_index, action_text, blocks, checks, mutations, state_deltas, suggestions,
            media_plan, hero_image_url, repair_violations, beat_plan
     from turns where session_id=$1 and turn_index >= $2 order by turn_index`, [sid, from]);
  for (const t of r.rows) {
    console.log(`\n${'='.repeat(64)}\nTURN ${t.turn_index}`);
    console.log(`> ${t.action_text}`);
    for (const b of (t.blocks ?? [])) console.log(`  [${b.type}] ${b.text}`);
    const mp = t.media_plan ?? {};
    console.log(`HERO: ${t.hero_image_url ? 'YES' : 'no'} — ${mp.heroImage?.reason ?? '-'}`);
    console.log(`PRESENT: ${(mp.activeCharacterIds ?? []).join(',') || 'nobody'}  EXPR: ${JSON.stringify(mp.expressions ?? {})}`);
    console.log(`CHECKS: ${(t.checks ?? []).map(k => `${k.label}=${k.outcome}`).join(', ') || 'none'}`);
    console.log(`MUT: ${(t.mutations ?? []).map(m => m.type).join(',')}`);
    console.log(`REPAIRS: ${JSON.stringify(t.repair_violations)}`);
    console.log(`SPEAKERS: ${JSON.stringify(t.beat_plan?.speakerOrder ?? [])}`);
    console.log(`CARDS:\n  - ${(t.suggestions ?? []).map(s => s.text + `   {${s.intentHint}}`).join('\n  - ')}`);
  }
}
await c.end();
