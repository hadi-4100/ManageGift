const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args, guildData, lang) => {
	const version = require("../../package.json").version;
	const discord_giveaways = require("../../package.json").dependencies["discord-giveaways"];
	const supportURL = client.config.auth.support;
	const web = "http://managegift.ga";
	const invite = "https://discordapp.com/oauth2/authorize?client_id=598564396691750933&scope=bot&permissions=8";
	const duration = moment.duration(client.uptime).format(" D [**days**], H [**hours**], m [**minutes**], s [**seconds**]");
	message.channel.send(new MessageEmbed()
		.setTitle(lang.stats.title)
		.setAuthor(`ManageGift's | Version ${version}`)
		.setThumbnail("https://g.top4top.io/s_1695qf6p11.gif")
		.setDescription(lang.stats.info)
		.addField(lang.stats.stats, lang.stats.stat + message.client.guilds.cache.size + "\n" + lang.stats.set + message.client.users.cache.size + "\n" + lang.stats.ch + message.client.channels.cache.size)
		.addField(lang.stats.ver, `\`Discord.js :\` v${Discord.version}\n\`Nodejs :\` v${process.versions.node}\n\`Discord-giveaways :\` v${discord_giveaways}\n\`ManageGift's :\` v${version}`)
		.addField(lang.stats.ram, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``)
		.addField(lang.stats.on, lang.stats.for + `${duration}`)
		.addField(lang.stats.moreinfo, lang.stats.comd + message.client.commands.size + "\n" + lang.stats.giv + client.manager.giveaways.length)
		.addField(lang.help.link, `[Support server](${supportURL}) ● [Website](${web}) ● [Invite](${invite})`)
		.setColor(client.config.embeds.color)
		.setFooter(client.config.embeds.footers));
};
