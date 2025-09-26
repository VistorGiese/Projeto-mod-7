export const isValidTime = (time: string) =>
  /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

export const validateEventForm = (name: string, start: string, end: string) => {
  const errors: { name?: string; start?: string; end?: string } = {};

  if (!name.trim()) errors.name = "O nome do evento é obrigatório.";
  if (!start) errors.start = "Informe o horário de início.";
  else if (!isValidTime(start)) errors.start = "Formato inválido (HH:MM).";
  if (!end) errors.end = "Informe o horário de fim.";
  else if (!isValidTime(end)) errors.end = "Formato inválido (HH:MM).";

  if (start && end && start >= end)
    errors.start = "O início deve ser antes do fim.";

  return errors;
};
