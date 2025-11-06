import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { client } from "../client";
import { getAllWisdoms } from "../../services/wisdom_service";
import { ValidationService } from "../../utils/validation_service";

const sendRandomWisdom = async (message: any) => {
  try {
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
      text: `Sabiduría de ${user.username} 2`,
      iconURL: `${user.displayAvatarURL()}`,
    });

    if (!ValidationService.hasValidEmbed(embed)) {
      return message.reply("No se pudo crear el mensaje correctamente.");
    }

    await message.channel.send({
      embeds: [embed],
    });
  } catch (error: any) {
    console.error("Error al enviar el mensaje:", error);
    try {
      await message.author.send(
        `Ocurrió un error al intentar enviar el mensaje: ${error}`
      );
    } catch {
      console.error("No se pudo enviar mensaje privado al usuario.");
    }
  }
};

export const onManuelCommand = client.on("messageCreate", async (message) => {
  if (!ValidationService.isCommand(message, "!manuel")) return;
  if (
    !(await ValidationService.hasBotPermission(
      message,
      PermissionsBitField.Flags.SendMessages
    ))
  )
    return;
  if (
    !(await ValidationService.hasBotPermission(
      message,
      PermissionsBitField.Flags.EmbedLinks
    ))
  )
    return;

  //Basic command no arguments
  sendRandomWisdom(message);
});
