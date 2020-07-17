const config = require('../config');
const db = require('quick.db');

module.exports = (client, message) => {

  //for setprefix command 
  let prefix;
  let prefixes = db.fetch(`prefix_${message.guild.id}`);
  if(prefixes == null) {
    prefix = config.prefix 
  } else {
    prefix = prefixes;
  }
  
  //now we done prefix fetching for guilds
  if (!message.content.startsWith(prefix) || !message.guild) return;

  //Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  //If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  //Run the command
  cmd.run(client, message, args);
};