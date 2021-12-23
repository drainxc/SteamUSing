export function sale() {
  if (msg.content.substring(0, 4) === ">>세일") {
    msg.channel.send({ embeds: [saleItem] });
  }
}
