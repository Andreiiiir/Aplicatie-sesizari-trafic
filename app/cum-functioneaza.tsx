import { ScrollView, Text, StyleSheet } from "react-native";

export default function CumFunctioneazaScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
      Aplicația te ajută să trimiți rapid sesizări către instituțiile competente din București.
      </Text>

      <Text style={styles.text}>
      Completezi formularul, alegi problema, adaugi locația și detalii, iar aplicația deschide automat emailul pregătit pentru trimitere.
      </Text>

      <Text style={styles.text}>
      Pentru ca sesizarea să fie luată în considerare de instituții, este necesar să completezi numele complet și adresa de domiciliu sau reședință.
      </Text>

      <Text style={styles.text}>
      Datele introduse NU sunt stocate și NU sunt transmise către servere externe. Acestea sunt folosite doar pentru completarea emailului trimis de tine.
      </Text>

      <Text style={styles.text}>
      Poți atașa poze sau documente relevante direct din aplicație pentru a susține sesizarea.
      </Text>

      <Text style={styles.text}>
      În cazul sesizărilor către Poliția Locală, trebuie să selectezi sectorul, pentru a trimite mesajul către unitatea corectă.
      </Text>

      <Text style={styles.text}>
      Aplicația NU trimite automat emailul — acesta este deschis în aplicația ta de mail (Gmail, Mail etc.), iar tu trebuie doar să confirmi trimiterea.
      </Text>

      <Text style={styles.text}>
      Este necesar să ai configurat un cont de email pe telefon pentru ca funcția să funcționeze.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 16, lineHeight: 22 },
});