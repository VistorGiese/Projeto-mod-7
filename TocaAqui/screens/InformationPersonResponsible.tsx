import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Allcomponents/Button";
import Input from "../components/Allcomponents/Input";
import ToBack from "../components/Allcomponents/ToBack";
import Fund from "../components/Allcomponents/Fund";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import { colors } from "@/utils/colors";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function InformationPersonResponsible() {
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => setShowFullText((prev) => !prev);

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />

      <View style={styles.content}>
        <Text style={styles.title}>INFORMAÇÕES</Text>

        <Text style={styles.subtitle}>
          {showFullText
            ? "Preencha as informações do proprietário do estabelecimento para facilitar o contato das bandas, caso haja necessidade de mais detalhes ou ajustes sobre a contratação."
            : "Preencha as informações do proprietário... "}
          <Text
            style={styles.saibaMais}
            onPress={handleToggleText}
            accessibilityRole="button"
          >
            {showFullText ? " Ver menos" : " Saiba mais"}
          </Text>
        </Text>

        <View style={styles.inputWrapper}>
          <Input
            label="Nome"
            iconName="eye"
            placeholder="Nome do responsável"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Email"
            iconName="mail"
            placeholder="Email do responsável"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Telefone"
            iconName="phone"
            placeholder="Telefone do responsável"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <Button
        style={styles.button}
        onPress={() => navigation.navigate("AdditionalInformation")}
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    width: "100%",
    marginTop: 200,
    paddingHorizontal: 15,
    alignItems: "flex-start",
    marginLeft: 15,
  },
  title: {
    fontSize: 35,
    fontFamily: "AkiraExpanded-Superbold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 23,
    color: "#ccc",
    marginBottom: 25,
    textAlign: "left",
    width: "98%",
  },
  saibaMais: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#5000c9ff",
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    width: "95%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: 900,
  },
  buttonText: {
    color: colors.purpleDark,
    fontSize: 22,
    fontWeight: "bold",
  },
});
