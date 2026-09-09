import type {
  ActionIntent,
  GameState,
  IntentAction,
  IntentDialogue,
  StoryVersion,
  Verb,
  Visibility,
} from '@aniplay/contracts';
import { charactersPresent } from '@aniplay/engine';

/**
 * Spec §17.1 step 5 — freeform text becomes a structured `ActionIntent`.
 *
 * This is the rule-based parser. It runs with no model, resolves against the
 * story's own vocabulary (its abilities, items, cast, and exits), and is what
 * makes the product playable offline. A model parser can replace or augment it
 * (see `ModelIntentParser`), but this one is the floor: it never hallucinates an
 * entity, because it can only name things the story actually defines.
 */

export interface ParseContext {
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly intentId: string;
}

export interface IntentParser {
  parse(text: string, context: ParseContext): Promise<ActionIntent>;
}

/** Ordered longest-phrase-first so "use ability" beats "use". */
const VERB_LEXICON: Array<{ verb: Verb; patterns: RegExp[] }> = [
  { verb: 'travel', patterns: [/\b(go|head|walk|travel|move|return|climb|descend|enter|leave|exit)\s+(to|into|for|toward|towards|back|up|down|out|in)\b/i, /\b(go|head|travel)\s+to\b/i] },
  { verb: 'attack', patterns: [/\b(attack|strike|hit|punch|stab|swing at|fight|lunge at|shove|tackle)\b/i] },
  { verb: 'defend', patterns: [/\b(defend|block|parry|brace|guard|shield myself|dodge)\b/i] },
  { verb: 'persuade', patterns: [/\b(persuade|convince|reason with|plead|appeal to|talk .* into|beg|argue)\b/i] },
  { verb: 'deceive', patterns: [/\b(lie|deceive|bluff|mislead|pretend|claim|feign|make up)\b/i] },
  { verb: 'threaten', patterns: [/\b(threaten|intimidate|menace|warn|scare|frighten)\b/i] },
  { verb: 'steal', patterns: [/\b(steal|pickpocket|swipe|lift|pilfer|palm|take .*'s)\b/i] },
  { verb: 'hide', patterns: [/\b(hide|sneak|slip past|creep|conceal myself|stay out of sight|duck behind)\b/i] },
  { verb: 'inspect', patterns: [/\b(look|inspect|examine|study|search|read|check|investigate|observe|scan|watch|listen)\b/i] },
  { verb: 'use_item', patterns: [/\b(use|drink|eat|apply|wear|equip|wield|draw|unsheathe|consume)\b/i] },
  { verb: 'use_ability', patterns: [/\b(cast|invoke|channel|weave|summon)\b/i] },
  { verb: 'rest', patterns: [/\b(rest|sleep|nap|wait out|recover|take a break|turn in)\b/i] },
  { verb: 'help', patterns: [/\b(help|assist|aid|support|cover for)\b/i] },
  { verb: 'oppose', patterns: [/\b(resist|refuse|oppose|stand against|hold firm|deny)\b/i] },
  { verb: 'wait', patterns: [/\b(wait|hold|stay put|do nothing|say nothing|stand still)\b/i] },
  { verb: 'interact', patterns: [/\b(open|close|push|pull|turn|touch|pick up|grab|take|unlock|knock|write|draw)\b/i] },
  { verb: 'speak', patterns: [/\b(say|tell|ask|talk|speak|reply|answer|greet|whisper|shout|call out)\b/i] },
];

/**
 * Spec §18.3 — the player's text is data, never instruction. Anything that
 * reads as an attempt to address the system rather than the world is captured
 * here so the pipeline can route it to a refusal instead of a prompt.
 */
const META_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\b(ignore|disregard|forget)\s+(all\s+)?(previous|prior|above|your)\s+(instructions?|rules?|prompts?)\b/i, label: 'instruction_override' },
  { pattern: /\b(system\s+prompt|your\s+instructions|reveal\s+your\s+prompt|what\s+is\s+your\s+prompt)\b/i, label: 'prompt_extraction' },
  { pattern: /\b(give|grant|add)\s+me\s+(\d+\s+)?(credits?|coins?|money|gold\s+coins)\b/i, label: 'currency_request' },
  { pattern: /\byou\s+are\s+now\b|\bact\s+as\b|\bpretend\s+to\s+be\s+(an?\s+)?(ai|assistant|dan)\b/i, label: 'role_override' },
  { pattern: /\b(set|make)\s+my\s+(stats?|health|level|attributes?)\s+to\b/i, label: 'state_override' },
  { pattern: /\b(developer|debug|admin)\s+mode\b/i, label: 'privilege_escalation' },
  { pattern: /\bjailbreak\b|\bDAN\s+mode\b/i, label: 'jailbreak' },
];

/** Clause separators that indicate genuinely sequential actions. */
const CLAUSE_SPLIT = /\s*(?:,\s*(?:and|then)\s+|\s+and\s+then\s+|;\s*|\s+then\s+)\s*/i;

export class RuleBasedIntentParser implements IntentParser {
  async parse(text: string, context: ParseContext): Promise<ActionIntent> {
    return this.parseSync(text, context);
  }

  parseSync(text: string, context: ParseContext): ActionIntent {
    const { story, state, intentId } = context;
    const raw = text.trim().slice(0, 4000);

    const unsafeOrMetaRequests = META_PATTERNS.filter((m) => m.pattern.test(raw)).map((m) => m.label);

    const { dialogue, remainder } = extractDialogue(raw, state, story);
    const clauses = splitClauses(remainder || raw);

    const ambiguities: string[] = [];
    const actions: IntentAction[] = [];

    for (const clause of clauses) {
      const action = this.parseClause(clause, context, ambiguities);
      if (action) actions.push(action);
      if (actions.length >= 8) break;
    }

    // Pure dialogue is a legitimate turn: speaking is an action.
    if (actions.length === 0) {
      const target = dialogue[0]?.speaker.entityId;
      actions.push({
        verb: dialogue.length > 0 ? 'speak' : 'custom',
        actor: { entityType: 'player', entityId: 'player' },
        targets: resolveTargets(raw, context) ?? (target ? [{ entityType: 'npc', entityId: target }] : []),
        method: raw.slice(0, 240),
        declaredOutcome: extractDeclaredOutcome(raw),
        timeIntent: 'NOW',
      });
      if (dialogue.length === 0 && raw.length > 0) {
        ambiguities.push('No recognised verb; treated as a freeform attempt.');
      }
    }

    return {
      schemaVersion: '1.0',
      intentId,
      rawAction: raw,
      dialogue,
      actions,
      confidence: computeConfidence(actions, ambiguities, unsafeOrMetaRequests),
      ambiguities,
      unsafeOrMetaRequests,
    };
  }

  private parseClause(
    clause: string,
    context: ParseContext,
    ambiguities: string[],
  ): IntentAction | null {
    const trimmed = clause.trim();
    if (trimmed.length === 0) return null;

    const { story, state } = context;

    // An ability affordance outranks a generic verb: "slip through the shadow"
    // is Veilstep, not a generic stealth attempt.
    const ability = matchAbility(trimmed, story, state);
    if (ability) {
      return {
        verb: 'use_ability',
        actor: { entityType: 'player', entityId: 'player' },
        targets: resolveTargets(trimmed, context) ?? [],
        method: trimmed.slice(0, 240),
        declaredOutcome: extractDeclaredOutcome(trimmed),
        abilityId: ability,
        timeIntent: detectTimeIntent(trimmed),
      };
    }

    const item = matchItem(trimmed, story, state);
    const verb = matchVerb(trimmed) ?? (item ? 'use_item' : 'custom');

    if (verb === 'custom') {
      ambiguities.push(`Unclear intent: "${trimmed.slice(0, 60)}"`);
    }

    const targets = resolveTargets(trimmed, context);
    if (verb === 'travel' && (!targets || targets.length === 0)) {
      ambiguities.push('Destination not recognised from here.');
    }

    return {
      verb,
      actor: { entityType: 'player', entityId: 'player' },
      targets: targets ?? [],
      method: trimmed.slice(0, 240),
      declaredOutcome: extractDeclaredOutcome(trimmed),
      itemId: verb === 'use_item' ? item : null,
      abilityId: null,
      timeIntent: detectTimeIntent(trimmed),
    };
  }
}

// --- Matching helpers ------------------------------------------------------

function matchVerb(clause: string): Verb | null {
  for (const entry of VERB_LEXICON) {
    for (const pattern of entry.patterns) {
      if (pattern.test(clause)) return entry.verb;
    }
  }
  return null;
}

/** Matches against the story's own authored affordance phrases (spec §12.10). */
function matchAbility(clause: string, story: StoryVersion, state: GameState): string | null {
  const lower = clause.toLowerCase();
  let best: { id: string; score: number } | null = null;

  for (const ability of story.abilities) {
    // Locked abilities are still matched: the engine refuses them in fiction,
    // which reads far better than the parser pretending not to understand.
    const names = [ability.name.toLowerCase(), ability.id.replace(/_/g, ' ')];
    for (const name of names) {
      if (lower.includes(name)) {
        const score = name.length + 100;
        if (!best || score > best.score) best = { id: ability.id, score };
      }
    }
    for (const affordance of ability.affordances) {
      const phrase = affordance.toLowerCase();
      if (lower.includes(phrase)) {
        const score = phrase.length;
        if (!best || score > best.score) best = { id: ability.id, score };
      }
    }
  }

  // Prefer an unlocked ability when two match equally well.
  if (best && !state.player.abilities.includes(best.id)) {
    const unlocked = story.abilities.find(
      (a) =>
        state.player.abilities.includes(a.id) &&
        a.affordances.some((aff) => clause.toLowerCase().includes(aff.toLowerCase())),
    );
    if (unlocked) return unlocked.id;
  }

  return best?.id ?? null;
}

function matchItem(clause: string, story: StoryVersion, state: GameState): string | null {
  const lower = clause.toLowerCase();
  const held = new Set(state.player.inventory.map((e) => e.itemId));

  let best: { id: string; score: number } | null = null;
  for (const item of story.items) {
    const names = [item.name.toLowerCase(), item.id.replace(/_/g, ' ')];
    for (const name of names) {
      if (!lower.includes(name)) continue;
      // Held items win ties, so "use the lens" means the one you are carrying.
      const score = name.length + (held.has(item.id) ? 50 : 0);
      if (!best || score > best.score) best = { id: item.id, score };
    }
  }
  return best?.id ?? null;
}

/**
 * Resolves named entities against what is actually reachable: NPCs in the room,
 * locations connected to this one, items in the story. Returns null when nothing
 * matched, so callers can distinguish "no target" from "unresolvable target".
 */
function resolveTargets(clause: string, context: ParseContext): IntentAction['targets'] | null {
  const { story, state } = context;
  const lower = clause.toLowerCase();
  const targets: IntentAction['targets'] = [];

  // NPCs — match anyone in the cast, present or not. Presence is the engine's
  // call; the parser's job is to say who was meant.
  for (const character of story.characters) {
    const first = character.name.split(/\s+/)[0]!.toLowerCase();
    if (lower.includes(character.name.toLowerCase()) || new RegExp(`\\b${escapeRegex(first)}\\b`, 'i').test(lower)) {
      targets.push({ entityType: 'npc', entityId: character.id, displayName: character.name });
    }
  }

  // Pronoun fallback: exactly one other person in the room is unambiguous.
  if (targets.length === 0 && /\b(him|her|them|they|he|she|it)\b/i.test(lower)) {
    const present = charactersPresent(state);
    if (present.length === 1) {
      const only = story.characters.find((c) => c.id === present[0]!.characterId);
      if (only) targets.push({ entityType: 'npc', entityId: only.id, displayName: only.name });
    }
  }

  // Locations — reachable exits first, then anywhere discovered.
  const here = story.locations.find((l) => l.id === state.player.locationId);
  const candidates = [
    ...(here?.connections.map((c) => story.locations.find((l) => l.id === c.to)) ?? []),
    ...story.locations.filter((l) => state.discoveredLocationIds.includes(l.id)),
  ].filter((l): l is NonNullable<typeof l> => !!l);

  for (const location of candidates) {
    const names = [location.name.toLowerCase(), location.shortName.toLowerCase()].filter(Boolean);
    if (names.some((n) => n.length > 2 && lower.includes(n))) {
      if (!targets.some((t) => t.entityId === location.id)) {
        targets.push({ entityType: 'location', entityId: location.id, displayName: location.name });
      }
      break;
    }
  }

  return targets.length > 0 ? targets : null;
}

/** Pulls quoted speech out and records who it is aimed at. */
function extractDialogue(
  raw: string,
  state: GameState,
  story: StoryVersion,
): { dialogue: IntentDialogue[]; remainder: string } {
  const dialogue: IntentDialogue[] = [];
  let remainder = raw;

  const quoted = raw.match(/[""']([^""']{2,600})[""']|"([^"]{2,600})"/g);
  if (quoted) {
    for (const match of quoted) {
      const text = match.replace(/^[""'"]|[""'"]$/g, '').trim();
      if (text.length === 0) continue;
      dialogue.push({
        speaker: {
          entityType: 'player',
          entityId: 'player',
          displayName: state.player.identity.displayName,
        },
        text,
        visibility: detectVisibility(raw, state),
      });
      remainder = remainder.replace(match, ' ');
    }
  }

  // Only quoted text becomes a spoken line. "Ask Bram what he knows" describes
  // an intent, not a verbatim utterance — rendering it as speech produces
  // ungrammatical dialogue. The phrasing still reaches the engine as the
  // action's `method`, and the NPC answers it.

  return { dialogue, remainder: remainder.trim() };
}

function detectVisibility(raw: string, state: GameState): Visibility {
  if (/\b(whisper|quietly|under my breath|privately|aside)\b/i.test(raw)) return 'PAIR_PRIVATE';
  if (/\b(shout|yell|announce|call out|in front of everyone)\b/i.test(raw)) return 'WORLD';
  if (/\b(think|to myself|silently)\b/i.test(raw)) return 'SELF';
  return charactersPresent(state).length > 1 ? 'GROUP' : 'GROUP';
}

/**
 * Captures what the player asserted would happen. Recorded so the engine can
 * explicitly refuse it — spec §3.2, freedom without omnipotence.
 */
function extractDeclaredOutcome(clause: string): string | null {
  const patterns = [
    /\b(?:and|so)\s+(?:then\s+)?(?:he|she|they|it|everyone|the\s+\w+)\s+(?:will\s+)?(\w[^.!?]{4,160})/i,
    /\b(?:successfully|obviously|of course|naturally)\s+([^.!?]{4,160})/i,
    /\bmaking\s+(?:him|her|them|it)\s+([^.!?]{4,160})/i,
  ];
  for (const pattern of patterns) {
    const match = clause.match(pattern);
    if (match?.[1]) return match[1].trim().slice(0, 200);
  }
  return null;
}

function detectTimeIntent(clause: string): IntentAction['timeIntent'] {
  if (/\b(after|once|when)\b/i.test(clause)) return 'AFTER';
  if (/\b(while|during|as)\b/i.test(clause)) return 'DURING';
  if (/\buntil\b/i.test(clause)) return 'UNTIL';
  if (/\b(now|immediately|right away|at once)\b/i.test(clause)) return 'NOW';
  return 'NOW';
}

function splitClauses(text: string): string[] {
  return text
    .split(CLAUSE_SPLIT)
    .map((c) => c.trim())
    .filter((c) => c.length > 1);
}

function computeConfidence(
  actions: readonly IntentAction[],
  ambiguities: readonly string[],
  meta: readonly string[],
): number {
  let confidence = 0.9;
  confidence -= ambiguities.length * 0.18;
  confidence -= meta.length * 0.25;
  if (actions.some((a) => a.verb === 'custom')) confidence -= 0.15;
  if (actions.some((a) => a.targets.length > 0)) confidence += 0.05;
  return Math.max(0.05, Math.min(1, Number(confidence.toFixed(2))));
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
