const { ApplicationCommandOptionType, MessageFlags } = require("discord.js");
const { devs } = require("../../../config.json");
const jsonConfig = require("../../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: {
    name: "intake",
    description: "intake",
    options: [
      {
        name: "accept",
        name_localizations: { nl: "aannemen" },
        description: "Accept a player, intake successful",
        description_localizations: {
          nl: "Een speler aannemen, intake gehaald",
        },
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user1",
            name_localizations: {
              nl: "gebruiker",
              "en-GB": "user",
              "en-US": "user",
            },
            description: "The approved user",
            description_localizations: { nl: "De aangenomen gebruiker" },
            type: ApplicationCommandOptionType.User,
            required: true,
          },
          {
            name: "name1",
            name_localizations: {
              nl: "naam",
              "en-GB": "name",
              "en-US": "name",
            },
            description: "The characters name",
            description_localizations: { nl: "De naam van het karakter" },
            type: ApplicationCommandOptionType.String,
            required: true,
          },
          {
            name: "notes1",
            name_localizations: {
              nl: "opmerkingen",
              "en-GB": "notes",
              "en-US": "notes",
            },
            description: "Additional comments",
            description_localizations: { nl: "Opmerkingen" },
            type: ApplicationCommandOptionType.String,
            required: false,
          },
        ],
      },
      {
        name: "decline",
        name_localizations: { nl: "afwijzen" },
        description: "Decline a player, intake not successful",
        description_localizations: {
          nl: "Een speler afwijzen, intake niet gehaald",
        },
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user2",
            name_localizations: {
              nl: "gebruiker",
              "en-GB": "user",
              "en-US": "user",
            },
            description: "The declined user",
            description_localizations: { nl: "De afgewezen gebruiker" },
            type: ApplicationCommandOptionType.User,
            required: true,
          },
          {
            name: "timeout2",
            name_localizations: {
              nl: "timeout",
              "en-GB": "timeout",
              "en-US": "timeout",
            },
            description:
              "Intake timeout (what date can they re-intake? DD/MM/YY)",
            description_localizations: {
              nl: "Intake timeout (wanneer kunnen ze weer een intake doen? DD/MM/YY)",
            },
            type: ApplicationCommandOptionType.String,
            required: true,
          },
          {
            name: "notes2",
            name_localizations: {
              nl: "opmerkingen",
              "en-GB": "notes",
              "en-US": "notes",
            },
            description: "Additional comments",
            description_localizations: { nl: "Opmerkingen" },
            type: ApplicationCommandOptionType.String,
            required: false,
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
    console.log("1");
    if (!interaction.member.roles.cache.has(jsonConfig.roles.intake.leiding)) {
      console.log("2");

      if (
        !interaction.member.roles.cache.has(jsonConfig.roles.intake.regular)
      ) {
        return await interaction.followUp(jsonConfig.messages.permsError);
      }
    }
    let memb;
    const logch = await interaction.guild.channels.fetch(
      jsonConfig.channels.intake_log
    );

    switch (interaction.options.getSubcommand()) {
      case "accept":
        const embed1 = new EmbedBuilder()
          .setTitle("✅ Intake - Gehaald")
          .setColor("Green")
          .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.avatarURL(),
          })
          .setThumbnail(
            "https://media.discordapp.net/attachments/1398338143790436385/1399759503066398780/8FDD28DD-3DE7-42A7-9A07-7FD0666140BD.png?ex=688cce1f&is=688b7c9f&hm=d190a033cb875bc4c6a522c34eb92c5b8a34ee2ef7e5e1269fa4a4448c91f03b&=&format=webp&quality=lossless"
          )
          .setDescription(interaction.options.getUser("user1").id)
          .setFields(
            {
              name: "User",
              value: `${interaction.options.getUser("user1")}`,
            },
            {
              name: "Char name",
              value: `${interaction.options.getString("name1")}`,
            },
            {
              name: "Notes",
              value: `${
                interaction.options.getString("notes1") || "Geen notities"
              }`,
            }
          )
          //   .setFooter("Dit bericht is een geautomatiseerd bericht.")
          .setTimestamp();
        memb = await interaction.guild.members.fetch(
          interaction.options.getUser("user1").id
        );
        memb.roles.add(
          jsonConfig.roles.whitelist,
          `Intake accepted by ${interaction.user.username}`
        );
        memb.setNickname(interaction.options.getString("name1"));
        const membEmbed1 = new EmbedBuilder()
          .setTitle("✅ Intake - Gehaald")
          .setColor("Green")
          .setThumbnail(
            "https://media.discordapp.net/attachments/1398338143790436385/1399759503066398780/8FDD28DD-3DE7-42A7-9A07-7FD0666140BD.png?ex=688cce1f&is=688b7c9f&hm=d190a033cb875bc4c6a522c34eb92c5b8a34ee2ef7e5e1269fa4a4448c91f03b&=&format=webp&quality=lossless"
          )
          .setDescription(
            `Gefeliciteerd! Je hebt jouw intake in **${interaction.guild.name}** succesvol afgerond. Bekijk hieronder of jouw informatie klopt, zodat je snel de stad in kan!`
          )
          .setFields(
            {
              name: "User",
              value: `${interaction.options.getUser("user1")}`,
            },
            {
              name: "Char name",
              value: `${interaction.options.getString("name1")}`,
            }
          )
          .setFooter({
            text: "Mocht deze informatie niet kloppen, maak dan een ticket aan",
          })
          .setTimestamp();
        await logch.send({ embeds: [embed1] });
        await memb
          .send({ embeds: [membEmbed1] })
          .catch((e) => logch.send(`Couldn't DM user ${memb.user.username}`));
        await interaction.followUp("success");
        break;
      case "decline":
        const embed2 = new EmbedBuilder()
          .setTitle("❌ Intake - Gefaald")
          .setColor("Red")
          .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.avatarURL(),
          })
          .setDescription(interaction.options.getUser("user2").id)
          .setFields(
            {
              name: "User",
              value: `${interaction.options.getUser("user2")}`,
            },
            {
              name: "Intake timeout tot",
              value: `${interaction.options.getString("timeout2")}`,
            },
            {
              name: "Notes",
              value: `${
                interaction.options.getString("notes2") || "Geen notities"
              }`,
            }
          )
          .setThumbnail(
            "https://media.discordapp.net/attachments/1398338143790436385/1399759503066398780/8FDD28DD-3DE7-42A7-9A07-7FD0666140BD.png?ex=688cce1f&is=688b7c9f&hm=d190a033cb875bc4c6a522c34eb92c5b8a34ee2ef7e5e1269fa4a4448c91f03b&=&format=webp&quality=lossless"
          )
          //   .setFooter("Dit bericht is een geautomatiseerd bericht.")
          .setTimestamp();
        memb = await interaction.guild.members.fetch(
          interaction.options.getUser("user2").id
        );

        const membEmbed2 = new EmbedBuilder()
          .setTitle("❌ Intake - Gefaald")
          .setColor("Red")
          .setThumbnail(
            "https://media.discordapp.net/attachments/1398338143790436385/1399759503066398780/8FDD28DD-3DE7-42A7-9A07-7FD0666140BD.png?ex=688cce1f&is=688b7c9f&hm=d190a033cb875bc4c6a522c34eb92c5b8a34ee2ef7e5e1269fa4a4448c91f03b&=&format=webp&quality=lossless"
          )
          .setDescription(
            `Helaas, jouw intake in **${interaction.guild.name}** is afgekeurd. Dit betekent dat je voor een korte termijn geen intakes mag doen. Doe je dit alsnog in die periode, kan een ban uitgedeeld worden.`
          )
          .setFields({
            name: "Intake timeout tot",
            value: `${interaction.options.getString("timeout2")}`,
          })
          .setFooter({
            text: "De datum die vermeld wordt is de datum dat je weer een intake mag doen.",
          })
          .setTimestamp();

        await memb
          .send({ embeds: [membEmbed2] })
          .catch((e) => logch.send(`Couldn't DM user ${memb.user.username}`));

        await logch.send({ embeds: [embed2] });

        await interaction.followUp("success");

        break;
    }
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    // deleted: true,
  },
};
