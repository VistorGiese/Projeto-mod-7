import { colors } from "@/utils/colors";
import { useFonts } from "expo-font";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { customFonts } from "../../assets/fonts/fonts";


interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  onPress,
  style,
  textStyle,
  children,
  disabled,
}: ButtonProps) {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) return null;

  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
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
  disabledButton: {
    backgroundColor: colors.purpleDark,
    opacity: 0.5,
  },
});