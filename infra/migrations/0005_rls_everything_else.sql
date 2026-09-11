-- Row Level Security on everything else.
--
-- `0004` covered the five social tables and `story_likes`. Checking the live
-- database afterwards showed thirty-two more `public` tables with RLS off —
-- a far wider surface than the social gap, and it includes the session-scoped
-- player state the original invariant was written to protect:
-- `quest_progress`, `relationship_states`, `resource_states`,
-- `inventory_entries`, `faction_states`, `encounters`, `private_events`.
--
-- It also includes things no client should ever see: `admin_audit_log`,
-- `moderation_cases`, `moderation_actions`, `model_invocations`,
-- `generation_costs`, `idempotency_keys`.
--
-- Enabled with **no policies**, which in Postgres means deny-all for the `anon`
-- and `authenticated` roles. That is safe here because the mobile app never
-- queries PostgREST: it uses Supabase for authentication only, written against
-- the auth endpoints, and reads every row of game data through our own API.
-- The API connects with the service role, which bypasses RLS by design, so
-- nothing in the product changes.
--
-- If a table later needs to be readable by a client directly, give it an
-- explicit policy then. Deny-by-default is the posture that does not have to be
-- audited twice.

BEGIN;

ALTER TABLE admin_audit_log            ENABLE ROW LEVEL SECURITY;
ALTER TABLE coop_intents               ENABLE ROW LEVEL SECURITY;
ALTER TABLE coop_room_members          ENABLE ROW LEVEL SECURITY;
ALTER TABLE coop_rooms                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE coop_windows               ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_follows            ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_grants               ENABLE ROW LEVEL SECURITY;
ALTER TABLE encounter_participants     ENABLE ROW LEVEL SECURITY;
ALTER TABLE encounters                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE faction_states             ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_costs           ENABLE ROW LEVEL SECURITY;
ALTER TABLE idempotency_keys           ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_entries          ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets               ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_invocations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_actions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_cases           ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_events             ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_redemptions          ENABLE ROW LEVEL SECURITY;
ALTER TABLE quest_progress             ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationship_states        ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_states            ENABLE ROW LEVEL SECURITY;
ALTER TABLE schema_migrations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_artifacts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_impressions          ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_quality_rollups      ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_signals              ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_tags                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_version_tags         ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_versions             ENABLE ROW LEVEL SECURITY;

COMMIT;
