export interface TimeSlot {
  id: number;
  start: string;
  end: string;
}

export interface CreateEventErrors {
  name?: string;
  desc?: string;
  timeSlots?: Record<number, { start?: string; end?: string }>;
}

export const isValidTime = (time: string) =>
  /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

export const validateEventForm = (
  name: string,
  timeSlots: TimeSlot[]
): CreateEventErrors => {
  const errors: CreateEventErrors = { timeSlots: {} };
  let hasError = false;

  if (!name.trim()) {
    errors.name = "O nome do evento é obrigatório.";
    hasError = true;
  }

  timeSlots.forEach((slot) => {
    if (!slot.start.trim()) {
      errors.timeSlots![slot.id] = {
        ...(errors.timeSlots![slot.id] || {}),
        start: "Informe o horário de início.",
      };
      hasError = true;
    }
    if (!slot.end.trim()) {
      errors.timeSlots![slot.id] = {
        ...(errors.timeSlots![slot.id] || {}),
        end: "Informe o horário de fim.",
      };
      hasError = true;
    }
    if (slot.start && slot.end) {
      if (!isValidTime(slot.start))
        errors.timeSlots![slot.id] = {
          ...(errors.timeSlots![slot.id] || {}),
          start: "Formato inválido (HH:MM).",
        };
      if (!isValidTime(slot.end))
        errors.timeSlots![slot.id] = {
          ...(errors.timeSlots![slot.id] || {}),
          end: "Formato inválido (HH:MM).",
        };
      if (slot.start >= slot.end)
        errors.timeSlots![slot.id] = {
          ...(errors.timeSlots![slot.id] || {}),
          start: "O início deve ser antes do fim.",
        };
    }
  });

  return hasError ? errors : {};
};
