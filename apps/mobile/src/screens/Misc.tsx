import React, { useEffect, useState } from 'react';
import { ScrollView, Switch, TextInput, View } from 'react-native';
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
 * Spec §6.3 — only shown when the player reaches something that genuinely needs
 * an account, and the copy explains the value rather than demanding a signup.
 */
export function SignInScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const { token } = useStore();
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const signIn = async (provider: string): Promise<void> => {
    setBusy(provider);
    try {
      // Production hands off to Sign in with Apple, Google, or an email OTP and
      // exchanges the result for a session token. The migration call below is
      // the part that matters to the player: their guest run comes with them.
      const guestId = token ?? '';
      const result = await api.migrateGuest(guestId, 'Player');
      setNotice(
        result.migrated
          ? `Signed in. ${result.sessionsMoved} world${result.sessionsMoved === 1 ? '' : 's'} came with you.`
          : 'Signed in.',
      );
      setTimeout(() => navigation.goBack(), 900);
    } catch {
      setNotice('Could not sign in just now.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'flex-end' }}>
        <IconButton label="Close" onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      <Stack gap={spacing.xxl} style={{ padding: GUTTER, flex: 1, justifyContent: 'center' }}>
        <Stack gap={spacing.sm}>
          <Txt variant="display">Save this world</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            Sign in to keep your progress, continue on another device, and claim daily credits. Everything
            you've played so far comes with you.
          </Txt>
        </Stack>

        <Stack gap={spacing.md}>
          <Button
            label="Continue with Apple"
            loading={busy === 'apple'}
            loadingLabel="Signing in…"
            onPress={() => void signIn('apple')}
          />
          <Button
            label="Continue with Google"
            variant="secondary"
            loading={busy === 'google'}
            loadingLabel="Signing in…"
            onPress={() => void signIn('google')}
          />
          <Button
            label="Use an email code"
            variant="secondary"
            loading={busy === 'email'}
            loadingLabel="Sending…"
            onPress={() => void signIn('email')}
          />
        </Stack>

        {notice ? (
          <Card>
            <Txt variant="bodyCompact">{notice}</Txt>
          </Card>
        ) : null}

        <Button label="Not now" variant="tertiary" onPress={() => navigation.goBack()} />

        <Txt variant="micro" color={colors.text.muted} center>
          No password to create. We never post anything on your behalf.
        </Txt>
      </Stack>
    </SafeAreaView>
  );
}

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
