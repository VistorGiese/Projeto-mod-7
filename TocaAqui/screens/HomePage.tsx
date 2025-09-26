import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import { colors } from "@/utils/colors";

import CardArtist from "@/components/Allcomponents/CardArtist";
import FindArtistSection from "@/components/Allcomponents/CardArtistType";
import CategorySection from "@/components/Allcomponents/CardCategory";
import CardEvent from "@/components/Allcomponents/CardEvent";
import NavBar from "@/components/Allcomponents/NavBar";

const MOCK_LAST_WORK = [
  {
    name: "Gusttavo Lima",
    photoUrl:
      "https://midias.correiobraziliense.com.br/_midias/jpg/2022/11/01/675x450/1_gusttavo_lima-26774173.jpg",
    genres: ["Sertanejo"],
    artistType: "Solo",
    rating: 4,
  },
];

const MOCK_EVENTS = [
  { dia: "15", mes: "08", eventName: "Sextou do João", interestedCount: 2 },
  { dia: "16", mes: "08", eventName: "Sábado de MPB", interestedCount: 7 },
  {
    dia: "17",
    mes: "08",
    eventName: "Domingo com pagode",
    interestedCount: 12,
  },
];

export default function HomePage() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.purpleBlack}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Boa tarde👋</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPLORE POR CATEGORIA</Text>
          <CategorySection />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ULTIMO TRABALHO</Text>
          <FlatList
            data={MOCK_LAST_WORK}
            horizontal
            keyExtractor={(item) => item.name}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <CardArtist artist={item} />}
            contentContainerStyle={styles.artistListContainer}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROXIMOS EVENTOS</Text>
          <View style={styles.eventsContainer}>
            {MOCK_EVENTS.map((ev, idx) => (
              <CardEvent
                key={idx}
                dia={ev.dia}
                mes={ev.mes}
                eventName={ev.eventName}
                interestedCount={ev.interestedCount}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ENCONTRE SEU ARTISTA</Text>
          <FindArtistSection />
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0212",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
  },
  greeting: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "AkiraExpanded-Superbold",
    marginBottom: 10,
    textAlign: "center",
  },
  artistListContainer: {
    gap: 10,
    width: "130%",
    justifyContent: "center",
  },
  eventsContainer: {
    gap: 10,
  },
});
