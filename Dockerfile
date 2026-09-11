# The API, containerised.
#
# Runs straight from TypeScript with `tsx`, which is what `npm start` already
# does — the packages have no build step and adding one for deployment would be
# a second way to be wrong about module resolution.
#
# Assets are the interesting part. `infra/seed/assets` is 3.2 GB on a dev
# machine, and almost none of it belongs in an image:
#
#   * `hero/` is 1803 runtime-generated turn images, 2.1 GB of playtest debris.
#   * The `.png` files are 3.0 GB and are sources; `/media/*` serves `.webp`
#     first and only falls back to `.png`.
#
# What actually ships is the world art as webp: 1225 files, 80 MB. See
# `.dockerignore`.
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY packages ./packages
COPY services ./services
# `apps/` holds the mobile client. The API never imports it, and installing its
# React Native tree would multiply the image for nothing.
RUN npm ci --omit=dev --workspace @aniplay/api --include-workspace-root \
 || npm install --omit=dev --workspace @aniplay/api --include-workspace-root

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
# tsx is the runtime, so it is a production dependency here whatever the
# package.json says about it.
RUN npm i -g tsx@4

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY packages ./packages
COPY services ./services
COPY infra/seed/assets ./infra/seed/assets

# Generated portraits and hero frames are written here at runtime. On a
# container filesystem that is ephemeral, so this path must be a mounted volume
# (or ASSET_ROOT must point at object storage) or every redeploy loses the art
# players paid credits for. See docs/deploy.md.
ENV ASSET_ROOT=/app/infra/seed/assets

EXPOSE 4000
# The API already binds 0.0.0.0 and honours PORT, so nothing is overridden here.
CMD ["tsx", "services/api/src/index.ts"]
