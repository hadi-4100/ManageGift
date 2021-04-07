/* eslint-disable no-unused-vars */
const blacklistUser = require("../../Base/User"),
	blacklistGuild = require("../../Base/Guild");

exports.run = async (client, message, args, guildData, lang) => {
	if (message.author.id !== client.config.owner.id) return message.channel.send("❌ | this command only for Owner the bot");
	
	const User = message.guild.members.cache.get(args[0]);
	if (!User) return message.channel.send("User is not valid.");

	blacklistUser.findOne({ id: User.user.id }, async (err, userData) => {
		if (err) throw err;
		if (userData) {
			await blacklistUser.findOneAndDelete({ id : User.user.id })
				.catch(err => console.log(err));
			message.channel.send(`**${User.displayName}** has been removed from blacklist.`);
		} else {
			message.channel.send(`**${User.user.tag}** is not blacklisted.`);
		}
	});
};