const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema for giveaways
module.exports = mongoose.model("giveaways", new Schema({
		messageId: String,
		channelId: String,
		guildId: String,
		startAt: Number,
		endAt: Number,
		ended: Boolean,
		winnerCount: Number,
		prize: String,
		messages: {
			giveaway: String,
			giveawayEnded: String,
			content1: String,
			content2: String,
			content3: String,
			requirements: String,
			rolereq: String,
			serverreq: String,
			end1: String,
			end2: String,
			end3: String,
			novalid1: String,
			novalid2: String,
			drop: String,
			dropstart: String,
			dropend: String,
			winMessage: {
				content: String,
			},
			embedFooter: mongoose.Mixed,
			dropfooter: String,
			novalidfoo: String,
			noWinner: String,
			winners: String,
			approved1: String,
			approved2: String,
			endedAt: String,
			hostedBy: String
		},
		thumbnail: String,
		image: String,
		hostedBy: String,
		winnerIds: { type: [String], default: undefined },
		reaction: mongoose.Mixed,
		botsCanWin: Boolean,
		embedColor: mongoose.Mixed,
		embedColorEnd: mongoose.Mixed,
		exemptPermissions: { type: [], default: undefined },
		exemptMembers: String,
		bonusEntries: String,
		extraData: mongoose.Mixed,
		lastChance: {
			enabled: Boolean,
			content: String,
			threshold: Number,
			embedColor: mongoose.Mixed
		},
		pauseOptions: {
			isPaused: Boolean,
			content: String,
			unPauseAfter: Number,
			embedColor: mongoose.Mixed,
			durationAfterPause: Number,
			infiniteDurationText: String
		},
		isDrop: Boolean,
		allowedMentions: {
			parse: { type: [String], default: undefined },
			users: { type: [String], default: undefined },
			roles: { type: [String], default: undefined }
		}
	},
	{ id: false }
));