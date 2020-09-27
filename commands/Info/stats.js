const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const moment = require('moment')
require('moment-duration-format')

exports.run = async (client, message, args, lang) => {
    let version = require("../../package.json").version;
    let discord_giveaways = require("../../package.json").dependencies["discord-giveaways"];
    let supportURL = client.config.auth.support;
    let web = "http://managegift.ga";
    let donate = "https://paypal.me/Hadikob";
    let invite = "https://discordapp.com/oauth2/authorize?client_id=598564396691750933&scope=bot&permissions=8";
    const duration = moment.duration(client.uptime).format(" D [**days**], H [**hours**], m [**minutes**], s [**seconds**]");
    message.channel.send(new MessageEmbed()
        .setTitle(lang.stats.title)
        .setAuthor(`ManageGift's | Version ${version}`)
        .setThumbnail("https://g.top4top.io/s_1695qf6p11.gif")
        .setDescription(lang.stats.info)
        .addField(lang.stats.stats, lang.stats.stat + message.client.guilds.cache.size + `\n` + lang.stats.set + message.client.users.cache.size + `\n` + lang.stats.ch + message.client.channels.cache.size)
        .addField(lang.stats.ver, `\`Discord.js :\` v${Discord.version}\n\`Nodejs :\` v${process.versions.node}\n\`Discord-giveaways :\` v${discord_giveaways}\n\`ManageGift's :\` v${version}`)
        .addField(lang.stats.ram, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``)
        .addField(lang.stats.on, lang.stats.for + `${duration}`)
        .addField(lang.stats.moreinfo, lang.stats.comd + message.client.commands.size + `\n` + lang.stats.giv + client.giveawaysManager.giveaways.length)
        .addField(lang.help.link, `[Support server](${supportURL}) ● [Donate](${donate}) ● [Website](${web}) ● [Invite](${invite})`)
        .setColor(client.config.embeds.color)
        .setFooter(client.config.embeds.footers));
}
