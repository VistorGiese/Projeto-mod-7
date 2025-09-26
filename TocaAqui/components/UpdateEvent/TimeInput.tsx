import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { colors } from "@/utils/colors";

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function TimeInput({
  label,
  value,
  onChange,
  error,
}: TimeInputProps) {
  const updateValue = (val: string) => {
    const numeric = val.replace(/[^0-9]/g, "");
    let formatted =
      numeric.length > 2
        ? `${numeric.slice(0, 2)}:${numeric.slice(2, 4)}`
        : numeric;
    if (formatted.length > 5) formatted = formatted.slice(0, 5);
    onChange(formatted);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={label}
        value={value}
        onChangeText={updateValue}
        style={styles.input}
        placeholderTextColor={colors.neutral}
        keyboardType="number-pad"
        maxLength={5}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginRight: 10 },
  input: {
    padding: 15,
    fontSize: 14,
    color: "#fff",
    backgroundColor: colors.purpleBlack2,
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 12,
  },
  error: { color: "#e53e3e", marginTop: 4, marginLeft: 5, fontSize: 12 },
});
