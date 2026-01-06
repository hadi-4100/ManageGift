const version = require("./package.json").version;

/**
 * CONFIGURATION FILE
 *
 * IMPORTANT: Move sensitive tokens and URIs to a .env file.
 */

module.exports = {
  // Bot Identity
  token: process.env.DISCORD_TOKEN || "",
  owners: (process.env.OWNERS || "697435544812257342").split(","),

  // Database
  mongoDB: process.env.MONGODB_URI || "",

  // Internationalization
  basiclang: "english",

  // Presence Configuration
  status: [
    {
      name: "/help ▪︎ ManageGift's on {guild} guilds! ▪︎ v{version}",
      type: 0, // Playing
    },
    {
      name: "{total_giveaways} Giveaways Launched ▪︎ {ac_giveaways} Active giveaways",
      type: 0, // Playing
    },
  ],

  // Dashboard Settings
  dashboard: {
    enabled: false,
    clientID: process.env.CLIENT_ID || "611885300322402334",
    clientSecret: process.env.CLIENT_SECRET || "",
    callbackURL:
      process.env.CALLBACK_URL || "http://localhost:3000/login/callback",
    dashboardURL: process.env.DASHBOARD_URL || "http://localhost",
    port: process.env.PORT || "3000",
  },

  // Visuals
  embeds: {
    color: "#454dfc",
    footers: `🎁 ManageGift's v${version} | http://managegift.ga`,
  },

  // Logging
  webhooklogs: {
    cmd: process.env.WEBHOOK_CMD || "",
    join_leave: process.env.WEBHOOK_JOIN_LEAVE || "",
  },

  // Giveaway Settings
  giveaway: {
    reaction: process.env.GIVEAWAY_REACTION || "<:botlogo:1024760383677927484>",
    lastchanceenabled: true,
  },

  // Links
  links: {
    web: "http://managegift.ga",
    supportserver: "https://discord.gg/7XfV4Md",
    vote: "https://top.gg/bot/598564396691750933/vote",
  },
};
