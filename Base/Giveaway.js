/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema for giveaways
const giveawaySchema = new mongoose.Schema({
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
	winnerIDs: [String],
	reaction: mongoose.Mixed,
	botsCanWin: Boolean,
	embedColor: mongoose.Mixed,
	embedColorEnd: mongoose.Mixed,
	exemptPermissions: [],
	bonusEntries: String,
	extraData: mongoose.Mixed,
	lastChance: {
		enabled: Boolean,
		content: String,
		threshold: Number,
		embedColor: mongoose.Mixed
	}
});

// Create the model
module.exports = mongoose.model("giveaways", giveawaySchema);