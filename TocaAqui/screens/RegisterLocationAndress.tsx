import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Input from "../components/Allcomponents/Input";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import Fund from "../components/Allcomponents/Fund";
import ToBack from "../components/LoginPage/ToBack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterLocationAndress() {
  const navigation = useNavigation<NavigationProp>();

  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => setShowFullText((prev) => !prev);

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>ENDEREÇO</Text>

        <Text style={styles.subtitle}>
          {showFullText
            ? "Forneça o endereço completo do estabelecimento. Esse campo é importante para que os clientes encontrem facilmente o seu local."
            : "Forneça o endereço completo do estabelecimento... "}
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
            label="CEP"
            iconName="map-marker-radius"
            placeholder="Digite o CEP"
            value={cep}
            onChangeText={setCep}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Estado"
            iconName="flag"
            placeholder="Digite o estado"
            value={estado}
            onChangeText={setEstado}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Cidade"
            iconName="city"
            placeholder="Digite a cidade"
            value={cidade}
            onChangeText={setCidade}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Bairro"
            iconName="home-city-outline"
            placeholder="Digite o bairro"
            value={bairro}
            onChangeText={setBairro}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Endereço"
            iconName="road-variant"
            placeholder="Digite o endereço completo"
            value={endereco}
            onChangeText={setEndereco}
          />
        </View>

        <Button
          style={styles.button}
          onPress={() => navigation.navigate("InformationPersonResponsible")}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c0a37",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 35,
    fontFamily: "AkiraExpanded-Superbold",
    color: "#fff",
    alignSelf: "flex-start",
    marginBottom: 30,
    marginTop: 200,
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 23,
    color: "#ccc",
    marginBottom: 25,
    textAlign: "left",
    width: "98%",
    marginLeft: 25,
  },
  saibaMais: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#5000c9ff",
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 25,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "95%",
    height: 60,
    marginTop: 120,
  },
  buttonText: {
    color: "#28024E",
    fontSize: 22,
    fontWeight: "bold",
  },
});
