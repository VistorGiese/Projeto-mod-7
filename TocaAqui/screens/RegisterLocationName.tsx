import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Input from "../components/Allcomponents/Input";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import Fund from "../components/Allcomponents/Fund";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get("window");

export default function RegisterLocationName() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Fund />

      <Image
      //source={require("../assets/register-image.png")} // Substitua pelo caminho real da sua imagem
      //style={styles.image}
      />

      <Text style={styles.title}>Bem-vindo!</Text>

      <Text style={styles.subtitle}>Digite seu nome para continuar</Text>

      <Input
        label="Nome"
        iconName="account"
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <Button
        style={styles.button}
        onPress={() => navigation.navigate("Inicial")}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c0a37",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.6,
    height: height * 0.3,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "100%",
    marginTop: 20,
    height: 60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
