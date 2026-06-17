import { ScrollView, Text, StyleSheet } from "react-native";

export default function CumFunctioneazaScreen() {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.text}>
        1. Aplicația "SeficBuc. - Sesizări trafic București" te ajută să trimiți rapid sesizări către instituțiile competente din București.
      </Text>

      <Text style={styles.text}>
        2. Alegi problema, completezi detaliile și aplicația îți pregătește automat emailul cu sesizarea, gata de trimis.
      </Text>

      <Text style={styles.text}>
        3. Emailul NU este trimis automat — apliația deschide aplicația ta de mail, cu sesizarea pregătită, iar tu trebuie doar să o trimiți.
      </Text>

      <Text style={styles.text}>
        4. Pentru ca aplicația SeficBuc să funcționeze este necesar să ai configurat un cont de email pe telefon (ex: Mail sau Gmail).
      </Text>

      <Text style={styles.text}>
        5. În secțiunea „Instituții” poți contacta direct autoritățile, fără a te ajuta de funcționalitățile din "Depune o sesizare":
        {"\n"}• apăsând pe email → se deschide aplicația de mail
        {"\n"}• apăsând pe telefon → poți apela direct
      </Text>

      <Text style={styles.text}>
        6. Pentru spețele legate de Poliția Locală, vei putea selecta sectorul, iar aplicația va alege automat adresa de email corectă.
      </Text>

      <Text style={styles.text}>
        7. Dacă nu găsești problema ta în listă dar totuși vrei să beneficiezi de funcționalitățile din "Depune o sesizare", poți folosi opțiunea „Personalizat”. În acest caz, vei copia manual o adresă de email din josul paginii și o vei lipi în aplicația de mail.
      </Text>

      <Text style={styles.text}>
        8. Aplicația NU stochează datele tale personale — totul este trimis prin aplicația ta de email.
      </Text>

      <Text style={styles.text}>
        9. Pentru conveniență, după prima sesizare trimisă cu succes, aplicația salvează local, pe telefonul tău, numele și adresa. Poți oricând să ștergi datele salvate apăsând "Șterge datele salvate".
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: "#ffffff", padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, color: "#111111" },
  text: { fontSize: 16, marginBottom: 16, lineHeight: 22, color: "#111111" },
});