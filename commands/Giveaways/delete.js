const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, PermissionsBitField } = require("discord.js"),
	moment = require("moment");

module.exports = {
	name: 'delete',
	description: 'delete a giveaway',
	group: __dirname,
	owner: false,
	premium: false,
	run: async (client, interaction, guildData, lang) => {

		// If the member doesn't have enough permissions
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && (guildData.plugins.role.enabled && !interaction.member.roles.cache.get(guildData.plugins.role.role))) {
			return interaction.reply({ content: lang.create.perms, ephemeral: true });
		}

		let options = [];
		let allgiveaways;
		allgiveaways = client.manager.giveaways.filter((g) => g.guildId === interaction.guild.id && g.pauseOptions.isPaused !== true);
		allgiveaways.reverse()
		allgiveaways = allgiveaways.slice(0, 24)

		for (let i = 0; i < allgiveaways.length; i++) {
			let value = allgiveaways[i];
			options.push({
				label: lang.delete.option1(value),
				description: lang.delete.option2(value),
				value: `${value.messageId}`,
				emoji: `<:botlogo:1024760383677927484>`
			})
		}

		options.push({
			label: lang.cancel.option1,
			description: lang.cancel.option2,
			value: `cancel`,
			emoji: `<:backk:1021855656879341659>`
		})

		const deletegiveaway = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId("delete-giveaway")
					.setPlaceholder(lang.selectmenu.choose)
					.addOptions(options),
			)

		await interaction.reply({ content: lang.delete.fordelete, components: [deletegiveaway], ephemeral: true })

		const filter = (i) => interaction.user.id === i.user.id

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

		collector.on('collect', (interaction) => {
			if (interaction.values[0] === "cancel") {
				interaction.update({ content: lang.cancel.cancelled, components: [] })
			} else {
				// check if user his the host of giveaway
				if ("<@" + interaction.user.id + ">" != client.manager.giveaways.find((g) => g.messageId === interaction.values[0]).hostedBy) {
					return interaction.reply(lang.otherUser);
				}

				const giveawayid = interaction.values[0];

				client.manager.delete(interaction.values[0]).then(() => {
					interaction.reply(lang.delete.done(giveawayid));
				})
					.catch((err) => {
						interaction.reply(lang.delete.errmod);
					});
			}
		})

		collector.on('end', (collected, reason) => {
			if (reason == "time") {
				interaction.editReply({
					content: lang.collector.time,
					components: [],
				});
			}
		});
	}
};