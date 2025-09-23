import { colors } from "@/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { AccontFormContext, AccountProps } from "../contexts/AccountFromContexto";
import { RootStackParamList } from "../navigation/Navigate";

import Button from "../components/Allcomponents/Button";
import Fund from "../components/Allcomponents/Fund";
import Input from "../components/Allcomponents/Input";
import ToBack from "../components/Allcomponents/ToBack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width, height } = Dimensions.get("window");

export default function RegisterPassword() {
    const navigation = useNavigation<NavigationProp>();
    const { accountFormData: formData, updateFormData } = useContext(AccontFormContext);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<AccountProps>({
        defaultValues: {
            password: formData.password || "",
        },
        mode: "onChange",
    });

    const password = watch("password");

    function handleNext(data: AccountProps) {
        updateFormData({ password: data.password });
        console.log(data);
        navigation.navigate("InformationPersonResponsible");
    }

    return (
        <View style={styles.container}>
            <Fund />
            <ToBack />
            <Image
                source={require("../assets/images/Register/CreateAccount.png")}
                style={styles.image}
            />
            <Text style={styles.title}>Crie sua Senha</Text>
            <Text style={styles.subtitle}>
                Escolha uma senha segura. Ela será usada para proteger sua conta.
            </Text>

            <Input
                label="Senha"
                iconName="lock"
                error={errors.password?.message}
                formProps={{
                    control,
                    name: "password",
                    rules: {
                        required: "A senha é obrigatória",
                        minLength: {
                            value: 8,
                            message: "A senha deve ter no mínimo 8 caracteres",
                        },
                    },
                }}
                inputProps={{
                    placeholder: "Digite sua senha",
                    secureTextEntry: true,
                    returnKeyType: "next",
                }}
            />

            <Input
                label="Confirmar Senha"
                iconName="lock"
                error={errors.passwordConfirm?.message}
                formProps={{
                    control,
                    name: "passwordConfirm",
                    rules: {
                        required: "A confirmação da senha é obrigatória",
                        validate: (value) =>
                            value === password || "As senhas não conferem",
                    },
                }}
                inputProps={{
                    placeholder: "Confirme sua senha",
                    secureTextEntry: true,
                    onSubmitEditing: handleSubmit(handleNext),
                    returnKeyType: "done",
                }}
            />

            <Button style={styles.button} onPress={handleSubmit(handleNext)}>
                <Text style={styles.buttonText}>Continuar</Text>
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
        height: height * 0.3,
        resizeMode: "contain",
        marginBottom: 30,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "left",
        marginBottom: 10,
        marginLeft: 15,
        alignSelf: "flex-start",
        width: "95%",
    },
    subtitle: {
        fontSize: 18,
        color: "#ccc",
        marginBottom: 25,
        textAlign: "left",
        width: "95%",
    },
    button: {
        width: "95%",
        marginTop: 20,
        height: 60,
    },
    buttonText: {
        color: colors.purpleDark,
        fontSize: 22,
        fontWeight: "bold",
    },
});