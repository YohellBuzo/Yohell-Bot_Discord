import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { client } from "../client";
import { getAllWisdoms } from "../../services/wisdom_service";

const createEmbed = async () => {
  const width = Math.floor(Math.random() * (600 - 700 + 1)) + 600;
  const height = Math.floor(Math.random() * (800 - 900 + 1)) + 800;
  const imageURL = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;

  const wisdoms = await getAllWisdoms();
  const random = wisdoms[Math.floor(Math.random() * wisdoms.length)];

  const user = await client.users.fetch(random.userid);

  const embed = new EmbedBuilder();
  embed.setTitle(random.title);
  embed.setDescription(random.paragraph);
  embed.setColor("#ec53a0");
  embed.setImage(imageURL);
  embed.setFooter({
    text: `Sabiduría de ${user.username}`,
  });
  embed.setThumbnail(user.displayAvatarURL());

  return embed;
};

const sendMessage = async (message: any) => {
  try {
    const botMember = await message.guild.members.fetchMe();
    if (
      !message.channel
        .permissionsFor(botMember)
        .has(PermissionsBitField.Flags.SendMessages)
    ) {
      console.warn(
        "⚠️ El bot no tiene permiso para enviar mensajes en este canal."
      );
      return message.author.send(
        "No tengo permisos para enviar mensajes en ese canal 😢"
      );
    }

    if (
      !message.channel
        .permissionsFor(botMember)
        .has(PermissionsBitField.Flags.EmbedLinks)
    ) {
      console.warn(
        "⚠️ El bot no tiene permiso para enviar embeds en este canal."
      );
      return message.author.send(
        "No tengo permiso para enviar embeds en ese canal 😔"
      );
    }

    const embed = await createEmbed();

    await message.channel.send({
      embeds: [embed],
    });
  } catch (error: any) {
    console.error("❌ Error al enviar el mensaje:", error);
    try {
      await message.author.send(
        "Ocurrió un error al intentar enviar el mensaje 😔"
      );
    } catch {
      console.error("No se pudo enviar mensaje privado al usuario.");
    }
  }
};

export const onManuelCommand = client.on("messageCreate", (message) => {
  const text = message.content.toLocaleLowerCase().trim();
  if (text.localeCompare("!manuel") !== 0) return;

  sendMessage(message);
});
