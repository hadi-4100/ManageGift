const Discord = require("discord.js"),
	{ PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js"),
	ms = require("ms");

module.exports = {
	name: 'drop',
	description: 'create a drop',
	group: __dirname,
	owner: false,
	premium: false,

	options: [
		{
			name: 'winners',
			description: 'How many winners the giveaway should have',
			type: Discord.ApplicationCommandOptionType.Integer,
			required: true
		},
		{
			name: 'prize',
			description: 'What the prize of the giveaway should be',
			type: Discord.ApplicationCommandOptionType.String,
			required: true
		},
		{
			name: 'channel',
			description: 'The channel to create the giveaway in',
			type: Discord.ApplicationCommandOptionType.Channel,
			channelTypes: ['0'],
			required: false
		},
	],

	run: async (client, interaction, guildData, lang) => {
        		
        // If the bot doesn't have Administrator permissions
		if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve('Administrator'))) {
			return interaction.reply(lang.cmd.botperm);
		}

		// If the member doesn't have enough permissions
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && (guildData.plugins.role.enabled && !interaction.member.roles.cache.get(guildData.plugins.role.role))) {
			return interaction.reply({ content: lang.create.perms, ephemeral: true });
		}

		const giveawayNumberWinners = interaction.options.getInteger('winners');
		const giveawayPrize = interaction.options.getString('prize');
		const Channel = interaction.options.getChannel('channel');

		if (giveawayNumberWinners < 1) {
			return interaction.reply({
				content: lang.create.argswinners,
				ephemeral: true
			})
		}

		if (giveawayPrize.length > 50) {
			return interaction.reply({
				content: lang.create.prizee,
				ephemeral: true
			})
		}

		if (Channel) {
			var channel = Channel
		} else {
			channel = interaction.channel
		}

        // Create the giveaway
		const drop = await client.manager.start(channel, {
			// if this is drop
			isDrop: true,
			// The giveaway prize
			prize: giveawayPrize,
			// The giveaway winner count
			winnerCount: giveawayNumberWinners,
			// Who hosts this giveaway
			hostedBy: interaction.user,
			// Using for store the role and send it to giveaway event
			extraData: {
				dmwinners: guildData.plugins.dmwinners.enabled
			},
			// Messages
			messages: {
				giveaway: lang.messages.dropstart,
				giveawayEnded: lang.messages.dropend,
				content1: lang.messages.content1,
				content2: lang.messages.content2,
				content3: lang.messages.content3,
				hostedBy: lang.messages.hostedBy,
				requirements: lang.messages.req,
				rolereq: lang.messages.rolereq,
				dropMessage: lang.messages.drop,
				end1: lang.messages.end1,
				end2: lang.messages.end2,
				end3: lang.messages.end3,
				drpend: lang.messages.drpend,
				novalid1: lang.messages.novalid1,
				novalid2: lang.messages.novalid2,
				embedFooter: lang.messages.embedFooter,
				dropfooter: lang.messages.dropfooter,
				novalidfoo: lang.messages.novalidfoo,
				winners: lang.messages.winners,
				endedAt: lang.messages.endedAt,
				approved1: lang.messages.approved1,
				approved2: lang.messages.approved2,
				denied1: lang.messages.denied1,
				denied2: lang.messages.denied2,
				dm1: lang.messages.dm1,
				dm2: lang.messages.dm2,
				dm3: lang.messages.dm3,
				winMessage: {
					embed: new Discord.EmbedBuilder().setDescription(lang.messages.winMessage).setColor("#454DFC"),
					components: [new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setLabel(lang.drop.viewdrop).setEmoji('<:botlogo:1024760383677927484>').setURL(`https://canary.discord.com/channels/{this.guildId}/{this.channelId}/{this.messageId}`).setStyle(ButtonStyle.Link))]
				}
			}
		});

		const btn = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setLabel(lang.drop.viewdrop)
				.setEmoji('<:botlogo:1024760383677927484>')
				.setURL(drop.messageURL)
				.setStyle(ButtonStyle.Link)
		);

		return await interaction.reply({ content: lang.drop.dropstart, components: [btn], ephemeral: true })
    }
};