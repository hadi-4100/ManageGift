const Discord = require("discord.js"),
    { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js"),
    Table = require("easy-table"),
    e = require("../../emojis.json");
const { collection } = require("../../database/Giveaway");

module.exports = {
    name: 'blacklist',
    description: 'blacklist a server or user',
    group: __dirname,
    owner: true,
    premium: false,

    options: [
        {
            name: "user",
            description: "Add a user to the blacklist",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "id",
                    description: "The user id to blacklisted",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "reason",
                    description: "reason to blacklist user",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                }
            ]
        },
        {
            name: "server",
            description: "Add a server to the blacklist",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "id",
                    description: "The server id to blacklisted",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "reason",
                    description: "reason to blacklist server",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                }
            ]
        },
        {
            name: "list",
            description: "List all the blacklisted users",
            type: Discord.ApplicationCommandOptionType.Subcommand
        },
        {
            name: "remove",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            description: "Remove a user or guild from the blacklist",
            options: [
                {
                    name: "user_id",
                    description: "The user to remove from the blacklist",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "server_id",
                    description: "The server to remove from the blacklist",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        }
    ],

    run: async (client, interaction, guildData, lang) => {

        const action = interaction.options.getSubcommand();

        switch (action) {

            case "user": {

                const id = interaction.options.getString("id");
                const reason_ = interaction.options.getString("reason") || "None Reason Provided.";

                const user = await client.users.fetch(id).catch((err) => {
                    /* Error */
                    return interaction.reply(`${e.error} | An error occurred.`)
                });

                var userData = await client.findOrCreateUser({ id: user.id });

                if (userData.blacklisted.status === true) {
                    return interaction.reply(`${e.error} | This user **${user.username}** is already in \`blacklist\``)
                }

                userData.blacklisted.status = true;
                userData.blacklisted.reason = reason_;
                userData.markModified("blacklisted");

                await userData.save();

                interaction.reply(`${e.add} | Successfully added **${user.username}** in blacklist, \`Reason:\` **${reason_}**`)
                break;
            }

            case "server": {

                const id = interaction.options.getString("id");
                const reason_ = interaction.options.getString("reason") || "None Reason Provided.";

                const server = await client.guilds.fetch(id).catch((err) => {
                    /* Error */
                    return interaction.reply(`${e.error} | An error occurred.`)
                });

                var serverData = await client.findOrCreateGuild({ id: server.id });

                if (serverData.blacklisted.status === true) {
                    return interaction.reply(`${e.error} | This server **${server.name}** is already in \`blacklist\``)
                }

                serverData.blacklisted.status = true;
                serverData.blacklisted.reason = reason_;
                serverData.markModified("blacklisted");

                await serverData.save();

                interaction.reply(`${e.add} | Successfully added **${server.name}** in blacklist, \`Reason:\` **${reason_}**`)
                break;
            }

            case "list": {

                const button = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('user')
                            .setLabel("user")
                            .setEmoji('<:requirements:1026233552003674162>')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId('server')
                            .setLabel("server")
                            .setEmoji('<:h1:661140050054086659>')
                            .setStyle(ButtonStyle.Primary)
                    );

                await interaction.reply({ content: "\`\`\`Click below to choose the type you want to see.\`\`\`", components: [button] });

                const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

                collector.on('collect', async i => {
                    if (i.user.id !== interaction.user.id) {
                        interaction.reply({ content: `${e.error} | error you cant use this`, ephemeral: true });
                        return;
                    }

                    if (i.customId === 'user') {

                        const users = await client.usersData.find({ "blacklisted.status": true }).lean(),
                            userlist = users.map((u) => {
                                return {
                                    id: u.id,
                                    reason: u.blacklisted.reason
                                }
                            });

                        const t = new Table
                        for (const u of userlist) {
                            t.cell('Id', u.id);
                            t.cell('Reason', u.reason);
                            t.newRow()
                        }

                        await interaction.editReply({ content: t.toString(), components: [] })
                    }

                    if (i.customId === 'server') {

                        const servers = await client.guildsData.find({ "blacklisted.status": true }).lean(),
                            serverlist = servers.map((s) => {
                                return {
                                    id: s.id,
                                    reason: s.blacklisted.reason
                                }
                            });

                        const t = new Table
                        for (const s of serverlist) {
                            t.cell('Id', s.id);
                            t.cell('Reason', s.reason);
                            t.newRow()
                        }

                        await interaction.editReply({ content: t.toString(), components: [] })
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
                break;
            }

            case "remove": {

                const userid = interaction.options.getString("user_id");
                const serverid = interaction.options.getString("server_id");

                if (userid) {
                    const user = await client.users.fetch(userid).catch((err) => {
                        /* Error */
                        return interaction.reply(`${e.error} | An error occurred.`)
                    });

                    var userData = await client.findOrCreateUser({ id: user.id });

                    if (userData.blacklisted.status === false) {
                        return interaction.reply(`${e.error} | This user **${user.username}** isn't on the \`blacklist\``)
                    }

                    userData.blacklisted.status = false;
                    userData.blacklisted.reason = null;
                    userData.markModified("blacklisted");

                    await userData.save();

                    interaction.reply(`<:h3:661140977968480256> | This user **${user.username}** has been removed from the \`blacklist\``)
                } else
                    if (serverid) {
                        const server = await client.guilds.fetch(serverid).catch((err) => {
                            /* Error */
                            return interaction.reply(`${e.error} | An error occurred.`)
                        });

                        var serverData = await client.findOrCreateGuild({ id: server.id });

                        if (serverData.blacklisted.status === false) {
                            return interaction.reply(`${e.error} | This server **${server.name}** isn't on the \`blacklist\``)
                        }

                        serverData.blacklisted.status = false;
                        serverData.blacklisted.reason = null;
                        serverData.markModified("blacklisted");

                        await serverData.save();

                        interaction.reply(`<:h3:661140977968480256> | This server **${server.name}** has been removed from the \`blacklist\``)
                    } else
                        return interaction.reply(`${e.error} | select what you want`)
                break;
            }
        }
    }
};