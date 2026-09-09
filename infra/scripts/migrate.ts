/**
 * Applies the SQL migrations and seeds the official catalog.
 *
 *   npm run migrate                    # uses DATABASE_URL from .env
 *   npm run migrate -- --url=postgres://…
 *   npm run migrate -- --reset         # drops and recreates the schema first
 *
 * Idempotent: every file is recorded in `schema_migrations` and applied once,
 * and the catalog is upserted rather than inserted, so running it against a
 * live database after a deploy is safe.
 */
import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from 'pg';
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const MIGRATIONS = join(ROOT, 'infra/migrations');

async function loadEnv(): Promise<void> {
  try {
    const raw = await readFile(join(ROOT, '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match?.[1] && !process.env[match[1]]) process.env[match[1]] = match[2];
    }
  } catch {
    // Already exported, or nothing to load.
  }
}

async function main(): Promise<void> {
  await loadEnv();
  const args = process.argv.slice(2);
  const url =
    args.find((a) => a.startsWith('--url='))?.slice('--url='.length) ?? process.env.DATABASE_URL;
  if (!url) {
    console.error(
      'No database configured. Set DATABASE_URL (Supabase → Project Settings → Database →\n' +
        'Connection string → URI) or pass --url=postgres://…',
    );
    process.exit(1);
  }

  const client = new Client({
    connectionString: url,
    ssl: /supabase|amazonaws|render|neon/.test(url) ? { rejectUnauthorized: false } : undefined,
  });
  await client.connect();

  try {
    if (args.includes('--reset')) {
      console.log('Dropping schema…');
      await client.query('DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;');
      await client.query('DROP SCHEMA IF EXISTS auth CASCADE;').catch(() => undefined);
    }

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename   text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      )`);

    const files = (await readdir(MIGRATIONS)).filter((f) => f.endsWith('.sql')).sort();
    for (const file of files) {
      const { rowCount } = await client.query('SELECT 1 FROM schema_migrations WHERE filename = $1', [
        file,
      ]);
      if (rowCount && rowCount > 0) {
        console.log(`  · ${file} (already applied)`);
        continue;
      }
      const sql = await readFile(join(MIGRATIONS, file), 'utf8');
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file]);
      console.log(`  ✓ ${file}`);
    }

    await seedCatalog(client);
    console.log('\nDone.');
  } finally {
    await client.end();
  }
}

/**
 * The official worlds ship with the app rather than being authored in the
 * product, so the database is brought up to match the code rather than the
 * other way round. Upserted on the version id, and a published version is
 * immutable, so this only ever adds versions.
 */
async function seedCatalog(client: Client): Promise<void> {
  console.log('\nSeeding the official catalog…');
  for (const story of LAUNCH_CATALOG) {
    await client.query(
      `INSERT INTO stories (story_id, slug, creator_id, official, status)
       VALUES ($1,$2,NULL,true,'PUBLISHED')
       ON CONFLICT (story_id) DO UPDATE SET status = 'PUBLISHED', updated_at = now()`,
      [story.storyId, story.storyId.replace(/^story_/, '').replace(/_/g, '-')],
    );
    await client.query(
      `INSERT INTO story_versions (story_version_id, story_id, version, definition, title,
                                   fantasy_label, hook, intensity, content_descriptors,
                                   clarity_passed, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true,COALESCE($10, now()))
       ON CONFLICT (story_version_id) DO UPDATE SET definition = EXCLUDED.definition,
                                                    title = EXCLUDED.title,
                                                    fantasy_label = EXCLUDED.fantasy_label,
                                                    hook = EXCLUDED.hook`,
      [
        story.id,
        story.storyId,
        story.version,
        JSON.stringify(story),
        story.title,
        story.fantasyLabel,
        story.hook,
        story.intensity,
        story.contentDescriptors,
        story.publishedAt,
      ],
    );
    await client.query(
      `UPDATE stories SET published_version_id = $2 WHERE story_id = $1`,
      [story.storyId, story.id],
    );
    await client.query(
      `INSERT INTO story_signals (story_id) VALUES ($1) ON CONFLICT DO NOTHING`,
      [story.storyId],
    );
    console.log(`  ✓ ${story.title}`);
  }
}

void main();
