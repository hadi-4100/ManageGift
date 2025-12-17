const Discord = require("discord.js"),
  {
    PermissionsBitField,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js"),
  ms = require("ms");

module.exports = {
  name: "create",
  description: "create a giveaway",
  group: __dirname,
  owner: false,
  premium: false,

  options: [
    {
      name: "duration",
      description:
        "How long the giveaway should last for. Example values: 1m, 1h, 1d",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "winners",
      description: "How many winners the giveaway should have",
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: "prize",
      description: "What the prize of the giveaway should be",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "channel",
      description: "The channel to create the giveaway in",
      type: Discord.ApplicationCommandOptionType.Channel,
      channelTypes: ["0"],
      required: false,
    },
    {
      name: "required_role",
      description: "Users must have a specific role to participate",
      type: Discord.ApplicationCommandOptionType.Role,
      required: false,
    },
    {
      name: "require_server",
      description: "Users must be in a specific server to participate",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction, guildData, lang) => {
    // If the bot doesn't have Administrator permissions
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.resolve("Administrator")
      )
    ) {
      return interaction.reply(lang.cmd.botperm);
    }

    // If the member doesn't have enough permissions
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      ) &&
      guildData.plugins.role.enabled &&
      !interaction.member.roles.cache.get(guildData.plugins.role.role)
    ) {
      return interaction.reply({
        content: lang.create.perms,
        flags: Discord.MessageFlags.Ephemeral,
      });
    }

    const giveawayDuration = interaction.options.getString("duration");
    const giveawayNumberWinners = interaction.options.getInteger("winners");
    const giveawayPrize = interaction.options.getString("prize");
    const Channel = interaction.options.getChannel("channel");
    const rolerequired = interaction.options.getRole("required_role");
    const serverrequired = interaction.options.getString("require_server");

    if (isNaN(ms(giveawayDuration)) || ms(giveawayDuration) < ms("40s")) {
      return interaction.reply({
        content: lang.create.duration,
        flags: Discord.MessageFlags.Ephemeral,
      });
    }

    if (giveawayNumberWinners < 1) {
      return interaction.reply({
        content: lang.create.argswinners,
        flags: Discord.MessageFlags.Ephemeral,
      });
    }

    if (giveawayPrize.length > 50) {
      return interaction.reply({
        content: lang.create.prizee,
        flags: Discord.MessageFlags.Ephemeral,
      });
    }

    if (Channel) {
      var channel = Channel;
    } else {
      channel = interaction.channel;
    }

    if (rolerequired) {
      var role = rolerequired.id;
    }

    if (serverrequired) {
      if (
        !serverrequired ||
        !serverrequired.startsWith("https://discord.gg/")
      ) {
        return interaction.reply({
          content: lang.create.errorlink,
          flags: Discord.MessageFlags.Ephemeral,
        });
      }

      let serverinfo = await client.fetchInvite(serverrequired).catch((err) => {
        return interaction.reply({
          content: lang.create.errorlink,
          flags: Discord.MessageFlags.Ephemeral,
        });
      });

      var serverreq = serverinfo.guild.id,
        servername = serverinfo.guild.name;

      let managegiftinserver = client.guilds.cache.get(serverinfo.guild.id);
      if (!managegiftinserver) {
        return interaction.reply({
          content: lang.create.notinserver,
          flags: Discord.MessageFlags.Ephemeral,
        });
      }
    }

    // IF mention enabled bot mention when giveaway created
    if (guildData.plugins.mention.enabled) {
      var text1 = "@everyone\n" + lang.messages.giveaway;
      var text2 = "@everyone\n" + lang.messages.giveawayEnded;
    } else {
      var text1 = lang.messages.giveaway;
      var text2 = lang.messages.giveawayEnded;
    }

    const autotime = ms(18000000);

    // Create the giveaway
    const giveawaycreated = await client.manager.start(channel, {
      // The giveaway duration
      duration: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: giveawayNumberWinners,
      // Who hosts this giveaway
      hostedBy: interaction.user,
      // Using for store the role and send it to giveaway event
      extraData: {
        required_role: role,
        required_server: serverreq,
        dmwinners: guildData.plugins.dmwinners.enabled,
      },
      // last chance to enter giveaway
      lastChance: {
        enabled: client.config.giveaway.lastchanceenabled,
        content: lang.lastchance.content,
        threshold: 30000,
        embedColor: "#c30000",
      },
      pauseOptions: {
        isPaused: null,
        content: lang.pauseoptions.content,
        unPauseAfter: 18000000,
        embedColor: "0B0F6D",
        infiniteDurationText: lang.pauseoptions.autostart(autotime),
      },
      messages: {
        giveaway: text1,
        giveawayEnded: text2,
        content1: lang.messages.content1,
        content2: lang.messages.content2,
        content3: lang.messages.content3,
        hostedBy: lang.messages.hostedBy,
        requirements: lang.messages.req,
        rolereq: lang.messages.rolereq,
        serverreq: lang.messages.serverreq(servername, serverrequired),
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
          embed: new Discord.EmbedBuilder()
            .setDescription(lang.messages.winMessage)
            .setColor("#454DFC"),
          components: [
            new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setLabel(lang.create.view)
                .setEmoji("<:botlogo:1024760383677927484>")
                .setURL(
                  `https://canary.discord.com/channels/{this.guildId}/{this.channelId}/{this.messageId}`
                )
                .setStyle(ButtonStyle.Link)
            ),
          ],
        },
      },
    });

    const btn = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(lang.create.view)
        .setEmoji("<:botlogo:1024760383677927484>")
        .setURL(giveawaycreated.messageURL)
        .setStyle(ButtonStyle.Link)
    );

    if (giveawaycreated.messageId) {
      const giveawayId = giveawaycreated.messageId;
      giveawaycreated.messages.content3 = lang.messages.content3.replace(
        "{messageId}",
        giveawayId
      );
      await client.manager.edit(giveawayId, {
        content: giveawaycreated.messages.content3, // تحديث ايدي الجيف اوي
      });
    }

    return await interaction.reply({
      content: lang.create.good,
      components: [btn],
      flags: Discord.MessageFlags.Ephemeral,
    });
  },
};
