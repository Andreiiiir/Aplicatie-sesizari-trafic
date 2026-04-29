import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from "react-native";
import { institutions } from "../src/data/institutions";

export default function InstitutiiScreen() {
  const openEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const openPhone = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

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

          {/* POLITIA LOCALA CU SECTOARE */}
          {inst.sectors ? (
            <>
              <Text style={styles.subtitle}>Contact pe sectoare:</Text>

              {inst.sectors.map((s) => (
                <View key={s.sector} style={styles.sectorBox}>
                  <Text style={{ fontWeight: "600" }}>{s.sector}</Text>

                  <Pressable onPress={() => openEmail(s.email)}>
                    <Text style={styles.link}>{s.email}</Text>
                  </Pressable>

                  <Pressable onPress={() => openPhone(s.phone)}>
                    <Text style={styles.link}>{s.phone}</Text>
                  </Pressable>
                </View>
              ))}
            </>
          ) : (
            <>
              <Text style={styles.subtitle}>Email:</Text>
              <Pressable onPress={() => openEmail(inst.email!)}>
                <Text style={styles.link}>{inst.email}</Text>
              </Pressable>

              <Text style={styles.subtitle}>Telefon:</Text>
              <Pressable onPress={() => openPhone(inst.phone!)}>
                <Text style={styles.link}>{inst.phone}</Text>
              </Pressable>
            </>
          )}
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
  link: { color: "blue", marginTop: 4 },
  sectorBox: {
    marginTop: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});