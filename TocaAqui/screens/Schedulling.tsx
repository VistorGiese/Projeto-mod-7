import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import NavBar from "@/components/Allcomponents/NavBar";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/utils/colors";
import CardEvent from "@/components/Allcomponents/CardEvent";
import CreateEvent from "./CreateEvent";

import { bookingService, Booking } from "../http/bookingService";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Schedulling() {
  const navigation = useNavigation<NavigationProp>();
  const [isModalVisible, setModalVisible] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleEventPress = (eventData: Booking) => {
    navigation.navigate("EventDetail", { event: eventData });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color={"#fff"}
          style={{ marginTop: 50 }}
        />
      );
    }

    return (
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const dataObj = new Date(item.data_show);
          const dia = format(dataObj, "dd");
          const mesAbreviado = format(dataObj, "MM", {
            locale: ptBR,
          }).toUpperCase();

          return (
            <CardEvent
              dia={dia}
              mes={mesAbreviado}
              eventName={item.titulo_evento}
              interestedCount={0}
              artists={item.banda ? [item.banda.nome_banda] : []}
              onPress={() => handleEventPress(item)}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/All/BG.png")}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Agendamento</Text>
      </View>

      <View style={styles.containerContent}>
        <View style={styles.buttonsContainer}>
          <Button style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Crie um evento</Text>
            <FontAwesome5 name="plus" size={18} color={colors.purpleBlack} />
          </Button>
        </View>

        <View style={styles.listContainer}>{renderContent()}</View>
      </View>

      <NavBar />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.bottomModal}
      >
        <View style={styles.modalContent}>
          <CreateEvent onClose={() => setModalVisible(false)} />
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.purpleBlack,
    paddingBottom: "10%",
  },
  header: {
    position: "absolute",
    top: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "110%",
  },
  title: {
    fontSize: 24,
    fontFamily: "AkiraExpanded-Superbold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  containerContent: {
    top: "20%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    width: "60%",
    height: 50,
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    color: colors.purpleBlack,
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    paddingBottom: "80%",
  },
  listContent: {
    paddingBottom: 20,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors.purpleBlack2,
    height: "90%",
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
