import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, GUTTER } from '@plotbreak/ui';
import { Comments } from '../components/Comments.jsx';
import { useStore } from '../state/store.jsx';
import type { RootNavigation, RootRoute } from '../navigation.jsx';

/**
 * The whole comment section, on its own screen.
 *
 * It used to live inline on the story page, vertically, all of it — so a world
 * with forty-seven comments pushed the cast, the related worlds and the button
 * that starts the story off the bottom of a page that never ended. The story
 * page carries a shelf of a few now, and this is where "see all" goes.
 *
 * `KeyboardAvoidingView` because the composer is pinned to the bottom and a
 * keyboard that covers the box you are typing in is the oldest bug in mobile.
 */
export function CommentsScreen({
  navigation,
  route,
}: {
  navigation: RootNavigation;
  route: RootRoute<'Comments'>;
}): React.JSX.Element {
  const { isGuest } = useStore();
  const { storyId } = route.params;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* `Comments` owns the scrolling here, because the composer under it
            is pinned and must not scroll away with the list. */}
        <View style={{ flex: 1, paddingHorizontal: GUTTER, paddingTop: spacing.md }}>
          <Comments
            storyId={storyId}
            signedIn={!isGuest}
            onSignIn={() => navigation.navigate('SignIn')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
