const emoji = require("../../emojis.json");

module.exports = {
  name: "ping",
  description: "Check my ping!",
  group: __dirname,
  run: async (client, interaction, guildData, lang) => {
    await interaction.deferReply();

    const messagePing = Date.now() - interaction.createdTimestamp;
    const apiPing =
      client.ws?.ping !== undefined && client.ws.ping !== -1
        ? client.ws.ping
        : null;
    const totalPing = apiPing !== null ? apiPing + messagePing : messagePing;

    let status = emoji.online;
    if (totalPing > 500) {
      status = emoji.dnd;
    } else if (totalPing > 250) {
      status = emoji.afk;
    }

    const apiPingDisplay = apiPing !== null ? apiPing : "N/A";

    await interaction.editReply({
      content: lang.ping.pingmsg(messagePing, apiPingDisplay, status),
    });
  },
};
