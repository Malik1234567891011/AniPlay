import React, { useRef, useState } from 'react';
import { Image, Platform, ScrollView, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import type { TranslationKey } from '@aniplay/i18n';
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
import { useT } from '../i18n/useT.js';
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

/**
 * The artifacts carry catalogue keys rather than copy, because this list is
 * module-level and `useT` is a hook — the lookup has to happen in the component
 * that renders the chip, not here.
 */
const ARTIFACTS: Array<{ id: Artifact; label: TranslationKey; blurb: TranslationKey }> = [
  { id: 'RECAP', label: 'share.artifact_recap', blurb: 'share.artifact_recap_blurb' },
  { id: 'TYPED', label: 'share.artifact_typed', blurb: 'share.artifact_typed_blurb' },
  { id: 'HERO', label: 'share.artifact_hero', blurb: 'share.artifact_hero_blurb' },
];

export function ShareScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  // i18n-exempt: navigation route name in a type position, never shown to anybody
  route: RootRoute<'Share'>;
}): React.JSX.Element {
  const t = useT();
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
  const blurb = available.find((entry) => entry.id === artifact)?.blurb;

  const share = async (): Promise<void> => {
    setBusy(true);
    setError(null);
    try {
      if (!(await Sharing.isAvailableAsync())) {
        setError(t('share.unavailable'));
        return;
      }
      // Captured from the very view above, so the preview is the export.
      const uri = await shot.current?.capture?.();
      if (!uri) {
        setError(t('share.failed'));
        return;
      }
      await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: storyTitle });
    } catch {
      setError(t('share.failed'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between', alignItems: 'center' }}>
        <Txt variant="h3">{t('share.title')}</Txt>
        <IconButton label={t('share.close')} onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.xl }}>
        <Stack gap={spacing.sm}>
          <Txt variant="caption" color={colors.text.secondary}>
            {t('share.preview_note')}
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
          <Txt variant="bodyCompact">{t('share.what_to_share')}</Txt>
          <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
            {available.map((entry) => (
              <Chip
                key={entry.id}
                label={t(entry.label)}
                selected={artifact === entry.id}
                onPress={() => setArtifact(entry.id)}
              />
            ))}
          </Row>
          <Txt variant="micro" color={colors.text.muted}>
            {blurb ? t(blurb) : null}
          </Txt>
        </Stack>

        <Stack gap={spacing.sm}>
          <Txt variant="bodyCompact">{t('share.spoiler_title_label')}</Txt>
          <Txt variant="micro" color={colors.text.muted}>
            {t('share.spoiler_title_hint')}
          </Txt>
          <SpoilerInput value={spoilerTitle} onChange={setSpoilerTitle} />
        </Stack>

        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack gap={2} style={{ flex: 1, paddingRight: spacing.md }}>
            <Txt variant="bodyCompact">{t('share.hide_name')}</Txt>
            <Txt variant="micro" color={colors.text.muted}>
              {displayName
                ? t('share.currently_shows', { name: displayName })
                : t('share.nothing_to_hide')}
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

        <Button
          label={t('share.action')}
          loading={busy}
          loadingLabel={t('share.preparing')}
          onPress={() => void share()}
        />
        <Txt variant="micro" color={colors.text.muted} center>
          {t('share.privacy_note')}
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
  const t = useT();
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
                {t('share.card_what_i_typed')}
              </Txt>
              <Txt variant="bodyCompact">“{trim(actionText, 140)}”</Txt>
            </Stack>
            <View style={{ height: 1, backgroundColor: colors.border.subtle }} />
            <Stack gap={4} style={{ flex: 1 }}>
              <Txt variant="micro" color={colors.text.muted}>
                {t('share.card_what_happened')}
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
            {
              // i18n-exempt: brand name; note that app.json says AniPlay and the server says Plotbreak — an open English-side question, see docs/localization/fr-FR/research/00_HANDOFF.md
              byline ? `${byline} · AniPlay` : 'AniPlay'
            }
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
  const t = useT();
  const { TextInput } = require('react-native') as typeof import('react-native');
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={t('share.spoiler_title_placeholder')}
      placeholderTextColor={colors.text.muted}
      maxLength={60}
      accessibilityLabel={t('share.spoiler_title_a11y')}
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
  // i18n-exempt: an ellipsis and code, not copy. The cut itself is a known French bug (UI_AUDIT §2.5), tracked separately and deliberately left alone here.
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}
