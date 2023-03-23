const { EmbedBuilder } = require("discord.js"),
    e = require("../../emojis.json");

module.exports = {
    name: 'configuration',
    description: 'Displays the current configuration of the bot',
    group: __dirname,
    owner: false,
    premium: false,
    run: async (client, interaction, guildData, lang) => {

        const enabled = e.on,
            disabled = e.off;

        const mentionstatus = guildData.plugins.mention.enabled ? enabled : disabled,
            setdm = guildData.plugins.dmwinners.enabled ? enabled : disabled,
            setrolerl = guildData.plugins.role.role ? `<@&${guildData.plugins.role.role}>` : lang.config.norole,
            setrolestatus = guildData.plugins.role.enabled ? enabled : disabled;

        const configembed = new EmbedBuilder()
            .setAuthor({ name: interaction.guild.name + " " + lang.config.configuration })
            .addFields({ name: lang.config.language, value: guildData.language, inline: true })
            .addFields({ name: lang.config.mentiont, value: lang.config.status + mentionstatus, inline: true })
            .addFields({ name: lang.config.setdmt, value: lang.config.status + setdm, inline: true })
            .addFields({ name: lang.config.setrolet, value: lang.config.setrolede + setrolerl + "\n" + lang.config.status + setrolestatus, inline: true })
            .setImage("https://b.top4top.io/p_2534jc6x11.png")
            .setColor(client.config.embeds.color)
            .setFooter({ text: client.config.embeds.footers })
            interaction.reply({ embeds: [configembed] })
    }
};