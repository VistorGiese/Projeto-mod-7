import { colors } from "@/utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { AccountProps } from "../../contexts/AccountFromContexto";

<<<<<<< HEAD
interface InputProps<TFieldValues extends FieldValues = AccountProps> {
    label: string;
    iconName: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    placeholder?: string;
    error?: string;
    formProps?: UseControllerProps<TFieldValues>;
    inputProps?: TextInputProps;
    labelStyle?: object;
}

const Input = forwardRef<TextInput, InputProps>(
    ({ label, iconName, placeholder, error = "", formProps, inputProps, labelStyle }, ref) => {
        const hasError = !!error;

        if (!formProps) {
            return (
                <View style={styles.container}>
                    <Text style={[styles.label, labelStyle]}>{label}</Text>
                    <View
                        style={[
                            styles.inputContainer,
                            hasError && { borderColor: "red", borderWidth: 1 },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name={iconName}
                            size={20}
                            color={hasError ? "red" : "#888"}
                            style={styles.icon}
                        />
                        <TextInput
                            ref={ref}
                            style={styles.input}
                            placeholder={placeholder}
                            placeholderTextColor="#888"
                            {...inputProps}
                        />
                    </View>
                    {hasError && <Text style={styles.error}>{error}</Text>}
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={[styles.label, labelStyle]}>{label}</Text>

                <Controller
                    {...formProps}
                    render={({ field }) => (
                        <View
                            style={[
                                styles.inputContainer,
                                hasError && { borderColor: "red", borderWidth: 1 },
                            ]}
                        >
                            <MaterialCommunityIcons
                                name={iconName}
                                size={20}
                                color={hasError ? "red" : "#888"}
                                style={styles.icon}
                            />

                            <TextInput
                                ref={ref}
                                style={styles.input}
                                placeholder={placeholder}
                                placeholderTextColor="#888"
                                value={field.value}
                                onChangeText={field.onChange}
                                {...inputProps}
                            />
                        </View>
                    )}
                />

                {hasError && <Text style={styles.error}>{error}</Text>}
            </View>
        );
    }
);

Input.displayName = "Input";

export default Input;

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
        height: 50,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: "#fff",
        fontFamily: "Montserrat-Regular",
        fontSize: 16,
    },
    error: {
        marginTop: 5,
        color: "red",
        fontSize: 14,
        fontFamily: "Montserrat-Regular",
    },
});
=======
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
>>>>>>> origin/dev
