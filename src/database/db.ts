import { Pool } from "pg";
import dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV || "local";

dotenv.config({
  path: nodeEnv === "production" ? ".env.production" : ".env.local",
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no definida");
}

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: nodeEnv === "production" ? { rejectUnauthorized: false } : false,
});



console.log("✅ Conexión a base de datos lista.");