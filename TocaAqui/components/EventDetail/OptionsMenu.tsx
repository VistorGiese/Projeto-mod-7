import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/utils/colors";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function OptionsMenu({ onEdit, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onEdit} style={styles.optionItem}>
        <MaterialIcons name="edit" size={24} color="#fff" />
        <Text style={styles.optionText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.optionItem}>
        <MaterialIcons name="delete" size={24} color="red" />
        <Text style={[styles.optionText, { color: "red" }]}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: colors.purpleBlack2,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 150,
    zIndex: 100,
  },
  optionItem: { flexDirection: "row", alignItems: "center", padding: 12 },
  optionText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
});
