const ms = require('ms');

exports.run = async (client, message, args) => {

    const db = require('quick.db')

    const config = require(`../config.js`)

    let language = db.fetch(`language_${message.guild.id}`)

    if (language === null) language = config.basiclang

    const lang = require(`../language/${language}.js`)

    if (!args[0]) return message.channel.send(lang.lang.msg)

    if (args[0] === "ar") {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(lang.lang.perms)
        }

        if (language === "ar") return message.channel.send(lang.lang.err)

        db.set(`language_${message.guild.id}`, "ar")

        message.channel.send(":flag_lb: | لغة هذا السيرفر هي العربية الآن!")

    }

    if (args[0] === "en") {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(lang.lang.perms)
        }

        if (language === "en") return message.channel.send(lang.lang.err)

        db.set(`language_${message.guild.id}`, "en")

        message.channel.send(":flag_gb: | The language of this server is now English!")

    }

    if (args[0] === "ru") {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(lang.lang.perms)
        }

        if (language === "ru") return message.channel.send(lang.lang.err)

        db.set(`language_${message.guild.id}`, "ru")

        message.channel.send(":flag_ru: | Язык установлен на Русский!")

    }
}