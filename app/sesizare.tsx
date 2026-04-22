import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as MailComposer from "expo-mail-composer";
import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { institutions } from "../src/data/institutions";

function matchInstitution(issue: string) {
  const normalizedIssue = issue.trim().toLowerCase();

  return (
    institutions.find((institution) =>
      institution.issues.some(
        (knownIssue) => knownIssue.toLowerCase() === normalizedIssue
      )
    ) ?? null
  );
}

export default function SesizareScreen() {
  const [problema, setProblema] = useState("");
  const [locatie, setLocatie] = useState("");
  const [detalii, setDetalii] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<
    { name: string; uri: string; mimeType?: string }[]
  >([]);
  const [successMessage, setSuccessMessage] = useState("");

  const allIssues = useMemo(() => {
    const issues = institutions.flatMap((institution) => institution.issues);
    return [...issues, "Personalizat"];
  }, []);

  const allPublicEmails = useMemo(() => {
    return institutions.flatMap((institution) =>
      institution.publicEmails.map((email) => ({
        institutionTitle: institution.title,
        email,
      }))
    );
  }, []);

  const isCustomIssue = selectedIssue.trim().toLowerCase() === "personalizat";

  const institution =
    selectedIssue && !isCustomIssue ? matchInstitution(selectedIssue) : null;

  const suggestedText = selectedIssue
    ? `Bună ziua,

Doresc să semnalez următoarea problemă: ${selectedIssue}.

Locație: ${locatie}
Detalii suplimentare: ${detalii || "Nu au fost adăugate detalii suplimentare."}

Vă rog să analizați situația și să dispuneți măsurile necesare.

Vă mulțumesc.`
    : "";

  const handleCopyEmail = async (email: string) => {
    await Clipboard.setStringAsync(email);
    Alert.alert("Adresă copiată", `${email} a fost copiată în clipboard.`);
  };

  const handlePickFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const files = result.assets.map((asset) => ({
        name: asset.name,
        uri: asset.uri,
        mimeType: asset.mimeType,
      }));

      setAttachedFiles((prev) => [...prev, ...files]);
    } catch {
      Alert.alert(
        "Eroare",
        "Nu am putut selecta fișierele din aplicația Fișiere."
      );
    }
  };

  const handlePickFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permisiune necesară",
        "Aplicația are nevoie de acces la poze pentru a atașa imagini."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.8,
      allowsMultipleSelection: true,
    });

    if (result.canceled) {
      return;
    }

    const files = result.assets.map((asset, index) => ({
      name: asset.fileName ?? `poza-${Date.now()}-${index}.jpg`,
      uri: asset.uri,
      mimeType: asset.mimeType ?? "image/jpeg",
    }));

    setAttachedFiles((prev) => [...prev, ...files]);
  };

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permisiune necesară",
        "Aplicația are nevoie de acces la cameră pentru a face o fotografie."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const files = result.assets.map((asset, index) => ({
      name: asset.fileName ?? `camera-${Date.now()}-${index}.jpg`,
      uri: asset.uri,
      mimeType: asset.mimeType ?? "image/jpeg",
    }));

    setAttachedFiles((prev) => [...prev, ...files]);
  };

  const handleAddAttachment = () => {
    Alert.alert("Adaugă atașament", "Alege sursa fișierului.", [
      { text: "Poze", onPress: handlePickFromLibrary },
      { text: "Cameră", onPress: handleTakePhoto },
      { text: "Fișiere", onPress: handlePickFiles },
      { text: "Anulează", style: "cancel" },
    ]);
  };

  const handleRemoveFile = (uri: string) => {
    setAttachedFiles((prev) => prev.filter((file) => file.uri !== uri));
  };

  const handleSendEmail = async () => {
    if (!selectedIssue || !locatie.trim()) {
      Alert.alert("Date incomplete", "Completează problema și locația.");
      return;
    }

    if (!institution && !isCustomIssue) {
      Alert.alert(
        "Instituție negăsită",
        "Pentru această problemă nu avem încă o autoritate configurată."
      );
      return;
    }

    const isAvailable = await MailComposer.isAvailableAsync();

    if (!isAvailable) {
      Alert.alert(
        "Email indisponibil",
        "Pe acest dispozitiv nu putem deschide compunerea de email."
      );
      return;
    }

    if (isCustomIssue) {
      Alert.alert(
        "Selectează manual destinatarul",
        'Pentru speța "Personalizat", copiază una dintre adresele afișate mai jos și lipește-o în câmpul "Destinatar" după ce se deschide aplicația de mail.'
      );
    }

    try {
      const result = await MailComposer.composeAsync({
        recipients: isCustomIssue ? [] : institution ? [institution.email] : [],
        subject: `Sesizare trafic - ${selectedIssue}`,
        body: suggestedText,
        attachments: attachedFiles.map((file) => file.uri),
      });

      if (result.status === "cancelled") {
        setSuccessMessage("");
        Alert.alert("Trimitere anulată", "Emailul nu a fost trimis.");
        return;
      }

      if (result.status === "saved") {
        setSuccessMessage(
          isCustomIssue
            ? "Sesizarea a fost pregătită ca draft. Dacă ai ales Personalizat, lipește manual adresa copiată în câmpul Destinatar."
            : `Sesizarea a fost pregătită pentru ${institution?.title}. Verifică draftul din aplicația ta de mail.`
        );
        return;
      }

      setSuccessMessage(
        isCustomIssue
          ? "Sesizarea a fost pregătită și trimisă. Dacă ai ales Personalizat, verifică faptul că ai lipit manual adresa corectă în câmpul Destinatar."
          : `Sesizarea a fost pregătită și trimisă către ${institution?.title}. Te rugăm să urmărești răspunsul în aplicația de mail folosită pe telefon.`
      );
    } catch {
      Alert.alert("Eroare", "A apărut o problemă la deschiderea emailului.");
    }
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={24}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Depune o sesizare</Text>
      <Text style={styles.subtitle}>
        Completează formularul, atașează fișiere și trimite emailul pregătit.
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
                setSuccessMessage("");
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
          setSuccessMessage("");
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Locația"
        value={locatie}
        onChangeText={(text) => {
          setLocatie(text);
          setSuccessMessage("");
        }}
      />

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Detalii suplimentare"
        value={detalii}
        onChangeText={(text) => {
          setDetalii(text);
          setSuccessMessage("");
        }}
        multiline
      />

      <Pressable style={styles.secondaryButton} onPress={handleAddAttachment}>
        <Text style={styles.secondaryButtonText}>Adaugă atașamente</Text>
      </Pressable>

      {attachedFiles.length > 0 ? (
        <View style={styles.filesCard}>
          <Text style={styles.resultSubtitle}>Fișiere atașate</Text>
          {attachedFiles.map((file) => (
            <View key={file.uri} style={styles.fileRow}>
              <Text style={styles.fileName}>{file.name}</Text>
              <Pressable onPress={() => handleRemoveFile(file.uri)}>
                <Text style={styles.removeText}>Șterge</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      {institution ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Instituția competentă</Text>
          <Text style={styles.resultInstitution}>{institution.title}</Text>
          <Text style={styles.resultText}>
            Sesizarea va fi pregătită pentru: {institution.email}
          </Text>

          <Text style={styles.resultSubtitle}>Instrucțiuni</Text>
          {institution.instructions.map((instruction) => (
            <Text key={instruction} style={styles.resultItem}>
              • {instruction}
            </Text>
          ))}
        </View>
      ) : null}

      {isCustomIssue ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Destinatar ales manual</Text>
          <Text style={styles.resultText}>
            Dacă nu ești convins că speța selectată trimite sesizarea către
            autoritatea potrivită, poți folosi opțiunea „Personalizat”.
          </Text>

          <Text style={styles.resultSubtitle}>Important</Text>
          <Text style={styles.resultText}>
            Apăsând pe una dintre adresele de email de mai jos, aceasta va fi
            copiată. După ce apeși pe butonul de trimitere și se deschide
            aplicația de mail, lipește adresa copiată în câmpul „Destinatar”.
          </Text>

          <Text style={styles.resultSubtitle}>Adrese publice disponibile</Text>

          {allPublicEmails.map((item) => (
            <Pressable
              key={`${item.institutionTitle}-${item.email}`}
              style={styles.emailCopyButton}
              onPress={() => handleCopyEmail(item.email)}
            >
              <Text style={styles.emailInstitution}>
                {item.institutionTitle}
              </Text>
              <Text style={styles.emailValue}>{item.email}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <Pressable style={styles.button} onPress={handleSendEmail}>
        <Text style={styles.buttonText}>Trimite prin email</Text>
      </Pressable>

      {successMessage ? (
        <View style={styles.successCard}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Operațiune reușită</Text>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}
    </KeyboardAwareScrollView>
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
  secondaryButton: {
    backgroundColor: "#f3f3f3",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  secondaryButtonText: {
    color: "#111",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  resultCard: {
    backgroundColor: "#f4f4f4",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  filesCard: {
    backgroundColor: "#fafafa",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  fileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
  },
  removeText: {
    color: "#c00",
    fontWeight: "600",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  resultInstitution: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
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
  emailCopyButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  emailInstitution: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  emailValue: {
    fontSize: 15,
    color: "#2563eb",
  },
  successCard: {
    backgroundColor: "#ecfdf3",
    borderWidth: 1,
    borderColor: "#b7ebc6",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: "center",
  },
  successIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  successText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
});