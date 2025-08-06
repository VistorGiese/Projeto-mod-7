import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FormularioCadastro() {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    telefone: "",
    senha: "",
  });

  const atualizarCampo = (campo: string, valor: string) => {
    setDadosFormulario({ ...dadosFormulario, [campo]: valor });
  };

  const validarCampos = () => {
    return Object.values(dadosFormulario).every((campo) => campo.trim() !== "");
  };

  {
    const enviarFormulario = () => {
      if (!validarCampos()) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
      }
    };

    Alert.alert("Cadastro", "Formulário enviado com sucesso!");
    console.log(dadosFormulario);
  }

  const Input = ({
    label,
    placeholder,
    valor,
    onChange,
    tipoTeclado = "default",
    senha = false,
    icone,
  }: {
    label: string;
    placeholder: string;
    valor: string;
    onChange: (texto: string) => void;
    tipoTeclado?: "default" | "email-address" | "phone-pad";
    senha?: boolean;
    icone: keyof typeof Ionicons.glyphMap;
  }) => (
    <>
      <Text style={styles.rotulo}>{label}</Text>
      <View style={styles.grupoInput}>
        <Ionicons name={icone} size={20} color="blue" style={styles.icone} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={valor}
          onChangeText={onChange}
          keyboardType={tipoTeclado}
          secureTextEntry={senha}
        />
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <Input
        label=""
        placeholder="Digite seu nome"
        valor={dadosFormulario.nome}
        onChange={(texto) => atualizarCampo("nome", texto)}
        icone="person-outline"
      />

      <Input
        label=""
        placeholder="Digite seu e-mail"
        valor={dadosFormulario.email}
        onChange={(texto) => atualizarCampo("email", texto)}
        tipoTeclado="email-address"
        icone="mail-outline"
      />

      <Input
        label=""
        placeholder="DD/MM/AAAA"
        valor={dadosFormulario.dataNascimento}
        onChange={(texto) => atualizarCampo("dataNascimento", texto)}
        icone="calendar-outline"
      />

      <Input
        label=""
        placeholder="(XX) XXXXX-XXXX"
        valor={dadosFormulario.telefone}
        onChange={(texto) => atualizarCampo("telefone", texto)}
        tipoTeclado="phone-pad"
        icone="call-outline"
      />

      <Input
        label=""
        placeholder="Digite sua senha"
        valor={dadosFormulario.senha}
        onChange={(texto) => atualizarCampo("senha", texto)}
        senha
        icone="lock-closed-outline"
      />

      {/*<TouchableOpacity style={styles.botao} onPress={enviarFormulario}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 35,
    position: "absolute",
    height: "40%",
    width: "80%",
    top: "35%",
    justifyContent: "center",
  },
  rotulo: {
    color: "#fff",
    marginTop: -5,

    fontWeight: "bold",
  },
  grupoInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  icone: {
    marginRight: 15,
    color: "blue",
  },
  input: {
    flex: 1,
    paddingVertical: 30,
  },
});
