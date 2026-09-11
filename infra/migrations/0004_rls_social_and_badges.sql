-- Row Level Security for the social and badge tables.
--
-- `0001_init.sql` states the invariant this restores: "Row Level Security is
-- enabled on every table a client can reach (§31.7). The API uses the service
-- role and enforces ownership itself; RLS is the second line so a leaked anon
-- key cannot read another player's session."
--
-- `0003_social_and_badges.sql` then added five client-reachable tables and
-- enabled RLS on none of them, and `story_likes` in `0001` was missed as well.
-- The anon key is compiled into the app bundle — that is what an anon key is
-- for — so anyone who extracts it could read and write those tables directly
-- through PostgREST, bypassing the API entirely. That means every comment, and
-- more sharply, every row of `comment_reports`: who reported whom.
--
-- `user_badges` is the one with money attached. `/v1/badges/:id/claim` pays
-- credits for a badge, so a writable badge table is a mint.
--
-- The API is unaffected by any of this: it connects with the service role,
-- which bypasses RLS by design.

BEGIN;

ALTER TABLE story_comments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_editorial ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges     ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_likes     ENABLE ROW LEVEL SECURITY;

-- Comments are public to read — they are a public comment section — and
-- writable only by their author. Deletion and moderation go through the API.
CREATE POLICY story_comments_read ON story_comments
  FOR SELECT USING (true);
CREATE POLICY story_comments_write_own ON story_comments
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY story_comments_delete_own ON story_comments
  FOR DELETE USING (user_id = auth.uid());

-- A like is public (the count is public) and only ever your own.
CREATE POLICY comment_likes_read ON comment_likes
  FOR SELECT USING (true);
CREATE POLICY comment_likes_own ON comment_likes
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY story_likes_read ON story_likes
  FOR SELECT USING (true);
CREATE POLICY story_likes_own ON story_likes
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- A report is private to the person who filed it. Nobody browses these.
CREATE POLICY comment_reports_own ON comment_reports
  FOR ALL USING (reporter_id = auth.uid()) WITH CHECK (reporter_id = auth.uid());

-- Editorial is the shop window: readable by everyone, written only by the API.
CREATE POLICY story_editorial_read ON story_editorial
  FOR SELECT USING (true);

-- Badges are readable by their owner and writable by nobody. Claiming pays
-- credits, so the only writer is the service role.
CREATE POLICY user_badges_own ON user_badges
  FOR SELECT USING (user_id = auth.uid());

COMMIT;
