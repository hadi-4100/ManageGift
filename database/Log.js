const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    username: { type: String, default: "Unknown" },
    id: { type: String, default: null },
  },
  { _id: false }
);

const GuildSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Unknown" },
    id: { type: String, default: null },
  },
  { _id: false }
);

const LogSchema = new mongoose.Schema(
  {
    commandName: { type: String, default: "unknown" },
    author: { type: AuthorSchema, default: () => ({}) },
    guild: { type: GuildSchema, default: () => ({}) },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Log || mongoose.model("Log", LogSchema);
