import React from 'react';
import { Linking, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Row, Stack, Txt, colors, spacing, GUTTER } from '@aniplay/ui';
import { useStore } from '../state/store.jsx';
import { useT } from '../i18n/useT.js';
import type { TranslationKey } from '@aniplay/i18n';
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
          <LinkRow label={t('settings.my_information')} onPress={() => navigation.navigate('MyInformation')} />
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

/**
 * The two things the app actually knows about a person.
 *
 * This row used to navigate to Profile, which from inside Profile's own stack
 * does nothing at all — a settings row that visibly did nothing when tapped.
 *
 * It is deliberately short. The app collects an account and an age band, and
 * that is the whole list; a screen that padded it out with invented fields
 * would be claiming to hold more than it does.
 */
export function MyInformationScreen(): React.JSX.Element {
  const t = useT();
  const { email, isGuest, ageBand } = useStore();

  const AGE_LABELS: Record<string, TranslationKey> = {
    under13: 'onboarding.age_band_under_13',
    '13_17': 'onboarding.age_band_13_17',
    '18_24': 'onboarding.age_band_18_24',
    '25plus': 'onboarding.age_band_25_plus',
  };
  const ageKey = ageBand ? AGE_LABELS[ageBand] : undefined;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl, paddingBottom: spacing.giant }}>
        <Txt variant="h1">{t('settings.my_information')}</Txt>

        <Stack gap={spacing.xs}>
          <Txt variant="micro" color={colors.text.muted}>
            {t('settings.account')}
          </Txt>
          <Txt variant="body">
            {/* An Apple relay address is still the address, and showing it is
                how somebody recognises which account they are in. */}
            {email ?? (isGuest ? t('settings.account_guest') : t('settings.account_unknown'))}
          </Txt>
          {isGuest ? (
            <Txt variant="caption" color={colors.text.muted}>
              {t('settings.account_guest_hint')}
            </Txt>
          ) : null}
        </Stack>

        <Stack gap={spacing.xs}>
          <Txt variant="micro" color={colors.text.muted}>
            {t('settings.age_range')}
          </Txt>
          <Txt variant="body">{ageKey ? t(ageKey) : t('settings.age_unknown')}</Txt>
          <Txt variant="caption" color={colors.text.muted}>
            {t('settings.age_hint')}
          </Txt>
        </Stack>

        <View style={{ height: spacing.lg }} />
      </ScrollView>
    </SafeAreaView>
  );
}
