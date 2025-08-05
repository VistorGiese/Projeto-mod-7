import React from "react";
import { Text, StyleSheet, View } from "react-native";
import ToBack from "../components/LoginPage/ToBack";

export default function Login() {
  return (
    <View style={styles.container}>
      <ToBack />
      <Text style={styles.text}>Tela de Login</Text>
      <Text style={styles.NewAccount}>Criar conta</Text>
      <Text style={styles.MyAccount}>Já possui uma conta?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  NewAccount: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  MyAccount: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
});
