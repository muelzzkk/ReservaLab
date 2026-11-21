import "server-only";
import { Schema, model, models, type Model, type Types } from "mongoose";
import { spaces, type ReservationInput } from "@/types/reservation";

interface ReservationRecord extends ReservationInput {
  owner: Types.ObjectId;
}

const reservationSchema = new Schema<ReservationRecord>({
  owner: { type: Schema.Types.ObjectId, required: true, ref: "User", index: true },
  title: { type: String, required: true, maxlength: 100 },
  lab: { type: String, required: true, enum: Object.keys(spaces) },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

reservationSchema.index({ lab: 1, date: 1, time: 1 }, { unique: true });

export const ReservationModel = (models.Reservation as Model<ReservationRecord> | undefined) ??
  model<ReservationRecord>("Reservation", reservationSchema);
