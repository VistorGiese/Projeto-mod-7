import { colors } from "@/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useRef } from "react";

import { Controller, useForm } from "react-hook-form";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AccontFormContext, AccountProps } from "../contexts/AccountFromContexto";
import { RootStackParamList } from "../navigation/Navigate";

import Button from "../components/Allcomponents/Button";
import Fund from "../components/Allcomponents/Fund";
import Input from "../components/Allcomponents/Input";
import ToBack from "../components/Allcomponents/ToBack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width, height } = Dimensions.get("window");

const formatCep = (value: string) => {
  const cleaned = value.replace(/\D/g, '').slice(0, 8);
  if (cleaned.length > 5) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }
  return cleaned;
};

export default function RegisterLocationAndress() {
  const navigation = useNavigation<NavigationProp>();
  const { accountFormData: formData, updateFormData } = useContext(AccontFormContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>({
    defaultValues: {
      rua: formData.rua || "",
      numero: formData.numero || "",
      bairro: formData.bairro || "",
      cidade: formData.cidade || "",
      estado: formData.estado || "",
      cep: formData.cep || "",
    },
    mode: 'onBlur',
  });

  const numeroRef = useRef<TextInput>(null);
  const bairroRef = useRef<TextInput>(null);
  const cidadeRef = useRef<TextInput>(null);
  const estadoRef = useRef<TextInput>(null);
  const cepRef = useRef<TextInput>(null);

  function handleNext(data: AccountProps) {
    updateFormData(data);
    console.log(data);
    navigation.navigate("RegisterPassword");
  }

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Image
          source={require("../assets/images/Register/CreateAccount.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Endereço do Estabelecimento</Text>
        <Text style={styles.subtitle}>
          Insira o endereço completo do seu estabelecimento.
        </Text>

        <Input
          label="Rua"
          iconName="road"
          error={errors.rua?.message}
          formProps={{
            control,
            name: "rua",
            rules: { required: "A rua é obrigatória" },
          }}
          inputProps={{
            placeholder: "Rua",
            onSubmitEditing: () => numeroRef.current?.focus(),
            returnKeyType: "next",
          }}
        />

        <Input
          ref={numeroRef}
          label="Número"
          iconName="numeric"
          error={errors.numero?.message}
          formProps={{
            control,
            name: "numero",
            rules: { required: "O número é obrigatório" },
          }}
          inputProps={{
            placeholder: "Número",
            onSubmitEditing: () => bairroRef.current?.focus(),
            returnKeyType: "next",
          }}
        />

        <Input
          ref={bairroRef}
          label="Bairro"
          iconName="city"
          error={errors.bairro?.message}
          formProps={{
            control,
            name: "bairro",
            rules: { required: "O bairro é obrigatório" },
          }}
          inputProps={{
            placeholder: "Bairro",
            onSubmitEditing: () => cidadeRef.current?.focus(),
            returnKeyType: "next",
          }}
        />

        <Input
          ref={cidadeRef}
          label="Cidade"
          iconName="city"
          error={errors.cidade?.message}
          formProps={{
            control,
            name: "cidade",
            rules: { required: "A cidade é obrigatória" },
          }}
          inputProps={{
            placeholder: "Cidade",
            onSubmitEditing: () => estadoRef.current?.focus(),
            returnKeyType: "next",
          }}
        />

        <Input
          ref={estadoRef}
          label="Estado"
          iconName="city"
          error={errors.estado?.message}
          formProps={{
            control,
            name: "estado",
            rules: { required: "O estado é obrigatório" },
          }}
          inputProps={{
            placeholder: "Estado",
            onSubmitEditing: () => cepRef.current?.focus(),
            returnKeyType: "next",
          }}
        />

        <Controller
          control={control}
          name="cep"
          rules={{
            required: "O CEP é obrigatório",
            pattern: {
              value: /^\d{5}-\d{3}$/,
              message: "CEP inválido (formato XXXXX-XXX)",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              ref={cepRef}
              label="CEP"
              iconName="post"
              error={errors.cep?.message}
              inputProps={{
                placeholder: "00000-000",
                keyboardType: "numeric",
                maxLength: 9,
                value: value,
                onBlur: onBlur,
                onChangeText: (text) => onChange(formatCep(text)),
                onSubmitEditing: handleSubmit(handleNext),
                returnKeyType: "done",
              }}
            />
          )}
        />

        <Button style={styles.button} onPress={handleSubmit(handleNext)}>
          <Text style={styles.buttonText}>Continuar</Text>
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
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 100,
  },
  image: {
    width: width * 0.5,
    height: height * 0.25,
    resizeMode: "contain",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
    marginBottom: 10,
    alignSelf: "flex-start",
    width: "100%",
  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 25,
    textAlign: "left",
    width: "100%",
  },
  button: {
    width: "100%",
    marginTop: 20,
    height: 60,
  },
  buttonText: {
    color: colors.purpleDark,
    fontSize: 22,
    fontWeight: "bold",
  },
});