const mongoose = require("mongoose"),
	config = require("../../config");

module.exports = mongoose.model("Guild", new mongoose.Schema({

	id: { type: String }, //ID of the guild
	prefix: { type: String, default: config.prefix },

}));