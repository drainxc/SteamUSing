const { MessageEmbed } = require("discord.js");
const color = "#0099ff";
const logo =
  "https://cdn.discordapp.com/attachments/921024184694497341/923239613617807371/Group_29.png";

module.exports = {
  infoEmbed: function (object) {
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
      .setFooter(`${publishers[0]}`, logo);
    return infoEmbed;
  },
  playerEmbed: function (object, player) {
    const playerEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(object.name)
      .setAuthor("SteamUSing", logo)
      .setThumbnail(object.header_image)
      .addFields(
        {
          name: "개발사",
          value: object.developers[0],
          inline: true,
        },
        {
          name: "출시 날짜",
          value: object.release_date.date,
          inline: true,
        },
        {
          name: "동접자 수",
          value: `${player}`,
          inline: true,
        }
      )
      .setFooter(object.publishers[0], logo);
    return playerEmbed;
  },
  helpEmbed: function () {
    const helpEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle("SteamUSing 도움말")
      .setAuthor("SteamUSing", logo)
      .setThumbnail(logo)
      .addFields(
        {
          name: ">>도움",
          value: "지원하는 모든 명령어를 보실 수 있습니다! \n ex) >>도움",
          inline: false,
        },
        // {
        //   name: ">>유저등록",
        //   value:
        //     "유저의 스팀ID를 기억해 언제든지 사용하실 수 있습니다! \n ex) >>유저등록 76561199042079317(steam ID)",
        //   inline: false,
        // },
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
          inline: false,
        },
        {
          name: ">>유저정보",
          value:
            "자신의 유저정보를 한 눈에 볼 수 있습니다! \n ex) >>유저정보 ldh7228",
          inline: false,
        },
        {
          name: ">>최근게임",
          value:
            "자신이 마지막으로 한 게임을 볼 수 있습니다! \n ex) >>최근게임 pinkpoma",
          inline: false,
        },
        {
          name: ">>동접자",
          value:
            "게임의 동시접속자 수를 보실 수 있습니다! \n ex) >>동접자 Dota 2",
          inline: false,
        },
        {
          name: ">>뉴스",
          value:
            "가장 최근에 나온 게임 소식을 접할 수 있습니다! \n ex) >>뉴스 baba is you",
          inline: false,
        }
      )
      .addField(
        "\u200B",
        "devGithub - https://github.com/eastcopper/SteamUSing"
      )
      .setFooter(
        "(단, 유저정보를 받기 위해서는 사용자 지정 URL을 지정하거나 비공개가 아니여야합니다!)",
        logo
      );
    return helpEmbed;
  },
  saleEmbed: function (object) {
    const saleEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(object.name)
      .setAuthor("SteamUSing", logo)
      .setThumbnail(object.header_image)
      .addFields(
        {
          name: "가격",
          value: "무료",
          inline: true,
        },
        {
          name: "할인율",
          value: "100%",
          inline: true,
        }
      )
      .setFooter(object.publishers[0], logo);
    return saleEmbed;
  },
  signUpEmbed: function () {
    const signUpEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle("회원가입이 성공적으로 완료되었습니다!")
      .setAuthor("SteamUSing", logo)
      .setFooter("SteamUSing", logo);
    return signUpEmbed;
  },
  userEmbed: function (item, game, playGame, level) {
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
        },
        {
          name: "가장 많이 플레이한 게임",
          value: game[playGame].name,
          inline: true,
        },
        {
          name: "가진 게임 갯수",
          value: `${game.length}`,
          inline: true,
        }
      )
      .setImage(game[playGame].logoURL)
      .setFooter("SteamUSing", logo);
    return userEmbed;
  },
  resentEmbed: function (item) {
    const recentEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(item[0].name)
      .setAuthor("SteamUSing", logo)
      .setThumbnail(item[0].logoURL)
      .addFields(
        {
          name: "게임",
          value: item[0].name,
          inline: true,
        },
        {
          name: "총 플레이타임",
          value: `${(item[0].playTime / 60).toFixed(1)}` + "시간",
          inline: true,
        },
        {
          name: "최근 플레이타임",
          value: `${(item[0].playTime2 / 60).toFixed(1)}` + "시간",
          inline: true,
        }
      )
      .setFooter("SteamUSing", logo);
    return recentEmbed;
  },
  newsEmbed: function (object, content) {
    const newsEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(object.name)
      .setURL(object.website)
      .setAuthor("SteamUSing", logo)
      .setThumbnail(object.header_image)
      .setDescription(`${content[0].contents}`)
      .setFooter("SteamUSing", logo);
    return newsEmbed;
  },
};
