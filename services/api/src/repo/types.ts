import type {
  GameEvent,
  NarrativeTurn,
  GameState,
  LedgerEntry,
  Locale,
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
    /**
     * The player's explicit language choice for new runs, or `null` when they
     * have never made one. Existing runs keep `GameState.locale`.
     */
    locale: Locale | null;
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

/** A world nobody has touched yet. One definition, shared by every repository. */
export const EMPTY_SIGNALS: StorySignals = {
  runs: 0,
  likes: 0,
  saves: 0,
  hides: 0,
  reports: 0,
  impressions: 0,
};

export interface StoryComment {
  readonly commentId: string;
  readonly storyId: string;
  /** Null for seeded launch content, which has no account behind it. */
  readonly userId: string | null;
  readonly authorName: string;
  readonly body: string;
  readonly kind: 'USER' | 'SEEDED';
  readonly spoiler: boolean;
  readonly likes: number;
  readonly createdAt: string;
}

export interface StoryEditorial {
  readonly storyId: string;
  readonly featuredRank: number | null;
  readonly staffPick: boolean;
}

export interface UserBadgeRow {
  readonly userId: string;
  readonly badgeId: string;
  readonly progress: number;
  readonly unlockedAt: string | null;
  readonly claimedAt: string | null;
}

export interface Repository {
  // --- Catalog ---
  listStories(): Promise<StoryVersion[]>;
  getStoryVersion(storyVersionId: string): Promise<StoryVersion | null>;
  getStoryByStoryId(storyId: string): Promise<StoryVersion | null>;
  getSignals(storyId: string): Promise<StorySignals>;
  /**
   * Signals for many worlds at once.
   *
   * Discover, search and the related-worlds strip each walked the catalogue
   * calling `getSignals` one story at a time, inside `for … await`, so the
   * round trips were sequential: twenty-three worlds meant twenty-three of
   * them end to end. Against a database on the other side of the country that
   * is most of a three-second response; against one in the same rack it is
   * still twenty-three times more than the one query this needs, and it grows
   * with the catalogue.
   */
  getSignalsFor(storyIds: readonly string[]): Promise<Map<string, StorySignals>>;
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
  /**
   * Spec §20.9 — `Rephrase narration` rewrites the prose of a committed turn.
   *
   * Deliberately narrow: it can change what the turn *says* and nothing about
   * what the turn *did*. The mutations, checks and events stay exactly as they
   * committed, because re-rolling behind a rewrite button is the one thing that
   * button promises not to do.
   */
  replaceNarration(
    turnId: string,
    narration: {
      blocks: NarrativeTurn['blocks'];
      sceneSummary: string;
      endStatePrompt: string;
      stateDeltas: NarrativeTurn['stateDeltaPresentation'];
    },
  ): Promise<void>;
  getTurn(turnId: string): Promise<TurnRecord | null>;
  listTurns(sessionId: string): Promise<TurnRecord[]>;
  appendEvents(events: readonly GameEvent[]): Promise<void>;
  listEvents(sessionId: string): Promise<GameEvent[]>;

  // --- Memory ---
  listMemories(sessionId: string): Promise<MemoryFact[]>;
  appendMemories(sessionId: string, facts: readonly MemoryFact[]): Promise<void>;
  replaceMemories(sessionId: string, facts: readonly MemoryFact[]): Promise<void>;
  /**
   * WS-07 — the player pins a fact as canon they want kept.
   *
   * Not cosmetic: retrieval boosts a pinned fact, so pinning is how a player
   * says "this is the thing about my story that must not get lost".
   */
  setMemoryPinned(sessionId: string, factId: string, pinned: boolean): Promise<MemoryFact | null>;

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

  // --- Likes -----------------------------------------------------------
  //
  // A like is a row, not a counter bump. The old route incremented
  // `story_signals.likes` and returned `{liked:true}`, so the number counted
  // taps rather than people and unliking was not expressible.

  /** True if the like was newly created. False means it was already there. */
  setLiked(userId: string, storyId: string, liked: boolean): Promise<boolean>;
  getLikes(userId: string): Promise<string[]>;
  countLikes(storyIds: readonly string[]): Promise<Map<string, number>>;

  // --- Comments --------------------------------------------------------

  listComments(
    storyId: string,
    sort: 'TOP' | 'NEW',
    limit: number,
  ): Promise<StoryComment[]>;
  countComments(storyIds: readonly string[]): Promise<Map<string, number>>;
  addComment(comment: StoryComment): Promise<void>;
  deleteComment(commentId: string, userId: string): Promise<boolean>;
  setCommentLiked(userId: string, commentId: string, liked: boolean): Promise<boolean>;
  likedCommentIds(userId: string, storyId: string): Promise<string[]>;
  reportComment(reportId: string, commentId: string, reporterId: string, reason: string): Promise<void>;
  /** How many this person has posted since `since`. Rate limiting. */
  countRecentComments(userId: string, since: Date): Promise<number>;

  // --- Editorial placement ---------------------------------------------

  getEditorial(): Promise<StoryEditorial[]>;

  // --- Badges ----------------------------------------------------------

  getBadges(userId: string): Promise<UserBadgeRow[]>;
  upsertBadge(row: UserBadgeRow): Promise<void>;
  /** Claims exactly once. False means somebody already claimed it. */
  claimBadge(userId: string, badgeId: string, at: string): Promise<boolean>;

  // --- Safety ---
  createReport(report: ReportRecord): Promise<void>;
  listReports(userId: string): Promise<ReportRecord[]>;
  listBlocks(userId: string): Promise<string[]>;
  setBlocked(userId: string, targetId: string, blocked: boolean): Promise<void>;
}

export type { SessionSummary };
