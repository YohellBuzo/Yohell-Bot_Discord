import dotenv from "dotenv";
import { client } from "./bot/client";
import { messageUpdateListener } from "./bot/events/onMessageUpdate";
import { onManuelCommand } from "./bot/events/onManuelCommand";
import "./database/db";

messageUpdateListener;
onManuelCommand;

const nodeEnv = process.env.NODE_ENV || "local";
dotenv.config({
  path: nodeEnv === "production" ? ".env.production" : ".env.local",
});

console.log(`Entorno actual: ${nodeEnv}`);

dotenv.config();

client.once("ready", () => {
  console.log(`Bot conectado como ${client.user?.tag}`);
  if (nodeEnv === "local") console.log("Ejecutando en entorno local 🧪");
  else console.log("Ejecutando en Railway 🚀");
});

client.login(process.env.DISCORD_TOKEN);
