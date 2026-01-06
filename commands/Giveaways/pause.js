const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    PermissionsBitField,
    MessageFlags,
  } = require("discord.js"),
  moment = require("moment");

module.exports = {
  name: "pause",
  description: "pause a giveaway",
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
    const activeegivs = client.manager.giveaways
      .filter(
        (g) =>
          g.guildId === interaction.guild.id &&
          g.pauseOptions.isPaused !== true &&
          g.ended !== true &&
          !g.isDrop
      )
      .reverse()
      .slice(0, 24);

    if (activeegivs.length === 0) {
      return interaction.editReply({
        content: "No active unpaused giveaways found.",
      });
    }

    for (let i = 0; i < activeegivs.length; i++) {
      let value = activeegivs[i];
      options.push({
        label: lang.delete.option1(value),
        description: `${lang.delete.option2(value)} | ${
          lang.edit.ending
        } ${moment(value.endAt).fromNow()}`,
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

    const pauseMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("pause-giveaway")
        .setPlaceholder(lang.selectmenu.choose)
        .addOptions(options)
    );

    const response = await interaction.editReply({
      content: lang.pause.forpause,
      components: [pauseMenu],
    });

    const filter = (i) => interaction.user.id === i.user.id;

    const collector = response.createMessageComponentCollector({
      filter,
      max: 1,
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

        // check if user is the host or has manage permissions
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

        const messageID = i.values[0];

        client.manager
          .pause(messageID)
          .then(() => {
            i.update({ content: lang.pause.done(messageID), components: [] });
          })
          .catch((err) => {
            client.log(`Pause Error: ${err.message}`, "error");
            i.update({ content: lang.pause.errmod, components: [] });
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
