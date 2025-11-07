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
    if (!newMessage.author?.bot || newMessage.author.username !== "Mudae")
      return;

    const newEmbed = newMessage.embeds[0];
    const oldEmbed = oldMessage.embeds[0];
    if (!newEmbed || !oldEmbed) return;

    const data = newEmbed.data.footer?.text?.split(" ") ?? [];
    if (data.length != 3) return;

    const kakeraReaction = newMessage.reactions.cache.find((reaction) =>
      reaction.emoji.name?.toLocaleLowerCase().includes("kakera")
    );
    if (kakeraReaction) return;

    sendMessage(newEmbed);
  }
);
