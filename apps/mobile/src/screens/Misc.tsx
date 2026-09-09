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
} from '@aniplay/ui';
import { api } from '../api/client.js';
import { useStore } from '../state/store.jsx';
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
        setError(caught instanceof Error ? caught.message : 'Could not sign in just now.');
      }
    } finally {
      setBusy(null);
    }
  };

  const finish = (): void => {
    setNotice('Signed in. Everything you have played came with you.');
    setTimeout(() => navigation.goBack(), 900);
  };

  if (!isGuest) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
        <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'flex-end' }}>
          <IconButton label="Close" onPress={() => navigation.goBack()}>
            <Txt variant="h3">✕</Txt>
          </IconButton>
        </Row>
        <Stack gap={spacing.lg} style={{ padding: GUTTER, flex: 1, justifyContent: 'center' }}>
          <Txt variant="display">You're signed in</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            {signedInEmail
              ? `This device is signed in as ${signedInEmail}. Your worlds are saved and will be waiting on any device you sign in on.`
              : 'Your worlds are saved and will be waiting on any device you sign in on.'}
          </Txt>
          <Button label="Done" onPress={() => navigation.goBack()} />
        </Stack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'flex-end' }}>
        <IconButton label="Close" onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      <ScrollView
        contentContainerStyle={{ padding: GUTTER, gap: spacing.xxl, flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <Stack gap={spacing.sm}>
          <Txt variant="display">Save this world</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            Sign in to keep your progress, continue on another device, and claim daily credits. Everything
            you've played so far comes with you.
          </Txt>
        </Stack>

        {!authConfigured ? (
          <Card>
            <Txt variant="bodyCompact">
              This build has no sign-in configured, so you are playing as a guest on this device. Your
              worlds are saved on the server and will still be here next time you open the app.
            </Txt>
          </Card>
        ) : (
          <Stack gap={spacing.md}>
            {appleAvailable ? (
              <Button
                label="Continue with Apple"
                loading={busy === 'apple'}
                loadingLabel="Signing in…"
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
                  Or get a six-digit code by email. No password to create.
                </Txt>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.text.muted}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  accessibilityLabel="Email address"
                  style={signInInputStyle}
                />
                <Button
                  label="Email me a code"
                  variant={appleAvailable ? 'secondary' : 'primary'}
                  disabled={!/.+@.+\..+/.test(email.trim())}
                  loading={busy === 'send'}
                  loadingLabel="Sending…"
                  onPress={() =>
                    void run('send', async () => {
                      await sendEmailCode(email);
                      setCodeSent(true);
                      setNotice(`Code sent to ${email.trim()}. It expires in a few minutes.`);
                    })
                  }
                />
              </Stack>
            ) : (
              <Stack gap={spacing.sm}>
                <Txt variant="caption" color={colors.text.secondary}>
                  Enter the six-digit code sent to {email.trim()}.
                </Txt>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder="123456"
                  placeholderTextColor={colors.text.muted}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  maxLength={8}
                  accessibilityLabel="Six-digit code"
                  style={signInInputStyle}
                />
                <Button
                  label="Sign in"
                  disabled={code.trim().length < 6}
                  loading={busy === 'verify'}
                  loadingLabel="Signing in…"
                  onPress={() =>
                    void run('verify', async () => {
                      await verifyEmailCode(email, code);
                      finish();
                    })
                  }
                />
                <Button
                  label="Use a different email"
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

        <Button label="Not now" variant="tertiary" onPress={() => navigation.goBack()} />

        <Txt variant="micro" color={colors.text.muted} center>
          No password to create. We never post anything on your behalf.
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
  route: RootRoute<'Report'>;
}): React.JSX.Element {
  const { targetType, targetId } = route.params;
  const [reason, setReason] = useState<string | null>(null);
  const [details, setDetails] = useState('');
  const [alsoHide, setAlsoHide] = useState(false);
  const [busy, setBusy] = useState(false);
  const [caseRef, setCaseRef] = useState<string | null>(null);

  const reasons: Array<[string, string]> = [
    ['SEXUAL_CONTENT_INVOLVING_MINORS', 'Sexual content involving minors'],
    ['HARASSMENT', 'Harassment or bullying'],
    ['HATE', 'Hate speech'],
    ['VIOLENCE_THREAT', 'Threats of violence'],
    ['SELF_HARM', 'Self-harm'],
    ['IP_VIOLATION', 'Copies someone else’s work'],
    ['IMPERSONATION', 'Impersonates a real person'],
    ['BROKEN_OR_INCONSISTENT', 'Broken or contradicts itself'],
    ['OTHER', 'Something else'],
  ];

  if (caseRef) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
        <Stack gap={spacing.lg} style={{ padding: GUTTER, flex: 1, justifyContent: 'center' }}>
          <Txt variant="h1">Thanks for telling us</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            A moderator will review this. Your case reference is {caseRef} — you can find it under Report
            history in your profile.
          </Txt>
          <Button label="Done" onPress={() => navigation.goBack()} />
        </Stack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between' }}>
        <Txt variant="h2">Report</Txt>
        <IconButton label="Cancel" onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      {/* The reasons alone are taller than the screen, so the submit button
          needs room to clear the bottom edge rather than resting on it. */}
      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl, paddingBottom: spacing.giant }}>
        <Txt variant="bodyCompact" color={colors.text.secondary}>
          What's wrong with this {targetType.toLowerCase()}?
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
          placeholder="Anything else we should know? (optional)"
          placeholderTextColor={colors.text.muted}
          multiline
          maxLength={1000}
          accessibilityLabel="Additional details"
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
            Also hide this from my recommendations
          </Txt>
          <Switch
            value={alsoHide}
            onValueChange={setAlsoHide}
            accessibilityLabel="Also hide this from my recommendations"
            trackColor={{ false: colors.bg.raised, true: colors.accent.primary }}
          />
        </Row>

        <Button
          label="Submit report"
          disabled={!reason}
          loading={busy}
          loadingLabel="Submitting…"
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
  const [reports, setReports] = useState<
    Array<{ reportId: string; targetType: string; reason: string; status: string; createdAt: string }> | null
  >(null);

  useEffect(() => {
    void fetch(`${api.baseUrl}/v1/report-history`, {
      headers: api.token ? { authorization: `Bearer ${api.token}` } : {},
    })
      .then((response) => response.json())
      .then((data) => setReports(data.reports ?? []))
      .catch(() => setReports([]));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between' }}>
        <Txt variant="h2">Report history</Txt>
        <IconButton label="Close" onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      {reports && reports.length === 0 ? (
        <EmptyState title="Nothing reported" body="Reports you file will be listed here with their case reference." />
      ) : (
        <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.md }}>
          {reports?.map((report) => (
            <Card key={report.reportId} style={{ gap: spacing.xs }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Txt variant="bodyCompact">{report.reason.replace(/_/g, ' ').toLowerCase()}</Txt>
                <Chip label={report.status} tone={report.status === 'OPEN' ? 'warning' : 'success'} />
              </Row>
              <Txt variant="micro" color={colors.text.muted}>
                Case {report.reportId.slice(-8).toUpperCase()} ·{' '}
                {new Date(report.createdAt).toLocaleDateString()}
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
export function CreateScreen(): React.JSX.Element {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, paddingBottom: spacing.md }}>
        <Txt variant="h1">Create</Txt>
      </Row>

      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl }}>
        <Card style={{ gap: spacing.md }}>
          <Txt variant="h3">The world builder is coming</Txt>
          <Txt variant="bodyCompact" color={colors.text.secondary}>
            You'll build worlds with structured tools, not by pasting one giant prompt: a cast with real
            motives, locations that connect, quests with actual win conditions, and systems the engine
            enforces.
          </Txt>
          <Txt variant="bodyCompact" color={colors.text.secondary}>
            Every world you make gets the same deterministic engine the official ones use, and unlimited
            free credits while you test it.
          </Txt>
        </Card>

        <Stack gap={spacing.md}>
          <Txt variant="h3">What you'll define</Txt>
          {[
            ['Concept', 'Title, the fantasy, and who it is for.'],
            ['Player fantasy', 'Who the player is when they arrive, and what they can do.'],
            ['World rules', 'Hard canon the story can never contradict.'],
            ['Systems', 'Attributes, skills, resources, and how defeat works.'],
            ['Cast', 'Traits, drives, boundaries, secrets, and schedules.'],
            ['Locations', 'A connected map with travel times and locks.'],
            ['Progression', 'Quests with predicates, not vibes.'],
            ['Opening', '50 to 150 words that reach a decision.'],
          ].map(([title, body]) => (
            <Row key={title} gap={spacing.md} align="flex-start">
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
