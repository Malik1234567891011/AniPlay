import type { NarrativeBlock, NarrativeTurn } from '@aniplay/contracts';
import type { BeatPlan } from '@aniplay/contracts';
import type { TurnContext } from './context.js';
import type { ModelGateway } from './gateway/types.js';
import { buildMessages, SAFETY_POLICY, WRITER_POLICY, writerPayload } from './model-stages.js';
import { buildDeltas } from './writer.js';

/**
 * Spec §17.10 — prose that arrives while it is being written.
 *
 * The autopsy that produced this: an ordinary turn cost three serial model
 * calls before a single word reached the player — parse 2350ms, director
 * 2368ms, writer 2219ms — plus a 1900ms accept round-trip, for a median of
 * 12.6 seconds to first readable text. The engine, the thing this whole
 * architecture was built around, took two milliseconds.
 *
 * The writer is the only one of those three that has to happen before prose
 * exists. And it does not have to *finish* before prose exists: it only has to
 * start.
 *
 * So this writes plain prose rather than a JSON document, and flushes it a
 * sentence at a time. A player reading the first sentence at a second and a
 * half is in a different product from one watching a spinner for twelve.
 *
 * The structured world data — memory proposals, media decisions, state deltas
 * — never came from the writer anyway. It comes from the engine and the
 * director, and it can finish after the player has started reading.
 */

/** Speaker attribution the writer is asked to use, and we parse back out. */
const SPEAKER_LINE = /^([A-Z][\w'’ -]{0,40}):\s*(.+)$/;

export interface StreamedBeat {
  readonly blocks: NarrativeBlock[];
}

/**
 * A complete sentence, or nothing yet.
 *
 * Flushing mid-sentence looks like a stutter rather than like writing, and
 * flushing per token exposes half-formed words. A sentence is the smallest
 * unit that reads as prose.
 */
export function takeCompleteSentences(buffer: string): { emit: string; rest: string } {
  // A terminator followed by whitespace, or a paragraph break.
  const match = /^([\s\S]*?[.!?…]["'’”]?)(\s+)([\s\S]*)$/.exec(buffer);
  if (!match) {
    const para = buffer.lastIndexOf('\n\n');
    if (para > 0) return { emit: buffer.slice(0, para), rest: buffer.slice(para + 2) };
    return { emit: '', rest: buffer };
  }
  return { emit: match[1]!, rest: match[3]! };
}

/**
 * Turns a chunk of written prose into blocks.
 *
 * `Kael: "..."` becomes dialogue attributed to Kael; everything else is
 * narration. Attribution is resolved against the cast so a name the world does
 * not have cannot become a speaker — the same guarantee the structured writer
 * gave, enforced on the way out instead of on the way in.
 */
export function blocksFrom(text: string, context: TurnContext): NarrativeBlock[] {
  const blocks: NarrativeBlock[] = [];
  const byName = speakerIndex(context);

  for (const paragraph of text.split(/\n+/).map((p) => p.trim()).filter(Boolean)) {
    const speech = SPEAKER_LINE.exec(paragraph);
    const speakerId = speech ? byName.get(speech[1]!.trim().toLowerCase()) : undefined;

    if (speech && speakerId) {
      blocks.push({
        type: 'DIALOGUE',
        speakerId,
        // Quotes are stripped here and drawn by the client, so the two writer
        // paths store the same thing and the presentation is one decision in
        // one place rather than a property of which path happened to run.
        text: stripQuotes(speech[2]!.trim()),
        visibility: 'GROUP',
        voiceEligible: true,
      } as NarrativeBlock);
    } else {
      blocks.push({
        type: 'NARRATION',
        speakerId: null,
        text: paragraph,
        visibility: 'GROUP',
        voiceEligible: false,
      } as NarrativeBlock);
    }
  }
  return blocks;
}

/**
 * Every name a speaker line might use, pointing at the person who owns it.
 *
 * Only the *first* word of each name was indexed, so "Captain Veyra Sol" was
 * reachable as "Captain" and nothing else — and a beat that wrote
 * `Veyra: "We should not linger."` did not parse as dialogue at all. It stayed
 * narration, which cost it the portrait and the speaker name on screen, and
 * then cost it the line itself: narration containing the player's name is
 * rewritten to "you", so a character addressing the player by name came out as
 * "I have no wish to explain myself to the Fleet this morning, you."
 *
 * A word two characters share points at neither. Guessing between them is how a
 * line ends up attributed to the wrong person, which is worse than leaving it
 * as narration.
 */
function speakerIndex(context: TurnContext): Map<string, string> {
  const index = new Map<string, string>();
  const ambiguous = new Set<string>();

  for (const character of context.story.characters) {
    const keys = [character.name, ...character.name.split(/\s+/)]
      .map((part) => part.toLowerCase())
      .filter((part) => part.length >= 3);

    for (const key of keys) {
      if (ambiguous.has(key)) continue;
      const existing = index.get(key);
      if (existing !== undefined && existing !== character.id) {
        index.delete(key);
        ambiguous.add(key);
        continue;
      }
      index.set(key, character.id);
    }
  }

  return index;
}

export interface FastWriteOptions {
  /** Called with each complete sentence or paragraph as it lands. */
  readonly onText?: (chunk: string) => void;
}

/**
 * Writes the beat as prose, streaming, and assembles it into a NarrativeTurn.
 *
 * The returned turn has the same shape the structured writer produced, so
 * validation, repair and persistence are unchanged downstream.
 */
export async function writeStreaming(
  gateway: ModelGateway,
  context: TurnContext,
  plan: BeatPlan,
  options: FastWriteOptions = {},
): Promise<NarrativeTurn> {
  const payload = writerPayload(context, plan);
  const messages = buildMessages({
    rolePolicy: FAST_WRITER_POLICY,
    safety: SAFETY_POLICY,
    worldRules: payload.worldRules,
    state: payload.state,
    task:
      `Write the next beat as plain prose. Roughly ${Math.round(plan.wordBudget * 0.7)}–${plan.wordBudget} ` +
      'words. Put each character\'s speech on its own line as `Name: "what they say"`. Everything else is ' +
      'narration. No headings, no lists, no stage directions in brackets, no commentary about the story.',
    untrustedUserText: context.playerAction,
  });

  let buffer = '';
  let full = '';

  for await (const chunk of gateway.streamText('writer_standard', messages, {
    maxTokens: Math.max(400, plan.wordBudget * 3),
    temperature: 0.85,
    timeoutMs: 30_000,
  })) {
    if (!chunk.delta) continue;
    buffer += chunk.delta;
    full += chunk.delta;

    const { emit, rest } = takeCompleteSentences(buffer);
    if (emit.trim().length > 0) {
      buffer = rest;
      options.onText?.(emit.trim());
    }
  }
  if (buffer.trim().length > 0) options.onText?.(buffer.trim());

  const blocks = blocksFrom(full, context);
  return {
    schemaVersion: '1.0',
    // A one-line record of the beat, taken from the beat rather than asked for
    // separately — one more field would be one more thing to wait on.
    sceneSummary: `${context.scene.locationName}. ${blocks[0]?.text ?? ''}`.slice(0, 320),
    blocks: blocks.length > 0 ? blocks : [{
      type: 'NARRATION', speakerId: null, text: full.trim() || 'The moment passes.',
      visibility: 'GROUP', voiceEligible: false,
    } as NarrativeBlock],
    // Derived, not asked for. These are what the player is *shown* changed —
    // "Dai reconsiders you" — and this path returned an empty list, so on the
    // fast path, which is every ordinary turn, the world moved and nobody was
    // told. Insulting somebody to their face produced a relationship delta the
    // engine recorded and the screen never mentioned.
    //
    // Free: `buildDeltas` reads mutations the engine has already made, so there
    // is nothing to wait for and nothing a model could get wrong.
    stateDeltaPresentation: buildDeltas(context),
    endStatePrompt: '',
  } as NarrativeTurn;
}

/**
 * The same policy the structured writer gets, plus what differs about streaming.
 *
 * This used to be five sentences of its own — and this is the writer that runs
 * on the fast path, which is to say the one that writes almost every beat a
 * player ever reads. Every rule earned the hard way lived in `WRITER_POLICY`
 * and reached the writer that production does not use: how characters use the
 * player's name, that people in the room cannot be written out of it, what to
 * do with what a character wants and fears, how long a paragraph should be.
 *
 * It is a system message and it does not change within a session, so sharing it
 * costs a cache read rather than a thinking budget.
 */
const FAST_WRITER_POLICY = [
  WRITER_POLICY,
  '',
  'You are writing plain prose, not JSON. Put each character’s speech on its own line as',
  'Name: "what they say". Everything else is narration. No headings, no lists, no stage directions in',
  'brackets, and no commentary about the story.',
].join('\n');

/** Exported for the parity test only. */
export const FAST_WRITER_POLICY_FOR_TEST = FAST_WRITER_POLICY;


/** `"…"` → `…`. The speech marks are the renderer's business. */
function stripQuotes(text: string): string {
  const trimmed = text.trim();
  const paired = /^(["'“”‘’])([\s\S]*)(["'“”‘’])$/.exec(trimmed);
  return paired ? paired[2]!.trim() : trimmed;
}
