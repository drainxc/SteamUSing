const API_KEY = process.env.APIKEY;
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

const embed = require("../embed/index");

module.exports = {
  player: function (msg) {
    msg.reply("정보를 불러오는 중입니다!").then((msg) => {
      message = msg;
    });
    steam.getAppList().then((item) => {
        let loading = true;
      for (let i = 0; i < item.length; i++) {
        if (item[i].name.toUpperCase() === msg.content.slice(6).toUpperCase()) {
          steam
            .getGamePlayers(`${item[i].appid}`)
            .then((player) => {
              steam
                .getGameDetails(`${item[i].appid}`, false)
                .then((object) => {
                  message.delete();
                  loading = false;
                  playerEmbed = embed.playerEmbed(object, player);
                  msg.channel.send({ embeds: [playerEmbed] });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
      setTimeout(() => {
        if (loading) {
          msg.reply("정보를 불러오는데 실패했습니다..");
        } else {
          loading = true;
        }
      }, 10000);
    });
  },
};
