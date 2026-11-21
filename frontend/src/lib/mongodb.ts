import "server-only";
import { setServers } from "node:dns/promises";
import mongoose from "mongoose";

declare global {
  var mongoConnection: Promise<typeof mongoose> | undefined;
}

export function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI não foi configurada.");

  if (!globalThis.mongoConnection && uri.startsWith("mongodb+srv://") && process.env.MONGODB_DNS_SERVERS) {
    setServers(process.env.MONGODB_DNS_SERVERS.split(",").map((server) => server.trim()));
  }

  globalThis.mongoConnection ??= mongoose
    .connect(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 })
    .catch((error: unknown) => {
      globalThis.mongoConnection = undefined;
      throw error;
    });

  return globalThis.mongoConnection;
}
