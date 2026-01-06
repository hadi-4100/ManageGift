const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    PermissionsBitField,
    MessageFlags,
  } = require("discord.js"),
  moment = require("moment");

module.exports = {
  name: "delete",
  description: "delete a giveaway",
  group: __dirname,
  owner: false,
  premium: false,
  run: async (client, interaction, guildData, lang) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    // If the member doesn't have enough permissions
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      ) &&
      guildData.plugins.role.enabled &&
      !interaction.member.roles.cache.get(guildData.plugins.role.role)
    ) {
      return interaction.editReply({ content: lang.create.perms });
    }

    let options = [];
    let allgiveaways;
    allgiveaways = client.manager.giveaways.filter(
      (g) =>
        g.guildId === interaction.guild.id && g.pauseOptions.isPaused !== true
    );
    allgiveaways.reverse();
    allgiveaways = allgiveaways.slice(0, 24);

    if (allgiveaways.length === 0) {
      return interaction.editReply({
        content: "No deletable giveaways found.",
      });
    }

    for (let i = 0; i < allgiveaways.length; i++) {
      let value = allgiveaways[i];
      options.push({
        label: lang.delete.option1(value),
        description: lang.delete.option2(value),
        value: `${value.messageId}`,
        emoji: `<:botlogo:1024760383677927484>`,
      });
    }

    options.push({
      label: lang.cancel.option1,
      description: lang.cancel.option2,
      value: `cancel`,
      emoji: `<:backk:1021855656879341659>`,
    });

    const deletegiveaway = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("delete-giveaway")
        .setPlaceholder(lang.selectmenu.choose)
        .addOptions(options)
    );

    const response = await interaction.editReply({
      content: lang.delete.fordelete,
      components: [deletegiveaway],
    });

    const filter = (i) => interaction.user.id === i.user.id;

    const collector = response.createMessageComponentCollector({
      filter,
      time: 300000,
    });

    collector.on("collect", (i) => {
      if (i.values[0] === "cancel") {
        i.update({ content: lang.cancel.cancelled, components: [] });
      } else {
        const giveaway = client.manager.giveaways.find(
          (g) => g.messageId === i.values[0]
        );
        if (!giveaway) {
          return i.update({ content: "Giveaway not found.", components: [] });
        }

        // check if user is the host of giveaway or has manage permissions
        const isHost =
          giveaway.hostedBy.includes(i.user.id) ||
          giveaway.hostedBy === i.user.toString();
        if (
          !isHost &&
          !i.member.permissions.has(PermissionsBitField.Flags.ManageMessages)
        ) {
          return i.reply({
            content: lang.otherUser,
            flags: MessageFlags.Ephemeral,
          });
        }

        const giveawayid = i.values[0];

        client.manager
          .delete(giveawayid)
          .then(() => {
            i.update({ content: lang.delete.done(giveawayid), components: [] });
          })
          .catch((err) => {
            client.log(`Delete Error: ${err.message}`, "error");
            i.update({ content: lang.delete.errmod, components: [] });
          });
      }
    });

    collector.on("end", (collected, reason) => {
      if (reason == "time") {
        interaction
          .editReply({
            content: lang.collector.time,
            components: [],
          })
          .catch(() => null);
      }
    });
  },
};
