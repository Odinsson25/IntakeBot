const {
  EmbedBuilder,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  MessageFlags,
} = require("discord.js");
const jsonConfig = require("../../../config.json");
module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: {
    name: "intake-status",
    description: "Set the status for intakes",
    description_localizations: { nl: "Stel de status in voor intakes" },
    options: [
      {
        name: "status",
        description: "Set the status for intakes",
        description_localizations: { nl: "Stel de status in voor intakes" },
        type: ApplicationCommandOptionType.String,
        choices: [
          { name: "Open", value: "o", name_localizations: { nl: "Open" } },
          { name: "Closed", value: "c", name_localizations: { nl: "Dicht" } },
        ],
      },
    ],
  },

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction }) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const statusCh = await interaction.guild.channels.fetch(
      jsonConfig.channels.intake_status
    );
    const wachtVC = await interaction.guild.channels.fetch(
      jsonConfig.channels.vc.intake_wachtkamer
    );
    const logch = await interaction.guild.channels.fetch(
      jsonConfig.channels.intake_log
    );
    const messId = "1400928797930557440" || null;
    let msg = await statusCh.messages.fetch(messId).catch((c) => (msg = null));

    const openE = new EmbedBuilder()
      .setTitle("Intakes open")
      .setDescription(
        "De intakes zijn open! Join de wachtkamer, en je wordt vanzelf gesleept."
      )
      .setColor("Green");
    const closedE = new EmbedBuilder()
      .setTitle("Intakes gesloten")
      .setDescription(
        "De intakes zijn gesloten! In dit kanaal krijg je een bericht wanneer de intakes weer open zijn."
      );

    switch (interaction.options.getString("status")) {
      case "o":
        wachtVC.userLimit = 8;
        wachtVC.permissionOverwrites.edit(interaction.guild.id, {
          JoinChannel: true,
        });
        if (msg) {
          await msg.edit({ content: "", embeds: [openE] });
        } else {
          await statusCh.send({ emebed: [openE] });
        }
        logch.send({
          content: `Intakes geopend door ${interaction.user.username}`,
          //   embeds: [openE],
        });
        await interaction.followUp(`Succes! ${statusCh}`);
        return;

      case "c":
        wachtVC.userLimit = null;
        wachtVC.permissionOverwrites.edit(interaction.guild.id, {
          JoinChannel: false,
        });
        if (msg) {
          await msg.edit({ content: "", embeds: [closedE] });
        } else {
          await statusCh.send({ emebed: [closedE] });
        }
        logch.send({
          content: `Intakes gesloten door ${interaction.user.username}`,
          //   embeds: [closedE],
        });
        await interaction.followUp(`Succes! ${statusCh}`);
        return;
    }
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    // https://commandkit.js.org/typedef/CommandOptions
    // deleted: true,
  },
};
