import { describe, expect, it } from 'vitest';
import { LAST_FIVE } from '@plotbreak/test-fixtures';
import { speakerBrief } from './speaker-brief.js';
import type { PresentCharacterContext } from './context.js';

/**
 * The authored world reaching the stage that writes the words.
 *
 * This is a delivery test, not a formatting test. The launch worlds author
 * their cast far beyond what the runtime was using, and nothing failed when
 * those fields were dropped — the prose just quietly got worse, and every
 * character started sounding like the same thoughtful narrator.
 */

const kai = LAST_FIVE.characters.find((c) => c.id === 'kai')!;

const context = (overrides: Partial<PresentCharacterContext> = {}): PresentCharacterContext => ({
  def: kai,
  relationshipTone: 'WARM' as const,
  relationshipLabel: 'Warming',
  relationship: { trust: 30, affection: 5, respect: 0, fear: 0, rivalry: 0 },
  address: { toPlayer: 'TU', fromPlayer: 'TU', pendingShift: null },
  knownMemories: [],
  revealableSecrets: [],
  openGates: [],
  ...overrides,
});

describe('what the writer is told about a person in the room', () => {
  it('carries everything the world authored about them', () => {
    const brief = speakerBrief(context());

    expect(brief.role).toBe(kai.role);
    expect(brief.traits).toEqual(kai.publicTraits);
    expect(brief.wants).toEqual(kai.goals);
    expect(brief.privately).toEqual(kai.hiddenDrives);
    expect(brief.fears).toEqual(kai.fears);
    expect(brief.values).toEqual(kai.values);
    expect(brief.socialStyle).toBe(kai.socialStyle);
    expect(brief.wouldRefuse).toEqual(kai.boundaries);
    expect(brief.talksAbout).toEqual(kai.topics);
    expect(brief.voiceSamples).toEqual(kai.voiceSamples);
    expect(brief.looksLike).toContain(kai.appearance);
  });

  it('carries the things that actually make him behave like himself', () => {
    // Named individually because these are the ones that were missing, and a
    // regression here is invisible in play until the cast goes flat.
    const brief = speakerBrief(context());
    expect(brief.fears).toContain('Being the reason');
    expect(brief.wouldRefuse).toContain('Do not shout at him in front of people');
    expect(brief.socialStyle).toMatch(/apologises first/i);
  });

  it('tells the writer a secret only once the player has earned it', () => {
    const locked = speakerBrief(context());
    expect(locked.canTell).toEqual([]);
    expect(locked.mustNotReveal).toEqual(['kai_why_kosei']);

    const secret = kai.secrets[0]!;
    const opened = speakerBrief(
      context({ revealableSecrets: [{ id: secret.id, fact: secret.fact }] }),
    );
    // The point of earning trust is that they then tell you the thing. Only
    // ids used to travel, so a gate could open and the writer would still have
    // no idea what the person had to say.
    expect(opened.canTell).toEqual([secret.fact]);
    expect(opened.mustNotReveal).toEqual([]);
  });

  it('leaves nothing authored on a launch-world character unused', () => {
    // A field added to CharacterDef and never wired through is the exact bug
    // this file exists to catch, so the check is on the shape rather than on
    // any one name.
    const brief = speakerBrief(context()) as unknown as Record<string, unknown>;
    const carried = new Set(Object.values(brief).flatMap((v) => (Array.isArray(v) ? v : [v])));
    for (const authored of [
      kai.role,
      kai.socialStyle,
      kai.speechStyle,
      ...kai.publicTraits,
      ...kai.hiddenDrives,
      ...kai.values,
      ...kai.fears,
      ...kai.boundaries,
      ...kai.goals,
      ...kai.topics,
    ]) {
      expect(carried, `not delivered to the writer: ${authored}`).toContain(authored);
    }
  });
});
