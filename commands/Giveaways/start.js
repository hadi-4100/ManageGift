/* eslint-disable no-redeclare */
const ms = require("ms");
exports.run = async (client, message, args, guildData, lang) => {
	if (guildData.plugins.role.enabled) {
		// If the member doesn't have enough permissions
		if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.get(guildData.plugins.role.role))
			return message.channel.send(lang.create.perms).then(message => {
				message.delete({ timeout: 10000 });
			});
	}

	// Giveaway duration
	const giveawayDuration = args[0];
	// If the duration isn't valid
	if (!giveawayDuration || isNaN(ms(giveawayDuration)) || ms(giveawayDuration) < ms("1m")) {
		return message.channel.send(lang.start.duration)
			.then(msg => {
				msg.delete({ timeout: 10000 });
				message.delete({ timeout: 10000 });
			});
	}
	
	// Number of winners
	const giveawayNumberWinners = args[1];
	// If the specified number of winners is not a number
	if (isNaN(giveawayNumberWinners)) {
		return message.channel.send(lang.start.argswinners)
			.then(msg => {
				msg.delete({ timeout: 10000 });
				message.delete({ timeout: 10000 });
			});
	}

	// Giveaway prize
	const giveawayPrize = args.slice(2).join(" ");
	// If no prize is specified
	if (!giveawayPrize) {
		return message.channel.send(lang.start.prize)
			.then(msg => {
				msg.delete({ timeout: 10000 });
				message.delete({ timeout: 10000 });
			});
	}

	if (guildData.plugins.mention.enabled) {
		var text1 = "@everyone\n\n" + lang.create.giveaway;
		var text2 = "@everyone\n\n" + lang.create.giveawayEnded;
	} else {
		(!guildData.plugins.mention.enabled);
		var text1 = lang.create.giveaway;
		var text2 = lang.create.giveawayEnded;
	}

	const MessageChannel = message.channel;

	// Start the giveaway
	client.manager.start(MessageChannel, {
		// The giveaway duration
		time: ms(giveawayDuration),
		// The giveaway prize
		prize: giveawayPrize,
		// The giveaway winner count
		winnerCount: parseInt(giveawayNumberWinners),
		// Who hosts this giveaway
		hostedBy: client.config.giveaway.hostedBy ? message.author : null,
		exemptMembers: (member) => !member.roles.cache.some((r) => r.name === "Nitro Boost"),
		// last chance to enter giveaway
		lastChance: {
			enabled: client.config.giveaway.lastchanceenabled,
			content: lang.lastchance.content,
			threshold: 20000,
			embedColor: "#c30000"
		},
		// Messages
		messages: {
			giveaway: text1,
			giveawayEnded: text2,
			timeRemaining: lang.create.timeRemaining,
			inviteToParticipate: lang.create.inviteToParticipate(message),
			winMessage: lang.create.winMessage(message),
			embedFooter: lang.create.embedFooter,
			noWinner: lang.create.noWinner,
			hostedBy: lang.create.hostedBy,
			winners: lang.create.winners,
			endedAt: lang.create.endedAt,
			units: {
				seconds: lang.units.seconds,
				minutes: lang.units.minutes,
				hours: lang.units.hours,
				days: lang.units.days,
				pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
			}
		}
	}, message.delete({ timeout: 10000 }));
};