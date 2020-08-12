exports.run = async (client, message) => {
    const Discord = require("discord.js")
    const db = require("quick.db")
    const config = require("../config.js")
    let language = db.fetch(`language_${message.guild.id}`)
    if(language === null) language = config.basiclang
    const lang = require(`../language/${language}.js`)
    let version = require("../package.json").version;
    let discord_giveaways = require("../package.json").dependencies["discord-giveaways"];
    let supportURL = config.auth.support;
    let web = "http://managegift.ga";
    let donate = "https://paypal.me/Hadikob";
    let embed = new Discord.MessageEmbed()
        .setTitle(lang.help.title)
        .setAuthor(`ManageGift's | Version ${version}`)
        .setThumbnail('https://i.top4top.io/p_1603lgj9t1.gif')
        .setDescription(lang.help.disc)
        .addField(lang.help.cm, lang.help.cmd)
        .addField(lang.help.cmm, lang.help.cmdd)
        .addField(lang.help.stats, lang.help.stat + message.client.guilds.cache.size + `\n` + lang.help.set + message.client.users.cache.size)
        .addField(lang.help.ver, `\`Discord.js : v${Discord.version}\`\n\`Nodejs : v${process.versions.node}\`\n\`Discord-giveaways :v${discord_giveaways}\`\n\`ManageGift's : v${version}\``)
        .addField(lang.help.moreinfo, lang.help.comd + message.client.commands.size + `\n` + lang.help.giv + client.giveawaysManager.giveaways.length)
        .addField(lang.help.link, (`[Support server](${supportURL})` + `\n` + `[Donate](${donate})` + `\n` + `[Website](${web})`))
        .setColor(config.embeds.color)
        .setFooter(config.embeds.footers)

    message.channel.send(embed)   
}