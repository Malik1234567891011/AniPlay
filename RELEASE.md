# What is left before an App Store push

Verified first-hand, 2026-09-11. A background audit is still running and will
add to this; everything below I checked myself and can point at.

Content is **not** on this list. Stories and French world text live in Supabase
and are fetched at runtime, so they can keep landing after launch without a new
build. What cannot wait is anything compiled into the binary, anything Apple
reviews, and anything that has to exist on a server.

---

## BLOCKS THE PUSH

### 1. There is no production API. This is the big one.

`apps/mobile/.env` points the app at `http://10.144.7.164:4000` — Malik's
laptop, on Malik's wifi. There is no `Dockerfile`, no `fly.toml`, no
`render.yaml`, no `vercel.json`, no `Procfile`, and no `.github/workflows`.

So the app works for exactly one person in one building. Nothing else on this
list matters until the API is deployed somewhere with a real hostname.

It also has to be **HTTPS**. `Info.plist` sets `NSAllowsArbitraryLoads=false`
with `NSAllowsLocalNetworking=true`, which is correct and is why the LAN build
works today — but a plain `http://` production host would be blocked by App
Transport Security, and asking Apple for an exception is a fight worth avoiding.

Needs: a host (Fly/Render/Railway/EC2 — anything), a domain, TLS, and the
production environment variables set there rather than in a local `.env`.
**Size: medium.** Nothing about the code has to change.

### 2. The model provider has to be funded, and capped.

Every turn calls a model. The account ran dry mid-session today and every turn
in the app stopped committing, because the writer stage is the one stage with no
rule-based fallback. In production that is an outage with no error message worth
reading.

Needs: a funded key on the production host, a spend limit, and an alert. Worth
deciding now whether that is OpenAI or Anthropic — `createGatewayFromEnv`
already supports both and prefers `ANTHROPIC_API_KEY` when present, so it is one
environment variable either way.
**Size: small, but it is a business decision, not a code one.**

### 3. Superwall is not integrated at all.

There is no Superwall SDK, no paywall configuration, nothing. If the plan is to
run monetization through Superwall rather than the hand-built credit screen,
that work has not started.
**Size: medium-large.** Worth deciding whether it is needed for v1 at all,
given the credit screen and StoreKit path already exist.

### 4. Privacy policy and Terms have to exist and be reachable.

`EXPO_PUBLIC_LEGAL_BASE_URL` is unset, so `LEGAL_LINKS_CONFIGURED` is false and
the links are hidden — deliberately, with a comment saying a dead link on the
age gate is the first thing review taps. Correct behaviour, but Apple requires a
privacy policy URL on the App Store listing regardless.

Needs: two pages hosted somewhere, then set that one variable.
**Size: small once the pages are written.**

### 5. Apple-account work — see `AppleForOmar.md`

The App ID capability for Sign in with Apple, six IAP consumables that do not
exist yet, and the Paid Applications agreement. All blocked on the paid
developer account.

---

## SHOULD FIX BEFORE LAUNCH

### 6. Decide what French is at launch.

Right now French is real but unreachable: `DEVICE_LOCALE_AUTODETECT` is `false`,
and the language picker is behind a seven-tap gate on the Profile heading. A
French speaker cannot find it.

Two honest options:
- **Ship English-only**, and leave the gate where it is. Nothing to do.
- **Ship French**, which means promoting the picker to a normal row — and
  finishing Nine Weeks first, which is at 11% (41 of 390 fields) while the other
  22 worlds are at 100%.

The interface strings are bundled in the app, so a French *UI* needs a build.
French *world text* does not.
**Size: small to decide, medium to finish Nine Weeks.**

### 7. Two gates are not gating anything.

- `npm run lint` delegates `--workspaces --if-present` and **no workspace
  defines a lint script**, so it exits 0 having run nothing. Every green lint in
  this project's history means nothing.
- `infra/scripts` is not in any workspace and there is no root `tsconfig.json`,
  so the seed, migrate and smoke scripts are never typechecked.
- There is no CI at all, so none of the gates run unless someone runs them.

**Size: small each.** The lint one may surface a pile of violations the first
time it actually runs, which is the point.

### 8. Anonymous users are uncapped.

Every install mints a Supabase anonymous user. Supabase's own console warns that
without captcha this inflates MAU and can be abused into a bill. Native captcha
is awkward, so the pragmatic answer is probably to ship and watch, but it should
be a decision rather than a surprise.
**Size: small to monitor, medium to add captcha.**

---

## CAN LAND AFTER THE PUSH

- New worlds, and French world text, including Nine Weeks if French ships later.
  Both are Supabase rows.
- Auto-Reload and "Save 20% on web" from the reference app. Both bill outside
  Apple IAP and need the External Purchase Link entitlement; see
  `AppleForOmar.md`.
- The remaining French UI polish beyond what is already done.

---

## Fixed today, worth noting so nobody re-opens them

- The story screen crashed the app on every open (`Intl.RelativeTimeFormat`
  segfaulting Hermes). Fixed, with a build-failing guard so it cannot come back.
- Every cold start re-ran onboarding.
- A guest could not be French at all — the app never sent `accept-language`.
- Sign in with Apple was disabled in Supabase. Enabled today.
