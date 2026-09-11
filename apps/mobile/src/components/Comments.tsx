import { type Translator, type TranslationKey } from '@aniplay/i18n';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, TextInput, View } from 'react-native';
import { Button, Card, Chip, Row, Stack, Txt, colors, radius, spacing } from '@aniplay/ui';
import { api, type CommentView } from '../api/client.js';
import { useT } from '../i18n/useT.js';

/**
 * What people thought of the world.
 *
 * About the **world**, never about one run. Two players of the same world have
 * had completely different hours in it — different choices, different endings,
 * in a product where that is the entire point — so a thread pinned to one canon
 * outcome would be wrong for most of the people reading it.
 *
 * ## Spoilers
 *
 * A collapsed comment rather than a blurred one. Blur is decorative and still
 * leaks shape and length; a box that says "spoiler, tap to read" leaks nothing
 * and is one tap to open. Endings are the thing people most want to talk about
 * here and the thing most worth protecting, so this has to actually work.
 *
 * ## Guests
 *
 * Read freely, post never. Comments are the one surface with real moderation
 * cost, and an anonymous one is a surface with no accountability at all. The
 * sign-in line appears where the box would be, so the door is visible rather
 * than the feature being hidden.
 */
export function Comments({
  storyId,
  signedIn,
  onSignIn,
  variant = 'full',
  onSeeAll,
}: {
  storyId: string;
  signedIn: boolean;
  onSignIn: () => void;
  /**
   * `preview` is a few cards sideways under a story; `full` is the screen.
   *
   * A story page carried the entire comment section inline, vertically, so a
   * world with forty-seven comments buried everything under it and the page
   * had no bottom. A shelf of two or three, and a way in, is the shape that
   * belongs on a page about the story.
   */
  variant?: 'preview' | 'full';
  onSeeAll?: () => void;
}): React.JSX.Element {
  const t = useT();
  const [sort, setSort] = useState<'TOP' | 'NEW'>('TOP');
  const [comments, setComments] = useState<CommentView[]>([]);
  const [draft, setDraft] = useState('');
  const [spoiler, setSpoiler] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    (which: 'TOP' | 'NEW') => {
      void api
        .comments(storyId, which)
        .then((response) => setComments(response.comments))
        .catch(() => undefined);
    },
    [storyId],
  );

  useEffect(() => load(sort), [load, sort]);

  const post = async (): Promise<void> => {
    const body = draft.trim();
    if (!body || posting) return;
    setPosting(true);
    setError(null);
    try {
      await api.postComment(storyId, body, spoiler);
      setDraft('');
      setSpoiler(false);
      // Newest first, so they can see the thing they just wrote. Posting into
      // a Top-sorted list and having it not appear reads as a failure.
      setSort('NEW');
      load('NEW');
    } catch {
      setError(t('story.comment_rate_limited'));
    } finally {
      setPosting(false);
    }
  };

  if (variant === 'preview') {
    return (
      <Stack gap={spacing.md}>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Txt variant="h3">{t('story.comments_heading')}</Txt>
          {comments.length > 0 ? (
            <Txt
              variant="caption"
              color={colors.accent.primary}
              accessibilityRole="button"
              onPress={onSeeAll}
            >
              {t('story.comments_see_all', { count: comments.length })}
            </Txt>
          ) : null}
        </Row>

        {comments.length === 0 ? (
          <Txt variant="bodyCompact" color={colors.text.muted}>
            {t('story.comments_empty')}
          </Txt>
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={comments.slice(0, 6)}
            keyExtractor={(comment) => comment.commentId}
            contentContainerStyle={{ gap: spacing.md }}
            renderItem={({ item }) => {
              const hidden = item.spoiler && !revealed.has(item.commentId);
              return (
                <Pressable onPress={onSeeAll} style={{ width: 250 }}>
                  <Card style={{ height: 128 }}>
                    <Stack gap={spacing.xs}>
                      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Txt variant="bodyStrong" numberOfLines={1} style={{ flex: 1 }}>
                          {item.authorName}
                        </Txt>
                        <Txt variant="micro" color={colors.text.muted}>
                          {postedAgo(item.createdAt, t)}
                        </Txt>
                      </Row>
                      <Txt
                        variant="bodyCompact"
                        color={hidden ? colors.text.muted : colors.text.primary}
                        numberOfLines={3}
                      >
                        {/* A spoiler stays hidden here. Tapping opens the full
                            screen, which is where revealing one belongs. */}
                        {hidden ? t('story.comment_spoiler_hidden') : item.body}
                      </Txt>
                      <Txt variant="micro" color={colors.text.muted}>
                        {t('story.comment_likes', { count: item.likes })}
                      </Txt>
                    </Stack>
                  </Card>
                </Pressable>
              );
            }}
          />
        )}

        {signedIn ? null : (
          <Pressable accessibilityRole="button" onPress={onSignIn}>
            <Txt variant="caption" color={colors.accent.primary}>
              {t('story.comment_sign_in')}
            </Txt>
          </Pressable>
        )}
      </Stack>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xl }}
        keyboardShouldPersistTaps="handled"
      >
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Txt variant="h3">{t('story.comments_heading')}</Txt>
        {comments.length > 3 ? (
          <Row gap={spacing.sm}>
            <Chip
              label={t('story.comment_sort_top')}
              selected={sort === 'TOP'}
              onPress={() => setSort('TOP')}
            />
            <Chip
              label={t('story.comment_sort_new')}
              selected={sort === 'NEW'}
              onPress={() => setSort('NEW')}
            />
          </Row>
        ) : null}
      </Row>

      {comments.length === 0 ? (
        <Txt variant="bodyCompact" color={colors.text.muted}>
          {t('story.comments_empty')}
        </Txt>
      ) : (
        comments.map((comment) => {
          const hidden = comment.spoiler && !revealed.has(comment.commentId);
          return (
            <Card key={comment.commentId}>
              <Stack gap={spacing.xs}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Txt variant="bodyStrong">{comment.authorName}</Txt>
                  <Txt variant="micro" color={colors.text.muted}>
                    {postedAgo(comment.createdAt, t)}
                  </Txt>
                </Row>

                {hidden ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t('story.comment_spoiler_hidden')}
                    onPress={() =>
                      setRevealed((current) => new Set([...current, comment.commentId]))
                    }
                    style={{
                      padding: spacing.md,
                      borderRadius: radius.control,
                      backgroundColor: colors.bg.elevated,
                      alignItems: 'center',
                    }}
                  >
                    <Txt variant="caption" color={colors.text.muted}>
                      {t('story.comment_spoiler_hidden')}
                    </Txt>
                  </Pressable>
                ) : (
                  <Txt variant="body">{comment.body}</Txt>
                )}

                <Row gap={spacing.lg} style={{ alignItems: 'center', paddingTop: spacing.xs }}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: comment.likedByMe }}
                    accessibilityLabel={t('story.like')}
                    disabled={!signedIn}
                    onPress={() => {
                      const next = !comment.likedByMe;
                      setComments((list) =>
                        list.map((c) =>
                          c.commentId === comment.commentId
                            ? { ...c, likedByMe: next, likes: c.likes + (next ? 1 : -1) }
                            : c,
                        ),
                      );
                      void api.likeComment(comment.commentId, next).catch(() => load(sort));
                    }}
                  >
                    <Row gap={spacing.xs} style={{ alignItems: 'center' }}>
                      <Txt
                        variant="caption"
                        color={comment.likedByMe ? colors.accent.primary : colors.text.muted}
                      >
                        {comment.likedByMe ? '♥' : '♡'}
                      </Txt>
                      <Txt variant="caption" color={colors.text.muted}>
                        {String(comment.likes)}
                      </Txt>
                    </Row>
                  </Pressable>

                  {comment.mine ? (
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => {
                        setComments((list) =>
                          list.filter((c) => c.commentId !== comment.commentId),
                        );
                        void api.deleteComment(comment.commentId).catch(() => load(sort));
                      }}
                    >
                      <Txt variant="caption" color={colors.text.muted}>
                        {t('story.comment_delete')}
                      </Txt>
                    </Pressable>
                  ) : signedIn ? (
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => void api.reportComment(comment.commentId, 'USER_REPORT')}
                    >
                      <Txt variant="caption" color={colors.text.muted}>
                        {t('story.comment_report')}
                      </Txt>
                    </Pressable>
                  ) : null}
                </Row>
              </Stack>
            </Card>
          );
        })
      )}
      </ScrollView>

      {/*
        The composer, pinned.

        It used to sit above the list, so on a story with forty-seven comments
        the box you type into was wherever you had last scrolled away from.
        A comment bar belongs at the bottom, the way every other one does.
      */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border.subtle,
          backgroundColor: colors.bg.base,
          paddingTop: spacing.md,
        }}
      >
        {signedIn ? (
        <Stack gap={spacing.sm}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder={t('story.comment_placeholder')}
            placeholderTextColor={colors.text.muted}
            multiline
            maxLength={1000}
            style={{
              minHeight: 64,
              padding: spacing.md,
              borderRadius: radius.card,
              backgroundColor: colors.bg.elevated,
              color: colors.text.primary,
              fontSize: 15,
            }}
          />
          <Row style={{ justifyContent: 'space-between', alignItems: 'center' }} gap={spacing.md}>
            <Chip
              label={t('story.comment_spoiler_toggle')}
              selected={spoiler}
              onPress={() => setSpoiler(!spoiler)}
            />
            <View style={{ flex: 1 }} />
            <Button
              label={t('story.comment_post')}
              variant="secondary"
              disabled={draft.trim().length === 0 || posting}
              onPress={() => void post()}
            />
          </Row>
          {error ? (
            <Txt variant="caption" color={colors.semantic.danger}>
              {error}
            </Txt>
          ) : null}
        </Stack>
      ) : (
        <Pressable accessibilityRole="button" onPress={onSignIn}>
          <Txt variant="bodyCompact" color={colors.accent.primary}>
            {t('story.comment_sign_in')}
          </Txt>
        </Pressable>
      )}

      </View>
    </View>
  );
}

/**
 * How long ago, in the coarsest unit that is still true.
 *
 * This was built on `Intl.RelativeTimeFormat`, with a comment arguing that the
 * platform already knows how French word order works. The platform does. What
 * it does not do is survive: that constructor **segfaults Hermes on iOS**, so
 * opening any story from Discover killed the app — a SIGSEGV deep inside React
 * Native's mounting transaction, with no JS error anywhere to name the line.
 * It was also formatting in the *device's* language rather than the app's,
 * which is a second bug the first one was hiding.
 *
 * Now keys and ICU plurals, exactly like `wallet.time_in_*`, which has always
 * worked. The word order and the preposition live in the French catalogue,
 * where a French speaker can see them.
 */
function postedAgo(iso: string, t: Translator): string {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  const units: Array<[TranslationKey, number]> = [
    ['story.posted_years', 31_536_000],
    ['story.posted_months', 2_592_000],
    ['story.posted_weeks', 604_800],
    ['story.posted_days', 86_400],
    ['story.posted_hours', 3_600],
    ['story.posted_minutes', 60],
  ];
  for (const [key, size] of units) {
    if (seconds >= size) return t(key, { count: Math.floor(seconds / size) });
  }
  return t('story.posted_now');
}

