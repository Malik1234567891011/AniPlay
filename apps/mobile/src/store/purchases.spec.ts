import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { PurchaseSyncRequest } from '@plotbreak/contracts';
import { Purchases, type PurchaseServer, type SyncResult } from './purchases.js';

/**
 * The purchase paths where a mistake costs someone money.
 *
 * The native module is faked so the sequencing can be tested — which is the
 * part that matters. Whether Apple's sheet renders is Apple's problem; whether
 * we finish a transaction we never credited is ours.
 */

interface FakePurchase {
  id: string;
  productId: string;
  purchaseToken?: string | null;
  purchaseState?: string;
}

/** Stands in for `expo-iap`, recording what the coordinator asked it to do. */
class FakeStore {
  updated: ((purchase: FakePurchase) => void) | null = null;
  errored: ((error: { code?: string; message?: string }) => void) | null = null;
  finished: FakePurchase[] = [];
  held: FakePurchase[] = [];
  requested: string[] = [];
  requestBehaviour: 'resolve' | 'throw' = 'resolve';

  async initConnection(): Promise<boolean> {
    return true;
  }
  async endConnection(): Promise<boolean> {
    return true;
  }
  async fetchProducts({ skus }: { skus: string[] }): Promise<unknown> {
    return skus.map((sku) => ({ id: sku, displayPrice: '£4.99', title: 'Credits' }));
  }
  async requestPurchase(args: { request: { apple?: { sku: string } } }): Promise<unknown> {
    this.requested.push(args.request.apple?.sku ?? '');
    if (this.requestBehaviour === 'throw') throw { code: 'network-error' };
    return null;
  }
  async finishTransaction({ purchase }: { purchase: FakePurchase }): Promise<unknown> {
    this.finished.push(purchase);
    this.held = this.held.filter((h) => h.id !== purchase.id);
    return null;
  }
  async getAvailablePurchases(): Promise<FakePurchase[]> {
    return [...this.held];
  }
  purchaseUpdatedListener(listener: (purchase: FakePurchase) => void): { remove: () => void } {
    this.updated = listener;
    return { remove: () => { this.updated = null; } };
  }
  purchaseErrorListener(listener: (error: { code?: string; message?: string }) => void): {
    remove: () => void;
  } {
    this.errored = listener;
    return { remove: () => { this.errored = null; } };
  }
}

class FakeServer implements PurchaseServer {
  synced: PurchaseSyncRequest[] = [];
  restored: PurchaseSyncRequest[][] = [];
  next: SyncResult | Error = { credited: 500, duplicate: false, balance: 500 };

  async sync(request: PurchaseSyncRequest): Promise<SyncResult> {
    this.synced.push(request);
    if (this.next instanceof Error) throw this.next;
    return this.next;
  }
  async restore(transactions: PurchaseSyncRequest[]) {
    this.restored.push(transactions);
    return { verified: transactions.length, restored: 1, creditsRestored: 500, balance: 500 };
  }
}

const store = new FakeStore();
vi.mock('expo-iap', () => ({
  initConnection: () => store.initConnection(),
  endConnection: () => store.endConnection(),
  fetchProducts: (args: { skus: string[] }) => store.fetchProducts(args),
  requestPurchase: (args: never) => store.requestPurchase(args),
  finishTransaction: (args: never) => store.finishTransaction(args),
  getAvailablePurchases: () => store.getAvailablePurchases(),
  purchaseUpdatedListener: (l: never) => store.purchaseUpdatedListener(l),
  purchaseErrorListener: (l: never) => store.purchaseErrorListener(l),
}));
vi.mock('react-native', () => ({ Platform: { OS: 'ios' } }));

const PURCHASE: FakePurchase = { id: 'txn_1', productId: 'credits_500', purchaseToken: 'jws-blob' };

describe('Purchases', () => {
  let server: FakeServer;
  let purchases: Purchases;

  beforeEach(async () => {
    store.updated = null;
    store.errored = null;
    store.finished = [];
    store.held = [];
    store.requested = [];
    store.requestBehaviour = 'resolve';
    server = new FakeServer();
    purchases = new Purchases(server);
    await purchases.connect();
  });

  it('shows the store’s own localised price', async () => {
    expect(await purchases.products(['credits_500'])).toEqual([
      { productId: 'credits_500', displayPrice: '£4.99', title: 'Credits' },
    ]);
  });

  it('credits a completed purchase once, and only then finishes it', async () => {
    const pending = purchases.buy('credits_500');
    store.updated!(PURCHASE);
    const outcome = await pending;

    expect(outcome).toEqual({ kind: 'CREDITED', credits: 500, balance: 500 });
    // The server got what the store gave us, not what the client decided.
    expect(server.synced).toEqual([
      {
        productId: 'credits_500',
        storeTransactionId: 'txn_1',
        platform: 'APP_STORE',
        receipt: 'jws-blob',
      },
    ]);
    expect(store.finished.map((p) => p.id)).toEqual(['txn_1']);
  });

  it('does not finish a transaction the server could not credit', async () => {
    server.next = new Error('We could not confirm that purchase just now.');
    const pending = purchases.buy('credits_500');
    store.updated!(PURCHASE);
    const outcome = await pending;

    expect(outcome).toMatchObject({ kind: 'FAILED', charged: true });
    // Left with the store on purpose: this is how a paid purchase comes back.
    expect(store.finished).toEqual([]);
  });

  it('recovers the purchase Apple took and the network lost', async () => {
    server.next = new Error('offline');
    const first = purchases.buy('credits_500');
    store.held = [PURCHASE];
    store.updated!(PURCHASE);
    await first;
    expect(store.finished).toEqual([]);

    // Next launch: StoreKit redelivers on connect, the server is reachable,
    // and it credits. Nothing the player does is involved.
    server.next = { credited: 500, duplicate: false, balance: 500 };
    const recovered = new Purchases(server);
    await recovered.connect();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(server.synced).toHaveLength(2);
    expect(store.finished.map((p) => p.id)).toEqual(['txn_1']);
  });

  it('charges nothing and says nothing when the player cancels', async () => {
    const pending = purchases.buy('credits_500');
    store.errored!({ code: 'user-cancelled' });
    expect(await pending).toEqual({ kind: 'CANCELLED' });
    expect(server.synced).toEqual([]);
    expect(store.finished).toEqual([]);
  });

  it('reports a deferred purchase as pending rather than as a failure', async () => {
    const pending = purchases.buy('credits_500');
    store.updated!({ ...PURCHASE, purchaseState: 'pending' });
    expect(await pending).toEqual({ kind: 'PENDING' });
    expect(server.synced).toEqual([]);
  });

  it('credits a replayed transaction once', async () => {
    server.next = { credited: 0, duplicate: true, balance: 500 };
    const pending = purchases.buy('credits_500');
    store.updated!(PURCHASE);
    expect(await pending).toEqual({ kind: 'ALREADY_CREDITED', balance: 500 });
    // A duplicate is still settled with the store, or it would replay forever.
    expect(store.finished.map((p) => p.id)).toEqual(['txn_1']);
  });

  it('does not let a second purchase start while one is open', async () => {
    const first = purchases.buy('credits_500');
    expect(await purchases.buy('credits_1200')).toMatchObject({ kind: 'FAILED', charged: false });
    store.errored!({ code: 'user-cancelled' });
    await first;
  });

  it('says the player was not charged when the store never opened', async () => {
    store.requestBehaviour = 'throw';
    const outcome = await purchases.buy('credits_500');
    expect(outcome).toMatchObject({ kind: 'FAILED', charged: false });
    expect(String((outcome as { message: string }).message)).toContain('not been charged');
  });

  it('restores what the platform still holds', async () => {
    store.held = [PURCHASE, { id: 'txn_2', productId: 'credits_1200', purchaseToken: 'jws-2' }];
    const result = await purchases.restore();
    expect(result.restored).toBe(1);
    expect(server.restored[0]!.map((t) => t.storeTransactionId)).toEqual(['txn_1', 'txn_2']);
    expect(store.finished.map((p) => p.id)).toEqual(['txn_1', 'txn_2']);
  });

  it('has nothing to restore when the platform holds nothing', async () => {
    expect(await purchases.restore()).toEqual({
      verified: 0,
      restored: 0,
      creditsRestored: 0,
      balance: null,
    });
    expect(server.restored).toEqual([]);
  });
});
