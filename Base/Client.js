const {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Collection,
} = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
const giveawayModel = require("../database/Giveaway.js");
const config = require("../config.js");
const Logger = require("../utils/Logger.js");
const GuildModel = require("../database/Guild.js");
const UserModel = require("../database/User.js");
const LogModel = require("../database/Log.js");

class GiveawayManagerWithOwnDatabase extends GiveawaysManager {
  async getAllGiveaways() {
    return await giveawayModel.find().lean().exec();
  }

  async saveGiveaway(messageId, giveawayData) {
    await giveawayModel.create(giveawayData);
    return true;
  }

  async editGiveaway(messageId, giveawayData) {
    await giveawayModel.updateOne({ messageId }, giveawayData).exec();
    return true;
  }

  async deleteGiveaway(messageId) {
    await giveawayModel.deleteOne({ messageId }).exec();
    return true;
  }

  generateMainEmbed(giveaway, lastChanceEnabled) {
    const mainEmbed = new EmbedBuilder()
      .setAuthor({ name: giveaway.prize })
      .setTitle(
        giveaway.isDrop
          ? null
          : giveaway.pauseOptions.isPaused
          ? giveaway.pauseOptions.content
          : lastChanceEnabled
          ? giveaway.lastChance.content
          : null
      )
      .setDescription(
        giveaway.isDrop
          ? `${giveaway.messages.drop}\n${giveaway.messages.content2.replace(
              "{winners}",
              giveaway.winnerCount
            )}\n${giveaway.messages.hostedBy.replace(
              "{hostedBy}",
              giveaway.hostedBy
            )}`
          : `${
              giveaway.messages.content1
            }\n${giveaway.messages.content2.replace(
              "{winners}",
              giveaway.winnerCount
            )}\n${giveaway.messages.content3
              .replace(
                "{time}",
                giveaway.endAt === Infinity
                  ? giveaway.pauseOptions.infiniteDurationText
                  : `<t:${Math.round(giveaway.endAt / 1000)}:R>`
              )
              .replace(
                "{messageId}",
                giveaway.messageId
              )}\n${giveaway.messages.hostedBy.replace(
              "{hostedBy}",
              giveaway.hostedBy
            )}`
      )
      .setImage("https://b.top4top.io/p_2533c3xjg1.png")
      .setColor(
        giveaway.isDrop
          ? giveaway.embedColor
          : giveaway.pauseOptions.isPaused && giveaway.pauseOptions.embedColor
          ? giveaway.pauseOptions.embedColor
          : lastChanceEnabled
          ? giveaway.lastChance.embedColor
          : giveaway.embedColor
      );

    const footerText = giveaway.isDrop
      ? giveaway.messages.dropfooter
      : giveaway.messages.embedFooter;

    mainEmbed.setFooter({
      text: footerText,
      iconURL: this.client.user.displayAvatarURL(),
    });

    if (giveaway.extraData) {
      if (
        giveaway.extraData.required_role &&
        !giveaway.extraData.required_server
      ) {
        mainEmbed.addFields({
          name: giveaway.messages.req || "Requirements:",
          value: (giveaway.messages.rolereq || "Role: {rolereq}").replace(
            "{rolereq}",
            giveaway.extraData.required_role
          ),
        });
      }
      if (
        giveaway.extraData.required_server &&
        !giveaway.extraData.required_role
      ) {
        mainEmbed.addFields({
          name: giveaway.messages.req || "Requirements:",
          value:
            typeof giveaway.messages.serverreq === "function"
              ? giveaway.messages.serverreq(
                  "Click to join",
                  giveaway.extraData.required_server
                )
              : giveaway.messages.serverreq ||
                `Guild: [Click to join](${giveaway.extraData.required_server})`,
        });
      }
      if (
        giveaway.extraData.required_server &&
        giveaway.extraData.required_role
      ) {
        mainEmbed.addFields({
          name: giveaway.messages.req || "Requirements:",
          value:
            (giveaway.messages.rolereq || "Role: {rolereq}").replace(
              "{rolereq}",
              giveaway.extraData.required_role
            ) +
            "\n" +
            (typeof giveaway.messages.serverreq === "function"
              ? giveaway.messages.serverreq(
                  "Click to join",
                  giveaway.extraData.required_server
                )
              : giveaway.messages.serverreq ||
                `Guild: [Click to join](${giveaway.extraData.required_server})`),
        });
      }
    }

    if (giveaway.endAt !== Infinity) mainEmbed.setTimestamp(giveaway.endAt);
    return mainEmbed;
  }

  generateEndEmbed(giveaway, winners) {
    const endEmbed = new EmbedBuilder()
      .setTitle(
        giveaway.isDrop ? giveaway.messages.drpend : giveaway.messages.end1
      )
      .setDescription(
        `${giveaway.messages.end2.replace(
          "{prize}",
          giveaway.prize
        )}\n${giveaway.messages.end3.replace(
          "{winners}",
          winners
        )}\n${giveaway.messages.hostedBy.replace(
          "{hostedBy}",
          giveaway.hostedBy
        )}`
      )
      .setImage("https://b.top4top.io/p_2533c3xjg1.png")
      .setFooter({
        text: giveaway.messages.embedFooter,
        iconURL: this.client.user.displayAvatarURL(),
      })
      .setColor("#454DFC");

    if (giveaway.extraData?.required_role) {
      endEmbed.addFields({
        name: giveaway.messages.req || "Requirements:",
        value: (giveaway.messages.rolereq || "Role: {rolereq}").replace(
          "{rolereq}",
          giveaway.extraData.required_role
        ),
      });
    }

    if (giveaway.endAt !== Infinity) endEmbed.setTimestamp(giveaway.endAt);
    return endEmbed;
  }

  generateNoValidParticipantsEndEmbed(giveaway) {
    return new EmbedBuilder()
      .setAuthor({ name: giveaway.prize })
      .setDescription(
        `${giveaway.messages.novalid1}\n${
          giveaway.messages.novalid2
        }\n${giveaway.messages.hostedBy.replace(
          "{hostedBy}",
          giveaway.hostedBy
        )}`
      )
      .setImage("https://b.top4top.io/p_2533c3xjg1.png")
      .setFooter({
        text: giveaway.messages.novalidfoo,
        iconURL: this.client.user.displayAvatarURL(),
      })
      .setColor("#5c63e5");
  }
}

class ManageGift extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
      ],
    });

    this.config = config;
    this.log = Logger;
    this.guildsData = GuildModel;
    this.usersData = UserModel;
    this.logs = LogModel;
    this.interactions = new Collection();

    // Lazy load dashboard to avoid circular dependency or early start
    this.dashboard = null;

    this.manager = new GiveawayManagerWithOwnDatabase(this, {
      default: {
        botsCanWin: false,
        embedColor: "#5C63E5",
        reaction: this.config.giveaway.reaction,
      },
    });
  }

  async findOrCreateGuild({ id }, isLean = false) {
    if (!id) return null;
    if (!this.guildsData) {
      this.log("Guild data model is not initialized!", "error");
      return null;
    }

    let guild = isLean
      ? await this.guildsData.findOne({ id }).lean()
      : await this.guildsData.findOne({ id });

    if (!guild) {
      guild = await this.guildsData.create({ id });
      if (isLean) guild = guild.toJSON();
    }
    return guild;
  }

  async findOrCreateUser({ id }, isLean = false) {
    if (!id) return null;
    if (!this.usersData) {
      this.log("User data model is not initialized!", "error");
      return null;
    }

    let user = isLean
      ? await this.usersData.findOne({ id }).lean()
      : await this.usersData.findOne({ id });

    if (!user) {
      user = await this.usersData.create({ id });
      if (isLean) user = user.toJSON();
    }
    return user;
  }
}

module.exports = ManageGift;
