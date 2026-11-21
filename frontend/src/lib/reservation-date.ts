const calendar = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo" });

export function currentReservationDate() {
  return calendar.format(new Date());
}

export const pastReservationError = "Escolha uma data igual ou posterior a hoje.";
