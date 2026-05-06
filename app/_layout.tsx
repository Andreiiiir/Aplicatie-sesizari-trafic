import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { KeyboardProvider } from "react-native-keyboard-controller";

import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

// NU mai apelăm direct aici
// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // ținem splash-ul vizibil
        await SplashScreen.preventAutoHideAsync();

        // simulare inițializare app
        await new Promise(resolve => setTimeout(resolve, 500));

        setAppReady(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    prepare();
  }, []);

  if (!appReady) {
    return null; // menține splash-ul nativ
  }

  return (
    <KeyboardProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </KeyboardProvider>
  );
}