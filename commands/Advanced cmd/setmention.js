exports.run = async (client, message, args, guildData, lang) => {
	if (!message.member.hasPermission("MANAGE_CHANNELS"))
		return message.channel.send(lang.lang.perms);

	const status = args[0];
	if (status !== "on" && status !== "off") {
		return message.channel.send(lang.set.args);

	}
	if (status === "on") {

		if (!args[0]) {
			return message.channel.send(lang.set.args);
		}
		guildData.plugins.mention = {
			enabled: true
		};
		guildData.markModified("plugins.mention");
		guildData.save();

		message.channel.send(lang.set.mon);
	}
	if (status === "off") {

		guildData.plugins.mention = {
			enabled: false
		};
		guildData.markModified("plugins.mention");
		guildData.save();

		message.channel.send(lang.set.moff);

	}
};