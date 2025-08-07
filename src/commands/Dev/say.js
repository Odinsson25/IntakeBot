const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: {
    name: "say",
    description: "Replies with Pong",
    options: [
      {
        name: "txt",
        description: "txt",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "channel",
        description: "Select a channel",
        type: ApplicationCommandOptionType.Channel,
        required: false,
      },
      {
        name: "channelid",
        description: "Select a channel",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client }) => {
    const channel =
      interaction.options.getChannel("channel") ||
      (await client.channels.fetch(
        interaction.options.getString("channelid")
      )) ||
      interaction.channel;

    await channel.send(`${interaction.options.getString("txt")}`);
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
};
