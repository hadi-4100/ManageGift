const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  PermissionsBitField,
  ApplicationCommandOptionType,
  MessageFlags,
} = require("discord.js");
const ms = require("ms");
const moment = require("moment");

module.exports = {
  name: "edit",
  description: "Edit an existing giveaway",
  group: __dirname,
  options: [
    {
      name: "type",
      description: "What do you want to change?",
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "Winners", value: "winners" },
        { name: "Prize", value: "prize" },
        { name: "Duration", value: "duration" },
      ],
    },
    {
      name: "new_value",
      description: "Enter the new value",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],

  run: async (client, interaction, guildData, lang) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const hasManageMessages = interaction.member.permissions.has(
      PermissionsBitField.Flags.ManageMessages
    );
    const hasRequiredRole =
      guildData.plugins.role.enabled &&
      interaction.member.roles.cache.has(guildData.plugins.role.role);

    if (!hasManageMessages && !hasRequiredRole) {
      return interaction.editReply({
        content: lang.create.perms,
      });
    }

    const editType = interaction.options.getString("type");
    const newValue = interaction.options.getString("new_value");

    // Pre-validation
    if (editType === "winners") {
      const winners = parseInt(newValue.replace(/[^0-9]/g, ""));
      if (isNaN(winners) || winners < 1) {
        return interaction.editReply({
          content: lang.create.argswinners,
        });
      }
    } else if (editType === "prize" && newValue.length > 50) {
      return interaction.editReply({
        content: lang.create.prizee,
      });
    } else if (editType === "duration") {
      const durationMs = ms(newValue);
      if (!durationMs || durationMs < ms("40s")) {
        return interaction.editReply({
          content: lang.create.duration,
        });
      }
    }

    const activeGiveaways = client.manager.giveaways.filter(
      (g) =>
        g.guildId === interaction.guild.id &&
        !g.ended &&
        !g.pauseOptions.isPaused &&
        !g.isDrop
    );

    if (activeGiveaways.length === 0) {
      return interaction.editReply({
        content: "No active giveaways found to edit.",
      });
    }

    const selectOptions = activeGiveaways.map((g) => ({
      label: lang.delete.option1(g),
      description: `${lang.delete.option2(g)} | ${lang.edit.ending} ${moment(
        g.endAt
      ).fromNow()}`,
      value: g.messageId,
      emoji: "<:botlogo:1024760383677927484>",
    }));

    selectOptions.push({
      label: lang.cancel.option1,
      description: lang.cancel.option2,
      value: "cancel",
      emoji: "<:backk:1021855656879341659>",
    });

    const selectMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("edit_giveaway_select")
        .setPlaceholder(lang.selectmenu.choose)
        .addOptions(selectOptions)
    );

    const response = await interaction.editReply({
      content: lang.edit.foredit,
      components: [selectMenu],
    });

    const collector = response.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      const messageId = i.values[0];

      if (messageId === "cancel") {
        return i.update({ content: lang.cancel.cancelled, components: [] });
      }

      const giveaway = client.manager.giveaways.find(
        (g) => g.messageId === messageId
      );
      if (!giveaway) {
        return i.update({ content: "Giveaway not found.", components: [] });
      }

      // Check if user is host or has manage permissions
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

      const editOptions = {};
      let successMessage = "";

      try {
        switch (editType) {
          case "winners":
            editOptions.newWinnerCount = parseInt(
              newValue.replace(/[^0-9]/g, "")
            );
            successMessage = lang.edit.wi(messageId);
            break;
          case "prize":
            editOptions.newPrize = newValue;
            successMessage = lang.edit.pr(messageId);
            break;
          case "duration":
            editOptions.setEndTimestamp = Date.now() + ms(newValue);
            successMessage = lang.edit.ti(messageId);
            break;
        }

        await client.manager.edit(messageId, editOptions);
        await i.update({ content: successMessage, components: [] });
      } catch (err) {
        client.log(
          `Error editing giveaway ${messageId}: ${err.message}`,
          "error"
        );
        await i.update({ content: lang.edit.errmod, components: [] });
      }
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        interaction
          .editReply({ content: lang.collector.time, components: [] })
          .catch(() => null);
      }
    });
  },
};
