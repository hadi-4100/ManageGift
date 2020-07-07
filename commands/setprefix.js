exports.run = async (client, message, args) => {
    
    const config = require('../config');
    const db = require('quick.db');

    let language = db.fetch(`language_${message.guild.id}`)
    if (language === null) language = config.basiclang
    const lang = require(`../language/${language}.js`);

    if(!args[0]) return message.reply(lang.prefixerror);
    await db.set(`prefix_${message.guild.id}`, args[0])
    message.channel.send(lang.setprefix + `\`${args[0]}\``);

};