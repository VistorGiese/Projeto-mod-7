import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Button from "../components/Allcomponents/Button";
import Input from "../components/Allcomponents/Input";
import ToBack from "../components/Allcomponents/ToBack";
import Fund from "../components/Allcomponents/Fund";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import { colors } from "@/utils/colors";

import { useRegistration } from "../contexts/RegistrationUserContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function InformationPersonResponsible() {
  const navigation = useNavigation<NavigationProp>();

  const { formData, updateFormData } = useRegistration();
  const [name, setName] = useState(formData.personalInfo?.name || "");
  const [email, setEmail] = useState(formData.personalInfo?.email || "");
  const [phone, setPhone] = useState(formData.personalInfo?.phone || "");
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => setShowFullText((prev) => !prev);
  const handleNext = () => {
    if (name.trim() === "" || email.trim() === "") {
      Alert.alert("Campos obrigatórios", "Nome e Email são obrigatórios.");
      return;
    }
    if (!email.includes('@')) {
      Alert.alert("Email inválido", "Por favor, insira um email válido.");
      return;
    }
    const personalInfoData = { name, email, phone };
    updateFormData({ personalInfo: personalInfoData });
    navigation.navigate("AdditionalInformation");
  };

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
            iconName="account-outline"
            placeholder="Nome do responsável"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Email"
            iconName="email-outline"
            placeholder="Email do responsável"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Telefone"
            iconName="phone-outline"
            placeholder="Telefone do responsável"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <Button
        style={styles.button}
        onPress={handleNext}
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
    bottom: 40,
  },
  buttonText: {
    color: colors.purpleDark,
    fontSize: 22,
    fontWeight: "bold",
  },
});