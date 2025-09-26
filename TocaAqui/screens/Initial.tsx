import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import FundInitialPage from "../components/Allcomponents/FundInitialPage";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import { colors } from "@/utils/colors";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Initial() {
  const navigation = useNavigation<NavigationProp>();
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FundInitialPage />
      </View>

      <Image
        source={require("../assets/images/Initial/ShadowPurple.png")}
        style={[styles.shadowImage, { width: width, height: height * 0.5 }]}
        resizeMode="contain"
      />

      <View style={[styles.footerContainer, { bottom: height * 0.05 }]}>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.textButton}>Fazer Login</Text>
        </Button>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Ainda não tem conta? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterLocationName")}
          >
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#130025",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    zIndex: 1,
  },
  shadowImage: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
  },
  footerContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  button: {
    width: "55%",
    paddingVertical: 15,
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    color: colors.purpleDark,
  },
});
