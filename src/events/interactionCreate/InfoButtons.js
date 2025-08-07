const { MessageFlags } = require("discord.js");
const DevInfoContainers = require("../../functions/DevInfoContainer");

module.exports = async (interaction) => {
  if (interaction.customId == "devinfo.to.NL") {
    await interaction.message.edit({
      flags: MessageFlags.IsComponentsV2,
      components: [DevInfoContainers("nl")],
    });
    interaction.followUp({
      flags: MessageFlags.Ephemeral,
      content: "Veranderd naar Nederlands.",
    });
  }
  if (interaction.customId == "devinfo.to.EN") {
    await interaction.message.edit({
      flags: MessageFlags.IsComponentsV2,
      components: [DevInfoContainers("en")],
    });
    interaction.followUp({
      flags: MessageFlags.Ephemeral,
      content: "Changed to English.",
    });
  }
};
