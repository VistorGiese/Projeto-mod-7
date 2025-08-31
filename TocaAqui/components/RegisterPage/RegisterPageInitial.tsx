import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/Navigate";

export default function FormRegisterInitial() {
  const [establishmentName, setEstablishmentName] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleContinuePress = () => {
    console.log("Nome do Estabelecimento:", establishmentName);
    navigation.navigate("Inicial");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>CRIAR CONTA</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Já possui uma conta? </Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.loginButton}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome do Estabelecimento</Text>
            <Text style={styles.description}>
              Insira o nome completo do seu estabelecimento, exatamente como
              você gostaria que fosse exibido no app.
            </Text>

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="home-city-outline"
                size={20}
                color="#9ca3af"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Ex: Bar do João"
                placeholderTextColor="#9ca3af"
                value={establishmentName}
                onChangeText={setEstablishmentName}
              />
            </View>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleContinuePress}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#201335",
    padding: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 448,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#d1d5db",
  },
  loginButton: {
    fontWeight: "bold",
    color: "#6366f1",
    textDecorationLine: "underline",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3a2a5b",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    color: "white",
    fontSize: 16,
  },
  buttonWrapper: {
    paddingTop: 16,
  },
  button: {
    backgroundColor: "#8c82a3",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
