exports.run = async (client, message, args, guildData, lang) => {
	if (!message.member.hasPermission("MANAGE_CHANNELS"))
		return message.channel.send(lang.lang.perms);

	const prefix = args[0];
	if (!prefix) return message.channel.send(lang.prefixerror);
	if(prefix.length > 5){
		return message.channel.send(lang.prefixerrcarc);
	}
	guildData.prefix = prefix;
	await guildData.save();
	message.channel.send(lang.setprefix + `\`${guildData.prefix}\``);
};
