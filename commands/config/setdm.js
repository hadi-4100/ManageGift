const Discord = require("discord.js"),
	{ PermissionsBitField } = require("discord.js");

module.exports = {
	name: 'setdm',
	description: "enable or disable dm when user win",
	group: __dirname,
	owner: false,
	premium: false,

	options: [
		{
			name: "status",
			description: "Choose the value",
			required: true,
			type: Discord.ApplicationCommandOptionType.String,
			choices: [
				{ name: "on", value: "on" },
				{ name: "off", value: "off" },
			]
		}
	],

	run: async (client, interaction, guildData, lang) => {
		// If the member doesn't have enough permissions
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
			return interaction.reply({ content: lang.lang.perms, ephemeral: true });

		const dmstatus = interaction.options.getString("status");

		if (dmstatus === "on") {

			if (guildData.plugins.dmwinners.enabled) {
				return interaction.reply(lang.already.enb)
			}

			guildData.plugins.dmwinners = {
				enabled: true
			};

			guildData.markModified("plugins.dmwinners");
			guildData.save();

			interaction.reply(lang.setdm.doneon);
		}

		if (dmstatus === "off") {

			if (guildData.plugins.dmwinners.enabled === false) {
				return interaction.reply(lang.already.dis)
			}

			guildData.plugins.dmwinners = {
				enabled: false
			};
			
			guildData.markModified("plugins.dmwinners");
			guildData.save();

			interaction.reply(lang.setdm.doneoff);

		}
	}
};