import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import HorizontalCalendar from "@/components/Allcomponents/HorizontalCalendar";
import Input from "@/components/Allcomponents/Input";
import { bookingService, Booking } from "../http/bookingService";

interface UpdateEventProps {
  event: Booking;
  onFinish: (updatedEvent?: Booking) => void;
}

export default function UpdateEvent({ event, onFinish }: UpdateEventProps) {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState({ start: "", end: "" });
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setName(event.titulo_evento);
      setDesc(event.descricao_evento || "");

      const utcDate = new Date(event.data_show);
      const localDate = new Date(
        utcDate.valueOf() + utcDate.getTimezoneOffset() * 60000
      );

      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, "0");
      const day = String(localDate.getDate()).padStart(2, "0");
      const localDateString = `${year}-${month}-${day}`;

      setSelectedDate(localDateString);

      setTimeSlot({
        start: event.horario_inicio.slice(0, 5),
        end: event.horario_fim.slice(0, 5),
      });
    }
  }, [event]);

  const updateTimeSlotValue = (field: "start" | "end", value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    let formattedValue = numericValue;
    if (numericValue.length > 2) {
      formattedValue = `${numericValue.slice(0, 2)}:${numericValue.slice(
        2,
        4
      )}`;
    }
    if (formattedValue.length > 5) {
      formattedValue = formattedValue.slice(0, 5);
    }
    setTimeSlot((prev) => ({ ...prev, [field]: formattedValue }));
  };
  const isValidTime = (time: string): boolean => {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
  };
  const handleUpdateEvent = async () => {
    const startTime = timeSlot.start.trim();
    const endTime = timeSlot.end.trim();
    if (!name.trim()) {
      Alert.alert("Campo Obrigatório", "Por favor, preencha o nome do evento.");
      return;
    }
    if (!startTime || !endTime) {
      Alert.alert(
        "Campos Obrigatórios",
        "Por favor, preencha o horário de início e fim."
      );
      return;
    }
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      Alert.alert(
        "Formato Inválido",
        "Por favor, use um formato de hora válido (HH:MM), por exemplo, 23:59."
      );
      return;
    }
    if (startTime >= endTime) {
      Alert.alert(
        "Horário Inválido",
        "O horário de início deve ser anterior ao horário de fim."
      );
      return;
    }
    setIsLoading(true);
    try {
      const bookingDataToUpdate: Partial<Booking> = {
        titulo_evento: name,
        descricao_evento: desc,
        data_show: selectedDate,
        horario_inicio: startTime,
        horario_fim: endTime,
      };
      const updatedEvent = await bookingService.updateBooking(
        event.id,
        bookingDataToUpdate
      );
      Alert.alert("Sucesso!", "Seu evento foi atualizado com sucesso.");
      onFinish(updatedEvent);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Não foi possível atualizar o evento.";
      Alert.alert("Erro na Atualização", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => onFinish()}>
        <Ionicons name="close-outline" size={32} color={colors.neutral} />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 40 }}
      >
        <HorizontalCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        <Input
          app
          label="Nome do Evento"
          placeholder="Quartou do João"
          value={name}
          onChangeText={setName}
        />
        <Input
          app
          label="Descrição do Evento"
          placeholder="Descrição da Quartou do João"
          value={desc}
          onChangeText={setDesc}
        />

        <Text style={styles.subtitle}>Horário Disponível</Text>
        <View style={styles.timeSlot}>
          <Text style={styles.smallLabel}>Horário do evento</Text>
          <View style={styles.timeRow}>
            <View style={styles.timeInputContainer}>
              <TextInput
                placeholder="Início (HH:MM)"
                value={timeSlot.start}
                onChangeText={(val) => updateTimeSlotValue("start", val)}
                style={styles.timeInput}
                placeholderTextColor={colors.neutral}
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>
            <View style={styles.timeInputContainer}>
              <TextInput
                placeholder="Fim (HH:MM)"
                value={timeSlot.end}
                onChangeText={(val) => updateTimeSlotValue("end", val)}
                style={styles.timeInput}
                placeholderTextColor={colors.neutral}
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancel]}
          onPress={() => onFinish()}
        >
          <Text style={styles.buttonTextCancel}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.confirm,
            isLoading && styles.disabledButton,
          ]}
          onPress={handleUpdateEvent}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.purpleBlack} />
          ) : (
            <Text style={styles.buttonText}>Salvar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
    backgroundColor: "transparent",
  },
  timeInput: {
    padding: 15,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: "#FFFFFF",
  },
  closeButton: { position: "absolute", top: -10, right: 0, zIndex: 10 },
  subtitle: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    color: "#fff",
    marginBottom: 15,
    marginTop: 10,
  },
  // Novo estilo copiado do CreateEvent para consistência
  smallLabel: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
    fontFamily: "Montserrat-Regular",
  },
  timeSlot: { marginBottom: 20 },
  timeRow: { flexDirection: "row", alignItems: "center" },
  timeInputContainer: {
    flex: 1,
    borderColor: colors.purple,
    backgroundColor: colors.purpleBlack2,
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 10,
  },
  timeInputContainer: {
    flex: 1,
    borderColor: colors.purple,
    backgroundColor: colors.purpleBlack2,
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: "auto",
  },
  button: {
    flex: 1,
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  cancel: { borderWidth: 1, borderColor: colors.neutral, marginRight: 10 },
  confirm: { backgroundColor: colors.neutral, marginLeft: 10 },
  disabledButton: { backgroundColor: "#ccc" },
  buttonTextCancel: {
    color: colors.neutral,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
  },
  buttonText: {
    color: colors.purpleBlack,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
  },
});
