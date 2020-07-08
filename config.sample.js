module.exports = {
    token: "", // token bot | توكن البوت
	
	prefix: "", // prefix bot | برفكس البوت
	
	idbot: "", // Bot ID | ايدي البوت

    hostedBy: true, // Why hosted gift | لماذا استضافت الهدية

	basiclang: "en", // Default lang | اللغة الاساسية
	
	auth: {
		support: "" // Support server URL | رابط سيرفر السيبورت
	},

	// Status | الحالات
	status: [
		{
			name: `%ghelp | ManageGift's on {server} servers!`,
			type: "LISTENING"
		},
		{
<<<<<<< HEAD
			name: "https://github.com/Hadi-Koubeissi/ManageGift",
=======
			name: "https://github.com/Hadi-Koubeissi/GiveawayBoT",
>>>>>>> fbdf75b3e63babd031281769bf691cc573ff8b3b
			type: "PLAYING"
		}
	],

	embeds: {
        color: "#FF4500", // Embed color | لون الامبد
        footers: "🎁 ManageGift's | http://managegift.ga" // Embed footer | الكتابة لي تكون اخر الامبد
    },

    events: {
        addcolor: "#DC143C", // The color of the event add | لون الامبد
		remcolor: "RED" // The color of the event remove  
    },

    reaction: "🎉", // Reaction to the giveaways if you in the console you see 'unknown emoji' that's what this emoji is not recognized by Discord | الايموجي الي بس تضغط عليها يصير القيف اوي اذا طلع لك ايرور بالكونسول يعني الايموجي ما تعرف بالديسكورد

    grole: "Giveaway Manger", // If the member doesn't have permission to handle messages he can still use the giveaways commands if he has the role configured right here | اذا سويت الرتبة واعطيتها لحد يصير يقدر يسوي قيف اوي ويستخدم جميع اوامر البوت بدون صلاحيات

    // All emojis in ManageGift support server | الاينوحيات بتلقوها بروم في السيبورت سيرفر الخاص بالبوت
	emojis: {
		success: "",
		error: "",
		gift: "",
		end: "",
		time: "",
		hoste: "",
		ping: "",
		link: "",
		add: "",
		vote: "",
		supp: "",
		command: "",
		featured: "",
		right: "",
		stats: "",
		ver: "",
		info: ""
	}
}