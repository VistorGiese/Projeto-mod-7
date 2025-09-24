import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/utils/colors";

interface InputProps {
  label: string;
  iconName?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: TextInputProps["keyboardType"];
  style?: ViewStyle;
  labelStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  app?: boolean; // <-- nova prop
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
  labelStyle,
  inputContainerStyle,
  app = false,
}: InputProps) {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>

      <View
        style={[
          styles.inputContainer,
          app && styles.inputContainerApp,
          inputContainerStyle,
        ]}
      >
        {iconName && (
          <MaterialCommunityIcons
            name={iconName}
            size={20}
            color={colors.neutral}
            style={styles.icon}
          />
        )}

        <TextInput
          style={[styles.input, app && styles.inputApp]}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral}
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
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.purple,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  inputContainerApp: {
    backgroundColor: colors.purpleBlack2,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
  },
  inputApp: {
    color: colors.neutral,
  },
});
