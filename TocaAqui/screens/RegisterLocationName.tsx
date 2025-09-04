import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Input from "../components/Allcomponents/Input";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import Fund from "../components/Allcomponents/Fund";
import ToBack from "../components/Allcomponents/ToBack";
import { colors } from "@/utils/colors";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width, height } = Dimensions.get("window");

export default function RegisterLocationName() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState("");
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => setShowFullText((prev) => !prev);

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />

      <Image
        source={require("../assets/images/TelaRegister/CreateAccount.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Nome do Estabelecimento</Text>

      <Text style={styles.subtitle}>
        {showFullText
          ? "Insira o nome completo do seu estabelecimento, que será exibido para os usuários."
          : "Insira o nome completo do seu estabelecimento... "}
        <Text
          style={styles.saibaMais}
          onPress={handleToggleText}
          accessibilityRole="button"
        >
          {showFullText ? "Ver menos" : "Saiba mais"}
        </Text>
      </Text>

      <Input
        label=""
        iconName="account"
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <Button
        style={styles.button}
        onPress={() => navigation.navigate("RegisterLocationAndress")}
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
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
    marginBottom: 10,
    marginLeft: 15,
    alignSelf: "flex-start",
    width: "95%",
  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 25,
    textAlign: "left",
    width: "95%",
  },
  saibaMais: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#5000c9ff",
  },
  button: {
    width: "95%",
    marginTop: 350,
    height: 60,
  },
  buttonText: {
    color: colors.purpleDark,
    fontSize: 22,
    fontWeight: "bold",
  },
});
