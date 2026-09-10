/**
 * Everything the authored world knows about a person in the room, in the shape
 * the model stages consume.
 *
 * This exists because of a gap found by playing, not by reading schemas. The
 * launch worlds author their cast to a standard well beyond what the runtime
 * was using: Kai Sumire has a role, three public traits, a hidden drive, two
 * values, a fear ("Being the reason"), a social style ("Apologises first, then
 * says the smart thing"), a boundary ("Do not shout at him in front of
 * people"), two goals, a secret with a reveal hint, four topics, and three
 * voice samples.
 *
 * The writer — the stage that produces the actual words — was given his name,
 * his pronouns, his speech style, his voice samples, and a relationship
 * summary. Not one thing he wants, fears, values or would refuse. The director
 * got three of those fields and the writer got none, so characters were
 * *voiced* correctly and *motivated* not at all, which is precisely how a cast
 * ends up sounding interchangeable however good the individual lines are.
 *
 * One projection, used by both stages, so they cannot drift apart again.
 */
import type { PresentCharacterContext } from './context.js';

export interface SpeakerBrief {
  readonly id: string;
  readonly name: string;
  readonly pronouns: string;
  /** Why they are in this story at all. */
  readonly role: string;
  readonly traits: readonly string[];
  /** What they are trying to get. */
  readonly wants: readonly string[];
  /** What actually drives them, which they would never say out loud. */
  readonly privately: readonly string[];
  readonly fears: readonly string[];
  readonly values: readonly string[];
  /** How they engage — the behaviour, as distinct from the diction. */
  readonly socialStyle: string;
  readonly speechStyle: string;
  readonly voiceSamples: readonly string[];
  /** What they will not do, whatever the player says. */
  readonly wouldRefuse: readonly string[];
  readonly talksAbout: readonly string[];
  readonly looksLike: string;
  readonly knows: readonly string[];
  readonly feelsAboutYou: Record<string, number | string>;
  /**
   * Secrets whose gate the player has opened, as text.
   *
   * Previously only ids travelled, in both directions, so a gate could open and
   * the writer would still have no idea what the person had to say. The point
   * of earning somebody's trust is that they then tell you the thing.
   */
  readonly canTell: readonly string[];
  readonly mustNotReveal: readonly string[];
}

export function speakerBrief(c: PresentCharacterContext): SpeakerBrief {
  return {
    id: c.def.id,
    name: c.def.name,
    pronouns: c.def.pronouns,
    role: c.def.role,
    traits: c.def.publicTraits,
    wants: c.def.goals,
    privately: c.def.hiddenDrives,
    fears: c.def.fears,
    values: c.def.values,
    socialStyle: c.def.socialStyle,
    speechStyle: c.def.speechStyle,
    voiceSamples: c.def.voiceSamples,
    wouldRefuse: c.def.boundaries,
    talksAbout: c.def.topics,
    looksLike: [c.def.appearance, c.def.visualHook].filter(Boolean).join(' '),
    knows: c.knownMemories.map((m) => m.fact.text),
    feelsAboutYou: { ...c.relationship, label: c.relationshipLabel },
    canTell: c.revealableSecrets.map((s) => s.fact),
    mustNotReveal: c.def.secrets
      .filter((s) => !c.revealableSecrets.some((r) => r.id === s.id))
      .map((s) => s.id),
  };
}
