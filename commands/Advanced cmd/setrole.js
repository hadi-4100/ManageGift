exports.run = async (client, message, args, guildData, lang) => {
	if (!message.member.hasPermission("MANAGE_CHANNELS"))
		return message.channel.send(lang.lang.perms);

	const status = args[0];
	if (status !== "on" && status !== "off") {
		return message.channel.send(lang.set.rlargs);
	}

	if (status === "on") {

		if (!args[1]) {
			return message.channel.send(lang.set.rlargs);
		}
		let role = message.mentions.roles.first();
		if (!role) {
			role = message.guild.roles.cache.find((r) => r.name === args.slice(1).join("  "));
			if (!role) {
				return message.channel.send(lang.set.rlerr);
			}
		}

		guildData.plugins.role = {
			enabled: true,
			role: role.id
		};
		guildData.markModified("plugins.role");
		guildData.save();

		message.channel.send(lang.set.ron);
	}
		
	if (status === "off") {

		guildData.plugins.role = {
			enabled: false,
			role: null
		};
		guildData.markModified("plugins.autorole");
		guildData.save();

		message.channel.send(lang.set.roff);

	}
};