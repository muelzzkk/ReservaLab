"use server";

import { hash } from "bcryptjs";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { connectMongo } from "@/lib/mongodb";
import { currentReservationDate, pastReservationError } from "@/lib/reservation-date";
import { ReservationModel } from "@/models/reservation";
import { UserModel } from "@/models/user";
import { isSpaceId, type ActionResult } from "@/types/reservation";

function field(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value : "";
}

function duplicate(error: unknown) {
  return error instanceof mongoose.mongo.MongoServerError && error.code === 11000;
}

export async function register(form: FormData): Promise<ActionResult> {
  const email = field(form, "email").trim().toLowerCase();
  const password = field(form, "password");

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Informe um e-mail válido." };
  }
  if (password.length < 8 || Buffer.byteLength(password) > 72) {
    return { error: "Use pelo menos 8 caracteres e no máximo 72 bytes na senha." };
  }

  try {
    await connectMongo();
    await UserModel.init();
    await UserModel.create({ email, passwordHash: await hash(password, 12) });
  } catch (error) {
    if (duplicate(error)) return { error: "Já existe uma conta com esse e-mail." };
    const details = error as NodeJS.ErrnoException | null;
    console.error("Falha ao criar conta:", details?.name, details?.code, details?.syscall);
    return { error: "Não foi possível criar a conta agora. Tente novamente em instantes." };
  }
  return { success: "Conta criada. Entre para fazer sua primeira reserva." };
}

export async function saveReservation(id: string | null, form: FormData): Promise<ActionResult> {
  const user = await requireUser();
  const title = field(form, "title").trim();
  const lab = field(form, "lab");
  const date = field(form, "date");
  const time = field(form, "time");
  const parsed = new Date(date + "T00:00:00Z");

  if (!title || title.length > 100 || !isSpaceId(lab) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    return { error: "Confira o título, o espaço, a data e o horário." };
  }
  if (id !== null && !mongoose.isObjectIdOrHexString(id)) {
    return { error: "Reserva indisponível." };
  }
  if (id === null && date < currentReservationDate()) {
    return { error: pastReservationError };
  }

  const data = { title, lab, date, time };
  try {
    await connectMongo();
    await ReservationModel.init();
    if (id === null) {
      await ReservationModel.create({ ...data, owner: user.id });
    } else {
      const result = await ReservationModel.updateOne({ _id: id, owner: user.id }, data, { runValidators: true });
      if (!result.matchedCount) return { error: "Reserva indisponível." };
    }
  } catch (error) {
    if (duplicate(error)) return { error: "Já existe uma reserva nesse espaço e horário." };
    return { error: "Não foi possível salvar a reserva. Tente novamente." };
  }
  revalidatePath("/reservas");
  if (id) revalidatePath("/reservas/" + id);
  return { success: id ? "Reserva atualizada." : "Reserva criada." };
}

export async function deleteReservation(id: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!mongoose.isObjectIdOrHexString(id)) return { error: "Reserva indisponível." };
  try {
    await connectMongo();
    const result = await ReservationModel.deleteOne({ _id: id, owner: user.id });
    if (!result.deletedCount) return { error: "Reserva indisponível." };
  } catch {
    return { error: "Não foi possível excluir a reserva. Tente novamente." };
  }
  revalidatePath("/reservas");
  revalidatePath("/reservas/" + id);
  return { success: "Reserva excluída." };
}
