const config = require('../config'),
  db = require('quick.db');
let cd = new Set(),
  cdseconds = 5;

module.exports = (client, message) => {
  //for cooldown
  let language = db.fetch(`language_${message.guild.id}`)
  if (language === null) language = config.basiclang
  const lang = require(`../language/${language}.js`)

  //for setprefix command 
  let prefix;
  let prefixes = db.fetch(`prefix_${message.guild.id}`);
  if (prefixes == null) {
    prefix = config.prefix
  } else {
    prefix = prefixes;
  }

  //now we done prefix fetching for guilds
  if (!message.content.startsWith(prefix) || !message.guild) return;

  //Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  //Grab the command data from the client.commands Enmap
  const command = client.commands.get(commandName);

  //If that command doesn't exist, silently exit and do nothing
  if (!command) return;

  //cooldown
  if (cd.has(message.author.id)) {
    message.delete();
    return message.channel.send(lang.cooldown.err) .then(msg => { msg.delete({ timeout: 6000 })})
  }
  cd.add(message.author.id);
  setTimeout(() => {
    cd.delete(message.author.id)
  }, cdseconds * 1000)

  //log for any user run command
  console.log(`${message.author.username} id:(${message.author.id}) Use a command ${commandName}`)
  client.channels.cache.get(client.config.logs.command).send(`> **${message.author.username}** iD:(\`${message.author.id}\`) **Use a command** \`${commandName}\``);

  //Run the command
  command.run(client, message, args);
};