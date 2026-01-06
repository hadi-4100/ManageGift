const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema(
  {
    status: { type: Boolean, default: false },
    reason: { type: String, default: null },
  },
  { _id: false }
);

const LoggedSchema = new mongoose.Schema(
  {
    logged: { type: Boolean, default: false },
    date: { type: Date, default: null },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    blacklisted: { type: BlacklistSchema, default: () => ({}) },
    pro: { type: Boolean, default: false },
    logged: { type: LoggedSchema, default: () => ({}) },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
