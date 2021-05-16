module.exports = async (giveaway, member, reaction) => {
	
	if (giveaway.extraData.ConfigRole) {

		const ConfigRole = giveaway.extraData.ConfigRole,
			role = reaction.message.guild.roles.cache.find(r => r.id === ConfigRole);

		if (!member.roles.cache.get(ConfigRole)) {
			reaction.users.remove(member.user);
			member.send(`you need to have a ${role.name}`);
		}
	} 

	console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);

};