import { describe, expect, it } from 'vitest';
import {
  IDENTITY_THRESHOLD,
  SCOUTED_THRESHOLD,
  applyPlayerPossession,
  contestResultFlags,
  createInitialState,
  playerIdentity,
  scoutFlag,
  scoutedLevel,
  scoutingMutations,
  scoutingPressure,
  SeededRng,
  simulateContest,
  startContest,
  tendencyCount,
  tendencyFlag,
  tendencyMutations,
  tendencyProfile,
} from '@aniplay/engine';
import type { GameState } from '@aniplay/contracts';
import { LAST_FIVE } from './index.js';

/**
 * A sports world is only a game if improvement and adaptation are numbers.
 * These hold Last Five to the two promises on its card: your style comes from
 * playing, and rivals scout you.
 */

const start = (archetypeId = 'arch_streetball'): GameState =>
  createInitialState({
    sessionId: 'sess_lf',
    story: LAST_FIVE,
    identity: {
      displayName: 'Sora Kimura',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

let n = 0;
const nextId = (): string => `m${n++}`;
const ability = (id: string) => LAST_FIVE.abilities.find((a) => a.id === id)!;

/** Do something, n times, the way the engine would. */
const lean = (state: GameState, abilityId: string, times: number): GameState => {
  for (let i = 0; i < times; i++) {
    for (const mutation of tendencyMutations(LAST_FIVE, state, ability(abilityId), nextId)) {
      state.flags[mutation.payload.flag as string] = mutation.payload.value as number;
    }
  }
  return state;
};

// ---------------------------------------------------------------------------
// Style comes from playing
// ---------------------------------------------------------------------------

describe('you are not told what position you play', () => {
  it('offers no position at setup, only a background', () => {
    const field = LAST_FIVE.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText).toMatch(/does NOT set your position|not.*position/i);
    // And no archetype is named after a position.
    for (const archetype of LAST_FIVE.archetypes) {
      expect(archetype.name).not.toMatch(/guard|forward|centre|center|point/i);
    }
  });

  it('refuses to name a style before there is evidence for it', () => {
    const state = start();
    expect(playerIdentity(state, LAST_FIVE).label).toBeNull();
    lean(state, 'hard_drive', IDENTITY_THRESHOLD - 1);
    expect(playerIdentity(state, LAST_FIVE).label).toBeNull();
  });

  it('names the style the player actually built', () => {
    const slasher = lean(start(), 'hard_drive', 10);
    expect(playerIdentity(slasher, LAST_FIVE).label).toBe('Slasher');

    const passer = lean(start(), 'read_and_pass', 10);
    expect(playerIdentity(passer, LAST_FIVE).label).toBe('Playmaker');

    const stopper = lean(start(), 'face_guard', 10);
    expect(playerIdentity(stopper, LAST_FIVE).label).toBe('Stopper');
  });

  it('gives two players of the same background completely different identities', () => {
    // The user's requirement: one protagonist becomes a terrifying isolation
    // scorer, another a genius passer, from the same starting point.
    const a = lean(start('arch_streetball'), 'hard_drive', 14);
    const b = lean(start('arch_streetball'), 'read_and_pass', 14);
    expect(playerIdentity(a, LAST_FIVE).label).not.toBe(playerIdentity(b, LAST_FIVE).label);
    expect(playerIdentity(a, LAST_FIVE).label).toBe('Slasher');
    expect(playerIdentity(b, LAST_FIVE).label).toBe('Playmaker');
  });

  it('calls a two-way player two things rather than picking a winner', () => {
    const state = start();
    lean(state, 'hard_drive', 8);
    lean(state, 'face_guard', 7);
    const identity = playerIdentity(state, LAST_FIVE);
    expect(identity.label).toContain('Slasher');
    expect(identity.label).toContain('Stopper');
  });

  it('counts an attempt whether or not it worked', () => {
    // Leaning on something that keeps failing is still leaning on it.
    const state = lean(start(), 'pull_up', 4);
    expect(tendencyCount(state, 'pullup')).toBe(4);
  });

  it('reports the whole distribution, so a coach can talk about it', () => {
    const state = start();
    lean(state, 'hard_drive', 6);
    lean(state, 'read_and_pass', 2);
    const profile = tendencyProfile(state, LAST_FIVE).filter((p) => p.count > 0);
    expect(profile.map((p) => p.def.id)).toEqual(['drive', 'dish']);
    expect(profile[0]!.share).toBeCloseTo(0.75, 2);
  });

  it('gives every tracked habit an ability that feeds it', () => {
    for (const tendency of LAST_FIVE.tendencies) {
      const feeders = LAST_FIVE.abilities.filter((a) => a.tendencies.includes(tendency.id));
      expect(feeders.length, `nothing builds ${tendency.id}`).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// Rivals scout you
// ---------------------------------------------------------------------------

describe('opponents learn you, as a number', () => {
  it('gives the five rivals different scouting ability', () => {
    const rivals = ['rei', 'tsubame', 'gora', 'mikael', 'yuki'].map(
      (id) => LAST_FIVE.characters.find((c) => c.id === id)!,
    );
    for (const rival of rivals) expect(rival.scouting, rival.id).not.toBeNull();
    const rates = rivals.map((r) => r.scouting!.learnRate);
    expect(new Set(rates).size).toBeGreaterThan(1);
    // Mikael watches every minute of film. He should be the worst to face twice.
    const mikael = LAST_FIVE.characters.find((c) => c.id === 'mikael')!;
    expect(Math.max(...rivals.map((r) => r.scouting!.cap))).toBe(mikael.scouting!.cap);
  });

  it('learns nothing about a player who has not shown them anything', () => {
    expect(scoutingMutations(start(), LAST_FIVE, 'mikael', nextId)).toEqual([]);
  });

  it('learns only the habits the player actually leans on', () => {
    const state = start();
    lean(state, 'hard_drive', 10);
    lean(state, 'post_up', 1);

    const learned = scoutingMutations(state, LAST_FIVE, 'mikael', nextId);
    const flags = learned.map((m) => m.payload.flag);
    expect(flags).toContain(scoutFlag('mikael', 'drive'));
    // One post-up in eleven possessions is a move, not a tendency.
    expect(flags).not.toContain(scoutFlag('mikael', 'post'));
  });

  it('stops at the opponent’s own ceiling, so nobody is ever solved', () => {
    const state = start();
    lean(state, 'hard_drive', 10);
    const cap = LAST_FIVE.characters.find((c) => c.id === 'jun')!.scouting!.cap;

    for (let session = 0; session < 20; session++) {
      for (const mutation of scoutingMutations(state, LAST_FIVE, 'jun', nextId)) {
        state.flags[mutation.payload.flag as string] = mutation.payload.value as number;
      }
    }
    expect(scoutedLevel(state, 'jun', 'drive')).toBe(cap);
  });

  it('makes a scouted habit measurably harder, not narratively harder', () => {
    const state = start();
    const clean = scoutingPressure(state, LAST_FIVE, ability('hard_drive'), ['mikael']);
    expect(clean.dcDelta).toBe(0);

    state.flags[scoutFlag('mikael', 'drive')] = SCOUTED_THRESHOLD + 3;
    const scouted = scoutingPressure(state, LAST_FIVE, ability('hard_drive'), ['mikael']);
    expect(scouted.dcDelta).toBeGreaterThan(0);
    expect(scouted.tendency?.id).toBe('drive');
    expect(scouted.note).not.toBeNull();
  });

  it('rewards the counter, so evolving is the answer rather than grinding', () => {
    // They are sitting on the drive. The pull-up is authored as what beats that.
    const state = start();
    state.flags[scoutFlag('mikael', 'drive')] = SCOUTED_THRESHOLD + 3;

    const punished = scoutingPressure(state, LAST_FIVE, ability('hard_drive'), ['mikael']);
    const rewarded = scoutingPressure(state, LAST_FIVE, ability('pull_up'), ['mikael']);

    expect(punished.dcDelta).toBeGreaterThan(0);
    expect(rewarded.dcDelta).toBeLessThan(0);
  });

  it('gives every habit a counter that beats it', () => {
    // Otherwise being scouted is a dead end rather than a problem to solve.
    const counterable = new Set(
      LAST_FIVE.abilities.map((a) => a.countersTendency).filter((t): t is string => t !== null),
    );
    for (const id of ['drive', 'pullup', 'post', 'offball', 'lockdown']) {
      expect(counterable.has(id), `nothing counters ${id}`).toBe(true);
    }
  });

  it('does not let one opponent’s film help another', () => {
    const state = start();
    state.flags[scoutFlag('mikael', 'drive')] = 9;
    expect(scoutingPressure(state, LAST_FIVE, ability('hard_drive'), ['rei']).dcDelta).toBe(0);
    expect(scoutingPressure(state, LAST_FIVE, ability('hard_drive'), ['mikael']).dcDelta).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// The match
// ---------------------------------------------------------------------------

describe('a game has a clock and the player does not play all of it', () => {
  const opponent = { strength: 3, aggression: 1 };
  const contestOf = (state: GameState) =>
    startContest({
      contestId: 'game_1',
      opponentId: 'rei',
      opponentName: 'Seiran',
      stakes: 'First round.',
      periodCount: 4,
      periodSeconds: 600,
    });

  it('simulates ordinary stretches rather than asking the player to play them', () => {
    const state = start();
    state.contest = contestOf(state);
    const result = simulateContest(state, LAST_FIVE, new SeededRng('g1'), opponent, 12);
    expect(result.beats.length).toBeGreaterThan(0);
    expect(result.contest.playerScore + result.contest.opponentScore).toBeGreaterThan(0);
  });

  it('is the same game twice from the same seed', () => {
    const a = start();
    a.contest = contestOf(a);
    const b = start();
    b.contest = contestOf(b);
    expect(simulateContest(a, LAST_FIVE, new SeededRng('same'), opponent, 20)).toEqual(
      simulateContest(b, LAST_FIVE, new SeededRng('same'), opponent, 20),
    );
  });

  it('hands the player the ball when the game is close and late', () => {
    const state = start();
    state.contest = {
      ...contestOf(state),
      period: 4,
      clockSeconds: 40,
      playerScore: 70,
      opponentScore: 72,
    };
    const result = simulateContest(state, LAST_FIVE, new SeededRng('clutch'), opponent, 12);
    expect(result.handOver).toBe('CLUTCH');
    expect(result.contest.playerControlled).toBe(true);
    expect(result.beats).toEqual([]);
  });

  it('hands over when the player is being run off the floor', () => {
    const state = start();
    state.contest = { ...contestOf(state), momentum: -0.8 };
    expect(simulateContest(state, LAST_FIVE, new SeededRng('run'), opponent, 12).handOver).toBe('BLEEDING');
  });

  it('does not interrupt a stretch that is not worth playing', () => {
    const state = start();
    state.contest = { ...contestOf(state), period: 1, clockSeconds: 600, momentum: 0 };
    const result = simulateContest(state, LAST_FIVE, new SeededRng('quiet'), opponent, 4);
    expect(result.handOver).toBeNull();
    expect(result.beats).toHaveLength(4);
  });

  /**
   * Plays a whole game the way a session would: simulate until the engine hands
   * over, take the possession, repeat. A handed-over possession deliberately
   * does not advance the clock — the game is waiting for the player — so
   * anything driving a contest to its end has to actually play.
   */
  const playWholeGame = (seed: string, against = opponent) => {
    const state = start();
    let contest = contestOf(state);
    for (let i = 0; i < 80 && !contest.finished; i++) {
      state.contest = contest;
      const result = simulateContest(state, LAST_FIVE, new SeededRng(`${seed}:${i}`), against, 8);
      contest = result.contest;
      if (result.handOver && !contest.finished) {
        // The player takes it and makes about half of them.
        contest = applyPlayerPossession(contest, { points: i % 2 === 0 ? 2 : 0 });
      }
    }
    return contest;
  };

  it('runs the clock out and produces a real result', () => {
    const contest = playWholeGame('x');
    expect(contest.finished).toBe(true);
    expect(contest.playerWon).not.toBeNull();
    expect(contest.log.at(-1)).toMatch(/Final:/);
  });

  it('waits rather than playing the possession for you', () => {
    const state = start();
    state.contest = { ...contestOf(state), period: 4, clockSeconds: 40, playerScore: 70, opponentScore: 72 };
    const first = simulateContest(state, LAST_FIVE, new SeededRng('wait'), opponent, 12);
    state.contest = first.contest;
    const second = simulateContest(state, LAST_FIVE, new SeededRng('wait2'), opponent, 12);
    // The clock has not moved and nothing was invented on the player's behalf.
    expect(second.contest.clockSeconds).toBe(first.contest.clockSeconds);
    expect(second.contest.playerScore).toBe(first.contest.playerScore);
  });

  it('lets the player lose', () => {
    // A game the engine cannot lose is not a game. Against a much stronger
    // opponent, over many seeds, the player must sometimes go down.
    const strong = { strength: 11, aggression: 1.5 };
    const results = Array.from({ length: 12 }, (_, seed) => playWholeGame(`s${seed}`, strong));
    expect(results.every((c) => c.finished)).toBe(true);
    expect(results.filter((c) => c.playerWon === false).length).toBeGreaterThan(0);
  });

  it('asks the player to play about a dozen possessions, not two hundred', () => {
    // The whole reason the simulation exists. A forty-minute game is roughly
    // 130 possessions; the player should be handed the ones worth playing.
    const counts: number[] = [];
    for (let seed = 0; seed < 8; seed++) {
      const state = start();
      let contest = contestOf(state);
      let handed = 0;
      for (let i = 0; i < 200 && !contest.finished; i++) {
        state.contest = contest;
        const result = simulateContest(state, LAST_FIVE, new SeededRng(`p${seed}:${i}`), opponent, 8);
        contest = result.contest;
        if (result.handOver && !contest.finished) {
          handed += 1;
          contest = applyPlayerPossession(contest, { points: i % 2 === 0 ? 2 : 0 });
        }
      }
      expect(contest.finished, `seed ${seed} never ended`).toBe(true);
      counts.push(handed);
    }
    for (const count of counts) {
      expect(count, `handed ${count} possessions`).toBeGreaterThan(2);
      expect(count, `handed ${count} possessions`).toBeLessThan(30);
    }
  });

  it('needs less of the player in a blowout than in a close game', () => {
    // A run when you are up thirty is mopping up, not drama.
    const handedFor = (against: { strength: number; aggression: number }, seed: string): number => {
      const state = start();
      let contest = contestOf(state);
      let handed = 0;
      for (let i = 0; i < 200 && !contest.finished; i++) {
        state.contest = contest;
        const result = simulateContest(state, LAST_FIVE, new SeededRng(`${seed}:${i}`), against, 8);
        contest = result.contest;
        if (result.handOver && !contest.finished) {
          handed += 1;
          contest = applyPlayerPossession(contest, { points: i % 2 === 0 ? 2 : 0 });
        }
      }
      return handed;
    };

    const blowout = Array.from({ length: 5 }, (_, i) => handedFor({ strength: -4, aggression: 0.6 }, `b${i}`));
    const close = Array.from({ length: 5 }, (_, i) => handedFor({ strength: 3, aggression: 1 }, `c${i}`));
    const mean = (xs: number[]): number => xs.reduce((a, b) => a + b, 0) / xs.length;
    expect(mean(blowout)).toBeLessThanOrEqual(mean(close));
  });

  it('lets the player win against somebody they should beat', () => {
    const weak = { strength: -4, aggression: 0.6 };
    const results = Array.from({ length: 12 }, (_, seed) => playWholeGame(`w${seed}`, weak));
    expect(results.filter((c) => c.playerWon === true).length).toBeGreaterThan(0);
  });

  it('makes a possession the player chose worth more than a simulated one', () => {
    const state = start();
    const base = contestOf(state);
    const scored = applyPlayerPossession({ ...base, playerControlled: true }, { points: 3 });
    expect(scored.playerScore).toBe(3);
    expect(scored.momentum).toBeGreaterThan(base.momentum);
    expect(scored.playerControlled).toBe(false);
  });

  it('records the result as something the world can gate on', () => {
    const won = { ...startContest({ contestId: 'g', opponentId: 'rei', opponentName: 'Seiran', stakes: '' }), finished: true, playerWon: true };
    expect(contestResultFlags(won)).toEqual(['played:rei', 'beat:rei']);

    const lost = { ...won, playerWon: false };
    expect(contestResultFlags(lost)).toEqual(['played:rei', 'lost_to:rei']);

    const unfinished = startContest({ contestId: 'g', opponentId: 'rei', opponentName: 'Seiran', stakes: '' });
    expect(contestResultFlags(unfinished)).toEqual([]);
  });

  it('ties the season to those results, so the road is real', () => {
    const road = LAST_FIVE.quests.find((q) => q.id === 'q_the_road')!;
    expect(road.steps).toHaveLength(5);
    for (const step of road.steps) {
      const gates = [
        ...(step.succeedWhen?.flagsSet ?? []),
        ...step.succeedWhenAny.flatMap((r) => r.predicate.flagsSet),
      ];
      expect(gates.some((f) => f.startsWith('played:') || f.startsWith('beat:') || f.startsWith('lost_to:')), step.id).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// The world holds together
// ---------------------------------------------------------------------------

describe('Last Five as a world', () => {
  it('is findable as a sports world', () => {
    expect(LAST_FIVE.tags).toContain('Sports');
    expect(LAST_FIVE.tags).toContain('School');
  });

  it('has five rivals with genuinely different problems', () => {
    const five = ['rei', 'tsubame', 'gora', 'mikael', 'yuki'].map(
      (id) => LAST_FIVE.characters.find((c) => c.id === id)!,
    );
    expect(five).toHaveLength(5);
    // Different home schools, different traits, different reasons.
    expect(new Set(five.map((c) => c.homeLocationId)).size).toBe(5);
    expect(new Set(five.map((c) => c.publicTraits[0])).size).toBe(5);
    for (const rival of five) expect(rival.secrets.length).toBeGreaterThan(0);
  });

  it('does not make all five villains', () => {
    // At least two left for reasons the player would agree with.
    const sympathetic = ['tsubame', 'gora', 'yuki'].map(
      (id) => LAST_FIVE.characters.find((c) => c.id === id)!,
    );
    for (const rival of sympathetic) {
      expect(rival.gates.length, rival.id).toBeGreaterThan(0);
    }
  });

  it('has a team worth having off the court', () => {
    const team = ['coach', 'dai', 'kai', 'jun', 'bo', 'nori'];
    for (const id of team) {
      const member = LAST_FIVE.characters.find((c) => c.id === id);
      expect(member, id).toBeDefined();
      expect(member!.schedule.length, id).toBeGreaterThan(0);
    }
  });

  it('has no magic in it', () => {
    expect(LAST_FIVE.rules.allowsCombat).toBe(false);
    expect(LAST_FIVE.attributes.arcana).toBeLessThan(5);
    for (const ability of LAST_FIVE.abilities) {
      expect(ability.check?.attribute, ability.id).not.toBe('arcana');
    }
  });

  it('lets the season end without reaching Nationals', () => {
    const last = LAST_FIVE.quests.find((q) => q.id === 'q_the_road')!.steps.at(-1)!;
    const routes = last.succeedWhenAny.map((r) => r.routeId);
    expect(routes).toContain('won_it');
    expect(routes).toContain('lost_it');
  });

  it('understands a player who does not know basketball words', () => {
    const drive = LAST_FIVE.abilities.find((a) => a.id === 'hard_drive')!;
    expect(drive.affordances).toContain('run past him and try to score close to the hoop');
  });
});
