import { describe, expect, it } from 'vitest';
import { dayPart, dayPartLabel, lightAt } from './clock.js';

/**
 * Dusk at 4:44 in the afternoon.
 *
 * The writer was given `dayPart` and nothing else, and "afternoon" is vague
 * enough to reach for atmosphere: a Nine Weeks beat at 4:44 PM at a summer lake
 * camp opened "out into the dusk… the air already shifting toward night", and
 * one at 5:32 PM managed "the hush of late afternoon" and "the sun is down
 * behind the lake" in the same beat. The header showed the real time throughout.
 */
const at = (h: number, m = 0) => h * 60 + m;

describe('what the light is doing', () => {
  it('does not call 4:44 in the afternoon dusk', () => {
    // The beat that prompted this: "out into the dusk… the air already
    // shifting toward night", at 4:44 PM, at a summer lake camp.
    expect(lightAt(at(16, 44))).toMatch(/sunset has not happened/i);
    expect(lightAt(at(16, 44))).not.toMatch(/dusk|full dark/i);
  });

  it('is unambiguous earlier in the afternoon', () => {
    expect(lightAt(at(14))).toMatch(/not getting dark/i);
  });

  it('says the sun is still up in the early evening', () => {
    // 5:32 PM, the beat that claimed "the sun is down behind the lake".
    expect(lightAt(at(17, 32))).toMatch(/sunset has not happened/i);
  });

  it('does let it be dark when it is dark', () => {
    expect(lightAt(at(23))).toMatch(/dark/i);
    expect(lightAt(at(2))).toMatch(/dark/i);
  });

  it('still agrees with dayPart about which part of the day it is', () => {
    // `dayPart` is the id and `dayPartLabel` the word — the split that stopped
    // `director.ts` comparing a display string with `===`. Both are asserted,
    // because agreeing with the id is what matters and agreeing with the
    // English word is what a reader of this test expects to see.
    expect(dayPart(at(16, 44))).toBe('AFTERNOON');
    expect(dayPartLabel(at(16, 44))).toBe('Afternoon');
    expect(dayPart(at(17, 32))).toBe('EVENING');
    expect(dayPartLabel(at(17, 32))).toBe('Evening');
  });

  it('says what the light is doing in French too', () => {
    // Not a translation check — a check that the French path is wired at all.
    // An English sentence reaching a French writer is the failure mode.
    expect(lightAt(at(17, 32), 'fr')).toMatch(/soleil/i);
    expect(lightAt(at(2), 'fr')).toMatch(/nuit noire/i);
    for (let h = 0; h < 24; h++) {
      expect(lightAt(at(h), 'fr'), `hour ${h}`).not.toMatch(/[a-z]+ing\b|sunset|daylight/i);
    }
  });

  it('covers the whole day without a gap', () => {
    for (let h = 0; h < 24; h++) expect(lightAt(at(h)).length, `hour ${h}`).toBeGreaterThan(0);
  });
});
