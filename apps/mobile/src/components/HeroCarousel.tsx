import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  AppState,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import type { StorySummary } from '@plotbreak/contracts';
import { StoryArt, Txt, colors, radius, spacing, GUTTER } from '@plotbreak/ui';
import { useT } from '../i18n/useT.js';

/**
 * Six worlds, one at a time, the story as the hero.
 *
 * The old featured banner was a 16:9 strip with the title in a bar along the
 * bottom — the same treatment every card further down the page already had,
 * only wider. It said "here is a story" where the first screen needs to say
 * "here is a world, and you want to be inside it."
 *
 * So: the cover at its authored portrait aspect, large enough to be the only
 * thing on screen, with a heavily blurred copy of the same art behind it
 * bleeding to the edges. The blur is the art doing the background's job, which
 * is most of why this reads as a world rather than as a catalogue row — and it
 * costs nothing, because the image is already loaded.
 *
 * ## Rotation
 *
 * Advances every six seconds, and stops the moment the player touches it —
 * permanently, for that session. A carousel that resumes after you have started
 * reading is worse than one that never moved, because it takes away the thing
 * you were looking at. Touching it is a statement that you are driving now.
 *
 * It also stops when the app is not in the foreground, because animating a
 * screen nobody is looking at is a battery cost with no reader.
 *
 * ## Reduce Motion
 *
 * Honoured by not moving, rather than by moving faster. With it on there is no
 * auto-advance and no crossfade: somebody who asked their phone to stop moving
 * things did not ask for them to move briefly.
 */
const ROTATE_MS = 6_000;

/** `position: absolute` filling the parent, written once. */
const FILL = { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0 };

export function HeroCarousel({
  stories,
  onOpen,
  backdropExtendTop = 0,
}: {
  stories: readonly StorySummary[];
  onOpen: (storyId: string) => void;
  /**
   * How far the blurred art reaches **above** this component, in points.
   *
   * The backdrop used to stop at the carousel's own top edge, so the header sat
   * on flat black and the art looked pasted into the page rather than being the
   * page. Discover passes the header's height plus the safe-area inset, and
   * floats the header on top of the result.
   */
  backdropExtendTop?: number;
}): React.JSX.Element | null {
  const t = useT();
  const listRef = useRef<FlatList<StorySummary>>(null);
  const [index, setIndex] = useState(0);
  const [driving, setDriving] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const fade = useRef(new Animated.Value(1)).current;

  const width = Dimensions.get('window').width;
  // Tall enough to be the screen, short enough that the category pills and the
  // first row of covers stay reachable without a deliberate scroll.
  // The card carries the screen, so it is sized against the screen rather than
  // against a fixed ceiling. 0.58 of the width read as a thumbnail floating in
  // a lot of dark space next to the reference it is chasing.
  const cardWidth = Math.min(width * 0.64, 300);
  const height = Math.min(cardWidth * 1.5 + 132, Dimensions.get('window').height * 0.58);

  useEffect(() => {
    let live = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((on) => {
      if (live) setReduceMotion(on);
    });
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => {
      live = false;
      sub.remove();
    };
  }, []);

  useEffect(() => {
    if (driving || reduceMotion || stories.length < 2) return undefined;
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = (): void => {
      if (timer) return;
      timer = setInterval(() => {
        setIndex((current) => {
          const next = (current + 1) % stories.length;
          listRef.current?.scrollToIndex({ index: next, animated: true });
          return next;
        });
      }, ROTATE_MS);
    };
    const stop = (): void => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    start();
    const sub = AppState.addEventListener('change', (state) =>
      state === 'active' ? start() : stop(),
    );
    return () => {
      stop();
      sub.remove();
    };
  }, [driving, reduceMotion, stories.length]);

  const onMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const next = Math.round(event.nativeEvent.contentOffset.x / width);
      setIndex(Math.max(0, Math.min(next, stories.length - 1)));
    },
    [stories.length, width],
  );

  // Crossfade the backdrop rather than cutting it, so the colour behind the page
  // moves with the art instead of snapping.
  useEffect(() => {
    if (reduceMotion) return;
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 420, useNativeDriver: true }).start();
  }, [index, fade, reduceMotion]);

  if (stories.length === 0) return null;
  const current = stories[Math.min(index, stories.length - 1)];
  // i18n-exempt: two numerals and a slash. French reads 1/6 as 1/6.
  const position = `${index + 1}/${stories.length}`;

  return (
    // `overflow: visible` so the backdrop may reach up behind the header.
    <View style={{ height, marginBottom: spacing.lg, overflow: 'visible' }}>
      {current?.coverImage ? (
        <Animated.View
          pointerEvents="none"
          style={[FILL, { top: -backdropExtendTop, opacity: fade }]}
        >
          <Image
            source={{ uri: current.coverImage }}
            style={FILL}
            blurRadius={40}
            resizeMode="cover"
          />
          {/*
            Dimmed, but not to black. At 0.72 the art was a rumour; the
            reference this is chasing keeps enough of the cover's colour that
            the top of the page is tinted by whatever world is showing.
          */}
          <View style={[FILL, { backgroundColor: 'rgba(11,13,18,0.58)' }]} />
          {/*
            And faded out at the bottom, so the art ends by becoming the page
            instead of stopping at a line. Three bands rather than a gradient
            dependency: at this blur nobody can see the steps.
          */}
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 96, backgroundColor: 'rgba(11,13,18,0.35)' }} />
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 56, backgroundColor: 'rgba(11,13,18,0.55)' }} />
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 24, backgroundColor: colors.bg.base }} />
        </Animated.View>
      ) : null}

      <FlatList
        ref={listRef}
        horizontal
        pagingEnabled
        data={[...stories]}
        keyExtractor={(item) => item.storyId}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        // Any touch hands the carousel over for good.
        onTouchStart={() => setDriving(true)}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('discover.hero_a11y', { title: item.title, fantasy: item.fantasyLabel })}
            onPress={() => onOpen(item.storyId)}
            style={({ pressed }) => ({
              width,
              alignItems: 'center',
              paddingTop: spacing.lg,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <StoryArt
              seed={item.storyId}
              uri={item.coverImage}
              style={{ width: cardWidth, height: cardWidth * 1.5, borderRadius: radius.card }}
            />
            <View
              style={{ paddingHorizontal: GUTTER, paddingTop: spacing.md, alignItems: 'center', gap: 2 }}
            >
              <Txt variant="display" numberOfLines={2} style={{ textAlign: 'center' }}>
                {item.title}
              </Txt>
              <Txt
                variant="caption"
                color={colors.text.secondary}
                numberOfLines={1}
                style={{ textAlign: 'center' }}
              >
                {item.fantasyLabel}
              </Txt>
            </View>
          </Pressable>
        )}
      />

      {/* 1/6, top right, the way a gallery counts. Six dots at this size read as
          decoration; a fraction reads as information. */}
      {stories.length > 1 ? (
        <View
          style={{
            position: 'absolute',
            top: spacing.md,
            right: GUTTER,
            paddingHorizontal: spacing.sm,
            paddingVertical: 2,
            borderRadius: radius.control,
            backgroundColor: 'rgba(11,13,18,0.6)',
          }}
        >
          <Txt variant="micro" color={colors.text.secondary}>
            {position}
          </Txt>
        </View>
      ) : null}
    </View>
  );
}
