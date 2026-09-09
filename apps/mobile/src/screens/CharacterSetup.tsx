import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StoryDetailResponse } from '@aniplay/contracts';
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
import { api, ApiError } from '../api/client.js';
import type { RootNavigation, RootRoute } from '../navigation.jsx';

/**
 * CS-01 / CS-02 — character setup.
 *
 * Spec §9.1 — enough identity for the world to react, without setup fatigue.
 * The default path is under 90 seconds and only the display name is required.
 *
 * Every preset here has a freeform escape hatch. A fixed list of archetypes and
 * origins is a shortcut for players who want one, never a cage for players who
 * had something specific in mind — and the engine treats a written answer
 * exactly as seriously as a chosen one.
 */

const CUSTOM = '__custom__';

export function CharacterSetupScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  route: RootRoute<'CharacterSetup'>;
}): React.JSX.Element {
  const { storyId } = route.params;
  const [detail, setDetail] = useState<StoryDetailResponse | null>(null);
  const [advanced, setAdvanced] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [about, setAbout] = useState('');
  const [appearance, setAppearance] = useState('');
  const [archetypeId, setArchetypeId] = useState<string | null>(null);
  const [customArchetype, setCustomArchetype] = useState('');
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [customChoices, setCustomChoices] = useState<Record<string, string>>({});

  useEffect(() => {
    void api.storyDetail(storyId).then(setDetail);
  }, [storyId]);

  const archetype = detail?.archetypes.find((a) => a.id === archetypeId) ?? null;
  const usingCustomArchetype = archetypeId === CUSTOM;
  const canStart = displayName.trim().length > 0 && !starting;

  const start = async (): Promise<void> => {
    if (!detail) return;
    setStarting(true);
    setError(null);

    // A written answer is stored alongside the structured ones, so the director
    // sees it as canon rather than as an unparsed leftover.
    const advancedValues: Record<string, string> = {};
    for (const [fieldId, value] of Object.entries(choices)) {
      advancedValues[fieldId] = value === CUSTOM ? (customChoices[fieldId] ?? '').trim() : value;
    }
    if (appearance.trim().length > 0) advancedValues.appearance = appearance.trim();
    if (usingCustomArchetype && customArchetype.trim().length > 0) {
      advancedValues.customArchetype = customArchetype.trim();
    }

    try {
      const session = await api.createSession(storyId, {
        identity: {
          displayName: displayName.trim(),
          pronouns: pronouns.trim() || 'they/them',
          ageBand: null,
          // A custom archetype grants no mechanical package, so writing your own
          // is a narrative choice rather than a way to dodge the stat budget.
          archetypeId: usingCustomArchetype ? null : archetypeId,
          worldKnowsAboutYou: about.trim().slice(0, 300),
          advanced: advancedValues,
          portraitAssetId: null,
        },
        usedQuickSetup: !advanced,
      });
      navigation.replace('Session', { sessionId: session.session.sessionId });
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Could not start the story.');
      setStarting(false);
    }
  };

  const advancedFields = detail?.setupFields.filter((f) => f.advanced && f.id !== 'appearance') ?? [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between' }}>
          <IconButton label="Back" onPress={() => navigation.goBack()}>
            <Txt variant="h2">‹</Txt>
          </IconButton>
          <Txt variant="caption" color={colors.text.muted}>
            {detail?.story.title ?? ''}
          </Txt>
          <View style={{ width: 44 }} />
        </Row>

        <ScrollView
          contentContainerStyle={{ padding: GUTTER, gap: spacing.xxl, paddingBottom: spacing.giant }}
          keyboardShouldPersistTaps="handled"
        >
          <Stack gap={spacing.sm}>
            <Txt variant="display">Who are you?</Txt>
            <Txt variant="bodyCompact" color={colors.text.secondary}>
              Only your name is required. Everything else is yours to invent, and the world will use whatever
              you give it.
            </Txt>
          </Stack>

          <Stack gap={spacing.lg}>
            <Field
              label="What do they call you?"
              value={displayName}
              onChange={setDisplayName}
              placeholder={placeholderFor(detail, 'displayName', 'e.g. Malik Sarrow')}
              maxLength={40}
              required
            />
            <Field
              label="Pronouns"
              value={pronouns}
              onChange={setPronouns}
              placeholder={placeholderFor(detail, 'pronouns', 'e.g. he/him — or write anything')}
              maxLength={24}
            />
          </Stack>

          {(detail?.archetypes.length ?? 0) > 0 ? (
            <Stack gap={spacing.md}>
              <Txt variant="h3">How did you get this far?</Txt>
              <Stack gap={spacing.sm}>
                {detail?.archetypes.map((option) => {
                  const selected = archetypeId === option.id;
                  return (
                    <Pressable
                      key={option.id}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      accessibilityLabel={`${option.name}. ${option.blurb}`}
                      onPress={() => setArchetypeId(selected ? null : option.id)}
                    >
                      <Card
                        style={{
                          borderColor: selected ? colors.accent.primary : colors.border.subtle,
                          gap: spacing.xs,
                        }}
                      >
                        <Txt variant="bodyStrong" color={selected ? colors.accent.primary : colors.text.primary}>
                          {option.name}
                        </Txt>
                        <Txt variant="caption" color={colors.text.secondary}>
                          {option.blurb}
                        </Txt>
                      </Card>
                    </Pressable>
                  );
                })}

                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected: usingCustomArchetype }}
                  accessibilityLabel="Write your own background"
                  onPress={() => setArchetypeId(usingCustomArchetype ? null : CUSTOM)}
                >
                  <Card
                    style={{
                      borderColor: usingCustomArchetype ? colors.accent.primary : colors.border.subtle,
                      borderStyle: 'dashed',
                      gap: spacing.xs,
                    }}
                  >
                    <Txt variant="bodyStrong" color={usingCustomArchetype ? colors.accent.primary : colors.text.primary}>
                      Something else
                    </Txt>
                    <Txt variant="caption" color={colors.text.secondary}>
                      Write your own background instead of picking one.
                    </Txt>
                  </Card>
                </Pressable>
              </Stack>

              {usingCustomArchetype ? (
                <Field
                  label="So what did you do?"
                  value={customArchetype}
                  onChange={setCustomArchetype}
                  placeholder="e.g. I ran messages for the lower-city courts until someone noticed I could read the seals."
                  maxLength={240}
                  multiline
                />
              ) : null}
            </Stack>
          ) : null}

          <Field
            label="What should the world know about you?"
            value={about}
            onChange={setAbout}
            placeholder={placeholderFor(
              detail,
              'worldKnowsAboutYou',
              'e.g. I transferred in a term late and nobody will say who signed for me.',
            )}
            maxLength={300}
            multiline
          />

          {/* Drives the generated portrait, so it earns a place in the fast path. */}
          <Field
            label="What do you look like?"
            hint="Used if you generate a portrait later. Skip it and we'll go on what the world sees."
            value={appearance}
            onChange={setAppearance}
            placeholder={placeholderFor(
              detail,
              'appearance',
              'e.g. Short, dark hair cut badly by myself, a coat two sizes too big.',
            )}
            maxLength={240}
            multiline
          />

          {advanced ? (
            <Stack gap={spacing.lg}>
              <Txt variant="h3">More about you</Txt>
              {advancedFields.map((field) =>
                field.kind === 'CHOICE' ? (
                  <Stack key={field.id} gap={spacing.sm}>
                    <Txt variant="caption" color={colors.text.secondary}>
                      {field.label}
                    </Txt>
                    <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
                      {field.options.map((option) => (
                        <Chip
                          key={option.id}
                          label={option.label}
                          selected={choices[field.id] === option.id}
                          onPress={() =>
                            setChoices((current) => ({
                              ...current,
                              [field.id]: current[field.id] === option.id ? '' : option.id,
                            }))
                          }
                        />
                      ))}
                      {/* Every preset list ends in an escape hatch. */}
                      <Chip
                        label="Something else"
                        selected={choices[field.id] === CUSTOM}
                        onPress={() =>
                          setChoices((current) => ({
                            ...current,
                            [field.id]: current[field.id] === CUSTOM ? '' : CUSTOM,
                          }))
                        }
                      />
                    </Row>
                    {choices[field.id] === CUSTOM ? (
                      <TextInput
                        value={customChoices[field.id] ?? ''}
                        onChangeText={(text) =>
                          setCustomChoices((current) => ({ ...current, [field.id]: text }))
                        }
                        placeholder="Write your own answer"
                        placeholderTextColor={colors.text.muted}
                        maxLength={field.maxLength}
                        accessibilityLabel={`${field.label}, your own answer`}
                        style={inputStyle(false)}
                      />
                    ) : null}
                  </Stack>
                ) : (
                  <Field
                    key={field.id}
                    label={field.label}
                    value={customChoices[field.id] ?? ''}
                    onChange={(text) => setCustomChoices((current) => ({ ...current, [field.id]: text }))}
                    placeholder={field.placeholder}
                    maxLength={field.maxLength}
                  />
                ),
              )}
            </Stack>
          ) : null}

          {/* Spec §9.4 — a tiny canon summary, never a stat block. */}
          {displayName.trim().length > 0 ? (
            <Card>
              <Txt variant="caption" color={colors.text.muted}>
                YOU'LL ENTER AS
              </Txt>
              <Txt variant="bodyStrong" style={{ marginTop: spacing.xs }}>
                {[
                  displayName.trim(),
                  usingCustomArchetype ? customArchetype.trim().split(/[.,]/)[0] : archetype?.name,
                ]
                  .filter((part) => part && part.length > 0)
                  .join(' · ')}
              </Txt>
            </Card>
          ) : null}

          {error ? (
            <Txt variant="bodyCompact" color={colors.semantic.danger}>
              {error}
            </Txt>
          ) : null}
        </ScrollView>

        <SafeAreaView
          edges={['bottom']}
          style={{
            paddingHorizontal: GUTTER,
            gap: spacing.sm,
            borderTopWidth: 1,
            borderTopColor: colors.border.subtle,
            paddingTop: spacing.md,
          }}
        >
          <Button
            label="Enter"
            loading={starting}
            loadingLabel="Entering…"
            disabled={!canStart}
            hapticKind="medium"
            onPress={() => void start()}
          />
          {advancedFields.length > 0 ? (
            <Button
              label={advanced ? 'Use quick setup' : 'Customize more'}
              variant="tertiary"
              onPress={() => setAdvanced((v) => !v)}
            />
          ) : null}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/** Prefers the story's own authored example over the generic fallback. */
function placeholderFor(
  detail: StoryDetailResponse | null,
  fieldId: string,
  fallback: string,
): string {
  const authored = detail?.setupFields.find((f) => f.id === fieldId)?.placeholder;
  return authored && authored.length > 0 ? authored : fallback;
}

function inputStyle(multiline: boolean): object {
  return {
    minHeight: multiline ? 88 : 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.control,
    backgroundColor: colors.bg.elevated,
    color: colors.text.primary,
    fontSize: 17,
    lineHeight: 23,
    textAlignVertical: multiline ? ('top' as const) : ('center' as const),
  };
}

function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
  maxLength,
  multiline,
  required,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  multiline?: boolean;
  required?: boolean;
}): React.JSX.Element {
  return (
    <Stack gap={spacing.sm}>
      <Row style={{ justifyContent: 'space-between' }} align="flex-start">
        <Stack gap={2} style={{ flex: 1, paddingRight: spacing.md }}>
          <Txt variant="caption" color={colors.text.secondary}>
            {label}
            {required ? ' *' : ''}
          </Txt>
          {hint ? (
            <Txt variant="micro" color={colors.text.muted}>
              {hint}
            </Txt>
          ) : null}
        </Stack>
        {maxLength && value.length > maxLength * 0.7 ? (
          <Txt variant="micro" color={colors.text.muted}>
            {value.length}/{maxLength}
          </Txt>
        ) : null}
      </Row>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        maxLength={maxLength}
        multiline={multiline}
        accessibilityLabel={label}
        style={inputStyle(!!multiline)}
      />
    </Stack>
  );
}
