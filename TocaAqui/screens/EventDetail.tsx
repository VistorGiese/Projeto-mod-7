import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import { colors } from "@/utils/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CardArtist from "@/components/Allcomponents/CardArtist";

const { width: screenWidth } = Dimensions.get("window");

type EventDetailRouteProp = RouteProp<RootStackParamList, "EventDetail">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EventDetail() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EventDetailRouteProp>();
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: event.mainImageUrl }}
          style={styles.imageBackground}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.eventName}>{event.eventName}</Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.genreTag}>
            <Text style={styles.genreTagText}>{event.genre}</Text>
          </View>

          <Text style={styles.description}>{event.description}</Text>

          {event.artists &&
            (event.artists.length > 1 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScrollWrapper}
              >
                {event.artists.map((artist) => (
                  <View key={artist.name} style={styles.cardWrapper}>
                    <CardArtist artist={artist} />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.centeredCardWrapper}>
                {event.artists.map((artist) => (
                  <CardArtist key={artist.name} artist={artist} />
                ))}
              </View>
            ))}
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
  },
  backButton: {
    padding: 15,
    marginTop: 40,
  },
  contentContainer: {
    paddingTop: 20,
    backgroundColor: colors.purpleBlack,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  eventName: {
    fontSize: 26,
    color: "#fff",
    fontFamily: "AkiraExpanded-Superbold",
    flex: 1,
  },
  genreTag: {
    backgroundColor: "#FF69B4",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
    marginBottom: 15,
    marginHorizontal: 20,
  },
  description: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  horizontalScrollWrapper: {},
  cardWrapper: {
    width: screenWidth * 0.8,
    alignItems: "center",
    marginHorizontal: -30,
  },
  centeredCardWrapper: {
    width: "100%",
    alignItems: "center",
  },
});
