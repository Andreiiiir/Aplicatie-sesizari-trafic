import { ScrollView, Text, StyleSheet } from "react-native";

export default function CumFunctioneazaScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
         1. Aplicația "SeficBuc – Sesizări Trafic București" te ajută să trimiți rapid sesizări către instituțiile competente din București.
      </Text>

      <Text style={styles.text}>
         2. Completezi un formular, adaugi detalii, iar aplicația îți pregătește automat sesizarea și o lipește în aplicația ta de email împreună cu destinatarul competent.
      </Text>

      <Text style={styles.text}>
         3. Pentru ca sesizarea să fie luată în considerare de instituții, este necesar să completezi numele complet și adresa de domiciliu sau reședință.
      </Text>

      <Text style={styles.text}>
         4. Datele introduse NU sunt stocate și NU sunt transmise către servere externe. Acestea sunt folosite doar pentru completarea sesizării care se atașează automat în corpul aplicației tale de email.
      </Text>

      <Text style={styles.text}>
         5. Poți atașa poze sau documente relevante direct din aplicație pentru a susține sesizarea.
      </Text>

      <Text style={styles.text}>
         6. În cazul spețelor adresate Poliției Locale, trebuie să selectezi sectorul, pentru a trimite mesajul către unitatea corectă.
      </Text>

      <Text style={styles.text}>
         7. Aplicația NU trimite automat sesizarea — aceasta este lipită în aplicația ta de mail (Gmail, Mail etc.), iar tu trebuie doar să trimiți email-ul.
      </Text>

      <Text style={styles.text}>
         8. Este necesar să ai configurat un cont de email pe telefon pentru ca aplicația să funcționeze.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 16, lineHeight: 22 },
});