import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import ToBack from "../components/Allcomponents/ToBack";
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

      <Image source={require("../assets/images/TelaLogin/AccessYourAccount.png")} style={styles.centerImage} />

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não tem conta? </Text>
        <Text style={styles.registerLink} onPress={() => navigation.navigate("RegisterLocationName")}>
          Cadastre-se
        </Text>
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

      <View style={styles.registerContainer}>

        <Text style={styles.forgotPassword} onPress={() => navigation.navigate("ForgotPassword")}>
          Esqueci minha senha
        </Text>
      </View>

      <Button style={styles.buttonPosition} onPress={() => navigation.navigate("Initial")}>
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
    color: "#ffffffff",
    marginTop: 250,
    fontSize: 16,
  },
  buttonPosition: {
    width: 420,
    height: 60,
  },
  textButton: {
    fontFamily: "Montserrat-Regular",
    fontSize: 22,
    color: "#28024E",
  },
});
