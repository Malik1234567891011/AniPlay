# LOCALIZATION_ARCHITECTURE — where locale lives

**Nothing in this document has been implemented.** The repo has no
internationalisation at all — no library, no locale field, no resource bundle,
no `t()` call. See [`UI_AUDIT.md` §1](UI_AUDIT.md).

The first thing to get right is what kind of project this is.

> **`apps/mobile` is React Native 0.86 / Expo 57.** It is **not** SwiftUI.
> Apple String Catalogs (`.xcstrings`), `NSLocalizedString` and
> `AttributedString` markdown are **not** the architecture here, and any
> recommendation built on them is wrong for this codebase. `expo-localization`
> is not installed either.

---

## 1. The locale resolution chain

```
1. Explicit user choice           (Settings → Langue)   — wins, always
2. Session locale                 (frozen at session creation)
3. Device locale                  (expo-localization)
4. 'en'
```

**Rule: a session's locale is frozen when the session is created and never
changes.** A run started in French stays French forever, even if the player
changes the device language, reinstalls, or plays on a second device. The
alternative — resolving locale per request — produces a transcript that switches
language halfway down, which is unrecoverable: the memory facts, the authored
canon corrections and the prose are all already in the other language.

```ts
// packages/contracts/src/game/state.ts — additive, defaulted
locale: z.enum(['en', 'fr']).default('en'),
```

`GameState.locale` is authoritative. The API reads it, the director reads it,
the writer reads it, the client renders from it. `Accept-Language` is a *hint*
used only when creating a session.

**Only two locales exist for now.** Do not build a general framework for
languages nobody has written a bible for; build the seam, populate one locale,
and let the second one prove the seam.

## 2. Client-side i18n

### Decision

| Layer | Choice | Why |
| --- | --- | --- |
| Message catalogue | **`i18next` + `react-i18next`** | RN-proven, no native module, works in Expo Go, supports namespaces and per-key context/comments |
| Plurals | **`i18next-icu`** (ICU MessageFormat) | French needs the real CLDR categories. `n === 1` is wrong in French at **zero** |
| Number / date / currency | **`Intl`, with `@formatjs/intl-*` polyfills + `fr` data** | Pins one CLDR version across iOS and Android. See [`TYPOGRAPHY.md` §5.1](TYPOGRAPHY.md) |
| Device locale | **`expo-localization`** | |

The polyfill import must be the **first line of the app entry point**, before
anything that touches `Intl`. Hermes on iOS lacks `formatToParts` and
`notation: 'compact'`; Hermes on Android bridges to whatever ICU the OS shipped,
so the same code produces U+00A0 on one device and U+202F on another.

### What goes in a key

```json
{
  "wallet.restore": "Restaurer mes achats",
  "session.what_do_you_do": "Qu'est-ce que tu fais ?",
  "library.runs": "{count, plural, one {# partie} other {# parties}}"
}
```

Every ambiguous key ships with a **localizer comment**. The list of keys that
need one is already inventoried in [`UI_AUDIT.md` §3](UI_AUDIT.md) — `Save` is
save-to-library not rescue-a-person, `Draw` is draw-an-image not unsheathe,
`Leads` is investigative not leadership, `Turn` is a game turn.

### Extraction

`infra/scripts/i18n-extract.ts` (added on this branch, `npm run i18n:extract`)
walks `apps/mobile/src`, `packages/ui/src` and the server modules, and reports
every user-facing literal with its file and line. It is a **reporting tool, not
a codemod** — it changes nothing. It is what reproduces the ~380-string
inventory in `UI_AUDIT.md`, and it is what tells you when a new English literal
has been added after the catalogue was frozen.

## 3. Server-side strings — the part a client-only project misses

A `fr-FR` build that translated every `.tsx` string would still show
`Day 3 · 4:15 PM`, `Trending now`, and
`Might — Force, endurance, and raw physical power.`

| Site | What | Decision |
| --- | --- | --- |
| `services/api/src/server.ts:288-338` | Discover rail titles | **Send keys, render on the client** |
| `services/api/src/projections.ts:53-58` | Attribute names + explanations | **Send keys + localized text from the session locale.** Read aloud by VoiceOver |
| `packages/engine/src/clock.ts:44` | `` `Day ${n} · ${formatClock(m)}` `` | **Send structured `{ day, minutes }`; the client formats.** This string is *also* embedded in memory facts — see §5 |
| `packages/engine/src/clock.ts:30` | Day parts | Keys |
| `packages/engine/src/clock.ts:48` | Durations | Structured |
| `packages/engine/src/check.ts:172` | Difficulty bands | Keys |
| `relationshipLabel` (engine) | `Trusted`, `Rival`, … | **Keys — and two-form, because they agree with the character's gender.** See [`TERMINOLOGY.md` §3.4](TERMINOLOGY.md) |
| `packages/contracts/src/game/story.ts:1118` | `hour` / `${n} hours` | ICU plural |
| `packages/director/src/director.ts:707,736` | Memory facts as English prose | §5 |

**The general rule: a value that is displayed travels as a key and parameters; a
value that is read by a model travels as text in the session locale.** Some
values are both — `relationshipLabel` is shown in the UI *and* injected into the
writer prompt — and those need both forms produced from one source.

## 4. Prompt architecture — French is written, not translated

### The decision

| Option | Verdict |
| --- | --- |
| **A. English prose → translation model → French prose** | ❌ **Rejected** |
| **B. French story bible + French character voices + French player context + language-neutral world state → the model writes French from the first token** | ✅ **This one** |
| C. Hybrid — English director plan, French writer | ⚠️ Acceptable transitional step, §11 |

**Why A is rejected, on four independent grounds:**

1. **Latency.** The whole point of `fast-writer.ts` is that prose reaches the
   player at ~1.5 s instead of 12.6 s, by streaming a sentence at a time. A
   translation pass is a second serial model call that cannot start until the
   first has produced something and cannot stream cleanly — **it gives the 11
   seconds back.** This is not a tuning cost; it is the product's core
   improvement, reversed.
2. **Quality.** Rule B of the bible — *rhythm is content* — says the French must
   have the beat's own rhythm. A translation inherits the English one by
   construction. Every failure catalogued in
   [`LANGUAGE_BIBLE.md`](LANGUAGE_BIBLE.md) Part 0 is a translator's failure,
   made by professionals, on prose they had unlimited time with.
3. **Cost.** Translation doubles output tokens on the most expensive stage.
4. **Drift.** A pipeline that holds English prose in context per turn will leak
   English, and it gets worse as the session grows.

### What B actually requires

```
FRENCH                                LANGUAGE-NEUTRAL
─────────────────────────────         ──────────────────────────────
WRITER_POLICY_FR (authored)           BeatPlan (verbs, ids, numbers)
SAFETY_POLICY_FR                      Resolution (outcomes, mutations)
worldRules → premise_fr, tone_fr      scene ids, character ids
speaker briefs (voice, speech)        relationship scalars
memory facts (§5)                     resource values, flags, quest state
player setup answers (typed in FR)    QUALITY_TIERS budgets
addressMode (§6)
```

The right-hand column is already language-neutral, because the engine is
deterministic and speaks in identifiers. **That is the single biggest piece of
luck in this project**: `PlayerTurnRecord` hides engine internals, story content
lives in typed data structures rather than prose blobs, and the world state is
numbers and ids. A French world variant is a *data* problem, not a parsing one.

The left-hand column is the actual work, and none of it is translation:
`WRITER_POLICY_FR` is **authored in French from the bible**, not translated from
`WRITER_POLICY`. A translated policy would carry the English examples — and the
policy is mostly examples.

### The parity trap

> *"Two implementations of every AI stage, and the fast path is production. Any
> rule added to one silently misses the other."*
> — [`../authoring-principles.md`](../../authoring-principles.md)

`ModelWriter` and `fastWrite` both read `WRITER_POLICY`, `SAFETY_POLICY` and
`worldRules()` from `model-stages.ts`. **The French policies must live in the
same module, be selected by one `policyFor(locale)` function, and be locked by
an extension of `writer-parity.spec.ts`.** A French rule that lands only on the
structured writer is invisible: nothing fails, the prose just gets worse, on the
path production actually runs.

### Do current models write good native French directly?

**Yes for grammar. Not automatically for register**, and the failure is
predictable: an unprompted model writes French that is slightly literary,
connector-heavy, adjective-rich and passé-simple-curious — because that is what
is overrepresented in French training text relative to how young French people
actually write. In other words, **the default failure mode of the model is
exactly the documented failure mode of French translators.** Which is
convenient: the same constraints fix both.

Three mitigations, in order of value:

1. **Negative constraints in the policy**, stated as hard rules with examples —
   the bible's Part 0 is written to be pasted.
2. **French few-shot from French-authored text**, never from translated text. A
   French example that is itself a translation teaches the wrong thing.
3. ⚙ **The lints**, because a policy that is followed 90 % of the time is a
   policy that fails once every ten turns, and French players read every turn.

**And validate on the fast model, not the premium one.** `writer_fast` is
`gpt-4.1-mini` / `claude-haiku-4-5`, it is what `QUICK` runs, and it is the path
that streams. French register quality on the premium writer proves nothing about
what most players will read.

### Latency and token cost

| Effect | Size | Note |
| --- | --- | --- |
| Output tokens, writer | **+26 %** | French carries the same beat in more tokens. Directly on the per-turn cost |
| Output words | +11 % | The word budgets must rise with it — do **not** cut the French to hit an English number |
| Input tokens | +5–10 % | French policy text is longer; `worldRules` is in a system block that does not change within a session, so it is paid once per conversation, not once per turn |
| First-token latency | **unchanged** under option B | This is the whole argument for B |
| First-token latency | **+2–3 s** under option A | Unacceptable |
| Response cards | unchanged | Off the critical path by design — generated after the prose streams |

**Budget consequence:** at `VIVID` (60 credits, 260-word budget) the French turn
costs meaningfully more to serve than the English one. That is a pricing input,
not a reason to write thinner French. Flag it to whoever owns the economy before
launch, not after.

## 5. Memory must stop being English prose

The worst finding in the audit, and it is architectural.

```ts
// packages/director/src/director.ts:670-740
const HOSTILE_VERBS = {
  threaten: 'threatened and belittled',
  deceive:  'lied to',
  oppose:   'refused and stood against',
};
value: `${context.player.name} ${what} ${character.name} at ${context.scene.locationName}, ${context.scene.worldTimeLabel}.`
```

These are stored, retrieved, and handed to the writer as `speakers[].knows` and
to the choice generator as `remembered`. In a French session **the model would
read English sentences in its own context window every single turn** — the most
reliable way to induce language drift there is, and it compounds, because memory
accumulates. `worldTimeLabel` drags `Day 3 · 4:15 PM` in with it.

**They are not prose. They are structured facts wearing prose.**

### The fix

```ts
interface MemoryFact {
  readonly kind: 'HOSTILE_ACT' | 'PROMISE' | 'REVEAL' | 'GIFT' | ...;
  readonly actorId: string;
  readonly targetId: string;
  readonly verb: Verb;
  readonly locationId: string;
  readonly worldMinute: number;
  /** Rendered at read time, in the session locale. Never stored. */
  readonly text?: string;
}
```

Store the structure. Render at retrieval, in the session locale, through the
same message catalogue as everything else. Three consequences, all good:

- No English ever reaches a French context window.
- A session's memory is locale-portable — the same run is legible in either
  language, which makes QA comparisons possible at all.
- The facts become queryable. `HOSTILE_ACT` against character X is a predicate,
  where `"threatened and belittled"` was a string.

**This is the single change with the largest effect on French quality, and it is
worth doing for the English side regardless.** It should be proposed to the
English agent as an English-side improvement, because the French argument is not
the strongest argument for it.

## 6. `addressMode` — carrying tu/vous through the pipeline

The state model is in
[`DIALOGUE_AND_REGISTER.md` §2.2](DIALOGUE_AND_REGISTER.md). The plumbing:

| Layer | Change |
| --- | --- |
| `CharacterDef` | `addressMode: { toPlayer, toCharacter }` — **authored**, `fr` only, optional |
| `GameState` | per-pair current value + `pendingShift` |
| `speaker-brief.ts` | **projects it** — this is the file that exists precisely so both model stages cannot drift |
| `WRITER_POLICY_FR` | states it as a hard rule: *ne change jamais de toi-même* |
| Engine | sets `pendingShift` from relationship thresholds or authored quest steps |
| Writer | plays the shift **once**, then the engine clears it |
| ⚙ Lint | a beat that mixes `tu` and `vous` to the same singular addressee is a hard fail |

The lint must not flag `vous` when more than one person is being addressed —
check `presentCharacterIds` before firing.

`speaker-brief.ts` is the right home because the English side already learned
this lesson: *"`speaker-brief.ts` is the single projection both model stages use
so they cannot drift again."* `addressMode` is exactly the kind of authored
datum that gets written once and then never reaches the writer.

## 7. Language-drift defences

Five, in order of cheapness.

1. **No English text in a French context window.** §5, plus the policies, plus
   `relationshipLabel`, plus `worldTimeLabel`, plus difficulty bands.
2. ⚙ **A drift detector on output.** A French beat containing an English
   function word (`the`, `and`, `you`, `with`, `she`) outside a quoted proper
   noun is a validation failure, and `validator.ts` already exists as the place
   for it.
3. **Locale in the system block, not the user turn**, and stated once, plainly:
   `Tu écris en français de France. Tu ne traduis pas.`
4. **Structured output stays language-neutral.** Attitudes, mutation ids, media
   decisions and state deltas are identifiers. Only `text` fields are French.
5. **Session-scoped prompt caching helps here** — `worldRules` does not change
   within a session, so the French world description is paid for once and the
   model sees it identically every turn.

## 8. What is safe to build now, and what is not

**Safe now (Phase 1)** — additive, isolated, cannot conflict with the moving
English side:

- `infra/scripts/i18n-extract.ts` — reporting only.
- `infra/scripts/fr-lint.ts` — the French style linter.
- `infra/scripts/fr-parser-probe.ts` — the French-input evidence generator.
- These documents.

**Not safe yet** — every one of these touches a file another agent is editing,
or depends on English wording that is still moving:

- Wrapping any UI string in `t()`.
- Adding `locale` to `GameState`.
- French `VERB_LEXICON`.
- `WRITER_POLICY_FR`.
- Restructuring memory facts.
- Translating any world.

**One exception worth arguing for early**, because it is one line and it fixes a
live English bug: removing `'` from the dialogue-extraction character class in
`packages/director/src/parser.ts:438`. See
[`PLAYER_GRAMMAR.md` §2.2](PLAYER_GRAMMAR.md). That belongs to whoever owns the
parser; it should be handed to them, not taken.

## Phase 2 implementation sequence

Starts at `ENGLISH_FREEZE_COMMIT`. Ordered so that each step is verifiable
before the next depends on it, and so that the riskiest content work happens
after the infrastructure is proven on one world.

| # | Step | Gate |
| --- | --- | --- |
| **1** | `Intl` polyfills + `frDate()` + `normalizeForSearch()` + `frCollator`. No strings yet | Formatting snapshot tests pass on iOS **and** Android |
| **2** | `locale` on `GameState`, frozen at session creation; `expo-localization`; a hidden language switch | An `fr` session round-trips through the API and the database |
| **3** | i18next + ICU plurals; catalogue scaffolding; **English keys only**, `en` still renders identically | `npm run i18n:extract` reports zero un-keyed user-facing literals |
| **4** | Server strings → keys + params (§3). Client renders | `Day 3 · 16:15` renders correctly with no client-side string surgery |
| **5** | **Memory facts → structured (§5)** | No English reaches a French context window. Parity test |
| **6** | `PlayerIdentity.grammar` + the French `CharacterSetup` question | `Tu es arrivée` renders for a player who asked for it |
| **7** | fr catalogue populated from `UI_AUDIT` + `PRODUCT_VOICE`; a11y labels included | `npm run fr:lint` clean; layout pass on the six at-risk screens |
| **8** | `WRITER_POLICY_FR`, `SAFETY_POLICY_FR`, French `worldRules`, in `model-stages.ts`, both paths | `writer-parity.spec.ts` extended and green |
| **9** | `addressMode` (§6) end to end | T/V lint green across a full playthrough of Seven Days to Midnight |
| **10** | French `VERB_LEXICON`, `META_PATTERNS`, clitic resolution, stopword guard, `\p{L}` normalisation | `npm run fr:probe` shows no `custom` on the standard French corpus |
| **11** | Genre-aware French figurative-violence lexicon | French adversarial sweep passes |
| **12** | **One world in French, end to end.** Recommend **Nine Weeks** — no combat, the richest tu/vous arc, and the texting surface | 30-minute native playtest; no `c'est traduit` |
| **13** | Response-card cap raised / made locale-aware (`responses.ts:39`) | No silent `null` on French turns |
| **14** | Remaining nine worlds | Per-world audit in [`STORY_AUDIT.md`](STORY_AUDIT.md) |
| **15** | Store metadata, screenshots, ASO | [`APP_STORE_FRANCE.md`](APP_STORE_FRANCE.md) |

**Step 12 is the real gate.** Everything before it is infrastructure that can be
argued about; a French player finishing Nine Weeks without noticing is the only
evidence that matters.
