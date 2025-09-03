import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import TagMusic from "./TagMusic";
import ArtistType from "./ArtistType";
import Stars from "./Stars";

export default function CardArtist() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/TelaInicial/artist.png")}
        width={100}
        height={100}
      />
      <View style={styles.containerContent}>
        <Text style={styles.containerTextName}>Nome do cantor</Text>
        <View style={styles.containerTag}>
          <TagMusic genre="Sertanejo" />
        </View>
        <View style={styles.containerInfo}>
          <ArtistType type="Solo" />
          <Stars starNumber={4} />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },
  containerContent: {
    paddingHorizontal: "5%",
    gap: 8,
  },
  containerTextName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "semibold",
    paddingTop: "6%",
    paddingVertical: "2%",
  },
  containerTag: {
    flexDirection: "row",
  },
  containerInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2%",
    paddingVertical: "2%",
  },
  button: {
    paddingVertical: "5%",
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: "#7381A8",
    color: "#7381A8",
  },
  buttonText: {
    color: "#7381A8",
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: "semibold",
  },
});
