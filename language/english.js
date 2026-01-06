//engilsh
const config = require("../config.js"),
  emojis = require("../emojis.json"),
  e = emojis;

module.exports = {
  create: {
    EXAMPLES: `/create duration:1m winners:1 prize:Nitro \n /create duration:1m winners:1 prize:Nitro channel:#general \n /create duration:1m winners:1 prize:Nitro required_role:@Vip`,
    perms: `${e.error} You do not have permission \`MANAGE_MESSAGES\`, You can set specify role to create & manage giveaways from your guild By using the following command \`/setrole\`!.`,
    duration: `${e.error} Type a valid \`time\` please!\n> Ex: \`1d (1 day)\`, \`1h (1 hour)\`, \`1m (1 minute)\`!`,
    argswinners: `${e.error} Type the \`number of winners!\`\n> Ex: \`1\`, \`2\` **...** \`10\` `,
    prizee: `${e.error} Please put a \`prize\` less **50 letter**`,
    good: `${e.success} **Done, The \`giveaway\` has been \`created\` successfully**`,
    errorlink: `${e.error} Please enter a valid **LINK OF GUILD** or \`something went wrong\``,
    notinserver: `${e.error} Hey! I am not in this **server**, you can \`add me\` by **[clicking here](https://discord.com/api/oauth2/authorize?client_id=598564396691750933&permissions=8&scope=applications.commands%20bot)**`,
    view: `Giveaway Link:`,
  },

  drop: {
    EXAMPLES: `/drop winners:1 prize:Steam Gift card \n /drop winners:1 prize:Steam Gift card channel:#general`,
    dropstart: `${e.success} **Done, The \`drop\` has been \`created\` successfully**`,
    viewdrop: `Drop Link:`,
  },

  delete: {
    EXAMPLES: `/delete => \`chose giveaway id\``,
    option1: (value) => `Giveaway Prize: ${value.prize}`,
    option2: (value) => `Giveaway Id: ${value.messageId}`,
    fordelete: `${e.for} **For Delete a Giveaway:**`,
    done: (giveawayid) =>
      `${e.success} Done the giveaway is deleted \n${e.hash} GiveawayID: \`${giveawayid}\``,
    errmod: `${e.error} An error occurred!`,
  },

  edit: {
    EXAMPLES: `/edit value:Winners new_value:5 => \`chose giveaway id\` \n /edit value:Prize new_value:5$ paypal => \`chose giveaway id\` \n /edit value:duration new_value:1d => \`chose giveaway id\``,
    pr: (messageID) =>
      `${e.success} The giveaway prize has been updated. \n${e.hash} GiveawayID: \`${messageID}\``,
    wi: (messageID) =>
      `${e.success} The giveaway winner has been updated. \n${e.hash} GiveawayID: \`${messageID}\``,
    ti: (messageID) =>
      `${e.success} The giveaway duration has been updated. \n${e.hash} GiveawayID: \`${messageID}\``,
    errmod: `${e.error} An error occurred!`,
    ending: " Ending ",
    foredit: `${e.for} **For Edit a Giveaway:**`,
  },

  end: {
    EXAMPLES: `/end => \`chose giveaway id\``,
    errmod: `${e.error} An error occurred!`,
    good: (messageID) =>
      `${e.success} The giveaway has been finished. \n${e.hash} GiveawayID: \`${messageID}\``,
    forend: `${e.for} **For End a Giveaway:**`,
  },

  pause: {
    EXAMPLES: `/pause => \`chose giveaway id\``,
    forpause: `${e.for} **For Pause a Giveaway:**`,
    done: (messageID) =>
      `${e.success} Done the giveaway is paused. \n${e.hash} GiveawayID: \`${messageID}\``,
    errmod: `${e.error} An error occurred!`,
  },

  resume: {
    EXAMPLES: `/resume => \`chose giveaway id\``,
    autodes: `Auto play after:`,
    forresume: `${e.for} **For Resume a Giveaway:**`,
    done: (messageID) =>
      `${e.success} Done the giveaway is resumed. \n${e.hash} GiveawayID: \`${messageID}\``,
    errmod: `${e.error} An error occurred!`,
  },

  reroll: {
    EXAMPLES: `/reroll => \`chose giveaway id\``,
    startat: `Start At`,
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
    dm3: `・Hosted By ${e.host}:`,
    winMessage: `${e.bot_logo} | Congratulations, {winners}! You won **{this.prize}**!`,
  },

  setdm: {
    EXAMPLES: `/setdm status:on \n /setdm status:off`,
    doneon: `${e.success} | direct winner message correctly activated${e.online}!.`,
    doneoff: `${e.success} | direct winner message correctly deactivated${e.dnd}!.`,
  },

  setmention: {
    EXAMPLES: `/setmention status:on \n /setmention status:off`,
    mon: `${e.success} | setmention command correctly activated${e.online}!.`,
    moff: `${e.success} | setmention command correctly deactivated${e.dnd}!`,
  },

  setrole: {
    EXAMPLES: `/setrole role role_value:@Manager \n /setrole status status_value:on \n /setrole status status_value:off`,
    setrlebedore: `${e.error} | Please choose a role before activating or deactivating it..`,
    roledone: (role) =>
      `${e.success} | Role manager is set: ||<@&${role.id}>||, And \`activated\``,
    ron: `${e.success} | Role manager correctly activated${e.online}!`,
    roff: `${e.success} | Role manager correctly deactivated${e.dnd}!`,
  },

  config: {
    EXAMPLES: `/configuration`,
    configuration: "Configuration:",
    status: `status: `,
    language: `language ${e.lang}`,
    mentiont: `setmention ${e.mention}`,
    setdmt: `setdm ${e.dm}`,
    setrolet: `setrole ${e.role}`,
    setrolede: `role: `,
    norole: `\`No role\``,
  },

  invite: {
    EXAMPLES: `/invite`,
    main: "Hey, you want to invite our bot?",
    disc: `> **You can invite our bot by pressing the \`Invite\` button below.**\n\n > **You can access the \`webiste\` links, \`support server\` and \`vote\`** \`\`\`through the buttons at the bottom\`\`\``,
  },

  ping: {
    EXAMPLES: `/ping`,
    pingmsg: (messagePing, apiPing, status) =>
      `> **Status**: ${status} \n > ${e.ping} **Message ping**: \`${messagePing}\` - ${e.api} ** API ping**: \`${apiPing}\``,
  },

  stats: {
    EXAMPLES: `/stats`,
    title: "ManageGift's Information:",
    creator: `${e.owner} • __Creator:__`,
    stats: `${e.stats} • __Statistics:__`,
    stat: "`Servers:`",
    set: "`Users:`",
    ver: `${e.ver} • __Changelog:__`,
    ram: `${e.ram} • __RAM__`,
    on: `${e.online} • __Uptime__`,
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
    blacklistt: `> \`Add or remove or get list, users & guilds in blacklist\``,
  },

  otherUser: `${e.error} You cannot **edit**, **end** or **delete** this \`giveaway\`, since you are not the \`host\`!`,

  lang: {
    perms: `${e.error} You do not have permission \`MANAGE_MESSAGES\``,
  },

  lastchance: {
    content: `${e.warning} **LAST CHANCE TO ENTER !** ${e.warning}`,
  },

  pauseoptions: {
    content: `${e.pause} **THIS GIVEAWAY IS PAUSED !** ${e.pause}`,
    autostart: (autotime) => `\`Auto Start After:\` ${autotime}`,
  },

  already: {
    enb: `${e.afk} | An error occurred. This command may already be \`enabled\``,
    dis: `${e.afk} | An error occurred. This command may already be \`disabled\``,
  },

  selectmenu: {
    choose: `Please Choose a Giveaway`,
  },

  collector: {
    time: `${e.timeout}**Time is out! try again.**`,
    btntime: `Time is out!`,
  },

  cancel: {
    option1: `Cancel`,
    option2: `Cancel the selection`,
    cancelled: `${e.success} Cancelled`,
  },

  cmd: {
    cooldown: `${e.error} | **You must wait \`4 second(s)\` ${e.timeout} to be able to run this command again!**`,
    notactive: `${e.error} | **This command is not active in this server!**`,
    owneronly: `${e.error} | Only the owner of ManageGift can do these commands!`,
    botperm: `${e.error} | I don't have **\`Administrator\`** permission to execute this command.`,
  },

  blacklist: {
    user: (ureason) =>
      `${e.warning} **You cannot use ManageGift Bot commands** \n \`\`\`Reason: ${ureason}\`\`\` \n**If you think this is a mistake or something like that, do not hesitate and submit your objection in the [Support Server](https://discord.gg/7XfV4Md)**`,
    guild: (sreason) =>
      `${e.warning} **This server is in the blacklist, you cannot use any command on it**\n \`\`\`Reason: ${sreason}\`\`\` \n**If you think this is a mistake or something like that, do not hesitate and submit your objection in the [Support Server](https://discord.gg/7XfV4Md)**`,
  },

  moved: {
    update: `${e.news} Update!`,
    slash:
      "From version `v4.0.0` onwards **ManageGift** moved to **slash commands**! Please type `/help` to see all commands!",
  },

  dashboard: {
    selectserver: "Select a server to manage.",
    addbot: "Invite Bot",
    wlcto: "Welcome to ",
    description:
      "Adjust bot settings, manage giveaways, and customize various features to enhance server experience.",
    botStatus: "Bot Online",
    ping: "Ping:",
    uptime: "Uptime:",
    memory: "Memory:",
    overviewstats: "Overview Stats",
    serverscount: "Servers",
    userscount: "Users",
    commands: "Commands",
    activegiveaways: "Active Giveaways",
    actdes: "On this server",
    allgiveaways: "All Giveaways",
    allgivdes: "Lunched in this server",
    modulestatus: "Module Status",
    givtitle: "Giveaways",
    configtitle: "Config",
    infotitle: "Info",
    quickactions: "Quick Actions",
    profile: "Profile",
    activityhistory: "Activity History",
    cmdtitle: "Command Management in",
    cmddes: "Click the buttons below to customize the command display.",
    cmdall: "All",
    svmsg: "You have unsaved settings!.",
    svyes: "Save",
    svno: "Cancel",
    pausedgive: "Paused Giveaways:",
    giveawaysin: "Giveaways in",
    giveawaycreate: "Create Giveaway",
    winners: "Winner(s):",
    dura: "Duration:",
    hostedBy: "Hosted By:",
    requirements: "Requirements:",
    role: "Role:",
    guild: "Guild:",
    giveawayid: "Giveaway ID:",
    editgiveaway: "✏️ Edit Giveaway",
    noacgive: "❌ No active giveaways.",
    prize: "Prize",
    prizdes:
      "This is the name or prize of the giveaway that is being given away.",
    winners: "Winners",
    winnerdes:
      "This is the number of winners this giveaway should have. There must atleast be 1 winner.",
    durat: "Duration",
    durationdes:
      "This is the duration of the giveaway, it must at least be 1 minute.",
    givchannel: "Giveaway Channel",
    channeldes: "This is the channel the giveaway should be created in.",
    requiredrole: "Required Role",
    enrolereq: "Enable Role Requirements",
    requiredserver: "Required Server",
    enserverreq: "Enable Server Requirements",
    serverlink: "Server Link",
    cnclbtn: "Cancel",
    createbtn: "Create",
    endedgiv: "Ended Giveaways",
    giveended: "Giveaway Ended!",
    givcancelled: "Giveaway Cancelled!",
    rason: "Reason:",
    notenough: "Not enough participants.😒",
    deletegiv: "Delete this Giveaway",
    showmore: "Show More",
    noendedgiv: " No ended giveaways.",
    yesdelete: "Yes, Delete",
    canceldelete: "Cancel",
    configstatus: "Config Status",
    language: "Language",
    dmwinner: "DM Winner",
    enabled: "Enabled",
    disabled: "Disabled",
    giveawaymention: "Giveaway Mention",
    rolemanager: "Role Manager",
    noroleseleced: "No role selected",
    botconfiguration: "Bot Configuration",
    botconfigurationdes: "Easily configure your bot settings below.",
    changebotlang: "Change Bot Language",
    changebotlangdes:
      "Select the language you want to set for the bot in your server.",
    savelanguage: "Save Language",
    activwinnerdm: "Activate Winning DM",
    activwinnerdmdes: "Enable or disable the direct message to the winner.",
    activate: "Activate",
    deactivate: "Deactivate",
    savesettings: "Save Settings",
    activegiveawaymention: "Active Giveaway Mention",
    activegiveawaymentiondes:
      "Enable or disable the giveaway mention alert when a giveaway starts.",
    activerolemanager: "Active Role Manager",
    activerolemanagerdes: "Enable or disable the role manager in your server.",
    selectrole: "Select Role:",
    serverstatistics: "📊 Server Giveaway Statistics",
    totalgiveaways: "Total Giveaways",
    participants: "Participants",
    giveawaystatoverview: "Giveaway Status Overview",
    parvswinners: "Participants vs Winners Comparison",
    givcreationtime: "Giveaway Creation Timeline",
    userid: "User ID:",
    firstusedbot: "First Used Bot:",
    firstlogintodashboard: "First Login to Dashboard:",
    giveawaycreated: "Giveaway Created",
    wins: "Wins",
    participations: "Participations",
    recentactivity: "Recent Activity",
    started: "Started:",
    ended: "Ended:",
    statuss: "Status:",
    ongoing: "Ongoing",
    activitytypes: "Activity Type:",
    noactivity: "No activity found.",
    noguilds: "No guilds with 'MANAGE_GUILD' permissions.",
    nouser: "Error retrieving user data",
    noserver: "Server not found",
    cmdnodes: "No description",
    cmdsenderr: "❌ Command data was not sent correctly!",
    cmdupdatesucc: "Commands updated successfully!",
    datasaveerr: "❌ Failed to save data to the database!",
    unkuser: "Unknown User",
    unkwinner: "Unknown Winner",
    errfetchgiv: "An error occurred while fetching giveaways.",
    nogiv: "Giveaway not found",
    errinterserver: "Internal server error",
    invwinnercount:
      "Invalid winners count! Please enter a positive whole number.",
    invduration:
      "Type a valid `time` please!\n> Ex: `1d (1 day)`, `1h (1 hour)`, `1m (1 minute)`!",
    winnercount: "Winner Count:",
  },
};
