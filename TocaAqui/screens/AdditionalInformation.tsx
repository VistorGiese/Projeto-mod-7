import { colors } from "@/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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

const formatTime = (value: string) => {
  if (!value) return "";
  const cleaned = value.replace(/\D/g, "").slice(0, 4);
  if (cleaned.length > 2) {
    return `${cleaned.slice(0, 2)}:${cleaned.slice(2)}`;
  }
  return cleaned;
};

export default function AdditionalInformation() {
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
      generos_musicais: formData.generos_musicais || "",
      horario_funcionamento_inicio: formData.horario_funcionamento_inicio || "",
      horario_funcionamento_fim: formData.horario_funcionamento_fim || "",
    },
    mode: "onTouched",
  });

  const startTimeRef = useRef<TextInput>(null);
  const endTimeRef = useRef<TextInput>(null);
  const handleToggleText = () => setShowFullText((prev) => !prev);

  function handleRegister(data: AccountProps) {
    updateFormData(data);
    console.log("Dados salvos no contexto:", { ...formData, ...data });
    navigation.navigate("ConfirmRegister");
  }

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
            {showFullText ? " Ver menos" : " Saiba mais"}
          </Text>
        </Text>

        <Controller
          control={control}
          name="generos_musicais"
          rules={{
            required: "Pelo menos um gênero musical é obrigatório",
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              containerStyle={{ width: "100%" }}
              inputRef={ref}
              label="Gêneros Musicais"
              iconName="music-note"
              placeholder="Ex: Rock, Sertanejo, MPB"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.generos_musicais?.message}
              returnKeyType="next"
              onSubmitEditing={() => startTimeRef.current?.focus()}
            />
          )}
        />

        <View style={styles.timeInputsContainer}>
          <View style={styles.timeInputWrapper}>
            <Controller
              control={control}
              name="horario_funcionamento_inicio"
              rules={{
                required: "O horário de início é obrigatório",
                pattern: {
                  value: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/,
                  message: "Formato inválido (HH:MM)",
                },
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  containerStyle={{ width: "100%" }}
                  inputRef={(e) => {
                    ref(e);
                    startTimeRef.current = e;
                  }}
                  label="Início do Atendimento"
                  iconName="clock-start"
                  placeholder="Ex: 18:00"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(formatTime(text))}
                  value={value}
                  error={errors.horario_funcionamento_inicio?.message}
                  keyboardType="numeric"
                  maxLength={5}
                  returnKeyType="next"
                  onSubmitEditing={() => endTimeRef.current?.focus()}
                />
              )}
            />
          </View>
          <View style={styles.timeInputWrapper}>
            <Controller
              control={control}
              name="horario_funcionamento_fim"
              rules={{
                required: "O horário de término é obrigatório",
                pattern: {
                  value: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/,
                  message: "Formato inválido (HH:MM)",
                },
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  containerStyle={{ width: "100%" }}
                  inputRef={(e) => {
                    ref(e);
                    endTimeRef.current = e;
                  }}
                  label="Fim do Atendimento"
                  iconName="clock-end"
                  placeholder="Ex: 23:00"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(formatTime(text))}
                  value={value}
                  error={errors.horario_funcionamento_fim?.message}
                  keyboardType="numeric"
                  maxLength={5}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit(handleRegister)}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>

      <Button
        style={styles.button}
        onPress={handleSubmit(handleRegister)}
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
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "Montserrat-Regular",
  },
  saibaMais: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#5000c9ff",
  },
  timeInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  timeInputWrapper: {
    width: "48%",
  },
  button: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  buttonText: {
    color: colors.purpleDark,
    fontSize: 22,
    fontFamily: "Montserrat-Bold",
  },
});

