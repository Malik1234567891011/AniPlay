/**
 * Generates the app icon and splash mark.
 *
 * Separate from `generate-art.ts` because this is brand, not story content: it
 * does not use the world style spine, it is not keyed to a story, and it is
 * regenerated deliberately rather than as part of a catalog sweep.
 *
 *   npx tsx infra/scripts/generate-brand.ts [--force]
 *
 * App Store rules the prompt has to satisfy (and the post-processing enforces):
 * 1024x1024, fully opaque, square, no rounded corners of its own — iOS applies
 * the mask — and legible at 40 points.
 */
import { readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { createMediaGatewayFromEnv, type ImagePromptSpec } from '@plotbreak/director';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ASSETS = join(ROOT, 'apps/mobile/assets');

/** The product's own palette, from packages/ui tokens. */
const INK = '#0B0D12';

const ICON_PROMPT = [
  'A flat vector app icon. Extreme simplicity: one bold centred symbol and nothing else.',
  'The symbol is a twenty-sided die seen face-on, drawn as clean geometric facets, with a single',
  'brush-ink stroke sweeping diagonally across it like a calligraphic slash.',
  'Colours: a very dark blue-black background (#0B0D12) filling the entire square edge to edge,',
  'the die in a bright violet (#7C6CFF), the ink stroke in off-white.',
  'No text, no letters, no numerals, no border, no rounded corners, no drop shadow, no gradient mesh,',
  'no background pattern, no guidelines, no small details. Solid flat colour only.',
  'The symbol occupies the middle 70 percent of the square with generous even margin.',
  'It must stay legible when shrunk to 40 pixels.',
].join(' ');

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function loadEnv(): Promise<void> {
  try {
    const raw = await readFile(join(ROOT, '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match?.[1] && !process.env[match[1]]) process.env[match[1]] = match[2];
    }
  } catch {
    // Already exported, or nothing to load.
  }
}

/** The artwork's own corner colour, so an inset leaves no seam. */
async function edgeColour(bytes: Buffer): Promise<{ r: number; g: number; b: number }> {
  const { data } = await sharp(bytes)
    .extract({ left: 4, top: 4, width: 2, height: 2 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { r: data[0] ?? 11, g: data[1] ?? 13, b: data[2] ?? 18 };
}

/** 1024x1024, opaque, with the artwork at `scale` of the square and centred. */
async function insetSquare(
  bytes: Buffer,
  scale: number,
  background: { r: number; g: number; b: number },
): Promise<Buffer> {
  const inner = Math.round(1024 * scale);
  const pad = Math.round((1024 - inner) / 2);
  return sharp(bytes)
    .resize(inner, inner, { fit: 'cover' })
    .extend({
      top: pad,
      bottom: 1024 - inner - pad,
      left: pad,
      right: 1024 - inner - pad,
      background,
    })
    .flatten({ background })
    .png()
    .toBuffer();
}

async function main(): Promise<void> {
  await loadEnv();
  const force = process.argv.includes('--force');

  const iconPath = join(ASSETS, 'icon.png');
  if (!force && (await exists(join(ASSETS, '.brand-generated')))) {
    console.log('Brand assets already generated. Pass --force to redo them.');
    return;
  }

  const gateway = createMediaGatewayFromEnv();
  if (!gateway) {
    console.error('No OPENAI_API_KEY configured.');
    process.exit(1);
  }

  const spec: ImagePromptSpec = {
    assetKey: 'brand/icon',
    kind: 'COVER',
    aspect: 'SQUARE',
    seed: 'plotbreak:icon:v1',
    alt: 'Plotbreak app icon',
    prompt: ICON_PROMPT,
  };

  console.log('Generating the app icon…');
  const asset = await gateway.generateImage(spec);

  // iOS rejects an icon with an alpha channel and applies its own corner mask,
  // so the mark is inset and the square is filled edge to edge.
  //
  // `extend` from the artwork's own corner colour rather than compositing onto
  // a second surface: two nearly-identical blacks laid on top of each other
  // leave a faint visible frame after sharp's colour handling, and that seam is
  // exactly the kind of thing nobody notices until it is on a phone.
  const edge = await edgeColour(asset.bytes);
  const inset = await insetSquare(asset.bytes, 0.86, edge);

  await writeFile(iconPath, inset);
  console.log('  ✓ icon.png (1024x1024, opaque)');

  // The splash mark is the same artwork with more room around it, not a second
  // design.
  await writeFile(join(ASSETS, 'splash-icon.png'), await insetSquare(asset.bytes, 0.55, edge));
  console.log('  ✓ splash-icon.png');

  // Android draws the foreground on its own background layer and masks it, so
  // the safe zone is the middle 66 percent.
  const foreground = await sharp({
    create: { width: 1024, height: 1024, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      {
        input: await sharp(asset.bytes)
          .resize(620, 620, { fit: 'cover' })
          .png()
          .toBuffer(),
      },
    ])
    .png()
    .toBuffer();
  await writeFile(join(ASSETS, 'android-icon-foreground.png'), foreground);
  await writeFile(
    join(ASSETS, 'android-icon-background.png'),
    await sharp({ create: { width: 1024, height: 1024, channels: 3, background: INK } }).png().toBuffer(),
  );
  console.log('  ✓ android icon layers');

  await writeFile(join(ASSETS, 'favicon.png'), await sharp(inset).resize(48, 48).png().toBuffer());
  console.log('  ✓ favicon.png');

  await writeFile(join(ASSETS, '.brand-generated'), `${new Date().toISOString()}\n`);
  console.log(`\nDone. Approx cost $${asset.provenance.costUsd.toFixed(2)}.`);
}

void main();
