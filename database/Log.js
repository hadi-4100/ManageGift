const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

module.exports = mongoose.model("Log", new Schema({

    commandName: { type: String, default: "unknown" },
    date: { type: String, default: new Date().toLocaleString() },
    author: {
        type: Object, default: {
            username: "Unknown",
            id: null
        }
    },
    guild: {
        type: Object, default: {
            name: "Unknown",
            id: null
        }
    }

}));