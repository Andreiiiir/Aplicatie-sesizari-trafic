import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from "react-native";
import { institutions } from "../src/data/institutions";

export default function InstitutiiScreen() {
  const openEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const openPhone = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const openAddress = (address: string) => {
    const encoded = encodeURIComponent(address);
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${encoded}`
    );
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
              <Text style={styles.subtitle}>Contact:</Text>

              {inst.sectors.map((s) => (
                <View key={s.sector} style={styles.sectorBox}>
                  <Text style={{ fontWeight: "600" }}>{s.sector}</Text>

                    <Pressable
                      onPress={() => openEmail(s.email)}
                      style={styles.contactButton}
                    >
                      <Text style={styles.link}>📧 {s.email}</Text>
                    </Pressable>

                    {s.phones.map((phone) => (
                      <Pressable
                        key={phone}
                        onPress={() => openPhone(phone)}
                        style={styles.contactButton}
                      >
                        <Text style={styles.link}>📞 {phone}</Text>
                      </Pressable>
                    ))}

                    <Pressable
                      onPress={() => openAddress(s.address)}
                      style={styles.contactButton}
                    >
                      <Text style={styles.link}>📍 {s.address}</Text>
                    </Pressable>

                </View>
              ))}
            </>
          ) : (
            <>
            <Text style={styles.subtitle}>Contact:</Text>

            <View style={styles.sectorBox}>
              <Pressable
                onPress={() => openEmail(inst.email!)}
                style={styles.contactButton}
              >
                <Text style={styles.link}>📧 {inst.email}</Text>
              </Pressable>

              <Pressable
                onPress={() => openPhone(inst.phone!)}
                style={styles.contactButton}
              >
                <Text style={styles.link}>📞 {inst.phone}</Text>
              </Pressable>

              <Pressable onPress={() => openAddress(inst.address!)}
                style={styles.contactButton}
                >
                <Text style={styles.link}>📍 {inst.address}</Text>
              </Pressable>

            </View>
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contactTouch: {
  paddingVertical: 8,
  paddingHorizontal: 4,
},
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
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "space-between",
  },
  contactButton: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
});