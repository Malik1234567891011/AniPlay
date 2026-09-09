import { describe, expect, it } from 'vitest';
import canonical from '../../ai_contracts.json' with { type: 'json' };
import {
  ActionIntent,
  BeatKind,
  BeatType,
  BlockType,
  CheckOutcome,
  EntityType,
  FactVisibility,
  MutationType,
  RiskLabel,
  ShotType,
  StageAction,
  TimeIntent,
  Verb,
  ViolationCode,
  Visibility,
} from './index.js';
import type { z } from 'zod';

/**
 * `ai_contracts.json` is the published contract; the Zod schemas are its
 * runtime twin. These tests fail loudly if the two drift apart.
 */

const defs = canonical.$defs as Record<string, any>;

function enumAt(path: string[]): string[] {
  let node: any = defs;
  for (const key of path) node = node[key];
  if (Array.isArray(node)) return node;
  if (node?.enum) return node.enum;
  if (node?.const) return [node.const];
  throw new Error(`No enum at ${path.join('.')}`);
}

function zodEnumValues(schema: z.ZodEnum<[string, ...string[]]>): string[] {
  return [...schema.options];
}

describe('ai_contracts.json parity', () => {
  it('declares the version this package implements', () => {
    expect(canonical.version).toBe('1.0.0');
  });

  const cases: Array<[string, string[], z.ZodEnum<[string, ...string[]]>]> = [
    ['EntityRef.entityType', ['EntityRef', 'properties', 'entityType'], EntityType],
    ['ActionIntent.actions.verb', ['ActionIntent', 'properties', 'actions', 'items', 'properties', 'verb'], Verb],
    [
      'ActionIntent.actions.timeIntent',
      ['ActionIntent', 'properties', 'actions', 'items', 'properties', 'timeIntent'],
      TimeIntent,
    ],
    [
      'ActionIntent.dialogue.visibility',
      ['ActionIntent', 'properties', 'dialogue', 'items', 'properties', 'visibility'],
      Visibility,
    ],
    ['CheckResult.outcome', ['CheckResult', 'properties', 'outcome'], CheckOutcome],
    ['StateMutation.type', ['StateMutation', 'properties', 'type'], MutationType],
    ['BeatPlan.beatType', ['BeatPlan', 'properties', 'beatType'], BeatType],
    [
      'BeatPlan.orderedBeats.kind',
      ['BeatPlan', 'properties', 'orderedBeats', 'items', 'properties', 'kind'],
      BeatKind,
    ],
    [
      'BeatPlan.suggestedActions.risk',
      ['BeatPlan', 'properties', 'suggestedActions', 'items', 'properties', 'risk'],
      RiskLabel,
    ],
    ['NarrativeTurn.blocks.type', ['NarrativeTurn', 'properties', 'blocks', 'items', 'properties', 'type'], BlockType],
    ['MemoryProposal.visibility', ['MemoryProposal', 'properties', 'visibility'], FactVisibility],
    ['MediaPlan.stageAction', ['MediaPlan', 'properties', 'stageAction'], StageAction],
    ['MediaPlan.heroImage.shotType', ['MediaPlan', 'properties', 'heroImage', 'properties', 'shotType'], ShotType],
    [
      'ConsistencyReport.violations.code',
      ['ConsistencyReport', 'properties', 'violations', 'items', 'properties', 'code'],
      ViolationCode,
    ],
  ];

  it.each(cases)('%s enum matches', (_name, path, schema) => {
    expect(zodEnumValues(schema).sort()).toEqual([...enumAt(path)].sort());
  });

  it('requires the same top-level ActionIntent fields', () => {
    const required = new Set(defs.ActionIntent.required as string[]);
    const zodKeys = new Set(Object.keys(ActionIntent.shape));
    for (const key of required) expect(zodKeys).toContain(key);
  });

  it('rejects an ActionIntent with an unknown verb', () => {
    const result = ActionIntent.safeParse({
      schemaVersion: '1.0',
      intentId: 'i1',
      rawAction: 'I teleport to the moon',
      dialogue: [],
      actions: [
        {
          verb: 'teleport',
          actor: { entityType: 'player', entityId: 'p1' },
          targets: [],
          method: 'will',
          declaredOutcome: null,
          timeIntent: 'NOW',
        },
      ],
      confidence: 0.5,
      ambiguities: [],
    });
    expect(result.success).toBe(false);
  });

  it('accepts a well-formed ActionIntent', () => {
    const result = ActionIntent.safeParse({
      schemaVersion: '1.0',
      intentId: 'i1',
      rawAction: 'I ask Mira why she lied.',
      dialogue: [
        {
          speaker: { entityType: 'player', entityId: 'p1', displayName: 'Malik' },
          text: 'Why did you lie about the archive?',
          visibility: 'GROUP',
        },
      ],
      actions: [
        {
          verb: 'persuade',
          actor: { entityType: 'player', entityId: 'p1' },
          targets: [{ entityType: 'npc', entityId: 'mira' }],
          method: 'direct question',
          declaredOutcome: null,
          timeIntent: 'NOW',
        },
      ],
      confidence: 0.86,
      ambiguities: [],
    });
    expect(result.success).toBe(true);
  });
});
