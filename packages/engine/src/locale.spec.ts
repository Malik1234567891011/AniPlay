import { describe, expect, it } from 'vitest';

import {
  dayPart,
  dayPartLabel,
  formatClock,
  formatDeadline,
  formatDuration,
  formatWorldTime,
} from './clock.js';
import { dcBandLabel, dcBandName, outcomeLabel, proficiencyLabel } from './check.js';
import { relationshipLabel, relationshipTone } from './relationships.js';
import type { RelationshipState } from '@plotbreak/contracts';

/**
 * Step 4's gate: **`Jour 3 · 16:15` renders correctly with no client-side
 * string surgery** — and English renders exactly what it rendered before.
 *
 * The second half is the one that can regress silently, so it is asserted band
 * by band rather than by sampling. Every English value below is the literal the
 * function returned before it took a locale.
 */

const rel = (over: Partial<RelationshipState> = {}): RelationshipState => ({
  characterId: 'c',
  trust: 0,
  affection: 0,
  respect: 0,
  fear: 0,
  rivalry: 0,
  lastChangedTurn: -1,
  unlockedGates: [],
  ...over,
});

describe('the world clock', () => {
  it('renders the French header with a 24-hour clock', () => {
    // The gate, literally. `16:15` and not `4:15 PM`: France runs on the
    // 24-hour clock, and the client does nothing to this string.
    expect(formatWorldTime(2 * 1440 + 16 * 60 + 15, 'fr')).toBe('Jour 3 · 16:15');
  });

  it('renders the English header exactly as it did', () => {
    expect(formatWorldTime(8 * 60 + 10)).toBe('Day 1 · 8:10 AM');
    expect(formatWorldTime(1440 + 13 * 60 + 5)).toBe('Day 2 · 1:05 PM');
    expect(formatWorldTime(0)).toBe('Day 1 · 12:00 AM');
    expect(formatWorldTime(12 * 60)).toBe('Day 1 · 12:00 PM');
  });

  it('pads the French hour, because a HUD column that jumps is a bug', () => {
    expect(formatClock(8 * 60 + 10, 'fr')).toBe('08:10');
    expect(formatClock(0, 'fr')).toBe('00:00');
    expect(formatClock(23 * 60 + 59, 'fr')).toBe('23:59');
  });

  it('keeps English durations byte-identical', () => {
    expect(formatDuration(0)).toBe('a moment');
    expect(formatDuration(20)).toBe('20 min');
    expect(formatDuration(120)).toBe('2h');
    expect(formatDuration(200)).toBe('3h 20m');
  });

  it('gives French durations a non-breaking space before the unit', () => {
    // U+202F in the catalogue, folded to U+00A0 on the way out because
    // Georgia and Avenir Next have no narrow-no-break glyph. Never U+0020:
    // that reintroduces the line break the space existed to prevent.
    expect(formatDuration(0, 'fr')).toBe('un instant');
    expect(formatDuration(20, 'fr')).toBe('20\u00A0min');
    expect(formatDuration(120, 'fr')).toBe('2\u00A0h');
    expect(formatDuration(200, 'fr')).toBe('3\u00A0h\u00A020');
    expect(formatDuration(20, 'fr')).not.toContain('\u0020');
    expect(formatDuration(20, 'fr')).not.toContain('\u202F');
  });

  it('keeps English deadlines byte-identical', () => {
    expect(formatDeadline(0, null)).toBeNull();
    expect(formatDeadline(100, 90)).toBe('Overdue');
    expect(formatDeadline(0, 200)).toBe('in 3h 20m');
  });

  it('translates deadlines', () => {
    expect(formatDeadline(100, 90, 'fr')).toBe('En retard');
    expect(formatDeadline(0, 200, 'fr')).toBe('dans 3\u00A0h\u00A020');
  });
});

describe('day parts are an id and a word, not one value doing both', () => {
  it('returns ids from dayPart', () => {
    expect(dayPart(3 * 60)).toBe('LATE_NIGHT');
    expect(dayPart(6 * 60)).toBe('DAWN');
    expect(dayPart(15 * 60)).toBe('AFTERNOON');
    expect(dayPart(22 * 60)).toBe('NIGHT');
  });

  it('renders the same English words the union used to be', () => {
    const cases: Array<[number, string]> = [
      [3 * 60, 'Late night'],
      [6 * 60, 'Dawn'],
      [9 * 60, 'Morning'],
      [12 * 60, 'Midday'],
      [15 * 60, 'Afternoon'],
      [19 * 60, 'Evening'],
      [22 * 60, 'Night'],
    ];
    for (const [minute, label] of cases) expect(dayPartLabel(minute)).toBe(label);
  });

  it('gives French bare nouns, so the writer can put an article in front', () => {
    expect(dayPartLabel(15 * 60, 'fr')).toBe('Après-midi');
    expect(dayPartLabel(3 * 60, 'fr')).toBe('Pleine nuit');
    // No leading article: `l'` + `l'après-midi` is what that would produce.
    for (const minute of [3, 6, 9, 12, 15, 19, 22]) {
      expect(dayPartLabel(minute * 60, 'fr')).not.toMatch(/^(le |la |l’|les )/i);
    }
  });
});

describe('difficulty bands, outcomes and proficiency', () => {
  it('keeps every English band exactly as it was', () => {
    const cases: Array<[number, string]> = [
      [5, 'Routine'],
      [9, 'Easy'],
      [11, 'Moderate'],
      [14, 'Hard'],
      [17, 'Very hard'],
      [20, 'Exceptional'],
      [30, 'Nearly impossible'],
    ];
    for (const [dc, label] of cases) expect(dcBandLabel(dc)).toBe(label);
  });

  it('exposes the band as an id so nothing has to compare against a word', () => {
    expect(dcBandName(5)).toBe('ROUTINE');
    expect(dcBandName(30)).toBe('NEARLY_IMPOSSIBLE');
  });

  it('translates the bands', () => {
    expect(dcBandLabel(5, 'fr')).toBe('Routine');
    expect(dcBandLabel(17, 'fr')).toBe('Très difficile');
    expect(dcBandLabel(30, 'fr')).toBe('Quasi impossible');
  });

  it('keeps every English outcome exactly as it was', () => {
    expect(outcomeLabel('CRITICAL_SUCCESS')).toBe('Critical success');
    expect(outcomeLabel('CLEAN_SUCCESS')).toBe('Clean success');
    expect(outcomeLabel('SUCCESS')).toBe('Success');
    expect(outcomeLabel('SUCCESS_WITH_COST')).toBe('Success with cost');
    expect(outcomeLabel('FAILURE')).toBe('Failure');
    expect(outcomeLabel('COMPLICATION')).toBe('Complication');
  });

  it('translates the outcomes', () => {
    expect(outcomeLabel('FAILURE', 'fr')).toBe('Échec');
    expect(outcomeLabel('SUCCESS_WITH_COST', 'fr')).toBe('Réussite coûteuse');
  });

  it('keeps the English proficiency ladder', () => {
    const ladder = ['Untrained', 'Familiar', 'Trained', 'Expert', 'Master', 'Legendary'];
    ladder.forEach((label, value) => expect(proficiencyLabel(value)).toBe(label));
    // Clamped at both ends, as before.
    expect(proficiencyLabel(-3)).toBe('Untrained');
    expect(proficiencyLabel(99)).toBe('Legendary');
  });
});

describe('the relationship ladder', () => {
  it('keeps every English rung exactly as it was', () => {
    expect(relationshipLabel(rel())).toBe('Wary');
    expect(relationshipLabel(rel({ trust: 45 }))).toBe('Trusted');
    expect(relationshipLabel(rel({ trust: 60, affection: 75 }))).toBe('Devoted');
    expect(relationshipLabel(rel({ fear: 70 }))).toBe('Afraid');
    expect(relationshipLabel(rel({ rivalry: 60 }))).toBe('Rival');
    expect(relationshipLabel(rel({ trust: -40 }))).toBe('Hostile');
    expect(relationshipLabel(rel({ trust: 35, affection: 50 }))).toBe('Close');
    expect(relationshipLabel(rel({ affection: 40 }))).toBe('Complicated');
    expect(relationshipLabel(rel({ respect: 45 }))).toBe('Respected');
    expect(relationshipLabel(rel({ rivalry: 30 }))).toBe('Competitive');
    expect(relationshipLabel(rel({ affection: 25 }))).toBe('Warm');
    expect(relationshipLabel(rel({ trust: 15 }))).toBe('Familiar');
  });

  it('exposes the rung as an id, which is what code should branch on', () => {
    expect(relationshipTone(rel({ rivalry: 60 }))).toBe('RIVAL');
    expect(relationshipTone(rel())).toBe('WARY');
  });

  it('uses invariable French, because a character has no authored gender', () => {
    // An adjective would have to agree with the character, and `CharacterDef`
    // carries no gender — so every rung is a state noun or an invariable
    // adjective. See `catalog/fr/world.ts`.
    expect(relationshipLabel(rel(), 'fr')).toBe('Sur ses gardes');
    expect(relationshipLabel(rel({ trust: 60, affection: 75 }), 'fr')).toBe('Dévouement');
    expect(relationshipLabel(rel({ affection: 40 }), 'fr')).toBe('C’est compliqué');
    expect(relationshipLabel(rel({ fear: 70 }), 'fr')).toBe('Crainte');

    // The whole ladder, pinned. A heuristic cannot tell `Dévouement` (a noun,
    // invariable) from `Dévoué` (a participle that needs an -e for a woman),
    // so the reviewed list is the test: changing any rung to an inflecting
    // form has to be a deliberate edit here.
    expect([
      relationshipLabel(rel({ fear: 70 }), 'fr'),
      relationshipLabel(rel({ rivalry: 60 }), 'fr'),
      relationshipLabel(rel({ trust: -40 }), 'fr'),
      relationshipLabel(rel({ trust: 60, affection: 75 }), 'fr'),
      relationshipLabel(rel({ trust: 35, affection: 50 }), 'fr'),
      relationshipLabel(rel({ trust: 45 }), 'fr'),
      relationshipLabel(rel({ affection: 40 }), 'fr'),
      relationshipLabel(rel({ respect: 45 }), 'fr'),
      relationshipLabel(rel({ rivalry: 30 }), 'fr'),
      relationshipLabel(rel({ affection: 25 }), 'fr'),
      relationshipLabel(rel({ trust: 15 }), 'fr'),
      relationshipLabel(rel(), 'fr'),
    ]).toEqual([
      'Crainte',
      'Rivalité',
      'Hostile',
      'Dévouement',
      'Proche',
      'Confiance',
      'C’est compliqué',
      'Respect',
      'Compétition',
      'Sympathie',
      'Familiarité',
      'Sur ses gardes',
    ]);
  });
});
