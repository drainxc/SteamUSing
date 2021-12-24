const { MessageEmbed } = require("discord.js");
const color = "#0D7EAD";
const logo =
  "https://cdn.discordapp.com/attachments/921024184694497341/923239613617807371/Group_29.png";

module.exports = {
  infoEmbed: function (object) {
    const {
      name = "",
      website = "",
      short_description = "",
      header_image = "",
      developers = "",
      price_overview = "",
      recommendations = "",
      publishers = "",
    } = object;
    const { final_formatted = "무료", discount_percent = "없음" } =
      price_overview;
    const { total = "없음" } = recommendations;
    const infoEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(name)
      .setURL(website)
      .setAuthor("SteamUSing", logo, website)
      .setDescription(`${short_description}`)
      .addField("개발사", `${developers[0]}`)
      .addField("\u200B", "\u200B")
      .addFields(
        {
          name: "현재 가격",
          value: `${final_formatted}`,
          inline: true,
        },
        {
          name: "할인율",
          value: `${discount_percent}` + "%",
          inline: true,
        },
        {
          name: "평가 갯수",
          value: `${total}`,
          inline: true,
        }
      )
      .setImage(header_image)
      .setTimestamp()
      .setFooter(`${publishers[0]}`, logo);
    return infoEmbed;
  },
  playerEmbed: function (object, player) {
    const playerEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(object.name)
      .setAuthor("SteamUSing", logo)
      .setThumbnail(object.header_image)
      .addFields(
        {
          name: "개발사",
          value: object.developers[0],
          inline: true,
        },
        {
          name: "출시 날짜",
          value: object.release_date.date,
          inline: true,
        },
        {
          name: "동접자 수",
          value: `${player}`,
          inline: true,
        }
      )
      .setFooter(object.publishers[0], logo);
    return playerEmbed;
  },
};
