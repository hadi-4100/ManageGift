const GiveawayModel = require("../../database/Giveaway");

module.exports = async (giveaway, member, reaction) => {
  const giveawaydb = await GiveawayModel.findOne({
    messageId: giveaway.messageId,
  });
  if (giveawaydb) {
    try {
      giveawaydb.reactionUsers.pull(member.id); // ازالة العنصر إلى المصفوفة إذا كان موجودًا
      await giveawaydb.save(); // حفظ التغييرات
    } catch (err) {
      console.error("Error removing user to giveaway:", err);
    }
  }
  console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageId}`);
};
