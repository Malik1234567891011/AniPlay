import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Modal, Pressable, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StoryDetailResponse } from '@aniplay/contracts';
import type { TranslationKey, Translator } from '@aniplay/i18n';
import {
  Button,
  Card,
  CharacterPortrait,
  Chip,
  Divider,
  GUTTER,
  IconButton,
  Row,
  Skeleton,
  Stack,
  StoryArt,
  StoryCoverCard,
  Txt,
  colors,
  formatCredits,
  radius,
  spacing,
  toParagraphs,
} from '@aniplay/ui';
import { api } from '../api/client.js';
import { useT } from '../i18n/useT.js';
import type { RootNavigation, RootRoute } from '../navigation.jsx';
import { useStore } from '../state/store.jsx';
import { Comments } from '../components/Comments.jsx';

/**
 * ST-01 Story detail.
 *
 * Spec §8.1 — convert curiosity into the first turn while setting honest
 * expectations. §8.3: one primary CTA in the first viewport, two taps to start,
 * and content descriptors visible before entry.
 */

/**
 * Content descriptors — a France ratings surface, shown before entry (§8.3).
 *
 * The **keys are ids**: they are the enum values `contentDescriptors` carries on
 * the wire, and they stay English in every locale. Only the labels they point at
 * are localised, and those labels are ratings copy reviewed against PEGI FR's
 * own wording — not a translator's free choice. The agreed fr-FR column is in
 * `docs/localization/fr-FR/UI_AUDIT.md` §4.
 *
 * An unknown descriptor falls back to its own id rather than disappearing: a
 * warning the client does not recognise still has to be visible.
 */
const DESCRIPTOR_KEYS: Record<string, TranslationKey | undefined> = {
  FANTASY_VIOLENCE: 'story.descriptor_fantasy_violence',
  ROMANCE: 'story.descriptor_romance',
  SUGGESTIVE_THEMES: 'story.descriptor_suggestive_themes',
  HORROR: 'story.descriptor_horror',
  PSYCHOLOGICAL_THEMES: 'story.descriptor_psychological_themes',
  ALCOHOL_REFERENCES: 'story.descriptor_alcohol_references',
  LANGUAGE: 'story.descriptor_strong_language',
  PERMANENT_DEATH: 'story.descriptor_permanent_death',
  MORAL_AMBIGUITY: 'story.descriptor_moral_ambiguity',
};

/** Not a component, so it takes the translator rather than calling the hook. */
function descriptorLabel(descriptor: string, t: Translator): string {
  const key = DESCRIPTOR_KEYS[descriptor];
  return key === undefined ? descriptor : t(key);
}

export function StoryDetailScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  route: RootRoute<'StoryDetail'>;
}): React.JSX.Element {
  const t = useT();
  const { locale, isGuest } = useStore();
  // A guest may read every comment and post none. See `Comments`.
  const signedIn = !isGuest;
  const { storyId } = route.params;
  const insets = useSafeAreaInsets();
  const [detail, setDetail] = useState<StoryDetailResponse | null>(null);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [castMember, setCastMember] = useState<StoryDetailResponse['cast'][number] | null>(null);

  // The key art is deliberately edge-to-edge under the status bar. Once the page
  // scrolls past it, body content would otherwise run under the clock unclipped,
  // so a scrim fades in to give the status bar something opaque to sit on.
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrimOpacity = scrollY.interpolate({
    inputRange: [0, 160, 220],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    void api.storyDetail(storyId).then((response) => {
      setDetail(response);
      setSaved(response.story.saved);
      setLiked(response.story.likedByMe);
      setLikes(response.story.likes);
    });
  }, [storyId]);

  if (!detail) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
        <Stack gap={spacing.lg} style={{ padding: GUTTER }}>
          <Skeleton width="100%" height={220} radius={radius.large} />
          <Skeleton width="70%" height={28} radius={6} />
          <Skeleton width="90%" height={18} radius={6} />
          <Skeleton width="100%" height={50} radius={radius.control} />
        </Stack>
      </SafeAreaView>
    );
  }

  const { story } = detail;
  const continuing = detail.activeSessionId !== null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: spacing.giant }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
      >
        <StoryArt seed={story.storyId} uri={story.keyArt} style={{ width: '100%', aspectRatio: 4 / 3 }} />

        <SafeAreaView edges={['top']} style={{ position: 'absolute', left: GUTTER, right: GUTTER }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <IconButton label={t('story.back')} onPress={() => navigation.goBack()}>
              <Txt variant="h2">‹</Txt>
            </IconButton>
            <Row gap={spacing.sm}>
              <IconButton
                label={saved ? t('story.remove_from_saved') : t('story.save_story')}
                onPress={() => {
                  setSaved(!saved);
                  void api.saveStory(story.storyId, !saved).catch(() => setSaved(saved));
                }}
              >
                <Txt variant="h3" color={saved ? colors.accent.primary : colors.text.primary}>
                  {saved ? '★' : '☆'}
                </Txt>
              </IconButton>
              <IconButton
                label={t('story.report_story')}
                onPress={() => navigation.navigate('Report', { targetType: 'STORY', targetId: story.storyId })}
              >
                <Txt variant="h3">⋯</Txt>
              </IconButton>
            </Row>
          </Row>
        </SafeAreaView>

        <Stack gap={spacing.xxl} style={{ padding: GUTTER, marginTop: -spacing.xxl }}>
          <Stack gap={spacing.sm}>
            <Row gap={spacing.xs}>
              {story.official ? (
                <Chip label={t('story.badge_official')} tone="accent" />
              ) : (
                <Chip label={t('story.badge_community')} />
              )}
            </Row>
            <Txt variant="display">{story.title}</Txt>
            <Txt variant="bodyCompact" color={colors.text.secondary}>
              {t('story.by_creator', { name: story.creatorName })}
            </Txt>
            <Txt variant="body" color={colors.text.primary} style={{ marginTop: spacing.sm }}>
              {story.hook}
            </Txt>
          </Stack>

          {/*
            Spec §8.3 — one primary CTA above the fold, and exactly one.

            When there is a run to return to, Continue is that CTA and New
            session sits beside it as a secondary. Replayability is the point of
            this product: a world played once is not a world finished with, and
            funnelling every return visit into the same save was quietly saying
            otherwise. Starting a new one leaves the old one entirely alone —
            they are separate rows, and the list below shows both.
          */}
          <Stack gap={spacing.sm}>
            <Button
              label={continuing ? t('story.continue') : t('story.start')}
              hapticKind="medium"
              onPress={() => {
                if (detail.activeSessionId) {
                  navigation.navigate('Session', { sessionId: detail.activeSessionId });
                } else {
                  navigation.navigate('CharacterSetup', { storyId: story.storyId });
                }
              }}
            />
            {continuing ? (
              <Button
                label={t('story.new_session')}
                variant="secondary"
                onPress={() => navigation.navigate('CharacterSetup', { storyId: story.storyId })}
              />
            ) : null}
          </Stack>

          {/* Like and comment count, together, because they answer the same
              question: is this worth my evening. */}
          <Row gap={spacing.md} style={{ alignItems: 'center' }}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: liked }}
              accessibilityLabel={liked ? t('story.unlike') : t('story.like')}
              onPress={() => {
                const next = !liked;
                // Optimistic, and reverted if the server disagrees. A like is
                // the cheapest possible interaction and must feel instant.
                setLiked(next);
                setLikes((n) => n + (next ? 1 : -1));
                void api.likeStory(story.storyId, next).then(
                  (result) => setLikes(result.likes),
                  () => {
                    setLiked(!next);
                    setLikes((n) => n + (next ? -1 : 1));
                  },
                );
              }}
            >
              <Row gap={spacing.xs} style={{ alignItems: 'center' }}>
                <Txt variant="h3" color={liked ? colors.accent.primary : colors.text.secondary}>
                  {liked ? '♥' : '♡'}
                </Txt>
                <Txt variant="bodyCompact" color={colors.text.secondary}>
                  {formatCredits(likes, true, locale)}
                </Txt>
              </Row>
            </Pressable>
            <Row gap={spacing.xs} style={{ alignItems: 'center' }}>
              <Txt variant="h3" color={colors.text.secondary}>
                {'\u{1F4AC}'}
              </Txt>
              <Txt variant="bodyCompact" color={colors.text.secondary}>
                {formatCredits(story.comments, true, locale)}
              </Txt>
            </Row>
          </Row>

          {/*
            Every run of this world, newest first.

            Below the CTAs rather than beside them: somebody who wants to get
            back in taps Continue and never reads this, and somebody who wants a
            specific earlier run is looking for it deliberately.
          */}
          {detail.sessions.length > 0 ? (
            <Stack gap={spacing.md}>
              <Txt variant="h3">{t('story.sessions_heading')}</Txt>
              {detail.sessions.map((session, index) => (
                <Card key={session.sessionId}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }} gap={spacing.md}>
                    <Stack gap={2} style={{ flex: 1 }}>
                      <Row gap={spacing.sm} style={{ alignItems: 'center', flexWrap: 'wrap' }}>
                        <Txt variant="bodyStrong">
                          {session.locationName
                            ? t('story.session_line_where', {
                                count: session.turnCount,
                                where: session.locationName,
                                date: new Date(session.lastPlayedAt).toLocaleDateString(),
                              })
                            : t('story.session_line', {
                                count: session.turnCount,
                                date: new Date(session.lastPlayedAt).toLocaleDateString(),
                              })}
                        </Txt>
                      </Row>
                      <Row gap={spacing.sm}>
                        {index === 0 ? <Chip label={t('story.session_latest')} tone="accent" /> : null}
                        {session.status === 'COMPLETED' ? (
                          <Chip label={t('story.session_status_completed')} />
                        ) : null}
                      </Row>
                    </Stack>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={t('story.session_resume')}
                      onPress={() => navigation.navigate('Session', { sessionId: session.sessionId })}
                    >
                      <Txt variant="bodyStrong" color={colors.accent.primary}>
                        {t('story.session_resume')}
                      </Txt>
                    </Pressable>
                  </Row>
                </Card>
              ))}
            </Stack>
          ) : null}

          {/* Spec §8.2 item 6 — compact honest stats, no fake ratings. */}
          <Card>
            <Row style={{ justifyContent: 'space-between' }}>
              <Stat label={t('story.stat_players')} value={detail.stats.runs.toLocaleString()} />
              <Stat label={t('story.stat_shape')} value={detail.stats.medianDepthLabel} />
              <Stat label={t('story.stat_intensity')} value={titleCase(detail.stats.intensity)} />
            </Row>
          </Card>

          <Comments
            storyId={story.storyId}
            signedIn={signedIn}
            onSignIn={() => navigation.navigate('Profile' as never)}
          />

          {/* Spec §8.2 item 7 — what you can actually do here. */}
          <Stack gap={spacing.md}>
            <Txt variant="h3">{t('story.mechanics_heading')}</Txt>
            <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
              {story.mechanicsChips.map((chip) => (
                <Chip key={chip} label={chip} tone="accent" />
              ))}
            </Row>
          </Stack>

          <Stack gap={spacing.md}>
            <Txt variant="h3">{t('story.premise_heading')}</Txt>
            {/* A premise is 200+ words and it is the one thing a player reads
                before committing. Rendered as one block it is a wall nobody
                finishes, so the authored paragraph breaks get real spacing. */}
            <Stack gap={spacing.md}>
              {toParagraphs(detail.premise).map((paragraph, index) => (
                <Txt key={index} variant="body" color={colors.text.secondary} serif>
                  {paragraph}
                </Txt>
              ))}
            </Stack>
          </Stack>

          {detail.cast.length > 0 ? (
            <Stack gap={spacing.md}>
              <Txt variant="h3">{t('story.cast_heading')}</Txt>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={detail.cast}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: spacing.lg }}
                renderItem={({ item }) => (
                  // The carousel has to truncate, so the truncation has to be
                  // one tap from the whole thing. A face a player is curious
                  // about is the strongest signal they have about whether they
                  // want this world at all.
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t('story.cast_a11y', { name: item.name, role: item.role })}
                    onPress={() => setCastMember(item)}
                    style={({ pressed }) => [{ width: 148, gap: spacing.xs, opacity: pressed ? 0.8 : 1 }]}
                  >
                    <CharacterPortrait name={item.name} uri={item.portrait} size={148} />
                    <Txt variant="bodyCompact" numberOfLines={1}>
                      {item.name}
                    </Txt>
                    {/* Story function leads; the job title is secondary. */}
                    <Txt variant="caption" color={colors.text.secondary} numberOfLines={3}>
                      {item.cardBlurb || item.role}
                    </Txt>
                    <Txt variant="micro" color={colors.text.muted} numberOfLines={1}>
                      {item.cardBlurb ? item.role : t('story.cast_tap_for_more')}
                    </Txt>
                  </Pressable>
                )}
              />
            </Stack>
          ) : null}

          {/* Spec §8.3 — descriptors are visible before entry, never after. */}
          <Stack gap={spacing.md}>
            <Txt variant="h3">{t('story.content_heading')}</Txt>
            <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
              {story.contentDescriptors.map((descriptor) => (
                <Chip
                  key={descriptor}
                  label={descriptorLabel(descriptor, t)}
                  tone={descriptor === 'PERMANENT_DEATH' ? 'warning' : 'neutral'}
                />
              ))}
            </Row>
          </Stack>

          {detail.creatorNote ? (
            <Card style={{ gap: spacing.sm }}>
              <Txt variant="caption" color={colors.text.muted}>
                {t('story.creator_note_heading')}
              </Txt>
              <Txt variant="bodyCompact" color={colors.text.secondary}>
                {detail.creatorNote}
              </Txt>
            </Card>
          ) : null}

          {detail.related.length > 0 ? (
            <Stack gap={spacing.md}>
              <Divider />
              <Txt variant="h3">{t('story.related_heading')}</Txt>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={detail.related}
                keyExtractor={(item) => item.storyId}
                contentContainerStyle={{ gap: spacing.md }}
                renderItem={({ item }) => (
                  <StoryCoverCard
                    story={{ ...item, badges: item.badges as string[] }}
                    width={140}
                    onPress={() => navigation.push('StoryDetail', { storyId: item.storyId })}
                  />
                )}
              />
            </Stack>
          ) : null}
        </Stack>
      </Animated.ScrollView>

      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: insets.top,
          backgroundColor: colors.bg.base,
          opacity: scrimOpacity,
        }}
      />

      {castMember ? <CastSheet member={castMember} onClose={() => setCastMember(null)} /> : null}
    </View>
  );
}

/**
 * A cast member, in full.
 *
 * Everything shown here is public: what they are to the player, what they are
 * known for, what they look like. Nothing from `hiddenDrives`, `secrets` or
 * `goals` reaches this screen — meeting someone should still be how you find
 * out who they are.
 */
function CastSheet({
  member,
  onClose,
}: {
  member: StoryDetailResponse['cast'][number];
  onClose: () => void;
}): React.JSX.Element {
  const t = useT();

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('story.close')}
        onPress={onClose}
        style={{ flex: 1, backgroundColor: 'rgba(6,7,10,0.86)', justifyContent: 'flex-end' }}
      >
        {/* Swallows the tap so pressing the card itself does not dismiss it. */}
        <Pressable
          onPress={() => undefined}
          style={{
            backgroundColor: colors.bg.raised,
            borderTopLeftRadius: radius.large,
            borderTopRightRadius: radius.large,
            padding: GUTTER,
            paddingBottom: spacing.xxl,
            gap: spacing.lg,
          }}
        >
          <View style={{ alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: colors.text.muted }} />

          <Row gap={spacing.lg} style={{ alignItems: 'flex-start' }}>
            <CharacterPortrait name={member.name} uri={member.portrait} size={124} />
            <View style={{ flex: 1, gap: spacing.xs }}>
              <Txt variant="h2" numberOfLines={2}>
                {member.name}
              </Txt>
              <Txt variant="caption" color={colors.text.secondary}>
                {member.role}
              </Txt>
              {member.pronouns ? (
                <Txt variant="micro" color={colors.text.muted}>
                  {member.pronouns}
                </Txt>
              ) : null}
            </View>
          </Row>

          {member.cardBlurb ? <Txt variant="body">{member.cardBlurb}</Txt> : null}

          {member.publicTraits.length > 0 ? (
            <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
              {member.publicTraits.map((trait) => (
                <Chip key={trait} label={trait} />
              ))}
            </Row>
          ) : null}

          {member.appearance ? (
            <Txt variant="caption" color={colors.text.secondary}>
              {member.appearance}
            </Txt>
          ) : null}

          <Button label={t('story.close')} variant="secondary" onPress={onClose} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function Stat({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <View style={{ gap: 2 }}>
      <Txt variant="micro" color={colors.text.muted}>
        {label.toUpperCase()}
      </Txt>
      <Txt variant="bodyStrong">{value}</Txt>
    </View>
  );
}

function titleCase(value: string): string {
  return value.charAt(0) + value.slice(1).toLowerCase();
}
