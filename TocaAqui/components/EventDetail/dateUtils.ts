export const formatDisplayDate = (utcDateString: string) => {
  if (!utcDateString) return "";
  const utcDate = new Date(utcDateString);
  const localDate = new Date(
    utcDate.valueOf() + utcDate.getTimezoneOffset() * 60000
  );
  return localDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
