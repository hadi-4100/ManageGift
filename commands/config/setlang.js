const Discord = require("discord.js"),
	{ PermissionsBitField } = require("discord.js");

module.exports = {
	name: 'setlang',
	description: "Change bot's language",
	group: __dirname,
	owner: false,
	premium: false,

	options: [
		{
			name: "lang",
			description: "Choose the language",
			required: true,
			type: Discord.ApplicationCommandOptionType.String,
			choices: [
				{ name: "en", value: "english" },
				{ name: "ar", value: "arabic" },
				{ name: "ru", value: "russian" },
				{ name: "ua", value: "ukranian" }
			]
		}
	],

	run: async (client, interaction, guildData, lang) => {

		// If the member doesn't have enough permissions
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
			return interaction.reply({ content: lang.lang.perms, ephemeral: true });

		const newLanguage = interaction.options.getString("lang");

		// Arabic lang
		if (newLanguage === "arabic") {
			guildData.language = newLanguage;
			await guildData.save();
			return interaction.reply(":flag_lb: | لغة هذا السيرفر هي العربية الآن!")
		}

		// English lang
		if (newLanguage === "english") {
			guildData.language = newLanguage;
			await guildData.save();
			return interaction.reply(":flag_gb: | The language of this server is now English!")
		}

		// Russian lang
		if (newLanguage === "russian") {
			guildData.language = newLanguage;
			await guildData.save();
			return interaction.reply(":flag_ru: | К сожалению, мы не смогли предоставить русский переводчик для новой версии бота. Если вы хорошо владеете русским и языком и хотели бы помочь нам с переводом, [присоединяйтесь к нам](https://discord.gg/7XfV4Md).!")
		}

		// Ukranian lang
		if (newLanguage === "ukranian") {
			guildData.language = newLanguage;
			await guildData.save();
			return interaction.reply(":flag_ua: | Мову змінено на Українську!")
		}
	}
};