# Architecture

## The one rule

The model interprets intent. The engine determines truth. The writer describes
what the engine already decided.

Everything below exists to keep those three jobs from bleeding into each other.
A language model that can decide outcomes will eventually decide the one the
player asked for, and then nothing in the world means anything.

## The turn pipeline (spec §17.1)

```
player text
   │
   ├─ 1. parse      ModelIntentParser → ActionIntent          (falls back to rules)
   │                 · entity resolution: "Kaela" → Kael, if Kael is here
   │                 · type-checked references: a person is not a location
   │                 · invented travel stripped: mentioning a place is not going there
   │
   ├─ 2. reserve    wallet TURN_RESERVE                        (before any generation)
   │
   ├─ 3. resolve    resolveIntent()  ← the only thing that decides anything
   │                 · seeded RNG, cursor-addressed, replayable
   │                 · checks, mutations, observable facts, private facts
   │                 · NPC turns inside an encounter, from the same stream
   │
   ├─ 4. direct     ModelDirector → BeatPlan                   (falls back to rules)
   │                 · what to show first, who speaks, 0–3 suggestions
   │                 · suggestions must map to real newOpportunities
   │
   ├─ 5. write      ModelWriter → NarrativeTurn                (falls back to templates)
   │                 · sees the player's own words, so the beat names what they did
   │                 · may not add a reason the world did not give it
   │
   ├─ 6. validate   validateNarrative() → one repair pass at most
   │
   ├─ 7. commit     commitTurn()
   │                 · mutations applied, then schedules, then observations,
   │                   then quests, then rewards, then progression
   │                 · optimistic concurrency on session_revision
   │
   └─ 8. finalize   wallet TURN_FINALIZE, SSE turn.completed
```

A failure at any stage before commit releases the reservation. The player is
only ever charged for a turn that happened.

## Package boundaries

| Package | May import | Never imports |
| --- | --- | --- |
| `contracts` | zod | anything else in the repo |
| `engine` | `contracts` | `director`, any I/O, any model |
| `director` | `contracts`, `engine` | `services/*`, any storage |
| `ui` | react-native | `director`, `engine`, `services/*` |
| `apps/mobile` | `contracts`, `ui` | `engine`, `director` |
| `services/api` | everything | — |

`apps/mobile` depending only on `contracts` and `ui` is what keeps model keys,
prompts and engine internals out of the app bundle (§31.7). It is also why the
client cannot recompute an outcome: it is given a `PlayerTurnRecord`, not the
engine's record.

## What the client is allowed to know

`TurnRecord` is internal. It carries the exact DC, every die rolled, the
modifier, the margin, the raw mutation list and the repair violations.

`PlayerTurnRecord` is what any client receives. It carries the outcome and a
coarse difficulty band always, the arithmetic only when the story sets
`revealCheckMath`, the DC only when it sets `revealExactDc`, and engine
internals never. A world that hides its numbers actually hides them.

## Determinism

`resolveIntent` is a pure function of `(story, state, intent, seed)`. The seed
for a turn is `deriveTurnSeed(sessionSeed, turnIndex, branchKey)`; the session
seed never leaves the server and clients see `sha256(seed)` so a run can be
audited without being predicted.

Two consequences worth stating plainly:

- Quality tier changes what the prose costs and how rich the direction is. It
  cannot change a die. The same seed and the same action give the same outcome
  at Quick and at Apex.
- A fork copies authoritative state at an event and takes a new branch key, so
  the fork's dice diverge from the original's without either being rerolled.

## Model providers

One interface (`ModelGateway`), roles rather than model names, and a provider
chosen by environment. With no key configured the rule-based pipeline runs — a
supported mode, not a degraded one, and the mode every test runs in.

`createGatewayFromEnv` takes whichever of `ANTHROPIC_API_KEY` or
`OPENAI_API_KEY` exists, with `MODEL_PROVIDER` to break a tie.

## Persistence

`Repository` is a narrow port. `MemoryRepository` implements it in-process so
the whole product runs with no infrastructure; `infra/migrations/0001_init.sql`
is the Postgres schema the production implementation targets, with append-only
ledger and event triggers, published-version immutability, and RLS.

`assertProductionReady` refuses to start a production process without a real
auth provider and a database, because the development bearer scheme treats the
token as the user id.
