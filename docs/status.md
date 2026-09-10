# PLOTBREAK — where everything is

**Last updated: 2026-09-10, 13:30 (America/New_York).** This is the current
one. `docs/status.md` and `docs/session-status.md` are older and should be read
as history, not state.

---

## The short version

The catalog is **16 worlds**, all with cover art, all live on the simulator.
Itachi and Primal Crown are the newest finished ones and both look good. The
core loop plays well — the writing is genuinely strong in Itachi — and the
remaining problems are continuity and presentation, not prose.

Three workstreams: **main** (core loop + UI, me), **stories/four-new-worlds**
(new worlds, agent), **localization/fr-fr** (French, agent). All three are
committed. Main has 30+ commits ahead of `origin/main` at the time of writing —
see "Push state" below.

---

## Branches

| Branch | Worktree | State |
|---|---|---|
| `main` | `/Users/malik/AniPlay` | Active. Everything below unless stated. |
| `stories/four-new-worlds` | `/Users/malik/AniPlay-stories` | Agent running. Merged into main at `befd652`. |
| `localization/fr-fr` | `/Users/malik/AniPlay-fr-fr` | Agent finished. **Not yet merged to main.** |

---

## Worlds — 16 in the catalog

**The original ten**, all with locked covers that must not be regenerated:
Blackwake, Last Five, Nine Weeks, Red Moon Brigade, Seven Days to Midnight,
The Ninth Archive, The Salt Road, The Tidewall, The Unbound, The Understudy.

**Six newer:**

| World | Code | Spec | Art | Notes |
|---|---|---|---|---|
| Itachi | ✅ | ✅ | ✅ 89 assets | Best-written world we have. `protagonist: NAMED`. |
| Primal Crown | ✅ | ✅ | ✅ 70 assets | |
| Zero Throne | ✅ | ✅ | ⏳ in flight | Stories agent is generating; cover 404s until it lands. |
| Hush House | ✅ | ✅ | ✅ 63 assets | Art generated this session. |
| Window Seven | ✅ | ✅ | ✅ 58 assets | Art generated this session. |
| Good Morning, Husband | ✅ | ✅ | ✅ 59 assets | Art generated this session. |

**Still to build** (bibles in `/Users/malik/Downloads/morestoryideas/`, agent has
the queue): `02_THE_FOURTH_BEAST`, `03_SEVEN_NAMES`, `04_THE_BLANK_PROPHECY`,
`06_THE_RED_FLOOR`, `07_SECOND_SKIN`, `08_LAST_SERVICE`.

**Art recipe** (~$2.60 and ~20–35 min per world, concurrency 4):
```bash
export OPENAI_API_KEY="$(grep '^OPENAI_API_KEY' /Users/malik/AniPlay/.env | cut -d= -f2- | tr -d '"'\'' \r')"
npx tsx infra/scripts/generate-art.ts --only=story_<id> --reactions --concurrency=4
npx tsx infra/scripts/optimize-art.ts
npm run migrate   # REQUIRED — asset keys are baked into a story version
```
No text is baked into the art. The wordmark is composited afterwards over the
reserved bottom 22%, and `cover.raw.png` keeps the un-plated master so French
re-plates rather than regenerates.

---

## French

**Agent finished.** All gates green: typecheck, test, lint, `i18n-extract
--gate` (zero un-keyed client strings), `fr-lint --catalog` (**614/614 keys, 0
violations**), `fr:probe` (32/39), `expo export --platform ios`.

**Steps 1–8 and 10 done. Steps 9, 11 and 12 not started.**

Two things it surfaced that are worth acting on:

1. **`fr-lint` FRC002 has been shaping the copy rather than checking it.** It
   fails any two consecutive capitalised words, so a mid-string proper noun is
   impossible — `setup.name_placeholder` reads `Ex. : Sarrow` instead of a full
   name *because of the linter*, and two agents moved a `☆` glyph to the edge of
   a button to get past it. `lintCatalogue()` also has no suppression escape
   hatch, unlike `lint()`. Fix before the next catalogue pass.
2. **`de {name}` renders `de Élodie`** for vowel-initial names and ICU cannot
   inspect an argument's first letter. Two keys restructured so elision never
   arises; `elide()` ships in `@aniplay/i18n` for the rest, aspirated-h list
   included.

Full detail: `docs/localization/fr-FR/checkpoint.md` on the `localization/fr-fr`
branch. **Standing constraint: English and French are both permanent
first-class locales.** Any change that makes French work by degrading or
overwriting the English path is a regression.

**Not merged to main yet.** That is a deliberate open decision, not an oversight.

---

## Images

Covers, key art, location stages, character portraits and 8-emotion reaction
decks. 1,222 assets total; masters 2,637MB, delivery 90MB webp (masters are
gitignored, webp is committed).

**Hero-frame gating was the reason images almost never appeared.** `notable` was
defined as `REVEAL || CRITICAL_SUCCESS || ENCOUNTER_START || QUEST_TRANSITION` —
four combat-and-quest events that a romance or slice-of-life world never
generates. The only remaining road was `landmark`, which there means "a new
room" or "a new face", and both run out. A 25-turn Nine Weeks run produced two
frames. Now relationship changes, refusals and visible expression changes count,
`HERO_SPACING.VIVID` is 5 rather than 10, and `turnsSinceHeroImage` no longer
reports every gap one turn short.

**Open image bug — hero frames do not stay in the feed (HIGH).** Reported by
Malik and confirmed in the code. `Session.tsx:424`:
```ts
const heroImageUrl = pending ? pending.heroImageUrl : (latest?.heroImageUrl ?? null);
```
There is exactly **one** hero image on screen and it belongs to the newest turn,
rendered in a fixed slot rather than inline in the transcript. So an image
appears with its beat and vanishes the moment the next turn lands. The fix is to
render the frame inline, attached to its own turn, so it stays in history — which
is what the reference apps do. **Not yet fixed.**

---

## Bugs — fixed this session

From `docs/25turnfix.md` (39 findings from a 25-turn Nine Weeks playtest):

- **#37 The absence check had never once fired.** `findAbsenceOfPresent` matched
  the full name and the *last* word — "Juno Vale" and "Vale" — and prose only
  ever says "Juno". Six absence bugs walked past it. Now uses `nameKeys`.
- **#12 The inverse, now caught too**: prose putting a character into a room the
  engine does not have them in.
- **#19 Response cards defeated our own parser.** Every card scored 0.44–0.62
  confidence, so every tap took the 2.4s model-parse path the fast parser exists
  to avoid, and cards naming nobody produced no speech act at all in a room of
  three. Cards now carry their addressee via `selectedSuggestionId`, a field
  that had been on the wire since the first API, hardcoded to null and ignored.
- **#11 Hero-frame gating** (above).
- **#36 The stamina tic was an instruction**, not a flourish: `buildBeats`
  emitted a `STATE_REVEAL` for every `RESOURCE_DELTA` telling the writer to
  dramatise it, and promised a UI chip that had been removed.
- **#33/#24/#38 Cards written from the attempt, not the outcome.** Juno refuses
  to leave the bar; all three next cards put the player outside on the steps.
  `howItWentForYou` now states the outcome off the engine.
- **#18 `turn` was in the interact lexicon**, so "I turn to Juno" rolled a DC 10
  mind check and spent stamina.
- **#30 Time was charged per clause**, so a two-clause sentence cost 12 minutes
  while crossing the camp cost 3.
- **#21** "Juno reconsiders you" was shown for a *loss* of respect.
- **#17** Feed jumped ~350pt backwards on every submit.
- **#22** `autoCorrect` on the composer rewrote player input ("I'll" → "I'love").
- **#39 Named-protagonist worlds asked who you are.** Itachi's own premise says
  who you are and the setup screen still asked for a name, pronouns and
  appearance. `StoryVersion.protagonist` is `BLANK` (default) or `NAMED`.
- **Speaker identity was resolved against `presentCharacters`**, so walking out
  of a room stripped the name and face off every line already on screen.
  `scene.cast` now carries the whole cast.
- **Continue/Library/quick-preview drew gradient placeholders** over worlds whose
  covers had shipped; `coverImage` was on all three payloads and unused.
  Continue is also vertical now, not a carousel.
- **Three new worlds shipped without `withDerivedAssetKeys`**, so 180 files of
  art sat on disk while the catalog served null. Guarded in `catalog.spec`.

---

## Bugs — still open

**Image**
- Hero frames vanish from history (above). **Highest-value open item.**

**Engine / director**
- **#31** A public scene leaves no trace. Standing on a bar and demanding a
  friend's secret in front of the whole staff produced `checks: []` and a single
  `TIME_ADVANCE`. Needs a flag and an observable fact — no invented relationship
  maths. The world sheet promises "People talk."
- **`FORGOT_VIOLENCE` ×5 in smoke** — coming back to someone you attacked and
  nothing refers to it. Same family as #31.
- **#35** Dialogue attributions with no dialogue ("Their tone is low…" with no
  line). Should be resolved by #19; needs verification.
- **#32** The same relocation card offered in 8 of 9 turns.
  `youHaveAlreadyTried` exists and was not honoured.
- **#14** "They glances" — singular-they agreement, intermittent.
- **#16** Dusk at 4:44 PM in summer; the writer has `worldTimeLabel` and ignores it.
- **#25** `NAME_IDENTITY_DRIFT` false positive on "Cass stands where you left him".
- **#29** The player's own line echoed back as a NARRATION block.

**Instrumentation**
- **#20 `model_invocations` has never had a row.** Zero, for every session ever.
  We charge credits per turn and cannot say what a turn costs or how long a
  stage takes. Every latency number so far is a stopwatch around the whole
  request. This blocks honest work on speed.

**Choice cards**
- When the player is alone and the model writes cards that reach for absent
  characters, they are dropped; if fewer than two survive the set falls back to
  the rule-built menu items ("Throw", "Head to The House On The Corner"). The
  filter was narrowed this session so this should be rare, but the fallback
  itself is still the old checklist style.

---

## Simulator

Expo Go, device `6FB9A6DC-8EE5-44E1-80BA-06974D8950F9`, Metro on 8081, API on
4000. To reload after a change:
```bash
xcrun simctl terminate 6FB9A6DC-8EE5-44E1-80BA-06974D8950F9 host.exp.Exponent
xcrun simctl openurl 6FB9A6DC-8EE5-44E1-80BA-06974D8950F9 "exp://127.0.0.1:8081"
```
Metro caches aggressively; if a change does not appear, restart it with
`--clear`. **The accessibility snapshot lags the render** — trust a screenshot
over `snapshot_ui` when they disagree.

`npm run playtest <session-id>` reads a played session out of Postgres with its
media plan, beat plan, checks and cards attached. ~800 tokens a turn against
~4,000 for a UI snapshot, and it shows things the UI cannot. Use it.

---

## What I would do next, in order

1. **Hero frames inline in the feed** so images stay in history. Visible, and
   the thing Malik has raised twice.
2. **#20 model invocation logging.** Nothing about performance is honest until
   this exists.
3. **#31 / FORGOT_VIOLENCE** — consequence for social acts. The largest
   remaining gap between what the world sheets promise and what the engine does.
4. **Merge French to main** once the FRC002 linter issue is decided.
5. Re-run the 25-turn playtest to confirm the fixes landed, reading from
   Postgres. Then the smaller items: #14, #16, #25, #29, #32.
6. Zero Throne art, then the six remaining worlds (agent has this).
