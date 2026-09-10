import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { MeResponse, SessionSummary } from '@aniplay/contracts';
import {
  Button,
  Card,
  Chip,
  CreditBalance,
  Divider,
  EmptyState,
  IconButton,
  Row,
  Stack,
  StoryArt,
  Txt,
  colors,
  GUTTER,
  radius,
  spacing,
} from '@aniplay/ui';
import { ApiError, api, type PlayerCharacterCard } from '../api/client.js';
import { useStore } from '../state/store.jsx';
import type { RootNavigation } from '../navigation.jsx';

/**
 * LB-01 / LB-02 Library, PR-01 / PR-02 / PR-03 Profile, SF-01 Report.
 */

export function LibraryScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const [sessions, setSessions] = useState<SessionSummary[] | null>(null);
  const [managing, setManaging] = useState<SessionSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const response = await api.listSessions();
      setSessions(response.sessions);
      setError(null);
    } catch (caught) {
      // Not `setSessions([])`. A request that failed is not a library with
      // nothing in it, and telling somebody with ten runs "No worlds yet"
      // reads as "your saves are gone".
      setError(
        caught instanceof ApiError && caught.code === 'OFFLINE'
          ? "You're offline. Your worlds are safe — they live on the server, not on this phone."
          : caught instanceof ApiError
            ? caught.message
            : 'We could not load your worlds just now. Nothing has been lost.',
      );
    }
  }, []);

  useEffect(() => {
    void load();
    return navigation.addListener('focus', () => void load());
  }, [load, navigation]);

  const active = sessions?.filter((s) => s.status === 'ACTIVE') ?? [];
  const finished = sessions?.filter((s) => s.status !== 'ACTIVE') ?? [];

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, paddingBottom: spacing.md }}>
        <Txt variant="h1">Library</Txt>
      </Row>

      {error && !sessions ? (
        <EmptyState
          title="Couldn't load your library"
          body={error}
          actionLabel="Try again"
          onAction={() => void load()}
        />
      ) : sessions && sessions.length === 0 ? (
        <EmptyState
          title="No worlds yet"
          body="Anything you start shows up here, with your progress saved."
          actionLabel="Browse worlds"
          onAction={() => navigation.navigate('Tabs', { screen: 'Discover' })}
        />
      ) : (
        <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl, paddingBottom: spacing.giant }}>
          {active.length > 0 ? (
            <Stack gap={spacing.md}>
              <Txt variant="caption" color={colors.text.muted}>
                ACTIVE
              </Txt>
              {active.map((session) => (
                <SessionCard
                  key={session.sessionId}
                  session={session}
                  onPress={() => navigation.navigate('Session', { sessionId: session.sessionId })}
                  onManage={() => setManaging(session)}
                />
              ))}
            </Stack>
          ) : null}

          {finished.length > 0 ? (
            <Stack gap={spacing.md}>
              <Txt variant="caption" color={colors.text.muted}>
                FINISHED
              </Txt>
              {finished.map((session) => (
                <SessionCard
                  key={session.sessionId}
                  session={session}
                  onPress={() => navigation.navigate('Session', { sessionId: session.sessionId })}
                  onManage={() => setManaging(session)}
                />
              ))}
            </Stack>
          ) : null}
        </ScrollView>
      )}

      {/* LB-02 — destructive actions always confirm. */}
      {managing ? (
        <View style={{ position: 'absolute', inset: 0, justifyContent: 'flex-end' }}>
          <Pressable
            accessibilityLabel="Close"
            style={{ position: 'absolute', inset: 0, backgroundColor: colors.scrim }}
            onPress={() => setManaging(null)}
          />
          <SafeAreaView
            edges={['bottom']}
            style={{ backgroundColor: colors.bg.elevated, borderTopLeftRadius: radius.large, borderTopRightRadius: radius.large }}
          >
            <Stack gap={spacing.md} style={{ padding: GUTTER }}>
              <Txt variant="h3">{managing.title}</Txt>
              <Txt variant="caption" color={colors.text.muted}>
                {managing.turnCount} {managing.turnCount === 1 ? 'turn' : 'turns'} · started {new Date(managing.createdAt).toLocaleDateString()}
              </Txt>
              <Button
                label="Fork this run · 120 credits"
                variant="secondary"
                onPress={() => {
                  const id = managing.sessionId;
                  setManaging(null);
                  void api
                    .forkSession(id)
                    .then((response) => navigation.navigate('Session', { sessionId: response.session.sessionId }))
                    .catch(() => Alert.alert('Could not fork', 'You may need more credits.'));
                }}
              />
              <Button
                label="Delete run"
                variant="danger"
                hapticKind="warning"
                onPress={() => {
                  const target = managing;
                  Alert.alert(
                    'Delete this run?',
                    `"${target.title}" and its ${target.turnCount} ${target.turnCount === 1 ? 'turn' : 'turns'} will be gone. This cannot be undone.`,
                    [
                      { text: 'Keep it', style: 'cancel' },
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {
                          setManaging(null);
                          void api.deleteSession(target.sessionId).then(load);
                        },
                      },
                    ],
                  );
                }}
              />
            </Stack>
          </SafeAreaView>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

function SessionCard({
  session,
  onPress,
  onManage,
}: {
  session: SessionSummary;
  onPress: () => void;
  onManage: () => void;
}): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${session.title}, ${session.turnCount} ${session.turnCount === 1 ? 'turn' : 'turns'}. Continue.`}
      onPress={onPress}
      onLongPress={onManage}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      <Card style={{ gap: spacing.md }}>
        <Row gap={spacing.md}>
          <StoryArt
            seed={session.storyId}
            uri={session.coverImage}
            style={{ width: 52, height: 68, borderRadius: radius.control }}
          />
          <Stack gap={2} style={{ flex: 1 }}>
            <Txt variant="bodyStrong" numberOfLines={1}>
              {session.title}
            </Txt>
            <Txt variant="caption" color={colors.text.secondary}>
              as {session.displayName}
            </Txt>
            <Txt variant="micro" color={colors.text.muted}>
              {session.turnCount} {session.turnCount === 1 ? 'turn' : 'turns'} · {new Date(session.lastPlayedAt).toLocaleDateString()}
            </Txt>
            {session.forkedFromSessionId ? <Chip label="Fork" /> : null}
          </Stack>
          <IconButton label="Manage this run" onPress={onManage}>
            <Txt variant="h3" color={colors.text.muted}>
              ⋯
            </Txt>
          </IconButton>
        </Row>
      </Card>
    </Pressable>
  );
}

/** PR-01 / PR-02 — public and private cleanly separated. */
export function ProfileScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const { wallet, isGuest, refreshWallet, signOut } = useStore();
  const [me, setMe] = useState<MeResponse | null>(null);
  const [characters, setCharacters] = useState<PlayerCharacterCard[]>([]);

  const load = useCallback(async () => {
    try {
      setMe(await api.me());
      void refreshWallet();
    } catch {
      setMe(null);
    }
    try {
      setCharacters((await api.myCharacters()).characters);
    } catch {
      setCharacters([]);
    }
  }, [refreshWallet]);

  useEffect(() => {
    void load();
    return navigation.addListener('focus', () => void load());
  }, [load, navigation]);

  const setSetting = (key: string, value: unknown): void => {
    if (!me) return;
    const settings = { ...me.settings, [key]: value };
    setMe({ ...me, settings } as MeResponse);
    void api.updateMe({ settings }).catch(() => void load());
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl, paddingBottom: spacing.giant }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Txt variant="h1">Profile</Txt>
          <CreditBalance balance={wallet?.balance ?? 0} onPress={() => navigation.navigate('Wallet')} />
        </Row>

        <Card style={{ gap: spacing.sm }}>
          <Txt variant="h3">{me?.displayName ?? 'Guest'}</Txt>
          {isGuest ? (
            <>
              <Txt variant="caption" color={colors.text.secondary}>
                You're playing as a guest. Sign in to save this world and continue anywhere.
              </Txt>
              <Button
                label="Sign in"
                variant="secondary"
                style={{ marginTop: spacing.sm }}
                onPress={() => navigation.navigate('SignIn')}
              />
            </>
          ) : (
            <>
              <Txt variant="caption" color={colors.text.secondary}>
                {me?.email ?? me?.handle}
              </Txt>
              <Button
                label="Sign out"
                variant="tertiary"
                full={false}
                style={{ alignSelf: 'flex-start', marginTop: spacing.sm }}
                onPress={() =>
                  Alert.alert(
                    'Sign out?',
                    'Your worlds stay saved to your account. Sign back in on any device to pick them up.',
                    [
                      { text: 'Stay signed in', style: 'cancel' },
                      { text: 'Sign out', onPress: () => void signOut() },
                    ],
                  )
                }
              />
            </>
          )}
        </Card>

        {me ? (
          <Row style={{ justifyContent: 'space-around' }}>
            <Stat label="Worlds" value={me.stats.storiesPlayed} />
            <Stat label="Turns" value={me.stats.turnsPlayed} />
            <Stat label="Created" value={me.stats.worldsCreated} />
          </Row>
        ) : null}

        {/* Who you have been, across worlds. Spec §9.3 portraits live here. */}
        {characters.length > 0 ? (
          <Stack gap={spacing.md}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Txt variant="h3">Your characters</Txt>
              <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Characters')}>
                <Txt variant="caption" color={colors.accent.primary}>
                  See all
                </Txt>
              </Pressable>
            </Row>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
              {characters.map((character) => (
                <Pressable
                  key={character.sessionId}
                  accessibilityRole="button"
                  accessibilityLabel={`${character.displayName} in ${character.storyTitle}`}
                  onPress={() => navigation.navigate('Characters')}
                  style={{ width: 108, gap: spacing.xs }}
                >
                  {character.portraitUrl ? (
                    <Image
                      source={{ uri: character.portraitUrl }}
                      style={{ width: 108, height: 135, borderRadius: radius.card, backgroundColor: colors.bg.raised }}
                      resizeMode="cover"
                    />
                  ) : (
                    <StoryArt
                      seed={character.sessionId}
                      style={{ width: 108, height: 135, borderRadius: radius.card, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Txt variant="micro" color={colors.text.muted} center style={{ padding: spacing.xs }}>
                        Tap to draw
                      </Txt>
                    </StoryArt>
                  )}
                  <Txt variant="caption" numberOfLines={1}>
                    {character.displayName}
                  </Txt>
                  <Txt variant="micro" color={colors.text.muted} numberOfLines={1}>
                    {character.storyTitle}
                  </Txt>
                </Pressable>
              ))}
            </ScrollView>
          </Stack>
        ) : null}

        <Divider />

        <Stack gap={spacing.md}>
          <Txt variant="h3">Gameplay</Txt>
          <Toggle
            label="Show advanced relationship stats"
            hint="Reveals the numbers behind Trusted, Rival, and the rest."
            value={me?.settings.showAdvancedRelationshipStats ?? false}
            onChange={(v) => setSetting('showAdvancedRelationshipStats', v)}
          />
          <Toggle
            label="Show check maths"
            hint="Shows the roll and modifiers, where the world allows it."
            value={me?.settings.showCheckMath ?? false}
            onChange={(v) => setSetting('showCheckMath', v)}
          />
        </Stack>

        <Stack gap={spacing.md}>
          <Txt variant="h3">Audio & visual</Txt>
          <Toggle
            label="Reduce motion"
            hint="Removes parallax and non-essential animation."
            value={me?.settings.reduceMotion ?? false}
            onChange={(v) => setSetting('reduceMotion', v)}
          />
          <Toggle
            label="Autoplay character voice"
            value={me?.settings.voiceAutoplay ?? false}
            onChange={(v) => setSetting('voiceAutoplay', v)}
          />
          <Toggle
            label="Haptics"
            value={me?.settings.hapticsEnabled ?? true}
            onChange={(v) => setSetting('hapticsEnabled', v)}
          />
        </Stack>

        <Divider />

        <Stack gap={spacing.md}>
          <Txt variant="h3">Privacy & safety</Txt>
          <LinkRow label="Report history" onPress={() => navigation.navigate('ReportHistory')} />
          <LinkRow label="Making your own worlds" onPress={() => navigation.navigate('Create')} />
          <LinkRow label="Wallet & purchases" onPress={() => navigation.navigate('Wallet')} />
        </Stack>

        <Divider />

        {/* PR-03 — deletion is available from inside the app (§23.3). */}
        <Stack gap={spacing.md}>
          <Txt variant="h3">Account</Txt>
          {/* Spec §25.8 — one primary per region, and an irreversible action is
              not it. Deletion stays easy to find and hard to hit by accident:
              a plain destructive row, then a confirmation that says what goes. */}
          <Button
            label="Delete account"
            variant="dangerQuiet"
            full={false}
            style={{ alignSelf: 'flex-start' }}
            hapticKind="warning"
            onPress={() =>
              Alert.alert(
                'Delete your account?',
                'Your worlds, progress, and saved stories will be removed. Purchased credits cannot be recovered. This cannot be undone.',
                [
                  { text: 'Keep my account', style: 'cancel' },
                  {
                    text: 'Delete everything',
                    style: 'destructive',
                    onPress: () => {
                      void api.deleteAccount().then(() =>
                        Alert.alert('Account deleted', 'Your data will be fully purged within 30 days.'),
                      );
                    },
                  },
                ],
              )
            }
          />
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: number }): React.JSX.Element {
  return (
    <Stack gap={2} style={{ alignItems: 'center' }}>
      <Txt variant="h2">{value}</Txt>
      <Txt variant="micro" color={colors.text.muted}>
        {label.toUpperCase()}
      </Txt>
    </Stack>
  );
}

function Toggle({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}): React.JSX.Element {
  return (
    <Row style={{ justifyContent: 'space-between' }} align="flex-start">
      <Stack gap={2} style={{ flex: 1, paddingRight: spacing.lg }}>
        <Txt variant="bodyCompact">{label}</Txt>
        {hint ? (
          <Txt variant="micro" color={colors.text.muted}>
            {hint}
          </Txt>
        ) : null}
      </Stack>
      <Switch
        value={value}
        onValueChange={onChange}
        accessibilityLabel={label}
        trackColor={{ true: colors.accent.primary, false: colors.bg.raised }}
      />
    </Row>
  );
}

function LinkRow({ label, onPress }: { label: string; onPress: () => void }): React.JSX.Element {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}>
      <Row style={{ justifyContent: 'space-between', paddingVertical: spacing.sm }}>
        <Txt variant="bodyCompact">{label}</Txt>
        <Txt variant="body" color={colors.text.muted}>
          ›
        </Txt>
      </Row>
    </Pressable>
  );
}
