import React, { useState } from "react";
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
import { bookingService } from "../http/bookingService";

const getLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface TimeSlot {
  id: number;
  start: string;
  end: string;
}

export default function CreateEvent({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: Date.now(), start: "", end: "" },
  ]);
  const [selectedDate, setSelectedDate] = useState<string>(
    getLocalDateString(new Date())
  );
  const [isLoading, setIsLoading] = useState(false);

  const addTimeSlot = () => {
    if (timeSlots.length < 2) {
      setTimeSlots((prev) => [...prev, { id: Date.now(), start: "", end: "" }]);
    }
  };

  const removeTimeSlot = (id: number) => {
    setTimeSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  const updateTimeSlot = (
    id: number,
    field: "start" | "end",
    value: string
  ) => {
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
    setTimeSlots((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, [field]: formattedValue } : slot
      )
    );
  };

  const isValidTime = (time: string): boolean => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
  };

  const handleCreateEvent = async () => {
    if (!name.trim()) {
      Alert.alert("Campo Obrigatório", "Por favor, preencha o nome do evento.");
      return;
    }
    for (const slot of timeSlots) {
      if (!slot.start.trim() || !slot.end.trim()) {
        Alert.alert(
          "Campos Obrigatórios",
          "Por favor, preencha o horário de início e fim."
        );
        return;
      }
      if (!isValidTime(slot.start) || !isValidTime(slot.end)) {
        Alert.alert(
          "Formato Inválido",
          "Por favor, use um formato de hora válido (HH:MM), por exemplo, 23:59."
        );
        return;
      }
      if (slot.start >= slot.end) {
        Alert.alert(
          "Horário Inválido",
          "O horário de início deve ser anterior ao horário de fim."
        );
        return;
      }
    }

    setIsLoading(true);

    try {
      const creationPromises = timeSlots.map((slot) => {
        const bookingData = {
          titulo_evento: name,
          descricao_evento: desc,
          data_show: selectedDate,
          horario_inicio: slot.start,
          horario_fim: slot.end,
          estabelecimento_id: 1,
        };
        return bookingService.createBooking(bookingData);
      });

      await Promise.all(creationPromises);
      Alert.alert("Sucesso!", "Seu(s) evento(s) foram criados com sucesso.");
      onClose();
    } catch (error: any) {
      console.error(
        "Erro ao criar evento:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.error ||
        "Não foi possível criar o evento. Verifique os dados e tente novamente.";
      Alert.alert("Erro na Criação", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
        <Text style={styles.subtitle}>Horários Disponíveis</Text>
        {timeSlots.map((slot, index) => (
          <View key={slot.id} style={styles.timeSlot}>
            <Text style={styles.smallLabel}>
              {index === 0 ? "Primeiro horário" : "Segundo horário"}
            </Text>
            <View style={styles.timeRow}>
              <View style={styles.timeInputContainer}>
                <TextInput
                  placeholder="Início (HH:MM)"
                  value={slot.start}
                  onChangeText={(val) => updateTimeSlot(slot.id, "start", val)}
                  style={styles.timeInput}
                  placeholderTextColor={colors.neutral}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
              <View style={styles.timeInputContainer}>
                <TextInput
                  placeholder="Fim (HH:MM)"
                  value={slot.end}
                  onChangeText={(val) => updateTimeSlot(slot.id, "end", val)}
                  style={styles.timeInput}
                  placeholderTextColor={colors.neutral}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
              {index > 0 && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeTimeSlot(slot.id)}
                >
                  <Ionicons name="trash-outline" size={22} color={"red"} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
        {timeSlots.length < 2 && (
          <TouchableOpacity style={styles.addButton} onPress={addTimeSlot}>
            <Text style={styles.addButtonText}>Adicionar horário</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancel]}
          onPress={onClose}
        >
          <Text style={styles.buttonTextCancel}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.confirm,
            isLoading && styles.disabledButton,
          ]}
          onPress={handleCreateEvent}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.purpleBlack} />
          ) : (
            <Text style={styles.buttonText}>Agendar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeInput: {
    padding: 15,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    color: "#fff",
    marginBottom: 15,
    marginTop: 10,
  },
  input: {
    backgroundColor: colors.purpleBlack2,
  },
  smallLabel: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
    fontFamily: "Montserrat-Regular",
  },
  timeSlot: {
    marginBottom: 20,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInputContainer: {
    flex: 1,
    borderColor: colors.purple,
    backgroundColor: colors.purpleBlack2,
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 10,
  },
  deleteButton: {
    padding: 10,
  },
  addButton: {
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  addButtonText: {
    color: colors.neutral,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  cancel: {
    borderWidth: 1,
    borderColor: colors.neutral,
    marginRight: 10,
  },
  confirm: {
    backgroundColor: colors.neutral,
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
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
