import { EmbedBuilder, GuildChannel, Message } from "discord.js";

export class ValidationService {
  public static isNotDM(message: Message) {
    if (!message.guild) {
      const imgURL = "https://i.imgur.com/wDUp2OC.jpeg";
      message.author.send(
        `Nelson, los comandos son solo para servidores. 
        ${imgURL}`
      );
      return false;
    }
    return true;
  }

  public static async hasBotPermission(message: Message, permission: bigint) {
    if (message.channel instanceof GuildChannel) {
      const botMember = await message.guild?.members.fetchMe();
      if (!botMember) return false;

      const hasPermission = message.channel
        ?.permissionsFor(botMember)
        ?.has(permission);

      if (!hasPermission) {
        console.warn(`Falta permiso: ${permission.toString()}`);
        try {
          await message.author.send("Sin permisos no hay servicios.");
        } catch {
          console.error(
            "No se pudo enviar un mensaje privado al usuario. Validación de permisos."
          );
        }
        return false;
      }
      return true;
    }
  }

  public static isCommand(message: Message, command: string) {
    return message.content
      .trim()
      .toLocaleLowerCase()
      .startsWith(command.toLocaleLowerCase());
  }

  public static hasValidEmbed(embed: EmbedBuilder) {
    const data = embed.data;

    if (!data.title || !data.description) {
      console.warn("Embed inválido: falta título o descripción.");
      return false;
    }
    return true;
  }

  static validateCommandArgs(
    message: Message,
    minArgs: number,
    delimiter = " "
  ) {
    const args = message.content.split(delimiter).slice(1);
    if (args.length < minArgs) {
      message.reply(
        `Se usan ${minArgs} argumentos. Le toca leer la documentación.`
      );
      return null;
    }
    return args;
  }

  static validateEmbedLength(title?: string, description?: string): boolean {
    if (title && title.length > 256) {
      console.warn("Título demasiado largo (máx. 256 caracteres).");
      return false;
    }
    if (description && description.length > 4096) {
      console.warn("Descripción demasiado larga (máx. 4096 caracteres).");
      return false;
    }
    return true;
  }
}
