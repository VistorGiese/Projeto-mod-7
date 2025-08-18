import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/Navigate";

export default function Form() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigation = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/TelaLogin/AccessYourAccount.png")}
        style={styles.imageAccessYourAccount}
      />

      <View style={styles.header}>
        <Text style={styles.headerText}>
          Não tem uma conta?{" "}
          <TouchableOpacity onPress={() => handleNavigation("Inicial")}>
            <Text style={styles.registerLink}>Cadastrar</Text>
          </TouchableOpacity>
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome do Responsável</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="account"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#888"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity onPress={() => handleNavigation("Inicial")}>
          <Text style={styles.forgotPasswordLink}>Esqueci minha senha</Text>
        </TouchableOpacity>

        {/* Botão Entrar */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleNavigation("Inicial")}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    width: "80%",
    justifyContent: "center",
    backgroundColor: "#1c0a37",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
  },
  registerLink: {
    color: "#00ff33ff",
    fontWeight: "bold",
  },
  form: {
    width: "100%",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4B0082",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 16,
  },
  forgotPasswordLink: {
    color: "#9370DB",
    textAlign: "center",
    marginTop: 280,
    marginBottom: 30,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#7381A8",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageAccessYourAccount: {
    marginBottom: 50,
    height: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
