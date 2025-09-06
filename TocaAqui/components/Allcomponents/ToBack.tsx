import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation<any>();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoBack}>
      <Image
        source={require("../../assets/images/Login/Arrow.png")}
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
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: "#ffffffff",
  },
});
