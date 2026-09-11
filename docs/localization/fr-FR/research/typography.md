# French typography for fr-FR on React Native / Expo, iOS-first

Everything here is either quoted from an authority or **empirically measured**
on a Mac (Apple Foundation via `xcrun swift`, Node 22 / ICU 78, JavaScriptCore,
CLDR JSON from `unicode-org/cldr-json`, live scrapes of French sites). Measured
results are marked **[m]**.

## Apostrophe — U+2019, always

The correct French apostrophe is **U+2019 ’**. U+0027 is an ASCII compatibility
character. Antidote, the reference French correction software, states U+0027
"n'est pas recommandé en français" and replaces it by default.

**[m] What is actually used:** apple.com/fr and the French App Store use U+2019
throughout. French literature on Wikisource: 140 × U+2019, 0 × U+0027.
**Wikipédia FR is a deliberate outlier** — it mandates the straight apostrophe
in body text *because of full-text search*, having found 96.5% of articles used
it.

**Keyboards.** French AZERTY produces **U+0027**. iOS/macOS Smart Punctuation
converts it to U+2019 — **[m]** `NSUserQuotesArray` confirms the single-close
substitution is exactly U+2019, and the setting is **on by default**.
**Consequence: both forms will exist in your user data.**

**[m] Search implications, measured:**
```
"Aujourd’hui…".includes("l'aube")                            → false
Intl.Collator("fr",{sensitivity:"base"}).compare("l'ami","l’ami") → 0  ✅
Intl.Collator("fr").compare("l'ami","l’ami")                 → -1 ❌
"l’ami".normalize("NFKC")                                    → still U+2019
```
**NFKC will not save you** — U+2019 has no compatibility decomposition.

**Recommendation:** author and display U+2019; never match on it. One
`normalizeForSearch()` applied to needle *and* haystack:
```js
const normalizeFR = s => s
  .normalize("NFKC")                                   // folds U+00A0/U+202F/U+2026
  .replace(/[‘’ʼʹ′]/g, "'")
  .replace(/œ/g,"oe").replace(/Œ/g,"OE").replace(/æ/g,"ae")
  .normalize("NFD").replace(/\p{Diacritic}/gu, "")
  .toLowerCase();
```
Sort with `Intl.Collator("fr",{sensitivity:"base"})` — it already folds both.
Add a lint check that no French string contains `[a-zà-ÿ]'[a-zà-ÿ]`.

## Ellipsis — U+2026

No space before, one space after — except before `,` `?` `!` or a closing
guillemet, where the space is dropped. **[m]** `"…".normalize("NFKD")` → three
periods, so NFKC folds both forms for search for free.

**U+2026 has line-break class IN (Inseparable)** — it will not be split and will
not break before itself. Three ASCII periods can wrap badly. **Use U+2026** in a
text-heavy reading app.

Omitted quoted text: the Imprimerie nationale prefers **`[…]`** with no inner
space. **`etc…` is an error** — `etc.` and `…` never combine.

For dialogue, points de suspension mark interruption and hesitation. This is
**the workhorse punctuation of French interactive fiction** — Maupassant's
`serre… serre…` and `Alors… alors…` are the French equivalent of the English
hard fragment.

## Dashes

`—` U+2014 tiret cadratin · `–` U+2013 tiret demi-cadratin ·
`-` U+002D trait d'union · `‑` U+2011 trait d'union insécable.

**Incises — the key French/English divergence.** French **surrounds the dash
with spaces**; English (Chicago) closes them up. A straight port of English copy
reads wrong.
```
 U+0020 U+2014 U+00A0 …texte… U+00A0 U+2014 U+0020
```
Cadratin is traditional; **Albin Michel, Gallimard and Seuil prefer the
demi-cadratin for dialogue**. Both defensible — pick one, be consistent.

**Ranges use U+2013**, closed up for simple numerals (`1914–1918`), with fine
insécables when the bounds are compound (`octobre 2010 – mars 2020`). Never
U+2014 for a range.

## Parentheses

**No space inside French parentheses** — `texte (précision) suite`. This is one
of the few places French matches English. **Any "French adds a space before
punctuation" transform must not fire on `(` `)` `[` `]`.**

## Percent and currency

**`50 %` with a space** — a genuine divergence from English.
**[m] Which space: U+00A0**, confirmed identically by CLDR, Node/ICU 78,
JavaScriptCore, Apple Foundation, and live apple.com/fr.
**[m] Gotcha:** `"50 %".split(" ")` → `["50 %"]` — a plain-space split fails.

**Currency: symbol after, decimal comma, U+00A0 before the symbol.**
**[m]** `fr-FR` EUR 1234.5 → `1 234,50 €` where the **thousands separator is
U+202F and the pre-symbol space is U+00A0, in the same string.**
**[m]** `fr-FR` USD → `1 234,50 $US`, not `$`.

> **Never hand-format IAP prices.** Use StoreKit's localized string
> (`Product.displayPrice` / `localizedPrice`) verbatim. Formatting `product.price`
> yourself produces a string that differs from what App Store Connect and the
> receipt show — an App Review risk.

## Time

**`14 h 30`** is correct French typography — non-breaking spaces both sides.
`14h30` is incorrect but very common. `14:30` is the ISO/digital form and is
what CLDR uses.

**[m] Cross-engine divergence found:** `dateStyle:"medium", timeStyle:"short"`
gives Node/ICU 78 → `9 sept. 2025, 20:05` but **JavaScriptCore (the iOS engine)
→ `9 sept. 2025 à 20:05`**. Your iOS and Android builds will differ. Snapshot
tests asserting on this will be flaky.

**Recommendation:** clock times in UI → `HH:mm` via `Intl.DateTimeFormat`
(France runs on the 24-hour clock). Prose inside story text → `14 h 30` with
U+00A0. Build durations yourself — the CLDR NNBSP/no-space inconsistency is real.

## Numbers — the U+202F story

Decimal comma; thousands separated by a non-breaking space in groups of three.

**CLDR 34 (15 Oct 2018) changed the French group separator from U+00A0 to
U+202F**, shipping in ICU 63. **[m]** Current CLDR `fr`: decimal `,`,
group ` `, approximatelySign `≃` (U+2243, unusual).

**The three spaces you will meet in one fr-FR number:**
| Role | Codepoint |
|---|---|
| thousands group | **U+202F** |
| before `%` | **U+00A0** |
| before `€` | **U+00A0** |
| short unit (`3 h`, `5 km`) | **U+202F** |
| `HH 'h'` skeleton | **U+0020** |

**Do not "clean up" spaces in formatted numbers — you will break at least one.**

**[m] Parsing is broken by design:**
```
Number("1 234,50")     → NaN
parseFloat("1 234,50") → 1     ← silently wrong
```
Never round-trip a formatted French number. **[m]** Good news: JS `/\s/` and
`String.trim()` both handle U+00A0 and U+202F.

## Two things that will bite on RN/Expo iOS

**1. Hermes `Intl` is incomplete on iOS.**
`Intl.NumberFormat.prototype.formatToParts` is **unimplemented on iOS** (works
on Android) — facebook/hermes#1188. `notation:'compact'`, `signDisplay` also
unsupported. **Code using `formatToParts` works in dev on Android and silently
fails on iOS.** On Android, Hermes bridges to whatever ICU that OS release
shipped, so a pre-CLDR-34 device gives U+00A0 and a newer one gives U+202F.
**Recommendation: add `@formatjs/intl-*` polyfills with `fr` data**, imported
before any Intl use. It pins one CLDR version across platforms and is the only
way to get deterministic output and stable snapshot tests.

**2. Font coverage. [m] CoreText glyph probe:**
```
System UI, Helvetica, Palatino, Times, Menlo : all present
Georgia      : MISSING U+202F, U+2009
AvenirNext   : MISSING U+202F, U+2009
Baskerville  : MISSING U+2009
```
**[m]** Fallback widths at 17pt are inconsistent (Georgia NNBSP 3.40 vs space
4.10; AvenirNext 2.37 vs 4.25). **If the body font is Georgia or Avenir Next —
the norm for reading apps — U+202F in numbers renders from a fallback font at a
width the designer never chose.** Either ship a font with coverage or substitute
U+00A0 for display. **Do not substitute U+0020** — that reintroduces bad breaks.

## Dates

Day → month → year, **no comma before the year**. **Months and weekdays are
lowercase.** Non-breaking space between day number and month name.
**`1er` for the first only**; feminine `1re` (not `1ère`); then `2e`, `3e`
(not `2ème`).

**Accents on capitals are required** — Académie française: "en français,
l'accent a pleine valeur orthographique." `À SUIVRE`, never `A SUIVRE`.

**[m] ⚠️ The `1er` gap — confirmed bug source.** Neither CLDR/ICU nor Apple
applies the `1er` rule: `dateStyle:"long"` for 1 Jan gives `1 janvier 2026`.
Correct French is `1er janvier 2026`. Patch it:
```js
const frDate = d => {
  const s = new Intl.DateTimeFormat("fr-FR",{dateStyle:"long"}).format(d);
  return d.getDate() === 1 ? s.replace(/^1\b/, "1er") : s;
};
```
`Intl.PluralRules` gives `1er`/`2e` correctly but **cannot give the feminine
`1re`** — that needs your own gender flag.

**[m] ⚠️ Plural rules — `0` is SINGULAR in French.**
`Intl.PluralRules("fr-FR").select(0)` → `"one"` (English gives `"other"`).
So: **`0 chapitre`, `1 chapitre`, `2 chapitres`.** Any catalogue ported from
English gets the zero case wrong. French also has a **`many`** category
(millions/compact) that English lacks.

## Other notably-French details

**The punctuation-space rule is not one space.** Before `;` `!` `?` → **fine
insécable U+202F**. Before `:` → **U+00A0**. Inside guillemets → **U+00A0**.
**Recommendation for mobile: U+00A0 everywhere** except where CLDR forces U+202F
(number groups) — same semantics, universal font coverage.

**Guillemets.** Level 1 `« … »` U+00AB/U+00BB with U+00A0 inside. Level 2
nested: `“ ”` U+201C/U+201D. **[m]** Apple's `Locale("fr_FR")` quotation
delimiters are `«`/`»` — so iOS smart quotes with a French keyboard produce
guillemets. **Never use `"` U+0022 in displayed French.**

**Titles of works use French sentence case, not English title case.**
`Le Grand Meaulnes`, `À la recherche du temps perdu`. **Headings, buttons, tabs
→ sentence case**: `Nouvelle partie`, not `Nouvelle Partie`. Apple's French UI
is uniformly sentence case. Titles of works are **italicised**, not quoted.

**Abbreviations.** `M.` with period; `Mme`, `Mlle`, `Dr`, `Me`, `St` **without**
(the abbreviation ends with the word's last letter). `etc.` always with period,
never `etc…`. Non-breaking space before the name/number: `M. Lessard`.

**`n°` — everyone gets this wrong.** Correct is `n` + superscript o (`nᵒ`).
`n°` with U+00B0 is technically wrong but near-universal and acceptable in UI.
**`№` U+2116 is Russian/Bulgarian — do not use it in French.**

**Sigles** take no periods in modern usage: `SNCF`, not `S.N.C.F.`. Acronyms
pronounced as words take only an initial capital when lexicalised: `Unesco`.
Sigles keep the gender of the head noun: `la SNCF`, `l'ONU`, `des ONG`.

**`œ` U+0153 / `Œ` U+0152 are mandatory** — `cœur`, `sœur`, `œuvre`. `oe` is a
spelling error. **[m]** Present in every font probed including Georgia and
Avenir Next. NFKD does **not** decompose it — add explicit folding to
`normalizeForSearch()` or French users typing `oeuvre` find nothing.

**[m] Lists: no Oxford comma.** `Intl.ListFormat("fr-FR")` → `un, deux et trois`.

## Cheat sheet

```
U+2019 ’   apostrophe (author it; never match on it)
U+2026 …   ellipsis (no space before, space after; […] for elisions)
U+2014 —   incise & dialogue dash, SPACED (French ≠ English)
U+2013 –   ranges: 1914–1918
U+2011 ‑   non-breaking hyphen in proper nouns
U+00A0     before : « » % € units; between "21" and "janvier"; inside guillemets
U+202F     thousands group (CLDR); optionally before ; ! ?
U+00AB «   U+00BB »   quotes.  U+201C “ U+201D ”  nested only
U+0153 œ   U+0152 Œ   real ligature, mandatory
U+00B0 °   in "n°" (correct is superscript o; NEVER U+2116 №)
```

**Three transforms to write once:** `normalizeForSearch()` ·
`Intl.Collator("fr",{sensitivity:"base"})` for all sorting · `frDate()` to patch
`1 janvier` → `1er janvier`, which no formatter does for you.
