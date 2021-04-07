/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js"),
	blacklistGuild = require("../Base/Guild");

module.exports = async (client, guild) => {
	// fetch guild
	guild = await guild.fetch();

	blacklistGuild.findOne({ id: guild.id }, async (err, Guild) => {
		if (Guild) {
			guild.leave();
			guild.owner.send(`**:no_pedestrians: | Your server has blacklisted now!. \n You can now longer use the bot on this server \`${guild.name}\` because you violated the bot laws, and this is the last decision, unfortunately.**`);
		} else {
			const text = `ManageGift is \`joind in\`: **${guild.name}** :person_walking:\n Server \`id\`: **${guild.id}** :key:\n Owner server \`id\`: **${guild.ownerID}** :man_pouting:`;
			const logsEmbed = new MessageEmbed()
				.setAuthor(guild.name, guild.iconURL({ dynamic: true }))
				.setColor("#32CD32")
				.setDescription(text);
			client.channels.cache.get(client.config.auth.logs).send(logsEmbed);
		}
	});
};