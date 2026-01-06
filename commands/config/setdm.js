const Discord = require("discord.js"),
  { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "setdm",
  description: "enable or disable dm when user win",
  group: __dirname,
  owner: false,
  premium: false,

  options: [
    {
      name: "status",
      description: "Choose the value",
      required: true,
      type: Discord.ApplicationCommandOptionType.String,
      choices: [
        { name: "on", value: "on" },
        { name: "off", value: "off" },
      ],
    },
  ],

  run: async (client, interaction, guildData, lang) => {
    await interaction.deferReply({ flags: Discord.MessageFlags.Ephemeral });
    // If the member doesn't have enough permissions
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      )
    )
      return interaction.editReply({ content: lang.lang.perms });

    const dmstatus = interaction.options.getString("status");

    if (dmstatus === "on") {
      if (guildData.plugins.dmwinners.enabled) {
        return interaction.editReply(lang.already.enb);
      }

      guildData.plugins.dmwinners.enabled = true;
      guildData.markModified("plugins.dmwinners.enabled");
      await guildData.save();

      interaction.editReply(lang.setdm.doneon);
    }

    if (dmstatus === "off") {
      if (guildData.plugins.dmwinners.enabled === false) {
        return interaction.editReply(lang.already.dis);
      }

      guildData.plugins.dmwinners.enabled = false;
      guildData.markModified("plugins.dmwinners.enabled");
      await guildData.save();

      interaction.editReply(lang.setdm.doneoff);
    }
  },
};
