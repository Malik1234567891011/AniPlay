import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Only the `Intl` this package actually installs may be used.
 *
 * `polyfill.ts` force-installs five areas: getCanonicalLocales, Locale,
 * PluralRules, NumberFormat, DateTimeFormat and ListFormat. Anything else in
 * `Intl` is whatever the engine happens to ship, and on Hermes that is a
 * gamble the app loses badly: `Intl.RelativeTimeFormat` in `Comments.tsx`
 * **segfaulted the app** every time a player opened a story from Discover. The
 * crash surfaced as a SIGSEGV inside React Native's mounting transaction with
 * no JS error, which cost a long bisect to trace back to one line.
 *
 * `search.ts` shows the alternative: it builds an `Intl.Collator` inside a
 * try/catch, probes it against the two cases it needs, and falls back to
 * ordinary string comparison when the engine's version is not trustworthy.
 * Unpolyfilled `Intl` is allowed there precisely because it is guarded.
 */

const ROOT = new URL('../../..', import.meta.url).pathname.replace(/\/$/, '');

/** Installed by `polyfill.ts`, so safe to construct anywhere. */
const POLYFILLED = ['NumberFormat', 'DateTimeFormat', 'PluralRules', 'ListFormat', 'Locale'];

/** Probed and guarded at its one call site, and nowhere else. */
const GUARDED: Record<string, string> = { Collator: 'packages/i18n/src/search.ts' };

function sources(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) sources(full, out);
    else if (/\.tsx?$/.test(entry) && !entry.endsWith('.spec.ts')) out.push(full);
  }
  return out;
}

describe('Intl areas the polyfill does not install', () => {
  it('are not constructed anywhere unguarded', () => {
    const offenders: string[] = [];
    for (const dir of ['apps/mobile/src', 'packages/i18n/src', 'packages/ui/src']) {
      for (const file of sources(join(ROOT, dir))) {
        const relative = file.slice(ROOT.length + 1);
        if (relative.endsWith('polyfill.ts') || relative.endsWith('conformance.ts')) continue;
        // Construction only. `Intl.NumberFormatOptions` is a type, and a doc
        // comment naming the hazard is the opposite of committing it.
        for (const match of readFileSync(file, 'utf8').matchAll(/\bnew\s+Intl\.([A-Z][A-Za-z]*)\s*\(/g)) {
          const area = match[1]!;
          if (POLYFILLED.includes(area)) continue;
          if (GUARDED[area] === relative) continue;
          offenders.push(`${relative}: Intl.${area}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
