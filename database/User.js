const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	id: { type: String },

	blacklisted: {
		type: Object, default: {
			status: false,
			reason: null
		}
	},

	pro: { type: Boolean, default: false },

	logged: { type: Object, default: {
		logged: false,
		date: null,
	}},

	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);