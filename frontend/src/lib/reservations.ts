import "server-only";
import mongoose from "mongoose";
import { requireUser } from "@/lib/auth";
import { connectMongo } from "@/lib/mongodb";
import { ReservationModel } from "@/models/reservation";
import type { Reservation } from "@/types/reservation";

type Row = Omit<Reservation, "id"> & { _id: mongoose.Types.ObjectId };

function serialize(row: Row): Reservation {
  return { id: row._id.toString(), title: row.title, lab: row.lab, date: row.date, time: row.time };
}

export async function listReservations() {
  const user = await requireUser();
  await connectMongo();
  const rows = await ReservationModel.find({ owner: user.id }).sort({ date: 1, time: 1 }).lean();
  return rows.map(serialize);
}

export async function getReservation(id: string) {
  const user = await requireUser();
  if (!mongoose.isObjectIdOrHexString(id)) return null;
  await connectMongo();
  const row = await ReservationModel.findOne({ _id: id, owner: user.id }).lean();
  return row ? serialize(row) : null;
}
