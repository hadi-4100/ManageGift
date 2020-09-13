const db = require("quick.db")
const config = require("../../config.js")
exports.run = async (client, message, args) => {
    let language = db.fetch(`language_${message.guild.id}`)
    if (language === null) language = config.basiclang
    const lang = require(`../../language/${language}.js`)

    message.channel.send(lang.info.ping + `${Date.now() - message.createdTimestamp}`);
};