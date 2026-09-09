import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import type {
  NarrativeBlock,
  QualityTier,
  SessionDetailResponse,
  SessionSceneState,
  SuggestedAction,
  TurnRecord,
} from '@aniplay/contracts';
import { QUALITY_TIERS } from '@aniplay/contracts';
import {
  ActionSuggestion,
  Button,
  Card,
  CharacterPortrait,
  CheckReveal,
  Chip,
  CreditBalance,
  DialogueBlock,
  IconButton,
  NarrationBlock,
  ObjectiveStrip,
  QualityPill,
  ResourceBar,
  Row,
  Stack,
  StateDeltaRow,
  StoryArt,
  Txt,
  colors,
  GUTTER,
  haptic,
  radius,
  spacing,
} from '@aniplay/ui';
import { api, ApiError } from '../api/client.js';
import { useStore } from '../state/store.jsx';
import type { RootNavigation, RootRoute } from '../navigation.jsx';

/**
 * GP-01 Active session — the primary gameplay UI.
 *
 * Spec §10.1 is the non-negotiable: this must not look like a black chat thread
 * or an ebook. Top to bottom it is a stage, a compact dramatic beat, and a
 * persistent composer (§10.2).
 */

interface PendingTurn {
  turnId: string;
  blocks: NarrativeBlock[];
  check: {
    label: string;
    difficulty: string;
    outcome: string;
    outcomeLabel: string;
    math: string | null;
  } | null;
  deltas: Array<{ label: string }>;
}

export function SessionScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  route: RootRoute<'Session'>;
}): React.JSX.Element {
  const { sessionId } = route.params;
  const insets = useSafeAreaInsets();
  const { wallet, qualityTier, setQualityTier, setBalance, refreshWallet, saveDraft, loadDraft } = useStore();

  const [detail, setDetail] = useState<SessionDetailResponse | null>(null);
  const [scene, setScene] = useState<SessionSceneState | null>(null);
  const [turns, setTurns] = useState<TurnRecord[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestedAction[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [pending, setPending] = useState<PendingTurn | null>(null);
  const [error, setError] = useState<{ message: string; retry: boolean } | null>(null);
  const [showQuality, setShowQuality] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [revision, setRevision] = useState(0);
  const [playerPortraitUrl, setPlayerPortraitUrl] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const transcriptRef = useRef<ScrollView>(null);

  const tier = QUALITY_TIERS[qualityTier];
  const balance = wallet?.balance ?? 0;
  const affordable = balance >= tier.costCredits;

  const load = useCallback(async () => {
    try {
      const response = await api.session(sessionId);
      setDetail(response);
      setScene(response.scene);
      setTurns(response.recentTurns);
      setSuggestions(response.suggestions);
      setRevision(response.revision);
      setError(null);
    } catch (caught) {
      setError({
        message: caught instanceof ApiError ? caught.message : 'Could not load this story.',
        retry: true,
      });
    }
  }, [sessionId]);

  useEffect(() => {
    void load();
    void loadDraft(sessionId).then(setDraft);
    void refreshWallet();
    return () => abortRef.current?.abort();
  }, [load, loadDraft, refreshWallet, sessionId]);

  // The player's own portrait, if this run has one drawn yet.
  useEffect(() => {
    const refresh = (): void => {
      void api
        .myCharacters()
        .then(({ characters }) => {
          setPlayerPortraitUrl(characters.find((c) => c.sessionId === sessionId)?.portraitUrl ?? null);
        })
        .catch(() => setPlayerPortraitUrl(null));
    };
    refresh();
    return navigation.addListener('focus', refresh);
  }, [navigation, sessionId]);

  // Spec §10.3 — the draft survives backgrounding and failed turns.
  useEffect(() => {
    const timer = setTimeout(() => void saveDraft(sessionId, draft), 400);
    return () => clearTimeout(timer);
  }, [draft, saveDraft, sessionId]);

  const send = useCallback(async () => {
    const text = draft.trim();
    if (text.length === 0 || sending) return;

    // Spec §26.7 / WL-03 — the pill stays selectable when short; Send is what
    // opens the wallet, with the exact shortfall.
    if (!affordable) {
      haptic('warning');
      navigation.navigate('Wallet', { shortfall: tier.costCredits - balance });
      return;
    }

    setSending(true);
    setError(null);
    haptic('light');

    const idempotencyKey = `${sessionId}:${revision}:${Date.now()}:${Math.random().toString(36).slice(2)}`;

    try {
      const accepted = await api.submitTurn(
        sessionId,
        { actionText: text, qualityTier, sessionRevision: revision },
        idempotencyKey,
      );

      setBalance(accepted.balanceAfterReserve);
      setDraft('');
      void saveDraft(sessionId, '');
      setPending({ turnId: accepted.turnId, blocks: [], check: null, deltas: [] });

      const controller = new AbortController();
      abortRef.current = controller;

      await api.streamTurn(
        accepted.turnId,
        accepted.streamToken,
        {
          onEvent: (event, data) => {
            if (event === 'check.resolved') {
              haptic('medium');
              setPending((current) =>
                current
                  ? {
                      ...current,
                      check: {
                        label: String(data.label ?? ''),
                        difficulty: String(data.difficultyLabel ?? ''),
                        outcome: String(data.outcome ?? ''),
                        outcomeLabel: String(data.outcomeLabel ?? ''),
                        math: (data.math as string | null) ?? null,
                      },
                    }
                  : current,
              );
            }
            if (event === 'text.delta') {
              setPending((current) =>
                current
                  ? {
                      ...current,
                      blocks: [
                        ...current.blocks,
                        {
                          type: data.type as NarrativeBlock['type'],
                          speakerId: (data.speakerId as string | null) ?? null,
                          text: String(data.text ?? ''),
                          visibility: 'GROUP',
                          voiceEligible: Boolean(data.voiceEligible),
                        },
                      ],
                    }
                  : current,
              );
              transcriptRef.current?.scrollToEnd({ animated: true });
            }
            if (event === 'state.delta') {
              setPending((current) =>
                current ? { ...current, deltas: [...current.deltas, { label: String(data.label ?? '') }] } : current,
              );
            }
            if (event === 'turn.completed') {
              if (typeof data.balance === 'number') setBalance(data.balance);
              if (Array.isArray(data.suggestions)) setSuggestions(data.suggestions as SuggestedAction[]);
              if (data.scene) setScene(data.scene as SessionSceneState);
              // Refetch so the transcript and revision come from the server,
              // which is authoritative for both.
              void api.session(sessionId).then((response) => {
                setTurns(response.recentTurns);
                setRevision(response.revision);
                setPending(null);
              });
            }
            if (event === 'turn.failed') {
              // Spec §10.8 — keep the draft, say plainly that nothing was charged.
              haptic('error');
              setDraft(text);
              setPending(null);
              setError({ message: String(data.message ?? "That turn didn't complete. You weren't charged."), retry: true });
              void refreshWallet();
            }
          },
          onError: () => {
            setPending(null);
            setDraft(text);
            setError({ message: "That turn didn't complete. You weren't charged.", retry: true });
            void refreshWallet();
          },
        },
        controller.signal,
      );
    } catch (caught) {
      setDraft(text);
      setPending(null);

      if (caught instanceof ApiError && caught.code === 'INSUFFICIENT_CREDITS') {
        navigation.navigate('Wallet', { shortfall: caught.shortfall ?? tier.costCredits });
      } else if (caught instanceof ApiError && caught.code === 'STALE_REVISION') {
        // Spec §17.4 — refresh and let the player resend deliberately.
        await load();
        setError({ message: 'This story moved on. Your action is still here — send it when ready.', retry: false });
      } else if (caught instanceof ApiError && caught.code === 'OFFLINE') {
        setError({ message: "You're offline. Your action is saved.", retry: true });
      } else {
        setError({ message: "That turn didn't complete. You weren't charged.", retry: true });
      }
    } finally {
      setSending(false);
      abortRef.current = null;
    }
  }, [
    affordable, balance, draft, load, navigation, qualityTier, refreshWallet,
    revision, saveDraft, sending, sessionId, setBalance, tier.costCredits,
  ]);

  const latest = turns.at(-1);
  const visibleBlocks = pending ? pending.blocks : (latest?.blocks ?? []);
  const visibleDeltas = pending
    ? pending.deltas
    : (latest?.stateDeltas.map((d) => ({ label: d.label })) ?? []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.base }}>
      {/* A. Session header — 56pt plus safe area (§10.2 A). */}
      <SafeAreaView edges={['top']}>
        <Row style={{ height: 56, paddingHorizontal: GUTTER, justifyContent: 'space-between' }}>
          <Row gap={spacing.sm} style={{ flex: 1 }}>
            <IconButton label="Back to library" onPress={() => navigation.goBack()}>
              <Txt variant="h2">‹</Txt>
            </IconButton>
            <View style={{ flex: 1 }}>
              <Txt variant="bodyStrong" numberOfLines={1}>
                {detail?.session.title ?? ' '}
              </Txt>
              {scene ? (
                <Txt variant="micro" color={colors.text.muted} numberOfLines={1}>
                  {scene.locationName} · {scene.worldTimeLabel}
                </Txt>
              ) : null}
            </View>
          </Row>
          <Row gap={spacing.sm}>
            <CreditBalance balance={balance} onPress={() => navigation.navigate('Wallet')} />
            <IconButton
              label="Open World Sheet"
              onPress={() => navigation.navigate('WorldSheet', { sessionId })}
            >
              <Txt variant="h3" color={colors.text.secondary}>
                ☰
              </Txt>
            </IconButton>
          </Row>
        </Row>
      </SafeAreaView>

      {/* B. Stage — 35–48% of usable height (§10.2 B). */}
      {scene ? (
        <Stage
          scene={scene}
          sessionId={sessionId}
          navigation={navigation}
          playerPortraitUrl={playerPortraitUrl}
          onOpenPortrait={() => navigation.navigate('Characters')}
        />
      ) : null}

      {/* C. Story beat / transcript (§10.2 C). */}
      <ScrollView
        ref={transcriptRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: GUTTER, gap: spacing.lg, paddingBottom: spacing.xxl }}
      >
        {turns.length > 1 && !showHistory ? (
          <Pressable accessibilityRole="button" onPress={() => setShowHistory(true)}>
            <Txt variant="caption" color={colors.accent.primary} center>
              ↑ Earlier beats
            </Txt>
          </Pressable>
        ) : null}

        {showHistory
          ? turns.slice(0, -1).map((turn) => (
              <View key={turn.turnId} style={{ opacity: 0.55, gap: spacing.sm }}>
                {turn.actionText ? <PlayerAction text={turn.actionText} /> : null}
                {turn.blocks.map((block, index) => (
                  <Block key={index} block={block} scene={scene} />
                ))}
              </View>
            ))
          : null}

        {latest?.actionText && !pending ? <PlayerAction text={latest.actionText} /> : null}

        {pending?.check ? (
          <CheckReveal
            label={pending.check.label}
            difficulty={pending.check.difficulty}
            outcome={pending.check.outcome}
            outcomeLabel={pending.check.outcomeLabel}
            math={pending.check.math}
          />
        ) : latest?.checks[0] && !pending ? (
          <CheckReveal
            label={latest.checks[0].label}
            difficulty=""
            outcome={latest.checks[0].outcome}
            outcomeLabel={outcomeText(latest.checks[0].outcome)}
            math={null}
          />
        ) : null}

        {visibleBlocks.map((block, index) => (
          <Block key={`${pending?.turnId ?? latest?.turnId}_${index}`} block={block} scene={scene} />
        ))}

        {pending && pending.blocks.length === 0 ? (
          <Row gap={spacing.sm}>
            <ActivityIndicator size="small" color={colors.text.muted} />
            {/* Spec §25.12 — an honest state, not theatrical loading copy. */}
            <Txt variant="caption" color={colors.text.muted}>
              Resolving…
            </Txt>
          </Row>
        ) : null}

        <StateDeltaRow deltas={visibleDeltas.map((d) => ({ label: d.label }))} />

        {error ? (
          <Card style={{ borderColor: colors.semantic.warning, gap: spacing.md }}>
            <Txt variant="bodyCompact">{error.message}</Txt>
            {error.retry ? (
              <Button label="Try again" variant="secondary" full={false} onPress={() => void send()} />
            ) : null}
          </Card>
        ) : null}
      </ScrollView>

      {/* D. Composer dock — persistent (§10.2 D). */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: colors.border.subtle,
            backgroundColor: colors.bg.elevated,
            paddingTop: spacing.md,
            paddingBottom: Math.max(insets.bottom, spacing.md),
          }}
        >
          {/* 0–3 suggestions above the composer (§10.4). */}
          {suggestions.length > 0 && !pending ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={suggestions}
              keyExtractor={(item, index) => `${item.intentHint}_${index}`}
              contentContainerStyle={{ paddingHorizontal: GUTTER, gap: spacing.sm, paddingBottom: spacing.md }}
              renderItem={({ item }) => (
                <ActionSuggestion
                  text={item.text}
                  risk={item.risk}
                  costLabel={item.resourceCostLabel}
                  // Tapping fills the composer; it never spends credits (§10.4).
                  onPress={() => setDraft(item.text)}
                />
              )}
            />
          ) : null}

          <Row gap={spacing.sm} style={{ paddingHorizontal: GUTTER }} align="flex-end">
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder={composerPlaceholder(scene)}
              placeholderTextColor={colors.text.muted}
              multiline
              accessibilityLabel="What do you do?"
              editable={!pending}
              style={{
                flex: 1,
                minHeight: 44,
                maxHeight: 120,
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.md,
                borderRadius: radius.control,
                backgroundColor: colors.bg.raised,
                color: colors.text.primary,
                fontSize: 17,
                lineHeight: 22,
              }}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={pending ? 'Stop' : 'Send action'}
              accessibilityState={{ disabled: draft.trim().length === 0 && !pending }}
              disabled={draft.trim().length === 0 && !pending}
              onPress={() => {
                if (pending) {
                  // Spec §10.2 D — Stop cancels client rendering only. A turn
                  // that already committed is not refunded.
                  abortRef.current?.abort();
                  setPending(null);
                  void load();
                } else {
                  void send();
                }
              }}
              style={{
                width: 44,
                height: 44,
                borderRadius: radius.control,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: pending
                  ? colors.bg.raised
                  : draft.trim().length > 0
                    ? colors.accent.primary
                    : colors.bg.raised,
              }}
            >
              <Txt
                variant="bodyStrong"
                color={pending || draft.trim().length === 0 ? colors.text.muted : colors.text.onAccent}
              >
                {pending ? '■' : '↑'}
              </Txt>
            </Pressable>
          </Row>

          <Row style={{ paddingHorizontal: GUTTER, paddingTop: spacing.sm, justifyContent: 'space-between' }}>
            <QualityPill
              label={tier.label}
              cost={tier.costCredits}
              affordable={affordable}
              onPress={() => setShowQuality(true)}
            />
            {!affordable ? (
              <Txt variant="micro" color={colors.semantic.warning}>
                {tier.costCredits - balance} more credits needed
              </Txt>
            ) : null}
          </Row>
        </View>
      </KeyboardAvoidingView>

      {showQuality ? (
        <QualitySheet
          current={qualityTier}
          balance={balance}
          onSelect={(next) => {
            void setQualityTier(next);
            setShowQuality(false);
          }}
          onClose={() => setShowQuality(false)}
        />
      ) : null}
    </View>
  );
}

/**
 * Spec §10.2 B — the stage.
 *
 * 35–48% of usable screen height, so it reads as a stage rather than a header
 * strip. Portraits stand on the floor of the frame the way a visual novel
 * composites them, and the HUD sits on a gradient scrim because white text over
 * arbitrary generated art is otherwise unreadable half the time.
 */
function Stage({
  scene,
  sessionId,
  navigation,
  playerPortraitUrl,
  onOpenPortrait,
}: {
  scene: SessionSceneState;
  sessionId: string;
  navigation: RootNavigation;
  playerPortraitUrl: string | null;
  onOpenPortrait: () => void;
}): React.JSX.Element {
  const { height } = useWindowDimensions();
  const stageHeight = Math.round(Math.max(240, Math.min(height * 0.4, 380)));

  return (
    <View style={{ height: stageHeight, backgroundColor: colors.bg.elevated }}>
      <StoryArt seed={scene.locationId} uri={scene.stageImage} style={StyleSheetAbsolute} />

      {/* Characters stand on the floor of the frame, above the HUD. */}
      <View
        style={{
          position: 'absolute',
          left: GUTTER,
          right: GUTTER,
          bottom: 96,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: spacing.md,
        }}
      >
        {scene.presentCharacters.map((character) => (
          <CharacterPortrait
            key={character.id}
            name={character.name}
            uri={character.portrait}
            size={Math.min(96, (stageHeight - 150) / 1.25)}
            speaking={character.speaking}
            expression={character.expression}
          />
        ))}
      </View>

      {/* You, in the scene. The whole point is that this run is yours, so the
          person it happened to should be on screen. Tapping opens the portrait
          sheet, which is also where an unset one gets drawn. */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          playerPortraitUrl ? 'Your character. Tap to view or redraw.' : 'Draw your character.'
        }
        onPress={onOpenPortrait}
        style={{ position: 'absolute', right: GUTTER, bottom: 96 }}
      >
        {playerPortraitUrl ? (
          <CharacterPortrait
            name="You"
            uri={playerPortraitUrl}
            size={Math.min(76, (stageHeight - 170) / 1.25)}
          />
        ) : (
          <View
            style={{
              width: 56,
              height: 70,
              borderRadius: radius.card,
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.border.strong,
              backgroundColor: 'rgba(11,13,18,0.6)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Txt variant="micro" color={colors.text.muted} center>
              Draw{'\n'}yourself
            </Txt>
          </View>
        )}
      </Pressable>

      {/* Scrim: generated art is unpredictable, so the HUD brings its own contrast. */}
      <LinearGradient
        colors={['transparent', 'rgba(11,13,18,0.55)', 'rgba(11,13,18,0.95)']}
        locations={[0, 0.55, 1]}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 150 }}
        pointerEvents="none"
      />

      <View
        accessible
        // Spec §27.4 — the stage is one semantic group, not a maze of nodes.
        accessibilityLabel={`Scene: ${scene.locationName}. ${
          scene.presentCharacters.length > 0
            ? `${scene.presentCharacters.map((c) => c.name).join(' and ')} present.`
            : 'Nobody else here.'
        }`}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: GUTTER, gap: spacing.md }}
      >
        <Row gap={spacing.xl} style={{ flexWrap: 'wrap' }}>
          {scene.resources.map((resource) => (
            <ResourceBar key={resource.id} {...resource} />
          ))}
        </Row>

        {scene.objective ? (
          <ObjectiveStrip
            objective={scene.objective}
            onPress={() => navigation.navigate('WorldSheet', { sessionId, tab: 'quests' })}
          />
        ) : null}
      </View>

      {/* Encounter HUD — qualitative only, never over the character art (§13.4). */}
      {scene.encounter ? (
        <View style={{ position: 'absolute', top: spacing.md, left: GUTTER, right: GUTTER }}>
          <Chip label={scene.encounter.objective} tone="danger" />
        </View>
      ) : null}
    </View>
  );
}

const StyleSheetAbsolute = { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0 };

function Block({ block, scene }: { block: NarrativeBlock; scene: SessionSceneState | null }): React.JSX.Element {
  if (block.type === 'DIALOGUE') {
    const character = scene?.presentCharacters.find((c) => c.id === block.speakerId);
    return (
      <DialogueBlock
        speaker={block.speakerId === 'player' ? 'You' : (character?.name ?? block.speakerId ?? 'Someone')}
        text={block.text}
        portraitUri={character?.portrait}
        voiceEligible={block.voiceEligible}
      />
    );
  }
  if (block.type === 'SYSTEM') {
    return (
      <Txt variant="caption" color={colors.text.muted}>
        {block.text}
      </Txt>
    );
  }
  return <NarrationBlock text={block.text} />;
}

function PlayerAction({ text }: { text: string }): React.JSX.Element {
  return (
    <View
      accessible
      accessibilityLabel={`You: ${text}`}
      style={{
        alignSelf: 'flex-end',
        maxWidth: '85%',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: radius.card,
        backgroundColor: colors.bg.raised,
      }}
    >
      <Txt variant="bodyCompact" color={colors.text.secondary}>
        {text}
      </Txt>
    </View>
  );
}

/** GP-02 — the tier sheet. Copy describes presentation, never dice (§20.3). */
function QualitySheet({
  current,
  balance,
  onSelect,
  onClose,
}: {
  current: QualityTier;
  balance: number;
  onSelect: (tier: QualityTier) => void;
  onClose: () => void;
}): React.JSX.Element {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 200, useNativeDriver: true }).start();
  }, [fade]);

  return (
    <View style={{ position: 'absolute', inset: 0, justifyContent: 'flex-end' }}>
      <Pressable
        accessibilityLabel="Close quality selector"
        style={{ position: 'absolute', inset: 0, backgroundColor: colors.scrim }}
        onPress={onClose}
      />
      <Animated.View style={{ opacity: fade }}>
        <SafeAreaView
          edges={['bottom']}
          style={{
            backgroundColor: colors.bg.elevated,
            borderTopLeftRadius: radius.large,
            borderTopRightRadius: radius.large,
          }}
        >
          <Stack gap={spacing.lg} style={{ padding: GUTTER }}>
            <Stack gap={spacing.xs}>
              <Txt variant="h2">Turn quality</Txt>
              <Txt variant="caption" color={colors.text.secondary}>
                Higher tiers buy richer direction and better visuals. Every tier rolls the same dice —
                paying more never changes an outcome.
              </Txt>
            </Stack>

            {Object.values(QUALITY_TIERS).map((tier) => {
              const selected = tier.id === current;
              const affordable = balance >= tier.costCredits;
              return (
                <Pressable
                  key={tier.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  accessibilityLabel={`${tier.label}, ${tier.costCredits} credits. ${tier.promise}`}
                  onPress={() => onSelect(tier.id)}
                >
                  <Card style={{ borderColor: selected ? colors.accent.primary : colors.border.subtle }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <Stack gap={2} style={{ flex: 1 }}>
                        <Txt variant="bodyStrong" color={selected ? colors.accent.primary : colors.text.primary}>
                          {tier.label}
                        </Txt>
                        <Txt variant="caption" color={colors.text.secondary}>
                          {tier.promise}
                        </Txt>
                        {tier.heroImageEligible ? (
                          <Txt variant="micro" color={colors.text.muted}>
                            Can generate a hero frame
                          </Txt>
                        ) : null}
                      </Stack>
                      <Txt variant="bodyStrong" color={affordable ? colors.text.primary : colors.semantic.warning}>
                        {tier.costCredits}
                      </Txt>
                    </Row>
                  </Card>
                </Pressable>
              );
            })}
          </Stack>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

/** Spec §10.3 — the placeholder varies with context. */
function composerPlaceholder(scene: SessionSceneState | null): string {
  if (scene?.encounter) return 'What do you do?';
  if ((scene?.presentCharacters.length ?? 0) > 0) return 'Say or do anything…';
  return 'What do you do?';
}

function outcomeText(outcome: string): string {
  return outcome
    .split('_')
    .map((part, index) => (index === 0 ? part.charAt(0) + part.slice(1).toLowerCase() : part.toLowerCase()))
    .join(' ');
}
