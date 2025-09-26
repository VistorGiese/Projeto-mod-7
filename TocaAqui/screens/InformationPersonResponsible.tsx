import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
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
  const { height } = useWindowDimensions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />

      <View style={[styles.content, { marginTop: height * 0.2 }]}>
        <Text style={styles.title}>INFORMAÇÕES</Text>

        <Text style={styles.subtitle}>
          Preencha as informações do proprietário do estabelecimento para
          facilitar o contato das bandas, caso haja necessidade de mais detalhes
          ou ajustes sobre a contratação.
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
        style={[styles.button, { marginTop: height * 0.05 }]}
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
    paddingHorizontal: 15,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 32,
    fontFamily: "AkiraExpanded-Superbold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#ccc",
    marginBottom: 25,
    textAlign: "left",
    width: "98%",
    lineHeight: 22,
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
    marginBottom: "10%",
  },
  buttonText: {
    color: colors.purpleDark,
    fontSize: 22,
    fontWeight: "bold",
  },
});
