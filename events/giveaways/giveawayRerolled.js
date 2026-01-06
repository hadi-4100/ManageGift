module.exports = async (client, giveaway, winners) => {
  if (giveaway.extraData?.dmwinners) {
    winners.forEach((member) => {
      member
        .send(
          `:tada: Congratulations, **${member.user.username}**! You won the reroll for **${giveaway.prize}**!`
        )
        .catch(() => {
          client.log(
            `Failed to send reroll win DM to ${member.user.tag}`,
            "warn"
          );
        });
    });
  }

  client.log(
    `Giveaway rerolled: ${giveaway.messageId} (Prize: ${giveaway.prize})`,
    "log"
  );
};
