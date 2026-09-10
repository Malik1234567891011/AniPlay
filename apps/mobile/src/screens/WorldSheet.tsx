import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { TimelineEntry, WorldSheetResponse } from '@aniplay/contracts';
import type { TranslationKey } from '@aniplay/i18n';
import {
  Button,
  Card,
  CharacterPortrait,
  Chip,
  Divider,
  EmptyState,
  IconButton,
  ResourceBar,
  Row,
  Skeleton,
  Stack,
  Txt,
  colors,
  GUTTER,
  radius,
  spacing,
} from '@aniplay/ui';
import { api } from '../api/client.js';
import { useT } from '../i18n/useT.js';
import type { RootNavigation, RootRoute } from '../navigation.jsx';

/**
 * WS-01 to WS-07 — the World Sheet.
 *
 * Spec §11 — the authoritative record. Everything here is engine truth, which is
 * why the player can trust it over anything the prose said.
 */

const TABS = ['overview', 'character', 'inventory', 'quests', 'relationships', 'map', 'timeline'] as const;
type Tab = (typeof TABS)[number];

const TAB_LABEL: Record<Tab, TranslationKey> = {
  overview: 'worldsheet.tab_overview',
  character: 'worldsheet.tab_character',
  inventory: 'worldsheet.tab_inventory',
  quests: 'worldsheet.tab_quests',
  relationships: 'worldsheet.tab_people',
  map: 'worldsheet.tab_map',
  timeline: 'worldsheet.tab_timeline',
};

export function WorldSheetScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  route: RootRoute<'WorldSheet'>;
}): React.JSX.Element {
  const t = useT();
  const { sessionId } = route.params;
  const [tab, setTab] = useState<Tab>((route.params.tab as Tab) ?? 'overview');
  const [sheet, setSheet] = useState<WorldSheetResponse | null>(null);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);

  useEffect(() => {
    void api.worldSheet(sessionId).then(setSheet);
    void api.timeline(sessionId).then((response) => setTimeline(response.entries));
  }, [sessionId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <Row style={{ paddingHorizontal: GUTTER, justifyContent: 'space-between' }}>
        <Txt variant="h2">{t('worldsheet.title')}</Txt>
        <IconButton label={t('worldsheet.close')} onPress={() => navigation.goBack()}>
          <Txt variant="h3">✕</Txt>
        </IconButton>
      </Row>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // A horizontal ScrollView is still a flex child, and as a direct child
        // of a flex:1 column it grows to fill the height — which put ~230pt of
        // dead space between these tabs and the panel below them.
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ paddingHorizontal: GUTTER, paddingVertical: spacing.md, gap: spacing.sm }}
      >
        {TABS.map((id) => (
          <Chip key={id} label={t(TAB_LABEL[id])} selected={tab === id} onPress={() => setTab(id)} />
        ))}
      </ScrollView>

      {!sheet ? (
        <Stack gap={spacing.md} style={{ padding: GUTTER }}>
          <Skeleton width="100%" height={80} />
          <Skeleton width="100%" height={140} />
        </Stack>
      ) : (
        <ScrollView contentContainerStyle={{ padding: GUTTER, paddingBottom: spacing.giant, gap: spacing.xl }}>
          {tab === 'overview' ? <Overview sheet={sheet} /> : null}
          {tab === 'character' ? <Character sheet={sheet} /> : null}
          {tab === 'inventory' ? <Inventory sheet={sheet} /> : null}
          {tab === 'quests' ? <Quests sheet={sheet} /> : null}
          {tab === 'relationships' ? <Relationships sheet={sheet} /> : null}
          {tab === 'map' ? <MapTab sheet={sheet} /> : null}
          {tab === 'timeline' ? (
            <Timeline
              entries={timeline}
              sessionId={sessionId}
              // i18n-exempt: the app's own name, which is not translated
              storyTitle={sheet?.overview.chapterLabel ?? 'AniPlay'}
              navigation={navigation}
              onRefresh={setTimeline}
            />
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

/** WS-01 — current essentials only (§11.1). */
function Overview({ sheet }: { sheet: WorldSheetResponse }): React.JSX.Element {
  const t = useT();
  const { overview } = sheet;
  return (
    <Stack gap={spacing.xl}>
      <Card style={{ gap: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Txt variant="h3">{overview.locationName}</Txt>
          <Txt variant="caption" color={colors.text.muted}>
            {overview.worldTimeLabel}
          </Txt>
        </Row>
        <Txt variant="micro" color={colors.text.muted}>
          {overview.chapterLabel}
        </Txt>
        <Row gap={spacing.lg} style={{ flexWrap: 'wrap' }}>
          {overview.resources.map((resource) => (
            <ResourceBar key={resource.id} {...resource} />
          ))}
        </Row>
      </Card>

      {overview.topObjective ? (
        <Stack gap={spacing.sm}>
          <Txt variant="caption" color={colors.text.muted}>
            {t('worldsheet.current_objective')}
          </Txt>
          <Txt variant="body">{overview.topObjective}</Txt>
        </Stack>
      ) : null}

      {overview.statuses.length > 0 ? (
        <Stack gap={spacing.sm}>
          <Txt variant="caption" color={colors.text.muted}>
            {t('worldsheet.active_effects')}
          </Txt>
          <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
            {overview.statuses.map((status) => (
              <Chip
                key={status.id}
                label={status.label}
                tone={status.kind === 'DEBUFF' ? 'warning' : status.kind === 'BUFF' ? 'success' : 'neutral'}
              />
            ))}
          </Row>
        </Stack>
      ) : null}

      {overview.relationshipHighlights.length > 0 ? (
        <Stack gap={spacing.sm}>
          <Txt variant="caption" color={colors.text.muted}>
            {t('worldsheet.relationship_highlights')}
          </Txt>
          <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
            {overview.relationshipHighlights.map((highlight) => (
              <Chip
                key={highlight.characterId}
                label={t('worldsheet.highlight', { name: highlight.name, label: highlight.label })}
              />
            ))}
          </Row>
        </Stack>
      ) : null}

      {overview.recentEvents.length > 0 ? (
        <Stack gap={spacing.sm}>
          <Txt variant="caption" color={colors.text.muted}>
            {t('worldsheet.recently')}
          </Txt>
          {overview.recentEvents.map((event, index) => (
            <Txt key={index} variant="bodyCompact" color={colors.text.secondary}>
              {t('worldsheet.recent_event', { event })}
            </Txt>
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
}

/** WS-02 — attributes explain themselves in plain language (§11.2). */
function Character({ sheet }: { sheet: WorldSheetResponse }): React.JSX.Element {
  const t = useT();
  const { character } = sheet;
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Stack gap={spacing.xl}>
      <Card style={{ gap: spacing.xs }}>
        <Txt variant="h3">{character.identity.displayName}</Txt>
        <Txt variant="caption" color={colors.text.secondary}>
          {character.identity.pronouns}
        </Txt>
        {character.identity.worldKnowsAboutYou ? (
          <Txt variant="bodyCompact" color={colors.text.secondary} style={{ marginTop: spacing.sm }}>
            {character.identity.worldKnowsAboutYou}
          </Txt>
        ) : null}
        <Row gap={spacing.sm} style={{ marginTop: spacing.sm }}>
          {character.progressionMode === 'LEVEL' ? (
            <Chip label={t('worldsheet.level', { level: character.level })} tone="accent" />
          ) : (
            <Chip
              label={t('worldsheet.milestones', { count: character.milestones.length })}
              tone="accent"
            />
          )}
        </Row>
      </Card>

      <Stack gap={spacing.md}>
        <Txt variant="h3">{t('worldsheet.attributes')}</Txt>
        {character.attributes.map((attribute) => (
          <Pressable
            key={attribute.key}
            accessibilityRole="button"
            accessibilityLabel={t('worldsheet.attribute_a11y', {
              name: attribute.name,
              value: attribute.value,
              plain: attribute.plainLanguage,
            })}
            onPress={() => setExpanded(expanded === attribute.key ? null : attribute.key)}
          >
            <Card style={{ gap: spacing.xs }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Txt variant="bodyStrong">{attribute.name}</Txt>
                <Row gap={spacing.sm}>
                  <Txt variant="body">{attribute.value}</Txt>
                  <Txt variant="caption" color={colors.text.muted}>
                    {attribute.modifier >= 0 ? '+' : ''}
                    {attribute.modifier}
                  </Txt>
                </Row>
              </Row>
              {expanded === attribute.key ? (
                <Txt variant="caption" color={colors.text.secondary}>
                  {attribute.plainLanguage}
                </Txt>
              ) : null}
            </Card>
          </Pressable>
        ))}
      </Stack>

      <Stack gap={spacing.md}>
        <Txt variant="h3">{t('worldsheet.skills')}</Txt>
        {character.skills
          .filter((skill) => skill.proficiency > 0)
          .concat(character.skills.filter((skill) => skill.proficiency === 0))
          .map((skill) => (
            <Row key={skill.id} style={{ justifyContent: 'space-between' }}>
              <Txt variant="bodyCompact" color={skill.proficiency > 0 ? colors.text.primary : colors.text.muted}>
                {skill.name}
              </Txt>
              <Txt variant="caption" color={skill.proficiency > 0 ? colors.accent.primary : colors.text.muted}>
                {skill.proficiencyLabel}
              </Txt>
            </Row>
          ))}
      </Stack>

      {character.abilities.length > 0 ? (
        <Stack gap={spacing.md}>
          <Txt variant="h3">{t('worldsheet.powers')}</Txt>
          {character.abilities.map((ability) => (
            <Card key={ability.id} style={{ gap: spacing.xs }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Txt variant="bodyStrong">{ability.name}</Txt>
                {ability.costLabel ? (
                  <Txt variant="caption" color={colors.accent.primary}>
                    {ability.costLabel}
                  </Txt>
                ) : null}
              </Row>
              {/* What it does, then what it is. The description is good
                  writing and does not tell you whether it hits one person or
                  the room, or what it costs, or whether it can fail. */}
              <Txt variant="caption">{ability.effect}</Txt>
              <Txt variant="caption" color={colors.text.secondary}>
                {ability.description}
              </Txt>
              {ability.cooldownRemaining > 0 ? (
                <Txt variant="micro" color={colors.semantic.warning}>
                  {t('worldsheet.cooldown', { minutes: ability.cooldownRemaining })}
                </Txt>
              ) : null}
            </Card>
          ))}
        </Stack>
      ) : null}

      {character.factions.length > 0 ? (
        <Stack gap={spacing.md}>
          <Txt variant="h3">{t('worldsheet.standing')}</Txt>
          {character.factions.map((faction) => (
            <Row key={faction.factionId} style={{ justifyContent: 'space-between' }}>
              <Txt variant="bodyCompact">{faction.name}</Txt>
              <Chip label={faction.rankLabel || t('worldsheet.rank_unknown')} />
            </Row>
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
}

/** WS-03 — engine-authoritative items only (§11.3). */
function Inventory({ sheet }: { sheet: WorldSheetResponse }): React.JSX.Element {
  const t = useT();

  if (sheet.inventory.length === 0) {
    return (
      <EmptyState
        title={t('worldsheet.inventory_empty_title')}
        body={t('worldsheet.inventory_empty_body')}
      />
    );
  }

  return (
    <Stack gap={spacing.md}>
      {sheet.inventory.map((item) => (
        <Card key={item.entryId} style={{ gap: spacing.sm }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Row gap={spacing.sm}>
              <Txt variant="bodyStrong">{item.name}</Txt>
              {item.quantity > 1 ? (
                <Txt variant="caption" color={colors.text.muted}>
                  ×{item.quantity}
                </Txt>
              ) : null}
            </Row>
            {item.equipped ? <Chip label={t('worldsheet.equipped')} tone="accent" /> : null}
            {item.rarity ? <Chip label={item.rarity} /> : null}
          </Row>

          <Txt variant="caption" color={colors.text.secondary}>
            {item.description}
          </Txt>

          {item.effects.length > 0 ? (
            <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
              {item.effects.map((effect, index) => (
                <Chip key={index} label={effect} tone="success" />
              ))}
            </Row>
          ) : null}

          {item.loreText ? (
            <Txt variant="micro" color={colors.text.muted} serif>
              {item.loreText}
            </Txt>
          ) : null}
        </Card>
      ))}
    </Stack>
  );
}

/** WS-04 — active, leads, completed, failed (§11.4). */
function Quests({ sheet }: { sheet: WorldSheetResponse }): React.JSX.Element {
  const t = useT();
  // The key, not the label, so a group's React key and its heading do not both
  // change when the language does.
  const groups: Array<[TranslationKey, typeof sheet.quests]> = [
    [
      'worldsheet.quests_active',
      sheet.quests.filter((q) => q.status === 'ACTIVE' || q.status === 'BLOCKED'),
    ],
    ['worldsheet.quests_leads', sheet.quests.filter((q) => q.status === 'DISCOVERED')],
    ['worldsheet.quests_completed', sheet.quests.filter((q) => q.status === 'COMPLETED')],
    [
      'worldsheet.quests_closed',
      sheet.quests.filter((q) => q.status === 'FAILED' || q.status === 'EXPIRED'),
    ],
  ];

  if (sheet.quests.length === 0) {
    return (
      <EmptyState
        title={t('worldsheet.quests_empty_title')}
        body={t('worldsheet.quests_empty_body')}
      />
    );
  }

  return (
    <Stack gap={spacing.xl}>
      {groups
        .filter(([, quests]) => quests.length > 0)
        .map(([labelKey, quests]) => (
          <Stack key={labelKey} gap={spacing.md}>
            <Txt variant="caption" color={colors.text.muted}>
              {t(labelKey).toUpperCase()}
            </Txt>
            {quests.map((quest) => (
              <Card key={quest.questId} style={{ gap: spacing.xs }}>
                <Row style={{ justifyContent: 'space-between' }}>
                  <Txt variant="bodyStrong" style={{ flex: 1 }}>
                    {quest.title}
                  </Txt>
                  {quest.deadlineLabel ? (
                    // The tone, not the text: the label the player reads is
                    // quest.deadlineLabel itself, which is server copy (UI_AUDIT §5).
                    // i18n-exempt: a sentinel compared against the server's own deadlineLabel, never rendered
                    <Chip label={quest.deadlineLabel} tone={quest.deadlineLabel === 'Overdue' ? 'danger' : 'warning'} />
                  ) : null}
                </Row>
                <Txt variant="caption" color={colors.text.secondary}>
                  {quest.summary}
                </Txt>
                {quest.currentStepCopy ? (
                  <Txt variant="bodyCompact" color={colors.accent.primary} style={{ marginTop: spacing.xs }}>
                    {t('worldsheet.quest_step', { step: quest.currentStepCopy })}
                  </Txt>
                ) : (
                  <Txt variant="caption" color={colors.text.muted} style={{ marginTop: spacing.xs }}>
                    {t('worldsheet.quest_step_unclear')}
                  </Txt>
                )}
                {quest.involvedNames.length > 0 ? (
                  <Txt variant="micro" color={colors.text.muted}>
                    {quest.involvedNames.join(', ')}
                  </Txt>
                ) : null}
              </Card>
            ))}
          </Stack>
        ))}
    </Stack>
  );
}

/**
 * The five relationship dimensions. The array is the shape of
 * `relationship.dimensions`, so the members stay data keys; the labels the
 * player reads come out of the catalogue, lower-case as the screen shows them.
 */
const DIMENSIONS = ['trust', 'affection', 'respect', 'fear', 'rivalry'] as const;

const DIMENSION_LABEL: Record<(typeof DIMENSIONS)[number], TranslationKey> = {
  trust: 'worldsheet.dimension_trust',
  affection: 'worldsheet.dimension_affection',
  respect: 'worldsheet.dimension_respect',
  fear: 'worldsheet.dimension_fear',
  rivalry: 'worldsheet.dimension_rivalry',
};

/** WS-05 — qualitative labels by default (§11.5). */
function Relationships({ sheet }: { sheet: WorldSheetResponse }): React.JSX.Element {
  const t = useT();
  const showNumbers = sheet.relationships.some((r) =>
    Object.values(r.dimensions).some((v) => v !== 0),
  );

  return (
    <Stack gap={spacing.md}>
      {sheet.relationships.map((relationship) => (
        <Card key={relationship.characterId} style={{ gap: spacing.md }}>
          <Row gap={spacing.md}>
            <CharacterPortrait name={relationship.name} uri={relationship.portrait} size={44} />
            <View style={{ flex: 1 }}>
              <Txt variant="bodyStrong">{relationship.name}</Txt>
              <Txt variant="caption" color={colors.accent.secondary}>
                {relationship.label}
              </Txt>
            </View>
          </Row>

          {showNumbers ? (
            <Row gap={spacing.md} style={{ flexWrap: 'wrap' }}>
              {DIMENSIONS.map((dimension) => (
                <View key={dimension} style={{ minWidth: 64 }}>
                  <Txt variant="micro" color={colors.text.muted}>
                    {t(DIMENSION_LABEL[dimension])}
                  </Txt>
                  <Txt variant="caption">{relationship.dimensions[dimension]}</Txt>
                </View>
              ))}
            </Row>
          ) : null}
        </Card>
      ))}
      {!showNumbers ? (
        <Txt variant="micro" color={colors.text.muted}>
          {t('worldsheet.relationship_numbers_hint')}
        </Txt>
      ) : null}
    </Stack>
  );
}

/** WS-06 — a 2D node map, not an explorable world (§11.6). */
function MapTab({ sheet }: { sheet: WorldSheetResponse }): React.JSX.Element {
  const t = useT();
  const SIZE = 320;

  return (
    <Stack gap={spacing.lg}>
      <View
        accessible
        accessibilityLabel={t('worldsheet.map_a11y', {
          place: sheet.map.nodes.find((n) => n.current)?.name ?? t('worldsheet.map_unknown_place'),
          count: sheet.map.nodes.length,
        })}
        style={{
          height: SIZE,
          borderRadius: radius.card,
          backgroundColor: colors.bg.elevated,
          borderWidth: 1,
          borderColor: colors.border.subtle,
          overflow: 'hidden',
        }}
      >
        {sheet.map.edges.map((edge, index) => {
          const from = sheet.map.nodes.find((n) => n.id === edge.from);
          const to = sheet.map.nodes.find((n) => n.id === edge.to);
          if (!from || !to) return null;

          const x1 = from.position.x * SIZE;
          const y1 = from.position.y * SIZE;
          const x2 = to.position.x * SIZE;
          const y2 = to.position.y * SIZE;
          const length = Math.hypot(x2 - x1, y2 - y1);
          const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

          return (
            <View
              key={index}
              style={{
                position: 'absolute',
                left: x1,
                top: y1,
                width: length,
                height: 1,
                backgroundColor: colors.border.strong,
                transform: [{ translateY: -0.5 }, { rotateZ: `${angle}deg` }],
                // i18n-exempt: a CSS transform-origin keyword, not text
                transformOrigin: 'left center',
              }}
            />
          );
        })}

        {sheet.map.nodes.map((node) => (
          <View
            key={node.id}
            style={{
              position: 'absolute',
              left: node.position.x * SIZE - 6,
              top: node.position.y * SIZE - 6,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: node.current
                  ? colors.accent.primary
                  : node.hasQuest
                    ? colors.semantic.warning
                    : colors.text.muted,
              }}
            />
            <Txt
              variant="micro"
              color={node.current ? colors.accent.primary : colors.text.secondary}
              style={{ marginTop: 2 }}
            >
              {node.name}
            </Txt>
          </View>
        ))}
      </View>

      <Row gap={spacing.md} style={{ flexWrap: 'wrap' }}>
        <Chip label={t('worldsheet.map_you_are_here')} tone="accent" />
        <Chip label={t('worldsheet.map_has_objective')} tone="warning" />
      </Row>

      <Txt variant="caption" color={colors.text.muted}>
        {t('worldsheet.map_travel_hint')}
      </Txt>
    </Stack>
  );
}

/** WS-07 / WS-08 — the canon memory inspector (§11.7). */
function Timeline({
  entries,
  sessionId,
  storyTitle,
  navigation,
  onRefresh,
}: {
  entries: TimelineEntry[];
  sessionId: string;
  storyTitle: string;
  navigation: RootNavigation;
  onRefresh: (entries: TimelineEntry[]) => void;
}): React.JSX.Element {
  const t = useT();
  const [forking, setForking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  // WS-08 / §11.8 — the id being corrected, and what the player says it was.
  const [correcting, setCorrecting] = useState<string | null>(null);
  const [correction, setCorrection] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // WS-07 — which entry is mid-pin, so the row cannot be double-tapped.
  const [pinning, setPinning] = useState<string | null>(null);

  const submitCorrection = (factId: string): void => {
    const text = correction.trim();
    if (text.length === 0) return;
    setSubmitting(true);
    void api
      .correctCanon(sessionId, factId, text)
      .then((response) => {
        if (response.accepted) {
          setCorrecting(null);
          setCorrection('');
          setNotice(t('worldsheet.correction_accepted'));
          void api.timeline(sessionId).then((r) => onRefresh(r.entries));
        } else {
          // §11.8 — a correction that contradicts authoritative state is
          // refused with the reason, not silently dropped.
          setNotice(response.conflictExplanation ?? t('worldsheet.correction_conflict'));
        }
      })
      .catch(() => setNotice(t('worldsheet.correction_failed')))
      .finally(() => setSubmitting(false));
  };

  if (entries.length === 0) {
    return (
      <EmptyState
        title={t('worldsheet.timeline_empty_title')}
        body={t('worldsheet.timeline_empty_body')}
      />
    );
  }

  return (
    <Stack gap={spacing.md}>
      {notice ? (
        <Card style={{ borderColor: colors.semantic.warning }}>
          <Txt variant="bodyCompact">{notice}</Txt>
        </Card>
      ) : null}

      {entries
        .slice()
        .reverse()
        .map((entry) => (
          <Card key={entry.id} style={{ gap: spacing.xs }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Chip label={entry.group} />
              {entry.worldTimeLabel ? (
                <Txt variant="micro" color={colors.text.muted}>
                  {entry.worldTimeLabel}
                </Txt>
              ) : null}
            </Row>
            <Txt variant="bodyCompact">{entry.text}</Txt>
            <Row gap={spacing.md} style={{ marginTop: spacing.xs, flexWrap: 'wrap' }}>
              {/* WS-07 — pinning is how a player says which moments the story
                  must not lose. Retrieval weights them higher, so it changes
                  what gets remembered rather than only how it is labelled. */}
              {entry.correctable ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: entry.pinned }}
                  accessibilityLabel={
                    entry.pinned
                      ? t('worldsheet.unpin_a11y', { text: entry.text })
                      : t('worldsheet.pin_a11y', { text: entry.text })
                  }
                  disabled={pinning === entry.id}
                  onPress={() => {
                    setNotice(null);
                    setPinning(entry.id);
                    void api
                      .pinTimelineEntry(sessionId, entry.id, !entry.pinned)
                      .then((result) => {
                        onRefresh(
                          entries.map((e) =>
                            e.id === entry.id ? { ...e, pinned: result.pinned } : e,
                          ),
                        );
                        setNotice(
                          result.pinned
                            ? t('worldsheet.pinned_notice')
                            : t('worldsheet.unpinned_notice'),
                        );
                      })
                      .catch(() => setNotice(t('worldsheet.pin_failed')))
                      .finally(() => setPinning(null));
                  }}
                >
                  <Txt
                    variant="caption"
                    color={entry.pinned ? colors.accent.primary : colors.text.secondary}
                  >
                    {entry.pinned ? t('worldsheet.pinned_canon_star') : t('worldsheet.pin_action')}
                  </Txt>
                </Pressable>
              ) : entry.pinned ? (
                <Chip label={t('worldsheet.pinned_canon')} tone="accent" />
              ) : null}
              {/* WS-08 — the engine's own decisions are not opinions, so only
                  generated canon carries this. It is free: a contradiction the
                  system produced is not something to charge for. */}
              {entry.correctable ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={t('worldsheet.correct_a11y', { text: entry.text })}
                  onPress={() => {
                    setNotice(null);
                    setCorrection(correcting === entry.id ? '' : entry.text);
                    setCorrecting(correcting === entry.id ? null : entry.id);
                  }}
                >
                  <Txt variant="caption" color={colors.text.secondary}>
                    {correcting === entry.id ? t('worldsheet.cancel') : t('worldsheet.this_is_wrong')}
                  </Txt>
                </Pressable>
              ) : null}
              {/* WS-07 — share the moment, spoiler-safe, from where it sits. */}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t('worldsheet.share_a11y', { text: entry.text })}
                onPress={() =>
                  navigation.navigate('Share', {
                    storyTitle,
                    actionText: entry.group === 'CHOICE' ? entry.text : null,
                    sceneText: entry.text,
                    heroImageUrl: null,
                  })
                }
              >
                <Txt variant="caption" color={colors.text.secondary}>
                  {t('worldsheet.share')}
                </Txt>
              </Pressable>
              {entry.forkable ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={t('worldsheet.fork_a11y')}
                  disabled={forking}
                  onPress={() => {
                    setForking(true);
                    void api
                      .forkSession(sessionId, entry.turnIndex)
                      .then((response) => navigation.replace('Session', { sessionId: response.session.sessionId }))
                      // Spec §10.8 — say what happened and what to do about it.
                      // "Could not fork right now" tells the player neither.
                      .catch((error) =>
                        setNotice(
                          error?.code === 'INSUFFICIENT_CREDITS'
                            ? t('worldsheet.fork_insufficient_credits', {
                                count: error.shortfall ?? 120,
                              })
                            : error?.code === 'OFFLINE'
                              ? t('worldsheet.fork_offline')
                              : error?.code === 'NOT_FOUND'
                                ? t('worldsheet.fork_not_found')
                                : t('worldsheet.fork_failed'),
                        ),
                      )
                      .finally(() => setForking(false));
                  }}
                >
                  <Txt variant="caption" color={colors.accent.primary}>
                    {t('worldsheet.fork_from_here')}
                  </Txt>
                </Pressable>
              ) : null}
            </Row>

            {correcting === entry.id ? (
              <Stack gap={spacing.sm} style={{ marginTop: spacing.sm }}>
                <TextInput
                  value={correction}
                  onChangeText={setCorrection}
                  multiline
                  maxLength={400}
                  autoFocus
                  placeholder={t('worldsheet.correction_placeholder')}
                  placeholderTextColor={colors.text.muted}
                  accessibilityLabel={t('worldsheet.correction_a11y')}
                  style={{
                    minHeight: 76,
                    padding: spacing.md,
                    borderRadius: radius.control,
                    backgroundColor: colors.bg.raised,
                    color: colors.text.primary,
                    fontSize: 16,
                    textAlignVertical: 'top',
                  }}
                />
                <Button
                  label={t('worldsheet.fix_it')}
                  size="medium"
                  loading={submitting}
                  loadingLabel={t('worldsheet.checking')}
                  disabled={correction.trim().length === 0}
                  onPress={() => submitCorrection(entry.id)}
                />
              </Stack>
            ) : null}
          </Card>
        ))}

      <Txt variant="micro" color={colors.text.muted}>
        {t('worldsheet.correction_explainer')}
      </Txt>
      <Txt variant="micro" color={colors.text.muted}>
        {t('worldsheet.fork_explainer')}
      </Txt>
    </Stack>
  );
}
