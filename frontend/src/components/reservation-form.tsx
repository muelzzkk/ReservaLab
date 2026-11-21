"use client";

import {
  DatePicker, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
  Select, SelectItem, useDisclosure,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { saveReservation, deleteReservation } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/components/use-action-toast";
import { pastReservationError } from "@/lib/reservation-date";
import { spaces, type Reservation } from "@/types/reservation";

function DeleteForm({ reservation }: { reservation: Reservation }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, action, pending] = useActionToast(deleteReservation.bind(null, reservation.id), "/reservas");

  return (
    <>
      <Button type="button" variant="danger" onPress={onOpen} aria-haspopup="dialog">Excluir reserva</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        isDismissable={false}
        isKeyboardDismissDisabled={pending}
        hideCloseButton
        classNames={{ base: "bg-[var(--surface)] text-[var(--text)]" }}
      >
        <ModalContent>
          {(onClose) => (
            <form action={action}>
              <ModalHeader>Excluir esta reserva?</ModalHeader>
              <ModalBody>
                <p className="muted wrap-break-word">
                  Tem certeza de que deseja excluir a reserva <strong>“{reservation.title}”</strong>? A exclusão é permanente.
                </p>
                {error && <p className="form-error">{error}</p>}
              </ModalBody>
              <ModalFooter className="flex-wrap">
                <Button type="button" variant="secondary" autoFocus isDisabled={pending} onPress={onClose}>Cancelar</Button>
                <Button type="submit" variant="danger" isDisabled={pending}>{pending ? "Excluindo…" : "Confirmar exclusão"}</Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export function ReservationForm({ reservation, minDate }: { reservation?: Reservation; minDate?: string }) {
  const [error, action, pending] = useActionToast(saveReservation.bind(null, reservation?.id ?? null), "/reservas");
  const minimum = minDate ? parseDate(minDate) : undefined;
  return (
    <div className="space-y-6">
      <form action={action} className="panel grid gap-5 sm:gap-6 sm:p-8">
        <Input label="Título" name="title" defaultValue={reservation?.title} isRequired maxLength={100} />
        <Select
          label="Sala ou laboratório"
          name="lab"
          placeholder="Selecione"
          labelPlacement="outside"
          variant="bordered"
          isRequired
          defaultSelectedKeys={reservation ? [reservation.lab] : []}
          classNames={{ label: "app-field-label", trigger: "app-field-wrapper", value: "app-field-input" }}
        >
          {Object.entries(spaces).map(([id, name]) => <SelectItem key={id}>{name}</SelectItem>)}
        </Select>
        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <DatePicker
            label="Data"
            name="date"
            labelPlacement="outside"
            variant="bordered"
            minValue={minimum}
            defaultValue={reservation ? parseDate(reservation.date) : undefined}
            isRequired
            validate={(date) => date && minimum && date.compare(minimum) < 0 ? pastReservationError : null}
            classNames={{ base: "min-w-0", label: "app-field-label", inputWrapper: "app-field-wrapper" }}
          />
          <Input label="Horário de início" type="time" name="time" defaultValue={reservation?.time} isRequired />
        </div>
        {error && <p className="form-error">{error}</p>}
        <Button type="submit" className="w-full sm:w-auto sm:justify-self-end" isDisabled={pending}>{pending ? "Salvando…" : "Salvar reserva"}</Button>
      </form>
      {reservation && <DeleteForm reservation={reservation} />}
    </div>
  );
}
