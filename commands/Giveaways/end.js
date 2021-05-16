exports.run = async (client, message, args, guildData, lang) => {

	// If the member doesn't have enough permissions
	if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.get(guildData.plugins.role.role))
		return message.channel.send(lang.create.perms).then(message => {
			message.delete({ timeout: 10000 });
		});

	// If no message ID or giveaway name is specified
	if (!args[0]) return message.channel.send(lang.end.msg);

	if (message.member.guild.id != client.manager.giveaways.find((g) => g.messageID === args[0]).guildID) return message.channel.send(lang.delete.otherServer);
	if ("<@" + message.member.id + ">" != client.manager.giveaways.find((g) => g.messageID === args[0]).hostedBy) return message.channel.send(lang.delete.otherUser);

	// try to found the giveaway with prize then with ID
	const giveaway = client.manager.giveaways.find((g) => g.prize === args.join(" ")) || client.manager.giveaways.find((g) => g.messageID === args[0]);

	// If no giveaway was found
	if (!giveaway) return message.channel.send(lang.end.err + "** **" + "`" + args.join(" ") + "`" + ".");


	// Edit the giveaway
	client.manager.edit(giveaway.messageID, {
		setEndTimestamp: Date.now()
	})
		// Success message
		.then(() => {
			// Success message
			message.channel.send(lang.end.good + "** **" + "`" + (client.manager.options.updateCountdownEvery / 1000) + "`" + "** **" + lang.units.seconds + ".");
		}).catch((e) => {
			if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
				message.channel.send(lang.end.err + "** **" + "`" + giveaway.messageID + "`" + ".");
			} else {
				console.error(e);
				message.channel.send(lang.end.errmod);
			}
		});
};
