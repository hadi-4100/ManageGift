const { EmbedBuilder, WebhookClient } = require("discord.js");
const { embeds, webhooklogs } = require("../../config");
const e = require("../../emojis.json");

const webhookClient = webhooklogs.join_leave
  ? new WebhookClient({ url: webhooklogs.join_leave })
  : null;

module.exports = async (client, guild) => {
  try {
    const owner = await guild.fetchOwner().catch(() => null);

    if (webhookClient) {
      const joinLog = new EmbedBuilder()
        .addFields(
          { name: `**${e.join} Alert**`, value: `> Type: \`Join\`` },
          {
            name: `**${e.dis} Server Info**`,
            value: `> Name: \`${guild.name}\`\n> ID: \`${
              guild.id
            }\`\n> Owner: \`${owner?.user.username || "Unknown"}\` (${
              owner?.id || "N/A"
            })`,
          }
        )
        .setColor("#303135")
        .setFooter({ text: embeds.footers });

      await webhookClient.send({ embeds: [joinLog] }).catch(() => null);
    }

    client.log(`Joined new guild: ${guild.name} (${guild.id})`, "done");
  } catch (error) {
    client.log(`Error in guildCreate event: ${error.message}`, "error");
  }
};
