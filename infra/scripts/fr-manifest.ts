/**
 * What is localizable, where it lives, and how much care it needs.
 *
 *   npm run fr:manifest            # the table
 *   npm run fr:manifest -- --json  # the manifest itself
 *   npm run fr:manifest -- --world=story_hush_house
 *
 * ## Why tiers
 *
 * Twenty-three worlds carry roughly 46,000 words of authored prose, and
 * treating every sentence as literature is how a localization takes a year.
 * But the answer is not to lower the bar — it is to notice that the source
 * contains three genuinely different kinds of content:
 *
 *   **A — style-bearing.** Changing the wording changes how the French game
 *   *sounds*. A hook, an opening, a `speechStyle`, a `voiceSample`. These are
 *   written in French by somebody asking "how would a French writer have put
 *   this if English had never existed".
 *
 *   **B — semantic.** The model needs to know what it means; the exact phrasing
 *   does not shape any voice. A secret, a motivation, a chronology, an ability's
 *   mechanics. Accurate, idiomatic, unfussy.
 *
 *   **C — language-neutral.** Ids, enums, thresholds, asset keys — and
 *   `artDirection`, which is a prompt for an image model trained on English.
 *   Translating these is parity theatre.
 *
 * The classifier is **by path**, not by content, because a field's job is a
 * property of where it sits in the schema rather than of what happens to be in
 * it today. `hiddenDrives` is B whatever it says.
 *
 * ## The one rule that decides a hard case
 *
 * A field is not B merely because the player never sees it. If its wording
 * conditions how characters speak, how prose sounds, or how choices are
 * written, it is A. `speechStyle` is invisible and is the most A field in the
 * catalogue.
 */
import { writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';
import { worldTextCoverage } from '@aniplay/contracts';

export type Tier = 'A' | 'B' | 'C';

export interface ManifestField {
  readonly storyId: string;
  /** The overlay path. Arrays are addressed by id, never by index. */
  readonly path: string;
  readonly tier: Tier;
  readonly english: string | readonly string[];
  readonly chars: number;
  /**
   * A hash of the English, so a later change is detectable.
   *
   * The whole point of an overlay is that English keeps moving. Without this
   * the French silently describes a world that no longer exists.
   */
  readonly sourceHash: string;
  /** Present in the fr overlay already. */
  readonly translated: boolean;
}

/**
 * Style-bearing. The wording is the product.
 *
 * `publicTraits` and `topics` are here because both reach generated text
 * verbatim — a topic is a noun phrase a character will actually say, and a
 * trait is how the cast carousel describes somebody.
 */
const TIER_A = [
  /^hook$/,
  /^fantasyLabel$/,
  /^premise$/,
  /^creatorNote$/,
  /^opening$/,
  /^openingSuggestions$/,
  /^rules\.toneGuide$/,
  /^characters\.[^.]+\.(speechStyle|socialStyle|voiceSamples|cardBlurb|publicTraits|topics|role)$/,
  /^archetypes\.[^.]+\.(name|blurb|summary|playstyle)$/,
  /^endings\.[^.]+\.(title|epilogue|summary)$/,
  /^abilities\.[^.]+\.name$/,
  /^locations\.[^.]+\.(name|shortName)$/,
  /^items\.[^.]+\.name$/,
  /^mechanicsChips$/,
];

/**
 * Semantic. The model needs the meaning; nothing here shapes a voice.
 */
const TIER_B = [
  /^rules\.hardCanon$/,
  /^characters\.[^.]+\.(hiddenDrives|values|fears|boundaries|goals|appearance|visualHook)$/,
  /^characters\.[^.]+\.secrets\.[^.]+\.(fact|revealHint)$/,
  /^locations\.[^.]+\.description$/,
  /^items\.[^.]+\.description$/,
  /^abilities\.[^.]+\.description$/,
  /^skills\.[^.]+\.(name|description)$/,
  /^quests\.[^.]+\./,
  /^factions\.[^.]+\./,
];

/**
 * Language-neutral, and deliberately left alone.
 *
 * `artDirection` is the interesting one: it is never displayed, it is a prompt
 * for an image model, and those models are trained overwhelmingly on English.
 * Translating it costs money and makes the art worse.
 *
 * `affordances` are parser-matched phrases. They move with their ability's name
 * or not at all — translating one without the other makes the ability
 * unreachable, which is worse than leaving both.
 */
const TIER_C = [
  /**
   * The title.
   *
   * `STORY_AUDIT.md` §2 marked this "recommendation pending approval" and the
   * batch translated it anyway, inconsistently: `La Prophétie Vide` and
   * `Bonjour, Mari` moved while `Blackwake` and `Hush House` did not.
   *
   * The decision is that it does not move, and the reason is the art. Every
   * cover has the English title painted into it — `ZERO THRONE` is part of the
   * image. A French label under English key art is not a localization, it is
   * two names for one thing on the same screen. It can be revisited the day
   * covers are generated per locale.
   */
  /^title$/,
  /(^|\.)id$/,
  /Id$/,
  /(^|\.)assetKey$/,
  /artDirection$/,
  /affordances$/,
  /^(coverImage|keyArt|publishedAt|creatorId|creatorName|official|intensity|tags|contentDescriptors)$/,
];

export function tierOf(path: string): Tier {
  if (TIER_C.some((r) => r.test(path))) return 'C';
  if (TIER_A.some((r) => r.test(path))) return 'A';
  if (TIER_B.some((r) => r.test(path))) return 'B';
  // Unmatched prose defaults to B: it needs to mean the right thing, and if it
  // turns out to shape a voice somebody will move it. Defaulting to A would
  // put every stray field in the expensive queue.
  return 'B';
}

const hash = (value: unknown): string =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0, 12);

/** Every string in a world, with the path that addresses it. */
function walk(node: unknown, prefix: string, out: Array<[string, string | string[]]>): void {
  if (typeof node === 'string') {
    if (node.trim().length > 0) out.push([prefix, node]);
    return;
  }
  if (Array.isArray(node)) {
    // An array of strings is one field (`voiceSamples`), not many.
    if (node.every((entry) => typeof entry === 'string')) {
      if (node.length > 0) out.push([prefix, node as string[]]);
      return;
    }
    for (const entry of node) {
      const id = (entry as { id?: string } | null)?.id;
      // Addressed by id so reordering cannot reassign somebody's voice.
      if (typeof id === 'string') walk(entry, `${prefix}.${id}`, out);
    }
    return;
  }
  if (typeof node === 'object' && node !== null) {
    for (const [key, value] of Object.entries(node)) {
      walk(value, prefix ? `${prefix}.${key}` : key, out);
    }
  }
}

export function manifestFor(story: { storyId: string }): ManifestField[] {
  const found: Array<[string, string | string[]]> = [];
  walk(story, '', found);

  return found.map(([path, english]) => ({
    storyId: story.storyId,
    path,
    tier: tierOf(path),
    english,
    chars: Array.isArray(english) ? english.join('').length : english.length,
    sourceHash: hash(english),
    translated: false,
  }));
}

function main(): void {
  const argv = process.argv.slice(2);
  const only = argv.find((a) => a.startsWith('--world='))?.slice('--world='.length);
  const asJson = argv.includes('--json');

  const worlds = (LAUNCH_CATALOG as unknown as Array<{ storyId: string; title: string }>).filter(
    (w) => !only || w.storyId === only,
  );

  const all = worlds.flatMap((world) => manifestFor(world));
  // Identifiers and asset keys are the bulk of C and are not work.
  const localizable = all.filter((f) => f.tier !== 'C');

  if (asJson) {
    writeFileSync('/tmp/fr-manifest.json', JSON.stringify(all, null, 2));
    console.log(`Wrote ${all.length} fields to /tmp/fr-manifest.json`);
    return;
  }

  console.log('World                       A fields   A chars   B fields   B chars   fr overlay');
  console.log('-'.repeat(88));

  for (const world of worlds) {
    const mine = all.filter((f) => f.storyId === world.storyId);
    const a = mine.filter((f) => f.tier === 'A');
    const b = mine.filter((f) => f.tier === 'B');
    const covered = worldTextCoverage('fr', world.storyId);
    console.log(
      `${world.title.slice(0, 26).padEnd(26)} ${String(a.length).padStart(8)} ${String(
        a.reduce((n, f) => n + f.chars, 0),
      ).padStart(9)} ${String(b.length).padStart(10)} ${String(
        b.reduce((n, f) => n + f.chars, 0),
      ).padStart(9)} ${String(covered).padStart(11)}`,
    );
  }

  const a = localizable.filter((f) => f.tier === 'A');
  const b = localizable.filter((f) => f.tier === 'B');
  console.log('-'.repeat(88));
  console.log(
    `${'TOTAL'.padEnd(26)} ${String(a.length).padStart(8)} ${String(
      a.reduce((n, f) => n + f.chars, 0),
    ).padStart(9)} ${String(b.length).padStart(10)} ${String(
      b.reduce((n, f) => n + f.chars, 0),
    ).padStart(9)}`,
  );
  console.log(
    `\nTier C (ids, enums, asset keys, artDirection, affordances): ${
      all.length - localizable.length
    } fields, deliberately untouched.`,
  );
}

// Run only when invoked directly;  imports .
if (process.argv[1]?.endsWith('fr-manifest.ts')) main();
