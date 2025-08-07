const { ActivityType } = require("discord.js");
const jsonConfig = require("../../../config.json");

module.exports = (client) => {
  let statusses = [
    {
      name: "Intakes",
      type: ActivityType.Custom,
    },
    {
      name: "met de spelers",
      type: ActivityType.Playing,
    },
    {
      name: `In samenwerking met Cuboid Development`,
      type: ActivityType.Custom,
    },
  ];

  let statusCount = -1;
  setInterval(() => {
    statusCount++;
    if (statusCount === statusses.length) statusCount = 0;

    client.user.setActivity(statusses[statusCount]);
  }, 10 * 1000);
};
