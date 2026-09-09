# The engine

Pure TypeScript. No I/O, no model, no clock of its own. Everything here is a
function of state and a seed.

## Attributes and modifiers (§12.2, §12.3)

Six attributes, base range 3–18. The modifier is `floor((value - 10) / 2)`,
clamped to ±5 by the range.

A check's total is:

```
d20 (advantage-adjusted) + attributeModifier + proficiency + equipment + situational
```

Proficiency runs 0–5: Untrained, Novice, Practised, Skilled, Expert, Legendary.

## Advantage (§12.6)

| Level | Roll |
| --- | --- |
| +2 | 3d20 keep highest |
| +1 | 2d20 keep highest |
| 0 | 1d20 |
| −1 | 2d20 keep lowest |
| −2 | 3d20 keep lowest |

Clamped to ±2. Stacking beyond that is discarded, not accumulated.

## Outcome bands (§12.5)

Margin is `total − dc`.

| Margin | Outcome |
| --- | --- |
| ≥ +10 | Critical success |
| +5 … +9 | Clean success |
| 0 … +4 | Success |
| −1 … −4 | Success with cost, for verbs that allow a partial |
| −5 … −9 | Complication |
| ≤ −10 | Failure |

`SUCCESS_WITH_COST` is only reachable for verbs in `PARTIAL_CAPABLE`. A locked
door does not half-open because you nearly picked it.

## Difficulty bands (§12.7)

DCs are hidden by default. What the player is shown is the band: Routine (≤8),
Easy (≤10), Moderate (≤12), Hard (≤15), Very hard (≤18), Exceptional (≤22),
Nearly impossible above that.

## Mutations (§11.3)

`applyMutations` is the only sanctioned write path, and `validateMutations`
runs first. A mutation naming an item, ability, location or character the story
does not define is rejected and recorded, not applied. This is what stops a
model inventing inventory.

Mutations are replayed, not aliased: `ENCOUNTER_START` clones its payload,
because storing the payload object by reference means every later update edits
the mutation itself and a replay compounds damage.

## What the engine observes

A deterministic engine can only gate content on what it saw. It records what it
saw as flags with reserved prefixes:

| Flag | Set when |
| --- | --- |
| `met:<characterId>` | the player shared a scene with them |
| `spoke:<characterId>` | the player addressed them |
| `attacked:<characterId>` | the player attacked them |
| `visited:<locationId>` | the player stood there |
| `used:<abilityId>` | the player used it |
| `inspected:<entityId>` | the player examined it, and the place they did it |
| `cooldown:<abilityId>` | an ability's cooldown, as a world minute |
| `route:<questId>:<routeId>` | a quest step was completed by that route |
| `closed:<flag>` | a route closed that possibility off |

Quests compose these with the predicate's other clauses — items, location,
relationship dimensions, faction standing, world time — and with flags earlier
steps award. Anything a story invents beyond that must be produced by a step
reward or a route, and the launch-catalog tests fail if it is not.

## Quest routes (§15.1)

A step may declare `succeedWhenAny`: several genuinely different ways through,
evaluated in order, first match wins. Each route sets flags and closes others,
so the way a player got through a door changes what is available after it.

A single `succeedWhen` means exactly one route works and everything else the
player tries is wasted effort. Routes exist so that is not the shape of the
game.

## Relationships (§14.2, §14.3)

Five dimensions: trust, affection, respect, fear, rivalry. Per-turn deltas are
clamped by event severity, and repeated interactions of the same kind dampen —
with a `-1` sentinel for "never interacted", so a first meeting is not treated
as a repeat.

Gates are predicates. The writer cannot open one by asserting it happened, and
a gate that names `flagsUnset` re-closes if that flag ever gets set.

## Defeat (§13.7)

Per story: `FAIL_FORWARD` (the default — you go down and the story continues
changed), `CHECKPOINT`, `ROGUELIKE`, or `LETHAL`. The Salt Road is the lethal
world and says so on its card.

## Time

One world clock in minutes. Verbs have time costs; travel uses the edge's
`travelMinutes`. NPCs follow authored schedules, except that a character in the
room with the player stays put — the scene outranks the timetable so nobody
vanishes mid-conversation.

A refusal costs no world time. Nothing happened.
