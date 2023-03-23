const config = require("../../config"),
    { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: 'invite',
    description: 'invite the bot',
    group: __dirname,
    owner: false,
    premium: false,
    run: async (client, interaction, guildData, lang) => {
        const links = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Invite")
                    .setEmoji('<:9_:659427030626205696>')
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setLabel("Website")
                    .setEmoji('<:7_:659426399391580221>')
                    .setURL(config.links.web)
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setLabel("Vote")
                    .setEmoji('<:vote:815172046157250560>')
                    .setURL(config.links.vote)
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setLabel("Support Server")
                    .setEmoji('<:25:659434281164210216>')
                    .setURL(config.links.supportserver)
                    .setStyle(ButtonStyle.Link),
            );
        let inviteembd = new EmbedBuilder()
            .setTitle(lang.invite.main)
            .setDescription(lang.invite.disc)
            .setImage("https://b.top4top.io/p_2534jc6x11.png")
            .setColor(client.config.embeds.color)
            .setFooter({ text: client.config.embeds.footers });
        interaction.reply({ embeds: [inviteembd], components: [links] })
    }
};