import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import ToBack from "../components/Allcomponents/ToBack";
import Fund from "../components/Allcomponents/Fund";
import Input from "../components/Allcomponents/Input";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import { colors } from "@/utils/colors";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Fund />

      <ToBack />

      <Image
        source={require("../assets/images/Login/AccessYourAccount.png")}
        style={[
          styles.centerImage,
          { width: width * 0.7, height: width * 0.7 },
        ]}
        resizeMode="contain"
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

      <View style={[styles.registerContainer, { marginTop: height * 0.05 }]}>
        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Esqueci minha senha
        </Text>
      </View>

      <Button
        style={[styles.buttonPosition, { width: width * 0.9, height: 55 }]}
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
  },
  centerImage: {
    alignSelf: "center",
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    zIndex: 10,
  },
  registerText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  registerLink: {
    color: "#00c96f",
    fontFamily: "Montserrat-Regular",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
    fontFamily: "Montserrat",
  },
  buttonPosition: {
    marginTop: 20,
    borderRadius: 12,
  },
  textButton: {
    fontFamily: "Montserrat-Regular",
    fontSize: 22,
    color: colors.purpleDark,
  },
});
