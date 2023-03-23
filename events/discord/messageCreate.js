const { EmbedBuilder } = require("discord.js"),
  config = require("../../config");
module.exports = async (client, message) => {
 
  //get data language of server
  const guildData = await client.findOrCreateGuild({ id: message.guild.id }),
    language = guildData.language,
    lang = require(`../../language/${language}`);

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    let embed = new EmbedBuilder()
      .setTitle(lang.moved.update)
      .setAuthor({ name: "ManageGift", iconURL: client.user.displayAvatarURL() })
      .setDescription(lang.moved.slash)
      .setColor(config.embeds.color)
      .setTimestamp()
      .setFooter({ text: config.embeds.footers })
    message.reply({ embeds: [embed] });
  }
}