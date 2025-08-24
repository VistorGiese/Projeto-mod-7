import { View, StyleSheet, Image, Dimensions, Text } from "react-native";
import React from "react";
import Logo from "../components/InitialPage/Logo";
import People from "../components/InitialPage/People";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";

const { width } = Dimensions.get("window");

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Inicial() {
  const navigation = useNavigation<NavigationProp>();

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

      <Button
        style={styles.buttonPosition}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.textButton}>Começar</Text>
      </Button>
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
  buttonPosition: {
    position: "absolute",
    bottom: 120,
    width: 320,
    height: 110,
    zIndex: 10,
  },
  textButton: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    color: "#130025",
  },
});
