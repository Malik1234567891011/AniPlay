import { Platform } from 'react-native';
import { translatorFor, type Translator } from '@aniplay/i18n';
import type {
  BootstrapResponse,
  CreateSessionRequest,
  DiscoverResponse,
  LedgerResponse,
  MeResponse,
  PlayerTurnRecord,
  PurchaseRestoreResponse,
  PurchaseSyncRequest,
  QualityTier,
  SessionDetailResponse,
  SessionSummary,
  StoryDetailResponse,
  StorySummary,
  SubmitTurnResponse,
  TimelineResponse,
  TurnStreamEventName,
  WalletResponse,
  WorldSheetResponse,
} from '@aniplay/contracts';

/**
 * The typed `/v1` client.
 *
 * Every response shape comes from `@aniplay/contracts`, so a server change that
 * breaks the client is a compile error rather than a runtime surprise.
 */

/**
 * Simulators and devices cannot reach `localhost`. The iOS simulator shares the
 * host's loopback; Android's emulator maps the host to 10.0.2.2. A physical
 * device needs an explicit LAN address via EXPO_PUBLIC_API_URL.
 */
function defaultBaseUrl(): string {
  const configured = process.env.EXPO_PUBLIC_API_URL;
  if (configured) return configured;
  if (Platform.OS === 'android') return 'http://10.0.2.2:4000';
  return 'http://localhost:4000';
}

export interface PlayerCharacterCard {
  sessionId: string;
  storyId: string;
  storyTitle: string;
  displayName: string;
  pronouns: string;
  archetypeName: string | null;
  portraitUrl: string | null;
  appearanceNote: string;
  worldKnowsAboutYou: string;
  turnCount: number;
  level: number;
  milestones: number;
  locationName: string;
  canon: string[];
  notableMemories: string[];
  status: string;
  lastPlayedAt: string;
  portraitCost: number;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    override readonly message: string,
    readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  /** Spec WL-03 — the wallet sheet shows the exact shortfall. */
  get shortfall(): number | null {
    return typeof this.details?.shortfall === 'number' ? this.details.shortfall : null;
  }

  get currentRevision(): number | null {
    return typeof this.details?.currentRevision === 'number' ? this.details.currentRevision : null;
  }
}

export interface TurnStreamHandlers {
  onEvent?: (event: TurnStreamEventName, data: Record<string, unknown>) => void;
  onError?: (error: Error) => void;
}

export class ApiClient {
  #baseUrl: string;
  #token: string | null = null;
  /**
   * Asked for a token before every request, so an access token that expired
   * while the app was backgrounded is renewed rather than sent and rejected.
   */
  #tokenProvider: ((options?: { force?: boolean }) => Promise<string | null>) | null = null;
  /**
   * The interface translator.
   *
   * This module is not React, so there is no `useT()` here, and there is no
   * ambient current language either — `translate.ts` is explicit that a
   * module-level default is how two halves of the app get out of step. So the
   * language arrives the same way the token does: pushed in at boot by the
   * store, which is the one place that holds it (`state/store.tsx`).
   *
   * English until then, which is what an error thrown before the store has
   * hydrated should say anyway.
   */
  #t: Translator = translatorFor('en');

  constructor(baseUrl = defaultBaseUrl()) {
    this.#baseUrl = baseUrl.replace(/\/$/, '');
  }

  get baseUrl(): string {
    return this.#baseUrl;
  }

  setToken(token: string | null): void {
    this.#token = token;
  }

  /** Installed once at boot by the auth store. */
  setTokenProvider(provider: ((options?: { force?: boolean }) => Promise<string | null>) | null): void {
    this.#tokenProvider = provider;
  }

  /** Installed by the store, and again whenever the player changes language. */
  setTranslator(t: Translator): void {
    this.#t = t;
  }

  get token(): string | null {
    return this.#token;
  }

  async #authorization({ force = false } = {}): Promise<string | null> {
    if (this.#tokenProvider) {
      const token = await this.#tokenProvider({ force });
      this.#token = token;
      return token;
    }
    return this.#token;
  }

  async #request<T>(
    method: string,
    path: string,
    body?: unknown,
    extraHeaders: Record<string, string> = {},
    { retryOnExpiry = true, useToken }: { retryOnExpiry?: boolean; useToken?: string } = {},
  ): Promise<T> {
    const headers: Record<string, string> = {
      accept: 'application/json',
      'x-app-version': '1.0.0',
      ...extraHeaders,
    };
    if (body !== undefined) headers['content-type'] = 'application/json';
    // A retry already has the token the renewal produced. Asking the provider
    // again would spend a second refresh, and GoTrue rotates refresh tokens,
    // so the second ask can invalidate the first answer.
    const token = useToken ?? (await this.#authorization());
    // i18n-exempt: an HTTP Authorization header value, not copy
    if (token) headers.authorization = `Bearer ${token}`;

    let response: Response;
    try {
      response = await fetch(`${this.#baseUrl}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch (cause) {
      // Spec §10.8 — offline is a first-class state with plain copy.
      throw new ApiError(0, 'OFFLINE', this.#t('error.offline_action_saved'), {
        cause: String(cause),
      });
    }

    if (response.status === 204) return undefined as T;

    const text = await response.text();
    const parsed: unknown = text.length > 0 ? JSON.parse(text) : null;

    if (!response.ok) {
      const error = (parsed ?? {}) as { code?: string; message?: string; details?: Record<string, unknown> };

      // The server distinguishes an expired token from a bad one precisely so
      // this can happen: renew and retry once, silently. A player mid-scene
      // should never be shown a sign-in wall because a token aged out.
      //
      // UNAUTHENTICATED is in here for the same reason. It means we sent no
      // token at all, which now has a real recovery — the auth store will sign
      // in as a guest on demand — so the right response is to ask it again and
      // send the request rather than to put "start a guest session first" in
      // front of somebody who is trying to press Enter on a character.
      const recoverable = error.code === 'TOKEN_EXPIRED' || error.code === 'UNAUTHENTICATED';
      if (response.status === 401 && recoverable && retryOnExpiry) {
        this.#token = null;
        // Forced: the server has refused this token, so a provider that only
        // consults its own expiry clock would hand back the same one and the
        // retry would fail identically.
        const renewed = await this.#authorization({ force: true });
        if (renewed) {
          return this.#request<T>(method, path, body, extraHeaders, {
            retryOnExpiry: false,
            useToken: renewed,
          });
        }
      }

      // A development build talking to a server that has real auth turned on
      // sends a `guest_…` token that server will never accept, and every screen
      // in the app then shows the same unexplained 401. Name it, because the
      // fix is a restart of the dev server and nothing in the app itself.
      if (response.status === 401 && token?.startsWith('guest_')) {
        throw new ApiError(401, 'AUTH_NOT_CONFIGURED', this.#t('error.auth_not_configured'));
      }

      throw new ApiError(
        response.status,
        error.code ?? 'UNKNOWN',
        // The server's message is already in the player's language when the
        // server knows it; ours is the fallback for when it said nothing.
        error.message ?? this.#t('error.request_failed'),
        error.details,
      );
    }

    return parsed as T;
  }

  // --- Bootstrap and catalog ---

  bootstrap(): Promise<BootstrapResponse> {
    return this.#request('GET', '/v1/bootstrap');
  }

  /** Tastes ride along rather than being stored, so this works signed out. */
  discover(tastes: readonly string[] = [], category: string | null = null): Promise<DiscoverResponse> {
    const params = new URLSearchParams();
    if (tastes.length > 0) params.set('tastes', tastes.join(','));
    if (category) params.set('category', category);
    const query = params.toString();
    return this.#request('GET', `/v1/discover${query ? `?${query}` : ''}`);
  }

  search(query: string, category: string | null = null): Promise<{ results: StorySummary[] }> {
    const params = new URLSearchParams({ q: query });
    if (category) params.set('category', category);
    return this.#request('GET', `/v1/search?${params.toString()}`);
  }

  storyDetail(storyId: string): Promise<StoryDetailResponse> {
    return this.#request('GET', `/v1/stories/${storyId}`);
  }

  saveStory(storyId: string, saved: boolean): Promise<{ saved: boolean }> {
    return this.#request(saved ? 'POST' : 'DELETE', `/v1/stories/${storyId}/save`);
  }

  hideStory(storyId: string): Promise<{ hidden: boolean }> {
    return this.#request('POST', `/v1/stories/${storyId}/hide`);
  }

  // --- Sessions ---

  createSession(storyId: string, body: CreateSessionRequest): Promise<SessionDetailResponse> {
    return this.#request('POST', `/v1/stories/${storyId}/sessions`, body);
  }

  listSessions(): Promise<{ sessions: SessionSummary[] }> {
    return this.#request('GET', '/v1/sessions');
  }

  session(sessionId: string): Promise<SessionDetailResponse> {
    return this.#request('GET', `/v1/sessions/${sessionId}`);
  }

  deleteSession(sessionId: string): Promise<{ deleted: boolean }> {
    return this.#request('DELETE', `/v1/sessions/${sessionId}`);
  }

  worldSheet(sessionId: string): Promise<WorldSheetResponse> {
    return this.#request('GET', `/v1/sessions/${sessionId}/world-sheet`);
  }

  timeline(sessionId: string): Promise<TimelineResponse> {
    return this.#request('GET', `/v1/sessions/${sessionId}/timeline`);
  }

  forkSession(sessionId: string, atTurnIndex?: number): Promise<{ session: SessionSummary; creditsCharged: number }> {
    return this.#request('POST', `/v1/sessions/${sessionId}/forks`, { atTurnIndex });
  }

  correctCanon(sessionId: string, factId: string, correctedText: string) {
    return this.#request<{
      accepted: boolean;
      conflictExplanation: string | null;
      offerFork: boolean;
    }>('POST', `/v1/sessions/${sessionId}/canon-corrections`, { factId, correctedText });
  }

  // --- Turns ---

  submitTurn(
    sessionId: string,
    body: {
      actionText: string;
      qualityTier: QualityTier;
      sessionRevision: number;
      /**
       * The tapped response's `intentHint`, so the server knows who the line is
       * aimed at rather than re-deriving it from the card's own prose. Null for
       * typed input, which is parsed from the words as it always was.
       */
      selectedSuggestionId?: string | null;
    },
    idempotencyKey: string,
  ): Promise<SubmitTurnResponse> {
    return this.#request(
      'POST',
      `/v1/sessions/${sessionId}/turns`,
      { selectedSuggestionId: null, ...body, voicePreferred: false },
      { 'idempotency-key': idempotencyKey },
    );
  }

  turn(turnId: string): Promise<PlayerTurnRecord> {
    return this.#request('GET', `/v1/turns/${turnId}`);
  }

  /**
   * Consumes the SSE turn stream.
   *
   * React Native has no EventSource, so this reads the response body directly.
   * Hermes exposes `fetch` without streaming bodies, so the fallback polls the
   * finished turn — the UI is identical either way, only the pacing differs.
   */
  async streamTurn(
    turnId: string,
    streamToken: string,
    handlers: TurnStreamHandlers,
    signal?: AbortSignal,
  ): Promise<void> {
    const url = `${this.#baseUrl}/v1/turns/${turnId}/stream?token=${encodeURIComponent(streamToken)}`;

    try {
      const response = await fetch(url, {
        // i18n-exempt: an HTTP Authorization header value, not copy
        headers: this.#token ? { authorization: `Bearer ${this.#token}` } : {},
        signal,
      });

      const body = response.body as ReadableStream<Uint8Array> | null | undefined;
      if (!body?.getReader) {
        await this.#pollTurn(turnId, handlers, signal);
        return;
      }

      const reader = body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // SSE frames are separated by a blank line.
        const frames = buffer.split('\n\n');
        buffer = frames.pop() ?? '';

        for (const frame of frames) {
          const dataLine = frame.split('\n').find((line) => line.startsWith('data:'));
          if (!dataLine) continue;
          try {
            const parsed = JSON.parse(dataLine.slice(5).trim()) as {
              event: TurnStreamEventName;
              data: Record<string, unknown>;
            };
            handlers.onEvent?.(parsed.event, parsed.data);
          } catch {
            // A truncated frame completes on the next read.
          }
        }
      }
    } catch (error) {
      if (signal?.aborted) return;
      // Streaming failed, but the turn may still have committed server-side.
      await this.#pollTurn(turnId, handlers, signal).catch(() => {
        handlers.onError?.(error instanceof Error ? error : new Error(String(error)));
      });
    }
  }

  /** Fallback: the turn is authoritative once committed, so polling is safe. */
  async #pollTurn(turnId: string, handlers: TurnStreamHandlers, signal?: AbortSignal): Promise<void> {
    for (let attempt = 0; attempt < 40; attempt++) {
      if (signal?.aborted) return;
      try {
        const turn = await this.turn(turnId);
        for (const check of turn.checks) {
          handlers.onEvent?.('check.resolved', {
            checkId: check.checkId,
            label: check.label,
            outcome: check.outcome,
            outcomeLabel: check.outcome,
            difficultyLabel: '',
            math: null,
          });
        }
        turn.blocks.forEach((block, index) => {
          handlers.onEvent?.('text.delta', { blockIndex: index, ...block });
        });
        handlers.onEvent?.('turn.completed', {
          turnId: turn.turnId,
          sceneSummary: turn.sceneSummary,
          endStatePrompt: turn.endStatePrompt,
          suggestions: turn.suggestions,
          creditsCharged: turn.creditsCharged,
        });
        return;
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          await new Promise((resolve) => setTimeout(resolve, 250));
          continue;
        }
        throw error;
      }
    }
    handlers.onError?.(new Error(this.#t('error.turn_timeout')));
  }

  // --- Media (spec §9.3) ---

  /**
   * Generates or regenerates the player's portrait for a run. Costs credits and
   * is refunded automatically if the provider fails.
   */
  generatePortrait(
    sessionId: string,
    body: { appearanceNote?: string } = {},
  ): Promise<{
    assetKey: string;
    url: string;
    alt: string;
    variant: number;
    creditsCharged: number;
    balance: number;
  }> {
    return this.#request('POST', `/v1/sessions/${sessionId}/portrait`, body);
  }

  /** Every player character across every world, with the canon each accumulated. */
  myCharacters(): Promise<{ characters: PlayerCharacterCard[] }> {
    return this.#request('GET', '/v1/me/characters');
  }

  // --- Wallet ---

  wallet(): Promise<WalletResponse> {
    return this.#request('GET', '/v1/wallet');
  }

  ledger(cursor?: string): Promise<LedgerResponse> {
    return this.#request('GET', `/v1/wallet/ledger${cursor ? `?cursor=${cursor}` : ''}`);
  }

  claimDaily(): Promise<{ granted: boolean; amount: number; balance: number; nextClaimAt: string | null }> {
    return this.#request('POST', '/v1/wallet/daily-claim');
  }

  /**
   * Hands the server what the store gave us. The server asks Apple or Google
   * directly and credits nothing this request merely claims (§33.5).
   */
  syncPurchase(request: PurchaseSyncRequest) {
    return this.#request<{ credited: number; duplicate: boolean; balance: number }>(
      'POST',
      '/v1/store/purchases/sync',
      request,
    );
  }

  /**
   * Spec §20.6 — `Restore purchases`.
   *
   * `transactions` comes from the platform's own record of what this account
   * bought. Production fills it from StoreKit / Play Billing; with no native
   * store module attached it is empty, and an empty restore correctly reports
   * that there is nothing to recover rather than inventing something.
   */
  restorePurchases(transactions: PurchaseSyncRequest[] = []) {
    return this.#request<PurchaseRestoreResponse>('POST', '/v1/store/purchases/restore', {
      transactions,
    });
  }

  /**
   * GP-04 / §20.9 — ask for the same moment in different words.
   *
   * The server reruns only the writer, from the resolution the turn already
   * stored. Nothing is re-rolled, so this cannot change what happened.
   */
  rephraseTurn(turnId: string) {
    return this.#request<{ turn: PlayerTurnRecord; creditsCharged: number; balance: number }>(
      'POST',
      `/v1/turns/${turnId}/rephrase`,
    );
  }

  /** WS-07 — keep this moment. Pinned canon is weighted higher in retrieval. */
  pinTimelineEntry(sessionId: string, factId: string, pinned: boolean) {
    return this.#request<{ factId: string; pinned: boolean }>(
      'POST',
      `/v1/sessions/${sessionId}/timeline/${factId}/pin`,
      { pinned },
    );
  }

  // --- Account and safety ---

  me(): Promise<MeResponse> {
    return this.#request('GET', '/v1/me');
  }

  updateMe(patch: Record<string, unknown>): Promise<MeResponse> {
    return this.#request('PATCH', '/v1/me', patch);
  }

  report(body: {
    targetType: string;
    targetId: string;
    reason: string;
    details?: string;
    alsoHide?: boolean;
  }): Promise<{ reportId: string; caseReference: string }> {
    return this.#request('POST', '/v1/reports', {
      details: '',
      alsoHide: false,
      ...body,
    });
  }

  migrateGuest(guestUserId: string, displayName: string) {
    return this.#request<{ migrated: boolean; sessionsMoved: number }>(
      'POST',
      '/v1/auth/guest-migrate',
      { guestUserId, displayName },
    );
  }

  deleteAccount(): Promise<{ deleted: boolean }> {
    return this.#request('POST', '/v1/account/deletion-request');
  }
}

export const api = new ApiClient();
