import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import ToBack from "../components/Allcomponents/ToBack";
import Fund from "../components/Allcomponents/Fund";
import Input from "../components/Allcomponents/Input";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import { colors } from "@/utils/colors";

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
        source={require("../assets/images/Login/AccessYourAccount.png")}
        style={styles.centerImage}
      />

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não tem uma conta? </Text>
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("RegisterLocationName")}
        >
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
        labelStyle={{
          fontFamily: "Montserrat-Regular",
        }}
      />

      <Input
        label="Senha"
        iconName="lock"
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        labelStyle={{
          fontFamily: "Montserrat-Regular",
        }}
      />

      <View style={styles.registerContainer}>
        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Esqueci minha senha
        </Text>
      </View>

      <Button
        style={styles.buttonPosition}
        onPress={() => navigation.navigate("HomePage")}
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
    fontFamily: "Montserrat-Regular",
  },
  registerLink: {
    color: "#00c96fff",
    fontFamily: "Montserrat-Regular",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#ffffffff",
    marginTop: 250,
    fontSize: 16,
    textDecorationLine: "underline",
    fontFamily: "Montserrat",
  },
  buttonPosition: {
    width: 420,
    height: 60,
  },
  textButton: {
    fontFamily: "Montserrat-Regular",
    fontSize: 22,
    color: colors.purpleDark,
  },
});
