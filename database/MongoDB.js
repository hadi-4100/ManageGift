const usersDB = require("./Schematics/User.js"),
	guildsDB = require("./Schematics/Guild.js");

//Create/find users Database
module.exports.getUserDB = async function(userID){

	let userDB = await usersDB.findOne({ id: userID });
	if(userDB){
		return userDB;
	} else {
		userDB = new usersDB({
			id: userID
		});
		await userDB.save().catch(err => console.log(err));
		return userDB;
	}
},

//Create/find guilds Databas
module.exports.getGuildDB = async function (guildID){

	let guildDB = guildsDB.findOne( { id: guildID } );
  
	if(guildDB){
		return guildDB;
	} else {
		guildDB = new guildsDB({
			id: guildID
		});
		await guildDB.save().catch(err => console.log(err));
		return guildDB;
	}
};