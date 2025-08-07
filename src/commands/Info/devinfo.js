const { ContainerBuilder, MessageFlags } = require("discord.js");
const DevInfoContainer = require("../../functions/DevInfoContainer");
module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: {
    name: "devinfo",
    description: "Information about the developers",
  },

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client }) => {
    await interaction.deferReply();
    interaction.editReply({
      flags: MessageFlags.IsComponentsV2,
      components: [await DevInfoContainer("en")],
    });
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    // https://commandkit.js.org/typedef/CommandOptions
  },
};
