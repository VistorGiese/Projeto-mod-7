import { colors } from "@/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { AccontFormContext, AccountProps } from "../contexts/AccountFromContexto";
import { RootStackParamList } from "../navigation/Navigate";

import Button from "../components/Allcomponents/Button";
import Fund from "../components/Allcomponents/Fund";
import Input from "../components/Allcomponents/Input";
import ToBack from "../components/Allcomponents/ToBack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const formatPhone = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '');
  if (cleanedValue.length <= 2) return `(${cleanedValue}`;
  if (cleanedValue.length <= 7) return `(${cleanedValue.substring(0, 2)}) ${cleanedValue.substring(2, 7)}`;
  return `(${cleanedValue.substring(0, 2)}) ${cleanedValue.substring(2, 7)}-${cleanedValue.substring(7, 11)}`;
};

export default function InformationPersonResponsible() {
  const navigation = useNavigation<NavigationProp>();
  const { accountFormData: formData, updateFormData } = useContext(AccontFormContext);
  const [showFullText, setShowFullText] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>({
    defaultValues: {
      nome_dono: formData.nome_dono || "",
      email_responsavel: formData.email_responsavel || "",
      celular_responsavel: formData.celular_responsavel || "",
    },
  });

  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const handleToggleText = () => setShowFullText((prev) => !prev);

  function handleNext(data: AccountProps) {
    const maskedPhone = data.celular_responsavel;

    const cleanedPhone = maskedPhone ? maskedPhone.replace(/\D/g, '') : "";

    const dataToSave = {
      ...data,
      celular_responsavel: cleanedPhone,
    };

    updateFormData(dataToSave);

    console.log("Dados salvos no contexto:", dataToSave);
    navigation.navigate("AdditionalInformation");
  }

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />
      <View style={styles.content}>
        <Text style={styles.title}>INFORMAÇÕES</Text>
        <Text style={styles.subtitle}>
          {showFullText
            ? "Preencha as informações do proprietário do estabelecimento para facilitar o contato das bandas, caso haja necessidade de mais detalhes ou ajustes sobre a contratação."
            : "Preencha as informações do proprietário... "}
          <Text style={styles.saibaMais} onPress={handleToggleText}>
            {showFullText ? " Ver menos" : " Saiba mais"}
          </Text>
        </Text>

        <View style={styles.inputWrapper}>
          <Input
            label="Nome do responsável"
            iconName="account"
            error={errors.nome_dono?.message}
            formProps={{
              control,
              name: "nome_dono",
              rules: { required: "O nome é obrigatório" },
            }}
            inputProps={{
              placeholder: "Nome do responsável",
              onSubmitEditing: () => emailRef.current?.focus(),
              returnKeyType: "next",
            }}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            ref={emailRef}
            label="E-mail do responsável"
            iconName="email"
            error={errors.email_responsavel?.message}
            formProps={{
              control,
              name: "email_responsavel",
              rules: {
                required: "O e-mail é obrigatório",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "E-mail inválido",
                },
              },
            }}
            inputProps={{
              placeholder: "E-mail do responsável",
              keyboardType: "email-address",
              onSubmitEditing: () => phoneRef.current?.focus(),
              returnKeyType: "next",
            }}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name="celular_responsavel"
            rules={{
              required: "O telefone é obrigatório",
              validate: value => value && value.replace(/\D/g, '').length === 11 || "Telefone inválido (11 dígitos)",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                ref={phoneRef}
                label="Telefone do responsável"
                iconName="phone"
                error={errors.celular_responsavel?.message}
                inputProps={{
                  placeholder: "(XX) XXXXX-XXXX",
                  keyboardType: "phone-pad",
                  maxLength: 15,
                  onBlur,
                  onChangeText: (text) => onChange(formatPhone(text)),
                  value,
                  onSubmitEditing: handleSubmit(handleNext),
                  returnKeyType: "done",
                }}
              />
            )}
          />
        </View>
      </View>

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
    bottom: 40,
  },
  buttonText: {
    color: colors.purpleDark,
    fontSize: 22,
    fontWeight: "bold",
  },
});