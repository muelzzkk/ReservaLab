import { create } from "zustand";

interface ReservationFilter {
  lab: string;
  setLab: (lab: string) => void;
}

export const useReservationFilter = create<ReservationFilter>((set) => ({
  lab: "",
  setLab: (lab) => set({ lab }),
}));
