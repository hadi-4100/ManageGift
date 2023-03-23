const mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	config = require("../config.js");
module.exports = mongoose.model("Guild", new Schema({

	id: { type: String },

	language: { type: String, default: config.basiclang },

	plugins: {
		type: Object, default: {
			mention: {
				enabled: false
			},
			role: {
				enabled: false,
				role: null,
			},
			dmwinners: {
				enabled: false
			}
		}
	},

	blacklisted: {
		type: Object, default: {
			status: false,
			reason: null
		}
	},

	premium: { type: Boolean, default: false }
}));