import { View, Image, StyleSheet } from "react-native";

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splash.png")}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});