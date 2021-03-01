const config = require("./config.js"), { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ disableMentions: "everyone" }),
    mongoose = require("mongoose"),
    { GiveawaysManager } = require("discord-giveaways"),
    { readdir } = require("fs");


// Connect to database
mongoose.connect('mongodb://localhost/managegift-dev', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
const db = mongoose.connection;

// Check the connection
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB.');
});

// Create the schema for giveaways
const giveawaySchema = new mongoose.Schema({
    messageID: String,
    channelID: String,
    guildID: String,
    startAt: Number,
    endAt: Number,
    ended: Boolean,
    winnerCount: Number,
    prize: String,
    messages: {
        giveaway: String,
        giveawayEnded: String,
        inviteToParticipate: String,
        timeRemaining: String,
        winMessage: String,
        embedFooter: String,
        noWinner: String,
        winners: String,
        endedAt: String,
        hostedBy: String,
        units: {
            seconds: String,
            minutes: String,
            hours: String,
            days: String,
            pluralS: Boolean,
        },
    },
    hostedBy: String,
    winnerIDs: [String],
    reaction: mongoose.Mixed,
    botsCanWin: Boolean,
    embedColor: mongoose.Mixed,
    embedColorEnd: mongoose.Mixed,
    exemptPermissions: [],
    bonusEntries: String,
    extraData: mongoose.Mixed,
    lastChance: {
        enabled: Boolean,
        content: String,
        threshold: Number,
        embedColor: mongoose.Mixed
    }
});

// Create the model
const giveawayModel = mongoose.model('giveaways', giveawaySchema);

client.config = config;
client.db = db;
client.commands = new Collection();

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    // This function is called when the manager needs to get all the giveaway stored in the database.
    async getAllGiveaways() {
        // Get all the giveaway in the database.
        return await giveawayModel.find({});
    }

    // This function is called when a giveaway needs to be saved in the database (when a giveaway is created or when a giveaway is edited).
    async saveGiveaway(messageID, giveawayData) {
        // Add the new one
        await giveawayModel.create(giveawayData);
        // Don't forget to return something!
        return true;
    }

    async editGiveaway(messageID, giveawayData) {
        // Find by messageID and update it
        await giveawayModel
            .findOneAndUpdate({ messageID: messageID }, giveawayData)
            .exec();
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageID) {
        // Find by messageID and delete it
        await giveawayModel
            .findOneAndDelete({ messageID: messageID })
            .exec();
        // Don't forget to return something!
        return true;
    }

};

// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
    storage: false,
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#f6546a",
        embedColorEnd: '#ff0023',
        reaction: config.giveaway.reaction
    }
});
client.giveawaysManager = manager;
// We now have a client.giveawaysManager property to manage our giveaways!

manager
    .on("giveawayReactionAdded", (giveaway, member, reaction) => {
        if (member.user.bot) return;
        let language = db.fetch(`language_${member.guild.id}`);
        if (!language) language = config.basiclang;
        const lang = require(`./language/${language}.js`);
        let logs = db.fetch(`logs_${member.guild.id}`);
        if (!logs) return;
        const channel1 = member.guild.channels.cache.get(logs);
        channel1.send(new MessageEmbed()
            .setAuthor(lang.logs.raddtitle)
            .setDescription(lang.logs.raddmsg1 + "** **" + "`" + member.user.tag + "`" + "** **" + lang.logs.raddmsg2 + "** **" + "`" + giveaway.messageID + "`" + "** **" + config.giveaway.reaction)
            .setFooter(config.embeds.footers)
            .setColor(config.events.addcolor)
            .setTimestamp()).catch(() => { });
    })
    .on("giveawayReactionRemoved", (giveaway, member, reaction) => {
        if (member.user.bot) return;
        let language = db.fetch(`language_${member.guild.id}`);
        if (!language) language = config.basiclang;
        const lang = require(`./language/${language}.js`);
        let logs = db.fetch(`logs_${member.guild.id}`);
        if (!logs) return;
        const channel2 = member.guild.channels.cache.get(logs);

        channel2.send(new MessageEmbed()
            .setAuthor(lang.logs.rremtitle)
            .setDescription(lang.logs.rremmsg1 + "** **" + "`" + member.user.tag + "`" + "** **" + lang.logs.rremmsg2 + "** **" + "`" + giveaway.messageID + "`" + "** **" + config.giveaway.reaction)
            .setFooter(config.embeds.footers)
            .setColor(config.events.remcolor)
            .setTimestamp()).catch(console.error);
    })

    // logs for bot
    .on("giveawayReactionAdded", (giveaway, member, reaction) => console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`))
    .on("giveawayReactionRemoved", (giveaway, member, reaction) => console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`));

client
    .on("guildCreate", async guild => {
        await client.channels.cache.get(client.config.auth.logs).send(new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .setDescription(`ManageGift is joind in: **${guild.name}** server iD: **${guild.id}** owner server iD: **${guild.ownerID}** with ${guild.members.cache.size} members & (${guild.members.cache.filter((m) => m.user.bot).size} bots)`)
            .setColor("#7CFC00")
            .setFooter(client.config.embeds.footers)).catch(() => { });
    })
    .on("guildDelete", async guild => {
        await client.channels.cache.get(client.config.auth.logs).send(new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .setDescription(`ManageGift is leave **${guild.name}** | **${guild.id}** server and the id of owner server is **${guild.ownerID}**`)
            .setColor("#DC143C")
            .setFooter(client.config.embeds.footers)).catch(() => { });
    });

readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`(👌) Event loaded : ${eventName} !`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

readdir("./commands/", (err, files) => {
    files.forEach((dir) => {
        readdir(`./commands/${dir}/`, (err, cmd) => {
            cmd.forEach(file => {
                if (!file.endsWith(".js")) return;
                let props = require(`./commands/${dir}/${file}`);
                let commandName = file.split(".")[0];
                client.commands.set(commandName, props);
                console.log(`[📕] Command loaded: ${commandName}!`);
            });
        });
    });
});


// Login to bot
client.login(config.token);
