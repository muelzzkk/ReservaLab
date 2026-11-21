// As chaves identificam os espaços nas reservas e no índice de horários.
export const spaces = {
  "Laboratório 1": "Laboratório 1",
  "Laboratório 2": "Laboratório 2",
  "Laboratório 3": "Laboratório 3",
  "sala-ipe": "Sala 1",
  "sala-cecilia-meireles": "Sala 2",
  "sala-lina-bo-bardi": "Sala 3",
} as const;

type SpaceId = keyof typeof spaces;

export function isSpaceId(value: string): value is SpaceId {
  return Object.hasOwn(spaces, value);
}

export interface ReservationInput {
  title: string;
  lab: SpaceId;
  date: string;
  time: string;
}

export interface Reservation extends ReservationInput {
  id: string;
}

export type ActionResult = { error: string } | { success: string };
