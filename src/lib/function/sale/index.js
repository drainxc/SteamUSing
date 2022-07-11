module.exports = {
  sale: function (msg, saleItem) {
    msg.channel.send({ embeds: [saleItem] });
    return;
  },
};
