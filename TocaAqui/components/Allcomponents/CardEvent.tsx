import { StyleSheet, Text, View, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface Artist {
  name: string;
  photoUrl: string;
  time: string;
}

interface CardEventProps {
  date: string;
  eventName: string;
  interestedCount: number;
  artists?: Artist[];
}

export default function CardEvent({
  date,
  eventName,
  interestedCount,
  artists = [],
}: CardEventProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.containerDate}>{date}</Text>
      <View>
        <Text style={styles.containerEventName}>{eventName}</Text>
        {artists.length === 0 && (
          <Text style={styles.containerinterestedCount}>
            {interestedCount} artistas interessados
          </Text>
        )}
        {artists.length > 0 && (
          <View style={styles.artistsContainer}>
            {artists.slice(0, 2).map((artist, idx) => (
              <View key={idx} style={styles.artistCard}>
                <View style={styles.artistImageWrapper}>
                  <Image
                    source={{ uri: artist.photoUrl }}
                    style={styles.artistImage}
                  />
                </View>
                <View>
                  <Text style={styles.artistName}>{artist.name}</Text>
                  <Text style={styles.artistTime}>{artist.time}</Text>
                </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#28024E",
    borderRadius: 12,
    padding: "4%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  containerDate: {
    color: "#fff",
    fontFamily: "AkiraExpanded-Superbold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: "auto",
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
  seeMore: {
    marginVertical: "auto",
  },
  artistsContainer: {
    gap: 12,
    marginTop: 4,
  },
  artistCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
  },
  artistImageWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    overflow: "hidden",
  },
  artistImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  artistName: {
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    fontSize: 16,
  },
  artistTime: {
    fontFamily: "Montserrat-Regular",
    color: "#7381A8",
    fontSize: 14,
  },
});
