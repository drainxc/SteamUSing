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
const information = require("../../lib/function/infomation/index");
const soundTrack = require("../../lib/function/soundTrack/index");
const player = require("../../lib/function/player/index");
const sale = require("../../lib/function/sale/index");

const logo =
  "https://cdn.discordapp.com/attachments/921024184694497341/923239613617807371/Group_29.png";
const color = "#0D7EAD";
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
        if (hours === saletime.hours && minutes === saletime.minutes - 1) {
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
    information.infomation(msg);
  }

  if (msg.content.substring(0, 4) === ">>세일") {
    sale.sale(msg, saleItem);
  }

  if (msg.content.substring(0, 5) === ">>노래 ") {
    soundTrack.soundTrack(msg);
  }

  if (msg.content.substring(0, 6) === ">>동접자 ") {
    player.player(msg);
  }

  if (msg.content.substring(0, 6) === ">>유저정보") {
    steam.getUserOwnedGames("76561199042079317").then((asdf) => {
      console.log(asdf);
    });
    steam
      .getUserSummary("76561199042079317")
      .then((item) => {
        console.log(item);
        steam
          .getUserLevel("76561199042079317")
          .then((level) => {
            console.log(level);
            const userEmbed = new MessageEmbed()
              .setColor(color)
              .setTitle(item.nickname)
              .setURL(item.url)
              .setAuthor("SteamUSing", logo)
              .setThumbnail(item.avatar.large)
              .addField("\u200B", "\u200B")
              .addFields(
                {
                  name: "닉네임",
                  value: `${item.nickname}`,
                  inline: true,
                },
                {
                  name: "레벨",
                  value: `${level}`,
                  inline: true,
                },
                {
                  name: "steam ID",
                  value: `${item.steamID}`,
                  inline: true,
                }
              )
              .addField(
                "\u200B",
                "devGithub - https://github.com/eastcopper/SteamUSing"
              )
              .setFooter("SteamUSing", logo);
            msg.channel.send({ embeds: [userEmbed] });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
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
