const ms = require("ms");

exports.run = async (client, message, args, lang) => {
    let role = client.db.fetch(`role_${message.guild.id}`);
    if (!role) role = client.config.giveaway.grole;
    // If the member doesn't have enough permissions
    if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.some((r) => r.name === role))
        return message.channel.send(lang.create.perms + "** **" + "`" + role + "`" + "!.");
    

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if (!giveawayChannel) return message.channel.send(lang.create.channel)
        .then(msg => {
            msg.delete({ timeout: 10000 });
            message.delete({ timeout: 10000 });
        });

        if(message.member.guild.id != giveawayChannel.guild.id) return message.channel.send(lang.create.otherServer);
 
    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send(lang.create.duration)
        .then(msg => {
            msg.delete({ timeout: 10000 });
            message.delete({ timeout: 10000 });
        });


    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if (isNaN(giveawayNumberWinners)) return message.channel.send(lang.create.argswinners)
        .then(msg => {
            msg.delete({ timeout: 10000 });
            message.delete({ timeout: 10000 });
        });


    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if (!giveawayPrize) return message.channel.send(lang.create.prize)
        .then(msg => {
            msg.delete({ timeout: 10000 });
            message.delete({ timeout: 10000 });
        });


    let mention = client.db.fetch(`mention_${message.guild.id}`);

    if (!mention) mention = false;
    if (mention) {
        var text1 = "@everyone\n\n" + lang.create.giveaway;
        var text2 = "@everyone\n\n" + lang.create.giveawayEnded;
    }

    if (!mention) {
        var text1 = lang.create.giveaway;
        var text2 = lang.create.giveawayEnded;
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.giveaway.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: text1,
            giveawayEnded: text2,
            timeRemaining: lang.create.timeRemaining,
            inviteToParticipate: lang.create.inviteToParticipate(message),
            winMessage: lang.create.winMessage(message),
            embedFooter: lang.create.embedFooter,
            noWinner: lang.create.noWinner,
            hostedBy: lang.create.hostedBy,
            winners: lang.create.winners,
            endedAt: lang.create.endedAt,
            units: {
                seconds: lang.units.seconds,
                minutes: lang.units.minutes,
                hours: lang.units.hours,
                days: lang.units.days,
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    }, message.delete({ timeout: 10000 }));

    message.channel.send(`${lang.create.good} ${giveawayChannel}!`);
};
