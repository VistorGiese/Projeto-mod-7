import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import Input from "../components/Allcomponents/Input";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import Fund from "../components/Allcomponents/Fund";
import ToBack from "../components/Allcomponents/ToBack";
import { colors } from "@/utils/colors";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterLocationName() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState("");
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />

      <Image
        source={require("../assets/images/Register/CreateAccount.png")}
        style={[styles.image, { width: width * 0.6, height: height * 0.25 }]}
        resizeMode="contain"
      />

      <Text style={styles.title}>Nome do Estabelecimento</Text>

      <Text style={styles.subtitle}>
        Insira o nome completo do seu estabelecimento, que será exibido para os
        usuários.
      </Text>

      <Input
        label=""
        iconName="account"
        placeholder="Digite o nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <Button
        style={[styles.button, { width: "95%", marginTop: height * 0.05 }]}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
    marginBottom: 10,
    alignSelf: "flex-start",
    width: "95%",
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 20,
    textAlign: "left",
    width: "95%",
    fontFamily: "Montserrat-Regular",
    lineHeight: 22,
  },
  button: {
    height: 55,
    borderRadius: 12,
  },
  buttonText: {
    color: colors.purpleDark,
    fontSize: 22,
    fontWeight: "bold",
  },
});
