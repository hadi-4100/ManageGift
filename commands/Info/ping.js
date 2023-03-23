const emoji = require("../../emojis.json");
module.exports = {
    name: 'ping',
    description: 'Check my ping!',
    group: __dirname,
    owner: false,
    premium: false,
    run: async (client, interaction, guildData, lang) => {

        var messagePing = new Date().getTime() - interaction.createdTimestamp
        var apiPing = Math.round(client.ws.ping)
        await interaction.deferReply()

        let status;
        if (apiPing + messagePing > 500) {
            status = emoji.dnd
        } else if (apiPing + messagePing > 250) {
            status = emoji.afk
        } else {
            status = emoji.online
        }

        interaction.editReply(lang.ping.pingmsg(messagePing, apiPing, status));
    }
};