import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/utils/colors";

interface Props {
  label: string;
  start: string;
  end: string;
  onChange: (field: "start" | "end", value: string) => void;
  onRemove?: () => void;
  error?: { start?: string; end?: string };
  showRemove?: boolean;
}

export default function TimeSlotInput({
  label,
  start,
  end,
  onChange,
  onRemove,
  error,
  showRemove,
}: Props) {
  const formatInput = (val: string) => {
    const numeric = val.replace(/[^0-9]/g, "");
    let formatted =
      numeric.length > 2
        ? `${numeric.slice(0, 2)}:${numeric.slice(2, 4)}`
        : numeric;
    if (formatted.length > 5) formatted = formatted.slice(0, 5);
    return formatted;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Início (HH:MM)"
            value={start}
            onChangeText={(val) => onChange("start", formatInput(val))}
            style={styles.input}
            placeholderTextColor={colors.neutral}
            keyboardType="number-pad"
            maxLength={5}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Fim (HH:MM)"
            value={end}
            onChangeText={(val) => onChange("end", formatInput(val))}
            style={styles.input}
            placeholderTextColor={colors.neutral}
            keyboardType="number-pad"
            maxLength={5}
          />
        </View>
        {showRemove && onRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={22} color="red" />
          </TouchableOpacity>
        )}
      </View>
      {error?.start && <Text style={styles.error}>{error.start}</Text>}
      {error?.end && <Text style={styles.error}>{error.end}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
    fontFamily: "Montserrat-Regular",
  },
  row: { flexDirection: "row", alignItems: "center" },
  inputContainer: {
    flex: 1,
    borderColor: colors.purple,
    backgroundColor: colors.purpleBlack2,
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 10,
  },
  input: {
    padding: 15,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: "#fff",
  },
  deleteButton: { padding: 10 },
  error: {
    color: "#e53e3e",
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    marginTop: 4,
    marginLeft: 5,
  },
});
