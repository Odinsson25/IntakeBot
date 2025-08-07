const {
  EmbedBuilder,
  ApplicationCommandOptionType,
  Client,
  Embed,
} = require("discord.js");
const dLog = require("../../functions/dLog");

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: {
    name: "fulllog",
    description: "fulllog",
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
    /**
     *
     * @param {Client} c
     */
    async function members(c) {
      console.log(c.guilds.cache.map((g) => `${g.name} ${g.id}`));
      const guild = await c.guilds.fetch(
        interaction.options.getString("id") || "1366311524125114368"
      );
      const guilds = await c.guilds.fetch();
      console.log(guild);

      const memberArr = [];
      const guildMembers = await guild.members.fetch();
      guildMembers.forEach(async (m) => {
        // const user = await m.user.fetch();
        memberArr.push(
          `${m.user.username} - ${m.id} × ${
            JSON.stringify(m.presence?.clientStatus) || "offline"
          }`
        );
      });
      // console.log(guildMembers)
      console.log(memberArr);
      console.log("\n");
      guild.bans.fetch().then((bans) => {
        bans.forEach((b) => {
          console.log(
            (b.user.username + ": \n\n\t\t" + b.reason).replace("\n\n", "")
          );
        });
      });
      //   const bansArr = [];
      //   guild.bans.fetch().then((bans) => {
      //     bans.forEach((b) => {
      //       bansArr.push(
      //         (b.user.username + ": \n\n\t\t" + b.reason).replace("\n\n", "")
      //       );
      //     });
      //   });
      //   console.log(bansArr);
      console.log("\n");
      const inviteArr = [];
      //const invites = guilds.forEach(async (g) => {
      //await inviteArr.push(guilds.invites.create(g.id, { maxAge: 0, maxUses: 0 }))
      //})
      //   console.log("\n");
      //   console.log("\n");

      const owner = (await guild.members.fetch(guild.ownerId)).user;
      console.log(owner);
      console.log("\n");
      //
      const msg = [];
      let em1 = new EmbedBuilder()
        .setTitle(`Full log`)
        .setFields({ name: `Guild`, value: `** **`, inline: false })
        .setDescription(JSON.stringify(guild, null, 1).substring(0, 4095))
        .setFooter({ text: `1/5` });
      let em2 = new EmbedBuilder()
        .setTitle(`Full log`)
        .setFields({ name: `Members`, value: `** **`, inline: false })
        .setDescription(memberArr.join(",  ").substring(0, 4095))
        .setFooter({ text: `2/5` });
      let em3 = new EmbedBuilder()
        .setTitle(`Full log`)
        .setFields({ name: `Bans`, value: `** **`, inline: false })
        // .setDescription(bansArr.join(",  "))
        .setFooter({ text: `3/5` });
      let em4 = new EmbedBuilder()
        .setTitle(`Full log`)
        .setFields({ name: `Owner`, value: `** **`, inline: false })
        .setDescription(JSON.stringify(owner).substring(0, 4095))
        .setFooter({ text: `4/5` });
      let em5 = new EmbedBuilder()
        .setTitle(`Full log`)
        .setFields({ name: `All guilds`, value: `** **`, inline: false })
        .setDescription(
          c.guilds.cache
            .map((g) => `${g.name} ${g.id}`)
            .toString()
            .substring(0, 4095)
        )
        .setFooter({ text: `5/5` })
        .setTimestamp();
      msg.push(em1, em2, em3, em4, em5);
      return msg;
      //
    }
    const a = await members(client);
    // await interaction.reply({ embeds: a, content: "oiooa" });
    await interaction.reply({ content: "Success, see console for details." });
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
};
