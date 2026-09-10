# fr-FR Phase 2 — checkpoint

Worktree `/Users/malik/AniPlay-fr-fr`, branch `localization/fr-fr`.
**Do not work in `/Users/malik/AniPlay` or `/Users/malik/AniPlay-stories`** —
other agents are live in both.

The standing constraint, above everything else in this file:

> **`en` and `fr` are both permanent, first-class product locales.** English is
> never replaced, degraded or routed through the French path. French is added
> *beside* it through a locale dimension. A change that makes French work by
> overwriting English is a regression, not a trade-off.

`ENGLISH_FREEZE_COMMIT` is withdrawn as a gate — see
`LOCALIZATION_ARCHITECTURE.md` § Phase 2 sequence. Only the mass world sweep,
final copy polish, store metadata and release QA wait for English to settle.

---

## State

**Steps 1-6 are all done, verified and pushed.** Working tree clean.
`origin/main` has nothing this branch lacks.

| # | Step | Status |
|---|---|---|
| 1 | `Intl` polyfills, `frDate`, `normalizeForSearch`, `frCollator` | done |
| 2 | `locale` on `GameState`, `expo-localization`, hidden switch | done |
| 3 | i18next + ICU, catalogue, English keys only | done, gate green |
| 4 | Server strings to keys + params | done |
| 5 | Memory facts to structured | done, parity spec green |
| 6 | `PlayerIdentity.grammar` + French `CharacterSetup` question | done |
| 7 | fr catalogue populated + a11y labels | NEXT |
| 8 | `WRITER_POLICY_FR`, `SAFETY_POLICY_FR`, French `worldRules`, both paths | todo |
| 9 | `addressMode` end to end | todo |
| 10 | French `VERB_LEXICON`, clitics, Unicode-aware normalisation | todo |
| 11 | Genre-aware French figurative-violence lexicon | todo |
| 12 | **One world in French, end to end** - the real gate | todo |

**Gates, by exit code:** `npm run typecheck` 0 - `npm test` 0 - `npm run lint` 0 -
`npx tsx infra/scripts/i18n-extract.ts --gate` **0** (47 exempt, 207 server,
1085 model) - `npm run fr:lint -- --self-test` 0 - `npm run fr:probe` 0
(37/39 still `custom`, which is step 10) - `npx expo export --platform ios` 0,
5.0 MB / 1076 modules.

**Catalogue:** 16 English area files under `packages/i18n/src/catalog/en/`,
~600 keys, each carrying its exact shipped English. French has `world`,
`memory`, `profile`, `setup` - step 7 populates the rest.

**Proof it is real**, one turn played through the rule-based pipeline in both:

```
en  clock: Day 1 - 3:30 PM   daypart: Afternoon   rel: Dai=Familiar
    - Dai Okonkwo was treated badly by player: Elodie threatened and
      belittled Dai Okonkwo at The Kosei Gym, Day 1 - 3:30 PM.
fr  clock: Jour 1 - 15:30    daypart: Apres-midi  rel: Dai=Familiarite
    - Dai Okonkwo a ete maltraite par le joueur : Elodie a menace et
      rabaisse Dai Okonkwo a The Kosei Gym, Jour 1 - 15:30.
```

(Accents stripped in this block only, to keep the file diffable.)

---

## Decisions made

### `@aniplay/i18n` is a leaf package

No workspace dependencies at all, so `@aniplay/contracts` can build
`LocaleSchema = z.enum(LOCALES)` on it without a cycle. Everything else
(`engine`, `director`, `ui`, `api`, `mobile`) depends on it.

### The polyfill is forced, not conditional

`@aniplay/i18n/polyfill` installs formatjs with `polyfill-force` on **every**
engine including Node, and is the first line of `apps/mobile/index.ts`. A
`shouldPolyfill()` gate would reintroduce exactly the divergence it exists to
remove and would make snapshot tests pass only on the machine that wrote them.

Measured cost, `expo export --platform ios --no-minify`: **2.7 MB → 4.7 MB**
Hermes bytecode, +22 modules. **1.37 MB of that is `add-all-tz`.**
`add-golden-tz` is 814 KB and covers every zone France needs (Paris, Réunion,
Martinique, Guadeloupe, Cayenne, Mayotte, Tahiti, Nouméa all verified) but
**throws `Invalid timeZoneName` on 4 of 11 exotic zones probed** (Ushuaia,
Antarctica/Troll, Kiritimati, Etc/GMT+5), which would silently fall those users
back to UTC dates. Kept `add-all-tz` on that basis. One-line change if 550 KB
matters more.

### `normalizeForSearch` folds apostrophes **before** NFKC, not after

Non-obvious and found by a failing test. U+00B4 and U+0060 are *spacing*
diacritics: NFKC decomposes them to space + combining mark, so a fold that runs
after normalisation turns `l´ami` into `l ami`. U+2019 has the opposite
problem — no decomposition at all — so it survives NFKC and must be folded
explicitly either way. Order is: fold apostrophes → NFKC → fold again →
ligatures → NFD → strip marks → lowercase.

### `Intl.Collator` has no formatjs polyfill

`search.ts` probes the engine's collator once against `l'ami`/`l’ami` and
`e`/`é` and falls back to comparing `normalizeForSearch` output if it fails
either. Deterministic on a Hermes build without full ICU.

### The narration font really is Georgia

`packages/ui/src/tokens.ts` → `NARRATION_FONT = 'Georgia'`. The CoreText probe
in `research/typography.md` measured **Georgia has no U+202F glyph**. So
`foldNarrowSpaces()` (U+202F → U+00A0, never U+0020) is load-bearing, not
theoretical, and `translate()` applies it to every string it returns.

### `GameState.locale` is the only authoritative copy

**No `story_sessions.locale` column.** State is already jsonb in
`session_snapshots.state`, every route that needs a run's locale has already
loaded its state, and `toSessionSummary` receives the state. A denormalized
column would buy a query nobody makes and could drift from what the writer
reads. `services/api/src/locale.spec.ts` scans `packages/` and `services/` and
asserts `createInitialState` is the **only** site that assigns `.locale` — the
scanner was canary-tested by planting a stray write, and it caught it.

`forkState` uses `structuredClone`, so a fork inherits the locale free. Asserted
rather than assumed.

### `user_settings.locale` is nullable with **no default**

`NULL` means *never chosen*, which is not the same as choosing English.
Defaulting it to `'en'` would have made the device hint permanently unreachable,
because a saved setting outranks it. Migration `0002_locale.sql`.

### `DEVICE_LOCALE_AUTODETECT = false` is the line that turns France on

In `packages/i18n/src/locale.ts`. Detection is complete and tested on both sides
(`expo-localization`, `Accept-Language`); the French copy behind it is not.
Handing a French-phone owner a half-translated app is worse than not detecting
them. Until step 7, French needs an explicit choice, and the switch is **seven
taps on the Profile heading**.

### The interface locale and a run's locale are different values

`AppState.locale` is the UI language and what a *new* run will be created as.
`GameState.locale` is frozen when the run is created and never moves. A player
with an English run and a French run sees each in the language it began in.

`LANGUAGE_NAMES` in `LibraryProfile.tsx` is the one string in the app that must
never be localized.

### Keying scheme

- One flat, dotted key space, `keySeparator: false`, so `wallet.restore` is one
  key rather than a path. Greps both ways.
- `TranslationKey` is **derived** from the English catalogue
  (`keyof typeof en`), so a typo is a compile error and a dead key is visible.
- Catalogue split by area under `packages/i18n/src/catalog/en/*.ts`, merged in
  `en/index.ts`. The split exists so parallel work never touches one file.
- ICU MessageFormat via `i18next-icu`, **never** `n === 1`. Zero is singular in
  French and plural in English, and step 6/8 need `select` for gender as well.
- **Not `react-i18next`.** It keeps its own copy of the current language — a
  second source of truth beside `AppState.locale` — and its `t` is typed
  `(key: string)`. `apps/mobile/src/i18n/useT.ts` is a typed hook over the
  shared instance instead.
- Non-React modules (`api/client.ts`, `auth/supabase.ts`, `store/purchases.ts`)
  take an injected `Translator` (`setTranslator` / `set translator`), pushed
  from `state/store.tsx` at boot and again on every language change. Chosen over
  attaching error *keys* because `ApiError.message` is rendered directly by
  eight screens; a key nobody reads would have been two mechanisms with one
  decorative.

### The extractor gate

`npm run i18n:extract -- --gate` exits 1 on any un-keyed **client** literal.
Server strings are step 4's and travel as keys; model strings are prompts and
are authored in French, never keyed. It now ignores navigation route names
inside `navigate()`-shaped calls, and honours `// i18n-exempt: <reason>` on the
line or the line above. The reason is mandatory and `--exempt` prints it, so the
exemption list stays argued rather than silent.

### Engine labels: split the decision from the wording

The single most reusable change in the session, and better English architecture
on its own.

- `dayPart()` returned a union of **English display strings**, so there was no
  way to ask "is it night?" without comparing against a word a translation would
  change. Now `DayPart` is an id union (`AFTERNOON`) plus
  `dayPartLabel(minute, locale)`.
- `relationshipLabel()` likewise → `relationshipTone()` + `relationshipLabel()`.
  This exposed a **live latent bug**: `director.ts` was doing
  `speaker.relationshipLabel === 'Rival'`, which a copy edit would have silently
  switched off and French would have broken outright. Fixed to compare the id.
- `dcBandLabel()` → `dcBandName()` + label. `outcomeLabel`, `proficiencyLabel`,
  `formatWorldTime`, `formatClock`, `formatDuration`, `formatDeadline` all take
  `locale: Locale = 'en'`, defaulted so untouched callers behave exactly as
  before.

### `context.ts` is the localization seam for the model

`packages/director/src/context.ts` is the projection **both** model stages read,
for the same reason `speaker-brief.ts` exists. Localizing there reaches the
streaming writer and the structured one **without touching `model-stages.ts` or
`fast-writer.ts`**, which are the active conflict surface. `state.locale` flows
in from there.

### Rail titles travel as keys; the world clock does not

The difference is ownership. A Discover rail title is interface chrome and
belongs to whoever is looking at the shelf, so it carries `titleKey` and follows
the language switch instantly. The world clock and the relationship label belong
to a **run**, are read by the writer, and are rendered server-side in that run's
frozen locale — an English `Day 3 · 4:15 PM` in a French context window is
exactly the drift §7 is about. `DiscoverRail` gained `titleKey`, `subtitleKey`,
`subtitleParams`, all additive; `title` stays as the rendered fallback.

### The French relationship ladder is state nouns, not adjectives

`Dévouement`, `Crainte`, `Confiance`, `C’est compliqué`, `Sur ses gardes`. A
French adjective describing a character must agree with that character's gender
and `CharacterDef` carries none, so `Dévoué` would be a coin flip on every NPC.
Nouns are invariable and read naturally as badges. Pinned as a whole-ladder
assertion in `packages/engine/src/locale.spec.ts` — a heuristic cannot tell
`Dévouement` from `Dévoué`, so the reviewed list *is* the test.

### `PlayerIdentity.grammar` is `.optional()`, not `.default()`

**This is the reasoning that was expensive to reach.** `z.infer` of a
`.default()` field is *required* in the inferred type. Making `grammar`
defaulted broke **29 spec files across five packages** that construct
`PlayerIdentity` object literals — including files other agents are editing on
`main`. `PLAYER_GRAMMAR.md` rule 3 says "additive and optional"; honouring that
literally costs zero fixture churn. Callers read it through
`playerGrammar(identity)`, which normalises `undefined` to
`DEFAULT_PLAYER_GRAMMAR` (`UNSPECIFIED`, empty `thirdPerson`).

### English output did change in exactly two classes, deliberately

Both must be in the final report.

1. **`1 turns` → `1 turn`.** ICU plurals corrected latent English bugs at
   `count === 1` in: `discover.continue_turns`, `worldsheet.milestones`,
   `worldsheet.map_a11y` (`1 places` → `1 place`),
   `worldsheet.fork_insufficient_credits` (`1 more credits` → `1 more credit`),
   `session.turns_left`, `session.more_credits_needed`,
   `characters.story_and_turns`, `characters.draw_for_credits`. Reproducing the
   old output would mean writing `one {# turns left}`, i.e. deliberately
   encoding a grammar bug. The Wallet agent took the opposite call where English
   genuinely never inflected, giving `one` and `other` identical English text.
2. **`formatCredits` uncompacted** was `value.toLocaleString()` with *no locale*,
   so an English session on a French phone rendered `10 000`. It now names its
   locale. Identical on an English phone; finally right on a French one.

`formatCredits` compact keeps its own arithmetic for English on purpose:
measured across 285 728 values, `Intl` compact disagrees with the hand-rolled
`K`/`M` on ~10 % of them (`10K` vs `10.0K`; `10 850` → `10.9K` vs `10.8K`).
French takes a separate branch, because `10 k` lowercase-with-a-space is not
producible by suffix concatenation.

### Step 5: the structure goes in `value`, not in a new field

`MemoryProposal` is a **stage-3 AI contract** - `packages/contracts/ai_contracts.json`
is authoritative and CLAUDE.md forbids the Zod twin diverging. Adding a field
would have meant changing what the model is asked to emit for a reason that has
nothing to do with the model. `value` is already `z.unknown()`: it is the escape
hatch, and a structured fact is what it was for. A proposal whose `value` is a
plain string - which is what a model produces - renders exactly as it did.

`text` is rendered **at storage time in the run's frozen locale**, not at each
read. A run's locale can never change, so a stored sentence can never be the
wrong language for the session reading it, and this is a far smaller diff than
making `text` computed at all eight read sites. The structure stays beside it,
so `renderFactText(proposal, story, name, 'en')` re-renders a French run in
English whenever QA needs to compare.

`HOSTILE_VERBS` was a table of English phrases and is now a list of verb ids.
The verb was always an id; it just had a sentence stapled to it. The wording is
an ICU `select` under `memory.hostile_act`.

### English-visible changes, the complete list

Everything else is byte-identical. These are the exceptions:

1. **ICU plurals corrected `1 turns` to `1 turn`** in eight keys:
   `discover.continue_turns`, `worldsheet.milestones`, `worldsheet.map_a11y`,
   `worldsheet.fork_insufficient_credits`, `session.turns_left`,
   `session.more_credits_needed`, `characters.story_and_turns`,
   `characters.draw_for_credits`. Reproducing the old output would mean writing
   `one {# turns left}` - deliberately encoding a grammar bug. Where English
   never inflected and was already correct, `one` and `other` were given
   identical English instead (the wallet keys).
2. **`formatCredits` uncompacted** was `value.toLocaleString()` with no locale,
   so an English session on a French phone rendered `10 000`. It now names its
   locale: identical on an English phone, correct on a French one.
3. **The credit-balance a11y label** in `components.tsx` had the same bug and
   spoke a French number to VoiceOver in an English session.

`formatCredits` **compact** keeps its own arithmetic for English on purpose:
measured across 285728 values, `Intl` compact disagrees with the hand-rolled
K/M on about 10 percent of them. French takes a separate branch.

### Found but deliberately not fixed

- `Dai Okonkwo cooled toward player: SOCIAL:threaten:FAILURE` - the
  warmed/cooled facts render `mutation.reasonCode` raw, so a database
  identifier reaches the writer as prose. Language-neutral, so not a French
  bug, but a bad prompt line **in English too**. Fixing it changes English.
- `abilities[].affordances` are parser-matched phrases. Translating an ability
  name while leaving them makes 86 abilities silently unreachable. Belongs with
  step 10.
- `Share.tsx` truncates at the last plain space, which in French can strand a
  non-breaking space before `!` or `?`. UI_AUDIT 2.5.
- `NarrationBlock` folds at 90 **words**; French carries the same beat in ~1.11x
  the words. Should be measured in rendered lines. Marked `i18n-exempt`.
- Brand still ambiguous: `app.json` says AniPlay, `rail.new` says
  "New on Plotbreak". The France store listing cannot be prepared around it.

---

## Next

Steps 7-12. Step 12 is the goal: a French player finishing a world without once
thinking *c'est traduit*.

1. **Step 7 - populate the French catalogue.** ~600 keys across 16 area files in
   `packages/i18n/src/catalog/fr/`. `world`, `memory`, `profile` and `setup`
   exist; the rest are missing and fall back to English at runtime.
   Parallelise the way step 3 was - one agent per area file, no shared writes,
   with `fr/index.ts` pre-wired first. Sources: `LANGUAGE_BIBLE.md`,
   `PRODUCT_VOICE.md` (tu always, sentence case), `TERMINOLOGY.md`,
   `ENGLISH_CALQUE_BLACKLIST.md`. Then flip `DEVICE_LOCALE_AUTODETECT` and
   promote the language switch out of its seven taps.
2. **Step 8 - `WRITER_POLICY_FR` / `SAFETY_POLICY_FR` / French `worldRules`.**
   `model-stages.ts` is on the forbidden list, so the seam is a
   `policyFor(locale)` in that module with the smallest possible diff, and
   `writer-parity.spec.ts` extended so a French rule cannot land on one path
   only. **The parity trap is the whole risk**: two implementations of every AI
   stage and the fast one is production.
3. **Step 9 - `addressMode`** in `speaker-brief.ts`, which exists precisely so
   both model stages cannot drift.
4. **Step 10 - French parser.** `parser.ts` and `entity-resolution.ts` are
   forbidden, so the lexicon is selected by locale rather than replaced.
   **Never translate `VERB_LEXICON`** - the English one has hard-won fixes
   (deck, beat, kick, hold) and French has a different set of
   figurative-violence traps. `npm run fr:probe` is the gate: 37/39 `custom`.
5. **Step 12 - the pilot world.** Nine Weeks was the recommendation (no combat,
   richest tu/vous arc, texting surface). Re-check against the catalogue as it
   stands before committing.

Merge `origin/main` - never rebase.

---

## Dead ends

- **Rebasing this branch onto `origin/main`.** It rewrote the published hashes
  and the push was non-fast-forward. Both `git push --force-with-lease` and
  `git merge -s ours` were **blocked by the permission classifier**. The fix
  that worked: a plain `git merge origin/localization/fr-fr`, which conflicted
  only on `LOCALIZATION_ARCHITECTURE.md` (add/add), resolved with
  `git checkout --ours`. Verified `git diff --stat HEAD` was empty afterwards.
  **From now on, merge `origin/main` into the branch; never rebase it.**
- **`add-golden-tz`** — throws on real IANA zones. See above.
- **`Intl` compact notation as a drop-in for `formatCredits`** — disagrees with
  the existing English on ~10 % of values. Not a refactor, a behaviour change.
- **`grammar: PlayerGrammar.default(...)`** — 29 spec files break. Use
  `.optional()`.
- **`// i18n-exempt:` at the top of a long comment block** — the extractor only
  looks at the line itself and the line directly above. Put the marker
  immediately above the offending line.
- **Piping a gate through `tail` to read it** hides the exit code. Redirect to a
  file, echo `$?`, then grep the file.
