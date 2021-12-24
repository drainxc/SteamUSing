const API_KEY = process.env.APIKEY;
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

const embed = require("../embed");

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
                const userEmbed = embed.userEmbed(item, game, playGame, level);
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
