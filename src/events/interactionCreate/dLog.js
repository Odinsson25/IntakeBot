const { Client, EmbedBuilder } = require("discord.js");
const jsonConfig = require("../../../config.json");
const dLog = require("../../functions/dLog");
/**
 *
 * @param {import("discord.js").Interaction} interaction
 * @param {Client} client
 *
 */
module.exports = async (interaction, client, handler) => {
  const cmdOptionsArr = [];
  if (
    !interaction.isCommand ||
    !interaction.isChatInputCommand ||
    !interaction?.commandName
  )
    return;
  const logEmbed = new EmbedBuilder()
    .setAuthor({
      name: `${interaction.user.username}`,
      iconURL: `${interaction.user.displayAvatarURL()}`,
    })
    .setTitle(`Command executed - ${interaction.client.user.username}`)
    .setFields(
      {
        name: `User`,
        value: `${interaction.user.username} / ${interaction.user.id}`,
        inline: false,
      },
      { name: `Command`, value: `${interaction.commandName}`, inline: true }
    )

    .setTimestamp();
  if (interaction?.options?.["_group"] != null) {
    logEmbed.addFields([
      {
        name: `Subcommand group`,
        value: `${interaction.options["_group"]}`,
        inline: true,
      },
    ]);
  }
  if (interaction?.options?.["_subcommand"] != null) {
    logEmbed.addFields([
      {
        name: `Subcommand`,
        value: `${interaction.options["_subcommand"]}`,
        inline: true,
      },
    ]);
  }
  if (interaction?.options?.["_hoistedOptions"] != null) {
    const arr = [];
    interaction.options["_hoistedOptions"].forEach((element) => {
      arr.push(`${element.name}: ${element.value}`);
    });
    if (arr.length >= 1) {
      logEmbed.addFields([
        {
          name: `Command options`,
          value: `${arr.join("\n")}`,
          inline: false,
        },
      ]);
    }
  }
  console.log(`${interaction.commandName} executed by ${interaction.user.id}`);
  dLog(client, logEmbed);
};
