const { EmbedBuilder } = require("discord.js");

module.exports = async (client, giveaway, winners) => {
  if (giveaway.extraData?.dmwinners) {
    winners.forEach((member) => {
      const dmEmbed = new EmbedBuilder()
        .setDescription(
          giveaway.messages.dm1.replace("{winner}", member.user.username)
        )
        .addFields(
          { name: giveaway.messages.dm2, value: `\`${giveaway.prize}\`` },
          { name: giveaway.messages.dm3, value: `${giveaway.hostedBy}` }
        )
        .setThumbnail("https://probot.media/Vi7an1G8jW.png")
        .setImage("https://b.top4top.io/p_2533c3xjg1.png")
        .setFooter({ text: "ManageGift" })
        .setTimestamp()
        .setColor(client.config.embeds.color || "#454DFC");

      member.send({ embeds: [dmEmbed] }).catch(() => {
        client.log(`Failed to send win DM to ${member.user.tag}`, "warn");
      });
    });
  }

  client.log(
    `Giveaway ended: ${giveaway.messageId} (Prize: ${giveaway.prize})`,
    "log"
  );
};
