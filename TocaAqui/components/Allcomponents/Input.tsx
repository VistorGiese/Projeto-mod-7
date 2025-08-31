import React from "react";
import { StyleSheet, View, Text, TextInput, ViewStyle, TextStyle, TextInputProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface InputProps {
  label: string;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: TextInputProps["keyboardType"];
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Input({
  label,
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  autoCapitalize = "none",
  keyboardType = "default",
  textStyle,
}: InputProps) {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.label, textStyle]}>{label}</Text>
      <View style={styles.inputContainer}>

        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color="#888"
          style={styles.icon}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginBottom: 15,
  },
  label: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "AkiraExpanded-Semibold",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4B0082",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 16,
  },
});
