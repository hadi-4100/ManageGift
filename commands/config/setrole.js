const Discord = require("discord.js"),
	{ PermissionsBitField } = require("discord.js");

module.exports = {
	name: 'setrole',
	description: "enable or disable role manager",
	group: __dirname,
	owner: false,
	premium: false,

	options: [
		{
			name: "role",
			description: "role manager",
			type: Discord.ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "role_value",
					description: "the role",
					type: Discord.ApplicationCommandOptionType.Role,
					required: true
				}
			]
		},
		{
			name: "status",
			description: "the status",
			type: Discord.ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "status_value",
					description: "Choose the value",
					required: true,
					type: Discord.ApplicationCommandOptionType.String,
					choices: [
						{ name: "on", value: "on" },
						{ name: "off", value: "off" },
					]
				}
			]
		}
	],

	run: async (client, interaction, guildData, lang) => {
		// If the member doesn't have enough permissions
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
			return interaction.reply({ content: lang.lang.perms, ephemeral: true });

		const action = interaction.options.getSubcommand();
		const role = interaction.options.getRole("role_value")
		const status = interaction.options.getString("status_value");

		switch (action) {
			case "role": {
				guildData.plugins.role = {
					enabled: true,
					role: role.id
				};
				guildData.markModified("plugins.role");
				guildData.save();

				interaction.reply(lang.setrole.roledone(role));

				break;
			}

			case "status": {

				if (!guildData.plugins.role.role) {
					return interaction.reply({ ephemeral: true, content: lang.setrole.setrlebedore })
				}

				if (status == "on") {

					if (guildData.plugins.role.enabled === true) {
						return interaction.reply(lang.already.enb)
					}

					guildData.plugins.role.enabled = true
					guildData.markModified("plugins.role");
					guildData.save();

					interaction.reply(lang.setrole.ron);

				} else {

					if (guildData.plugins.role.enabled === false) {
						return interaction.reply(lang.already.dis)
					}

					guildData.plugins.role.enabled = false
					guildData.markModified("plugins.role");
					guildData.save();

					interaction.reply(lang.setrole.roff);

				}

				break;
			}
		}
	}
};