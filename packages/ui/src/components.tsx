import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { colors, durations, formatCredits, outcomeColor, radius, riskColor, spacing } from './tokens.js';
import { Card, Chip, Row, Stack, Txt, haptic } from './primitives.jsx';

/**
 * Spec §26 — the component library. Each of these carries a rule from the spec
 * that is easy to lose in ad-hoc screen code: what a card may show, what a chip
 * must never rely on colour alone for, when a number may be abbreviated.
 */

// --- §26.1 StoryCoverCard --------------------------------------------------

export interface StoryCardData {
  storyId: string;
  title: string;
  fantasyLabel: string;
  creatorName: string;
  official: boolean;
  coverImage: string | null;
  tags: string[];
  runs: number;
  badges: string[];
  saved?: boolean;
}

export function StoryCoverCard({
  story,
  variant = 'rail',
  onPress,
  onLongPress,
  width,
}: {
  story: StoryCardData;
  variant?: 'rail' | 'hero' | 'row';
  onPress?: () => void;
  onLongPress?: () => void;
  width?: number;
}): React.JSX.Element {
  const isHero = variant === 'hero';
  const isRow = variant === 'row';

  // The genre says something the cover cannot always carry, and it is the
  // thing a browsing player is actually sorting on. A run count joins it only
  // when somebody has genuinely played the world, and a community creator's
  // name matters in a way "ANIMA Studio" on all nine cards does not.
  const metaLine = [
    story.tags[0] ?? null,
    story.runs > 0 ? `${formatCredits(story.runs, true)} ${story.runs === 1 ? 'run' : 'runs'}` : null,
    story.official ? null : story.creatorName,
  ]
    .filter((part): part is string => !!part)
    .join(' · ');

  // Spec §7.3 — the accessible name reads as one coherent label, not five nodes.
  //
  // Attribution is dropped when there is no creator to attribute to. The
  // Continue rail reuses this card for a run the player is already in, where
  // the byline is not the point — and passing an empty creator produced
  // "Hush House. 3 turns in. by . Community world", which both reads as broken
  // and calls an official world a community one.
  const a11yLabel = [
    story.title,
    story.fantasyLabel,
    story.creatorName ? `by ${story.creatorName}` : null,
    story.creatorName ? (story.official ? 'Official world' : 'Community world') : null,
  ]
    .filter((part): part is string => !!part)
    .join('. ');

  const cover = (
    <StoryArt
      seed={story.storyId}
      // Falls back to the deterministic placeholder when a world has no
      // generated cover yet, so a new creator world still looks intentional.
      uri={story.coverImage}
      title={story.coverImage ? undefined : story.title}
      style={{
        width: '100%',
        aspectRatio: isHero ? 16 / 10 : isRow ? 1 : 2 / 3,
        borderRadius: radius.card,
      }}
    />
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      onPress={() => {
        haptic('light');
        onPress?.();
      }}
      onLongPress={() => {
        haptic('medium');
        onLongPress?.();
      }}
      style={({ pressed }) => [
        { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.985 : 1 }] },
        isRow ? { flexDirection: 'row', gap: spacing.md, alignItems: 'center' } : { width },
      ]}
    >
      <View style={isRow ? { width: 64 } : undefined}>{cover}</View>

      <View style={[{ gap: 2, paddingTop: spacing.sm }, isRow && { flex: 1, paddingTop: 0 }]}>
        {/*
          What goes under a cover has to earn the space it takes from the art.

          "Official" used to sit here as a large accent pill on every single
          card, which at launch — when every world is official — is a label that
          distinguishes nothing while being the most visually prominent thing
          on the card. Verification still lives in the data and on world detail,
          where it means something; a badge is only worth a pill when it tells
          you which of two things you are looking at. Same reasoning for run
          counts: "0 runs" on every card is not social proof, it is an
          admission, so a count only appears once it is real.
        */}
        {story.badges.includes('TRENDING') ? (
          <Row gap={spacing.xs}>
            <Chip label="Trending" tone="warning" />
          </Row>
        ) : null}
        <Txt variant={isHero ? 'h2' : 'bodyStrong'} numberOfLines={2}>
          {story.title}
        </Txt>
        {/* Spec §7.3 — max 42 characters, enforced at authoring time. */}
        <Txt variant="caption" color={colors.text.secondary} numberOfLines={2}>
          {story.fantasyLabel}
        </Txt>
        {metaLine ? (
          <Txt variant="micro" color={colors.text.muted} numberOfLines={1}>
            {metaLine}
          </Txt>
        ) : null}
      </View>
    </Pressable>
  );
}

/**
 * A world's art, with a deterministic placeholder when it has none.
 *
 * Real cover images are generated assets served from the CDN; until an asset
 * exists this derives a stable gradient from the story id, so a world always
 * looks the same rather than flickering between random colours.
 *
 * **Pass `uri` wherever the caller has one.** It is optional so that genuine
 * empty states ("No portrait yet") can omit it — which also means forgetting it
 * fails silently and prettily, as a gradient. Three screens did: Continue, the
 * Library list and the quick-preview sheet all drew placeholders over worlds
 * whose covers had shipped, and `coverImage` was on all three payloads the whole
 * time. If a summary has cover art, this needs it.
 */
export function StoryArt({
  seed,
  title,
  uri,
  style,
  children,
}: {
  seed: string;
  title?: string;
  uri?: string | null;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}): React.JSX.Element {
  if (uri) {
    return (
      <View
        style={[
          { overflow: 'hidden', backgroundColor: colors.bg.raised, justifyContent: 'flex-end' },
          style,
        ]}
      >
        <Image source={{ uri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
        {children}
      </View>
    );
  }

  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = hash % 360;
  const alt = (hue + 48) % 360;

  return (
    <View
      style={[
        {
          overflow: 'hidden',
          backgroundColor: `hsl(${hue}, 34%, 16%)`,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border.subtle,
          justifyContent: 'flex-end',
        },
        style,
      ]}
    >
      <View
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          width: '90%',
          height: '90%',
          borderRadius: 999,
          backgroundColor: `hsl(${alt}, 40%, 26%)`,
          opacity: 0.55,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-25%',
          width: '80%',
          height: '80%',
          borderRadius: 999,
          backgroundColor: `hsl(${hue}, 44%, 12%)`,
          opacity: 0.8,
        }}
      />
      {title ? (
        <Txt
          variant="micro"
          color="rgba(247,248,250,0.55)"
          numberOfLines={2}
          style={{ padding: spacing.sm }}
        >
          {title}
        </Txt>
      ) : null}
      {children}
    </View>
  );
}

// --- §26.2 CharacterPortrait ----------------------------------------------

export function CharacterPortrait({
  name,
  uri,
  size = 96,
  speaking,
  dimmed,
  expression,
}: {
  name: string;
  uri?: string | null;
  size?: number;
  speaking?: boolean;
  dimmed?: boolean;
  expression?: string;
}): React.JSX.Element {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  return (
    <View
      accessible
      accessibilityLabel={`${name}${expression && expression !== 'neutral' ? `, ${expression}` : ''}`}
      style={{
        width: size,
        height: size * 1.25,
        borderRadius: radius.card,
        overflow: 'hidden',
        backgroundColor: colors.bg.raised,
        borderWidth: speaking ? 2 : StyleSheet.hairlineWidth,
        borderColor: speaking ? colors.accent.primary : colors.border.subtle,
        opacity: dimmed ? 0.45 : 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {uri ? (
        // Spec §26.2 — never crop the face outside its focal metadata.
        <Image source={{ uri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      ) : (
        <Txt variant="h2" color={colors.text.muted}>
          {initials}
        </Txt>
      )}
    </View>
  );
}

// --- §26.3 / §26.4 Dialogue and narration ---------------------------------

export function DialogueBlock({
  speaker,
  text,
  portraitUri,
  voiceEligible,
  onPlayVoice,
}: {
  speaker: string;
  text: string;
  portraitUri?: string | null;
  voiceEligible?: boolean;
  onPlayVoice?: () => void;
}): React.JSX.Element {
  return (
    <View accessible accessibilityLabel={`${speaker} says: ${text}`} style={{ gap: spacing.xs }}>
      <Row gap={spacing.sm}>
        <CharacterPortrait name={speaker} uri={portraitUri} size={22} />
        <Txt variant="caption" color={colors.accent.secondary}>
          {speaker}
        </Txt>
        {voiceEligible && onPlayVoice ? (
          <Pressable accessibilityRole="button" accessibilityLabel={`Play ${speaker}'s line`} onPress={onPlayVoice}>
            <Txt variant="micro" color={colors.text.muted}>
              ▶ Play
            </Txt>
          </Pressable>
        ) : null}
      </Row>
      {/* Speech marks are drawn, not stored. Both writer paths hand over the
          line itself, so what a character said is the same string whichever
          one produced it. */}
      <Txt variant="body">{`\u201C${text}\u201D`}</Txt>
    </View>
  );
}

/** Spec §26.4 — serif, comfortable measure, `Read more` past 90 visible words. */
export function NarrationBlock({ text }: { text: string }): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const words = text.split(/\s+/);
  const long = words.length > 90;
  const shown = long && !expanded ? `${words.slice(0, 90).join(' ')}…` : text;

  return (
    <View style={{ gap: spacing.xs }}>
      <Txt variant="body" serif color={colors.text.primary} style={{ maxWidth: 640 }}>
        {shown}
      </Txt>
      {long ? (
        <Pressable accessibilityRole="button" onPress={() => setExpanded((v) => !v)}>
          <Txt variant="caption" color={colors.accent.primary}>
            {expanded ? 'Read less' : 'Read more'}
          </Txt>
        </Pressable>
      ) : null}
    </View>
  );
}

// --- §26.5 StateDeltaChip --------------------------------------------------

export type DeltaKind = 'resource' | 'relationship' | 'item' | 'quest' | 'faction' | 'status';

const DELTA_GLYPH: Record<DeltaKind, string> = {
  resource: '◆',
  relationship: '♥',
  item: '▣',
  quest: '❯',
  faction: '⬢',
  status: '✦',
};

/** Spec §26.5 — icon *and* text. Never colour alone (§27.3). */
export function StateDeltaChip({
  label,
  kind = 'resource',
  positive = true,
}: {
  label: string;
  kind?: DeltaKind;
  positive?: boolean;
}): React.JSX.Element {
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        paddingVertical: 6,
        borderRadius: radius.pill,
        backgroundColor: colors.bg.raised,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: positive ? colors.semantic.success : colors.semantic.warning,
      }}
    >
      <Txt variant="micro" color={positive ? colors.semantic.success : colors.semantic.warning}>
        {DELTA_GLYPH[kind]}
      </Txt>
      <Txt variant="caption">{label}</Txt>
    </View>
  );
}

/** Overflow aggregation — at most three concurrent chips (§10.7). */
export function StateDeltaRow({
  deltas,
}: {
  deltas: Array<{ label: string; kind?: DeltaKind; positive?: boolean }>;
}): React.JSX.Element | null {
  if (deltas.length === 0) return null;
  const shown = deltas.slice(0, 3);
  const overflow = deltas.length - shown.length;

  return (
    <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
      {shown.map((delta, index) => (
        <StateDeltaChip key={index} {...delta} />
      ))}
      {overflow > 0 ? <Chip label={`${overflow} more changes`} /> : null}
    </Row>
  );
}

// --- §26.6 ActionSuggestion ------------------------------------------------

/**
 * A ready-to-play response.
 *
 * This was a horizontal chip carrying a two-line label and an engine readout —
 * "Guard him — Jun" over "Risky · 9 Legs". Two things were wrong with that. The
 * readout puts dice and resource costs on the one screen that is supposed to be
 * story, and a 280pt chip cannot hold a sentence a person would actually say,
 * so every response was compressed into a command.
 *
 * Now it is full width and stacked, because these are two to four lines of the
 * protagonist's own words. Tapping sends. The pencil opens it in the composer
 * first, so "that is basically what I wanted, but I would change one sentence"
 * is one tap away — and either route goes through the same freeform pipeline as
 * typing it by hand.
 */
export function ActionSuggestion({
  text,
  onPress,
  onEdit,
}: {
  text: string;
  onPress: () => void;
  onEdit?: () => void;
}): React.JSX.Element {
  return (
    <Row gap={spacing.sm} align="stretch">
      {onEdit ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Edit this response before sending"
          onPress={() => {
            haptic('light');
            onEdit();
          }}
          style={({ pressed }) => ({
            width: 40,
            borderRadius: radius.control,
            backgroundColor: colors.bg.raised,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Txt variant="bodyCompact" color={colors.text.muted}>
            ✎
          </Txt>
        </Pressable>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={text}
        accessibilityHint="Sends this as your action."
        onPress={() => {
          haptic('light');
          onPress();
        }}
        style={({ pressed }) => ({
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.md,
          minHeight: 44,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          borderRadius: radius.control,
          backgroundColor: colors.bg.elevated,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border.subtle,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        {/* No line clamp. The whole point of these is that the player can read
            what they are about to say before they say it. */}
        <Txt variant="bodyCompact" style={{ flex: 1 }}>
          {text}
        </Txt>
        <Txt variant="bodyCompact" color={colors.text.muted}>
          ↑
        </Txt>
      </Pressable>
    </Row>
  );
}

// --- §26.7 QualityPill -----------------------------------------------------

export function QualityPill({
  label,
  cost,
  affordable,
  onPress,
}: {
  label: string;
  cost: number;
  affordable: boolean;
  onPress: () => void;
}): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      // Spec §26.7 — the pill stays selectable when the balance is short; Send
      // is what opens the wallet with the exact shortfall.
      accessibilityLabel={`Quality: ${label}, ${cost} credits${affordable ? '' : '. Not enough credits'}`}
      onPress={() => {
        haptic('light');
        onPress();
      }}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        height: 34,
        borderRadius: radius.pill,
        backgroundColor: colors.bg.raised,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: affordable ? colors.border.subtle : colors.semantic.warning,
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <Txt variant="caption" color={colors.text.primary}>
        {label}
      </Txt>
      <Txt variant="caption" color={affordable ? colors.text.muted : colors.semantic.warning}>
        · {cost}
      </Txt>
    </Pressable>
  );
}

// --- §26.8 CheckReveal -----------------------------------------------------

/**
 * Spec §26.8 — 550–900ms, skippable by tap. The engine rolled before this
 * rendered; the animation reveals a result, it does not decide one.
 */
export function CheckReveal({
  label,
  difficulty,
  outcome,
  outcomeLabel,
  math,
  onSkip,
}: {
  label: string;
  difficulty: string;
  outcome: string;
  outcomeLabel: string;
  math?: string | null;
  onSkip?: () => void;
}): React.JSX.Element {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: durations.checkReveal,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const color = outcomeColor(outcome);
  // A world that hides its difficulty sends an empty band, and joining on it
  // unconditionally left the card reading "INVESTIGATE ·" with nothing after.
  const heading = [label, difficulty].filter((part) => part.trim().length > 0);

  return (
    <Pressable
      accessible
      accessibilityLabel={[`${label} check`, difficulty, `Result: ${outcomeLabel}.`]
        .filter((part) => part.trim().length > 0)
        .join(', ')}
      onPress={onSkip}
    >
      <Card style={{ borderColor: color, gap: spacing.xs }}>
        <Txt variant="micro" color={colors.text.muted}>
          {heading.map((part) => part.toUpperCase()).join(' · ')}
        </Txt>
        <Animated.View style={{ opacity: progress }}>
          <Txt variant="h3" color={color}>
            {outcomeLabel}
          </Txt>
        </Animated.View>
        {math ? (
          <Txt variant="micro" color={colors.text.muted}>
            {math}
          </Txt>
        ) : null}
      </Card>
    </Pressable>
  );
}

// --- §26.9 ObjectiveStrip --------------------------------------------------

/** Only rendered when the objective changed or is currently urgent (§26.9). */
export function ObjectiveStrip({
  objective,
  onPress,
}: {
  objective: string;
  onPress?: () => void;
}): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Current objective: ${objective}`}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        backgroundColor: colors.bg.elevated,
        borderRadius: radius.control,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Txt variant="micro" color={colors.accent.primary}>
        ❯
      </Txt>
      <Txt variant="caption" color={colors.text.secondary} numberOfLines={1} style={{ flex: 1 }}>
        {objective}
      </Txt>
      <Txt variant="caption" color={colors.text.muted}>
        ›
      </Txt>
    </Pressable>
  );
}

// --- §26.10 CreditBalance --------------------------------------------------

export function CreditBalance({
  balance,
  compact = true,
  onPress,
}: {
  balance: number;
  compact?: boolean;
  onPress?: () => void;
}): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${balance.toLocaleString()} credits. Opens wallet.`}
      onPress={() => {
        haptic('light');
        onPress?.();
      }}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        height: 32,
        borderRadius: radius.pill,
        backgroundColor: colors.bg.raised,
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <Txt variant="caption" color={colors.accent.primary}>
        ◈
      </Txt>
      <Txt variant="caption">{formatCredits(balance, compact)}</Txt>
    </Pressable>
  );
}

// --- Resource meters -------------------------------------------------------

export function ResourceBar({
  name,
  current,
  max,
  color,
  polarity,
}: {
  name: string;
  current: number;
  max: number;
  color: string | null;
  polarity: 'GOOD_HIGH' | 'GOOD_LOW';
}): React.JSX.Element {
  const ratio = max === 0 ? 0 : Math.max(0, Math.min(1, current / max));
  // A "bad when high" resource like Suspicion turns warning as it fills, so the
  // bar reads correctly without the player learning which meters are inverted.
  const fill =
    color ?? (polarity === 'GOOD_LOW' && ratio > 0.6 ? colors.semantic.warning : colors.accent.primary);

  return (
    <View accessible accessibilityLabel={`${name}: ${Math.round(current)} of ${max}`} style={{ gap: 4, minWidth: 88 }}>
      <Row gap={spacing.xs}>
        <Txt variant="micro" color={colors.text.muted}>
          {name}
        </Txt>
        <Txt variant="micro" color={colors.text.secondary}>
          {Math.round(current)}
        </Txt>
      </Row>
      <View style={{ height: 4, borderRadius: 2, backgroundColor: colors.bg.raised, overflow: 'hidden' }}>
        <View style={{ width: `${ratio * 100}%`, height: '100%', backgroundColor: fill }} />
      </View>
    </View>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  /** Why this row exists, when that is not obvious from its name. */
  subtitle?: string;
  action?: React.ReactNode;
}): React.JSX.Element {
  return (
    <Row style={{ justifyContent: 'space-between', paddingHorizontal: spacing.lg, alignItems: 'flex-end' }}>
      <View style={{ flex: 1, gap: 1 }}>
        <Txt variant="h3">{title}</Txt>
        {subtitle ? (
          <Txt variant="micro" color={colors.text.muted} numberOfLines={1}>
            {subtitle}
          </Txt>
        ) : null}
      </View>
      {action}
    </Row>
  );
}

function titleCase(value: string): string {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

export { Card, Chip, Row, Stack, Txt, haptic };
