import { Image, StyleSheet, View } from "react-native";

export default function Fund() {
  return (
    <View style={styles.background} pointerEvents="none">
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "#1D0238",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover",
    zIndex: 1,
  },
});
