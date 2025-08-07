const { Client, EmbedBuilder } = require("discord.js");
const jsonConfig = require("../../../config.json");
const dLog = require("../../functions/dLog");
/** * @param {import('discord.js').Client} client */
module.exports = async (client) => {
  const log = new EmbedBuilder()
    .setColor("Green")
    .setTitle(`Bot startup`)
    .setDescription(`Bot started up successfully`)

    .setTimestamp();

  dLog(client, log);
};
