-- The language a player reads in.
--
-- Two locales exist and both are permanent: `en` is not "no locale" and `fr` is
-- not a mode.
--
-- The column is **nullable and has no default**, deliberately. NULL means "this
-- player has never chosen a language", which is not the same as choosing
-- English: it is what lets the device's own language be consulted later without
-- overriding somebody's actual preference. Every row that existed before this
-- migration is correctly NULL.
--
-- Note there is deliberately **no** `locale` column on `story_sessions`. A run's
-- locale is frozen at creation and lives in `GameState.locale`, inside the
-- `session_snapshots.state` jsonb — one authoritative copy that cannot drift
-- from the state the writer and the director actually read. Every route that
-- needs a session's locale has already loaded its state.

ALTER TABLE user_settings
  ADD COLUMN IF NOT EXISTS locale text
    CHECK (locale IS NULL OR locale IN ('en','fr'));

COMMENT ON COLUMN user_settings.locale IS
  'Explicit language choice for NEW runs; NULL means never chosen. An existing run keeps GameState.locale, frozen at creation.';
