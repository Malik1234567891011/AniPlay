# fr-FR — checkpoint

Read this first and trust it. Do not re-explore to confirm it unless something
contradicts it.

**French now lives on `main`.** The `localization/fr-fr` branch is merged and is
no longer where the work happens. Everything below is on `main`.

The standing constraint, above everything else:

> **`en` and `fr` are both permanent, first-class product locales.** English is
> never replaced, degraded or routed through the French path. A change that
> makes French work by overwriting English is a regression, not a trade-off.

---

## State

| # | Step | Status |
|---|---|---|
| 1–8 | Infrastructure, catalogue, policies | done |
| 9 | `addressMode` — tu/vous per ordered pair | done |
| 10 | French `VERB_LEXICON`, clitics, Unicode boundaries | done |
| 11 | Figurative violence (`ça me tue` is not an attack) | done |
| 12 | **One world in French, end to end — Nine Weeks** | done |
| 13 | Response-card cap made locale-aware | done |
| 14 | The other twenty-two worlds | not started |
| 15 | Store metadata, screenshots, ASO | not started |

### Gates, by exit code

Never pipe a gate through `grep` or `tail` and read `$?` — that is the pipe's
exit code, not the gate's, and it has already produced a false green in this
project. Redirect to a file, read `$?`, then grep the file.

```
npm run typecheck                       0
npm test                                0
npm run lint                            0
npx tsx infra/scripts/i18n-extract.ts --gate   0
npx tsx infra/scripts/fr-lint.ts --catalog     0   666/666 keys, 0 violations
npm run fr:probe                        0   34/39
```

---

## How a world gets a language

`packages/contracts/src/game/localize.ts`. An **overlay**, not a parallel
fixture: prose only, addressed by path, with the cast addressed by id so
reordering cannot reassign a voice. What is absent falls back to English, which
is the correct intermediate state — and `worldTextCoverage` counts it, so it is
visible rather than silent.

French text for a world lives in `packages/test-fixtures/src/fr/<world>.fr.ts`
and registers itself on import.

**Three seams, and all three were needed:**

1. `composeStory` — every engine and director path already calls it, so it is
   the one line where a turn can arrive in the wrong language.
2. Session creation — the opening beat and its three cards are authored and
   written *before* any turn exists. Without this a French run opened on five
   paragraphs of English.
3. The catalogue routes — by **interface** locale, not any run's. The hook and
   the fantasy label are the two lines that sell a world.

### What does not travel

`STORY_AUDIT.md` §2, with one refinement earned by playing:

- **A person's name, never.** Juno Vale is Juno Vale in Paris.
- **A place whose name is a *description*, yes.** `The Back Steps`, `The Dock`,
  `The Road Into Town` are not invented proper nouns, and leaving them puts
  `place: The Staff Cabins` in a French HUD under a French clock. A proper noun
  *inside* a name survives: `Le bar du Longhouse`.
- **`artDirection`, never.** It is a prompt for an image model.
- **`affordances`, only with the ability name.** They are parser-matched
  phrases; moving one without the other makes the ability unreachable.

---

## Bugs found by playing, and what they teach

- **`getUser` selected every settings column except `s.locale`.** Written on
  save, mapped in `toUserRecord`, missing from one SELECT. So choosing French in
  Profile worked for exactly one request and silently reverted. *The setting
  whose entire purpose is to persist was the only one that did not.*
- **The cards were the one surface nobody told.** The writer has been forbidden
  the inclusive midpoint since step 8 and its prose was clean; the cards were
  never given `playerGrammar` nor told not to guess, so the model hedged:
  `t'es sûr·e`, `adossé·e`. Fixed at the root (the payload carries the answer)
  and structurally (`hasMidpoint` drops the card).
- **The midpoint rule was about the player.** Prose about a non-binary NPC used
  one anyway. It is now a validator rule for any French block, and the policy
  says the rule is for everybody.
- **`Beyond ${here.name}`** produced `Beyond Les`. French contracts rather than
  concatenating; `elide` handles it, and the leading article lowercases
  mid-phrase.
- **The first French run came back entirely in English** because the worktree
  had no `.env` and the API was running `modelProvider: rule-based`. Nothing was
  wrong with the French.
- **My own first draft of the French world text failed the midpoint rule.** The
  discipline has to be real for authored prose too; there is a test asserting
  the fixture contains none.

---

## Not done, in the order it matters

1. **The other twenty-two worlds.** ≈46,000 words of authored content, counted
   per world in `STORY_AUDIT.md` §1. Each needs *writing* in French, not
   rendering — the premise reaches the model verbatim and `voiceSamples` are a
   character's voice forever.
2. **`DEVICE_LOCALE_AUTODETECT` is still `false`**, in
   `packages/i18n/src/locale.ts`. It is the line that turns France on, and it is
   deliberately off: the UI catalogue is complete but only one world of
   twenty-three has French content, so a French phone would get a French
   interface wrapped around English worlds. Flip it when the catalogue is ready,
   not before. The explicit choice in Profile works today.
3. **A layout pass on a device.** `UI_AUDIT.md` §2.6 measures French UI labels
   at 1.37x mean inflation and 2.75x worst. The tab bar, the quality-tier row,
   the seven-across World Sheet strip and the paywall rows have never been seen
   on a small screen in French.
4. **`components.tsx` hardcodes English curly quotes** around dialogue. For
   French the recommendation is no quotation marks at all on a speaker-labelled
   block, which makes it a deletion.
5. Clitic target resolution and French world-authoring detection — 5 of the 39
   probes, both in `entity-resolution.ts`.
