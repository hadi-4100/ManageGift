const Discord = require('discord.js'),
  db = require('quick.db'),
  config = require('../../config');
exports.run = async (client, message, args) => {
  if (message.author.id !== client.config.OwnerID) return message.reply("you do not have permission to use this command!")
  const user = message.mentions.users.first()
  if (!user) return message.reply("❌ | **Please mention someone!**")

  if (user.id === message.author.id) {
    return message.reply("❌ | **You cannot give yourself a blacklist**");
  }

  let blacklist = await db.fetch(`blacklist_${user.id}`)

  if (blacklist === "Not") {
    db.set(`blacklist_${user.id}`, "Blacklisted")
    let embed = new Discord.MessageEmbed()
      .setTitle(':beginner: New User In Blacklist :beginner:')
      .setDescription(`:octagonal_sign: | ${user} has been blacklisted! \n By: ${message.author}`)
      .setColor('RED')
      .setFooter(client.config.embeds.footers)
      .setTimestamp()
    message.channel.send(embed)
  } else if (blacklist === "Blacklisted") {
    db.set(`blacklist_${user.id}`, "Not")
    let embed = new Discord.MessageEmbed()
      .setTitle(':beginner: New User Has Unblacklisted :beginner:')
      .setDescription(`:white_circle: | ${user} has been unblacklisted!`)
      .setColor('GREEN')
      .setFooter(client.config.embeds.footers)
      .setTimestamp()
    message.channel.send(embed)
  } else {
    db.set(`blacklist_${user.id}`, "Not")
    let embed = new Discord.MessageEmbed()
      .setDescription(`Set up data for ${user}!`)
    message.channel.send(embed)
  }
}