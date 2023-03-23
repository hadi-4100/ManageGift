const Discord = require("discord.js"),
	{ EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, PermissionsBitField } = require("discord.js"),
	ms = require("ms"),
	moment = require("moment");

module.exports = {
	name: 'edit',
	description: 'edit a giveaway',
	group: __dirname,
	owner: false,
	premium: false,

	options: [
		{
			name: "value",
			description: "Choose the value to change",
			required: true,
			type: Discord.ApplicationCommandOptionType.String,
			choices: [
				{ name: "Winners", value: "newWinners" },
				{ name: "Prize", value: "newPrize" },
				{ name: "duration", value: "newDuration" }
			]
		},
		{
			name: "new_value",
			description: "New value",
			required: true,
			type: Discord.ApplicationCommandOptionType.String
		}
	],

	run: async (client, interaction, guildData, lang) => {

		// If the member doesn't have enough permissions
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && (guildData.plugins.role.enabled && !interaction.member.roles.cache.get(guildData.plugins.role.role))) {
			return interaction.reply({ content: lang.create.perms, ephemeral: true });
		}

		let valueToChange = interaction.options.getString("value")
		switch (valueToChange) {
			case "newWinners":
				var newwinner = interaction.options.getString("new_value")
				newwinner = newwinner.replace(/-/g, '')
				newwinner = parseInt(newwinner)
				newwinner = newwinner.toString()
				if (newwinner === 'NaN') {
					return interaction.reply(lang.create.argswinners)
				} else {
					newwinner = Math.trunc(newwinner)
					let options = [];
					const activeegivs = client.manager.giveaways.filter((g) => g.guildId === interaction.guild.id && g.ended !== true && g.pauseOptions.isPaused !== true && !g.isDrop);

					for (let i = 0; i < activeegivs.length; i++) {
						let value = activeegivs[i];
						options.push({
							label: lang.delete.option1(value),
							description: lang.delete.option2(value) + "\n |" + lang.edit.ending + `${moment(value.endAt).fromNow()} `,
							value: `w|${newwinner}|${value.messageId}`,
							emoji: `<:botlogo:1024760383677927484>`
						})
					}

					options.push({
						label: lang.cancel.option1,
						description: lang.cancel.option2,
						value: `cancel`,
						emoji: `<:backk:1021855656879341659>`
					})

					const editgiveaway = new ActionRowBuilder()
						.addComponents(
							new SelectMenuBuilder()
								.setCustomId("edit-giveaway")
								.setPlaceholder(lang.selectmenu.choose)
								.addOptions(options),
						)

					await interaction.reply({ content: lang.edit.foredit, components: [editgiveaway], ephemeral: true })

				};

				break;
			case "newPrize":

				var newprize = interaction.options.getString("new_value")
				if (newprize.length > 50) {
					return interaction.reply(lang.create.prizee)
				} else {
					let options = [];
					const activeegivs = client.manager.giveaways.filter((g) => g.guildId === interaction.guild.id && g.ended !== true && g.pauseOptions.isPaused !== true && !g.isDrop);

					for (let i = 0; i < activeegivs.length; i++) {
						let value = activeegivs[i];
						options.push({
							label: lang.delete.option1(value),
							description: lang.delete.option2(value) + "\n |" + lang.edit.ending + `${moment(value.endAt).fromNow()} `,
							value: `p|${newprize}|${value.messageId}`,
							emoji: `<:botlogo:1024760383677927484>`
						})
					}

					options.push({
						label: lang.cancel.option1,
						description: lang.cancel.option2,
						value: `cancel`,
						emoji: `<:backk:1021855656879341659>`
					})

					const editgiveaway = new ActionRowBuilder()
						.addComponents(
							new SelectMenuBuilder()
								.setCustomId("edit-giveaway")
								.setPlaceholder(lang.selectmenu.choose)
								.addOptions(options),
						)

					await interaction.reply({ content: lang.edit.foredit, components: [editgiveaway], ephemeral: true })

				};

				break;
			case "newDuration":

				var newduration = interaction.options.getString("new_value")
				if (isNaN(ms(newduration)) || ms(newduration) < ms("40s")) {
					return interaction.reply(lang.create.duration);
				} else {
					let options = [];
					let activeegivs;
					activeegivs = client.manager.giveaways.filter((g) => g.guildId === interaction.guild.id && g.ended !== true && g.pauseOptions.isPaused !== true && !g.isDrop);

					for (let i = 0; i < activeegivs.length; i++) {
						let value = activeegivs[i];
						options.push({
							label: lang.delete.option1(value),
							description: lang.delete.option2(value) + "\n |" + lang.edit.ending + `${moment(value.endAt).fromNow()} `,
							value: `t|${newduration}|${value.messageId}`,
							emoji: `<:botlogo:1024760383677927484>`
						})
					}

					options.push({
						label: lang.cancel.option1,
						description: lang.cancel.option2,
						value: `cancel`,
						emoji: `<:backk:1021855656879341659>`
					})

					const editgiveaway = new ActionRowBuilder()
						.addComponents(
							new SelectMenuBuilder()
								.setCustomId("edit-giveaway")
								.setPlaceholder(lang.selectmenu.choose)
								.addOptions(options),
						)

					await interaction.reply({ content: lang.edit.foredit, components: [editgiveaway], ephemeral: true })

				};

				break;
		}

		const filter = (i) => interaction.user.id === i.user.id

		const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 300000 });

		collector.on('collect', (interaction) => {
			if (interaction.values[0] === "cancel") {
				interaction.update({ content: lang.cancel.cancelled, components: [] })
			} else {

				const mod = interaction.values[0].split("|")[0];
				const messageID = interaction.values[0].split("|")[2];

				switch (mod) {
					case "w":
						// check if user his the host of giveaway
						if ("<@" + interaction.user.id + ">" != client.manager.giveaways.find((g) => g.messageId === messageID).hostedBy) {
							return interaction.reply(lang.otherUser);
						}

						client.manager.edit(messageID, {
							newWinnerCount: newwinner,
							addTime: 5000
						}).then(() => {
							interaction.reply(lang.edit.wi(messageID));
						}).catch((err) => {
							interaction.reply(lang.edit.errmod);
						});
						break;
					case "p":
						// check if user his the host of giveaway
						if ("<@" + interaction.user.id + ">" != client.manager.giveaways.find((g) => g.messageId === messageID).hostedBy) {
							return interaction.reply(lang.otherUser);
						}

						client.manager.edit(messageID, {
							newPrize: newprize,
							addTime: 5000
						}).then(() => {
							interaction.reply(lang.edit.pr(messageID));
						}).catch((err) => {
							interaction.reply(lang.edit.errmod);
						});
						break;
					case "t":
						// check if user his the host of giveaway
						if ("<@" + interaction.user.id + ">" != client.manager.giveaways.find((g) => g.messageId === messageID).hostedBy) {
							return interaction.reply(lang.otherUser);
						}

						client.manager.edit(messageID, {
							setEndTimestamp: Date.now() + ms(newduration)
						}).then(() => {
							interaction.reply(lang.edit.ti(messageID));
						}).catch((err) => {
							interaction.reply(lang.edit.errmod);
						});
						break;
				}
			}
		})

		collector.on('end', (collected, reason) => {
			if (reason == "time") {
				interaction.update({
					content: lang.collector.time,
					components: [],
				});
			}
		});
	}
};