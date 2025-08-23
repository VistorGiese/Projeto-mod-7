import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useFonts } from "expo-font";
import { customFonts } from "../../assets/fonts/fonts";

interface ButtonProps {
  title: string; // texto do botão
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  style,
  textStyle,
}: ButtonProps) {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) return null;

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7381A8",
    height: 60,
    width: 250,
    borderRadius: 15,
  },
  text: {
    color: "#130025",
    fontSize: 24, // aumentei para deixar visível
    fontFamily: "Poppins-ExtraBold",
  },
});
