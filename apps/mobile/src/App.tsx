import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '@aniplay/ui';
import { AppStoreProvider } from './state/store';
import { Navigation } from './navigation';

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <SafeAreaProvider>
        <AppStoreProvider>
          {/* Dark-only at launch (spec §25.2); every colour is tokenized for a
              future light theme. */}
          <StatusBar style="light" />
          <Navigation />
        </AppStoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
