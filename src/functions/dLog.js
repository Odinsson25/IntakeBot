const jsonConfig = require("../../config.json");
module.exports = async (client, embed, channelId) => {
  const g = await client.guilds.fetch(jsonConfig.guilds.logs);
  const c = await g.channels.fetch(channelId || jsonConfig.channels.devlog);
  await c.send({ embeds: [embed] });
};
