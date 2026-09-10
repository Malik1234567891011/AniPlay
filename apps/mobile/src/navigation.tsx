import React from 'react';
import { View } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
  type NavigatorScreenParams,
  type RouteProp,
} from '@react-navigation/native';
import { createNativeStackNavigator, type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Txt, colors, spacing } from '@aniplay/ui';
import { useStore } from './state/store.jsx';
import { AgeGateScreen, ShowcaseScreen, SplashScreen, TasteScreen } from './screens/Onboarding.jsx';
import { DiscoverScreen, SearchScreen } from './screens/Discover.jsx';
import { StoryDetailScreen } from './screens/StoryDetail.jsx';
import { CharacterSetupScreen } from './screens/CharacterSetup.jsx';
import { SessionScreen } from './screens/Session.jsx';
import { WorldSheetScreen } from './screens/WorldSheet.jsx';
import { WalletScreen } from './screens/Wallet.jsx';
import { LibraryScreen, ProfileScreen } from './screens/LibraryProfile.jsx';
import { CreateScreen, ReportHistoryScreen, ReportScreen, SignInScreen } from './screens/Misc.jsx';
import { ShareScreen } from './screens/Share.jsx';
import { CharactersScreen } from './screens/Characters.jsx';

/**
 * Spec §5 — information architecture.
 *
 * Four root tabs outside a session; a dedicated immersive shell inside one, with
 * the tab bar hidden (§5.1). Sheets are presented modally (§5.2).
 */

export type TabParamList = {
  Discover: undefined;
  Library: undefined;
  Profile: undefined;
};

export type RootParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Search: undefined;
  StoryDetail: { storyId: string };
  CharacterSetup: { storyId: string };
  Session: { sessionId: string };
  WorldSheet: { sessionId: string; tab?: string };
  Wallet: { shortfall?: number } | undefined;
  SignIn: undefined;
  Create: undefined;
  /** SH-01 — everything the card needs is passed in, so it composes offline. */
  Share: {
    storyTitle: string;
    actionText: string | null;
    sceneText: string;
    heroImageUrl?: string | null;
    displayName?: string;
  };
  Report: { targetType: string; targetId: string };
  Characters: undefined;
  ReportHistory: undefined;
};

export type RootNavigation = NativeStackNavigationProp<RootParamList>;
export type RootRoute<T extends keyof RootParamList> = RouteProp<RootParamList, T>;

const Stack = createNativeStackNavigator<RootParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const navigationTheme = {
  dark: true,
  colors: {
    primary: colors.accent.primary,
    background: colors.bg.base,
    card: colors.bg.elevated,
    text: colors.text.primary,
    border: colors.border.subtle,
    notification: colors.accent.secondary,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' as const },
    medium: { fontFamily: 'System', fontWeight: '500' as const },
    bold: { fontFamily: 'System', fontWeight: '600' as const },
    heavy: { fontFamily: 'System', fontWeight: '700' as const },
  },
};

const TAB_GLYPH: Record<keyof TabParamList, string> = {
  Discover: '◈',
  Library: '▤',
  Profile: '◉',
};

function Tabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent.primary,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: {
          backgroundColor: colors.bg.elevated,
          borderTopColor: colors.border.subtle,
          // Spec §27.2 — the bar clears the home indicator.
          height: 58 + spacing.xxl,
          paddingTop: spacing.sm,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
        tabBarIcon: ({ color }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', minWidth: 44, minHeight: 24 }}>
            <Txt variant="h3" color={color}>
              {TAB_GLYPH[route.name]}
            </Txt>
          </View>
        ),
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen as never} />
      <Tab.Screen name="Library" component={LibraryScreen as never} />
      {/* No Create tab at launch. The world builder is not built, and a tab
          that only says "coming soon" is a quarter of the navigation spent on
          something the player cannot do. What is coming is described from the
          profile instead, where it reads as a note rather than a dead end. */}
      <Tab.Screen name="Profile" component={ProfileScreen as never} />
    </Tab.Navigator>
  );
}

export function Navigation(): React.JSX.Element {
  const { ready, ageVerified, onboardingComplete } = useStore();
  const [tasteDone, setTasteDone] = React.useState(false);
  const [showcaseDone, setShowcaseDone] = React.useState(false);
  // A story chosen on the showcase, opened once the navigator exists. Onboarding
  // renders instead of the navigator, so it has nothing to navigate with.
  const [openStoryId, setOpenStoryId] = React.useState<string | null>(null);
  const navigationRef = useNavigationContainerRef<RootParamList>();

  // OB-01 — no artificial delay; the splash lasts exactly as long as boot.
  if (!ready) return <SplashScreen />;
  // OB-02 — before any personalized content.
  if (!ageVerified) return <AgeGateScreen />;
  // OB-03 — optional and skippable.
  if (onboardingComplete && !tasteDone) return <TasteScreen onDone={() => setTasteDone(true)} />;
  // OB-04 — five worlds and a way in, rather than dropping somebody who has
  // just told us what they like onto a shelf of twenty-three.
  if (onboardingComplete && !showcaseDone) {
    return (
      <ShowcaseScreen
        onSeeAll={() => setShowcaseDone(true)}
        onOpen={(storyId) => {
          setOpenStoryId(storyId);
          setShowcaseDone(true);
        }}
      />
    );
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navigationTheme}
      onReady={() => {
        if (!openStoryId) return;
        navigationRef.navigate('StoryDetail', { storyId: openStoryId });
        setOpenStoryId(null);
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg.base },
          // Spec §25.1 — cinematic transitions only at scene boundaries.
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="StoryDetail" component={StoryDetailScreen as never} />
        <Stack.Screen name="CharacterSetup" component={CharacterSetupScreen as never} />
        <Stack.Screen
          name="Session"
          component={SessionScreen as never}
          options={{ animation: 'fade', gestureEnabled: false }}
        />

        {/* Spec §25.10 — scoped tasks are sheets. */}
        <Stack.Group screenOptions={{ presentation: 'modal', animation: 'slide_from_bottom' }}>
          <Stack.Screen name="Search" component={SearchScreen as never} />
          <Stack.Screen name="WorldSheet" component={WorldSheetScreen as never} />
          <Stack.Screen name="Wallet" component={WalletScreen as never} />
          <Stack.Screen name="SignIn" component={SignInScreen as never} />
          <Stack.Screen name="Create" component={CreateScreen as never} />
          <Stack.Screen name="Share" component={ShareScreen as never} options={{ presentation: 'modal' }} />
          <Stack.Screen name="Report" component={ReportScreen as never} />
          <Stack.Screen name="ReportHistory" component={ReportHistoryScreen as never} />
          <Stack.Screen name="Characters" component={CharactersScreen as never} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
