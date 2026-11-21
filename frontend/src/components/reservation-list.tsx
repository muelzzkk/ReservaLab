"use client";

import Link from "next/link";
import { Card, CardBody, Chip, Select, SelectItem } from "@heroui/react";
import { useReservationFilter } from "@/store/reservation-filter";
import { spaces, type Reservation } from "@/types/reservation";

export function ReservationList({ reservations }: { reservations: Reservation[] }) {
  const lab = useReservationFilter((state) => state.lab);
  const setLab = useReservationFilter((state) => state.setLab);
  const visible = lab ? reservations.filter((reservation) => reservation.lab === lab) : reservations;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <Select
        label="Filtrar por espaço"
        labelPlacement="outside"
        variant="bordered"
        disallowEmptySelection
        selectedKeys={[lab || "all"]}
        onChange={(event) => setLab(event.target.value === "all" ? "" : event.target.value)}
        className="max-w-xs"
        classNames={{ label: "app-field-label", trigger: "app-field-wrapper", value: "app-field-input" }}
      >
        {[<SelectItem key="all">Todos</SelectItem>, ...Object.entries(spaces).map(([id, name]) => <SelectItem key={id}>{name}</SelectItem>)]}
      </Select>
      {visible.length === 0 ? <p className="panel muted py-12 text-center leading-relaxed">Nenhuma reserva encontrada.</p> : (
        <ul className="grid gap-5 sm:grid-cols-2">
          {visible.map((reservation) => (
            <li key={reservation.id}>
              <Link className="arrow-link block rounded-2xl" href={"/reservas/" + reservation.id}>
                <Card className="reservation-card text-inherit" shadow="none">
                  <CardBody className="gap-4 p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <Chip
                        className="lab-tag h-auto max-w-full py-1"
                        classNames={{ content: "whitespace-normal wrap-break-word" }}
                        size="sm"
                      >
                        {spaces[reservation.lab]}
                      </Chip>
                      <span aria-hidden="true" className="link-arrow text-link">↗</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-lg leading-snug font-bold wrap-break-word">{reservation.title}</h2>
                      <p className="muted text-sm leading-relaxed"><time dateTime={reservation.date + "T" + reservation.time}>{reservation.date.split("-").reverse().join("/")} às {reservation.time}</time></p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
