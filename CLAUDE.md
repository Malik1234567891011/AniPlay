# PLOTBREAK

"Playable Anime." An anime-styled interactive fiction engine: the player types
or taps anything, a deterministic engine decides what happens, and a model
writes the beat.

## Layout

- `packages/contracts` — Zod + `ai_contracts.json`. **The JSON is authoritative
  for every AI stage; the Zod twins may not diverge from it.**
- `packages/engine` — deterministic. Seeded RNG, `resolveIntent`, `commitTurn`.
  Same seed, same outcome, always.
- `packages/director` — everything model-facing: parser, director, writer,
  validator, response cards.
- `services/api` — Fastify on **port 4000**. `tsx watch` reloads on edit, so do
  not edit mid-run.
- `apps/mobile` — Expo SDK 57 / RN 0.86.

## Things that have bitten us more than once

- **Two implementations of every AI stage, and the fast/streaming one is what
  production runs.** A rule added to the non-streaming path does nothing. Hit
  six-plus times. Check both.
- **`npm run typecheck` is a separate gate from `npm test`.** Vitest passes
  while tsc fails. Run both before committing, and do not pipe `check.sh`
  through `tail` — it hides the exit code.
- **Stories are versioned, not edited in place.** A fixture change needs
  `npm run migrate` *and* a new session to take effect.
- **`npm run smoke` plays every world badly on purpose.** It is where the real
  bugs come from.
- Turn pipeline order (§17.1): parse → reserve → resolve → direct → write →
  validate → repair (once) → commit.

## Working here

**Read `docs/token-practices.md` before any long task.** Short version: every
request re-sends the whole conversation, so the cost of a tool result is not
the call, it is carrying it for the rest of the session.

- **Query the database, not the UI.** Turns, blocks, media plans, beat plans and
  repair violations are all in Postgres. Reading a turn from `turns` costs ~800
  tokens and says more than a `snapshot_ui` at ~4,000. Screenshots are for
  pixels only — layout, images, did-it-render.
- **Filter verbose commands.** `npm test 2>&1 | grep -E "Test Files|Tests |FAIL"`.
- **Checkpoint to a file as you go**, not at the end. A conclusion that lives
  only in the conversation is one rate limit away from being re-derived at full
  price. Commit it.
- Never re-read a file you just edited.

## Compact instructions

When compacting, keep: findings and their evidence, root causes, files changed,
and the next concrete action. Drop: tool output, file contents, exploration that
led nowhere, and anything already written to a doc or a commit.
