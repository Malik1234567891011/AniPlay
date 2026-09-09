/**
 * Plays every launch world against a running API and reports what looks wrong.
 *
 * This is the check that keeps finding real bugs — unrequested movement,
 * absent characters given lines, refusals where the world should have
 * answered, engine internals reaching the client. Unit tests pin the rules;
 * this exercises the whole pipeline against whichever model provider is
 * configured, which is where the interesting failures live.
 *
 *   npm run api           # in another shell
 *   npx tsx infra/scripts/smoke.ts [--base=http://localhost:4000] [--only=tidewall]
 *
 * Exits non-zero if anything is flagged, so it can gate a release.
 */
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';
import type { StoryVersion } from '@aniplay/contracts';

interface Problem {
  readonly world: string;
  readonly action: string;
  readonly kind: string;
  readonly detail: string;
}

/**
 * Five turns per world: look, ask, travel, seek someone, wait. Between them
 * they touch every stage of the pipeline and every class of failure this has
 * caught before.
 */
function probesFor(story: StoryVersion): string[] {
  const someone = story.characters[0]?.name ?? 'them';
  const elsewhere =
    story.locations.find((l) => l.id !== story.rules.startingLocationId)?.name ?? 'somewhere else';
  const absent = story.characters[1]?.name ?? someone;

  return [
    'I look around and take it in.',
    `I ask ${someone} what happens next.`,
    `I go to ${elsewhere}.`,
    `I look for ${absent}.`,
    'I wait.',
  ];
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const base = args.find((a) => a.startsWith('--base='))?.slice('--base='.length) ?? 'http://localhost:4000';
  const only = args.find((a) => a.startsWith('--only='))?.slice('--only='.length) ?? null;

  const worlds = only ? LAUNCH_CATALOG.filter((w) => w.storyId.includes(only)) : LAUNCH_CATALOG;
  const problems: Problem[] = [];

  for (const story of worlds) {
    const auth = {
      authorization: `Bearer guest_${crypto.randomUUID()}`,
      'content-type': 'application/json',
    };

    const call = async <T>(method: string, path: string, body?: unknown, extra: Record<string, string> = {}): Promise<T> => {
      const response = await fetch(`${base}${path}`, {
        method,
        headers: { ...auth, ...extra },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const text = await response.text();
      if (!response.ok) throw new Error(`${method} ${path} → ${response.status} ${text.slice(0, 160)}`);
      return JSON.parse(text) as T;
    };

    const note = (action: string, kind: string, detail: string): void => {
      problems.push({ world: story.title, action, kind, detail });
    };

    let session;
    try {
      session = await call<any>('POST', `/v1/stories/${story.storyId}/sessions`, {
        identity: { displayName: 'Robin Vale', pronouns: 'they/them', archetypeId: null, advanced: {} },
      });
    } catch (error) {
      note('(start)', 'SESSION_FAILED', String(error).slice(0, 160));
      continue;
    }

    const sessionId = session.session.sessionId as string;
    let revision = session.revision as number;
    let previous = session.scene;

    for (const action of probesFor(story)) {
      let turn: any = null;
      try {
        const accepted = await call<any>(
          'POST',
          `/v1/sessions/${sessionId}/turns`,
          { actionText: action, qualityTier: 'VIVID', sessionRevision: revision, selectedSuggestionId: null, voicePreferred: false },
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
      revision = detail.revision;

      const prose = turn.blocks.map((b: any) => b.text).join(' ');
      const present = new Set(detail.scene.presentCharacters.map((c: any) => c.id));
      const wasPresent = new Set(previous.presentCharacters.map((c: any) => c.id));

      if (turn.blocks.length === 0) note(action, 'NO_PROSE', '');
      else if (prose.length < 40) note(action, 'THIN_PROSE', prose);

      for (const block of turn.blocks) {
        // Someone who is neither here now nor was here when the turn began
        // cannot have said anything in it. The player is always in the scene.
        if (
          block.speakerId &&
          block.speakerId !== 'player' &&
          !present.has(block.speakerId) &&
          !wasPresent.has(block.speakerId)
        ) {
          note(action, 'ABSENT_SPEAKER', `${block.speakerId}: "${String(block.text).slice(0, 80)}"`);
        }
      }

      if (turn.suggestions.length === 0) note(action, 'NO_SUGGESTIONS', '');

      const askedToMove = /\b(go|walk|head|set off|travel|up to|down to|into|leave)\b/i.test(action);
      if (!askedToMove && detail.scene.locationId !== previous.locationId) {
        note(action, 'UNASKED_MOVE', `${previous.locationName} → ${detail.scene.locationName}`);
      }
      if (askedToMove && detail.scene.locationId === previous.locationId) {
        note(action, 'MOVE_IGNORED', `still at ${detail.scene.locationName}`);
      }

      // What a world hides has to stay hidden, and what it reveals has to arrive.
      for (const check of turn.checks) {
        if (!story.rules.revealExactDc && check.dc !== null) {
          note(action, 'LEAKED_DC', JSON.stringify(check));
        }
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

      previous = detail.scene;
    }

    console.log(`swept ${story.title}`);
  }

  if (problems.length === 0) {
    console.log(`\nNothing flagged across ${worlds.length} worlds.`);
    return;
  }

  console.log(`\n${problems.length} flagged:\n`);
  for (const problem of problems) {
    console.log(`[${problem.kind}] ${problem.world} :: "${problem.action}"`);
    if (problem.detail) console.log(`    ${problem.detail}`);
  }
  process.exitCode = 1;
}

void main();
