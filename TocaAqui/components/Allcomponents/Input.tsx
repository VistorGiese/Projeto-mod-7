import { colors } from "@/utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { AccountProps } from "../../contexts/AccountFromContexto";

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