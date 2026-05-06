import { ScrollView, Text, StyleSheet } from "react-native";

export default function CumFunctioneazaScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cum funcționează aplicația</Text>

      <Text style={styles.text}>
        Aplicația te ajută să trimiți rapid sesizări către instituțiile competente din București.
      </Text>

      <Text style={styles.text}>
        Alegi problema, completezi detaliile și aplicația îți pregătește automat emailul.
      </Text>

      <Text style={styles.text}>
        Emailul NU este trimis automat — se deschide aplicația ta de mail, iar tu trebuie doar să apeși „Trimite”.
      </Text>

      <Text style={styles.text}>
        Este necesar să ai configurat un cont de email pe telefon (ex: Mail sau Gmail).
      </Text>

      <Text style={styles.text}>
        În secțiunea „Instituții” poți contacta direct autoritățile:
        {"\n"}• apăsând pe email → se deschide aplicația de mail
        {"\n"}• apăsând pe telefon → poți apela direct
      </Text>

      <Text style={styles.text}>
        Pentru Poliția Locală, vei putea selecta sectorul, iar aplicația va alege automat datele corecte.
      </Text>

      <Text style={styles.text}>
        Dacă nu găsești problema ta în listă, poți folosi opțiunea „Personalizat”.
      </Text>

      <Text style={styles.text}>
        În acest caz, vei copia manual o adresă de email și o vei lipi în aplicația de mail.
      </Text>

      <Text style={styles.text}>
        Aplicația NU stochează datele tale personale — totul este trimis prin aplicația ta de email.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 16, lineHeight: 22 },
});