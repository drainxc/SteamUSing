const API_KEY = process.env.APIKEY;
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

const { MessageEmbed } = require("discord.js");
const color = "#0099ff";
const logo =
  "https://cdn.discordapp.com/attachments/921024184694497341/923239613617807371/Group_29.png";

module.exports = {
  recentGame: function (msg) {
    steam
      .getUserRecentGames("76561199042079317")
      .then((item) => {
        const playerEmbed = new MessageEmbed()
          .setColor(color)
          .setTitle(item[0].name)
          .setAuthor("SteamUSing", logo)
          .setThumbnail(item[0].logoURL)
          .addFields(
            {
              name: "게임",
              value: item[0].name,
              inline: true,
            },
            {
              name: "총 플레이타임",
              value: `${(item[0].playTime / 60).toFixed(1)}` + "시간",
              inline: true,
            },
            {
              name: "최근 플레이타임",
              value: `${(item[0].playTime2 / 60).toFixed(1)}` + "시간",
              inline: true,
            }
          )
          .setFooter("SteamUSing", logo);
        msg.channel.send({ embeds: [playerEmbed] });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
