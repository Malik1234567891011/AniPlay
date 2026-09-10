# PLOTBREAK — where everything is

**Last updated: 2026-09-10, 17:20 (America/New_York).** This is the current
one. `docs/status.md` and `docs/session-status.md` are older and should be read
as history, not state.

---

## The short version

The catalog is **21 worlds**, 22 once Last Service lands. All six queued worlds
(Zero Throne, The Fourth Beast, The Blank Prophecy, The Red Floor, Second Skin,
Seven Names) are built, arted, merged and seeded.

**Cover art direction changed today.** Ours read as painterly film posters next
to a shelf of Naruto and My Hero Academia. Covers now ask for a TV anime key
visual — flat cel shading, ink outlines, saturated colour, cast filling the
frame — and carry no wordmark. Eleven covers regenerated under it.

Next: French. Play it, judge it, make it better than the English.

## Branches

| Branch | Worktree | State |
|---|---|---|
| `main` | `/Users/malik/AniPlay` | Active. Everything below unless stated. |
| `stories/four-new-worlds` | `/Users/malik/AniPlay-stories` | Agent running. Merged into main at `befd652`. |
| `localization/fr-fr` | `/Users/malik/AniPlay-fr-fr` | Agent finished. **Not yet merged to main.** |

---

## Worlds — 21 in the catalog, 22 with Last Service

**The original ten.** Six of them (Ninth Archive, Understudy, Salt Road,
Tidewall, Unbound, Nine Weeks) are in `LEGACY_COVER_STORY_IDS` — covers locked,
never regenerate. The other four (Blackwake, Last Five, Red Moon, Seven Days)
are fair game.

**Eleven newer, all built, arted, seeded and live:** Itachi, Primal Crown, Zero
Throne, Hush House, Window Seven, Good Morning Husband, The Fourth Beast, The
Blank Prophecy, The Red Floor, Second Skin, Seven Names.

**In flight:** Last Service — 2,245 lines written, needs its spec, catalog entry
and art. The stories agent has it.

**Art recipe** (~$2.60 and ~20–35 min per world, concurrency 4):
```bash
export OPENAI_API_KEY="$(grep '^OPENAI_API_KEY' /Users/malik/AniPlay/.env | cut -d= -f2- | tr -d '"'\'' \r')"
npx tsx infra/scripts/generate-art.ts --only=story_<id> --reactions --concurrency=4
npx tsx infra/scripts/optimize-art.ts
npm run migrate   # REQUIRED — asset keys are baked into a story version
```
Nothing is baked into the art, including the title — see the addendum.

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

**Hero frames stay in the feed now.** There used to be exactly one on screen,
in a fixed slot bound to the newest turn, so a frame appeared with its beat and
vanished when the next turn landed. They render inline with their own turn.

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

---

# Addendum — 2026-09-10, 17:20

## Cover art, changed

Malik put our shelf next to Naruto, One Piece, Jujutsu Kaisen, Hajime no Ippo,
Code Geass and My Hero Academia: *"theyre much more bubbly and anime esque where
ours look more realistic… the cover arts dont ressmeble animes."*

The cause was in our own prompt. `STYLE_SPINE` asked for a **painterly**
cel-shaded style, **cinematic** composition, **film-grade lighting**, a
**restrained palette** and **subtle grain** — five phrases that each describe a
film poster. We were commissioning the thing he did not want, precisely.

Three changes:

1. **`COVER_STYLE_SPINE`** — covers get their own spine describing a *medium*,
   not a mood: flat cel shading in two or three hard steps, no airbrushed
   gradients, bold black ink outlines, high-chroma colour, a flat or simply
   graded background rather than a painted environment. Naruto is orange, My
   Hero Academia is yellow; neither is restrained and neither has grain.
2. **Framing is a stated rule** and is the part that matters most. The cast
   fills three quarters of the frame, cropped by its edges, faces roughly a
   fifth of the picture height, front-on at eye level. The setting is a backdrop.
   Every reference has the cast enormous; ours had a small figure in a good room.
3. **No wordmark.** Covers carry `titleSafeArea: null`, which switches plating
   off, and no quiet band is reserved. The Discover card already prints the
   title beneath the picture, so plating said it twice — and one template across
   twenty covers is what made them feel identical. `cover-title.ts` is untouched;
   restoring it is one field.

Scoped to covers on purpose: covers carry `COVER_DIRECTION_VERSION`, so bumping
it to `plotbreak-cover-v3-anime` leaves ~1,200 stage and portrait assets alone.
The six worlds in `LEGACY_COVER_STORY_IDS` stay locked.

**Open question:** stages and portraits are still generated under the old
painterly spine. Making them match is another ~1,200 assets and real money — a
decision, not an oversight.

## Reaction art, made reachable

The largest single find of the day. Reaction decks are generated from a fixed
eight emotions; worlds author expressions in their own voice (`sulking`,
`implacable`, `unimpressed`). Nothing reconciled the two, so the director picked
an authored word, the key had never been drawn, and the frame 404'd silently.
**257 of 374 authored expressions across the catalog had no asset — 69%.** Of
Itachi's 89 files, 64 are reaction frames and only `neutral` was reachable.

`toReactionEmotion` maps the authored word onto one of the eight, and
`catalog.spec` fails if a world introduces one the map does not know — which it
promptly did, catching thirty new words from the six merged worlds.

## Also fixed since the last entry

- **Hero frames stay in the feed.** One slot bound to the newest turn meant a
  frame vanished the moment the next turn landed.
- **Speakers keep their name and face after leaving the room** (`scene.cast`).
- **#16** the writer is told the clock and what the light is doing — "dusk" at
  4:44 PM.
- **#31 / FORGOT_VIOLENCE** the world remembers being attacked even when the new
  turn names nobody, and a public statement records that the room heard it.
- **#18** turning your head no longer rolls a DC 10 check.
- **#30** time is no longer charged per clause.
- **#25** the one check that fired in 25 turns was a false positive.
- **#21** a lost point of respect no longer reads as warming.
- **#17** the feed no longer jumps backwards on submit.
- **#22** autocorrect no longer rewrites what the player typed.
- **#39** named-protagonist worlds stop asking who you are.
- **#40–43** Mikoto in two places in one beat; Sasuke `delighted` while hurt; a
  card calling Sasuke "nii-san"; three cards all answering yes to a yes-or-no.

## Still open

- **#20 `model_invocations` has never had a row.** Blocks honest latency work.
- **#35** dialogue attributions with no dialogue — verify, likely fixed by #19.
- **#32** the same relocation card offered in 8 of 9 turns.
- **#14** "They glances" — singular-they agreement, intermittent.
- **#29** the player's own line echoed back as a NARRATION block.
- A card that puts the NPC's question in the player's mouth (seen in Itachi
  turn 7: the player asks Sasuke when *Sasuke* can finish something).
- Stage and portrait art still under the old painterly spine.

## Next

1. Last Service (agent, in flight) — the 22nd world.
2. **French.** Play it end to end, judge it honestly, make it better than the
   English. Steps 9, 11 and 12 of the localization plan are unstarted, and
   `fr-lint` FRC002 is shaping copy rather than checking it.
