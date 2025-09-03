import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface StarNumberProps {
  starNumber: number;
}

export default function Stars({ starNumber }: StarNumberProps) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#7381A8" }}>{starNumber}</Text>
      <FontAwesome name="star" size={16} color="#7381A8" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
