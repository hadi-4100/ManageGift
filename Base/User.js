const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	id: { type: String }, // USER ID
	
	/* 	FOR PRO USERS */ 
	pro: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);