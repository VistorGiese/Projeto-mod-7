import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import { colors } from "@/utils/colors";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import CardArtist from "@/components/Allcomponents/CardArtist";
import { bookingService, Booking } from "../http/bookingService";
import Modal from "react-native-modal";
import UpdateEvent from "./UpdateEvent";

type EventDetailRouteProp = RouteProp<RootStackParamList, "EventDetail">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EventDetail() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EventDetailRouteProp>();

  const [event, setEvent] = useState<Booking>(route.params.event);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const imageSource = require("../assets/images/All/BG.png");

  const displayDate = useMemo(() => {
    if (!event.data_show) return "";
    const utcDate = new Date(event.data_show);
    const localDate = new Date(
      utcDate.valueOf() + utcDate.getTimezoneOffset() * 60000
    );
    return localDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, [event.data_show]);

  const handleEditEvent = () => {
    setShowOptionsMenu(false);
    setEditModalVisible(true);
  };

  const handleDeleteEvent = () => {
    setShowOptionsMenu(false);
    Alert.alert(
      "Confirmar Exclusão",
      `Você tem certeza que deseja excluir o evento "${event.titulo_evento}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await bookingService.deleteBooking(event.id);
              Alert.alert("Sucesso!", "O evento foi excluído.");
              navigation.goBack();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir o evento.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleFinishUpdate = (updatedEvent?: Booking) => {
    setEditModalVisible(false);
    if (updatedEvent) {
      setEvent(updatedEvent);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={imageSource} style={styles.imageBackground}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
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

          <Text style={styles.description}>{event.descricao_evento}</Text>
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <FontAwesome5
                name="calendar-alt"
                size={16}
                color={colors.purple}
              />
              <Text style={styles.infoText}>{displayDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome5 name="clock" size={16} color={colors.purple} />
              <Text style={styles.infoText}>
                {event.horario_inicio} - {event.horario_fim}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>ARTISTAS INTERESSADOS</Text>

          {event.banda ? (
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
          ) : (
            <Text style={styles.noArtistText}>
              Ainda não há artistas confirmados para este evento.
            </Text>
          )}
        </View>
      </ScrollView>

      <Modal
        isVisible={isEditModalVisible}
        onBackdropPress={handleFinishUpdate}
        onSwipeComplete={handleFinishUpdate}
        swipeDirection="down"
        style={styles.bottomModal}
      >
        <View style={styles.modalContent}>
          <UpdateEvent event={event} onFinish={handleFinishUpdate} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.purpleBlack },
  imageBackground: { width: "100%", height: 250 },
  backButton: {
    padding: 15,
    marginTop: 40,
    position: "absolute",
    left: 5,
    top: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 50,
  },
  contentContainer: {
    backgroundColor: colors.purpleBlack,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  eventName: {
    fontSize: 26,
    color: "#fff",
    fontFamily: "AkiraExpanded-Superbold",
    flex: 1,
    marginRight: 10,
  },
  description: {
    color: "#ccc",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: "Montserrat-Medium",
  },
  infoSection: {
    marginBottom: 30,
    borderLeftWidth: 3,
    borderLeftColor: colors.purple,
    paddingLeft: 15,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  infoText: {
    color: colors.neutral,
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    marginLeft: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "AkiraExpanded-Superbold",
    marginBottom: 20,
  },
  optionsWrapper: { position: "relative" },
  moreButton: { padding: 5 },
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
    zIndex: 100,
  },
  optionItem: { flexDirection: "row", alignItems: "center", padding: 12 },
  optionText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },

  centeredCardWrapper: {
    alignItems: "center",
  },

  noArtistText: {
    color: "#a9a9a9",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    fontStyle: "italic",
  },

  bottomModal: { justifyContent: "flex-end", margin: 0 },
  modalContent: {
    backgroundColor: colors.purpleBlack2,
    height: "90%",
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
