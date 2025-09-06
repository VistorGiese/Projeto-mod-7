import { View, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

export default function FundInitialPage() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require("../../assets/images/Initial/Fund.png")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: width,
        height: height,
        resizeMode: "cover",
        marginBottom: 100,
    },
});
