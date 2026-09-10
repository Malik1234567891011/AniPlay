# Authoring pass — where it stands

Branch `stories/four-new-worlds`. Updated as each world lands.

## Done

### Hush House — shipped, in `LAUNCH_CATALOG`
`packages/test-fixtures/src/hush-house.ts`, `hush-house.spec.ts`.

Was already written to standard when this pass picked it up: five characters
with nothing empty, nine endings, two banded resources. What was wrong with it
was not the writing, and none of it was visible to `catalog.spec.ts` or
`endings.spec.ts`, because every one of these was a disagreement between the
authoring and the engine rather than between two authored objects:

- **The opening scene had nobody in it.** The whole first beat is Ayame at the
  door and all three `openingSuggestions` answer her, and her schedule put her
  in 314 at `startWorldMinute`. `applySchedules` only exempts characters who are
  already co-located, so nothing would ever have walked her in. Turn one reached
  the writer with an empty `speakers` list.
- **Both resources were inert.** Every ability had `costs: []`, so nothing the
  player could do moved either meter, and eight bands of behaviour described
  states the world could not arrive in.
- **Public Suspicion could never rise at all.** `PUBLIC_VIOLENCE` and the
  generic cost fallback both take the *first* `GOOD_LOW` resource in array
  order, which was House Attention — so being seen fighting in the street raised
  the building's interest in you, and the city's three upper bands were
  unreachable prose.
- **Resting did nothing.** `resolveRest` restores every `GOOD_HIGH` resource and
  the world had none, so the engine printed "you rest, and recover" and emitted
  no mutations. Sleep now exists, which is also the variable this world most
  obviously wanted.
- **Two people slept in the public stairwell** and one called the communal
  kitchen home, because 206 and 405 were not places.
- **Ayame and Tomas shared a rhetorical move** — negate-then-substitute, both
  off the phrase "it was nothing". Tomas is a paramedic and now sounds like one.
- Room 309, which rule one of three is *about*, was a clause in a corridor
  description that `authored-lore.ts` suppresses whenever the player is standing
  in that corridor. It is a location.
- Premise was 282 words against a documented 120–240, and spent its last
  paragraph printing the answer to its own central mystery on the store card.

`hush-house.spec.ts` holds all of it, since none of it was catchable generically.

## In progress

### Window Seven — written, NOT in `LAUNCH_CATALOG`, does not parse
`packages/test-fixtures/src/window-seven.ts` (untracked as of writing).

Substantively finished and authored at standard — 5 characters with nothing
empty, 8 endings matching the bible one-for-one, one banded invisible resource
that is the best-behaved in the repo. It has never been run once, and it shows.

Known defects, in the order they need fixing:

1. **It throws on import.** `AbilityDef.requires` is `.strict()` and has no
   `hasItems`; `burn_the_archive` and `publish_it` both pass one. The author
   copied the `QuestPredicate` shape. Re-express as `flagsSet: ['knows:palisade']`.
2. **Not registered in `index.ts`**, which is why (1) survived: both catalog
   specs iterate `LAUNCH_CATALOG`, so no test has ever touched this world.
3. **`clean_operation` is handed to every run** from `the_first_night.rewards.flags`,
   and the `rang_her` route's `closesFlags` cannot revoke it — `closesFlags`
   writes `closed:X` and never unsets `X`. Two endings' central gate is inert.
   Move it onto the two routes that deserve it.
4. **`broke_the_brief` has one source**, on night one only, and gates a UNIQUE
   ending, a RARE ending and a branch of Mara's arc. Contacting the target at
   any point should set it — put it on the `q_selene` routes.
5. **Five of eight endings funnel through one item purchase** (`juno_log` →
   `penthouse_access` → `palisade_drive`). Needs a second way up.
6. **Selene and Ash are the same voice** — negate-then-correct, contraction-free,
   numeric tic, identical procedural offer. Ash's declared differentiator ("no
   contractions") does not differentiate: nobody in the world uses one. Halden's
   samples contradict his own `speechStyle`.
7. **The penthouse is in the wrong building.** `orpheum_lobby` connects directly
   to `voss_penthouse` across a four-lane avenue, and `juno_log` is nine weeks of
   swipes in the *player's* tower yet unlocks the *target's*.
8. `whether_she_uses_it` can dead-end; no plain walk-away ending; 0 UNCOMMON
   across 8 endings; 6 quest steps against a house norm of 10–17.

## Untouched

- **Good Morning, Husband** — `docs/story-bibles/03_GOOD_MORNING_HUSBAND.md`.
  Nothing written. Design settled: 5 characters (Hana, Emi, Kenji, Lucia, Nao),
  three invisible banded resources (Hana Security, Shared Life Momentum, Memory
  Investigation), ~10 endings including two losses and a walk-away.
- **Primal Crown** — `docs/story-bibles/04_PRIMAL_CROWN.md`. Nothing written.

## Queued after these four

`/Users/malik/Downloads/morestoryideas/` — eight more bibles, each 48–110KB
(five to ten times the size of the current four). **Start with `09_ITACHI.md`**,
which is the one asked for first. Then, in no fixed order: `01_ZERO_THRONE`,
`02_THE_FOURTH_BEAST`, `03_SEVEN_NAMES`, `04_THE_BLANK_PROPHECY`,
`06_THE_RED_FLOOR`, `07_SECOND_SKIN`, `08_LAST_SERVICE`. (`00_INDEX.md` in that
folder lists seven and describes a `RANK_ZERO` that has no file; 08 and 09 are
on disk and unlisted.)

## Standing lessons from this pass

- **`closesFlags` does not unset a flag.** It writes `closed:X`. Mutually
  exclusive states must come from sibling routes' `setsFlags`, never from a step
  reward that every route grants.
- **`evaluateStepSuccess` returns the first matching route in array order.**
  Order routes most-specific first, or a general route silently eats a
  deliberate one.
- **A world with no `GOOD_HIGH` resource has a broken rest action and sends
  every unpriced cost to its first descending resource.** Check the order.
- **Registering the world in `index.ts` is what turns the test suite on.** Do it
  first, not last.
