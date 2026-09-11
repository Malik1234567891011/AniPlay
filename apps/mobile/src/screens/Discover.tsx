import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  TextInput,
  useWindowDimensions,
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
import { HeroCarousel } from '../components/HeroCarousel.js';

/**
 * DS-01 Discover home.
 *
 * Spec §7.1 — Discover sells fantasies, not AI capabilities. It should read like
 * a premium storefront, not a feed of chatbot cards.
 */
/**
 * Card sizing, measured off the device rather than fixed at 150pt.
 *
 * Two competing goals: enough worlds visible that the catalog reads as
 * abundant, and covers big enough that a face on one is still a face. On a
 * 393pt phone a two-column grid gives 170pt cards — the art is the subject and
 * the title is comfortably readable — while the rails run at 2.4 cards
 * visible, so the row is obviously scrollable without a chevron telling you so.
 *
 * Three columns was tried and rejected: 108pt covers turn every character into
 * a smudge, which defeats the entire point of a character-forward cover.
 */
function useCardWidths(): { gridCardWidth: number; railCardWidth: number } {
  const { width } = useWindowDimensions();
  const usable = width - GUTTER * 2;
  return {
    gridCardWidth: Math.floor((usable - spacing.md) / 2),
    railCardWidth: Math.floor((usable - spacing.md * 1.4) / 2.4),
  };
}

export function DiscoverScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const { wallet, refreshWallet, offline, tastes } = useStore();
  const [data, setData] = useState<DiscoverResponse | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<StorySummary | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const { gridCardWidth, railCardWidth } = useCardWidths();

  const load = useCallback(async () => {
    try {
      setData(await api.discover(tastes, category));
      setError(null);
      void refreshWallet();
    } catch (caught) {
      // Spec §10.8 — which failure it was decides what the player should do
      // about it. "We couldn't reach the catalog" covers being offline, the
      // server being down and the server refusing, and helps with none of them.
      setError(
        caught instanceof ApiError && caught.code === 'OFFLINE'
          ? "You're offline. Worlds you have already started still open from your Library."
          : caught instanceof ApiError
            ? caught.message
            : 'Could not load worlds.',
      );
    }
  }, [refreshWallet, tastes, category]);

  useEffect(() => {
    void load();
    const unsubscribe = navigation.addListener('focus', () => void load());
    return unsubscribe;
  }, [load, navigation]);

  const hero = data?.rails.find((rail) => rail.kind === 'HERO')?.stories ?? [];

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.base }}>
      {/* Spec §7.2 item 1 — safe-area header. */}
      <Row style={{ paddingHorizontal: GUTTER, paddingBottom: spacing.md, justifyContent: 'space-between' }}>
        <Txt variant="h2" style={{ letterSpacing: 3 }}>
          PLOTBREAK
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
        {/*
          The browse rail. Near the top because it is the answer to the
          question a new player actually has — "is there the kind of anime I
          like in here?" — and horizontal because the vocabulary should be
          scannable in one gesture without pushing the covers off screen.

          Categories come from the server, which only ever offers one that has
          worlds in it, so tapping any of these can never open onto nothing.
        */}
        {data && data.categories.length > 0 ? (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[{ id: '__all', label: 'All', count: 0 }, ...data.categories]}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: GUTTER, gap: spacing.sm }}
            style={{ flexGrow: 0 }}
            renderItem={({ item }) => {
              const id = item.id === '__all' ? null : item.id;
              return (
                <Chip
                  label={item.label}
                  tone={category === id ? 'accent' : 'neutral'}
                  selected={category === id}
                  onPress={() => setCategory(id)}
                />
              );
            }}
          />
        ) : null}

        {!data && !error ? <DiscoverSkeleton /> : null}

        {error && !data ? (
          <EmptyState
            title="Nothing loaded"
            body={error}
            actionLabel="Try again"
            onAction={() => void load()}
          />
        ) : null}

        {/*
          One featured world, sized so it sells that world without being the
          entire first screen.

          It used to run 16:11 of art plus two pills plus a three-line premise
          plus a full-width button — about 55% of the viewport before a second
          world was visible, on a storefront whose whole job is to say "there
          are a lot of different anime here". The art is now wider than it is
          tall, the copy is one line, and the CTA is inside the card, so the
          category rail and the first row of covers are above the fold.
        */}
        {hero.length > 0 && !data?.activeCategory ? (
          <HeroCarousel
            stories={hero}
            onOpen={(storyId) => navigation.navigate('StoryDetail', { storyId })}
          />
        ) : null}

        {/* Spec §7.2 item 3 — Continue, only when there is something to continue. */}
        {/*
          Continue is a rail like the others, because it is a shelf like the
          others.

          It was horizontal, then vertical, and vertical was wrong for a
          different reason than horizontal had been: full-width rows with a
          two-line objective under each made five runs taller than the whole
          screen, and pushed Trending below the fold. "way too long it should be
          a horizontal row not vertical. like the same as our trending and
          stuff, except it says continue."

          So it is the same `StoryCoverCard` at the same `railCardWidth` as every
          other rail. What made the original horizontal version bad — a cramped
          260pt card with the objective cut off mid-word — is gone because the
          card no longer tries to carry the objective at all. The cover does the
          work, the title is under it, and how far in you are is a caption.
        */}
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
                <StoryCoverCard
                  story={{
                    storyId: item.storyId,
                    title: item.title,
                    coverImage: item.coverImage,
                    // The rail's second line. "8 turns in" is what this shelf is
                    // for; the fantasy label belongs on Discover, not here.
                    fantasyLabel: `${item.turnCount} ${item.turnCount === 1 ? 'turn' : 'turns'} in`,
                    badges: [],
                    // Chrome the Continue shelf has no use for: no creator
                    // byline, no official pill, no run count. You have already
                    // chosen this one.
                    creatorName: '',
                    official: false,
                    tags: [],
                    runs: 0,
                  }}
                  width={railCardWidth}
                  onPress={() => navigation.navigate('Session', { sessionId: item.sessionId })}
                />
              )}
            />
          </Stack>
        ) : null}

        {data?.rails
          .filter((rail) => rail.kind !== 'HERO' && rail.kind !== 'CONTINUE' && rail.stories.length > 0)
          .map((rail) => {
            // A curated row is a sample and reads best as a rail you can flick
            // through. The full catalog is not a sample — presenting it as one
            // more horizontal strip is what made nine worlds feel like three.
            // It gets a grid, which is the only layout that says "there is a
            // lot here" without shrinking the covers to nothing.
            const asGrid = rail.id === 'all' || rail.id === 'category';

            return (
              <Stack key={rail.id} gap={spacing.md}>
                <SectionHeader title={rail.title} subtitle={rail.subtitle ?? undefined} />
                {asGrid ? (
                  <View
                    style={{
                      paddingHorizontal: GUTTER,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: spacing.md,
                    }}
                  >
                    {rail.stories.map((item) => (
                      <StoryCoverCard
                        key={`${rail.id}_${item.storyId}`}
                        story={{ ...item, badges: item.badges as string[] }}
                        width={gridCardWidth}
                        onPress={() => navigation.navigate('StoryDetail', { storyId: item.storyId })}
                        onLongPress={() => setPreview(item)}
                      />
                    ))}
                  </View>
                ) : (
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={rail.stories}
                    keyExtractor={(item) => `${rail.id}_${item.storyId}`}
                    contentContainerStyle={{ paddingHorizontal: GUTTER, gap: spacing.md }}
                    renderItem={({ item }) => (
                      <StoryCoverCard
                        story={{ ...item, badges: item.badges as string[] }}
                        width={railCardWidth}
                        onPress={() => navigation.navigate('StoryDetail', { storyId: item.storyId })}
                        onLongPress={() => setPreview(item)}
                      />
                    )}
                  />
                )}
              </Stack>
            );
          })}

        {data && data.rails.every((r) => r.stories.length === 0) ? (
          <EmptyState
            title="Nothing here yet"
            body="No worlds in this category. Try another."
            actionLabel="Show everything"
            onAction={() => setCategory(null)}
          />
        ) : null}
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

/**
 * A run you are in the middle of.
 *
 * The art is the world's actual cover. It used to be `StoryArt seed={storyId}`
 * with no `uri`, which draws the procedural gradient placeholder — so the one
 * section made entirely of worlds the player had already chosen was the only
 * section showing none of their art, including for worlds whose covers had
 * shipped months earlier. `coverImage` was on the contract the whole time and
 * nothing passed it.
 *
 * Covers are 2:3, so the thumbnail is too. A 44x56 chip could not read as a
 * poster at any quality of art.
 */
function ContinueTile({ card, onPress }: { card: ContinueCard; onPress: () => void }): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Continue ${card.title}, ${card.turnCount} turns in. ${card.currentObjective ?? ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      <Card style={{ padding: spacing.sm }}>
        <Row gap={spacing.md} align="center">
          <StoryArt
            seed={card.storyId}
            uri={card.coverImage}
            style={{ width: 64, height: 96, borderRadius: radius.control }}
          />
          <View style={{ flex: 1, gap: spacing.xs }}>
            <Txt variant="bodyStrong" numberOfLines={1}>
              {card.title}
            </Txt>
            <Txt variant="micro" color={colors.text.muted}>
              {card.turnCount} {card.turnCount === 1 ? 'turn' : 'turns'} in
            </Txt>
            {card.currentObjective ? (
              <Txt variant="caption" color={colors.text.secondary} numberOfLines={2}>
                {card.currentObjective}
              </Txt>
            ) : null}
          </View>
        </Row>
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
            <StoryArt
              seed={story.storyId}
              uri={story.coverImage}
              style={{ width: 56, height: 76, borderRadius: radius.control }}
            />
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
