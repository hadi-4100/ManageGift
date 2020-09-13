exports.run = async (client, message, args) => {
    const Discord = require("discord.js")
    const db = require("quick.db")
    const config = require("../../config.js")
    let language = db.fetch(`language_${message.guild.id}`)
    if (language === null) language = config.basiclang
    const lang = require(`../../language/${language}.js`)

    let websiteURL = `http://managegift.ga`;
    let inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${config.idbot}&scope=bot&permissions=8`;
    let voteURL = `https://discordbots.org/bot/${config.idbot}/vote`;
    let supportURL = config.auth.support

    if (args[0] === "copy") {
        return message.channel.send(inviteLink);
    }

    let embed = new Discord.MessageEmbed()
        .setAuthor(lang.invite.main)
        .setDescription(lang.invite.disc)
        .addField(lang.invite.web, (`[Click Here](${websiteURL})`))
        .addField(lang.invite.inv, (`[Click Here](${inviteLink})`))
        .addField(lang.invite.vote, (`[Click Here](${voteURL})`))
        .addField(lang.invite.sup, (`[Click Here](${supportURL})`))
        .setColor(config.embeds.color)
        .setFooter(config.embeds.footers);

    message.channel.send(embed);

}