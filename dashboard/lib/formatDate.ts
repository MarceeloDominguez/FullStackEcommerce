export const DateFormatter = (date: string) => {
  const formattedDate = new Intl.DateTimeFormat("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));

  return formattedDate;
};
