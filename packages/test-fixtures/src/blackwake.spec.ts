import { describe, expect, it } from 'vitest';
import {
  createInitialState,
  crewFlag,
  crewRoster,
  crewSkillModifier,
  crewSummary,
  crewUpkeepPerDay,
  departedFlag,
  departuresFromMutations,
  effectiveModifier,
  evaluatePredicate,
  isAboard,
  moraleFlag,
  moraleOf,
  recruitCheck,
  recruitMutations,
  updateCrew,
} from '@aniplay/engine';
import type { GameState } from '@aniplay/contracts';
import { BLACKWAKE } from './index.js';

/**
 * A pirate world lives or dies on whether the crew are people. These hold this
 * one to the promise on its own card: recruitment is earned, keeping people is
 * a running cost, the ship gets measurably better, notoriety is politics rather
 * than level, and the ocean opens up in a fixed order.
 */

const DAY = 1440;

const start = (archetypeId = 'arch_apprentice'): GameState =>
  createInitialState({
    sessionId: 'sess_bw',
    story: BLACKWAKE,
    identity: {
      displayName: 'Sable Vane',
      pronouns: 'she/her',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

let n = 0;
const nextId = (): string => `m${n++}`;

const aboard = (state: GameState, id: string): GameState => {
  const morale = BLACKWAKE.characters.find((c) => c.id === id)?.companion?.startingMorale ?? 50;
  state.flags[crewFlag(id)] = true;
  state.flags[moraleFlag(id)] = morale;
  return state;
};

// ---------------------------------------------------------------------------
// Recruitment
// ---------------------------------------------------------------------------

describe('recruitment is earned, not collected', () => {
  it('has a crew to recruit at all', () => {
    const recruitable = BLACKWAKE.characters.filter((c) => c.companion !== null);
    expect(recruitable.map((c) => c.id).sort()).toEqual(['mako', 'nessa', 'rook']);
  });

  it('gives every companion a station, a contribution and a way to lose them', () => {
    for (const character of BLACKWAKE.characters) {
      const companion = character.companion;
      if (!companion) continue;
      expect(companion.station, character.id).not.toEqual('');
      expect(Object.keys(companion.grantsSkills).length, character.id).toBeGreaterThan(0);
      expect(companion.leavesWhen.length, character.id).toBeGreaterThan(0);
      // Every skill they claim to bring has to be a skill this world has.
      for (const skillId of Object.keys(companion.grantsSkills)) {
        expect(BLACKWAKE.skills.some((s) => s.id === skillId), `${character.id}/${skillId}`).toBe(true);
      }
    }
  });

  it('refuses somebody you have not spoken to, and says why', () => {
    const verdict = recruitCheck(start(), BLACKWAKE, 'nessa');
    expect(verdict.ok).toBe(false);
    expect(verdict.unmet.length).toBeGreaterThan(0);
    expect(verdict.copy).toEqual(BLACKWAKE.characters.find((c) => c.id === 'nessa')!.companion!.refusalCopy);
  });

  it('accepts once the condition is met, and hands over their own words', () => {
    const state = start();
    state.flags['spoke:nessa'] = true;
    const verdict = recruitCheck(state, BLACKWAKE, 'nessa');
    expect(verdict.ok).toBe(true);
    expect(verdict.unmet).toEqual([]);
    expect(verdict.copy).toContain('Those are my terms');
  });

  it('makes Rook conditional on knowing what he did, not on charm', () => {
    const state = start();
    state.flags['spoke:rook'] = true;
    expect(recruitCheck(state, BLACKWAKE, 'rook').ok).toBe(false);
    state.flags['knows:rook_left_the_fleet'] = true;
    expect(recruitCheck(state, BLACKWAKE, 'rook').ok).toBe(true);
  });

  it('puts them aboard with a morale of their own', () => {
    const state = start();
    state.flags['spoke:mako'] = true;
    const mutations = recruitMutations(BLACKWAKE, 'mako', nextId);
    for (const mutation of mutations) {
      state.flags[mutation.payload.flag as string] = mutation.payload.value as boolean | number;
    }
    expect(isAboard(state, 'mako')).toBe(true);
    expect(moraleOf(state, 'mako')).toBe(70);
  });

  it('will not take somebody back who already walked', () => {
    const state = start();
    state.flags['spoke:nessa'] = true;
    state.flags[departedFlag('nessa')] = true;
    expect(recruitCheck(state, BLACKWAKE, 'nessa').ok).toBe(false);
  });

  it('lets the crew you already have veto the crew you want', () => {
    // Rook will not be on the same deck as Veyra Sol. Nobody else's opinion is
    // that strong, which is the point: one hard no, and it is authored.
    const hard = BLACKWAKE.characters.flatMap((c) =>
      (c.companion?.bonds ?? []).filter((b) => b.value <= -3).map((b) => `${c.id}->${b.characterId}`),
    );
    expect(hard).toEqual(['rook->veyra']);
  });
});

// ---------------------------------------------------------------------------
// The crew is worth something, mechanically
// ---------------------------------------------------------------------------

describe('a crew changes the numbers, not just the prose', () => {
  it('adds their skill to the player’s own rolls', () => {
    const alone = start();
    const withNessa = aboard(start(), 'nessa');
    expect(crewSkillModifier(alone, BLACKWAKE, 'navigation')).toBe(0);
    expect(crewSkillModifier(withNessa, BLACKWAKE, 'navigation')).toBe(3);
    expect(
      effectiveModifier(withNessa, BLACKWAKE, 'mind', 'navigation') -
        effectiveModifier(alone, BLACKWAKE, 'mind', 'navigation'),
    ).toBe(3);
  });

  it('gives back less from somebody who is barely still here', () => {
    const state = aboard(start(), 'nessa');
    state.flags[moraleFlag('nessa')] = 40;
    expect(crewSkillModifier(state, BLACKWAKE, 'navigation')).toBe(1);
    state.flags[moraleFlag('nessa')] = 10;
    expect(crewSkillModifier(state, BLACKWAKE, 'navigation')).toBe(0);
  });

  it('costs supplies to keep, and costs more the bigger it is', () => {
    const one = aboard(start(), 'nessa');
    const three = aboard(aboard(aboard(start(), 'nessa'), 'rook'), 'mako');
    expect(crewUpkeepPerDay(one, BLACKWAKE)).toBe(1);
    expect(crewUpkeepPerDay(three, BLACKWAKE)).toBe(4);
  });

  it('reads back as a roster a player can act on', () => {
    expect(crewSummary(start(), BLACKWAKE)).toBe('No crew.');
    expect(crewSummary(aboard(start(), 'nessa'), BLACKWAKE)).toBe('Nessa Vale — Navigator, steady');
  });
});

// ---------------------------------------------------------------------------
// Departure
// ---------------------------------------------------------------------------

describe('the crew can leave', () => {
  it('walks the navigator off the moment you sign the thing she told you not to', () => {
    const state = aboard(start(), 'nessa');
    state.flags['took_house_contract'] = true;
    const outcome = updateCrew(state, BLACKWAKE, 60, nextId);
    expect(outcome.departures.map((d) => d.characterId)).toEqual(['nessa']);
    expect(outcome.observableFacts.join(' ')).toContain('I told you the one thing');
    expect(outcome.departures[0]!.betrayal).toBe(false);
  });

  it('records the departure as engine state, not as a line of prose', () => {
    const state = aboard(start(), 'nessa');
    state.flags['took_house_contract'] = true;
    const outcome = updateCrew(state, BLACKWAKE, 60, nextId);
    const flags = outcome.mutations.map((m) => [m.payload.flag, m.payload.value]);
    expect(flags).toContainEqual([crewFlag('nessa'), false]);
    expect(flags).toContainEqual([departedFlag('nessa'), true]);
    expect(flags).toContainEqual(['nessa_gone', true]);
  });

  it('lets a committed turn report who left without deciding it twice', () => {
    const state = aboard(start(), 'nessa');
    state.flags['took_house_contract'] = true;
    const outcome = updateCrew(state, BLACKWAKE, 60, nextId);
    const reported = departuresFromMutations(BLACKWAKE, outcome.mutations);
    expect(reported.map((d) => d.name)).toEqual(['Nessa Vale']);
    expect(reported[0]!.reasonId).toBe('nessa_house_flag');
    expect(reported[0]!.copy).toContain('Good luck with the rest of it');
  });

  it('warns before it happens', () => {
    const state = aboard(start(), 'mako');
    state.flags[moraleFlag('mako')] = 20;
    const outcome = updateCrew(state, BLACKWAKE, 0, nextId);
    expect(outcome.departures).toEqual([]);
    expect(outcome.warnings.map((w) => w.characterId)).toEqual(['mako']);
    expect(outcome.warnings[0]!.copy).not.toEqual('');
  });

  it('has one of them go badly, and only when the player never asked', () => {
    const state = aboard(start(), 'rook');
    state.flags[moraleFlag('rook')] = 5;
    const relationship = state.relationships.find((r) => r.characterId === 'rook')!;
    relationship.trust = 0;
    const outcome = updateCrew(state, BLACKWAKE, 60, nextId);
    expect(outcome.departures[0]!.betrayal).toBe(true);
    expect(state.flags['rook_confessed']).toBeUndefined();

    // Having got it out of him closes that particular door.
    const confessed = aboard(start(), 'rook');
    confessed.flags[moraleFlag('rook')] = 5;
    confessed.relationships.find((r) => r.characterId === 'rook')!.trust = 0;
    confessed.flags['rook_confessed'] = true;
    expect(updateCrew(confessed, BLACKWAKE, 60, nextId).departures).toEqual([]);
  });

  it('moves morale for the things the player did, once each', () => {
    const state = aboard(start(), 'mako');
    state.flags['crew_fed'] = true;
    const first = updateCrew(state, BLACKWAKE, 0, nextId);
    const moved = first.mutations.find((m) => m.payload.flag === moraleFlag('mako'));
    expect(moved!.payload.value).toBe(80);

    for (const mutation of first.mutations) {
      state.flags[mutation.payload.flag as string] = mutation.payload.value as boolean | number;
    }
    const second = updateCrew(state, BLACKWAKE, 0, nextId);
    expect(second.mutations.find((m) => m.payload.flag === moraleFlag('mako'))).toBeUndefined();
  });

  it('makes two people who cannot stand each other cost you both of them', () => {
    const together = aboard(aboard(start(), 'nessa'), 'rook');
    const apart = aboard(start(), 'nessa');
    const withFriction = updateCrew(together, BLACKWAKE, DAY, nextId);
    const without = updateCrew(apart, BLACKWAKE, DAY, nextId);

    const nessaWith = withFriction.mutations.find((m) => m.payload.flag === moraleFlag('nessa'));
    expect(nessaWith!.payload.value).toBe(56);
    expect(without.mutations.find((m) => m.payload.flag === moraleFlag('nessa'))).toBeUndefined();
    expect(withFriction.privateFacts.join(' ')).toContain('Rook Arden');
  });

  it('does not fire a departure on a rule with no conditions in it', () => {
    for (const character of BLACKWAKE.characters) {
      for (const rule of character.companion?.leavesWhen ?? []) {
        const w = rule.when;
        const any =
          w.moraleAtMost !== null ||
          w.trustAtMost !== null ||
          w.flagsSet.length > 0 ||
          w.flagsUnset.length > 0 ||
          w.afterWorldMinute !== null;
        expect(any, `${character.id}/${rule.id}`).toBe(true);
      }
    }
    // And nobody walks on turn one.
    const full = aboard(aboard(aboard(start(), 'nessa'), 'rook'), 'mako');
    expect(updateCrew(full, BLACKWAKE, 0, nextId).departures).toEqual([]);
  });

  it('leaves the roster and the modifier empty once they are gone', () => {
    const state = aboard(start(), 'nessa');
    state.flags['took_house_contract'] = true;
    const outcome = updateCrew(state, BLACKWAKE, 60, nextId);
    for (const mutation of outcome.mutations) {
      state.flags[mutation.payload.flag as string] = mutation.payload.value as boolean | number;
    }
    expect(crewRoster(state, BLACKWAKE)).toEqual([]);
    expect(crewSkillModifier(state, BLACKWAKE, 'navigation')).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// The ship
// ---------------------------------------------------------------------------

describe('the ship gets better in ways you can measure', () => {
  it('starts cracked and knows it', () => {
    const hull = BLACKWAKE.resources.find((r) => r.id === 'hull')!;
    expect(hull.start).toBeLessThan(hull.max);
    expect(hull.regenPerHour).toBe(0);
  });

  it('has an upgrade for each of the three things a ship can be', () => {
    const slots = BLACKWAKE.items.filter((i) => i.tags.includes('ship')).map((i) => i.equipSlot);
    expect(new Set(slots)).toEqual(new Set(['ship_hull', 'ship_rig', 'ship_guns', 'ship_hold']));
  });

  it('makes every upgrade something the player can actually get hold of', () => {
    const takeable = new Set(BLACKWAKE.locations.flatMap((l) => l.takeableItems.map((t) => t.itemId)));
    const rewarded = new Set(
      BLACKWAKE.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.items.map((i) => i.itemId))),
    );
    for (const item of BLACKWAKE.items.filter((i) => i.tags.includes('ship'))) {
      expect(takeable.has(item.id) || rewarded.has(item.id), item.id).toBe(true);
    }
  });

  it('pays out in the roll, not in a description', () => {
    expect(BLACKWAKE.items.find((i) => i.id === 'topsails')!.skillModifiers.seamanship).toBe(2);
    expect(BLACKWAKE.items.find((i) => i.id === 'long_nines')!.skillModifiers.gunnery).toBe(2);
    expect(BLACKWAKE.items.find((i) => i.id === 'surgeons_chest')!.skillModifiers.medicine).toBe(2);
  });

  it('gates the storm belt on having fitted her out for something', () => {
    const step = BLACKWAKE.quests
      .find((q) => q.id === 'q_fit_her_out')!
      .steps.find((s) => s.id === 'storm_ready')!;
    expect(step.enterWhen!.flagsSet).toContain('ship_upgraded');
  });
});

// ---------------------------------------------------------------------------
// Notoriety and the Fleet
// ---------------------------------------------------------------------------

describe('your bounty is politics, not level', () => {
  it('keeps how known you are separate from what the navy thinks', () => {
    expect(BLACKWAKE.resources.some((r) => r.id === 'notoriety')).toBe(true);
    expect(BLACKWAKE.factions.some((f) => f.id === 'faction_fleet')).toBe(true);
    expect(BLACKWAKE.resources.find((r) => r.id === 'notoriety')!.start).toBe(0);
  });

  it('prints the bounty as a rank on the navy’s own opinion of you', () => {
    const fleet = BLACKWAKE.factions.find((f) => f.id === 'faction_fleet')!;
    const worst = [...fleet.ranks].sort((a, b) => a.atReputation - b.atReputation)[0]!;
    expect(worst.label).toContain('crowns');
    // Going up with them is possible, which is what makes going down a choice.
    expect(Math.max(...fleet.ranks.map((r) => r.atReputation))).toBeGreaterThan(0);
  });

  it('posts a bounty for what you did, and never for what you are', () => {
    const posted = BLACKWAKE.worldEvents.find((e) => e.id === 'we_the_bounty_posted')!;
    expect(posted.requiresFlags).toEqual(['freed_the_pressed_men']);
    expect(posted.cancelledByFlags).toEqual(['took_fleet_commission']);
  });

  it('offers the same act to three factions and gets three different answers', () => {
    const step = BLACKWAKE.quests
      .find((q) => q.id === 'q_the_pressed_men')!
      .steps.find((s) => s.id === 'the_press_gang')!;
    expect(step.succeedWhenAny.length).toBeGreaterThanOrEqual(4);
    const closed = step.succeedWhenAny.flatMap((r) => r.closesFlags);
    expect(closed.length).toBeGreaterThan(0);
  });

  it('lets standing be earned as well as lost, everywhere it is gated', () => {
    const earnable = new Map<string, number>(
      BLACKWAKE.factions.map((f) => [f.id, f.startingReputation]),
    );
    for (const archetype of BLACKWAKE.archetypes) {
      for (const entry of archetype.startingReputation) {
        earnable.set(entry.factionId, Math.max(earnable.get(entry.factionId) ?? 0, entry.amount));
      }
    }
    for (const quest of BLACKWAKE.quests) {
      for (const step of quest.steps) {
        for (const entry of step.rewards.reputation) {
          earnable.set(entry.factionId, (earnable.get(entry.factionId) ?? 0) + entry.amount);
        }
      }
    }
    for (const quest of BLACKWAKE.quests) {
      for (const step of quest.steps) {
        for (const route of step.succeedWhenAny) {
          for (const need of route.predicate.minFactionReputation) {
            expect(earnable.get(need.factionId) ?? 0, `${quest.id}/${route.routeId}`).toBeGreaterThanOrEqual(
              need.value,
            );
          }
        }
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Islands
// ---------------------------------------------------------------------------

describe('the ocean opens in an order', () => {
  it('starts you with three places and the rest dark', () => {
    const state = start();
    expect([...state.discoveredLocationIds].sort()).toEqual(['saltmarket', 'the_marrow', 'the_yard']);
  });

  it('puts real distance between the islands', () => {
    const legs = BLACKWAKE.locations
      .flatMap((l) => l.connections)
      .filter((c) => c.travelMinutes >= 360);
    expect(legs.length).toBeGreaterThanOrEqual(3);
  });

  it('locks the last one behind the whole chart', () => {
    const leg = BLACKWAKE.locations
      .find((l) => l.id === 'stormlee')!
      .connections.find((c) => c.to === 'the_crownless')!;
    expect(leg.lockedByFlag).toBe('chart_complete');

    const before = start();
    const after = start();
    after.flags['chart_complete'] = true;
    const predicate = {
      flagsSet: ['chart_complete'],
      flagsUnset: [],
      hasItems: [],
      atLocation: null,
      completedEvents: [],
      minRelationship: [],
      minFactionReputation: [],
      beforeWorldMinute: null,
      afterWorldMinute: null,
    };
    expect(evaluatePredicate(predicate, before)).toBe(false);
    expect(evaluatePredicate(predicate, after)).toBe(true);
  });

  it('gives every island something to do that is not the main line', () => {
    for (const locationId of ['the_drift', 'stormlee']) {
      const quests = BLACKWAKE.quests.filter((q) => q.involvedLocationIds.includes(locationId));
      expect(quests.length, locationId).toBeGreaterThanOrEqual(2);
    }
  });

  it('reaches the Crownless Sea only through the chart, and only from Stormlee', () => {
    const inbound = BLACKWAKE.locations.filter((l) =>
      l.connections.some((c) => c.to === 'the_crownless'),
    );
    expect(inbound.map((l) => l.id)).toEqual(['stormlee']);
  });
});

// ---------------------------------------------------------------------------
// Relics
// ---------------------------------------------------------------------------

describe('a relic breaks one rule and nothing else', () => {
  it('has relics, and keeps them locked until they are understood', () => {
    const relics = BLACKWAKE.abilities.filter((a) => a.tags.includes('relic'));
    expect(relics.length).toBe(2);
    for (const relic of relics) {
      expect(relic.unlockedByDefault, relic.id).toBe(false);
      expect(relic.requires, relic.id).not.toBeNull();
      expect(relic.requires!.lockedCopy, relic.id).not.toEqual('');
    }
  });

  it('never puts a relic in a starting build', () => {
    const relicItems = new Set(BLACKWAKE.items.filter((i) => i.tags.includes('relic')).map((i) => i.id));
    const relicAbilities = new Set(
      BLACKWAKE.abilities.filter((a) => a.tags.includes('relic')).map((a) => a.id),
    );
    for (const archetype of BLACKWAKE.archetypes) {
      for (const item of archetype.startingItems) expect(relicItems.has(item.itemId)).toBe(false);
      for (const id of archetype.startingAbilities) expect(relicAbilities.has(id)).toBe(false);
    }
  });

  it('leaves a run that never touches one able to finish', () => {
    // Nothing on the main line may require a relic ability or a relic item.
    const relicIds = new Set([
      ...BLACKWAKE.items.filter((i) => i.tags.includes('relic') && i.id !== 'vanes_compass').map((i) => i.id),
      ...BLACKWAKE.abilities.filter((a) => a.tags.includes('relic')).map((a) => `used:${a.id}`),
    ]);
    for (const quest of BLACKWAKE.quests.filter((q) => q.kind === 'MAIN')) {
      for (const step of quest.steps) {
        const routes = step.succeedWhenAny.length > 0 ? step.succeedWhenAny : null;
        if (!routes) {
          for (const item of step.succeedWhen?.hasItems ?? []) expect(relicIds.has(item), item).toBe(false);
          continue;
        }
        const relicFree = routes.filter(
          (route) =>
            !route.predicate.hasItems.some((i) => relicIds.has(i)) &&
            !route.predicate.flagsSet.some((f) => relicIds.has(f)),
        );
        expect(relicFree.length, `${quest.id}/${step.id}`).toBeGreaterThan(0);
      }
    }
  });
});
