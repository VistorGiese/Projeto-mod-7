export const convertUTCToLocalDate = (utcString: string): Date => {
  const utcDate = new Date(utcString);
  return new Date(utcDate.valueOf() + utcDate.getTimezoneOffset() * 60000);
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
