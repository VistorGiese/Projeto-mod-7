import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useFonts } from "expo-font";
import { customFonts } from "../../assets/fonts/fonts";

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode; // adiciona children
}

export default function Button({
  onPress,
  style,
  textStyle,
  children,
}: ButtonProps) {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) return null;

  return (
    <View>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        {children ? (
          children
        ) : (
          <Text style={[styles.text, textStyle]}>{""}</Text>
        )}
      </TouchableOpacity>
    </View>
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
    fontSize: 24,
    fontFamily: "Poppins-ExtraBold",
  },
});
