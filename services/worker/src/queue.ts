/**
 * Spec §32.2 — the job queue.
 *
 * Every job is idempotent, records attempts, has bounded retry with backoff, has
 * a dead-letter path, and emits a trace and a cost. Those are the properties
 * that matter; the transport is an implementation detail.
 *
 * Production runs BullMQ on Redis. This in-process implementation satisfies the
 * same interface so the whole product runs on `npm run api` with no
 * infrastructure, and so the handlers can be tested without a broker.
 */

export const QUEUE_NAMES = [
  'turn-media-image',
  'turn-media-voice',
  'turn-media-video',
  'memory-embedding',
  'story-quality-score',
  'creator-prepublish-eval',
  'moderation-media',
  'notification-dispatch',
  'analytics-rollup',
  'account-purge',
] as const;

export type QueueName = (typeof QUEUE_NAMES)[number];

export interface JobRecord<T = unknown> {
  readonly jobId: string;
  readonly queue: QueueName;
  readonly payload: T;
  /**
   * Spec §32.2 — idempotency key. A job enqueued twice with the same key runs
   * once, which matters because a turn commit may be retried.
   */
  readonly idempotencyKey: string;
  attempts: number;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'DEAD_LETTER';
  lastError: string | null;
  readonly enqueuedAt: string;
  startedAt: string | null;
  finishedAt: string | null;
  costUsd: number;
}

export interface JobContext {
  readonly jobId: string;
  readonly attempt: number;
  /** Cost telemetry, spec §20.12. Handlers report what a job actually spent. */
  reportCost(usd: number): void;
  readonly log: (message: string, fields?: Record<string, unknown>) => void;
}

export type JobHandler<T> = (payload: T, context: JobContext) => Promise<void>;

export interface RetryPolicy {
  readonly maxAttempts: number;
  readonly baseDelayMs: number;
  readonly maxDelayMs: number;
}

export const DEFAULT_RETRY: RetryPolicy = { maxAttempts: 3, baseDelayMs: 1_000, maxDelayMs: 30_000 };

/** Media generation is slow and expensive, so it retries less and waits longer. */
export const MEDIA_RETRY: RetryPolicy = { maxAttempts: 2, baseDelayMs: 5_000, maxDelayMs: 60_000 };

export function backoffMs(attempt: number, policy: RetryPolicy): number {
  // Exponential with full jitter, so a provider outage does not produce a
  // synchronised retry stampede when it recovers.
  const ceiling = Math.min(policy.maxDelayMs, policy.baseDelayMs * 2 ** (attempt - 1));
  return Math.floor(Math.random() * ceiling);
}

export interface QueueOptions {
  readonly retry?: RetryPolicy;
  readonly concurrency?: number;
}

export class JobQueue {
  readonly #handlers = new Map<QueueName, { handler: JobHandler<never>; options: QueueOptions }>();
  readonly #jobs = new Map<string, JobRecord>();
  readonly #byKey = new Map<string, string>();
  readonly #pending: string[] = [];
  readonly #deadLetter: JobRecord[] = [];
  #running = 0;
  #draining = false;

  register<T>(queue: QueueName, handler: JobHandler<T>, options: QueueOptions = {}): void {
    this.#handlers.set(queue, { handler: handler as JobHandler<never>, options });
  }

  /**
   * Enqueues a job. Returns the existing record when the idempotency key has
   * already been seen, so a retried commit does not generate the same hero
   * image twice.
   */
  enqueue<T>(queue: QueueName, payload: T, idempotencyKey: string): JobRecord<T> {
    const existing = this.#byKey.get(idempotencyKey);
    if (existing) return this.#jobs.get(existing) as JobRecord<T>;

    const job: JobRecord<T> = {
      jobId: `job_${crypto.randomUUID()}`,
      queue,
      payload,
      idempotencyKey,
      attempts: 0,
      status: 'PENDING',
      lastError: null,
      enqueuedAt: new Date().toISOString(),
      startedAt: null,
      finishedAt: null,
      costUsd: 0,
    };

    this.#jobs.set(job.jobId, job as JobRecord);
    this.#byKey.set(idempotencyKey, job.jobId);
    this.#pending.push(job.jobId);
    void this.#pump();
    return job;
  }

  get(jobId: string): JobRecord | null {
    return this.#jobs.get(jobId) ?? null;
  }

  get deadLetter(): readonly JobRecord[] {
    return this.#deadLetter;
  }

  /** Waits for the queue to settle. Used by tests and by graceful shutdown. */
  async drain(timeoutMs = 30_000): Promise<void> {
    const deadline = Date.now() + timeoutMs;
    while ((this.#pending.length > 0 || this.#running > 0) && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  async #pump(): Promise<void> {
    if (this.#draining) return;
    this.#draining = true;

    try {
      while (this.#pending.length > 0) {
        const jobId = this.#pending.shift();
        if (!jobId) break;
        const job = this.#jobs.get(jobId);
        if (!job) continue;

        const registered = this.#handlers.get(job.queue);
        if (!registered) {
          job.status = 'FAILED';
          job.lastError = `No handler registered for ${job.queue}`;
          continue;
        }

        const limit = registered.options.concurrency ?? 4;
        while (this.#running >= limit) {
          await new Promise((resolve) => setTimeout(resolve, 5));
        }

        this.#running += 1;
        void this.#run(job, registered).finally(() => {
          this.#running -= 1;
        });
      }
    } finally {
      this.#draining = false;
    }
  }

  async #run(
    job: JobRecord,
    registered: { handler: JobHandler<never>; options: QueueOptions },
  ): Promise<void> {
    const policy = registered.options.retry ?? DEFAULT_RETRY;
    job.attempts += 1;
    job.status = 'RUNNING';
    job.startedAt = new Date().toISOString();

    const context: JobContext = {
      jobId: job.jobId,
      attempt: job.attempts,
      reportCost: (usd) => {
        job.costUsd += usd;
      },
      log: (message, fields) => {
        // eslint-disable-next-line no-console
        console.log(`[worker:${job.queue}] ${message}`, fields ?? {});
      },
    };

    try {
      await registered.handler(job.payload as never, context);
      job.status = 'COMPLETED';
      job.finishedAt = new Date().toISOString();
    } catch (error) {
      job.lastError = error instanceof Error ? error.message : String(error);

      if (job.attempts >= policy.maxAttempts) {
        // Spec §32.2 — a dead-lettered job is kept for inspection rather than
        // dropped, because silently losing a paid media job is worse than a
        // visible failure.
        job.status = 'DEAD_LETTER';
        job.finishedAt = new Date().toISOString();
        this.#deadLetter.push(job);
        return;
      }

      job.status = 'PENDING';
      const delay = backoffMs(job.attempts, policy);
      setTimeout(() => {
        this.#pending.push(job.jobId);
        void this.#pump();
      }, delay);
    }
  }
}
