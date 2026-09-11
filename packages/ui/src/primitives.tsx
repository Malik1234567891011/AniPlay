import React, { useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import {
  colors,
  durations,
  HIT_SLOP,
  MIN_TOUCH_TARGET,
  radius,
  spacing,
  type,
  type HapticKind,
} from './tokens.js';

/** Spec §25.11 — respects OS settings via the Haptics module; never sole feedback. */
export function haptic(kind: HapticKind): void {
  if (Platform.OS === 'web') return;
  switch (kind) {
    case 'light':
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'medium':
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case 'warning':
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      break;
    case 'error':
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      break;
    case 'success':
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
  }
}

// --- Text ------------------------------------------------------------------

type Variant = keyof typeof type;

export interface TxtProps extends TextProps {
  variant?: Variant;
  color?: string;
  center?: boolean;
  serif?: boolean;
}

export function Txt({
  variant = 'body',
  color = colors.text.primary,
  center,
  serif,
  style,
  ...rest
}: TxtProps): React.JSX.Element {
  return (
    <Text
      {...rest}
      style={[
        type[variant],
        { color },
        center && { textAlign: 'center' },
        // i18n-exempt: a font family name, not copy
        serif && { fontFamily: Platform.select({ ios: 'Georgia', default: 'serif' }) },
        style,
      ]}
    />
  );
}

// --- Buttons (§25.8) -------------------------------------------------------

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  label: string;
  /** Copy shown while `loading`. Never replace the label with a bare spinner. */
  loadingLabel?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'dangerQuiet';
  size?: 'large' | 'medium';
  loading?: boolean;
  full?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  hapticKind?: HapticKind;
}

export function Button({
  label,
  loadingLabel,
  variant = 'primary',
  size = 'large',
  loading = false,
  full = true,
  icon,
  style,
  disabled,
  hapticKind = 'light',
  onPress,
  ...rest
}: ButtonProps): React.JSX.Element {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = useCallback(
    (to: number) => {
      Animated.timing(scale, {
        toValue: to,
        duration: durations.instant,
        useNativeDriver: true,
      }).start();
    },
    [scale],
  );

  const isDisabled = disabled || loading;
  const height = size === 'large' ? 50 : 46;

  const palette = {
    primary: { bg: colors.accent.primary, fg: colors.text.onAccent, border: 'transparent' },
    secondary: { bg: colors.bg.raised, fg: colors.text.primary, border: colors.border.subtle },
    tertiary: { bg: 'transparent', fg: colors.text.secondary, border: 'transparent' },
    danger: { bg: colors.semantic.danger, fg: colors.text.onAccent, border: 'transparent' },
    // Reads as destructive without competing with the screen's real primary.
    dangerQuiet: { bg: 'transparent', fg: colors.semantic.danger, border: colors.semantic.danger },
  }[variant];

  return (
    <Animated.View style={[{ transform: [{ scale }] }, full && { alignSelf: 'stretch' }, style]}>
      <Pressable
        {...rest}
        accessibilityRole="button"
        accessibilityLabel={loading ? (loadingLabel ?? label) : label}
        accessibilityState={{ disabled: !!isDisabled, busy: loading }}
        disabled={isDisabled}
        onPressIn={() => animate(0.98)}
        onPressOut={() => animate(1)}
        onPress={(event) => {
          if (!isDisabled) haptic(hapticKind);
          onPress?.(event);
        }}
        style={{
          minHeight: height,
          borderRadius: radius.control,
          backgroundColor: palette.bg,
          borderWidth: palette.border === 'transparent' ? 0 : StyleSheet.hairlineWidth,
          borderColor: palette.border,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: spacing.sm,
          paddingHorizontal: spacing.xl,
          opacity: isDisabled ? 0.45 : 1,
        }}
      >
        {loading ? <ActivityIndicator size="small" color={palette.fg} /> : icon}
        <Txt variant="bodyStrong" color={palette.fg}>
          {loading ? (loadingLabel ?? label) : label}
        </Txt>
      </Pressable>
    </Animated.View>
  );
}

/** Icon-only control. Always meets the 44pt target even when the glyph is smaller. */
export function IconButton({
  label,
  children,
  onPress,
  style,
}: {
  label: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={HIT_SLOP}
      onPress={() => {
        haptic('light');
        onPress?.();
      }}
      style={({ pressed }) => [
        {
          minWidth: MIN_TOUCH_TARGET,
          minHeight: MIN_TOUCH_TARGET,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.6 : 1,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

// --- Surfaces --------------------------------------------------------------

export function Card({
  children,
  style,
  padded = true,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
}): React.JSX.Element {
  return (
    <View
      style={[
        {
          backgroundColor: colors.bg.elevated,
          borderRadius: radius.card,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border.subtle,
        },
        padded && { padding: spacing.lg },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function Divider({ style }: { style?: StyleProp<ViewStyle> }): React.JSX.Element {
  return (
    <View
      style={[{ height: StyleSheet.hairlineWidth, backgroundColor: colors.border.subtle }, style]}
    />
  );
}

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Chip({
  label,
  selected,
  onPress,
  tone = 'neutral',
  icon,
  style,
  textStyle,
}: ChipProps): React.JSX.Element {
  const toneColor = {
    neutral: colors.text.secondary,
    accent: colors.accent.primary,
    success: colors.semantic.success,
    warning: colors.semantic.warning,
    danger: colors.semantic.danger,
  }[tone];

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.xs,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          borderRadius: radius.pill,
          backgroundColor: selected ? colors.accent.primary : colors.bg.raised,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: selected ? colors.accent.primary : colors.border.subtle,
        },
        style,
      ]}
    >
      {icon}
      <Txt
        variant="caption"
        color={selected ? colors.text.onAccent : toneColor}
        style={textStyle}
      >
        {label}
      </Txt>
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: !!selected }}
      hitSlop={HIT_SLOP}
      onPress={() => {
        haptic('light');
        onPress();
      }}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {content}
    </Pressable>
  );
}

/**
 * Spec §26.11 — every empty state has a plain explanation and one useful action.
 * No shame or fear copy.
 */
export function EmptyState({
  title,
  body,
  actionLabel,
  onAction,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}): React.JSX.Element {
  return (
    <View style={{ alignItems: 'center', paddingVertical: spacing.giant, paddingHorizontal: spacing.xxl, gap: spacing.md }}>
      <Txt variant="h3" center>
        {title}
      </Txt>
      <Txt variant="bodyCompact" color={colors.text.secondary} center>
        {body}
      </Txt>
      {actionLabel && onAction ? (
        <Button label={actionLabel} variant="secondary" full={false} onPress={onAction} style={{ marginTop: spacing.sm }} />
      ) : null}
    </View>
  );
}

/** Spec §25.12 — skeletons for catalog loading, never a fake progress narrative. */
export function Skeleton({
  width,
  height,
  radius: r = radius.card,
  style,
}: {
  width: number | `${number}%`;
  height: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}): React.JSX.Element {
  const pulse = useRef(new Animated.Value(0.4)).current;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.8, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[{ width, height, borderRadius: r, backgroundColor: colors.bg.raised, opacity: pulse }, style]}
    />
  );
}

export function Row({
  children,
  gap = spacing.sm,
  style,
  align = 'center',
}: {
  children: React.ReactNode;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  align?: ViewStyle['alignItems'];
}): React.JSX.Element {
  return <View style={[{ flexDirection: 'row', alignItems: align, gap }, style]}>{children}</View>;
}

export function Stack({
  children,
  gap = spacing.md,
  style,
}: {
  children: React.ReactNode;
  gap?: number;
  style?: StyleProp<ViewStyle>;
}): React.JSX.Element {
  return <View style={[{ gap }, style]}>{children}</View>;
}

// --- Text helpers ----------------------------------------------------------

/**
 * Splits authored prose into paragraphs.
 *
 * Long-form copy (a premise, a creator note, a recap) is authored with blank
 * lines between thoughts. React Native will render a raw `\n\n` as a bare line
 * break, which reads as an accident rather than a paragraph, so callers map
 * this over their own `Stack` and get real spacing between them.
 *
 * Tolerant on purpose: single newlines, trailing whitespace and empty
 * paragraphs from a creator's text field all collapse away rather than
 * producing a gap with nothing in it.
 */
export function toParagraphs(text: string): string[] {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter((part) => part.length > 0);
  // A single unbroken string is still one paragraph, never zero.
  return paragraphs.length > 0 ? paragraphs : [];
}
