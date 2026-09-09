import { describe, expect, it } from 'vitest';
import { createInitialState } from '@aniplay/engine';
import { NINTH_ARCHIVE, LAST_FIVE } from '@aniplay/test-fixtures';
import type { GameState } from '@aniplay/contracts';
import { OPEN_HISTORY_TURNS, classifyClaim, directorNoteFor, proposalFor } from './player-canon.js';

/**
 * Who gets to decide a thing is true.
 *
 * The failure this file exists for: every declarative sentence the player
 * wrote was pushed through the engine as an attempt, so "I have always been
 * able to read wards" became a Sigil Read roll, and failing it silently
 * deleted the claim. A game called Plotbreak has to have a third answer.
 */

const state = (turnIndex = 0): GameState => {
  const s = createInitialState({
    sessionId: 'sess_c',
    story: NINTH_ARCHIVE,
    identity: {
      displayName: 'Sora',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId: NINTH_ARCHIVE.archetypes[0]?.id ?? null,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });
  s.turnIndex = turnIndex;
  return s;
};

const verdict = (text: string, turnIndex = 0, story = NINTH_ARCHIVE) =>
  classifyClaim(text, { story, state: { ...state(turnIndex), storyVersionId: story.id }, turnIndex });

describe('an ordinary turn authors nothing', () => {
  it('says nothing about a plain action', () => {
    for (const text of [
      'I drive at whoever is guarding me.',
      'I ask Mira about the ward.',
      'I go to the archive.',
      'I hit him.',
    ]) {
      expect(classifyClaim(text, { story: LAST_FIVE, state: state(), turnIndex: 3 }).kind, text).toBe('NONE');
    }
  });
});

describe('the player is the authority on themselves', () => {
  it('establishes a backstory nobody else could know', () => {
    const v = verdict('I grew up on the coast and my father was a ward-cutter.');
    expect(v.kind).toBe('ESTABLISH');
    if (v.kind === 'ESTABLISH') expect(v.scope).toBe('HISTORY');
  });

  it('establishes what the player can do, when the world has that kind of thing in it', () => {
    const v = verdict('I am actually one of the strongest wardwrights alive and I have been hiding it.');
    expect(v.kind).toBe('ESTABLISH');
  });

  it('asks for proof when the world does not work like that at all', () => {
    // Last Five has no magic. Claiming to be the strongest anything is a thing
    // to be shown on a court, not asserted.
    const v = classifyClaim('I am the strongest telepath alive.', {
      story: LAST_FIVE,
      state: state(),
      turnIndex: 1,
    });
    expect(v.kind).toBe('TEST');
  });

  it('writes an established claim down as a pinned, load-bearing fact', () => {
    const v = verdict('I have always been able to read a ward by touch.');
    const proposal = proposalFor(v, 0);
    expect(proposal).not.toBeNull();
    expect(proposal!.importance).toBeGreaterThan(0.8);
    expect(proposal!.predicate).toMatch(/^player_canon:/);
    expect(proposal!.value).toContain('read a ward');
  });

  it('tells the writer to make the world adapt rather than nod along', () => {
    const note = directorNoteFor(verdict('I am a trained duellist.'), NINTH_ARCHIVE)!;
    expect(note).toMatch(/now true/i);
    expect(note).toMatch(/do not have anyone contradict it/i);
    expect(note).toMatch(/cost them something or attract something/i);
  });
});

describe('other people are the authority on themselves', () => {
  it('lets a shared history be filled in while the story is still opening', () => {
    const v = verdict('Kael has always hated me.', 1);
    expect(v.kind).toBe('ESTABLISH');
    if (v.kind === 'ESTABLISH') expect(v.subjectId).toBe('kael');
  });

  it('stops being the player’s to state once that person has a real history', () => {
    const late = verdict('Kael has always hated me.', OPEN_HISTORY_TURNS + 5);
    expect(late.kind).toBe('TEST');
    if (late.kind === 'TEST') expect(late.why).toContain('Kael');
  });

  it('stops being open the moment the player has actually met them', () => {
    const s = state(1);
    s.flags['met:kael'] = true;
    const v = classifyClaim('Kael has always hated me.', {
      story: NINTH_ARCHIVE,
      state: s,
      turnIndex: 1,
    });
    expect(v.kind).toBe('TEST');
  });

  it('treats what a whole town thinks as something it already thinks', () => {
    const v = verdict('Everyone here knows my name and is afraid of me.');
    expect(v.kind).toBe('TEST');
  });
});

describe('locked canon is where it stops', () => {
  it('refuses a claim that collides with something the world cannot stop being', () => {
    // The Ninth Archive's canon includes the record of the player's admission.
    const canonLine = NINTH_ARCHIVE.rules.hardCanon[0]!;
    const words = canonLine
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length > 4)
      .slice(0, 3);
    const v = verdict(`Actually there is no ${words[0]} and I am the one who ${words[1]} the ${words[2]}.`);
    expect(v.kind).toBe('CONTRADICTS');
  });

  it('does not treat an ordinary sentence as an attack on the setting', () => {
    // Mentioning a ward is not a claim about the wards.
    expect(verdict('I look at the ward on the gate.').kind).toBe('NONE');
    expect(verdict('I ask Kael about the record.').kind).toBe('NONE');
  });

  it('still resolves whatever the player attempted, and never lectures them', () => {
    const canonLine = NINTH_ARCHIVE.rules.hardCanon[0]!;
    const words = canonLine.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 4).slice(0, 2);
    const v = verdict(`There is no ${words[0]} and I am the ${words[1]}.`);
    const note = directorNoteFor(v, NINTH_ARCHIVE)!;
    expect(note).toMatch(/do not argue with the player/i);
    expect(note).toMatch(/do not lecture/i);
    expect(note).toMatch(/resolve whatever they actually attempted/i);
  });
});

describe('scope detection does not depend on which parser ran', () => {
  it('marks a campaign whatever produced the intent', async () => {
    const { annotateScope } = await import('./pipeline.js');
    const bare = {
      schemaVersion: '1.0' as const,
      intentId: 'i',
      rawAction: 'I burn down the academy.',
      dialogue: [],
      actions: [],
      confidence: 0.9,
      ambiguities: [],
      // A model parser returns this empty — which is why the engine branch
      // that reads it was dead in production.
      unsafeOrMetaRequests: [] as string[],
    };
    expect(annotateScope(bare, 'I burn down the academy.').unsafeOrMetaRequests).toContain('out_of_scope');
    expect(annotateScope(bare, 'I walk to the archive.').unsafeOrMetaRequests).toEqual([]);
  });

  it('does not mark the same thing twice', async () => {
    const { annotateScope } = await import('./pipeline.js');
    const already = {
      schemaVersion: '1.0' as const,
      intentId: 'i',
      rawAction: 'I burn down the academy.',
      dialogue: [],
      actions: [],
      confidence: 0.9,
      ambiguities: [],
      unsafeOrMetaRequests: ['out_of_scope'],
    };
    expect(annotateScope(already, 'I burn down the academy.').unsafeOrMetaRequests).toEqual(['out_of_scope']);
  });
});
