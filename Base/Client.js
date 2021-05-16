/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
const { Client, Collection } = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways"),
	giveawayModel = require("./Giveaway");

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
	// This function is called when the manager needs to get all giveaways which are stored in the database.
	async getAllGiveaways() {
		// Get all giveaways from the database. We fetch all documents by passing an empty condition.
		return await giveawayModel.find({});
	}

	// This function is called when a giveaway needs to be saved in the database.
	async saveGiveaway(messageID, giveawayData) {
		// Add the new giveaway to the database
		await giveawayModel.create(giveawayData);
		// Don't forget to return something!
		return true;
	}

	// This function is called when a giveaway needs to be edited in the database.
	async editGiveaway(messageID, giveawayData) {
		// Find by messageID and update it
		await giveawayModel.findOneAndUpdate({ messageID: messageID }, giveawayData).exec();
		// Don't forget to return something!
		return true;
	}

	// This function is called when a giveaway needs to be deleted from the database.
	async deleteGiveaway(messageID) {
		// Find by messageID and delete it
		await giveawayModel.findOneAndDelete({ messageID: messageID }).exec();
		// Don't forget to return something!
		return true;
	}
};

class ManageGift extends Client {
	constructor(options) {
		super(options);
		this.config = require("../config.js");
		this.logger = require("../modules/Logger"); // Used to beautify the appearance ofor log.
		this.guildsData = require("./Guild"); // Used to store prefixes, languages, etc...
		this.usersData = require("./User"); // Used to store blacklisted user, pro user etc... 
		this.commands = new Collection();
		this.aliases = new Collection();
		this.manager = new GiveawayManagerWithOwnDatabase(this, {
			updateCountdownEvery: 5000,
			default: {
				botsCanWin: false,
				exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
				embedColor: "#ff4230",
				embedColorEnd: "#ff0000",
				reaction: this.config.giveaway.reaction
			},
		});
	}

	// This function is used to find a guild data or create it
	async findOrCreateGuild(param, isLean) {
		const Guild = this.guildsData;
		return new Promise(
			async function (resolve, reject) {
				let guild = (isLean ? await Guild.findOne(param).lean() : await Guild.findOne(param));
				if (guild) {
					resolve(guild);
				} else {
					guild = new Guild(param);
					await guild.save();
					resolve(isLean ? guild.toJSON() : guild);
				}
			});
	}
	// This function is used to find a user data or create it
	async findOrCreateUser(param, isLean) {
		const User = this.usersData;
		return new Promise(
			async function (resolve, reject) {
				let user = (isLean ? await User.findOne(param).lean() : await User.findOne(param));
				if (user) {
					resolve(user);
				} else {
					user = new User(param);
					await user.save();
					resolve(isLean ? user.toJSON() : user);
				}
			});
	}
}
module.exports = ManageGift;