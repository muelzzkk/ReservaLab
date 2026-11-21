import "server-only";
import { Schema, model, models, type Model } from "mongoose";

interface User {
  email: string;
  passwordHash: string;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true, select: false },
});

export const UserModel = (models.User as Model<User> | undefined) ??
  model<User>("User", userSchema);
