import dotenv from "dotenv";
import { client } from "./client";
import { messageCreateListener, messageUpdateListener } from "./events/onMessageUpdate";

messageUpdateListener;
messageCreateListener;

dotenv.config();

client.once("ready", () => {
  console.log(`✅ Bot conectado como ${client.user?.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

