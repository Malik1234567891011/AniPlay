# UI_AUDIT — every user-facing string, and what breaks in French

Audited at `77aeeb7` on branch `localization/fr-fr`. Nothing in this document has
been changed in code. This is the inventory and the damage report.

Reproduce the inventory with `infra/scripts/i18n-extract.ts` (added in this
branch — see [`LOCALIZATION_ARCHITECTURE.md`](LOCALIZATION_ARCHITECTURE.md)).

---

## 1. Headline finding

**There is no internationalisation in this repo. None.** Not a library, not a
locale field, not a resource bundle, not a single `t()` call. Every user-facing
string is an English literal inline in JSX or in a server module.

```
$ grep -rniE "i18n|getLocales|useTranslation|Intl\.(DateTimeFormat|NumberFormat)" apps packages services
(no application hits — only Postgres "LANGUAGE plpgsql" and .localeCompare sorts)
```

`apps/mobile` is **React Native 0.86 / Expo 57**. It is **not** SwiftUI, so
Apple String Catalogs (`.xcstrings`), `NSLocalizedString` and `AttributedString`
markdown are **not** the architecture here. Any recommendation built on those is
wrong for this codebase. `expo-localization` is not installed either.

**Scale:** 563 string literals matched the extractor across 20 files; after
removing routes, style tokens and identifiers, **~380 are genuinely
user-facing**, in 15 files.

| File | Candidates | Notes |
| --- | ---: | --- |
| `apps/mobile/src/screens/Session.tsx` | 69 | The main play screen. Highest risk. |
| `apps/mobile/src/screens/LibraryProfile.tsx` | 60 | Library + all settings copy. |
| `apps/mobile/src/screens/WorldSheet.tsx` | 58 | Seven tabs of labels. |
| `apps/mobile/src/screens/Misc.tsx` | 57 | Sign-in, reporting, creator teaser. |
| `apps/mobile/src/screens/Discover.tsx` | 35 | Rails, search, empty states. |
| `apps/mobile/src/screens/Wallet.tsx` | 33 | **Money. Highest correctness risk.** |
| `apps/mobile/src/screens/CharacterSetup.tsx` | 31 | **Player identity. Highest grammar risk.** |
| `apps/mobile/src/screens/StoryDetail.tsx` | 29 | Content descriptors, CTAs. |
| `packages/ui/src/components.tsx` | 27 | Design-system copy + a11y labels. |
| `apps/mobile/src/api/client.ts` | 48 (5 real) | Network error copy. |
| `apps/mobile/src/auth/supabase.ts` | 20 (12 real) | Auth error copy. |
| `apps/mobile/src/screens/Share.tsx` | 21 | Share sheet + `AniPlay` byline. |
| `apps/mobile/src/screens/Characters.tsx` | 19 | Portraits. |
| `apps/mobile/src/store/purchases.ts` | 10 | **Store error copy. Money.** |
| `apps/mobile/src/navigation.tsx` | 21 (4 real) | Tab labels. |

Plus **server-side user-facing English** that no client-side i18n can reach —
see §5.

---

## 2. Concrete breakages, with evidence

These are not "needs translating". These are wrong or broken once the locale is
France, independent of any string work.

### 2.1 Naive pluralisation — `packages/ui/src/components.tsx:57`

```ts
`${formatCredits(story.runs, true)} ${story.runs === 1 ? 'run' : 'runs'}`
```

Exactly the `word + "s"` pattern that must never exist. French needs
`1 partie` / `2 parties`, and French plural rules differ from English at zero
(`0 partie` — **singular** in French, plural in English). Every count in the app
must move to a plural-aware formatter. Inventory of counted nouns:

| Site | English | French plural trap |
| --- | --- | --- |
| `components.tsx:57` | `run` / `runs` | `0 partie` is singular in fr |
| `LibraryProfile.tsx:133,206` | `${n} turns` | `0 tour`, `1 tour`, `2 tours` |
| `WorldSheet.tsx:212` | `${n} milestones` | `0 étape` singular |
| `Session.tsx:1237` | `${n} turns left` | idem |
| `LibraryProfile.tsx:155` | `its ${n} turns will be gone` | idem |
| `Wallet.tsx:109,152,174` | `${n} credits added/restored/claimed` | `1 crédit` / `2 crédits` |
| `components.tsx:406` | `${overflow} more changes` | `1 changement` |
| `Misc.tsx` report list | counts | idem |
| `Wallet.tsx:404-406` | `in ${n} min` / `${h}h` / `${d}d` | `j` not `d` in French |

CLDR gives French two plural categories that matter here — `one` (covers **0 and
1**) and `other`. Hardcoding `n === 1` is wrong in French even if you translate
the words.

### 2.2 Hardcoded US dollars — `apps/mobile/src/screens/Wallet.tsx:262,291`

```ts
storePrices[offer.productId] ?? `about $${offer.referencePriceUsd.toFixed(2)}`
storePrices[offer.productId] ?? `$${offer.referencePriceUsd.toFixed(2)}`
```

When the StoreKit price is unavailable the app shows **`$2.99`** to a French
user. Wrong currency, wrong symbol, wrong position, wrong decimal separator.
France writes `2,99 €` — comma, space (nonbreaking), symbol trailing.

This is a monetisation-clarity problem, not a cosmetic one: the brief says never
obscure cost. The fix is not to translate the fallback — it is to
**stop having a hardcoded-currency fallback** and render the tier as unavailable
until StoreKit answers, or to format `referencePriceUsd` through
`Intl.NumberFormat` with an explicit currency and a "prix indicatif" label.
`referencePriceUsd` being *named* USD is itself the smell.

### 2.3 `toLocaleString()` with no locale, on Hermes

Six sites: `tokens.ts:159`, `components.tsx:660`, `StoryDetail.tsx:161`,
`Wallet.tsx:227,347`, `LibraryProfile.tsx:133,206`, `Misc.tsx:405`.

Two problems. First, no locale argument means "whatever the runtime decides",
which is not a decision anyone made. Second — and this is the RN-specific trap —
**Hermes ships without full ICU by default.** Where `Intl` is absent or stubbed,
`Number.prototype.toLocaleString()` degrades to `toString()` and
`Date.prototype.toLocaleDateString()` produces a non-localised form. So the
French user may get `10000` where they expect `10 000`, and an English-shaped
date. This must be verified on a real device build before any locale work is
declared done — it is a *silent* failure.

Also `tokens.ts:160-161` compacts to **`K`** and **`M`**. French compact
notation is `10 k` (lowercase k, with a space) and `1 M`. `Intl.NumberFormat`
with `notation: 'compact'` handles it; the hand-rolled version cannot.

### 2.4 English curly quotes hardcoded in the design system — `components.tsx:316`

```ts
`“${text}”`
```

The client draws `“ ”` around every dialogue line. This is *correct* layering —
`fast-writer.ts` deliberately strips quotes so "the presentation is one decision
in one place" — but the one place is hardcoded to the English convention.
French uses `« … »` with inner spacing. This single constant is where the
Plotbreak French quotation convention gets implemented. See
[`TYPOGRAPHY.md`](TYPOGRAPHY.md) for the convention decision (short answer: for
speaker-labelled blocks the UI already names the speaker, so **no quotation
marks at all** is the recommendation, and that makes this line a deletion rather
than a translation).

### 2.5 Word-count truncation — `components.tsx:326`

```ts
`${words.slice(0, 90).join(' ')}…`
```

"Read more" collapses at 90 *words*. Measured on matched prose, French carries
the same content in **1.11× the words** — so the French fold hides ~10% more of
the beat than the English one, and the cut lands in a different place relative
to the meaning. Truncation should be measured in rendered lines, not words.

Same class of bug in `Share.tsx:293`: `cut.slice(0, cut.lastIndexOf(' '))` cuts
at the last space, which in French can strand a nonbreaking space before `!`/`?`
and leave the punctuation orphaned on the next line.

### 2.6 Layout: measured French width inflation

Real translations of real strings from this app:

```
UI label mean inflation: 1.37×      worst: "Save" → "Enregistrer" (2.75×)
"Report history"      14 → 27 chars (1.93×)  "Historique des signalements"
"Delete run"          10 → 19 chars (1.90×)  "Supprimer la partie"
"Sign out"             8 → 14 chars (1.75×)  "Se déconnecter"
"Browse worlds"       13 → 20 chars (1.54×)  "Parcourir les mondes"
"Not interested"      14 → 21 chars (1.50×)  "Ça ne m'intéresse pas"
"Fork this run · 120 credits" 27 → 36 (1.33×)
```

Short labels inflate worst, and short labels are exactly what tab bars, buttons
and chips are made of. Screens to physically test with French strings loaded:
tab bar (`navigation.tsx:110-116`), the quality-tier selector
(`Session.tsx:1195-1238` — four tier names plus "not enough" plus a turns-left
count in one row), choice cards, `CharacterSetup` field labels, the paywall
rows, `WorldSheet`'s seven tab labels (`Overview/Character/Inventory/Quests/
People/Map/Timeline` → `Aperçu/Personnage/Inventaire/Quêtes/Personnes/Carte/
Chronologie` — `Chronologie` is 11 chars against `Timeline`'s 8, in a
seven-across tab strip).

**Do not shrink type to preserve English dimensions.** Choice cards are the
France stress test: they already carry detailed prose, and French adds ~13% of
characters on top of that.

### 2.7 Choice-card cap will clip French — `packages/director/src/responses.ts:39`

```ts
text: z.string().max(320)
```

Measured French inflation on real choice cards: **1.13× characters**. A card the
English model writes at 300 characters becomes ~339 in French and **fails zod
validation**, which makes `generateResponses` return `null` and the player gets
*no cards at all* on that turn. This is a silent quality cliff, not an error.
The cap needs to be locale-aware or simply raised to ~380.

### 2.8 Title case

Good news: the app is mostly already sentence case (`Save story`,
`Report this story`, `Turn quality`, `Delete account`). A handful are
Title-Case-ish and must not be calqued into French Title Case:
`Wallet & purchases`, `Report history`, `Restore purchases`, `Daily credits`,
`Credit pack`, `Pack bonus`, `Welcome credits`, `Timeline fork`,
`Best value`, `First purchase`, `Trending now`, `For you`, `All worlds`,
`New on Plotbreak`. French: `Portefeuille et achats`, `Historique des
signalements`, `Restaurer mes achats`, `Crédits quotidiens`, `Pack de crédits`,
`Tendances`, `Pour toi`, `Tous les mondes`, `Nouveautés sur Plotbreak` — first
word capitalised, nothing else. See [`PRODUCT_VOICE.md`](PRODUCT_VOICE.md).

### 2.9 Brand string inconsistency (English-side, flagged not fixed)

`app.json` `name: "AniPlay"`, `Share.tsx:245` `· AniPlay`, `WorldSheet.tsx:103`
`AniPlay`, `state/store.tsx` keys `aniplay.*` — but `services/api/src/server.ts:330`
says **`New on Plotbreak`** and every doc says Plotbreak. The App Store plan
assumes **PLOTBREAK** is the name. This belongs to the English agent; noted here
because the France store listing cannot be prepared around an ambiguous brand.

### 2.10 Accessibility labels are strings too

~40 of the inventoried strings are `accessibilityLabel` / `accessibilityHint`
values, e.g. `components.tsx:660`:

```ts
accessibilityLabel={`${balance.toLocaleString()} credits. Opens wallet.`}
```

VoiceOver in French must read French. These are easy to miss in a translation
pass because they never appear on screen. They are listed in the extractor
output and must be in the resource bundle.

---

## 3. Strings that need a localizer comment

Ambiguous without context. These must ship with comments in the resource file.

| Key | English | Why it is ambiguous |
| --- | --- | --- |
| `discover.save` | `Save` | Save-to-library, not save-a-file and not rescue-a-person. → `Enregistrer` (never `Sauver`). |
| `discover.saved` | `Saved` | State, not past action. → `Enregistré`. |
| `session.turn.*` | `Turn` | A game turn (`tour`), not a rotation and not "turn into". |
| `wallet.turn_settled` | `Turn settled` | Ledger accounting. → `Tour débité`. |
| `worldsheet.leads` | `Leads` | Investigative leads (`pistes`), not "leads" as in leadership or a lead actor. |
| `worldsheet.closed` | `Closed` | A quest route closed off (`fermée`), not "closed" as in shut. |
| `storydetail.shape` | `Shape` | The shape of the story's structure. Needs a France-native rethink, not a word. |
| `session.stop` | `Stop` | Stop *generation*. → `Arrêter`, not `Stop`. |
| `library.fork` | `Fork` | Branch a run. `Bifurquer` / `Nouvelle branche` — decide once. |
| `characters.draw` | `Draw` | Draw an image. → `Dessiner`, not `Tirer`. **Also collides with the parser verb `draw` = unsheathe.** |
| `worldsheet.pin` | `Keep this` | Pin to canon. → `Épingler`. |
| `quality.*` | `Quick/Vivid/Cinematic/Apex` | Brand or description? See [`TERMINOLOGY.md`](TERMINOLOGY.md). **Do not rename without approval.** |
| `session.earlier_beats` | `↑ Earlier beats` | Scroll affordance. |
| `misc.report.*` | reason list | Legal/safety text — needs review, not a translator's judgement. |

---

## 4. Content descriptors — `StoryDetail.tsx:36-44`

Player-facing, and a France ratings surface. Current mapping and the French
these should become:

| Key | English | fr-FR |
| --- | --- | --- |
| `FANTASY_VIOLENCE` | Fantasy violence | Violence fantastique |
| `ROMANCE` | Romance | Romance |
| `SUGGESTIVE_THEMES` | Suggestive themes | Sous-entendus sexuels |
| `HORROR` | Horror | Horreur |
| `PSYCHOLOGICAL_THEMES` | Psychological themes | Thèmes psychologiques |
| `ALCOHOL_REFERENCES` | Alcohol references | Références à l'alcool |
| `LANGUAGE` | Strong language | Langage grossier |
| `PERMANENT_DEATH` | Permanent death | Mort définitive |
| `MORAL_AMBIGUITY` | Moral ambiguity | Ambiguïté morale |

`Langage grossier` is the established French wording (PEGI FR uses
*Grossièreté de langage*); `Langage fort` is a calque. Note the enum keys stay
English — they are IDs.

---

## 5. Server-side English the client cannot localise

This is the part a naive "translate the app" pass misses entirely, because these
strings are generated on the server and arrive over the wire already in English.

| Site | String | Problem |
| --- | --- | --- |
| `services/api/src/server.ts:288-338` | `Featured`, `For you`, `Trending now`, `New on Plotbreak`, `All worlds` | Discover rail titles are built server-side. |
| `services/api/src/projections.ts:53-58` | `Might`, `Agility`, `Mind`, `Presence`, `Resolve`, `Arcana` + a sentence of plain-language copy each | Attribute names AND their explanations. Also read aloud by VoiceOver (`WorldSheet.tsx:223`). |
| `packages/engine/src/clock.ts:44` | `` `Day ${n} · ${formatClock(m)}` `` | **English word + 12-hour AM/PM clock.** France uses 24-hour. And this string is *also* embedded in memory facts (below). |
| `packages/engine/src/clock.ts:30` | `Dawn/Morning/Midday/Afternoon/Evening/Night/Late night` | Day parts. |
| `packages/engine/src/clock.ts:48` | `a moment`, `${n} min`, `${h}h ${m}m` | Durations. |
| `packages/engine/src/check.ts:172` | difficulty band copy | `Routine/Easy/Moderate/Hard/Very hard/Exceptional`. |
| `relationshipLabel` (engine) | `Trusted`, `Rival`, `Hostile`, … | Shown in UI **and** injected into the writer prompt. |
| `packages/contracts/src/game/story.ts:1118` | `hour` / `${n} hours` | Naive plural, server-side. |
| `packages/director/src/director.ts:707,736` | `` `${player} attacked ${char} at ${loc}, ${timeLabel}.` `` | See §6 — the worst one. |

**Consequence:** localisation cannot be a client-only project. A `fr-FR` build
that translates every `.tsx` string would still show `Day 3 · 4:15 PM`,
`Trending now` and `Might — Force, endurance, and raw physical power.`

---

## 6. The English that reaches the French writer

`packages/director/src/director.ts:670-740` builds memory facts as **English
prose sentences**:

```ts
const HOSTILE_VERBS = {
  threaten: 'threatened and belittled',
  deceive:  'lied to',
  oppose:   'refused and stood against',
};
value: `${context.player.name} ${what} ${character.name} at ${context.scene.locationName}, ${context.scene.worldTimeLabel}.`
```

These are stored, retrieved, and handed to the writer as `speakers[].knows` and
to the choice generator as `remembered`. In a French session the model would be
reading **English sentences in its own context window every single turn** —
which is the single most reliable way to induce language drift, and it gets
worse the longer the session runs, because memory accumulates.

They are not really prose. They are structured facts wearing prose. The fix is
architectural and is specified in
[`LOCALIZATION_ARCHITECTURE.md` § Memory](LOCALIZATION_ARCHITECTURE.md#5-memory-must-stop-being-english-prose).

---

## 7. Player identity — the grammar surface

`CharacterSetup.tsx` collects the player's identity and it is the only place the
app can learn what it needs for French agreement.

```ts
// packages/contracts/src/game/state.ts:10-21
export const PlayerIdentity = z.object({
  displayName: z.string(),
  pronouns: z.string().default('they/them'),   // free text
  ageBand: z.string().nullable().default(null),
  archetypeId: z.string().nullable().default(null),
  worldKnowsAboutYou: z.string().max(300).default(''),
  advanced: z.record(z.string()).default({}),
  portraitAssetId: z.string().nullable().default(null),
}).strict();
```

```tsx
// CharacterSetup.tsx:143-146
<Field label="Pronouns" placeholder="e.g. he/him — or write anything" />
// CharacterSetup.tsx:86
const DEFAULT = 'they/them';
```

**There is no grammatical gender field, and `pronouns` is an English free-text
string.** `they/them` tells a French writer nothing about `arrivé` vs `arrivée`,
and the field cannot be repurposed because players are explicitly invited to
"write anything" in it.

This is the single largest *product* gap for French, not just the largest
translation gap. Full analysis and the proposed schema in
[`PLAYER_GRAMMAR.md`](PLAYER_GRAMMAR.md).

Also note `CharacterSetup.tsx` placeholders are authored English prose that
*teaches the player how to answer* — `"e.g. I ran messages for the lower-city
courts until someone noticed I could read the seals."` These are not UI labels.
They are writing, and they must be **written in French**, not translated, or the
first thing a French player reads in the product is a translation.

---

## 8. What is already right

Worth recording so it does not get "fixed":

- `fast-writer.ts` strips quotation marks and lets the client draw them. That is
  exactly the layering French needs — the wire format stays speaker-labelled and
  the presentation convention is one constant.
- `PlayerTurnRecord` hides engine internals, so there is no numeric formatting
  leaking into ordinary play.
- Sentence case is already the house style in most of the app.
- `accessibilityLabel`s exist and are thorough. They need translating, but they
  do not need inventing.
- Story content lives in typed data structures (`packages/test-fixtures`), not
  in prose blobs, so a French world variant is a data problem, not a parsing one.
