const { EmbedBuilder } = require("discord.js");
const GiveawayModel = require("../../database/Giveaway");

module.exports = async (giveaway, member, reaction) => {
  // التحقق من القيم قبل استخدامها
  let approvedTitle = giveaway.messages.approved1 || "Default Approved Title";
  let deniedTitle = giveaway.messages.denied1 || "Default Denied Title";

  // التأكد من أن القيم موجودة قبل استخدام replace
  let approvedDescription = giveaway.messages.approved2
    ? giveaway.messages.approved2.replace(`{messageURL}`, giveaway.messageURL)
    : "No description available";
  let deniedDescription = giveaway.messages.denied2
    ? giveaway.messages.denied2.replace(`{messageURL}`, giveaway.messageURL)
    : "No description available";

  let approved = new EmbedBuilder()
    .setTitle(approvedTitle)
    .setDescription(approvedDescription)
    .setThumbnail("https://probot.media/Vi7an1G8jW.png")
    .setImage("https://b.top4top.io/p_2533c3xjg1.png")
    .setFooter({ text: `ManageGift` })
    .setColor("#5C63E5")
    .setTimestamp();

  let denied = new EmbedBuilder()
    .setTitle(deniedTitle)
    .setDescription(deniedDescription)
    .setThumbnail("https://probot.media/Vi7an1G8jW.png")
    .setImage("https://b.top4top.io/p_2533c3xjg1.png")
    .setFooter({ text: `ManageGift` })
    .setColor("#212CC8")
    .setTimestamp();

  let { required_role: roleReq, required_server: serverReq } =
    giveaway.extraData || {}; // Safely handle missing extraData
  let client = reaction.message.client;
  let guild = reaction.message.guild;

  let sendError = false,
    sendAcc = false;

  if (member.user.bot) return; // Ignore bot reactions

  if (giveaway.extraData) {
    if (roleReq) {
      let role = guild.roles.cache.find((role) => role.id === roleReq);
      if (role) {
        if (guild.members.cache.get(member.id).roles.cache.has(role.id)) {
          sendAcc = true;
        } else {
          try {
            await reaction.users.remove(member.user);
          } catch (e) {
            console.error(e);
          }
          sendError = true;
        }
      }
    }

    if (serverReq) {
      let server = client.guilds.cache.get(serverReq);
      let user = await server.members.fetch(member.id).catch(() => {
        /* NOT IN THE SERVER */
      });
      if (!user) {
        try {
          await reaction.users.remove(member.user);
        } catch (e) {
          console.error(e);
        }
        sendError = true;
      } else {
        sendAcc = true;
      }
    }

    if (sendError) {
      member.send({ embeds: [denied] }).catch(() => {
        /* OPEN YOUR DM DUMP */
      });
      console.log(
        `${member.user.username} entered giveaway #${giveaway.messageId} but was not approved.`
      );
    } else if (sendAcc) {
      member.send({ embeds: [approved] }).catch(() => {
        /* OPEN YOUR DM DUMP */
      });
      const giveawaydb = await GiveawayModel.findOne({
        messageId: giveaway.messageId,
      });
      if (giveawaydb) {
        try {
          giveawaydb.reactionUsers.addToSet(member.id); // إضافة العنصر إلى المصفوفة إذا لم يكن موجودًا
          await giveawaydb.save(); // حفظ التغييرات
        } catch (err) {
          console.error("Error adding user to giveaway:", err);
        }
      }
      console.log(
        `${member.user.username} entered giveaway #${giveaway.messageId}`
      );
    } else {
      // If no extra data, still log the participation
      const giveawaydb = await GiveawayModel.findOne({
        messageId: giveaway.messageId,
      });
      if (giveawaydb) {
        try {
          giveawaydb.reactionUsers.addToSet(member.id); // إضافة العنصر إلى المصفوفة إذا لم يكن موجودًا
          await giveawaydb.save(); // حفظ التغييرات
        } catch (err) {
          console.error("Error adding user to giveaway:", err);
        }
      }
      console.log(
        `${member.user.username} entered giveaway #${giveaway.messageId} (No extra data)`
      );
    }
  }
};
