import { colors } from "@/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form"; // Importado Controller
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/Allcomponents/Button";
import Fund from "../components/Allcomponents/Fund";
import Input from "../components/Allcomponents/Input";
import ToBack from "../components/Allcomponents/ToBack";
import { AccontFormContext, AccountProps } from "../contexts/AccountFromContexto";
import { RootStackParamList } from "../navigation/Navigate";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Função de formatação automática do telefone
const formatPhone = (value: string) => {
  // Remove todos os caracteres que não são dígitos
  const cleanedValue = value.replace(/\D/g, '');

  if (cleanedValue.length <= 2) {
    return `(${cleanedValue}`;
  }
  if (cleanedValue.length <= 7) {
    return `(${cleanedValue.substring(0, 2)}) ${cleanedValue.substring(2, 7)}`;
  }
  if (cleanedValue.length <= 11) {
    return `(${cleanedValue.substring(0, 2)}) ${cleanedValue.substring(2, 7)}-${cleanedValue.substring(7, 11)}`;
  }
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
      ownerName: formData.ownerName || "",
      email: formData.email || "",
      phone: formData.phone || "",
    },
  });

  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const handleToggleText = () => setShowFullText((prev) => !prev);

  function handleNext(data: AccountProps) {
    updateFormData(data);
    console.log(data);
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
          <Text
            style={styles.saibaMais}
            onPress={handleToggleText}
            accessibilityRole="button"
          >
            {showFullText ? " Ver menos" : " Saiba mais"}
          </Text>
        </Text>

        <View style={styles.inputWrapper}>
          <Input
            label="Nome do responsável"
            iconName="account"
            error={errors.ownerName?.message}
            formProps={{
              control,
              name: "ownerName",
              rules: {
                required: "O nome é obrigatório",
              },
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
            error={errors.email?.message}
            formProps={{
              control,
              name: "email",
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
            name="phone"
            rules={{
              required: "O telefone é obrigatório",
              pattern: {
                value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
                message: "Telefone inválido (formato (XX) XXXXX-XXXX)",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                ref={phoneRef}
                label="Telefone do responsável"
                iconName="phone"
                error={errors.phone?.message}
                formProps={{
                  control,
                  name: "phone",
                  rules: {
                    required: "O telefone é obrigatório",
                    pattern: {
                      value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
                      message: "Telefone inválido (formato (XX) XXXXX-XXXX)",
                    },
                  },
                }}
                inputProps={{
                  placeholder: "Telefone do responsável",
                  keyboardType: "phone-pad",
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

      <Button
        style={styles.button}
        onPress={handleSubmit(handleNext)}
      >
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