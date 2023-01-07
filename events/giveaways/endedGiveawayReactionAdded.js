module.exports = async (giveaway, member, reaction) => {
    return reaction.users.remove(member.user);
};