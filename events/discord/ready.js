const Discord = require("discord.js"),
	register = require('../../utils/slashsync');
module.exports = async (client) => {

	// Register slash command
	await register(client, client.register_arr.map((command) => ({
		name: command.name,
		description: command.description,
		options: command.options,
		type: Discord.ApplicationCommandType.ChatInput
	})), {
		debug: false
	});

	// get date and time when running
	const currentdate = new Date(),
		startdate = currentdate.getDate() + "/"
			+ (currentdate.getMonth() + 1) + "/"
			+ currentdate.getFullYear() + ","
			+ " ";
	let hours = currentdate.getHours(),
		minutes = currentdate.getMinutes(),
		ampm = hours >= 12 ? 'pm' : 'am';

	hours %= 12;
	hours = hours || 12;
	minutes = minutes < 10 ? `0${minutes}` : minutes;

	// export date and time
	global["startat"] = startdate + `${hours}:${minutes} ${ampm}`;

	// start log
	client.log(`${client.user.tag}, ready to serve ${client.guilds.cache.reduce((uss, g) => uss + g.memberCount, 0)} users in ${client.guilds.cache.size} servers.`, "ready");

	// Variables for Bot status 
	const status = require("../../config.js").status,
		version = require("../../package.json").version;

	let i = 0;
	setInterval(function () {
		// For Active Giveaways
		const ac_giveaways = client.manager.giveaways.filter((g) => g.ended !== true && g.pauseOptions.isPaused !== true);
		ac_giveawayss = ac_giveaways.length;

		const toDisplay = status[parseInt(i, 10)].name.replace("{guild}", client.guilds.cache.size).replace("{version}", version).replace("{total_giveaways}", client.manager.giveaways.length).replace("{ac_giveaways}", ac_giveawayss);
		client.user.setPresence({
			activities: [{
				name: toDisplay,
				type: status[parseInt(i, 10)].type
			}]
		});
		if (status[parseInt(i + 1, 10)]) i++;
		else i = 0;
	}, 20000);//20 seconde
};