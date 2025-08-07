const { Client, EmbedBuilder, MessageFlags } = require("discord.js");
const jsonConfig = require("../../../config.json");
const dLog = require("../../functions/dLog");
/**
 *
 * @param {import("discord.js").ButtonInteraction} interaction
 * @param {Client} client
 *
 */
module.exports = async (interaction, client, handler) => {
  if (!interaction.isButton()) return;
  if (!interaction.customId == "inzet.finish") return;
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });
  const chArr = [jsonConfig.channels.pager, jsonConfig.channels.geplande_inzet];
  if (chArr.includes(interaction.channel.id)) {
    const newEmbed = EmbedBuilder.from(interaction.message.embeds[0])
      .setColor("Green")
      .setTitle("✅ AFGEROND | " + interaction.message.embeds[0].title)
      .setDescription(
        interaction.message.embeds[0]?.description ||
          "" + "\n\n✅ **Inzet is afgerond**, bedankt voor uw inzet"
      );
    await interaction.message.edit({ embeds: [newEmbed], components: [] });
    interaction.message.reactions.removeAll();
    await interaction.followUp("Inzet afgerond.");
  }
};
