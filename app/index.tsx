import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";
import React from "react";

export default function HomeScreen() {

  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.03, { duration: 900 }),
        withTiming(1, { duration: 900 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.arcadeTitle, animatedStyle]}
      >
        SEFICBUC
      </Animated.Text>
      <Text style={styles.title}>Sesizări Trafic</Text>
      <Text style={styles.subtitle}>
        Alege ce vrei să faci mai departe.
      </Text>

      <Link href="/institutii" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Instituții</Text>
        </Pressable>
      </Link>

      <Link href="/sesizare" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Depune o sesizare</Text>
        </Pressable>
      </Link>

      <Link href="/cum-functioneaza" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Cum funcționează / Info.</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#111",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
    logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
    arcadeTitle: {
    fontFamily: "PressStart2P_400Regular",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 22,
    letterSpacing: 2,
  },
});