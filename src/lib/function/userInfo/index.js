const API_KEY = process.env.APIKEY;
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

const { MessageEmbed } = require("discord.js");
const color = "#0099ff";
const logo =
  "https://cdn.discordapp.com/attachments/921024184694497341/923239613617807371/Group_29.png";

module.exports = {
  userInfomation: function (msg) {
    steam
      .getUserOwnedGames("76561199042079317")
      .then((game) => {
        let max = 0;
        let playGame = 0;
        for (let i = 0; i < game.length; i++) {
          if (game[i].playTime > max) {
            max = game[i].playTime;
            playGame = i;
          }
        }
        console.log(game[playGame]);
        steam
          .getUserSummary("76561199042079317")
          .then((item) => {
            console.log(item);
            steam
              .getUserLevel("76561199042079317")
              .then((level) => {
                console.log(level);
                const userEmbed = new MessageEmbed()
                  .setColor(color)
                  .setTitle(item.nickname)
                  .setURL(item.url)
                  .setAuthor("SteamUSing", logo)
                  .setThumbnail(item.avatar.large)
                  .addField("\u200B", "\u200B")
                  .addFields(
                    {
                      name: "닉네임",
                      value: `${item.nickname}`,
                      inline: true,
                    },
                    {
                      name: "레벨",
                      value: `${level}`,
                      inline: true,
                    },
                    {
                      name: "steam ID",
                      value: `${item.steamID}`,
                      inline: true,
                    },
                    {
                      name: "가장 많이 플레이한 게임",
                      value: game[playGame].name,
                      inline: true,
                    },
                    {
                      name: "가진 게임 갯수",
                      value: `$ {game.length}`,
                      inline: true,
                    }
                  )
                  .setImage(game[playGame].logoURL)
                  .setFooter("SteamUSing", logo);
                msg.channel.send({ embeds: [userEmbed] });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
