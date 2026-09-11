import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { LedgerEntry, StoreOffer, WalletSummary } from '@aniplay/contracts';
import {
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  Row,
  Skeleton,
  Stack,
  Txt,
  colors,
  formatCredits,
  GUTTER,
  haptic,
  radius,
  spacing,
} from '@aniplay/ui';
import type { Translator } from '@aniplay/i18n';
import { api } from '../api/client.js';
import { Purchases } from '../store/purchases.js';
import { useStore } from '../state/store.jsx';
import { useT } from '../i18n/useT.js';
import type { RootNavigation, RootRoute } from '../navigation.jsx';

/**
 * One billing connection for the app, not one per mount of this screen.
 *
 * The listeners it installs are how a purchase arrives at all, including a
 * transaction StoreKit redelivers from a previous launch, so it has to outlive
 * the screen that opened it.
 */
const purchases = new Purchases({
  sync: (request) => api.syncPurchase(request),
  restore: (transactions) => api.restorePurchases(transactions),
});

/**
 * WL-01 / WL-02 / WL-03 — wallet and store.
 *
 * Spec §20.6 — balance large at top, packs, restore, history, and an honest
 * explanation of how credits work. Spec §3.8: never fake scarcity or prices.
 */
export function WalletScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  // i18n-exempt: 'Wallet' is the route name in a type parameter, not shown to anybody
  route: RootRoute<'Wallet'>;
}): React.JSX.Element {
  const shortfall = route.params?.shortfall ?? null;
  const { refreshWallet, setBalance } = useStore();
  const t = useT();

  const [wallet, setWallet] = useState<WalletSummary | null>(null);
  const [offers, setOffers] = useState<StoreOffer[]>([]);
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [storePrices, setStorePrices] = useState<Record<string, string>>({});
  const [storeUnavailable, setStoreUnavailable] = useState<string | null>(null);

  const load = useCallback(async () => {
    const response = await api.wallet();
    setWallet(response.wallet);
    setOffers(response.offers);

    // Apple and Google are the only correct source of a price: theirs is
    // localised, it moves with tiers, and it is what the sheet will actually
    // charge. Our reference price is the placeholder until the store answers.
    if (await purchases.connect()) {
      const products = await purchases.products(response.offers.map((offer) => offer.productId));
      setStorePrices(Object.fromEntries(products.map((product) => [product.productId, product.displayPrice])));
    }
    setStoreUnavailable(purchases.unavailableReason);
    // The header pill reads from the shared store. Opening the wallet is
    // exactly the moment the two must not disagree, so this one fetch feeds
    // both rather than leaving a stale pill behind an accurate sheet.
    setBalance(response.wallet.balance);
  }, [setBalance]);

  // The billing connection outlives this screen, so it cannot be handed a
  // language once at construction: it is created at module load, before the app
  // knows one. It is told here instead, and told again whenever the player
  // changes it, so a store error raised months into a session is in the
  // language the screen is currently in.
  useEffect(() => {
    purchases.translator = t;
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  /**
   * WL-02 — buying a pack.
   *
   * Apple's sheet decides whether money moved; our server decides whether
   * credits were granted; and those are not the same moment. Nothing here
   * reports success until the server has confirmed it, and a transaction the
   * store took is never discarded — it stays with the store and comes back on
   * the next launch or the next Restore.
   */
  const purchase = async (offer: StoreOffer): Promise<void> => {
    setBusy(offer.productId);
    setNotice(null);

    const outcome = await purchases.buy(offer.productId);

    if (outcome.kind === 'CREDITED' || outcome.kind === 'ALREADY_CREDITED') {
      await load();
      await refreshWallet();
      haptic('success');
      setNotice(
        outcome.kind === 'ALREADY_CREDITED'
          ? t('wallet.already_credited')
          : t('wallet.credits_added', {
              count: outcome.credits,
              credits: formatCredits(outcome.credits),
            }),
      );
    } else if (outcome.kind === 'CANCELLED') {
      // Someone who changed their mind has not hit a problem. Say nothing.
      setNotice(null);
    } else if (outcome.kind === 'PENDING') {
      setNotice(t('wallet.purchase_pending'));
    } else {
      haptic('error');
      // Spec §3.8 — never tell a player they were not charged unless we know
      // it. If the store took the money and we could not confirm it, say so.
      setNotice(
        outcome.kind === 'UNAVAILABLE'
          ? outcome.message
          : outcome.charged
            ? t('wallet.purchase_failed_charged', { message: outcome.message })
            : outcome.message,
      );
    }

    setBusy(null);
  };

  /**
   * Spec §20.6 — `Restore purchases`.
   *
   * Credits are consumables, so this is not the usual "unlock what you own"
   * button. It is the fix for the one bad case: the store charged and our
   * reconciliation did not finish. Every transaction the platform still holds
   * is re-verified; anything already credited comes back as a duplicate and
   * changes nothing.
   */
  const restore = async (): Promise<void> => {
    setBusy('restore');
    setNotice(null);
    try {
      const result = await purchases.restore();
      await load();
      await refreshWallet();
      if (result.restored > 0) {
        haptic('success');
        setNotice(
          t('wallet.credits_restored', {
            count: result.creditsRestored,
            credits: formatCredits(result.creditsRestored),
          }),
        );
      } else if (result.verified > 0) {
        setNotice(t('wallet.restore_all_present'));
      } else {
        setNotice(t('wallet.restore_none'));
      }
    } catch {
      haptic('error');
      setNotice(t('wallet.restore_unreachable'));
    } finally {
      setBusy(null);
    }
  };

  const claimDaily = async (): Promise<void> => {
    setBusy('daily');
    try {
      const result = await api.claimDaily();
      await load();
      await refreshWallet();
      if (result.granted) {
        haptic('success');
        setNotice(t('wallet.credits_claimed', { count: result.amount }));
      }
    } catch {
      setNotice(t('wallet.daily_sign_in'));
    } finally {
      setBusy(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between' }}>
        <Txt variant="h2">{t('wallet.title')}</Txt>
        <IconButton label={t('wallet.close')} onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      {/* Pinned, not inline. The controls that produce these are spread down a
          page taller than the screen — Restore sits at the very bottom — so a
          notice in the scroll flow is a confirmation the player never sees. */}
      {notice ? (
        // Announced, not just shown: a player using VoiceOver gets the result
        // of a purchase or a restore without hunting for it.
        <View accessibilityLiveRegion="polite" style={{ paddingHorizontal: GUTTER, paddingTop: spacing.md }}>
          <Card>
            <Txt variant="bodyCompact">{notice}</Txt>
          </Card>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl, paddingBottom: spacing.giant }}>
        {
          /* WL-03 — the exact shortfall, never a vague "not enough". */
        }
        {shortfall ? (
          <Card style={{ borderColor: colors.semantic.warning, gap: spacing.xs }}>
            <Txt variant="bodyStrong" color={colors.semantic.warning}>
              {t('wallet.shortfall', { count: shortfall })}
            </Txt>
            <Txt variant="caption" color={colors.text.secondary}>
              {t('wallet.shortfall_hint')}
            </Txt>
          </Card>
        ) : null}

        {!wallet ? (
          <Skeleton width="100%" height={100} />
        ) : (
          <Stack gap={spacing.xs} style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
            <Txt variant="micro" color={colors.text.muted}>
              {t('wallet.balance_label')}
            </Txt>
            {/* Spec §26.10 — the wallet always shows the full number. */}
            <Row gap={spacing.sm} align="baseline">
              <Txt variant="display">{wallet.balance.toLocaleString()}</Txt>
              <Txt variant="body" color={colors.text.muted}>
                {t('wallet.credits_unit')}
              </Txt>
            </Row>
            {wallet.reserved > 0 ? (
              <Txt variant="caption" color={colors.text.muted}>
                {t('wallet.reserved_held', { count: wallet.reserved })}
              </Txt>
            ) : null}
          </Stack>
        )}

        {wallet?.dailyClaimAvailable ? (
          <Button
            label={t('wallet.claim_daily')}
            variant="secondary"
            loading={busy === 'daily'}
            loadingLabel={t('wallet.claiming')}
            onPress={() => void claimDaily()}
          />
        ) : wallet?.nextDailyClaimAt ? (
          <Txt variant="caption" color={colors.text.muted} center>
            {t('wallet.next_daily', { when: relativeTime(wallet.nextDailyClaimAt, t) })}
          </Txt>
        ) : null}

        <Stack gap={spacing.md}>
          <Txt variant="h3">{t('wallet.packs_title')}</Txt>
          {offers.map((offer) => (
            <Pressable
              key={offer.productId}
              accessibilityRole="button"
              accessibilityLabel={t('wallet.offer_a11y', {
                credits: formatCredits(offer.credits),
                bonus: offer.bonusCredits ? String(offer.bonusCredits) : 'none',
                price:
                  storePrices[offer.productId] ??
                  // The dollar amount is deliberately untouched — a hardcoded
                  // USD fallback is a known France bug (UI_AUDIT §2.2), tracked
                  // separately, and translating the word around it would only
                  // hide it. Only `about` is keyed.
                  t('wallet.about_price', { price: `$${offer.referencePriceUsd.toFixed(2)}` }),
              })}
              disabled={busy !== null}
              onPress={() => void purchase(offer)}
            >
              <Card
                style={{
                  borderColor: offer.firstPurchaseOnly ? colors.accent.primary : colors.border.subtle,
                  opacity: busy && busy !== offer.productId ? 0.5 : 1,
                }}
              >
                <Row style={{ justifyContent: 'space-between' }}>
                  <Stack gap={2}>
                    <Row gap={spacing.sm}>
                      <Txt variant="bodyStrong">{formatCredits(offer.credits)}</Txt>
                      {offer.bonusCredits > 0 ? (
                        <Txt variant="caption" color={colors.semantic.success}>
                          {t('wallet.bonus_badge', { bonus: offer.bonusCredits })}
                        </Txt>
                      ) : null}
                    </Row>
                    {offer.badge ? <Chip label={offer.badge} tone="accent" /> : null}
                    {offer.expiresAt ? (
                      <Txt variant="micro" color={colors.semantic.warning}>
                        {t('wallet.ends', { when: relativeTime(offer.expiresAt, t) })}
                      </Txt>
                    ) : null}
                  </Stack>
                  {/* The store's own localised price once it has answered. */}
                  <Txt variant="bodyStrong" color={colors.accent.primary}>
                    {storePrices[offer.productId] ?? `$${offer.referencePriceUsd.toFixed(2)}`}
                  </Txt>
                </Row>
              </Card>
            </Pressable>
          ))}
          {storeUnavailable ? (
            <Txt variant="micro" color={colors.semantic.warning}>
              {storeUnavailable}
            </Txt>
          ) : Object.keys(storePrices).length === 0 ? (
            <Txt variant="micro" color={colors.text.muted}>
              {t('wallet.reference_prices_note')}
            </Txt>
          ) : (
            <Txt variant="micro" color={colors.text.muted}>
              {t('wallet.price_confirmed_note')}
            </Txt>
          )}
          {/* Spec §20.6 — required, and the only way back from a charge whose
              reconciliation did not land. */}
          <Button
            label={t('wallet.restore')}
            variant="tertiary"
            loading={busy === 'restore'}
            loadingLabel={t('wallet.restore_loading')}
            disabled={busy !== null && busy !== 'restore'}
            onPress={() => void restore()}
          />
        </Stack>

        <Divider />

        <Stack gap={spacing.md}>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setShowHistory((v) => !v);
              if (!showHistory) void api.ledger().then((response) => setLedger(response.entries));
            }}
          >
            <Row style={{ justifyContent: 'space-between' }}>
              <Txt variant="h3">{t('wallet.history')}</Txt>
              <Txt variant="body" color={colors.text.muted}>
                {showHistory ? '−' : '+'}
              </Txt>
            </Row>
          </Pressable>

          {showHistory
            ? ledger.map((entry) => (
                <Row key={entry.id} style={{ justifyContent: 'space-between' }}>
                  <Stack gap={0}>
                    <Txt variant="bodyCompact">{ledgerLabel(entry.type, t)}</Txt>
                    <Txt variant="micro" color={colors.text.muted}>
                      {new Date(entry.createdAt).toLocaleString()}
                    </Txt>
                  </Stack>
                  <Txt
                    variant="bodyCompact"
                    color={entry.amount >= 0 ? colors.semantic.success : colors.text.secondary}
                  >
                    {entry.amount > 0 ? '+' : ''}
                    {entry.amount}
                  </Txt>
                </Row>
              ))
            : null}
        </Stack>

        <Divider />

        <Stack gap={spacing.sm}>
          <Txt variant="h3">{t('wallet.how_it_works')}</Txt>
          <Txt variant="bodyCompact" color={colors.text.secondary}>
            {t('wallet.how_it_works_richer')}
          </Txt>
          <Txt variant="bodyCompact" color={colors.text.secondary}>
            {t('wallet.how_it_works_fair')}
          </Txt>
          <Txt variant="bodyCompact" color={colors.text.secondary}>
            {t('wallet.how_it_works_refund')}
          </Txt>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * The ledger's entry types, as a player reads them.
 *
 * Takes the translator rather than calling `useT()`: this is a plain function,
 * not a component, and a hook here would be a hook in a `map` callback. The
 * record's keys are the server's enum values — identifiers, not copy — so they
 * stay English, and an unknown type still falls back to showing the raw one.
 */
function ledgerLabel(type: string, t: Translator): string {
  const labels: Record<string, string> = {
    PURCHASE: t('wallet.credit_pack'),
    BONUS: t('wallet.pack_bonus'),
    DAILY_GRANT: t('wallet.daily_credits'),
    NEW_USER_GRANT: t('wallet.welcome_credits'),
    TURN_RESERVE: t('wallet.turn'),
    TURN_FINALIZE: t('wallet.turn_settled'),
    TURN_RELEASE: t('wallet.turn_refunded'),
    FORK_FEE: t('wallet.timeline_fork'),
    REFUND: t('wallet.refund'),
    ADMIN_ADJUST: t('wallet.adjustment'),
  };
  return labels[type] ?? type;
}

/**
 * A countdown, in the coarsest unit that still says something.
 *
 * Also takes the translator for the same reason as `ledgerLabel`. The numbers
 * are passed as ICU `count` so French can pluralise them — its `one` category
 * covers zero, which English's does not — and the unit letters are inside the
 * catalogue strings because French abbreviates days `j`, not `d`.
 */
function relativeTime(iso: string, t: Translator): string {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return t('wallet.time_now');
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return t('wallet.time_in_minutes', { count: Math.max(1, Math.floor(diff / 60_000)) });
  if (hours < 24) return t('wallet.time_in_hours', { count: hours });
  return t('wallet.time_in_days', { count: Math.floor(hours / 24) });
}
