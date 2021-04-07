exports.run = async (client, message, args, guildData, lang) => {
	if (guildData.plugins.role.enabled) {
		// If the member doesn't have enough permissions
		if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.get(guildData.plugins.role.role))
			return message.channel.send(lang.create.perms).then(message => {
				message.delete({ timeout: 10000 });
			});
	}

	const id = args[0];
	if (!id) return message.channel.send(lang.edit.msg);

	if(message.member.guild.id != client.manager.giveaways.find((g) => g.messageID === args[0]).guildID) return message.channel.send(lang.delete.otherServer);
	if("<@" + message.member.id + ">" != client.manager.giveaways.find((g) => g.messageID === args[0]).hostedBy) return message.channel.send(lang.delete.otherUser);
   
	const hasGiveaway = client.manager.giveaways.find((g) => g.messageID === id);
	if (!hasGiveaway)return message.channel(lang.edit.err);
	client.manager.delete(hasGiveaway.messageID);
	message.channel.send(lang.delete.done).then((msg) => {
		msg.delete({ timeout: 10000 });
	}).then(() => {
		if (message.deletable) message.delete({ timeout: 10000 });
		return;
	}).catch(() => {
		message.channel.send(lang.edit.errmod);
	});
};
