# Status

What is built, what is stubbed, and what the spec still wants. Updated
2026-09-09.

## Playable end to end

The full turn pipeline runs offline with no API keys, and with an
`OPENAI_API_KEY` or `ANTHROPIC_API_KEY` the parser, director and writer route to
a real model. Six official worlds, 223 tests, and a mobile client that plays
them.

| Area | State |
| --- | --- |
| Turn pipeline §17.1 | Built, streamed over SSE with a per-turn replay buffer |
| Determinism §12.1 | Built and tested — same seed, same outcome, every tier |
| Wallet §20 | Built: two-phase reserve, append-only ledger, exactly-once grants |
| Store §33.5 | Built, with server-side receipt verification and restore |
| Quests §15 | Built, including multi-route steps and engine-observed gates |
| Relationships §14 | Built: five dimensions, dampening, predicate gates |
| Combat §13 | Built: encounters, turn economy, NPC turns from the same seed |
| Media §19 | Covers, key art, stages, portraits, hero frames, player portraits |
| Safety §29/§33.8 | Reports, blocks, hide, moderation on generated media |
| Mobile client | All launch screens except the creator console |
| Postgres §34/§35 | Schema written; `MemoryRepository` is what runs today |

## The six worlds

| World | Spine | Defeat |
| --- | --- | --- |
| The Ninth Archive | Investigation, wards, an institution that erased you | Fail forward |
| The Understudy | Pure social systems, no combat at all | Fail forward |
| The Salt Road | Travel arithmetic and water | **Lethal** |
| The Tidewall | Five classes, five routes through every door | Fail forward |
| The Unbound | Build freedom; half the abilities are awakened, not chosen | Fail forward |
| Nine Weeks | Romance that can genuinely fail, no combat | Fail forward |

## Stubbed, with the shape in place

- **Worker queues (§32.2).** Real queue with idempotency, backoff and a dead
  letter. The hero-frame handler is live; embeddings, ranking rollups,
  prepublish evaluation, media moderation, notifications, analytics rollups and
  account purge are registered and log rather than act.
- **Auth (§6).** A development bearer scheme where the token is the user id.
  `assertProductionReady` refuses to start a production process without a real
  provider, so this cannot ship by accident.
- **Persistence.** `MemoryRepository` loses everything on restart. The Postgres
  schema exists; the adapter does not.
- **Store.** Verification and reconciliation are real. The native purchase sheet
  is not wired, so the client posts sandbox transactions in development.

## Not built

| Spec | What is missing |
| --- | --- |
| §21 creator platform | The whole world builder. A placeholder screen explains what it will be. |
| §38 admin console | `apps/admin` is empty. |
| §19.7 voice | Blocks are marked `voiceEligible`; nothing speaks them. |
| GP-04 | Turn menu: retry, edit branch, report inconsistency. |
| SH-01 | Share artifacts. |
| WS-07 / WS-08 | Timeline pin and correct are partial. |
| §24 | Diegetic push notifications, flagged off at launch by design. |

## Known limitations worth writing down

- The in-memory repository means a server restart ends every session. Fine for
  development, and the reason the client's offline and stale-revision handling
  gets exercised constantly.
- Suggestions come from `newOpportunities`, so on a turn that changed little
  they can repeat. Correct, but it reads as staleness when several
  low-consequence turns run together.
- The rule-based writer is deliberately plain. It exists so the product works
  with no keys, not to be good prose. With a provider configured the difference
  is large.
