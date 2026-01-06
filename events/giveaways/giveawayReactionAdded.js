const { EmbedBuilder } = require("discord.js");
const GiveawayModel = require("../../database/Giveaway");

module.exports = async (client, giveaway, member, reaction) => {
  if (member.user.bot) return;

  const { messages, extraData, messageURL, messageId } = giveaway;
  const { required_role: roleReq, required_server: serverReq } =
    extraData || {};

  // Build embeds
  const createEmbed = (title, desc, color) =>
    new EmbedBuilder()
      .setTitle(title)
      .setDescription(desc.replace("{messageURL}", messageURL))
      .setThumbnail("https://probot.media/Vi7an1G8jW.png")
      .setImage("https://b.top4top.io/p_2533c3xjg1.png")
      .setFooter({ text: "ManageGift" })
      .setColor(color)
      .setTimestamp();

  const approvedEmbed = createEmbed(
    messages.approved1 || "Entry Approved",
    messages.approved2 ||
      "Your entry to [this giveaway]({messageURL}) has been approved.",
    "#5C63E5"
  );

  const deniedEmbed = createEmbed(
    messages.denied1 || "Entry Denied",
    messages.denied2 ||
      "You do not meet the requirements for [this giveaway]({messageURL}).",
    "#212CC8"
  );

  let isApproved = true;

  // Requirement checks
  if (roleReq) {
    const hasRole = member.roles.cache.has(roleReq);
    if (!hasRole) isApproved = false;
  }

  if (isApproved && serverReq) {
    try {
      const targetGuild = client.guilds.cache.get(serverReq);
      if (targetGuild) {
        const targetMember = await targetGuild.members
          .fetch(member.id)
          .catch(() => null);
        if (!targetMember) isApproved = false;
      }
    } catch (err) {
      client.log(`Error checking server requirement: ${err.message}`, "error");
      isApproved = false;
    }
  }

  // if there are specific requirements (role or server)
  // so they know if they qualified or why they were rejected.
  const hasRequirements = !!(roleReq || serverReq);
  const shouldNotify = hasRequirements;

  if (!isApproved) {
    try {
      await reaction.users.remove(member.user);
      if (shouldNotify) {
        await member.send({ embeds: [deniedEmbed] }).catch(() => null);
      }
    } catch (err) {
      client.log(
        `Failed to process denied entry for ${member.user.tag}: ${err.message}`,
        "warn"
      );
    }
    return;
  }

  // Approved entry
  try {
    if (shouldNotify) {
      await member.send({ embeds: [approvedEmbed] }).catch(() => null);
    }

    // Update participating users in DB
    await GiveawayModel.findOneAndUpdate(
      { messageId },
      { $addToSet: { reactionUsers: member.id } }
    );

    client.log(`${member.user.tag} entered giveaway #${messageId}`, "log");
  } catch (err) {
    client.log(
      `Error processing approved entry for ${member.user.tag}: ${err.message}`,
      "error"
    );
  }
};
