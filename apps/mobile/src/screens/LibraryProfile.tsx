import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Locale, MeResponse, SessionSummary } from '@aniplay/contracts';
import { LOCALES } from '@aniplay/i18n';
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
import { useT } from '../i18n/useT.js';
import type { RootNavigation } from '../navigation.jsx';
import type { BadgeView } from '../api/client.js';
import { BADGES } from '@aniplay/contracts';

/**
 * LB-01 / LB-02 Library, PR-01 / PR-02 / PR-03 Profile, SF-01 Report.
 */

export function LibraryScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const t = useT();
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
          ? t('library.offline')
          : caught instanceof ApiError
            ? caught.message
            : t('library.load_failed_body'),
      );
    }
  }, [t]);

  useEffect(() => {
    void load();
    return navigation.addListener('focus', () => void load());
  }, [load, navigation]);

  const active = sessions?.filter((s) => s.status === 'ACTIVE') ?? [];
  const finished = sessions?.filter((s) => s.status !== 'ACTIVE') ?? [];

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, paddingBottom: spacing.md }}>
        <Txt variant="h1">{t('library.title')}</Txt>
      </Row>

      {error && !sessions ? (
        <EmptyState
          title={t('library.load_failed_title')}
          body={error}
          actionLabel={t('library.try_again')}
          onAction={() => void load()}
        />
      ) : sessions && sessions.length === 0 ? (
        <EmptyState
          title={t('library.no_worlds_yet')}
          body={t('library.no_worlds_body')}
          actionLabel={t('library.browse_worlds')}
          onAction={() => {
            // i18n-exempt: 'Discover' is a nested navigator route name, not shown to anybody
            navigation.navigate('Tabs', { screen: 'Discover' });
          }}
        />
      ) : (
        <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl, paddingBottom: spacing.giant }}>
          {active.length > 0 ? (
            <Stack gap={spacing.md}>
              <Txt variant="caption" color={colors.text.muted}>
                {t('library.section_active')}
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
                {t('library.section_finished')}
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
            accessibilityLabel={t('library.close_sheet')}
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
                {t('library.run_started', {
                  count: managing.turnCount,
                  date: new Date(managing.createdAt).toLocaleDateString(),
                })}
              </Txt>
              <Button
                label={t('library.fork_run')}
                variant="secondary"
                onPress={() => {
                  const id = managing.sessionId;
                  setManaging(null);
                  void api
                    .forkSession(id)
                    .then((response) => navigation.navigate('Session', { sessionId: response.session.sessionId }))
                    .catch(() => Alert.alert(t('library.fork_failed_title'), t('library.fork_failed_body')));
                }}
              />
              <Button
                label={t('library.delete_run')}
                variant="danger"
                hapticKind="warning"
                onPress={() => {
                  const target = managing;
                  Alert.alert(
                    t('library.delete_confirm_title'),
                    t('library.delete_confirm_body', {
                      title: target.title,
                      count: target.turnCount,
                    }),
                    [
                      { text: t('library.delete_keep'), style: 'cancel' },
                      {
                        text: t('library.delete_confirm'),
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
  const t = useT();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('library.session_card_a11y', {
        title: session.title,
        count: session.turnCount,
      })}
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
              {t('library.playing_as', { name: session.displayName })}
            </Txt>
            <Txt variant="micro" color={colors.text.muted}>
              {t('library.turns_and_date', {
                count: session.turnCount,
                date: new Date(session.lastPlayedAt).toLocaleDateString(),
              })}
            </Txt>
            {session.forkedFromSessionId ? <Chip label={t('library.fork_badge')} /> : null}
          </Stack>
          <IconButton label={t('library.manage_run')} onPress={onManage}>
            <Txt variant="h3" color={colors.text.muted}>
              ⋯
            </Txt>
          </IconButton>
        </Row>
      </Card>
    </Pressable>
  );
}

/**
 * The languages, in their own language. Never translated — a language picker
 * that says "French" to someone looking for "Français" is the one string in the
 * app that must not be localized.
 */
// i18n-exempt: a language picker names each language in its own language
const LANGUAGE_NAMES: Record<Locale, string> = { en: 'English', fr: 'Français' };

/** PR-01 / PR-02 — public and private cleanly separated. */
export function ProfileScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const t = useT();
  const { wallet, isGuest, refreshWallet, signOut, locale, localeChoice, setLocale } = useStore();
  const [me, setMe] = useState<MeResponse | null>(null);
  const [characters, setCharacters] = useState<PlayerCharacterCard[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [badges, setBadges] = useState<BadgeView[]>([]);

  const badgeCount = badges.filter((b) => b.unlockedAt).length;
  // The set is fixed and known without asking the server, so a guest — who
  // cannot call `/v1/badges` — sees "0 of 12" rather than "0 of 0 earned",
  // which reads as a broken screen rather than as something to go and earn.
  const badgeTotal = badges.length || BADGES.length;
  const unclaimed = badges.filter((b) => b.unlockedAt && !b.claimedAt).length;
  // The language switch is deliberately not on the screen yet. French exists
  // as infrastructure and not yet as copy, and a visible control that produced
  // a half-translated app would be a worse bug than not having one. Seven taps
  // on the Profile heading reveals it, the way a build number reveals a
  // developer menu; step 7 of the localization sequence promotes it to a
  // normal row once `npm run fr:lint` is clean over a full catalogue.
  const [languageTaps, setLanguageTaps] = useState(0);
  // Promoted to a normal row on 2026-09-11, per the condition in the comment
  // above: `fr:lint` is clean over a complete catalogue. It also has to be a
  // normal row now that `DEVICE_LOCALE_AUTODETECT` is on — a French phone opens
  // in French, and the only way back to English cannot be a secret seven taps.
  const languageVisible = true;
  void languageTaps;

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
    if (isGuest) return;
    void api.badges().then((response) => setBadges(response.badges)).catch(() => undefined);
  }, [isGuest]);

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
          <Pressable
            onPress={() => setLanguageTaps((n) => n + 1)}
            accessibilityRole="header"
            accessibilityLabel={t('profile.title')}
          >
            <Txt variant="h1">{t('profile.title')}</Txt>
          </Pressable>
          <CreditBalance balance={wallet?.balance ?? 0} onPress={() => navigation.navigate('Wallet')} />
        </Row>

        <Card style={{ gap: spacing.sm }}>
          <Txt variant="h3">{me?.displayName ?? t('profile.guest')}</Txt>
          {isGuest ? (
            <>
              <Txt variant="caption" color={colors.text.secondary}>
                {t('profile.guest_explainer')}
              </Txt>
              <Button
                label={t('profile.sign_in')}
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
                label={t('profile.sign_out')}
                variant="tertiary"
                full={false}
                style={{ alignSelf: 'flex-start', marginTop: spacing.sm }}
                onPress={() =>
                  Alert.alert(
                    t('profile.sign_out_confirm_title'),
                    t('library.sign_out_confirm_body'),
                    [
                      { text: t('library.sign_out_stay'), style: 'cancel' },
                      { text: t('profile.sign_out'), onPress: () => void signOut() },
                    ],
                  )
                }
              />
            </>
          )}
        </Card>

        {me ? (
          <Row style={{ justifyContent: 'space-around' }}>
            {/* What a *player* has done. `worldsCreated` was here and was
                always 0, because creator publishing is not a thing we ship —
                a permanent `0 CREATED` on the profile is the product telling
                the player about a feature they cannot have. */}
            <Stat label={t('library.stat_worlds')} value={me.stats.storiesPlayed} />
            <Stat label={t('library.stat_turns')} value={me.stats.turnsPlayed} />
            <Stat label={t('library.stat_badges')} value={badgeCount} />
          </Row>
        ) : null}

        {/* Who you have been, across worlds. Spec §9.3 portraits live here. */}
        {characters.length > 0 ? (
          <Stack gap={spacing.md}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Txt variant="h3">{t('library.your_characters')}</Txt>
              <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Characters')}>
                <Txt variant="caption" color={colors.accent.primary}>
                  {t('library.see_all')}
                </Txt>
              </Pressable>
            </Row>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
              {characters.map((character) => (
                <Pressable
                  key={character.sessionId}
                  accessibilityRole="button"
                  accessibilityLabel={t('library.character_in_story_a11y', {
                    name: character.displayName,
                    story: character.storyTitle,
                  })}
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
                        {t('library.tap_to_draw')}
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

        {languageVisible ? (
          <Stack gap={spacing.md}>
            <Txt variant="h3">{t('profile.language')}</Txt>
            <Txt variant="micro" color={colors.text.muted}>
              {t('profile.language_hint')}
            </Txt>
            <Row gap={spacing.sm}>
              <Chip
                label={t('profile.language_device')}
                selected={localeChoice === null}
                onPress={() => void setLocale(null)}
              />
              {LOCALES.map((code) => (
                <Chip
                  key={code}
                  label={LANGUAGE_NAMES[code]}
                  selected={localeChoice === code}
                  onPress={() => void setLocale(code)}
                />
              ))}
            </Row>
            <Txt variant="micro" color={colors.text.muted}>
              {t('profile.language_current', { name: LANGUAGE_NAMES[locale] })}
            </Txt>
          </Stack>
        ) : null}

        {/*
          Two switches that show the engine's working.

          They were top-level, between Language and Reduce Motion, which put
          "show check maths" in front of every player who has never wanted to
          see a dice roll. They are genuinely useful to a small number of people
          and noise to everyone else, so they are one tap away rather than gone.
        */}
        <Stack gap={spacing.md}>
          <Txt variant="h3">{t('profile.gameplay')}</Txt>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: advancedOpen }}
            onPress={() => setAdvancedOpen(!advancedOpen)}
          >
            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack gap={2}>
                <Txt variant="body">{t('profile.advanced_gameplay')}</Txt>
                <Txt variant="micro" color={colors.text.muted}>
                  {t('profile.advanced_gameplay_hint')}
                </Txt>
              </Stack>
              <Txt variant="h3" color={colors.text.muted}>
                {advancedOpen ? '⌄' : '›'}
              </Txt>
            </Row>
          </Pressable>
          {advancedOpen ? (
            <Stack gap={spacing.md} style={{ paddingLeft: spacing.md }}>
              <Toggle
                label={t('profile.advanced_relationship_stats')}
                hint={t('profile.advanced_relationship_stats_hint')}
                value={me?.settings.showAdvancedRelationshipStats ?? false}
                onChange={(v) => setSetting('showAdvancedRelationshipStats', v)}
              />
              <Toggle
                label={t('profile.check_math')}
                hint={t('profile.check_math_hint')}
                value={me?.settings.showCheckMath ?? false}
                onChange={(v) => setSetting('showCheckMath', v)}
              />
            </Stack>
          ) : null}
        </Stack>

        {/* Badges, with what is waiting to be collected said plainly. */}
        <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Badges')}>
          <Card>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack gap={2}>
                <Txt variant="body">{t('profile.badges')}</Txt>
                <Txt variant="micro" color={colors.text.muted}>
                  {unclaimed > 0
                    ? t('profile.badges_unclaimed', { count: unclaimed })
                    : t('profile.badges_summary', { earned: badgeCount, total: badgeTotal })}
                </Txt>
              </Stack>
              <Txt variant="h3" color={colors.text.muted}>
                ›
              </Txt>
            </Row>
          </Card>
        </Pressable>

        {/*
          `Audio & visual` was three switches that did nothing.
          Nothing in the app ever read `settings.reduceMotion` or
          `settings.hapticsEnabled`: the real reduce-motion behaviour comes from
          the *system* setting, which `HeroCarousel` reads through
          `AccessibilityInfo`, and `haptic()` fires unconditionally. Voice
          autoplay sits behind a `voicePlayback` flag that is off.

          So the section asked a player to make three decisions, none of which
          had an effect, in a settings list where every other row does. The
          fields stay in the data model; only the controls are gone.
        */}

        <Stack gap={spacing.md}>
          <Txt variant="h3">{t('profile.privacy_safety')}</Txt>
          <LinkRow label={t('profile.report_history')} onPress={() => navigation.navigate('ReportHistory')} />
          <LinkRow label={t('profile.creator_teaser')} onPress={() => navigation.navigate('Create')} />
          <LinkRow label={t('profile.wallet')} onPress={() => navigation.navigate('Wallet')} />
        </Stack>

        <Divider />

        {/* PR-03 — deletion is available from inside the app (§23.3). */}
        <Stack gap={spacing.md}>
          <Txt variant="h3">{t('profile.account')}</Txt>
          {/* Spec §25.8 — one primary per region, and an irreversible action is
              not it. Deletion stays easy to find and hard to hit by accident:
              a plain destructive row, then a confirmation that says what goes. */}
          <Button
            label={t('library.delete_account')}
            variant="dangerQuiet"
            full={false}
            style={{ alignSelf: 'flex-start' }}
            hapticKind="warning"
            onPress={() =>
              Alert.alert(
                t('library.delete_account_confirm_title'),
                t('library.delete_account_confirm_body'),
                [
                  { text: t('library.delete_account_keep'), style: 'cancel' },
                  {
                    text: t('library.delete_account_confirm'),
                    style: 'destructive',
                    onPress: () => {
                      void api.deleteAccount().then(() =>
                        Alert.alert(t('library.account_deleted_title'), t('library.account_deleted_body')),
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
