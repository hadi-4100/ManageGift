module.exports = async (client) => {
	client.logger.ready(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);
	// Bot status 
	const status = require("../config.js").status,
		version = require("../package.json").version;
	let i = 0;
	setInterval(function () {
		const toDisplay = status[parseInt(i, 10)].name.replace("{server}", client.guilds.cache.size) + " | v" + version;
		client.user.setActivity(toDisplay, { type: status[parseInt(i, 10)].type });
		if (status[parseInt(i + 1, 10)]) i++;
		else i = 0;
	}, 20000);//20 seconde
};