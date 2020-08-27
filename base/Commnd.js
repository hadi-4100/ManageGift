class Command {
    constructor(client, {
      name = null,
      description = false,
      usage = false,
      enabled = true,
      aliases = new Array(),
      botpermissions = new Array(),
      examples = false,
      owner = false
    }) {
      this.client = client;
      this.conf = { enabled, aliases, botpermissions, owner};
      this.help = { name, description, usage, examples };
    }
  }
  module.exports = Command;