const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild) => {
	const text = `ManageGift is \`leave\`: **${guild.name}** :person_running:\n Server \`id\`: **${guild.id}** :key:\n Owner \`id\`: **${guild.ownerID}** :man_pouting:`;
	const logsEmbed = new MessageEmbed()
		.setAuthor(guild.name, guild.iconURL({ dynamic: true }))
		.setColor("#B22222")
		.setDescription(text);
	client.channels.cache.get(client.config.auth.logs).send(logsEmbed);
};