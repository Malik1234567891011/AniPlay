import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { WRITER_POLICY } from './model-stages.js';
import { FAST_WRITER_POLICY_FOR_TEST } from './fast-writer.js';

/**
 * The two writers must be told the same things.
 *
 * The streaming writer is the one on the fast path, which is to say the one
 * that writes almost every beat a player ever reads — and it carried a
 * five-sentence policy of its own while every rule earned by playing the game
 * lived in `WRITER_POLICY` and reached the writer production does not use.
 *
 * Nothing failed. The prose was simply worse, in exactly the ways the rules
 * existed to prevent.
 */
describe('both writers are told the same things', () => {
  it('the streaming writer carries the whole policy', () => {
    expect(FAST_WRITER_POLICY_FOR_TEST).toContain(WRITER_POLICY);
  });

  it('and the rules that came out of real sessions are in it', () => {
    for (const rule of [
      // Characters saying the player's name like a bot.
      'barely use your name at all',
      // The coach written out of the room she was standing in.
      'is in the room, right now',
      // A cast that is voiced but not motivated.
      'what is actually moving them',
      // (The endings rule lives in `worldRules` rather than here, because it
      // belongs next to the endings data. Both writers get that string from
      // `writerPayload`, so it is not part of this parity check.)
      // Length that reads on a phone.
      'Write in short paragraphs',
    ]) {
      expect(FAST_WRITER_POLICY_FOR_TEST, rule).toContain(rule);
    }
  });

  it('shows the player what changed, on the path that actually runs', () => {
    // `stateDeltaPresentation` was hardcoded empty on the streaming writer, so
    // on every ordinary turn the world moved and nobody was told: insulting
    // someone to their face produced a relationship delta the engine recorded
    // and the screen never mentioned. Fourteen of these in one sweep.
    const source = readFileSync(new URL('./fast-writer.ts', import.meta.url), 'utf8');
    expect(source).toContain('stateDeltaPresentation: buildDeltas(context)');
    expect(source).not.toContain('stateDeltaPresentation: []');
  });

  it('adds only what is genuinely different about streaming', () => {
    const extra = FAST_WRITER_POLICY_FOR_TEST.replace(WRITER_POLICY, '');
    expect(extra).toContain('plain prose, not JSON');
    expect(extra.length).toBeLessThan(400);
  });
});
