const API_KEY = process.env.APIKEY;
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

const embed = require("../embed/index");
const load = require("../../function/loading/index");

module.exports = {
  soundTrack: function (msg) {
    msg.reply("정보를 불러오는 중입니다!").then((msg) => {
      message = msg;
    });
    steam
      .getAppList()
      .then((item) => {
        console.log(item);
        let loading = true;
        const sound = [
          " - soundtrack",
          " soundtrack",
          " - original soundtrack",
          " original soundtrack",
          " - official soundtrack",
          " official soundtrack",
        ];
        const soundtrack = sound.map(function (item) {
          return (msg.content.slice(5) + item).toUpperCase();
        });
        for (let i = 0; i < item.length; i++) {
          for (let j = 0; j < soundtrack.length; j++) {
            if (item[i].name.toUpperCase() === soundtrack[j]) {
              console.log(item[i].appid);
              steam
                .getGameDetails(`${item[i].appid}`, false)
                .then((object) => {
                  if (object.type === "music") {
                    loading = false;
                    message.delete();
                    infoEmbed = embed.infoEmbed(object);
                    msg.channel.send({ embeds: [infoEmbed] });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        }
        setTimeout(() => {
          if (loading) {
            msg.reply("정보를 불러오는데 실패했습니다..");
          } else {
            loading = true;
          }
          return loading;
        }, 7500);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
