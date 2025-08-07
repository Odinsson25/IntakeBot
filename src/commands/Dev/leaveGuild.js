const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const dLog = require("../../functions/dLog");

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: {
    name: "lg",
    description: "LGLD",
    options: [
      {
        name: "id",
        description: "GLD_ID",
        type: ApplicationCommandOptionType.String,
      },
    ],
  },

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client }) => {
    await interaction.deferReply({ ephemeral: true });
    const guildID = interaction.options.getString("id") || interaction.guild.id;
    const guildName = (await client.guilds.fetch(guildID)).name;
    client.guilds.cache
      .get(guildID)
      .leave()
      .then((guild) =>
        interaction.followUp({
          content: `Ik heb ${guild} (${guildID}) succesvol verlaten`,
        })
      );
    const emb = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Force-leave Guild")
      .setDescription(
        `Bot left guild ${guildID}, known as ${guildName}\n\n**Executed by** ${interaction.user.username} / ${interaction.user.id}`
      )
      .setTimestamp();
    dLog(client, emb);
    console.log(`-- LEFT ${guildID}. Used by ${interaction.user.id} --`);
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
};
