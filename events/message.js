module.exports = (client, message) => {
  if(!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) { return; }
  if(message.author.bot) return;
  if(message.content.indexOf(client.config.prefix) !== 0) return;
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};