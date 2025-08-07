const { MessageFlags, EmbedBuilder } = require("discord.js");
const jsonConfig = require("../../config.json");
const dLog = require("../functions/dLog");
/**
 *
 * @param {import("commandkit").ValidationProps} param0
 * @returns
 */
module.exports = async ({ interaction, commandObj, handler }) => {
  const cmdOptionsArr = [];
  if (commandObj.options.devOnly) {
    const cmdOptions = interaction.options["_hoistedOptions"].forEach(
      (element) => {
        cmdOptionsArr.push(`${element.name}: ${element.value}`);
      }
    );
    const registered = jsonConfig.devs.includes(interaction.user.id)
      ? true
      : false;
    const emb = new EmbedBuilder()
      .setColor("Orange")
      .setTitle("🛠️ Developer Command Excuted")
      .setFields(
        {
          name: `User`,
          value: `${interaction.user.username} / ${interaction.user.id}. \n ${
            registered ? "✅" : "❌"
          } User **${
            registered ? "is" : "is NOT"
          }** registered as a developer.`,
          inline: false,
        },
        {
          name: `Guild`,
          value: `${interaction.guild.name} / ${interaction.guild.id}`,
          inline: false,
        },
        { name: `Command`, value: `${interaction.commandName}`, inline: false }
      )
      .setTimestamp();
    if (interaction.options["_group"] != null) {
      emb.addFields([
        {
          name: `Subcommand group`,
          value: `${interaction.options["_group"]}`,
          inline: true,
        },
      ]);
    }
    if (interaction.options["_subcommand"] != null) {
      emb.addFields([
        {
          name: `Subcommand`,
          value: `${interaction.options["_subcommand"]}`,
          inline: true,
        },
      ]);
    }
    if (interaction.options["_hoistedOptions"] != null) {
      const arr = [];
      interaction.options["_hoistedOptions"].forEach((element) => {
        arr.push(`${element.name}: ${element.value}`);
      });
      if (arr.length >= 1) {
        emb.addFields([
          {
            name: `Command options`,
            value: `${arr.join("\n")}`,
            inline: false,
          },
        ]);
      }
    }
    await dLog(interaction.client, emb, "1389012496303521812");
  }

  //   return true;
};
