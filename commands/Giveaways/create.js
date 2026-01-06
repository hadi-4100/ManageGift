const {
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ApplicationCommandOptionType,
  ChannelType,
  EmbedBuilder,
  MessageFlags,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "create",
  description: "Create a giveaway",
  group: __dirname,
  options: [
    {
      name: "duration",
      description: "How long the giveaway should last (e.g., 1m, 1h, 1d)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "winners",
      description: "How many winners the giveaway should have",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      minValue: 1,
    },
    {
      name: "prize",
      description: "What the prize of the giveaway should be",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "channel",
      description: "The channel to create the giveaway in",
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ChannelType.GuildText],
      required: false,
    },
    {
      name: "required_role",
      description: "Users must have a specific role to participate",
      type: ApplicationCommandOptionType.Role,
      required: false,
    },
    {
      name: "require_server",
      description:
        "Users must be in a specific server to participate (Invite Link)",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction, guildData, lang) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    // Permission checks
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      return interaction.editReply({
        content: lang.cmd.botperm,
      });
    }

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

    const giveawayDuration = interaction.options.getString("duration");
    const giveawayNumberWinners = interaction.options.getInteger("winners");
    const giveawayPrize = interaction.options.getString("prize");
    const targetChannel =
      interaction.options.getChannel("channel") || interaction.channel;
    const requiredRole = interaction.options.getRole("required_role");
    const serverInvite = interaction.options.getString("require_server");

    // Validations
    const durationMs = ms(giveawayDuration);
    if (!durationMs || durationMs < ms("40s")) {
      return interaction.editReply({
        content: lang.create.duration,
      });
    }

    if (giveawayPrize.length > 50) {
      return interaction.editReply({
        content: lang.create.prizee,
      });
    }

    let serverReqId = null;
    let serverReqName = null;

    if (serverInvite) {
      if (!serverInvite.includes("discord.gg/")) {
        return interaction.editReply({
          content: lang.create.errorlink,
        });
      }

      try {
        const invite = await client.fetchInvite(serverInvite);
        serverReqId = invite.guild.id;
        serverReqName = invite.guild.name;

        if (!client.guilds.cache.has(serverReqId)) {
          return interaction.editReply({
            content: lang.create.notinserver,
          });
        }
      } catch {
        return interaction.editReply({
          content: lang.create.errorlink,
        });
      }
    }

    const mentionEveryone = guildData.plugins.mention.enabled;
    const giveawayText = mentionEveryone
      ? `@everyone\n${lang.messages.giveaway}`
      : lang.messages.giveaway;
    const endedText = mentionEveryone
      ? `@everyone\n${lang.messages.giveawayEnded}`
      : lang.messages.giveawayEnded;

    // Start Giveaway
    try {
      const giveaway = await client.manager.start(targetChannel, {
        duration: durationMs,
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        hostedBy: interaction.user,
        extraData: {
          required_role: requiredRole?.id || null,
          required_server: serverReqId,
          dmwinners: guildData.plugins.dmwinners.enabled,
        },
        lastChance: {
          enabled: client.config.giveaway.lastchanceenabled,
          content: lang.lastchance.content,
          threshold: 30000,
          embedColor: "#c30000",
        },
        pauseOptions: {
          isPaused: false,
          content: lang.pauseoptions.content,
          unPauseAfter: ms("5h"),
          embedColor: "#0B0F6D",
          infiniteDurationText: lang.pauseoptions.autostart(ms("5h")),
        },
        messages: {
          giveaway: giveawayText,
          giveawayEnded: endedText,
          content1: lang.messages.content1,
          content2: lang.messages.content2,
          content3: lang.messages.content3,
          hostedBy: lang.messages.hostedBy,
          requirements: lang.messages.req,
          rolereq: lang.messages.rolereq,
          serverreq: lang.messages.serverreq(serverReqName, serverInvite),
          dropMessage: lang.messages.drop,
          end1: lang.messages.end1,
          end2: lang.messages.end2,
          end3: lang.messages.end3,
          drpend: lang.messages.drpend,
          novalid1: lang.messages.novalid1,
          novalid2: lang.messages.novalid2,
          embedFooter: lang.messages.embedFooter,
          dropfooter: lang.messages.dropfooter,
          novalidfoo: lang.messages.novalidfoo,
          winners: lang.messages.winners,
          endedAt: lang.messages.endedAt,
          approved1: lang.messages.approved1,
          approved2: lang.messages.approved2,
          denied1: lang.messages.denied1,
          denied2: lang.messages.denied2,
          dm1: lang.messages.dm1,
          dm2: lang.messages.dm2,
          dm3: lang.messages.dm3,
          winMessage: {
            embed: new EmbedBuilder()
              .setDescription(lang.messages.winMessage)
              .setColor("#454DFC"),
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setLabel(lang.create.view)
                  .setEmoji("<:botlogo:1024760383677927484>")
                  .setURL(
                    `https://discord.com/channels/${interaction.guildId}/${targetChannel.id}/{this.messageId}`
                  )
                  .setStyle(ButtonStyle.Link)
              ),
            ],
          },
        },
      });

      // Handle message ID hack if necessary
      if (
        giveaway.messageId &&
        lang.messages.content3.includes("{messageId}")
      ) {
        const updatedContent = lang.messages.content3.replace(
          "{messageId}",
          giveaway.messageId
        );
        await client.manager
          .edit(giveaway.messageId, {
            messages: {
              ...giveaway.messages,
              content3: updatedContent,
            },
          })
          .catch(() => null);
      }

      const viewButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel(lang.create.view)
          .setEmoji("<:botlogo:1024760383677927484>")
          .setURL(giveaway.messageURL)
          .setStyle(ButtonStyle.Link)
      );

      return interaction.editReply({
        content: lang.create.good,
        components: [viewButton],
      });
    } catch (err) {
      client.log("Giveaway Start Error:", "error");
      console.error(err);
      return interaction.editReply({
        content: "An error occurred while creating the giveaway.",
      });
    }
  },
};
