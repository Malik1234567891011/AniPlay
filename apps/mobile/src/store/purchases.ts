import { Platform } from 'react-native';
import type { PurchaseSyncRequest } from '@aniplay/contracts';

/**
 * The native purchase flow (spec §20.6, §33.5).
 *
 * StoreKit and Play Billing decide whether money moved. This module's only job
 * is to open the sheet, hand what the store gives us to our server, and finish
 * the transaction once the server says the credits landed.
 *
 * The rule everything here is arranged around:
 *
 *   A transaction is never finished until the server has credited it.
 *
 * An unfinished consumable is redelivered by StoreKit on every launch, so a
 * purchase that Apple took and our server never heard about comes back by
 * itself. Finishing early to make an error go away is how a player pays and
 * gets nothing, so this code would rather retry forever than do that.
 *
 * The module is loaded lazily and degrades to unavailable in Expo Go, which has
 * no billing native module. Everything above still runs; the store just says it
 * cannot open.
 */

export interface StoreProduct {
  readonly productId: string;
  /** The store's own localised price string. Never our own formatting. */
  readonly displayPrice: string;
  readonly title: string;
}

export type PurchaseOutcome =
  | { readonly kind: 'CREDITED'; readonly credits: number; readonly balance: number }
  | { readonly kind: 'ALREADY_CREDITED'; readonly balance: number }
  | { readonly kind: 'CANCELLED' }
  | { readonly kind: 'PENDING' }
  | { readonly kind: 'UNAVAILABLE'; readonly message: string }
  | { readonly kind: 'FAILED'; readonly message: string; readonly charged: boolean };

export interface RestoreOutcome {
  readonly verified: number;
  readonly restored: number;
  readonly creditsRestored: number;
  readonly balance: number | null;
}

/** What the server needs to check a purchase with the store itself. */
export interface SyncResult {
  readonly credited: number;
  readonly duplicate: boolean;
  readonly balance: number;
}

export interface PurchaseServer {
  sync(request: PurchaseSyncRequest): Promise<SyncResult>;
  restore(transactions: PurchaseSyncRequest[]): Promise<RestoreOutcome>;
}

/** Narrowed to what we use, so the native module stays behind one surface. */
interface NativePurchase {
  id: string;
  productId: string;
  purchaseToken?: string | null;
  purchaseState?: string;
  transactionId?: string;
  originalTransactionIdentifierIOS?: string | null;
}

interface NativeModule {
  initConnection(): Promise<boolean>;
  endConnection(): Promise<boolean>;
  fetchProducts(args: { skus: string[]; type: 'in-app' }): Promise<unknown>;
  requestPurchase(args: unknown): Promise<unknown>;
  finishTransaction(args: { purchase: NativePurchase; isConsumable?: boolean }): Promise<unknown>;
  getAvailablePurchases(args?: unknown): Promise<NativePurchase[]>;
  purchaseUpdatedListener(listener: (purchase: NativePurchase) => void): { remove: () => void };
  purchaseErrorListener(listener: (error: { code?: string; message?: string }) => void): {
    remove: () => void;
  };
}

const PLATFORM: PurchaseSyncRequest['platform'] = Platform.OS === 'ios' ? 'APP_STORE' : 'PLAY_STORE';

export class Purchases {
  readonly #server: PurchaseServer;
  #native: NativeModule | null = null;
  #connected = false;
  #unavailable: string | null = null;
  #subscriptions: Array<{ remove: () => void }> = [];

  /** Resolved by whichever listener fires for the purchase we are waiting on. */
  #awaiting: { productId: string; settle: (outcome: PurchaseOutcome) => void } | null = null;

  constructor(server: PurchaseServer) {
    this.#server = server;
  }

  get available(): boolean {
    return this.#connected;
  }

  get unavailableReason(): string | null {
    return this.#unavailable;
  }

  /**
   * Opens the billing connection and starts listening.
   *
   * Safe to call repeatedly; the store screen calls it every time it appears so
   * a player who was offline when they first opened it is not stuck.
   */
  async connect(): Promise<boolean> {
    if (this.#connected) return true;

    try {
      // Required so the module is absent rather than fatal in Expo Go and on
      // the web build, neither of which has a billing native module.
      this.#native = (await import('expo-iap')) as unknown as NativeModule;
      await this.#native.initConnection();
    } catch (error) {
      this.#unavailable =
        Platform.OS === 'web'
          ? 'Credits can only be bought in the app.'
          : 'The store is not available in this build. Purchases need a native build of the app.';
      this.#native = null;
      return false;
    }

    this.#subscriptions.push(
      this.#native.purchaseUpdatedListener((purchase) => {
        void this.#handle(purchase);
      }),
      this.#native.purchaseErrorListener((error) => {
        this.#settle(toFailure(error));
      }),
    );

    this.#connected = true;
    this.#unavailable = null;

    // StoreKit redelivers anything we never finished. That is the recovery path
    // for "Apple charged, then the network died", and it costs one round trip.
    void this.drainUnfinished();
    return true;
  }

  async disconnect(): Promise<void> {
    for (const subscription of this.#subscriptions) subscription.remove();
    this.#subscriptions = [];
    this.#connected = false;
    await this.#native?.endConnection().catch(() => undefined);
  }

  /** The store's own prices, which are the only correct ones to show. */
  async products(productIds: readonly string[]): Promise<StoreProduct[]> {
    if (!this.#native || productIds.length === 0) return [];
    try {
      const result = await this.#native.fetchProducts({ skus: [...productIds], type: 'in-app' });
      const list = Array.isArray(result) ? result : [];
      return list
        .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
        .map((item) => ({
          productId: String(item.id ?? ''),
          displayPrice: String(item.displayPrice ?? ''),
          title: String(item.title ?? ''),
        }))
        .filter((product) => product.productId.length > 0);
    } catch {
      return [];
    }
  }

  /**
   * Opens the native sheet and resolves once the outcome is settled — which
   * means credited by our server, refused by the store, or cancelled. It does
   * not resolve on "Apple said yes", because that is not yet a player having
   * credits.
   */
  async buy(productId: string): Promise<PurchaseOutcome> {
    if (!this.#connected && !(await this.connect())) {
      return { kind: 'UNAVAILABLE', message: this.#unavailable ?? 'The store is not available.' };
    }
    if (this.#awaiting) {
      return { kind: 'FAILED', message: 'Another purchase is already in progress.', charged: false };
    }

    const settled = new Promise<PurchaseOutcome>((resolve) => {
      this.#awaiting = { productId, settle: resolve };
    });

    try {
      await this.#native!.requestPurchase({
        type: 'in-app',
        request: { apple: { sku: productId, quantity: 1 }, google: { skus: [productId] } },
      });
    } catch (error) {
      // Some failures arrive here and some through the error listener. Whichever
      // is first settles it; the other finds nothing to settle.
      this.#settle(toFailure(error as { code?: string; message?: string }));
    }

    return settled;
  }

  /**
   * Spec §20.6 — `Restore purchases`.
   *
   * Credits are consumable, so this is not the App Store's restore-your-
   * non-consumables flow. It is the recovery path for the case that actually
   * costs a player money: the store charged and reconciliation never finished.
   */
  async restore(): Promise<RestoreOutcome> {
    if (!this.#connected && !(await this.connect())) {
      return { verified: 0, restored: 0, creditsRestored: 0, balance: null };
    }

    const held = await this.#native!.getAvailablePurchases().catch(() => [] as NativePurchase[]);
    if (held.length === 0) return { verified: 0, restored: 0, creditsRestored: 0, balance: null };

    const outcome = await this.#server.restore(held.map(toSyncRequest));
    // Only what the server actually credited is finished. Anything it could not
    // confirm stays with the store and comes back next time.
    if (outcome.verified > 0) {
      for (const purchase of held) await this.#finish(purchase);
    }
    return outcome;
  }

  /** Re-sends transactions the store still holds because we never finished them. */
  async drainUnfinished(): Promise<void> {
    if (!this.#native) return;
    const held = await this.#native.getAvailablePurchases().catch(() => [] as NativePurchase[]);
    for (const purchase of held) await this.#handle(purchase, { silent: true });
  }

  async #handle(purchase: NativePurchase, { silent = false } = {}): Promise<void> {
    // A deferred purchase (Ask to Buy) is not a failure and not a credit. It
    // will arrive as its own event if a parent approves it.
    if (purchase.purchaseState === 'pending') {
      if (!silent) this.#settle({ kind: 'PENDING' }, purchase.productId);
      return;
    }

    let result: SyncResult;
    try {
      result = await this.#server.sync(toSyncRequest(purchase));
    } catch (error) {
      const message =
        (error as { message?: string })?.message ??
        'We could not confirm that purchase just now. Your purchase is safe.';
      // Deliberately not finished: the store keeps it, and the next launch or
      // the next Restore tries again.
      if (!silent) this.#settle({ kind: 'FAILED', message, charged: true }, purchase.productId);
      return;
    }

    await this.#finish(purchase);

    if (silent) return;
    this.#settle(
      result.duplicate
        ? { kind: 'ALREADY_CREDITED', balance: result.balance }
        : { kind: 'CREDITED', credits: result.credited, balance: result.balance },
      purchase.productId,
    );
  }

  async #finish(purchase: NativePurchase): Promise<void> {
    // Consumable: the credits are spent in play, so the transaction is closed
    // rather than kept as an entitlement.
    await this.#native?.finishTransaction({ purchase, isConsumable: true }).catch(() => undefined);
  }

  #settle(outcome: PurchaseOutcome, productId?: string): void {
    const awaiting = this.#awaiting;
    if (!awaiting) return;
    if (productId && awaiting.productId !== productId) return;
    this.#awaiting = null;
    awaiting.settle(outcome);
  }
}

function toSyncRequest(purchase: NativePurchase): PurchaseSyncRequest {
  return {
    productId: purchase.productId,
    // The store's own id. The server re-derives the canonical one from the
    // store anyway, so a client cannot replay one purchase under many ids.
    storeTransactionId: purchase.id ?? purchase.transactionId ?? '',
    platform: PLATFORM,
    // iOS: the signed JWS. Android: the purchase token. Both are what the
    // server needs to ask the store directly.
    receipt: purchase.purchaseToken ?? null,
  };
}

/**
 * Store error codes are not player copy, and the difference that matters most
 * is whether the player was charged.
 */
function toFailure(error: { code?: string; message?: string }): PurchaseOutcome {
  switch (error.code) {
    case 'user-cancelled':
    case 'E_USER_CANCELLED':
      return { kind: 'CANCELLED' };
    case 'deferred-payment':
    case 'pending':
      return { kind: 'PENDING' };
    case 'item-unavailable':
      return { kind: 'FAILED', message: 'That pack is not available right now.', charged: false };
    case 'network-error':
      return {
        kind: 'FAILED',
        message: 'The store could not be reached. You have not been charged.',
        charged: false,
      };
    case 'already-owned':
    case 'duplicate-purchase':
      return {
        kind: 'FAILED',
        message: 'That purchase is still being processed. Tap Restore purchases in a moment.',
        charged: true,
      };
    case 'iap-not-available':
    case 'billing-unavailable':
      return {
        kind: 'UNAVAILABLE',
        message: 'Purchases are not available on this device or account.',
        charged: false,
      } as PurchaseOutcome;
    default:
      return {
        kind: 'FAILED',
        message: error.message ?? 'That purchase did not go through. You have not been charged.',
        charged: false,
      };
  }
}
