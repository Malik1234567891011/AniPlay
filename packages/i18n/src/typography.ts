/**
 * The codepoints French typography actually requires, named once.
 *
 * Everything here is from `docs/localization/fr-FR/research/typography.md`,
 * which measured rather than guessed. The two rules that catch people out:
 *
 * - **Three different spaces appear in one formatted French number.** U+202F
 *   groups thousands, U+00A0 sits before `%` and `€`. "Cleaning up" the spaces
 *   in a formatted number breaks at least one of them.
 * - **U+0020 is never the answer.** Substituting a plain space reintroduces the
 *   line break the non-breaking space existed to prevent.
 */

/** No-break space, U+00A0. Before `:` `«` `»` `%` `€`, and between `21` and `janvier`. */
export const NBSP = ' ';

/** Narrow no-break space, U+202F. CLDR's French thousands separator since CLDR 34. */
export const NNBSP = ' ';

/** The French apostrophe. Author it; never match on it — see `search.ts`. */
export const APOSTROPHE = '’';

/** U+2026. Line-break class IN, so it will not be split the way `...` can be. */
export const ELLIPSIS = '…';

export const GUILLEMET_OPEN = '«';
export const GUILLEMET_CLOSE = '»';

/** Tiret cadratin. French spaces it on both sides; English closes it up. */
export const EM_DASH = '—';

/** Tiret demi-cadratin. Ranges: `1914–1918`. */
export const EN_DASH = '–';

/**
 * Make a formatted string safe for the app's body fonts.
 *
 * A CoreText glyph probe found Georgia and Avenir Next — the two most likely
 * body fonts for a reading app — **missing U+202F entirely**, so a grouped
 * number renders its separator from a fallback face at a width nobody chose
 * (Georgia: 3.40pt against its own 4.10pt space). Folding U+202F to U+00A0
 * keeps the non-breaking semantics, keeps the group visually separated, and is
 * covered by every font probed.
 *
 * Applied on the way to the screen only. Never apply it to a string that will
 * be parsed, and never fold to U+0020.
 */
export function foldNarrowSpaces(text: string): string {
  return text.replace(/ /g, NBSP);
}

/**
 * French typography, applied to text a model just wrote.
 *
 * The authored catalogue goes through this at build time. Generated prose and
 * generated cards do not — they arrive from the model mid-turn — and a
 * twenty-three world smoke test found sixteen cards with straight apostrophes:
 * `D'accord`, `m'occuper`, `d'aller`. The policy asks for curly ones and a model
 * obeys that most of the time, which is not a typography standard.
 *
 * Deterministic, so it belongs in code rather than in a prompt. The three rules
 * are the ones French readers notice:
 *
 *   - the apostrophe is ’ and never ', between letters;
 *   - ? ! ; : take a narrow no-break space before them;
 *   - guillemets take one on the inside.
 *
 * Careful about what it must *not* touch: `10:30` is a time, `https://` is a
 * URL, and an apostrophe that is acting as a quotation mark is somebody's
 * punctuation rather than an elision.
 */
export function frenchTypography(text: string): string {
  return text
    .replace(/(\p{L})'(\p{L})/gu, '$1\u2019$2')
    // Not before a colon that belongs to a clock or a scheme: `10:30` is a
    // time and `https://` is a URL. Both were getting a narrow space, and the
    // URL one was caught by its own test rather than by a reader, which is the
    // only reason it is not in the catalogue.
    .replace(/([^\s\u00a0\u202f])(\s?)([?!;:])(\/\/)?/gu, (match, before: string, gap: string, mark: string, slashes: string | undefined) => {
      if (mark === ':' && (slashes || /\d/.test(before))) return match;
      return `${before}\u202f${mark}${slashes ?? ''}`;
    })
    .replace(/«\s*/g, '«\u202f')
    .replace(/\s*»/g, '\u202f»');
}
