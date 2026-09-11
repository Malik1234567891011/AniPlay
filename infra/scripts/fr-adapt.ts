/**
 * Write a world in French.
 *
 *   npm run fr:adapt -- --world=story_hush_house
 *   npm run fr:adapt -- --batch=4            # the four least-covered worlds
 *   npm run fr:adapt -- --world=... --tier=A # one tier only
 *
 * Reads the manifest, sends each tier to the model under its own brief, and
 * writes `packages/test-fixtures/src/fr/<world>.fr.ts`.
 *
 * ## Why the two tiers are two different calls
 *
 * Not for tidiness. Tier A asks for authorship — small groups, the full style
 * brief, room to think about one voice at a time — and Tier B asks for accurate
 * meaning in bulk. Sending them together means either paying Tier A prices for
 * a hidden chronology or giving a character's voice the attention a chronology
 * deserves. The first is waste and the second is the thing that makes a
 * localization read translated.
 *
 * ## Staleness
 *
 * Every field carries the hash of the English it was written from. When English
 * moves, `npm run fr:stale` says which French is now describing a world that no
 * longer exists — rather than the French quietly remaining wrong forever.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';
import { worldTextCoverage } from '@aniplay/contracts';
import { createGatewayFromEnv } from '@aniplay/director';
import { FR_TIER_A, FR_TIER_B, glossaryBrief } from '../../packages/director/src/fr-adaptation.js';
import { manifestFor, type ManifestField } from './fr-manifest.js';

const ROOT = new URL('../..', import.meta.url).pathname.replace(/\/$/, '');
const OUT_DIR = join(ROOT, 'packages/test-fixtures/src/fr');

/**
 * How many fields go in one request.
 *
 * Tier A is small on purpose: a model asked for twelve voices at once writes
 * twelve variations of one voice, which is precisely the homogenisation this
 * whole workflow exists to avoid. Tier B is large because nothing there is
 * competing for the same attention.
 */
const BATCH = { A: 10, B: 40 } as const;

const Adapted = z
  .object({
    fields: z.array(
      z.object({ path: z.string(), fr: z.union([z.string(), z.array(z.string())]) }).strict(),
    ),
  })
  .strict();

function worldBrief(story: { title: string; premise: string; rules: { toneGuide: string } }): string {
  return [
    `MONDE : ${story.title}`,
    '',
    'Prémisse (en anglais, pour que tu saches de quoi il s’agit) :',
    story.premise.slice(0, 1200),
    '',
    'Ton :',
    story.rules.toneGuide.slice(0, 600),
  ].join('\n');
}

async function adaptBatch(
  gateway: ReturnType<typeof createGatewayFromEnv>,
  tier: 'A' | 'B',
  fields: ManifestField[],
  brief: string,
): Promise<Map<string, string | string[]>> {
  const out = new Map<string, string | string[]>();
  if (!gateway) throw new Error('No model gateway. Set OPENAI_API_KEY or ANTHROPIC_API_KEY.');

  const size = BATCH[tier];
  for (let i = 0; i < fields.length; i += size) {
    const slice = fields.slice(i, i + size);
    const payload = slice.map((f) => ({ path: f.path, en: f.english }));

    let result;
    try {
      result = await gateway.generateStructured(
      'writer_fast',
      Adapted,
      [
        { role: 'system', content: tier === 'A' ? FR_TIER_A : FR_TIER_B },
        { role: 'system', content: glossaryBrief() },
        { role: 'system', content: brief },
        {
          role: 'user',
          content: [
            'Adapte chaque champ. Rends exactement la même liste de `path`, dans le même ordre.',
            'Un champ dont la valeur anglaise est une liste rend une liste de la même longueur.',
            '',
            'Les identifiants, les nombres et les noms propres de personnes ne changent jamais.',
            '',
            JSON.stringify(payload, null, 1),
          ].join('\n'),
        },
      ],
        { maxTokens: 8000, temperature: tier === 'A' ? 0.9 : 0.4, timeoutMs: 180_000 },
      );
    } catch (error) {
      throw new Error(`${tier} batch at ${i} failed: ${String(error).slice(0, 400)}`);
    }

    // Loud. A silently empty result made the script report "wrote 0 of 544
    // fields" and exit successfully, which is the worst possible shape for a
    // failure in a job somebody leaves running.
    // `generateStructured` returns `{ value, invocation }` — the invocation
    // carries the cost and latency the ledger wants. The parsed object is
    // `value`, and reading `result.fields` got `undefined` while reporting
    // success, which is how the first run wrote a file with nothing in it.
    const adapted = result?.value;
    if (!adapted || adapted.fields.length === 0) {
      throw new Error(
        `The model returned nothing for ${slice.length} ${tier} fields at offset ${i}.`,
      );
    }
    for (const field of adapted.fields) out.set(field.path, normalise(field.fr));
    process.stdout.write(`    ${tier}: ${Math.min(i + size, fields.length)}/${fields.length}\r`);
  }
  process.stdout.write('\n');
  return out;
}

/**
 * French typography, applied as a rule rather than asked for as a favour.
 *
 * The brief says "apostrophe courbe, espace insécable avant ? ! ; :" and a
 * model obeys that most of the time. Most of the time is not a typography
 * standard, and the misses are invisible in review — a straight apostrophe in
 * one topic string out of four hundred.
 *
 * These are deterministic transformations with no judgement in them, so they
 * belong in code. What is left for the model is the writing.
 */
function normaliseTypography(value: string): string {
  return (
    value
      // Apostrophe: only between letters, so a straight quote used as a quote
      // mark is left for the QA queue rather than silently becoming an
      // apostrophe.
      .replace(/(\p{L})'(\p{L})/gu, '$1\u2019$2')
      // A narrow no-break space before the two-part punctuation marks, unless
      // one is already there. `\u202f` is the correct one; the renderer folds
      // it to `\u00a0` for fonts that lack it.
      .replace(/([^\s\u00a0\u202f])\s?([?!;:])/gu, (match, before: string, mark: string) =>
        // Not inside a URL or a time — `10:30` and `https://` must survive.
        /\d/.test(before) && mark === ':' ? match : `${before}\u202f${mark}`,
      )
      // Guillemets take the same space on the inside.
      .replace(/«\s*/g, '«\u202f')
      .replace(/\s*»/g, '\u202f»')
  );
}

function normalise(value: string | string[]): string | string[] {
  return Array.isArray(value) ? value.map(normaliseTypography) : normaliseTypography(value);
}

/** The overlay file, with the hashes that make staleness detectable. */
function render(storyId: string, title: string, fields: ManifestField[], fr: Map<string, string | string[]>): string {
  const lines: string[] = [];
  lines.push("import { registerWorldText } from '@aniplay/contracts';");
  lines.push('');
  lines.push('/**');
  lines.push(` * ${title}, in French.`);
  lines.push(' *');
  lines.push(' * Written under `packages/director/src/fr-adaptation.ts` — the shared house');
  lines.push(' * style, the glossary, and the tier brief. Tier A was authored (the wording is');
  lines.push(' * the product); tier B was adapted for meaning.');
  lines.push(' *');
  lines.push(' * `sourceHash` on each entry is the English it was written from. When English');
  lines.push(' * moves, `npm run fr:stale` says which of these now describes a world that no');
  lines.push(' * longer exists.');
  lines.push(' */');
  lines.push('registerWorldText(\'fr\', {');
  lines.push(`  storyId: ${JSON.stringify(storyId)},`);
  lines.push('  text: {');

  for (const field of fields) {
    const value = fr.get(field.path);
    if (value === undefined) continue;
    lines.push(`    // ${field.tier} · ${field.sourceHash}`);
    lines.push(`    ${JSON.stringify(field.path)}: ${JSON.stringify(value, null, 0)},`);
  }

  lines.push('  },');
  lines.push('});');
  return lines.join('\n') + '\n';
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const only = argv.find((a) => a.startsWith('--world='))?.slice('--world='.length);
  const batchSize = Number(argv.find((a) => a.startsWith('--batch='))?.slice('--batch='.length) ?? 0);
  const tierOnly = argv.find((a) => a.startsWith('--tier='))?.slice('--tier='.length) as 'A' | 'B' | undefined;

  const catalogue = LAUNCH_CATALOG as unknown as Array<{
    storyId: string; title: string; premise: string; rules: { toneGuide: string };
  }>;

  let worlds = only
    ? catalogue.filter((w) => w.storyId === only)
    : catalogue.filter((w) => worldTextCoverage('fr', w.storyId) === 0);
  if (batchSize > 0) worlds = worlds.slice(0, batchSize);

  if (worlds.length === 0) {
    console.log('Nothing to do — every world asked for already has French text.');
    return;
  }

  const gateway = createGatewayFromEnv();
  mkdirSync(OUT_DIR, { recursive: true });

  for (const world of worlds) {
    const fields = manifestFor(world).filter((f) => f.tier !== 'C');
    const a = fields.filter((f) => f.tier === 'A');
    const b = fields.filter((f) => f.tier === 'B');
    console.log(`\n${world.title} — ${a.length} A, ${b.length} B`);

    const brief = worldBrief(world);
    const fr = new Map<string, string | string[]>();
    if (tierOnly !== 'B') for (const [k, v] of await adaptBatch(gateway, 'A', a, brief)) fr.set(k, v);
    if (tierOnly !== 'A') for (const [k, v] of await adaptBatch(gateway, 'B', b, brief)) fr.set(k, v);

    const slug = world.storyId.replace(/^story_/, '').replace(/_/g, '-');
    const path = join(OUT_DIR, `${slug}.fr.ts`);
    if (existsSync(path) && !only) {
      console.log(`  ${slug}.fr.ts exists; skipping. Pass --world=${world.storyId} to rewrite.`);
      continue;
    }
    writeFileSync(path, render(world.storyId, world.title, fields, fr), 'utf8');
    console.log(`  wrote ${slug}.fr.ts — ${fr.size} of ${fields.length} fields`);
  }

  console.log('\nRegister the new files in packages/test-fixtures/src/index.ts, then run:');
  console.log('  npm run fr:qa');
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
