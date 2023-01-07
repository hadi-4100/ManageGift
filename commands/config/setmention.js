const Discord = require("discord.js"),
	{ PermissionsBitField } = require("discord.js");

module.exports = {
	name: 'setmention',
	description: "enable or disable mention when giveaway start",
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

		const mentionstatus = interaction.options.getString("status");

		if (mentionstatus === "on") {

			if (guildData.plugins.mention.enabled) {
				return interaction.reply(lang.already.enb)
			}

			guildData.plugins.mention = {
				enabled: true
			};
			guildData.markModified("plugins.mention");
			guildData.save();

			interaction.reply(lang.setmention.mon);
		}
		if (mentionstatus === "off") {

			if (guildData.plugins.mention.enabled === false) {
				return interaction.reply(lang.already.dis)
			}

			guildData.plugins.mention = {
				enabled: false
			};
			guildData.markModified("plugins.mention");
			guildData.save();

			interaction.reply(lang.setmention.moff);

		}
	}
};