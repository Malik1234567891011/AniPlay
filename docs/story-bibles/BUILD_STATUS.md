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

## Done (continued)

### Window Seven — shipped, in `LAUNCH_CATALOG`
`packages/test-fixtures/src/window-seven.ts`, `window-seven.spec.ts`.

It had never been run once. It was not in `index.ts`, so no test in the repo
had ever loaded it, and it threw on import: `AbilityDef.requires` is strict and
has no `hasItems`, and two abilities passed one — the author had copied the
`QuestPredicate` shape. Registering it first would have caught that in a second.

Fixed, in the order it mattered:

- The two `hasItems` ability gates are now `knows:palisade`, which is also what
  actually makes burning or publishing the archive possible.
- **`clean_operation` was handed to every run** from the step's rewards, and the
  route that rang the target on night one could not revoke it, because
  `closesFlags` writes `closed:X` and never unsets `X`. Two endings gated on
  having run a clean operation were decorative. It now comes from the two routes
  that earn it, and Seven Nights Complete also requires `broke_the_brief` unset.
- **`broke_the_brief` had one source, on night one.** It gates a UNIQUE ending,
  a RARE ending and a branch of Mara's arc. Rule four of the brief is "make no
  contact", so every route that reaches Selene now sets it.
- **Five of eight endings funnelled through one purchase** off the concierge.
  `over_the_roof` is a second way into the penthouse, and the two abilities that
  destroy or publish the archive no longer need the drive in hand.
- **The penthouse was in the wrong building** — a lift in the player's own lobby
  arriving across a four-lane avenue. Removed; the far building's fire stair is
  the way up. The access log is nine weeks of swipes in the player's *own*
  tower, which is what makes it evidence.
- **`whether_she_uses_it` could dead-end**, so Mara's Order never fired for a
  player who was simply told about the order. There is now a route that only
  needs the week to run out.
- **Selene, Ash and Halden were one voice** — negate, then correct, in
  contraction-free sentences with a number in them. Ash's declared
  differentiator was "no contractions", and nobody in the world uses one. Each
  now has a move belonging to their job: Ash states his procedure and offers you
  a way to refuse, Selene reframes the question and hands you the data, Halden
  accumulates four clauses of reassurance and stops dead on the question.
- **6 quest steps became 10** (33 routes). The middle of the week had no shape;
  `q_selene` was one step handing out the memoranda, both endgame abilities,
  `knows:palisade` and 15 reputation in a single transition. There is now a
  `q_glass` lead, a middle-nights step, and a step for what Voss actually wants.
- Added the plain walk-away ending the bible asks for and the catalog norm has.
  Rarities were 7-of-8 RARE-or-above; now spread across all four tiers.
- Halden spent 1440 minutes at one desk across three blocks, two of which were
  "at the desk" and "still at the desk". He has a day.
- Premise opened on an invented institution and put seven proper nouns in its
  first sixty words. Rewritten to open in the room.

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
