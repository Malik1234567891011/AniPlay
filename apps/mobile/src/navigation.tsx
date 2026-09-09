import React from 'react';
import { View } from 'react-native';
import { NavigationContainer, type NavigatorScreenParams, type RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Txt, colors, spacing } from '@aniplay/ui';
import { useStore } from './state/store.jsx';
import { AgeGateScreen, SplashScreen, TasteScreen } from './screens/Onboarding.jsx';
import { DiscoverScreen, SearchScreen } from './screens/Discover.jsx';
import { StoryDetailScreen } from './screens/StoryDetail.jsx';
import { CharacterSetupScreen } from './screens/CharacterSetup.jsx';
import { SessionScreen } from './screens/Session.jsx';
import { WorldSheetScreen } from './screens/WorldSheet.jsx';
import { WalletScreen } from './screens/Wallet.jsx';
import { LibraryScreen, ProfileScreen } from './screens/LibraryProfile.jsx';
import { CreateScreen, ReportHistoryScreen, ReportScreen, SignInScreen } from './screens/Misc.jsx';
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
  Create: undefined;
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
  Create: '✎',
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
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen as never} />
    </Tab.Navigator>
  );
}

export function Navigation(): React.JSX.Element {
  const { ready, ageVerified, onboardingComplete } = useStore();
  const [tasteDone, setTasteDone] = React.useState(false);

  // OB-01 — no artificial delay; the splash lasts exactly as long as boot.
  if (!ready) return <SplashScreen />;
  // OB-02 — before any personalized content.
  if (!ageVerified) return <AgeGateScreen />;
  // OB-03 — optional and skippable.
  if (onboardingComplete && !tasteDone) return <TasteScreen onDone={() => setTasteDone(true)} />;

  return (
    <NavigationContainer theme={navigationTheme}>
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
          <Stack.Screen name="Report" component={ReportScreen as never} />
          <Stack.Screen name="ReportHistory" component={ReportHistoryScreen as never} />
          <Stack.Screen name="Characters" component={CharactersScreen as never} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
