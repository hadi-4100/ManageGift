const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, PermissionsBitField } = require("discord.js"),
	moment = require("moment");

module.exports = {
	name: 'reroll',
	description: 'reroll a giveaway',
	group: __dirname,
	owner: false,
	premium: false,
	run: async (client, interaction, guildData, lang) => {

		// If the member doesn't have enough permissions
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && (guildData.plugins.role.enabled && !interaction.member.roles.cache.get(guildData.plugins.role.role))) {
			return interaction.reply({ content: lang.create.perms, ephemeral: true });
		}


		let options = [];
		let endedgiveaways;
		endedgiveaways = client.manager.giveaways.filter((g) => g.guildId === interaction.guild.id && g.pauseOptions.isPaused !== true && !g.isDrop);
		endedgiveaways = endedgiveaways.filter((g) => g.ended === true)
		endedgiveaways.reverse()
		endedgiveaways = endedgiveaways.slice(0, 24)

		for (let i = 0; i < endedgiveaways.length; i++) {
			let value = endedgiveaways[i];
			options.push({
				label: lang.delete.option1(value),
				description: lang.delete.option2(value) + "\n |" + lang.reroll.startat + `${moment(value.endAt).fromNow()} `,
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

		const reroll = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId("reroll-giveaway")
					.setPlaceholder(lang.selectmenu.choose)
					.addOptions(options),
			)

		await interaction.reply({ content: lang.reroll.forreroll, components: [reroll], ephemeral: true })

		const filter = (i) => interaction.user.id === i.user.id

		const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 300000 });

		collector.on('collect', (interaction) => {
			if (interaction.values[0] === "cancel") {
				interaction.update({ content: lang.cancel.cancelled, components: [] })
			} else {
				client.manager.reroll(interaction.values[0], {
					messages: {
						congrat: lang.reroll.good,
						error: lang.reroll.parts
					}
				})
					.catch((err) => {
						interaction.reply(lang.reroll.errmod);
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