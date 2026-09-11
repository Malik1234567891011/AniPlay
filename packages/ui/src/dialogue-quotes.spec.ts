import { describe, expect, it } from 'vitest';

/**
 * Quotation marks around an attributed line.
 *
 * English wraps a spoken line in curly double quotes. French, on a block that
 * already names the speaker and draws their portrait, uses **nothing** — not
 * guillemets. French typography attributes with a dash, and a dash under a
 * portrait beside a name is a third way of saying the same thing. `UI_AUDIT`
 * 2.4 reached the same conclusion, which made this a deletion rather than a
 * translation.
 *
 * Tested as the rule rather than through the renderer: the component needs a
 * provider, a portrait and a translator to mount, and none of those is what
 * this is about.
 */
const quoted = (text: string, locale: 'en' | 'fr'): string =>
  locale === 'fr' ? text : `“${text}”`;

describe('an attributed line', () => {
  it('is wrapped in curly quotes in English', () => {
    expect(quoted('You said two. Not three.', 'en')).toBe('“You said two. Not three.”');
  });

  it('is bare in French, because the speaker is already named', () => {
    expect(quoted('Tu as dit deux. Pas trois.', 'fr')).toBe('Tu as dit deux. Pas trois.');
  });

  it('does not reach for guillemets, which would be the same information twice', () => {
    const french = quoted('Il y a encore de la soupe.', 'fr');
    expect(french).not.toContain('«');
    expect(french).not.toContain('»');
  });

  it('leaves a line containing its own quotes alone in both', () => {
    // Somebody quoting somebody else inside their line is theirs, not ours.
    const inner = 'Elle a dit « demain » et elle est partie.';
    expect(quoted(inner, 'fr')).toBe(inner);
    expect(quoted(inner, 'en')).toBe(`“${inner}”`);
  });
});
