import { Pool, type PoolClient } from 'pg';
import {
  GameEvent,
  GameState,
  LedgerEntry,
  MemoryFact,
  StoryVersion,
  TurnRecord,
} from '@aniplay/contracts';
import type {
  IdempotencyRecord,
  Repository,
  ReportRecord,
  SessionRecord,
  StorySignals,
  UserRecord,
} from './types.js';

/**
 * The production persistence adapter (spec §34, §35).
 *
 * Everything a run consists of lives in Postgres: the profile, the session, the
 * authoritative game state and every snapshot behind it, the turn log, the
 * append-only event log, memory, the wallet ledger, idempotency keys and the
 * social and safety tables. Restarting the API, redeploying it, or signing in
 * on a different phone changes nothing a player can see.
 *
 * Two rules the schema enforces rather than trusting the code to remember:
 *
 * 1. `saveState` is a compare-and-set on `story_sessions.revision`. Two turns
 *    racing on the same session cannot both commit; the loser gets `false` and
 *    the route turns that into a 409 with the current revision (§17.4).
 * 2. `wallet_ledger` is append-only with a unique index on
 *    (account_id, idempotency_key), so a retried purchase or grant can be
 *    written twice and credited once (§20.7).
 *
 * State is stored as one jsonb document per revision rather than shredded
 * across the normalised runtime tables. The document is the authority and it is
 * read whole every turn; the normalised tables exist for analytics, and a
 * mapper that had to keep eight tables in step with one contract would drift
 * the first time somebody added a field.
 */

/** How far back a player can fork. Matches MemoryRepository. */
const MAX_SNAPSHOTS = 60;

const EMPTY_SIGNALS: StorySignals = {
  runs: 0,
  likes: 0,
  saves: 0,
  hides: 0,
  reports: 0,
  impressions: 0,
};

export interface PostgresRepositoryOptions {
  readonly connectionString: string;
  /** Supabase requires TLS; a local cluster does not offer it. */
  readonly ssl?: boolean;
  readonly maxConnections?: number;
}

export class PostgresRepository implements Repository {
  readonly #pool: Pool;

  constructor(options: PostgresRepositoryOptions) {
    this.#pool = new Pool({
      connectionString: options.connectionString,
      ssl: options.ssl ? { rejectUnauthorized: false } : undefined,
      max: options.maxConnections ?? 10,
      // A turn holds a connection for as long as the model takes to answer.
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }

  async close(): Promise<void> {
    await this.#pool.end();
  }

  /** Exposed for the health check, so a bad DATABASE_URL fails at boot. */
  async ping(): Promise<void> {
    await this.#pool.query('SELECT 1');
  }

  async #tx<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.#pool.connect();
    try {
      await client.query('BEGIN');
      const result = await fn(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK').catch(() => undefined);
      throw error;
    } finally {
      client.release();
    }
  }

  // --- Catalog -------------------------------------------------------------

  async listStories(): Promise<StoryVersion[]> {
    const { rows } = await this.#pool.query<{ definition: unknown }>(
      `SELECT definition FROM story_versions ORDER BY story_id, version DESC`,
    );
    return rows.map((row) => StoryVersion.parse(row.definition));
  }

  async getStoryVersion(storyVersionId: string): Promise<StoryVersion | null> {
    const { rows } = await this.#pool.query<{ definition: unknown }>(
      `SELECT definition FROM story_versions WHERE story_version_id = $1`,
      [storyVersionId],
    );
    return rows[0] ? StoryVersion.parse(rows[0].definition) : null;
  }

  async getStoryByStoryId(storyId: string): Promise<StoryVersion | null> {
    // Published versions are immutable, so "the story" is its highest version.
    const { rows } = await this.#pool.query<{ definition: unknown }>(
      `SELECT definition FROM story_versions WHERE story_id = $1 ORDER BY version DESC LIMIT 1`,
      [storyId],
    );
    return rows[0] ? StoryVersion.parse(rows[0].definition) : null;
  }

  async getSignals(storyId: string): Promise<StorySignals> {
    const { rows } = await this.#pool.query<StorySignals>(
      `SELECT runs, likes, saves, hides, reports, impressions
         FROM story_signals WHERE story_id = $1`,
      [storyId],
    );
    return rows[0] ?? { ...EMPTY_SIGNALS };
  }

  async bumpSignal(storyId: string, key: keyof StorySignals, delta: number): Promise<void> {
    // The column set is closed and checked here rather than interpolated from a
    // caller's string, so this cannot become an injection point.
    if (!Object.hasOwn(EMPTY_SIGNALS, key)) throw new Error(`Unknown signal ${key}`);
    await this.#pool.query(
      `INSERT INTO story_signals (story_id, ${key}) VALUES ($1, GREATEST(0, $2))
       ON CONFLICT (story_id) DO UPDATE SET ${key} = GREATEST(0, story_signals.${key} + $2),
                                            updated_at = now()`,
      [storyId, delta],
    );
  }

  // --- Users ---------------------------------------------------------------

  async getUser(userId: string): Promise<UserRecord | null> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `SELECT p.user_id, p.handle, p.display_name, p.avatar_url, p.is_guest, p.age_verified,
              p.migrated_from_guest_id, p.deletion_requested_at, p.created_at, u.email,
              s.show_advanced_relationship_stats, s.show_check_math, s.reduce_motion,
              s.voice_autoplay, s.haptics_enabled, s.default_quality_tier, s.content_filters
         FROM profiles p
         LEFT JOIN user_settings s ON s.user_id = p.user_id
         LEFT JOIN auth.users u ON u.id = p.user_id
        WHERE p.user_id = $1`,
      [userId],
    );
    return rows[0] ? toUserRecord(rows[0]) : null;
  }

  async createUser(user: UserRecord): Promise<void> {
    await this.#tx(async (client) => {
      // The profile hangs off an auth identity. Supabase creates that row when
      // the player signs in — including anonymously — so this only backfills it
      // for the local and test clusters where nothing else would.
      await client.query(
        `INSERT INTO auth.users (id, email, is_anonymous) VALUES ($1, $2, $3)
         ON CONFLICT (id) DO NOTHING`,
        [user.userId, user.email, user.isGuest],
      );
      await client.query(
        `INSERT INTO profiles (user_id, handle, display_name, avatar_url, is_guest, age_verified,
                               migrated_from_guest_id, deletion_requested_at, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (user_id) DO NOTHING`,
        [
          user.userId,
          user.handle,
          user.displayName,
          user.avatarUrl,
          user.isGuest,
          user.ageVerified,
          user.migratedFromGuestId,
          user.deletionRequestedAt,
          user.createdAt,
        ],
      );
      await client.query(
        `INSERT INTO user_settings (user_id, show_advanced_relationship_stats, show_check_math,
                                    reduce_motion, voice_autoplay, haptics_enabled,
                                    default_quality_tier, content_filters)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         ON CONFLICT (user_id) DO NOTHING`,
        [
          user.userId,
          user.settings.showAdvancedRelationshipStats,
          user.settings.showCheckMath,
          user.settings.reduceMotion,
          user.settings.voiceAutoplay,
          user.settings.hapticsEnabled,
          user.settings.defaultQualityTier,
          user.settings.contentFilters,
        ],
      );
    });
  }

  async updateUser(userId: string, patch: Partial<UserRecord>): Promise<UserRecord | null> {
    const current = await this.getUser(userId);
    if (!current) return null;
    const next: UserRecord = {
      ...current,
      ...patch,
      settings: { ...current.settings, ...(patch.settings ?? {}) },
    };

    await this.#tx(async (client) => {
      await client.query(
        `UPDATE profiles SET handle = $2, display_name = $3, avatar_url = $4, is_guest = $5,
                             age_verified = $6, migrated_from_guest_id = $7,
                             deletion_requested_at = $8, updated_at = now()
          WHERE user_id = $1`,
        [
          userId,
          next.handle,
          next.displayName,
          next.avatarUrl,
          next.isGuest,
          next.ageVerified,
          next.migratedFromGuestId,
          next.deletionRequestedAt,
        ],
      );
      if (patch.email !== undefined) {
        await client.query(`UPDATE auth.users SET email = $2 WHERE id = $1`, [userId, patch.email]);
      }
      await client.query(
        `INSERT INTO user_settings (user_id, show_advanced_relationship_stats, show_check_math,
                                    reduce_motion, voice_autoplay, haptics_enabled,
                                    default_quality_tier, content_filters, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8, now())
         ON CONFLICT (user_id) DO UPDATE SET
           show_advanced_relationship_stats = EXCLUDED.show_advanced_relationship_stats,
           show_check_math = EXCLUDED.show_check_math,
           reduce_motion = EXCLUDED.reduce_motion,
           voice_autoplay = EXCLUDED.voice_autoplay,
           haptics_enabled = EXCLUDED.haptics_enabled,
           default_quality_tier = EXCLUDED.default_quality_tier,
           content_filters = EXCLUDED.content_filters,
           updated_at = now()`,
        [
          userId,
          next.settings.showAdvancedRelationshipStats,
          next.settings.showCheckMath,
          next.settings.reduceMotion,
          next.settings.voiceAutoplay,
          next.settings.hapticsEnabled,
          next.settings.defaultQualityTier,
          next.settings.contentFilters,
        ],
      );
    });

    return next;
  }

  /**
   * Spec §30 — the privacy deletion path.
   *
   * Sessions, state, turns, events and memory go with the profile through
   * ON DELETE CASCADE. The wallet ledger is deliberately retained: it is
   * financial audit, it is append-only, and it is purged by a separate workflow
   * on its own schedule. The account row is detached from the user first so the
   * cascade cannot take the ledger with it.
   */
  async deleteUser(userId: string): Promise<void> {
    await this.#tx(async (client) => {
      // The account is detached before the cascade runs, so the ledger it
      // anchors survives the profile.
      await client.query(`UPDATE wallet_accounts SET user_id = NULL WHERE user_id = $1`, [userId]);
      await client.query(`DELETE FROM profiles WHERE user_id = $1`, [userId]);
      await client.query(`DELETE FROM auth.users WHERE id = $1`, [userId]);
    });
  }

  // --- Sessions ------------------------------------------------------------

  async createSession(record: SessionRecord, state: GameState): Promise<void> {
    await this.#tx(async (client) => {
      await client.query(
        `INSERT INTO story_sessions (session_id, user_id, story_id, story_version_id, display_name,
                                     status, session_seed, branch_key, forked_from_session_id,
                                     forked_at_turn_index, revision, turn_index, created_at,
                                     last_played_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
        [
          record.sessionId,
          record.userId,
          record.storyId,
          record.storyVersionId,
          record.displayName,
          record.status,
          record.sessionSeed,
          record.branchKey,
          record.forkedFromSessionId,
          record.forkedAtTurnIndex,
          state.revision,
          state.turnIndex,
          record.createdAt,
          record.lastPlayedAt,
        ],
      );
      await writeSnapshot(client, record.sessionId, state.revision, state);
    });
  }

  async getSession(sessionId: string): Promise<SessionRecord | null> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `SELECT * FROM story_sessions WHERE session_id = $1`,
      [sessionId],
    );
    return rows[0] ? toSessionRecord(rows[0]) : null;
  }

  async listSessions(userId: string): Promise<SessionRecord[]> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `SELECT * FROM story_sessions WHERE user_id = $1 ORDER BY last_played_at DESC`,
      [userId],
    );
    return rows.map(toSessionRecord);
  }

  async updateSession(sessionId: string, patch: Partial<SessionRecord>): Promise<void> {
    const current = await this.getSession(sessionId);
    if (!current) return;
    const next = { ...current, ...patch };
    // user_id is patchable because guest migration moves a run to the account
    // the player just created (§6.5).
    await this.#pool.query(
      `UPDATE story_sessions SET display_name = $2, status = $3, last_played_at = $4, user_id = $5
        WHERE session_id = $1`,
      [sessionId, next.displayName, next.status, next.lastPlayedAt, next.userId],
    );
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.#pool.query(`DELETE FROM story_sessions WHERE session_id = $1`, [sessionId]);
  }

  // --- Game state ----------------------------------------------------------

  async getState(sessionId: string): Promise<GameState | null> {
    const { rows } = await this.#pool.query<{ state: unknown }>(
      `SELECT s.state
         FROM session_snapshots s
         JOIN story_sessions ss ON ss.session_id = s.session_id AND ss.revision = s.revision
        WHERE s.session_id = $1`,
      [sessionId],
    );
    return rows[0] ? GameState.parse(rows[0].state) : null;
  }

  /**
   * Spec §17.4 — compare-and-set. The UPDATE only matches while the stored
   * revision is still the one the caller read, so the database, not the
   * process, decides which of two racing turns wins. Returns false rather than
   * throwing: the route turns a lost race into a 409.
   */
  async saveState(sessionId: string, expectedRevision: number, state: GameState): Promise<boolean> {
    return this.#tx(async (client) => {
      const { rowCount } = await client.query(
        `UPDATE story_sessions
            SET revision = $3, turn_index = $4, last_played_at = now()
          WHERE session_id = $1 AND revision = $2`,
        [sessionId, expectedRevision, state.revision, state.turnIndex],
      );
      if (rowCount === 0) return false;
      await writeSnapshot(client, sessionId, state.revision, state);
      return true;
    });
  }

  async putStateSnapshot(sessionId: string, turnIndex: number, state: GameState): Promise<void> {
    await this.#tx(async (client) => {
      await client.query(
        `INSERT INTO session_snapshots (session_id, revision, state) VALUES ($1,$2,$3)
         ON CONFLICT (session_id, revision) DO UPDATE SET state = EXCLUDED.state`,
        [sessionId, snapshotRevision(turnIndex), JSON.stringify(state)],
      );
      // Capped the same way the in-process store caps it: the snapshots a
      // player can fork to are the ones they can still see.
      await client.query(
        `DELETE FROM session_snapshots
           WHERE session_id = $1 AND revision < 0
             AND revision NOT IN (
               SELECT revision FROM session_snapshots
                WHERE session_id = $1 AND revision < 0
                ORDER BY revision DESC LIMIT $2)`,
        [sessionId, MAX_SNAPSHOTS],
      );
    });
  }

  async getStateSnapshot(sessionId: string, turnIndex: number): Promise<GameState | null> {
    const { rows } = await this.#pool.query<{ state: unknown }>(
      `SELECT state FROM session_snapshots WHERE session_id = $1 AND revision = $2`,
      [sessionId, snapshotRevision(turnIndex)],
    );
    return rows[0] ? GameState.parse(rows[0].state) : null;
  }

  // --- Turns and events ----------------------------------------------------

  async appendTurn(turn: TurnRecord): Promise<void> {
    await this.#pool.query(
      `INSERT INTO turns (turn_id, session_id, turn_index, action_text, quality_tier,
                          credits_charged, scene_summary, blocks, checks, mutations, state_deltas,
                          suggestions, end_state_prompt, media_plan, hero_image_url, resolution,
                          beat_plan, rng_seed_hash, revision_after, repair_violations, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
       ON CONFLICT (turn_id) DO NOTHING`,
      [
        turn.turnId,
        turn.sessionId,
        turn.turnIndex,
        turn.actionText,
        turn.qualityTier,
        turn.creditsCharged,
        turn.sceneSummary,
        JSON.stringify(turn.blocks),
        JSON.stringify(turn.checks),
        JSON.stringify(turn.mutations),
        JSON.stringify(turn.stateDeltas),
        JSON.stringify(turn.suggestions),
        turn.endStatePrompt,
        turn.mediaPlan ? JSON.stringify(turn.mediaPlan) : null,
        turn.heroImageUrl,
        turn.resolution ? JSON.stringify(turn.resolution) : null,
        turn.beatPlan ? JSON.stringify(turn.beatPlan) : null,
        // The seed itself never leaves the server (§12.1); this is its handle.
        turn.turnId,
        turn.revisionAfter,
        JSON.stringify(turn.repairViolations),
        turn.createdAt,
      ],
    );
  }

  async replaceNarration(
    turnId: string,
    narration: { blocks: unknown; sceneSummary: string; endStatePrompt: string; stateDeltas: unknown },
  ): Promise<void> {
    await this.#pool.query(
      `UPDATE turns SET blocks = $2, scene_summary = $3, end_state_prompt = $4, state_deltas = $5
        WHERE turn_id = $1`,
      [
        turnId,
        JSON.stringify(narration.blocks),
        narration.sceneSummary,
        narration.endStatePrompt,
        JSON.stringify(narration.stateDeltas),
      ],
    );
  }

  async attachHeroImage(turnId: string, url: string): Promise<void> {
    await this.#pool.query(`UPDATE turns SET hero_image_url = $2 WHERE turn_id = $1`, [turnId, url]);
  }

  async getTurn(turnId: string): Promise<TurnRecord | null> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `SELECT * FROM turns WHERE turn_id = $1`,
      [turnId],
    );
    return rows[0] ? toTurnRecord(rows[0]) : null;
  }

  async listTurns(sessionId: string): Promise<TurnRecord[]> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `SELECT * FROM turns WHERE session_id = $1 ORDER BY turn_index ASC`,
      [sessionId],
    );
    return rows.map(toTurnRecord);
  }

  async appendEvents(events: readonly GameEvent[]): Promise<void> {
    if (events.length === 0) return;
    // One statement rather than one per event: the event log is written on
    // every turn and a round trip each was the difference between a fast turn
    // and a slow one.
    const values: unknown[] = [];
    const tuples = events.map((event, i) => {
      const base = i * 9;
      values.push(
        event.eventId,
        event.sessionId,
        event.turnId,
        event.sequence,
        event.type,
        event.subjectId,
        event.reasonCode,
        JSON.stringify(event.payload),
        event.worldMinute,
      );
      return `($${base + 1},$${base + 2},$${base + 3},$${base + 4},$${base + 5},$${base + 6},$${base + 7},$${base + 8},$${base + 9})`;
    });
    await this.#pool.query(
      `INSERT INTO game_events (event_id, session_id, turn_id, sequence, type, subject_id,
                                reason_code, payload, world_minute)
       VALUES ${tuples.join(',')}
       ON CONFLICT (event_id) DO NOTHING`,
      values,
    );
  }

  async listEvents(sessionId: string): Promise<GameEvent[]> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `SELECT * FROM game_events WHERE session_id = $1 ORDER BY sequence ASC`,
      [sessionId],
    );
    return rows.map((row) =>
      GameEvent.parse({
        eventId: row.event_id,
        sessionId: row.session_id,
        turnId: row.turn_id,
        sequence: row.sequence,
        type: row.type,
        subjectId: row.subject_id,
        reasonCode: row.reason_code,
        payload: row.payload,
        worldMinute: row.world_minute,
        createdAt: iso(row.created_at),
      }),
    );
  }

  // --- Memory --------------------------------------------------------------

  async listMemories(sessionId: string): Promise<MemoryFact[]> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `SELECT * FROM memory_facts WHERE session_id = $1 ORDER BY created_at_turn ASC, fact_id ASC`,
      [sessionId],
    );
    return rows.map(toMemoryFact);
  }

  async appendMemories(sessionId: string, facts: readonly MemoryFact[]): Promise<void> {
    if (facts.length === 0) return;
    await this.#tx(async (client) => {
      for (const fact of facts) await insertMemory(client, sessionId, fact);
    });
  }

  async replaceMemories(sessionId: string, facts: readonly MemoryFact[]): Promise<void> {
    await this.#tx(async (client) => {
      // A superseding pass rewrites the whole set, and the self-reference in
      // superseded_by_fact_id means the old rows have to go first.
      await client.query(`UPDATE memory_facts SET superseded_by_fact_id = NULL WHERE session_id = $1`, [
        sessionId,
      ]);
      await client.query(`DELETE FROM memory_facts WHERE session_id = $1`, [sessionId]);
      for (const fact of facts) await insertMemory(client, sessionId, { ...fact, supersededByFactId: null });
      for (const fact of facts) {
        if (!fact.supersededByFactId) continue;
        await client.query(
          `UPDATE memory_facts SET superseded_by_fact_id = $2 WHERE fact_id = $1`,
          [fact.factId, fact.supersededByFactId],
        );
      }
    });
  }

  async setMemoryPinned(sessionId: string, factId: string, pinned: boolean): Promise<MemoryFact | null> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `UPDATE memory_facts SET pinned = $3 WHERE session_id = $1 AND fact_id = $2 RETURNING *`,
      [sessionId, factId, pinned],
    );
    return rows[0] ? toMemoryFact(rows[0]) : null;
  }

  // --- Wallet --------------------------------------------------------------

  async listLedger(accountId: string): Promise<LedgerEntry[]> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `SELECT * FROM wallet_ledger WHERE account_id = $1 ORDER BY created_at ASC, entry_id ASC`,
      [accountId],
    );
    return rows.map(toLedgerEntry);
  }

  /**
   * Append-only, and exactly-once on the idempotency key.
   *
   * The unique index does the enforcing. A retry that arrives while the first
   * write is still in flight hits the constraint and is swallowed here, which
   * is what stops a purchase being credited twice.
   */
  async appendLedgerEntry(entry: LedgerEntry): Promise<void> {
    await this.#tx(async (client) => {
      await client.query(
        `INSERT INTO wallet_accounts (account_id, user_id)
         SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM wallet_accounts WHERE account_id = $1)`,
        [entry.accountId, userIdForAccount(entry.accountId)],
      );
      await client.query(
        `INSERT INTO wallet_ledger (entry_id, account_id, type, amount, balance_after, reason_code,
                                    reference_id, idempotency_key, metadata, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         ON CONFLICT DO NOTHING`,
        [
          entry.id,
          entry.accountId,
          entry.type,
          entry.amount,
          entry.balanceAfter,
          entry.reasonCode,
          entry.referenceId,
          entry.idempotencyKey,
          JSON.stringify(entry.metadata),
          entry.createdAt,
        ],
      );
    });
  }

  async findLedgerEntryByIdempotencyKey(accountId: string, key: string): Promise<LedgerEntry | null> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `SELECT * FROM wallet_ledger WHERE account_id = $1 AND idempotency_key = $2`,
      [accountId, key],
    );
    return rows[0] ? toLedgerEntry(rows[0]) : null;
  }

  // --- Idempotency ---------------------------------------------------------

  async getIdempotency(key: string): Promise<IdempotencyRecord | null> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `SELECT * FROM idempotency_keys WHERE key = $1`,
      [key],
    );
    return rows[0] ? toIdempotency(rows[0]) : null;
  }

  async putIdempotency(record: IdempotencyRecord): Promise<void> {
    await this.#pool.query(
      `INSERT INTO idempotency_keys (key, user_id, session_id, request_hash, turn_id, status,
                                     response_body, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (key) DO NOTHING`,
      [
        record.key,
        record.userId,
        record.sessionId,
        record.requestHash,
        record.turnId,
        record.status,
        record.responseBody === undefined ? null : JSON.stringify(record.responseBody),
        record.createdAt,
      ],
    );
  }

  async updateIdempotency(key: string, patch: Partial<IdempotencyRecord>): Promise<void> {
    const current = await this.getIdempotency(key);
    if (!current) return;
    const next = { ...current, ...patch };
    await this.#pool.query(
      `UPDATE idempotency_keys SET turn_id = $2, status = $3, response_body = $4 WHERE key = $1`,
      [
        key,
        next.turnId,
        next.status,
        next.responseBody === undefined ? null : JSON.stringify(next.responseBody),
      ],
    );
  }

  // --- Social --------------------------------------------------------------

  async getSaves(userId: string): Promise<string[]> {
    const { rows } = await this.#pool.query<{ story_id: string }>(
      `SELECT story_id FROM story_saves WHERE user_id = $1`,
      [userId],
    );
    return rows.map((row) => row.story_id);
  }

  async setSaved(userId: string, storyId: string, saved: boolean): Promise<void> {
    if (saved) {
      await this.#pool.query(
        `INSERT INTO story_saves (user_id, story_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
        [userId, storyId],
      );
    } else {
      await this.#pool.query(`DELETE FROM story_saves WHERE user_id = $1 AND story_id = $2`, [
        userId,
        storyId,
      ]);
    }
  }

  async getHidden(userId: string): Promise<string[]> {
    const { rows } = await this.#pool.query<{ story_id: string }>(
      `SELECT story_id FROM story_hides WHERE user_id = $1`,
      [userId],
    );
    return rows.map((row) => row.story_id);
  }

  async setHidden(userId: string, storyId: string, hidden: boolean): Promise<void> {
    if (hidden) {
      await this.#pool.query(
        `INSERT INTO story_hides (user_id, story_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
        [userId, storyId],
      );
    } else {
      await this.#pool.query(`DELETE FROM story_hides WHERE user_id = $1 AND story_id = $2`, [
        userId,
        storyId,
      ]);
    }
  }

  // --- Safety --------------------------------------------------------------

  async createReport(report: ReportRecord): Promise<void> {
    await this.#pool.query(
      `INSERT INTO reports (report_id, reporter_user_id, target_type, target_id, reason, details,
                            status, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        report.reportId,
        report.reporterUserId,
        report.targetType,
        report.targetId,
        report.reason,
        report.details,
        report.status,
        report.createdAt,
      ],
    );
  }

  async listReports(userId: string): Promise<ReportRecord[]> {
    const { rows } = await this.#pool.query<Record<string, unknown>>(
      `SELECT * FROM reports WHERE reporter_user_id = $1 ORDER BY created_at ASC`,
      [userId],
    );
    return rows.map((row) => ({
      reportId: String(row.report_id),
      reporterUserId: String(row.reporter_user_id),
      targetType: String(row.target_type),
      targetId: String(row.target_id),
      reason: String(row.reason),
      details: String(row.details),
      status: row.status as ReportRecord['status'],
      createdAt: iso(row.created_at),
    }));
  }

  async listBlocks(userId: string): Promise<string[]> {
    const { rows } = await this.#pool.query<{ target_user_id: string }>(
      `SELECT target_user_id FROM blocks WHERE user_id = $1`,
      [userId],
    );
    return rows.map((row) => row.target_user_id);
  }

  async setBlocked(userId: string, targetId: string, blocked: boolean): Promise<void> {
    if (blocked) {
      await this.#pool.query(
        `INSERT INTO blocks (user_id, target_user_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
        [userId, targetId],
      );
    } else {
      await this.#pool.query(`DELETE FROM blocks WHERE user_id = $1 AND target_user_id = $2`, [
        userId,
        targetId,
      ]);
    }
  }
}

// --- Mapping ---------------------------------------------------------------

/**
 * Snapshots share a table with the authoritative state, so they are stored at
 * negative revisions keyed by turn index. That keeps `(session_id, revision)`
 * unique across both without a second table, and makes the two impossible to
 * confuse: a real revision is never negative.
 */
function snapshotRevision(turnIndex: number): number {
  return -(turnIndex + 1);
}

async function writeSnapshot(
  client: PoolClient,
  sessionId: string,
  revision: number,
  state: GameState,
): Promise<void> {
  await client.query(
    `INSERT INTO session_snapshots (session_id, revision, state) VALUES ($1,$2,$3)
     ON CONFLICT (session_id, revision) DO UPDATE SET state = EXCLUDED.state`,
    [sessionId, revision, JSON.stringify(state)],
  );
  // Only the current revision is read back as authoritative state; older ones
  // are history. Keep a window of them for debugging and drop the rest.
  await client.query(
    `DELETE FROM session_snapshots
       WHERE session_id = $1 AND revision >= 0 AND revision <= $2::integer - $3::integer`,
    [sessionId, revision, MAX_SNAPSHOTS],
  );
}

async function insertMemory(client: PoolClient, sessionId: string, fact: MemoryFact): Promise<void> {
  await client.query(
    `INSERT INTO memory_facts (fact_id, session_id, subject_id, predicate, value, text, visibility,
                               importance, confidence, pinned, corrected_by_player, created_at_turn,
                               created_at_world_minute, source_event_ids, superseded_by_fact_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
     ON CONFLICT (fact_id) DO UPDATE SET
       superseded_by_fact_id = EXCLUDED.superseded_by_fact_id,
       pinned = EXCLUDED.pinned,
       corrected_by_player = EXCLUDED.corrected_by_player`,
    [
      fact.factId,
      sessionId,
      fact.subjectId,
      fact.predicate,
      fact.value === undefined ? null : JSON.stringify(fact.value),
      fact.text,
      fact.visibility,
      fact.importance,
      fact.confidence,
      fact.pinned,
      fact.correctedByPlayer,
      fact.createdAtTurn,
      fact.createdAtWorldMinute,
      fact.sourceEventIds,
      fact.supersededByFactId,
    ],
  );
}

function iso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function toUserRecord(row: Record<string, unknown>): UserRecord {
  return {
    userId: String(row.user_id),
    displayName: String(row.display_name),
    handle: String(row.handle),
    email: (row.email as string | null) ?? null,
    isGuest: Boolean(row.is_guest),
    avatarUrl: (row.avatar_url as string | null) ?? null,
    ageVerified: Boolean(row.age_verified),
    createdAt: iso(row.created_at),
    settings: {
      showAdvancedRelationshipStats: Boolean(row.show_advanced_relationship_stats),
      showCheckMath: Boolean(row.show_check_math),
      reduceMotion: Boolean(row.reduce_motion),
      voiceAutoplay: Boolean(row.voice_autoplay),
      hapticsEnabled: row.haptics_enabled === undefined ? true : Boolean(row.haptics_enabled),
      defaultQualityTier: (row.default_quality_tier as UserRecord['settings']['defaultQualityTier']) ?? 'VIVID',
      contentFilters: (row.content_filters as string[] | null) ?? [],
    },
    migratedFromGuestId: (row.migrated_from_guest_id as string | null) ?? null,
    deletionRequestedAt: row.deletion_requested_at ? iso(row.deletion_requested_at) : null,
  };
}

function toSessionRecord(row: Record<string, unknown>): SessionRecord {
  return {
    sessionId: String(row.session_id),
    userId: String(row.user_id),
    storyId: String(row.story_id),
    storyVersionId: String(row.story_version_id),
    displayName: String(row.display_name),
    status: row.status as SessionRecord['status'],
    createdAt: iso(row.created_at),
    lastPlayedAt: iso(row.last_played_at),
    sessionSeed: String(row.session_seed),
    forkedFromSessionId: (row.forked_from_session_id as string | null) ?? null,
    forkedAtTurnIndex: (row.forked_at_turn_index as number | null) ?? null,
    branchKey: String(row.branch_key),
  };
}

function toTurnRecord(row: Record<string, unknown>): TurnRecord {
  return TurnRecord.parse({
    turnId: row.turn_id,
    sessionId: row.session_id,
    turnIndex: row.turn_index,
    actionText: row.action_text,
    qualityTier: row.quality_tier,
    creditsCharged: row.credits_charged,
    sceneSummary: row.scene_summary,
    blocks: row.blocks,
    checks: row.checks,
    stateDeltas: row.state_deltas,
    mutations: row.mutations,
    suggestions: row.suggestions,
    endStatePrompt: row.end_state_prompt,
    mediaPlan: row.media_plan ?? null,
    heroImageUrl: row.hero_image_url ?? null,
    revisionAfter: row.revision_after,
    createdAt: iso(row.created_at),
    repairViolations: row.repair_violations,
    resolution: row.resolution ?? null,
    beatPlan: row.beat_plan ?? null,
  });
}

function toMemoryFact(row: Record<string, unknown>): MemoryFact {
  return MemoryFact.parse({
    factId: row.fact_id,
    subjectId: row.subject_id,
    predicate: row.predicate,
    value: row.value,
    text: row.text,
    visibility: row.visibility,
    importance: row.importance,
    confidence: row.confidence,
    pinned: row.pinned,
    createdAtTurn: row.created_at_turn,
    createdAtWorldMinute: row.created_at_world_minute,
    sourceEventIds: row.source_event_ids,
    supersededByFactId: row.superseded_by_fact_id ?? null,
    correctedByPlayer: row.corrected_by_player,
  });
}

function toLedgerEntry(row: Record<string, unknown>): LedgerEntry {
  return LedgerEntry.parse({
    id: row.entry_id,
    accountId: row.account_id,
    type: row.type,
    amount: row.amount,
    balanceAfter: row.balance_after,
    reasonCode: row.reason_code,
    referenceId: row.reference_id ?? null,
    idempotencyKey: row.idempotency_key ?? null,
    createdAt: iso(row.created_at),
    metadata: row.metadata ?? {},
  });
}

function toIdempotency(row: Record<string, unknown>): IdempotencyRecord {
  return {
    key: String(row.key),
    userId: String(row.user_id),
    sessionId: String(row.session_id),
    requestHash: String(row.request_hash),
    turnId: String(row.turn_id ?? ''),
    status: row.status as IdempotencyRecord['status'],
    responseBody: row.response_body,
    createdAt: iso(row.created_at),
  };
}

/**
 * Wallet account ids are derived from the user id, so the account row can be
 * created on first write without a separate provisioning step.
 */
function userIdForAccount(accountId: string): string {
  return accountId.startsWith('acct_') ? accountId.slice('acct_'.length) : accountId;
}
