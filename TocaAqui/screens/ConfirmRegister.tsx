import { colors } from "@/utils/colors";
import React, { useContext, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Button from "../components/Allcomponents/Button";
import ToBack from "../components/Allcomponents/ToBack";
import { AccontFormContext } from "../contexts/AccountFromContexto";
import { registerAccount } from "../services/api";

export default function ConfirmRegister() {
    const { accountFormData } = useContext(AccontFormContext);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        try {
            console.log("Enviando os seguintes dados para o backend:", accountFormData);

            const result = await registerAccount(accountFormData);

            Alert.alert("Sucesso!", "Sua conta foi criada com sucesso.");

        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar sua conta. Verifique sua conexão e tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <ToBack />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>CONFIRMAR DADOS</Text>
                    <Text style={styles.subtitle}>
                        Revise todas as informações para garantir que estão corretas.
                    </Text>
                </View>

                {/* Seus blocos de dados continuam os mesmos */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dados de Acesso</Text>
                    <Text style={styles.text}>Nome: {accountFormData.nome}</Text>
                    <Text style={styles.text}>E-mail: {accountFormData.email}</Text>
                    <Text style={styles.text}>Senha: {accountFormData.password}</Text>
                    <Text style={styles.text}>Confirmar Senha: {accountFormData.passwordConfirm}</Text>
                </View>

                {/* ...outros blocos de dados... */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dados do Estabelecimento</Text>
                    <Text style={styles.text}>Nome: {accountFormData.establishmentName}</Text>
                    <Text style={styles.text}>Endereço: {accountFormData.road}</Text>
                    <Text style={styles.text}>Cidade: {accountFormData.number}</Text>
                    <Text style={styles.text}>Bairro: {accountFormData.neighborhood}</Text>
                    <Text style={styles.text}>CEP: {accountFormData.cep}</Text>
                </View>

                {/* ADIÇÃO 7: Botão agora chama a função e mostra o loading */}
                <Button
                    style={styles.button}
                    onPress={handleFinalSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator size="small" color={colors.purpleDark} />
                    ) : (
                        <Text style={styles.buttonText}>Confirmar e Finalizar</Text>
                    )}
                </Button>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c0a37",
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingTop: 100,
        paddingBottom: 80,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 35,
        fontFamily: "AkiraExpanded-Superbold",
        color: "#fff",
        textAlign: "left",
    },
    subtitle: {
        fontSize: 20,
        color: "#ccc",
        textAlign: "left",
    },
    section: {
        backgroundColor: "#31184a",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 22,
        fontFamily: "AkiraExpanded-Superbold",
        color: colors.purple,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 5,
    },
    button: {
        width: "100%",
        height: 60,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: colors.purpleDark,
        fontSize: 22,
        fontWeight: "bold",
    },
});