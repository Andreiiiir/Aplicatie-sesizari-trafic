import { View, Text, ScrollView, StyleSheet } from "react-native";
import { institutions } from "../src/data/institutions";

export default function InstitutiiScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Instituții</Text>

      {institutions.map((inst) => (
        <View key={inst.id} style={styles.card}>
          <Text style={styles.name}>{inst.title}</Text>

          <Text style={styles.subtitle}>Se ocupă de:</Text>
          {inst.issues.map((issue) => (
            <Text key={issue}>• {issue}</Text>
          ))}

          <Text style={styles.subtitle}>Email:</Text>
          <Text>{inst.email}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  card: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
  },
  name: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  subtitle: { marginTop: 10, fontWeight: "600" },
});