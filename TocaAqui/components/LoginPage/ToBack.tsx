import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation<any>();

  const LocationNavigation = () => {
    navigation.navigate("Inicial");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={LocationNavigation}>
      <Image
        source={require("../../assets/images/TelaLogin/Arrow.png")}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 110,
    left: 40,
    zIndex: 2,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    zIndex: 1,
  },
});
