import React from "react";
import { StyleSheet, View } from "react-native";
import FormRegisterInitial from "../components/RegisterPage/RegisterPageInitial";

export default function Register() {
  return (
    <View style={styles.container}>
      <FormRegisterInitial />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: "blue",
  },
  NewAccount: {
    fontSize: 24,
    marginBottom: 20,
    color: "blue",
  },
  MyAccount: {
    fontSize: 24,
    marginBottom: 20,
    color: "blue",
  },
});
