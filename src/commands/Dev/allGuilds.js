const { EmbedBuilder } = require("discord.js");
const jsonConfig = require("../../../config.json");

const dLog = require("../../functions/dLog");

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: {
    name: "ag",
    description: "ALGLD",
  },

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client }) => {
    await interaction.deferReply();
    try {
      // setTimeout(() => {

      // }, 5000);
      const allGuildsEmbed = new EmbedBuilder()
        .setColor(jsonConfig.colors.mainColor)
        .setAuthor({
          name: interaction.user.username,
          iconURL:
            interaction.user.avatarURL() ||
            interaction.user.defaultAvatarURL ||
            interaction.user.displayAvatarURL(),
          url: `https://discord.com/users/${interaction.user.id}/`,
        })
        .setTitle("Alle Guilds")
        .setDescription(
          `
                **DEZE GUILD** 
                ${interaction.guild.name + " | " + interaction.guild.id}
    
                **ALLE GUILDS**
                ${client.guilds.cache
                  .map((m) => `${m.name} | ${m.id}`)
                  .join("\n")}`
        )
        .setFooter({
          text: `${client.user.username}`,
          iconURL: client.user.avatarURL(),
        })
        .setTimestamp();
      interaction.followUp({
        embeds: [allGuildsEmbed],
      });
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: jsonConfig.messages.mainError,
      });
    }
  },
  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
};
