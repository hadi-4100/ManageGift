const mongoose = require("mongoose");
const config = require("../config.js");

const PluginSchema = new mongoose.Schema(
  {
    mention: {
      enabled: { type: Boolean, default: false },
    },
    role: {
      enabled: { type: Boolean, default: false },
      role: { type: String, default: null },
    },
    dmwinners: {
      enabled: { type: Boolean, default: false },
    },
  },
  { _id: false }
);

const CommandSchema = new mongoose.Schema(
  {
    status: { type: Boolean, default: true },
  },
  { _id: false }
);

const BlacklistSchema = new mongoose.Schema(
  {
    status: { type: Boolean, default: false },
    reason: { type: String, default: null },
  },
  { _id: false }
);

const GuildSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    language: { type: String, default: config.basiclang },
    plugins: { type: PluginSchema, default: () => ({}) },
    commands: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: new Map(),
    },
    blacklisted: { type: BlacklistSchema, default: () => ({}) },
    premium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Guild || mongoose.model("Guild", GuildSchema);
