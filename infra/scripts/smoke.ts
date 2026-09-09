/**
 * Plays every launch world badly, on purpose, and reports what looks wrong.
 *
 * This is the check that keeps finding real bugs, and it finds them because it
 * does not play along: it attacks people it was meant to talk to, refuses the
 * quest, misspells names, waits, lies, steals, and comes back to someone eight
 * scenes later to see whether they remember. A happy path proves the pipeline
 * runs. This is about whether the world holds.
 *
 *   npm run api           # in another shell
 *   npm run smoke -- [--base=http://localhost:4000] [--only=tidewall] [--quick]
 *
 * Exits non-zero if anything is flagged, so it can gate a release.
 */
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';
import {
  checkNarrativeClarity,
  checkStoryChoiceClarity,
  narratesPlayerInThirdPerson,
} from '@aniplay/director';
import type { StoryVersion } from '@aniplay/contracts';

interface Problem {
  readonly world: string;
  readonly action: string;
  readonly kind: string;
  readonly detail: string;
}

interface Probe {
  readonly text: string;
  /** What this probe is trying to break, so a finding says why it matters. */
  readonly intent:
    | 'violence'
    | 'insult'
    | 'refusal'
    | 'impossible'
    | 'misspelling'
    | 'waiting'
    | 'lying'
    | 'theft'
    | 'flirting'
    | 'reversal'
    | 'return'
    | 'wandering'
    | 'looking';
  /** Set when the probe deliberately asks to move. */
  readonly movement?: boolean;
}

/**
 * A run designed to go wrong.
 *
 * Ordered so that later probes test memory of earlier ones: the player attacks
 * someone, insults them, wanders off, and then comes back — and the world has
 * to still be carrying all of it.
 */
function probesFor(story: StoryVersion): Probe[] {
  const cast = story.characters;
  const someone = cast[0]?.name ?? 'them';
  const firstName = someone.split(/\s+/)[0]!;
  const ally = cast[1]?.name.split(/\s+/)[0] ?? firstName;
  const elsewhere =
    story.locations.find((l) => l.id !== story.rules.startingLocationId)?.name ?? 'somewhere else';
  // One character off by a letter, the way a player actually types.
  const misspelled = firstName.length > 3 ? `${firstName.slice(0, -1)}${firstName.slice(-1)}e` : firstName;
  const violent = story.rules.allowsCombat;

  return [
    { text: 'I look around and take it in.', intent: 'looking' },
    { text: `I ask ${firstName} what is actually going on here.`, intent: 'looking' },
    {
      text: violent
        ? `I hit ${firstName}, hard, without warning.`
        : `I tell ${firstName}, in front of everyone, that they are a fraud and I am done pretending otherwise.`,
      intent: 'violence',
    },
    { text: `I tell ${ally} they have always been useless and I never wanted them here.`, intent: 'insult' },
    { text: 'I refuse. I am not doing this and nobody is going to make me.', intent: 'refusal' },
    { text: 'I fly up into the air and look down at the whole place from above.', intent: 'impossible' },
    { text: `I look for ${misspelled}.`, intent: 'misspelling' },
    { text: 'I sit down and wait. For hours.', intent: 'waiting' },
    { text: `I tell ${firstName} I was never here and they have me confused with someone else.`, intent: 'lying' },
    { text: 'I take the most valuable thing in reach and put it in my coat.', intent: 'theft' },
    { text: `I stand very close to ${firstName} and tell them I have wanted to say something for a while.`, intent: 'flirting' },
    { text: 'Actually, forget all of that. I take it back.', intent: 'reversal' },
    { text: `I go to ${elsewhere}.`, intent: 'wandering', movement: true },
    { text: 'I wander off in whatever direction is least useful.', intent: 'wandering' },
    { text: `I go back and find ${firstName} again.`, intent: 'return', movement: true },
    { text: `I ask ${firstName} whether they are still angry about what I did.`, intent: 'return' },
  ];
}

/**
 * Phrases that describe a consequence without naming one.
 *
 * Each of these was a real turn at some point: prose that sounded like it said
 * something and left the player unable to state what happened.
 */
const VAGUE_OUTCOME = [
  /\bsuccess with (?:a )?cost\b/i,
  /\bit works,? but it (?:takes|costs) something\b/i,
  /\bsomething (?:shifts|changes|gives|settles|breaks) (?:in|between|inside)\b/i,
  /\byou feel (?:a|the) (?:change|shift|weight|difference)\b/i,
  /\bsomething passes between\b/i,
  /\bthe (?:air|room|world) (?:changes|shifts)\b/i,
  /\byou have (?:gained|lost) something\b/i,
  /\bnothing is quite the same\b/i,
];

/** Words that mean nothing happened, used where something did. */
const FILLER = [
  /\bfor a (?:long )?moment,? (?:nothing|no one|nobody)\b/i,
  /\bthe (?:silence|quiet) (?:stretches|holds|lengthens)\b/i,
  /\btime seems to slow\b/i,
];

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const base = args.find((a) => a.startsWith('--base='))?.slice('--base='.length) ?? 'http://localhost:4000';
  const only = args.find((a) => a.startsWith('--only='))?.slice('--only='.length) ?? null;
  const quick = args.includes('--quick');

  const worlds = only ? LAUNCH_CATALOG.filter((w) => w.storyId.includes(only)) : LAUNCH_CATALOG;
  const problems: Problem[] = [];

  for (const story of worlds) {
    const note = (action: string, kind: string, detail: string): void => {
      problems.push({ world: story.title, action, kind, detail });
    };

    // Static checks first: a world whose own choice screens do not explain
    // themselves does not need a turn played to be wrong.
    for (const issue of checkStoryChoiceClarity(story).issues) {
      if (issue.severity === 'ERROR') note('(choices)', `CHOICE_${issue.code}`, issue.message);
    }
    for (const issue of checkNarrativeClarity(story.premise, { story, kind: 'premise' }).issues) {
      if (issue.severity === 'ERROR') note('(premise)', `PREMISE_${issue.code}`, issue.message);
    }

    const auth = {
      authorization: `Bearer guest_${crypto.randomUUID()}`,
      'content-type': 'application/json',
    };

    const call = async <T>(
      method: string,
      path: string,
      body?: unknown,
      extra: Record<string, string> = {},
    ): Promise<T> => {
      const response = await fetch(`${base}${path}`, {
        method,
        headers: { ...auth, ...extra },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const text = await response.text();
      if (!response.ok) throw new Error(`${method} ${path} → ${response.status} ${text.slice(0, 160)}`);
      return JSON.parse(text) as T;
    };

    let session;
    try {
      session = await call<any>('POST', `/v1/stories/${story.storyId}/sessions`, {
        identity: {
          displayName: 'Robin Vale',
          pronouns: 'they/them',
          // Deliberately not the obvious build: the world has to work for
          // whoever turns up, not only for the one it was designed around.
          archetypeId: story.archetypes[story.archetypes.length - 1]?.id ?? null,
          advanced: {},
        },
      });
    } catch (error) {
      note('(start)', 'SESSION_FAILED', String(error).slice(0, 160));
      continue;
    }

    const sessionId = session.session.sessionId as string;
    let revision = session.revision as number;
    let previous = session.scene;
    let previousSheet: any = null;

    // Carried across the run so continuity can be checked rather than assumed.
    const seenSentences = new Map<string, string>();
    const violenceAgainst = new Set<string>();
    let anyRelationshipMoved = false;
    let anyQuestMoved = false;
    let anyInventoryMoved = false;
    let anyCheckRan = false;
    let anyAbilityUsed = false;

    const probes = quick ? probesFor(story).slice(0, 5) : probesFor(story);

    for (const probe of probes) {
      const action = probe.text;
      let turn: any = null;
      try {
        const accepted = await call<any>(
          'POST',
          `/v1/sessions/${sessionId}/turns`,
          {
            actionText: action,
            // The cheap tier, so a sweep is about the world rather than about
            // how far a new account's grant stretches. That it does not stretch
            // to sixteen VIVID turns is worth knowing separately.
            qualityTier: 'QUICK',
            sessionRevision: revision,
            selectedSuggestionId: null,
            voicePreferred: false,
          },
          { 'idempotency-key': crypto.randomUUID() },
        );
        for (let attempt = 0; attempt < 50 && !turn; attempt += 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          try {
            turn = await call<any>('GET', `/v1/turns/${accepted.turnId}`);
          } catch {
            // Not committed yet.
          }
        }
      } catch (error) {
        note(action, 'TURN_FAILED', String(error).slice(0, 160));
        continue;
      }
      if (!turn) {
        note(action, 'TURN_TIMEOUT', 'no committed turn after 50s');
        continue;
      }

      const detail = await call<any>('GET', `/v1/sessions/${sessionId}`);
      const sheet = await call<any>('GET', `/v1/sessions/${sessionId}/world-sheet`);
      revision = detail.revision;

      const prose: string = turn.blocks.map((b: any) => b.text).join(' ');
      const narration: string = turn.blocks
        .filter((b: any) => b.type !== 'DIALOGUE')
        .map((b: any) => b.text)
        .join(' ');
      const present = new Set(detail.scene.presentCharacters.map((c: any) => c.id));
      const wasPresent = new Set(previous.presentCharacters.map((c: any) => c.id));

      // --- The turn happened at all ---------------------------------------

      if (turn.blocks.length === 0) note(action, 'NO_PROSE', '');
      else if (prose.length < 40) note(action, 'THIN_PROSE', prose);
      if (turn.suggestions.length === 0) note(action, 'NO_SUGGESTIONS', '');

      for (const block of turn.blocks) {
        if (
          block.speakerId &&
          block.speakerId !== 'player' &&
          !present.has(block.speakerId) &&
          !wasPresent.has(block.speakerId)
        ) {
          note(action, 'ABSENT_SPEAKER', `${block.speakerId}: "${String(block.text).slice(0, 80)}"`);
        }
      }

      // --- Prose quality ---------------------------------------------------

      for (const pattern of VAGUE_OUTCOME) {
        if (pattern.test(prose)) note(action, 'VAGUE_OUTCOME', matched(prose, pattern));
      }
      // Filler is only a problem when something actually happened.
      if (turn.checks.length > 0 || turn.stateDeltas.length > 0) {
        for (const pattern of FILLER) {
          if (pattern.test(prose)) note(action, 'FILLER_WHERE_EVENT', matched(prose, pattern));
        }
      }

      // The player is "you". Being narrated by name reads like watching
      // someone else play the story you are typing into.
      if (narratesPlayerInThirdPerson(narration, 'Robin Vale')) {
        note(action, 'PLAYER_IN_THIRD_PERSON', matched(narration, /\bRobin\b/));
      }

      // A check may not be rolled against somebody who is not in the room.
      for (const absent of story.characters) {
        if (present.has(absent.id) || wasPresent.has(absent.id)) continue;
        if (turn.checks.some((c: any) => String(c.label ?? '').includes(absent.name))) {
          note(action, 'ABSENT_TARGET_RESOLVED', `a check was rolled against ${absent.name}, who is not here`);
        }
      }

      // Narration must not put words in the player's mouth. A quoted line
      // inside a narration block is the writer speaking for them.
      for (const character of story.characters) {
        const firstName = character.name.split(/\s+/)[0]!;
        if (firstName.length < 4) continue;
        const speaking = new RegExp(`${firstName}[^.!?]{0,40}?[“"][^“”"]{12,}[”"]`);
        if (speaking.test(narration)) {
          note(action, 'NARRATION_AS_DIALOGUE', matched(narration, speaking));
        }
      }

      // The same sentence twice across a run reads as a machine, not a world.
      for (const sentence of prose.split(/(?<=[.!?])\s+/)) {
        const key = sentence.trim().toLowerCase();
        if (key.length < 45) continue;
        const earlier = seenSentences.get(key);
        if (earlier && earlier !== action) note(action, 'REPEATED_SENTENCE', sentence.trim().slice(0, 110));
        seenSentences.set(key, action);
      }

      // A big answer to a small question, and a small answer to a big one.
      if (prose.length > 2200) note(action, 'OVERLONG', `${prose.length} characters`);
      if (probe.intent === 'violence' && prose.length < 200) {
        note(action, 'UNDERWEIGHT', `violence answered in ${prose.length} characters`);
      }

      // Clarity, held to the same standard as the authored prose.
      for (const issue of checkNarrativeClarity(prose, { story, kind: 'opening' }).issues) {
        if (issue.severity === 'ERROR') note(action, `PROSE_${issue.code}`, issue.message);
      }

      // --- Movement --------------------------------------------------------

      const moved = detail.scene.locationId !== previous.locationId;
      if (!probe.movement && moved) {
        note(action, 'UNASKED_MOVE', `${previous.locationName} → ${detail.scene.locationName}`);
      }
      if (probe.movement && !moved && probe.intent === 'wandering') {
        note(action, 'MOVE_IGNORED', `still at ${detail.scene.locationName}`);
      }

      // --- What the world is allowed to show -------------------------------

      for (const check of turn.checks) {
        anyCheckRan = true;
        if (!story.rules.revealExactDc && check.dc !== null) note(action, 'LEAKED_DC', JSON.stringify(check));
        if (!story.rules.revealCheckMath && check.math !== null) {
          note(action, 'LEAKED_MATH', JSON.stringify(check));
        }
        if (story.rules.revealExactDc && check.dc === null) {
          note(action, 'MISSING_DC', 'this world reveals DCs and this check had none');
        }
        if (!check.difficultyLabel) note(action, 'MISSING_BAND', JSON.stringify(check));
      }
      if ('mutations' in turn || 'repairViolations' in turn) {
        note(action, 'ENGINE_INTERNALS', 'a player turn carried engine-only fields');
      }

      // --- Consequences ----------------------------------------------------

      const deltas: any[] = turn.stateDeltas ?? [];

      // Measured against the sheet, not the presentation strip: a delta label
      // is prose, and what we need to know is whether the world moved.
      const fingerprint = (s: any): Record<string, string> => ({
        relationships: JSON.stringify(s?.relationships ?? []),
        quests: JSON.stringify(s?.quests ?? []),
        inventory: JSON.stringify(s?.inventory ?? []),
      });
      if (previousSheet) {
        const before = fingerprint(previousSheet);
        const now = fingerprint(sheet);
        if (before.relationships !== now.relationships) anyRelationshipMoved = true;
        if (before.quests !== now.quests) anyQuestMoved = true;
        if (before.inventory !== now.inventory) anyInventoryMoved = true;
      }
      if (turn.checks.some((c: any) => /ability|technique|use /i.test(String(c.label ?? '')))) {
        anyAbilityUsed = true;
      }

      // An attack or a public humiliation that moves nothing is a world that
      // does not care what you do to the people in it.
      if ((probe.intent === 'violence' || probe.intent === 'insult') && deltas.length === 0) {
        note(action, 'NO_CONSEQUENCE', 'aggression changed nothing the player can see');
      }
      if (probe.intent === 'violence') {
        for (const character of previous.presentCharacters) violenceAgainst.add(character.id);
      }

      // Suggestions have to come from the world as it is now. Offering a
      // pleasantry to someone you just hit is the failure this catches.
      if (violenceAgainst.size > 0) {
        for (const suggestion of turn.suggestions) {
          if (/\b(chat|catch up|thank|compliment|make small talk|ask .* about the weather)\b/i.test(suggestion.text)) {
            note(action, 'STALE_SUGGESTION', suggestion.text);
          }
        }
      }

      // --- Memory ----------------------------------------------------------

      if (probe.intent === 'return' && violenceAgainst.size > 0) {
        const remembered =
          /\b(hit|struck|attack|hurt|said|told|called|humiliat|angry|furious|forgave|forgive|wary|trust)\b/i.test(
            prose,
          ) || (sheet.relationships ?? []).some((r: any) => (r.summary ?? '').length > 0);
        if (!remembered) {
          note(action, 'FORGOT_VIOLENCE', 'came back to someone they attacked and nothing referred to it');
        }
      }

      // --- Impossible things -----------------------------------------------

      if (probe.intent === 'impossible') {
        // The world may refuse. It may not quietly grant it.
        if (/\byou (?:rise|lift|float|soar|hover|fly)\b/i.test(prose)) {
          note(action, 'IMPOSSIBLE_GRANTED', matched(prose, /\byou (?:rise|lift|float|soar|hover|fly)\b/i));
        }
      }

      previous = detail.scene;
      previousSheet = sheet;
    }

    // --- Is this a game? ---------------------------------------------------

    if (!quick) {
      if (!anyCheckRan) note('(run)', 'NO_CHECKS', 'sixteen turns and nothing was ever uncertain');
      if (!anyRelationshipMoved) {
        note('(run)', 'NO_RELATIONSHIP_MOVEMENT', 'nobody felt differently about the player all run');
      }
      if (story.quests.length > 0 && !anyQuestMoved) {
        note('(run)', 'NO_QUEST_MOVEMENT', 'no objective responded to anything the player did');
      }
      if (story.items.length > 0 && !anyInventoryMoved) {
        note('(run)', 'NO_INVENTORY_MOVEMENT', 'the player stole something and carried nothing away');
      }
      void anyAbilityUsed;
      void previousSheet;
    }

    console.log(`swept ${story.title}`);
  }

  if (problems.length === 0) {
    console.log(`\nNothing flagged across ${worlds.length} worlds.`);
    return;
  }

  const byKind = new Map<string, number>();
  for (const problem of problems) byKind.set(problem.kind, (byKind.get(problem.kind) ?? 0) + 1);

  console.log(`\n${problems.length} flagged:\n`);
  for (const problem of problems) {
    console.log(`[${problem.kind}] ${problem.world} :: "${problem.action}"`);
    if (problem.detail) console.log(`    ${problem.detail}`);
  }
  console.log('\nby kind:');
  for (const [kind, count] of [...byKind].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(3)}  ${kind}`);
  }
  process.exitCode = 1;
}

function matched(text: string, pattern: RegExp): string {
  const match = pattern.exec(text);
  if (!match) return '';
  const start = Math.max(0, match.index - 40);
  return `…${text.slice(start, match.index + match[0].length + 40)}…`;
}

void main();
