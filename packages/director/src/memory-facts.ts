import { translate, type Locale, type TranslationKey } from '@plotbreak/i18n';

/**
 * Memory facts, as structure rather than as prose.
 *
 * `LOCALIZATION_ARCHITECTURE.md` §5 — the worst finding in the French audit,
 * and the one worth fixing for the English side regardless.
 *
 * The director used to build these as English sentences:
 *
 * ```ts
 * value: `${player.name} threatened and belittled ${char.name} at ${loc}, ${time}.`
 * ```
 *
 * They are stored, retrieved, and handed to the writer as `speakers[].knows`
 * and to the choice generator as `remembered`. In a French session the model
 * therefore read English **in its own context window every single turn**, and
 * it compounded, because memory accumulates and never shrinks.
 *
 * They were never prose. They were an actor, a target, a verb, a place and a
 * minute, wearing prose. So the structure is what gets stored and the sentence
 * is produced at render time, in the session's locale, through the same
 * catalogue as everything else.
 *
 * ## Why this lives in `value` and not in a new field
 *
 * `MemoryProposal` is a **stage-3 AI contract** — `packages/contracts/ai_contracts.json`
 * is authoritative for it and the Zod twin may not diverge. Adding fields would
 * mean changing what the model is asked to emit, for a reason that has nothing
 * to do with the model.
 *
 * `value` is already `z.unknown()`. It is the escape hatch, and a structured
 * fact is exactly what it was for. A proposal whose `value` is a plain string —
 * which is what a model produces, and what most of the rule-based director
 * still produces — is untouched and renders exactly as it did.
 */

/** Social acts an NPC carries with them. Ids, not words. */
export type HostileVerb = 'threaten' | 'deceive' | 'oppose';

export type StructuredFact =
  | {
      readonly kind: 'ATTACK';
      readonly actorId: string;
      readonly targetId: string;
      readonly locationId: string;
      readonly worldMinute: number;
    }
  | {
      readonly kind: 'HOSTILE_ACT';
      readonly verb: HostileVerb;
      readonly actorId: string;
      readonly targetId: string;
      readonly locationId: string;
      readonly worldMinute: number;
    }
  | {
      readonly kind: 'WITNESSED_VIOLENCE';
      readonly witnessId: string;
      readonly actorId: string;
      readonly locationId: string;
      readonly worldMinute: number;
    }
  | {
      /** A check that went unusually well or unusually badly. */
      readonly kind: 'NOTABLE_MOMENT';
      /** The check's authored label. World content, translated with its world. */
      readonly label: string;
      /** The outcome id — `CRITICAL_SUCCESS`. Never the English words. */
      readonly outcome: string;
    };

const KINDS = new Set(['ATTACK', 'HOSTILE_ACT', 'WITNESSED_VIOLENCE', 'NOTABLE_MOMENT']);

/**
 * True when a proposal's `value` carries structure rather than a sentence.
 *
 * Deliberately narrow: anything that is not one of the four known shapes falls
 * through to the generic renderer and behaves as it always did. A model that
 * invents a `kind` does not get to reach the catalogue.
 */
export function isStructuredFact(value: unknown): value is StructuredFact {
  return (
    typeof value === 'object' &&
    value !== null &&
    'kind' in value &&
    typeof (value as { kind: unknown }).kind === 'string' &&
    KINDS.has((value as { kind: string }).kind)
  );
}

/**
 * What a structured fact needs from the world to become a sentence: names for
 * ids, and a clock for a minute.
 */
export interface FactRenderContext {
  readonly locale: Locale;
  /** Resolve a character, location, item or faction id to its display name. */
  readonly nameFor: (id: string) => string;
  /** The world clock at a minute, already in the run's locale. */
  readonly timeFor: (worldMinute: number) => string;
  /** A check outcome id to its plain-language label, in the run's locale. */
  readonly outcomeFor: (outcome: string) => string;
}

const KEY: Record<StructuredFact['kind'], TranslationKey> = {
  ATTACK: 'memory.attack',
  HOSTILE_ACT: 'memory.hostile_act',
  WITNESSED_VIOLENCE: 'memory.witnessed_violence',
  NOTABLE_MOMENT: 'memory.notable_moment',
};

/**
 * Render a structured fact as a sentence, in one locale.
 *
 * Pure, and callable at any time against any locale — which is the second
 * reason to store structure. The same run can be read in either language, so a
 * French session and an English one can actually be compared during QA.
 */
export function renderStructuredFact(fact: StructuredFact, ctx: FactRenderContext): string {
  const key = KEY[fact.kind];
  switch (fact.kind) {
    case 'ATTACK':
      return translate(ctx.locale, key, {
        actor: ctx.nameFor(fact.actorId),
        target: ctx.nameFor(fact.targetId),
        location: ctx.nameFor(fact.locationId),
        time: ctx.timeFor(fact.worldMinute),
      });
    case 'HOSTILE_ACT':
      return translate(ctx.locale, key, {
        verb: fact.verb,
        actor: ctx.nameFor(fact.actorId),
        target: ctx.nameFor(fact.targetId),
        location: ctx.nameFor(fact.locationId),
        time: ctx.timeFor(fact.worldMinute),
      });
    case 'WITNESSED_VIOLENCE':
      return translate(ctx.locale, key, {
        witness: ctx.nameFor(fact.witnessId),
        actor: ctx.nameFor(fact.actorId),
        location: ctx.nameFor(fact.locationId),
      });
    case 'NOTABLE_MOMENT':
      return translate(ctx.locale, key, {
        label: fact.label,
        outcome: ctx.outcomeFor(fact.outcome),
      });
  }
}

/**
 * The predicate as words — `was attacked by player`.
 *
 * Falls back to the underscore substitution the code did before, so a
 * predicate nobody has keyed still reads as something.
 */
export function predicatePhrase(predicate: string, locale: Locale): string {
  const key = `memory.predicate.${predicate}` as TranslationKey;
  const rendered = translate(locale, key);
  return rendered === key ? predicate.replace(/_/g, ' ').trim() : rendered;
}
