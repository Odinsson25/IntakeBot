const { ContainerBuilder, ButtonStyle } = require("discord.js");
module.exports = (lang) => {
  const ContainerEN = new ContainerBuilder()
    .addSectionComponents((s) =>
      s
        .addTextDisplayComponents((t) =>
          t.setContent("# <:Cuboid_nobg:1396632156599615498> Developer info")
        )
        .setButtonAccessory(
          (b) =>
            b
              .setCustomId("devinfo.to.NL")
              .setLabel("Nederlandse versie")
              .setStyle(ButtonStyle.Primary)
          // .setEmoji({ name: "flag_nl" })
        )
        .addTextDisplayComponents((t) =>
          t.setContent(
            "This bot was created by Cuboid Development. Cuboid Development is a development community created by Odinsson25."
          )
        )
    )
    .addSeparatorComponents((s) => s)
    .addSectionComponents((s) =>
      s
        .addTextDisplayComponents((t) =>
          t.setContent("## What does Cuboid do?")
        )
        .setButtonAccessory((b) =>
          b
            .setURL("https://discord.gg/8Fmk6RCEKj")
            .setStyle(ButtonStyle.Link)
            .setLabel("Development Server")
        )
        .addTextDisplayComponents((t) =>
          t.setContent(
            "Cuboid Development creates Discord bots for all kinds of purposes, such as roleplay servers, gaming communities, and moderation. You can create a ticket in the Development Server to explore the possibilities."
          )
        )
    )
    .addSeparatorComponents((s) => s)
    .addTextDisplayComponents((t) => t.setContent("## Developers"))
    .addTextDisplayComponents((t) =>
      t.setContent("A list of Cuboid developers can be found here.\n")
    )
    .addTextDisplayComponents((t) =>
      t.setContent("> Odinsson25 (@odinsson25)\n> Leif (@leif_code)")
    );

  const ContainerNL = new ContainerBuilder()
    .addSectionComponents((s) =>
      s
        .addTextDisplayComponents((t) =>
          t.setContent("# <:Cuboid_nobg:1396632156599615498> Developer info")
        )
        .setButtonAccessory(
          (b) =>
            b
              .setCustomId("devinfo.to.EN")
              .setLabel("English version")
              .setStyle(ButtonStyle.Primary)
          // .setEmoji({ name: "flag_us" })
        )
        .addTextDisplayComponents((t) =>
          t.setContent(
            "Deze bot is gemaakt door Cuboid Development. Cuboid Development is een developerscommunity opgericht door Odinsson25."
          )
        )
    )
    .addSeparatorComponents((s) => s)
    .addSectionComponents((s) =>
      s
        .addTextDisplayComponents((t) => t.setContent("## Wat doet Cuboid?"))
        .setButtonAccessory((b) =>
          b
            .setURL("https://discord.gg/8Fmk6RCEKj")
            .setStyle(ButtonStyle.Link)
            .setLabel("Development Server")
        )
        .addTextDisplayComponents((t) =>
          t.setContent(
            "Cuboid Development maakt Discord bots voor allerlei doeleinden, zoals roleplay servers, gaming communities en moderatie. Je kunt een ticket aanmaken op de Development Server om de mogelijkheden te verkennen."
          )
        )
    )
    .addSeparatorComponents((s) => s)
    .addTextDisplayComponents((t) => t.setContent("## Developers"))
    .addTextDisplayComponents((t) =>
      t.setContent("Een lijst van Cuboid developers is hier te vinden.\n")
    )
    .addTextDisplayComponents((t) =>
      t.setContent("> Odinsson25 (@odinsson25)\n> Leif (@leif_code)")
    );
  if (lang === "nl") {
    // console.log(ContainerNL);
    return ContainerNL;
  }

  if (lang === "en") {
    // console.log(ContainerEN);
    return ContainerEN;
  }
  return { ContainerEN, ContainerNL };
};
