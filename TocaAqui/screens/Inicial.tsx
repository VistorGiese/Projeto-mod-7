import { View, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import Logo from "../components/InitialPage/Logo";
import People from "../components/InitialPage/People";
import Button from "../components/InitialPage/Button";

const { width } = Dimensions.get("window");

export default function Inicial() {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo />
      </View>

      <View style={styles.peopleWrapper}>
        <People />
      </View>

      <Image
        source={require("../assets/images/TelaInicial/ShadowPurple.png")}
        style={styles.shadowImage}
        resizeMode="contain"
      />

      <Button />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#130025",
  },
  logoWrapper: {
    marginTop: 120,
    marginLeft: 70,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  peopleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    zIndex: 1,
  },
  shadowImage: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: "50%",
    zIndex: 2,
  },
});
