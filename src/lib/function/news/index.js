const API_KEY = process.env.APIKEY;
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

const { MessageEmbed } = require("discord.js");
const color = "#0099ff";
const logo =
  "https://cdn.discordapp.com/attachments/921024184694497341/923239613617807371/Group_29.png";


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
                  const newsEmbed = new MessageEmbed()
                    .setColor(color)
                    .setTitle(object.name)
                    .setURL(object.website)
                    .setAuthor("SteamUSing", logo)
                    .setThumbnail(object.header_image)
                    .setDescription(`${content[0].contents}`)
                    .setFooter("SteamUSing", logo);
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
