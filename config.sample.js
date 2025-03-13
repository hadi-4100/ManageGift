/*

To make the robot work without problems,
you must fill in the requirements,
which have a (very important) word next to them

*/

const version = require("./package.json").version;
module.exports = {

	token: "", //(very important)

	owners: "697435544812257342",

	mongoDB: "", //(very important)

	basiclang: "english",

	status: [
		{
			name: `/help ▪︎ ManageGift's on {guild} guilds! ▪︎ v{version}`,
			type: 0
		},
		{
			name: `{total_giveaways} Giveaways Launched ▪︎ {ac_giveaways} Active giveaways`,
			type: 0
		}
	],

	embeds: {
		color: "#454dfc",
		footers: `🎁 ManageGift's v${version} | http://managegift.ga`
	},

	webhooklogs: { //(very important)
		cmd: "",
		join_leave: ""
	},

	giveaway: {
		reaction: "", //(very important)
		lastchanceenabled: true,
	},

	links: {
		web: "http://managegift.ga",
		supportserver: "https://discord.gg/7XfV4Md",
		vote: "https://top.gg/bot/598564396691750933/vote"
	}
};