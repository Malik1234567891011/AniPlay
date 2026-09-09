# Status

What is built, what is stubbed, and what the spec still wants. Updated
2026-09-09.

Run `npm run smoke` before believing any of it. It plays every world badly on
purpose — attacking people it was meant to talk to, refusing the quest, trying
to fly, misspelling names, lying, stealing, wandering off, then coming back to
ask whether anyone is still angry — and reports what did not hold.

## Playable end to end

The full turn pipeline runs offline with no API keys, and with an
`OPENAI_API_KEY` or `ANTHROPIC_API_KEY` the parser, director and writer route to
a real model. Six official worlds, 391 tests, and a mobile client that plays
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
| Media §19 | Covers, key art, stages, portraits, hero frames, player portraits. `npm run art` and `npm run brand` |
| Safety §29/§33.8 | Reports, blocks, hide, moderation on generated media |
| Mobile client | All launch screens except the creator console. Turn menu, rephrase, canon correction, pinning, forks, share |
| Postgres §34/§35 | Built. `npm run migrate` applies the schema and seeds the catalog; a run survives restart, redeploy and a second device |
| Auth §6 | Built on Supabase Auth: Sign in with Apple, emailed codes, anonymous guests, JWT verified server-side |
| Purchases §20.6/§33.5 | Built end to end: native sheet, server verification, exactly-once credit, restore, and recovery from a charge we never heard about |

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
- **Auth (§6).** Real. Supabase Auth issues the token; the API verifies it in
  both signing modes a project can be in and never trusts an unchecked claim.
  The development token-is-the-user-id verifier still exists so `npm run api`
  works with no infrastructure, and cannot be selected in production.
  Google sign-in is not wired and is not shown.
- **Persistence.** Real. Postgres holds the profile, the session, authoritative
  state, fork snapshots, the turn log, the append-only event log, memory, the
  wallet ledger and idempotency keys. `MemoryRepository` remains for tests and
  for running with no database.
- **Store.** Real. Apple and Google decide whether money moved; a transaction is
  never finished until our server has credited it, so a purchase the store took
  and we never heard about comes back by itself on the next launch.
- **Forks.** Real: the API snapshots the state each turn began from and a fork
  copies the snapshot for the chosen moment, inheriting the transcript up to it.
  Snapshots are capped at 60 per session, so a very long run cannot be forked
  back to its beginning.

## Not built

| Spec | What is missing |
| --- | --- |
| §21 creator platform | The whole world builder. A placeholder screen explains what it will be. |
| §38 admin console | `apps/admin` is empty. |
| §19.7 voice | Blocks are marked `voiceEligible`; nothing speaks them. |
| §24 | Diegetic push notifications, flagged off at launch by design. |
| Google sign-in | Apple and emailed codes are wired. Google is not, and is not offered. |

## Recently closed

Worth knowing because the shape of these bugs recurs:

- The player was narrated in the third person. "I hit her" came back as "Robin
  lunges toward Mira Senn" — first person in, third person out, on a screen that
  addresses the player as "you" everywhere else.
- You could punch someone who was not in the room. The previous turn said Mira
  was absent; the next rolled an attack against her and dealt damage from her.
- The change strip showed changes that had not happened: the model authored
  `stateDeltaPresentation` freely, including entries against mutation ids that
  existed nowhere.
- A public insult resolved to nothing. It parsed as `speak`, which has no check,
  no relationship movement and no flag.
- `steal` ran a check and added nothing, so the prose pocketed the ledger and
  the bag stayed empty.
- The Understudy and The Salt Road had no branching quest steps at all — one
  predicate per step, so every run was the same run.
- The Understudy's company book step could only be completed by someone who
  already held the book it awarded. Nine Weeks gated a route on a letter nothing
  gave out.
- The Unbound's `line_by_awakening` route required an ability nothing could
  unlock, so the route was unreachable and starting without a technique was a
  trap dressed as a choice.
- `AppStoreVerifier` asked one host and treated 404 as "no such transaction",
  which fails every sandbox and TestFlight purchase.

- Authored progression was unreachable. 39 flags and 16 events across the
  catalog that nothing could ever set, so every main quest stalled at step two
  and nothing surfaced it. The engine now records what it observed and two
  tests make an unsettable gate unshippable.
- A fork cloned the present and ignored the fork point.
- The client was sent the exact DC, the roll maths and the raw mutation list
  regardless of what the world said it hid.
- `/v1/store/purchases/sync` credited a wallet on the client's word alone.
- The writer never saw what the player typed, or anyone's pronouns, or what the
  player had said aloud.
- The parser could invent travel, and could redirect a named stranger at
  whoever was standing nearby.
- Waiting advanced the clock by six minutes, so no authored schedule was
  reachable by waiting for it.

## Known limitations worth writing down

- Suggestions come from `newOpportunities`, so on a turn that changed little
  they can repeat. Correct, but it reads as staleness when several
  low-consequence turns run together.
- The rule-based writer is deliberately plain. It exists so the product works
  with no keys, not to be good prose. With a provider configured the difference
  is large.

## What is needed from outside this repo

Everything below is built and configured by environment variable. None of it can
be finished from inside the codebase.

| Needed | For | Where it goes |
| --- | --- | --- |
| A Supabase project | Auth and the database | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_JWT_SECRET`, `DATABASE_URL`, plus `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` in the app |
| Sign in with Apple enabled | The Apple button | Supabase → Authentication → Providers → Apple, and the capability on the App ID |
| Anonymous sign-in enabled | Guests (§6.3) | Supabase → Authentication → Providers → Anonymous |
| An App Store Connect API key | Verifying purchases | `APP_STORE_KEY_ID`, `APP_STORE_ISSUER_ID`, `APP_STORE_PRIVATE_KEY`, `APP_STORE_BUNDLE_ID` |
| Five consumable IAP products | The credit packs | Product ids `crd_2000`, `crd_10000`, `crd_20000`, `crd_50000`, `crd_first_21000` |
| An Apple Developer team | Any build on a device | EAS credentials |
| A published privacy policy and terms | The age gate links, and App Store review | `EXPO_PUBLIC_LEGAL_BASE_URL` — the links are hidden until it is set, rather than pointing at nothing |

Until the Supabase values exist the API runs on its development verifier and the
app plays as a device-local guest, which is a supported mode and says so on the
sign-in sheet. Until the App Store key exists a production build refuses to
credit any purchase rather than crediting one it cannot verify.
