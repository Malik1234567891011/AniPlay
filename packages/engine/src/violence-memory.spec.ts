import { describe, expect, it } from 'vitest';
import type { ActionIntent, GameState } from '@aniplay/contracts';
import { NINTH_ARCHIVE } from '@aniplay/test-fixtures';
import { commitTurn } from './commit.js';
import { resolveIntent } from './resolve.js';
import { createInitialState } from './state.js';

/**
 * You do not get to walk back into a room you started a fight in and be
 * greeted pleasantly.
 *
 * The memory of an attack is stored, retrieved and present in the writer's
 * prompt — verified end to end — and the adversarial sweep kept catching the
 * writer treating it as one optional line among a dozen things a character
 * knows. So on every turn aimed at somebody the player has attacked, it stops
 * being background and becomes an instruction.
 */

const at = (): GameState => {
  const s = createInitialState({
    sessionId: 'sess_v',
    story: NINTH_ARCHIVE,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: 'arch_duelist', worldKnowsAboutYou: '',
      advanced: {}, portraitAssetId: null,
    },
  });
  s.characters.find((c) => c.characterId === 'kael')!.locationId = s.player.locationId;
  return s;
};

const act = (verb: string, method: string): ActionIntent => ({
  schemaVersion: '1.0', intentId: 'i', rawAction: method, dialogue: [],
  confidence: 0.9, ambiguities: [], unsafeOrMetaRequests: [],
  actions: [{
    verb: verb as never, actor: { entityType: 'player', entityId: 'player' },
    targets: [{ entityType: 'npc', entityId: 'kael' }],
    method, declaredOutcome: '', timeIntent: 'NOW',
  }],
});

/** Attacks Kael, then returns some turns later doing something ordinary. */
function attackThenReturn(laterVerb: string, laterText: string) {
  let s = at();
  const attack = resolveIntent({ story: NINTH_ARCHIVE, state: s, intent: act('attack', 'I attack Kael.'), turnId: 't1', seed: 'a' });
  s = commitTurn({ story: NINTH_ARCHIVE, state: s, resolution: attack, turnId: 't1' }).state;

  for (let i = 2; i <= 5; i++) {
    const wait = resolveIntent({
      story: NINTH_ARCHIVE, state: s, turnId: `t${i}`, seed: `w${i}`,
      intent: { ...act('wait', 'I wait.'), actions: [{ ...act('wait', 'I wait.').actions[0]!, targets: [] }] },
    });
    s = commitTurn({ story: NINTH_ARCHIVE, state: s, resolution: wait, turnId: `t${i}` }).state;
  }

  return resolveIntent({ story: NINTH_ARCHIVE, state: s, intent: act(laterVerb, laterText), turnId: 't6', seed: 'b' });
}

const notes = (r: { privateFacts: Array<{ fact: string }> }): string =>
  r.privateFacts.map((f) => f.fact).join(' ');

describe('coming back to somebody you attacked', () => {
  it('tells the writer, in the strongest terms it has', () => {
    const later = attackThenReturn('speak', 'I go back and find Kael again.');
    expect(notes(later)).toMatch(/AUTHORITATIVE/);
    expect(notes(later)).toMatch(/has attacked Kael Ostrand before/i);
    expect(notes(later)).toMatch(/not forgotten/i);
  });

  it('forbids the exact failure the sweep kept catching', () => {
    const later = attackThenReturn('speak', 'I go back and find Kael again.');
    expect(notes(later)).toMatch(/do not greet the player normally/i);
    expect(notes(later)).toMatch(/do not pick up a friendly conversation/i);
  });

  it('says how they are holding themselves, in words rather than numbers', () => {
    const later = attackThenReturn('speak', 'I go back and find Kael again.');
    // A directive reading "trust -20, fear 15" is a stat block.
    expect(notes(later)).not.toMatch(/-?\d+\s*(trust|fear|rivalry)/i);
    expect(notes(later)).toMatch(/afraid of them|treating them as an enemy|unwilling to trust/i);
  });

  it('fires however the player comes back', () => {
    for (const [verb, text] of [
      ['speak', 'I talk to Kael.'],
      ['persuade', 'I ask Kael whether they are still angry about what I did.'],
      ['help', 'I offer Kael a hand.'],
      ['inspect', 'I look at Kael.'],
    ] as const) {
      expect(notes(attackThenReturn(verb, text)), text).toMatch(/has attacked Kael Ostrand before/i);
    }
  });

  it('says nothing about somebody the player never touched', () => {
    const s = at();
    const clean = resolveIntent({
      story: NINTH_ARCHIVE, state: s, turnId: 't', seed: 'c',
      intent: act('speak', 'I talk to Kael.'),
    });
    expect(notes(clean)).not.toMatch(/has attacked Kael Ostrand before/i);
  });

  it('keeps saying it, for as long as it stays true', () => {
    // Not a one-turn reminder that decays out of the window.
    let s = at();
    const attack = resolveIntent({ story: NINTH_ARCHIVE, state: s, intent: act('attack', 'I attack Kael.'), turnId: 't1', seed: 'a' });
    s = commitTurn({ story: NINTH_ARCHIVE, state: s, resolution: attack, turnId: 't1' }).state;

    for (let i = 0; i < 12; i++) {
      const r = resolveIntent({ story: NINTH_ARCHIVE, state: s, intent: act('speak', 'I talk to Kael.'), turnId: `x${i}`, seed: `x${i}` });
      expect(notes(r), `turn ${i}`).toMatch(/has attacked Kael Ostrand before/i);
      s = commitTurn({ story: NINTH_ARCHIVE, state: s, resolution: r, turnId: `x${i}` }).state;
    }
  });
});
