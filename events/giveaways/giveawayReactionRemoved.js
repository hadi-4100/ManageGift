const GiveawayModel = require("../../database/Giveaway");

module.exports = async (client, giveaway, member, reaction) => {
  try {
    const giveawaydb = await GiveawayModel.findOne({
      messageId: giveaway.messageId,
    });

    if (giveawaydb) {
      giveawaydb.reactionUsers.pull(member.id);
      await giveawaydb.save();
    }

    client.log(
      `${member.user.tag} unreacted from giveaway #${giveaway.messageId}`,
      "log"
    );
  } catch (err) {
    client.log(`Error removing user from giveaway: ${err.message}`, "error");
  }
};
