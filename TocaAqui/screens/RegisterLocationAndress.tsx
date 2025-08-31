import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions, ScrollView } from "react-native";
import Input from "../components/Allcomponents/Input";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import Fund from "../components/Allcomponents/Fund";
import ToBack from "../components/LoginPage/ToBack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width, height } = Dimensions.get("window");

export default function RegisterLocationAndress() {
  const navigation = useNavigation<NavigationProp>();

  const [establishmentName, setEstablishmentName] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../assets/images/TelaRegister/CreateAccount.png")}
          style={styles.image}
        />

        <Text style={styles.title}>Cadastro de Endereço</Text>

        <Input
          label="Nome do Estabelecimento"
          iconName="store"
          placeholder="Digite o nome"
          value={establishmentName}
          onChangeText={setEstablishmentName}
        />

        <Input
          label="Logradouro"
          iconName="map-marker"
          placeholder="Digite o logradouro"
          value={logradouro}
          onChangeText={setLogradouro}
        />

        <Input
          label="CEP"
          iconName="map-marker-radius"
          placeholder="Digite o CEP"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
        />

        <Input
          label="Estado"
          iconName="flag"
          placeholder="Digite o estado"
          value={estado}
          onChangeText={setEstado}
        />

        <Input
          label="Cidade"
          iconName="city"
          placeholder="Digite a cidade"
          value={cidade}
          onChangeText={setCidade}
        />

        <Input
          label="Bairro"
          iconName="home-city-outline"
          placeholder="Digite o bairro"
          value={bairro}
          onChangeText={setBairro}
        />

        <Input
          label="Endereço"
          iconName="road-variant"
          placeholder="Digite o endereço completo"
          value={endereco}
          onChangeText={setEndereco}
        />

        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Initial")}
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
  },
  image: {
    width: width * 0.6,
    height: height * 0.25,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 60,
    marginTop: 20,
  },
  buttonText: {
    color: "#28024E",
    fontSize: 22,
    fontWeight: "bold",
  },
});
