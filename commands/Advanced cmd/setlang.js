exports.run = async (client, message, args, guildData, lang) => {
	if (!message.member.hasPermission("MANAGE_CHANNELS"))
		return message.channel.send(lang.lang.perms);

	if (!args[0]) return message.channel.send(lang.lang.msg);

	// Arabic lang
	if (args[0] === "ar") {
		guildData.language = "arabic";
		await guildData.save();
		return message.channel.send(":flag_lb: | لغة هذا السيرفر هي العربية الآن!");
	}

	// English lang
	if (args[0] === "en") {
		guildData.language = "english";
		await guildData.save();
		return message.channel.send(":flag_gb: | The language of this server is now English!");
	}

	// Russian lang
	if (args[0] === "ru") {
		guildData.language = "russian";
		await guildData.save();
		return message.channel.send(":flag_ru: | Язык изменён на Русский!");
	}

	// Ukranian lang
	if (args[0] === "ua") {
		guildData.language = "ukranian";
		await guildData.save();
		return message.channel.send(":flag_ua: | Мову змінено на Українську!");
	}
};