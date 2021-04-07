/* eslint-disable no-unused-vars */
//engilsh
const { prefix, owner } = require("../config.js"),
	emojis = require("../emojis.json"),
	e = emojis;

module.exports = {
	start: {
		perms: `${e.error} You do not have permission \`MANAGE_MESSAGES\`, you can create a rank for implementation named \`Giveaway Manger\` and addd to a user for \`start & create & edit ...\` giveaways or set specify role from your guild By using the following command \`${prefix}setrole [on / off] {your role}\`!.`,
		duration: `${e.error} Type a valid \`time\` please!\n> Ex: \`1d (1 day)\`, \`1h (1 hour)\`, \`1m (1 minute)\`, \`1s (1 seconds)\`!`,
		argswinners: `${e.error} Type the \`number of winners!\`\n> Ex: \`${prefix}start 1h 4(4: number of winers) Nitro\``,
		prize: `${e.error} Add the \`prize\` please!\n> Ex: ${prefix}start 1h 1 \`Nitro(Nitro: the prize)\``
	},

	create: {
		perms: `${e.error} You do not have permission \`MANAGE_MESSAGES\`, you can create a rank for implementation named \`Giveaway Manger\` and addd to a user for \`start & create & edit ...\` giveaways or set specify role from your guild By using the following command \`${prefix}setrole [on / off] {your role}\`!.`,
		channel: `${e.error} You should mention on \`valid channel!\`\n> Ex: ${prefix}create \`#giveawaychannel (giveawaychanne: this channel)\` 1h 1 Nitro!`,
		otherServer: `${e.error} You cannot create a \`giveaway\` on another server!.`,
		duration: `${e.error} Type a valid \`time\` please!\n> Ex: \`1d (1 day)\`, \`1h (1 hour)\`, \`1m (1 minute)\`, \`1s (1 seconds)\`!`,
		argswinners: `${e.error} Type the \`number of winners!\`\n> Ex: \`${prefix}create #giveawaychannel 1h 4(4: number of winers) Nitro\``,
		prize: `${e.error} Add the \`prize\` please!\n> Ex: ${prefix}create #giveawaychannel 1h 1 \`Nitro(Nitro: the prize)\``,
		good: `${e.success} **I launched the \` giveaway \` in the living room:**`,

		giveaway: `${e.gift} **GIVEAWAY START** ${e.gift}`,
		giveawayEnded: `${e.end} **GIVEAWAY ENDED** ${e.end}`,

		timeRemaining: `${e.time} **Remaining time:** **{duration}**!`,
		inviteToParticipate: (message) => "REACT WITH 🎉 TO ENTER!",
		winMessage: (message) => "🎉 | Congratulations, {winners}! You Won: **{prize}**!",
		embedFooter: "ManageGift",
		noWinner: "❌ Giveaway cancelled, not enough participants :(",
		hostedBy: `${e.hoste} **Hosted by:** {user}`,
		winners: "Winner(s) 🎉",
		endedAt: "Ended at",
	},

	units: {
		seconds: "second(s)",
		minutes: "minute(s)",
		hours: "hour(s)",
		days: "day(s)",
	},

	lastchance: { content: `${e.warning} **LAST CHANCE TO ENTER !** ${e.warning}` },

	end: {
		perms: `${e.error} You do not have permission \`MANAGE_MESSAGES\`, you can create a rank for implementation named \`Giveaway Manger\` and addd to a user for \`start & create & edit ...\` giveaways or set specify role from your guild By using the following command \`${prefix}setrole [on / off] {your role}\`!.`,
		msg: `${e.error} You have to specify a valid message ID!`,
		err: `${e.error} Unable to recognize this id giveaway:`,
		errmod: `${e.error} This giveaway already ended or deleted!`,
		good: `${e.success} The giveaway will be finished in less than:`
	},

	reroll: {
		perms: `${e.error} You do not have permission \`MANAGE_MESSAGES\`, you can create a rank for implementation named \`Giveaway Manger\` and addd to a user for \`start & create & edit ...\` giveaways or set specify role from your guild By using the following command \`${prefix}setrole [on / off] {your role}\`!.`,
		msg: `${e.error} You have to specify a valid message ID!`,
		err: `${e.error} Unable to recognize this id giveaway:`,
		good: ":tada: New winner(s): {winners}! Congratulations!",
		parts: `${e.error} There weren't enough participants for this giveaway i can't choose!`
	},

	edit: {
		perms: `${e.error} You do not have permission \`MANAGE_MESSAGES\`, you can create a rank for implementation named \`Giveaway Manger\` and addd to a user for \`start & create & edit ...\` giveaways or set specify role from your guild By using the following command \`${prefix}setrole [on / off] {your role}\`!.`,
		msg: `${e.error} You have to specify a valid message ID!`,
		wipr: `${e.error} You need to either edit the prize or the winners!`,
		argswinners: `${e.error} type the \`number of winners!\`\n> Ex: \`${prefix}edit {giveawayid} winners 2(2: number of winers)\``,
		prize: `${e.error} add the \`prize\` please!\n> Ex: ${prefix}edit {giveawayid} prize \`Nitro (Nitro: the prize)\``,
		timepr: (numberOfSecondsMax)=> `${e.success} The giveaway prize will updated in less than \`${numberOfSecondsMax}\` seconds.`,
		timwi: (numberOfSecondsMax)=> `${e.success} The giveaway winner count will updated in less than \`${numberOfSecondsMax}\` seconds.`,
		err: `${e.error} Unable to recognize this id giveaway: `,
		errmod: `${e.error} An error occurred, maybe this giveaway is already finished or deleted?!`
	},

	delete: {
		done: `${e.success} Done the giveaway is deleted`,
		otherServer: `${e.error} You cannot control someone else's \`giveaway\` on this server!`,
		otherUser: `${e.error} You cannot control this \`giveaway\`, since you are not its owner!`
	},

	lang: {
		perms: `${e.error} You do not have permission \`MANAGE_MESSAGES\`, you can create a rank for implementation named \`Giveaway Manger\` and addd to a user for \`start & create & edit ...\` giveaways or set specify role from your guild By using the following command \`${prefix}setrole [on / off] {your role}\`!.`,
		msg: `${e.error} please enter a vaild language (\`ar\`, \`en\`, \`ru\`, \`ua\`)`,
	},

	set: {
		args: `${e.error} | Please indicate \`on\` or \`off\``,
		mon: `${e.success} | setmention command correctly activated!.`,
		moff: `${e.success} | setmention command correctly deactivated!`,
		rlargs: `${e.error} | Please indicate \`on\` or \`off\` and a role name!`,
		rlerr: `${e.error} | No role found with this name`,
		ron: `${e.success} | role manager correctly activated!`,
		roff: `${e.success} | role manager correctly deactivated!`
	},

	invite: {
		main: "Main links",
		disc: `Type \`${prefix}invite copy\` to be able to copy the link!`,
		web: `${e.link} ManageGift's Website`,
		inv: `${e.add} Invite ManageGift's Bot`,
		vote: `${e.vote} Vote For ManageGift's Bot`,
		sup: `${e.supp} Join The Support Server`
	},

	help: {
		title: "Help Documents Overview:",
		disc: "● Here you can find all `ManageGift Commands`",
		giveawaycmd: `${e.givcmd} Giveaway commands - (6)`,
		featuredcmd: `${e.featured} Featured commands - (4)`,
		infocmd: `${e.info} Info commands - (4)`,
		ownerbot: `${e.owner} Owner bot commands - (2)`,
		link: `${e.link} Links:`
	},

	stats: {
		title: "ManageGift's Information:",
		info: `It is an open source bot that allows you to create giveaway with ease and gives you many distinct features. The bot is Programmed in \`javascript language\` and By: ${owner.name}`,
		stats: `${e.stats} • __Statistics:__`,
		stat: "`Servers:`",
		set: "`Users:`",
		ch: "`Channels:`",
		ver: `${e.ver} • __Versions:__`,
		ram: `${e.ram} • __RAM__`,
		on: `${e.on} • __Online__`,
		for: "**online for** ",
		moreinfo: `${e.info} • __MoreInfos:__`,
		comd: "`Total Commands:`",
		giv: "`All Giveaways:`",
	},

	prefixerror: `${e.error} Type a valid prefix!.`,
	prefixerrcarc: `${e.error} | The prefix shouldn't exceed 5 characters!`,
	setprefix: `${e.success} The prefix on this server has been changed to `,

	info: {
		ping: `> ${e.ping} My Ping is `,
	},
	cooldown: {
		err: `${e.error} | **You must wait \`4 second(s)\` ${e.time} to be able to run this command again!**`
	},
	myprefix: {
		hello: `${e.info} |  Hello `,
		prefixis: (guildData) => ` my prefix on this server is \`${guildData.prefix}\`.Use \`${guildData.prefix}help\` to get the list of the commands!`,
	},
	blacklist: {
		blacklist: ":lock: **You cannot use `ManageGift commands` because you are in the `Blacklist!!`**"
	}
};