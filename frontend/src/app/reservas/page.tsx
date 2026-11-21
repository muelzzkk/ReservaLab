import { ReservationList } from "@/components/reservation-list";
import { Button } from "@/components/ui/button";
import { listReservations } from "@/lib/reservations";

export default async function ReservationsPage() {
  const reservations = await listReservations();
  return (
    <section className="reveal-reservations flex flex-col gap-7 sm:gap-9">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2.5">
          <h1 className="page-title">Minhas reservas</h1>
          <p className="muted leading-relaxed">Acompanhe e edite seus agendamentos.</p>
        </div>
        <Button href="/reservas/nova"><span aria-hidden="true">+</span> Nova reserva</Button>
      </div>
      <ReservationList reservations={reservations} />
    </section>
  );
}
