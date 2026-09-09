import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ContinueCard, DiscoverResponse, StorySummary } from '@aniplay/contracts';
import {
  Button,
  Card,
  Chip,
  CreditBalance,
  EmptyState,
  IconButton,
  Row,
  SectionHeader,
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
import { api, ApiError } from '../api/client.js';
import { useStore } from '../state/store.jsx';
import type { RootNavigation } from '../navigation.jsx';

/**
 * DS-01 Discover home.
 *
 * Spec §7.1 — Discover sells fantasies, not AI capabilities. It should read like
 * a premium storefront, not a feed of chatbot cards.
 */
export function DiscoverScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const { wallet, refreshWallet, offline, tastes } = useStore();
  const [data, setData] = useState<DiscoverResponse | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<StorySummary | null>(null);

  const load = useCallback(async () => {
    try {
      setData(await api.discover(tastes));
      setError(null);
      void refreshWallet();
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Could not load worlds.');
    }
  }, [refreshWallet, tastes]);

  useEffect(() => {
    void load();
    const unsubscribe = navigation.addListener('focus', () => void load());
    return unsubscribe;
  }, [load, navigation]);

  const hero = data?.rails.find((rail) => rail.kind === 'HERO')?.stories[0];

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.base }}>
      {/* Spec §7.2 item 1 — safe-area header. */}
      <Row style={{ paddingHorizontal: GUTTER, paddingBottom: spacing.md, justifyContent: 'space-between' }}>
        <Txt variant="h2" style={{ letterSpacing: 3 }}>
          ANIMA
        </Txt>
        <Row gap={spacing.sm}>
          <IconButton label="Search worlds" onPress={() => navigation.navigate('Search')}>
            <Txt variant="h3" color={colors.text.secondary}>
              ⌕
            </Txt>
          </IconButton>
          <CreditBalance balance={wallet?.balance ?? 0} onPress={() => navigation.navigate('Wallet')} />
        </Row>
      </Row>

      {offline ? (
        <View style={{ marginHorizontal: GUTTER, marginBottom: spacing.sm, padding: spacing.md, borderRadius: radius.control, backgroundColor: colors.bg.raised }}>
          <Txt variant="caption" color={colors.semantic.warning}>
            You're offline. Showing what we have.
          </Txt>
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.giant, gap: spacing.xxl }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={colors.text.muted}
            onRefresh={() => {
              setRefreshing(true);
              void load().finally(() => setRefreshing(false));
            }}
          />
        }
      >
        {!data && !error ? <DiscoverSkeleton /> : null}

        {error && !data ? (
          <EmptyState
            title="Nothing loaded"
            body="We couldn't reach the catalog just now."
            actionLabel="Try again"
            onAction={() => void load()}
          />
        ) : null}

        {/* Spec §7.2 item 2 — one featured card, edge-to-edge art, one CTA. */}
        {hero ? (
          <View style={{ paddingHorizontal: GUTTER }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Featured: ${hero.title}. ${hero.fantasyLabel}`}
              onPress={() => navigation.navigate('StoryDetail', { storyId: hero.storyId })}
            >
              <StoryArt
                seed={hero.storyId}
                uri={hero.keyArt}
                style={{ width: '100%', aspectRatio: 16 / 11, borderRadius: radius.large }}
              >
                {/* Text sits below the art's focal region so faces stay clear (§7.2). */}
                <View style={{ padding: spacing.lg, gap: spacing.xs, backgroundColor: 'rgba(11,13,18,0.82)' }}>
                  <Row gap={spacing.xs}>
                    {hero.official ? <Chip label="Official" tone="accent" /> : null}
                    <Chip label={hero.intensity === 'INTENSE' ? 'Intense' : hero.intensity === 'LIGHT' ? 'Light' : 'Moderate'} />
                  </Row>
                  <Txt variant="h1">{hero.title}</Txt>
                  <Txt variant="bodyCompact" color={colors.text.secondary}>
                    {hero.hook}
                  </Txt>
                </View>
              </StoryArt>
            </Pressable>
            <Button
              label="Enter world"
              style={{ marginTop: spacing.md }}
              onPress={() => navigation.navigate('StoryDetail', { storyId: hero.storyId })}
            />
          </View>
        ) : null}

        {/* Spec §7.2 item 3 — Continue, only when there is something to continue. */}
        {data && data.continueCards.length > 0 ? (
          <Stack gap={spacing.md}>
            <SectionHeader title="Continue" />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data.continueCards}
              keyExtractor={(item) => item.sessionId}
              contentContainerStyle={{ paddingHorizontal: GUTTER, gap: spacing.md }}
              renderItem={({ item }) => (
                <ContinueTile
                  card={item}
                  onPress={() => navigation.navigate('Session', { sessionId: item.sessionId })}
                />
              )}
            />
          </Stack>
        ) : null}

        {data?.rails
          .filter((rail) => rail.kind !== 'HERO' && rail.kind !== 'CONTINUE' && rail.stories.length > 0)
          .map((rail) => (
            <Stack key={rail.id} gap={spacing.md}>
              <SectionHeader title={rail.title} />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={rail.stories}
                keyExtractor={(item) => `${rail.id}_${item.storyId}`}
                contentContainerStyle={{ paddingHorizontal: GUTTER, gap: spacing.md }}
                renderItem={({ item }) => (
                  <StoryCoverCard
                    story={{ ...item, badges: item.badges as string[] }}
                    width={150}
                    onPress={() => navigation.navigate('StoryDetail', { storyId: item.storyId })}
                    onLongPress={() => setPreview(item)}
                  />
                )}
              />
            </Stack>
          ))}
      </ScrollView>

      {/* DS-04 — long-press quick preview. */}
      {preview ? (
        <QuickPreviewSheet
          story={preview}
          onClose={() => setPreview(null)}
          onOpen={() => {
            const storyId = preview.storyId;
            setPreview(null);
            navigation.navigate('StoryDetail', { storyId });
          }}
          onHide={() => {
            void api.hideStory(preview.storyId).then(load);
            setPreview(null);
          }}
          onReport={() => {
            const storyId = preview.storyId;
            setPreview(null);
            navigation.navigate('Report', { targetType: 'STORY', targetId: storyId });
          }}
        />
      ) : null}
    </SafeAreaView>
  );
}

function ContinueTile({ card, onPress }: { card: ContinueCard; onPress: () => void }): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Continue ${card.title}. ${card.currentObjective ?? ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ width: 260, opacity: pressed ? 0.85 : 1 })}
    >
      <Card style={{ gap: spacing.sm }}>
        <Row gap={spacing.md}>
          <StoryArt seed={card.storyId} style={{ width: 44, height: 56, borderRadius: radius.control }} />
          <View style={{ flex: 1, gap: 2 }}>
            <Txt variant="bodyStrong" numberOfLines={1}>
              {card.title}
            </Txt>
            <Txt variant="micro" color={colors.text.muted}>
              {card.turnCount} turns
            </Txt>
          </View>
        </Row>
        {card.currentObjective ? (
          <Txt variant="caption" color={colors.text.secondary} numberOfLines={2}>
            {card.currentObjective}
          </Txt>
        ) : null}
      </Card>
    </Pressable>
  );
}

/** DS-04 — bottom sheet: Save, Hide, Report, Share. */
function QuickPreviewSheet({
  story,
  onClose,
  onOpen,
  onHide,
  onReport,
}: {
  story: StorySummary;
  onClose: () => void;
  onOpen: () => void;
  onHide: () => void;
  onReport: () => void;
}): React.JSX.Element {
  const [saved, setSaved] = useState(story.saved);

  return (
    <View style={{ position: 'absolute', inset: 0, justifyContent: 'flex-end' }}>
      <Pressable
        accessibilityLabel="Close preview"
        style={{ position: 'absolute', inset: 0, backgroundColor: colors.scrim }}
        onPress={onClose}
      />
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: colors.bg.elevated, borderTopLeftRadius: radius.large, borderTopRightRadius: radius.large }}>
        <View style={{ padding: GUTTER, gap: spacing.lg }}>
          <Row gap={spacing.md}>
            <StoryArt seed={story.storyId} style={{ width: 56, height: 76, borderRadius: radius.control }} />
            <View style={{ flex: 1, gap: 2 }}>
              <Txt variant="bodyStrong">{story.title}</Txt>
              <Txt variant="caption" color={colors.text.secondary} numberOfLines={2}>
                {story.hook}
              </Txt>
            </View>
          </Row>

          <Button label="Open story" onPress={onOpen} />

          <Row gap={spacing.md} style={{ justifyContent: 'space-between' }}>
            <Chip
              label={saved ? 'Saved' : 'Save'}
              selected={saved}
              onPress={() => {
                setSaved(!saved);
                void api.saveStory(story.storyId, !saved).catch(() => setSaved(saved));
              }}
            />
            <Chip label="Not interested" onPress={onHide} />
            <Chip label="Report" tone="danger" onPress={onReport} />
          </Row>
        </View>
      </SafeAreaView>
    </View>
  );
}

function DiscoverSkeleton(): React.JSX.Element {
  return (
    <Stack gap={spacing.xxl}>
      <View style={{ paddingHorizontal: GUTTER }}>
        <Skeleton width="100%" height={240} radius={radius.large} />
      </View>
      {[0, 1].map((row) => (
        <Stack key={row} gap={spacing.md}>
          <View style={{ paddingHorizontal: GUTTER }}>
            <Skeleton width={140} height={22} radius={6} />
          </View>
          <Row gap={spacing.md} style={{ paddingHorizontal: GUTTER }}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} width={150} height={225} />
            ))}
          </Row>
        </Stack>
      ))}
    </Stack>
  );
}

/** DS-02 / DS-03 — search with filters. */
export function SearchScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StorySummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      void api
        .search(query)
        .then((response) => setResults(response.results))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 220);
    return () => clearTimeout(timer);
  }, [query]);

  const filtered = results.filter(
    (story) => filters.length === 0 || filters.every((f) => story.tags.includes(f) || story.mechanicsChips.includes(f)),
  );

  const availableFilters = [...new Set(results.flatMap((s) => [...s.tags, ...s.mechanicsChips]))].slice(0, 10);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, gap: spacing.md }}>
        <TextInput
          autoFocus
          value={query}
          onChangeText={setQuery}
          placeholder="Search titles, creators, tags"
          placeholderTextColor={colors.text.muted}
          accessibilityLabel="Search worlds"
          returnKeyType="search"
          style={{
            flex: 1,
            height: 44,
            paddingHorizontal: spacing.lg,
            borderRadius: radius.control,
            backgroundColor: colors.bg.elevated,
            color: colors.text.primary,
            fontSize: 17,
          }}
        />
        <Txt variant="body" color={colors.accent.primary} onPress={() => navigation.goBack()}>
          Cancel
        </Txt>
      </Row>

      {availableFilters.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: GUTTER, gap: spacing.sm }}>
          {availableFilters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              selected={filters.includes(filter)}
              onPress={() =>
                setFilters((current) =>
                  current.includes(filter) ? current.filter((f) => f !== filter) : [...current, filter],
                )
              }
            />
          ))}
        </ScrollView>
      ) : null}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.storyId}
        contentContainerStyle={{ padding: GUTTER, gap: spacing.lg }}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          loading ? null : (
            <EmptyState
              title={query.length > 0 ? 'No worlds matched' : 'Search for a world'}
              body={
                query.length > 0
                  ? 'Try a shorter search, or browse the rails on Discover.'
                  : 'Search by title, creator, tag, premise, or a character you remember.'
              }
            />
          )
        }
        renderItem={({ item }) => (
          <StoryCoverCard
            story={{ ...item, badges: item.badges as string[] }}
            variant="row"
            onPress={() => navigation.navigate('StoryDetail', { storyId: item.storyId })}
          />
        )}
      />
    </SafeAreaView>
  );
}
