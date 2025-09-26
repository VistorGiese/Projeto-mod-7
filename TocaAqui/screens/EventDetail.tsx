import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert, // 1. Importe o Alert
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import { colors } from "@/utils/colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import CardArtist from "@/components/Allcomponents/CardArtist";
import { bookingService } from "../http/bookingService";

type EventDetailRouteProp = RouteProp<RootStackParamList, "EventDetail">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EventDetail() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EventDetailRouteProp>();
  const { event } = route.params;

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const imageSource =
    event.banda && event.banda.imagem
      ? { uri: event.banda.imagem }
      : require("../assets/images/All/BG.png");

  const handleEditEvent = () => {
    setShowOptionsMenu(false);
    console.log("Editar Evento:", event.id);
  };

  const handleDeleteEvent = () => {
    setShowOptionsMenu(false);

    Alert.alert(
      "Confirmar Exclusão",
      `Você tem certeza que deseja excluir o evento "${event.titulo_evento}"? Esta ação não pode ser desfeita.`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Exclusão cancelada"),
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await bookingService.deleteBooking(event.id);

              Alert.alert("Sucesso!", "O evento foi excluído.");
              navigation.goBack();
            } catch (error) {
              console.error("Erro ao excluir evento:", error);
              Alert.alert(
                "Erro",
                "Não foi possível excluir o evento. Tente novamente."
              );
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={imageSource} style={styles.imageBackground}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.eventName}>{event.titulo_evento}</Text>
            <View style={styles.optionsWrapper}>
              <TouchableOpacity
                onPress={() => setShowOptionsMenu(!showOptionsMenu)}
                style={styles.moreButton}
              >
                <MaterialIcons name="more-vert" size={28} color="#fff" />
              </TouchableOpacity>

              {showOptionsMenu && (
                <View style={styles.optionsMenu}>
                  <TouchableOpacity
                    onPress={handleEditEvent}
                    style={styles.optionItem}
                  >
                    <MaterialIcons name="edit" size={24} color="#fff" />
                    <Text style={styles.optionText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDeleteEvent}
                    style={styles.optionItem}
                  >
                    <MaterialIcons name="delete" size={24} color={"red"} />
                    <Text style={[styles.optionText, { color: "red" }]}>
                      Excluir
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {event.descricao_evento && (
            <Text style={styles.description}>{event.descricao_evento}</Text>
          )}

          {event.banda && (
            <View style={styles.centeredCardWrapper}>
              <CardArtist
                artist={{
                  name: event.banda.nome_banda,
                  photoUrl: event.banda.imagem,
                  genres: ["Rock", "Pop"],
                  artistType: "Banda",
                  rating: 0,
                }}
              />
            </View>
          )}

          {!event.banda && (
            <Text style={styles.noBandText}>
              Este evento ainda não possui uma banda confirmada.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purpleBlack,
  },
  imageBackground: {
    width: "100%",
    height: 300,
    justifyContent: "flex-start",
  },
  backButton: {
    padding: 15,
    marginTop: 40,
    alignSelf: "flex-start",
  },
  contentContainer: {
    paddingTop: 20,
    backgroundColor: colors.purpleBlack,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  eventName: {
    fontSize: 26,
    color: "#fff",
    fontFamily: "AkiraExpanded-Superbold",
    flex: 1,
    marginRight: 10,
  },
  optionsWrapper: {
    position: "relative",
  },
  moreButton: {
    padding: 5,
  },
  optionsMenu: {
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
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  optionText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  description: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontFamily: "Montserrat-Medium",
  },
  centeredCardWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  noBandText: {
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 30,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
});
