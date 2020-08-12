module.exports = (client) => {
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users!`);
        // Bot status 
        const status = require("../config.js").status,
        version = require("../package.json").version;
        let i = 0;
        setInterval(function(){
            let toDisplay = status[parseInt(i, 10)].name.replace("{server}", client.guilds.cache.size)+" | v"+version;
            client.user.setActivity(toDisplay, {type: status[parseInt(i, 10)].type});
            if(status[parseInt(i+1, 10)]) i++
            else i = 0;
        }, 20000);//20 seconde
};