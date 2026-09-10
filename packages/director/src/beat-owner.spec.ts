import { describe, expect, it } from 'vitest';
import type { ActionIntent } from '@aniplay/contracts';
import { reactingCharacter } from './pipeline.js';
import type { TurnContext } from './context.js';

/**
 * Who owns the beat.
 *
 * The reaction frame is the first thing the player sees after they hit send,
 * and it says "this is who you just affected". Showing the wrong face is worse
 * than showing none: it tells the player the story did not understand them.
 */

const character = (id: string, name: string, weight = 0) =>
  ({
    def: { id, name },
    relationship: { trust: weight, affection: 0, respect: 0, fear: 0, rivalry: 0 },
  }) as unknown as TurnContext['presentCharacters'][number];

// Dai has the relationship weight, because the player just met him.
const PRESENT = [
  character('dai', 'Dai Okonkwo', 12),
  character('coach', 'Ena Torakawa', 0),
  character('jun', 'Jun Hasabe', 0),
];

const context = (present = PRESENT) => ({ presentCharacters: present }) as TurnContext;

const intent = (rawAction: string, targetId?: string): ActionIntent =>
  ({
    schemaVersion: '1.0',
    intentId: 'i',
    rawAction,
    dialogue: [],
    confidence: 0.9,
    ambiguities: [],
    unsafeOrMetaRequests: [],
    actions: [
      {
        verb: 'speak',
        actor: { entityType: 'player', entityId: 'player' },
        targets: targetId ? [{ entityType: 'npc', entityId: targetId, displayName: targetId }] : [],
        method: rawAction,
        declaredOutcome: '',
        timeIntent: 'NOW',
      },
    ],
  }) as ActionIntent;

describe('who owns the beat', () => {
  it('is whoever the parser resolved, when it resolved one', () => {
    expect(reactingCharacter(context(), intent('I nod at him.', 'jun'))!.def.id).toBe('jun');
  });

  it('is whoever the player named, when the parser missed it', () => {
    // The live failure: an ultimatum to the coach showed the teammate the
    // player had just shaken hands with.
    const raw =
      'I ignore the drill, walk over to Coach Torakawa and tell her I am not playing today ' +
      'unless she tells me why she really let the last five leave.';
    expect(reactingCharacter(context(), intent(raw))!.def.id).toBe('coach');
  });

  it('prefers the longer name, so "Coach Torakawa" beats a first name inside it', () => {
    const cast = [character('ena', 'Ena Smith', 30), character('coach', 'Ena Torakawa', 0)];
    expect(reactingCharacter(context(cast), intent('I ask Ena Torakawa.'))!.def.id).toBe('coach');
  });

  it('matches a surname on its own, because that is how people are addressed', () => {
    expect(reactingCharacter(context(), intent('Torakawa, why?'))!.def.id).toBe('coach');
  });

  it('does not match a name inside another word', () => {
    // "Jun" must not be found in "junction".
    expect(reactingCharacter(context(), intent('I look at the junction of the two lines.'))!.def.id).toBe('dai');
  });

  it('falls back to who the player has most going on with when nobody is named', () => {
    expect(reactingCharacter(context(), intent('I take the ball and drive.'))!.def.id).toBe('dai');
  });

  it('shows nobody when the player is alone', () => {
    expect(reactingCharacter(context([]), intent('I shout at the empty gym.'))).toBeNull();
  });
});
