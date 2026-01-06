const config = require("../../config.js");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "stats",
  description: "Display bot statistics",
  group: __dirname,
  run: async (client, interaction, guildData, lang) => {
    await interaction.deferReply();

    const activeGiveaways = client.manager.giveaways.filter(
      (g) => !g.ended && !g.pauseOptions.isPaused
    );
    const totalGiveaways = client.manager.giveaways.length;
    const activeGiveawaysCount = activeGiveaways.length;

    const version = require("../../package.json").version;
    const uptimeDuration = moment
      .duration(client.uptime)
      .format(" D [days], H [hours], m [minutes], s [seconds]");

    const links = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Support Server")
        .setEmoji("<:25:659434281164210216>")
        .setURL(config.links.supportserver)
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setLabel("Website")
        .setEmoji("<:7_:659426399391580221>")
        .setURL(config.links.web)
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setLabel("Invite")
        .setEmoji("<:9_:659427030626205696>")
        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
        )
        .setStyle(ButtonStyle.Link)
    );

    const statsEmbed = new EmbedBuilder()
      .setTitle(lang.stats.title)
      .setAuthor({ name: `ManageGift's | Version ${version}` })
      .setThumbnail("https://g.top4top.io/s_1695qf6p11.gif")
      .addFields(
        {
          name: lang.stats.creator,
          value: `[hadi_4100](https://discord.com/users/${config.owners})`,
        },
        {
          name: lang.stats.ver,
          value: `**Version:** \`${version}\`\n[Github](https://github.com/Hadi-koubeissi/ManageGift/) - [Website](${config.links.web})`,
        },
        {
          name: lang.stats.stats,
          value:
            `${lang.stats.stat} ${client.guilds.cache.size}\n` +
            `${lang.stats.set} ${client.guilds.cache.reduce(
              (acc, g) => acc + (g.memberCount || 0),
              0
            )}`,
        },
        {
          name: lang.stats.ram,
          value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )} MB\``,
        },
        {
          name: lang.stats.on,
          value:
            `${lang.stats.startat} ${client.startAt || "N/A"}\n` +
            `${lang.stats.for} ${uptimeDuration}`,
        },
        {
          name: lang.stats.moreinfo,
          value:
            `${lang.stats.comd} ${client.interactions.size}\n` +
            `${lang.stats.giv} ${totalGiveaways}\n` +
            `${lang.stats.acgiv} ${activeGiveawaysCount}`,
        }
      )
      .setImage("https://b.top4top.io/p_2534jc6x11.png")
      .setColor(client.config.embeds.color)
      .setFooter({ text: client.config.embeds.footers });

    return interaction.editReply({ embeds: [statsEmbed], components: [links] });
  },
};
