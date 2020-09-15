const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args, lang) => {
    let version = require("../../package.json").version;
    let discord_giveaways = require("../../package.json").dependencies["discord-giveaways"];
    let supportURL = client.config.auth.support;
    let web = "http://managegift.ga";
    let donate = "https://paypal.me/Hadikob";
    let invite = "https://discordapp.com/oauth2/authorize?client_id=598564396691750933&scope=bot&permissions=8";
    message.channel.send(new MessageEmbed()
        .setTitle(lang.help.title)
        .setAuthor(`ManageGift's | Version ${version}`)
        .setThumbnail('https://i.top4top.io/p_1603lgj9t1.gif')
        .setDescription(lang.help.disc)
        .addField(lang.help.cm, lang.help.cmd)
        .addField(lang.help.cmm, lang.help.cmdd)
        .addField(lang.help.link, `[Support server](${supportURL}) ● [Donate](${donate}) ● [Website](${web}) ● [Invite](${invite})`)
        .setColor(config.embeds.color)
        .setFooter(config.embeds.footers));
}
