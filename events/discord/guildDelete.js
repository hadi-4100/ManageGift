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
      const leaveLog = new EmbedBuilder()
        .addFields(
          { name: `**${e.leave} Alert**`, value: `> Type: \`Leave\`` },
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

      await webhookClient.send({ embeds: [leaveLog] }).catch(() => null);
    }

    client.log(`Bot removed from guild: ${guild.name} (${guild.id})`, "warn");
  } catch (error) {
    client.log(`Error in guildDelete event: ${error.message}`, "error");
  }
};
