const {
  EmbedBuilder,
  WebhookClient,
  MessageFlags,
  Collection,
} = require("discord.js");
const { owners, embeds, webhooklogs } = require("../../config");
const e = require("../../emojis.json");

// Cooldowns collection
const cooldowns = new Collection();
const DEFAULT_COOLDOWN = 5;

// Shared WebhookClient if URL is provided
const cmdWebhook = webhooklogs.cmd
  ? new WebhookClient({ url: webhooklogs.cmd })
  : null;

module.exports = async (client, interaction) => {
  // Check if our interaction is a slash command
  if (!interaction.isChatInputCommand()) return;

  const command = client.interactions.get(interaction.commandName);
  if (!command) {
    return interaction.reply({
      content: `Command \`${interaction.commandName}\` not found.`,
      flags: MessageFlags.Ephemeral,
    });
  }

  // Fetch data concurrently, handling possible DM interactions
  let guildData = null;
  let userData = null;
  try {
    [guildData, userData] = await Promise.all([
      interaction.guild
        ? client.findOrCreateGuild({ id: interaction.guild.id })
        : Promise.resolve(null),
      client.findOrCreateUser({ id: interaction.user.id }),
    ]);
  } catch (err) {
    client.log(`Database error during interaction: ${err.message}`, "error");
  }

  // Load language with fallback
  let lang;
  try {
    const language =
      guildData?.language || client.config.basiclang || "english";
    lang = require(`../../language/${language}`);
  } catch (err) {
    client.log(
      `Failed to load language "${guildData?.language}". Defaulting to English.`,
      "warn"
    );
    lang = require("../../language/english");
  }

  // Final safety check for lang
  if (!lang) {
    return interaction.reply({
      content: "An internal error occurred while loading language files.",
      flags: MessageFlags.Ephemeral,
    });
  }

  // Ensure guildData exists for guild-specific checks
  if (interaction.guild && !guildData) {
    return interaction.reply({
      content: "Failed to fetch server data. Please try again.",
      flags: MessageFlags.Ephemeral,
    });
  }

  // Cooldown handling
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || DEFAULT_COOLDOWN) * 1000;

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
    if (now < expirationTime) {
      return interaction.reply({
        content: lang.cmd.cooldown,
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  // Check if the command is enabled in this guild
  if (guildData?.commands) {
    const commands = guildData.commands;
    const statusData =
      commands instanceof Map
        ? commands.get(interaction.commandName)
        : commands[interaction.commandName];

    const commandStatus =
      typeof statusData === "object" ? statusData?.status : statusData;

    if (commandStatus === false) {
      return interaction.reply({
        content: lang.cmd.notactive,
        flags: MessageFlags.Ephemeral,
      });
    }

    if (guildData.blacklisted?.status) {
      return interaction.reply({
        content: lang.blacklist.guild(guildData.blacklisted.reason),
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  // Blacklist check
  if (userData?.blacklisted?.status) {
    return interaction.reply({
      content: lang.blacklist.user(userData.blacklisted.reason),
      flags: MessageFlags.Ephemeral,
    });
  }

  // Owner only check
  if (command.owner && !owners.includes(interaction.user.id)) {
    return interaction.reply({
      content: lang.cmd.owneronly,
      flags: MessageFlags.Ephemeral,
    });
  }

  // Run command and logging in parallel-ish (logging in background)
  try {
    // Background logging to avoid blocking the 3s window
    (async () => {
      try {
        if (cmdWebhook && interaction.guild) {
          const owner = await interaction.guild.fetchOwner().catch(() => null);
          const cmdLogEmbed = new EmbedBuilder()
            .addFields(
              {
                name: `**${e.avatar} User Info**`,
                value: `> Tag: \`${interaction.user.username}\`\n> ID: \`${interaction.user.id}\``,
              },
              {
                name: `**${e.pin} Command**`,
                value: `> Name: \`${interaction.commandName}\``,
              },
              {
                name: `**${e.dis} Server Info**`,
                value: `> Name: \`${interaction.guild.name}\`\n> ID: \`${
                  interaction.guild.id
                }\`\n> Owner: \`${owner?.user.username || "Unknown"}\` (${
                  owner?.id || "N/A"
                })`,
              }
            )
            .setColor("#303135")
            .setFooter({ text: embeds.footers });

          cmdWebhook.send({ embeds: [cmdLogEmbed] }).catch(() => null);
        }

        const log = new client.logs({
          commandName: interaction.commandName,
          author: { username: interaction.user.tag, id: interaction.user.id },
          guild: interaction.guild
            ? { name: interaction.guild.name, id: interaction.guild.id }
            : { name: "Direct Message", id: "DM" },
        });
        await log.save();

        const location = interaction.guild
          ? `in ${interaction.guild.name}`
          : "in DMs";
        client.log(
          `${interaction.user.username} (${interaction.user.id}) used /${interaction.commandName} ${location}`,
          "log"
        );
      } catch (logErr) {
        client.log(`Background logging error: ${logErr.message}`, "warn");
      }
    })();

    // Run the command immediately
    await command.run(client, interaction, guildData, lang);
  } catch (error) {
    client.log(
      `Error executing ${interaction.commandName}: ${error.stack}`,
      "error"
    );
    if (interaction.replied || interaction.deferred) {
      await interaction
        .followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        })
        .catch(() => null);
    } else {
      await interaction
        .reply({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        })
        .catch(() => null);
    }
  }
};
