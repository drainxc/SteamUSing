const API_KEY = process.env.APIKEY;
const SteamAPI = require("steamapi");
const steam = new SteamAPI(API_KEY);

const embed = require("../embed");

module.exports = {
  recentGame: function (msg) {
    steam
      .getUserRecentGames("76561199042079317")
      .then((item) => {
        const recentEmbed = embed.resentEmbed(item);
        msg.channel.send({ embeds: [recentEmbed] });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
