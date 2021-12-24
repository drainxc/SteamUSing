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

const embed = require("../../lib/function/infoEmbed/index");

const logo =
  "https://cdn.discordapp.com/attachments/921024184694497341/923239613617807371/Group_29.png";
const color = "#0D7EAD";
let message;
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
                  const saleEmbed = new MessageEmbed()
                    .setColor(color)
                    .setTitle(object.name)
                    .setAuthor("SteamUSing", logo)
                    .setThumbnail(object.header_image)
                    .addField("가격", "무료")
                    .setFooter(object.publishers[0], logo);
                  saletime = {
                    hours: hours,
                    minutes: minutes,
                  };
                  saleItem = saleEmbed;
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
            console.log(item[i].appid);
            console.log(i);
            steam
              .getGameDetails(`${item[i].appid}`, false)
              .then((object) => {
                console.log(object);
                message.delete();
                infoEmbed = embed.infoEmbed(object);
                msg.channel.send({ embeds: [infoEmbed] });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (msg.content.substring(0, 6) === ">>동접자 ") {
    steam.getAppList().then((item) => {
      for (let i = 0; i < item.length; i++) {
        if (item[i].name.toUpperCase() === msg.content.slice(6).toUpperCase()) {
          steam
            .getGamePlayers(`${item[i].appid}`)
            .then((player) => {
              steam
                .getGameDetails(`${item[i].appid}`, false)
                .then((object) => {
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
    });
  }

  if (msg.content.substring(0, 7) === ">>유저등록 ") {
    if (msg.content.length === 23) {
      const nickName = msg.author.username + "#" + msg.author.discriminator;
      const steamID = msg.content.substring(7, msg.content.length);
      console.log(nickName, steamID);
      const userEmbed = new MessageEmbed()
        .setColor(color)
        .setTitle("회원가입이 성공적으로 완료되었습니다!")
        .setAuthor("SteamUSing", logo)
        .setFooter("SteamUSing", logo);
      msg.reply({ embeds: [userEmbed] });
    } else {
      msg.reply("steam ID가 잘 못 되었습니다!");
    }
  }

  if (msg.content.substring(0, 4) === ">>도움") {
    const helpEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("SteamUSing 도움말")
      .setAuthor("SteamUSing", logo)
      .setThumbnail(logo)
      .addFields(
        {
          name: ">>도움",
          value: "지원하는 모든 명령어를 보실 수 있습니다! \n ex) >>도움",
          inline: false,
        },
        {
          name: ">>유저등록",
          value:
            "유저의 스팀ID를 기억해 언제든지 사용하실 수 있습니다! \n ex) >>유저등록 76561199042079317(steam ID)",
          inline: false,
        },
        {
          name: ">>정보",
          value: "게임의 정보를 보실 수 있습니다! \n ex) >>정보 Hollow Knight",
          inline: false,
        },
        {
          name: ">>노래",
          value:
            "게임 사운드트랙의 정보를 보실 수 있습니다! \n ex) >>노래 CupHead",
          inline: false,
        },
        {
          name: ">>세일",
          value: "현재 100% 세일하는 게임을 보실 수 있습니다! \n ex) >>세일",
        },
        {
          name: ">>동접자",
          value:
            "게임의 동시접속자 수를 보실 수 있습니다! \n ex) >>동접자 Dota 2",
          inline: false,
        }
      )
      .setFooter("(단, 게임의 이름은 풀 네임으로 작성하셔야 합니다!)", logo);
    msg.channel.send({ embeds: [helpEmbed] });
  }
});

client.login(TOKEN);
