# Running PLOTBREAK

Everything needed to get the app on a phone and play a turn. Written for Omar,
2026-09-11.

There are three moving parts: a **Postgres database** (Supabase, already live),
an **API** (Node, currently only on Malik's laptop), and the **iOS app** (Expo /
React Native). The app talks only to the API; the API talks to Supabase and to a
model provider.

---

## 1. What you need from Malik

None of these are in the repo, and none should be pasted into Slack or a doc.
Ask him for a `.env` file directly.

| Variable | What it is |
|---|---|
| `DATABASE_URL` | Supabase Postgres connection string |
| `SUPABASE_URL` | `https://<project>.supabase.co` |
| `SUPABASE_ANON_KEY` | Public anon key — ships in the app, safe-ish, still not for Slack |
| `OPENAI_API_KEY` | Writes every turn. **This is the one that costs money.** |
| `PUBLIC_BASE_URL` | Where the API is reachable — see §3 |
| `MEDIA_EPOCH` | Cache-busts regenerated art |

Two `.env` files:

- **`/.env`** at the repo root — everything above. The API reads it.
- **`/apps/mobile/.env`** — needs `EXPO_PUBLIC_API_URL` (where the phone finds
  the API) and `EXPO_PUBLIC_LEGAL_BASE_URL=https://www.plotbreak.com`, plus
  `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

Both are gitignored, which is why they are not in your checkout.

If the OpenAI account is out of credit, **every turn fails**. The app looks
fine — worlds browse, sessions open, the opening beat appears, because that is
authored text — and then nothing commits. If turns hang, check the balance
first.

---

## 2. First run

```bash
nvm use 22            # Node 22; the repo is ESM + tsx
npm install
npm run migrate       # publishes the 23 worlds into Supabase; idempotent
npm run api           # Fastify on :4000, tsx watch
```

Check it: `curl localhost:4000/health` → `200`.

Gates, all of which should exit 0:

```bash
npm run typecheck
npm test
npm run fr:lint       # French catalogue: 727/727 keys
npm run fr:qa         # suspicious French, a queue not a verdict
```

⚠️ `npm run lint` is currently a **no-op** — the root script delegates to
workspaces and no workspace defines one. It exits 0 having run nothing. Do not
read it as a passing gate.

---

## 3. Getting it onto a phone

The API is not deployed yet, so the phone has to reach the laptop running it.
Both on the same wifi, and:

```bash
ipconfig getifaddr en0        # e.g. 10.144.7.164
```

Put that in **both** files:

- root `.env` → `PUBLIC_BASE_URL=http://10.144.7.164:4000`
- `apps/mobile/.env` → `EXPO_PUBLIC_API_URL=http://10.144.7.164:4000`

`PUBLIC_BASE_URL` matters more than it looks: it is what the API stamps into
image URLs and the turn stream URL. Leave it as localhost and the phone will
dutifully try to fetch images from itself and show none.

Then build. **Release, not Debug** — a Debug build expects a Metro server and
shows "No script URL provided" when you open it later:

```bash
# from the repo root, with the phone plugged in and unlocked
xcodebuild -workspace apps/mobile/ios/Plotbreak.xcworkspace \
  -scheme Plotbreak -configuration Release \
  -destination 'platform=iOS,id=<device-udid>' \
  DEVELOPMENT_TEAM=Q7ZLXMG4SB CODE_SIGN_STYLE=Automatic
```

Simulator is easier: `npm run mobile` and press `i`.

**Iterating on JS without a full rebuild.** The installed app runs an embedded
bundle, so Metro reloads do nothing. Rebuild just the bundle and swap it:

```bash
cd apps/mobile
npx expo export:embed --platform ios --dev false --entry-file index.ts \
  --bundle-output /tmp/b/main.jsbundle --assets-dest /tmp/b
cp /tmp/b/main.jsbundle "<Simulator .app path>/main.jsbundle"
```

About 60 seconds instead of a native build.

---

## 4. Language

The app follows the phone. A French device opens in French; everything else
gets English. Profile → Langue switches it by hand.

French is real, not a stub: 22 of 23 worlds carry complete French world text and
the interface catalogue is 727/727. **Nine Weeks is at 11%** and is the one gap.

---

## 5. What is left before the App Store

Full detail in `RELEASE.md`; the Apple-account half is in `AppleForOmar.md`.
Short version, in order:

1. **Deploy the API.** It is containerised now (`Dockerfile`, `fly.toml`) but
   not yet running anywhere. Nothing else can be tested by a real person until
   it is. Note the media caveat in `docs/deploy.md`: generated art is written to
   the filesystem, so it needs a volume or object storage.
2. **Safety, for Guideline 1.2.** Reporting works; blocking does nothing, there
   is no moderation queue, and comments are unfiltered. Being worked on now.
3. **Crash reporting.** There is none. Being worked on now.
4. **App Store Connect**: the app record, and six IAP consumables that do not
   exist yet — product IDs and prices are in `AppleForOmar.md`. Superwall was
   considered and dropped; purchases go through StoreKit directly.

Decided and closed: French ships; anonymous users stay uncapped; Itachi ships as
it is.

---

## 6. Things that will confuse you, because they confused us

- **`npm run lint` runs nothing.** See above.
- **`infra/scripts` is not typechecked** — not a workspace, no root tsconfig, so
  a type error in a seed or migrate script ships silently.
- **There are two implementations of most AI stages**, and the streaming one is
  what production runs. A rule added to the non-streaming path does nothing.
  `CLAUDE.md` lists this as the bug that has bitten most often; it bit again
  today in the check-math setting.
- **`npm run smoke` plays every world badly on purpose.** It is where the real
  bugs come from. `npm run fr:smoke` is the French version.
- **Stories are versioned, not edited in place.** A fixture change needs
  `npm run migrate` *and* a new session to take effect.
- **Unpolyfilled `Intl` crashes Hermes.** `Intl.RelativeTimeFormat` segfaulted
  the app on every story page until today. `packages/i18n/src/polyfill.spec.ts`
  now fails the build if anyone reaches for one again.
