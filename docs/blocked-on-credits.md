# Turns cannot commit: the OpenAI account is out of credits

**Found:** 2026-09-11. **Blocks:** every playtest, English and French.

## What it looks like from outside

`POST /v1/sessions/<id>/turns` returns `202` with a `turnId`. Then
`GET /v1/turns/<turnId>` answers `404` forever. The poll itself is fast
(~190ms), so nothing is hanging — the turn is simply never committed and never
will be.

I spent a long time reading this as a performance problem. It is not. Ruled out
along the way, all measured, all innocent:

- `localizeStory` overlay cost — 0.2–0.7ms per call
- memory pressure — freed 992MB, identical behaviour
- retry backoff — `DEFAULT_ATTEMPTS = 3`, `DEFAULT_BASE_DELAY_MS = 400`,
  so 1.2s per stage maximum. Cannot produce a multi-minute anything.

## The actual cause

```
[turn] turn_6a658fd9 failed: ModelGatewayError: Provider balance exhausted:
  "You have no credits remaining. Add credits to continue using the API"
    at OpenAiGateway.streamText (packages/director/src/gateway/openai.ts:233)
    at writeStreaming   (packages/director/src/fast-writer.ts:219)
    at runTurn          (packages/director/src/pipeline.ts:309)
  code: 'RATE_LIMITED', retryable: false
```

`moderation` and `intent_fast` both degrade to a rule-based path when the
provider refuses, which is why `/health` showed 27 moderation degradations and
the pipeline still looked alive. **The writer has no rule-based fallback** —
there is no rule-based way to write prose — so it throws, `processTurn` catches,
the reservation is released, and the turn never exists.

The player is correctly not charged. That part works.

## Fix

Add credits to the OpenAI account. Nothing in this repo can work around it;
a writer with no provider has nothing to write with.

## What this exposed that is worth keeping

1. **The failure was invisible.** `processTurn`'s catch emitted `turn.failed` to
   the SSE stream and logged nothing. A server-side turn failure left no trace
   at all, which is how a billing problem spent hours reading as an engine hang.
   Fixed: `services/api/src/turn-service.ts` now logs the error.
2. **The reconciliation window was shorter than a turn.** I first assumed a
   client that lost the stream would spin forever. It does not: `client.ts`
   falls back to polling `/v1/turns/<id>`, and `Session.tsx` shows a retryable
   error. Both correct. But the poll budget was 40 attempts at a flat 250ms —
   **ten seconds**, less than a normal turn takes. So a stream dropped early
   (app backgrounded, wifi handing over to cellular) told the player "that turn
   didn't complete, you weren't charged" and handed their draft back, while the
   turn committed a few seconds later and became invisible to them.
   Fixed: 12 fast attempts then 1s apart, ~91s total.
3. **`fr:smoke` polls the wrong endpoint.** It reports "no committed turn after
   60s" for what the server knew instantly was a hard, non-retryable failure.
   A harness that cannot distinguish "slow" from "dead" sends you looking for a
   performance problem that does not exist. That is most of why this took as
   long as it did.
