const config = require("../../config"),
    Discord = require("discord.js"),
    { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js"),
    path = require("path");

module.exports = {
    name: 'help',
    description: 'help for bot',
    group: __dirname,
    owner: false,
    premium: false,

    options: [
        {
            name: 'command',
            description: 'Shows details about how to use a command',
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        }
    ],
    run: async (client, interaction, guildData, lang) => {

        const helpcmd = interaction.options.getString('command');

        if (helpcmd) {
            const cmd = client.interactions.get(helpcmd)

            if (!cmd) {
                return interaction.reply(lang.help.errcmd)
            }

            const examples = lang[cmd.name].EXAMPLES,
                description = cmd.description
            categorie = cmd.group.split(path.sep)[parseInt(cmd.group.split(path.sep).length - 1, 10)];

            let commandhelp = new EmbedBuilder()
                .setAuthor({ name: lang.help.cmd_title(cmd.name) })
                .addFields({ name: lang.help.cmd_examples, value: examples })
                .addFields({ name: lang.help.cmd_description, value: description })
                .addFields({ name: lang.help.cmd_categorie, value: categorie })
                .setImage("https://b.top4top.io/p_2534jc6x11.png")
                .setColor(config.embeds.color)
                .setFooter({ text: config.embeds.footers, iconURL: interaction.user.displayAvatarURL() })
            interaction.reply({ embeds: [commandhelp] })
        } else {
            //Main Embed
            const version = require("../../package.json").version;
            let embed = new EmbedBuilder()
                .setTitle(lang.help.title)
                .setAuthor({ name: `ManageGift's | Version ${version}` })
                .setThumbnail("https://i.top4top.io/p_1603lgj9t1.gif")
                .setDescription(lang.help.disc)
                .addFields(
                    { name: lang.help.web, value: (`[Click Here](${config.links.web})`) },
                    { name: lang.help.inv, value: (`[Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`) },
                    { name: lang.help.vote, value: (`[Click Here](${config.links.vote})`) },
                    { name: lang.help.sup, value: (`[Click Here](${config.links.supportserver})`) },
                )
                .setTimestamp()
                .setImage("https://b.top4top.io/p_2534jc6x11.png")
                .setColor(config.embeds.color)
                .setFooter({ text: config.embeds.footers, iconURL: interaction.user.displayAvatarURL() })

            //Cancel Embed
            let embedd = new EmbedBuilder()
                .setTitle(lang.help.title)
                .setAuthor({ name: `ManageGift's | Version ${version}` })
                .setThumbnail("https://i.top4top.io/p_1603lgj9t1.gif")
                .addFields(
                    { name: lang.help.web, value: (`[Click Here](${config.links.web})`) },
                    { name: lang.help.inv, value: (`[Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`) },
                    { name: lang.help.vote, value: (`[Click Here](${config.links.vote})`) },
                    { name: lang.help.sup, value: (`[Click Here](${config.links.supportserver})`) },
                )
                .setTimestamp()
                .setImage("https://b.top4top.io/p_2534jc6x11.png")
                .setColor(config.embeds.color)
                .setFooter({ text: config.embeds.footers, iconURL: interaction.user.displayAvatarURL() })

            //Giveaway Embed
            let giveaway = new EmbedBuilder()
                .setAuthor({ name: `ManageGift | v${version}`, iconURL: client.user.displayAvatarURL() })
                .setTitle(lang.givcmd.givtit)
                .setColor(config.embeds.color)
                .setDescription(lang.givcmd.givfind)
                .addFields(
                    { name: 'create:', value: lang.givcmd.createe },
                    { name: 'drop:', value: lang.givcmd.dropee },
                    { name: 'delete:', value: lang.givcmd.deletee },
                    { name: 'edit:', value: lang.givcmd.editt },
                    { name: 'end:', value: lang.givcmd.endd },
                    { name: 'pause:', value: lang.givcmd.pausee },
                    { name: 'reroll:', value: lang.givcmd.rerolll },
                    { name: 'resume:', value: lang.givcmd.resumeee },
                )
                .setTimestamp()
                .setImage("https://b.top4top.io/p_2534jc6x11.png")
                .setFooter({ text: config.embeds.footers, iconURL: interaction.user.displayAvatarURL() })

            //Config Embed
            let configcmd = new EmbedBuilder()
                .setTitle(lang.cnfgcmd.cnfgtit)
                .setColor(config.embeds.color)
                .setDescription(lang.cnfgcmd.cnfgfind)
                .addFields(
                    { name: 'setlang:', value: lang.cnfgcmd.setlangg },
                    { name: 'setdm:', value: lang.cnfgcmd.setdmm },
                    { name: 'setmention:', value: lang.cnfgcmd.setmentionn },
                    { name: 'setrole:', value: lang.cnfgcmd.setrolee },
                )
                .setTimestamp()
                .setImage("https://b.top4top.io/p_2534jc6x11.png")
                .setFooter({ text: config.embeds.footers, iconURL: interaction.user.displayAvatarURL() })

            //Info Embed
            let info = new EmbedBuilder()
                .setTitle(lang.infocmd.infotit)
                .setColor(config.embeds.color)
                .setDescription(lang.infocmd.infofind)
                .addFields(
                    { name: `help:`, value: lang.infocmd.helpp },
                    { name: 'invite:', value: lang.infocmd.invitee },
                    { name: 'ping:', value: lang.infocmd.pingg },
                    { name: 'stats:', value: lang.infocmd.statss },
                    { name: 'configuration:', value: lang.infocmd.configg },
                )
                .setTimestamp()
                .setImage("https://b.top4top.io/p_2534jc6x11.png")
                .setFooter({ text: config.embeds.footers, iconURL: interaction.user.displayAvatarURL() })

            //Owner Embed
            let owner = new EmbedBuilder()
            .setTitle(lang.owner.tit)
            .setColor(config.embeds.color)
            .setDescription(lang.owner.ownerfind)
            .addFields(
                { name: `blacklist:`, value: lang.owner.blacklistt },
            )
            .setTimestamp()
            .setImage("https://b.top4top.io/p_2534jc6x11.png")
            .setFooter({ text: config.embeds.footers, iconURL: interaction.user.displayAvatarURL() })

            const components = (state) => [
                new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                        .setCustomId("help-menu")
                        .setPlaceholder("Please Select a Category")
                        .setDisabled(state)
                        .addOptions([
                            {
                                label: `Giveaways`,
                                value: `giveaway`,
                                description: lang.help.giveawaycmd,
                                emoji: `<:gift2:757541516708282429>`
                            },
                            {
                                label: `Config`,
                                value: `config`,
                                description: lang.help.configcmd,
                                emoji: `<:process:1021137913456640080>`
                            },
                            {
                                label: `Info`,
                                value: `info`,
                                description: lang.help.infocmd,
                                emoji: `<:info:714274664423358504>`
                            },
                            {
                                label: `Owner`,
                                value: `owner`,
                                description: lang.help.ownerbot,
                                emoji: `<:14:659428810520920124>`
                            },
                            {
                                label: lang.cancel.option1,
                                value: `cancel`,
                                description: lang.help.cancel,
                                emoji: `<:backk:1021855656879341659>`
                            }
                        ])
                ),
            ];

            //Send Main Embed
            await interaction.reply({ embeds: [embed], components: components(false) });

            const filter = (i) => interaction.user.id === i.user.id

            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 600000 });

            collector.on('collect', (interaction) => {
                if (interaction.values[0] === "giveaway") {
                    interaction.update({ embeds: [giveaway], components: components(false) }).catch((e) => { });
                }
                if (interaction.values[0] === "config") {
                    interaction.update({ embeds: [configcmd], components: components(false) }).catch((e) => { });
                }
                if (interaction.values[0] === "info") {
                    interaction.update({ embeds: [info], components: components(false) }).catch((e) => { });
                }
                if (interaction.values[0] === "owner") {
                    interaction.update({ embeds: [owner], components: components(false) }).catch((e) => { });
                }
                if (interaction.values[0] === "cancel") {
                    interaction.update({ embeds: [embedd], components: [] })
                }
            });

            collector.on('end', (collected, reason) => {
                const timeout = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("errortime")
                            .setLabel(lang.collector.btntime)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji("<:limit:1026224718048661577>")
                            .setDisabled(true)
                    );
                if (reason == "time") {
                    interaction.editReply({
                        components: [timeout],
                    });
                }
            });
        }
    }
};