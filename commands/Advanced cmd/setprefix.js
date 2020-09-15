exports.run = async (client, message, args, lang) => {
    if (!args[0]) return message.reply(lang.prefixerror);
    await client.db.set(`prefix_${message.guild.id}`, args[0]);
    message.channel.send(lang.setprefix + `\`${args[0]}\``);
};
