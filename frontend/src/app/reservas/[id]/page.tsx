import { notFound } from "next/navigation";
import Link from "next/link";
import { ReservationForm } from "@/components/reservation-form";
import { getReservation } from "@/lib/reservations";

export default async function ReservationPage({ params }: PageProps<"/reservas/[id]">) {
  const { id } = await params;
  const reservation = await getReservation(id);
  if (!reservation) notFound();

  return (
    <section className="max-w-xl space-y-4">
      <Link href="/reservas" className="text-link text-sm">← Minhas reservas</Link>
      <h1 className="page-title">Editar reserva</h1>
      <ReservationForm reservation={reservation} />
    </section>
  );
}
