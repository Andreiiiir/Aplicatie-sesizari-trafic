import { ScrollView, Text, StyleSheet } from "react-native";

export default function CumFunctioneazaScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cum funcționează aplicația</Text>

      <Text style={styles.text}>
        Aplicația facilitează trimiterea unei sesizări către instituțiile competente
        din București.
      </Text>

      <Text style={styles.text}>
        După completarea formularului, aplicația NU trimite direct sesizarea,
        ci deschide aplicația de email de pe telefonul tău.
      </Text>

      <Text style={styles.text}>
        Mesajul este deja completat automat, iar tu trebuie doar să îl trimiți.
      </Text>

      <Text style={styles.text}>
        Este necesar să ai configurat un cont de email pe telefon (ex: Mail, Gmail)
        pentru ca funcția să funcționeze corect.
      </Text>

      <Text style={styles.text}>
        În cazul în care alegi opțiunea „Personalizat”, va trebui să copiezi manual
        adresa de email și să o lipești în câmpul „Destinatar”.
      </Text>

      <Text style={styles.text}>
        Aplicația nu stochează și nu trimite datele tale — totul este gestionat
        prin aplicația ta de email.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 16, lineHeight: 22 },
});