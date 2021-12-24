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
      .setTimestamp()
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
      .addField(
        "\u200B",
        "devGithub - https://github.com/eastcopper/SteamUSing"
      )
      .setFooter("(단, 게임의 이름은 풀 네임으로 작성하셔야 합니다!)", logo);
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
  userEmbed: function () {
    const userEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle("회원가입이 성공적으로 완료되었습니다!")
      .setAuthor("SteamUSing", logo)
      .setFooter("SteamUSing", logo);
    return userEmbed;
  },
};
