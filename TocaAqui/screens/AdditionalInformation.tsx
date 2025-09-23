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

const formatSchedule = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '');

  if (cleanedValue.length <= 2) {
    return cleanedValue.length > 0 ? `${cleanedValue}h` : '';
  }
  if (cleanedValue.length <= 4) {
    const startHour = cleanedValue.substring(0, 2);
    const endHour = cleanedValue.substring(2, 4);
    return `${startHour}h às ${endHour}`;
  }
  const startHour = cleanedValue.substring(0, 2);
  const endHour = cleanedValue.substring(2, 4);
  return `${startHour}h às ${endHour}h`;
};
export default function AdditionalInformation() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { accountFormData: formData, updateFormData } = useContext(AccontFormContext);
  const [showFullText, setShowFullText] = useState(false);
  const handleToggleText = () => setShowFullText((prev) => !prev);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>({
    defaultValues: {
      genre: formData.genre || "",
      schedule: formData.schedule || "",
    },
  });

  const scheduleRef = useRef<TextInput>(null);

  function handleNext(data: AccountProps) {
    updateFormData(data);
    console.log(data);
    navigation.navigate("ConfirmRegister");
  }

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />
      <View style={styles.content}>
        <Text style={styles.title}>QUASE LÁ...</Text>
        <Text style={styles.subtitle}>
          {showFullText
            ? "Defina as preferências do seu estabelecimento. Essas informações ajudam as bandas a entender melhor o seu estilo e personalizar a apresentação de acordo com o que você e seus clientes preferem."
            : "Defina as preferências do seu estabelecimento... "}
          <Text
            style={styles.saibaMais}
            onPress={handleToggleText}
            accessibilityRole="button"
          >
            {showFullText ? " Saiba menos" : " Saiba mais"}
          </Text>
        </Text>
        <View style={styles.inputWrapper}>
          <Input
            label="Gêneros Musicais"
            iconName="music"
            placeholder="Ex: Rock, Sertanejo, MPB"
            error={errors.genre?.message}
            formProps={{
              control,
              name: "genre",
              rules: {
                required: "O gênero musical é obrigatório",
              },
            }}
            inputProps={{
              onSubmitEditing: () => scheduleRef.current?.focus(),
              returnKeyType: "next",
            }}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name="schedule"
            rules={{
              required: "O horário de atendimento é obrigatório",
              validate: value => value?.length === 10 || "Horário inválido (Ex: 18h às 23h)"
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                ref={scheduleRef}
                label="Horário de Atendimento"
                iconName="clock"
                error={errors.schedule?.message}
                formProps={{
                  control,
                  name: "schedule",
                  rules: {
                    required: "O horário de atendimento é obrigatório",
                    validate: value => value?.length === 10 || "Horário inválido (Ex: 18h às 23h)"
                  },
                }}
                inputProps={{
                  placeholder: "Ex: 18h às 23h",
                  keyboardType: "numeric",
                  onBlur,
                  onChangeText: (text) => onChange(formatSchedule(text)),
                  value,
                  maxLength: 10,
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
        <Text style={styles.buttonText}>Cadastrar</Text>
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