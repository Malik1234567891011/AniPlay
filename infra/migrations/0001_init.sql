-- Project ANIMA — initial schema (spec §34, §35, §31.6)
--
-- Rules this schema is built to (§31.6):
--   * UUID primary keys.
--   * created_at / updated_at in UTC.
--   * Published story versions are immutable; sessions pin the version they
--     started on and never silently migrate.
--   * game_events and wallet_ledger are append-only. There is no UPDATE path.
--   * Soft delete where moderation or legal audit needs the record; privacy
--     deletion is a separate purge workflow.
--
-- Row Level Security is enabled on every table a client can reach (§31.7). The
-- API uses the service role and enforces ownership itself; RLS is the second
-- line so a leaked anon key cannot read another player's session.

BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- 0000_bootstrap.sql has already installed pgvector, or stood in for it.

-- ---------------------------------------------------------------------------
-- Identity (§34.1)
-- ---------------------------------------------------------------------------

CREATE TABLE profiles (
  user_id            uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  handle             text UNIQUE NOT NULL,
  display_name       text NOT NULL,
  avatar_url         text,
  is_guest           boolean NOT NULL DEFAULT false,
  -- Spec §6.2 — the age gate result is persisted server-side after sign-in.
  age_verified       boolean NOT NULL DEFAULT false,
  age_band           text,
  -- Spec §6.5 — set once when a guest is absorbed, so it cannot happen twice.
  migrated_from_guest_id uuid UNIQUE,
  deletion_requested_at  timestamptz,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE user_settings (
  user_id            uuid PRIMARY KEY REFERENCES profiles (user_id) ON DELETE CASCADE,
  show_advanced_relationship_stats boolean NOT NULL DEFAULT false,
  show_check_math    boolean NOT NULL DEFAULT false,
  reduce_motion      boolean NOT NULL DEFAULT false,
  voice_autoplay     boolean NOT NULL DEFAULT false,
  haptics_enabled    boolean NOT NULL DEFAULT true,
  default_quality_tier text NOT NULL DEFAULT 'VIVID',
  content_filters    text[] NOT NULL DEFAULT '{}',
  updated_at         timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE creator_profiles (
  user_id            uuid PRIMARY KEY REFERENCES profiles (user_id) ON DELETE CASCADE,
  creator_name       text NOT NULL,
  bio                text NOT NULL DEFAULT '',
  verified           boolean NOT NULL DEFAULT false,
  created_at         timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Catalog (§34.1)
-- ---------------------------------------------------------------------------

CREATE TABLE stories (
  story_id           text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug               text UNIQUE NOT NULL,
  -- Null for the official catalog, which ships with the app and belongs to
  -- nobody. A player-made world must name its author.
  creator_id         uuid REFERENCES profiles (user_id),
  official           boolean NOT NULL DEFAULT false,
  -- Points at the version Discover should surface. Null until first publish.
  published_version_id text,
  status             text NOT NULL DEFAULT 'DRAFT'
                       CHECK (status IN ('DRAFT','IN_REVIEW','PUBLISHED','UNLISTED','REMOVED')),
  CONSTRAINT stories_creator_required CHECK (official OR creator_id IS NOT NULL),
  deleted_at         timestamptz,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

-- Spec §31.6 — a published version is immutable. Editing means publishing a new
-- one; live sessions stay pinned to the version they started on (§35.3).
CREATE TABLE story_versions (
  story_version_id   text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  story_id           text NOT NULL REFERENCES stories (story_id) ON DELETE CASCADE,
  version            integer NOT NULL,
  -- The whole authored definition, validated against the StoryVersion contract
  -- before insert. Kept as one document because it is read whole and never
  -- partially updated.
  definition         jsonb NOT NULL,
  title              text NOT NULL,
  fantasy_label      text NOT NULL CHECK (char_length(fantasy_label) <= 42),
  hook               text NOT NULL,
  intensity          text NOT NULL CHECK (intensity IN ('LIGHT','MODERATE','INTENSE')),
  content_descriptors text[] NOT NULL DEFAULT '{}',
  -- Spec §21.5 — a version cannot be published until the quality gate passes.
  clarity_passed     boolean NOT NULL DEFAULT false,
  clarity_report     jsonb,
  published_at       timestamptz,
  created_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (story_id, version)
);

ALTER TABLE stories
  ADD CONSTRAINT stories_published_version_fk
  FOREIGN KEY (published_version_id) REFERENCES story_versions (story_version_id);

CREATE TABLE story_tags (
  tag                text PRIMARY KEY,
  label              text NOT NULL,
  kind               text NOT NULL DEFAULT 'GENRE'
);

CREATE TABLE story_version_tags (
  story_version_id   text NOT NULL REFERENCES story_versions (story_version_id) ON DELETE CASCADE,
  tag                text NOT NULL REFERENCES story_tags (tag),
  PRIMARY KEY (story_version_id, tag)
);

-- Generated art and audio. Spec §32.6 — provenance is stored on every asset.
CREATE TABLE media_assets (
  asset_id           text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  asset_key          text UNIQUE NOT NULL,
  kind               text NOT NULL
                       CHECK (kind IN ('COVER','KEY_ART','LOCATION_STAGE','CHARACTER_PORTRAIT',
                                       'PLAYER_PORTRAIT','HERO_FRAME','VOICE_LINE','ANIMATION')),
  owner_user_id      uuid REFERENCES profiles (user_id) ON DELETE SET NULL,
  story_version_id   text REFERENCES story_versions (story_version_id) ON DELETE CASCADE,
  url                text NOT NULL,
  width              integer,
  height             integer,
  alt_text           text NOT NULL DEFAULT '',
  provider           text NOT NULL,
  model              text NOT NULL,
  request_id         text NOT NULL,
  prompt_hash        text NOT NULL,
  seed               text NOT NULL,
  cost_usd           numeric(10,6) NOT NULL DEFAULT 0,
  -- Spec §19.5 — nothing reaches a player without passing acceptance.
  moderation_status  text NOT NULL DEFAULT 'PENDING'
                       CHECK (moderation_status IN ('PENDING','APPROVED','REJECTED')),
  moderation_reason  text,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX media_assets_story_idx ON media_assets (story_version_id);
CREATE INDEX media_assets_owner_idx ON media_assets (owner_user_id);

-- ---------------------------------------------------------------------------
-- Runtime game state (§34.2, §35)
-- ---------------------------------------------------------------------------

CREATE TABLE story_sessions (
  session_id         text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id            uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  story_id           text NOT NULL REFERENCES stories (story_id),
  -- Pinned at creation and never changed without an explicit, validated
  -- migration the player opted into (§35.3).
  story_version_id   text NOT NULL REFERENCES story_versions (story_version_id),
  display_name       text NOT NULL,
  status             text NOT NULL DEFAULT 'ACTIVE'
                       CHECK (status IN ('ACTIVE','COMPLETED','ARCHIVED')),
  -- Spec §12.1 — the root seed. Never leaves the server; clients see its hash.
  session_seed       text NOT NULL,
  branch_key         text NOT NULL DEFAULT 'main',
  forked_from_session_id text REFERENCES story_sessions (session_id) ON DELETE SET NULL,
  forked_at_turn_index integer,
  -- Optimistic concurrency (§17.4). Every commit bumps this.
  revision           integer NOT NULL DEFAULT 0,
  turn_index         integer NOT NULL DEFAULT 0,
  created_at         timestamptz NOT NULL DEFAULT now(),
  last_played_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX story_sessions_user_idx ON story_sessions (user_id, last_played_at DESC);
CREATE INDEX story_sessions_story_idx ON story_sessions (story_id);

-- Spec §35.1/§35.2 — snapshots exist for fast load. The event log is the truth;
-- a snapshot is a cache of it at a revision.
CREATE TABLE session_snapshots (
  snapshot_id        text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  revision           integer NOT NULL,
  state              jsonb NOT NULL,
  created_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, revision)
);

CREATE INDEX session_snapshots_latest_idx ON session_snapshots (session_id, revision DESC);

CREATE TABLE turns (
  turn_id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  turn_index         integer NOT NULL,
  -- Null on the authored opening turn, which the player did not write.
  action_text        text,
  quality_tier       text NOT NULL CHECK (quality_tier IN ('QUICK','VIVID','CINEMATIC','APEX')),
  credits_charged    integer NOT NULL DEFAULT 0,
  scene_summary      text NOT NULL DEFAULT '',
  blocks             jsonb NOT NULL DEFAULT '[]',
  checks             jsonb NOT NULL DEFAULT '[]',
  mutations          jsonb NOT NULL DEFAULT '[]',
  state_deltas       jsonb NOT NULL DEFAULT '[]',
  suggestions        jsonb NOT NULL DEFAULT '[]',
  -- The line the client shows under the beat, asking what you do next.
  end_state_prompt   text NOT NULL DEFAULT '',
  media_plan         jsonb,
  hero_asset_id      text REFERENCES media_assets (asset_id) ON DELETE SET NULL,
  -- Denormalised from the asset so replaying a timeline is one query. An image
  -- generated after the turn committed is attached here (§17.2).
  hero_image_url     text,
  -- Spec §12.1 — the audit handle. The seed itself is derived, never stored raw.
  rng_seed_hash      text NOT NULL,
  revision_after     integer NOT NULL,
  repair_violations  jsonb NOT NULL DEFAULT '[]',
  created_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, turn_index)
);

CREATE INDEX turns_session_idx ON turns (session_id, turn_index DESC);

-- Spec §35.1 — append-only. There is deliberately no UPDATE or DELETE policy.
CREATE TABLE game_events (
  event_id           text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  turn_id            text REFERENCES turns (turn_id) ON DELETE CASCADE,
  sequence           integer NOT NULL,
  type               text NOT NULL,
  subject_id         text NOT NULL,
  reason_code        text NOT NULL,
  payload            jsonb NOT NULL DEFAULT '{}',
  world_minute       integer NOT NULL,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX game_events_session_idx ON game_events (session_id, sequence);
CREATE INDEX game_events_turn_idx ON game_events (turn_id);

-- Spec §17.6 — retrieval filters by visibility *before* ranking, so an NPC's
-- prompt can never contain something they were not told.
CREATE TABLE memory_facts (
  fact_id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  subject_id         text NOT NULL,
  predicate          text NOT NULL,
  value              jsonb,
  text               text NOT NULL,
  visibility         text NOT NULL
                       CHECK (visibility IN ('WORLD_PUBLIC','FACTION','PARTY','NPC_PRIVATE',
                                             'PLAYER_PRIVATE','PAIR_PRIVATE','CREATOR_ONLY')),
  importance         real NOT NULL DEFAULT 0.5 CHECK (importance BETWEEN 0 AND 1),
  confidence         real NOT NULL DEFAULT 1,
  pinned             boolean NOT NULL DEFAULT false,
  corrected_by_player boolean NOT NULL DEFAULT false,
  created_at_turn    integer NOT NULL,
  created_at_world_minute integer NOT NULL,
  source_event_ids   text[] NOT NULL DEFAULT '{}',
  -- A superseded fact is history, not canon. Retrieval excludes it.
  superseded_by_fact_id text REFERENCES memory_facts (fact_id) ON DELETE SET NULL,
  -- Unconstrained here so the column exists with or without pgvector; the
  -- dimension and the ANN index are applied together below, only when the real
  -- extension is present.
  embedding          public.vector,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX memory_facts_session_idx ON memory_facts (session_id)
  WHERE superseded_by_fact_id IS NULL;
CREATE INDEX memory_facts_subject_idx ON memory_facts (session_id, subject_id);
-- IVFFlat needs data before it is worth building; created here so the shape is
-- documented, and rebuilt by the analytics rollup once rows exist.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') THEN
    EXECUTE 'ALTER TABLE memory_facts ALTER COLUMN embedding TYPE vector(1536)';
    EXECUTE $ix$CREATE INDEX memory_facts_embedding_idx ON memory_facts
      USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);$ix$;
  END IF;
END
$$;

-- Materialised runtime state. The snapshot is authoritative; these exist so the
-- World Sheet and quest predicates can be queried without loading a blob.
CREATE TABLE relationship_states (
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  character_id       text NOT NULL,
  trust              smallint NOT NULL DEFAULT 0 CHECK (trust BETWEEN -100 AND 100),
  affection          smallint NOT NULL DEFAULT 0 CHECK (affection BETWEEN -100 AND 100),
  respect            smallint NOT NULL DEFAULT 0 CHECK (respect BETWEEN -100 AND 100),
  fear               smallint NOT NULL DEFAULT 0 CHECK (fear BETWEEN 0 AND 100),
  rivalry            smallint NOT NULL DEFAULT 0 CHECK (rivalry BETWEEN 0 AND 100),
  -- -1 means "never interacted", so a first exchange is not recency-dampened.
  last_changed_turn  integer NOT NULL DEFAULT -1,
  unlocked_gates     text[] NOT NULL DEFAULT '{}',
  PRIMARY KEY (session_id, character_id)
);

CREATE TABLE quest_progress (
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  quest_id           text NOT NULL,
  status             text NOT NULL
                       CHECK (status IN ('UNAVAILABLE','DISCOVERED','ACTIVE','BLOCKED',
                                         'COMPLETED','FAILED','EXPIRED','HIDDEN_CONTINUATION')),
  current_step_id    text,
  completed_step_ids text[] NOT NULL DEFAULT '{}',
  started_at_world_minute integer,
  PRIMARY KEY (session_id, quest_id)
);

CREATE TABLE inventory_entries (
  entry_id           text NOT NULL,
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  item_id            text NOT NULL,
  quantity           integer NOT NULL CHECK (quantity > 0),
  equipped           boolean NOT NULL DEFAULT false,
  instance_name      text,
  PRIMARY KEY (session_id, entry_id)
);

CREATE TABLE resource_states (
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  resource_id        text NOT NULL,
  current            real NOT NULL,
  max                real NOT NULL,
  PRIMARY KEY (session_id, resource_id)
);

CREATE TABLE faction_states (
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  faction_id         text NOT NULL,
  reputation         smallint NOT NULL DEFAULT 0 CHECK (reputation BETWEEN -100 AND 100),
  rank_label         text NOT NULL DEFAULT '',
  PRIMARY KEY (session_id, faction_id)
);

CREATE TABLE encounters (
  encounter_id       text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  objective          text NOT NULL,
  round              integer NOT NULL DEFAULT 1,
  active_entity_id   text NOT NULL,
  turn_order         text[] NOT NULL DEFAULT '{}',
  zones              jsonb NOT NULL DEFAULT '[]',
  ended_at           timestamptz,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE encounter_participants (
  encounter_id       text NOT NULL REFERENCES encounters (encounter_id) ON DELETE CASCADE,
  entity_id          text NOT NULL,
  kind               text NOT NULL CHECK (kind IN ('PLAYER','NPC')),
  team               text NOT NULL CHECK (team IN ('ALLY','ENEMY','NEUTRAL')),
  initiative         integer NOT NULL DEFAULT 0,
  health             integer NOT NULL,
  max_health         integer NOT NULL,
  zone_id            text NOT NULL,
  downed             boolean NOT NULL DEFAULT false,
  PRIMARY KEY (encounter_id, entity_id)
);

-- ---------------------------------------------------------------------------
-- Economy (§34.3, §20.7)
-- ---------------------------------------------------------------------------

CREATE TABLE wallet_accounts (
  account_id         text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Nullable, and deliberately: the ledger below outlives the profile. A
  -- privacy deletion detaches the account and leaves the financial record
  -- standing until the retention purge takes it (§30).
  user_id            uuid UNIQUE REFERENCES profiles (user_id) ON DELETE SET NULL,
  created_at         timestamptz NOT NULL DEFAULT now()
);

-- Spec §20.7 — balance is derived from this log, never from a mutable integer.
-- Append-only: no UPDATE, no DELETE, retained through account deletion for
-- financial audit and purged separately (§30).
CREATE TABLE wallet_ledger (
  entry_id           text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  account_id         text NOT NULL REFERENCES wallet_accounts (account_id),
  type               text NOT NULL CHECK (type IN (
                       'PURCHASE','BONUS','DAILY_GRANT','NEW_USER_GRANT',
                       'TURN_RESERVE','TURN_FINALIZE','TURN_RELEASE',
                       'MEDIA_RESERVE','MEDIA_FINALIZE','MEDIA_RELEASE',
                       'REFUND','ADMIN_ADJUST','CREATOR_GRANT','PROMO_GRANT','FORK_FEE')),
  amount             integer NOT NULL,
  balance_after      integer NOT NULL,
  reason_code        text NOT NULL,
  reference_id       text,
  -- Uniqueness here is what makes grants and purchases exactly-once.
  idempotency_key    text,
  metadata           jsonb NOT NULL DEFAULT '{}',
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX wallet_ledger_idempotency_idx
  ON wallet_ledger (account_id, idempotency_key)
  WHERE idempotency_key IS NOT NULL;
CREATE INDEX wallet_ledger_account_idx ON wallet_ledger (account_id, created_at DESC);
CREATE INDEX wallet_ledger_reference_idx ON wallet_ledger (reference_id);

CREATE TABLE purchase_transactions (
  transaction_id     text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  account_id         text NOT NULL REFERENCES wallet_accounts (account_id),
  platform           text NOT NULL CHECK (platform IN ('APP_STORE','PLAY_STORE','SANDBOX')),
  -- Spec §33.5 — reconciliation is idempotent on the platform transaction id.
  store_transaction_id text NOT NULL,
  product_id         text NOT NULL,
  credits_granted    integer NOT NULL,
  bonus_granted      integer NOT NULL DEFAULT 0,
  price_local        numeric(12,2),
  currency           text,
  receipt            text,
  status             text NOT NULL DEFAULT 'VERIFIED'
                       CHECK (status IN ('PENDING','VERIFIED','REFUNDED','FAILED')),
  created_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (platform, store_transaction_id)
);

CREATE TABLE daily_grants (
  account_id         text NOT NULL REFERENCES wallet_accounts (account_id) ON DELETE CASCADE,
  -- Server day boundary, UTC. One row per account per day makes the grant
  -- exactly-once without relying on clock comparisons.
  server_day         date NOT NULL,
  amount             integer NOT NULL,
  created_at         timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (account_id, server_day)
);

CREATE TABLE promo_redemptions (
  account_id         text NOT NULL REFERENCES wallet_accounts (account_id) ON DELETE CASCADE,
  promo_code         text NOT NULL,
  amount             integer NOT NULL,
  created_at         timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (account_id, promo_code)
);

-- Spec §17.3 — a turn POST is exactly-once on its idempotency key.
CREATE TABLE idempotency_keys (
  key                text PRIMARY KEY,
  user_id            uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  session_id         text REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  request_hash       text NOT NULL,
  turn_id            text,
  status             text NOT NULL DEFAULT 'IN_PROGRESS'
                       CHECK (status IN ('IN_PROGRESS','COMPLETED','FAILED')),
  response_body      jsonb,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idempotency_keys_created_idx ON idempotency_keys (created_at);

-- ---------------------------------------------------------------------------
-- Social and discovery (§34.4)
-- ---------------------------------------------------------------------------

-- Live counters the discovery ranking reads. The offline rollup in
-- story_quality_rollups is the analytical view of the same activity; this is
-- the one a request can afford to read.
CREATE TABLE story_signals (
  story_id           text PRIMARY KEY REFERENCES stories (story_id) ON DELETE CASCADE,
  runs               integer NOT NULL DEFAULT 0,
  likes              integer NOT NULL DEFAULT 0,
  saves              integer NOT NULL DEFAULT 0,
  hides              integer NOT NULL DEFAULT 0,
  reports            integer NOT NULL DEFAULT 0,
  impressions        integer NOT NULL DEFAULT 0,
  updated_at         timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE story_saves (
  user_id            uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  story_id           text NOT NULL REFERENCES stories (story_id) ON DELETE CASCADE,
  created_at         timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, story_id)
);

CREATE TABLE story_likes (
  user_id            uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  story_id           text NOT NULL REFERENCES stories (story_id) ON DELETE CASCADE,
  created_at         timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, story_id)
);

CREATE TABLE story_hides (
  user_id            uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  story_id           text NOT NULL REFERENCES stories (story_id) ON DELETE CASCADE,
  created_at         timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, story_id)
);

CREATE TABLE creator_follows (
  follower_id        uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  creator_id         uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  created_at         timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, creator_id)
);

CREATE TABLE story_impressions (
  impression_id      bigserial PRIMARY KEY,
  story_id           text NOT NULL REFERENCES stories (story_id) ON DELETE CASCADE,
  user_id            uuid REFERENCES profiles (user_id) ON DELETE SET NULL,
  surface            text NOT NULL,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX story_impressions_story_idx ON story_impressions (story_id, created_at DESC);

-- Spec §7.4 — computed offline over 1d/7d/30d/lifetime windows with Bayesian
-- shrinkage. The read path never recomputes this.
CREATE TABLE story_quality_rollups (
  story_id           text NOT NULL REFERENCES stories (story_id) ON DELETE CASCADE,
  -- `window` is reserved in Postgres.
  window_span        text NOT NULL CHECK (window_span IN ('1d','7d','30d','lifetime')),
  qualified_start_rate real NOT NULL DEFAULT 0,
  turn_10_rate       real NOT NULL DEFAULT 0,
  d1_story_return    real NOT NULL DEFAULT 0,
  median_session_depth real NOT NULL DEFAULT 0,
  save_rate          real NOT NULL DEFAULT 0,
  share_rate         real NOT NULL DEFAULT 0,
  payer_conversion   real NOT NULL DEFAULT 0,
  creator_follow_rate real NOT NULL DEFAULT 0,
  report_rate        real NOT NULL DEFAULT 0,
  hide_rate          real NOT NULL DEFAULT 0,
  generation_failure_rate real NOT NULL DEFAULT 0,
  impressions        integer NOT NULL DEFAULT 0,
  runs               integer NOT NULL DEFAULT 0,
  score              real NOT NULL DEFAULT 0,
  computed_at        timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (story_id, window_span)
);

CREATE TABLE share_artifacts (
  artifact_id        text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id            uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  session_id         text REFERENCES story_sessions (session_id) ON DELETE SET NULL,
  turn_id            text REFERENCES turns (turn_id) ON DELETE SET NULL,
  kind               text NOT NULL CHECK (kind IN ('RECAP','HERO_IMAGE','TIMELINE')),
  asset_id           text REFERENCES media_assets (asset_id) ON DELETE SET NULL,
  hide_display_name  boolean NOT NULL DEFAULT false,
  spoiler_title      text,
  created_at         timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Safety and ops (§34.5)
-- ---------------------------------------------------------------------------

CREATE TABLE reports (
  report_id          text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  reporter_user_id   uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  target_type        text NOT NULL CHECK (target_type IN ('STORY','TURN','USER','MEDIA','COMMENT')),
  target_id          text NOT NULL,
  reason             text NOT NULL,
  details            text NOT NULL DEFAULT '',
  status             text NOT NULL DEFAULT 'OPEN'
                       CHECK (status IN ('OPEN','REVIEWING','ACTIONED','DISMISSED')),
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX reports_status_idx ON reports (status, created_at);
CREATE INDEX reports_reporter_idx ON reports (reporter_user_id);

CREATE TABLE blocks (
  user_id            uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  target_user_id     uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  created_at         timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, target_user_id)
);

CREATE TABLE moderation_cases (
  case_id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  subject_type       text NOT NULL,
  subject_id         text NOT NULL,
  severity           text NOT NULL CHECK (severity IN ('LOW','MEDIUM','HIGH','CRITICAL')),
  status             text NOT NULL DEFAULT 'OPEN'
                       CHECK (status IN ('OPEN','REVIEWING','RESOLVED')),
  assigned_to        uuid REFERENCES profiles (user_id) ON DELETE SET NULL,
  created_at         timestamptz NOT NULL DEFAULT now(),
  resolved_at        timestamptz
);

CREATE TABLE moderation_actions (
  action_id          text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  case_id            text NOT NULL REFERENCES moderation_cases (case_id) ON DELETE CASCADE,
  actor_user_id      uuid NOT NULL REFERENCES profiles (user_id),
  action             text NOT NULL,
  notes              text NOT NULL DEFAULT '',
  created_at         timestamptz NOT NULL DEFAULT now()
);

-- Spec §20.12 / §37.3 — every paid provider call is recorded so unit economics
-- are measured rather than assumed.
CREATE TABLE model_invocations (
  invocation_id      bigserial PRIMARY KEY,
  turn_id            text REFERENCES turns (turn_id) ON DELETE CASCADE,
  session_id         text REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  role               text NOT NULL,
  provider           text NOT NULL,
  model              text NOT NULL,
  request_id         text NOT NULL,
  input_tokens       integer NOT NULL DEFAULT 0,
  output_tokens      integer NOT NULL DEFAULT 0,
  cost_usd           numeric(10,6) NOT NULL DEFAULT 0,
  latency_ms         integer NOT NULL DEFAULT 0,
  ok                 boolean NOT NULL DEFAULT true,
  error_code         text,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX model_invocations_turn_idx ON model_invocations (turn_id);
CREATE INDEX model_invocations_cost_idx ON model_invocations (created_at, role);

CREATE TABLE generation_costs (
  turn_id            text PRIMARY KEY REFERENCES turns (turn_id) ON DELETE CASCADE,
  quality_tier       text NOT NULL,
  text_cost_usd      numeric(10,6) NOT NULL DEFAULT 0,
  image_cost_usd     numeric(10,6) NOT NULL DEFAULT 0,
  voice_cost_usd     numeric(10,6) NOT NULL DEFAULT 0,
  total_cost_usd     numeric(10,6) NOT NULL DEFAULT 0,
  credits_charged    integer NOT NULL DEFAULT 0,
  created_at         timestamptz NOT NULL DEFAULT now()
);

-- Spec §31.7 — every wallet, admin, and moderation change is audited.
CREATE TABLE admin_audit_log (
  audit_id           bigserial PRIMARY KEY,
  actor_user_id      uuid NOT NULL REFERENCES profiles (user_id),
  action             text NOT NULL,
  subject_type       text NOT NULL,
  subject_id         text NOT NULL,
  before             jsonb,
  after              jsonb,
  reason             text NOT NULL DEFAULT '',
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX admin_audit_log_subject_idx ON admin_audit_log (subject_type, subject_id);

-- ---------------------------------------------------------------------------
-- Co-op (§34.6) — schema present, feature flagged off at launch (§2.2)
-- ---------------------------------------------------------------------------

CREATE TABLE coop_rooms (
  room_id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  host_user_id       uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  invite_token       text UNIQUE NOT NULL,
  status             text NOT NULL DEFAULT 'LOBBY'
                       CHECK (status IN ('LOBBY','ACTIVE','ENDED')),
  intent_window_seconds integer NOT NULL DEFAULT 20,
  pvp_enabled        boolean NOT NULL DEFAULT false,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE coop_room_members (
  room_id            text NOT NULL REFERENCES coop_rooms (room_id) ON DELETE CASCADE,
  user_id            uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  ready              boolean NOT NULL DEFAULT false,
  joined_at          timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (room_id, user_id)
);

CREATE TABLE coop_windows (
  window_id          text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  room_id            text NOT NULL REFERENCES coop_rooms (room_id) ON DELETE CASCADE,
  turn_index         integer NOT NULL,
  opens_at           timestamptz NOT NULL,
  closes_at          timestamptz NOT NULL,
  resolved           boolean NOT NULL DEFAULT false
);

CREATE TABLE coop_intents (
  intent_id          text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  window_id          text NOT NULL REFERENCES coop_windows (window_id) ON DELETE CASCADE,
  user_id            uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  action_text        text NOT NULL,
  submitted_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (window_id, user_id)
);

-- Spec §28.7 — whispers and private reveals are scoped, not broadcast.
CREATE TABLE private_events (
  private_event_id   text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_id         text NOT NULL REFERENCES story_sessions (session_id) ON DELETE CASCADE,
  turn_id            text REFERENCES turns (turn_id) ON DELETE CASCADE,
  visibility         text NOT NULL,
  audience_user_ids  uuid[] NOT NULL DEFAULT '{}',
  content            jsonb NOT NULL,
  created_at         timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Append-only enforcement (§31.6)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION reject_mutation() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION '% is append-only', TG_TABLE_NAME;
END;
$$;

CREATE TRIGGER wallet_ledger_append_only
  BEFORE UPDATE OR DELETE ON wallet_ledger
  FOR EACH ROW EXECUTE FUNCTION reject_mutation();

CREATE TRIGGER game_events_append_only
  BEFORE UPDATE OR DELETE ON game_events
  FOR EACH ROW EXECUTE FUNCTION reject_mutation();

-- A published story version is frozen. Sessions pin it, so editing it would
-- rewrite history for everyone mid-run (§35.3).
CREATE OR REPLACE FUNCTION reject_published_version_edit() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.published_at IS NOT NULL AND NEW.definition IS DISTINCT FROM OLD.definition THEN
    RAISE EXCEPTION 'story_versions.definition is immutable once published';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER story_versions_immutable
  BEFORE UPDATE ON story_versions
  FOR EACH ROW EXECUTE FUNCTION reject_published_version_edit();

-- ---------------------------------------------------------------------------
-- Row Level Security (§31.7)
-- ---------------------------------------------------------------------------

ALTER TABLE profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings         ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_sessions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_snapshots     ENABLE ROW LEVEL SECURITY;
ALTER TABLE turns                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_events           ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_facts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_accounts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_ledger         ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_saves           ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_hides           ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports               ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks                ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_self ON profiles
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY profiles_update_self ON profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY user_settings_self ON user_settings
  USING (user_id = auth.uid());

CREATE POLICY sessions_own ON story_sessions
  USING (user_id = auth.uid());

-- Session-scoped tables inherit ownership from the session.
CREATE POLICY snapshots_own ON session_snapshots
  USING (EXISTS (SELECT 1 FROM story_sessions s
                 WHERE s.session_id = session_snapshots.session_id AND s.user_id = auth.uid()));
CREATE POLICY turns_own ON turns
  USING (EXISTS (SELECT 1 FROM story_sessions s
                 WHERE s.session_id = turns.session_id AND s.user_id = auth.uid()));
CREATE POLICY events_own ON game_events
  USING (EXISTS (SELECT 1 FROM story_sessions s
                 WHERE s.session_id = game_events.session_id AND s.user_id = auth.uid()));
CREATE POLICY memory_own ON memory_facts
  USING (EXISTS (SELECT 1 FROM story_sessions s
                 WHERE s.session_id = memory_facts.session_id AND s.user_id = auth.uid()));

CREATE POLICY wallet_own ON wallet_accounts
  USING (user_id = auth.uid());
CREATE POLICY ledger_own ON wallet_ledger
  FOR SELECT USING (EXISTS (SELECT 1 FROM wallet_accounts a
                            WHERE a.account_id = wallet_ledger.account_id AND a.user_id = auth.uid()));
CREATE POLICY purchases_own ON purchase_transactions
  FOR SELECT USING (EXISTS (SELECT 1 FROM wallet_accounts a
                            WHERE a.account_id = purchase_transactions.account_id AND a.user_id = auth.uid()));

CREATE POLICY saves_own ON story_saves USING (user_id = auth.uid());
CREATE POLICY hides_own ON story_hides USING (user_id = auth.uid());
CREATE POLICY reports_own ON reports FOR SELECT USING (reporter_user_id = auth.uid());
CREATE POLICY blocks_own ON blocks USING (user_id = auth.uid());

COMMIT;
