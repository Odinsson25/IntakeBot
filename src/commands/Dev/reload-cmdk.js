const { ApplicationCommandOptionType, MessageFlags } = require("discord.js");
const { devs } = require("../../../config.json");

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: {
    name: "reload",
    description: "Reload CMDK (DEV)",
    options: [
      {
        name: "events",
        description: "Reload events",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "validations",
        description: "Reload validations",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "commands",
        description: "Reload Commands",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "type",
            description: "Command reload type",
            type: ApplicationCommandOptionType.String,
            choices: [
              { name: "dev", value: "dev" },
              { name: "global", value: "global" },
            ],
          },
        ],
      },
    ],
  },

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    if (!devs.includes(interaction.user.id))
      return interaction.followUp("You are not a developer");
    if (!handler.devUserIds.includes(interaction.user.id))
      return interaction.followUp("You are not a developer");

    switch (interaction.options.getSubcommand()) {
      case "events":
        await interaction.followUp("🔁 Reloading events...");
        await handler.reloadEvents().catch(async (e) => {
          await interaction.editReply(
            `❌ Encountered an error while reloading events.\n${e}\n*Error has been sent to the terminal*`
          );
        });
        await interaction.editReply("✅ Reloaded events successfully");
        break;
      case "validations":
        await interaction.followUp("🔁 Reloading validations...");
        await handler.reloadValidations().catch(async (e) => {
          await interaction.editReply(
            `❌ Encountered an error while reloading validations.\n${e}\n*Error has been sent to the terminal*`
          );
        });
        await interaction.editReply("✅ Reloaded validations successfully");
        break;
      case "commands":
        if (interaction.options.getString("type") === "dev") {
          await interaction.followUp("🔁 Reloading developer commands...");
          await handler.reloadCommands("dev").catch(async (e) => {
            await interaction.editReply(
              `❌ Encountered an error while reloading developer commands.\n${e}\n*Error has been sent to the terminal*`
            );
          });
          await interaction.editReply(
            "✅ Reloaded developer commands successfully"
          );
        }
        if (interaction.options.getString("type") === "global") {
          await interaction.followUp("🔁 Reloading global commands...");
          await handler.reloadCommands("global").catch(async (e) => {
            await interaction.editReply(
              `❌ Encountered an error while reloading global commands.\n${e}\n*Error has been sent to the terminal*`
            );
          });
          await interaction.editReply(
            "✅ Reloaded global commands successfully"
          );
        }
        if (
          interaction.options.getString("type") != "dev" &&
          interaction.options.getString("type") != "global"
        ) {
          await interaction.followUp("🔁 Reloading commands...");
          await handler.reloadCommands().catch(async (e) => {
            await interaction.editReply(
              `❌ Encountered an error while reloading commands.\n${e}\n*Error has been sent to the terminal*`
            );
          });
          await interaction.editReply("✅ Reloaded commands successfully");
        }

        break;
    }
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
};
