import React, { useEffect, useRef, useState } from 'react';
import { Animated, Linking, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Chip, Row, Stack, Txt, colors, spacing, GUTTER } from '@aniplay/ui';
import { useStore } from '../state/store.jsx';

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
  await Linking.openURL(`${base.replace(/\/$/, '')}/${page}`).catch(() => undefined);
}

const LEGAL_LINKS_CONFIGURED = Boolean(process.env.EXPO_PUBLIC_LEGAL_BASE_URL);

/** OB-01 — no fake delay; the wordmark shows only for as long as boot takes. */
export function SplashScreen(): React.JSX.Element {
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
        <Txt variant="display" style={{ letterSpacing: 6 }}>
          PLOTBREAK
        </Txt>
        {showProgress ? (
          <Txt variant="caption" color={colors.text.muted}>
            Loading…
          </Txt>
        ) : null}
      </Animated.View>
    </View>
  );
}

/** OB-02 — shown once, before any personalized content. */
export function AgeGateScreen(): React.JSX.Element {
  const { confirmAge } = useStore();
  const [band, setBand] = useState<string | null>(null);

  const bands = [
    { id: 'under13', label: 'Under 13' },
    { id: '13_17', label: '13 – 17' },
    { id: '18_24', label: '18 – 24' },
    { id: '25plus', label: '25 or older' },
  ];

  const tooYoung = band === 'under13';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <View style={{ flex: 1, padding: GUTTER, justifyContent: 'center', gap: spacing.xxl }}>
        <Stack gap={spacing.sm}>
          <Txt variant="display">Before you enter</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            Some worlds here deal with conflict, danger, and difficult choices. Tell us your age band so we
            can show you the right ones.
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
            PLOTBREAK is built for players aged 13 and over. Thanks for being honest with us.
          </Txt>
        ) : null}

        <Stack gap={spacing.md}>
          <Button
            label="Continue"
            disabled={!band || tooYoung}
            onPress={() => void confirmAge()}
          />
          {/* Only shown once they point somewhere. A dead link on the age gate
              is the first thing App Store review taps. */}
          {LEGAL_LINKS_CONFIGURED ? (
            <Row gap={spacing.lg} style={{ justifyContent: 'center' }}>
              <Txt variant="caption" color={colors.text.muted} onPress={() => void openLegal('privacy')}>
                Privacy
              </Txt>
              <Txt variant="caption" color={colors.text.muted} onPress={() => void openLegal('terms')}>
                Terms
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
  const { setTastes, bootstrap } = useStore();
  const [picked, setPicked] = useState<string[]>([]);

  // From the catalog, not from a hand-written list. The old one offered
  // Isekai, Sci-fi and Cozy, and no world is tagged with any of them — three
  // picks could return nothing at all.
  const genres = (bootstrap?.genres ?? []).map((genre) => genre.label);

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
          <Txt variant="display">Pick anything you'd actually play.</Txt>
          <Txt variant="body" color={colors.text.secondary}>
            Up to five. This decides what the top of Discover shows you — nothing is hidden either way, and
            you can change it whenever you like. Skipping is fine.
          </Txt>
        </Stack>

        <Row gap={spacing.md} style={{ flexWrap: 'wrap' }}>
          {genres.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              selected={picked.includes(genre)}
              onPress={() => toggle(genre)}
              style={{ paddingVertical: spacing.md, paddingHorizontal: spacing.lg }}
            />
          ))}
        </Row>

        <View style={{ flex: 1 }} />

        <Stack gap={spacing.md}>
          <Button label="Continue" onPress={() => finish(picked)} />
          <Button label="Skip" variant="tertiary" onPress={() => finish([])} />
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}
