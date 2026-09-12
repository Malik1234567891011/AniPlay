import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { PINK_TIDE } from './index.js';

/**
 * Pink Tide, held to the rule its bible puts above everything else:
 *
 * **the resort has to stay genuinely desirable while something is wrong.**
 *
 * A world that goes grim has thrown away its own premise, and one whose
 * mystery never bites is a brochure. Three things keep it honest, and all
 * three are checked here rather than asserted in prose:
 *
 * 1. The pleasure is not taxed. Swimming, flirting and being a guest cost
 *    Ease and nothing else. Only the investigating abilities cost Heat, so the
 *    week you paid for is what chasing this actually spends.
 * 2. Refusing is a real route with no nagging afterwards, and there are
 *    endings that require none of the mystery at all.
 * 3. Almost everybody is hiding something and almost none of it is the crime.
 *    If every lie pointed at the culprit the mystery would be mechanical.
 *
 * The fourth thing is Sora. She is deliberately the visual promise of the
 * world, and the bible is blunt that she must not therefore be a sexy clue
 * dispenser: her own dream, her own lie, her own arc and her own endings that
 * do not involve the player are all checked below.
 */

const start = (archetypeId = 'arch_easy_company') =>
  createInitialState({
    sessionId: 'sess_pt',
    story: PINK_TIDE,
    identity: {
      displayName: 'Rin',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: 'A colleague won it in a raffle and could not go.',
      advanced: {},
      portraitAssetId: null,
    },
  });

/** Every flag a single playthrough could ever set. */
function settable(): Set<string> {
  const flags = new Set<string>(['left_the_map', 'qualified']);
  for (const quest of PINK_TIDE.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of PINK_TIDE.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

describe('the first afternoon', () => {
  it('starts at the pool at seventeen minutes past two with the two people the opening shows', () => {
    expect(PINK_TIDE.rules.startingLocationId).toBe('infinity_pool');
    expect(PINK_TIDE.rules.startWorldMinute).toBe(14 * 60 + 17);
    const present = charactersPresent(start()).map((c) => c.characterId);
    // Sora is in the shallow end and Eli crosses the far end of the deck.
    expect(present).toContain('sora');
    expect(present).toContain('eli');
  });

  it('does not mention the missing man in the opening at all', () => {
    expect(PINK_TIDE.opening).not.toMatch(/Adrian|missing|bag/i);
    expect(PINK_TIDE.opening).toMatch(/pool|water/i);
  });

  it('keeps the man on the ledge off the map until somebody goes and looks', () => {
    const adrian = PINK_TIDE.characters.find((c) => c.id === 'adrian')!;
    expect(adrian.schedule).toHaveLength(1);
    expect(adrian.schedule[0]!.locationId).toBe('sea_cave');
    const cave = PINK_TIDE.locations.find((l) => l.id === 'sea_cave')!;
    expect(cave.discoveredByDefault).toBe(false);
  });

  it('answers the splash in the player’s own voice, three ways, short', () => {
    expect(PINK_TIDE.openingSuggestions).toHaveLength(3);
    for (const s of PINK_TIDE.openingSuggestions) {
      expect(s.length, s).toBeLessThanOrEqual(320);
      expect(/^I |^I'|^I’/.test(s), `not first person: ${s}`).toBe(true);
    }
  });
});

describe('paradise stays desirable', () => {
  it('never charges suspicion for the things people come here to do', () => {
    const free = ['be_a_guest', 'get_in_the_water', 'flirt_like_you_mean_it'];
    for (const id of free) {
      const a = PINK_TIDE.abilities.find((x) => x.id === id)!;
      expect(a, id).toBeDefined();
      expect(a.costs.some((c) => c.resourceId === 'heat'), `${id} costs heat`).toBe(false);
      expect(a.unlockedByDefault, id).toBe(true);
    }
  });

  it('charges it for every act of investigating', () => {
    const nosy = [
      'ask_a_staff_member_a_real_question',
      'go_where_guests_do_not',
      'document_it_properly',
      'push_somebody_who_is_lying',
    ];
    for (const id of nosy) {
      const a = PINK_TIDE.abilities.find((x) => x.id === id)!;
      expect(a.costs.some((c) => c.resourceId === 'heat'), `${id} is free of heat`).toBe(true);
    }
  });

  it('spends the vacation itself on everything, which is the whole design', () => {
    for (const a of PINK_TIDE.abilities) {
      expect(a.costs.some((c) => c.resourceId === 'ease'), `${a.id} costs no ease`).toBe(true);
    }
    const ease = PINK_TIDE.resources.find((r) => r.id === 'ease')!;
    expect(ease.polarity).toBe('GOOD_HIGH');
    expect(ease.displayPriority).toBe(1);
    expect(ease.regenPerHour).toBeGreaterThan(0);
  });

  it('gives the pink tide itself no agenda whatsoever', () => {
    const e = PINK_TIDE.worldEvents.find((x) => x.id === 'we_the_pink_tide')!;
    expect(e.directorNotes).toMatch(/do not put a clue/i);
    expect(e.setsFlags).toEqual(['the_pink_tide_happened']);
  });

  it('serves breakfast the morning after the worst night of the week', () => {
    const e = PINK_TIDE.worldEvents.find((x) => x.id === 'we_breakfast_after')!;
    expect(e.requiresFlags).toContain('the_storm_broke');
    expect(e.publicCopy).toMatch(/pancakes/i);
  });
});

describe('refusing is a real way to play', () => {
  it('offers a route that declines the whole mystery', () => {
    const step = PINK_TIDE.quests
      .find((q) => q.id === 'q_the_first_afternoon')!
      .steps.find((s) => s.id === 'the_thing_she_noticed')!;
    const refuse = step.succeedWhenAny.find((r) => r.setsFlags.includes('not_my_problem'))!;
    expect(refuse).toBeDefined();
    expect(refuse.setsFlags).toContain('she_carries_on_anyway');
    expect(step.directorNotes).toMatch(/no nagging|do not punish/i);
  });

  it('has endings that need none of the investigation', () => {
    const mystery = new Set([
      'in_it',
      'knows:the_bag',
      'adrian_is_out',
      'adrian_died',
      'the_man_is_answered',
      'it_went_public',
      'cleanup_secured',
      'took_the_settlement',
      'eli_confessed',
      'eli_walked',
      'accused_luka',
    ]);
    const clean = PINK_TIDE.endings.filter(
      (e) => !(e.requires.flagsSet ?? []).some((f) => mystery.has(f)),
    );
    expect(clean.length).toBeGreaterThanOrEqual(6);
    expect(clean.map((e) => e.id)).toContain('end_perfect_week');
  });

  it('lets somebody leave on the first boat without calling it a failure', () => {
    const e = PINK_TIDE.endings.find((x) => x.id === 'end_sunrise_ferry')!;
    expect(e.requires.flagsSet).toContain('left_the_map');
    expect(e.condition).toMatch(/neither failure nor tragedy/i);
    expect(e.minTurn).toBeLessThan(30);
  });
});

describe('everybody is hiding something and almost none of it is the crime', () => {
  it('gives the innocent cast secrets that have nothing to do with the fall', () => {
    const unrelated = [
      ['luka', 'luka_the_dives'],
      ['celeste', 'celeste_the_debt'],
      ['sora', 'sora_the_notebook'],
      ['nami', 'nami_the_cache'],
    ] as const;
    for (const [charId, secretId] of unrelated) {
      const c = PINK_TIDE.characters.find((x) => x.id === charId)!;
      const s = c.secrets.find((x) => x.id === secretId)!;
      expect(s, `${charId}/${secretId}`).toBeDefined();
      expect(s.fact).not.toMatch(/\bfell\b|\bledge\b|pushed/i);
    }
  });

  it('keeps the red herring a person after suspicion moves off him', () => {
    const luka = PINK_TIDE.characters.find((c) => c.id === 'luka')!;
    expect(luka.goals.length).toBeGreaterThanOrEqual(2);
    expect(luka.gates.length).toBeGreaterThanOrEqual(2);
    // And being wrong about him is an authored outcome with a cost.
    const wrong = PINK_TIDE.endings.find((e) => e.id === 'end_wrong_person')!;
    expect(wrong.condition).toMatch(/does not undo/i);
  });

  it('writes the man who caused it as somebody who panicked rather than planned', () => {
    const eli = PINK_TIDE.characters.find((c) => c.id === 'eli')!;
    expect(eli.cardBlurb).toMatch(/panick|exhausted|intact/i);
    const canon = PINK_TIDE.rules.hardCanon.join(' ');
    expect(canon).toMatch(/did not go there intending/i);
    // No serial killer, no cult, no ghosts — the bible calls these hard failures.
    expect(canon).toMatch(/[Nn]othing in this world is supernatural/);
    for (const e of PINK_TIDE.endings) {
      expect(e.condition + e.epilogue).not.toMatch(/cult|ghost|haunted|serial killer/i);
    }
  });

  it('holds evidence still once it exists', () => {
    const canon = PINK_TIDE.rules.hardCanon.join(' ');
    expect(canon).toMatch(/[Cc]lues do not mutate/);
    expect(canon).toMatch(/never rewrites evidence/i);
  });
});

describe('Sora is not a clue dispenser', () => {
  it('gives her a life that exists whether or not the player engages', () => {
    const sora = PINK_TIDE.characters.find((c) => c.id === 'sora')!;
    expect(sora.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(sora.schedule.length).toBeGreaterThanOrEqual(5);
    // Two of her endings turn on her own future rather than on romance.
    const hers = PINK_TIDE.endings.filter((e) => ['end_tide_and_salt', 'end_sora_stays'].includes(e.id));
    expect(hers).toHaveLength(2);
    for (const e of hers) {
      expect(e.requires.minRelationship?.some((r) => r.dimension === 'affection') ?? false).toBe(false);
    }
  });

  it('separates flirting from meaning it, in the data and not just the prose', () => {
    const sora = PINK_TIDE.characters.find((c) => c.id === 'sora')!;
    expect(sora.speechStyle).toMatch(/perform/i);
    const real = sora.gates.find((g) => g.id === 'sora_off_duty')!;
    expect(real.label).toMatch(/not working/i);
    // The ability that answers her is locked until you have learned the tell.
    const sit = PINK_TIDE.abilities.find((a) => a.id === 'sit_with_her_when_she_is_not_being_fun')!;
    expect(sit.unlockedByDefault).toBe(false);
    expect(sit.requires.flagsSet).toContain('knows:the_earring');
    expect([...settable()]).toContain('knows:the_earring');
  });

  it('lets her stop performing as an ending of its own', () => {
    const e = PINK_TIDE.endings.find((x) => x.id === 'end_her_real_smile')!;
    expect(e.requires.flagsSet).toContain('stayed_with_her');
    expect(e.condition).toMatch(/quietest/i);
  });
});

describe('the man on the ledge', () => {
  it('can be reached three ways and can be reached too late', () => {
    const step = PINK_TIDE.quests
      .find((q) => q.id === 'q_the_cove')!
      .steps.find((s) => s.id === 'the_shelf_in_the_cave')!;
    const alive = step.succeedWhenAny.filter((r) => r.setsFlags.includes('adrian_is_out'));
    expect(alive.length).toBeGreaterThanOrEqual(3);
    for (const r of alive) expect(r.closesFlags).toContain('too_late');
    expect(step.succeedWhenAny.some((r) => r.setsFlags.includes('adrian_died'))).toBe(true);
  });

  it('writes his death as the world carrying on at full brightness', () => {
    const e = PINK_TIDE.endings.find((x) => x.id === 'end_too_late')!;
    expect(e.condition).toMatch(/does not become grey|full brightness/i);
    expect(e.requires.flagsSet).toContain('adrian_died');
  });

  it('does not resolve the second question with the first', () => {
    const cove = PINK_TIDE.quests
      .find((q) => q.id === 'q_checkout')!
      .steps.find((s) => s.id === 'what_happens_to_the_cove')!;
    expect(cove.enterWhen?.flagsSet).toContain('the_man_is_answered');
    const routes = cove.succeedWhenAny.map((r) => r.routeId);
    expect(routes).toContain('published');
    expect(routes).toContain('the_moderate_solution');
    expect(routes).toContain('took_the_deal');
    expect(routes).toContain('left_it');
  });

  it('reaches every ending flag from a single run', () => {
    const flags = settable();
    for (const e of PINK_TIDE.endings) {
      for (const f of e.requires.flagsSet ?? []) {
        expect(flags.has(f), `${e.id} needs ${f}, which nothing sets`).toBe(true);
      }
      for (const f of e.requires.flagsUnset ?? []) {
        expect(flags.has(f), `${e.id} avoids ${f}, which nothing sets`).toBe(true);
      }
    }
  });

  it('offers sixteen endings across all four tiers, several of them losses', () => {
    expect(PINK_TIDE.endings).toHaveLength(16);
    const tiers = new Set(PINK_TIDE.endings.map((e) => e.rarity));
    expect(tiers).toEqual(new Set(['COMMON', 'UNCOMMON', 'RARE', 'UNIQUE']));
    const losses = ['end_too_late', 'end_checked_out', 'end_wrong_person', 'end_paradise_closed'];
    for (const id of losses) expect(PINK_TIDE.endings.find((e) => e.id === id), id).toBeDefined();
  });
});

describe('an island you can actually walk', () => {
  it('connects every location in both directions', () => {
    const ids = new Set(PINK_TIDE.locations.map((l) => l.id));
    for (const l of PINK_TIDE.locations) {
      for (const c of l.connections) {
        expect(ids.has(c.to), `${l.id} -> ${c.to} goes nowhere`).toBe(true);
        const back = PINK_TIDE.locations.find((x) => x.id === c.to)!;
        expect(back.connections.some((x) => x.to === l.id), `${c.to} has no way back to ${l.id}`).toBe(true);
      }
    }
  });

  it('reaches everything from a sunbed', () => {
    const byId = new Map(PINK_TIDE.locations.map((l) => [l.id, l]));
    const seen = new Set<string>(['infinity_pool']);
    const queue = ['infinity_pool'];
    while (queue.length) {
      for (const c of byId.get(queue.shift()!)!.connections) {
        if (!seen.has(c.to)) {
          seen.add(c.to);
          queue.push(c.to);
        }
      }
    }
    expect(seen.size).toBe(PINK_TIDE.locations.length);
  });

  it('puts the cave behind the cove and nothing else', () => {
    const inbound = PINK_TIDE.locations.filter((l) => l.connections.some((c) => c.to === 'sea_cave'));
    expect(inbound.map((l) => l.id)).toEqual(['east_cove']);
  });
});

describe('nine people who could not be swapped for each other', () => {
  it('strips the speaker names off and still tells them apart', () => {
    const words = (s: string) =>
      new Set(
        s
          .toLowerCase()
          .replace(/[^a-z\s’']/g, ' ')
          .split(/\s+/)
          .filter((w) => w.length > 3),
      );
    const voices = PINK_TIDE.characters.map((c) => ({ id: c.id, w: words(c.voiceSamples.join(' ')) }));
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
    for (const c of PINK_TIDE.characters) {
      expect(c.expressions[0], c.id).toBe('neutral');
      expect(c.expressions.length, c.id).toBeGreaterThanOrEqual(4);
    }
  });

  it('keeps the protagonist blank, because inventing yourself for a week is the premise', () => {
    expect(PINK_TIDE.protagonist.kind).toBe('BLANK');
    expect(PINK_TIDE.setupFields.some((f) => f.id === 'what_you_are_escaping')).toBe(true);
    expect(PINK_TIDE.rules.hardCanon.join(' ')).toMatch(/adults only|Everybody in this world is an adult/i);
  });

  it('writes its own cover brief, with the mystery a distant second', () => {
    expect(PINK_TIDE.coverDirection).toMatch(/vacation fantasy first/i);
    expect(PINK_TIDE.coverDirection).toMatch(/adult/i);
    expect(PINK_TIDE.coverDirection).toMatch(/no text/i);
  });
});
