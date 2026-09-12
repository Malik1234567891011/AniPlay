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
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { worldTextCoverage } from '@plotbreak/contracts';
import { createGatewayFromEnv } from '@plotbreak/director';
import { FR_TIER_A, FR_TIER_B, glossaryBrief } from '../../packages/director/src/fr-adaptation.js';
import { manifestFor, type ManifestField } from './fr-manifest.js';
import { frenchTypography } from '@plotbreak/i18n';

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
 * The brief asks for curly apostrophes and narrow no-break spaces, and a model
 * complies most of the time — which is not a typography standard, and the
 * misses are invisible in review.
 *
 * The implementation is `frenchTypography` in `@plotbreak/i18n`, shared with the
 * runtime path that normalises generated prose and cards. It had a private
 * copy here first, and the two immediately disagreed: the shared one learned
 * that `https://` must not take a space before its colon, and this one did not.
 * One rule, one place.
 */
function normalise(value: string | string[]): string | string[] {
  return Array.isArray(value) ? value.map(frenchTypography) : frenchTypography(value);
}

/**
 * Ask again, for the ones that came back wrong.
 *
 * Short adjective labels — an archetype's `playstyle`, three words describing
 * the player — are where the midpoint survives every instruction. The model is
 * being asked to describe somebody whose gender it does not know, in two words,
 * and `Patient·e` is the obvious escape. Telling it not to in the brief reduced
 * this from five to two; it did not remove it, because the pressure is
 * structural rather than a matter of attention.
 *
 * So the flagged fields go back with nothing else in the request but them and
 * the rule. Two attempts, then it goes to the human queue — a third would be
 * asking the same question louder.
 */
async function exceptionPass(
  gateway: ReturnType<typeof createGatewayFromEnv>,
  fr: Map<string, string | string[]>,
  fields: ManifestField[],
): Promise<number> {
  if (!gateway) return 0;
  const MIDPOINT = /\p{L}[·‧•]\p{L}|\p{L}\(e\)/u;

  let repaired = 0;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const bad = fields.filter((f) => {
      const value = fr.get(f.path);
      const text = Array.isArray(value) ? value.join(' ') : (value ?? '');
      return MIDPOINT.test(text);
    });
    if (bad.length === 0) break;

    const result = await gateway.generateStructured(
      'writer_fast',
      Adapted,
      [
        {
          role: 'system',
          content: [
            'Tu corriges du français qui contient un point médian. C’est la seule chose à corriger.',
            '',
            'Le point médian est interdit : ni « Patient·e », ni « Patient(e) », ni « Patient.e ».',
            'Ces textes décrivent le joueur, et on ne sait pas qui il est — il n’y a donc personne',
            'avec qui accorder.',
            '',
            'Emploie un nom ou une tournure sans accord :',
            '  « Patient·e »                      → « Patience » ou « Sait attendre »',
            '  « Cérébral·e »                     → « Tête » ou « Réfléchit avant »',
            '  « Jamais reposé·e »                → « Jamais reposé » n’est PAS la réponse —',
            '                                       écris « Toujours à court de sommeil »',
            '  « Physiquement peu impressionnant·e » → « Ne paie pas de mine »',
            '',
            'Garde le sens et la longueur. C’est une étiquette courte, pas une phrase.',
          ].join('\n'),
        },
        {
          role: 'user',
          content: JSON.stringify(
            bad.map((f) => ({ path: f.path, fr: fr.get(f.path) })),
            null,
            1,
          ),
        },
      ],
      { maxTokens: 4000, temperature: 0.5, timeoutMs: 120_000 },
    );

    for (const field of result?.value?.fields ?? []) {
      if (MIDPOINT.test(Array.isArray(field.fr) ? field.fr.join(' ') : field.fr)) continue;
      fr.set(field.path, normalise(field.fr));
      repaired += 1;
    }
  }
  return repaired;
}

/** The overlay file, with the hashes that make staleness detectable. */
function render(storyId: string, title: string, fields: ManifestField[], fr: Map<string, string | string[]>): string {
  const lines: string[] = [];
  lines.push("import { registerWorldText } from '@plotbreak/contracts';");
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

    const repaired = await exceptionPass(gateway, fr, fields);
    if (repaired > 0) console.log(`    repaired ${repaired} field(s) on a second ask`);

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
