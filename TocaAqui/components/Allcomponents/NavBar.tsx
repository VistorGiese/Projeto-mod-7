import { StyleSheet, Text, View, Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "@/utils/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/Navigate";

export default function NavBar() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  const currentSection =
    route.name === "HomePage"
      ? "home"
      : route.name === "Schedulling"
        ? "calendar"
        : route.name === "CreateEvent"
          ? "favorites"
          : route.name === "ArtistProfile"
            ? "profile"
            : "";

  const handlePress = (id: string) => {
    switch (id) {
      case "home":
        navigation.navigate("HomePage");
        break;
      case "calendar":
        navigation.navigate("Schedulling");
        break;
      case "favorites":
        navigation.navigate("CreateEvent");
        break;
      case "profile":
        navigation.navigate("Profile");
        break;
    }
  };

  const navItems = [
    { id: "home", icon: "house", text: "Início", type: "FontAwesome6" },
    {
      id: "calendar",
      icon: "calendar-day",
      text: "Agenda",
      type: "FontAwesome6",
    },
    { id: "favorites", icon: "star", text: "Favoritos", type: "FontAwesome" },
    { id: "profile", icon: "user", text: "Perfil", type: "FontAwesome" },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isSelected = currentSection === item.id;

        return (
          <Pressable
            key={item.id}
            onPress={() => handlePress(item.id)}
            style={[styles.containerItem, isSelected && styles.selectedItem]}
          >
            {item.type === "FontAwesome6" ? (
              <FontAwesome6
                name={item.icon}
                size={18}
                color={isSelected ? colors.purpleBlack : "white"}
              />
            ) : (
              <FontAwesome
                name={item.icon}
                size={20}
                color={isSelected ? colors.purpleBlack : "white"}
              />
            )}
            {isSelected && <Text style={styles.text}>{item.text}</Text>}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#07010C",
    padding: "8%",
    flexDirection: "row",
    width: "120%",
    justifyContent: "space-around",
    bottom: 0,
    position: "absolute",
    zIndex: 2,
  },
  containerItem: {
    flexDirection: "row",
    gap: 6,
    padding: 10,
    borderRadius: 20,
  },
  selectedItem: {
    backgroundColor: "white",
  },
  text: {
    color: colors.purpleBlack,
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
  },
});
