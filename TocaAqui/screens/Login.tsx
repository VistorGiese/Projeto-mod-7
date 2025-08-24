import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import ToBack from "../components/LoginPage/ToBack";
import Fund from "../components/Allcomponents/Fund";
import Input from "../components/Allcomponents/Input";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get("window");

export default function Login() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Fund />

      <ToBack />

      <Image
        source={require("../assets/images/TelaLogin/AccessYourAccount.png")}
        style={styles.centerImage}
      />

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Ainda não tem conta? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterLocationName")}
          style={{ backgroundColor: "transparent" }}
        >
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

      <Input
        label="Nome do Responsável"
        iconName="account"
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <Input
        label="Senha"
        iconName="lock"
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => navigation.navigate("Inicial")}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <Button
        style={styles.buttonPosition}
        onPress={() => navigation.navigate("Inicial")}
      >
        <Text style={styles.textButton}>Entrar</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#1c0a37",
    width: width,
    height: height,
  },
  centerImage: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    alignSelf: "center",
  },
  registerContainer: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center",
    zIndex: 10,
  },
  registerText: {
    color: "#fff",
    fontSize: 16,
  },
  registerLink: {
    color: "#00c96fff",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#9370DB",
    textDecorationLine: "underline",

    marginTop: 250,
    textAlign: "center",
  },
  buttonPosition: {
    width: 420,
    height: 60,
    marginTop: 20,
  },
  textButton: {
    fontFamily: "Montserrat-Regular",
    fontSize: 22,
    color: "#28024E",
  },
});
