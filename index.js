const config = require("./config.js"),
	mongoose = require("mongoose"),
	{ readdir } = require("fs"),
	Client = require("./base/Client"),
	client = new Client();

// creating an empty array for registering slash commands
client.register_arr = []
/* Load all slash commands */
readdir("./commands/", (err, files) => {
	files.forEach((dir) => {
		readdir(`./commands/${dir}/`, (err, cmd) => {
			cmd.forEach(file => {
				if (!file.endsWith(".js")) return;
				const props = require(`./commands/${dir}/${file}`);
				const commandName = file.split(".")[0];
				client.interactions.set(commandName, {
					name: commandName,
					...props
				});
				client.register_arr.push(props)
				client.log(`[📕] Command loaded: ${commandName}!`, "cmd");
			});
		});
	});
});

/* Load discord events */
readdir("./events/discord", (_err, files) => {
	files.forEach((file) => {
		if (!file.endsWith(".js")) return;
		const event = require(`./events/discord/${file}`);
		const eventName = file.split(".")[0];
		client.log(`(👌) Event loaded : ${eventName} !`, "event");
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/discord/${file}`)];
	});
});

/* Load Giveaway events */
readdir("./events/giveaways", (_err, files) => {
	files.forEach((file) => {
		if (!file.endsWith(".js")) return;
		const event = require(`./events/giveaways/${file}`);
		const eventName = file.split(".")[0];
		client.log(`(👌) Giveaway event loaded : ${eventName} !`, "event");
		client.manager.on(eventName, event.bind());
		delete require.cache[require.resolve(`./events/giveaways/${file}`)]
	});
});

//Connect to mongoose database
mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//If it connects log the following
	client.log("Connected to the Mongodb database.", "done");
}).catch((err) => {
	//If it doesn't connect log the following
	client.log("Unable to connect to the Mongodb database. Error:" + err, "error");
});

// Login to bot
client.login(config.token);

client.on("disconnect", () => client.log("Bot is disconnecting...", "warn"))
	.on("reconnecting", () => client.log("Bot reconnecting...", "log"))
	.on("error", (e) => client.log(e, "error"))
	.on("warn", (info) => client.log(info, "warn"));

//For any unhandled errors
process.on("unhandledRejection", (err) => {
	console.error(err);
});

/**
  * Bot Coded by !  HaDi KouBeIssI | 🇱🇧#6256 | https://github.com/Hadi-Koubeissi/ManageGift

  * Please mention Him !  HaDi KouBeIssI | 🇱🇧, when using this Code!
*/