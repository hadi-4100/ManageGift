const guild = require("../../database/Schematics/Guild");
exports.run = async (client, message, args, lang, data) => {
	/*  if (!args[0]) return message.reply(lang.prefixerror);
    await client.db.set(`prefix_${message.guild.id}`, args[0]);
    message.channel.send(lang.setprefix + `\`${args[0]}\``);
*/
	const prefix = args[0];
	if(!prefix){
		return message.channel.send("eerr");
	}
	if(prefix.length > 5){
		return message.channel.send("err carc");
	}

	data.guild.prefix = prefix;
	data.guild.save();

	// Sucess
	return message.channel.send("suc", prefix);

};