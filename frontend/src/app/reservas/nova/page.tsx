import { ReservationForm } from "@/components/reservation-form";
import { requireUser } from "@/lib/auth";
import { currentReservationDate } from "@/lib/reservation-date";
import Link from "next/link";

export default async function NewReservationPage() {
  await requireUser();
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 sm:gap-7">
      <div className="flex flex-col items-start gap-3">
        <Link href="/reservas" className="text-link py-1 text-sm">← Minhas reservas</Link>
        <h1 className="page-title">Nova reserva</h1>
      </div>
      <ReservationForm minDate={currentReservationDate()} />
    </section>
  );
}
