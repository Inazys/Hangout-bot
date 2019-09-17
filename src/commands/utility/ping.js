const { prefix } = require("../../config");
const Embed = require("../../util/embed");
const Colour = require("../../util/color");
module.exports = {
    name: "ping",
    description: "📡 View ping(ms)",
    aliases: ["ping", "ms"],
    usage: `\`${prefix}ping\``,
    execute(client, msg, args ) {
        msg.channel.send(new Embed(
            "Pong!",
            `My ping is: ${Math.ceil(client.ping)}ms`,
            Colour(255, 255, 102)
        ))
    }
}