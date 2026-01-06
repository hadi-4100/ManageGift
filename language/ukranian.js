//ukrainian
const emojis = require("../../emojis.json"),
  e = emojis;

module.exports = {
  create: {
    EXAMPLES: `/create duration:1m winners:1 prize:Нітро \n /create duration:1m winners:1 prize:Нітро channel:#general \n /create duration:1m winners:1 prize:Нітро required_role:@Vip`,
    perms: `${e.error} У вас немає права \`MANAGE_MESSAGES\`, Ви можете встановити роль для створення та управління розіграшами від вашого гільдії за допомогою наступної команди \`/setrole\`!.`,
    duration: `${e.error} Будь ласка, введіть припустимий \`time\`\n> Наприклад: \`1d (1 день)\`, \`1h (1 година)\`, \`1m (1 хвилина)\`!`,
    argswinners: `${e.error} Введіть \`число переможців!\`\n> Наприклад: \`1\`, \`2\`, **...**, \`10\` `,
    prizee: `${e.error} Будь ласка, введіть \`prize\` менше аніж **50 символів**`,
    good: `${e.success} **Готово, \`розіграш\` було успішно \`створено\`**`,
    errorlink: `${e.error} Будь ласка, введіть коректне **LINK OF GUILD** або \`щось пішло не так\``,
    notinserver: `${e.error} Хей! Я не з цього **сервера**, ви можете \`додати мене\` **[натиснувши тут](https://discord.com/api/oauth2/authorize?client_id=598564396691750933&permissions=8&scope=applications.commands%20bot)**`,
    view: `Посилання на розіграш:`,
  },

  drop: {
    EXAMPLES: `/drop winners:1 prize:Подарункова картка \n /drop winners:1 prize:Подарункова картка channel:#general`,
    dropstart: `${e.success} **Готово, \`розіграш\` було успішно \`створено\`**`,
    viewdrop: `Посилання на drop:`,
  },

  delete: {
    EXAMPLES: `/delete => \`виберіть id розіграшу\``,
    option1: (value) => `Приз в розіграші: ${value.prize}`,
    option2: (value) => `Id розіграшу: ${value.messageId}`,
    fordelete: `${e.for} **Для видалення розіграшу:**`,
    done: (giveawayid) =>
      `${e.success} Розіграш видалено \n${e.hash} GiveawayID: \`${giveawayid}\``,
    errmod: `${e.error} Виникла помилка!`,
  },

  edit: {
    EXAMPLES: `/edit value:Winners new_value:5 => \`введіть id розіграшу\` \n /edit value:Prize new_value:5$ paypal => \`введіть id розіграшу\` \n /edit value:duration new_value:1d => \`введіть id розіграшу\``,
    pr: (messageID) =>
      `${e.success} Приз розіграшу був оновлений. \n${e.hash} GiveawayID: \`${messageID}\``,
    wi: (messageID) =>
      `${e.success} Кількість переможців в розіграші була оновлена. \n${e.hash} GiveawayID: \`${messageID}\``,
    ti: (messageID) =>
      `${e.success} Час розіграшу був оновлений. \n${e.hash} GiveawayID: \`${messageID}\``,
    errmod: `${e.error} Виникла помилка!`,
    ending: " Закінчення ",
    foredit: `${e.for} **Для редагування розіграшу:**`,
  },

  end: {
    EXAMPLES: `/end => \`введіть id розіграшу\``,
    errmod: `${e.error} Виникла помилка!`,
    good: (messageID) =>
      `${e.success} Розіграш був закінчений. \n${e.hash} GiveawayID: \`${messageID}\``,
    forend: `${e.for} **Для закінчення розіграшу:**`,
  },

  pause: {
    EXAMPLES: `/pause => \`введіть id розіграшу\``,
    forpause: `${e.for} **Для тимчасової зупинки розіграшу:**`,
    done: (messageID) =>
      `${e.success} Готово, розіграш було тимчасово призупинено. \n${e.hash} GiveawayID: \`${messageID}\``,
    errmod: `${e.error} Виникла помилка!`,
  },

  resume: {
    EXAMPLES: `/resume => \`введіть id розіграшу\``,
    autodes: `Автоматично продовжити після:`,
    forresume: `${e.for} **Для продовження розіграшу:**`,
    done: (messageID) =>
      `${e.success} Готово, розіграш продовжено. \n${e.hash} GiveawayID: \`${messageID}\``,
    errmod: `${e.error} Виникла помилка!`,
  },

  reroll: {
    EXAMPLES: `/reroll => \`введіть id розіграшу\``,
    startat: `Починається`,
    forreroll: `${e.for} **For Reroll a Giveaway:**`,
    good: ":tada: New winner(s): {winners}! Congratulations!",
    parts: `${e.error} There weren't enough participants for this giveaway i can't choose!`,
    errmod: `${e.error} An error occurred!`,
  },

  messages: {
    giveaway: `${e.gift} **GIVEAWAY START** ${e.gift}`,
    giveawayEnded: `${e.end} **GIVEAWAY ENDED** ${e.end}`,
    dropstart: `${e.drpstart} **DROP START** ${e.drpstart}`,
    dropend: `${e.drpend} **DROP ENDED** ${e.drpend}`,
    content1: `**React with ${e.bot_logo} to enter!**`,
    content2: `・${e.winners} Winner(s) : **\` {winners} \`**`,
    content3: `・${e.duration} Duration : **{time}**`,
    hostedBy: `・${e.host} Hosted By : {hostedBy}`,
    req: `${e.requirements} Requirements:`,
    rolereq: `・${e.rolereq} Role: <@&{rolereq}>`,
    serverreq: (servername, serverrequired) =>
      `・${e.serverreq} Guild: [${servername}](${serverrequired})`,
    drop: `・${e.first} Be the first to react with ${e.bot_logo}`,
    end1: `**Giveaway Ended!**`,
    end2: `・${e.prize} Prize :  **\` {prize} \`**`,
    end3: `・${e.win} Winner(s) : {winners}`,
    drpend: `**Drop Ended!**`,
    novalid1: `**Giveaway cancelled!**`,
    novalid2: `・${e.warning} Reason : \` Not enough participants :/ \``,
    embedFooter: "ManageGift • Ended At",
    dropfooter: "ManageGift • Drop!",
    novalidfoo: "ManageGift • Ended",
    winners: "Winner(s) 🎉",
    approved1: `${e.approved} | Entry Approved!`,
    approved2: `**Your entry to [This Giveaway]({messageURL}) has been approved!** \n \n > **You now have a chance to win! ${e.bot_logo}**`,
    denied1: `${e.denied} | Entry Denied!`,
    denied2: `**Your entry to [This Giveaway]({messageURL}) has been denied!** \n \n > **Please review the Giveaway Requirements!** ${e.requirements}`,
    dm1: `**Congratulations {winner}! ${e.bot_logo}**`,
    dm2: `・You Won ${e.gift}:`,
    dm3: `・Від ${e.host}:`,
    winMessage: `${e.bot_logo} | Вітаємо, {winners}! Ви виграли **{this.prize}**!`,
  },

  setdm: {
    EXAMPLES: `/setdm status:on \n /setdm status:off`,
    doneon: `${e.success} | пряме повідомлення про переможця правильно активовано${e.online}!.`,
    doneoff: `${e.success} | повідомлення про прямого переможця коректно деактивовано${e.dnd}!.`,
  },

  setmention: {
    EXAMPLES: `/setmention status:on \n /setmention status:off`,
    mon: `${e.success} | команда setmention правильно активована${e.online}!.`,
    moff: `${e.success} | команда setmention правильно деактивована${e.dnd}!`,
  },

  setrole: {
    EXAMPLES: `/setrole role role_value:@Manager \n /setrole status status_value:on \n /setrole status status_value:off`,
    setrlebedore: `${e.error} | Будь ласка, виберіть роль, перш ніж активувати або деактивувати її..`,
    roledone: (role) =>
      `${e.success} | Ролевий менеджер встановлений: ||<@&${role.id}>||, та \`активований\``,
    ron: `${e.success} | Рольовий менеджер правильно активовано${e.online}!`,
    roff: `${e.success} | Рольовий менеджер коректно деактивовано${e.dnd}!`,
  },

  config: {
    EXAMPLES: `/configuration`,
    configuration: "Конфігурація:",
    status: `статус: `,
    language: `мова ${e.lang}`,
    mentiont: `setmention ${e.mention}`,
    setdmt: `setdm ${e.dm}`,
    setrolet: `setrole ${e.role}`,
    setrolede: `роль: `,
    norole: `\`Роль відсутня\``,
  },

  invite: {
    EXAMPLES: `/invite`,
    main: "Агов, ви хочете запросити нашого бота?",
    disc: `> **Ви можете запросити нашого бота, натиснувши кнопку \`Запросити\` нижче.**\n\n > **Ви можете отримати доступ до посилань \`веб-сайту\`, \`сервера підтримки\` та \`голосування\` **\`\`\`через кнопки внизу\`\`\``,
  },

  ping: {
    EXAMPLES: `/ping`,
    pingmsg: (messagePing, apiPing, status) =>
      `> **Статус**: ${status} \n > ${e.ping} **Пінгування повідомлення**: \`${messagePing}\` - ${e.api} **Пінг API**: \`${apiPing}\``,
  },

  stats: {
    EXAMPLES: `/stats`,
    title: "ManageGift's Інформація:",
    creator: `${e.owner} • Розробник:__`,
    stats: `${e.stats} • Статистика:__`,
    stat: "`Серверів:`",
    set: "`Користувачів:`",
    ver: `${e.ver} • __Журнал змін:__`,
    ram: `${e.ram} • __RAM__`,
    on: `${e.online} • __Аптайм__`,
    startat: "**Started At**: ",
    for: "**online for** ",
    moreinfo: `${e.info} • __MoreInfos:__`,
    comd: "`Total Commands:`",
    giv: "`All Giveaways:`",
    acgiv: "`Active Giveaways:`",
  },

  help: {
    EXAMPLES: `/help \n /help create \n /help ping`,
    title: "Help Documents Overview:",
    disc: "• Here you can find all `ManageGift Commands` \n • Please select a `category` from below",
    giveawaycmd: `Giveaway commands - (8)`,
    configcmd: `Config commands - (4)`,
    infocmd: `Info commands - (4)`,
    ownerbot: `Owner bot commands - (1)`,
    cancel: "Back to the home page",
    link: `${e.link} Links:`,
    web: `${e.link} ManageGift's Website`,
    inv: `${e.add} Invite ManageGift's`,
    vote: `${e.vote} Vote For ManageGift's`,
    sup: `${e.supp} Join The Support Server`,
    errcmd: `${e.error} **Couldn't find command with that \`name\`**`,
    cmd_title: (cmd) => `Help: ${cmd}`,
    cmd_usage: `${e.usage} Usage:`,
    cmd_examples: `${e.example} Examples:`,
    cmd_description: `${e.description} Description:`,
    cmd_categorie: `${e.categorie} Group:`,
  },

  givcmd: {
    givtit: `${e.page} Categories: \`Giveaway\``,
    givfind:
      "```fix\nHere you can find all Giveaway Commands:```**Required permissions:** \n `MANAGE_MESSAGES` or `Set Role`",
    createe: `> \`Start a giveaway in your guild!\``,
    dropee: `> \`Create a giveaway drop in your guild!\``,
    deletee: `> \`Delete a giveaway in your guild!\``,
    editt: `> \`Edit a giveaway in your guild!\``,
    endd: `> \`End a giveaway in your guild!\``,
    pausee: `> \`Pause a giveaway in your guild!\``,
    rerolll: `> \` Choose new winner(s) of a giveaway in your guild!\``,
    resumeee: `> \`resume a giveaway in your guild!\``,
  },

  cnfgcmd: {
    cnfgtit: `${e.page} Categories: \`Config\``,
    cnfgfind:
      "```fix\nHere you can find all Config Commands:```**Required permissions:** \n `MANAGE_MESSAGES`",
    setlangg: `> \`Change the bot's language in your guild!\``,
    setdmm: `> \`Activate or Deactivate the winning dm message to the winner in your guild!\``,
    setmentionn: `> \`Activate or Deactivate the started giveaway mention alert in your guild!\``,
    setrolee: `> \`Activate or Deactivate the role manager in your guild!\``,
  },

  infocmd: {
    infotit: `${e.page} Categories: \`Info\``,
    infofind: "```fix\nHere you can find all Info Commands:```",
    helpp: `> \`Get the bot command\``,
    invitee: `> \`Get the bot invitation link\``,
    pingg: `> \`Show the bot ping\``,
    statss: `> \`Show bot statistics\``,
    configg: `> \`Display the current configuration of the bot\``,
  },

  owner: {
    tit: `${e.page} Categories: \`Owner\``,
    ownerfind: "```fix\nHere you can find all Owner Commands:```",
    blacklistt: `> \`Додавання, видалення або отримання списку, користувачів і гільдій в чорному списку\``,
  },

  otherUser: `${e.error} Ви не можете **редагувати**, **закінчувати** чи **видаляти** цей \`розіграш\`, тому що ви не є \`хостом\` поточного розіграшу!`,

  lang: { perms: `${e.error} У вас немає права \`MANAGE_MESSAGES\`` },

  lastchance: {
    content: `${e.warning} **ОСТАННІЙ ШАНС ДЛЯ ПРИЄДНАННЯ!** ${e.warning}`,
  },

  pauseoptions: {
    content: `${e.pause} **РОЗІГРАШ ПРИЗУПИНЕНО!** ${e.pause}`,
    autostart: (autotime) => `\`Продовження розіграшу після:\` ${autotime}`,
  },

  already: {
    enb: `${e.afk} | Сталася помилка. Ця команда вже може бути \`ввімкнена\``,
    dis: `${e.afk} | Сталася помилка. Ця команда вже може бути \`вимкнена\``,
  },

  selectmenu: { choose: `Будь ласка, виберіть розіграш` },

  collector: {
    time: `${e.timeout}**Час вийшов! Спробуйте знову.**`,
    btntime: `Час вийшов!`,
  },

  cancel: {
    option1: `Скасувати`,
    option2: `Скасувати обране`,
    cancelled: `${e.success} Скасовано`,
  },

  cmd: {
    cooldown: `${e.error} | **Ви повинні зачекати \`4 секунди\` ${e.timeout} щоб мати можливість запустити цю команду знову!**`,
    owneronly: `${e.error} | Тільки власник ManageGift може виконувати ці команди!`,
    botperm: `${e.error} | Я не маю права **\`Адміністратор\`** для виконання цієї команди.`,
  },

  blacklist: {
    user: (ureason) =>
      `${e.warning} **Ви не можете використовувати команди ManageGift Bot** \n \`\`\`Причина: ${ureason}\`\`\` \n**Якщо ви думаєте, що це помилка або щось таке, не соромтеся і відправте своє заперечення в [підтримку](https://discord.gg/7XfV4Md)**`,
    guild: (sreason) =>
      `${e.warning} **Цей сервер знаходиться в чорному списку, ви не можете використовувати будь-яку команду**\n \`\`\`Причина: ${sreason}\`\`\` \n**Якщо ви думаєте, що це помилка або щось таке, не соромтеся і відправте своє заперечення в [підтримку](https://discord.gg/7XfV4Md)**`,
  },

  enterserver: { thx: "Дякуємо, що додали мене до вашої гільдії!" },

  moved: {
    update: `${e.news} Оновлення!`,
    slash:
      "З версії `v4.0.0`, **ManageGiftt** переписаний на **слєш-команди**! Будь ласка, введіть /help для перегляду всіх команд!",
  },
  dashboard: {
    home: "الصفحة الرئيسية",
    profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
    // المزيد من الترجمة...
  },
};
