# World-authoring pass — checkpoint

Living document. Updated after each world, each root cause, each commit.
Read this first on a restart and trust it; do not re-explore to confirm it.

Companion docs: `docs/story-bibles/BUILD_STATUS.md` is the standing handoff
(gates, engine gotchas with line numbers, validator rules, the recipe). This
file is the *current* state of the pass.

---

## State

Worktree `/Users/malik/AniPlay-stories`, branch `stories/four-new-worlds`.
Merged `origin/main` at the start of this session (do not rebase — it conflicts
on `hush-house.ts`; merge resolved cleanly and is already pushed).

**Complete, committed, pushed, all three gates green:**

| World | Code | Spec | Art | In `LAUNCH_CATALOG` |
|---|---|---|---|---|
| Itachi | ✅ `itachi.ts` | ✅ `itachi.spec.ts` | ✅ 88 assets | ✅ |
| Primal Crown | ✅ `primal-crown.ts` | ✅ `primal-crown.spec.ts` | ✅ 69 assets | ✅ |
| Zero Throne | ✅ `zero-throne.ts` | ✅ `zero-throne.spec.ts` | ✅ 78 assets | ✅ |
| The Fourth Beast | ✅ `fourth-beast.ts` | ✅ `fourth-beast.spec.ts` | ✅ 70 assets | ✅ |
| Seven Names | ✅ `seven-names.ts` | ✅ `seven-names.spec.ts` | ⏳ next | ✅ |

All three gates green at the last commit. Catalog is now 18 worlds.

**Not mine.** Another agent is generating art for Hush House, Window Seven and
Good Morning, Husband on `main`. Do not generate for those three.

**Untouched (4 worlds), in build order:**
`04_THE_BLANK_PROPHECY`,
`06_THE_RED_FLOOR`, `07_SECOND_SKIN`, `08_LAST_SERVICE` — all in
`/Users/malik/Downloads/morestoryideas/`. Copy each bible into
`docs/story-bibles/` as you build it (Itachi → `09_ITACHI.md`, Zero Throne →
`05_ZERO_THRONE.md`, that folder's index → `00_MORESTORYIDEAS_INDEX.md`).

Three worlds from **previous** sessions (Hush House, Window Seven, Good Morning
Husband) are shipped and gated but have **no art** and export raw with null
asset keys. They are not among the ten locked worlds. Deciding whether to
generate for them is open — see Decisions.

---

## Decisions made

### Art is in scope (corrected mid-session)

The original brief said "no cover images". That was wrong and was corrected:
**generate the full set** — cover, key art, location stages, character
portraits, and 8-emotion reaction decks. The real constraint is *no baked-in
text*, because rendered words must be redone per locale.

How the pipeline already satisfies that, verified by inspection of the output:

- `NEGATIVES` in `packages/director/src/media/prompts.ts` already forbids text,
  lettering, captions, watermarks and logos. The model rendered **none**.
- `TITLE_SAFE_AREA = {top: 0.78}` reserves the bottom 22% of a cover, and
  `infra/scripts/generate-art.ts` composites the wordmark afterwards via
  `cover-title.ts`, keeping the un-plated master as `cover.raw.png`. A second
  locale re-plates from the raw. **This is correct as-is; do not change it.**

**Generation recipe (works, cost ~$2.60 and ~35 min per world at concurrency 4):**

```bash
cd /Users/malik/AniPlay-stories
export OPENAI_API_KEY="$(grep '^OPENAI_API_KEY' /Users/malik/AniPlay/.env | cut -d= -f2- | tr -d '"'\'' \r')"
npx tsx infra/scripts/generate-art.ts --only=story_<id> --reactions --concurrency=4   # run backgrounded
npx tsx infra/scripts/optimize-art.ts     # PNG masters -> delivery .webp
```

- There is **no `.env` in this worktree** and there must not be. The key lives
  in `/Users/malik/AniPlay/.env`; read it into the process per command as above.
  Never write it to disk here and never commit it.
- `infra/seed/assets/**/*.png` is **gitignored**. Only the `.webp` derivatives
  and `manifest.json` are committed. Always run `optimize-art.ts` before
  committing (201 MB of masters → 5 MB of delivery files for Itachi).
- The script is idempotent and `--only=` scopes it, so the ten locked worlds are
  never touched. Use `--dry-run` to prove what a run would write.
- **After art exists**, move the world in `index.ts` from the raw export group to
  `withDerivedAssetKeys(...)`. `director.spec.ts` enforces all-or-nothing per
  world: a world either declares every asset key or none.
- **Cast array order is cover-casting order.** `coverCast()` takes the first
  three characters with a non-empty `appearance`. Author most-important-first.
- `coverComposition()` keys off `tags`, and the branch order is
  sports → romance → horror → **mystery** → adventure → martial arts. A world
  tagged both `Mystery` and `Military` gets the *mystery* composition.

### Itachi — the span decision (the expensive one)

Bible is 15,554 words spanning age 4 → death → reanimation. A `StoryVersion` has
one clock, one location set and one cast at one set of ages, so:

- **Playable world = the coup crisis.** Twelve days, age thirteen, Shisui alive,
  Sasuke seven, Danzō active, the massacre not yet demanded. Bible §55 calls this
  the best phase for this product; §257 says the massacre must not arrive fast;
  all ten alternate lifelines in §135 are decided inside this fortnight.
- **Everything before = memory.** The battlefield at four became the *archetype
  choice* — §8 asks for an "early war belief" stored at the start and read back
  later by four different men, which is exactly what a build option is.
- **Everything after = endings.** Akatsuki, Kisame, the illness, the final fight,
  Edo Tensei live in epilogues. `The Shadow` carries nine canon years in its.

Shipped: 8 characters, 12 endings (4 plain losses, all four rarities),
14 locations, 6 quests / 14 steps, 10 world events, 4 invisible banded resources
(Reserve `GOOD_HIGH`; Clan Pressure / Silence / Leverage `GOOD_LOW` **in that
array order on purpose**).

The licensing/rights flag a previous session left in `BUILD_STATUS.md` has been
**deleted** per the product owner. Do not raise it again.

### Named vs blank protagonist (applies to every world from here)

A world either has a **blank** protagonist (the player invents somebody, and the
name / pronouns / appearance setup fields are the point) or a **named** one (the
character is already written, and asking the player to invent them is a
fourth-wall break on the first screen).

`protagonist: NAMED | BLANK` is not a schema field yet. Until it is, record it
here and author the setup screen accordingly:

- **Itachi — NAMED.** Fixed: `pronouns` and `appearance` removed, `displayName`
  is now optional with the canon name as placeholder and helpText saying you are
  Itachi Uchiha. What is left is characterisation — what the war left in you,
  what people get wrong about you, where you start out standing.
- **Primal Crown — BLANK.** The bible: any faction, mixed heritage, factionless,
  outsider, captive, or entirely self-authored.
- **Zero Throne — BLANK.** The bible: civilian, cadet, officer, mechanic,
  diplomat, mercenary, journalist, famous ace, nobody.
- **The Fourth Beast — BLANK.** The bible leaves how the player got into Morel's
  dataset deliberately flexible.
- **Seven Names — BLANK,** and unusually so: the bible forbids hard-canonning
  even whether the player committed the murder, so the identity field asks what
  they *say* happened at the Beaumont and the whole conspiracy works from it.

The rule to write by: **the archetype question should be characterisation, not
identity.** "You were four, on a battlefield, with your father. What did you take
away from it?" is the right shape. "What do you look like?" is not, in a world
that has already answered it.

### Zero Throne — shape

Playable span is the **fortnight after the machine kneels**, on and around one
neutral orbital station. The Nine-Day War, Lysandra and HELIOS are eighteen
years of backstory carried in lore and in what six people will and will not say;
the second war, if it happens, is an ending.

7 characters (Rhea, Mina, Talon, Orin, Venn, **Morrow**, Eli), 13 locations,
6 factions, 5 quests / 14 steps, 10 world events, 12 endings, 3 resources
(Nerve `GOOD_HIGH`; Pressure / Wear `GOOD_LOW`, Pressure first).

Morrow **is** a `CharacterDef` — unlike White Maw in Primal Crown — because it
has a voice, preferences and boundaries. Its `appearance` is the red line across
the cockpit display, and it is placed sixth in the cast array so it does not
take a cover slot.

### Primal Crown — shape

Playable world is the **three days at Sunscar Crossing**, not the continent.
6 characters (Kaia, Suri, Ilya, Torren, Mako, and **Vesh Ardan — invented**, an
Ashen Hand beast-breaker, because "join the Ashen Hand" is a named route and a
faction with no face is unplayable). 13 locations, 6 factions, 5 quests /
12 steps, 10 world events, 11 endings, 3 resources.

White Maw is deliberately **not** a `CharacterDef` — it is an animal, so it lives
in world events, quest routes and lore. The standard requires `voiceSamples` on
every character and an animal cannot have them.

### Resource design rules that keep biting (engine facts, verified in source)

- `resolveRest` (`resolve.ts:1496`) refills **every** `GOOD_HIGH` resource. Give
  a world exactly **one** honest restorable one. Never make a relationship or
  bond meter `GOOD_HIGH` — resting would repair it with a nap.
  - Primal Crown models the mount bond as **Wariness** (`GOOD_LOW`, negative
    `regenPerHour`) precisely to dodge this.
- `concreteCost` prefers the lowest-`displayPriority` `GOOD_HIGH` with current
  > 2, then falls back to `resources.find(GOOD_LOW)` — **array order**.
- `PUBLIC_VIOLENCE` takes the first `GOOD_LOW` in array order (+20) and the
  **first faction in array order** (−8). Order both arrays deliberately.
  - Itachi: `clan_pressure` first (an Uchiha seen fighting raises the clan
    question), `faction_konoha` first.
  - Primal Crown: `unrest` first, `faction_stoneback` first (their oath law is
    why the crossing is neutral ground).
- Ability costs on a `GOOD_LOW` are **added**, not subtracted. A `GOOD_LOW`
  resource comes back down only via negative `regenPerHour`. A negative `amount`
  in `costs` technically works but renders as "costs −10 Silence" on the card —
  don't.
- `abilityEffect()` output must be **< 120 chars** (`choice-clarity.spec`), so
  keep ability and resource names short.

---

## Next

1. Generate Seven Names art, then `optimize-art.ts`, gates, commit, push.
2. Build `04_THE_BLANK_PROPHECY.md`, then the remaining three in order.

**The per-world loop that works — follow it exactly:**

1. Read the bible: outline with `grep -n "^# \|^## "`, then `sed -n` the core
   sections. Do not read art-prompt sections.
2. Decide the **playable span** first and write it into the file's doc comment.
   Every bible so far has been larger than one `StoryVersion` can hold; the
   compression is the authoring decision and it is the expensive part.
3. Write the world in ~8 heredoc chunks to `/tmp/<world>/pN.ts`, then `cat` them
   together into `packages/test-fixtures/src/<world>.ts`.
4. **Register in `index.ts` immediately** and run
   `npx vitest run --root packages/test-fixtures 2>&1 | grep -E "Tests |FAIL|→"`.
   This is what catches parse errors and unreachable routes.
5. Run `npx vitest run --root packages/director` — this is where the gate,
   `cardBlurb` and narrative-clarity failures appear.
6. Write `<world>.spec.ts`. Copy `zero-throne.spec.ts`; it is the most complete.
   It **must** include the pairwise voice-overlap test — that test has found a
   real defect in every world it has been run against.
7. All three gates by exit code, commit, push.
8. Generate art backgrounded, `optimize-art.ts`, gates, commit, push.
9. Update this file.

---

## Dead ends / paid-for lessons

**Do not `git rebase origin/main`.** It conflicts on
`packages/test-fixtures/src/hush-house.ts` (add/add). `git merge origin/main`
resolves cleanly. Already done and pushed this session.

**Two wiring errors in Primal Crown, both caught by `catalog.spec.ts`, both of
the class `BUILD_STATUS.md` gotcha 6 describes:**

1. `work_by_fear` was `unlockedByDefault: false` and awarded by **nothing**, so
   the quest route requiring `used:work_by_fear` was unreachable. `requires` on
   an ability *restricts* one you already have; it never grants it. **Fix:** add
   `abilities: ['work_by_fear']` to the `rewards` of the step where Vesh teaches
   the method. The `requires.flagsSet: ['knows:the_ashen_method']` gate keeps it
   unusable for anyone she has not told — grant broadly, gate by flag.
2. Step `find_out_what_they_want` awarded `salt_block` while one of its own
   routes demanded `hasItems: ['salt_block']`. **Fix:** removed the reward; salt
   is already takeable in `market_lanes` (qty 3).

**The single most repeated error, now hit four times — check for it every world:**

An ability with `unlockedByDefault: false` and a `requires.flagsSet` gate, that
**no step's `rewards.abilities` ever grants**. `requires` restricts an ability
you already have; it never hands one over. Every quest route keyed on
`used:<that ability>` is then unreachable and `catalog.spec.ts` catches it.

The fix is always the same shape: **grant broadly, gate by flag.** Put the
ability in the `rewards.abilities` of the step where the player learns it, and
leave the `requires.flagsSet` gate on to keep it unusable for anybody who has
not. Hit by `work_by_fear` (Primal Crown), `tsukuyomi` (Itachi, caught in
authoring), `go_all_the_way` (Fourth Beast) and `open_the_registry` (Seven
Names).

**Two more found by `director.spec.ts`:**

3. Quest route `brought_the_measurement` required `knows:the_real_width`, which
   **nothing set**. A `RelationshipGate` opening a topic does not write a flag.
   **Fix:** the `ate_at_their_fires` route now sets it — Suri is the only person
   who has re-walked the corridor, so going to her fire is where it comes from.
4. `cardBlurb` must contain "you"/"your" and be > 20 chars and ≠ `role`.
   Torren's and Mako's were pure third-person description. Both rewritten.

**Three real defects in Itachi found by its own spec, not by review** — this is
the argument for writing the per-world spec *before* declaring a world done:

- Sasuke and Izumi both counted things out loud **and both used the number
  eleven**. Fixed by moving Sasuke off arithmetic entirely (his register is
  repetition and flat sulk; hers is over-explain-then-stop plus "anyway").
- Izumi and Mikoto shared an observational register down to the word "twice".
  "Twice" is Mikoto's signature; Izumi's line was rewritten around it.
- Izumi had **no home location** and was scheduled asleep in a public street.
  Fixed by authoring `izumi_home` and wiring it into `uchiha_street`.

**Schema traps hit while authoring:**

- `ArchetypeDef.playstyle` tags are **max 24 chars** each. "Slow to write anybody
  off" (25) failed the parse.
- `FactVisibility` has no `SEMI_PRIVATE`. Valid: `WORLD_PUBLIC`, `FACTION`,
  `PARTY`, `NPC_PRIVATE`, `PLAYER_PRIVATE`, `PAIR_PRIVATE`, `CREATOR_ONLY`.
- A spec regex of `/asleep/i` over `activity` matches the string "not asleep".
  Write the activity text so the word does not appear, rather than complicating
  the regex.
- The clarity validator flags an item named "The Mask" when prose says "the
  mask", and a faction named "The Clan" when prose says "the clan". These are
  `WARN` only and do not fail — leave them rather than degrading the writing.
