const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	id: { type: String },

	blacklisted: {
		type: Object, default: {
			status: false,
			reason: null
		}
	},

	pro: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);