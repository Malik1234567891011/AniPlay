import { describe, expect, it } from 'vitest';
import { frenchTypography } from './typography.js';
describe('French typography on text a model just wrote', () => {
  it('curls an apostrophe between letters', () => {
    // Sixteen generated cards in a twenty-three world smoke test carried
    // straight ones. The policy asks; this makes sure.
    expect(frenchTypography("D'accord, je t'attends.")).toBe('D’accord, je t’attends.');
    expect(frenchTypography("m'occuper des marches")).toBe('m’occuper des marches');
  });

  it('puts a narrow no-break space before the two-part marks', () => {
    expect(frenchTypography('Tu viens ?')).toBe('Tu viens ?');
    expect(frenchTypography('Arrête !')).toBe('Arrête !');
    expect(frenchTypography('Bon: on y va.')).toBe('Bon : on y va.');
  });

  it('leaves a time and a URL alone', () => {
    // `10:30` is not punctuation, and neither is `https://`.
    expect(frenchTypography('Rendez-vous à 10:30')).toBe('Rendez-vous à 10:30');
    expect(frenchTypography('https://example.fr')).toBe('https://example.fr');
  });

  it('spaces the inside of guillemets and not the outside', () => {
    expect(frenchTypography('« Salut »')).toBe('« Salut »');
  });

  it('does not touch an apostrophe acting as a quote mark', () => {
    // Not between two letters, so it is somebody's punctuation rather than an
    // elision, and it goes to the QA queue instead of being silently changed.
    expect(frenchTypography("'Salut'")).toBe("'Salut'");
  });
});
