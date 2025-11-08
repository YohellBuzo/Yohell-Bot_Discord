import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { client } from "../client";
import {
  getAllWisdoms,
  getLastWisdom,
  insertWisdom,
} from "../../services/wisdom_service";
import { ValidationService } from "../../utils/validation_service";

// const generateCode = (length: number = 3): string => {
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let code = "";

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * chars.length);
//     code += chars[randomIndex];
//   }

//   return code;
// };

const getRandomImage = () => {
  const width = Math.floor(Math.random() * (600 - 700 + 1)) + 600;
  const height = Math.floor(Math.random() * (800 - 900 + 1)) + 800;
  const imageURL = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;

  return imageURL;
};

const sendRandomWisdom = async (message: any) => {
  try {
    const wisdoms = await getAllWisdoms();
    const random = wisdoms[Math.floor(Math.random() * wisdoms.length)];

    const user = await client.users.fetch(random.userid);

    const embed = new EmbedBuilder();
    embed.setTitle(random.title);
    embed.setDescription(random.paragraph);
    embed.setColor("#ec53a0");
    embed.setImage(getRandomImage());
    embed.setThumbnail(user.displayAvatarURL());
    embed.setFooter({
      text: `Sabiduría de ${user.username}`,
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

const addWisdom = async (message: any, paragraph: string) => {
  if (message.author.bot) return;

  if (paragraph.length === 0) {
    return message.reply(
      'Leer es lava, el formarto es.\n`!manuel add "Parrafo"` las comillas no están de adorno.'
    );
  }

  if (!paragraph.startsWith('"') || !paragraph.endsWith('"')) {
    return message.reply(
      'Leer es lava, el formarto es.\n`!manuel add "Parrafo"` las comillas no están de adorno.'
    );
  }
  if (paragraph.length > 500)
    return message.reply("Es párrafo no una biblia (máx 500) caracteres.");

  const lastWisdom = await getLastWisdom();
  const lastTitle = lastWisdom.title;
  const match = lastTitle.match(/#(\d+)/);
  let number = 1;
  if (match) {
    number = parseInt(match[1]) + 1;
  } else {
    console.warn("Error al generar el título");
    await message.reply("Valió berenjena el guardado.");
    return;
  }

  try {
    const title = `$Sabiduría #${number}`;
    const cleanParagraph = paragraph.replace(/^["']|["']$/g, "").trim();

    if (cleanParagraph.length === 0) {
      return message.reply(
        'Leer es lava, el formarto es.\n`!manuel add "Parrafo"` las comillas no están de adorno.'
      );
    }

    const result = await insertWisdom(
      title,
      paragraph.replace(/^["']|["']$/g, ""),
      message.author.id
    );

    const user = await client.users.fetch(result.userid);

    const embed = new EmbedBuilder();
    embed.setTitle("Se agregó data ancestral");
    embed.setDescription(result.paragraph);
    embed.setColor("#ec53a0");
    embed.setImage(getRandomImage());
    embed.setThumbnail(user.displayAvatarURL());
    embed.addFields([
      { name: "Autor", value: `<${user.username}>`, inline: true },
    ]);
    embed.setFooter({
      text: `Sabiduría de ${user.username}`,
    });

    await message.channel.send({ embeds: [embed] });
  } catch (error) {
    console.error("❌ Error al guardar sabiduría:", error);
    await message.reply("Valió berenjena el guardado.");
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

  const text = message.content.trim();
  const commandParts = text.match(/"[^"]+"|\S+/g) || [];

  //Basic command no arguments "!manuel"
  if (commandParts.length === 1) {
    await sendRandomWisdom(message);
    return;
  }

  //Add command 2 arguments [add, "parrafo"]
  if (commandParts[1] === "add") {
    await addWisdom(message, commandParts[2] ?? "");
    return;
  }
});
