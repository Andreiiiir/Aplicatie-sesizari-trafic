import { ThemeProvider, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useColorScheme } from "@/hooks/use-color-scheme";

import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();

      // Splash minim 1 secundă
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setReady(true);

      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <KeyboardProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerTitleAlign: "center",

          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              title: "",
            }}
          />

          <Stack.Screen
            name="institutii"
            options={{
              title: "Instituții",
            }}
          />

          <Stack.Screen
            name="sesizare"
            options={{
              title: "Depune o sesizare",
            }}
          />

          <Stack.Screen
            name="cum-functioneaza"
            options={{
              title: "Cum funcționează",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </KeyboardProvider>
  );
}