/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema for giveaways
module.exports = mongoose.model("giveaways", new Schema({
	messageID: String,
	channelID: String,
	guildID: String,
	startAt: Number,
	endAt: Number,
	ended: Boolean,
	winnerCount: Number,
	prize: String,
	messages: {
		giveaway: String,
		giveawayEnded: String,
		inviteToParticipate: String,
		timeRemaining: String,
		winMessage: String,
		embedFooter: String,
		noWinner: String,
		winners: String,
		endedAt: String,
		hostedBy: String,
		units: {
			seconds: String,
			minutes: String,
			hours: String,
			days: String,
			pluralS: Boolean,
		},
	},
	hostedBy: String,
	winnerIDs: [],
	reaction: mongoose.Mixed,
	botsCanWin: Boolean,
	embedColor: mongoose.Mixed,
	embedColorEnd: mongoose.Mixed,
	exemptPermissions: [],
	exemptMembers: String,
	extraData: {
		ConfigRole: String,
	},
	bonusEntries: String,
	lastChance: {
		enabled: Boolean,
		content: String,
		threshold: Number,
		embedColor: mongoose.Mixed
	}
}));