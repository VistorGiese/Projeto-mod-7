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
      onPress={() => navigation.navigate("Login")}
    >
      <Text style={styles.text}>Começar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 130,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7381A8",
    height: 100,
    width: 300,
    borderRadius: 15,
    zIndex: 6,
  },
  text: {
    color: "#190230",
    fontSize: 32,
    fontFamily: "Poppins-ExtraBold",
  },
});
