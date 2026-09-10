# APP_STORE_FRANCE — the France listing

**Prepared, not submitted.** Nothing here has been uploaded to App Store
Connect, and per the phase boundary nothing should be until the English side has
frozen and the brand name is resolved.

⚠️ **Blocker.** `app.json` says `AniPlay`; `services/api/src/server.ts:330` says
`New on Plotbreak`; every document says Plotbreak. **The France listing cannot be
prepared around an ambiguous brand.** See [`UI_AUDIT.md` §2.9](UI_AUDIT.md).
Everything below assumes **PLOTBREAK**.

⚠️ Field limits and age-rating tiers below are from working knowledge and
**must be checked against App Store Connect at submission time** — Apple changes
both. They are given so the copy can be written to a length, not as a citation.

---

## 1. The legal frame, which is not optional in France

| Requirement | What it means here |
| --- | --- |
| **Loi Toubon** (loi n° 94-665) | Commercial and advertising material aimed at French consumers must be **in French**. A French store listing is not a nice-to-have for a product marketed in France; the store description, the screenshots' embedded text and the in-app purchase display names all fall under it |
| **EU DSA trader status** | Apple requires trader verification for EU distribution, and trader details are shown on the product page. This is an account-level task for whoever owns the developer account, not a localisation task — but it **blocks French availability**, so it is named here |
| **GDPR / CNIL** | The privacy policy and terms must exist in French at `EXPO_PUBLIC_LEGAL_BASE_URL`. `status.md` already lists this as an outside-the-repo dependency; France makes it a hard one |
| **ATT** | Apple's own French prompt copy, unchangeable, and it says `vous`. The seam is expected — see [`PRODUCT_VOICE.md`](PRODUCT_VOICE.md) RULE 1 |
| **Age rating** | The product is authored to 13+ (`SAFETY_POLICY`: *never write sexual content; fantasy violence and dark themes permitted; graphic gore is not*). Map to Apple's 13+ tier. The `contentDescriptors` in `StoryDetail.tsx:36-44` are the player-facing surface and their French is in [`UI_AUDIT.md` §4](UI_AUDIT.md) |
| **IAP display names** | The five consumable products (`crd_2000`, `crd_10000`, `crd_20000`, `crd_50000`, `crd_first_21000`) each need a French display name and description in App Store Connect. These are **store metadata, not app strings**, and a translation pass over the codebase will miss them entirely |
| **Prices** | Set from Apple's French price points. **Never hand-format** — the app must display StoreKit's localized string verbatim. See [`TYPOGRAPHY.md` §4](TYPOGRAPHY.md), and note the current `about $2.99` fallback in `Wallet.tsx:262` |

## 2. Name and subtitle

### App name (~30 characters)

**`Plotbreak`** — the brand name is never translated, never accented, never
spaced.

### Subtitle candidates (~30 characters)

The subtitle is indexed for search, so it does double duty. All are within
budget; character counts are given because French overruns.

| Candidate | Chars | Verdict |
| --- | ---: | --- |
| ✅ **`Anime jouable. Tes choix.`** | 25 | Recommended. Carries the category and the promise, and `anime` is the highest-value keyword in the whole listing |
| `Histoires anime interactives` | 28 | Maximum keyword density; reads like a category page |
| `Ton anime. Tes choix.` | 21 | Best rhythm, weakest for search |
| `Écris la suite de ton anime` | 27 | Strong, verb-first, very French |
| `Des mondes anime où tu joues` | 28 | |
| ❌ `Fiction interactive par IA` | 26 | **`IA` in a subtitle is a positioning risk in France** — see §6 |

### The English that stays English

**`PLAYABLE ANIME`** works as brand positioning and is kept, always with a
French line under it. `anime` is already a French noun (`un anime`, `des
animes`), so this is not an anglicism — it is the French word plus an English
adjective, which is exactly how French youth marketing reads as modern.

```
PLAYABLE ANIME
Ton anime. Tes choix. Ton histoire.
```

Never `anime jouable` as body copy (reads like a spec sheet) and never
`animé interactif` (shifts the meaning to "interactive cartoon").

## 3. Keywords (~100 characters, comma-separated, no spaces)

Rules that are easy to get wrong: **do not repeat the app name or the
subtitle** — they are already indexed. **Do not use plurals and singulars
separately** — Apple stems. **Do not use spaces after commas** — they cost
characters.

Ranked candidate pool, French-market:

| Term | Why |
| --- | --- |
| `anime` | the category word, and it is French |
| `manga` | largest adjacent audience in Europe |
| `otome` | the French otome audience is real and Amour Sucré built it |
| `webtoon` | how this audience already reads |
| `interactive` / `interactif` | |
| `histoire` | the head noun for the genre in French |
| `choix` | Episode FR's own positioning: *"Change le destin à travers tes choix"* |
| `roleplay` / `rp` | used in French as-is |
| `visuel` | for `roman visuel` (visual novel) |
| `romance` | identical in both languages, free |
| `isekai` | untranslated, high-intent, low competition |
| `narratif` | |
| `aventure` | |
| `personnage` | |

**Proposed string (99 chars):**

```
anime,manga,otome,webtoon,histoire,choix,romance,interactif,narratif,roleplay,isekai,visuel,aventure
```

**Deliberately excluded:** `IA`, `chatbot`, `intelligence artificielle` (§6);
`jeu` (too broad, Apple already knows this is a game); `gratuit` (Apple
disallows price claims); competitor names (Apple disallows).

## 4. Description

The App Store description is not indexed for search in the same way keywords
are, so it is **copy, not SEO**. It must obey
[`PRODUCT_VOICE.md`](PRODUCT_VOICE.md): **tu**, sentence case, no `&`, accented
capitals, no apology, no Title Case.

**The first three lines are all most people read.** Everything else is for the
person who tapped *plus*.

```
PLAYABLE ANIME
Ton anime. Tes choix. Ton histoire.

Choisis un monde. Deviens qui tu veux. Fais ce que tu veux.

Plotbreak, ce n'est pas une histoire à trous où tu tapes sur trois boutons.
Tu écris ce que tu fais, avec tes mots, et le monde répond vraiment.

── DIS OU FAIS CE QUE TU VEUX ──
Une barre de texte. Pas de menu. Tu peux mentir, partir, embrasser quelqu'un,
casser une porte, refuser la quête. Personne ne te ramène sur les rails.

── DES MONDES ÉCRITS, PAS GÉNÉRÉS ──
Dix mondes originaux, chacun avec ses personnages, ses tensions et ses fins.
Une équipe de basket qui a perdu ses cinq titulaires. Un navire dont
l'équipage peut partir. Une semaine qui recommence tous les dimanches à
minuit.

── DES GENS, PAS DES DISTRIBUTEURS DE QUÊTES ──
Chaque personnage a ce qu'il veut, ce qu'il cache et ce qu'il ne fera jamais.
Ils se souviennent de ce que tu as dit. Ils peuvent refuser.

── TES CHOIX COMPTENT VRAIMENT ──
Rien n'est écrit d'avance. Certaines fins sont des défaites. Partir en est
une aussi.

── TROIS FAÇONS DE JOUER ──
Lis et tape une réponse toute prête. Ou écris tout toi-même. Ou les deux.

Plotbreak est gratuit au début, puis fonctionne avec des crédits.
Tu vois toujours ce que coûte un tour avant de le jouer.
```

Notes on the copy, because they are the decisions:

- `dix mondes` — update the number, and note French says `dix mondes`, not
  `10 mondes`, in prose.
- The three world examples are the **hooks translated as hooks**, not as
  sentences. Last Five's is the strongest and leads.
- `── SECTION ──` headers in caps are acceptable as a category-header *style*
  (PRODUCT_VOICE RULE 3) and are common in French store listings. **Accented
  capitals are mandatory**: `ÉCRITS`, `GÉNÉRÉS`.
- No `!` anywhere. French store copy with exclamation marks reads as translated
  American marketing.
- The credits paragraph is last and plain, because the brief says never obscure
  cost, and because French consumer expectations around IAP disclosure are
  strict.

### Promotional text (~170 characters, changeable without review)

```
Nouveau : trois mondes de plus. Un lycée qui a perdu son cinq majeur, un
navire sans équipage, et une semaine qui recommence. Choisis. Écris. Casse
l'histoire.
```

## 5. Screenshots

Six to ten, and **the text on them is French copy that must be typeset**, not
translated captions.

| # | Shows | Caption |
| --- | --- | --- |
| 1 | The composer with real French input mid-sentence | `Dis ou fais ce que tu veux.` |
| 2 | A beat reacting to something unreasonable the player typed | `Le monde répond vraiment.` |
| 3 | Three response cards, in French, full length | `Trois réponses. Aucune n'est la bonne.` |
| 4 | A character reaction frame | `Ils se souviennent.` |
| 5 | The Discover shelf, French world titles | `Dix mondes. Aucun rail.` |
| 6 | An ending screen | `Certaines fins sont des défaites.` |

⚠️ **The screenshots are the layout stress test made public.** French inflates
UI labels by a mean of **1.37×** and response cards by **1.13×**; a screenshot
with a clipped label is the most public possible version of that bug. Shoot them
after the layout pass, never before.

⚠️ Screenshot text must use `’`, `«  »`, accented capitals and a non-breaking
space before `?` and `!`. Typeset text is where those get dropped.

## 6. The `IA` positioning question — decide this deliberately

**Recommendation: do not lead with AI in the French listing.**

The reasoning is market-specific, not squeamish. French cultural-sector
discourse around generative AI is more hostile than the anglophone equivalent —
the audience for this product overlaps heavily with people who read manga,
follow illustrators and have opinions about AI art, and `histoire générée par
IA` in a subtitle invites that argument on the store page rather than in the
product. Meanwhile the *feature* — that the world actually responds to anything
you type — is describable entirely without the word.

So: **`IA` may appear in the body of the description**, factually, low in the
copy, where it explains how the responsiveness works. It should not appear in
the name, the subtitle, the keywords or the first screenshot.

This is a positioning judgement, not a research finding, and it is worth
re-arguing with whoever owns marketing. It is recorded here so it is a decision
rather than an accident.

## 7. What French competitors do, and what to take from them

| Product | Register | Positioning line |
| --- | --- | --- |
| **Episode FR** | tu | *Change le destin à travers tes choix* · *Découvre toutes les fins différentes* |
| **Tabou Stories FR** | tu | *Immerge-toi dans un monde où tes choix façonnent ton destin* |
| **Amour Sucré** (French studio, Beemoov) | **tu**, zero vous | the closest demographic match in the entire market |
| **Is It Love?** (French studio) | vous | proof the split is real |
| Chapters / My Story / Whispers | vous | reading-shaped, not playing-shaped |
| Crunchyroll FR / ADN / Mangas.io / WEBTOON FR | **vous**, six for six | but they are **reading** platforms |

**The take:** the anime *reading* vertical is vous and the interactive-fiction
*playing* vertical splits, with the two French-made products landing on opposite
sides. Plotbreak casts the player as the protagonist, which is the Episode /
Amour Sucré shape, so **tu**. The full argument, including the honest
counter-evidence, is in [`PRODUCT_VOICE.md`](PRODUCT_VOICE.md) RULE 1, and if it
is ever revisited it must be revisited **before launch** — changing register
afterwards means rewriting every string, every screenshot and every push
notification, and French users notice.

## 8. Checklist before submission

- [ ] Brand name resolved: `AniPlay` vs `Plotbreak`, in `app.json`, `Share.tsx`,
      `WorldSheet.tsx`, the storage keys and `server.ts:330`
- [ ] `fr-FR` locale added in App Store Connect (not `fr`, not `fr-CA`)
- [ ] Five IAP products given French display names and descriptions
- [ ] French privacy policy and terms live at `EXPO_PUBLIC_LEGAL_BASE_URL`
- [ ] EU trader status verified on the developer account
- [ ] Age rating questionnaire completed against the 13+ authored bar
- [ ] `contentDescriptors` French strings shipped (`Langage grossier`, not
      `Langage fort`)
- [ ] Screenshots shot **after** the French layout pass
- [ ] `npm run fr:lint` clean over every string in the listing
- [ ] No `!` in the description; accented capitals present; `’` not `'`
- [ ] The word `courriel` appears nowhere
