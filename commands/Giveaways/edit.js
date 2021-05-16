exports.run = async (client, message, args, guildData, lang) => {

	// If the member doesn't have enough permissions
	if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.get(guildData.plugins.role.role))
		return message.channel.send(lang.create.perms).then(message => {
			message.delete({ timeout: 10000 });
		});

	if (!args[0]) {
		return message.channel.send(lang.edit.msg).then(message => {
			message.delete({ timeout: 10000 });
		});
	}

	if (message.member.guild.id != client.manager.giveaways.find((g) => g.messageID === args[0]).guildID) return message.channel.send(lang.delete.otherServer);
	if ("<@" + message.member.id + ">" != client.manager.giveaways.find((g) => g.messageID === args[0]).hostedBy) return message.channel.send(lang.delete.otherUser);

	// If no field to edit is specifed
	if (!args[1]) {
		return message.channel.send(lang.edit.wipr);
	}

	if (args[1] === "prize") {
		const newPrize = args.slice(2).join(" ");

		if (!newPrize) return message.channel.send(lang.edit.prize);

		client.manager.edit(args[0], {
			newPrize: newPrize,
		}).then(() => {
			// here, we can calculate the time after which we are sure that the lib will update the giveaway
			const numberOfSecondsMax = client.manager.options.updateCountdownEvery / 1000;
			message.channel.send(lang.edit.timepr(numberOfSecondsMax));
		}).catch(() => {
			message.channel.send(lang.edit.errmod);
		});
	} else
		if (args[1] === "winners") {
			const newWinners = args[2];
			if (isNaN(newWinners) || (parseInt(newWinners) <= 0)) {
				return message.channel.send(lang.edit.argswinners);
			}

			client.manager.edit(args[0], {
				newWinnerCount: parseInt(newWinners),
			}).then(() => {
				// here, we can calculate the time after which we are sure that the lib will update the giveaway
				const numberOfSecondsMax = client.manager.options.updateCountdownEvery / 1000;
				message.channel.send(lang.edit.timwi(numberOfSecondsMax));
			}).catch(() => {
				message.channel.send(lang.edit.errmod);
			});
		} else {
			return message.channel.send(lang.edit.wipr);
		}
};
