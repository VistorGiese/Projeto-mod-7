import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdditionalInformation() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Informações adicionais</Text>

            <Text style={styles.subtitle}>
                Aqui você pode adicionar informações adicionais sobre a pessoa responsável e sobre seu gosto.
            </Text>

            <View style={styles.buttonsContainer}>
                <Button
                    style={styles.button}
                    onPress={() => navigation.navigate("InformationPersonResponsible")}
                >
                    <Text style={styles.buttonText}>Voltar</Text>
                </Button>

                <Button
                    style={styles.button}
                    onPress={() => navigation.navigate("Initial")}
                >
                    <Text style={styles.buttonText}>Próximo</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c0a37",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        color: "#ccc",
        marginBottom: 40,
        textAlign: "center",
    },
    buttonsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        width: "45%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#28024E",
        fontSize: 18,
        fontWeight: "bold",
    },
});
