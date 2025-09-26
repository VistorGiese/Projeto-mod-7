import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/utils/colors";

interface CardEventProps {
  dia: string;
  mes: string;
  eventName: string;
  interestedCount: number;
  artists?: string[];
  onPress?: () => void;
}

export default function CardEvent({
  dia,
  mes,
  eventName,
  interestedCount,
  artists = [],
  onPress,
}: CardEventProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.dateContainer}>
        <Text style={styles.dayText}>{dia}</Text>
        <Text style={styles.monthText}>{mes}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.containerEventName}>{eventName}</Text>

        {artists.length === 0 && (
          <Text style={styles.containerinterestedCount}>
            {interestedCount} artistas interessados
          </Text>
        )}

        {artists.length > 0 && (
          <View style={styles.artistsContainer}>
            {artists.slice(0, 2).map((artistName, idx) => (
              <View key={idx} style={styles.artistCard}>
                <Text style={styles.artistName}>{artistName}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <FontAwesome5
        name="arrow-right"
        size={24}
        color="white"
        style={styles.seeMore}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.purpleDark,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  dateContainer: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 50,
  },
  dayText: {
    color: "#fff",
    fontFamily: "AkiraExpanded-Superbold",
    fontSize: 20,
  },
  monthText: {
    color: "#fff",
    fontFamily: "AkiraExpanded-Superbold",
    textTransform: "uppercase",
    fontSize: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  containerEventName: {
    fontFamily: "Montserrat-SemiBold",
    color: "#fff",
    fontSize: 18,
  },
  containerinterestedCount: {
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    fontSize: 16,
  },
  seeMore: {},
  artistsContainer: {
    gap: 8,
    marginTop: 8,
  },
  artistCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  artistName: {
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    fontSize: 16,
  },
});
