# Authoring pass — handoff

**Read this whole file before touching anything.** It is written to be picked up
by a session with no memory of the previous one.

## Where to work

Worktree `/Users/malik/AniPlay-stories`, branch `stories/four-new-worlds`.
Stay there. Do **not** touch `/Users/malik/AniPlay` or `/Users/malik/AniPlay-fr-fr`
— other agents own those. Never reset, force-push, or discard anyone's work.
`main` moves fast; rebase onto `origin/main` when convenient.

If the remote branch tip and your local branch have diverged after a rebase,
**merge, do not force-push** — that situation already happened once here and the
merge resolved cleanly with `--ours` on the one conflicted file.

## Gates

All three, every time, and read the exit codes rather than piping through `tail`:

```
npm run typecheck        # separate gate from tests; vitest passes while tsc fails
npm run lint
npx vitest run --root packages/test-fixtures
npx vitest run --root packages/director
npx vitest run --root services/api
npx vitest run --root packages/engine
```

`npm test` at the repo root exits 1 for an unrelated, pre-existing reason:
`services/worker` has no test files at all and vitest treats that as a failure.
That is not yours. Everything else must be green.

## The standard

`docs/authoring-principles.md` is the specification. Read it before writing a
line and again when unsure. `packages/contracts/src/game/story.ts` is the schema.
`packages/test-fixtures/src/last-five.ts` and `blackwake.ts` are the reference
worlds; `hush-house.ts` is the reference for the newer `bands` schema.

Every major character needs `role`, `cardBlurb`, `publicTraits`, `hiddenDrives`,
`values`, `fears`, `socialStyle`, `boundaries`, `goals`, `secrets` (each with a
non-empty `revealHint`), `speechStyle`, `topics`, `voiceSamples` (3+, genuinely
distinct), `appearance`, `visualHook`, `silhouette`, `schedule`,
`knowledgeScope`, `startingRelationship`, `gates`, `attributes`. All of it now
reaches the writer through `speakerBrief`. A character with empty `fears` is a
character the writer cannot motivate.

The bar: strip the speaker names off the dialogue and a reader should still know
who is talking.

**No cover images.** Do not run art generation. The first ten worlds' covers are
locked. New worlds ship with `coverImage: null`, `keyArt: null`, and `null` on
every `stageImage` and `portrait`, and are exported **raw** from `index.ts`
(not through `withDerivedAssetKeys`). `director.spec.ts` enforces all-or-nothing
per world.

## Engine gotchas — the expensive ones

These were all found by playing the data against the engine, and none of them is
caught by `catalog.spec.ts` or `endings.spec.ts`, which only check that authored
objects agree with each other.

1. **`closesFlags` does not unset a flag.** It writes `closed:X` and leaves `X`
   set (`packages/engine/src/quests.ts:197`). So a flag in a step's
   `rewards.flags` reaches *every* run regardless of route, and a sibling route
   cannot take it back. Mutually exclusive states must come from sibling routes'
   `setsFlags`. Window Seven had two endings gated on a flag every run received.

2. **`evaluateStepSuccess` returns the first matching route in array order**
   (`quests.ts:83`). Order routes most-specific first, or a general route
   silently eats a deliberate one.

3. **`resolveRest` refills every `GOOD_HIGH` resource** (`resolve.ts:1496`). A
   world with none prints "you rest, and recover" and emits no mutations. A
   world whose only `GOOD_HIGH` resource is a relationship meter repairs the
   relationship with a nap, which is worse. Give the world one honest
   restorable resource (Sleep, Energy) and make the rest `GOOD_LOW`.

4. **The generic cost path and `PUBLIC_VIOLENCE` both take
   `story.resources.find(r => r.polarity === 'GOOD_LOW')` — array order, not
   `displayPriority`** (`resolve.ts:1982`, `2072`). Whichever descending
   resource is listed first absorbs everything unpriced. In Hush House that
   meant being seen fighting in the street raised *the building's* interest in
   you and the city's meter could never move at all. Order the array on purpose.

5. **Ability costs on a `GOOD_LOW` resource are added, not subtracted**
   (`resolve.ts:599`), which is correct and is how you drive an ascending meter.
   A world where every ability has `costs: []` has inert resources and bands of
   prose describing states nothing can reach.

6. **`requires` on an ability restricts one the player already has; it does not
   grant it.** `catalog.spec` counts an ability as obtainable only if it is
   `unlockedByDefault`, in an archetype's `startingAbilities`, or awarded by a
   step's `rewards.abilities`. An ability that is `unlockedByDefault: false` and
   granted by nothing is a route nobody can take.

7. **Characters are placed by schedule at minute zero**
   (`state.ts:96`, schedule → `homeLocationId` → starting location), and
   `applySchedules` only exempts characters already co-located with the player
   (`commit.ts:291`). So if the opening scene names somebody, their schedule
   must put them in `rules.startingLocationId` at `rules.startWorldMinute`, or
   turn one reaches the writer with an empty `speakers` list. Hush House opened
   in an empty flat this way. `charactersPresent(state)` takes **state only** —
   calling it `(story, state)` silently returns nothing.

8. **Register the world in `index.ts` and `LAUNCH_CATALOG` first, not last.**
   Both catalog specs iterate `LAUNCH_CATALOG`, so an unregistered world is
   untested. Window Seven sat unregistered and did not even parse.

9. **Prose escaping.** In a TypeScript single-quoted string a paragraph break is
   `'\n\n'`, not `'\\n\\n'`. There is now a catalog-wide guard in
   `good-morning-husband.spec.ts`.

## Validator rules a new world must satisfy

- **Premise** (`narrative-clarity.ts`) must hit all six signals — protagonist
  (`you`), setting (a word from its concrete-place list: city, room, house,
  office, hall, station, school…), inciting (`was`/`does not`/`found`…),
  consequence (`so`/`because`/`now`/`which means`), objective
  (`find`/`keep`/`have to`/`need to`), tension
  (`lose`/`secret`/`deadline`/`watching`/`days`). At most 3 proper nouns in the
  first 60 words; no invented term in the first sentence; no `not X, but Y`;
  few em-dashes. 120–240 words, paragraphs ≤ 70 words, ≥ 3 paragraphs.
- **Archetype `helpText`** must match `/fixed|permanent|keep it|for the whole story/i`
  and be > 60 chars. Every archetype needs a non-empty `role`, a `summary` > 40
  chars, ≥ 2 `playstyle` tags, a unique tag set, and something the rules can see.
- **`cardBlurb`** must be > 20 chars, not equal `role`, and contain `you`/`your`.
- **Endings**: ≥ 3, `minTurn > 0`, `condition` > 80 chars, `epilogue` > 60
  chars, at least one `COMMON`/`UNCOMMON`, and every non-engine-prefixed flag
  must be set by a step reward, a route's `setsFlags`, a world event, or a
  companion departure. Engine-set prefixes are `met: spoke: attacked: engaged:
  visited: used: inspected: cooldown: route: closed: played: beat: lost_to:
  dead: surrendered: crew: morale: left: tend: scout: mentioned: promoted:
  undertaking: knows:` plus `left_the_map` and `qualified`.
- **Browsability**: `services/api/src/catalog-taxonomy.spec.ts` requires every
  world to file under at least one category, by tag or by two keyword hits.
- **`openingSuggestions`**: exactly 3, ≤ 320 chars, ready-to-play responses in
  the protagonist's first-person voice — an action and usually a line of
  dialogue. Never commands, never three errands, never one obviously correct one.

## Done — all shipped, in `LAUNCH_CATALOG`, all gates green

### Hush House (`hush-house.ts`, `hush-house.spec.ts`)
Supernatural horror/romance. Already written to standard when this pass found
it; what was wrong was entirely engine disagreement. Fixed: Ayame was next door
during her own opening scene; both resources were inert and Public Suspicion
could never rise; resting did nothing; two tenants slept in the public stairwell
because 206 and 405 were not places; Room 309 (rule one of three) was a clause
in a corridor description that `authored-lore.ts` suppresses when you stand in
that corridor; Ayame and Tomas shared a rhetorical move; the premise was 282
words and printed the answer to its own mystery on the store card. Added a
`sleep` resource. 5 characters, 9 endings, 15 locations, 3 banded resources.

### Window Seven (`window-seven.ts`, `window-seven.spec.ts`)
Stakeout espionage. Had never been run: unregistered, and threw on import
because two abilities passed `hasItems` to `AbilityDef.requires`, which is
strict and has no such key. Fixed: `clean_operation` was handed to every run;
`broke_the_brief` had one source on night one and gated a UNIQUE ending;
five of eight endings funnelled through one purchase off the concierge; the
penthouse was reachable by a lift inside the player's own lobby across a
four-lane avenue; the case quest could dead-end; Selene, Ash and Halden were one
voice; 6 quest steps became 10; added the walk-away ending and a real rarity
spread. 5 characters, 9 endings, 10 locations, 1 banded invisible resource.

### Good Morning, Husband (`good-morning-husband.ts`, `good-morning-husband.spec.ts`)
Feel-good domestic romance, written from scratch. 5 characters (Hana Mori, Emi
Takeda, Kenji Mori, Lucia Vale, Nao Ibarra), 11 endings, 11 locations, 5 quests
/ 8 steps, 3 invisible banded resources (Energy `GOOD_HIGH`, Her Unease, Drift).
The Platform 11 lead is gated behind `knows:the_seam`, which only two world
events set and both require deliberate player action — 8 of 11 endings are
reachable by a player who never wonders why they woke up. Four endings are the
marriage not surviving; `Separate Rooms` is reachable by playing quietly and
politely and carries no relationship floor, because that is the honest failure
mode of a real marriage.

## The queue, in order

### 1. ITACHI — do this next (user asked for it specifically)
`/Users/malik/Downloads/morestoryideas/09_ITACHI.md` — 15,554 words, ~101KB,
100+ numbered sections, spanning age four through death and reanimation.

**Flag this before building it into the shipping catalog.** Every other world in
`LAUNCH_CATALOG` is deliberately original — Last Five's own header says "No real
school, player, team or signature move is referenced, and the reason the five
left is the story's own." This bible is Itachi Uchiha, Sasuke, Shisui, Danzō,
Kakashi, Hiruzen, the Uchiha, Konoha and Akatsuki: named characters and plot
from *Naruto*. Building it is fine and the user asked for it. Marking it
`official: true` and shipping it in `LAUNCH_CATALOG` alongside the originals is a
rights decision rather than a craft one, and the user should make it
deliberately. Suggested default until they say otherwise: build the world file
and its spec, export it from `index.ts`, and hold it out of `LAUNCH_CATALOG`
behind a clearly-commented line — or set `official: false` — so nothing ships by
accident. Ask.

Scale note: at 15.5k words this bible is five to ten times the size of the four.
It will not fit one authoring pass comfortably. Expect to split it — the natural
seam in the bible itself is age 4 → academy → genin/ANBU → the coup → Akatsuki,
and the schema has `worldEvents` plus quest chains to carry a life that long.
Keep structured state small anyway; a long timeline is not a reason for seven
variables.

### 2. Primal Crown
`docs/story-bibles/04_PRIMAL_CROWN.md`. Nothing written. Prehistoric faction
adventure: five factions (Emberclaw, Stoneback, Frostfang, Skyfire, Mireborn)
plus the hidden Ashen Hand, the Great Migration as world pressure, White Maw as
a recurring predator that is not automatically a villain. Cast: Kaia Thorn,
Torren Vale, Suri Snow, Ilya Crest, Mako Reed. Eight endings named in the bible;
add a walk-away and make several losses. Bible asks for qualitative per-faction
standing rather than one global reputation — `FactionDef` with `ranks` does this.
Beast bonding must not be a class lock.

### 3–9. The rest of `/Users/malik/Downloads/morestoryideas/`
`01_ZERO_THRONE` (mecha/political), `02_THE_FOURTH_BEAST` (Paris
creature-bonding), `03_SEVEN_NAMES` (Belle Époque revenge/heist),
`04_THE_BLANK_PROPHECY` (modern Greek myth), `06_THE_RED_FLOOR`
(martial arts/gym), `07_SECOND_SKIN` (beastfolk coming-of-age),
`08_LAST_SERVICE`. Each 48–110KB. That folder's `00_INDEX.md` lists seven and
describes a `RANK_ZERO` that has no file; `08` and `09` are on disk and unlisted.

## Recipe for a new world

1. Read the bible and `docs/authoring-principles.md`.
2. Write `packages/test-fixtures/src/<world>.ts` as a `const raw = {...}` parsed
   with `StoryVersion.parse(raw)`. Copy the top-level key order from
   `last-five.ts`.
3. **Register it in `index.ts` immediately** (import, re-export raw, add to
   `LAUNCH_CATALOG`, extend the catalog doc comment). Run the fixtures suite —
   this is what catches parse errors and unreachable routes.
4. Iterate against `catalog.spec`, `endings.spec`, `choice-clarity.spec` and
   `director.spec`'s narrative-clarity block until green.
5. Write `<world>.spec.ts` for what is specific to that world and what the
   generic specs cannot see — opening co-location, resource drivers, voice
   collisions, flag reachability from a single run.
6. Commit one world at a time and push after each
   (`git push origin stories/four-new-worlds`), so an interruption costs one
   world rather than all of them.

## Standing craft notes

- Two characters who would answer the same question the same way means one is
  not written yet. The specific repeat failure so far is **negate-then-correct**
  ("I am not saying X, I am saying Y") — it showed up shared across two
  characters in Hush House and three in Window Seven. Grep for it.
- A character's declared `speechStyle` must be demonstrated by their
  `voiceSamples`; the writer gets the samples. Ash's differentiator was "no
  contractions" in a world where nobody uses one.
- Endings should use all four rarity tiers. Seven-of-eight at RARE or above
  flattens the system.
- Quest depth: the house norm is 10–17 steps. Six steps covering a whole week
  reads as a synopsis.
- Do not let one step hand out an item, two abilities, a knowledge flag and a
  reputation block in a single transition.
