const { ActivityType } = require("discord.js");
const register = require("../../utils/slashsync");
const moment = require("moment");

module.exports = async (client) => {
  // Register slash commands
  try {
    const commandsToRegister = client.register_arr.map((command) => ({
      name: command.name,
      description: command.description,
      options: command.options,
      type: 1, // ChatInput
    }));

    await register(client, commandsToRegister, { debug: false });
    client.log("Slash commands synchronized.", "done");
  } catch (error) {
    client.log(`Failed to sync slash commands: ${error.message}`, "error");
  }

  // Set start time on client
  client.startAt = moment().format("DD/MM/YYYY, HH:mm:ss");

  const totalUsers = client.guilds.cache.reduce(
    (acc, guild) => acc + guild.memberCount,
    0
  );
  client.log(
    `${client.user.tag} is online! Serving ${totalUsers} users in ${client.guilds.cache.size} servers.`,
    "ready"
  );

  // Presence Update Loop
  const statusConfig = client.config.status;
  const version = require("../../package.json").version;
  let statusIndex = 0;

  const updatePresence = () => {
    const activeGiveaways = client.manager.giveaways.filter(
      (g) => !g.ended && !g.pauseOptions.isPaused
    ).length;

    const currentStatus = statusConfig[statusIndex];
    if (!currentStatus) {
      statusIndex = 0;
      return;
    }

    const statusText = currentStatus.name
      .replace("{guild}", client.guilds.cache.size)
      .replace("{version}", version)
      .replace("{total_giveaways}", client.manager.giveaways.length)
      .replace("{ac_giveaways}", activeGiveaways);

    client.user.setPresence({
      activities: [
        {
          name: statusText,
          type: currentStatus.type || ActivityType.Playing,
        },
      ],
      status: "online",
    });

    statusIndex = (statusIndex + 1) % statusConfig.length;
  };

  // Initial update and interval
  updatePresence();
  setInterval(updatePresence, 60000); // Update every minute to avoid rate limits

  // Load the dashboard if it exists
  if (client.dashboard) {
    client.dashboard.load(client);
  }
};
