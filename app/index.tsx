import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
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
          <Text style={styles.buttonText}>Cum funcționează</Text>
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
});