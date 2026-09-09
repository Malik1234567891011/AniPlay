/**
 * Produces delivery derivatives from the generated masters (spec §36.3).
 *
 * Generation returns ~2MB PNGs. Those are the masters and stay on disk; what a
 * phone downloads is a WebP at the size it will actually display, which is
 * roughly an order of magnitude smaller.
 *
 *   npx tsx infra/scripts/optimize-art.ts
 */
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ASSET_DIR = join(ROOT, 'infra/seed/assets');

/**
 * Delivery widths by asset kind. A 3x phone shows a cover at ~450pt wide, so
 * 900px is the honest ceiling; anything more is bytes the player pays for and
 * cannot see.
 */
const TARGET_WIDTH: Array<{ match: RegExp; width: number }> = [
  { match: /\/cover$/, width: 900 },
  { match: /\/key$/, width: 1200 },
  { match: /\/stage_/, width: 1200 },
  { match: /^player\//, width: 800 },
  { match: /^hero\//, width: 1200 },
];

function widthFor(assetKey: string): number {
  return TARGET_WIDTH.find((t) => t.match.test(assetKey))?.width ?? 700;
}

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (extname(entry.name) === '.png') yield path;
  }
}

async function main(): Promise<void> {
  let masterBytes = 0;
  let deliveryBytes = 0;
  let count = 0;

  for await (const path of walk(ASSET_DIR)) {
    const assetKey = relative(ASSET_DIR, path).replace(/\.png$/, '');
    const input = await readFile(path);
    masterBytes += input.length;

    const webp = await sharp(input)
      .resize({ width: widthFor(assetKey), withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toBuffer();

    const outPath = path.replace(/\.png$/, '.webp');
    await writeFile(outPath, webp);
    deliveryBytes += webp.length;
    count++;

    console.log(
      `  ${assetKey}: ${Math.round(input.length / 1024)}KB → ${Math.round(webp.length / 1024)}KB webp`,
    );
  }

  console.log(
    `\n${count} assets. Masters ${(masterBytes / 1_048_576).toFixed(1)}MB → delivery ${(deliveryBytes / 1_048_576).toFixed(1)}MB ` +
      `(${Math.round((1 - deliveryBytes / masterBytes) * 100)}% smaller).`,
  );
}

void main();
