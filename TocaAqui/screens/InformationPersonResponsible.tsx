import { colors } from "@/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";

import Button from "../components/Allcomponents/Button";
import Fund from "../components/Allcomponents/Fund";
import Input from "../components/Allcomponents/Input";
import ToBack from "../components/Allcomponents/ToBack";
import {
  AccontFormContext,
  AccountProps,
} from "../contexts/AccountFromContexto";
import { RootStackParamList } from "../navigation/Navigate";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const formatPhone = (value: string) => {
  if (!value) return "";
  const cleanedValue = value.replace(/\D/g, '');
  if (cleanedValue.length <= 2) return `(${cleanedValue}`;
  if (cleanedValue.length <= 7) return `(${cleanedValue.substring(0, 2)}) ${cleanedValue.substring(2, 7)}`;
  return `(${cleanedValue.substring(0, 2)}) ${cleanedValue.substring(2, 7)}-${cleanedValue.substring(7, 11)}`;
};

export default function InformationPersonResponsible() {
  const navigation = useNavigation<NavigationProp>();
  const { accountFormData: formData, updateFormData } =
    useContext(AccontFormContext);
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
    mode: 'onTouched',
  });

  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const handleToggleText = () => setShowFullText((prev) => !prev);

  function handleNext(data: AccountProps) {
    const maskedPhone = data.celular_responsavel;
    const cleanedPhone = maskedPhone ? maskedPhone.replace(/\D/g, '') : "";
    const dataToSave = { ...data, celular_responsavel: cleanedPhone };
    updateFormData(dataToSave);
    console.log("Dados salvos no contexto:", dataToSave);
    navigation.navigate("AdditionalInformation");
  }

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>INFORMAÇÕES</Text>
        <Text style={styles.subtitle}>
          {showFullText
            ? "Preencha as informações do proprietário do estabelecimento para facilitar o contato das bandas, caso haja necessidade de mais detalhes ou ajustes sobre a contratação."
            : "Preencha as informações do proprietário... "}
          <Text style={styles.saibaMais} onPress={handleToggleText}>
            {showFullText ? " Ver menos" : " Saiba mais"}
          </Text>
        </Text>

        <Controller
          control={control}
          name="nome_dono"
          rules={{ required: "O nome do responsável é obrigatório" }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              inputRef={ref}
              label="Nome do responsável"
              iconName="account"
              placeholder="Nome completo"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.nome_dono?.message}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          name="email_responsavel"
          rules={{
            required: "O e-mail é obrigatório",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "E-mail inválido",
            },
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              inputRef={(e) => {
                ref(e);
                emailRef.current = e;
              }}
              label="E-mail do responsável"
              iconName="email"
              placeholder="contato@email.com"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email_responsavel?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => phoneRef.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          name="celular_responsavel"
          rules={{
            required: "O telefone é obrigatório",
            validate: value => (value && value.replace(/\D/g, '').length === 11) || "Telefone inválido (11 dígitos)",
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              inputRef={(e) => {
                ref(e);
                phoneRef.current = e;
              }}
              label="Telefone do responsável"
              iconName="phone"
              placeholder="(XX) XXXXX-XXXX"
              onBlur={onBlur}
              onChangeText={(text) => onChange(formatPhone(text))}
              value={value}
              error={errors.celular_responsavel?.message}
              keyboardType="phone-pad"
              maxLength={15}
              returnKeyType="done"
              onSubmitEditing={handleSubmit(handleNext)}
            />
          )}
        />
      </ScrollView>

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
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
  },
  title: {
    fontSize: 35,
    fontFamily: "AkiraExpanded-Superbold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "left",
    alignSelf: "flex-start",
    width: "100%",
  },
  subtitle: {
    fontSize: 23,
    color: "#ccc",
    marginBottom: 25,
    textAlign: "left",
    width: "100%",
    fontFamily: 'Montserrat-Regular'
  },
  saibaMais: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#5000c9ff",
  },
  button: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    alignSelf: 'center',
  },
  buttonText: {
    color: colors.purpleDark,
    fontSize: 22,
    fontWeight: "bold",
  },
});
