# Opening a story crashes the app on the simulator

**Found:** 2026-09-11, during the French visual pass. **Not French-related.**
**Not caused by this session's changes** — reproduced on the JS bundle from
before any of them.

## Reproduce

Discover → tap any world. Either entry point:

- a shelf card (`Last Five`, `The Ninth Archive`)
- the hero carousel's *Entrer dans ce monde*

The app disappears to the iOS home screen. Three crash reports in
`~/Library/Logs/DiagnosticReports/Plotbreak-*.ips`, one per attempt.

Tab navigation (Discover ↔ Profile ↔ Library) does **not** crash. Onboarding,
Discover, and Profile all render fine. It is the story detail screen.

## The crash

```
EXC_BAD_ACCESS (SIGSEGV), KERN_INVALID_ADDRESS at 0x406b48
  facebook::react::calculateShadowViewMutations   × 9 frames, deduplicated
  facebook::react::MountingCoordinator::pullTransaction
  facebook::react::TelemetryController::pullTransaction
  -[RCTMountingManager performTransaction:]
```

A segfault inside React Native's C++ view diffing, on the mounting transaction
that puts the screen up. The repeated `calculateShadowViewMutations` frames and
a fault address that low look like stack exhaustion from a very deep view tree
rather than a bad pointer from JS.

No JS exception is logged, which fits: by the time this runs, JS has finished.

## What is not yet known

- **Whether it happens on a device.** The previous session played ten turns of
  Itachi on the physical phone, which means that build could open a world. That
  is the single most useful next check, and it decides whether this is a
  simulator-runtime problem or a ship blocker.
- Whether it is depth or node count. `WorldSheet.tsx` is the largest screen in
  the app and renders characters, locations, abilities, quests, relationships
  and status chips in one pass.

## Why it was not caught

Nothing plays this screen. `npm run smoke` and `fr:smoke` drive the API and the
turn pipeline with no UI at all — deliberately, and they are right to — so the
one screen between the shelf and a session has no automated coverage of any
kind. Every playtest in this project has started from a session id.
