-- The social and progression layer: likes that hold, comments, ranking inputs,
-- and badges.
--
-- Everything here is *additive*. Sessions, users, credits, story ids and the
-- signal rollup already exist and are not duplicated: `story_signals` keeps
-- being the denormalised counter, `wallet_ledger` keeps being the only place
-- credits move, and `story_likes` — which existed and was never written to —
-- becomes the row that makes a like idempotent.

-- --------------------------------------------------------------------------
-- Likes
-- --------------------------------------------------------------------------
--
-- `story_likes` has existed since 0001 and nothing ever inserted into it. The
-- route bumped `story_signals.likes` and returned `{liked: true}`, so tapping
-- twice counted twice, there was no way to unlike, and the number was not a
-- count of people — it was a count of taps. The table was always the right
-- shape; it just was not being used.

CREATE INDEX IF NOT EXISTS story_likes_story_idx ON story_likes (story_id);

-- --------------------------------------------------------------------------
-- Comments
-- --------------------------------------------------------------------------
--
-- About the *world*, never about one run. Two players of the same world have
-- had different hours in it, so a comment thread pinned to a canon outcome
-- would be wrong for most of the people reading it.
--
-- `kind` is the honest bit. `USER` is a real person. `SEEDED` is launch content
-- written by us so the app does not open empty. They are separated in the
-- schema rather than in a spreadsheet so that seeded rows can always be found,
-- excluded from analytics, or deleted wholesale — and so nothing downstream can
-- accidentally report them as customer engagement.

CREATE TABLE IF NOT EXISTS story_comments (
  comment_id      text PRIMARY KEY,
  story_id        text NOT NULL REFERENCES stories (story_id) ON DELETE CASCADE,
  -- NULL for seeded rows: there is no account behind them and inventing one
  -- would be the thing we are specifically not doing.
  user_id         uuid REFERENCES profiles (user_id) ON DELETE CASCADE,
  author_name     text NOT NULL,
  body            text NOT NULL CHECK (length(body) BETWEEN 1 AND 1000),
  kind            text NOT NULL DEFAULT 'USER' CHECK (kind IN ('USER', 'SEEDED')),
  spoiler         boolean NOT NULL DEFAULT false,
  likes           integer NOT NULL DEFAULT 0,
  -- Soft delete, so a deleted comment's replies and reports still resolve.
  deleted_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  CHECK ((kind = 'USER') = (user_id IS NOT NULL))
);

CREATE INDEX IF NOT EXISTS story_comments_story_idx
  ON story_comments (story_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS story_comments_top_idx
  ON story_comments (story_id, likes DESC) WHERE deleted_at IS NULL;
-- Rate limiting reads this: how many has this person posted lately.
CREATE INDEX IF NOT EXISTS story_comments_author_idx
  ON story_comments (user_id, created_at DESC) WHERE user_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS comment_likes (
  user_id         uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  comment_id      text NOT NULL REFERENCES story_comments (comment_id) ON DELETE CASCADE,
  created_at      timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, comment_id)
);

CREATE TABLE IF NOT EXISTS comment_reports (
  report_id       text PRIMARY KEY,
  comment_id      text NOT NULL REFERENCES story_comments (comment_id) ON DELETE CASCADE,
  reporter_id     uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  reason          text NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (comment_id, reporter_id)
);

-- --------------------------------------------------------------------------
-- Editorial placement
-- --------------------------------------------------------------------------
--
-- Kept in its own table, deliberately apart from `story_signals`. Ranking may
-- read it; **displayed counts may never include it**. A story can be boosted to
-- the top of Top Ranked and still honestly show the likes it actually has, and
-- keeping the two in separate tables is what makes that hard to get wrong.

CREATE TABLE IF NOT EXISTS story_editorial (
  story_id        text PRIMARY KEY REFERENCES stories (story_id) ON DELETE CASCADE,
  -- Ranking prior, in the same units as the Bayesian score. Fades as real
  -- engagement accumulates; see `ranking.ts`.
  editorial_boost real NOT NULL DEFAULT 0,
  -- Position in the hero rotation, 1..6. NULL means not featured.
  featured_rank   integer,
  staff_pick      boolean NOT NULL DEFAULT false,
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS story_editorial_featured_idx
  ON story_editorial (featured_rank) WHERE featured_rank IS NOT NULL;

-- --------------------------------------------------------------------------
-- Badges
-- --------------------------------------------------------------------------
--
-- Definitions live in code (`packages/contracts/src/game/badges.ts`), not here.
-- They are content: they change with releases, they need types, and a row in a
-- table cannot express an unlock condition. What the database holds is what is
-- true of a *person*.
--
-- `claimed_at` is separate from `unlocked_at` because the credit reward is paid
-- once, and the ledger entry is keyed on it — earning a badge twice is a bug,
-- and being paid for it twice is a worse one.

CREATE TABLE IF NOT EXISTS user_badges (
  user_id         uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  badge_id        text NOT NULL,
  progress        integer NOT NULL DEFAULT 0,
  unlocked_at     timestamptz,
  claimed_at      timestamptz,
  updated_at      timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);

CREATE INDEX IF NOT EXISTS user_badges_unclaimed_idx
  ON user_badges (user_id) WHERE unlocked_at IS NOT NULL AND claimed_at IS NULL;
