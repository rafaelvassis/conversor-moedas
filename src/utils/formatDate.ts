export function formatDate(date: string): string {
  const dateObj = new Date(date);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: userTimeZone,
  }).format(dateObj);
}
