const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const jsonConfig = require("../../../config.json");

const dLog = require("../../functions/dLog");

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: {
    name: "rmtm",
    description: "remove timeout",
    options: [
      {
        name: "id",
        description: "userid",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client }) => {
    await interaction.deferReply();
    const g = await client.guilds.fetch(jsonConfig.guilds.mainserver);
    const usr = await g.members.fetch(
      interaction.options.getString("id") || jsonConfig.devs[0]
    );
    await usr.timeout(null);
    return;
  },
  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
};
