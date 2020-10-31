const config = require('../../config')
function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
exports.run = (client, message, args) => {
    if (message.author.id !== client.config.owner.id) return message.channel.send(`❌ | this command only for Owner the bot`)
    const content = message.content.split(" ").slice(1).join(" ");
    const result = new Promise((resolve, reject) => resolve(eval(content)));
    
    return result.then((output) => {
        if(typeof output !== "string"){
            output = require("util").inspect(output, { depth: 0 });
        }
        if(output.includes(message.client.config.token)){
            output = output.replace(message.client.token, "T0K3N");
        }
        message.channel.send(output, {
            code: "js"
        });
    }).catch((err) => {
        err = err.toString();
        if(err.includes(message.client.config.token)){
            err = err.replace(message.client.config.token, "T0K3N");
        }
        message.channel.send(err, {
            code: "js"
        });
    });

}
