exports.run = async (client, message, args, guildData, lang) => 
	message.channel.send(lang.info.ping + `${Date.now() - message.createdTimestamp}`);
