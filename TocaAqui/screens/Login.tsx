import React from "react";
import { StyleSheet, View } from "react-native";
import ToBack from "../components/LoginPage/ToBack";
import Form from "../components/LoginPage/Form";
import Fund from "../components/LoginPage/Fund";
import Button from "../components/LoginPage/Button";

export default function Login() {
  return (
    <View style={styles.container}>
      <ToBack />
      <Fund />
      <Form />
      <Button />
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
