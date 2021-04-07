/* eslint-disable no-unused-vars */
const blacklistUser = require("../../Base/User"),
	blacklistGuild = require("../../Base/Guild");

exports.run = async (client, message, args, guildData, lang) => {
	if (message.author.id !== client.config.owner.id) return message.channel.send("❌ | this command only for Owner the bot");
	const type = args[0];
	if (type !== "user" && type !== "guild") {
		return message.channel.send("**Choose between user & guild**");
	}
	if (type === "user") {
		const User = message.guild.members.cache.get(args[1]);
		if (!User) return message.channel.send("User is not valid.");

		blacklistUser.findOne({ id: User.user.id }, async (err, userData) => {
			if (err) throw err;
			if (userData) {
				message.channel.send(`**${User.displayName}** has already been blacklisted!`);
			} else {
				userData = new blacklistUser({ id: User.user.id });
				userData.save()
					.catch(err => console.log(err));
				message.channel.send(`**${User.user.tag}** has been added to blacklist.`);
			}
		});
	}
	if (type === "guild") {
		const Guild = message.client.guilds.cache.get(args[1]);
		if (!Guild) return message.channel.send("**Guild is not vaild.**");
		blacklistGuild.findOne({ id: Guild.id }, async (err, guildData) => {
			if (err) throw err;
			if (guildData) {
				message.channel.send(`**${Guild.name}** hase already been blacklisted!.`);
			} else {
				guildData = new blacklistGuild({ id: Guild.id });
				guildData.save()
					.catch(err => console.log(err));
				message.channel.send(`**${Guild.name}** has been added to blacklist.`);
			}
		});
		Guild.leave();
		Guild.owner.send(`**:no_pedestrians: | Your server has blacklisted now!. \n You can now longer use the bot on this server \`${Guild.name}\` because you violated the bot laws, and this is the last decision, unfortunately.**`);
	}
};