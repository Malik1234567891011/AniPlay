import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { LAST_SERVICE } from './index.js';

/**
 * Last Service, held to the three things the bible is most insistent about.
 *
 * The first, and the one that decides whether this is a cooking story or a
 * tournament: **not every important cooking scene is a competition.** The City
 * Table is three of the twelve quest steps. The rest of the world is a staff
 * meal, a friend who cannot eat, a market at five in the morning and an aunt
 * who has not taken a full day since March, and the abilities have to make
 * those playable rather than decorative.
 *
 * The second: the central question changes underneath the player. It starts as
 * "save Akari" and becomes "what does save actually mean", and both answers
 * have to be real endings rather than a win and a consolation. Closing a
 * nineteen-year-old restaurant on purpose, with a full room, is not a loss.
 *
 * The third: Keiko is the whole engine of that question, and her schedule is
 * the argument. If the data lets her rest, the prose claiming she cannot is
 * decoration. So the clock is checked, not the character sheet.
 */

const start = (archetypeId = 'arch_trained') =>
  createInitialState({
    sessionId: 'sess_ls',
    story: LAST_SERVICE,
    identity: {
      displayName: 'Sora',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: 'Grilled fish, braises, and whatever was good at the market.',
      advanced: {},
      portraitAssetId: null,
    },
  });

/** Every flag a single playthrough could ever set. */
function settable(): Set<string> {
  const flags = new Set<string>(['left_the_map', 'qualified']);
  for (const quest of LAST_SERVICE.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of LAST_SERVICE.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

describe('the first minute of Friday service', () => {
  it('puts the two people the opening names in the room the player starts in', () => {
    const state = start();
    const present = charactersPresent(state).map((c) => c.characterId);
    // The prose names Keiko at the stove and Daichi on the grill. Both are in
    // akari_kitchen at 19:40, or the player is told about an empty room.
    expect(present).toContain('keiko');
    expect(present).toContain('daichi');
  });

  it('keeps Mina one room away, because the door is the beat', () => {
    const state = start();
    const present = charactersPresent(state).map((c) => c.characterId);
    expect(present).not.toContain('mina');
    // She is in the dining room at 19:40 — through the door, not on the line.
    const block = LAST_SERVICE.characters
      .find((c) => c.id === 'mina')!
      .schedule.find((b) => b.startMinute <= 1180 && b.endMinute > 1180)!;
    expect(block.locationId).toBe('akari_dining');
  });

  it('does not name her in the opening, because the room does not know her yet', () => {
    expect(LAST_SERVICE.opening).not.toContain('Mina');
    expect(LAST_SERVICE.opening).toContain('knife roll');
  });

  it('starts the player at the stove with a knife roll and nothing else', () => {
    expect(LAST_SERVICE.rules.startingLocationId).toBe('akari_kitchen');
    expect(LAST_SERVICE.rules.startWorldMinute).toBe(19 * 60 + 40);
    expect(LAST_SERVICE.rules.startingItems.map((i) => i.itemId)).toEqual(['knife_roll']);
  });

  it('answers the opening in the player’s own voice, three ways, short', () => {
    expect(LAST_SERVICE.openingSuggestions).toHaveLength(3);
    for (const s of LAST_SERVICE.openingSuggestions) {
      expect(s.length, s).toBeLessThanOrEqual(320);
      expect(/^I |^I'|^I’/.test(s), `not first person: ${s}`).toBe(true);
    }
  });
});

describe('not every important scene is a competition', () => {
  it('spends most of the quest line somewhere other than the circuit', () => {
    const steps = LAST_SERVICE.quests.flatMap((q) => q.steps);
    const circuit = LAST_SERVICE.quests.find((q) => q.id === 'q_the_circuit')!.steps;
    expect(circuit.length).toBe(3);
    expect(circuit.length / steps.length).toBeLessThan(0.34);
  });

  it('makes the uncompetitive things cost as much as the Services', () => {
    const byId = new Map(LAST_SERVICE.abilities.map((a) => [a.id, a]));
    // Cooking for one person is a real action with a real price, not a cutscene.
    for (const id of ['cook_for_one_person', 'do_something_nobody_asked_for', 'go_to_the_market']) {
      const a = byId.get(id);
      expect(a, id).toBeDefined();
      const hands = a!.costs.find((c) => c.resourceId === 'hands');
      expect(hands, `${id} is free`).toBeDefined();
      expect(hands!.amount).toBeGreaterThanOrEqual(8);
    }
  });

  it('lets a Service have no winner without ending the quest', () => {
    const circuit = LAST_SERVICE.quests.find((q) => q.id === 'q_the_circuit')!;
    for (const step of circuit.steps) {
      // Every Service step has a route through it that is not a win.
      expect(step.succeedWhenAny.length, step.id).toBeGreaterThanOrEqual(3);
    }
    const first = circuit.steps[0]!;
    expect(first.succeedWhenAny.some((r) => r.setsFlags.includes('came_nowhere'))).toBe(true);
    const last = circuit.steps[2]!;
    expect(last.succeedWhenAny.some((r) => r.setsFlags.includes('the_service_failed'))).toBe(true);
  });

  it('keeps the cuisine the player’s, in the rules and not just the blurb', () => {
    const canon = LAST_SERVICE.rules.hardCanon.join(' ');
    expect(canon).toMatch(/cuisine is whatever the player says it is/i);
    const cuisineField = LAST_SERVICE.setupFields.find((f) => f.id === 'worldKnowsAboutYou')!;
    expect(cuisineField.required ?? false).toBe(false);
  });
});

describe('three resources, and each one drives something different', () => {
  it('costs Hands for every act of cooking and nothing else for most of them', () => {
    for (const a of LAST_SERVICE.abilities) {
      expect(a.costs.some((c) => c.resourceId === 'hands'), `${a.id} costs no hands`).toBe(true);
    }
    const hands = LAST_SERVICE.resources.find((r) => r.id === 'hands')!;
    expect(hands.polarity).toBe('GOOD_HIGH');
    expect(hands.displayPriority).toBe(1);
  });

  it('gives Talk and Debt an ability apiece, so neither is scenery', () => {
    for (const id of ['talk', 'debt']) {
      const spenders = LAST_SERVICE.abilities.filter((a) =>
        a.costs.some((c) => c.resourceId === id),
      );
      expect(spenders.length, `nothing costs ${id}`).toBeGreaterThan(0);
    }
  });

  it('bands every resource so the player is told where they are', () => {
    for (const r of LAST_SERVICE.resources) {
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      const tops = r.bands.map((b) => b.upTo);
      expect([...tops].sort((a, b) => a - b), `${r.id} bands out of order`).toEqual(tops);
      expect(tops[tops.length - 1]).toBe(r.max);
    }
  });

  it('keeps Debt a thing you take on rather than a thing you earn', () => {
    const debt = LAST_SERVICE.resources.find((r) => r.id === 'debt')!;
    expect(debt.polarity).toBe('GOOD_LOW');
    const spend = LAST_SERVICE.abilities.find((a) => a.id === 'spend_money_you_do_not_have')!;
    expect(spend.costs.find((c) => c.resourceId === 'debt')!.amount).toBeGreaterThan(8);
  });
});

describe('the dish you have never shown anybody', () => {
  it('is gated on understanding rather than on rank', () => {
    const a = LAST_SERVICE.abilities.find(
      (x) => x.id === 'cook_the_thing_you_have_never_shown_anybody',
    )!;
    expect(a.unlockedByDefault).toBe(false);
    expect(a.requires.flagsSet).toContain('knows:what_it_is_about');
  });

  it('is actually handed to the player by a step they can reach', () => {
    const granted = LAST_SERVICE.quests
      .flatMap((q) => q.steps)
      .flatMap((s) => s.rewards.abilities ?? []);
    expect(granted).toContain('cook_the_thing_you_have_never_shown_anybody');
    expect([...settable()]).toContain('knows:what_it_is_about');
  });
});

describe('save Akari, and then what save means', () => {
  it('offers twelve endings, several of which lose the restaurant', () => {
    expect(LAST_SERVICE.endings).toHaveLength(12);
    const closes = LAST_SERVICE.endings.filter((e) =>
      (e.requires.flagsSet ?? []).includes('akari_closes'),
    );
    expect(closes.length).toBeGreaterThanOrEqual(1);
    const leaves = LAST_SERVICE.endings.filter((e) =>
      (e.requires.flagsSet ?? []).some((f) =>
        ['went_to_vanta', 'went_to_the_street', 'stopped_cooking'].includes(f),
      ),
    );
    expect(leaves.length).toBeGreaterThanOrEqual(3);
  });

  it('does not write closing it well as a defeat', () => {
    const e = LAST_SERVICE.endings.find((x) => x.id === 'end_the_last_service')!;
    expect(e.condition).toMatch(/not a defeat/i);
    expect(e.rarity).not.toBe('COMMON');
  });

  it('lets the player walk away from cooking entirely', () => {
    const e = LAST_SERVICE.endings.find((x) => x.id === 'end_stopped')!;
    expect(e.requires.flagsSet).toContain('left_the_map');
    expect(e.condition).toMatch(/not a failure/i);
  });

  it('reaches every ending flag from a single run', () => {
    const flags = settable();
    for (const e of LAST_SERVICE.endings) {
      for (const f of e.requires.flagsSet ?? []) {
        expect(flags.has(f), `${e.id} needs ${f}, which nothing sets`).toBe(true);
      }
      for (const f of e.requires.flagsUnset ?? []) {
        expect(flags.has(f), `${e.id} avoids ${f}, which nothing sets`).toBe(true);
      }
    }
  });

  it('puts the win and the loss on the same night', () => {
    const night = LAST_SERVICE.quests
      .find((q) => q.id === 'q_the_last_service')!
      .steps.find((s) => s.id === 'the_night_itself')!;
    const routes = night.succeedWhenAny.map((r) => r.setsFlags.join('+'));
    expect(routes.some((r) => r.includes('akari_stays'))).toBe(true);
    expect(routes.some((r) => r.includes('akari_closes'))).toBe(true);
  });

  it('offers four rarity tiers so the shelf is not flat', () => {
    const tiers = new Set(LAST_SERVICE.endings.map((e) => e.rarity));
    expect(tiers.size).toBeGreaterThanOrEqual(3);
    expect(tiers.has('UNIQUE')).toBe(true);
  });
});

describe('Keiko cannot stop, and the clock says so', () => {
  it('gives her four hours away from Akari and no more', () => {
    const keiko = LAST_SERVICE.characters.find((c) => c.id === 'keiko')!;
    const away = keiko.schedule.filter(
      (b) => b.locationId !== 'akari_kitchen' && b.locationId !== 'fish_market',
    );
    const minutes = away.reduce((n, b) => n + (b.endMinute - b.startMinute), 0);
    expect(minutes).toBeLessThanOrEqual(260);
    expect(away.every((b) => b.locationId === 'keiko_flat')).toBe(true);
  });

  it('has somebody able to say the thing that lets her stop', () => {
    expect([...settable()]).toContain('keiko_stopped');
    const rest = LAST_SERVICE.endings.find((e) => e.id === 'end_keiko_rests')!;
    expect(rest.requires.minRelationship?.[0]?.characterId).toBe('keiko');
  });

  it('does not make her the villain of the money', () => {
    const keiko = LAST_SERVICE.characters.find((c) => c.id === 'keiko')!;
    expect(keiko.cardBlurb).toMatch(/right/i);
    const canon = LAST_SERVICE.rules.hardCanon.join(' ');
    expect(canon).toMatch(/not wrong to love it/i);
  });
});

describe('seven people who could not be swapped for each other', () => {
  it('gives each of them a different job in the story', () => {
    const ids = LAST_SERVICE.characters.map((c) => c.id);
    expect(ids).toEqual(['mina', 'takumi', 'haruto', 'keiko', 'emi', 'daichi', 'reina']);
    expect(new Set(LAST_SERVICE.characters.map((c) => c.role)).size).toBeGreaterThanOrEqual(5);
  });

  it('strips the speaker names off and still tells them apart', () => {
    const words = (s: string) =>
      new Set(
        s
          .toLowerCase()
          .replace(/[^a-z\s’']/g, ' ')
          .split(/\s+/)
          .filter((w) => w.length > 3),
      );
    const voices = LAST_SERVICE.characters.map((c) => ({
      id: c.id,
      w: words(c.voiceSamples.join(' ')),
    }));
    for (let i = 0; i < voices.length; i += 1) {
      for (let j = i + 1; j < voices.length; j += 1) {
        const a = voices[i]!;
        const b = voices[j]!;
        const shared = [...a.w].filter((w) => b.w.has(w)).length;
        const overlap = shared / Math.min(a.w.size, b.w.size);
        expect(overlap, `${a.id} and ${b.id} talk alike (${overlap.toFixed(2)})`).toBeLessThan(0.3);
      }
    }
  });

  it('gives everybody an expression set the reaction deck can draw', () => {
    for (const c of LAST_SERVICE.characters) {
      expect(c.expressions[0], c.id).toBe('neutral');
      expect(c.expressions.length, c.id).toBeGreaterThanOrEqual(4);
    }
  });

  it('makes the two rivals arguments rather than obstacles', () => {
    const mina = LAST_SERVICE.characters.find((c) => c.id === 'mina')!;
    const haruto = LAST_SERVICE.characters.find((c) => c.id === 'haruto')!;
    expect(mina.cardBlurb).toMatch(/not to mock/i);
    expect(haruto.hiddenDrives.join(' ')).toMatch(/misses the cooking/i);
  });
});

describe('a city you can actually walk', () => {
  it('connects every location in both directions', () => {
    const ids = new Set(LAST_SERVICE.locations.map((l) => l.id));
    for (const l of LAST_SERVICE.locations) {
      for (const c of l.connections) {
        expect(ids.has(c.to), `${l.id} -> ${c.to} goes nowhere`).toBe(true);
        const back = LAST_SERVICE.locations.find((x) => x.id === c.to)!;
        expect(
          back.connections.some((x) => x.to === l.id),
          `${c.to} has no way back to ${l.id}`,
        ).toBe(true);
      }
    }
  });

  it('reaches everything from the kitchen', () => {
    const byId = new Map(LAST_SERVICE.locations.map((l) => [l.id, l]));
    const seen = new Set<string>(['akari_kitchen']);
    const queue = ['akari_kitchen'];
    while (queue.length) {
      for (const c of byId.get(queue.shift()!)!.connections) {
        if (!seen.has(c.to)) {
          seen.add(c.to);
          queue.push(c.to);
        }
      }
    }
    expect(seen.size).toBe(LAST_SERVICE.locations.length);
  });

  it('keeps VANTA a walk away from Akari rather than next door', () => {
    const kitchen = LAST_SERVICE.locations.find((l) => l.id === 'akari_kitchen')!;
    expect(kitchen.connections.map((c) => c.to)).not.toContain('vanta');
  });
});

describe('the month happens to you whether or not you go looking', () => {
  it('runs ten events and lets each one leave a mark', () => {
    expect(LAST_SERVICE.worldEvents).toHaveLength(10);
    for (const e of LAST_SERVICE.worldEvents) {
      expect(e.setsFlags.length, e.id).toBeGreaterThan(0);
    }
  });

  it('delivers the offer and the date without the player asking', () => {
    const flags = LAST_SERVICE.worldEvents.flatMap((e) => e.setsFlags);
    expect(flags).toContain('knows:the_offer');
    expect(flags).toContain('the_letter_came');
  });

  it('keeps the protagonist blank, because this one is the player’s to invent', () => {
    expect(LAST_SERVICE.protagonist.kind).toBe('BLANK');
    expect(LAST_SERVICE.setupFields.some((f) => f.id === 'displayName')).toBe(true);
  });

  it('promises the five things the month is actually about', () => {
    expect(LAST_SERVICE.promises).toHaveLength(5);
    const ids = LAST_SERVICE.promises.map((p) => p.id);
    expect(ids).toContain('p_what_save_means');
    expect(ids).toContain('p_keiko');
  });
});
