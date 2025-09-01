import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
} from "react-native";
import Input from "../components/Allcomponents/Input";
import Button from "../components/Allcomponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigate";
import Fund from "../components/Allcomponents/Fund";
import ToBack from "../components/Allcomponents/ToBack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get("window");

export default function ForgotPassword() {
    const navigation = useNavigation<NavigationProp>();
    const [email, setEmail] = useState("");

    return (
        <View style={styles.container}>
            <Fund />

            <ToBack />

            <Image
                source={require("../assets/images/TelaLogin/AccessYourAccount.png")}
                style={styles.image}
            />

            <Text style={styles.title}>Recuperar Senha</Text>

            <Text style={styles.subtitle}>
                Tela ainda em produção
            </Text>

            <Input
                label="E-mail"
                iconName="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <Button
                style={styles.button}
                onPress={() => {
                    console.log("Enviar email de recuperação:", email);
                    navigation.navigate("Login");
                }}
            >
                <Text style={styles.buttonText}>Enviar</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c0a37",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    image: {
        width: width * 0.6,
        height: height * 0.25,
        resizeMode: "contain",
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "left",
        marginBottom: 10,
        marginLeft: 15,
        alignSelf: "flex-start",
        width: "95%",
    },
    subtitle: {
        fontSize: 16,
        color: "#ccc",
        marginBottom: 20,
        textAlign: "left",
        width: "95%",
    },
    button: {
        width: "95%",
        marginTop: 40,
        height: 60,
    },
    buttonText: {
        color: "#28024E",
        fontSize: 22,
        fontWeight: "bold",
    },
});
