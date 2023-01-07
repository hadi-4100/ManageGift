const { EmbedBuilder, WebhookClient } = require("discord.js"),
	e = require("../../emojis.json"),
	{ embeds, webhooklogs } = require("../../config");

module.exports = async (client, guild) => {

	guild = await guild.fetch();

	const owner = await guild.fetchOwner()

	const webhookClient = new WebhookClient({ url: webhooklogs.join_leave })

	const joinlog = new EmbedBuilder()
		.addFields(
			{ name: `**${e.join}Alert**`, value: `> ${e.line}Type : \` Join \`` },
			{ name: `**${e.dis}Server Info :**`, value: `> ${e.linere}Name : \` ${guild.name} \`\n> ${e.linere}ID : \` ${guild.id} \`\n> ${e.line}Owner : \` ${owner.user.username} \`, \` ${owner.user.id} \`` },
		)
		.setColor("#303135")
		.setFooter({ text: embeds.footers })
	webhookClient.send({ embeds: [joinlog] });

};