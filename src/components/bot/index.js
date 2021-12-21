const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const API_KEY = "B89C41C6F58FEFB1FB51E4D5D73109A9";
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content.substring(0, 4) === "!정보 ") {
    steam.getAppList().then((item) => {
      console.log(item);
      for (let i = 0; i < item.length; i++) {
        if (item[i].name.toUpperCase() === msg.content.slice(4).toUpperCase()) {
          console.log(item[i].appid);
          steam.getGameDetails(`${item[i].appid}`, false).then((object) => {
            console.log(object);
            if (object.type === "game") {
              // msg.reply(object.name);
            }
          });
        }
      }
    });
  }

  if (msg.content.substring(0, 4) === "!노래 ") {
    steam.getAppList().then((item) => {
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
        return (msg.content.slice(4) + item).toUpperCase();
      });
      for (let i = 0; i < item.length; i++) {
        for (let j = 0; j < soundtrack.length; j++) {
          if (item[i].name.toUpperCase() === soundtrack[j]) {
            console.log(item[i].appid);
            steam.getGameDetails(`${item[i].appid}`, false).then((object) => {
              console.log(object);
              if (object.type === "music") {
                // msg.reply(object.name);
              }
            });
          }
        }
      }
    });
  }
});

client.login("OTIyNDIxNDYzNDMxMTI3MDQx.YcBN7g.xW5ptFXr8ZgD-ptX0F5137iknCc");
