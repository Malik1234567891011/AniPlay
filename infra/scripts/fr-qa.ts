/**
 * Find the suspicious French. Do not pretend to judge it.
 *
 *   npm run fr:qa
 *   npm run fr:qa -- --world=story_understudy
 *
 * This is a net, not a grader. Every check below answers "does this look like
 * something a human should read again", and the output is an **exception
 * queue** rather than a verdict. A world that passes every check can still read
 * translated, and the only test for that is somebody reading it.
 *
 * What it is good at is the failure modes that are mechanical and invisible:
 * an English sentence that survived a batch, a placeholder that got translated
 * into nothing, `vous` appearing in a world that tutoies, four characters who
 * came out of one call sounding identical.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';
import { localizeStory, type StoryVersion } from '@aniplay/contracts';
import { FR_GLOSSARY } from '../../packages/director/src/fr-adaptation.js';

const ROOT = new URL('../..', import.meta.url).pathname.replace(/\/$/, '');
const FR_DIR = join(ROOT, 'packages/test-fixtures/src/fr');

interface Finding {
  readonly world: string;
  readonly path: string;
  readonly code: string;
  readonly detail: string;
}

/**
 * Words that are English and are not also French.
 *
 * Deliberately short and boring. A long list catches proper nouns, brand names
 * and the loanwords French genuinely uses, and then the queue is full of things
 * that are fine — which is how a net stops being read.
 */
const ENGLISH_ONLY =
  /\b(the|and|with|your|from|that|this|what|when|there|about|would|could|should|they|their|because|through|something|nothing|someone|everyone|never|always|before|after|while|which|where|whose|been|being|does|doesn't|didn't|won't|can't)\b/i;

/** Structures that are English wearing French words. */
const CALQUES: Array<[RegExp, string]> = [
  [/\bréaliser que\b/i, '« réaliser » pour « se rendre compte » est un anglicisme'],
  [/\bsupporter (?:son|sa|ses|le|la|les)\b/i, '« supporter » pour « soutenir » est un anglicisme'],
  [/\béventuellement\b/i, '« éventuellement » ne veut pas dire « finalement »'],
  [/\bopportunité de\b/i, '« opportunité » pour « occasion »'],
  [/\bbasé sur\b/i, '« basé sur » pour « fondé sur » / « d’après »'],
  [/\ben charge de\b/i, '« en charge de » pour « chargé de »'],
  [/\bde manière (?:très|assez) \w+ment\b/i, 'adverbe empilé, tournure anglaise'],
  [/\bil est important de noter\b/i, 'formule de rapport, pas de fiction'],
  [/\bà travers (?:la|le|les) \w+ (?:de|du|des)\b/i, '« à travers » calqué sur "through"'],
];

/** The midpoint, in every spelling. */
const MIDPOINT = /\p{L}[·‧•]\p{L}|\p{L}\(e\)|\p{L}\.e\b/u;

/** `{name}`, `{count}` and friends must survive verbatim. */
const PLACEHOLDER = /\{[a-zA-Z_][a-zA-Z0-9_]*\}/g;

function values(node: unknown, prefix: string, out: Array<[string, string]>): void {
  if (typeof node === 'string') {
    out.push([prefix, node]);
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((entry, i) => values(entry, `${prefix}[${i}]`, out));
    return;
  }
  if (typeof node === 'object' && node !== null) {
    for (const [key, value] of Object.entries(node)) {
      values(value, prefix ? `${prefix}.${key}` : key, out);
    }
  }
}

/**
 * Do these people sound like different people?
 *
 * A model asked for several voices in one call tends to write several
 * variations of one voice, and that is the exact failure batching risks. The
 * measure is crude on purpose: the share of words a pair of `speechStyle`
 * fields have in common. It cannot tell good writing from bad, only same from
 * different, which is the question being asked.
 */
function voiceOverlap(a: string, b: string): number {
  const words = (text: string): Set<string> =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^\p{L}\s]/gu, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 4),
    );
  const left = words(a);
  const right = words(b);
  if (left.size === 0 || right.size === 0) return 0;
  const shared = [...left].filter((w) => right.has(w)).length;
  return shared / Math.min(left.size, right.size);
}

function check(story: StoryVersion, findings: Finding[], gaps: string[]): void {
  const fr = localizeStory(story, 'fr');
  if (fr === story) return; // no overlay; nothing to check

  const pairs: Array<[string, string]> = [];
  values(fr, '', pairs);

  const englishPairs: Array<[string, string]> = [];
  values(story, '', englishPairs);
  const english = new Map(englishPairs);

  for (const [path, text] of pairs) {
    // Tier C is meant to stay English.
    if (/(^|\.)id$|Id$|artDirection|affordances|assetKey|coverImage|keyArt|publishedAt/.test(path)) continue;
    // Names never travel, so an English-looking name is correct.
    if (/\.name$|^title$|creatorName/.test(path)) continue;

    const source = english.get(path);

    // A field the overlay does not carry falls back to English, which is the
    // documented intermediate state — not a language defect. Running the
    // English-leakage and glossary checks over it reported seventy-seven
    // "errors" that were all the fallback working correctly, and a queue full
    // of things that are fine is a queue nobody reads.
    //
    // Counted as coverage instead, and reported once at the end.
    if (source === text) {
      if (text.length > 40 && /\s/.test(text)) gaps.push(`${story.title} · ${path}`);
      continue;
    }

    if (ENGLISH_ONLY.test(text)) {
      findings.push({ world: story.title, path, code: 'ENGLISH', detail: text.slice(0, 90) });
    }
    if (MIDPOINT.test(text)) {
      findings.push({ world: story.title, path, code: 'MIDPOINT', detail: text.slice(0, 90) });
    }
    for (const [pattern, why] of CALQUES) {
      if (pattern.test(text)) {
        findings.push({ world: story.title, path, code: 'CALQUE', detail: `${why} — ${text.slice(0, 70)}` });
      }
    }
    // Straight quotes and apostrophes.
    if (/["']/.test(text) && !/\{/.test(text)) {
      findings.push({ world: story.title, path, code: 'TYPOGRAPHY', detail: text.slice(0, 90) });
    }
    // Placeholders must survive exactly.
    if (typeof source === 'string') {
      const before = (source.match(PLACEHOLDER) ?? []).sort().join(',');
      const after = (text.match(PLACEHOLDER) ?? []).sort().join(',');
      if (before !== after) {
        findings.push({
          world: story.title, path, code: 'PLACEHOLDER',
          detail: `en had ${before || '(none)'}, fr has ${after || '(none)'}`,
        });
      }
    }
  }

  // Structural parity: the overlay must not have changed the shape of anything.
  const shape = (s: StoryVersion): string =>
    JSON.stringify({
      characters: s.characters.map((c) => c.id),
      locations: s.locations.map((l) => l.id),
      abilities: s.abilities.map((a) => a.id),
      quests: s.quests.map((q) => q.id),
      startingLocationId: s.rules.startingLocationId,
    });
  if (shape(fr) !== shape(story)) {
    findings.push({ world: story.title, path: '(structure)', code: 'STRUCTURE', detail: 'ids differ between locales' });
  }

  // Glossary: a decided term must not have been re-invented.
  for (const entry of FR_GLOSSARY) {
    if (entry.decision === 'KEEP') continue;
    for (const [path, text] of pairs) {
      // Overlaid fields only, for the same reason as above.
      if (english.get(path) === text) continue;
      if (!new RegExp(`\\b${entry.en}\\b`, 'i').test(text)) continue;
      if (/(^|\.)id$|artDirection|\.name$/.test(path)) continue;
      findings.push({
        world: story.title, path, code: 'GLOSSARY',
        detail: `"${entry.en}" should be "${entry.fr}"`,
      });
    }
  }

  // Voices that came out of one call sounding like one voice.
  const styles = fr.characters
    .map((c) => [c.id, c.speechStyle] as const)
    .filter(([, style]) => typeof style === 'string' && style.length > 20);
  for (let i = 0; i < styles.length; i += 1) {
    for (let j = i + 1; j < styles.length; j += 1) {
      const overlap = voiceOverlap(styles[i]![1], styles[j]![1]);
      if (overlap > 0.5) {
        findings.push({
          world: story.title,
          path: `characters.${styles[i]![0]} / ${styles[j]![0]}`,
          code: 'VOICE',
          detail: `${Math.round(overlap * 100)}% shared vocabulary between two speech styles`,
        });
      }
    }
  }
}

function main(): void {
  const only = process.argv.slice(2).find((a) => a.startsWith('--world='))?.slice('--world='.length);

  // Importing the overlays is what registers them.
  for (const file of readdirSync(FR_DIR)) {
    if (file.endsWith('.fr.ts')) readFileSync(join(FR_DIR, file), 'utf8');
  }

  const findings: Finding[] = [];
  const gaps: string[] = [];
  const worlds = (LAUNCH_CATALOG as unknown as StoryVersion[]).filter(
    (w) => !only || w.storyId === only,
  );
  for (const world of worlds) check(world, findings, gaps);

  if (gaps.length > 0) {
    console.log(`Coverage: ${gaps.length} prose fields still fall back to English.`);
    console.log('That is the documented intermediate state, not a defect.\n');
  }

  if (findings.length === 0) {
    console.log('Nothing suspicious. That is not the same as good — read a transcript.');
    return;
  }

  const byCode = new Map<string, Finding[]>();
  for (const finding of findings) {
    byCode.set(finding.code, [...(byCode.get(finding.code) ?? []), finding]);
  }

  for (const [code, list] of [...byCode].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n${code} — ${list.length}`);
    for (const finding of list.slice(0, 12)) {
      console.log(`  ${finding.world} · ${finding.path}`);
      console.log(`    ${finding.detail}`);
    }
    if (list.length > 12) console.log(`  … and ${list.length - 12} more`);
  }

  console.log(`\n${findings.length} to look at. This is a queue, not a verdict.`);
  process.exitCode = 1;
}

main();
