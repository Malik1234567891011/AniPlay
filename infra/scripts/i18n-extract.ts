/**
 * The string inventory, reproduced rather than remembered.
 *
 * `docs/localization/fr-FR/UI_AUDIT.md` is an inventory of every user-facing
 * English literal in the repo, and an inventory written by hand is out of date
 * the day after it is written. This regenerates it.
 *
 * It is a **reporting tool, not a codemod.** It changes nothing. Its jobs:
 *
 *   1. Reproduce the audit, so the numbers in UI_AUDIT.md can be checked.
 *   2. Tell you when a new English literal has been added after the catalogue
 *      was frozen, which is how a translated app grows English again.
 *   3. `--gate` fails the build on an un-keyed client string, which is the
 *      step 3 gate in the Phase 2 sequence.
 *   4. `--worlds` measures the authored world prose, which is the number that
 *      decides the translation schedule.
 *
 * A literal stops being a candidate when it is **keyed** — replaced by
 * `t('some.key')`, whose argument is a dotted lower-case key the candidate
 * filter already rejects. A literal that genuinely must not be translated is
 * marked in place:
 *
 *   // i18n-exempt: the language picker names languages in their own language
 *   const LANGUAGE_NAMES = { en: 'English', fr: 'Français' };
 *
 * The reason is mandatory and is printed by `--exempt`, so the exemption list
 * stays an argued list rather than a silence.
 *
 * Usage:
 *   npm run i18n:extract              # the UI inventory
 *   npm run i18n:extract -- --gate    # exit 1 if any client string is un-keyed
 *   npm run i18n:extract -- --exempt  # list every exemption and its reason
 *   npm run i18n:extract -- --json    # machine-readable
 *   npm run i18n:extract -- --worlds
 *   npm run i18n:extract -- --file apps/mobile/src/screens/Session.tsx
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('../..', import.meta.url).pathname.replace(/\/$/, '');

/** Where user-facing English is known to live. */
const ROOTS = [
  'apps/mobile/src',
  'packages/ui/src',
  'services/api/src',
  'packages/engine/src',
  'packages/contracts/src',
  'packages/director/src',
];

const SOURCE = /\.(tsx?|jsx?)$/;
const SKIP_FILE = /\.(spec|test)\.[tj]sx?$/;

/**
 * A literal is a candidate when it reads like a sentence rather than an
 * identifier. Deliberately generous — the report is read by a person, and a
 * false positive costs one line while a false negative ships English.
 */
function isCandidate(value: string): boolean {
  if (value.length < 3 || value.length > 400) return false;
  if (!/[A-Za-z]/.test(value)) return false;
  // Identifiers, routes, keys, tokens, urls, mime types, enum values.
  if (/^[a-z0-9_]+$/.test(value)) return false;
  if (/^[A-Z0-9_]+$/.test(value)) return false;
  if (/^[a-z]+([A-Z][a-z0-9]*)+$/.test(value)) return false;
  if (/^(https?:|\/|\.\/|\.\.\/|#|@|data:|file:)/.test(value)) return false;
  if (/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(value)) return false;
  if (/^#[0-9a-f]{3,8}$/i.test(value)) return false;
  if (/^\d+(\.\d+)?(px|%|em|rem|deg|s|ms)?$/.test(value)) return false;
  // A sentence has a space, or is a capitalised word long enough to be a label.
  return /\s/.test(value) || /^[A-Z][a-z]{2,}$/.test(value);
}

/** Lines that are never user-facing, however sentence-shaped they look. */
const NOISE_LINE =
  /^\s*(import|export\s+\*|\/\/|\*|\/\*)|require\(|console\.(log|warn|error|debug)|describe\(|it\(|expect\(/;

/**
 * Navigation route names. `navigation.navigate('Session')` is an identifier
 * that happens to be capitalised, and it is not shown to anybody.
 *
 * Matched per-literal rather than per-line, because a line can carry a route
 * name and a label at once — `<LinkRow label="Wallet & purchases"
 * onPress={() => navigation.navigate('Wallet')} />` is one of each.
 */
const ROUTE_CALL = /(?:navigate|replace|push|addListener|getParent|reset)\(\s*(['"])([^'"]+)\1/g;

/** `// i18n-exempt: <reason>` on the line, or on the line above it. */
const EXEMPT = /\/\/\s*i18n-exempt:\s*(.+?)\s*$/;

function routeNamesOn(line: string): Set<string> {
  const names = new Set<string>();
  for (const match of line.matchAll(ROUTE_CALL)) if (match[2]) names.add(match[2]);
  return names;
}

type Layer = 'client' | 'server' | 'model';

interface Hit {
  readonly file: string;
  readonly line: number;
  readonly text: string;
  readonly a11y: boolean;
  readonly layer: Layer;
  /** Set when the line carries an `i18n-exempt:` reason. */
  readonly exemptReason: string | null;
}

/**
 * Three layers, because they are three different pieces of work.
 *
 * `client`  — the message catalogue. Translated.
 * `server`  — rail titles, attribute names, clocks. Must travel as keys, or a
 *             French build still says `Trending now` (UI_AUDIT §5).
 * `model`   — policies and prompts. **Not translated: authored in French.**
 *             A translated policy carries the English examples, and the policy
 *             is mostly examples (LOCALIZATION_ARCHITECTURE §4).
 */
function layerOf(file: string): Layer {
  if (file.startsWith('apps/') || file.startsWith('packages/ui/')) return 'client';
  if (file.startsWith('services/')) return 'server';
  return 'model';
}

function walk(dir: string, out: string[]): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SOURCE.test(entry) && !SKIP_FILE.test(entry)) out.push(full);
  }
  return out;
}

const LITERAL = /(['"`])((?:\\.|(?!\1)[^\\\n]){3,400})\1/g;

function extract(file: string): Hit[] {
  const hits: Hit[] = [];
  const source = readFileSync(file, 'utf8');
  const lines = source.split('\n');

  lines.forEach((line, index) => {
    if (NOISE_LINE.test(line)) return;
    const a11y = /accessibility(Label|Hint|Value)/.test(line);
    const routes = routeNamesOn(line);
    // The reason may sit on the line itself or on the line above, because a
    // JSX prop is often too long to carry a trailing comment.
    const exemptReason =
      line.match(EXEMPT)?.[1] ?? (lines[index - 1] ?? '').match(EXEMPT)?.[1] ?? null;

    for (const match of line.matchAll(LITERAL)) {
      const value = match[2] ?? '';
      if (!isCandidate(value)) continue;
      if (routes.has(value)) continue;
      const rel = relative(ROOT, file);
      hits.push({ file: rel, line: index + 1, text: value, a11y, layer: layerOf(rel), exemptReason });
    }
  });

  return hits;
}

/** The authored-content number, which decides the translation schedule. */
async function worlds(): Promise<void> {
  const mod = (await import('@aniplay/test-fixtures')) as { LAUNCH_CATALOG: readonly unknown[] };
  const NOT_TEXT = /^(id|.*Id|.*Ids|assetKey|.*Key|schemaVersion)$/;

  let grandTotal = 0;
  const rows: Array<{ title: string; chars: number; fields: number }> = [];

  for (const world of mod.LAUNCH_CATALOG) {
    let chars = 0;
    let fields = 0;
    const visit = (value: unknown): void => {
      if (typeof value === 'string') {
        if (/\s/.test(value) || value.length > 24) {
          fields += 1;
          chars += value.length;
        }
        return;
      }
      if (Array.isArray(value)) {
        for (const item of value) visit(item);
        return;
      }
      if (value && typeof value === 'object') {
        for (const [key, item] of Object.entries(value)) {
          if (!NOT_TEXT.test(key)) visit(item);
        }
      }
    };
    visit(world);
    const title = String((world as { title?: unknown }).title ?? '?');
    rows.push({ title, chars, fields });
    grandTotal += chars;
  }

  rows.sort((a, b) => b.chars - a.chars);
  console.log('Authored world content — what has to be WRITTEN in French, not translated.\n');
  console.log('World'.padEnd(26) + 'chars'.padStart(9) + 'prose fields'.padStart(14));
  for (const row of rows) {
    console.log(row.title.padEnd(26) + String(row.chars).padStart(9) + String(row.fields).padStart(14));
  }
  console.log('\n' + 'TOTAL'.padEnd(26) + String(grandTotal).padStart(9));
  console.log(`≈ ${Math.round(grandTotal / 5.5).toLocaleString('en-US')} words across ${rows.length} worlds.`);
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (argv.includes('--worlds')) {
    await worlds();
    return;
  }

  const only = argv.includes('--file') ? argv[argv.indexOf('--file') + 1] : undefined;
  const files = only
    ? [join(ROOT, only)]
    : ROOTS.flatMap((dir) => walk(join(ROOT, dir), []));

  const all = files.flatMap(extract);
  const hits = all.filter((h) => h.exemptReason === null);
  const exempt = all.filter((h) => h.exemptReason !== null);

  if (argv.includes('--json')) {
    console.log(JSON.stringify(hits, null, 2));
    return;
  }

  if (argv.includes('--exempt')) {
    console.log('Strings deliberately left un-keyed, and why.\n');
    for (const hit of exempt) {
      console.log(`${hit.file}:${hit.line}\n  ${JSON.stringify(hit.text)}\n  — ${hit.exemptReason}\n`);
    }
    console.log(`${exempt.length} exemptions.`);
    return;
  }

  /**
   * The step 3 gate: **zero un-keyed user-facing literals on the client.**
   *
   * Only the client layer fails the build. `server` strings are step 4's work
   * and travel as keys rather than living in this catalogue, and `model`
   * strings are prompts and policies, which are authored in French rather than
   * translated and must never be keyed.
   */
  if (argv.includes('--gate')) {
    const unkeyed = hits.filter((h) => h.layer === 'client');
    for (const hit of unkeyed) {
      console.log(`${hit.file}:${hit.line}  ${JSON.stringify(hit.text)}`);
    }
    if (unkeyed.length === 0) {
      console.log(
        `No un-keyed client strings. ${exempt.length} exempt, ` +
          `${all.filter((h) => h.layer === 'server').length} server (step 4), ` +
          `${all.filter((h) => h.layer === 'model').length} model (authored, never keyed).`,
      );
      return;
    }
    console.log(
      `\n${unkeyed.length} un-keyed client strings. Each is a string a French ` +
        'player would read in English.\nKey it, or mark it with ' +
        '`// i18n-exempt: <reason>` if it genuinely must not be translated.',
    );
    process.exitCode = 1;
    return;
  }

  const byFile = new Map<string, Hit[]>();
  for (const hit of hits) {
    const bucket = byFile.get(hit.file) ?? [];
    bucket.push(hit);
    byFile.set(hit.file, bucket);
  }

  const ranked = [...byFile.entries()].sort((a, b) => b[1].length - a[1].length);

  console.log('English literals. Reporting only — nothing was changed.\n');
  console.log('File'.padEnd(52) + 'layer'.padStart(7) + 'count'.padStart(7) + '  a11y');
  for (const [file, list] of ranked) {
    const a11y = list.filter((h) => h.a11y).length;
    console.log(
      file.padEnd(52) +
        layerOf(file).padStart(7) +
        String(list.length).padStart(7) +
        '  ' +
        String(a11y).padStart(4),
    );
  }

  const count = (layer: Layer): number => hits.filter((h) => h.layer === layer).length;
  console.log(
    `\n${hits.length} candidates in ${ranked.length} files.\n` +
      `  client ${count('client')}  — the message catalogue\n` +
      `  server ${count('server')}  — must travel as keys, or French still says "Trending now"\n` +
      `  model  ${count('model')}  — NOT translated: authored in French\n` +
      `  ${hits.filter((h) => h.a11y).length} accessibility labels — read aloud, never on screen, ` +
      'and the easiest to miss.',
  );
  console.log('\nRun with --file <path> to list a single file, or --json for the raw hits.');
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
