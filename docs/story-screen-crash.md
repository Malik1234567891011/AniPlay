# Opening a story crashed the app — solved

**Found:** 2026-09-11, during the French visual pass. **Fixed the same day.**
Not French-related, and not caused by that session's changes: it reproduced on
the JS bundle from before any of them.

## Symptom

Discover → tap any world → the app disappears to the iOS home screen. Both
entry points (a shelf card, the hero carousel's *Entrer dans ce monde*), every
world tried, every time. Tab navigation was unaffected.

```
EXC_BAD_ACCESS (SIGSEGV), KERN_INVALID_ADDRESS at 0x406b48
  facebook::react::calculateShadowViewMutations   × 9 frames
  facebook::react::MountingCoordinator::pullTransaction
  -[RCTMountingManager performTransaction:]
```

No JS error anywhere — by the time this runs, JS has finished. The stack names
React Native's view diffing, which is about as far from the responsible line as
a trace can get.

## Cause

One call, in `apps/mobile/src/components/Comments.tsx`:

```ts
new Intl.RelativeTimeFormat(undefined, { numeric: 'auto', style: 'narrow' })
```

`packages/i18n/src/polyfill.ts` force-installs five `Intl` areas —
getCanonicalLocales, Locale, PluralRules, NumberFormat, DateTimeFormat,
ListFormat. **`RelativeTimeFormat` is not among them**, so it fell through to
whatever Hermes ships, and that segfaults.

The `undefined` first argument was a second bug hiding behind the first: it
means *the device's* locale, not the app's, so where it did not crash it showed
English timestamps to French players.

## How it was found

Bisected on the simulator with bundle swaps (see the `aniplay-sim-bundle-swap`
note for the technique — the installed app runs an embedded bundle, so Metro
reloads do nothing):

1. Stub the whole screen → renders. The route is fine.
2. Remove `Animated.ScrollView` → still crashes. Not the parallax.
3. Empty both horizontal `FlatList`s → still crashes. Not the list rows.
4. Disable `<Comments>` → **renders**. It is in there.
5. Replace the one timestamp call → **renders**. That is the line.

## Fix

`postedAgo(iso, t)`, built from catalogue keys and ICU plurals, exactly like
`wallet.time_in_*` — which has always worked, in the same app, because it never
touches an `Intl` constructor. The French word order and preposition live in
`packages/i18n/src/catalog/fr/story.ts` where a French speaker can read them.

Verified on the simulator: the story screen opens, comments render, the
timestamp reads `il y a 5 j`.

## Guard

`packages/i18n/src/polyfill.spec.ts` fails the build if anything in
`apps/mobile`, `packages/i18n` or `packages/ui` constructs an `Intl` area the
polyfill does not install. The one allowed exception is `search.ts`, which
builds an `Intl.Collator` inside a try/catch, probes it, and falls back when
the engine's version is not trustworthy — the pattern this crash needed.

## The real lesson

`search.ts` already carried the comment *"on a Hermes build without full ICU it
may do neither, or may not exist."* The knowledge was in the repo. It had not
reached the screen that needed it, and nothing made it travel.

And nothing plays this screen: `npm run smoke` and `fr:smoke` drive the API and
the turn pipeline with no UI at all, so the one screen between the shelf and a
session had no automated coverage of any kind. It took opening the app and
tapping a world.
