exports.run = async (client, message, args) => {
    const ms = require("ms");
    const db = require("quick.db")
    const config = require("../config.js")
    let language = db.fetch(`language_${message.guild.id}`)
    if(language === null) language = config.basiclang
    const lang = require(`../language/${language}.js`)
    let role = db.fetch(`role_${message.guild.id}`)
    if(role === null) role = config.grole

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.some((r) => r.name === role)){
        return message.channel.send(lang.start.perms + "** **" + "`" + role + "`" + "!.");
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(lang.start.channel);
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(lang.start.duration);
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners)){
        return message.channel.send(lang.start.argswinners);
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(lang.start.prize);
    }

    let mention = db.fetch(`mention_${message.guild.id}`)

    if(mention === null) mention = false
        if(mention === true){
            var text1 = "@everyone\n\n" + lang.start.giveaway
            var text2 = "@everyone\n\n" + lang.start.giveawayEnded
        }

        if(mention === false){
            var text1 = lang.start.giveaway
            var text2 = lang.start.giveawayEnded
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
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: text1,
            giveawayEnded: text2,
            timeRemaining: lang.start.timeRemaining,
            inviteToParticipate: lang.start.inviteToParticipate(message),
            winMessage: lang.start.winMessage(message),
            embedFooter: lang.start.embedFooter,
            noWinner: lang.start.noWinner,
            hostedBy: lang.start.hostedBy,
            winners: lang.start.winners,
            endedAt: lang.start.endedAt,
            units: {
                seconds: lang.units.seconds,
                minutes: lang.units.minutes,
                hours: lang.units.hours,
                days: lang.units.days,
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`${lang.start.good} ${giveawayChannel}!`);
};