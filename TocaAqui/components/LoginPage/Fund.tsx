import { Image, StyleSheet, View } from "react-native";

export default function Fund() {
  return (
    <View style={styles.background}>
      <Image
        source={require("../../assets/images/TelaLogin/gridStarts.png")}
        style={styles.image}
      />
      <Image
        source={require("../../assets/images/TelaLogin/Light.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    backgroundColor: "#1D0238",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    zIndex: 1,
  },
});
