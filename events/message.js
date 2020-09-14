let cd = new Set(), cdseconds = 5;

module.exports = (client, message) => {
 if(message.author.bot || !message.guilg)return;
  //for cooldown & blacklist
  let language = client.db.fetch(`language_${message.guild.id}`);
  if (!language) language = config.basiclang;
  const lang = require(`../language/${language}`);

  //for setprefix command 
  let prefix;
  let prefixes = client.db.fetch(`prefix_${message.guild.id}`);
  (!prefixes) ? (prefix = config.prefix) : (prefix = prefixes);
  
  //now we done prefix fetching for guilds
  if (!message.content.startsWith(prefix)) return;

  //Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g), commandName = args.shift().toLowerCase();
  //Grab the command data from the client.commands Enmap
  const command = client.commands.get(commandName);

  //If that command doesn't exist, silently exit and do nothing
  if (!command) return;

  //cooldown
  if (cd.has(message.author.id)) {
    message.delete();
    return message.channel.send(lang.cooldown.err).then(msg => msg.delete({ timeout: 6000 }).catch(()=> {/* Lol */}));
  }
  cd.add(message.author.id);
  setTimeout(() => cd.delete(message.author.id), cdseconds * 1000);
  //blacklist
  let blacklist = client.db.fetch(`blacklist_${message.author.id}`)
  if (blacklist === "Blacklisted") return message.reply(lang.blacklist.blacklist)
  
  //log for any user run command
  console.log(`${message.author.username} id:(${message.author.id}) Use a command ${commandName}`);
  /* Really u don't need t ouse this >_<
     client.channels.cache.get(client.config.logs.command).send(`> **${message.author.username}** iD:(\`${message.author.id}\`) **Use a command** \`${commandName}\``);
  */
 
  //Run the command
  command.run(client, message, args, lang);
};
