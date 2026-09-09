import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { TimelineEntry, WorldSheetResponse } from '@aniplay/contracts';
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
import type { RootNavigation, RootRoute } from '../navigation.jsx';

/**
 * WS-01 to WS-07 — the World Sheet.
 *
 * Spec §11 — the authoritative record. Everything here is engine truth, which is
 * why the player can trust it over anything the prose said.
 */

const TABS = ['overview', 'character', 'inventory', 'quests', 'relationships', 'map', 'timeline'] as const;
type Tab = (typeof TABS)[number];

const TAB_LABEL: Record<Tab, string> = {
  overview: 'Overview',
  character: 'Character',
  inventory: 'Inventory',
  quests: 'Quests',
  relationships: 'People',
  map: 'Map',
  timeline: 'Timeline',
};

export function WorldSheetScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  route: RootRoute<'WorldSheet'>;
}): React.JSX.Element {
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
        <Txt variant="h2">World Sheet</Txt>
        <IconButton label="Close" onPress={() => navigation.goBack()}>
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
          <Chip key={id} label={TAB_LABEL[id]} selected={tab === id} onPress={() => setTab(id)} />
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
            <Timeline entries={timeline} sessionId={sessionId} navigation={navigation} />
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

/** WS-01 — current essentials only (§11.1). */
function Overview({ sheet }: { sheet: WorldSheetResponse }): React.JSX.Element {
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
            CURRENT OBJECTIVE
          </Txt>
          <Txt variant="body">{overview.topObjective}</Txt>
        </Stack>
      ) : null}

      {overview.statuses.length > 0 ? (
        <Stack gap={spacing.sm}>
          <Txt variant="caption" color={colors.text.muted}>
            ACTIVE EFFECTS
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
            WHO'S ON YOUR MIND
          </Txt>
          <Row gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
            {overview.relationshipHighlights.map((highlight) => (
              <Chip key={highlight.characterId} label={`${highlight.name} · ${highlight.label}`} />
            ))}
          </Row>
        </Stack>
      ) : null}

      {overview.recentEvents.length > 0 ? (
        <Stack gap={spacing.sm}>
          <Txt variant="caption" color={colors.text.muted}>
            RECENTLY
          </Txt>
          {overview.recentEvents.map((event, index) => (
            <Txt key={index} variant="bodyCompact" color={colors.text.secondary}>
              · {event}
            </Txt>
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
}

/** WS-02 — attributes explain themselves in plain language (§11.2). */
function Character({ sheet }: { sheet: WorldSheetResponse }): React.JSX.Element {
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
            <Chip label={`Level ${character.level}`} tone="accent" />
          ) : (
            <Chip label={`${character.milestones.length} milestones`} tone="accent" />
          )}
        </Row>
      </Card>

      <Stack gap={spacing.md}>
        <Txt variant="h3">Attributes</Txt>
        {character.attributes.map((attribute) => (
          <Pressable
            key={attribute.key}
            accessibilityRole="button"
            accessibilityLabel={`${attribute.name}, ${attribute.value}. ${attribute.plainLanguage}`}
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
        <Txt variant="h3">Skills</Txt>
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
          <Txt variant="h3">Powers</Txt>
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
              <Txt variant="caption" color={colors.text.secondary}>
                {ability.description}
              </Txt>
              {ability.cooldownRemaining > 0 ? (
                <Txt variant="micro" color={colors.semantic.warning}>
                  Recovering — {ability.cooldownRemaining} min
                </Txt>
              ) : null}
            </Card>
          ))}
        </Stack>
      ) : null}

      {character.factions.length > 0 ? (
        <Stack gap={spacing.md}>
          <Txt variant="h3">Standing</Txt>
          {character.factions.map((faction) => (
            <Row key={faction.factionId} style={{ justifyContent: 'space-between' }}>
              <Txt variant="bodyCompact">{faction.name}</Txt>
              <Chip label={faction.rankLabel || 'Unknown'} />
            </Row>
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
}

/** WS-03 — engine-authoritative items only (§11.3). */
function Inventory({ sheet }: { sheet: WorldSheetResponse }): React.JSX.Element {
  if (sheet.inventory.length === 0) {
    return <EmptyState title="Nothing on you" body="Anything you pick up in the story shows up here." />;
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
            {item.equipped ? <Chip label="Equipped" tone="accent" /> : null}
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
  const groups: Array<[string, typeof sheet.quests]> = [
    ['Active', sheet.quests.filter((q) => q.status === 'ACTIVE' || q.status === 'BLOCKED')],
    ['Leads', sheet.quests.filter((q) => q.status === 'DISCOVERED')],
    ['Completed', sheet.quests.filter((q) => q.status === 'COMPLETED')],
    ['Closed', sheet.quests.filter((q) => q.status === 'FAILED' || q.status === 'EXPIRED')],
  ];

  if (sheet.quests.length === 0) {
    return <EmptyState title="No objectives yet" body="Objectives appear as the story gives you something to chase." />;
  }

  return (
    <Stack gap={spacing.xl}>
      {groups
        .filter(([, quests]) => quests.length > 0)
        .map(([label, quests]) => (
          <Stack key={label} gap={spacing.md}>
            <Txt variant="caption" color={colors.text.muted}>
              {label.toUpperCase()}
            </Txt>
            {quests.map((quest) => (
              <Card key={quest.questId} style={{ gap: spacing.xs }}>
                <Row style={{ justifyContent: 'space-between' }}>
                  <Txt variant="bodyStrong" style={{ flex: 1 }}>
                    {quest.title}
                  </Txt>
                  {quest.deadlineLabel ? (
                    <Chip label={quest.deadlineLabel} tone={quest.deadlineLabel === 'Overdue' ? 'danger' : 'warning'} />
                  ) : null}
                </Row>
                <Txt variant="caption" color={colors.text.secondary}>
                  {quest.summary}
                </Txt>
                {quest.currentStepCopy ? (
                  <Txt variant="bodyCompact" color={colors.accent.primary} style={{ marginTop: spacing.xs }}>
                    ❯ {quest.currentStepCopy}
                  </Txt>
                ) : (
                  <Txt variant="caption" color={colors.text.muted} style={{ marginTop: spacing.xs }}>
                    ❯ Not yet clear.
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

/** WS-05 — qualitative labels by default (§11.5). */
function Relationships({ sheet }: { sheet: WorldSheetResponse }): React.JSX.Element {
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
              {(['trust', 'affection', 'respect', 'fear', 'rivalry'] as const).map((dimension) => (
                <View key={dimension} style={{ minWidth: 64 }}>
                  <Txt variant="micro" color={colors.text.muted}>
                    {dimension}
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
          Turn on advanced relationship stats in Settings to see the underlying numbers.
        </Txt>
      ) : null}
    </Stack>
  );
}

/** WS-06 — a 2D node map, not an explorable world (§11.6). */
function MapTab({ sheet }: { sheet: WorldSheetResponse }): React.JSX.Element {
  const SIZE = 320;

  return (
    <Stack gap={spacing.lg}>
      <View
        accessible
        accessibilityLabel={`Map. You are at ${
          sheet.map.nodes.find((n) => n.current)?.name ?? 'an unknown place'
        }. ${sheet.map.nodes.length} places discovered.`}
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
        <Chip label="You are here" tone="accent" />
        <Chip label="Has an objective" tone="warning" />
      </Row>

      <Txt variant="caption" color={colors.text.muted}>
        Travel is an action. Type where you want to go, and the story resolves the journey.
      </Txt>
    </Stack>
  );
}

/** WS-07 / WS-08 — the canon memory inspector (§11.7). */
function Timeline({
  entries,
  sessionId,
  navigation,
}: {
  entries: TimelineEntry[];
  sessionId: string;
  navigation: RootNavigation;
}): React.JSX.Element {
  const [forking, setForking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  if (entries.length === 0) {
    return <EmptyState title="Nothing recorded yet" body="Everything that becomes canon will be listed here." />;
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
            <Row gap={spacing.md} style={{ marginTop: spacing.xs }}>
              {entry.pinned ? <Chip label="Pinned canon" tone="accent" /> : null}
              {entry.forkable ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Fork the timeline from this moment"
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
                            ? `You need ${error.shortfall ?? 120} more credits to fork this timeline.`
                            : error?.code === 'OFFLINE'
                              ? "You're offline. The fork will work once you reconnect."
                              : error?.code === 'NOT_FOUND'
                                ? 'This run is no longer on the server. Nothing was charged.'
                                : 'The fork did not go through, and you were not charged. Try again in a moment.',
                        ),
                      )
                      .finally(() => setForking(false));
                  }}
                >
                  <Txt variant="caption" color={colors.accent.primary}>
                    Fork from here · 120
                  </Txt>
                </Pressable>
              ) : null}
            </Row>
          </Card>
        ))}

      <Txt variant="micro" color={colors.text.muted}>
        Forking copies this world at the chosen moment. The original branch is never destroyed.
      </Txt>
    </Stack>
  );
}
