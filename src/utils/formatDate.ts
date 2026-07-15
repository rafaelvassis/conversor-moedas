export function formatDate(date: string): string {
  const dateObj = new Date(date);

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
  }).format(dateObj);
}
