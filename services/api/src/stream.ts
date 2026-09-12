import type { TurnStreamEvent, TurnStreamEventName } from '@plotbreak/contracts';

/**
 * Spec §17.9 — the SSE turn stream.
 *
 * The POST returns 202 immediately and processing continues in the background,
 * so a client that connects late (slow network, backgrounded app) must still
 * receive everything. Each turn therefore gets a buffer that is replayed on
 * subscribe before live events are tailed. Every event carries `turn_id` and a
 * monotonically increasing `sequence`, so a client can detect a gap.
 */

type Listener = (event: TurnStreamEvent) => void;

interface TurnStream {
  readonly turnId: string;
  readonly events: TurnStreamEvent[];
  readonly listeners: Set<Listener>;
  sequence: number;
  done: boolean;
  /** Single-use token so a stream URL cannot be replayed by another client. */
  readonly token: string;
  readonly userId: string;
  createdAt: number;
}

const TERMINAL: ReadonlySet<TurnStreamEventName> = new Set(['turn.completed', 'turn.failed']);

/** Completed streams are dropped after this, so a long-lived process stays bounded. */
const RETENTION_MS = 5 * 60 * 1000;

export class TurnStreamHub {
  readonly #streams = new Map<string, TurnStream>();

  open(turnId: string, userId: string): { token: string } {
    const token = `st_${crypto.randomUUID()}`;
    this.#streams.set(turnId, {
      turnId,
      events: [],
      listeners: new Set(),
      sequence: 0,
      done: false,
      token,
      userId,
      createdAt: Date.now(),
    });
    this.#sweep();
    return { token };
  }

  emit(
    turnId: string,
    event: TurnStreamEventName,
    data: Record<string, unknown>,
    sessionRevision?: number,
  ): void {
    const stream = this.#streams.get(turnId);
    if (!stream || stream.done) return;

    const payload: TurnStreamEvent = {
      event,
      turnId,
      sequence: stream.sequence++,
      sessionRevision: sessionRevision ?? null,
      data,
    };

    stream.events.push(payload);
    if (TERMINAL.has(event)) stream.done = true;

    for (const listener of stream.listeners) {
      try {
        listener(payload);
      } catch {
        // A dead connection must not stop the others from being served.
      }
    }
  }

  /**
   * Replays what has already happened, then tails. Returns an unsubscribe
   * function and whether the turn had already finished.
   */
  subscribe(
    turnId: string,
    token: string,
    userId: string,
    listener: Listener,
  ): { ok: false; reason: 'NOT_FOUND' | 'FORBIDDEN' } | { ok: true; done: boolean; unsubscribe: () => void } {
    const stream = this.#streams.get(turnId);
    if (!stream) return { ok: false, reason: 'NOT_FOUND' };
    if (stream.token !== token || stream.userId !== userId) return { ok: false, reason: 'FORBIDDEN' };

    for (const event of stream.events) listener(event);
    if (stream.done) return { ok: true, done: true, unsubscribe: () => {} };

    stream.listeners.add(listener);
    return {
      ok: true,
      done: false,
      unsubscribe: () => stream.listeners.delete(listener),
    };
  }

  isDone(turnId: string): boolean {
    return this.#streams.get(turnId)?.done ?? true;
  }

  #sweep(): void {
    const cutoff = Date.now() - RETENTION_MS;
    for (const [turnId, stream] of this.#streams) {
      if (stream.done && stream.createdAt < cutoff && stream.listeners.size === 0) {
        this.#streams.delete(turnId);
      }
    }
  }
}

/** Serialises one event as an SSE frame. */
export function formatSse(event: TurnStreamEvent): string {
  return `event: ${event.event}\ndata: ${JSON.stringify(event)}\nid: ${event.sequence}\n\n`;
}
