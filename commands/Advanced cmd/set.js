exports.run = async (client, message, args) => {
    const db = require("quick.db")
    const config = require("../../config.js")
    let language = db.fetch(`language_${message.guild.id}`)
    if(language === null) language = config.basiclang
    const lang = require(`../../language/${language}.js`)
    if(!args[0]) return message.channel.send(lang.set.msg)

    if(args.join(" ") === "mention"){
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(lang.set.perms)
        }

        message.channel.send(lang.set.args)
    }

    if(args.join(" ") === "mention off"){
        if(!message.member.hasPermission("MANAGE_CHANNELS")){
            return message.channel.send(lang.set.perms)
        }

        let mention = db.fetch(`mention_${message.guild.id}`)
        if(mention === null) mention = false
        if(mention === false) return message.channel.send(lang.set.erroff)
        db.set(`mention_${message.guild.id}`, false)

        message.channel.send(lang.set.moff)
    }

    if(args.join(" ") === "mention on"){
        if(!message.member.hasPermission("MANAGE_CHANNELS")){
            return message.channel.send(lang.set.perms)
        }

        let mention = db.fetch(`mention_${message.guild.id}`)
        if(mention === null) mention = false
        if(mention === true) return message.channel.send(lang.set.erron)
        db.set(`mention_${message.guild.id}`, true)

        message.channel.send(lang.set.mon)
    }

    if(args[0] === "logs"){
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(lang.set.perms)
        }

        let logs = db.fetch(`logs_${message.guild.id}`)
        if (logs === null) logs = false
        var channel = message.mentions.channels.first();
        if(!channel) return message.channel.send(lang.set.channel)
        db.set(`logs_${message.guild.id}`, channel.id)

        message.channel.send(lang.set.chon + "** **" + "`" + channel.name + "`" + ".")
    }

    if(args[0] === "role"){
        if(!message.member.hasPermission("MANAGE_CHANNELS")){
            return message.channel.send(lang.set.perms)
        }

        let edit = db.fetch(`role_${message.guild.id}`)
        if(edit === null) edit = false
        var role = message.mentions.roles.first();
        if(!role) return message.channel.send(lang.set.role)
        db.set(`role_${message.guild.id}`, role.name)

        message.channel.send(lang.set.ron + "** **" + "`" + role.name + "`" + ".")

    }
}