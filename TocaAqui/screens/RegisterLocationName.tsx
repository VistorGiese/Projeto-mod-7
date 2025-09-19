import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions, Alert } from "react-native"; // ALTERAÇÃO: Adicionado Alert
import Input from "../components/Allcomponents/Input";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import Fund from "../components/Allcomponents/Fund";
import ToBack from "../components/Allcomponents/ToBack";
import { colors } from "@/utils/colors";
import { useRegistration } from "../contexts/RegistrationUserContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width, height } = Dimensions.get("window");

export default function RegisterLocationName() {
  const navigation = useNavigation<NavigationProp>();
  const { formData, updateFormData } = useRegistration();
  const [name, setName] = useState(formData.establishmentName || "");
  const [showFullText, setShowFullText] = useState(false);
  const handleToggleText = () => setShowFullText((prev) => !prev);
  const handleNext = () => {
    if (name.trim() === "") {
      Alert.alert("Campo obrigatório", "Por favor, digite o nome do estabelecimento.");
      return;
    }
    updateFormData({ establishmentName: name });
    navigation.navigate("RegisterLocationAndress");
  };

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />
      <Image
        source={require("../assets/images/Register/CreateAccount.png")}
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
        placeholder="Digite o nome do estabelecimento"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
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