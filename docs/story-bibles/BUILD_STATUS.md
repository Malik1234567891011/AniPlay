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

### Itachi (`itachi.ts`, `itachi.spec.ts`)
Shinobi political tragedy, written from scratch off a 15,554-word bible.

**The span decision, which had to be made before anything else.** The bible
runs age four to death and reanimation. A `StoryVersion` has one clock, one set
of locations and one cast at one set of ages, so the playable world is **the
coup crisis**: twelve days, age thirteen, Shisui alive, Sasuke seven, Danzō
active, the massacre not yet demanded of anybody. §55 calls this the best phase
for this product and §257 says the massacre must not arrive fast, and all ten
alternate lifelines in §135 are decisions made inside this fortnight.

*Everything before it is memory.* The battlefield at four is the archetype
choice — §8 asks for an "early war belief" stored at the start and read back by
four different men later, which is exactly what a build option is. Academy,
genin team, Tenma, ANBU entry and Mukai are `knowledgeScope` and item lore.

*Everything after it is endings.* Akatsuki, Kisame, the illness, the hotel
corridor, the final fight, Edo Tensei — those are what a destination *means*.
`The Shadow` carries nine canon years in its epilogue, which is the right amount
of room for the route this world exists to let you refuse.

8 characters, 12 endings (4 plain losses, all four rarities), 14 locations, 6
quests / 14 steps, 10 world events, 4 invisible banded resources (Reserve
`GOOD_HIGH`, Clan Pressure / Silence / Leverage `GOOD_LOW`, in that array order
on purpose). The famous night needs an ability granted by one step of a quest
that only opens after a night that only happens to a player who went and found
Shisui, *plus* having taken Danzō's bargain — so a passive run reaches none of
it, and 8 of 12 endings never touch it.

`itachi.spec.ts` covers what the generic specs cannot: opening co-location and
that nobody else defaults into that room; every canon-recreating world event
having a cancelling condition that something actually sets; the famous route
being expensive rather than default; all 28 cast pairs compared for lexical
overlap; each character's declared `speechStyle` differentiator being
demonstrated in the samples the writer receives; resource drivers and array
order; and the quiet loss being reachable without a mistake.

Three real defects came out of that spec rather than out of review: Sasuke and
Izumi were both counting things out loud and both using the number eleven,
Izumi and Mikoto were sharing an observational register down to the word
"twice", and Izumi had no home and was scheduled asleep in a public street.

## The queue, in order

### 1. Primal Crown — do this next
`docs/story-bibles/04_PRIMAL_CROWN.md`. Nothing written. Prehistoric faction
adventure: five factions (Emberclaw, Stoneback, Frostfang, Skyfire, Mireborn)
plus the hidden Ashen Hand, the Great Migration as world pressure, White Maw as
a recurring predator that is not automatically a villain. Cast: Kaia Thorn,
Torren Vale, Suri Snow, Ilya Crest, Mako Reed. Eight endings named in the bible;
add a walk-away and make several losses. Bible asks for qualitative per-faction
standing rather than one global reputation — `FactionDef` with `ranks` does this.
Beast bonding must not be a class lock.

### 2–8. The rest of `/Users/malik/Downloads/morestoryideas/`
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
