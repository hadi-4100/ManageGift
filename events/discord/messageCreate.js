const { EmbedBuilder } = require("discord.js"),
  config = require("../../config");

module.exports = async (client, message) => {
  if (message.author.bot) return;

  // Handle DMs and fetch guild data safely
  let guildData = null;
  if (message.guild) {
    guildData = await client
      .findOrCreateGuild({ id: message.guild.id })
      .catch(() => null);
  }

  // Load language with fallback
  let lang;
  try {
    const language =
      guildData?.language || client.config.basiclang || "english";
    lang = require(`../../language/${language}`);
  } catch (err) {
    lang = require("../../language/english");
  }

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    const embed = new EmbedBuilder()
      .setTitle(lang?.moved?.update || "Update!")
      .setAuthor({
        name: "ManageGift",
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(
        lang?.moved?.slash ||
          "From version v4.0.0 onwards ManageGift moved to slash commands! Please type /help to see all commands!"
      )
      .setColor(config.embeds.color)
      .setTimestamp()
      .setFooter({ text: config.embeds.footers });

    message.reply({ embeds: [embed] }).catch(() => null);
  }
};
