import { describe, expect, it } from 'vitest';
import { LAST_FIVE } from '@plotbreak/test-fixtures';
import { approachingEndings, eligibleEndings } from './endings.js';
import { createInitialState } from './state.js';

/**
 * Destinations, not a route.
 *
 * The whole value of this is that it answers one question — what could this end
 * as, from here — and does nothing with the answer. If eligibility ever starts
 * selecting, steering or gating, the world has a route again.
 */

const state = () =>
  createInitialState({
    sessionId: 'sess_e',
    story: LAST_FIVE,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: LAST_FIVE.archetypes[0]!.id, worldKnowsAboutYou: '',
      advanced: {}, portraitAssetId: null,
    },
  });

describe('where this run could end up', () => {
  it('is nowhere at the start, however the state happens to line up', () => {
    expect(eligibleEndings(LAST_FIVE, state())).toEqual([]);
  });

  it('will not end a story that has not been one yet', () => {
    // Every condition met on turn one still yields nothing: a season cannot
    // finish before it starts, whatever the flags say.
    const s = state();
    s.flags['qualified'] = true;
    s.turnIndex = 3;
    expect(eligibleEndings(LAST_FIVE, s)).toEqual([]);
  });

  it('opens once the run has actually arrived there', () => {
    const s = state();
    s.flags['qualified'] = true;
    s.turnIndex = 60;
    expect(eligibleEndings(LAST_FIVE, s).map((e) => e.def.id)).toContain('end_nationals');
  });

  it('offers losses on the same terms as wins', () => {
    const s = state();
    s.flags['season_over'] = true;
    s.turnIndex = 60;
    const ids = eligibleEndings(LAST_FIVE, s).map((e) => e.def.id);
    expect(ids).toContain('end_season_over');
    expect(ids).not.toContain('end_nationals');
  });

  it('distinguishes walking out from being wanted and walking out', () => {
    const quit = state();
    quit.turnIndex = 60;
    quit.flags['left_the_map'] = 'The Kosei Gym';
    expect(eligibleEndings(LAST_FIVE, quit).map((e) => e.def.id)).toContain('end_quit');

    const transfer = state();
    transfer.turnIndex = 60;
    transfer.flags['left_the_map'] = 'The Kosei Gym';
    transfer.flags['scouts_watching'] = true;
    const ids = eligibleEndings(LAST_FIVE, transfer).map((e) => e.def.id);
    expect(ids).toContain('end_transfer');
    expect(ids).not.toContain('end_quit');
  });

  it('can offer more than one at once, because a run is not one thing', () => {
    const s = state();
    s.turnIndex = 60;
    s.flags['qualified'] = true;
    s.flags['knows:denda_existed'] = true;
    s.flags['knows:gora_was_the_example'] = true;
    const coach = s.relationships.find((r) => r.characterId === 'coach')!;
    coach.trust = 60;
    const ids = eligibleEndings(LAST_FIVE, s).map((e) => e.def.id);
    expect(ids).toContain('end_nationals');
    expect(ids).toContain('end_reconciliation');
  });

  it('names what the run is close to without counting it as reached', () => {
    const s = state();
    s.turnIndex = 60;
    const coach = s.relationships.find((r) => r.characterId === 'coach')!;
    coach.trust = 60;
    // Everything but the flags, which are the part still being worked on.
    expect(approachingEndings(LAST_FIVE, s).map((e) => e.id)).toContain('end_reconciliation');
    expect(eligibleEndings(LAST_FIVE, s).map((e) => e.def.id)).not.toContain('end_reconciliation');
  });
});
