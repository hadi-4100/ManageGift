exports.run = async (client, message, args, lang) => {
    if (!args[0]) return message.channel.send(lang.set.msg)

    if (args.join(" ") === "mention") {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(lang.set.perms)
        }

        message.channel.send(lang.set.args)
    }

    if (args.join(" ") === "mention off") {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(lang.set.perms)
        }
        
        let mention = client.db.fetch(`mention_${message.guild.id}`);
        if (!mention) return message.channel.send(lang.set.erroff);
        client.db.set(`mention_${message.guild.id}`, false);
        message.channel.send(lang.set.moff)
    }

    if (args.join(" ") === "mention on") {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(lang.set.perms)
        }

        let mention = client.db.fetch(`mention_${message.guild.id}`);
        if (mention) return message.channel.send(lang.set.erron);
        client.db.set(`mention_${message.guild.id}`, true);
        message.channel.send(lang.set.mon)
    }

    if (args[0] === "logs") {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(lang.set.perms)
        }
        
        var channel = message.mentions.channels.first();
        if (!channel) return message.channel.send(lang.set.channel);
        client.db.set(`logs_${message.guild.id}`, channel.id);

        message.channel.send(lang.set.chon + "** **" + "`" + channel.name + "`" + ".")
    }

    if (args[0] === "role") {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(lang.set.perms)
        }

        var role = message.mentions.roles.first();
        if (!role) return message.channel.send(lang.set.role);
        client.db.set(`role_${message.guild.id}`, role.name);

        message.channel.send(lang.set.ron + "** **" + "`" + role.name + "`" + ".")

    }
}
