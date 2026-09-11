import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Row, Stack, Txt, colors, radius, spacing, GUTTER } from '@aniplay/ui';
import { api, type BadgeView } from '../api/client.js';
import { useT } from '../i18n/useT.js';
import { useStore } from '../state/store.jsx';
import type { RootNavigation } from '../navigation.jsx';

/**
 * What playing has earned.
 *
 * Three groups, in the order somebody cares about them: rewards waiting to be
 * collected, then what is in progress, then what is done. A list sorted by
 * definition order buries the one thing the player came here to do.
 *
 * ## Claim, rather than automatic
 *
 * Both were defensible and this is the more enjoyable one. A reward that lands
 * silently while you are mid-scene is a number changing in a corner; a reward
 * you come and take is a small moment. The cost is one tap, and the screen
 * exists anyway — the badge that can be claimed is the reason to open it.
 *
 * Unclaimed rewards are surfaced on Profile so this never becomes a screen you
 * have to remember to check.
 */
export function BadgesScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const t = useT();
  const { refreshWallet, isGuest } = useStore();
  const [badges, setBadges] = useState<BadgeView[]>([]);
  const [claiming, setClaiming] = useState<string | null>(null);

  const load = useCallback(() => {
    void api
      .badges()
      .then((response) => setBadges(response.badges))
      .catch(() => undefined);
  }, []);

  useEffect(load, [load]);

  const claim = async (badge: BadgeView): Promise<void> => {
    if (claiming) return;
    setClaiming(badge.id);
    try {
      await api.claimBadge(badge.id);
      await refreshWallet();
      load();
    } catch {
      // Already collected, or offline. Reloading shows the truth either way.
      load();
    } finally {
      setClaiming(null);
    }
  };

  const claimable = badges.filter((b) => b.unlockedAt && !b.claimedAt);
  const inProgress = badges.filter((b) => !b.unlockedAt);
  const done = badges.filter((b) => b.unlockedAt && b.claimedAt);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, alignItems: 'center' }} gap={spacing.md}>
        <Pressable accessibilityRole="button" accessibilityLabel={t('story.back')} onPress={() => navigation.goBack()}>
          <Txt variant="h2">‹</Txt>
        </Pressable>
        <Txt variant="h2">{t('profile.badges')}</Txt>
      </Row>

      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xxl }}>
        {isGuest ? (
          <Txt variant="bodyCompact" color={colors.text.muted}>
            {t('badges.guest')}
          </Txt>
        ) : null}

        {claimable.length > 0 ? (
          <Stack gap={spacing.md}>
            <Txt variant="h3">{t('badges.ready')}</Txt>
            {claimable.map((badge) => (
              <BadgeRow
                key={badge.id}
                badge={badge}
                action={
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t('badges.claim_a11y', {
                      title: badge.title,
                      credits: badge.creditReward,
                    })}
                    disabled={claiming === badge.id}
                    onPress={() => void claim(badge)}
                    style={{
                      paddingHorizontal: spacing.md,
                      paddingVertical: spacing.xs,
                      borderRadius: radius.control,
                      backgroundColor: colors.accent.primary,
                    }}
                  >
                    <Txt variant="caption" color="#0B0D12">
                      {t('badges.claim', { credits: badge.creditReward })}
                    </Txt>
                  </Pressable>
                }
              />
            ))}
          </Stack>
        ) : null}

        {inProgress.length > 0 ? (
          <Stack gap={spacing.md}>
            <Txt variant="h3">{t('badges.in_progress')}</Txt>
            {inProgress.map((badge) => (
              <BadgeRow key={badge.id} badge={badge} />
            ))}
          </Stack>
        ) : null}

        {done.length > 0 ? (
          <Stack gap={spacing.md}>
            <Txt variant="h3">{t('badges.earned')}</Txt>
            {done.map((badge) => (
              <BadgeRow key={badge.id} badge={badge} />
            ))}
          </Stack>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function BadgeRow({
  badge,
  action,
}: {
  badge: BadgeView;
  action?: React.ReactNode;
}): React.JSX.Element {
  const t = useT();
  const earned = !!badge.unlockedAt;
  // Only worth drawing while there is something to fill. A bar at 0% on a
  // badge nobody has started is decoration.
  const fraction = badge.target > 1 ? Math.min(1, badge.progress / badge.target) : 0;
  // i18n-exempt: a CSS width, not a sentence.
  const barWidth = `${fraction * 100}%` as const;

  return (
    <Card>
      <Row gap={spacing.md} style={{ alignItems: 'center' }}>
        <Txt variant="h2" style={{ opacity: earned ? 1 : 0.35 }}>
          {badge.icon}
        </Txt>
        <Stack gap={2} style={{ flex: 1 }}>
          <Txt variant="bodyStrong" color={earned ? colors.text.primary : colors.text.secondary}>
            {badge.title}
          </Txt>
          <Txt variant="caption" color={colors.text.muted}>
            {badge.description}
          </Txt>
          {!earned && fraction > 0 ? (
            <Stack gap={2} style={{ paddingTop: spacing.xs }}>
              <View
                style={{
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: colors.bg.elevated,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: barWidth,
                    height: 3,
                    backgroundColor: colors.accent.primary,
                  }}
                />
              </View>
              <Txt variant="micro" color={colors.text.muted}>
                {t('badges.progress', { done: badge.progress, target: badge.target })}
              </Txt>
            </Stack>
          ) : null}
        </Stack>
        {action ?? null}
      </Row>
    </Card>
  );
}
