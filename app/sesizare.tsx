import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { institutions } from "../src/data/institutions";
import { matchInstitution } from "../src/features/complaints/matchInstitution";

export default function SesizareScreen() {
  const [problema, setProblema] = useState("");
  const [locatie, setLocatie] = useState("");
  const [detalii, setDetalii] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");

  const allIssues = useMemo(() => {
    return institutions.flatMap((institution) => institution.issues);
  }, []);

  const institution = selectedIssue ? matchInstitution(selectedIssue) : null;

  const handleGenerate = () => {
    if (!selectedIssue || !locatie.trim()) {
      Alert.alert(
        "Date incomplete",
        "Te rog alege tipul problemei și completează locația."
      );
      return;
    }

    Alert.alert("Rezultatul a fost generat", "Vezi mai jos instituția recomandată.");
  };

  const suggestedText = institution
    ? `Bună ziua,

Doresc să semnalez următoarea problemă: ${selectedIssue}.

Locație: ${locatie}
Detalii suplimentare: ${detalii || "Nu au fost adăugate detalii suplimentare."}

Vă rog să analizați situația și să dispuneți măsurile necesare.

Vă mulțumesc.`
    : "";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Depune o sesizare</Text>
      <Text style={styles.subtitle}>
        Alege tipul problemei și completează informațiile de bază.
      </Text>

      <Text style={styles.sectionTitle}>Alege problema</Text>

      <View style={styles.issuesContainer}>
        {allIssues.map((issue) => {
          const isSelected = selectedIssue === issue;

          return (
            <Pressable
              key={issue}
              style={[styles.issueChip, isSelected && styles.issueChipSelected]}
              onPress={() => {
                setSelectedIssue(issue);
                setProblema(issue);
              }}
            >
              <Text
                style={[
                  styles.issueChipText,
                  isSelected && styles.issueChipTextSelected,
                ]}
              >
                {issue}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Tipul problemei"
        value={problema}
        onChangeText={(text) => {
          setProblema(text);
          setSelectedIssue(text);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Locația"
        value={locatie}
        onChangeText={setLocatie}
      />

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Detalii suplimentare"
        value={detalii}
        onChangeText={setDetalii}
        multiline
      />

      <Pressable style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Găsește instituția potrivită</Text>
      </Pressable>

      {institution ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Instituția recomandată</Text>
          <Text style={styles.resultInstitution}>{institution.title}</Text>

          <Text style={styles.resultSubtitle}>Ce ar trebui să trimiți:</Text>
          {institution.instructions.map((instruction) => (
            <Text key={instruction} style={styles.resultItem}>
              • {instruction}
            </Text>
          ))}

          <Text style={styles.resultSubtitle}>Unde să verifici contactul:</Text>
          <Text style={styles.resultText}>{institution.contactHint}</Text>

          <Text style={styles.resultSubtitle}>Text orientativ:</Text>
          <Text style={styles.generatedText}>{suggestedText}</Text>
        </View>
      ) : selectedIssue ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Nu am găsit încă o instituție</Text>
          <Text style={styles.resultText}>
            Pentru această problemă trebuie să mai extindem lista de reguli din aplicație.
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  issuesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  issueChip: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  issueChipSelected: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  issueChipText: {
    color: "#111",
  },
  issueChipTextSelected: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  resultCard: {
    backgroundColor: "#f4f4f4",
    padding: 16,
    borderRadius: 14,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  resultInstitution: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14,
  },
  resultSubtitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 8,
  },
  resultItem: {
    fontSize: 15,
    marginBottom: 6,
  },
  resultText: {
    fontSize: 15,
    lineHeight: 22,
  },
  generatedText: {
    fontSize: 15,
    lineHeight: 22,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
});