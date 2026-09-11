# What is left before an App Store push

Verified first-hand, 2026-09-11. A background audit is still running and will
add to this; everything below I checked myself and can point at.

Content is **not** on this list. Stories and French world text live in Supabase
and are fetched at runtime, so they can keep landing after launch without a new
build. What cannot wait is anything compiled into the binary, anything Apple
reviews, and anything that has to exist on a server.

---

## BLOCKS THE PUSH

### 1. There is no production API. This is the big one.

`apps/mobile/.env` points the app at `http://10.144.7.164:4000` — Malik's
laptop, on Malik's wifi. There is no `Dockerfile`, no `fly.toml`, no
`render.yaml`, no `vercel.json`, no `Procfile`, and no `.github/workflows`.

So the app works for exactly one person in one building. Nothing else on this
list matters until the API is deployed somewhere with a real hostname.

It also has to be **HTTPS**. `Info.plist` sets `NSAllowsArbitraryLoads=false`
with `NSAllowsLocalNetworking=true`, which is correct and is why the LAN build
works today — but a plain `http://` production host would be blocked by App
Transport Security, and asking Apple for an exception is a fight worth avoiding.

Needs: a host (Fly/Render/Railway/EC2 — anything), a domain, TLS, and the
production environment variables set there rather than in a local `.env`.
**Size: medium.** Nothing about the code has to change.

### 2. The model provider has to be funded, and capped.

Every turn calls a model. The account ran dry mid-session today and every turn
in the app stopped committing, because the writer stage is the one stage with no
rule-based fallback. In production that is an outage with no error message worth
reading.

Needs: a funded key on the production host, a spend limit, and an alert. Worth
deciding now whether that is OpenAI or Anthropic — `createGatewayFromEnv`
already supports both and prefers `ANTHROPIC_API_KEY` when present, so it is one
environment variable either way.
**Size: small, but it is a business decision, not a code one.**

### 3. Superwall is not integrated at all.

There is no Superwall SDK, no paywall configuration, nothing. If the plan is to
run monetization through Superwall rather than the hand-built credit screen,
that work has not started.
**Size: medium-large.** Worth deciding whether it is needed for v1 at all,
given the credit screen and StoreKit path already exist.

### 4. Privacy policy and Terms — DONE (2026-09-11)

`https://www.plotbreak.com/privacy` and `/terms` both return 200, and
`EXPO_PUBLIC_LEGAL_BASE_URL=https://www.plotbreak.com` is set, so the links now
appear on the age gate.

⚠️ `apps/mobile/.env` is gitignored, so **this variable has to be set in
whatever builds the production app too**, or the links silently vanish again.

### 5. Apple-account work — see `AppleForOmar.md`

The App ID capability for Sign in with Apple, six IAP consumables that do not
exist yet, and the Paid Applications agreement. All blocked on the paid
developer account.

---

## SHOULD FIX BEFORE LAUNCH

### 6. French — DONE (2026-09-11)

Decision: launching on the French App Store in France and Belgium, so a French
phone opens in French. `DEVICE_LOCALE_AUTODETECT` is now `true` and the language
picker is a normal Profile row rather than a seven-tap secret — French by
default must not mean French only. Verified on a simulator set to `fr-FR` with
no stored choice.

Remaining: **Nine Weeks is at 11%** of its world text (41 of 390) while the
other 22 worlds are complete. That is Supabase data, not bundled strings, so it
can be finished after the push.

### 7. Two gates are not gating anything.

- `npm run lint` delegates `--workspaces --if-present` and **no workspace
  defines a lint script**, so it exits 0 having run nothing. Every green lint in
  this project's history means nothing.
- `infra/scripts` is not in any workspace and there is no root `tsconfig.json`,
  so the seed, migrate and smoke scripts are never typechecked.
- There is no CI at all, so none of the gates run unless someone runs them.

**Size: small each.** The lint one may surface a pile of violations the first
time it actually runs, which is the point.

### 8. Anonymous users are uncapped — ACCEPTED

Decision taken: ship uncapped. Sign-in is not required to play and the risk is
a bill rather than a breach. Worth watching MAU after launch.

---

## CAN LAND AFTER THE PUSH

- New worlds, and French world text, including Nine Weeks if French ships later.
  Both are Supabase rows.
- Auto-Reload and "Save 20% on web" from the reference app. Both bill outside
  Apple IAP and need the External Purchase Link entitlement; see
  `AppleForOmar.md`.
- The remaining French UI polish beyond what is already done.

---

## Fixed today, worth noting so nobody re-opens them

- The story screen crashed the app on every open (`Intl.RelativeTimeFormat`
  segfaulting Hermes). Fixed, with a build-failing guard so it cannot come back.
- Every cold start re-ran onboarding.
- A guest could not be French at all — the app never sent `accept-language`.
- Sign in with Apple was disabled in Supabase. Enabled today.

---

## Added by the audit, 2026-09-11

Everything below came from a full read of the repo against the spec. The two
with money or security attached I re-verified myself before acting; the rest are
reported as found and marked.

### BLOCKS — user-generated content has no moderation path (verified)

The app ships a public comment section. Apple Guideline 1.2 asks you to
demonstrate a method for filtering objectionable content, a mechanism to report
it, and the ability to block abusive users.

Reports are written to `moderation_cases`, `moderation_actions` and
`admin_audit_log` — tables with **no writers and no readers**. `apps/admin/` is
an empty directory. `listBlocks` has exactly one caller, its own route, so a
block changes nothing about what a blocked person can post or what you see.
There is no path from a person tapping "report" to any human seeing it.

Also: the in-session report button navigates to the **timeline**, not the report
sheet (`Session.tsx:858`). A safety control that silently does nothing.

**Size: medium.** The smallest honest version is somewhere a report lands that a
person actually reads, plus making block do something, plus fixing that button.

### BLOCKS — fixed today

- **Fork fee could double-charge, or charge for nothing.** A random UUID as the
  ledger idempotency key made replays undetectable, and nothing after the debit
  had a `catch`. Fixed and tested (`cfbb73f`).
- **Row Level Security was on 14 of 52 tables.** The social and badge tables had
  none at all, and so did session-scoped player state and the moderation tables.
  The anon key ships in the app bundle. Fixed (`1341be8`): all 52 now covered.

### SHOULD FIX

- **No crash reporting at all.** No Sentry, Crashlytics or Bugsnag anywhere. The
  app shipped a crash-on-open bug today and nothing would have told you. *Small.*
- **Deleting a session is a hard cascade** (`repo/postgres.ts:624`). The spec
  (§22.3) asks for a 7-day soft delete; there is no `deleted_at` on
  `story_sessions`. Unrecoverable on a mistap. *Small.*
- **`reserve()` reads the balance and appends in separate transactions**
  (`wallet.ts:165` → `postgres.ts:876`) with no `SELECT … FOR UPDATE` and no
  `CHECK (balance >= 0)`, so two concurrent turns can both pass the check. The
  existing test is strictly sequential. Related: every balance read is a full
  scan of that account's ledger, which grows by one row per turn forever.
  *Medium, and the scan will matter before the race does.*
- **The publish clarity gate is decorative.** Real checkers exist
  (`narrative-clarity.ts`, `choice-clarity.ts`) but `checkStoryClarity` is only
  called from tests, and `migrate.ts:150` writes `clarity_passed` as a literal
  `true`. *Small.*
- **`ai_contracts.json` has drifted from its companion spec without a version
  bump** — `BeatPlan.text.maxLength` 180→320, `wordBudget.maximum` 220→500, both
  still `"version": "1.0.0"`. `CLAUDE.md` calls that file authoritative, so the
  version no longer identifies the contract. *Trivial.*
- **The spec is not in the repo.** `PROJECT_ANIMA_PRODUCT_SPEC.md` lives in
  `~/Downloads`, is named as the build target by `README.md:9`, and is in no
  commit. Its companions (`schema.sql`, `openapi.yaml`, `design_tokens.json`,
  `release_checklist.md`) do not exist on disk at all. Everything in this
  codebase cites it by section number. *Trivial to fix, and it should be fixed:
  the build target should not live in one person's Downloads folder.*
- **37 code comments cite spec sections that do not exist** (§11.9 ×15, §17.10
  ×7, §13.8 ×6, and others). They describe real working features, but nothing
  can be audited against them. *Trivial.*
- **Three worlds have no art** — Hush House, Window Seven, Good Morning Husband
  export null asset keys. *Content, but visible on the shelf.*
- **`docs/status.md` is stale** — says 21 worlds (there are 23) and that French
  is unmerged (it is merged). *Trivial.*

### Not verified

The audit flagged that a forged `user_badges` row might mint credits through
`/v1/badges/:id/claim`, because `syncBadges` may preserve a stored `unlockedAt`
rather than recompute it. It did not finish reading `evaluateBadges`, and
neither did I. **The RLS fix closes the door either way**, but if you ever add a
client-writable path to that table, check this first.

Also unverifiable right now: live PostgREST exposure. The project returns
`PGRST002` for every table, including ones that already had RLS, so the gap was
read from the migrations rather than demonstrated.

---

# Where we actually are, 2026-09-11 (evening)

Scored against the spec's own ship gate, §46 of
`PROJECT_ANIMA_PRODUCT_SPEC.md`. Not against a feeling.

## French: yes, it works

Verified end to end today, not assumed:

- A French turn commits and the prose is native quality. From a live Itachi
  run: *« Le silence recolle entre les phrases. »* / *« C'est pas la prise.
  C'est le poste. »* That is French writing, not translated English.
- Interface catalogue 727/727 keys, no violations.
- 22 of 23 worlds carry complete French world text. **Nine Weeks is at 11%** and
  is the only gap — it is Supabase data, so it can be finished without a build.
- `DEVICE_LOCALE_AUTODETECT` is on, so a French phone opens in French, and the
  language picker is a normal Profile row so English is one tap away.
- A full 23-world French smoke is running as this is written.

So French is **not** the thing standing between you and a push.

## The thing standing between you and a push

**Still the API.** It runs on a laptop on a home wifi. No Dockerfile, no CI, no
host, no TLS. Until that is deployed nothing else on this list can even be
tested by a real person, let alone reviewed by Apple.

## The spec's own gate, scored

| Section | Score | Note |
|---|---|---|
| Core gameplay | 5 / 6 | Only the <60s usability test is unrun |
| Economy | 4 / 5 | Support/admin tooling does not exist |
| **Safety** | **4 / 8** | See below — this is what gets you rejected |
| **Reliability** | **1 / 5** | No crash reporting, no load test, no verified restore |
| Design / a11y | 4 / 6 | Dynamic Type and VoiceOver untested on device |
| Content | 3 / 4 | The publish clarity gate is decorative |

### Safety, item by item

- UGC filtering — **no**. Comments are posted unfiltered.
- Report — **yes**. Fixed today; the in-session button used to open the
  timeline instead of a report.
- Block — **no**. The endpoint exists; nothing consumes it, so blocking
  somebody changes nothing you see.
- Moderation queue — **no**. `moderation_cases`, `moderation_actions` and
  `admin_audit_log` have zero writers, and `apps/admin/` is empty. There is no
  path from a report to a human.
- Age / content gating — **yes**.
- Public IP / likeness checks — **see below**.
- Official romance age rules — not audited.
- Account deletion — **yes**, implemented and tested.

Apple Guideline 1.2 asks a UGC app to show filtering, reporting, blocking and a
way to act on reports. Two of four exist.

## The one nobody has raised

The flagship world is **Itachi**, featured first, and its text contains
`Uchiha` 76 times, `Hokage` 31, `Konoha` 14, `Sharingan` 12 — plus Sasuke,
Mikoto, Fugaku, Danzo and Izumi. That is Naruto: Shueisha and Kishimoto's
property, licensed to Viz in the US.

The app is commercial and sells credits to play it. Apple Guideline 5.2 covers
third-party IP directly, and the spec's own ship gate lists "public IP/likeness
checks" as a line item for exactly this reason.

This is a business decision rather than a bug, and it is not mine to make. But
it should be a decision somebody takes deliberately before submitting, not one
discovered in a rejection or a takedown. The options are roughly: get a
licence, file the serial numbers off (the *shape* of that story — a prodigy
asked to choose between family and village — is not anybody's property), or
ship it and accept the risk knowingly.

## So: App Store Connect and Superwall now?

Not yet, and not because of French. In order:

1. **Deploy the API.** Nothing is testable without it.
2. **Decide on Itachi.** It is the front page.
3. **Safety minimum for Guideline 1.2** — somewhere a report lands that a human
   reads, and make block do something. Smallest honest version, not an admin
   suite.
4. **Crash reporting.** You shipped a crash-on-open bug today and nothing would
   have told you.
5. *Then* Superwall, App Store Connect, IAP products, submit.

Steps 1 and 5 can run in parallel with Omar; 2 and 3 cannot be parallelised
away.
