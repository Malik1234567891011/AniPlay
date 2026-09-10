# PRODUCT_VOICE — the fr-FR product and UI voice

The layer this governs: **everything that is not the story.** Buttons, tabs,
onboarding, settings, errors, the paywall, the store listing, notifications,
accessibility labels.

Narrative prose is a different layer with a different voice. See
[`NARRATIVE_STYLE.md`](NARRATIVE_STYLE.md). Do not make onboarding sound
literary and do not make narration sound like a settings screen.

---

## RULE 1 — The product says TU. Always.

> **`Choisis un monde.` · `Dis ou fais ce que tu veux.` · `Crée ton personnage.`
> · `Continue l'histoire.`**

Never `vous` in product voice. Never mixed between screens. A single `vous` on
the paywall when every other screen says `tu` is the most visible localization
failure there is, and it is the one French reviewers name.

### Why tu — and the honest counter-evidence

This was researched rather than assumed, and the evidence is genuinely split.

**For tu:**

1. **The audience's daily apps are tu.** Verified live: Vinted
   (`Comment pouvons-nous t'aider ?`, `Vends tes articles`), Deezer
   (`Vis ta musique`, `Choisis ton offre`), Duolingo (`apprends où tu veux,
   quand tu veux`), TikTok (`Regarde des millions de vidéos`), Discord's product
   voice (`Personnalise ton propre espace`), Roblox.
2. **Our actual genre leans tu.** Episode (`Change le destin à travers tes
   choix`, `Découvre toutes les fins différentes`), Choices, Tabou Stories
   (`Immerge-toi dans un monde où tes choix façonnent ton destin.`), Romance
   Fate, Love Sick — and **Amour Sucré**, a French-made otome game by Beemoov
   built for exactly our demographic, which is tu with zero vous.
3. **The structural argument, which is the strongest one.** Plotbreak's
   narration is second person. In French, the narrative "you" and the UI "you"
   are the *same pronoun*. If the UI vouvoies the player and the story tutoies
   them — or worse, vice versa — the two voices audibly fight. There is no
   equivalent friction in English, which is why this cannot be decided by
   looking at what English-first products do.
4. **Neutrality is not our position.** Vous is the safe, neutral, institutional
   register. An anime-fandom brand does not want to sound institutional.

**Against tu — stated plainly, because it is real:**

The French anime/manga vertical is currently **six for six on vous**:
Crunchyroll FR (`REGARDEZ LES ANIME LES PLUS POPULAIRES`), WEBTOON FR
(`Séries populaires par catégorie`), Wattpad FR, Mangas.io
(`plongez dans l'univers du manga`), ADN (`Retrouvez tous les genres`), Izneo.
And the interactive-fiction genre splits about 50/50 — Chapters, My Story,
Whispers, Love 365, and **Is It Love?** (also a French studio) all run vous at
scale.

So this is a bet, not a deduction. The bet is that those six are *reading*
platforms — you consume a series on them — while Plotbreak is a *playing*
product where the player is cast as the protagonist. Casting someone as the hero
of a story and then vouvoyer-ing them is the wrong distance. Episode, Choices and
Amour Sucré — the products where you *are* someone — chose tu, and they are the
right comparison set.

**If this is ever revisited, revisit it before launch, not after.** Changing
register post-launch means rewriting every string, every store screenshot and
every push notification, and French users notice the switch.

### The one exception: the system seam

Everything Apple supplies is `vous` and cannot be changed — the share sheet,
system alerts, ATT, Sign in with Apple, StoreKit sheets, permission dialogs,
VoiceOver chrome. A tu app on iOS is always mixed-register at that boundary.
Every French tu app ships this. Do not fight it.

What follows from it: **anything of ours that sits directly against Apple chrome
uses the neutral infinitive rather than tu.** Not `vous`, and not `tu` — no
person at all.

| Context | Write | Not |
| --- | --- | --- |
| Destructive confirm | `Supprimer le compte` | `Supprime ton compte` |
| Settings row | `Réduire les animations` | `Réduis les animations` |
| Permission pre-prompt | `Autoriser les notifications` | `Autorise les notifications` |
| Legal / privacy | infinitive or nominal | tu |

This is not inconsistency. French readers parse an infinitive label as
*label voice*, not as *person voice* — the same way Apple's own French UI does
(`Réinitialiser le mot de passe`, `Ne plus recopier`, `Connexion et sécurité`).

---

## RULE 2 — Verb form: imperative for momentum, infinitive for navigation

French UI does not have one CTA grammar. It has three, and they split by
function, not by taste.

**Imperative (tu)** — committed, in-flow, one-way actions; the story surface;
onboarding; empty-state nudges; anything with momentum.

```
Commence          Continue          Choisis un monde
Joue              Envoie            Découvre
Crée ton personnage                 Dis ou fais ce que tu veux…
```

**Infinitive** — navigation, settings, menus, optional and reversible actions,
anything system-adjacent.

```
Annuler           Enregistrer       Supprimer         Réessayer
Voir tout         En savoir plus    Se connecter      Se déconnecter
Restaurer mes achats                Parcourir les mondes
```

**First person** — a genuine French convention English lacks, used by Izneo,
SNCF Connect, La Poste, N26 and BoursoBank: the user speaks *as themselves*.
It sidesteps register entirely, which makes it excellent for the paywall and
for consent, where tu can feel like a nudge.

```
Je m'abonne       J'en profite      Je continue sans compte
```

**Never mix two of these inside one button group, tab bar or menu.** Observed
failures worth not repeating: WEBTOON ships `Téléchargez-le sur Google Play`
next to `Télécharger sur l'App Store`; Duolingo puts `DÉCOUVRE LA BOUTIQUE`
directly above `VISITER LA BOUTIQUE` — two registers for the same action.

---

## RULE 3 — Sentence case. Never English Title Case.

`Créer une histoire`, not `Créer Une Histoire`.

Confirmed by every authority reachable. Microsoft's French (France) style guide,
§4.1.5: *"The English language tends to use capital letters more often than
French does. As a general rule, in French, only proper nouns and the first word
of a sentence have to be capitalized."* Apple's HIG tells English authors to use
title case for button titles — **that instruction is English-only and must not
be carried into French.** Apple's own French UI proves it: `Connexion et
sécurité`, `Modifier le mot de passe`, `Recopie de l'écran`.

| Element | Rule |
| --- | --- |
| Buttons / CTAs | Sentence case, no terminal period |
| Tab bar labels | Sentence case; single nouns capitalised (`Découvrir`, `Bibliothèque`, `Profil`) |
| Settings rows | Sentence case (`Réduire les animations`) |
| Section headings | Sentence case (`Séries populaires`) |
| Alert titles | Sentence case; period only if a full sentence |
| ALL CAPS | Acceptable as a category-header *style*. **Never on a button.** |

Applied to our actual strings — see [`UI_AUDIT.md` §2.8](UI_AUDIT.md):

| Current | fr-FR |
| --- | --- |
| `Wallet & purchases` | `Portefeuille et achats` (`&` → `et`) |
| `Report history` | `Historique des signalements` |
| `Restore purchases` | `Restaurer mes achats` |
| `Trending now` | `Tendances` |
| `For you` | `Pour toi` |
| `All worlds` | `Tous les mondes` |
| `New on Plotbreak` | `Nouveautés sur Plotbreak` |
| `Best value` | `Le meilleur rapport` |
| `First purchase` | `Premier achat` |
| `Daily credits` | `Crédits quotidiens` |

**`&` is not a French word.** Write `et`. (Mozilla's French style guide:
*"On remplacera l'esperluette & par « et »."*)

**Accented capitals are mandatory**, including `À` and `É`: `À propos`,
`Écrire`, `Événements`, `ÉCOLE`. The Académie française position is that the
accent has full orthographic value. Dropping it is a cheap, obvious tell.

---

## RULE 4 — Errors: what happened, then what to do. No apology theatre.

**Bad:** `Une erreur inattendue s'est produite lors de la résolution.`
**Bad:** `Oups ! Quelque chose s'est mal passé.` — a calque, and French users
read heavy apology in a UI as either insincere or as an admission it is broken.
**Good:** `Impossible de continuer l'histoire pour le moment. Réessaie.`

Microsoft's French guide gives the standard forms, and they are worth following
exactly because French users have seen them for twenty years:

| English shape | French | Not |
| --- | --- | --- |
| Cannot… / Could not… | `Impossible de charger les mondes.` | `Les mondes ne peuvent pas être chargés.` |
| Failed to… | `Échec du paiement.` | `Le paiement a échoué.` |
| Cannot find… | `Partie introuvable.` | `Impossible de trouver la partie.` |
| Not enough… | `Crédits insuffisants.` | `Pas assez de crédits disponibles.` |
| …is not available | `La boutique n'est pas disponible.` | `La boutique est indisponible.` |

Terminal period on error messages. Avoid parentheses.

**Banned as stiff** (Microsoft FR §2.1.4, and correct): `avoir la possibilité
de` → `pouvoir`; `requérir` → `demander`; `nécessiter` → `devoir`;
`il convient de`; `veuillez bien vouloir`; the passive voice; the subjunctive;
`passé simple`.

**Banned as over-apologetic:** `Oups !`, `Aïe !`, `Désolé, quelque chose s'est
mal passé.`, `Nous sommes vraiment désolés`. One `Désolé` in a 404 is fine.
Every error, no.

### Our actual error strings

| Current | fr-FR |
| --- | --- |
| `You're offline. Your action is saved.` | `Tu es hors connexion. Ton action est gardée.` |
| `Something went wrong.` | `Ça n'a pas marché. Réessaie.` |
| `That turn didn't complete. You weren't charged.` | `Ce tour n'est pas allé au bout. Tu n'as rien payé.` |
| `Could not load worlds.` | `Impossible de charger les mondes.` |
| `Could not start the story.` | `Impossible de lancer l'histoire.` |
| `That did not work. Try again.` | `Ça n'a pas marché. Réessaie.` |
| `That code has expired. Ask for a new one.` | `Ce code a expiré. Demandes-en un nouveau.` |
| `That code did not match. Check it and try again.` | `Ce code ne correspond pas. Vérifie-le et réessaie.` |
| `Too many attempts. Wait a minute and try again.` | `Trop de tentatives. Attends une minute et réessaie.` |
| `That email address does not look right.` | `Cette adresse e-mail n'a pas l'air correcte.` |
| `We could not reach the store. Nothing changed — try again shortly.` | `Impossible de joindre la boutique. Rien n'a changé — réessaie dans un instant.` |
| `You have not been charged.` | `Tu n'as rien payé.` |
| `Your purchase is safe.` | `Ton achat n'est pas perdu.` |
| `That could not be shared just now.` | `Impossible de partager pour le moment.` |
| `This story moved on. Your action is still here — send it when ready.` | `L'histoire a avancé. Ton action est toujours là — envoie-la quand tu veux.` |

Note `e-mail`, **never `courriel`** — `courriel` is Quebec French and its
presence in a fr-FR build is a translation-memory leak. (Wattpad FR ships it.
Netflix and Spotify FR both use `e-mail`.)

---

## RULE 5 — The key product phrases

Candidates were developed before choosing, as instructed. Recommendations are
marked ✅; alternatives are kept so the decision can be re-argued rather than
re-researched.

### "Say or do anything…" (composer placeholder)

| Candidate | Verdict |
| --- | --- |
| ✅ **`Dis ou fais ce que tu veux…`** | Direct, native, matches the English rhythm, unambiguous. The brief's direction, and it survives scrutiny. |
| `Écris ce que tu veux…` | Narrows it to writing. The product is not a writing app. |
| `Tu fais quoi ?` | Very natural spoken French, but it duplicates the `What do you do?` label above the composer. |
| `Vas-y, dis ou fais ce que tu veux…` | Warmer, longer. Good for onboarding, too long for a placeholder. |
| `Dis-le, fais-le.` | Punchy but reads like advertising, not like an input hint. |

### "What do you do?" (composer label — `Session.tsx:650,1252,1254`)

| Candidate | Verdict |
| --- | --- |
| ✅ **`Qu'est-ce que tu fais ?`** | The standard, neutral, unmarked spoken form. |
| `Tu fais quoi ?` | More casual and very natural. Viable if the brand wants more edge — but it is *markedly* casual, and this label appears on every single turn. |
| `Que fais-tu ?` | Grammatically impeccable, socially wrong. Inversion in a youth product reads as a textbook. **Do not use.** |

Note the mandatory narrow nonbreaking space before `?` — see
[`TYPOGRAPHY.md`](TYPOGRAPHY.md).

### "Pick a world. Become anyone. Do anything."

| Candidate | Verdict |
| --- | --- |
| ✅ **`Choisis un monde. Deviens qui tu veux. Fais ce que tu veux.`** | Keeps the three-beat rhythm. `qui tu veux` / `ce que tu veux` gives the same anaphora English gets from "any-". |
| `Choisis ton monde. Deviens qui tu veux. Tout est possible.` | `ton monde` is warmer; `Tout est possible` is weaker — it is a promise, not an instruction. |
| `Un monde. Un personnage. Aucune limite.` | Very App-Store-poster. Good screenshot caption, poor onboarding line. |
| `Choisis un monde. Deviens n'importe qui. Fais n'importe quoi.` | `n'importe quoi` in French carries "nonsense / rubbish", not "anything at all". **Trap — avoid.** |

That last row is the kind of thing that makes a product read as translated:
`anything` → `n'importe quoi` is dictionary-correct and semantically wrong.

### "Playable Anime"

✅ **Keep `Playable Anime` in English as brand positioning, with French support
copy underneath.**

Reasoning: `anime` is already the French word (masculine, `un anime`, plural
`animes`). There is no natural French compound — `anime jouable` is technically
correct and sounds like a spec sheet; `animé interactif` shifts the meaning to
"interactive cartoon". English category tags are normal and read as modern in
French youth products. But the English must never carry meaning the French copy
does not also carry, so it always ships with a French line:

```
PLAYABLE ANIME
Ton anime. Tes choix. Ton histoire.
```

Alternative French support lines: `Un anime dont tu écris la suite.` ·
`L'anime, mais c'est toi qui joues.` · `Des mondes anime où tu fais ce que tu veux.`

### "Break the plot."

| Candidate | Verdict |
| --- | --- |
| ✅ **`Casse l'histoire.`** | Closest in force and register. `casser` is the right violence. |
| `Brise l'intrigue.` | `intrigue` is the correct literary word for "plot" but the register is a book review. |
| `Fais dérailler l'histoire.` | Vivid and very French. Longer. Good as a secondary line. |
| `Sors du scénario.` | Excellent meaning ("go off-script"), reads native, loses the aggression. Strong runner-up. |
| `Brise le scénario.` | Hybrid; weaker than either parent. |

**`PLOTBREAK` stays `PLOTBREAK`.** The brand name is never translated, never
accented, never spaced. The tagline may be French; the name is not.

---

## RULE 6 — Numbers, money and dates go through locale-aware APIs

Never hand-format. See [`LOCALIZATION_ARCHITECTURE.md`](LOCALIZATION_ARCHITECTURE.md)
for the implementation and the Hermes/ICU caveat, which is a real hazard.

| Thing | France | Never |
| --- | --- | --- |
| Decimal | `2,99` | `2.99` |
| Thousands | `10 000` (narrow nbsp) | `10,000` |
| Currency | `2,99 €` (nbsp before €) | `$2.99`, `€2,99` |
| Percent | `50 %` (nbsp before %) | `50%` |
| Time | `14:30` or `14 h 30` | `2:30 PM` |
| Date | `10/09/2026`, `10 septembre 2026` | `09/10/2026` |
| Compact | `10 k`, `1 M` | `10K`, `1M` |
| Duration | `3 j`, `2 h`, `15 min` | `3d`, `2h` |

Months and weekdays are **lowercase** in French: `septembre`, `mardi`.

**Fictional world canon is exempt.** A story's own currency, its own measurements
and its own clock are canon, not locale formatting. Do not convert a fictional
coin into euros. Do not turn an authored distance into kilometres. The
locale-aware rule governs the *app*; the world governs the *world*.

---

## RULE 7 — Simple in the UI, sophisticated in the story

Different layer, different voice. UI copy is short, concrete, active, one idea
per sentence, no acronyms, no jargon, no nominalisation. Narrative prose may be
as good as it can be.

The failure mode to avoid is literary onboarding: a first-run screen that reads
like the opening of a novel is not immersive, it is an obstacle between the
player and the story they came for.

---

## Terminology lock — decide once, never vary

Same concept, same French word, everywhere in the product. This is where mixed
translations show most.

| Concept | fr-FR | Never |
| --- | --- | --- |
| world (a story world) | **un monde** | un univers *(reserve for lore)* |
| story | **une histoire** | un récit, une story |
| turn | **un tour** | un tirage, un round |
| run / playthrough | **une partie** | une course, un run |
| credits | **des crédits** | des jetons, des pièces |
| wallet | **le portefeuille** | le porte-monnaie |
| save (to library) | **enregistrer** | sauver, sauvegarder |
| character (the player's) | **ton personnage** | ton perso *(too casual for UI)* |
| cast / people | **les personnages** | le casting |
| response card | **une réponse** | une option, un choix |
| fork | **bifurquer** / **une bifurcation** | forker |
| pin to canon | **épingler** | pinner |
| sign in | **se connecter** | se logger, s'identifier |
| e-mail | **e-mail** | courriel *(fr-CA)*, mél |
| report | **signaler** / **un signalement** | rapporter |

`sauvegarder` is not wrong for files, but Plotbreak's "Save" is
save-to-library — `enregistrer`. And `sauver` means *rescue*, which in a game
with characters in danger is an active ambiguity.
