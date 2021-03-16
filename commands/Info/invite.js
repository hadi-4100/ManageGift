const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, guildData, lang) => {
	const websiteURL = "http://managegift.ga";
	const inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`;
	const voteURL = `https://discordbots.org/bot/${client.user.id}/vote`;
	const supportURL = client.config.auth.support;
	if (args[0] == "copy")return message.channel.send(inviteLink);

	message.channel.send(new MessageEmbed()
		.setAuthor(lang.invite.main)
		.setDescription(lang.invite.disc)
		.addField(lang.invite.web, (`[Click Here](${websiteURL})`))
		.addField(lang.invite.inv, (`[Click Here](${inviteLink})`))
		.addField(lang.invite.vote, (`[Click Here](${voteURL})`))
		.addField(lang.invite.sup, (`[Click Here](${supportURL})`))
		.setColor(client.config.embeds.color)
		.setFooter(client.config.embeds.footers));

};
