import React from 'react';
import { Linking, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Row, Stack, Txt, colors, spacing, GUTTER } from '@aniplay/ui';
import { useStore } from '../state/store.jsx';
import { useT } from '../i18n/useT.js';
import type { RootNavigation } from '../navigation.jsx';
import { LinkRow } from './LibraryProfile.jsx';
import { TasteScreen } from './Onboarding.jsx';

/**
 * The gear in the corner of Profile.
 *
 * Profile was carrying two different jobs in one scroll: who you are and what
 * you have played, mixed in with account plumbing nobody opens twice. This is
 * the plumbing — the rows a player needs once, or once a year, and should not
 * have to scroll past every time they want to see their characters.
 */
export function SettingsScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const t = useT();
  const { isGuest, signOut } = useStore();
  const legalBase = process.env.EXPO_PUBLIC_LEGAL_BASE_URL;
  // From app.json through the build rather than from a runtime module, so this
  // is the version that was actually shipped.
  const version = (require('../../app.json') as { expo?: { version?: string } }).expo?.version ?? '1.0.0';

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.lg, paddingBottom: spacing.giant }}>
        <Txt variant="h1">{t('settings.title')}</Txt>

        <Stack gap={spacing.md}>
          <LinkRow label={t('settings.my_information')} onPress={() => navigation.navigate('Profile' as never)} />
          <LinkRow label={t('profile.report_history')} onPress={() => navigation.navigate('ReportHistory')} />
          <LinkRow label={t('profile.wallet')} onPress={() => navigation.navigate('Wallet')} />
        </Stack>

        <Divider />

        {/* Only when they point somewhere. A dead legal link is the first thing
            App Store review taps. */}
        {legalBase ? (
          <Stack gap={spacing.md}>
            <LinkRow
              label={t('onboarding.terms')}
              onPress={() => void Linking.openURL(`${legalBase.replace(/\/$/, '')}/terms`).catch(() => undefined)}
            />
            <LinkRow
              label={t('onboarding.privacy')}
              onPress={() => void Linking.openURL(`${legalBase.replace(/\/$/, '')}/privacy`).catch(() => undefined)}
            />
          </Stack>
        ) : null}

        <Divider />

        <Row style={{ justifyContent: 'space-between', paddingVertical: spacing.sm }}>
          <Txt variant="body" color={colors.text.secondary}>
            {t('settings.app_version')}
          </Txt>
          <Txt variant="body" color={colors.text.muted}>
            {version}
          </Txt>
        </Row>

        {/* A guest has nothing to sign out of, and saying so is kinder than a
            button that appears to do nothing. */}
        {isGuest ? null : (
          <Txt
            variant="body"
            color={colors.semantic.warning}
            onPress={() => void signOut()}
            accessibilityRole="button"
            style={{ paddingVertical: spacing.md }}
          >
            {t('profile.sign_out')}
          </Txt>
        )}

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * The genre picker, reached from Profile instead of from onboarding.
 *
 * Same screen, preloaded with what the player already chose — the whole point
 * is changing an answer, and a picker that opens empty reads as having lost it.
 */
export function PersonalizationScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const t = useT();
  const { tastes } = useStore();
  return (
    <TasteScreen
      initial={tastes}
      heading={t('settings.personalization')}
      ctaLabel={t('settings.save_preferences')}
      onDone={() => navigation.goBack()}
    />
  );
}
