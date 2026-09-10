# TERMINOLOGY — the frozen words

Three jobs: decide which words never change, decide which words change once and
then never again, and **assign a grammatical gender to every invented noun
before a single line of French prose is written.**

That last one is not a nicety. French gender propagates into every article,
every adjective and every past participle in every branch of every run. A gender
flip mid-corpus is a rewrite, not a find-and-replace.

> **Nothing in this document has been applied to code.** World titles and
> quality-tier names are **recommendations pending approval**, per the standing
> instruction not to rename them unilaterally.

---

## 1. Proper nouns — what never moves

### 1.1 The rule

> **The title of a work is translated. The proper nouns inside it are not.**

One rule, applied to all ten worlds. **Consistency beats the choice itself** —
the #1 structural complaint against *Le Trône de fer* was not that Sola
translated names, it was that he translated `Smallwood` and `Umber` while
keeping `Winterfell`, `Littlefinger` and `Hightower`. The result is tonal
confusion, and French readers named it. Glénat took the same public beating for
over-translating One Piece (`Katakuri` → *Dent-de-chien*). French genre readers
raised on fan translations expect names to survive.

### 1.2 Never translated, never accented, never spaced

| Category | Examples |
| --- | --- |
| **The brand** | `PLOTBREAK` |
| **Character names** | Mira Senn · Kael Ostrand · Dai Okonkwo · Kai Sumire · Mako Renn · Captain Veyra Sol · Mara Ellison · Kaia Thorn · Ayame Kurose · Hana Mori |
| **Place names** | Saltmarket · Stormlee · Fort Ember · Halcyon Bay · Kosei · Oyan House · Kelder's Reach |
| **Faction names** | The Ninth Fleet · The Free Captains · The Kiln · The Long Quiet · Emberclaw |
| **Item names** | Vane's Compass · Nori's Cut · The Stillpoint |
| **Enum keys / IDs** | `FANTASY_VIOLENCE`, `sv_blackwake_1`, `QUICK` — these are identifiers, not text |

**Titles and ranks attached to a name *are* translated**, because they are common
nouns doing a job: `Captain Veyra Sol` → `la capitaine Veyra Sol`,
`Drillmaster Odalys Verne` → `l'instructrice Odalys Verne`,
`Warden Ysolde Farrow` → `la gardienne Ysolde Farrow`,
`Commander Serah Vale` → `la commandante Serah Vale`,
`Detective Sera Wynn` → `l'inspectrice Sera Wynn` (**not `détective`**, which in
France is private), `Councillor Ada Harrow` → `la conseillère Ada Harrow`,
`Dr Elian Voss` → `le Dr Elian Voss` (**no period on `Dr` in French**).

Note that `shortName()` and `nameKeys()` in
`packages/contracts/src/game/names.ts` carry an English `TITLES` set. A French
build needs `capitaine`, `instructeur`, `instructrice`, `gardien`, `gardienne`,
`commandant`, `commandante`, `docteur`, `maître`, `madame`, `monsieur`,
`mademoiselle`, `sœur`, `frère`, `père`, `mère`, `saint`, `sainte`, `le`, `la`,
`les`, `l'`, `du`, `de`, `d'` — and the file's own comment already anticipates
this by calling the set *"deliberately short and English-only"*.

### 1.3 World titles — recommendations, pending approval

The cover compositor lays the title out at **at most two lines of ~15
characters** (`infra/scripts/cover-title.ts:42-59` — *"a three-line title means
the title is too long"*). French titles run longer than English ones, so the
constraint is real and each candidate below is checked against it. Titles are
composited as SVG text over the art, so re-rendering in French is cheap; the art
itself does not change.

French title capitalisation is **not** English Title Case: capitalise the first
word, and if it opens with an article, everything up to and including the first
noun.

| World | ✅ Recommended | Chars | Alternatives / notes |
| --- | --- | ---: | --- |
| The Ninth Archive | **`La Neuvième Archive`** | 19 → 2 lines | `Le Neuvième Fonds` is the technical archival word and colder |
| The Understudy | **`La Doublure`** | 11 → 1 line | Exact theatre term. Also means "lining" and "stand-in" — the ambiguity is a gift |
| The Salt Road | **`La Route du sel`** | 15 → 1 line | |
| The Tidewall | **`Le Mur des marées`** | 17 → 2 lines | `Marémur` if a coined single word is wanted |
| The Unbound | **`Les Déliés`** | 10 → 1 line | `délié` is "unbound" and, in calligraphy, "the fine upstroke" — quietly perfect. `Les Affranchis` collides with *Goodfellas* in France |
| Nine Weeks | **`Neuf Semaines`** | 13 → 1 line | ⚠️ collides with *Neuf semaines et demie* (*9½ Weeks*). Flagged, not fatal, but a 13+ romance should know |
| Red Moon Brigade | **`Lune Rouge`** | 10 → 1 line | Full form `La Brigade de la Lune rouge` is 27 and will not fit. ⚠️ **never `La Brigade rouge`** — Brigate Rosse |
| Seven Days to Midnight | **`Sept Jours avant minuit`** | 23 → 2 lines | |
| Blackwake | **`Sillage Noir`** | 12 → 1 line | `sillage` is exactly "wake". Keeping `Blackwake` is also defensible — but then *every* title stays English |
| Last Five | **`Le Cinq Majeur`** | 14 → 1 line | **`le cinq majeur` is the French basketball term for the starting five.** The title is the premise |

If the decision is instead to keep all ten in English, that is a coherent
position — but it must be **all ten**, with a French `fantasyLabel` under each
on the Discover card, the same shape as the `Playable Anime` decision in
[`PRODUCT_VOICE.md`](PRODUCT_VOICE.md).

### 1.4 The brand-name blocker

`app.json` says `AniPlay`; `Share.tsx:245`, `WorldSheet.tsx:103` and the
`aniplay.*` storage keys say `AniPlay`; `services/api/src/server.ts:330` says
**`New on Plotbreak`**; every document says Plotbreak. **The France store
listing cannot be prepared around an ambiguous brand.** English-side decision,
flagged here because it blocks [`APP_STORE_FRANCE.md`](APP_STORE_FRANCE.md).

---

## 2. Anime and manga vocabulary — what stays Japanese or English

**Do not explain any of this.** France is one of the largest manga markets in
the world. A gloss on what a `shōnen` is reads as an American product talking to
Americans, and it is the fastest way to lose the audience this product is for.

### 2.1 Stays as-is, with its French gender

| Term | Gender | Note |
| --- | --- | --- |
| `un anime` | **m** | plural `des animes`. **Already the French word** — this is why `Playable Anime` works as brand positioning |
| `un manga` | m | `des mangas` |
| `un manhwa` / `un manhua` | m | |
| `un webtoon` | m | |
| `un shōnen` / `un shōjo` / `un seinen` / `un josei` | m | macrons optional; `shonen` is the common spelling in French |
| `un isekai` | m | |
| `un otaku` | m | in France **not pejorative**, unlike in Japan |
| `senpai` / `kōhai` / `sensei` | — | used bare, as address. No article, no gloss |
| `un mecha` | m | |
| `une waifu` | f | |
| `tsundere` / `yandere` / `kuudere` | — | adjectival, invariable |
| `un scan` / `la scantrad` | m / f | French fandom's own word for scanlation |
| `un OAV` | m | **the French acronym for OVA.** Using `OVA` is the tell |
| `un one-shot` · `un arc` · `un tome` · `un chapitre` | m | |
| `un dorama` | m | live-action series |

### 2.2 The genuinely French fandom words

These have no English equivalent and their presence is a strong authenticity
signal, because a translator would never produce them:

| Term | Meaning |
| --- | --- |
| **`VOSTFR`** | version originale sous-titrée français — the single most-used word in French anime fandom |
| **`VF`** | version française (dubbed) |
| **`la VOSTFR ou la VF ?`** | a real, constant, identity-defining argument |
| `le simulcast` | what Crunchyroll FR and ADN call same-day episodes |
| `un scantrad` | fan translation |
| `un ship` / `shipper` | kept English, conjugated French: `je les shippe` |
| `spoiler` / `un spoil` | **`un spoil`** is the French clipping. `divulgâcher` is Quebec and would be a tell |

### 2.3 Never do this

- Never write `dessin animé japonais` for `anime`. It is what a 55-year-old
  journalist writes.
- Never write `bande dessinée japonaise` for `manga`.
- Never gloss `senpai`, `sensei`, `otaku`, `isekai`, `shōnen`.
- Never `divulgâcher`, `courriel`, `baladodiffusion` — Quebec.
- Never `animé` with an accent when the noun is meant: `un animé` is a past
  participle meaning "animated", and `animé interactif` shifts the meaning to
  "interactive cartoon".

---

## 3. Plotbreak product terms

The core lock is in [`PRODUCT_VOICE.md`](PRODUCT_VOICE.md) § Terminology lock and
is not repeated. What follows extends it into the story and engine surfaces.

### 3.1 Story and engine vocabulary

| Concept | fr-FR | Gender | Never |
| --- | --- | --- | --- |
| beat | **un temps** *(prose)* / **une scène** *(UI)* | m / f | `un beat`, `un battement` |
| canon | **le canon** | m | fine as-is; `épingler` for pinning |
| milestone | **une étape** | f | `un jalon` (project-management register) |
| promise (seeded) | **une promesse** | f | |
| arc | **un arc** | m | |
| ending | **une fin** | f | `un final`, `une finale` |
| run / playthrough | **une partie** | f | `un run` |
| fork | **une bifurcation** / `repartir d'ici` | f | `un fork`, `forker` |
| turn | **un tour** | m | `un round`, `un tirage` |
| quest | **une quête** | f | `une mission` unless the world is military |
| quest step | **une étape** | f | |
| lead (investigative) | **une piste** | f | `un lead` |
| relationship | **une relation** | f | |
| trust / affection / respect / fear / rivalry | `la confiance` · `l'affection` · `le respect` · `la peur` · `la rivalité` | f·f·m·f·f | |
| memory fact | **un souvenir** | m | `un fait mémoire` |
| world state | **l'état du monde** | m | |
| transcript | **le fil** | m | `la transcription` (a legal document) |
| reaction frame | **une réaction** | f | |
| cover / key art | `la couverture` / `l'illustration` | f | |
| composer (the box) | `la barre` / `le champ` | f / m | never surfaced to the player anyway |

### 3.2 Attributes — `services/api/src/projections.ts:53-58`

Server-side, and **read aloud by VoiceOver** (`WorldSheet.tsx:223`), so these
must be French before any French build is playable.

| EN | ✅ fr-FR | Gender | Never |
| --- | --- | --- | --- |
| Might | **Force** | f | `Puissance` |
| Agility | **Agilité** | f | |
| Mind | **Esprit** | m | `Mental` |
| Presence | **Présence** | f | `Prestance` is warmer; pick one and freeze |
| Resolve | **Volonté** | f | ❌ **`Résolution`** — a screen setting or a New Year's promise |
| Arcana | **Arcanes** | m. pl. | `Arcane` singular |

Each ships with a sentence of plain-language copy. Those sentences are **writing,
not labels** — write them in French, do not translate them.

### 3.3 Difficulty bands — `packages/engine/src/check.ts:172`

Not shown in ordinary play by design, but they exist and reach the model.

`Routine` → **Routine** · `Easy` → **Facile** · `Moderate` → **Moyen** ·
`Hard` → **Difficile** · `Very hard` → **Très difficile** ·
`Exceptional` → **Exceptionnel**

### 3.4 Relationship labels

Shown in UI **and injected into the writer prompt**, so a French session with
English labels is a language-drift vector.

`Trusted` → **Proche** · `Friendly` → **Cordial** · `Neutral` → **Neutre** ·
`Wary` → **Méfiant** · `Rival` → **Rival** · `Hostile` → **Hostile** ·
`Devoted` → **Dévoué** · `Afraid` → **Effrayé**

⚠️ These agree with the character's gender. `Méfiante`, `Rivale`, `Dévouée`.
A label rendered from a flat string table will be wrong half the time — this is a
**two-form** entry, not a one-form entry.

### 3.5 Time — `packages/engine/src/clock.ts`

| EN | fr-FR |
| --- | --- |
| `Day 3 · 4:15 PM` | `Jour 3 · 16:15` |
| Dawn | `Aube` |
| Morning | `Matin` |
| Midday | `Midi` |
| Afternoon | `Après-midi` |
| Evening | `Soir` |
| Night | `Nuit` |
| Late night | **`Fin de nuit`** — not `Tard dans la nuit` |
| `a moment` | `un instant` |
| `${n} min` | `${n} min` |
| `${h}h ${m}m` | `${h} h ${m}` — prose form `14 h 30`, UI form `14:30` |
| `${n}d` | `${n} j` — **`j`, not `d`** |

### 3.6 Quality tiers — recommendation, pending approval

The enum keys (`QUICK`, `VIVID`, `CINEMATIC`, `APEX`) are identifiers and do not
change. The **labels** are player-facing.

| Key | EN label | ✅ fr-FR | Note |
| --- | --- | --- | --- |
| `QUICK` | Quick | **Rapide** | |
| `VIVID` | Vivid | **Intense** | `Vif` is correct and reads thin |
| `CINEMATIC` | Cinematic | **Cinéma** | `Cinématique` in French games means a **cutscene** — a genuine false friend, and using it here would be read as "this tier plays a video" |
| `APEX` | Apex | **Apex** | Latin, reads modern in French, keep |

Section header `Turn quality` → **`Qualité de la scène`**, not
`Qualité de tour`.

---

## 4. Grammatical gender for invented nouns

**There is no codified French rule for assigning gender to an invented noun.** It
is translator discretion, which means it is *our* discretion, which means it has
to be written down before anyone writes prose.

### 4.1 The heuristics, in priority order

1. **Semantic anchoring** — the invented thing *is* a kind of something French
   already has a word for, and it takes that word's gender. `le Stillpoint` is a
   *ship* → `un navire` → **masculine**.
2. **Ending analogy** — `-e`, `-ie`, `-ure`, `-elle`, `-esse`, `-tion`, `-té` →
   feminine; consonant-final, `-on`, `-eur`, `-ard`, `-in`, `-al`, `-ment` →
   masculine.
3. **Borrowed proper nouns default masculine**, unless (1) or (2) overrides.
4. **Sigles keep the gender of their head noun** — `la BLM` (boîte),
   `le BR` (bulletin), `l'OT` (officier).

### 4.2 The frozen table

Extend this file, never a local decision. An entry here is load-bearing.

**Blackwake / Sillage Noir**

| Noun | Gender | Because |
| --- | --- | --- |
| `le Stillpoint` | m | a ship → `un navire` |
| `le Hush` | m | a ship |
| `la Marrow` | f | ⚠️ decide: if it is the *ship*, masculine; if it is the *place* (Saltmarket district), feminine by `la ville`. **Currently both an item and a location — resolve before writing** |
| `le Drift` | m | a stretch of sea → `un courant` |
| `la Crownless Sea` | f | → `la mer` |
| `le Ninth Fleet` | f → **`la Neuvième Flotte`** | a fleet is `une flotte`; the name is translated because it is a rank-style institution, not a proper noun |
| `les Free Captains` | m. pl. | → `les capitaines` |
| `le gaillard d'arrière`, `la hune`, `la vigie`, `les fers` | see [`research/nautical-pirate.md`](research/nautical-pirate.md) | |

**Red Moon Brigade / Lune Rouge**

| Noun | Gender |
| --- | --- |
| `le Behemoth` | m |
| `le Vaultback` | m |
| `le Nettlejaw` | m |
| `l'Anchor Kit` → `le kit d'ancrage` | m |
| `l'Instabilité` (resource) | **f** |
| `la Brigade` | f |
| `le Fort Ember` | m → `le fort` |

**The Tidewall / Le Mur des marées**

| Noun | Gender |
| --- | --- |
| `le Tidewall` → `le Mur des marées` | m → `un mur` |
| `le Blight` (resource) | m → `un fléau` / `la corruption` — **decide: `la Corruption` (f) reads better and is used in French fantasy games** |
| `l'Iron March` → `la Marche de fer` | f → `une marche` (a border province) |
| `le Silent Rank` → `le Rang silencieux` | m |
| `le Longwatch` → `la Longue Veille` | f |
| `le Bright Hall` → `la Salle claire` | f |
| `le Stillhand` | m |

**The Unbound / Les Déliés** — technique names, the gender minefield

| Noun | Gender | Because |
| --- | --- | --- |
| `Ember Palm` → **`la Paume de braise`** | f | `une paume` |
| `Turning Tide` → **`la Marée tournante`** | f | `une marée` |
| `Gale Step` → **`le Pas du vent`** | m | `un pas` |
| `Rooting` → **`l'Enracinement`** | m | `-ment` |
| `Thrown Line` → **`la Ligne lancée`** | f | |
| `The Quiet Opening` → **`l'Ouverture calme`** | f | `-ure` |
| `The Unnamed Form` → **`la Forme sans nom`** | f | `une forme` |
| `le Kiln` → **`la Forge`** | f | |
| `the Long Quiet` → **`le Long Silence`** | m | |
| `the Concord` → **`le Concorde`** | ⚠️ | **`la concorde`** is the abstract noun (harmony) and **`le Concorde`** is the aircraft. For an institution, **`le Concord`** kept untranslated is safer than either |

**Seven Days to Midnight / Sept Jours avant minuit**

| Noun | Gender |
| --- | --- |
| `la Halcyon Bay` | f → `une baie` |
| `le Clock Tower` → `le beffroi` / `la tour de l'horloge` | ⚠️ pick one and freeze |
| `l'Esplanade` | f |
| `le Point` → `la Pointe` | f — French coastal toponymy says `la pointe` |

**Primal Crown**

| Noun | Gender |
| --- | --- |
| `l'Emberclaw` | m → `un clan` |
| `la Stoneback Confederacy` → `la Confédération` | f |
| `les Frostfang Tribes` → `les tribus` | f. pl. |
| `les Skyfire Nomads` → `les nomades` | m. pl. |
| `les Mireborn` | m. pl. |
| `la Main de cendre` (Ashen Hand) | f |
| `le White Maw` | m |

### 4.3 The invariants

- ⚙ **A noun appears in this table before it appears in prose.** No exceptions.
- ⚙ **A gender is never changed after prose exists.** If one is wrong, it is a
  content migration with a re-read, not a substitution.
- ⚙ **Peoples capitalise as nouns and lowercase as adjectives**: `les Elfes`,
  `un artisan elfe`, `la langue elfique`. Getting this wrong is a dead giveaway.
- ⚙ **The generic term stays lowercase in a compound proper noun**:
  `le mur de Glace`, `la baie des Serfs`, `le mont Blanc`. Never `Le Mur De
  Glace`.
- ⚙ **Hyphenate compound toponyms** — `Le Bourg-du-Lac`, `Port-Réal`,
  `Vif-Argent`. It is French toponymy operating normally and it is the strongest
  available signal of natively-conceived French.
- **Deified abstractions take a capital** — `la Mort`, `les Ténèbres`, `l'Ombre`
  as personified forces. That is the licence, and it is also the limit.
