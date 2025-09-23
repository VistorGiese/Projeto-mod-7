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
const formatTime = (value: string) => {
  const cleaned = value.replace(/\D/g, '').slice(0, 4);
  if (cleaned.length > 2) {
    return `${cleaned.slice(0, 2)}:${cleaned.slice(2)}`;
  }
  return cleaned;
};

export default function AdditionalInformation() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { accountFormData: formData, updateFormData } = useContext(AccontFormContext);
  const [showFullText, setShowFullText] = useState(false);
  const handleToggleText = () => setShowFullText((prev) => !prev);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AccountProps>({
    defaultValues: {
      generos_musicais: formData.generos_musicais || "",
      horario_funcionamento_inicio: formData.horario_funcionamento_inicio || "",
      horario_funcionamento_fim: formData.horario_funcionamento_fim || "",
    },
    mode: "onChange",
  });

  const horarioInicio = watch("horario_funcionamento_inicio");
  const fimRef = useRef<TextInput>(null);

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
          Defina as preferências do seu estabelecimento...
          <Text style={styles.saibaMais} onPress={handleToggleText}>
            {showFullText ? " Saiba menos" : " Saiba mais"}
          </Text>
        </Text>

        <View style={styles.inputWrapper}>
          <Input
            label="Gêneros Musicais"
            iconName="music"
            placeholder="Ex: Rock, Sertanejo, MPB"
            error={errors.generos_musicais?.message}
            formProps={{
              control,
              name: "generos_musicais",
              rules: { required: "O gênero musical é obrigatório" },
            }}
            inputProps={{
              returnKeyType: "next",
            }}
          />
        </View>

        <View style={styles.horarioContainer}>
          <View style={styles.horarioInput}>
            <Controller
              control={control}
              name="horario_funcionamento_inicio"
              rules={{
                required: "O horário de início é obrigatório",
                pattern: {
                  value: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/,
                  message: "Hora inválida (HH:MM)",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Horário de Início"
                  iconName="clock"
                  placeholder="HH:MM"
                  error={errors.horario_funcionamento_inicio?.message}
                  inputProps={{
                    keyboardType: "numeric",
                    maxLength: 5,
                    value: value,
                    onBlur: onBlur,
                    onChangeText: (text) => onChange(formatTime(text)),
                    onSubmitEditing: () => fimRef.current?.focus(),
                    returnKeyType: "next",
                  }}
                />
              )}
            />
          </View>

          <View style={styles.horarioInput}>
            <Controller
              control={control}
              name="horario_funcionamento_fim"
              rules={{
                required: "O horário de fim é obrigatório",
                pattern: {
                  value: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/,
                  message: "Hora inválida (HH:MM)",
                },
                validate: (endTime) => {
                  return endTime !== horarioInicio || "Os horários não podem ser iguais";
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  ref={fimRef}
                  label="Horário de Fim"
                  iconName="clock"
                  placeholder="HH:MM"
                  error={errors.horario_funcionamento_fim?.message}
                  inputProps={{
                    keyboardType: "numeric",
                    maxLength: 5,
                    value: value,
                    onBlur: onBlur,
                    onChangeText: (text) => onChange(formatTime(text)),
                    onSubmitEditing: handleSubmit(handleNext),
                    returnKeyType: "done",
                  }}
                />
              )}
            />
          </View>
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
  horarioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  horarioInput: {
    width: '48%',
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