import { colors } from "@/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { documentDirectory, getInfoAsync, makeDirectoryAsync, writeAsStringAsync } from 'expo-file-system';
import React, { useContext } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Allcomponents/Button";
import ToBack from "../components/Allcomponents/ToBack";
import { AccontFormContext } from "../contexts/AccountFromContexto";
import { RootStackParamList } from "../navigation/Navigate";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ConfirmRegister() {
    const navigation = useNavigation<NavigationProp>();
    const { accountFormData } = useContext(AccontFormContext);

    const handleFinishRegistration = async () => {
        const finalData = accountFormData;

        const jsonString = JSON.stringify(finalData, null, 2);

        const dataDirectory = `${documentDirectory}data/`;

        try {
            const dirInfo = await getInfoAsync(dataDirectory);
            if (!dirInfo.exists) {
                await makeDirectoryAsync(dataDirectory, { intermediates: true });
                console.log('Pasta "data" criada com sucesso.');
            }
        } catch (e) {
            console.error("Erro ao criar a pasta:", e);
            Alert.alert("Erro", "Não foi possível criar o diretório de dados.");
            return;
        }

        const filePath = `${dataDirectory}dataLogging.json`;

        try {
            await writeAsStringAsync(filePath, jsonString, {
                encoding: "utf8", // Corrigido para 'utf8' (minúsculas)
            });

            console.log('Arquivo salvo em:', filePath);

            Alert.alert(
                "Cadastro Concluído!",
                `Dados salvos com sucesso em: ${filePath}`,
                [{ text: "OK", onPress: () => navigation.navigate("Login") }]
            );
        } catch (error) {
            console.error("Erro ao salvar o arquivo:", error);
            Alert.alert(
                "Erro",
                "Ocorreu um erro ao salvar o cadastro. Tente novamente."
            );
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

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dados de Acesso</Text>
                    <Text style={styles.text}>Nome: {accountFormData.nome}</Text>
                    <Text style={styles.text}>E-mail: {accountFormData.email}</Text>
                    <Text style={styles.text}>Senha: *********</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informações do Responsável</Text>
                    <Text style={styles.text}>Nome: {accountFormData.ownerName}</Text>
                    <Text style={styles.text}>Telefone: {accountFormData.phone}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dados do Estabelecimento</Text>
                    <Text style={styles.text}>Nome: {accountFormData.establishmentName}</Text>
                    <Text style={styles.text}>Endereço: {accountFormData.road}, {accountFormData.number}</Text>
                    <Text style={styles.text}>Bairro: {accountFormData.neighborhood}</Text>
                    <Text style={styles.text}>CEP: {accountFormData.cep}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferências</Text>
                    <Text style={styles.text}>Gêneros Musicais: {accountFormData.genre}</Text>
                    <Text style={styles.text}>Horário de Atendimento: {accountFormData.schedule}</Text>
                </View>

                <Button
                    style={styles.button}
                    onPress={handleFinishRegistration}
                >
                    <Text style={styles.buttonText}>Confirmar e Finalizar</Text>
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
        color: colors.purpleLight,
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