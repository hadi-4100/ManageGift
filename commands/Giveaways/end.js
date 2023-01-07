const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, PermissionsBitField } = require("discord.js"),
	moment = require("moment");

module.exports = {
	name: 'end',
	description: 'end a giveaway',
	group: __dirname,
	owner: false,
	premium: false,
	run: async (client, interaction, guildData, lang) => {

		// If the member doesn't have enough permissions
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && (guildData.plugins.role.enabled && !interaction.member.roles.cache.get(guildData.plugins.role.role))) {
			return interaction.reply({ content: lang.create.perms, ephemeral: true });
		}

		let options = [];
		const activeegivs = client.manager.giveaways.filter((g) => g.guildId === interaction.guild.id && g.ended !== true && g.pauseOptions.isPaused !== true && !g.isDrop);

		for (let i = 0; i < activeegivs.length; i++) {
			let value = activeegivs[i];
			options.push({
				label: lang.delete.option1(value),
				description: lang.delete.option2(value) + "\n |" + lang.edit.ending + `${moment(value.endAt).fromNow()} `,
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

		const endgiveaway = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId("end-giveaway")
					.setPlaceholder(lang.selectmenu.choose)
					.addOptions(options),
			)

		await interaction.reply({ content: lang.end.forend, components: [endgiveaway], ephemeral: true })

		const filter = (i) => interaction.user.id === i.user.id

		const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 300000 });

		collector.on('collect', (interaction) => {
			if (interaction.values[0] === "cancel") {
				interaction.update({ content: lang.cancel.cancelled, components: [] })
			} else {

				const messageID = interaction.values[0];

				// check if user his the host of giveaway
				if ("<@" + interaction.user.id + ">" != client.manager.giveaways.find((g) => g.messageId === interaction.values[0]).hostedBy) {
					return interaction.reply(lang.otherUser);
				}

				client.manager.end(interaction.values[0]).then(() => {
					interaction.reply(lang.end.good(messageID));
				})
					.catch((err) => {
						interaction.reply(lang.end.errmod);
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