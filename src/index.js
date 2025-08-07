require("dotenv/config");

const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const { CommandKit } = require("commandkit");
const jsonConfig = require("../config.json");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandKit({
  client,
  eventsPath: `${__dirname}/events`,
  commandsPath: `${__dirname}/commands`,
  devGuildIds: ["1388799644959506462"],
  devUserIds: jsonConfig.devs,
  validationsPath: `${__dirname}/validations`,
  // bulkRegister: true,
});

process.on("unhandledRejection", async (reason, promise) => {
  console.log("Unhandled Rejection Error");
  console.log(reason, promise);
  const log = new EmbedBuilder()
    .setColor("Red")
    .setTitle(`Error`)
    .setDescription(
      `${promise.toString()}\n\n\`\`\`\ ${JSON.stringify(promise)} \`\`\``
    )
    .setTimestamp();

  const g = await client.guilds.fetch(jsonConfig.guilds.logs);
  const c = await g.channels.fetch(jsonConfig.channels.devlog);
  await c.send({ embeds: [log] });
}); // Handles Unhandled Rejection Errors

process.on("uncaughtException", async (err, origin) => {
  console.log("Uncaught Exeception Error");
  console.log(err, origin);
  const log = new EmbedBuilder()
    .setColor("Red")
    .setTitle(`Error`)
    .setDescription(
      `${err.toString()}\n\n\`\`\`\ ${JSON.stringify(origin)} \`\`\``
    )
    .setTimestamp();

  const g = await client.guilds.fetch(jsonConfig.guilds.logs);
  const c = await g.channels.fetch(jsonConfig.channels.devlog);
  await c.send({ embeds: [log] });
}); // Handles Uncaught Excpetion Errors

client.login(process.env.TOKEN);
