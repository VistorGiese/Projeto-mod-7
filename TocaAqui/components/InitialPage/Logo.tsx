import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { useFonts } from "expo-font";
import { customFonts } from "../../assets/fonts/fonts";

export default function Logo() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <View style={styles.maskContainer}>
            <Text style={styles.maskText}>Toca{"\n"}Aqui</Text>
          </View>
        }
      >
        <Image
          source={require("../../assets/images/TelaInicial/BackgroundText.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  maskedView: {
    height: "100%",
    width: "100%",
    marginLeft: "12%",
  },
  maskContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  maskText: {
    fontSize: 60,
    fontFamily: "AkiraExpanded-Superbold",
    color: "black",
  },
  image: {
    flex: 1,
    width: 350,
  },
});
