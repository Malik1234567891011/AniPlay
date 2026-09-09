# AniPlay — Project ANIMA

An anime-flavoured roleplay RPG where you type anything and a **deterministic game
engine** decides what actually happens.

> The model interprets intent. The game engine determines truth. The AI director
> makes truth entertaining.

Built to `PROJECT_ANIMA_PRODUCT_SPEC.md` v1.0, `ai_contracts.json` v1.0.0, and
`screen_inventory.csv`.

## Why this architecture

Most "AI RPGs" let the language model narrate itself into omnipotence: you type
"she falls in love with me" and she does. Here the model never decides outcomes.
It parses your sentence into a structured intent, a pure TypeScript engine rolls
the dice and mutates state, and only then does a writer describe what the engine
already decided. Relationship gates, inventory, quests, and death are engine
truth — prose is decoration over it.

## Layout

```
apps/mobile        Expo / React Native client (four root tabs + session shell)
apps/admin         Next.js admin console
services/api       Fastify /v1 API, SSE turn streaming, wallet ledger
services/worker    Async media, embeddings, rollups
packages/contracts Zod twins of ai_contracts.json + the REST surface
packages/engine    Pure deterministic rules: seeded RNG, checks, mutations
packages/director  Context building, model gateway, beat planning, writing
packages/ui        Design-system primitives (spec §25/§26)
packages/analytics Typed event names
packages/config    Feature flags and environment-safe public config
infra/migrations   Postgres schema
infra/seed         Official launch worlds
```

`director` is never imported into the client. No model, storage, or store secret
ever reaches the app bundle (spec §31.7).

## Running it

```bash
npm install
npm run api      # http://localhost:4000  — works with zero API keys
npm run mobile   # Expo; press "i" for the iOS simulator
```

The API defaults to a deterministic mock model provider, so the full turn
pipeline — parse → resolve → direct → write → validate → commit → stream — runs
end to end offline. Set `ANTHROPIC_API_KEY` to route the parser/director/writer
roles to a real model instead.

## Docs

- [`docs/architecture.md`](docs/architecture.md) — turn pipeline and package boundaries
- [`docs/engine.md`](docs/engine.md) — check maths, outcome bands, mutation rules
- [`docs/status.md`](docs/status.md) — what is built vs. what the spec still wants
