const { EmbedBuilder, WebhookClient } = require("discord.js"),
	ms = require("ms"),
	{ owners, embeds, webhooklogs } = require("../../config"),
	e = require("../../emojis.json"),
	cd = new Set(),
	cdseconds = 5;

module.exports = async (client, interaction) => {

	// Check if our interaction is a slash command
	if (interaction.isCommand()) {

		// Get the command from our slash command collection
		const command = client.interactions.get(interaction.commandName);

		const guildData = await client.findOrCreateGuild({ id: interaction.guild.id });

		const userData = await client.findOrCreateUser({ id: interaction.user.id });

		const language = guildData.language,
			lang = require(`../../language/${language}`);

		// cooldown
		if (cd.has(interaction.user.id)) {
			return interaction.reply(lang.cmd.cooldown),
				setTimeout(() => interaction.deleteReply(), 6000);
		}
		cd.add(interaction.user.id);
		setTimeout(() => cd.delete(interaction.user.id), cdseconds * 1000);

		// Blacklist users && servers
		const ureason = userData.blacklisted.reason;
		const sreason = guildData.blacklisted.reason;

		if (userData.blacklisted.status === true) {
			return interaction.reply({ content: lang.blacklist.user(ureason), ephemeral: true })
		} else if (guildData.blacklisted.status === true) {
			return interaction.reply({ content: lang.blacklist.guild(sreason), ephemeral: true })
		}

		if (command.owner) {
			if (!owners.includes(interaction.user.id)) {
				return interaction.reply({ content: lang.cmd.owneronly, ephemeral: true })
			}
		}

		/* Command Log */
		const webhookClient = new WebhookClient({ url: webhooklogs.cmd });

		const owner = await interaction.guild.fetchOwner();

		const cmdlog = new EmbedBuilder()
			.addFields(
				{ name: `**${e.avatar}User Info**`, value: `> ${e.linere}Tag : \` ${interaction.user.username} \`\n> ${e.line}ID : \` ${interaction.user.id} \`` },
				{ name: `**${e.pin}Command :**`, value: `> ${e.line}Name : \` ${interaction.commandName} \`` },
				{ name: `**${e.dis}Server Info :**`, value: `> ${e.linere}Name : \` ${interaction.guild.name} \`\n> ${e.linere}ID : \` ${interaction.guild.id} \`\n> ${e.line}Owner : \` ${owner.user.username} \`, \` ${owner.user.id} \`` },
			)
			.setColor("#303135")
			.setFooter({ text: embeds.footers })
		webhookClient.send({ embeds: [cmdlog] });

		const log = new client.logs({
			commandName: interaction.commandName,
			author: { username: interaction.user.tag, id: interaction.user.id },
			guild: { name: interaction.guild.name, id: interaction.guild.id }
		});
		log.save();

		client.log(`${interaction.user.username} id:(${interaction.user.id}) Use a command ${interaction.commandName}`, "log")

		// If command does not exist return an error interaction	

		if (!interaction.isChatInputCommand()) return;

		if (!command) return void interaction.reply({
			content: `Command \`${interaction.commandName}\` not found.`,
			ephemeral: true
		});

		// Run the command
		command.run(client, interaction, guildData, lang);
	};
};