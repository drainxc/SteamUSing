const API_KEY = process.env.APIKEY;
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

const embed = require("../embed/index");

module.exports = {
  infomation: function (msg) {
    msg.reply("정보를 불러오는 중입니다!").then((msg) => {
      message = msg;
    });
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
                console.log(object);
                loading = false;
                message.delete();
                infoEmbed = embed.infoEmbed(object);
                msg.channel.send({ embeds: [infoEmbed] });
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
