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
import type { GrammaticalGender } from '@aniplay/contracts';
import { thirdPersonPronoun, type TranslationKey, type Translator } from '@aniplay/i18n';
import { api, ApiError } from '../api/client.js';
import { useT } from '../i18n/useT.js';
import { useStore } from '../state/store.jsx';
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

/**
 * The four answers to the grammar question, in the order French would ask
 * them, each with the sentence the player will read and what it means for the
 * third person.
 *
 * A table rather than four hand-written blocks so that the label, the example
 * and the note for one option cannot drift apart — which is exactly how a
 * picker ends up offering a neutral option and then quietly writing `il`.
 */
const GRAMMAR_OPTIONS: readonly {
  gender: GrammaticalGender;
  labelKey: TranslationKey;
  exampleKey: TranslationKey;
  noteKey: TranslationKey;
}[] = [
  {
    gender: 'MASCULINE',
    labelKey: 'setup.grammar.masculine',
    exampleKey: 'setup.grammar.example_masculine',
    noteKey: 'setup.grammar.note_masculine',
  },
  {
    gender: 'FEMININE',
    labelKey: 'setup.grammar.feminine',
    exampleKey: 'setup.grammar.example_feminine',
    noteKey: 'setup.grammar.note_feminine',
  },
  {
    gender: 'NEUTRAL',
    labelKey: 'setup.grammar.neutral',
    exampleKey: 'setup.grammar.example_neutral',
    noteKey: 'setup.grammar.note_neutral',
  },
  {
    gender: 'UNSPECIFIED',
    labelKey: 'setup.grammar.unspecified',
    exampleKey: 'setup.grammar.example_unspecified',
    noteKey: 'setup.grammar.note_unspecified',
  },
];

export function CharacterSetupScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  route: RootRoute<'CharacterSetup'>;
}): React.JSX.Element {
  const { storyId } = route.params;
  const t = useT();
  const { locale } = useStore();
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
  /**
   * How the narration should agree with this player.
   *
   * Collected **only in French**, because only French needs it — see
   * `PLAYER_GRAMMAR.md`. An English session never renders the question and
   * sends `UNSPECIFIED`, which is exactly what every identity created before
   * this field existed reads as.
   */
  const [grammarGender, setGrammarGender] = useState<GrammaticalGender>('UNSPECIFIED');
  const asksGrammar = locale === 'fr';

  useEffect(() => {
    void api.storyDetail(storyId).then(setDetail);
  }, [storyId]);

  const archetype = detail?.archetypes.find((a) => a.id === archetypeId) ?? null;
  const archetypeField = detail?.setupFields.find((f) => f.kind === 'ARCHETYPE') ?? null;
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
          // Spec §9.4 — a background you wrote is worth the same as one we
          // wrote. `null` here no longer means "no mechanics": the server reads
          // what was written in `advanced.customArchetype` and spends the same
          // budget the authored archetypes were written to.
          archetypeId: usingCustomArchetype ? null : archetypeId,
          worldKnowsAboutYou: about.trim().slice(0, 300),
          advanced: advancedValues,
          portraitAssetId: null,
          // Declared, never inferred. Not from the name, not from the
          // portrait, not by parsing the free-text pronouns above — every one
          // of those is wrong for some real player.
          grammar: {
            gender: grammarGender,
            thirdPerson: thirdPersonPronoun(grammarGender, ''),
          },
        },
        usedQuickSetup: !advanced,
        // The language this run will be played in, decided here and frozen by
        // the server into `GameState.locale`. Sent explicitly rather than
        // inferred from a header, because the interface language the player is
        // looking at while they fill this in is the one they expect to get.
        locale,
      });
      navigation.replace('Session', { sessionId: session.session.sessionId });
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : t('setup.could_not_start'));
      setStarting(false);
    }
  };

  const advancedFields = detail?.setupFields.filter((f) => f.advanced && f.id !== 'appearance') ?? [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between' }}>
          <IconButton label={t('setup.back')} onPress={() => navigation.goBack()}>
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
              label={t('setup.name_label')}
              value={displayName}
              onChange={setDisplayName}
              placeholder={placeholderFor(detail, 'displayName', t('setup.name_placeholder'))}
              maxLength={40}
              required
            />
            <Field
              label={t('setup.pronouns_label')}
              value={pronouns}
              onChange={setPronouns}
              placeholder={placeholderFor(detail, 'pronouns', t('setup.pronouns_placeholder'))}
              maxLength={24}
            />
            {/*
              The question only French asks, in the French build only.

              It does not replace the free-text field above and is not a
              translation of it: that field is doing self-expression work a
              four-value enum must not take over. This one asks the single
              thing French narration cannot do without — whether to write
              `Tu es arrivé` or `Tu es arrivée`.

              Each row shows the sentence the player will actually read, which
              is the only way to make an abstract grammatical question
              concrete. `Iel` and `Peu importe` show the avoidance form
              (`Tu viens d'arriver`, present tense, no participle) rather than
              a midpoint: `arrivé·e` is an administrative register, it was
              banned from school documents by circular, and it breaks
              read-aloud on blocks the product marks `voiceEligible`.
            */}
            {asksGrammar ? (
              <Stack gap={spacing.sm}>
                <Stack gap={spacing.xs}>
                  <Txt variant="h3">{t('setup.grammar.heading')}</Txt>
                  <Txt variant="caption" color={colors.text.secondary}>
                    {t('setup.grammar.hint')}
                  </Txt>
                </Stack>
                {GRAMMAR_OPTIONS.map((option) => {
                  const selected = grammarGender === option.gender;
                  return (
                    <Pressable
                      key={option.gender}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      accessibilityLabel={`${t(option.labelKey)}. ${t(option.exampleKey)}. ${t(option.noteKey)}.`}
                      onPress={() => setGrammarGender(option.gender)}
                    >
                      <Card
                        style={{
                          borderColor: selected ? colors.accent.primary : colors.border.subtle,
                          gap: spacing.xs,
                        }}
                      >
                        <Row style={{ gap: spacing.sm, alignItems: 'baseline', flexWrap: 'wrap' }}>
                          <Txt
                            variant="bodyStrong"
                            color={selected ? colors.accent.primary : colors.text.primary}
                          >
                            {t(option.labelKey)}
                          </Txt>
                          <Txt variant="bodyCompact" color={colors.text.primary}>
                            {`« ${t(option.exampleKey)} »`}
                          </Txt>
                        </Row>
                        <Txt variant="caption" color={colors.text.muted}>
                          {t(option.noteKey)}
                        </Txt>
                      </Card>
                    </Pressable>
                  );
                })}
              </Stack>
            ) : null}
          </Stack>

          {(detail?.archetypes.length ?? 0) > 0 ? (
            <Stack gap={spacing.md}>
              {/*
                The heading and the explainer come from the story, because the
                screen has to say what the system is before it asks you to pick
                inside it. A question on its own is not an explanation.
              */}
              <Stack gap={spacing.xs}>
                <Txt variant="h3">{archetypeField?.label ?? t('setup.archetype_heading')}</Txt>
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
                      accessibilityLabel={t('setup.archetype_a11y', {
                        name: option.name,
                        role: option.role,
                        summary: option.summary,
                      })}
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
                        {selected ? <GrantList grants={option.grants} t={t} /> : null}

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
                  accessibilityLabel={t('setup.write_own_background')}
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
                      {t('setup.something_else')}
                    </Txt>
                    <Txt variant="bodyCompact" color={colors.text.primary}>
                      {t('setup.custom_background_body')}
                    </Txt>
                  </Card>
                </Pressable>
              </Stack>

              {usingCustomArchetype ? (
                <Field
                  label={t('setup.custom_background_label')}
                  value={customArchetype}
                  onChange={setCustomArchetype}
                  placeholder={t('setup.custom_background_placeholder')}
                  maxLength={240}
                  multiline
                />
              ) : null}
            </Stack>
          ) : null}

          <Field
            label={t('setup.about_label')}
            value={about}
            onChange={setAbout}
            placeholder={placeholderFor(
              detail,
              'worldKnowsAboutYou',
              t('setup.about_placeholder'),
            )}
            maxLength={300}
            multiline
          />

          {/* Drives the generated portrait, so it earns a place in the fast path. */}
          <Field
            label={t('setup.appearance_label')}
            hint={t('setup.appearance_hint')}
            value={appearance}
            onChange={setAppearance}
            placeholder={placeholderFor(
              detail,
              'appearance',
              t('setup.appearance_placeholder'),
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
                        label={t('setup.something_else')}
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
                        placeholder={t('setup.write_own_answer')}
                        placeholderTextColor={colors.text.muted}
                        maxLength={field.maxLength}
                        accessibilityLabel={t('setup.own_answer_a11y', { label: field.label })}
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
            label={t('setup.enter')}
            loading={starting}
            loadingLabel="Entering…"
            disabled={!canStart}
            hapticKind="medium"
            onPress={() => void start()}
          />
          {advancedFields.length > 0 ? (
            <Button
              label={advanced ? t('setup.use_quick_setup') : t('setup.customize_more')}
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
function GrantList({
  grants,
  t,
}: {
  grants: SetupArchetype['grants'];
  t: Translator;
}): React.JSX.Element | null {
  const lines: Array<[string, string[]]> = [
    [t('setup.grants.starts_with'), grants.abilities],
    [t('setup.grants.better_at'), grants.skills],
    [t('setup.grants.attributes'), grants.attributes],
    [t('setup.grants.carries'), grants.items],
    [t('setup.grants.counted_by'), grants.standing],
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
