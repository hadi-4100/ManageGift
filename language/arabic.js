//arabic
const emojis = require('../emojis.json'),
	e = emojis;

module.exports = {

	create: {
		EXAMPLES: `/create duration:1m winners:1 prize:نترو \n /create duration:1m winners:1 prize:نترو channel:#العام \n /create duration:1m winners:1 prize:نترو required_role:@الداعمين`,
		perms: `${e.error} ليس لديك صَلاحية \`MANAGE_MESSAGES\`، يمكنك تحديد رتبة لإنشاء وإدارة هداياك في سيرفرك باستخدام الأمر التالي \`/setrole\`!.`,
		duration: `${e.error} يرجى إدخال وقت \`time\` صحيح!\n> مثال: \`1d (1 day)\`, \`1h (1 hour)\`, \`1m (1 minute)\`!`,
		argswinners: `${e.error} اكتب \`عدد الفائزين!\`\n> مثال: \`1\`, \`2\` **...** \`10\` `,
		prizee: `${e.error} الرجاء وضع \`جائزة\` لا تتضمن أكثر من **50 حرف**`,
		good: `${e.success} **تم إنشاء هبتك بنجاح!**`,
		errorlink: `${e.error}  الرجاء إدخال **رابط خادم (سيرفر)** صالح أو \`ربما هنالك خطأ ما\`.`,
		notinserver: `${e.error} مرحباً! أنا لست في هذا **الخادم (السيرفر)**، يمكنك \`إضافتي\` عن طريق **[النقر هنا](https://discord.com/api/oauth2/authorize?client_id=598564396691750933&permissions=8&scope=applications.commands%20bot)**`,
		view: `رابط الهبة:`
	},

	drop: {
		EXAMPLES: `/drop winners:1 prize:نترو \n /drop winners:1 prize:نترو channel:#العام`,
		dropstart: `${e.success} **تم إنشاء هبتك بنجاح!**`,
		viewdrop: `رابط الدروب:`
	},

	delete: {
		EXAMPLES: `/delete => \`اختيار هدية معرف \``,
		option1: value => `جائزة الهَبَّة: ${value.prize}`,
		option2: value => `معرف الهبة:${value.messageId}`,
		fordelete: `${e.for} **لحذف الهبة:**`,
		done: giveawayid => `${e.success} تم حذف الهدية بنجاح! \n${e.hash} معرف الهبة: \`${giveawayid}\``,
		errmod: `${e.error} حدث خطأ ما!`
	},

	edit: {
		EXAMPLES: `  /edit value:Winners new_value:5 => \`إختر معرف الهبة\` \n /edit value:Prize new_value:5$ بايبال => \`إختر معرف الهبة\` \n /edit value:duration new_value:1d => \`إختر معرف الهبة\``,
		pr: messageID => `${e.success} تم تحديث جائزة الهبة بنجاح. \n${e.hash} معرف الهبة: \`${messageID}\``,
		wi: messageID => `${e.success} تم تحديث الفائز(ة) بالهبة بنجاح. \n${e.hash} معرف الهبة: \`${messageID}\``,
		ti: messageID => `${e.success} تم تحديث مدة الهبة بنجاح. \n${e.hash} معرف الهبة: \`${messageID}\``,
		errmod: `${e.error} حدث خطأ ما!`,
		ending: ' النهاية ',
		foredit: `${e.for} ** لتحرير الهبة:**`
	},

	end: {
		EXAMPLES: `/end => \`اختيار معرف هدية \``,
		errmod: `${e.error} حدث خطأ ما!`,
		good: messageID => `${e.success} تم إنهاء الهبة بنجاح. \n${e.hash} معرف الهبة: \`${messageID}\``,
		forend: `${e.for} ** لإنهاء الهبة:**`
	},

	pause: {
		EXAMPLES: `/pause => \`اختيار معرف هدية \``,
		forpause: `${e.for} **لتوقيف الهبة:**`,
		done: messageID => `${e.success} تم توقيف الهدية بنجاح! \n${e.hash} معرف الهبة: \`${messageID}\``,
		errmod: `${e.error} حدث خطأ ما!`
	},

	resume: {
		EXAMPLES: `/resume => \`اختيار معرف هدية \``,
		autodes: `التشغيل التلقائي بعد:`,
		forresume: `${e.for} **لاستئناف الهبة:**`,
		done: messageID => `${e.success} تم استئناف الهدية بنجاح! \n${e.hash} معرف الهبة: \`${messageID}\``,
		errmod: `${e.error} حدث خطأ ما!`
	},

	reroll: {
		EXAMPLES: `/reroll => \`اختيار معرف هدية \``,
		startat: `البدء في`,
		forreroll: `${e.for} **لإعادة تحديد الفائز بالهبة:**`,
		good: ':tada: الفائز(ة/ون) جديد: {winners}! تهانينا!',
		parts: `${e.error} لم يكن هناك عدد كاف من المشاركين في هذه الهبة لذلك لا يمكنني تحديد الفائز!`,
		errmod: `${e.error} حدث خطأ ما!`
	},

	messages: {
		giveaway: `${e.gift} **بدأت الهبة** ${e.gift}`,
		giveawayEnded: `${e.end} **انتهت الهبة** ${e.end}`,
		dropstart: `${e.drpstart} **بدء الـ DROP** ${e.drpstart}`,
		dropend: `${e.drpend} **إنتهى الـ DROP** ${e.drpend}`,
		content1: `**إضغط على ${e.bot_logo} للمشاركة والدخول في السحب!**`,
		content2: `・${e.winners} الفائز(ة/ون): **\` {winners}\`**`,
		content3: `・${e.duration} المدة: **{time}**`,
		hostedBy: `・${e.host} بواسطة: {hostedBy}`,
		req: `${e.requirements} الشروط:`,
		rolereq: `・${e.rolereq} الرتبة: <@&{rolereq}>`,
		serverreq: (servername, serverrequired) => `・${e.serverreq} الخادم: [${servername}](${serverrequired})`,
		drop: `・${e.first} كن أول من يضغط على ${e.bot_logo}`,
		end1: `**انتهت الهبة!**`,
		end2: `・${e.prize} الجائزة: **\` {prize}\`**`,
		end3: `・${e.win} الفائز(ة/ون): {winners}`,
		drpend: `**انتهى الـ DROP!**`,
		novalid1: `**تم إلغاء الهبة!**`,
		novalid2: `・${e.warning} السبب: \` لا يوجد عدد كاف من المشاركين :/ \``,
		embedFooter: 'ManageGift • تنتهي في',
		dropfooter: 'ManageGift • Drop!',
		novalidfoo: 'ManageGift • إنتهت',
		winners: 'الفائز(ة/ون) 🎉',
		approved1: `${e.approved} تمت الموافقة على دخولك للسحب!`,
		approved2: `**دخولك [لهذه الهدايا]({messageURL}) قد تمت الموافقة عليه!** \n \n > **لديك الآن فرصة للفوز! ${e.bot_logo}**`,
		denied1: `${e.denied} | تم رفضك دخولك للسحب!`,
		denied2: `**دخولك للسحب في [هذه الهبة]({messageURL}) قد تم رفضه!** \n \n > **الرجاء مراجعة متطلبات وشروط المشاركة في الهبة! ${e.requirements}`,
		dm1: `**تهانينا لـ {winner}! 
${e.bot_logo}**`,
		dm2: `・أنت فزت ${e.gift}:`,
		dm3: `・بواسطة ${e.host}:`,
		winMessage: `${e.bot_logo} | مبروك, {winners}! لقد فزت(م) **بـ{prize}!**`
	},

	setdm: {
		EXAMPLES: `/setdm status:on \n /setdm status:off`,
		doneon: `${e.success} | تم تفعيل خاصية تنبيه الفائزين في الخاص${e.online}!.`,
		doneoff: `${e.success} | تم إلغاء تفعيل خاصية تنبيه الفائزين في الخاص${e.dnd}!.`
	},

	setmention: {
		EXAMPLES: `/setmention status:on \n /setmention status:off`,
		mon: `${e.success} | تم تفعيل خاصية التنبيه الجماعي بـ(everyone) عند إنشاء الهبات${e.online}!.`,
		moff: `${e.success} | تم إلغاء تفعيل خاصية التنبيه الجماعي بـ(everyone) عند إنشاء الهبات${e.dnd}!`
	},

	setrole: {
		EXAMPLES: `/setrole role role_value:@Manager \n /setrole status status_value:on \n /setrole status status_value:off`,
		setrlebedore: `${e.error} | الرجاء اختيار رتبة قبل تفعيله أو تعطيله..`,
		roledone: role => `${e.success} | تم تعين الرتبة الآتية كمدير للهبات: ||<@&${role.id}>||, و \`مفعل\``,
		ron: `${e.success} | تم تفعيل رتبة مدير الهبات${e.online}!`,
		roff: `${e.success} | تم إلغاء تفعيل رتبة مدير الهبات${e.dnd}!`
	},

	config: {
		EXAMPLES: `/configuration`,
		configuration: 'الإعدادات:',
		status: `الحالة: `,
		language: `اللغة ${e.lang}`,
		mentiont: `setmention ${e.mention}`,
		setdmt: `setdm ${e.dm}`,
		setrolet: `setrole ${e.role}`,
		setrolede: `الرتبة: `,
		norole: `\`لا توجد رتبة\``
	},

	invite: {
		EXAMPLES: `/invite`,
		main: 'مرحبا، هل تريد دعوة البوت؟',
		disc: `> * * يمكنك دعوة البوت بالضغط على زر \`دعوة\` أدناه. *\n\n > **يمكنك الوصول إلى روابط \`webiste\` ، \`سيرفر الدعم الفني\` و \`التصويت\`** \`\`\`من خلال الأزرار أدناه \`\`\``
	},

	ping: {
		EXAMPLES: `/ping`,
		pingmsg: (messagePing, apiPing, status) => `> **الحالة**: ${status} \n > ${e.ping} **/مدة إستجابة الرسائل**: \`${messagePing}\` - ${e.api} ** مدة إستجابة الـ API**: \`${apiPing}\``
	},

	stats: {
		EXAMPLES: `/stats`,
		title: 'معلومات حول ManageGift\'s:',
		creator: `${e.owner} • __المنشئ:__`,
		stats: `${e.stats} • __إحصائيات:__`,
		stat: '`الخوادم:`',
		set: '`المستخدمين:`',
		ver: `${e.ver} • __سجل التغييرات:__`,
		ram: `${e.ram} • __الرام__`,
		on: `${e.online} • __مدة التشغيل منذ آخر مرة__`,
		startat: '**بدأت في**: ',
		for: '**متصل منذ** ',
		moreinfo: `${e.info} • __المزيد من المعلومات:__`,
		comd: '`مجموع الأوامر:`',
		giv: '`عدد جميع الهبات:`',
		acgiv: '`عدد الهبات النشطة:`'
	},

	help: {
		EXAMPLES: `/help \n /help create \n /help ping`,
		title: 'نظرة عامة على مستندات المساعدة:',
		disc: '• من هنا يمكنك رؤية جميع أوامر `ManageGift\'s Bot` \n • يرجى اختيار `قائمة` من خلال الزر أدناه',
		giveawaycmd: `أوامر الهبات - (8)`,
		configcmd: `أوامر الإعدادات - (4)`,
		infocmd: `معلومات الأوامر - (4)`,
		ownerbot: `أوامر مالك البوت - (1)`,
		cancel: 'الرجوع إلى الصفحة الرئيسية',
		link: `${e.link} الروابط:`,
		web: `${e.link} موقع ManageGift's`,
		inv: `${e.add} دعوة ManageGift's`,
		vote: `${e.vote} التصويت لـ ManageGift's`,
		sup: `${e.supp} سيرفر الدعم الفني`,
		errcmd: `${e.error} **تعذر العثور على الأمر اسمه \`name\`**`,
		cmd_title: cmd => `مساعدة: ${cmd}`,
		cmd_usage: `${e.usage} الاستخدام:`,
		cmd_examples: `${e.example} أمثلة للأمر:`,
		cmd_description: `${e.description} الوصف:`,
		cmd_categorie: `${e.categorie} المجموعة:`
	},

	givcmd: {
		givtit: `${e.page} الفئات: \`الهبات\``,
		givfind: '```fix\nهنا يمكنك أن تجد جميع أوامر الهبات:```**الصلاحيات مطلوبة:** \n `MANAGE_MESSAGES` أو ` تحديد رتبة لإنشاء وإدارة الهبات`',
		createe: `> \`ابدأ بإنشاء الهبات في خادمك!\``,
		dropee: `> \`ابدأ بإنشاء هبات الـ DROP في خادمك!\``,
		deletee: `> \`إحذف هبة في خادمك!\``,
		editt: `> \`قم بتعديل الهبات في خادمك!\``,
		endd: `> \`قم بإنهاء الهبات في خادمك!\``,
		pausee: `> \`قم بإيقاف هبة في خادمك!\``,
		rerolll: `> \` اختر الفائز(ة/ون) جدد لهبتك في خادمك!\``,
		resumeee: `> \`قم بإستئناف هبة في خادمك!\``
	},

	cnfgcmd: {
		cnfgtit: `${e.page} الفئة: \`الإعدادات\``,
		cnfgfind: '```fix\nهنا يمكنك أن تجد جميع أوامر الإعدادات:```**الصلاحيات مطلوبة:** \n `MANAGE_MESSAGES` أو ` تحديد رتبة لإنشاء وإدارة الهبات`',
		setlangg: `> \`تغير لغة البوت في خادمك!\``,
		setdmm: `> \`تفعيل أو إلغاء تفعيل خاصية تنبيه الفائز بالخاص في خادمك!\``,
		setmentionn: `> \`تفعيل أو إلغاء تفعيل تنبيه الأعضاء بـ(everyone) أثناء إنشاء هبة في خادمك!\``,
		setrolee: `> \`تفعيل أو إلغاء تفعيل رتبة الهبات في خادمك!\``
	},

	infocmd: {
		infotit: `${e.page} الفئة: \`المعلومات\``,
		infofind: '```fix\nمن هنا يمكنك رؤية جميع أوامر المعلومات:```',
		helpp: `> \`احصل على أوامر البوت \``,
		invitee: `> \`احصل على رابط دعوة البوت \``,
		pingg: `> \`إظهار مدة استجابة البوت \``,
		statss: `> \`إظهار إحصائيات البوت\``,
		configg: `> \`عرض الإعدادات الحالية للبوت \``
	},

	owner: {
		tit: `${e.page} الفئة: \`المالك\``,
		ownerfind: '```إصلاح\nهنا يمكنك العثور على جميع أوامر المالك:```',
		blacklistt: `> \`إضافة أو إزالة أو الحصول على قائمة، المستخدمين والخوادم في القائمة السوداء\``
	},

	otherUser: `${e.error} لا يمكنك **تحرير**، **إنهاء** أو **حذف** هذه \`الهبة\`، بما أنك لست \`المستضيف\`!`,

	lang: { perms: `${e.error} ليس لديك صلاحية \`MANAGE_MESSAGES\`` },

	lastchance: { content: `${e.warning} **أخر فرصة لدخول في السحب!** ${e.warning}` },

	pauseoptions: {
		content: `${e.pause} **تم توقيف هذه الهبة مؤقتا !** ${e.pause}`,
		autostart: autotime => `\`التشغيل التلقائي بعد:\` ${autotime}`
	},

	already: {
		enb: `${e.afk} | حدث خطأ. قد يكون هذا الأمر \`مفعل\``,
		dis: `${e.afk} | حدث خطأ. قد يكون هذا الأمر \`ملغى\` بالفعل`
	},

	selectmenu: { choose: `الرجاء إخيار الهبة` },

	collector: {
		time: `${e.timeout}**انتهى الوقت! حاول مرة أخرى.**`,
		btntime: `إنتهى الوقت!`
	},

	cancel: {
		option1: `إلغاء`,
		option2: `إلغاء التحديد`,
		cancelled: `${e.success} ملغي`
	},

	cmd: {
		cooldown: `${e.error} | **يجب عليك الانتظار \`4 ثواني/ثوانٍ\` ${e.timeout} لتكون قادراً على تشغيل هذا الأمر مرة أخرى!**`,
		owneronly: `${e.error} | فقط مالك ManageGift يمكنه استخدام هذه الأوامر!`,
		botperm: `${e.error} | لا أملك صلاحية **\`Administrator\`** لتنفيذ هذا الأمر.`
	},

	blacklist: {
		user: ureason => `${e.warning} **لا يمكنك استخدام أوامر ManageGift** \n \`\`\`السبب: ${ureason}\`\`\` \n**إذا كنت تعتقد أن هذا خطأ أو شيء من هذا القبيل، لا تتردد في تقديم اعتراضك في [خدمة الدعم الفني](https://discord.gg/7XfV4Md)**`,
		guild: sreason => `${e.warning} **هذا الخادم موجود في القائمة السوداء، لا يمكنك استخدام أي أمر فيه**\n \`\`\`السبب: ${sreason}\`\`\` \n**إذا كنت تعتقد أن هذا خطأ أو شيء من هذا القبيل، لا تتردد في تقديم اعتراضك في [خدمة الدعم الفني](https://discord.gg/7XfV4Md)**`
	},

	moved: {
		update: `${e.news} تحديث!`,
		slash: 'من الإصدار `v4.0.0` فصاعداً تم تحويل أوامر **ManageGift** إلى **أوامر السلاش**! الرجاء كتابة `/help` للتعرف على جميع الأوامر!'
	},
	dashboard: {
		home: "الصفحة الرئيسية",
		profile: "الملف الشخصي",
		logout: "تسجيل الخروج",
		// المزيد من الترجمة...
	  }
};