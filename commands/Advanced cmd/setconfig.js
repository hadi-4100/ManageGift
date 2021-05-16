exports.run = async (client, message, args, guildData, lang) => {
	if (!message.member.hasPermission("MANAGE_CHANNELS"))
		return message.channel.send(lang.lang.perms);
		
	const status = args[0];
	if (status !== "on" && status !== "off") {
		return message.channel.send(lang.set.rlargs);
	}

	if(status === "on") {

		if(!args[1] === "role") {
			return message.channel.send("please type on/off and role");
		}
		let role = message.mentions.roles.first();
		if (!role) {
			role = message.guild.roles.cache.find((r) => r.name === args.slice(1).join("  "));
			if (!role) {
				return message.channel.send(lang.set.rlerr);
			}
		}
		guildData.giveawayconfigs.role = {
			enabled: true,
			role: role.id
		};
		guildData.markModified("giveawayconfigs.role");
		guildData.save();

		message.channel.send("now only member have this role can join giveaway");
	}
	if(status === "off") {

		guildData.giveawayconfigs.role = {
			enabled: false,
			role: null
		};
		guildData.markModified("giveawayconfigs.role");
		guildData.save();

		message.channel.send("the config role off");
	}
};