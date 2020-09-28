exports.run = async (client, message, args, lang) => message.channel.send(lang.info.ping + `${Date.now() - message.createdTimestamp}`);
