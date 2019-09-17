const { prefix } = require("../../config");
const Embed = require("../../util/embed");
const Colour = require("../../util/color");
module.exports = {
    name: "uptime",
    description: "⏱ View Bot Uptime",
    cooldown: 5,
    aliases: ["time"],
    usage: `\`${prefix}uptime\``,
    execute(client, msg, args) {

        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString()
            const min = Math.floor((ms / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
            return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `
        }
        msg.channel.send(new Embed(
            "Bot Up Time!",
            `I have been online for: ${duration(client.uptime)}`,
            Colour(255, 255, 102)
    
        ))
    }}