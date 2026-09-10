import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { SetupArchetype, StoryDetailResponse } from '@aniplay/contracts';
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
  const archetypeField = detail?.setupFields.find((f) => f.kind === 'ARCHETYPE') ?? null;
  const usingCustomArchetype = archetypeId === CUSTOM;
  /**
   * Some worlds already know who you are.
   *
   * Itachi's own premise reads "you are thirteen, you are the best shinobi your
   * clan has produced in a generation" — and this screen was still asking the
   * player to type that name, invent an appearance and choose pronouns, with
   * placeholders describing Itachi back at them. It was asking the player to
   * author a character the story had written.
   *
   * Nine Weeks is why this is a per-world flag and not a rule: there you are an
   * unnamed person returning to a summer job, and inventing yourself is the
   * premise. Both are right; they are different stories.
   */
  const named = detail?.protagonist?.kind === 'NAMED';
  const canonName = detail?.protagonist?.name?.trim() ?? '';
  const effectiveName = named ? canonName : displayName.trim();
  const canStart = effectiveName.length > 0 && !starting;

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
    const look = named ? (detail?.protagonist?.description ?? '') : appearance;
    if (look.trim().length > 0) advancedValues.appearance = look.trim();
    if (usingCustomArchetype && customArchetype.trim().length > 0) {
      advancedValues.customArchetype = customArchetype.trim();
    }

    try {
      const session = await api.createSession(storyId, {
        identity: {
          displayName: effectiveName,
          pronouns: (named ? detail?.protagonist?.pronouns : pronouns.trim()) || 'they/them',
          ageBand: null,
          // Spec §9.4 — a background you wrote is worth the same as one we
          // wrote. `null` here no longer means "no mechanics": the server reads
          // what was written in `advanced.customArchetype` and spends the same
          // budget the authored archetypes were written to.
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
            <Txt variant="display">
              {named ? (detail?.protagonist?.setupHeading || `You are ${canonName}.`) : 'Who are you?'}
            </Txt>
            <Txt variant="bodyCompact" color={colors.text.secondary}>
              {named
                ? 'This one you already are. What is left to decide is what you became — and after that, ' +
                  'everything is open.'
                : 'Only your name is required. Everything else is yours to invent, and the world will use ' +
                  'whatever you give it.'}
            </Txt>
          </Stack>

          {named ? null : (
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
          )}

          {(detail?.archetypes.length ?? 0) > 0 ? (
            <Stack gap={spacing.md}>
              {/*
                The heading and the explainer come from the story, because the
                screen has to say what the system is before it asks you to pick
                inside it. A question on its own is not an explanation.
              */}
              <Stack gap={spacing.xs}>
                <Txt variant="h3">{archetypeField?.label ?? 'What kind of character are you?'}</Txt>
                {archetypeField?.helpText ? (
                  <Txt variant="bodyCompact" color={colors.text.secondary}>
                    {archetypeField.helpText}
                  </Txt>
                ) : null}
              </Stack>
              <Stack gap={spacing.sm}>
                {detail?.archetypes.map((option) => {
                  const selected = archetypeId === option.id;
                  return (
                    <Pressable
                      key={option.id}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      accessibilityLabel={`${option.name}. ${option.role}. ${option.summary}`}
                      onPress={() => setArchetypeId(selected ? null : option.id)}
                    >
                      <Card
                        style={{
                          borderColor: selected ? colors.accent.primary : colors.border.subtle,
                          gap: spacing.sm,
                        }}
                      >
                        {/* Layer 1: what this is, in words that need no lore. */}
                        <Row style={{ gap: spacing.sm, alignItems: 'baseline', flexWrap: 'wrap' }}>
                          <Txt variant="bodyStrong" color={selected ? colors.accent.primary : colors.text.primary}>
                            {option.name}
                          </Txt>
                          <Txt variant="caption" color={colors.text.muted}>
                            {option.role}
                          </Txt>
                        </Row>
                        <Txt variant="bodyCompact" color={colors.text.primary}>
                          {option.summary}
                        </Txt>
                        <Row style={{ gap: spacing.xs, flexWrap: 'wrap' }}>
                          {option.playstyle.map((tag) => (
                            <Chip key={tag} label={tag} />
                          ))}
                        </Row>

                        {/* What it actually does, only once you are looking at it. */}
                        {selected ? <GrantList grants={option.grants} /> : null}

                        {/* Layer 2: the world's voice. Never carrying the meaning. */}
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
                    <Txt variant="bodyCompact" color={colors.text.primary}>
                      Describe your own background instead. The world takes it as canon — but it grants no
                      stats, skills or techniques, so you start with none of the packages above.
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

          {/*
            Drives the generated portrait, so it earns a place in the fast path
            — unless the world already knows what this person looks like, in
            which case asking is the fourth-wall break: Itachi's placeholder for
            this field was a description of Itachi.
          */}
          {named ? null : (
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
          )}

          {advanced ? (
            <Stack gap={spacing.lg}>
              <Txt variant="h3">More about you</Txt>
              {advancedFields.map((field) =>
                field.kind === 'CHOICE' ? (
                  <Stack key={field.id} gap={spacing.sm}>
                    <Txt variant="bodyCompact">{field.label}</Txt>
                    {field.helpText ? (
                      <Txt variant="caption" color={colors.text.secondary}>
                        {field.helpText}
                      </Txt>
                    ) : null}
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
          {effectiveName.length > 0 ? (
            <Card>
              <Txt variant="caption" color={colors.text.muted}>
                YOU'LL ENTER AS
              </Txt>
              <Txt variant="bodyStrong" style={{ marginTop: spacing.xs }}>
                {[
                  effectiveName,
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

/**
 * What choosing this option actually gives you.
 *
 * Only under the selected card. Four cards each showing a stat block is a
 * spreadsheet; one card showing its own is an answer to "and what does that
 * mean for me". The strings arrive already resolved from the server so the
 * screen has no opinion about how a proficiency is spelled.
 */
function GrantList({ grants }: { grants: SetupArchetype['grants'] }): React.JSX.Element | null {
  const lines: Array<[string, string[]]> = [
    ['Starts with', grants.abilities],
    ['Better at', grants.skills],
    ['Attributes', grants.attributes],
    ['Carries', grants.items],
    ['Counted by', grants.standing],
  ];
  const shown = lines.filter(([, values]) => values.length > 0);
  if (shown.length === 0) return null;

  return (
    <Stack
      gap={spacing.xs}
      style={{
        borderTopWidth: 1,
        borderTopColor: colors.border.subtle,
        paddingTop: spacing.sm,
        marginTop: spacing.xs,
      }}
    >
      {shown.map(([label, values]) => (
        <Row key={label} style={{ gap: spacing.sm, alignItems: 'flex-start' }}>
          <Txt variant="caption" color={colors.text.muted} style={{ width: 82 }}>
            {label}
          </Txt>
          <Txt variant="caption" color={colors.text.secondary} style={{ flex: 1 }}>
            {values.join(' · ')}
          </Txt>
        </Row>
      ))}
    </Stack>
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
