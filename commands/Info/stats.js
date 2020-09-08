exports.run = async (client, message) => {
    const Discord = require("discord.js")
    const db = require("quick.db")
    const moment = require('moment')
    require('moment-duration-format')
    const config = require("../config.js")
    let language = db.fetch(`language_${message.guild.id}`)
    if (language === null) language = config.basiclang
    const lang = require(`../../language/${language}.js`)
    let version = require("../package.json").version;
    let discord_giveaways = require("../package.json").dependencies["discord-giveaways"];
    let supportURL = config.auth.support;
    let web = "http://managegift.ga";
    let donate = "https://paypal.me/Hadikob";
    let invite = "https://discordapp.com/oauth2/authorize?client_id=598564396691750933&scope=bot&permissions=8";
    const duration = moment.duration(client.uptime).format(" D [**days**], H [**hours**], m [**minutes**], s [**seconds**]");
    let embed = new Discord.MessageEmbed()
        .setTitle(lang.stats.title)
        .setAuthor(`ManageGift's | Version ${version}`)
        .setThumbnail("https://g.top4top.io/s_1695qf6p11.gif")
        .setDescription(lang.stats.info)
        .addField(lang.stats.stats, lang.stats.stat + message.client.guilds.cache.size + `\n` + lang.stats.set + message.client.users.cache.size)
        .addField(lang.stats.ver, `\`Discord.js :\` v${Discord.version}\n\`Nodejs :\` v${process.versions.node}\n\`Discord-giveaways :\` v${discord_giveaways}\n\`ManageGift's :\` v${version}`)
        .addField(lang.stats.ram, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``)
        .addField(lang.stats.on, lang.stats.for + `${duration}`)
        .addField(lang.stats.moreinfo, lang.stats.comd + message.client.commands.size + `\n` + lang.stats.giv + client.giveawaysManager.giveaways.length)
        .addField(lang.help.link, `[Support server](${supportURL}) ● [Donate](${donate}) ● [Website](${web}) ● [Invite](${invite})`)
        .setColor(config.embeds.color)
        .setFooter(config.embeds.footers)
    message.channel.send(embed);
}