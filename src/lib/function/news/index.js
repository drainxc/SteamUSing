const API_KEY = "78093FE6ED103C9612F993AEDA484F93";
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

const embed = require("../embed");

module.exports = {
  news: function (msg) {
    steam
      .getAppList()
      .then((item) => {
        console.log(item);
        let loading = true;
        for (let i = 0; i < item.length; i++) {
          if (
            item[i].name.toUpperCase() === msg.content.slice(5).toUpperCase()
          ) {
            loading = false;
            console.log(item[i].appid);
            console.log(i);
            steam
              .getGameDetails(`${item[i].appid}`, false)
              .then((object) => {
                steam.getGameNews(`${item[i].appid}`).then((content) => {
                  const newsEmbed = embed.newsEmbed(object, content);
                  msg.channel.send({ embeds: [newsEmbed] });
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
        }, 7500);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
