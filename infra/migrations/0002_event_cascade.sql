-- Let a deleted session take its events with it.
--
-- `game_events.session_id` is declared `REFERENCES story_sessions (session_id)
-- ON DELETE CASCADE`, and a `BEFORE DELETE` trigger raised on every row. Those
-- two statements contradict each other, and the trigger won: deleting a session
-- that had ever emitted an event failed with "game_events is append-only".
--
-- That is not only a maintenance annoyance. `DELETE /v1/sessions/:sessionId` is
-- a shipped endpoint and the Library has a control wired to it, so a player
-- deleting a run they did not want got a 500 — and a run with no events, which
-- is one that was created and never played, deleted fine. The feature worked
-- exactly when there was nothing to delete.
--
-- Append-only is still the right rule and is kept. What it means is narrowed
-- from "these rows can never go" to "these rows can never be *changed*, and go
-- only when the thing they describe goes". An event that outlives its session
-- describes nothing.
--
-- The test for a cascade is that the parent is already gone: Postgres removes
-- the `story_sessions` row before cascading to children, so a direct
-- `DELETE FROM game_events` still finds its session and is still refused.
--
-- `wallet_ledger` keeps the strict trigger. Money is not session-scoped and a
-- ledger that can be made to disappear is not a ledger.

CREATE OR REPLACE FUNCTION reject_event_mutation() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE'
     AND NOT EXISTS (SELECT 1 FROM story_sessions WHERE session_id = OLD.session_id)
  THEN
    RETURN OLD;
  END IF;
  RAISE EXCEPTION '% is append-only', TG_TABLE_NAME;
END;
$$;

DROP TRIGGER IF EXISTS game_events_append_only ON game_events;

CREATE TRIGGER game_events_append_only
  BEFORE UPDATE OR DELETE ON game_events
  FOR EACH ROW EXECUTE FUNCTION reject_event_mutation();
