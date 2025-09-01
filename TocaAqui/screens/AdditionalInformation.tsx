import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Allcomponents/Button";
import Input from "../components/Allcomponents/Input";
import ToBack from "../components/Allcomponents/ToBack";
import Fund from "../components/Allcomponents/Fund";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdditionalInformation() {
    const navigation = useNavigation<NavigationProp>();

    const [genre, setGenre] = useState("");
    const [schedule, setSchedule] = useState("");
    const [showFullText, setShowFullText] = useState(false);

    const handleToggleText = () => setShowFullText((prev) => !prev);

    return (
        <View style={styles.container}>
            <Fund />
            <ToBack />

            <View style={styles.content}>
                <Text style={styles.title}>QUASE LÁ...</Text>

                <Text style={styles.subtitle}>
                    {showFullText
                        ? "Defina as preferências do seu estabelecimento. Essas informações ajudam as bandas a entender melhor o seu estilo e personalizar a apresentação de acordo com o que você e seus clientes preferem."
                        : "Defina as preferências do seu estabelecimento... "}
                    <Text
                        style={styles.saibaMais}
                        onPress={handleToggleText}
                        accessibilityRole="button"
                    >
                        {showFullText ? " Saiba menos" : " Saiba mais"}
                    </Text>
                </Text>

                <View style={styles.inputWrapper}>
                    <Input
                        label="Gêneros Musicais"
                        iconName="music"
                        placeholder="Ex: Rock, Sertanejo, MPB"
                        value={genre}
                        onChangeText={setGenre}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Input
                        label="Horário de Atendimento"
                        iconName="clock"
                        placeholder="Ex: 18h às 23h"
                        value={schedule}
                        onChangeText={setSchedule}
                    />
                </View>
            </View>

            <Button
                style={styles.button}
                onPress={() => navigation.navigate("HomePage")}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </Button>
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
    content: {
        flex: 1,
        width: "100%",
        marginTop: 200,
        paddingHorizontal: 15,
        alignItems: "flex-start",
        marginLeft: 15,
    },
    title: {
        fontSize: 35,
        fontFamily: "AkiraExpanded-Superbold",
        color: "#fff",
        marginBottom: 20,
        textAlign: "left",
        alignSelf: "flex-start",
    },
    subtitle: {
        fontSize: 23,
        color: "#ccc",
        marginBottom: 25,
        textAlign: "left",
        width: "98%",
    },
    saibaMais: {
        fontSize: 16,
        textDecorationLine: "underline",
        color: "#5000c9ff",
    },
    inputWrapper: {
        width: "100%",
        marginBottom: 20,
    },
    button: {
        width: "95%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        marginTop: 900,
    },
    buttonText: {
        color: "#28024E",
        fontSize: 22,
        fontWeight: "bold",
    },
});
