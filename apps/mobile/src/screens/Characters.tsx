import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Card,
  Chip,
  EmptyState,
  IconButton,
  Row,
  Skeleton,
  Stack,
  StoryArt,
  Txt,
  colors,
  GUTTER,
  haptic,
  radius,
  spacing,
} from '@plotbreak/ui';
import { api, ApiError, type PlayerCharacterCard } from '../api/client.js';
import { useStore } from '../state/store.jsx';
import { useT } from '../i18n/useT.js';
import type { RootNavigation } from '../navigation.jsx';

/**
 * "Your characters" — every player character across every world.
 *
 * Spec §9.3 offers a generated portrait after the first session begins. This is
 * where those live: a run shown as a person, with the canon the engine actually
 * recorded for them, rather than as a save slot with a timestamp.
 */
export function CharactersScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
  const t = useT();
  const [characters, setCharacters] = useState<PlayerCharacterCard[] | null>(null);

  const load = useCallback(async () => {
    try {
      const response = await api.myCharacters();
      setCharacters(response.characters);
    } catch {
      setCharacters([]);
    }
  }, []);

  useEffect(() => {
    void load();
    return navigation.addListener('focus', () => void load());
  }, [load, navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between' }}>
        <Txt variant="h2">{t('characters.title')}</Txt>
        <IconButton label={t('characters.close')} onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      {!characters ? (
        <Stack gap={spacing.md} style={{ padding: GUTTER }}>
          <Skeleton width="100%" height={190} />
          <Skeleton width="100%" height={190} />
        </Stack>
      ) : characters.length === 0 ? (
        <EmptyState
          title={t('characters.empty_title')}
          body={t('characters.empty_body')}
          actionLabel={t('characters.empty_action')}
          onAction={() =>
            // i18n-exempt: navigation route names, never shown to anybody
            navigation.navigate('Tabs', { screen: 'Discover' })
          }
        />
      ) : (
        <ScrollView contentContainerStyle={{ padding: GUTTER, gap: spacing.lg, paddingBottom: spacing.giant }}>
          {characters.map((character) => (
            <CharacterCard
              key={character.sessionId}
              character={character}
              onOpen={() => navigation.navigate('Session', { sessionId: character.sessionId })}
              onChanged={load}
              onNeedCredits={(shortfall) => navigation.navigate('Wallet', { shortfall })}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export function CharacterCard({
  character,
  onOpen,
  onChanged,
  onNeedCredits,
}: {
  character: PlayerCharacterCard;
  onOpen: () => void;
  onChanged: () => void;
  onNeedCredits: (shortfall: number) => void;
}): React.JSX.Element {
  const t = useT();
  const { setBalance } = useStore();
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState(character.appearanceNote);
  const [error, setError] = useState<string | null>(null);
  // Cache-bust after a regeneration so the new variant actually shows.
  const [version, setVersion] = useState(0);

  const generate = async (): Promise<void> => {
    setBusy(true);
    setError(null);
    try {
      const result = await api.generatePortrait(character.sessionId, {
        appearanceNote: note.trim().length > 0 ? note.trim() : undefined,
      });
      setBalance(result.balance);
      setVersion((v) => v + 1);
      setEditing(false);
      haptic('success');
      onChanged();
    } catch (caught) {
      haptic('error');
      if (caught instanceof ApiError && caught.code === 'INSUFFICIENT_CREDITS') {
        onNeedCredits(caught.shortfall ?? character.portraitCost);
      } else {
        setError(
          caught instanceof ApiError ? caught.message : t('characters.portrait_failed'),
        );
      }
    } finally {
      setBusy(false);
    }
  };

  const hasPortrait = character.portraitUrl !== null;

  return (
    <Card style={{ gap: spacing.lg, padding: 0, overflow: 'hidden' }} padded={false}>
      <Row gap={spacing.lg} align="flex-start" style={{ padding: GUTTER, paddingBottom: 0 }}>
        <Pressable
          accessibilityRole="imagebutton"
          accessibilityLabel={
            hasPortrait
              ? t('characters.portrait_a11y', { name: character.displayName })
              : t('characters.no_portrait_a11y', { name: character.displayName })
          }
          onPress={onOpen}
        >
          {hasPortrait ? (
            // Native 2:3, so the drawing the player paid for is not cropped on
            // the one screen that exists to show it.
            <Image
              source={{ uri: `${character.portraitUrl}?v=${version}` }}
              style={{ width: 136, height: 204, borderRadius: radius.card, backgroundColor: colors.bg.raised }}
              resizeMode="cover"
            />
          ) : (
            <StoryArt
              seed={character.sessionId}
              style={{ width: 136, height: 204, borderRadius: radius.card, alignItems: 'center', justifyContent: 'center' }}
            >
              <Txt variant="micro" color={colors.text.muted} center style={{ padding: spacing.sm }}>
                {t('characters.no_portrait_yet')}
              </Txt>
            </StoryArt>
          )}
        </Pressable>

        <Stack gap={4} style={{ flex: 1 }}>
          <Txt variant="h3">{character.displayName}</Txt>
          <Txt variant="caption" color={colors.accent.secondary}>
            {[character.archetypeName, character.pronouns].filter(Boolean).join(' · ')}
          </Txt>
          <Txt variant="micro" color={colors.text.muted}>
            {t('characters.story_and_turns', {
              title: character.storyTitle,
              count: character.turnCount,
            })}
          </Txt>
          {character.locationName ? (
            <Txt variant="micro" color={colors.text.muted}>
              {t('characters.currently_at', { location: character.locationName })}
            </Txt>
          ) : null}
        </Stack>
      </Row>

      {character.worldKnowsAboutYou ? (
        <Txt variant="bodyCompact" color={colors.text.secondary} serif style={{ paddingHorizontal: GUTTER }}>
          “{character.worldKnowsAboutYou}”
        </Txt>
      ) : null}

      {/* Engine-recorded canon, not a summary of prose. */}
      {character.canon.length > 0 ? (
        <Row gap={spacing.sm} style={{ flexWrap: 'wrap', paddingHorizontal: GUTTER }}>
          {character.canon.map((fact, index) => (
            <Chip key={index} label={fact} />
          ))}
        </Row>
      ) : null}

      {character.notableMemories.length > 0 ? (
        <Stack gap={spacing.xs} style={{ paddingHorizontal: GUTTER }}>
          <Txt variant="micro" color={colors.text.muted}>
            {t('characters.what_happened')}
          </Txt>
          {character.notableMemories.map((memory, index) => (
            <Txt key={index} variant="caption" color={colors.text.secondary}>
              · {memory}
            </Txt>
          ))}
        </Stack>
      ) : null}

      {editing ? (
        <Stack gap={spacing.sm} style={{ paddingHorizontal: GUTTER }}>
          <Txt variant="caption" color={colors.text.secondary}>
            {t('characters.appearance_label')}
          </Txt>
          <TextInput
            value={note}
            onChangeText={setNote}
            multiline
            maxLength={240}
            placeholder={t('characters.appearance_placeholder')}
            placeholderTextColor={colors.text.muted}
            accessibilityLabel={t('characters.appearance_a11y')}
            style={{
              minHeight: 84,
              padding: spacing.lg,
              borderRadius: radius.control,
              backgroundColor: colors.bg.raised,
              color: colors.text.primary,
              fontSize: 17,
              textAlignVertical: 'top',
            }}
          />
        </Stack>
      ) : null}

      {error ? (
        <Txt variant="caption" color={colors.semantic.warning} style={{ paddingHorizontal: GUTTER }}>
          {error}
        </Txt>
      ) : null}

      {/*
        A canon protagonist is not drawn.
        Nobody needs a generated Itachi; every player already has one, and this
        would be the single image in the app they can hold against the original.
        The server refuses it too, so an older build cannot spend the credits.
      */}
      {character.protagonistIsCanon ? (
        <Txt variant="caption" color={colors.text.muted} style={{ padding: GUTTER, paddingTop: 0 }}>
          {t('characters.canon_no_portrait', { name: character.displayName })}
        </Txt>
      ) : (
      <Stack gap={spacing.sm} style={{ padding: GUTTER, paddingTop: 0 }}>
        {editing ? (
          <>
            <Button
              label={t(
                hasPortrait ? 'characters.redraw_for_credits' : 'characters.draw_for_credits',
                { count: character.portraitCost },
              )}
              loading={busy}
              loadingLabel={t('characters.drawing')}
              onPress={() => void generate()}
            />
            <Button label={t('characters.cancel')} variant="tertiary" onPress={() => setEditing(false)} />
          </>
        ) : (
          <Button
            label={t(hasPortrait ? 'characters.redraw_portrait' : 'characters.draw_this_character')}
            variant="secondary"
            onPress={() => setEditing(true)}
          />
        )}
      </Stack>
      )}
    </Card>
  );
}
