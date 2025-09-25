import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/utils/colors";

interface HorizontalCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const formatDate = (date: Date): string => {
  const d = new Date(date);
  // Garante que a data não mude por conta do fuso horário
  const offset = d.getTimezoneOffset() * 60 * 1000;
  const correctedDate = new Date(d.getTime() - offset);
  return correctedDate.toISOString().split("T")[0];
};

const weekDays: string[] = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const monthNames: string[] = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
export default function HorizontalCalendar({
  selectedDate,
  onDateSelect,
}: HorizontalCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const displayedDays = useMemo<Date[]>(() => {
    const days: Date[] = [];
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 2);

    for (let i = 0; i < 5; i++) {
      const day = new Date(startDate);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  }, [currentDate]);

  const handlePrev = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const monthName = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.titleTop}>{`${monthName} ${year}`}</Text>
      <View style={styles.calendarNav}>
        <TouchableOpacity onPress={handlePrev}>
          <Ionicons name="chevron-back" size={24} color={"white"} />
        </TouchableOpacity>

        <View style={styles.daysContainer}>
          {displayedDays.map((day, index) => {
            const dayString = formatDate(day);
            const isSelected = selectedDate === dayString;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.day, isSelected && styles.selectedDay]}
                onPress={() => onDateSelect(dayString)}
              >
                <Text
                  style={[styles.dayName, isSelected && styles.selectedText]}
                >
                  {weekDays[day.getDay()]}
                </Text>
                <Text
                  style={[styles.dayNumber, isSelected && styles.selectedText]}
                >
                  {day.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <Ionicons name="chevron-forward" size={24} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    marginBottom: 30,
  },
  titleTop: {
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  calendarNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 70,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.purpleDark,
    marginHorizontal: 5,
  },
  selectedDay: {
    backgroundColor: colors.purpleDark,
  },
  dayName: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "Montserrat-Regular",
  },
  dayNumber: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Montserrat-Bold",
    marginTop: 4,
  },
  selectedText: {
    color: "#fff",
  },
});
