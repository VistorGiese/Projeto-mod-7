import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "@/utils/colors";

interface StarNumberProps {
  starNumber: number;
}

export default function Stars({ starNumber }: StarNumberProps) {
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.neutral }}>{starNumber}</Text>
      <FontAwesome name="star" size={16} color={colors.neutral} />
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
