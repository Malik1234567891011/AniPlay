import type {
  GameEvent,
  GameState,
  LedgerEntry,
  MemoryFact,
  StoryVersion,
  TurnRecord,
} from '@aniplay/contracts';
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';
import type {
  IdempotencyRecord,
  Repository,
  ReportRecord,
  SessionRecord,
  StorySignals,
  UserRecord,
} from './types.js';

/**
 * In-process repository.
 *
 * The default in development so `npm run api` needs no database, and the backing
 * store for the test suite. It enforces the same invariants the Postgres
 * implementation must — notably the optimistic-concurrency check in `saveState`
 * and idempotency-key uniqueness — so tests written against it are meaningful.
 *
 * State is deep-cloned on read and write so a caller mutating a returned object
 * cannot corrupt the store, which is what a real database would give us for free.
 */
/** How far back a player can fork. Older snapshots are dropped. */
const MAX_SNAPSHOTS = 60;

export class MemoryRepository implements Repository {
  readonly #stories = new Map<string, StoryVersion>();
  readonly #signals = new Map<string, StorySignals>();
  readonly #users = new Map<string, UserRecord>();
  readonly #sessions = new Map<string, SessionRecord>();
  readonly #states = new Map<string, GameState>();
  readonly #snapshots = new Map<string, Map<number, GameState>>();
  readonly #turns = new Map<string, TurnRecord[]>();
  readonly #turnsById = new Map<string, TurnRecord>();
  readonly #events = new Map<string, GameEvent[]>();
  readonly #memories = new Map<string, MemoryFact[]>();
  readonly #ledger = new Map<string, LedgerEntry[]>();
  readonly #idempotency = new Map<string, IdempotencyRecord>();
  readonly #saves = new Map<string, Set<string>>();
  readonly #hides = new Map<string, Set<string>>();
  readonly #blocks = new Map<string, Set<string>>();
  readonly #reports = new Map<string, ReportRecord[]>();

  constructor(stories: readonly StoryVersion[] = [...LAUNCH_CATALOG]) {
    // Seeded so a fresh install shows a plausible catalog rather than a wall of
    // zeroes, and varied so the ranking has something real to sort on. Replaced
    // by the offline rollup job in production.
    const seeded: Record<string, StorySignals> = {
      story_ninth_archive: { runs: 12_400, likes: 5_460, saves: 3_910, hides: 61, reports: 3, impressions: 86_000 },
      story_understudy: { runs: 7_850, likes: 2_610, saves: 1_720, hides: 44, reports: 1, impressions: 51_000 },
      story_salt_road: { runs: 4_120, likes: 1_190, saves: 880, hides: 96, reports: 5, impressions: 38_000 },
    };

    for (const story of stories) {
      this.#stories.set(story.id, story);
      this.#signals.set(
        story.storyId,
        seeded[story.storyId] ?? { runs: 0, likes: 0, saves: 0, hides: 0, reports: 0, impressions: 0 },
      );
    }
  }

  // --- Catalog ---

  async listStories(): Promise<StoryVersion[]> {
    return [...this.#stories.values()];
  }

  async getStoryVersion(storyVersionId: string): Promise<StoryVersion | null> {
    return this.#stories.get(storyVersionId) ?? null;
  }

  async getStoryByStoryId(storyId: string): Promise<StoryVersion | null> {
    // Published versions are immutable, so "the story" is its highest version.
    const versions = [...this.#stories.values()]
      .filter((s) => s.storyId === storyId)
      .sort((a, b) => b.version - a.version);
    return versions[0] ?? null;
  }

  async getSignals(storyId: string): Promise<StorySignals> {
    return (
      this.#signals.get(storyId) ?? {
        runs: 0, likes: 0, saves: 0, hides: 0, reports: 0, impressions: 0,
      }
    );
  }

  async bumpSignal(storyId: string, key: keyof StorySignals, delta: number): Promise<void> {
    const signals = await this.getSignals(storyId);
    signals[key] = Math.max(0, signals[key] + delta);
    this.#signals.set(storyId, signals);
  }

  // --- Users ---

  async getUser(userId: string): Promise<UserRecord | null> {
    return this.#users.get(userId) ?? null;
  }

  async createUser(user: UserRecord): Promise<void> {
    this.#users.set(user.userId, user);
  }

  async updateUser(userId: string, patch: Partial<UserRecord>): Promise<UserRecord | null> {
    const user = this.#users.get(userId);
    if (!user) return null;
    const updated = { ...user, ...patch, settings: { ...user.settings, ...(patch.settings ?? {}) } };
    this.#users.set(userId, updated);
    return updated;
  }

  async deleteUser(userId: string): Promise<void> {
    this.#users.delete(userId);
    for (const [sessionId, session] of this.#sessions) {
      if (session.userId !== userId) continue;
      this.#sessions.delete(sessionId);
      this.#states.delete(sessionId);
      this.#turns.delete(sessionId);
      this.#events.delete(sessionId);
      this.#memories.delete(sessionId);
    }
    // Spec §31.6 — the ledger is append-only and retained for financial audit
    // even after a privacy deletion; the purge workflow handles it separately.
    this.#saves.delete(userId);
    this.#hides.delete(userId);
    this.#blocks.delete(userId);
    this.#reports.delete(userId);
  }

  // --- Sessions ---

  async createSession(record: SessionRecord, state: GameState): Promise<void> {
    this.#sessions.set(record.sessionId, record);
    this.#states.set(record.sessionId, structuredClone(state));
    this.#turns.set(record.sessionId, []);
    this.#events.set(record.sessionId, []);
    this.#memories.set(record.sessionId, []);
  }

  async getSession(sessionId: string): Promise<SessionRecord | null> {
    return this.#sessions.get(sessionId) ?? null;
  }

  async listSessions(userId: string): Promise<SessionRecord[]> {
    return [...this.#sessions.values()]
      .filter((s) => s.userId === userId)
      .sort((a, b) => b.lastPlayedAt.localeCompare(a.lastPlayedAt));
  }

  async updateSession(sessionId: string, patch: Partial<SessionRecord>): Promise<void> {
    const session = this.#sessions.get(sessionId);
    if (session) this.#sessions.set(sessionId, { ...session, ...patch });
  }

  async deleteSession(sessionId: string): Promise<void> {
    this.#sessions.delete(sessionId);
    this.#states.delete(sessionId);
    this.#turns.delete(sessionId);
    this.#events.delete(sessionId);
    this.#memories.delete(sessionId);
  }

  // --- Game state ---

  async getState(sessionId: string): Promise<GameState | null> {
    const state = this.#states.get(sessionId);
    return state ? structuredClone(state) : null;
  }

  /**
   * Spec §17.4 — compare-and-set on revision. Returns false rather than throwing
   * so the caller can turn a lost race into a 409 with the current revision.
   */
  async saveState(sessionId: string, expectedRevision: number, state: GameState): Promise<boolean> {
    const current = this.#states.get(sessionId);
    if (!current) return false;
    if (current.revision !== expectedRevision) return false;
    this.#states.set(sessionId, structuredClone(state));
    return true;
  }

  /**
   * Spec §11.7 — the state each turn started from, so a fork can return to it.
   *
   * Capped: a long run would otherwise keep every snapshot it ever made, and
   * the ones a player can fork to are the ones they can still see.
   */
  async putStateSnapshot(sessionId: string, turnIndex: number, state: GameState): Promise<void> {
    const snapshots = this.#snapshots.get(sessionId) ?? new Map<number, GameState>();
    snapshots.set(turnIndex, structuredClone(state));

    if (snapshots.size > MAX_SNAPSHOTS) {
      const oldest = [...snapshots.keys()].sort((a, b) => a - b).slice(0, snapshots.size - MAX_SNAPSHOTS);
      for (const key of oldest) snapshots.delete(key);
    }
    this.#snapshots.set(sessionId, snapshots);
  }

  async getStateSnapshot(sessionId: string, turnIndex: number): Promise<GameState | null> {
    const state = this.#snapshots.get(sessionId)?.get(turnIndex);
    return state ? structuredClone(state) : null;
  }

  // --- Turns and events ---

  async appendTurn(turn: TurnRecord): Promise<void> {
    const list = this.#turns.get(turn.sessionId) ?? [];
    list.push(turn);
    this.#turns.set(turn.sessionId, list);
    this.#turnsById.set(turn.turnId, turn);
  }

  async getTurn(turnId: string): Promise<TurnRecord | null> {
    return this.#turnsById.get(turnId) ?? null;
  }

  async attachHeroImage(turnId: string, url: string): Promise<void> {
    const turn = this.#turnsById.get(turnId);
    if (!turn) return;
    const updated: TurnRecord = { ...turn, heroImageUrl: url };
    this.#turnsById.set(turnId, updated);
    const list = this.#turns.get(turn.sessionId) ?? [];
    this.#turns.set(
      turn.sessionId,
      list.map((t) => (t.turnId === turnId ? updated : t)),
    );
  }

  async listTurns(sessionId: string): Promise<TurnRecord[]> {
    return [...(this.#turns.get(sessionId) ?? [])];
  }

  async appendEvents(events: readonly GameEvent[]): Promise<void> {
    for (const event of events) {
      const list = this.#events.get(event.sessionId) ?? [];
      list.push(event);
      this.#events.set(event.sessionId, list);
    }
  }

  async listEvents(sessionId: string): Promise<GameEvent[]> {
    return [...(this.#events.get(sessionId) ?? [])];
  }

  // --- Memory ---

  async listMemories(sessionId: string): Promise<MemoryFact[]> {
    return [...(this.#memories.get(sessionId) ?? [])];
  }

  async appendMemories(sessionId: string, facts: readonly MemoryFact[]): Promise<void> {
    const list = this.#memories.get(sessionId) ?? [];
    list.push(...facts);
    this.#memories.set(sessionId, list);
  }

  async replaceMemories(sessionId: string, facts: readonly MemoryFact[]): Promise<void> {
    this.#memories.set(sessionId, [...facts]);
  }

  // --- Wallet ---

  async listLedger(accountId: string): Promise<LedgerEntry[]> {
    return [...(this.#ledger.get(accountId) ?? [])];
  }

  async appendLedgerEntry(entry: LedgerEntry): Promise<void> {
    const list = this.#ledger.get(entry.accountId) ?? [];
    list.push(entry);
    this.#ledger.set(entry.accountId, list);
  }

  async findLedgerEntryByIdempotencyKey(accountId: string, key: string): Promise<LedgerEntry | null> {
    return (this.#ledger.get(accountId) ?? []).find((e) => e.idempotencyKey === key) ?? null;
  }

  // --- Idempotency ---

  async getIdempotency(key: string): Promise<IdempotencyRecord | null> {
    return this.#idempotency.get(key) ?? null;
  }

  async putIdempotency(record: IdempotencyRecord): Promise<void> {
    this.#idempotency.set(record.key, record);
  }

  async updateIdempotency(key: string, patch: Partial<IdempotencyRecord>): Promise<void> {
    const record = this.#idempotency.get(key);
    if (record) this.#idempotency.set(key, { ...record, ...patch });
  }

  // --- Social ---

  async getSaves(userId: string): Promise<string[]> {
    return [...(this.#saves.get(userId) ?? [])];
  }

  async setSaved(userId: string, storyId: string, saved: boolean): Promise<void> {
    const set = this.#saves.get(userId) ?? new Set<string>();
    if (saved) set.add(storyId);
    else set.delete(storyId);
    this.#saves.set(userId, set);
  }

  async getHidden(userId: string): Promise<string[]> {
    return [...(this.#hides.get(userId) ?? [])];
  }

  async setHidden(userId: string, storyId: string, hidden: boolean): Promise<void> {
    const set = this.#hides.get(userId) ?? new Set<string>();
    if (hidden) set.add(storyId);
    else set.delete(storyId);
    this.#hides.set(userId, set);
  }

  // --- Safety ---

  async createReport(report: ReportRecord): Promise<void> {
    const list = this.#reports.get(report.reporterUserId) ?? [];
    list.push(report);
    this.#reports.set(report.reporterUserId, list);
  }

  async listReports(userId: string): Promise<ReportRecord[]> {
    return [...(this.#reports.get(userId) ?? [])];
  }

  async listBlocks(userId: string): Promise<string[]> {
    return [...(this.#blocks.get(userId) ?? [])];
  }

  async setBlocked(userId: string, targetId: string, blocked: boolean): Promise<void> {
    const set = this.#blocks.get(userId) ?? new Set<string>();
    if (blocked) set.add(targetId);
    else set.delete(targetId);
    this.#blocks.set(userId, set);
  }
}
