# STORY_AUDIT — the ten worlds, world by world

What is in the data, what has to be written in French, what must not be touched,
and in what order.

**Nothing here has been translated.** This is the work order.

---

## 1. The scope, measured

Walked over `LAUNCH_CATALOG` on this branch, counting authored prose fields and
excluding identifiers and asset keys:

| World | Authored chars | Prose fields | Cast | Locs | Items | Abilities | Quests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last Five | 37 530 | 719 | 11 | 11 | 6 | 10 | 5 |
| Blackwake | 35 879 | 601 | 6 | 6 | 12 | 10 | 10 |
| Red Moon Brigade | 35 377 | 658 | 9 | 9 | 12 | 20 | 5 |
| Seven Days to Midnight | 29 270 | 517 | 6 | 9 | 7 | 5 | 6 |
| The Unbound | 23 730 | 428 | 4 | 7 | 6 | 10 | 3 |
| The Tidewall | 23 621 | 437 | 4 | 7 | 6 | 12 | 3 |
| Nine Weeks | 21 913 | 395 | 4 | 7 | 5 | 6 | 3 |
| The Ninth Archive | 19 093 | 359 | 4 | 8 | 7 | 3 | 6 |
| The Understudy | 13 379 | 256 | 3 | 5 | 3 | 5 | 3 |
| The Salt Road | 12 984 | 235 | 3 | 5 | 4 | 5 | 2 |
| **Total** | **252 776** | **4 605** | **54** | **74** | **68** | **86** | **46** |

**≈ 46 000 words of authored world content**, before a single turn of runtime
prose. Reproduce with `npm run i18n:extract -- --worlds`.

This is the number that decides the schedule. It is not a translation job — the
premise is six paragraphs of real writing that reaches the model verbatim, the
`cardBlurb` is the Discover hook, the `voiceSamples` are what keeps a character
sounding like themselves, and every one of those has to be **written in
French**, by the standard in [`LANGUAGE_BIBLE.md`](LANGUAGE_BIBLE.md), not
rendered from the English.

## 2. What travels, per field

| Field | fr | Note |
| --- | --- | --- |
| `id`, `*Id`, `assetKey` | **never** | identifiers |
| `title` | ⚠️ **recommendation pending approval** | [`TERMINOLOGY.md` §1.3](TERMINOLOGY.md) |
| `hook` | **write in French** | one line, and it is the Discover card |
| `premise` | **write in French** | the biggest single piece; reaches the model verbatim as `worldRules` |
| `fantasyLabel` | **write in French** | goes under the title on the cover art |
| `toneGuide` | **write in French** | this is an instruction *to the model*, so it must be a French instruction |
| `hardCanon` | **write in French** | reaches the model every turn |
| `tags` | keys | `Pirates` → `Piraterie`, rendered from a key |
| `characters[].name` | **never** | |
| `characters[].role`, `cardBlurb`, `publicTraits`, `hiddenDrives`, `values`, `fears`, `socialStyle`, `boundaries`, `goals`, `secrets[].fact`, `speechStyle`, `appearance` | **write in French** | `speechStyle` is the one that decides whether the cast sounds French |
| `characters[].voiceSamples` | **write in French, from scratch** | ❗ a translated voice sample is a translated voice. This is the highest-value field per character in the catalogue |
| `characters[].topics` | **write in French** | used verbatim in generated text, so they must be grammatical French noun phrases |
| `characters[].pronouns` | ⚠️ | English strings today; French needs `il`/`elle`/`iel` |
| `locations[].name`, `shortName` | **never** | proper nouns |
| `locations[].description`, `artDirection` | **write in French** | `artDirection` feeds image prompts — **keep it English**, see §4 |
| `items[].name` | **never** | |
| `items[].description` | French | |
| `abilities[].name` | ⚠️ **translate, with frozen gender** | [`TERMINOLOGY.md` §4.2](TERMINOLOGY.md) |
| `abilities[].affordances` | ❗ **French phrases the parser matches on** | see §3 |
| `resources[].name` | translate | `Legs` → `Jambes`, `Blight` → `Corruption` |
| `quests[].title`, `step`, `directorNotes` | French | `directorNotes` is a model instruction |
| `endings[].name`, `when`, `epilogue` | French | `when` is the natural-language ending condition, read by the model |
| `factions[].name` | ⚠️ mixed | institution names translate (`la Neuvième Flotte`); coined names do not (`Emberclaw`) |
| `contentDescriptors` | keys | mapping already in [`UI_AUDIT.md` §4](UI_AUDIT.md) |

## 3. `abilities[].affordances` — the one that will be missed

```ts
// packages/director/src/parser.ts — matchAbility
for (const affordance of ability.affordances) {
  if (lower.includes(affordance.toLowerCase())) { … }
}
```

Affordances are **authored phrases the parser matches against the player's raw
text**. In English, Blackwake's `Ghost the Hold` matches on phrases a player
types. Translate the ability *name* and leave the affordances in English and
the ability becomes unreachable — silently, with no error, exactly like the
authored-progression bug the English side already paid for (*"39 flags and 16
events across the catalog that nothing could ever set"*).

**Every one of the 86 abilities needs its affordances re-authored in French**,
and re-authored means *how a French player would phrase it*, including:

- the infinitive and the `je` form (`ouvrir la brèche` / `j'ouvre la brèche`);
- the elided form (`j'ouvre`, not only `je ouvre`);
- the unaccented form, because phone typing drops accents;
- both apostrophes, `'` and `’`.

⚙ A catalogue test in the shape of `catalog.spec.ts` should assert that every
French ability has at least one affordance that the French parser actually
matches. `catalog.spec.ts` already holds the floor that *"a world must never
gate on an ability nobody can learn"*; this is the same class of unshippable.

## 4. `artDirection` stays English

Image prompts go to an image model. Those models are trained overwhelmingly on
English captions and produce worse results from French. `artDirection` is
**never shown to the player** — it is production data. Keep it English, and note
it in the field comment so a future translation pass does not "finish the job".

Same for `derive-assets.ts` keys and anything under `media/`.

## 5. Per-world audit

### Last Five — 37 530 chars · **the sports-lexicon world**

**Proper nouns held:** Dai Okonkwo, Kai Sumire, Jun Hasabe, Ena Torakawa, Bo
Ferrand, Nori Abe, Rei Amagi, Tsubame Kirisawa, Gora Vance, Mikael Sorrel, Yuki
Hoshizawa · Kosei, Seiran Academy, Hakuba West, Tessen Industrial, Onda
Commercial, Kurogane.

**Title:** `Le Cinq Majeur` — the French basketball term for a starting five.

**Translate:** `Legs` → `Jambes` · `Minutes` → `Minutes` · `Chemistry` →
`Alchimie` (**not** `Chimie`) · the ten abilities, which are all basketball
idioms and need French basketball idioms, not descriptions: `Get Downhill` →
`Attaquer le cercle` · `Pull Up` → `Tir en suspension` · `Find the Open Man` →
`Trouver l'homme libre` · `Face Up` → `Se mettre face au panier` ·
`Watch Film` → `Regarder la vidéo`.

**Traps.** ① The setting is a Japanese school; do not import the French school
system. ② `Take Him`, `Go Get It`, `Go To Work`, `Come Off It Clean` are all
imperatives that will collide with a French violence lexicon — this world is
where [`PLAYER_GRAMMAR.md` §2.6](PLAYER_GRAMMAR.md) gets tested. ③ Eleven
characters is the largest cast, so `nameKeys` collisions are most likely here,
and the French `TITLES` set (`coach`, `entraîneur`) must not swallow a name.

### Blackwake — 35 879 chars · **the vocabulary world**

**Proper nouns held:** Nessa Vale, Rook Arden, Mako Renn, Captain Veyra Sol,
Tolla Corrow, Harrow Bell · Saltmarket, The Marrow, Corrow's Yard, The Drift,
Stormlee, The Crownless Sea · the Stillpoint, the Hush.

**Title:** `Sillage Noir`.

**This is the world with the most research behind it and the most ways to get it
wrong.** Everything in [`research/nautical-pirate.md`](research/nautical-pirate.md)
applies. The five to fix before anything else: brig → `les fers` · set sail →
`appareiller` · quarterdeck → `le gaillard d'arrière` · take the helm →
`prendre la barre` · sailmaker → `le maître voilier`.

**Translate:** `Hull` → `Coque` · `Supplies` → `Vivres` (not `Fournitures`) ·
`Notoriety` → `Notoriété` · `Take the Deck` → `Prendre le pont` · `Rake Her` →
`L'enfiler par l'arrière` is a disaster — use **`La raser`** or
`Tirer en enfilade` · `Ghost the Hold` → `Passer par la cale`.

⚠️ **`The Marrow` is both an item (`The Marrow's Papers`) and a location.**
Resolve whether it is a ship or a place before assigning gender —
[`TERMINOLOGY.md` §4.2](TERMINOLOGY.md) flags this and it cannot be decided
after prose exists.

⚠️ Seven authored endings, with `epilogue` text. `The Crew Buries You Ashore`
is a death ending and its French must not soften — French translators soften
endings.

### Red Moon Brigade — 35 377 chars · **the gender-table world**

**Proper nouns held:** Captain Lyra Venn, Ren Calder, Dr Elian Voss, Commander
Serah Vale, Ossa Kerrin, Wick · Fort Ember, Kelder's Reach, The Ash Flats ·
The Vaultback, The Nettlejaw, The Quiet One.

**Title:** `Lune Rouge`. ⚠️ **never `La Brigade rouge`** — Brigate Rosse.

**Twenty abilities**, the most in the catalogue, and they are the invented-noun
gender minefield: `Plating`, `Full Plate`, `Live Wire`, `Arc`, `Shear Cry`,
`Shatter Note`, `Knitting`, `Reknit`, `Kite Step`, `Open Wing`, `Unseen`,
`Never Was`. Freeze every gender before a line of prose.

**Traps.** ① `Dr Elian Voss` — **`Dr` takes no period in French**. ②
`Instability` → `Instabilité` (f), and it is a resource whose label appears
next to a number. ③ Body horror is one adjective from `grand-guignolesque`.

### Seven Days to Midnight — 29 270 chars · **the regression-test world**

**Proper nouns held:** Mina Arclight, Theo Marr, Detective Sera Wynn, Elias
Crowe, Ivy Sable, Councillor Ada Harrow · Halcyon Bay, The Esplanade, The
Clock Tower, The Point.

**Title:** `Sept Jours avant minuit`.

**`Detective` → `Inspectrice`.** In France a `détective` is private; a police
one is an `inspecteur`/`inspectrice` or a `commandant`.

**Why this world is the regression test.** The loop replays the same beats, so
any wobble shows: an invented noun that changes gender between Tuesdays, a
character who tutoies on one loop and vouvoies on the next, a `1 janvier` that
should be `1er janvier`. The quest titles are literally times —
`Ten O'Clock, Tuesday` → **`Dix heures, mardi`** (lowercase `mardi`),
`Half Eleven, Wednesday` → `Onze heures et demie, mercredi`,
`Half Past Nine on Sunday` → `Neuf heures et demie, dimanche`. **Play this world
in French before shipping anything.**

### The Unbound — 23 730 chars

**Proper nouns held:** Renna Vosk, Tam Ashgrove, Sera Ilm, Reader Auber Kell ·
The Kiln Yard, Oyan House, The Night Market, The Concord Hall.

**Title:** `Les Déliés`.

Ten technique names, all needing frozen gender — the table is in
[`TERMINOLOGY.md` §4.2](TERMINOLOGY.md). `Reader Auber Kell` → the rank
`Reader` needs a French institutional word: **`le Liseur`** (coined, and good)
or `le Lecteur` (flat). ⚠️ `the Concord` → **do not** use `le Concorde` (the
aircraft) or `la concorde` (the abstract noun); keep `le Concord`.

### The Tidewall — 23 621 chars

**Proper nouns held:** Drillmaster Odalys Verne, Bec Tarrow, Hollis Ferrant,
Commander Sabel Ansett · The Muster Yard, The Eleventh Gate, The Longwatch Post.

**Title:** `Le Mur des marées`.

`Drillmaster` → **`instructeur`/`instructrice`**. `Blight` → recommend
**`la Corruption`** (f) over `le Fléau`, on the grounds that French fantasy games
have settled on it and players will recognise it. Five factions, all of which
are institutions and therefore translate: `The Iron March` → `la Marche de
fer` · `The Silent Rank` → `le Rang silencieux` · `The Longwatch` → `la Longue
Veille` · `The Bright Hall` → `la Salle claire` · `The Stillhand` → coin one and
freeze it.

Twelve abilities across five classes; class names are the identity of the world
and each needs a gender.

### Nine Weeks — 21 913 chars · **translate this one first**

**Proper nouns held:** Juno Vale, Teo Sandoval, Nadia Okonkwo, Cass Reyner ·
The Staff Cabins, The Longhouse Bar, The Dock, The Point.

**Title:** `Neuf Semaines`. ⚠️ collides with *Neuf semaines et demie*.

**Recommended as the Phase-2 pilot** (step 12 of the sequence in
[`LOCALIZATION_ARCHITECTURE.md`](LOCALIZATION_ARCHITECTURE.md)):

- No combat, so the French violence lexicon is not on the critical path.
- The richest tu/vous arc in the catalogue — nine weeks to spend on it.
- Slice-of-life romance is where spoken French either works or does not, with
  nowhere to hide behind genre vocabulary.
- Smallest cast with a real relationship system, so voice fingerprints are
  provable.
- The texting surface, which is the highest-density authenticity signal
  available and costs nothing.

`Talk` (resource) → **`Rumeur`** or `Ce qui se dit`, not `Parole`.

### The Ninth Archive — 19 093 chars

**Proper nouns held:** Mira Senn, Kael Ostrand, Warden Ysolde Farrow, Bram Ketch
· The Gate Arch, The Stacks, The Leads.

**Title:** `La Neuvième Archive`.

⚠️ **`Sigil Read` — `sigle` is a false friend in French** (it means an acronym).
Use `le sceau` or `le signe`: `Sigil Read` → **`Lire les sceaux`**.
`Veilstep` → `le Pas de voile` (m) · `Still Mind` → `l'Esprit calme` (m).
`Ward` → `le scellé` or `la protection`; pick one, and note that the quest
`The Ward Turned Red` becomes `Le scellé est devenu rouge`.

`The Leads` (a location) and `leads` (investigative) collide — the location is a
place name and holds; the common noun is `des pistes`.

### The Understudy — 13 379 chars · **the free-authenticity world**

**Proper nouns held:** Talia Renn, Oswin Deare, Marta Voss.

**Title:** `La Doublure` — the exact French theatre word, and it is the title.

French theatre vocabulary is a real closed register and using it correctly costs
nothing: `la générale`, `le filage`, `les italiennes`, `le plateau`,
`la coulisse`, `le régisseur`, `la couturière`, `le trac`. `Run It Again` →
**`On la refait`** · `Take the Note` → **`Prendre la note`** (a real rehearsal
term) · `Take the Stage` → `Entrer en scène`.

❗ **« Merde ! » is the French theatre good-luck wish.** If it appears, it must
not be rendered as an insult, and the world should use it deliberately — a
French player who has ever been backstage will register it instantly.

### The Salt Road — 12 984 chars · **the easiest, and the least forgiving**

**Proper nouns held:** Ferrow, Oren, Sabe · Ossun Gate, The Wrecks.

**Title:** `La Route du sel`.

Smallest, and the hardest to hide in: the prose is stripped, so every added
adjective shows. `Water` → `Eau` · `Strain` → `Épuisement` ·
`Salt Veil` → `Le voile de sel` · `Read the Flat` → `Lire la plaine` ·
`Ration` → `Rationner`.

**Lethal world.** Death text must not be softened, and French translators soften
death text. Sentence-count parity is the check.

## 6. The four unbuilt bibles

`docs/story-bibles/` holds four authored worlds not yet in `LAUNCH_CATALOG`.
They are the **cheapest French wins in the project**, because their proper nouns
and invented terms can be chosen with French in mind *before* the English data
exists.

| Bible | French opportunity |
| --- | --- |
| **WINDOW SEVEN** | The espionage research was built for it. `agent` vs `officier traitant`, `la Piscine` vs `la Boîte`, the `vous` that never breaks. Pick the French terms **now** and let the English data follow |
| **HUSH HOUSE** | `le fantastique` rather than horror. 2 h 13 is already a French-shaped time. Ayame's `vous → tu → vous` is authorable from the start |
| **GOOD MORNING, HUSBAND** | The premise contains a joke only French can tell: the player wakes up already being **tutoyé** by someone they do not remember |
| **PRIMAL CROWN** | Six faction names not yet frozen. Coin them from real French morphology and hyphenate the compounds, and the world will read as French-conceived rather than French-rendered |

**Recommendation: hand the French naming constraints to the world-authoring
agent now**, before those four are built. It costs them nothing and it is the
only chance in this project to have proper nouns that work natively in both
languages.

## 7. Order of work

| # | World | Why here |
| --- | --- | --- |
| 1 | **Nine Weeks** | The pilot. Proves spoken French, tu/vous and texting |
| 2 | **The Understudy** | Smallest cast, closed vocabulary, high authenticity per word |
| 3 | **The Salt Road** | Smallest total, and it proves the no-additions rule under pressure |
| 4 | **Seven Days to Midnight** | The regression test. Run it after 1–3 to catch drift |
| 5 | **The Ninth Archive** | Institutional French; medium size |
| 6 | **Last Five** | Needs the French violence lexicon finished first |
| 7 | **Blackwake** | Needs the nautical glossary frozen first; largest vocabulary risk |
| 8 | **The Tidewall** | Class names and factions |
| 9 | **The Unbound** | Ten techniques, all gendered |
| 10 | **Red Moon Brigade** | Twenty abilities, largest gender surface, body horror |
