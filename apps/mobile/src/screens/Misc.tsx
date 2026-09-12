import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, Switch, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Card,
  Chip,
  EmptyState,
  IconButton,
  Row,
  Stack,
  Txt,
  colors,
  GUTTER,
  radius,
  spacing,
} from '@plotbreak/ui';
import { api } from '../api/client.js';
import { useStore } from '../state/store.jsx';
import { useT } from '../i18n/useT.js';
import type { RootNavigation, RootRoute } from '../navigation.jsx';

/** AU-01, SF-01, SF-02, CR-01 — the remaining launch screens. */

/**
 * AU-01 — the sign-in sheet.
 *
 * Spec §6.3 — shown only when the player reaches something that genuinely needs
 * an account, and the copy says what they get rather than demanding a signup.
 * §6.4 — Sign in with Apple or an emailed code. No password is ever created.
 *
 * Every button here does the thing it says. A provider that is not configured
 * in this build is not shown, because a button that silently does nothing is
 * worse than one that is missing.
 */
export function SignInScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const t = useT();
  const { authConfigured, isGuest, email: signedInEmail, sendEmailCode, verifyEmailCode, signInWithApple } =
    useStore();
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'ios' || !authConfigured) return;
    void import('expo-apple-authentication')
      .then((apple) => apple.isAvailableAsync())
      .then(setAppleAvailable)
      .catch(() => setAppleAvailable(false));
  }, [authConfigured]);

  const run = async (key: string, work: () => Promise<void>): Promise<void> => {
    setBusy(key);
    setError(null);
    try {
      await work();
    } catch (caught) {
      // Apple's own sheet reports a cancel as an error; a player who changed
      // their mind has not hit a problem and should not be told they have.
      const code = (caught as { code?: string })?.code;
      if (code !== 'ERR_REQUEST_CANCELED') {
        setError(caught instanceof Error ? caught.message : t('misc.sign_in_failed'));
      }
    } finally {
      setBusy(null);
    }
  };

  const finish = (): void => {
    setNotice(t('misc.signed_in_notice'));
    setTimeout(() => navigation.goBack(), 900);
  };

  if (!isGuest) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
        <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'flex-end' }}>
          <IconButton label={t('misc.close')} onPress={() => navigation.goBack()}>
            <Txt variant="h3">✕</Txt>
          </IconButton>
        </Row>
        <Stack gap={spacing.lg} style={{ padding: GUTTER, flex: 1, justifyContent: 'center' }}>
          <Txt variant="display">{t('misc.signed_in_title')}</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            {signedInEmail
              ? t('misc.signed_in_as', { email: signedInEmail })
              : t('misc.worlds_saved_anywhere')}
          </Txt>
          <Button label={t('misc.done')} onPress={() => navigation.goBack()} />
        </Stack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'flex-end' }}>
        <IconButton label={t('misc.close')} onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      <ScrollView
        contentContainerStyle={{ padding: GUTTER, gap: spacing.xxl, flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <Stack gap={spacing.sm}>
          <Txt variant="display">{t('misc.sign_in_title')}</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            {t('misc.sign_in_body')}
          </Txt>
        </Stack>

        {!authConfigured ? (
          <Card>
            <Txt variant="bodyCompact">{t('misc.sign_in_not_configured')}</Txt>
          </Card>
        ) : (
          <Stack gap={spacing.md}>
            {appleAvailable ? (
              <Button
                label={t('misc.continue_with_apple')}
                loading={busy === 'apple'}
                loadingLabel={t('misc.signing_in')}
                onPress={() =>
                  void run('apple', async () => {
                    await signInWithApple();
                    finish();
                  })
                }
              />
            ) : null}

            {!codeSent ? (
              <Stack gap={spacing.sm}>
                <Txt variant="caption" color={colors.text.secondary}>
                  {t('misc.email_code_hint')}
                </Txt>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t('misc.email_placeholder')}
                  placeholderTextColor={colors.text.muted}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  accessibilityLabel={t('misc.email_address')}
                  style={signInInputStyle}
                />
                <Button
                  label={t('misc.email_me_a_code')}
                  variant={appleAvailable ? 'secondary' : 'primary'}
                  disabled={!/.+@.+\..+/.test(email.trim())}
                  loading={busy === 'send'}
                  loadingLabel={t('misc.sending')}
                  onPress={() =>
                    void run('send', async () => {
                      await sendEmailCode(email);
                      setCodeSent(true);
                      setNotice(t('misc.code_sent', { email: email.trim() }));
                    })
                  }
                />
              </Stack>
            ) : (
              <Stack gap={spacing.sm}>
                <Txt variant="caption" color={colors.text.secondary}>
                  {t('misc.enter_code_sent_to', { email: email.trim() })}
                </Txt>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder="123456"
                  placeholderTextColor={colors.text.muted}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  maxLength={8}
                  accessibilityLabel={t('misc.six_digit_code')}
                  style={signInInputStyle}
                />
                <Button
                  label={t('misc.sign_in')}
                  disabled={code.trim().length < 6}
                  loading={busy === 'verify'}
                  loadingLabel={t('misc.signing_in')}
                  onPress={() =>
                    void run('verify', async () => {
                      await verifyEmailCode(email, code);
                      finish();
                    })
                  }
                />
                <Button
                  label={t('misc.use_a_different_email')}
                  variant="tertiary"
                  onPress={() => {
                    setCodeSent(false);
                    setCode('');
                    setNotice(null);
                  }}
                />
              </Stack>
            )}
          </Stack>
        )}

        {error ? (
          <Txt variant="bodyCompact" color={colors.semantic.danger}>
            {error}
          </Txt>
        ) : null}
        {notice ? (
          <Card>
            <Txt variant="bodyCompact">{notice}</Txt>
          </Card>
        ) : null}

        <Button label={t('misc.not_now')} variant="tertiary" onPress={() => navigation.goBack()} />

        <Txt variant="micro" color={colors.text.muted} center>
          {t('misc.no_password_footer')}
        </Txt>
      </ScrollView>
    </SafeAreaView>
  );
}

const signInInputStyle = {
  backgroundColor: colors.bg.raised,
  borderRadius: radius.control,
  borderWidth: 1,
  borderColor: colors.border.subtle,
  color: colors.text.primary,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.md,
  fontSize: 16,
} as const;

/** SF-01 — the report sheet: reason plus an optional hide. */
export function ReportScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  // i18n-exempt: a navigation route name in a type position, never displayed.
  route: RootRoute<'Report'>;
}): React.JSX.Element {
  const t = useT();
  const { targetType, targetId } = route.params;
  const [reason, setReason] = useState<string | null>(null);
  const [details, setDetails] = useState('');
  const [alsoHide, setAlsoHide] = useState(false);
  const [busy, setBusy] = useState(false);
  const [caseRef, setCaseRef] = useState<string | null>(null);

  // The first of each pair is the reason the API stores; only the second is
  // read by a person.
  const reasons: Array<[string, string]> = [
    ['SEXUAL_CONTENT_INVOLVING_MINORS', t('misc.report_reason_sexual_content_involving_minors')],
    ['HARASSMENT', t('misc.report_reason_harassment')],
    ['HATE', t('misc.report_reason_hate')],
    ['VIOLENCE_THREAT', t('misc.report_reason_violence_threat')],
    ['SELF_HARM', t('misc.report_reason_self_harm')],
    ['IP_VIOLATION', t('misc.report_reason_ip_violation')],
    ['IMPERSONATION', t('misc.report_reason_impersonation')],
    ['BROKEN_OR_INCONSISTENT', t('misc.report_reason_broken')],
    ['OTHER', t('misc.report_reason_other')],
  ];

  if (caseRef) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
        <Stack gap={spacing.lg} style={{ padding: GUTTER, flex: 1, justifyContent: 'center' }}>
          <Txt variant="h1">{t('misc.report_thanks_title')}</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            {t('misc.report_thanks_body', { caseRef })}
          </Txt>
          <Button label={t('misc.done')} onPress={() => navigation.goBack()} />
        </Stack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between' }}>
        <Txt variant="h2">{t('misc.report_title')}</Txt>
        <IconButton label={t('misc.cancel')} onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      {/* The reasons alone are taller than the screen, so the submit button
          needs room to clear the bottom edge rather than resting on it. */}
      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl, paddingBottom: spacing.giant }}>
        <Txt variant="bodyCompact" color={colors.text.secondary}>
          {t('misc.report_target_question', { target: targetType.toLowerCase() })}
        </Txt>

        <Stack gap={spacing.sm}>
          {reasons.map(([id, label]) => (
            <Chip
              key={id}
              label={label}
              selected={reason === id}
              onPress={() => setReason(id)}
              style={{ paddingVertical: spacing.md, justifyContent: 'flex-start' }}
            />
          ))}
        </Stack>

        <TextInput
          value={details}
          onChangeText={setDetails}
          placeholder={t('misc.report_details_placeholder')}
          placeholderTextColor={colors.text.muted}
          multiline
          maxLength={1000}
          accessibilityLabel={t('misc.report_details_label')}
          style={{
            minHeight: 96,
            padding: spacing.lg,
            borderRadius: radius.control,
            backgroundColor: colors.bg.elevated,
            color: colors.text.primary,
            fontSize: 17,
            textAlignVertical: 'top',
          }}
        />

        {/* A switch, not another chip. Rendered as one it read as a ninth
            reason in the same list, when it is a separate choice about the
            reporter's own feed. */}
        <Row style={{ justifyContent: 'space-between', gap: spacing.lg }}>
          <Txt variant="bodyCompact" style={{ flex: 1 }}>
            {t('misc.report_also_hide')}
          </Txt>
          <Switch
            value={alsoHide}
            onValueChange={setAlsoHide}
            accessibilityLabel={t('misc.report_also_hide')}
            trackColor={{ false: colors.bg.raised, true: colors.accent.primary }}
          />
        </Row>

        <Button
          label={t('misc.submit_report')}
          disabled={!reason}
          loading={busy}
          loadingLabel={t('misc.submitting')}
          onPress={() => {
            if (!reason) return;
            setBusy(true);
            void api
              .report({ targetType, targetId, reason, details, alsoHide })
              .then((response) => setCaseRef(response.caseReference))
              .catch(() => setBusy(false));
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/** SF-02 — report history with case references. */
export function ReportHistoryScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const t = useT();
  const [reports, setReports] = useState<
    Array<{ reportId: string; targetType: string; reason: string; status: string; createdAt: string }> | null
  >(null);

  useEffect(() => {
    void fetch(`${api.baseUrl}/v1/report-history`, {
      // i18n-exempt: an HTTP Authorization header, never shown to anybody.
      headers: api.token ? { authorization: `Bearer ${api.token}` } : {},
    })
      .then((response) => response.json())
      .then((data) => setReports(data.reports ?? []))
      .catch(() => setReports([]));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between' }}>
        <Txt variant="h2">{t('misc.report_history_title')}</Txt>
        <IconButton label={t('misc.close')} onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      {reports && reports.length === 0 ? (
        <EmptyState
          title={t('misc.report_history_empty_title')}
          body={t('misc.report_history_empty_body')}
        />
      ) : (
        <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.md }}>
          {reports?.map((report) => (
            <Card key={report.reportId} style={{ gap: spacing.xs }}>
              <Row style={{ justifyContent: 'space-between' }}>
                {/* Server enum values, rendered as they arrive. They travel as
                    keys in step 4; keying them here would only translate the
                    formatting, not the words. */}
                <Txt variant="bodyCompact">{report.reason.replace(/_/g, ' ').toLowerCase()}</Txt>
                <Chip label={report.status} tone={report.status === 'OPEN' ? 'warning' : 'success'} />
              </Row>
              <Txt variant="micro" color={colors.text.muted}>
                {t('misc.report_case_line', {
                  reference: report.reportId.slice(-8).toUpperCase(),
                  date: new Date(report.createdAt).toLocaleDateString(),
                })}
              </Txt>
            </Card>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

/**
 * CR-01 — the Create root.
 *
 * The structured creator wizard (CR-02 to CR-12) is Phase 3 work. Rather than
 * ship a stub that pretends otherwise, this states plainly what is coming and
 * points at what the schema already supports.
 */
/**
 * CR-01 — what the world builder will be.
 *
 * Reached from the profile, not from a tab. It is not built, and a tab that
 * only says "coming soon" spends a quarter of the navigation on something the
 * player cannot do.
 */
export function CreateScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const t = useT();
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, paddingBottom: spacing.md, justifyContent: 'space-between' }}>
        <Txt variant="h1">{t('misc.create_title')}</Txt>
        <IconButton label={t('misc.close')} onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl }}>
        <Card style={{ gap: spacing.md }}>
          <Txt variant="h3">{t('misc.create_coming_title')}</Txt>
          <Txt variant="bodyCompact" color={colors.text.secondary}>
            {t('misc.create_coming_body')}
          </Txt>
          <Txt variant="bodyCompact" color={colors.text.secondary}>
            {t('misc.create_credits_body')}
          </Txt>
        </Card>

        <Stack gap={spacing.md}>
          <Txt variant="h3">{t('misc.create_what_you_define')}</Txt>
          {[
            ['concept', t('misc.create_concept'), t('misc.create_concept_body')],
            ['player_fantasy', t('misc.create_player_fantasy'), t('misc.create_player_fantasy_body')],
            ['world_rules', t('misc.create_world_rules'), t('misc.create_world_rules_body')],
            ['systems', t('misc.create_systems'), t('misc.create_systems_body')],
            ['cast', t('misc.create_cast'), t('misc.create_cast_body')],
            ['locations', t('misc.create_locations'), t('misc.create_locations_body')],
            ['progression', t('misc.create_progression'), t('misc.create_progression_body')],
            ['opening', t('misc.create_opening'), t('misc.create_opening_body')],
          ].map(([id, title, body]) => (
            <Row key={id} gap={spacing.md} align="flex-start">
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent.primary, marginTop: 8 }} />
              <Stack gap={2} style={{ flex: 1 }}>
                <Txt variant="bodyCompact">{title}</Txt>
                <Txt variant="micro" color={colors.text.muted}>
                  {body}
                </Txt>
              </Stack>
            </Row>
          ))}
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}
