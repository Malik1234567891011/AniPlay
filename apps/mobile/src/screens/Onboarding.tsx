import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Linking, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Chip, Row, Stack, StoryArt, Txt, colors, radius, spacing, GUTTER } from '@aniplay/ui';
import type { StorySummary } from '@aniplay/contracts';
import { api } from '../api/client.js';
import { useStore } from '../state/store.jsx';
import { useCategoryLabel, useT } from '../i18n/useT.js';

/**
 * Screens OB-01 to OB-03.
 *
 * Spec §6.1 — the player reaches their first meaningful choice within 60
 * seconds, and there is no account wall in front of it.
 */

/**
 * The privacy policy and terms live wherever they are published, which is not
 * something the app gets to invent. These were `https://aniplay.example/...`,
 * which is a link to nothing in a screen App Store review reads carefully.
 */
async function openLegal(page: 'privacy' | 'terms'): Promise<void> {
  const base = process.env.EXPO_PUBLIC_LEGAL_BASE_URL;
  if (!base) return;
  // i18n-exempt: a URL, not copy — the localized page is chosen by the site.
  await Linking.openURL(`${base.replace(/\/$/, '')}/${page}`).catch(() => undefined);
}

const LEGAL_LINKS_CONFIGURED = Boolean(process.env.EXPO_PUBLIC_LEGAL_BASE_URL);

/** OB-01 — no fake delay; the wordmark shows only for as long as boot takes. */
export function SplashScreen(): React.JSX.Element {
  const t = useT();
  const fade = useRef(new Animated.Value(0)).current;
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: true }).start();
    // Spec §6.2 — a progress indicator appears only if boot exceeds 800ms.
    const timer = setTimeout(() => setShowProgress(true), 800);
    return () => clearTimeout(timer);
  }, [fade]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.base, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ opacity: fade, alignItems: 'center', gap: spacing.md }}>
        {/* i18n-exempt: the wordmark. PLOTBREAK is the product's name, not a word. */}
        <Txt variant="display" style={{ letterSpacing: 6 }}>
          PLOTBREAK
        </Txt>
        {showProgress ? (
          <Txt variant="caption" color={colors.text.muted}>
            {t('onboarding.loading')}
          </Txt>
        ) : null}
      </Animated.View>
    </View>
  );
}

/** OB-02 — shown once, before any personalized content. */
export function AgeGateScreen(): React.JSX.Element {
  const t = useT();
  const { confirmAge } = useStore();
  const [band, setBand] = useState<string | null>(null);

  const bands = [
    { id: 'under13', label: t('onboarding.age_band_under_13') },
    { id: '13_17', label: t('onboarding.age_band_13_17') },
    { id: '18_24', label: t('onboarding.age_band_18_24') },
    { id: '25plus', label: t('onboarding.age_band_25_plus') },
  ];

  const tooYoung = band === 'under13';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <View style={{ flex: 1, padding: GUTTER, justifyContent: 'center', gap: spacing.xxl }}>
        <Stack gap={spacing.sm}>
          <Txt variant="display">{t('onboarding.age_gate_title')}</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            {t('onboarding.age_gate_body')}
          </Txt>
        </Stack>

        <Stack gap={spacing.md}>
          {bands.map((option) => (
            <Chip
              key={option.id}
              label={option.label}
              selected={band === option.id}
              onPress={() => setBand(option.id)}
              style={{ paddingVertical: spacing.lg, justifyContent: 'center' }}
            />
          ))}
        </Stack>

        {tooYoung ? (
          <Txt variant="bodyCompact" color={colors.semantic.warning}>
            {t('onboarding.age_too_young')}
          </Txt>
        ) : null}

        <Stack gap={spacing.md}>
          <Button
            label={t('onboarding.continue')}
            disabled={!band || tooYoung}
            onPress={() => void confirmAge()}
          />
          {/* Only shown once they point somewhere. A dead link on the age gate
              is the first thing App Store review taps. */}
          {LEGAL_LINKS_CONFIGURED ? (
            <Row gap={spacing.lg} style={{ justifyContent: 'center' }}>
              <Txt variant="caption" color={colors.text.muted} onPress={() => void openLegal('privacy')}>
                {t('onboarding.privacy')}
              </Txt>
              <Txt variant="caption" color={colors.text.muted} onPress={() => void openLegal('terms')}>
                {t('onboarding.terms')}
              </Txt>
            </Row>
          ) : null}
        </Stack>
      </View>
    </SafeAreaView>
  );
}

/** OB-03 — optional, skippable, one screen. Must not delay play (§6.2). */
export function TasteScreen({ onDone }: { onDone: () => void }): React.JSX.Element {
  const t = useT();
  const { setTastes, bootstrap } = useStore();
  const categoryWord = useCategoryLabel();
  const [picked, setPicked] = useState<string[]>([]);

  // From the catalog, not from a hand-written list. The old one offered
  // Isekai, Sci-fi and Cozy, and no world is tagged with any of them — three
  // picks could return nothing at all.
  // The label is the *value* here — `picked` holds labels and `setTastes` sends
  // them — so the English word has to survive even when a French word is on the
  // chip. Display and identity are separated rather than translated together.
  const genres = bootstrap?.genres ?? [];

  const toggle = (genre: string): void => {
    setPicked((current) =>
      current.includes(genre)
        ? current.filter((g) => g !== genre)
        // Spec §6.2 — select 0 to 5.
        : current.length >= 5
          ? current
          : [...current, genre],
    );
  };

  const finish = (tastes: string[]): void => {
    void setTastes(tastes).then(onDone);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xxl, flexGrow: 1 }}>
        <Stack gap={spacing.sm} style={{ paddingTop: spacing.xxxl }}>
          <Txt variant="display">{t('onboarding.taste_title')}</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            {t('onboarding.taste_body')}
          </Txt>
        </Stack>

        <Row gap={spacing.md} style={{ flexWrap: 'wrap' }}>
          {genres.map((genre) => (
            <Chip
              key={genre.id}
              label={categoryWord(genre.id, genre.label)}
              selected={picked.includes(genre.label)}
              onPress={() => toggle(genre.label)}
              style={{ paddingVertical: spacing.md, paddingHorizontal: spacing.lg }}
            />
          ))}
        </Row>

        <View style={{ flex: 1 }} />

        <Stack gap={spacing.md}>
          <Button label={t('onboarding.continue')} onPress={() => finish(picked)} />
          <Button label={t('onboarding.skip')} variant="tertiary" onPress={() => finish([])} />
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * OB-04 — five worlds, and a way in.
 *
 * The taste screen before this asks what somebody likes and then drops them on
 * a shelf of twenty-three things, which is the moment a new player bounces. So
 * the last thing onboarding does is put five covers in front of them and let
 * one of them be tapped.
 *
 * Five, not twenty-three, and deliberately unlike each other: a dark shinobi
 * tragedy, a beastfolk arena, a domestic romance, a horror, a piece of military
 * science fiction. Somebody who likes none of these can still see everything,
 * which is what the button underneath is for.
 *
 * The picks are pinned rather than computed. A "most promising" query would
 * rank on run counts we do not have yet, and would quietly drift as the catalog
 * grows; this is a shop window and somebody should choose what is in it.
 */
const SHOWCASE_STORY_IDS = [
  'story_itachi',
  'story_second_skin',
  'story_good_morning_husband',
  'story_hush_house',
  'story_zero_throne',
] as const;

export function ShowcaseScreen({
  onSeeAll,
  onOpen,
}: {
  onSeeAll: () => void;
  onOpen: (storyId: string) => void;
}): React.JSX.Element {
  const t = useT();
  const [stories, setStories] = useState<StorySummary[]>([]);

  useEffect(() => {
    let live = true;
    void api
      .discover()
      .then((data) => {
        if (!live) return;
        const all = new Map(data.rails.flatMap((rail) => rail.stories).map((s) => [s.storyId, s]));
        // Pinned order, and anything missing is skipped rather than leaving a
        // hole — a world can be pulled from the catalog without breaking this.
        setStories(SHOWCASE_STORY_IDS.map((id) => all.get(id)).filter((s): s is StorySummary => !!s));
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, []);

  // A card wide enough that the next one peeks in at the edge, which is what
  // says "these swipe" without a hint or a row of dots.
  const cardWidth = Math.min(Dimensions.get('window').width * 0.62, 260);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <View style={{ flex: 1, paddingTop: spacing.xxxl }}>
        <Stack gap={spacing.sm} style={{ paddingHorizontal: GUTTER }}>
          <Txt variant="display">{t('onboarding.showcase_title')}</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            {t('onboarding.showcase_body')}
          </Txt>
        </Stack>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <FlatList
            horizontal
            data={stories}
            keyExtractor={(item) => item.storyId}
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth + spacing.md}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: GUTTER, gap: spacing.md }}
            renderItem={({ item }) => (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t('onboarding.showcase_card_a11y', { title: item.title })}
                onPress={() => onOpen(item.storyId)}
                style={({ pressed }) => ({ width: cardWidth, opacity: pressed ? 0.85 : 1 })}
              >
                <StoryArt
                  seed={item.storyId}
                  uri={item.coverImage}
                  style={{ width: cardWidth, height: cardWidth * 1.5, borderRadius: radius.card }}
                />
                <Stack gap={2} style={{ paddingTop: spacing.md }}>
                  <Txt variant="h3" numberOfLines={2}>
                    {item.title}
                  </Txt>
                  {/* i18n-exempt: the studio name. A brand is not translated. */}
                  <Txt variant="caption" color={colors.text.muted}>
                    Plotbreak
                  </Txt>
                </Stack>
              </Pressable>
            )}
          />
        </View>

        <View style={{ paddingHorizontal: GUTTER, paddingBottom: spacing.lg }}>
          <Button label={t('onboarding.see_all_stories')} variant="secondary" onPress={onSeeAll} />
        </View>
      </View>
    </SafeAreaView>
  );
}
