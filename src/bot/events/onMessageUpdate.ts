import { ChannelType, Embed } from "discord.js";
import { client } from "../client";

const LOGS_CHANNEL_ID = "1434963416166170775";

const sendMessage = async (embed: Embed) => {
  const channel = await client.channels.fetch(LOGS_CHANNEL_ID);

  if (channel && channel.type === ChannelType.GuildText) {
    channel.send({ embeds: [embed] });
  } else {
    console.error("No se encontró el canal o no es de texto.");
  }
};

export const messageUpdateListener = client.on(
  "messageUpdate",
  (oldMessage, newMessage) => {
    if (!newMessage.author?.bot || newMessage.author.username !== "Mudae") return;

    const newEmbed = newMessage.embeds[0];
    const oldEmbed = oldMessage.embeds[0];
    if (!newEmbed || !oldEmbed) return;

    const data = newEmbed.data.footer?.text?.split(" ") ?? [];
    
    if (data.length != 3) return;

    sendMessage(newEmbed);

    // console.log(
    //   `Descripción: ${newEmbed.description}, Autor: ${newEmbed.author?.name}, Footer: ${newEmbed.data.footer?.text}\n Viejo: \n ${oldEmbed.data.footer?.text}`
    // );
  }
);

// export const messageCreateListener = client.on("messageCreate", (message) => {
//   if (!message.author?.bot || message.author.username !== "Mudae") return;

//   const embed = message.embeds[0];
//   if (!embed) return;

//   console.log(
//     `Descripción: ${embed.description}, Autor: ${embed.author?.name}, Footer: ${embed.data.footer?.text}`
//   );
// });
