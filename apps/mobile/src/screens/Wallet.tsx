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
import { api } from '../api/client.js';
import { useStore } from '../state/store.jsx';
import type { RootNavigation, RootRoute } from '../navigation.jsx';

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
  route: RootRoute<'Wallet'>;
}): React.JSX.Element {
  const shortfall = route.params?.shortfall ?? null;
  const { refreshWallet } = useStore();

  const [wallet, setWallet] = useState<WalletSummary | null>(null);
  const [offers, setOffers] = useState<StoreOffer[]>([]);
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    const response = await api.wallet();
    setWallet(response.wallet);
    setOffers(response.offers);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const purchase = async (offer: StoreOffer): Promise<void> => {
    setBusy(offer.productId);
    setNotice(null);
    try {
      // Production routes this through RevenueCat and the native store sheet;
      // the server then reconciles the platform transaction (§33.5). In dev the
      // sandbox path exercises the same idempotent reconciliation.
      const result = await api.syncPurchase(offer.productId, `sandbox_${Date.now()}`);
      await load();
      await refreshWallet();
      haptic('success');
      setNotice(
        result.duplicate
          ? 'That purchase was already credited.'
          : `${formatCredits(result.credited)} credits added.`,
      );
    } catch {
      haptic('error');
      setNotice('That purchase did not go through. You have not been charged.');
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
        setNotice(`${result.amount} credits claimed.`);
      }
    } catch {
      setNotice('Sign in to claim your daily credits.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between' }}>
        <Txt variant="h2">Wallet</Txt>
        <IconButton label="Close" onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl, paddingBottom: spacing.giant }}>
        {/* WL-03 — the exact shortfall, never a vague "not enough". */}
        {shortfall ? (
          <Card style={{ borderColor: colors.semantic.warning, gap: spacing.xs }}>
            <Txt variant="bodyStrong" color={colors.semantic.warning}>
              {shortfall} more credits needed
            </Txt>
            <Txt variant="caption" color={colors.text.secondary}>
              Add credits below, or switch to a lower turn quality and send the same action.
            </Txt>
          </Card>
        ) : null}

        {!wallet ? (
          <Skeleton width="100%" height={100} />
        ) : (
          <Stack gap={spacing.xs} style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
            <Txt variant="micro" color={colors.text.muted}>
              BALANCE
            </Txt>
            {/* Spec §26.10 — the wallet always shows the full number. */}
            <Txt variant="display">{wallet.balance.toLocaleString()}</Txt>
            {wallet.reserved > 0 ? (
              <Txt variant="caption" color={colors.text.muted}>
                {wallet.reserved} held by a turn in flight
              </Txt>
            ) : null}
          </Stack>
        )}

        {notice ? (
          <Card>
            <Txt variant="bodyCompact">{notice}</Txt>
          </Card>
        ) : null}

        {wallet?.dailyClaimAvailable ? (
          <Button
            label="Claim 300 daily credits"
            variant="secondary"
            loading={busy === 'daily'}
            loadingLabel="Claiming…"
            onPress={() => void claimDaily()}
          />
        ) : wallet?.nextDailyClaimAt ? (
          <Txt variant="caption" color={colors.text.muted} center>
            Next daily credits {relativeTime(wallet.nextDailyClaimAt)}
          </Txt>
        ) : null}

        <Stack gap={spacing.md}>
          <Txt variant="h3">Credit packs</Txt>
          {offers.map((offer) => (
            <Pressable
              key={offer.productId}
              accessibilityRole="button"
              accessibilityLabel={`${formatCredits(offer.credits)} credits${
                offer.bonusCredits ? ` plus ${offer.bonusCredits} bonus` : ''
              }, about $${offer.referencePriceUsd.toFixed(2)}`}
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
                          +{offer.bonusCredits} bonus
                        </Txt>
                      ) : null}
                    </Row>
                    {offer.badge ? <Chip label={offer.badge} tone="accent" /> : null}
                    {offer.expiresAt ? (
                      <Txt variant="micro" color={colors.semantic.warning}>
                        Ends {relativeTime(offer.expiresAt)}
                      </Txt>
                    ) : null}
                  </Stack>
                  {/* Spec §20.6 — the store shows the real localized price at purchase. */}
                  <Txt variant="bodyStrong" color={colors.accent.primary}>
                    ${offer.referencePriceUsd.toFixed(2)}
                  </Txt>
                </Row>
              </Card>
            </Pressable>
          ))}
          <Txt variant="micro" color={colors.text.muted}>
            Prices shown are US reference prices. Your store will show your local price and confirm before
            any payment.
          </Txt>
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
              <Txt variant="h3">Purchase history</Txt>
              <Txt variant="body" color={colors.text.muted}>
                {showHistory ? '−' : '+'}
              </Txt>
            </Row>
          </Pressable>

          {showHistory
            ? ledger.map((entry) => (
                <Row key={entry.id} style={{ justifyContent: 'space-between' }}>
                  <Stack gap={0}>
                    <Txt variant="bodyCompact">{ledgerLabel(entry.type)}</Txt>
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
          <Txt variant="h3">How credits work</Txt>
          <Txt variant="bodyCompact" color={colors.text.secondary}>
            Each turn you send costs credits, and higher quality tiers cost more. What you buy is richer
            direction, deeper memory, and better visuals.
          </Txt>
          <Txt variant="bodyCompact" color={colors.text.secondary}>
            What you never buy is a better outcome. The dice, your stats, and every rule are identical at
            every tier.
          </Txt>
          <Txt variant="bodyCompact" color={colors.text.secondary}>
            If a turn fails for any reason on our side, the credits go straight back. You are only ever
            charged for a turn that actually happened.
          </Txt>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}

function ledgerLabel(type: string): string {
  const labels: Record<string, string> = {
    PURCHASE: 'Credit pack',
    BONUS: 'Pack bonus',
    DAILY_GRANT: 'Daily credits',
    NEW_USER_GRANT: 'Welcome credits',
    TURN_RESERVE: 'Turn',
    TURN_FINALIZE: 'Turn settled',
    TURN_RELEASE: 'Turn refunded',
    FORK_FEE: 'Timeline fork',
    REFUND: 'Refund',
    ADMIN_ADJUST: 'Adjustment',
  };
  return labels[type] ?? type;
}

function relativeTime(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return 'now';
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return `in ${Math.max(1, Math.floor(diff / 60_000))} min`;
  if (hours < 24) return `in ${hours}h`;
  return `in ${Math.floor(hours / 24)}d`;
}
