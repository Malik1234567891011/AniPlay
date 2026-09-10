import { describe, expect, it } from 'vitest';
import { nameKeys, shortName } from './names.js';

/**
 * Ten places shortened a name by taking its first word, so Blackwake's Captain
 * Veyra Sol was "Captain" in the delta chips, in the suggested actions, and in
 * the writer's witness lines — and the parser, which indexed the same first
 * word, could not resolve "Veyra" at all.
 */
describe('what to call somebody', () => {
  it('skips the title', () => {
    expect(shortName('Captain Veyra Sol')).toBe('Veyra');
    expect(shortName('Ena Torakawa')).toBe('Ena');
    expect(shortName('Drillmaster Odalys Verne')).toBe('Odalys');
    expect(shortName('Dr Elian Voss')).toBe('Elian');
  });

  it('keeps a name that is all title, because that is the name', () => {
    expect(shortName('The Quiet One')).toBe('Quiet');
    expect(shortName('Wick')).toBe('Wick');
  });

  it('survives an empty or odd name without throwing', () => {
    expect(shortName('')).toBe('');
    expect(shortName('   ')).toBe('   ');
  });

  it('offers every word a player might type', () => {
    const keys = nameKeys('Captain Veyra Sol');
    expect(keys).toContain('captain veyra sol');
    expect(keys).toContain('veyra');
    expect(keys).toContain('captain');
    // "Sol" is three letters, so it stays.
    expect(keys).toContain('sol');
  });

  it('drops words too short to identify anybody', () => {
    expect(nameKeys('Jo Ng')).not.toContain('jo');
  });
});
