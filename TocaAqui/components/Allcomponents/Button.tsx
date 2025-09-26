import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import { useFonts } from "expo-font";
import { customFonts } from "../../assets/fonts/fonts";
import { colors } from "@/utils/colors";

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
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
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children ? children : <Text style={[styles.text, textStyle]}>{""}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral,
    borderRadius: 15,
  },
  text: {
    color: colors.purpleDark,
    fontSize: 24,
    fontFamily: "Poppins-ExtraBold",
  },
});
