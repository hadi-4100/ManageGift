const { EmbedBuilder } = require("discord.js");

module.exports = async (giveaway, winners) => {

    if (giveaway.extraData) {
        if (giveaway.extraData.dmwinners) {
            winners.forEach((member) => {

                let dm = new EmbedBuilder()
                    .setDescription(giveaway.messages.dm1.replace(`{winner}`, member))
                    .addFields({ name: giveaway.messages.dm2, value: "\`" + giveaway.prize + "\`" })
                    .addFields({ name: giveaway.messages.dm3, value: giveaway.hostedBy })
                    .setThumbnail("https://probot.media/Vi7an1G8jW.png")
                    .setImage("https://media.discordapp.net/attachments/615154373953191937/1022846792011882536/ManageGift2.png")
                    .setFooter({ text: "ManageGift" })
                    .setTimestamp()
                    .setColor("#454DFC")

                member.send({ embeds: [dm] }).catch((err) => { /* OPEN YOUR DM DUMP */ })
            })
        }
    }

    console.log('Giveaway with message Id ' + giveaway.messageId + ' was ended.')
};