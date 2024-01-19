import mongoose from "mongoose";
import { Mongoose } from "mongoose";

declare global {
  var mongoose: {
    conn: Mongoose | null;
  };
}

const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("MONGO_URI is not defined.");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null };

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(MONGO_URI);

  return cached.conn;
};
