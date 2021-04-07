/**
  * @INFO
  * Loading all needed File Information Parameters
*/
const config = require("./config.js"),
	Client = require("./Base/Client"), 
	client = new Client(),
	mongoose = require("mongoose"),
	{ readdir } = require("fs");

	
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
mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
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

/**
  * @INFO
  * Bot Coded by !  HaDi KouBeIssI | 🇱🇧#6256 | https://github.com/Hadi-Koubeissi/ManageGift
  * @INFO
  * Please mention Him / !  HaDi KouBeIssI | 🇱🇧, when using this Code!
*/