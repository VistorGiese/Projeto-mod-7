import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from "react-native";
import React from "react";
import Logo from "../components/InitialPage/Logo";
import People from "../components/InitialPage/People";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";

const { width } = Dimensions.get("window");

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Initial() {
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
        <Text style={styles.textButton}>Fazer Login</Text>
      </Button>

      <View style={styles.registerContainer}>/
        <Text style={styles.registerText}>Ainda não tem conta? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterLocationName")}
          style={{ backgroundColor: "transparent" }}
        >
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#130025",
  },
  logoWrapper: {
    marginLeft: 15,
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
    bottom: "10%",
    width: "55%",
    height: "9.5%",
    alignSelf: "center",
    zIndex: 10,
  },
  registerContainer: {
    flexDirection: "row",
    marginBottom: 85,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  registerText: {
    color: "#8c93a5ff",
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  registerLink: {
    color: "#48216B",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  textButton: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    color: "#130025",
  },
});
