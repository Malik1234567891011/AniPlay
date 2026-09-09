import type {
  ConsistencyReport,
  ConsistencyViolation,
  NarrativeTurn,
} from '@aniplay/contracts';
import { countItem, isSuccess } from '@aniplay/engine';
import type { TurnContext } from './context.js';

/**
 * Spec §17.1 step 10 — the consistency validator.
 *
 * Deliberately deterministic rather than model-backed. Its whole job is to check
 * generated prose against authoritative state, and a rule that reads the actual
 * inventory is strictly more trustworthy than a model asked whether the
 * inventory looks right. It is the last gate before commit, and it holds even
 * when every earlier stage has been talked into something.
 */

export interface ValidateOptions {
  readonly context: TurnContext;
  readonly turn: NarrativeTurn;
}

export function validateNarrative({ context, turn }: ValidateOptions): ConsistencyReport {
  const violations: ConsistencyViolation[] = [];
  const { story, state, resolution } = context;

  const push = (
    code: ConsistencyViolation['code'],
    severity: ConsistencyViolation['severity'],
    description: string,
    blockIndex: number | null = null,
  ): void => {
    violations.push({ code, severity, description, blockIndex });
  };

  // --- FORMAT ---
  if (turn.blocks.length === 0) push('FORMAT', 'ERROR', 'Turn has no blocks.');
  if (turn.blocks.length > 12) push('FORMAT', 'ERROR', 'Turn exceeds 12 blocks.');
  if (turn.sceneSummary.length > 320) push('FORMAT', 'ERROR', 'Scene summary exceeds 320 characters.');
  if (turn.endStatePrompt.length > 160) push('FORMAT', 'ERROR', 'End prompt exceeds 160 characters.');

  turn.blocks.forEach((block, index) => {
    if (block.text.trim().length === 0) push('FORMAT', 'ERROR', 'Empty block.', index);
    if (block.text.length > 1200) push('FORMAT', 'ERROR', 'Block exceeds 1200 characters.', index);

    if (block.type === 'DIALOGUE') {
      if (!block.speakerId) {
        push('FORMAT', 'ERROR', 'Dialogue block has no speaker.', index);
        return;
      }
      const known =
        block.speakerId === 'player' || story.characters.some((c) => c.id === block.speakerId);
      if (!known) {
        push('NAME_IDENTITY_DRIFT', 'ERROR', `Unknown speaker "${block.speakerId}".`, index);
        return;
      }

      // --- DEAD_ENTITY_SPEAKS ---
      const runtime = state.characters.find((c) => c.characterId === block.speakerId);
      if (runtime && !runtime.alive) {
        const character = story.characters.find((c) => c.id === block.speakerId);
        push('DEAD_ENTITY_SPEAKS', 'ERROR', `${character?.name ?? block.speakerId} is dead and cannot speak.`, index);
      }

      // A character who is not in the room cannot have a line in this scene.
      if (runtime && runtime.locationId !== state.player.locationId) {
        const character = story.characters.find((c) => c.id === block.speakerId);
        push(
          'LOCATION_CONTRADICTION',
          'ERROR',
          `${character?.name ?? block.speakerId} is not at ${context.scene.locationName}.`,
          index,
        );
      }

      // --- KNOWLEDGE_LEAK ---
      const character = story.characters.find((c) => c.id === block.speakerId);
      if (character) {
        const allowed = new Set(runtime?.revealedSecretIds ?? []);
        for (const secret of character.secrets) {
          if (allowed.has(secret.id)) continue;
          if (mentionsSecret(block.text, secret.fact)) {
            push(
              'KNOWLEDGE_LEAK',
              'ERROR',
              `${character.name} referenced secret "${secret.id}" before it was revealed.`,
              index,
            );
          }
        }
        // Nobody may voice a CREATOR_ONLY fact, from any cast member.
        for (const other of story.characters) {
          for (const secret of other.secrets) {
            if (secret.visibility === 'CREATOR_ONLY' && mentionsSecret(block.text, secret.fact)) {
              push('KNOWLEDGE_LEAK', 'ERROR', `Creator-only fact "${secret.id}" appeared in dialogue.`, index);
            }
          }
        }
      }
    }
  });

  const fullText = turn.blocks.map((b) => b.text).join('\n');
  const lower = fullText.toLowerCase();

  // --- NAME_IDENTITY_DRIFT ---
  const playerName = state.player.identity.displayName;
  if (playerName.length > 2) {
    for (const character of story.characters) {
      const first = character.name.split(/\s+/)[0]!;
      if (first.toLowerCase() === playerName.toLowerCase()) continue;
      const addressedAsNpc = new RegExp(`\\byou(?:,| are| were)? ${escapeRegex(first)}\\b`, 'i');
      if (addressedAsNpc.test(fullText)) {
        push('NAME_IDENTITY_DRIFT', 'WARN', `Player appears to be addressed as ${first}.`);
      }
    }
  }

  // --- INVENTORY_CONTRADICTION ---
  for (const item of story.items) {
    const held = countItem(state, item.id) > 0;
    if (held) continue;
    const name = item.name.toLowerCase();
    if (!lower.includes(name)) continue;
    const claimsPossession = new RegExp(
      `\\b(your|you (?:draw|take out|produce|pull out|hold|carry|use|raise)|from your (?:pocket|bag|coat))[^.]{0,40}${escapeRegex(name)}`,
      'i',
    );
    if (claimsPossession.test(fullText)) {
      push('INVENTORY_CONTRADICTION', 'ERROR', `Prose has the player using ${item.name}, which they do not hold.`);
    }
  }

  // --- LOCATION_CONTRADICTION ---
  const current = story.locations.find((l) => l.id === state.player.locationId);
  for (const location of story.locations) {
    if (location.id === state.player.locationId) continue;
    const arrives = new RegExp(
      `\\byou (?:are|stand|arrive|step|walk|enter)[^.]{0,30}(?:in|into|at) ${bareName(location.name)}\\b`,
      'i',
    );
    if (arrives.test(fullText)) {
      push(
        'LOCATION_CONTRADICTION',
        'ERROR',
        `Prose places the player in ${location.name}; state says ${current?.name ?? state.player.locationId}.`,
      );
    }
  }

  // --- UNSUPPORTED_STATE ---
  // Prose claiming a state change the engine did not make is the single most
  // common way a generated turn drifts out of truth.
  const grantedItems = new Set(
    resolution.mutations
      .filter((m) => m.type === 'ITEM_ADD')
      .map((m) => (m.payload as { itemId?: string }).itemId),
  );
  for (const item of story.items) {
    if (grantedItems.has(item.id)) continue;
    const gainPattern = new RegExp(
      `\\byou (?:now have|receive|are given|gain|pocket|acquire)[^.]{0,30}${escapeRegex(item.name.toLowerCase())}`,
      'i',
    );
    if (gainPattern.test(fullText)) {
      push('UNSUPPORTED_STATE', 'ERROR', `Prose grants ${item.name} with no ITEM_ADD mutation.`);
    }
  }

  if (/\byou level(?: up)?\b|\byou reach level \d/i.test(fullText)) {
    const levelled = resolution.mutations.some((m) => m.type === 'LEVEL_CHANGE');
    if (!levelled) push('UNSUPPORTED_STATE', 'ERROR', 'Prose announces a level change with no LEVEL_CHANGE mutation.');
  }

  // --- QUEST_CONTRADICTION ---
  for (const quest of story.quests) {
    const progress = state.quests.find((q) => q.questId === quest.id);
    if (!progress || progress.status === 'COMPLETED') continue;
    const completes = new RegExp(
      `${escapeRegex(quest.title.toLowerCase())}[^.]{0,40}\\b(complete|completed|finished|done|over)\\b`,
      'i',
    );
    if (completes.test(fullText)) {
      push('QUEST_CONTRADICTION', 'ERROR', `Prose completes "${quest.title}" while its state is ${progress.status}.`);
    }
  }

  // --- RELATIONSHIP_GATE_BYPASS ---
  // Spec §14.3 — the writer cannot open a gate by asserting it happened.
  //
  // Keyed off what the prose *claims*, not off gate naming: a romantic
  // declaration needs either an unlocked ROMANCE gate for that character, or
  // relationship state that would plausibly support one. Otherwise it is the
  // model deciding an outcome the engine never granted.
  for (const character of story.characters) {
    const rel = state.relationships.find((r) => r.characterId === character.id);
    if (!rel) continue;

    const first = escapeRegex(character.name.split(/\s+/)[0]!.toLowerCase());
    const romanceClaim = new RegExp(
      `\\b${first}\\b[^.!?]{0,80}\\b(loves you|is in love|kisses you|confesses|falls for you|takes your hand)\\b`,
      'i',
    );
    if (!romanceClaim.test(fullText)) continue;

    const romanceGateOpen = character.gates.some(
      (gate) => gate.kind === 'ROMANCE' && rel.unlockedGates.includes(gate.id),
    );
    // Spec §14.3's own worked example threshold.
    const plausible = rel.affection >= 55 && rel.trust >= 35;

    if (!romanceGateOpen && !plausible) {
      push(
        'RELATIONSHIP_GATE_BYPASS',
        'ERROR',
        `Prose has ${character.name} declare a romantic outcome that no unlocked gate or relationship state supports.`,
      );
    }
  }

  // A failed attempt must not be narrated as compliance.
  const failedSocial = resolution.checks.find(
    (c) => !isSuccess(c.outcome) && /persuade|deceive|intimidate/i.test(c.label),
  );
  if (failedSocial) {
    const target = failedSocial.label.split(' ').slice(1).join(' ').trim();
    const first = target.split(/\s+/)[0];
    if (first && first.length > 2) {
      const complies = new RegExp(
        `${escapeRegex(first.toLowerCase())}[^.]{0,60}\\b(agrees|nods|relents|steps aside|lets you (?:pass|through)|hands (?:it|them) over|believes you)\\b`,
        'i',
      );
      if (complies.test(fullText)) {
        push('UNSUPPORTED_STATE', 'ERROR', `${first} complies in prose after the check failed.`);
      }
    }
  }

  // --- SAFETY ---
  // A minimal structural check. Provider moderation runs separately (§29.1);
  // this catches the case where system text leaks into player-visible prose.
  if (/\b(system prompt|as an ai|i am an ai language model|my instructions)\b/i.test(fullText)) {
    push('SAFETY', 'ERROR', 'Generated prose leaked system or assistant framing.');
  }

  return {
    valid: !violations.some((v) => v.severity === 'ERROR'),
    violations,
  };
}

/**
 * Spec §17.1 step 11 — a single constrained repair pass, never a recursive loop.
 * Offending blocks are removed rather than rewritten, because dropping a bad
 * sentence is always safe and rewriting one might not be.
 */
export function repairNarrative(
  turn: NarrativeTurn,
  report: ConsistencyReport,
): NarrativeTurn {
  const badIndices = new Set(
    report.violations
      .filter((v) => v.severity === 'ERROR' && typeof v.blockIndex === 'number')
      .map((v) => v.blockIndex as number),
  );

  const globalErrors = report.violations.filter(
    (v) => v.severity === 'ERROR' && v.blockIndex === null && v.code !== 'FORMAT',
  );

  let blocks = turn.blocks.filter((_, index) => !badIndices.has(index));

  // A global contradiction has no single guilty block, so strip the sentences
  // that assert it and keep the rest of the beat readable.
  if (globalErrors.length > 0) {
    blocks = blocks
      .map((block) => ({
        ...block,
        text: block.text
          .split(/(?<=[.!?])\s+/)
          .filter((sentence) => !globalErrors.some((error) => sentenceTriggers(sentence, error)))
          .join(' ')
          .trim(),
      }))
      .filter((block) => block.text.length > 0);
  }

  if (blocks.length === 0) {
    blocks = [
      {
        type: 'NARRATION',
        speakerId: null,
        text: 'The moment passes without giving you what you wanted.',
        visibility: 'GROUP',
        voiceEligible: false,
      },
    ];
  }

  return { ...turn, blocks: blocks.slice(0, 12) };
}

function sentenceTriggers(sentence: string, violation: ConsistencyViolation): boolean {
  const subject = violation.description.match(/"([^"]+)"|\b([A-Z][a-z]+)\b/);
  const needle = (subject?.[1] ?? subject?.[2] ?? '').toLowerCase();
  return needle.length > 2 && sentence.toLowerCase().includes(needle);
}

/**
 * Content-word overlap, so a paraphrased secret is caught rather than only a
 * verbatim quote. Deliberately conservative: it flags rather than blocks
 * anything below the threshold.
 */
function mentionsSecret(text: string, secretFact: string): boolean {
  const stop = new Set(['the', 'a', 'an', 'and', 'of', 'to', 'in', 'is', 'was', 'that', 'has', 'have', 'for', 'from', 'they', 'she', 'he', 'it', 'her', 'his', 'their', 'been', 'with', 'this', 'who', 'not', 'never']);
  const words = secretFact
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !stop.has(w));
  if (words.length === 0) return false;

  const lower = text.toLowerCase();
  const hits = words.filter((w) => lower.includes(w)).length;
  return hits / words.length >= 0.6;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Matches a place name with or without its leading article, so a location
 * literally named "The Stacks" is found in both "at The Stacks" and "at Stacks".
 */
function bareName(name: string): string {
  const lower = name.toLowerCase();
  const stripped = lower.replace(/^the\s+/, '');
  return `(?:the )?${escapeRegex(stripped)}`;
}
