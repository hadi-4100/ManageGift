const config = require("./config.js");
const mongoose = require("mongoose");
const { readdir } = require("fs").promises;
const Client = require("./Base/Client.js");
const client = new Client();

// creating an empty array for registering slash commands
client.register_arr = [];

const init = async () => {
  /* Load all slash commands */
  const commandFolders = await readdir("./commands/");
  for (const dir of commandFolders) {
    const commandFiles = await readdir(`./commands/${dir}/`);
    for (const file of commandFiles) {
      if (!file.endsWith(".js")) continue;
      const props = require(`./commands/${dir}/${file}`);
      const commandName = file.split(".")[0];

      client.interactions.set(commandName, {
        name: commandName,
        ...props,
      });

      // Filter properties for registration
      client.register_arr.push({
        name: commandName,
        description: props.description,
        options: props.options,
        defaultPermission: props.default_permission,
        type: props.type,
      });

      client.log(`[📕] Command loaded: ${commandName}!`, "cmd");
    }
  }

  /* Load discord events */
  const discordEvents = await readdir("./events/discord");
  for (const file of discordEvents) {
    if (!file.endsWith(".js")) continue;
    const event = require(`./events/discord/${file}`);
    const eventName = file.split(".")[0];
    client.log(`(👌) Event loaded : ${eventName} !`, "event");
    client.on(eventName, (...args) => event(client, ...args));
    // Note: Deleting cache is usually only needed for hot-reloading
  }

  /* Load Giveaway events */
  const giveawayEvents = await readdir("./events/giveaways");
  for (const file of giveawayEvents) {
    if (!file.endsWith(".js")) continue;
    const event = require(`./events/giveaways/${file}`);
    const eventName = file.split(".")[0];
    client.log(`(👌) Giveaway event loaded : ${eventName} !`, "event");
    client.manager.on(eventName, (...args) => event(client, ...args));
  }

  // Connect to mongoose database
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(config.mongoDB, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    client.log("Connected to the Mongodb database.", "done");
  } catch (err) {
    client.log(
      `Unable to connect to the Mongodb database. Error: ${err}`,
      "error"
    );
  }

  // Login to bot
  await client.login(config.token);
};

init();

client
  .on("disconnect", () => client.log("Bot is disconnecting...", "warn"))
  .on("reconnecting", () => client.log("Bot reconnecting...", "log"))
  .on("error", (e) => client.log(e, "error"))
  .on("warn", (info) => client.log(info, "warn"));

// For any unhandled errors
process.on("unhandledRejection", (err) => {
  client.log(`Unhandled Rejection: ${err.stack}`, "error");
});

process.on("uncaughtException", (err) => {
  client.log(`Uncaught Exception: ${err.stack}`, "error");
});
