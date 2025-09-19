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
import * as FileSystem from 'expo-file-system';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdditionalInformation() {
  const navigation = useNavigation<NavigationProp>();
  const { formData, updateFormData } = useRegistration();
  const [genre, setGenre] = useState(formData.additionalInfo?.genre || "");
  const [schedule, setSchedule] = useState(formData.additionalInfo?.schedule || "");
  const [showFullText, setShowFullText] = useState(false);
  const handleToggleText = () => setShowFullText((prev) => !prev);
  const handleFinishRegistration = async () => {

    const currentScreenData = { genre, schedule };
    updateFormData({ additionalInfo: currentScreenData });
    const finalData = {
      ...formData,
      additionalInfo: currentScreenData
    };

    const jsonString = JSON.stringify(finalData, null, 2);
    const fileName = `registration_${Date.now()}.json`;
    const filePath = `${FileSystem.documentDirectory}${fileName}`;

    try {
      await FileSystem.writeAsStringAsync(filePath, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      console.log('Arquivo salvo em:', filePath);
      Alert.alert(
        "Cadastro Concluído!",
        `Dados salvos com sucesso em: ${filePath}`, // <-- AQUI A MUDANÇA
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } catch (error) {
      console.error("Erro ao salvar o arquivo:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar o cadastro. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />
      <View style={styles.content}>
        <Text style={styles.title}>QUASE LÁ...</Text>
        <Text style={styles.subtitle}>
          {showFullText
            ? "Defina as preferências do seu estabelecimento. Essas informações ajudam as bandas a entender melhor o seu estilo e personalizar a apresentação de acordo com o que você e seus clientes preferem."
            : "Defina as preferências do seu estabelecimento... "}
          <Text
            style={styles.saibaMais}
            onPress={handleToggleText}
            accessibilityRole="button"
          >
            {showFullText ? " Saiba menos" : " Saiba mais"}
          </Text>
        </Text>
        <View style={styles.inputWrapper}>
          <Input
            label="Gêneros Musicais"
            iconName="music"
            placeholder="Ex: Rock, Sertanejo, MPB"
            value={genre}
            onChangeText={setGenre}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Horário de Atendimento"
            iconName="clock"
            placeholder="Ex: 18h às 23h"
            value={schedule}
            onChangeText={setSchedule}
          />
        </View>
      </View>
      <Button
        style={styles.button}
        onPress={handleFinishRegistration}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
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