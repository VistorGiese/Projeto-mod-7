import { colors } from "@/utils/colors";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Allcomponents/Button";
import ToBack from "../components/Allcomponents/ToBack";
import { AccontFormContext } from "../contexts/AccountFromContexto";
import { createEndereco, createEstabelecimento } from "../services/api";

export default function ConfirmRegister() {
    const { accountFormData } = useContext(AccontFormContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        try {
            const enderecoPayload = {
                rua: accountFormData.rua,
                numero: accountFormData.numero,
                bairro: accountFormData.bairro,
                cidade: accountFormData.cidade,
                estado: accountFormData.estado,
                cep: accountFormData.cep,
            };

            console.log("Enviando para criar endereço:", enderecoPayload);
            const enderecoCriado = await createEndereco(enderecoPayload);
            const enderecoId = enderecoCriado.id;

            if (!enderecoId) {
                throw new Error("O ID do endereço não foi retornado pelo backend.");
            }

            const estabelecimentoPayload = {
                nome_estabelecimento: accountFormData.nome_estabelecimento,
                nome_dono: accountFormData.nome_dono,
                email_responsavel: accountFormData.email_responsavel,
                celular_responsavel: accountFormData.celular_responsavel,
                generos_musicais: accountFormData.generos_musicais,
                horario_funcionamento_inicio: `${accountFormData.horario_funcionamento_inicio}:00`,
                horario_funcionamento_fim: `${accountFormData.horario_funcionamento_fim}:00`,
                senha: accountFormData.password,
                endereco_id: enderecoId,
            };

            console.log("Enviando para criar estabelecimento:", estabelecimentoPayload);
            await createEstabelecimento(estabelecimentoPayload);

            Alert.alert("Sucesso!", "Sua conta foi criada com sucesso.");

        } catch (error: any) {
            console.error("--- ERRO NO PROCESSO DE CADASTRO ---");
            if (error.response) {
                console.error("Dados do erro:", error.response.data);
                console.error("Status do erro:", error.response.status);
                const errorMessage = error.response.data?.message || "Verifique os dados e tente novamente.";
                Alert.alert("Erro no Cadastro", `Ocorreu um erro: ${errorMessage}`);
            } else if (error.request) {
                console.error("Requisição enviada, mas sem resposta:", error.request);
                Alert.alert("Erro de Rede", "Não foi possível conectar ao servidor. Verifique sua conexão com a internet.");
            } else {
                console.error("Erro ao configurar a requisição:", error.message);
                Alert.alert("Erro", "Ocorreu um erro inesperado ao preparar os dados.");
            }
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

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dados de Acesso</Text>
                    <Text style={styles.text}>Nome do estabelecimento: {accountFormData.nome_estabelecimento}</Text>
                    <Text style={styles.text}>Nome do responsável: {accountFormData.nome_dono}</Text>
                    <Text style={styles.text}>E-mail: {accountFormData.email_responsavel}</Text>
                    <Text style={styles.text}>Telefone: {accountFormData.celular_responsavel}</Text>
                    <Text style={styles.text}>Senha: {"*".repeat(accountFormData.password?.length || 0)}</Text>
                    <Text style={styles.text}>Início de atendimento: {accountFormData.horario_funcionamento_inicio}</Text>
                    <Text style={styles.text}>Fim de atendimento: {accountFormData.horario_funcionamento_fim}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dados do Estabelecimento</Text>
                    <Text style={styles.text}>Rua: {accountFormData.rua}, {accountFormData.numero}</Text>
                    <Text style={styles.text}>Bairro: {accountFormData.bairro}</Text>
                    <Text style={styles.text}>Cidade: {accountFormData.cidade} - {accountFormData.estado}</Text>
                    <Text style={styles.text}>CEP: {accountFormData.cep}</Text>
                </View>

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

