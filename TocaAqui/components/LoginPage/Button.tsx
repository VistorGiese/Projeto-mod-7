import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { customFonts } from "../../assets/fonts/fonts";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Navigate";

export default function Button() {
  const [fontsLoaded] = useFonts(customFonts);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!fontsLoaded) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Inicial")}
    >
      <Text style={styles.text}>Cadastrar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7381A8",
    paddingVertical: 15,
    paddingHorizontal: 158,
    borderRadius: 25,
    position: "absolute",
    bottom: "17%",
    alignItems: "center",
  },
  text: {
    color: "#190230",
    fontSize: 28,
    fontFamily: "Poppins-Medium",
  },
});
