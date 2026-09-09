import sharp from 'sharp';

/**
 * The wordmark, drawn by us rather than by the image model.
 *
 * Image models cannot spell reliably. Asking one for a story title produces
 * malformed lettering roughly every other generation, and the failure is
 * invisible until a person reads it — so every art prompt in this project
 * forbids text outright, the cover composition reserves a quiet band at the
 * bottom, and the title goes on afterwards, here.
 *
 * The upside beyond correctness is identity: every Plotbreak cover gets the
 * same typographic treatment, which is most of what makes a set of covers look
 * like a catalog rather than a folder of pictures.
 */

export interface TitlePlate {
  readonly title: string;
  /** One short line under the title. The world's fantasy label. */
  readonly kicker?: string | null;
  /** Fraction of the height where the quiet band begins. Matches the prompt. */
  readonly safeTop?: number;
}

/** XML-safe, because a title with an ampersand in it should not break the SVG. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Break a title across at most two lines.
 *
 * "Seven Days to Midnight" set on one line at a size that reads on a phone card
 * is either tiny or clipped. Two lines is the most a cover can carry before the
 * art stops being the subject.
 */
function layoutTitle(title: string, maxCharsPerLine: number): string[] {
  const words = title.trim().split(/\s+/);
  if (title.length <= maxCharsPerLine) return [title];

  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  // Never more than two: a three-line title means the title is too long for a
  // cover, and squeezing it in is the wrong fix.
  if (lines.length > 2) return [lines[0]!, lines.slice(1).join(' ')];
  return lines;
}

/**
 * Composites the title onto generated cover art.
 *
 * The gradient is doing real work rather than decoration: generated art is
 * unpredictable, and a wordmark that is legible over a dark harbour is
 * invisible over a floodlit gym. Painting our own contrast underneath means the
 * type is readable over anything the model returns.
 */
export async function compositeTitle(
  imageBytes: Buffer,
  plate: TitlePlate,
): Promise<{ bytes: Buffer; width: number; height: number }> {
  const base = sharp(imageBytes);
  const meta = await base.metadata();
  const width = meta.width ?? 1024;
  const height = meta.height ?? 1536;

  const safeTop = plate.safeTop ?? 0.78;
  const bandTop = Math.round(height * safeTop);

  // Type scales with the image so a cover renders identically at any output
  // size, rather than being tuned to one resolution.
  const titleSize = Math.round(width * 0.098);
  const margin = Math.round(width * 0.072);

  // The kicker is a whole sentence of authored copy and its length is not
  // knowable in advance, so it is sized to fit rather than set at a fixed
  // size and allowed to run off the edge — which is exactly what
  // "A broken ship. Nobody knows your name." did on the first cover.
  const kickerText = (plate.kicker ?? '').toUpperCase();
  const available = width - margin * 2;
  // Condensed uppercase at this weight averages a little over half its point
  // size per glyph, tracking included.
  const kickerSize = Math.max(
    Math.round(width * 0.018),
    Math.min(Math.round(width * 0.031), Math.floor(available / (kickerText.length * 0.62))),
  );

  const lines = layoutTitle(plate.title.toUpperCase(), 15);
  const lineHeight = Math.round(titleSize * 1.02);
  const blockHeight = lines.length * lineHeight + (plate.kicker ? kickerSize * 2.1 : 0);
  const blockTop = height - margin - blockHeight;

  const titleTspans = lines
    .map(
      (line, index) =>
        `<text x="${margin}" y="${blockTop + lineHeight * (index + 1) - Math.round(titleSize * 0.2)}" ` +
        `class="title">${escapeXml(line)}</text>`,
    )
    .join('');

  const kicker = kickerText
    ? `<text x="${margin}" y="${height - margin}" class="kicker" textLength="${Math.min(
        available,
        Math.round(kickerText.length * kickerSize * 0.62),
      )}" lengthAdjust="spacingAndGlyphs">${escapeXml(kickerText)}</text>`
    : '';

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgb(9,10,14)" stop-opacity="0"/>
      <stop offset="38%" stop-color="rgb(9,10,14)" stop-opacity="0.66"/>
      <stop offset="100%" stop-color="rgb(9,10,14)" stop-opacity="0.97"/>
    </linearGradient>
  </defs>
  <rect x="0" y="${bandTop}" width="${width}" height="${height - bandTop}" fill="url(#scrim)"/>
  <style>
    .title {
      font-family: 'Avenir Next Condensed', 'Helvetica Neue', 'Arial Narrow', sans-serif;
      font-weight: 700;
      font-size: ${titleSize}px;
      letter-spacing: ${Math.round(titleSize * 0.02)}px;
      fill: #FFFFFF;
    }
    .kicker {
      font-family: 'Avenir Next', 'Helvetica Neue', Arial, sans-serif;
      font-weight: 600;
      font-size: ${kickerSize}px;
      letter-spacing: ${Math.round(kickerSize * 0.16)}px;
      fill: #B9A8FF;
    }
  </style>
  ${titleTspans}
  ${kicker}
</svg>`;

  const bytes = await base
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toBuffer();

  return { bytes, width, height };
}
