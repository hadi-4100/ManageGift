exports.run = async (client, message, args, guildData, lang) => {
	if (guildData.plugins.role.enabled) {
		// If the member doesn't have enough permissions
		if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.get(guildData.plugins.role.role))
			return message.channel.send(lang.create.perms).then(message => {
				message.delete({ timeout: 10000 });
			});
	}

	// If no message ID or giveaway name is specified
	if (!args[0]) return message.channel.send(lang.reroll.msg);

	// try to found the giveaway with prize then with ID
	const giveaway =
		// Search with giveaway prize
		client.manager.giveaways.find((g) => g.prize === args.join(" ")) ||
		// Search with giveaway ID
		client.manager.giveaways.find((g) => g.messageID === args[0]);

	// If no giveaway was found
	if (!giveaway) {
		message.channel.send(lang.reroll.err + "** **" + "`" + args.join(" ") + "`" + ".");
	}

	// Reroll the giveaway
	client.manager.reroll(giveaway.messageID, {
		messages: {
			congrat: lang.reroll.good,
			error: lang.reroll.parts
		}
	})
		.catch((e) => {
			if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
				message.channel.send(lang.reroll.err);
			} else {
				console.error(e);
				message.channel.send(lang.reroll.parts);
			}
		});

};