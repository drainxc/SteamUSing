require('dotenv').config();
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const { MessageEmbed } = require("discord.js");
const API_KEY = process.env.APIKEY;
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);
const TOKEN = process.env.TOKEN;

const logo =
  "https://cdn.discordapp.com/attachments/921024184694497341/923239613617807371/Group_29.png";
const color = "#0D7EAD";

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
        if (hours === 0 && minutes === 0) {
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
                    .setFooter(object.publishers[0], logo);
                  saleItem = saleEmbed;
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        count += 1;
      }, (item.applist.apps.length / 24 / 60 / 60) * 1000);
    })
    .catch((err) => {
      console.log(err);
    });
});

client.on("message", (msg) => {
  message = msg;
  if (msg.content.substring(0, 5) === ">>정보 ") {
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
                infoEmbed = embed(object);
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
                  console.log(object);
                  if (object.type === "music") {
                    infoEmbed = embed(object);
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
                .then((item) => {
                  const playerEmbed = new MessageEmbed()
                    .setColor(color)
                    .setTitle(item.name)
                    .setAuthor("SteamUSing", logo)
                    .setThumbnail(item.header_image)
                    .addFields(
                      {
                        name: "개발사",
                        value: item.developers[0],
                        inline: true,
                      },
                      {
                        name: "출시 날짜",
                        value: item.release_date.date,
                        inline: true,
                      },
                      {
                        name: "동접자 수",
                        value: `${player}`,
                        inline: true,
                      }
                    )
                    .setFooter(item.publishers[0], logo);
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

  if (msg.content.substring(0, 4) === ">>도움") {
    const helpEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("SteamUSing 도움말")
      .setAuthor("SteamUSing", logo)
      .setThumbnail(logo)
      .addFields(
        {
          name: ">>도움",
          value: "지원하는 모든 명령어를 보실 수 있습니다! \n >>도움",
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
          value: "현재 100% 세일하는 게임을 보실 수 있습니다! \n >>세일",
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

  function embed(object) {
    const {
      name = "",
      website = "",
      short_description = "",
      header_image = "",
      developers = "",
      price_overview = "",
      recommendations = "",
      publishers = "",
    } = object;
    const { final_formatted = "무료", discount_percent = "없음" } =
      price_overview;
    const { total = "없음" } = recommendations;
    const infoEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(name)
      .setURL(website)
      .setAuthor("SteamUSing", logo, website)
      .setDescription(`${short_description}`)
      .addField("개발사", `${developers[0]}`)
      .addField("\u200B", "\u200B")
      .addFields(
        {
          name: "현재 가격",
          value: `${final_formatted}`,
          inline: true,
        },
        {
          name: "할인율",
          value: `${discount_percent}` + "%",
          inline: true,
        },
        {
          name: "평가 갯수",
          value: `${total}`,
          inline: true,
        }
      )
      .setImage(header_image)
      .setTimestamp()
      .setFooter(`${publishers[0]}`, logo);
    return infoEmbed;
  }
});

client.login(TOKEN);
