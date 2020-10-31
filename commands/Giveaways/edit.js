const ms = require("ms"), num = require('num-parse');

exports.run = async (client, message, args, lang) => {
    let role = client.db.fetch(`role_${message.guild.id}`);
    if (!role) role = client.config.giveaway.grole;

    if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.some((r) => r.name === role)) return message.channel.send(lang.start.perms + "** **" + "`" + role + "`" + "!.");

    let id = args[0];
    if (!id) return message.channel.send(lang.edit.msg);

    if(message.member.guild.id != client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]).guildID) return message.channel.send(lang.delete.otherServer);
    if("<@" + message.member.id + ">" != client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]).hostedBy) return message.channel.send(lang.delete.otherUser);
        
    let hasGiveaway = client.giveawaysManager.giveaways.find((g) => g.messageID === id);
    if (!hasGiveaway) {
        return message.channel.send(lang.edit.err + "** **" + "`" + args.join(" ") + "`" + ".");
    }
    let time = args[1];
    if (!time) return message.channel.send(lang.edit.time);
    if (ms(time) > ms("10d")) {
        return message.channel.send(lang.edit.errtime);
    }
    let winners = args[2];
    if (!winners) return message.channel.send(lang.edit.argswinners);
    num(winners, 1);
    if (winners > 15) return message.channel.send(lang.edit.errwinners);
    let prize = args.slice(3).join(" ");
    if (!prize) return message.channel.send(lang.edit.prize);

    client.giveawaysManager.edit(hasGiveaway.messageID, {
        addTime: ms(time),
        newWinnerCount: parseInt(winners),
        newPrize: prize,
    })
    message.channel.send(lang.edit.good).then((msg) => {
        msg.delete({ timeout: 10000 })
    })
        .then(() => {
            if (message.deletable) message.delete({ timeout: 10000 });
            return;
        }).catch((err) => {
            message.channel.send(lang.edit.errmod);
        });
}
