# TYPOGRAPHY — the decisions

The measurements are in [`research/typography.md`](research/typography.md) —
CLDR, ICU 78, JavaScriptCore, Apple Foundation and live French sites, compared
on this machine. **This document does not repeat them. It decides.**

Every decision below is one line in a resource file or one helper, and every one
of them is a thing a French player notices when it is wrong.

---

## 1. The Plotbreak French quotation convention

### Decision

| Case | Convention |
| --- | --- |
| **A dialogue block with a speaker label** | **No quotation marks at all** |
| Speech inside a narration block | `« … »` with U+00A0 inside |
| Speech nested inside that | `“ … ”` |
| Anywhere | **never** `"` U+0022 |

Rationale for the first row: the UI already draws the block and names the
speaker. French typography has no tradition of quoting a line that is already
attributed by a label, and `packages/ui/src/components.tsx:316` currently
hardcodes the **English** convention:

```ts
`“${text}”`
```

For French this line is a **deletion**, not a translation — the cheapest change
in the entire project. See [`UI_AUDIT.md` §2.4](UI_AUDIT.md).

### Consequence for the writer

The French writer must be told to write speaker-labelled dialogue **without**
guillemets, because `fast-writer.ts` cannot currently strip them and the client
will wrap what it receives:

```
Mako Renn: « On lève l'ancre. »
  → block text = "« On lève l'ancre. »"
  → client renders “« On lève l'ancre. »”      ← measured, see §5
```

## 2. The apostrophe

**Author and display U+2019 `’`. Never match on it.**

AZERTY produces U+0027; iOS Smart Punctuation converts to U+2019 and is **on by
default**, so **both forms will exist in user data**. `NFKC` does not fold them —
U+2019 has no compatibility decomposition.

One helper, applied to needle *and* haystack:

```js
const normalizeFR = (s) => s
  .normalize('NFKC')                                   // folds U+00A0 / U+202F / U+2026
  .replace(/[‘’ʼʹ′]/g, "'")
  .replace(/œ/g, 'oe').replace(/Œ/g, 'OE')
  .replace(/æ/g, 'ae').replace(/Æ/g, 'AE')
  .normalize('NFD').replace(/\p{Diacritic}/gu, '')
  .toLowerCase();
```

Sort with `Intl.Collator('fr', { sensitivity: 'base' })` — it folds both forms
and both accent states for free. Plain `Intl.Collator('fr')` does **not**.

⚙ Lint: no French display string may contain `[a-zà-ÿ]'[a-zà-ÿ]` — that is a
straight apostrophe inside a word.

⚙ Every French regex that touches player text uses `['’]`, never `'`. See
[`PLAYER_GRAMMAR.md` §2.2](PLAYER_GRAMMAR.md), where the shipped parser treats
the ASCII apostrophe as a quotation delimiter.

## 3. Spaces before punctuation — the mobile decision

The correct rule is three different spaces. **We ship two.**

| Before | Correct | **Plotbreak ships** |
| --- | --- | --- |
| `;` `!` `?` | U+202F (fine insécable) | **U+00A0** |
| `:` | U+00A0 | U+00A0 |
| inside `« »` | U+00A0 | U+00A0 |
| before `%` `€` | U+00A0 | U+00A0 |
| thousands group | U+202F (CLDR) | **U+202F**, from `Intl` — never hand-written |

**Why U+00A0 instead of U+202F before `? ! ;`:** a CoreText glyph probe found
U+202F **missing from Georgia and Avenir Next** — the two most likely body fonts
for a reading app — and the fallback renders at a width the designer never
chose (Georgia 3.40 vs 4.10 at 17 pt). U+00A0 has universal coverage and
identical semantics. **Do not substitute U+0020**: that reintroduces the bad
line break, which is the entire reason the space is non-breaking.

**Never** insert a space before `(`, `)`, `[`, `]`. Any "French adds a space
before punctuation" transform that fires on brackets is broken.

⚙ Lint: `[^  ][?!;:]` in a French display string is a fail, except
inside a URL, a time (`14:30`), or a ratio.

## 4. Numbers, money, dates

| Thing | Ship | Never |
| --- | --- | --- |
| Decimal | `2,99` | `2.99` |
| Thousands | `10 000` (U+202F, from `Intl`) | `10,000` |
| Currency | **StoreKit's `displayPrice`, verbatim** | any hand-formatted price |
| Reference price fallback | **remove it** — see below | `about $2.99` |
| Percent | `50 %` (U+00A0) | `50%` |
| Clock, UI | `16:15` | `4:15 PM`, `16 h 15` |
| Clock, prose | `16 h 15` (U+00A0 both sides) | `16h15` |
| Date | `10 septembre 2026` · `10/09/2026` | `09/10/2026`, `10 Septembre` |
| First of month | **`1er janvier`** | `1 janvier` |
| Ordinal, feminine | `1re` | `1ère` |
| Ordinals | `2e`, `3e` | `2ème`, `3ème` |
| Compact | `10 k`, `1 M` | `10K`, `1M` |
| Duration | `3 j`, `2 h`, `15 min` | `3d`, `2h` |
| Lists | `un, deux et trois` | Oxford comma |
| Months, weekdays | lowercase | `Septembre`, `Mardi` |

**Never hand-format an IAP price.** Use StoreKit's localized string verbatim;
formatting `product.price` yourself produces a string that differs from what App
Store Connect and the receipt show, which is an App Review risk.
`apps/mobile/src/screens/Wallet.tsx:262,291` currently falls back to
`` `about $${offer.referencePriceUsd.toFixed(2)}` `` — **a French user is shown
`$2.99`.** The fix is not to translate the fallback; it is to stop having a
hardcoded-currency fallback. The field being *named* `referencePriceUsd` is
itself the smell.

**Two patches no formatter gives you:**

```js
// 1er — neither CLDR/ICU nor Apple applies this rule.
const frDate = (d) => {
  const s = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(d);
  return d.getDate() === 1 ? s.replace(/^1\b/, '1er') : s;
};

// Zero is SINGULAR in French. Intl.PluralRules('fr-FR').select(0) === 'one'.
// Any catalogue ported from English gets the zero case wrong.
```

**Never round-trip a formatted French number.** `Number("1 234,50")` → `NaN`;
`parseFloat("1 234,50")` → `1`, silently wrong.

## 5. What actually renders on the device

Three RN/Expo-specific hazards, all measured, all silent.

### 5.1 Hermes `Intl` is incomplete on iOS

`Intl.NumberFormat.prototype.formatToParts` is **unimplemented on iOS** and works
on Android (facebook/hermes#1188). `notation: 'compact'` and `signDisplay` are
also unsupported. Code that works in dev on Android **fails silently on iOS**.

On Android, Hermes bridges to whatever ICU the OS release shipped — so a
pre-CLDR-34 device gives U+00A0 for the thousands group and a newer one gives
U+202F, in the same app.

**Decision: add `@formatjs/intl-*` polyfills with `fr` locale data, imported
before any `Intl` use.** It pins one CLDR version across both platforms and is
the only way to get deterministic output and stable snapshot tests.

### 5.2 `toLocaleString()` with no locale

Six sites: `tokens.ts:159`, `components.tsx:660`, `StoryDetail.tsx:161`,
`Wallet.tsx:227,347`, `LibraryProfile.tsx:133,206`, `Misc.tsx:405`. No locale
argument means "whatever the runtime decides", and where `Intl` is stubbed
`Number.prototype.toLocaleString()` degrades to `toString()`. The French user
gets `10000`. **Silent.** Every site moves to an explicit formatter.

`tokens.ts:160-161` hand-rolls `K` and `M`. French is `10 k` and `1 M`.

### 5.3 Cross-engine divergence in dates

`dateStyle:"medium", timeStyle:"short"` gives Node/ICU 78 `9 sept. 2025, 20:05`
and **JavaScriptCore `9 sept. 2025 à 20:05`**. iOS and Android builds differ.
**Snapshot tests asserting on this are flaky** unless the polyfill pins it.

### 5.4 Measured: the fast writer breaks on French punctuation

Run `npm run fr:probe`. All four are current behaviour on this branch.

| Input | Result |
| --- | --- |
| `Mako Renn: On lève l'ancre.` | ✅ DIALOGUE, attributed |
| `Mako Renn` + U+0020 + `: …` | ✅ DIALOGUE — the plain space happens to be in the character class |
| `Mako Renn` + **U+00A0** + `: …` — **correct French** | ❌ **NARRATION** — attribution lost |
| `Mako Renn` + **U+202F** + `: …` — also correct French | ❌ **NARRATION** |
| `Élodie Renn: …` | ❌ **NARRATION** — `[A-Z]` and `\w` are ASCII-only |
| `Mako Renn: « On lève l'ancre. »` | ⚠️ DIALOGUE, but the guillemets survive into the block and the client wraps them: `“« … »”` |
| `« Vous n'avez pas le besoin d'en connaître. » Elle repose la tasse.` | ❌ flushes as `« Vous … connaître.` then `» Elle repose la tasse.` — **the closing guillemet is orphaned onto the next chunk, mid-stream, in front of the player** |

Causes, all in `packages/director/src/fast-writer.ts`:

```ts
const SPEAKER_LINE = /^([A-Z][\w'’ -]{0,40}):\s*(.+)$/;   // ASCII-only; no É; no nbsp
function balancedQuotes(t){ return (t.match(/[“”"]/g) ?? []).length % 2 === 0; }  // no « »
/^([\s\S]*?[.!?…]["'’”]?)(\s+)([\s\S]*)$/                 // no » after the terminator
/^(["'“”‘’])([\s\S]*)(["'“”‘’])$/                          // stripQuotes: no « »
```

Consequences beyond cosmetics: an unattributed line loses the speaker's portrait
and the speaker name, **and** — per the file's own comment — narration containing
the player's name is rewritten to "you", so a character addressing the player by
name comes out mangled. `balancedQuotes` counting zero guillemets means a
multi-line French speech splits into orphan narration blocks, which is exactly
the bug that comment was written to close.

⚠️ `Mme`, `M.`, `Dr`, `etc.` also false-split the sentence flusher. `M.` takes a
period, `Mme`/`Mlle`/`Dr`/`Me`/`St` do **not** (the abbreviation ends with the
word's last letter), so the exposure is limited to `M.` and `etc.` — but it is
real, and `etc.` ends sentences often.

## 6. Character-level requirements

| Character | Rule |
| --- | --- |
| `œ` U+0153 / `Œ` U+0152 | **Mandatory.** `cœur`, `sœur`, `œuvre`. `oe` is a spelling error. Present in every font probed. **NFKD does not decompose it** — fold explicitly or a player typing `oeuvre` finds nothing |
| Accented capitals | **Mandatory**, including `À` and `É`. `À propos`, `Écrire`, `ÉCOLE`. Dropping them is a cheap, obvious tell |
| `…` U+2026 | Single character. Line-break class *Inseparable*, so it cannot be split; three ASCII periods can |
| `—` U+2014 | Incises, **spaced in French**: ` — texte — `. Never closed up |
| `–` U+2013 | Ranges: `1914–1918`. Never U+2014 |
| `‑` U+2011 | Non-breaking hyphen inside proper nouns |
| `n°` | `n` + U+00B0 is acceptable in UI. **`№` U+2116 is Russian — never** |
| Sigles | No periods: `SNCF`, `DGSE`. Gender follows the head noun: `la SNCF`, `l'ONU` |
| `[…]` | For elided quoted text, no inner space. **`etc…` is an error** |

## 7. Layout consequences

Measured on real strings from this app: **mean UI-label inflation 1.37×**,
worst `Save` → `Enregistrer` at **2.75×**. Prose inflation is 1.11× in words;
response cards 1.13× in characters.

| Screen | Risk |
| --- | --- |
| Tab bar (`navigation.tsx:110-116`) | Four labels, worst case |
| Quality-tier selector (`Session.tsx:1195-1238`) | Four tier names + "not enough" + a turns-left count, one row |
| `WorldSheet`'s seven tabs | `Chronologie` (11) against `Timeline` (8), seven across |
| Choice cards | Already carry prose; +13 % on top |
| `CharacterSetup` field labels | |
| Paywall rows | |
| Cover titles | Two lines of ~15 chars, hard cap — see [`TERMINOLOGY.md` §1.3](TERMINOLOGY.md) |

**Do not shrink type to preserve English dimensions.** And do not truncate by
word count: `components.tsx:326` folds at 90 *words*, so the French fold hides
~10 % more of the beat and lands somewhere different relative to the meaning.
**Truncate by rendered lines.** `Share.tsx:293` cuts at the last space, which in
French can strand a non-breaking space before `!`/`?` and orphan the punctuation.

## 8. The three helpers to write once

```
normalizeForSearch()   — §2, applied to needle and haystack
frCollator             — Intl.Collator('fr', { sensitivity: 'base' }) everywhere
frDate()               — patches `1 janvier` → `1er janvier`, which nothing does for you
```

Plus the polyfill import, which must be the **first** line of the app entry
point, before anything that touches `Intl`.
