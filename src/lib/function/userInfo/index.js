const API_KEY = "78093FE6ED103C9612F993AEDA484F93";
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

const embed = require("../embed");

module.exports = {
  userInfomation: function (msg) {
    steam
      .resolve("https://steamcommunity.com/id/" + `${msg.content.slice(7)}`)
      .then((id) => {
        steam
          .getUserOwnedGames(`${id}`)
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
              .getUserSummary(`${id}`)
              .then((item) => {
                console.log(item);
                steam
                  .getUserLevel(`${id}`)
                  .then((level) => {
                    const userEmbed = embed.userEmbed(
                      item,
                      game,
                      playGame,
                      level
                    );
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
      })
      .catch((err) => {
        msg.reply("맞는 유저정보가 없습니다..");
      });
    return;
  },
};
