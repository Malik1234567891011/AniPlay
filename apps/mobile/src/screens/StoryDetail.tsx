import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StoryDetailResponse } from '@aniplay/contracts';
import {
  Button,
  Card,
  CharacterPortrait,
  Chip,
  Divider,
  IconButton,
  Row,
  Skeleton,
  Stack,
  StoryArt,
  StoryCoverCard,
  Txt,
  colors,
  GUTTER,
  radius,
  spacing,
} from '@aniplay/ui';
import { api } from '../api/client.js';
import type { RootNavigation, RootRoute } from '../navigation.jsx';

/**
 * ST-01 Story detail.
 *
 * Spec §8.1 — convert curiosity into the first turn while setting honest
 * expectations. §8.3: one primary CTA in the first viewport, two taps to start,
 * and content descriptors visible before entry.
 */

const DESCRIPTOR_COPY: Record<string, string> = {
  FANTASY_VIOLENCE: 'Fantasy violence',
  ROMANCE: 'Romance',
  SUGGESTIVE_THEMES: 'Suggestive themes',
  HORROR: 'Horror',
  PSYCHOLOGICAL_THEMES: 'Psychological themes',
  ALCOHOL_REFERENCES: 'Alcohol references',
  LANGUAGE: 'Strong language',
  PERMANENT_DEATH: 'Permanent death',
  MORAL_AMBIGUITY: 'Moral ambiguity',
};

export function StoryDetailScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  route: RootRoute<'StoryDetail'>;
}): React.JSX.Element {
  const { storyId } = route.params;
  const insets = useSafeAreaInsets();
  const [detail, setDetail] = useState<StoryDetailResponse | null>(null);
  const [saved, setSaved] = useState(false);

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
            <IconButton label="Back" onPress={() => navigation.goBack()}>
              <Txt variant="h2">‹</Txt>
            </IconButton>
            <Row gap={spacing.sm}>
              <IconButton
                label={saved ? 'Remove from saved' : 'Save story'}
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
                label="Report this story"
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
              {story.official ? <Chip label="Official" tone="accent" /> : <Chip label="Community" />}
            </Row>
            <Txt variant="display">{story.title}</Txt>
            <Txt variant="bodyCompact" color={colors.text.secondary}>
              by {story.creatorName}
            </Txt>
            <Txt variant="body" color={colors.text.primary} style={{ marginTop: spacing.sm }}>
              {story.hook}
            </Txt>
          </Stack>

          {/* Spec §8.3 — exactly one primary CTA above the fold. */}
          <Button
            label={continuing ? 'Continue' : 'Start story'}
            hapticKind="medium"
            onPress={() => {
              if (detail.activeSessionId) {
                navigation.navigate('Session', { sessionId: detail.activeSessionId });
              } else {
                navigation.navigate('CharacterSetup', { storyId: story.storyId });
              }
            }}
          />

          {/* Spec §8.2 item 6 — compact honest stats, no fake ratings. */}
          <Card>
            <Row style={{ justifyContent: 'space-between' }}>
              <Stat label="Players" value={detail.stats.runs.toLocaleString()} />
              <Stat label="Shape" value={detail.stats.medianDepthLabel} />
              <Stat label="Intensity" value={titleCase(detail.stats.intensity)} />
            </Row>
          </Card>

          {/* Spec §8.2 item 7 — what you can actually do here. */}
          <Stack gap={spacing.md}>
            <Txt variant="h3">What you can do here</Txt>
            <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
              {story.mechanicsChips.map((chip) => (
                <Chip key={chip} label={chip} tone="accent" />
              ))}
            </Row>
          </Stack>

          <Stack gap={spacing.md}>
            <Txt variant="h3">The premise</Txt>
            <Txt variant="body" color={colors.text.secondary} serif>
              {detail.premise}
            </Txt>
          </Stack>

          {detail.cast.length > 0 ? (
            <Stack gap={spacing.md}>
              <Txt variant="h3">Who you'll meet</Txt>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={detail.cast}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: spacing.lg }}
                renderItem={({ item }) => (
                  <View style={{ width: 148, gap: spacing.xs }}>
                    <CharacterPortrait name={item.name} uri={item.portrait} size={148} />
                    <Txt variant="bodyCompact" numberOfLines={1}>
                      {item.name}
                    </Txt>
                    {/* Story function leads; the job title is secondary. */}
                    <Txt variant="caption" color={colors.text.secondary} numberOfLines={4}>
                      {item.cardBlurb || item.role}
                    </Txt>
                    {item.cardBlurb ? (
                      <Txt variant="micro" color={colors.text.muted} numberOfLines={1}>
                        {item.role}
                      </Txt>
                    ) : null}
                  </View>
                )}
              />
            </Stack>
          ) : null}

          {/* Spec §8.3 — descriptors are visible before entry, never after. */}
          <Stack gap={spacing.md}>
            <Txt variant="h3">Content</Txt>
            <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
              {story.contentDescriptors.map((descriptor) => (
                <Chip
                  key={descriptor}
                  label={DESCRIPTOR_COPY[descriptor] ?? descriptor}
                  tone={descriptor === 'PERMANENT_DEATH' ? 'warning' : 'neutral'}
                />
              ))}
            </Row>
          </Stack>

          {detail.creatorNote ? (
            <Card style={{ gap: spacing.sm }}>
              <Txt variant="caption" color={colors.text.muted}>
                FROM THE CREATOR
              </Txt>
              <Txt variant="bodyCompact" color={colors.text.secondary}>
                {detail.creatorNote}
              </Txt>
            </Card>
          ) : null}

          {detail.related.length > 0 ? (
            <Stack gap={spacing.md}>
              <Divider />
              <Txt variant="h3">Related worlds</Txt>
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
    </View>
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
