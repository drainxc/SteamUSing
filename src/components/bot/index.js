require("dotenv").config();
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const { MessageEmbed } = require("discord.js");
const API_KEY = process.env.APIKEY;
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);
const TOKEN = process.env.TOKEN;

const embed = require("../../lib/function/embed/index");

const logo =
  "https://cdn.discordapp.com/attachments/921024184694497341/923239613617807371/Group_29.png";
const color = "#0D7EAD";
let message;
let loading = true;
let saletime = {
  hours: 0,
  minutes: 0,
};

let saleItem = new MessageEmbed()
  .setColor(color)
  .setTitle("지금 100% 세일하는 게임이 없습니다!")
  .setAuthor("SteamUSing", logo);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  let count = 0;
  steam
    .get(`/ISteamApps/GetAppList/v2/?key=${API_KEY}`)
    .then((item) => {
      setInterval(() => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        if (hours === saletime.hours && minutes === saletime.minutes) {
          count = 0;
          saleItem = new MessageEmbed()
            .setColor(color)
            .setTitle("지금 100% 세일하는 게임이 없습니다!")
            .setAuthor("SteamUSing", logo);
        }
        for (let i = count; i < count + 1; i++) {
          steam
            .getGameDetails(`${item.applist.apps[i].appid}`, false)
            .then((object) => {
              const { price_overview = "", type = "" } = object;
              const { discount_percent = 0 } = price_overview;
              if (type === "game") {
                if (discount_percent === 100) {
                  console.log(object);
                  saletime = {
                    hours: hours,
                    minutes: minutes,
                  };
                  saleItem = embed.saleEmbed(object);
                }
              }
            })
            .catch((err) => {});
        }
        count += 1;
      }, (item.applist.apps.length / 24 / 60 / 60) * 1000);
    })
    .catch((err) => {});
});

client.on("message", (msg) => {
  if (msg.content.substring(0, 5) === ">>정보 ") {
    msg.reply("정보를 불러오는 중입니다!").then((msg) => {
      message = msg;
    });
    steam
      .getAppList()
      .then((item) => {
        console.log(item);
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
  }

  if (msg.content.substring(0, 4) === ">>세일") {
    msg.channel.send({ embeds: [saleItem] });
  }

  if (msg.content.substring(0, 5) === ">>노래 ") {
    msg.reply("정보를 불러오는 중입니다!").then((msg) => {
      message = msg;
    });
    steam
      .getAppList()
      .then((item) => {
        console.log(item);
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
        }, 10000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (msg.content.substring(0, 6) === ">>동접자 ") {
    msg.reply("정보를 불러오는 중입니다!").then((msg) => {
      message = msg;
    });
    steam.getAppList().then((item) => {
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
  }

  if (msg.content.substring(0, 7) === ">>유저등록 ") {
    if (msg.content.length === 24) {
      const nickName = msg.author.username + "#" + msg.author.discriminator;
      const steamID = msg.content.substring(7, msg.content.length);
      console.log(nickName, steamID);
      userEmbed = embed.userEmbed();
      msg.reply({ embeds: [userEmbed] });
    } else {
      msg.reply("steam ID가 잘 못 되었습니다!");
      console.log(msg.content.length);
    }
  }

  if (msg.content.substring(0, 4) === ">>도움") {
    helpEmbed = embed.helpEmbed();
    msg.channel.send({ embeds: [helpEmbed] });
  }
});

client.login(TOKEN);
