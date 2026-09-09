import type {
  GameEvent,
  GameState,
  LedgerEntry,
  MemoryFact,
  SessionSummary,
  StoryVersion,
  TurnRecord,
} from '@aniplay/contracts';

/**
 * The persistence port.
 *
 * `MemoryRepository` implements it in-process so the API runs with zero
 * infrastructure; `infra/migrations` carries the Postgres schema the production
 * implementation targets. Keeping this a narrow interface is what lets the two
 * coexist without the routes knowing which is behind them.
 */

export interface UserRecord {
  readonly userId: string;
  displayName: string;
  handle: string;
  email: string | null;
  isGuest: boolean;
  avatarUrl: string | null;
  ageVerified: boolean;
  createdAt: string;
  settings: {
    showAdvancedRelationshipStats: boolean;
    showCheckMath: boolean;
    reduceMotion: boolean;
    voiceAutoplay: boolean;
    hapticsEnabled: boolean;
    defaultQualityTier: 'QUICK' | 'VIVID' | 'CINEMATIC' | 'APEX';
    contentFilters: string[];
  };
  /** Guest sessions migrate into an authenticated account (spec §6.5). */
  migratedFromGuestId: string | null;
  deletionRequestedAt: string | null;
}

export interface SessionRecord {
  readonly sessionId: string;
  readonly userId: string;
  readonly storyId: string;
  readonly storyVersionId: string;
  displayName: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  createdAt: string;
  lastPlayedAt: string;
  /** Root seed for the whole run. Per-turn seeds derive from it (§12.1). */
  readonly sessionSeed: string;
  readonly forkedFromSessionId: string | null;
  readonly forkedAtTurnIndex: number | null;
  readonly branchKey: string;
}

/** Spec §17.3 — a stored idempotency record for turn submission. */
export interface IdempotencyRecord {
  readonly key: string;
  readonly userId: string;
  readonly sessionId: string;
  /** Hash of the request body. A same-key/different-hash retry is a 409. */
  readonly requestHash: string;
  turnId: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  responseBody: unknown;
  readonly createdAt: string;
}

export interface ReportRecord {
  readonly reportId: string;
  readonly reporterUserId: string;
  readonly targetType: string;
  readonly targetId: string;
  readonly reason: string;
  readonly details: string;
  status: 'OPEN' | 'REVIEWING' | 'ACTIONED' | 'DISMISSED';
  readonly createdAt: string;
}

/** Spec §34.4 — discovery signals used by the ranking job. */
export interface StorySignals {
  runs: number;
  likes: number;
  saves: number;
  hides: number;
  reports: number;
  impressions: number;
}

export interface Repository {
  // --- Catalog ---
  listStories(): Promise<StoryVersion[]>;
  getStoryVersion(storyVersionId: string): Promise<StoryVersion | null>;
  getStoryByStoryId(storyId: string): Promise<StoryVersion | null>;
  getSignals(storyId: string): Promise<StorySignals>;
  bumpSignal(storyId: string, key: keyof StorySignals, delta: number): Promise<void>;

  // --- Users ---
  getUser(userId: string): Promise<UserRecord | null>;
  createUser(user: UserRecord): Promise<void>;
  updateUser(userId: string, patch: Partial<UserRecord>): Promise<UserRecord | null>;
  deleteUser(userId: string): Promise<void>;

  // --- Sessions ---
  createSession(record: SessionRecord, state: GameState): Promise<void>;
  getSession(sessionId: string): Promise<SessionRecord | null>;
  listSessions(userId: string): Promise<SessionRecord[]>;
  updateSession(sessionId: string, patch: Partial<SessionRecord>): Promise<void>;
  deleteSession(sessionId: string): Promise<void>;

  // --- Game state ---
  getState(sessionId: string): Promise<GameState | null>;
  /**
   * Spec §17.4 — optimistic concurrency. The write only lands if the stored
   * revision still matches what the caller read, so two racing turns cannot both
   * commit against the same snapshot.
   */
  saveState(sessionId: string, expectedRevision: number, state: GameState): Promise<boolean>;

  /**
   * Spec §11.7 — the state a turn started from.
   *
   * A fork copies authoritative state *at the selected event*, so something has
   * to remember what that was. Without it a fork can only ever clone the
   * present, which is not a branch.
   */
  putStateSnapshot(sessionId: string, turnIndex: number, state: GameState): Promise<void>;
  getStateSnapshot(sessionId: string, turnIndex: number): Promise<GameState | null>;

  // --- Turns and events ---
  appendTurn(turn: TurnRecord): Promise<void>;
  /**
   * Attaches generated media to an already-committed turn. Spec §17.2: once the
   * transaction commits the turn is authoritative, so this only ever decorates.
   */
  attachHeroImage(turnId: string, url: string): Promise<void>;
  getTurn(turnId: string): Promise<TurnRecord | null>;
  listTurns(sessionId: string): Promise<TurnRecord[]>;
  appendEvents(events: readonly GameEvent[]): Promise<void>;
  listEvents(sessionId: string): Promise<GameEvent[]>;

  // --- Memory ---
  listMemories(sessionId: string): Promise<MemoryFact[]>;
  appendMemories(sessionId: string, facts: readonly MemoryFact[]): Promise<void>;
  replaceMemories(sessionId: string, facts: readonly MemoryFact[]): Promise<void>;

  // --- Wallet ---
  listLedger(accountId: string): Promise<LedgerEntry[]>;
  appendLedgerEntry(entry: LedgerEntry): Promise<void>;
  findLedgerEntryByIdempotencyKey(accountId: string, key: string): Promise<LedgerEntry | null>;

  // --- Idempotency ---
  getIdempotency(key: string): Promise<IdempotencyRecord | null>;
  putIdempotency(record: IdempotencyRecord): Promise<void>;
  updateIdempotency(key: string, patch: Partial<IdempotencyRecord>): Promise<void>;

  // --- Social ---
  getSaves(userId: string): Promise<string[]>;
  setSaved(userId: string, storyId: string, saved: boolean): Promise<void>;
  getHidden(userId: string): Promise<string[]>;
  setHidden(userId: string, storyId: string, hidden: boolean): Promise<void>;

  // --- Safety ---
  createReport(report: ReportRecord): Promise<void>;
  listReports(userId: string): Promise<ReportRecord[]>;
  listBlocks(userId: string): Promise<string[]>;
  setBlocked(userId: string, targetId: string, blocked: boolean): Promise<void>;
}

export type { SessionSummary };
