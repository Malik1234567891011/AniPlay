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
} from '@aniplay/ui';
import { api, ApiError, type PlayerCharacterCard } from '../api/client.js';
import { useStore } from '../state/store.jsx';
import type { RootNavigation } from '../navigation.jsx';

/**
 * "Your characters" — every player character across every world.
 *
 * Spec §9.3 offers a generated portrait after the first session begins. This is
 * where those live: a run shown as a person, with the canon the engine actually
 * recorded for them, rather than as a save slot with a timestamp.
 */
export function CharactersScreen({ navigation }: { navigation: RootNavigation }): React.JSX.Element {
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
        <Txt variant="h2">Your characters</Txt>
        <IconButton label="Close" onPress={() => navigation.goBack()}>
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
          title="Nobody yet"
          body="Start a world and whoever you decide to be will show up here, with everything that happened to them."
          actionLabel="Browse worlds"
          onAction={() => navigation.navigate('Tabs', { screen: 'Discover' })}
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
          caught instanceof ApiError
            ? caught.message
            : "That portrait didn't come through. You weren't charged.",
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
              ? `${character.displayName}'s portrait. Tap to open the run.`
              : `No portrait for ${character.displayName} yet.`
          }
          onPress={onOpen}
        >
          {hasPortrait ? (
            <Image
              source={{ uri: `${character.portraitUrl}?v=${version}` }}
              style={{ width: 104, height: 130, borderRadius: radius.card, backgroundColor: colors.bg.raised }}
              resizeMode="cover"
            />
          ) : (
            <StoryArt
              seed={character.sessionId}
              style={{ width: 104, height: 130, borderRadius: radius.card, alignItems: 'center', justifyContent: 'center' }}
            >
              <Txt variant="micro" color={colors.text.muted} center style={{ padding: spacing.sm }}>
                No portrait yet
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
            {character.storyTitle} · {character.turnCount} turns
          </Txt>
          {character.locationName ? (
            <Txt variant="micro" color={colors.text.muted}>
              Currently at {character.locationName}
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
            WHAT HAPPENED
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
            Describe yourself however you like
          </Txt>
          <TextInput
            value={note}
            onChangeText={setNote}
            multiline
            maxLength={240}
            placeholder="e.g. Tall, buzzed hair, an archive coat I never take off, ink to the knuckle."
            placeholderTextColor={colors.text.muted}
            accessibilityLabel="Describe your appearance"
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

      <Stack gap={spacing.sm} style={{ padding: GUTTER, paddingTop: 0 }}>
        {editing ? (
          <>
            <Button
              label={`${hasPortrait ? 'Redraw' : 'Draw'} for ${character.portraitCost} credits`}
              loading={busy}
              loadingLabel="Drawing…"
              onPress={() => void generate()}
            />
            <Button label="Cancel" variant="tertiary" onPress={() => setEditing(false)} />
          </>
        ) : (
          <Button
            label={hasPortrait ? 'Redraw portrait' : 'Draw this character'}
            variant="secondary"
            onPress={() => setEditing(true)}
          />
        )}
      </Stack>
    </Card>
  );
}
