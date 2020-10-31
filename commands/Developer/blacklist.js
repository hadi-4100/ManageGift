const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  if (message.author.id !== client.config.owner.id) return message.reply("you do not have permission to use this command!");
  const user = message.mentions.users.first();
  if (!user) return message.reply("❌ | **Please mention someone!**");
  if (user.id === message.author.id)return message.reply("❌ | **You cannot give yourself a blacklist**");

let blacklist = await client.db.fetch(`blacklist_${user.id}`);
if (blacklist === "Not") {
client.db.set(`blacklist_${user.id}`, "Blacklisted")
message.channel.send(new MessageEmbed()
      .setTitle(':beginner: New User In Blacklist :beginner:')
      .setDescription(`:octagonal_sign: | ${user} has been blacklisted! \n By: ${message.author}`)
      .setColor('RED')
      .setFooter(client.config.embeds.footers)
      .setTimestamp());
  } else if (blacklist === "Blacklisted") {
    client.db.set(`blacklist_${user.id}`, "Not");
message.channel.send(new MessageEmbed()
      .setTitle(':beginner: New User Has Unblacklisted :beginner:')
      .setDescription(`:white_circle: | ${user} has been unblacklisted!`)
      .setColor('GREEN')
      .setFooter(client.config.embeds.footers)
      .setTimestamp());
  } else {
    client.db.set(`blacklist_${user.id}`, "Not");
message.channel.send(new MessageEmbed().setDescription(`Set up data for ${user}!`));
  }
}
