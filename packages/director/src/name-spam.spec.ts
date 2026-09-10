import { describe, expect, it } from 'vitest';
import { NAME_SPAM_THRESHOLD, nameCount, stripSurplusVocatives } from './name-spam.js';

/**
 * The line that prompted this, verbatim from a live turn in Last Five.
 */
const CAUGHT_IN_THE_WILD =
  '“Dai Okonkwo, Sora, and glad to have you here twice in one minute. ' +
  'Go long next drill, Kai’ll find you, Sora, Sora, you’ll see.”';

describe('the chatbot tell', () => {
  it('counts what the line actually does', () => {
    expect(nameCount(CAUGHT_IN_THE_WILD, 'Sora Kimura')).toBe(3);
    expect(nameCount(CAUGHT_IN_THE_WILD, 'Sora Kimura')).toBeGreaterThanOrEqual(NAME_SPAM_THRESHOLD);
  });

  it('keeps the first address and removes the rest', () => {
    const fixed = stripSurplusVocatives(CAUGHT_IN_THE_WILD, 'Sora Kimura');
    expect(nameCount(fixed, 'Sora')).toBe(1);
    // The line still says what it said.
    expect(fixed).toContain('Dai Okonkwo');
    expect(fixed).toContain('Go long next drill');
    expect(fixed).toContain('you’ll see');
  });

  it('leaves the name alone where it is doing work in the sentence', () => {
    const text = 'Sora will start on Friday. Torakawa has already told Sora as much.';
    expect(stripSurplusVocatives(text, 'Sora')).toBe(text);
  });

  it('does not fuse two sentences when it removes an opening address', () => {
    const fixed = stripSurplusVocatives('Sora, listen. Sora, I mean it. Sora, please.', 'Sora');
    expect(nameCount(fixed, 'Sora')).toBe(1);
    // Removing an opening address must not leave a lowercase sentence behind.
    expect(fixed).toBe('Sora, listen. I mean it. Please.');
  });

  it('ignores a name too short to match safely', () => {
    const text = 'Jo, Jo, Jo.';
    expect(nameCount(text, 'Jo')).toBe(0);
    expect(stripSurplusVocatives(text, 'Jo')).toBe(text);
  });

  it('leaves an ordinary line untouched', () => {
    const text = '“Good to meet you, Sora. Team lists post Friday.”';
    expect(stripSurplusVocatives(text, 'Sora')).toBe(text);
  });
});
