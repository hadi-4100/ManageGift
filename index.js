const config = require("./config.js"), { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ disableMentions: "everyone" }),
	mongoose = require("mongoose"),
	{ GiveawaysManager } = require("discord-giveaways"),
	giveawayModel = require("./database/Schematics/Giveaway"),
	{ readdir } = require("fs");


client.config = config;
client.data = require("./database/MongoDB.js");
client.logger = require("./Modules/Logger.js");
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
		embedColorEnd: "#ff0023",
		reaction: config.giveaway.reaction
	}
});
client.giveawaysManager = manager; // We now have a client.giveawaysManager property to manage our giveaways!

// logs for bot
manager
	.on("giveawayReactionAdded", (giveaway, member, reaction) => client.logger.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`))
	.on("giveawayReactionRemoved", (giveaway, member, reaction) => client.logger.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`));

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
		const eventName = file.split(".")[0];
		client.logger.log(`(👌) Event loaded : ${eventName} !`, "event");
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});

readdir("./commands/", (err, files) => {
	files.forEach((dir) => {
		readdir(`./commands/${dir}/`, (err, cmd) => {
			cmd.forEach(file => {
				if (!file.endsWith(".js")) return;
				const props = require(`./commands/${dir}/${file}`);
				const commandName = file.split(".")[0];
				client.commands.set(commandName, props);
				client.logger.log(`[📕] Command loaded: ${commandName}!`, "cmd");
			});
		});
	});
});

//Connect to mongoose database
mongoose.connect(config.mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true
}).then(() => {
	//If it connects log the following
	client.logger.log("Connected to the Mongodb database.", "log");
}).catch((err) => {
	//If it doesn't connect log the following
	client.logger.log("Unable to connect to the Mongodb database. Error:" + err, "error");
});

// Login to bot
client.login(config.token);


client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
	.on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
	.on("error", (e) => client.logger.log(e, "error"))
	.on("warn", (info) => client.logger.log(info, "warn"));

//For any unhandled errors
process.on("unhandledRejection", (err) => {
	console.error(err);
});