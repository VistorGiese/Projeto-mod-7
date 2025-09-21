import { colors } from "@/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/Allcomponents/Button";
import Fund from "../components/Allcomponents/Fund";
import Input from "../components/Allcomponents/Input";
import ToBack from "../components/Allcomponents/ToBack";
import { AccontFormContext, AccountProps } from "../contexts/AccountFromContexto";
import { RootStackParamList } from "../navigation/Navigate";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width, height } = Dimensions.get("window");

export default function RegisterLocationAndress() {
  const navigation = useNavigation<NavigationProp>();
  const { accountFormData: formData, updateFormData } = useContext(AccontFormContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>({
    defaultValues: {
      road: formData.road || "",
      number: formData.number || "",
      neighborhood: formData.neighborhood || "",
      cep: formData.cep || "",
    },
  });

  const numeroRef = useRef<TextInput>(null);
  const bairroRef = useRef<TextInput>(null);
  const cepRef = useRef<TextInput>(null);

  function handleNext(data: AccountProps) {
    updateFormData(data);
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
      <Text style={styles.title}>Endereço do Estabelecimento</Text>
      <Text style={styles.subtitle}>
        Insira o endereço completo do seu estabelecimento.
      </Text>

      <Input
        label="Rua"
        iconName="road"
        error={errors.road?.message}
        formProps={{
          control,
          name: "road",
          rules: {
            required: "A rua é obrigatória",
          },
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
        error={errors.number?.message}
        formProps={{
          control,
          name: "number",
          rules: {
            required: "O número é obrigatório",
          },
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
        error={errors.neighborhood?.message}
        formProps={{
          control,
          name: "neighborhood",
          rules: {
            required: "O bairro é obrigatório",
          },
        }}
        inputProps={{
          placeholder: "Bairro",
          onSubmitEditing: () => cepRef.current?.focus(),
          returnKeyType: "next",
        }}
      />

      <Input
        ref={cepRef}
        label="CEP"
        iconName="post"
        error={errors.cep?.message}
        formProps={{
          control,
          name: "cep",
          rules: {
            required: "O CEP é obrigatório",
            pattern: {
              value: /^\d{5}-?\d{3}$/,
              message: "CEP inválido (formato XXXXX-XXX)",
            },
          },
        }}
        inputProps={{
          placeholder: "CEP",
          keyboardType: "numeric",
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
  saibaMais: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#5000c9ff",
  },
  button: {
    width: "95%",
    marginTop: 100,
    height: 60,
  },
  buttonText: {
    color: colors.purpleDark,
    fontSize: 22,
    fontWeight: "bold",
  },
});