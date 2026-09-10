import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@aniplay/engine';
import { SECOND_SKIN } from './index.js';

/**
 * Second Skin, held to the two rules the bible is most insistent about.
 *
 * The first: the player's first Affinity has to feel enormous *before* the
 * story admits it may not be final. So it is the archetype, six of them, each
 * granting something the others do not, and nothing in the opening undercuts
 * it. A world that treats the first shape as a starter you outgrow has thrown
 * away the decision the whole thing is built on.
 *
 * The second: the Concord is not an evil church. It has saved an enormous
 * number of lives, the Seal was real emergency medicine after a real
 * catastrophe, and its secret is a material dependency rather than a cackle.
 * If Edran or Ilyra reads as a villain the world has failed, so both are
 * checked for the shape of their own arguments.
 */

const start = (archetypeId = 'arch_wolf') =>
  createInitialState({
    sessionId: 'sess_ss',
    story: SECOND_SKIN,
    identity: {
      displayName: 'Aven Sarel',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

function settable(): Set<string> {
  const flags = new Set<string>(['left_the_map', 'qualified']);
  for (const quest of SECOND_SKIN.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of SECOND_SKIN.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

describe('the first shape is the whole decision', () => {
  it('offers six of them and makes each one grant something different', () => {
    const shapes = ['arch_wolf', 'arch_leopard', 'arch_hawk', 'arch_stag', 'arch_serpent', 'arch_bear'];
    for (const id of shapes) {
      const a = SECOND_SKIN.archetypes.find((x) => x.id === id)!;
      expect(a, id).toBeDefined();
      const total =
        Object.keys(a.attributeBonus).length + Object.keys(a.skillProficiencies).length;
      expect(total, `${id} changes nothing the rules can see`).toBeGreaterThan(2);
    }
    // Six distinct tag sets, so no two read as the same option on the card.
    const tagSets = SECOND_SKIN.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
  });

  it('never tells the player at setup that it might be reversible', () => {
    // "Do not sabotage the choice." The help text says fixed, because it is,
    // and everything about resettling is discovered in play if at all.
    const field = SECOND_SKIN.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText).toMatch(/fixed/i);
    expect(field.helpText.toLowerCase()).not.toContain('later');
    expect(field.helpText.toLowerCase()).not.toContain('change');
  });

  it('spends a whole quest step on what the new body is like', () => {
    // The traits are most interesting when they affect ordinary life, so the
    // month after the Choosing is an authored step rather than a time skip.
    const step = SECOND_SKIN.quests
      .find((q) => q.id === 'q_the_choosing')!
      .steps.find((s) => s.id === 'the_month_after')!;
    expect(step, 'the settling month is skipped').toBeDefined();
    expect(step.directorNotes.toLowerCase()).toContain('domestic');
    expect(step.succeedWhenAny.length).toBeGreaterThanOrEqual(4);
  });

  it('lets the player set how much of an animal they look', () => {
    const field = SECOND_SKIN.setupFields.find((f) => f.id === 'how_far')!;
    expect(field, 'the body template is forced').toBeDefined();
    expect(field.options.length).toBeGreaterThanOrEqual(4);
  });
});

describe('the institution is not an evil church', () => {
  it('gives the High Keeper a real argument rather than a motive', () => {
    const edran = SECOND_SKIN.characters.find((c) => c.id === 'edran')!;
    // He concedes the strongest objection and answers it. That is his whole
    // technique and it has to reach the writer.
    expect(edran.publicTraits.join(' ').toLowerCase()).toContain('concedes the strongest point against him');
    expect(edran.speechStyle.toLowerCase()).toContain('never defensive');
    // And he is not exempt from the thing he asks of everybody.
    expect(edran.secrets.some((s) => s.id === 'edran_his_own_choosing')).toBe(true);
  });

  it('makes the secret a dependency rather than a cruelty', () => {
    const canon = SECOND_SKIN.rules.hardCanon.join(' ').toLowerCase();
    expect(canon).toContain('most of its people help');
    expect(canon).toContain('stabilises ageing heartstones');
    expect(canon).toContain('saved millions');
  });

  it('gives the Warden captain a duty she does not enjoy', () => {
    const ilyra = SECOND_SKIN.characters.find((c) => c.id === 'ilyra')!;
    expect(ilyra.fears.join(' ').toLowerCase()).toContain('delivering somebody to a ward');
    expect(ilyra.boundaries.join(' ').toLowerCase()).toContain('will not misrepresent what happens next');
    // And she is not written as secretly on the player's side either.
    expect(ilyra.goals.join(' ').toLowerCase()).toContain('bring kaia voss in');
  });

  it('shows the system working correctly, which is the worst scene in it', () => {
    const event = SECOND_SKIN.worldEvents.find((e) => e.id === 'we_somebody_is_taken')!;
    expect(event.directorNotes.toLowerCase()).toContain('nobody breaks a single rule');
    expect(event.cancelledByFlags.length).toBeGreaterThan(0);
  });

  it('lets the player conclude he was right', () => {
    const ending = SECOND_SKIN.endings.find((e) => e.id === 'end_concord_holds')!;
    expect(ending, 'agreeing with the institution is not a destination').toBeDefined();
    expect(ending.requires.flagsSet).toContain('agreed_with_edran');
    expect(ending.condition.toLowerCase()).toContain('do not write this as capitulation');
  });
});

describe('a second one is dangerous and survivable and both', () => {
  it('charges for it with a meter that only comes down slowly', () => {
    const pull = SECOND_SKIN.resources.find((r) => r.id === 'pull')!;
    expect(pull.polarity).toBe('GOOD_LOW');
    expect(pull.regenPerHour).toBeLessThan(0);
    expect(pull.bands.length).toBe(4);
  });

  it('keeps both halves of it in the canon', () => {
    const canon = SECOND_SKIN.rules.hardCanon.join(' ').toLowerCase();
    expect(canon).toContain('genuinely dangerous');
    expect(canon).toContain('survivable');
  });

  it('gives the honest treatment a failure figure and the legal one a worse outcome', () => {
    const sai = SECOND_SKIN.characters.find((c) => c.id === 'sai')!;
    // He gives the bad number first, as policy. That has to be in the samples.
    expect(sai.voiceSamples.join(' ').toLowerCase()).toContain('two of them died');
    expect(sai.boundaries.join(' ').toLowerCase()).toContain('failure figures');
  });

  it('makes both gated abilities actually obtainable', () => {
    // `requires` restricts an ability you already have; it never grants one.
    const gated = SECOND_SKIN.abilities.filter((a) => !a.unlockedByDefault).map((a) => a.id);
    const granted = new Set([
      ...SECOND_SKIN.archetypes.flatMap((a) => a.startingAbilities),
      ...SECOND_SKIN.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    expect(gated.length).toBeGreaterThan(0);
    for (const id of gated) expect(granted.has(id), `${id} is granted by nothing`).toBe(true);
  });

  it('gives resting exactly one honest thing to restore', () => {
    expect(SECOND_SKIN.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('sends a Kin doing something impossible in a street to the Wardens', () => {
    expect(SECOND_SKIN.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('suspicion');
    expect(SECOND_SKIN.factions[0]?.id).toBe('faction_wardens');
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of SECOND_SKIN.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      const driven = SECOND_SKIN.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(driven, `nothing the player can do changes ${r.id}`).toBe(true);
    }
  });

  it('describes every band as behaviour rather than as a measurement', () => {
    for (const r of SECOND_SKIN.resources) {
      expect(r.visible, `${r.id} is on the screen`).toBe(false);
      expect(r.bands.length, `${r.id} has no bands`).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), `${r.id} top band`).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });
});

describe('the hall at half past seven', () => {
  it('has the woman who comes through the window in it', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('kaia');
  });

  it('has the two people the player has been beside all day', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('ren');
    expect(present).toContain('tessa');
  });

  it('does not put a High Keeper or a ward patient in a Larkspire hall', () => {
    const inRoom = new Set(['kaia', 'ren', 'tessa']);
    for (const c of SECOND_SKIN.characters) {
      const placed = locationForSchedule(c.schedule, SECOND_SKIN.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} is nowhere at the starting minute`).not.toBeNull();
      if (inRoom.has(c.id)) continue;
      expect(placed, `${c.id} is in the hall`).not.toBe(SECOND_SKIN.rules.startingLocationId);
    }
  });

  it('lets the player do nothing at all and calls that a route', () => {
    const step = SECOND_SKIN.quests.find((q) => q.id === 'q_the_choosing')!.steps[0]!;
    const stayed = step.succeedWhenAny.find((r) => r.routeId === 'stayed_put')!;
    expect(stayed, 'sitting still is not authored').toBeDefined();
    expect(stayed.predicate.hasItems).toEqual([]);
    expect(stayed.predicate.minRelationship).toEqual([]);
  });

  it('schedules everybody somewhere that exists', () => {
    const locations = new Set(SECOND_SKIN.locations.map((l) => l.id));
    for (const c of SECOND_SKIN.characters) {
      for (const block of c.schedule) {
        expect(locations, `${c.id} is scheduled into ${block.locationId}`).toContain(block.locationId);
      }
      if (c.homeLocationId) expect(locations, `${c.id} lives nowhere`).toContain(c.homeLocationId);
    }
  });
});

describe('seven people, seven mouths', () => {
  const content = (text: string): Set<string> =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3),
    );

  it('keeps every pair of them lexically apart', () => {
    const vocab = new Map(SECOND_SKIN.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of SECOND_SKIN.characters) {
      for (const b of SECOND_SKIN.characters) {
        if (a.id >= b.id) continue;
        const va = vocab.get(a.id)!;
        const vb = vocab.get(b.id)!;
        const shared = [...va].filter((w) => vb.has(w)).length;
        const overlap = shared / Math.min(va.size, vb.size);
        expect(overlap, `${a.id} and ${b.id} share ${Math.round(overlap * 100)}% of their vocabulary`).toBeLessThan(0.3);
      }
    }
  });

  it('does not let two of them run the same rhetorical move', () => {
    const MOVES: Array<[string, RegExp]> = [
      ['negate-then-correct', /\bI(?:’m| am)? ?not (?:going to )?(?:say|tell|saying|telling)\b/i],
      ['not X but Y', /\bnot (?:a|an|the|merely|simply|just)?\s*[\w\s]{2,28},\s*but\s+/i],
      ['the kind of X that', /\bthe kind of \w+ that\b/i],
    ];
    for (const [label, pattern] of MOVES) {
      const users = SECOND_SKIN.characters
        .filter((c) => c.voiceSamples.some((v) => pattern.test(v)))
        .map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => SECOND_SKIN.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    // Kaia gives the instruction first and the reason afterwards.
    expect(sample('kaia').toLowerCase()).toMatch(/reasons afterwards/);
    // Ilyra: position, duty, consequence, in that order.
    expect(sample('ilyra').toLowerCase()).toMatch(/what happens next, in order/);
    // Ren talks more the harder it gets and self-corrects mid-sentence.
    expect(sample('ren')).toMatch(/—/);
    // Tessa refuses the compliment about her eyes.
    expect(sample('tessa').toLowerCase()).toContain('good eyes');
    // Sai gives the bad number first.
    expect(sample('sai').toLowerCase()).toContain('two of them died');
    // Edran restates the objection better than the objector.
    expect(sample('edran').toLowerCase()).toContain('strongest version');
    // Lio counts everything and deflects onto the corridor.
    expect(sample('lio').toLowerCase()).toMatch(/four hundred and twenty-six/);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of SECOND_SKIN.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.topics.length, `${c.id} cannot be asked about anything`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, `${c.id} has no declared voice`).toBeGreaterThan(60);
      expect(c.visualHook.length, `${c.id} is not memorable`).toBeGreaterThan(20);
      expect(c.gates.length, `${c.id} cannot be got closer to`).toBeGreaterThan(0);
      for (const secret of c.secrets) {
        expect(secret.revealHint.length, `${c.id}/${secret.id} has no way out`).toBeGreaterThan(10);
      }
    }
  });

  it('never makes the adult fugitive a romance for the sixteen-year-old', () => {
    const kaia = SECOND_SKIN.characters.find((c) => c.id === 'kaia')!;
    expect(kaia.gates.some((g) => g.kind === 'ROMANCE'), 'Kaia has a romance gate').toBe(false);
    expect(kaia.boundaries.join(' ').toLowerCase()).toContain('will not let a minor');
    // The two age-appropriate peers do have them.
    for (const id of ['ren', 'tessa']) {
      const peer = SECOND_SKIN.characters.find((c) => c.id === id)!;
      expect(peer.gates.some((g) => g.kind === 'ROMANCE'), `${id} has none`).toBe(true);
    }
  });
});

describe('the world moves without the player', () => {
  it('gives every scheduled pressure a way to be switched off', () => {
    const flags = settable();
    for (const id of ['we_the_wardens_come_round', 'we_the_first_pull', 'we_ren_on_the_rails', 'we_somebody_is_taken', 'we_sai_finds_you', 'we_the_heartstone_stutters', 'we_they_come_for_you']) {
      const event = SECOND_SKIN.worldEvents.find((e) => e.id === id)!;
      expect(event, id).toBeDefined();
      expect(event.cancelledByFlags.length, `${id} fires whatever the player does`).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) {
        expect(flags, `${id} is cancelled by "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });

  it('lets the system arrive for the player, preventably', () => {
    const event = SECOND_SKIN.worldEvents.find((e) => e.id === 'we_they_come_for_you')!;
    expect(event.cancelledByFlags).toEqual(
      expect.arrayContaining(['integrated_it', 'suppressed_it', 'the_accord', 'left_the_map']),
    );
  });
});

describe('where this can end up', () => {
  it('treats staying one shape as a real destination', () => {
    const one = SECOND_SKIN.endings.find((e) => e.id === 'end_my_one_skin')!;
    expect(one.rarity).toBe('COMMON');
    expect(one.condition.toLowerCase()).toContain('not the player failing');
  });

  it('lets somebody simply go home, and early', () => {
    const walk = SECOND_SKIN.endings.find((e) => e.id === 'end_went_home')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(28);
  });

  it('makes every route out of the ward cost somebody something', () => {
    for (const id of ['end_no_more_menagerie', 'end_unsealed', 'end_concord_holds']) {
      const ending = SECOND_SKIN.endings.find((e) => e.id === id)!;
      expect(ending, id).toBeDefined();
      expect(ending.epilogue.length, id).toBeGreaterThan(180);
    }
  });

  it('uses the whole rarity range', () => {
    expect(new Set(SECOND_SKIN.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('names only flags something in this world sets', () => {
    const flags = settable();
    const ENGINE = ['met:', 'spoke:', 'visited:', 'used:', 'knows:', 'route:', 'closed:'];
    for (const ending of SECOND_SKIN.endings) {
      for (const flag of [...ending.requires.flagsSet, ...ending.requires.flagsUnset]) {
        if (ENGINE.some((p) => flag.startsWith(p))) continue;
        expect(flags, `${ending.name} needs "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });
});

describe('the copy is the right length and says the right amount', () => {
  it('keeps the premise inside the window', () => {
    const words = SECOND_SKIN.premise.trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(120);
    expect(words).toBeLessThanOrEqual(250);
  });

  it('offers three responses that are answers rather than errands', () => {
    expect(SECOND_SKIN.openingSuggestions.length).toBe(3);
    for (const s of SECOND_SKIN.openingSuggestions) {
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Run|Help|Watch) /);
    }
  });

  it('does not put the ward or the Ledger on the store card', () => {
    const premise = SECOND_SKIN.premise.toLowerCase();
    expect(premise).not.toContain('ledger');
    expect(premise).not.toContain('ward seven');
    expect(premise).not.toContain('seal');
  });
});
