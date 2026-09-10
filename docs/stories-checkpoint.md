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
| Itachi | ✅ `itachi.ts` | ✅ `itachi.spec.ts` | ✅ 88 assets | ✅ (derived asset keys) |

**In progress — uncommitted at the time of writing:**

- **Primal Crown** — `packages/test-fixtures/src/primal-crown.ts` (~2,170 lines)
  is written and registered in `index.ts`, and `packages/test-fixtures` is green
  (374 tests). It was failing 1 director-suite assertion (Mako's `cardBlurb` had
  no "you"/"your"); that edit is applied but not yet re-run. **No `primal-crown.spec.ts`
  yet. No art yet.**

**Untouched (7 worlds), in build order:**
`01_ZERO_THRONE`, `02_THE_FOURTH_BEAST`, `03_SEVEN_NAMES`,
`04_THE_BLANK_PROPHECY`, `06_THE_RED_FLOOR`, `07_SECOND_SKIN`,
`08_LAST_SERVICE` — all in `/Users/malik/Downloads/morestoryideas/`.
Copy each bible into `docs/story-bibles/` as you build it.

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

1. Re-run `npx vitest run --root packages/director 2>&1 | grep -E "FAIL|Tests "`
   to confirm the Mako `cardBlurb` fix landed (it was the last failing assertion).
2. Write `packages/test-fixtures/src/primal-crown.spec.ts`. Copy the shape of
   `itachi.spec.ts`. It must cover, at minimum:
   - **Opening co-location**: `charactersPresent(start())` contains `kaia`
     (`market_lanes`, minute 440), and no other character's
     `locationForSchedule(...) ?? homeLocationId` resolves to `market_lanes`.
   - **Pairwise voice separation**: all 15 cast pairs, content-word (len > 3)
     Jaccard-style overlap `< 0.3`. This is what found the real defects in Itachi.
   - Each declared `speechStyle` differentiator demonstrated in `voiceSamples`.
   - Resource drivers, the single `GOOD_HIGH`, and both array orders above.
   - Every `cancelledByFlags` entry on a world event is a flag something sets.
   - `end_the_long_hunger` (the careful-play loss) requires no relationship and
     no items.
3. Run all three gates by exit code, then **commit and push Primal Crown**.
4. Generate Primal Crown art (recipe above), `optimize-art.ts`, flip `index.ts`
   to `withDerivedAssetKeys`, re-run gates, commit, push.
5. Update this file, then start `01_ZERO_THRONE.md`. Read
   `/Users/malik/Downloads/morestoryideas/00_INDEX.md` first if not already read
   (already read: it lists seven and describes a `RANK_ZERO` with no file; `08`
   and `09` are on disk and unlisted).

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
