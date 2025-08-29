import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import TagMusic from "./TagMusic";
import ArtistType from "./ArtistType";
import Stars from "./Stars";

export default function CardArtist() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/TelaInicial/artist.png")} />
      <View style={styles.containerContent}>
        <Text style={styles.containerTextName}>Nome do cantor</Text>
        <View style={styles.containerTag}>
          <TagMusic genre="Sertanejo" />
        </View>
        <View style={styles.containerInfo}>
          <ArtistType type="Solo" />
          <Stars starNumber={4} />
        </View>
        <TouchableOpacity>Ver perfil</TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    gap: 8,
    borderRadius: 10,
  },
  containerContent: {
    paddingHorizontal: 20,
  },
  containerTextName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "semibold",
    paddingTop: 14,
  },
  containerTag: {
    flexDirection: "row",
  },
  containerInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
});
