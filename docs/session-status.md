# Where the core-loop work stands

Written so a fresh session can pick this up without re-deriving it. Update it;
do not let it rot.

## The three lanes

| Lane | Branch | Worktree |
|---|---|---|
| Core loop, playtesting, smoke | `main` | `/Users/malik/AniPlay` |
| Four new worlds | `stories/four-new-worlds` | `/Users/malik/AniPlay-stories` |
| French Phase 1 | `localization/fr-fr` | `/Users/malik/AniPlay-fr-fr` |

1 and 2 merge into `main` when ready. 3 waits for the product owner's approval
and an `ENGLISH_FREEZE_COMMIT`.

## What the choice system now is

Choices used to be an **affordance list**: `buildOpportunities` returns
everything currently possible, and `buildSuggestions` rendered the first of each
into a label — `Ask ${presentCharacters[0]} about ${topics[0]}`. A pure function
of the scene with no memory of the turn, so the same card regenerated forever and
the screen read as a checklist with one item ticked. That was the root cause of
the duplicate-card screenshot; nothing was stale and no unresolved-beat model
ever existed.

Now: `packages/director/src/responses.ts` generates three first-person responses
**after the beat is written**, from what the beat says — off the first-text path
entirely, since the player is already reading. The deterministic
`buildSuggestions` remains as a floor and suppresses what the player just did,
matched on the resolution rather than on the words.

The generator is given: the written beat, the player's action, the room and
hour, the player's identity and setup answers, everyone present via
`speakerBrief`, recent scene summaries, `youHaveAlreadyTried` (the last four
player actions), retrieved memories, and `whereYouCouldGo` (real exits by name).

## Bugs found by playing, in order, all fixed

1. **Name spam** — four "Sora"s in one line. Prompt rule plus a deterministic
   vocative strip.
2. **Presence** — the coach written out of a room she was standing in. Absence
   was being used as an escape hatch from a scene the player earned. Now a
   positive engine directive plus a detector, rewritten three times as new
   phrasings appeared (`isn't here` → `empty except for you` → `hasn't come up
   yet`). Written as a shape now — any negated arrival — not a phrase list.
3. **Beat ownership** — the reaction frame showed a teammate mid-ultimatum to
   someone else, because the parser produced no target and it fell through to
   relationship weight.
4. **Honorifics** — "Captain is afraid of you", "Take the deck — Captain". Ten
   sites shortened names by first word. Also a *matching* bug: typing "Veyra"
   resolved to nobody.
5. **Violent nouns** — "useless on a deck" started a fistfight on a ship.
   `deck`, `beat`, `kick`, `hit`, `floor`, `jump` now need a person after them.
6. **Multi-line speech** — a long answer broke into four blocks, only the first
   knowing who was talking.
7. **Circling responses** — a deflected question re-offered in nicer words.
8. **The story would not leave the room** — nine turns, one hour, one platform.
   Cards said "lead the way" and "as we walk": prose that reads like movement and
   is not, because nothing named a destination the parser could resolve.
9. **THE BIG ONE — quoted dialogue was never parsed on a real iPhone.**
   `extractDialogue` matched ASCII quotes only; iOS smart punctuation makes every
   typed quote curly. A player who wrote anything in quotes had it silently
   ignored, went to the model parser as low-confidence, and in one live case lost
   three hours of world time and had the person they were addressing walk away.

## Screen changes

Responses live **in the story feed**, not pinned above the composer. Full-width
stacked cards, tap sends, pencil edits into the composer, both through the same
freeform path. One scrollable transcript, no "earlier beats" fold. No
`Risky · 9 Legs`, no `PERSUADE X · MODERATE / Failure`, no `−10 Energy` — the
check card shows only when a world sets `revealCheckMath`.

## Still to do

- **Playtests are incomplete.** ~14 turns of choice-only, partial freeform and
  mixed. The A–H acceptance answers should not be claimed until a clean run
  end-to-end on the current build without stopping to patch.
- Screenshots from three worlds beyond Last Five and Seven Days.
- Pacing: a seven-day-premise world spent an in-game hour on a railway platform.
  The exits fix should help; verify it does.
- One `TURN_TIMEOUT` at 50s in a sweep — single occurrence in ~150 turns, but
  longer beats make it worth watching.
- Reconcile the remaining sweep findings. Last clean sweep: 9 findings
  (4 FORGOT_VIOLENCE, 2 NO_QUEST_MOVEMENT, 1 NO_INVENTORY_MOVEMENT,
  1 TURN_TIMEOUT, 1 VAGUE_OUTCOME), down from 33.

## Operational notes

- API runs on **port 4000**, `npm run dev` in `services/api`. `tsx watch`
  reloads on edit — **do not edit source during a sweep**, it invalidates the run.
- Stale `tsx watch` processes accumulate; check `ps aux | grep "[t]sx watch"`
  and keep exactly one.
- `npm run migrate` re-seeds the catalog. Story definitions are **versioned, not
  edited in place**, so fixture changes need a re-seed and a *new session* to
  take effect.
- Credits: the wallet has a `grant` method; a dev top-up writes a BONUS ledger
  entry through it rather than hand-writing rows.
