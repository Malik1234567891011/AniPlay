import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, UiLocaleProvider } from '@aniplay/ui';
import { AppStoreProvider, useStore } from './state/store';
import { Navigation } from './navigation';

/**
 * The bridge between the app's locale and the design system's.
 *
 * `packages/ui` is a library and cannot reach the store, so the locale is
 * handed to it through a context mounted once, here. Separated into its own
 * component because it has to be *inside* `AppStoreProvider` to read from it.
 */
function LocalizedApp(): React.JSX.Element {
  const { locale } = useStore();
  return (
    <UiLocaleProvider locale={locale}>
      <Navigation />
    </UiLocaleProvider>
  );
}

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <SafeAreaProvider>
        <AppStoreProvider>
          {/* Dark-only at launch (spec §25.2); every colour is tokenized for a
              future light theme. */}
          <StatusBar style="light" />
          <LocalizedApp />
        </AppStoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
