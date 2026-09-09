-- Bootstrap the two things Supabase provides that a bare Postgres does not.
--
-- On a Supabase project both of these already exist and every statement here is
-- a no-op. On a local cluster — which is what the persistence tests run
-- against — they are what makes 0001 applicable at all. Keeping the difference
-- in one file means the real schema has no "if we are local" branches in it.

BEGIN;

-- Supabase Auth owns this schema, this table and this function, and owns them
-- as a different role. So everything here is strictly "create it only if it is
-- not already there" — never CREATE OR REPLACE, which on a managed project
-- either fails for want of ownership or, worse, succeeds and quietly replaces
-- Supabase's own definition with ours.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'auth') THEN
    EXECUTE 'CREATE SCHEMA auth';
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS auth.users (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email              text,
  is_anonymous       boolean NOT NULL DEFAULT false,
  created_at         timestamptz NOT NULL DEFAULT now()
);

-- Supabase exposes the caller's user id to Row Level Security through this.
-- The API connects as the service role and enforces ownership in code, so
-- locally it only has to exist for the policies in 0001 to compile.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
      FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'auth' AND p.proname = 'uid'
  ) THEN
    EXECUTE $fn$
      CREATE FUNCTION auth.uid() RETURNS uuid
        LANGUAGE sql STABLE
        AS 'SELECT nullif(current_setting(''request.jwt.claim.sub'', true), '''')::uuid'
    $fn$;
  END IF;
END
$$;

-- pgvector is enabled on Supabase and is usually absent locally. Semantic
-- memory retrieval degrades to lexical similarity without it, which the
-- director already handles, so an unavailable extension must not stop the rest
-- of the schema from being created.
DO $$
BEGIN
  CREATE EXTENSION IF NOT EXISTS "vector";
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'pgvector unavailable; memory embeddings will be stored as float arrays';
END
$$;

-- The `vector` type has to exist for 0001 to parse whether or not the extension
-- loaded. A domain over real[] is close enough for everything except the
-- ivfflat index, which 0001 creates conditionally.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'vector') THEN
    EXECUTE 'CREATE DOMAIN public.vector AS real[]';
  END IF;
END
$$;

COMMIT;
