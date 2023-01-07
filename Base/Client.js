const Discord = require("discord.js"),
	{ Client, EmbedBuilder } = require("discord.js");

const { GiveawaysManager } = require("discord-giveaways"),
	giveawayModel = require("../database/Giveaway");

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
	// This function is called when the manager needs to get all giveaways which are stored in the database.
	async getAllGiveaways() {
		// Get all giveaways from the database. We fetch all documents by passing an empty condition.
		return await giveawayModel.find().lean().exec();
	}

	// This function is called when a giveaway needs to be saved in the database.
	async saveGiveaway(messageId, giveawayData) {
		// Add the new giveaway to the database
		await giveawayModel.create(giveawayData);
		// Don't forget to return something!
		return true;
	}

	// This function is called when a giveaway needs to be edited in the database.
	async editGiveaway(messageId, giveawayData) {
		// Find by messageId and update it
		await giveawayModel.updateOne({ messageId }, giveawayData).exec();
		// Don't forget to return something!
		return true;
	}

	// This function is called when a giveaway needs to be deleted from the database.
	async deleteGiveaway(messageId) {
		// Find by messageId and delete it
		await giveawayModel.deleteOne({ messageId }).exec();
		// Don't forget to return something!
		return true;
	}

	/**
	 * Generate an embed displayed when a giveaway is ended and when there is no valid participant
	 * @param {Giveaway} giveaway The giveaway the embed needs to be generated for
	 * @returns {Discord.EmbedBuilder} The generated embed
	 */
	generateMainEmbed(giveaway, lastChanceEnabled) {
		const mainembed = new EmbedBuilder()
			.setAuthor({ name: giveaway.prize })
			.setTitle(giveaway.isDrop ? null : giveaway.pauseOptions.isPaused ? giveaway.pauseOptions.content : lastChanceEnabled ? giveaway.lastChance.content : null)
			.setDescription(
				giveaway.isDrop
					?
					giveaway.messages.dropMessage
					+
					"\n"
					+
					giveaway.messages.content2.replace('{winners}', giveaway.winnerCount)
					+
					"\n"
					+
					giveaway.messages.hostedBy.replace(`{hostedBy}`, giveaway.hostedBy)
					: (giveaway.messages.content1
						+
						"\n"
						+
						giveaway.messages.content2.replace('{winners}', giveaway.winnerCount)
						+
						"\n"
						+
						giveaway.messages.content3.replace(
							'{time}',
							giveaway.endAt === Infinity
								? giveaway.pauseOptions.infiniteDurationText
								: `<t:${Math.round(giveaway.endAt / 1000)}:R>`
						)
						+
						"\n"
						+
						giveaway.messages.hostedBy.replace(`{hostedBy}`, giveaway.hostedBy)
					)
			)
			.setImage("https://b.top4top.io/p_2533c3xjg1.png")
			.setColor(
				giveaway.isDrop
					? giveaway.embedColor
					: giveaway.pauseOptions.isPaused && giveaway.pauseOptions.embedColor
						? giveaway.pauseOptions.embedColor
						: lastChanceEnabled
							? giveaway.lastChance.embedColor
							: giveaway.embedColor
			)
		if (!giveaway.isDrop) mainembed.setFooter({ text: giveaway.messages.embedFooter, iconURL: this.client.user.displayAvatarURL() })
		if (giveaway.isDrop) mainembed.setFooter({ text: giveaway.messages.dropfooter, iconURL: this.client.user.displayAvatarURL() })
		if (giveaway.extraData) {
			if (giveaway.extraData.required_role && !giveaway.extraData.required_server) {
				mainembed.addFields({ name: giveaway.messages.requirements, value: giveaway.messages.rolereq.replace('{rolereq}', giveaway.extraData.required_role) })
			}
			if (giveaway.extraData.required_server && !giveaway.extraData.required_role) {
				mainembed.addFields({ name: giveaway.messages.requirements, value: giveaway.messages.serverreq })
			}
			if (giveaway.extraData.required_server && giveaway.extraData.required_role) {
				mainembed.addFields({ name: giveaway.messages.requirements, value: giveaway.messages.rolereq.replace('{rolereq}', giveaway.extraData.required_role) + "\n" + giveaway.messages.serverreq })
			}
		}
		if (giveaway.endAt !== Infinity) mainembed.setTimestamp(giveaway.endAt);
		return mainembed;
	}

	/**
 * Generate an embed displayed when a giveaway is ended (with the winners list)
 * @param {Giveaway} giveaway The giveaway the embed needs to be generated for
 * @param {Discord.GuildMember[]} winners The giveaway winners
 * @returns {Discord.EmbedBuilder} The generated embed
 */
	generateEndEmbed(giveaway, winners) {
		const endembed = new EmbedBuilder()
			.setTitle(giveaway.isDrop ? giveaway.messages.drpend : giveaway.messages.end1)
			.setDescription(
				giveaway.messages.end2.replace('{prize}', giveaway.prize)
				+
				"\n"
				+
				giveaway.messages.end3.replace('{winners}', winners)
				+
				"\n"
				+
				giveaway.messages.hostedBy.replace(`{hostedBy}`, giveaway.hostedBy)
			)
			.setImage("https://b.top4top.io/p_2533c3xjg1.png")
			.setFooter({ text: giveaway.messages.embedFooter, iconURL: this.client.user.displayAvatarURL() })
			.setColor("#454DFC")
		if (giveaway.extraData) {
			if (giveaway.extraData.required_role) {
				endembed.addFields({ name: giveaway.messages.requirements, value: giveaway.messages.rolereq.replace('{rolereq}', giveaway.extraData.required_role) })
			}
		}
		if (giveaway.endAt !== Infinity) endembed.setTimestamp(giveaway.endAt);
		return endembed;
	}

	/**
 * Generate an embed displayed when a giveaway is ended and when there is no valid participant
 * @param {Giveaway} giveaway The giveaway the embed needs to be generated for
 * @returns {Discord.EmbedBuilder} The generated embed
 */
	generateNoValidParticipantsEndEmbed(giveaway) {
		const novalidembed = new EmbedBuilder()
			.setAuthor({ name: giveaway.prize })
			.setDescription(
				giveaway.messages.novalid1
				+
				"\n"
				+
				giveaway.messages.novalid2
				+
				"\n"
				+
				giveaway.messages.hostedBy.replace(`{hostedBy}`, giveaway.hostedBy)
			)
			.setImage("https://b.top4top.io/p_2533c3xjg1.png")
			.setFooter({ text: giveaway.messages.novalidfoo, iconURL: this.client.user.displayAvatarURL() })
			.setColor("#5c63e5")
		return novalidembed;
	}
};

class ManageGift extends Client {
	constructor(options) {
		super({
			intents: [
				Discord.GatewayIntentBits.Guilds,
				Discord.GatewayIntentBits.GuildMembers,
				Discord.GatewayIntentBits.GuildMessages,
				Discord.GatewayIntentBits.GuildMessageReactions
			]
		});
		this.config = require("../config.js");
		this.log = require("../utils/Logger"); // Used to beautify the appearance ofor log.
		this.guildsData = require("../database/Guild"); // Used to store prefixes, languages, etc...
		this.usersData = require("../database/User"); // Used to store blacklisted user, pro user etc... 
		this.logs = require("../database/Log"); // Log mongoose model
		this.interactions = new Discord.Collection();
		this.manager = new GiveawayManagerWithOwnDatabase(this, {
			default: {
				botsCanWin: false,
				embedColor: "#5C63E5",
				reaction: this.config.giveaway.reaction,
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