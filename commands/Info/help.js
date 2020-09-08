exports.run = async (client, message) => {
    const Discord = require("discord.js")
    const db = require("quick.db")
    const config = require("../../config.js")
    let language = db.fetch(`language_${message.guild.id}`)
    if (language === null) language = config.basiclang
    const lang = require(`../../language/${language}.js`)
    let version = require("../../package.json").version;
    let discord_giveaways = require("../../package.json").dependencies["discord-giveaways"];
    let supportURL = config.auth.support;
    let web = "http://managegift.ga";
    let donate = "https://paypal.me/Hadikob";
    let invite = "https://discordapp.com/oauth2/authorize?client_id=598564396691750933&scope=bot&permissions=8";
    let embed = new Discord.MessageEmbed()
        .setTitle(lang.help.title)
        .setAuthor(`ManageGift's | Version ${version}`)
        .setThumbnail('https://i.top4top.io/p_1603lgj9t1.gif')
        .setDescription(lang.help.disc)
        .addField(lang.help.cm, lang.help.cmd)
        .addField(lang.help.cmm, lang.help.cmdd)
        .addField(lang.help.link, `[Support server](${supportURL}) ● [Donate](${donate}) ● [Website](${web}) ● [Invite](${invite})`)
        .setColor(config.embeds.color)
        .setFooter(config.embeds.footers)

    message.channel.send(embed)
}