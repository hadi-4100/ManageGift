const { EmbedBuilder } = require("discord.js");

module.exports = async (giveaway, member, reaction) => {

	let approved = new EmbedBuilder()
		.setTitle(giveaway.messages.approved1)
		.setDescription(giveaway.messages.approved2.replace(`{messageURL}`, giveaway.messageURL))
		.setThumbnail("https://probot.media/Vi7an1G8jW.png")
		.setImage("https://b.top4top.io/p_2533c3xjg1.png")
		.setFooter({ text: `ManageGift` })
		.setColor("#5C63E5")
		.setTimestamp()

	let denied = new EmbedBuilder()
		.setTitle(giveaway.messages.denied1)
		.setDescription(giveaway.messages.denied2.replace(`{messageURL}`, giveaway.messageURL))
		.setThumbnail("https://probot.media/Vi7an1G8jW.png")
		.setImage("https://b.top4top.io/p_2533c3xjg1.png")
		.setFooter({ text: `ManageGift` })
		.setColor("#212CC8")
		.setTimestamp()

	let rolereq = giveaway.extraData.required_role,
		servereq = giveaway.extraData.required_server;

	let client = reaction.message.client,
		guild = reaction.message.guild;

	let senderror = false,
		sendacc = false;

	if (member.user.bot) return;

	if (giveaway.extraData) {

		if (giveaway.extraData.required_role) {
			var rolee = guild.roles.cache.find(role => role.id === rolereq);
			if (rolee) {
				if (guild.members.cache.get(member.id).roles.cache.find(role => role.id === rolee.id)) {
					sendacc = true;
				} else {
					try {
						await reaction.users.remove(member.user);
					} catch (e) {
						console.error(e);
					}
					senderror = true;
				}
			}
		}

		if (giveaway.extraData.required_server) {
			var server = client.guilds.cache.get(servereq),
				user = await server.members.fetch(member.id).catch((err) => { /* NOT IN THE SERVER */ });
			if (!user) {
				try {
					await reaction.users.remove(member.user);
				} catch (e) {
					console.error(e);
				}
				senderror = true;
			} else
				sendacc = true;
		}

		if (senderror === true) {
			member.send({ embeds: [denied] }).catch((err) => { /* OPEN YOUR DM DUMP */ })
			console.log(`${member.user.username} entered giveaway #${giveaway.messageId} but he did not approved`)
		} else
			if (sendacc === true) {
				member.send({ embeds: [approved] }).catch((err) => { /* OPEN YOUR DM DUMP */ })
				console.log(`${member.user.username} entered giveaway #${giveaway.messageId}`)
			} else
				if (sendacc === true && senderror === false || sendacc === false && senderror === true) {
					member.send({ embeds: [denied] }).catch((err) => { /* OPEN YOUR DM DUMP */ })
					console.log(`${member.user.username} entered giveaway #${giveaway.messageId} but he did not approved`)
				}
	}
};