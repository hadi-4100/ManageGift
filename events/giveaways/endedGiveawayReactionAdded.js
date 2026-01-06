module.exports = async (client, giveaway, member, reaction) => {
  try {
    await reaction.users.remove(member.user);
  } catch (err) {
    client.log(
      `Error removing reaction from ended giveaway: ${err.message}`,
      "warn"
    );
  }
};
