import React, { useRef, useState } from 'react';
import { Image, Platform, ScrollView, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import {
  Button,
  Card,
  Chip,
  IconButton,
  Row,
  Stack,
  Txt,
  colors,
  GUTTER,
  radius,
  spacing,
} from '@aniplay/ui';
import { useStore } from '../state/store.jsx';
import type { RootNavigation, RootRoute } from '../navigation.jsx';

/**
 * SH-01 — the share sheet.
 *
 * Spec §42.2/§42.3. The rule the screen is built around is "preview exactly
 * what is exported": the thing on screen *is* the artifact — the same component
 * is what gets captured — so there is no gap between what a player checked and
 * what left their phone.
 *
 * Composed on the device rather than on a server. A recap card is a few hundred
 * bytes of text over an image the app already has, and round-tripping it
 * through a renderer would add a service, a queue, and a way for a share to
 * fail after the player tapped Share.
 */

type Artifact = 'RECAP' | 'TYPED' | 'HERO';

const ARTIFACTS: Array<{ id: Artifact; label: string; blurb: string }> = [
  { id: 'RECAP', label: 'Recap card', blurb: 'The moment, as the story told it.' },
  { id: 'TYPED', label: 'What I typed', blurb: 'Your words on one side, what happened on the other.' },
  { id: 'HERO', label: 'Hero image', blurb: 'The picture, with the world’s name on it.' },
];

export function ShareScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  route: RootRoute<'Share'>;
}): React.JSX.Element {
  const { storyTitle, actionText, sceneText, heroImageUrl } = route.params;
  const { isGuest } = useStore();
  const displayName = route.params.displayName ?? '';

  const [artifact, setArtifact] = useState<Artifact>(heroImageUrl ? 'HERO' : 'RECAP');
  const [hideName, setHideName] = useState(isGuest);
  const [spoilerTitle, setSpoilerTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // `ViewShotRef` is declared as a View that also has `capture`, which no ref
  // object can satisfy structurally. Narrowed to the one method we call.
  const shot = useRef<React.ComponentRef<typeof ViewShot>>(null);

  const available = ARTIFACTS.filter((entry) => entry.id !== 'HERO' || Boolean(heroImageUrl));

  const share = async (): Promise<void> => {
    setBusy(true);
    setError(null);
    try {
      if (!(await Sharing.isAvailableAsync())) {
        setError('Sharing is not available on this device.');
        return;
      }
      // Captured from the very view above, so the preview is the export.
      const uri = await shot.current?.capture?.();
      if (!uri) {
        setError('That could not be shared just now.');
        return;
      }
      await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: storyTitle });
    } catch {
      setError('That could not be shared just now.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between', alignItems: 'center' }}>
        <Txt variant="h3">Share</Txt>
        <IconButton label="Close" onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl }}>
        <Stack gap={spacing.sm}>
          <Txt variant="caption" color={colors.text.secondary}>
            This is exactly what gets shared.
          </Txt>
          {/* 9:16, the shape every social surface wants (§42.2). */}
          <ViewShot
            ref={shot}
            options={{ format: 'png', quality: 0.95, result: 'tmpfile' }}
            style={{ alignSelf: 'center' }}
          >
            <ArtifactCard
              artifact={artifact}
              storyTitle={storyTitle}
              actionText={actionText}
              sceneText={sceneText}
              heroImageUrl={heroImageUrl ?? null}
              spoilerTitle={spoilerTitle.trim()}
              byline={hideName ? '' : displayName}
            />
          </ViewShot>
        </Stack>

        <Stack gap={spacing.sm}>
          <Txt variant="bodyCompact">What to share</Txt>
          <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
            {available.map((entry) => (
              <Chip
                key={entry.id}
                label={entry.label}
                selected={artifact === entry.id}
                onPress={() => setArtifact(entry.id)}
              />
            ))}
          </Row>
          <Txt variant="micro" color={colors.text.muted}>
            {available.find((entry) => entry.id === artifact)?.blurb}
          </Txt>
        </Stack>

        <Stack gap={spacing.sm}>
          <Txt variant="bodyCompact">A title that gives nothing away</Txt>
          <Txt variant="micro" color={colors.text.muted}>
            Optional. Shown instead of the world's name, so you can post a moment without spoiling it.
          </Txt>
          <SpoilerInput value={spoilerTitle} onChange={setSpoilerTitle} />
        </Stack>

        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack gap={2} style={{ flex: 1, paddingRight: spacing.md }}>
            <Txt variant="bodyCompact">Hide my name</Txt>
            <Txt variant="micro" color={colors.text.muted}>
              {displayName ? `Currently shows “${displayName}”.` : 'Nothing to hide — no name is on it.'}
            </Txt>
          </Stack>
          <Switch
            value={hideName || !displayName}
            disabled={!displayName}
            onValueChange={setHideName}
            trackColor={{ true: colors.accent.primary, false: colors.border.subtle }}
          />
        </Row>

        {error ? (
          <Txt variant="bodyCompact" color={colors.semantic.danger}>
            {error}
          </Txt>
        ) : null}

        <Button label="Share" loading={busy} loadingLabel="Preparing…" onPress={() => void share()} />
        <Txt variant="micro" color={colors.text.muted} center>
          The image is made on your phone and only leaves it when you pick somewhere to send it.
        </Txt>
      </ScrollView>
    </SafeAreaView>
  );
}

/** 9:16 at a fixed size, so the capture is predictable across devices. */
const CARD_WIDTH = 288;
const CARD_HEIGHT = 512;

function ArtifactCard({
  artifact,
  storyTitle,
  actionText,
  sceneText,
  heroImageUrl,
  spoilerTitle,
  byline,
}: {
  artifact: Artifact;
  storyTitle: string;
  actionText: string | null;
  sceneText: string;
  heroImageUrl: string | null;
  spoilerTitle: string;
  byline: string;
}): React.JSX.Element {
  const heading = spoilerTitle.length > 0 ? spoilerTitle : storyTitle;

  return (
    <View
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: colors.bg.elevated,
        borderRadius: radius.large,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border.subtle,
      }}
    >
      {artifact === 'HERO' && heroImageUrl ? (
        <Image source={{ uri: heroImageUrl }} style={{ width: '100%', height: '62%' }} resizeMode="cover" />
      ) : null}

      <Stack gap={spacing.md} style={{ padding: spacing.lg, flex: 1 }}>
        <Txt variant="micro" color={colors.accent.primary}>
          {heading.toUpperCase()}
        </Txt>

        {artifact === 'TYPED' && actionText ? (
          <>
            <Stack gap={4}>
              <Txt variant="micro" color={colors.text.muted}>
                WHAT I TYPED
              </Txt>
              <Txt variant="bodyCompact">“{trim(actionText, 140)}”</Txt>
            </Stack>
            <View style={{ height: 1, backgroundColor: colors.border.subtle }} />
            <Stack gap={4} style={{ flex: 1 }}>
              <Txt variant="micro" color={colors.text.muted}>
                WHAT HAPPENED
              </Txt>
              <Txt variant="bodyCompact" color={colors.text.secondary}>
                {trim(sceneText, 300)}
              </Txt>
            </Stack>
          </>
        ) : (
          <Txt variant={artifact === 'HERO' ? 'bodyCompact' : 'body'} style={{ flex: 1 }}>
            {trim(sceneText, artifact === 'HERO' ? 180 : 420)}
          </Txt>
        )}

        <Row style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Txt variant="micro" color={colors.text.muted}>
            {byline ? `${byline} · AniPlay` : 'AniPlay'}
          </Txt>
          {Platform.OS !== 'web' ? (
            <Txt variant="micro" color={colors.text.muted}>
              ◈
            </Txt>
          ) : null}
        </Row>
      </Stack>
    </View>
  );
}

function SpoilerInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}): React.JSX.Element {
  const { TextInput } = require('react-native') as typeof import('react-native');
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder="e.g. The thing that happened on the stair"
      placeholderTextColor={colors.text.muted}
      maxLength={60}
      accessibilityLabel="Spoiler-safe title"
      style={{
        backgroundColor: colors.bg.raised,
        borderRadius: radius.control,
        borderWidth: 1,
        borderColor: colors.border.subtle,
        color: colors.text.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        fontSize: 16,
      }}
    />
  );
}

/** Cuts at a word, never mid-word, so a card never ends in half a noun. */
function trim(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}
