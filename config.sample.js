module.exports = {
	/* The token of your Discord Bot // توكن البوت الخاص فيك */
	token: "",
	/* for the support server // رابط سيرفر الدعم الخاص فيك */
	auth: {
		support: "https://discord.gg/7XfV4Md", // URL for support server
		logs: "", // id of the logs channel on your server if the bot join new server
	},
	mongoDB: "", // The URl of the mongodb database
	prefix: "!", // The default prefix for the bot
	/* For the embeds (embeded messages) */
	embeds: {
		color: "#8b2f2f", // Embed color | لون الامبد
		footers: "🎁 ManageGift's | http://managegift.ga" // Embed footer | الكتابة لي تكون اخر الامبد
	},
	/* Bot's owner informations */
	owner: {
		id: "442793591501357056", // The ID of the bot's owner
		name: "! -  HaDi KouBeIssI | 🇱🇧#4001" // The ID of the bot's owner
	},
	/* The Bot status */
	status: [
		{
			name: "%ghelp | ManageGift's on {server} servers!",
			type: "LISTENING"
		},
		{
			name: "https://github.com/Hadi-Koubeissi/ManageGift",
			type: "PLAYING"
		}
	],
	/* Default lang | اللغة الاساسية */
	basiclang: "english",
	/* Giveaway settings */
	giveaway: {
		hostedBy: true, // Why hosted gift | لماذا استضافت الهدية
		reaction: "🎉", // Reaction to the giveaways if you in the console you see 'unknown emoji' that's what this emoji is not recognized by Discord | الايموجي الي بس تضغط عليها يصير القيف اوي اذا طلع لك ايرور بالكونسول يعني الايموجي ما تعرف بالديسكورد
		lastchanceenabled: true,
	},
	//logs for cmd bot
	logs: {
		command: "623946197773582377" //log To see who uses bot commands
	}
};